"use client";

/**
 * FAQ Component
 *
 * A frequently asked questions section with accordion or grid layout.
 * Supports single or multiple open items and rich answer content.
 *
 * @example
 * ```tsx
 * <FAQ
 *   eyebrow={<Badge>Support</Badge>}
 *   title="Frequently Asked Questions"
 *   description="Find answers to common questions"
 *   items={[
 *     {
 *       question: "How do I get started?",
 *       answer: "Simply sign up for a free account and follow our onboarding guide."
 *     },
 *     {
 *       question: "Is there a free trial?",
 *       answer: "Yes! We offer a 14-day free trial with full access to all features."
 *     }
 *   ]}
 *   variant="accordion"
 * />
 * ```
 */

import { forwardRef, useState, useCallback } from "react";
import type { FAQProps } from "./FAQ.types";
import { Section, Container } from "@/sections";
import { FAQItemCard } from "./FAQItemCard";
import styles from "./FAQ.module.css";

export const FAQ = forwardRef<HTMLElement, FAQProps>(
  (
    {
      eyebrow,
      title,
      description,
      items,
      columns = 1,
      variant = "accordion",
      allowMultiple = true,
      background = "base",
      centered = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;

    // Track open items for accordion (single-open mode)
    const [openItems, setOpenItems] = useState<Set<number>>(() => {
      const defaultOpen = new Set<number>();
      items.forEach((item, index) => {
        if (item.defaultOpen) {
          defaultOpen.add(index);
        }
      });
      return defaultOpen;
    });

    const handleToggle = useCallback(
      (index: number) => {
        if (variant !== "accordion") return;

        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(index)) {
            next.delete(index);
          } else {
            if (!allowMultiple) {
              next.clear();
            }
            next.add(index);
          }
          return next;
        });
      },
      [variant, allowMultiple],
    );

    const classNames = [styles.faq, centered && styles.centered, className]
      .filter(Boolean)
      .join(" ");

    return (
      <Section
        ref={ref}
        spacing="lg"
        background={background}
        className={classNames}
        {...rest}
      >
        <Container size="lg">
          {hasHeader && (
            <header className={styles.header}>
              {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </header>
          )}

          <div
            className={`${styles.list} ${variant === "grid" ? styles[`cols-${columns}`] : ""}`}
          >
            {items.map((item, index) => (
              <FAQItemCard
                key={item.question || index}
                item={item}
                variant={variant}
                isOpen={
                  variant === "accordion" ? openItems.has(index) : undefined
                }
                onToggle={
                  variant === "accordion"
                    ? () => handleToggle(index)
                    : undefined
                }
              />
            ))}
          </div>
        </Container>
      </Section>
    );
  },
);

FAQ.displayName = "FAQ";
