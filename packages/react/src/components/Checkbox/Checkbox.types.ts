/**
 * Checkbox Component Types
 *
 * Type definitions for the Orion Checkbox component.
 * Implements WCAG 2.1 AA accessibility guidelines.
 */

import type { InputHTMLAttributes } from "react";

/**
 * Checkbox sizes
 */
export type CheckboxSize = "sm" | "md" | "lg";

/**
 * Checkbox component props
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
 * ```
 */
export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /**
   * Checkbox label text.
   * Required for accessibility unless aria-label is provided.
   */
  label?: string;

  /**
   * Helper text displayed below the checkbox.
   * Automatically linked via aria-describedby.
   */
  helperText?: string;

  /**
   * Error message.
   * Shows error state and displays message below checkbox.
   */
  error?: string;

  /**
   * Checkbox size variant.
   * @default 'md'
   */
  size?: CheckboxSize;

  /**
   * Indeterminate state (partially checked).
   * Used for "select all" patterns where some items are selected.
   * Sets aria-checked="mixed" for screen readers.
   * @default false
   */
  indeterminate?: boolean;

  // ============================================================================
  // ACCESSIBILITY PROPS
  // ============================================================================

  /**
   * Accessible label for screen readers when no visible label is provided.
   * REQUIRED if `label` prop is not provided.
   *
   * @example
   * ```tsx
   * <Checkbox
   *   aria-label="Select row 1"
   *   checked={selected}
   *   onChange={handleSelect}
   * />
   * ```
   */
  "aria-label"?: string;

  /**
   * Additional element IDs that describe this checkbox.
   * Automatically includes error and helper text IDs when provided.
   */
  "aria-describedby"?: string;
}
