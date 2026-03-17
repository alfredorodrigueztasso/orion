"use client";

import React from "react";
import type { FeaturesProps, FeatureCardProps } from "./Features.types";
import { FeatureCard } from "./FeatureCard";
import styles from "./Features.module.css";

type FeaturesComponent = React.ForwardRefExoticComponent<
  FeaturesProps & React.RefAttributes<HTMLElement>
> & {
  Card: React.FC<FeatureCardProps>;
};

export const Features = React.forwardRef<HTMLElement, FeaturesProps>(
  ({ title, description, items, columns = 3, className }, ref) => {
    const gridClass =
      columns === 2
        ? styles.grid2
        : columns === 4
          ? styles.grid4
          : styles.grid3;

    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
      >
        <div className={styles.container}>
          {(title || description) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          <div className={`${styles.grid} ${gridClass}`}>
            {items.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </div>
      </section>
    );
  },
) as FeaturesComponent;

Features.displayName = "Features";
Features.Card = FeatureCard;
