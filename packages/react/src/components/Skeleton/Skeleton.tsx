"use client";

/**
 * Skeleton Component
 *
 * A loading placeholder that mimics content structure.
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={20} />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="text" lines={3} />
 * ```
 */

import { forwardRef } from "react";
import type { SkeletonProps } from "./Skeleton.types";
import styles from "./Skeleton.module.css";

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      animation = "pulse",
      width,
      height,
      lines = 1,
      borderRadius,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.skeleton,
      styles[variant],
      styles[animation],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inlineStyle = {
      width: typeof width === "number" ? `${width}px` : width,
      height: typeof height === "number" ? `${height}px` : height,
      borderRadius:
        typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
      ...style,
    };

    // For text variant with multiple lines
    if (variant === "text" && lines > 1) {
      return (
        <div ref={ref} className={styles.lines} {...rest}>
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={classNames}
              style={{
                ...inlineStyle,
                // Last line is shorter for visual variety
                width: index === lines - 1 ? "80%" : inlineStyle.width,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={classNames}
        style={inlineStyle}
        aria-hidden="true"
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
