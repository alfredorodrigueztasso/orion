"use client";

/**
 * Field Component
 *
 * A type-safe, accessible input field with label, error states, and icon support.
 * Implements WCAG 2.1 AA accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Field
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   error="Invalid email address"
 * />
 *
 * <Field
 *   label="Search"
 *   leftIcon={<SearchIcon />}
 *   placeholder="Search..."
 * />
 * ```
 */

import { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";
import type { FieldProps } from "./Field.types";
import styles from "./Field.module.css";

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      size = "md",
      optional = false,
      className,
      id,
      disabled,
      required,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    // Use React's useId for stable, unique IDs (SSR-safe)
    const generatedId = useId();
    const inputId = id || `field-${generatedId}`;

    // IDs for accessible associations
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Determine if we should show error icon
    const showErrorIcon = error && !rightIcon;

    // Build aria-describedby from multiple sources
    const describedByIds: string[] = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperId);
    if (ariaDescribedBy) describedByIds.push(ariaDescribedBy);
    const computedDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    // Ensure input has an accessible name
    const hasAccessibleName = Boolean(label || ariaLabel);
    if (!hasAccessibleName && process.env.NODE_ENV === "development") {
      console.warn(
        "Field: Missing accessible name. Provide either a `label` prop or `aria-label` for screen reader users.",
      );
    }

    // Combine class names
    const containerClasses = [
      styles.fieldContainer,
      fullWidth && styles.fullWidth,
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      styles.input,
      styles[size],
      leftIcon && styles.hasLeftIcon,
      (rightIcon || showErrorIcon) && styles.hasRightIcon,
    ]
      .filter(Boolean)
      .join(" ");

    // Icon sizes based on field size
    const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            <span className={styles.labelText}>{label}</span>
            {optional && (
              <span className={styles.optional} aria-hidden="true">
                (optional)
              </span>
            )}
            {required && !optional && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper (for icon positioning) */}
        <div className={styles.inputWrapper}>
          {/* Left icon */}
          {leftIcon && (
            <span className={styles.leftIcon} aria-hidden="true">
              {leftIcon}
            </span>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            disabled={disabled}
            required={required}
            aria-required={required || undefined}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={computedDescribedBy}
            aria-label={!label ? ariaLabel : undefined}
            {...rest}
          />

          {/* Right icon - check if it's interactive */}
          {rightIcon && (
            <span
              className={`${styles.rightIcon} ${styles.rightIconInteractive}`}
              // Only hide from AT if it's purely decorative (not a button/interactive element)
            >
              {rightIcon}
            </span>
          )}

          {/* Error icon (if no right icon provided) */}
          {showErrorIcon && (
            <span
              className={`${styles.rightIcon} ${styles.errorIconInline}`}
              aria-hidden="true"
            >
              <AlertCircle size={iconSize} />
            </span>
          )}
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}

        {/* Error message - role="alert" announces to screen readers immediately */}
        {error && (
          <p
            id={errorId}
            className={styles.errorMessage}
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle
              size={14}
              aria-hidden="true"
              className={styles.errorIconMessage}
            />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  },
);

Field.displayName = "Field";
