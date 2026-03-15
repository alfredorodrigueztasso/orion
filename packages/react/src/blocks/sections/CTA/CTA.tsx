"use client";

/**
 * CTA Component
 *
 * A call-to-action section for converting users. Supports various visual styles
 * and can be used as a contained card or full-width section.
 *
 * @example
 * ```tsx
 * <CTA
 *   title="Ready to get started?"
 *   description="Join thousands of developers building with Orion"
 *   actions={
 *     <>
 *       <Button size="lg">Start Free Trial</Button>
 *       <Button size="lg" variant="ghost">Contact Sales</Button>
 *     </>
 *   }
 *   variant="brand"
 * />
 * ```
 */

import { forwardRef, useEffect } from "react";
import type { CTAProps } from "./CTA.types";
import { Section, Container } from "@/sections";
import { Card } from "@/components/Card";
import styles from "./CTA.module.css";

export const CTA = forwardRef<HTMLElement, CTAProps>(
  (
    {
      title,
      headline,
      description,
      actions,
      footnote,
      variant = "brand",
      size = "md",
      align = "center",
      contained = true,
      className,
      ...rest
    },
    ref,
  ) => {
    // Support deprecated headline prop with warning
    const effectiveTitle = title ?? headline;

    // Deprecation warning
    useEffect(() => {
      if (headline && process.env.NODE_ENV === "development") {
        console.warn(
          '[CTA] The "headline" prop is deprecated. Use "title" instead. ' +
            "headline will be removed in v3.0.",
        );
      }
    }, [headline]);

    const classNames = [
      styles.cta,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`align-${align}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <div className={styles.content}>
        <h2 className={styles.headline}>{effectiveTitle}</h2>

        {description && <p className={styles.description}>{description}</p>}

        {actions && <div className={styles.actions}>{actions}</div>}

        {footnote && <p className={styles.footnote}>{footnote}</p>}
      </div>
    );

    if (contained) {
      return (
        <Section ref={ref} spacing="lg" className={classNames} {...rest}>
          <Container size="lg">
            <Card className={styles.card}>
              <Card.Body className={styles.cardBody}>{content}</Card.Body>
            </Card>
          </Container>
        </Section>
      );
    }

    return (
      <Section ref={ref} spacing="lg" className={classNames} {...rest}>
        <Container size="lg">{content}</Container>
      </Section>
    );
  },
);

CTA.displayName = "CTA";
