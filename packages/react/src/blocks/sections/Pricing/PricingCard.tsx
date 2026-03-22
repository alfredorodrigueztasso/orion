import React from "react";
import type { PricingCardProps } from "./Pricing.types";
import styles from "./Pricing.module.css";

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  description,
  features,
  action,
  popular,
  className,
}) => {
  return (
    <div
      className={`${styles.card} ${popular ? styles.cardPopular : ""} ${className || ""}`}
    >
      {popular && <span className={styles.popularBadge}>Most Popular</span>}
      <h3 className={styles.cardName}>{name}</h3>
      <div className={styles.cardPrice}>
        <span className={styles.priceValue}>{price}</span>
        {period && <span className={styles.pricePeriod}>{period}</span>}
      </div>
      {description && <p className={styles.cardDescription}>{description}</p>}
      {features.length > 0 && (
        <ul className={styles.featureList}>
          {features.map((feature) => (
            <li key={feature} className={styles.featureItem}>
              <svg
                className={styles.featureCheck}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      {action && <div className={styles.cardAction}>{action}</div>}
    </div>
  );
};

PricingCard.displayName = "PricingCard";
