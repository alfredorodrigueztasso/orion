"use client";

/**
 * Divider Component
 *
 * A visual separator for content sections.
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider variant="dashed" label="OR" />
 * ```
 */

import { forwardRef } from "react";
import type { DividerProps } from "./Divider.types";
import styles from "./Divider.module.css";

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      spacing = "md",
      label,
      className,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.divider,
      styles[orientation],
      styles[variant],
      styles[`spacing-${spacing}`],
      label && styles.withLabel,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (label && orientation === "horizontal") {
      return (
        <div
          className={classNames}
          role="separator"
          aria-orientation={orientation}
        >
          <span className={styles.line} />
          <span className={styles.label}>{label}</span>
          <span className={styles.line} />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={classNames}
        role="separator"
        aria-orientation={orientation}
        {...rest}
      />
    );
  },
);

Divider.displayName = "Divider";
