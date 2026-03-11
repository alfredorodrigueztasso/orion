/**
 * FeatureCard Component
 *
 * Internal component for rendering individual feature cards.
 */

import type { FeatureCardProps } from "./Features.types";
import { Card, Badge } from "@orion-ds/react";
import styles from "./Features.module.css";

export const FeatureCard = ({
  feature,
  interactive = true,
  className,
}: FeatureCardProps) => {
  const { icon, title, description, badge, href } = feature;

  const cardContent = (
    <>
      <div className={styles.cardHeader}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {badge && (
          <Badge variant="secondary" size="sm">
            {badge}
          </Badge>
        )}
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>

      <p className={styles.cardDescription}>{description}</p>
    </>
  );

  const classNames = [
    styles.featureCard,
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={styles.cardLink}>
        <Card variant="base" className={classNames}>
          <Card.Body>{cardContent}</Card.Body>
        </Card>
      </a>
    );
  }

  return (
    <Card variant="base" className={classNames}>
      <Card.Body>{cardContent}</Card.Body>
    </Card>
  );
};

FeatureCard.displayName = "FeatureCard";
