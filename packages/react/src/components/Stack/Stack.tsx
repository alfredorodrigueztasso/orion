/**
 * Stack Component
 *
 * A flexible layout component for arranging children in a row or column
 * with consistent spacing using design system tokens.
 *
 * @example
 * ```tsx
 * // Vertical stack (default)
 * <Stack gap="md">
 *   <Card />
 *   <Card />
 * </Stack>
 *
 * // Horizontal stack
 * <Stack direction="horizontal" gap="sm" align="center">
 *   <Button>Save</Button>
 *   <Button variant="secondary">Cancel</Button>
 * </Stack>
 * ```
 */

import React from "react";
import type { StackProps } from "./Stack.types";
import styles from "./Stack.module.css";

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  (
    {
      direction = "vertical",
      gap = "md",
      align = "stretch",
      justify = "flex-start",
      wrap = "nowrap",
      as: Component = "div",
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.stack,
      styles[direction],
      styles[`gap-${gap}`],
      styles[`align-${align}`],
      styles[`justify-${justify}`],
      styles[`wrap-${wrap}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <Component ref={ref as any} className={classNames} {...rest}>
        {children}
      </Component>
    );
  },
);

Stack.displayName = "Stack";
