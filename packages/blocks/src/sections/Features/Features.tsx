/**
 * Features Component
 *
 * A grid-based features section with support for icons, badges, and hover effects.
 * Composes atomic components from @orion/react (Card, Badge).
 *
 * @example
 * ```tsx
 * <Features
 *   eyebrow={<Badge>Features</Badge>}
 *   title="Everything you need"
 *   description="Powerful features designed for modern apps"
 *   items={[
 *     { icon: <Zap />, title: "Fast", description: "Lightning speed" },
 *     { icon: <Shield />, title: "Secure", description: "Bank-grade security" },
 *     { icon: <Code />, title: "Developer First", description: "Built for devs" },
 *   ]}
 *   columns={3}
 * />
 * ```
 */

import { forwardRef } from "react";
import type { FeaturesProps } from "./Features.types";
import { Section, Container } from "@orion-ds/react";
import { FeatureCard } from "./FeatureCard";
import styles from "./Features.module.css";

export const Features = forwardRef<HTMLElement, FeaturesProps>(
  (
    {
      eyebrow,
      title,
      description,
      items,
      columns = 3,
      background = "subtle",
      interactive = true,
      centered = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;

    const classNames = [styles.features, centered && styles.centered, className]
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
        <Container size="xl">
          {hasHeader && (
            <header className={styles.header}>
              {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </header>
          )}

          <div className={`${styles.grid} ${styles[`cols-${columns}`]}`}>
            {items.map((item, index) => (
              <FeatureCard
                key={item.title || index}
                feature={item}
                interactive={interactive}
              />
            ))}
          </div>
        </Container>
      </Section>
    );
  },
);

Features.displayName = "Features";
