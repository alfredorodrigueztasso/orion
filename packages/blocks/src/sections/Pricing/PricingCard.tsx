/**
 * PricingCard Component
 *
 * Internal component for rendering individual pricing cards.
 */

import type { PricingCardProps, PricingFeature } from "./Pricing.types";
import { Card, Badge } from "@orion-ds/react";
import { Check, X } from "lucide-react";
import styles from "./Pricing.module.css";

export const PricingCard = ({ plan, className }: PricingCardProps) => {
  const { name, price, period, description, features, action, popular, badge } =
    plan;

  const classNames = [styles.pricingCard, popular && styles.popular, className]
    .filter(Boolean)
    .join(" ");

  const normalizeFeature = (
    feature: string | PricingFeature,
  ): PricingFeature => {
    if (typeof feature === "string") {
      return { text: feature, included: true };
    }
    return { ...feature, included: feature.included !== false };
  };

  return (
    <Card variant={popular ? "elevated" : "base"} className={classNames}>
      <Card.Body className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <div className={styles.planInfo}>
            <h3 className={styles.planName}>{name}</h3>
            {(badge || popular) && (
              <Badge variant={popular ? "primary" : "secondary"} size="sm">
                {badge || "Most Popular"}
              </Badge>
            )}
          </div>

          <div className={styles.priceWrapper}>
            <span className={styles.price}>{price}</span>
            {period && <span className={styles.period}>{period}</span>}
          </div>

          {description && (
            <p className={styles.planDescription}>{description}</p>
          )}
        </div>

        <ul className={styles.featureList}>
          {features.map((feature, index) => {
            const { text, included } = normalizeFeature(feature);
            return (
              <li
                key={index}
                className={`${styles.featureItem} ${!included ? styles.excluded : ""}`}
              >
                <span className={styles.featureIcon}>
                  {included ? <Check size={16} /> : <X size={16} />}
                </span>
                <span className={styles.featureText}>{text}</span>
              </li>
            );
          })}
        </ul>

        {action && <div className={styles.action}>{action}</div>}
      </Card.Body>
    </Card>
  );
};

PricingCard.displayName = "PricingCard";
