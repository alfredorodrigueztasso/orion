/**
 * StatItemCard Component
 *
 * Internal component for rendering individual stat items.
 */

import type { StatItemCardProps } from "./Stats.types";
import { Card } from "@orion-ds/react";
import { TrendingUp, TrendingDown } from "lucide-react";
import styles from "./Stats.module.css";

export const StatItemCard = ({
  stat,
  variant = "default",
  highlightValue = false,
  className,
}: StatItemCardProps) => {
  const { value, label, description, icon, trend } = stat;

  const classNames = [styles.statItem, styles[`variant-${variant}`], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <div className={styles.icon}>{icon}</div>}

      <div className={styles.valueWrapper}>
        <span
          className={`${styles.value} ${highlightValue ? styles.valueHighlight : ""}`}
        >
          {value}
        </span>
        {trend && (
          <span
            className={`${styles.trend} ${trend.positive !== false ? styles.trendPositive : styles.trendNegative}`}
          >
            {trend.positive !== false ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {trend.value}
          </span>
        )}
      </div>

      <span className={styles.label}>{label}</span>

      {description && (
        <span className={styles.statDescription}>{description}</span>
      )}
    </>
  );

  if (variant === "cards") {
    return (
      <Card variant="base" className={classNames}>
        <Card.Body className={styles.cardBody}>{content}</Card.Body>
      </Card>
    );
  }

  return <div className={classNames}>{content}</div>;
};

StatItemCard.displayName = "StatItemCard";
