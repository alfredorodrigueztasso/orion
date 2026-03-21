"use client";

/**
 * Badge Component
 *
 * Status indicator and label component.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">Error</Badge>
 * <Badge variant="brand" dot>New Feature</Badge>
 * <Badge variant="info">3 pending</Badge>
 * ```
 */

import React from "react";
import type { BadgeProps } from "./Badge.types";
import styles from "./Badge.module.css";

export const Badge: React.FC<BadgeProps> = ({
  variant = "secondary",
  size = "md",
  dot = false,
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classNames} {...rest}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
