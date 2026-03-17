/**
 * Skeleton Component Types
 *
 * Type definitions for the Orion Skeleton component.
 */

import type { HTMLAttributes } from "react";

/**
 * Skeleton shape variants
 */
export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

/**
 * Skeleton animation types
 */
export type SkeletonAnimation = "pulse" | "wave" | "none";

/**
 * Skeleton component props
 *
 * @example
 * ```tsx
 * <Skeleton width={200} height={20} />
 * <Skeleton variant="circular" width={40} height={40} />
 * <Skeleton variant="rectangular" width="100%" height={200} />
 * ```
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Shape variant of the skeleton
   * @default 'text'
   */
  variant?: SkeletonVariant;

  /**
   * Animation type
   * @default 'pulse'
   */
  animation?: SkeletonAnimation;

  /**
   * Width of the skeleton
   * Can be a number (pixels) or string (e.g., '100%', '10rem')
   */
  width?: number | string;

  /**
   * Height of the skeleton
   * Can be a number (pixels) or string (e.g., '100%', '2rem')
   */
  height?: number | string;

  /**
   * Number of skeleton lines to render (for text variant)
   * @default 1
   */
  lines?: number;

  /**
   * Border radius override
   */
  borderRadius?: number | string;
}
