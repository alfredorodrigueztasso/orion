/**
 * Combobox Component Types
 *
 * Type definitions for the Orion Combobox/Autocomplete component.
 */

import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Combobox size variants
 */
export type ComboboxSize = "sm" | "md" | "lg";

/**
 * Combobox option item
 */
export interface ComboboxOption {
  /**
   * Unique value for the option
   */
  value: string;

  /**
   * Display label for the option
   */
  label: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Optional icon/avatar
   */
  icon?: ReactNode;

  /**
   * Whether this option is disabled
   */
  disabled?: boolean;

  /**
   * Group this option belongs to
   */
  group?: string;
}

/**
 * Combobox option group
 */
export interface ComboboxGroup {
  /**
   * Group label
   */
  label: string;

  /**
   * Options in this group
   */
  options: ComboboxOption[];
}

/**
 * Combobox component props
 *
 * @example
 * ```tsx
 * <Combobox
 *   options={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'angular', label: 'Angular' },
 *   ]}
 *   value={selected}
 *   onChange={setSelected}
 *   placeholder="Select a framework..."
 * />
 * ```
 */
export interface ComboboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "onChange"
> {
  /**
   * Available options
   */
  options: ComboboxOption[];

  /**
   * Currently selected value
   */
  value?: string | null;

  /**
   * Callback when selection changes
   */
  onChange?: (value: string | null, option: ComboboxOption | null) => void;

  /**
   * Callback when input value changes (for custom filtering)
   */
  onInputChange?: (value: string) => void;

  /**
   * Size variant
   * @default 'md'
   */
  size?: ComboboxSize;

  /**
   * Field label
   */
  label?: string;

  /**
   * Helper text below the input
   */
  helperText?: string;

  /**
   * Error message (also sets error state)
   */
  error?: string;

  /**
   * Whether the combobox is loading
   * @default false
   */
  loading?: boolean;

  /**
   * Whether to allow clearing the selection
   * @default true
   */
  clearable?: boolean;

  /**
   * Whether to allow free text input (not just selection)
   * @default false
   */
  allowFreeInput?: boolean;

  /**
   * Custom filter function
   */
  filterFn?: (option: ComboboxOption, inputValue: string) => boolean;

  /**
   * Whether to show the dropdown when input is focused
   * @default true
   */
  openOnFocus?: boolean;

  /**
   * Minimum characters before showing options
   * @default 0
   */
  minChars?: number;

  /**
   * Text to show when no options match
   * @default 'No results found'
   */
  emptyText?: string;

  /**
   * Custom render function for options
   */
  renderOption?: (
    option: ComboboxOption,
    isSelected: boolean,
    isHighlighted: boolean,
  ) => ReactNode;

  /**
   * Maximum height of the dropdown
   * @default 300
   */
  maxHeight?: number;

  /**
   * Whether the input is full width
   * @default false
   */
  fullWidth?: boolean;
}
