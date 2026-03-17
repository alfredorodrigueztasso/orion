import React from "react";
import type { FeatureCardProps } from "./Features.types";
import styles from "./Features.module.css";

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className,
}) => {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      {icon && <div className={styles.cardIcon}>{icon}</div>}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};

FeatureCard.displayName = "FeatureCard";
