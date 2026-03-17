/**
 * Spinner Component Types
 *
 * Type definitions for the Orion Spinner component (loading indicator).
 */

import type { HTMLAttributes } from "react";

/**
 * Spinner sizes
 */
export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Spinner variants
 */
export type SpinnerVariant = "primary" | "secondary" | "neutral" | "inverse";

/**
 * Spinner component props
 *
 * @example
 * ```tsx
 * <Spinner />
 * <Spinner size="lg" variant="primary" />
 * <Spinner label="Loading..." />
 * ```
 */
export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Spinner size
   * @default 'md'
   */
  size?: SpinnerSize;

  /**
   * Spinner variant (color)
   * @default 'primary'
   */
  variant?: SpinnerVariant;

  /**
   * Loading label (for accessibility)
   * @default 'Loading...'
   */
  label?: string;

  /**
   * Show label text below spinner
   * @default false
   */
  showLabel?: boolean;
}
