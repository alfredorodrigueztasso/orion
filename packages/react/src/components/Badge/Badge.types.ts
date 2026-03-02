/**
 * Badge Component Types
 *
 * Type definitions for the Orion Badge component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Badge variants (status colors)
 */
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "brand"
  | "inverse";

/**
 * Badge sizes
 */
export type BadgeSize = "sm" | "md" | "lg";

/**
 * Badge component props
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error" size="sm">Error</Badge>
 * <Badge variant="brand" dot>New</Badge>
 * ```
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge visual variant
   * @default 'neutral'
   */
  variant?: BadgeVariant;

  /**
   * Badge size
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Show dot indicator
   * @default false
   */
  dot?: boolean;

  /**
   * Badge content
   */
  children?: ReactNode;
}
