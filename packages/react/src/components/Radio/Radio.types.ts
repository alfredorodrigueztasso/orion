/**
 * Radio Component Types
 *
 * Type definitions for the Orion Radio component.
 * Implements WCAG 2.1 AA accessibility guidelines.
 */

import type { InputHTMLAttributes } from "react";

/**
 * Radio sizes
 */
export type RadioSize = "sm" | "md" | "lg";

/**
 * Radio component props
 *
 * @example
 * ```tsx
 * <Radio name="plan" value="free" label="Free Plan" />
 * <Radio name="plan" value="pro" label="Pro Plan" checked />
 * ```
 */
export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /**
   * Radio label text.
   * Required for accessibility unless aria-label is provided.
   */
  label?: string;

  /**
   * Helper text displayed below the radio.
   * Automatically linked via aria-describedby.
   */
  helperText?: string;

  /**
   * Error message.
   * Shows error state and displays message below radio.
   */
  error?: string;

  /**
   * Radio size variant.
   * @default 'md'
   */
  size?: RadioSize;

  // ============================================================================
  // ACCESSIBILITY PROPS
  // ============================================================================

  /**
   * Accessible label for screen readers when no visible label is provided.
   * REQUIRED if `label` prop is not provided.
   *
   * @example
   * ```tsx
   * <Radio
   *   name="color"
   *   value="red"
   *   aria-label="Red color"
   *   style={{ background: 'red' }}
   * />
   * ```
   */
  "aria-label"?: string;

  /**
   * Additional element IDs that describe this radio.
   * Automatically includes error and helper text IDs when provided.
   */
  "aria-describedby"?: string;
}
