/**
 * Switch Component Types
 *
 * Type definitions for the Orion Switch component (toggle).
 * Implements WCAG 2.1 AA accessibility guidelines.
 */

import type { InputHTMLAttributes } from "react";

/**
 * Switch sizes
 */
export type SwitchSize = "sm" | "md" | "lg";

/**
 * Switch component props
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onChange={setEnabled} />
 * <Switch label="Enable notifications" size="sm" />
 * ```
 */
export interface SwitchProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> {
  /**
   * Switch label text.
   * Required for accessibility unless aria-label is provided.
   */
  label?: string;

  /**
   * Switch size variant.
   * @default 'sm'
   */
  size?: SwitchSize;

  /**
   * Helper text displayed below the switch.
   * Automatically linked via aria-describedby.
   */
  helperText?: string;

  /**
   * Error message.
   * Shows error state and displays message below switch.
   */
  error?: string;

  // ============================================================================
  // ACCESSIBILITY PROPS
  // ============================================================================

  /**
   * Accessible label for screen readers when no visible label is provided.
   * REQUIRED if `label` prop is not provided.
   *
   * @example
   * ```tsx
   * <Switch
   *   aria-label="Enable dark mode"
   *   checked={darkMode}
   *   onChange={toggleDarkMode}
   * />
   * ```
   */
  "aria-label"?: string;

  /**
   * Additional element IDs that describe this switch.
   * Automatically includes error and helper text IDs when provided.
   */
  "aria-describedby"?: string;
}
