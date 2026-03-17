/**
 * ProgressBar Component Types
 *
 * Type definitions for the Orion ProgressBar component.
 */

import type { HTMLAttributes } from "react";

/**
 * ProgressBar sizes
 */
export type ProgressBarSize = "sm" | "md" | "lg";

/**
 * ProgressBar variants
 */
export type ProgressBarVariant =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info";

/**
 * ProgressBar component props
 *
 * @example
 * ```tsx
 * <ProgressBar value={65} />
 * <ProgressBar value={80} variant="success" showLabel />
 * <ProgressBar value={25} size="lg" label="Uploading..." />
 * ```
 */
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Progress value (0-100)
   * Optional when indeterminate is true
   */
  value?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Progress bar variant (color)
   * @default 'primary'
   */
  variant?: ProgressBarVariant;

  /**
   * Progress bar size
   * @default 'md'
   */
  size?: ProgressBarSize;

  /**
   * Show percentage label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Custom label text
   */
  label?: string;

  /**
   * Indeterminate/loading state
   * @default false
   */
  indeterminate?: boolean;
}
