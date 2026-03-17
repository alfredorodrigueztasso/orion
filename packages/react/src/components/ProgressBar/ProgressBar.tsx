"use client";

/**
 * ProgressBar Component
 *
 * Progress indicator with variants, sizes, and labels.
 *
 * @example
 * ```tsx
 * <ProgressBar value={65} />
 * <ProgressBar value={80} variant="success" showLabel />
 * <ProgressBar value={25} size="lg" label="Uploading files..." />
 * <ProgressBar indeterminate label="Loading..." />
 * ```
 */

import React from "react";
import type { ProgressBarProps } from "./ProgressBar.types";
import styles from "./ProgressBar.module.css";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = "primary",
  size = "md",
  showLabel = false,
  label,
  indeterminate = false,
  className,
  ...rest
}) => {
  // Calculate percentage
  const percentage =
    value !== undefined ? Math.min(Math.max((value / max) * 100, 0), 100) : 0;

  const containerClasses = [
    styles.container,
    styles[size],
    styles[variant],
    indeterminate && styles.indeterminate,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses} {...rest}>
      {/* Label and percentage */}
      {(showLabel || label) && (
        <div className={styles.labelWrapper}>
          {label && <span>{label}</span>}
          {showLabel && !indeterminate && (
            <span className={styles.percentage}>{Math.round(percentage)}%</span>
          )}
        </div>
      )}

      {/* Progress track */}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        {/* Progress bar */}
        <div
          className={styles.bar}
          style={{
            width: indeterminate ? undefined : `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";
