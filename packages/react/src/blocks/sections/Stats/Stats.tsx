"use client";

import { forwardRef } from "react";
import type { StatsProps } from "./Stats.types";
import { StatItemCard } from "./StatItemCard";
import styles from "./Stats.module.css";

export const Stats = forwardRef<HTMLElement, StatsProps>(
  (
    { title, stats, columns = 3, variant = "default", className, ...rest },
    ref,
  ) => {
    const isInline = variant === "inline";

    const colsClass =
      columns === 2
        ? styles.cols2
        : columns === 4
          ? styles.cols4
          : styles.cols3;

    const variantClass = variant === "cards" ? styles.cards : "";

    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {isInline ? (
            <div className={styles.inline}>
              {stats.map((stat) => (
                <StatItemCard key={stat.label} stat={stat} />
              ))}
            </div>
          ) : (
            <div className={`${styles.grid} ${colsClass} ${variantClass}`}>
              {stats.map((stat) => (
                <StatItemCard key={stat.label} stat={stat} />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);

Stats.displayName = "Stats";
