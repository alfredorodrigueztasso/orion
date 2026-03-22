"use client";

import React from "react";
import type { CTAProps } from "./CTA.types";
import styles from "./CTA.module.css";

export const CTA = React.forwardRef<HTMLElement, CTAProps>(
  ({ title, description, variant = "default", actions, className }, ref) => {
    return (
      <section
        ref={ref}
        className={`${styles.section} ${styles[variant]} ${className || ""}`}
      >
        <div className={styles.inner}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </section>
    );
  },
);

CTA.displayName = "CTA";
