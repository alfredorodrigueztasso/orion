"use client";

import React from "react";
import type { PricingProps, PricingCardProps } from "./Pricing.types";
import { PricingCard } from "./PricingCard";
import styles from "./Pricing.module.css";

type PricingComponent = React.ForwardRefExoticComponent<
  PricingProps & React.RefAttributes<HTMLElement>
> & {
  Card: React.FC<PricingCardProps>;
};

export const Pricing = React.forwardRef<HTMLElement, PricingProps>(
  ({ title, description, plans, className }, ref) => {
    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        <div className={styles.container}>
          {(title || description) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          <div className={styles.grid}>
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>
      </section>
    );
  },
) as PricingComponent;

Pricing.displayName = "Pricing";
Pricing.Card = PricingCard;
