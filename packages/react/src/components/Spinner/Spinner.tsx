"use client";

/**
 * Spinner Component
 *
 * Loading indicator with multiple sizes and variants.
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" variant="primary" />
 * <Spinner label="Loading data..." showLabel />
 * ```
 */

import React from "react";
import type { SpinnerProps } from "./Spinner.types";
import styles from "./Spinner.module.css";

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "primary",
  label = "Loading...",
  showLabel = false,
  className,
  ...rest
}) => {
  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  const spinnerClasses = [styles.spinner, styles[size], styles[variant]]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} {...rest}>
      <div
        className={spinnerClasses}
        role="status"
        aria-label={label}
        aria-live="polite"
      />
      {showLabel && <span className={styles.label}>{label}</span>}
    </div>
  );
};

Spinner.displayName = "Spinner";
