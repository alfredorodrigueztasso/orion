/**
 * Pricing Component
 *
 * A pricing section with support for multiple plans, feature lists, and
 * highlighting popular options. Composes atomic components from @orion/react.
 *
 * @example
 * ```tsx
 * <Pricing
 *   eyebrow={<Badge>Pricing</Badge>}
 *   title="Simple, transparent pricing"
 *   description="Choose the plan that's right for you"
 *   plans={[
 *     {
 *       name: "Starter",
 *       price: "$9",
 *       period: "per month",
 *       features: ["5 projects", "Basic support"],
 *       action: <Button>Get Started</Button>
 *     },
 *     {
 *       name: "Pro",
 *       price: "$29",
 *       period: "per month",
 *       features: ["Unlimited projects", "Priority support"],
 *       action: <Button>Get Started</Button>,
 *       popular: true
 *     }
 *   ]}
 * />
 * ```
 */

import { forwardRef } from "react";
import type { PricingProps } from "./Pricing.types";
import { Section, Container } from "@orion-ds/react";
import { PricingCard } from "./PricingCard";
import styles from "./Pricing.module.css";

export const Pricing = forwardRef<HTMLElement, PricingProps>(
  (
    {
      eyebrow,
      title,
      description,
      plans,
      columns = 3,
      background = "subtle",
      centered = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;

    const classNames = [styles.pricing, centered && styles.centered, className]
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
            {plans.map((plan, index) => (
              <PricingCard key={plan.name || index} plan={plan} />
            ))}
          </div>
        </Container>
      </Section>
    );
  },
);

Pricing.displayName = "Pricing";
