"use client";

import React from "react";
import type { EmptyStateProps } from "./EmptyState.types";
import styles from "./EmptyState.module.css";

export const EmptyState = React.forwardRef<HTMLElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      className,
    },
    ref
  ) => {
    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        {action && <div className={styles.action}>{action}</div>}
      </section>
    );
  }
);

EmptyState.displayName = "EmptyState";
