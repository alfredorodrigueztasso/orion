/**
 * Select Component
 *
 * A styled dropdown select with label, error states, and custom styling.
 *
 * @example
 * ```tsx
 * // Using options prop
 * <Select
 *   label="Country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *     { value: 'ca', label: 'Canada' }
 *   ]}
 *   placeholder="Select a country"
 * />
 *
 * // Using compound component (Select.Option)
 * <Select label="Who paid?">
 *   <Select.Option value="me">Me</Select.Option>
 *   <Select.Option value="partner">Partner</Select.Option>
 * </Select>
 *
 * // Using native <option> children
 * <Select label="Status" error="Please select a status">
 *   <option value="">Choose status</option>
 *   <option value="active">Active</option>
 *   <option value="inactive">Inactive</option>
 * </Select>
 * ```
 */

import { forwardRef } from "react";
import type { SelectProps, SelectOptionProps } from "./Select.types";
import styles from "./Select.module.css";

/**
 * SelectOption component - used as Select.Option for compound component pattern
 *
 * @example
 * ```tsx
 * <Select>
 *   <Select.Option value="us">United States</Select.Option>
 *   <Select.Option value="uk">United Kingdom</Select.Option>
 * </Select>
 * ```
 */
const SelectOption = forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ value, disabled, children, ...rest }, ref) => (
    <option ref={ref} value={value} disabled={disabled} {...rest}>
      {children}
    </option>
  ),
);

SelectOption.displayName = "Select.Option";

const SelectComponent = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      options,
      placeholder = "Select an option...",
      fullWidth = false,
      size = "md",
      optional = false,
      className,
      id,
      disabled,
      required,
      children,
      ...rest
    },
    ref,
  ) => {
    // Generate unique ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Combine class names
    const containerClasses = [
      styles.selectContainer,
      fullWidth && styles.fullWidth,
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const selectClasses = [styles.select, styles[size]]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label htmlFor={selectId} className={styles.label}>
            {label}
            {optional && <span className={styles.optional}>(optional)</span>}
            {required && <span aria-label="required">*</span>}
          </label>
        )}

        {/* Select wrapper */}
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            disabled={disabled}
            required={required}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${selectId}-error`
                : helperText
                  ? `${selectId}-helper`
                  : undefined
            }
            {...rest}
          >
            {/* Placeholder option */}
            {placeholder && (
              <option value="" disabled className={styles.placeholder}>
                {placeholder}
              </option>
            )}

            {/* Options from prop */}
            {options?.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}

            {/* Custom children (including Select.Option components) */}
            {children}
          </select>
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <span id={`${selectId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}

        {/* Error message */}
        {error && (
          <span
            id={`${selectId}-error`}
            className={styles.errorMessage}
            role="alert"
          >
            <span className={styles.errorIcon} aria-hidden="true">
              ⚠
            </span>
            {error}
          </span>
        )}
      </div>
    );
  },
);

SelectComponent.displayName = "Select";

// Attach SelectOption as static property
export const Select = SelectComponent as typeof SelectComponent & {
  Option: typeof SelectOption;
};
Select.Option = SelectOption;
