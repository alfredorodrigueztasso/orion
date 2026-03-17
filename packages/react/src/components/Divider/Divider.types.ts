/**
 * Divider Component Types
 *
 * Type definitions for the Orion Divider component.
 */

import type { HTMLAttributes } from "react";

/**
 * Divider orientation
 */
export type DividerOrientation = "horizontal" | "vertical";

/**
 * Divider visual variants
 */
export type DividerVariant = "solid" | "dashed" | "dotted";

/**
 * Divider component props
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider variant="dashed" spacing="lg" />
 * ```
 */
export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /**
   * Orientation of the divider
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;

  /**
   * Visual variant of the divider
   * @default 'solid'
   */
  variant?: DividerVariant;

  /**
   * Spacing around the divider
   * @default 'md'
   */
  spacing?: "none" | "sm" | "md" | "lg";

  /**
   * Optional label to display in the center of the divider
   */
  label?: string;
}
