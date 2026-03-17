/**
 * Select Component Types
 *
 * Type definitions for the Orion Select component (dropdown).
 */

import type { SelectHTMLAttributes, ReactNode } from "react";

/**
 * Select option type
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Select component props
 *
 * @example
 * ```tsx
 * <Select
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' }
 *   ]}
 * />
 * ```
 */
export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  /**
   * Select label
   */
  label?: string;

  /**
   * Error message (shows error state when present)
   */
  error?: string;

  /**
   * Helper text (shown below select)
   */
  helperText?: string;

  /**
   * Select options
   */
  options?: SelectOption[];

  /**
   * Placeholder option text
   * @default 'Select an option...'
   */
  placeholder?: string;

  /**
   * Full width select
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Select size
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";

  /**
   * Optional indicator
   * @default false
   */
  optional?: boolean;

  /**
   * Custom children (instead of options prop)
   */
  children?: ReactNode;
}
