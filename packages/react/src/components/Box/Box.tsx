"use client";

/**
 * Box Component
 *
 * A flexible layout primitive for spacing and background styling.
 * Uses inline-style for padding (for clean CSS handling) and CSS classes for visual props.
 *
 * @example
 * ```tsx
 * // Basic box with padding
 * <Box padding={4}>Content</Box>
 *
 * // With background and radius
 * <Box padding={4} bg="surface-layer" radius="control">
 *   Styled content
 * </Box>
 *
 * // Directional padding
 * <Box paddingX={4} paddingY={2}>
 *   Horizontal and vertical padding
 * </Box>
 *
 * // Custom element type
 * <Box as="section" padding={4} bg="surface-subtle">
 *   Section content
 * </Box>
 * ```
 */

import React, { useMemo } from "react";
import type { BoxProps, SpacingScale } from "./Box.types";
import styles from "./Box.module.css";

/**
 * Map spacing scale values to CSS variable tokens
 */
const spacingMap: Record<SpacingScale, string> = {
  0: "0px",
  px: "var(--spacing-px)",
  "05": "var(--spacing-05)",
  1: "var(--spacing-1)",
  2: "var(--spacing-2)",
  3: "var(--spacing-3)",
  4: "var(--spacing-4)",
  5: "var(--spacing-5)",
  6: "var(--spacing-6)",
  7: "var(--spacing-7)",
  8: "var(--spacing-8)",
  9: "var(--spacing-9)",
  10: "var(--spacing-10)",
  11: "var(--spacing-11)",
  12: "var(--spacing-12)",
  16: "var(--spacing-16)",
  20: "var(--spacing-20)",
  24: "var(--spacing-24)",
  32: "var(--spacing-32)",
};

/**
 * Convert spacing scale value to CSS value
 */
const getSpacingValue = (value: SpacingScale): string => {
  return spacingMap[value];
};

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  (
    {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      bg,
      radius,
      as: Component = "div",
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    /**
     * Compute padding styles with proper priority:
     * 1. Individual directions (paddingTop/Bottom/Left/Right) - highest priority
     * 2. Axis groups (paddingX/Y)
     * 3. Uniform padding - lowest priority
     */
    const paddingStyles = useMemo(() => {
      const computed: Record<string, string> = {};

      // Step 1: Apply uniform padding as baseline
      if (padding !== undefined) {
        const value = getSpacingValue(padding);
        computed.paddingTop = value;
        computed.paddingRight = value;
        computed.paddingBottom = value;
        computed.paddingLeft = value;
      }

      // Step 2: Override with axis-aligned padding
      if (paddingX !== undefined) {
        const value = getSpacingValue(paddingX);
        computed.paddingRight = value;
        computed.paddingLeft = value;
      }

      if (paddingY !== undefined) {
        const value = getSpacingValue(paddingY);
        computed.paddingTop = value;
        computed.paddingBottom = value;
      }

      // Step 3: Override with individual direction (highest priority)
      if (paddingTop !== undefined) {
        computed.paddingTop = getSpacingValue(paddingTop);
      }

      if (paddingBottom !== undefined) {
        computed.paddingBottom = getSpacingValue(paddingBottom);
      }

      if (paddingLeft !== undefined) {
        computed.paddingLeft = getSpacingValue(paddingLeft);
      }

      if (paddingRight !== undefined) {
        computed.paddingRight = getSpacingValue(paddingRight);
      }

      return computed;
    }, [
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
    ]);

    /**
     * Build class names for visual props (bg, radius)
     */
    const classNames = [
      bg && styles[`bg-${bg}`],
      radius && styles[`radius-${radius}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    /**
     * Merge computed padding styles with any custom styles
     */
    const mergedStyle = {
      ...paddingStyles,
      ...style,
    };

    return (
      <Component
        ref={ref as any}
        className={classNames}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </Component>
    );
  },
);

Box.displayName = "Box";
