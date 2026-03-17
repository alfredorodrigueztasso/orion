"use client";

/**
 * Checkbox Component
 *
 * Multi-select checkbox input with label and validation.
 * Implements WCAG 2.1 AA accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms and conditions" />
 *
 * <Checkbox
 *   label="Remember me"
 *   checked={remember}
 *   onChange={(e) => setRemember(e.target.checked)}
 * />
 *
 * <Checkbox
 *   label="Subscribe to newsletter"
 *   helperText="We'll send updates weekly"
 * />
 *
 * <Checkbox
 *   label="Select all"
 *   indeterminate={someSelected}
 *   checked={allSelected}
 * />
 * ```
 */

import React, { forwardRef, useEffect, useRef, useId } from "react";
import { Check, Minus, AlertCircle } from "lucide-react";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      indeterminate = false,
      className,
      id,
      disabled,
      required,
      checked,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    // Use React's useId for stable, unique IDs (SSR-safe)
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;

    // IDs for accessible associations
    const errorId = `${checkboxId}-error`;
    const helperId = `${checkboxId}-helper`;

    // Handle indeterminate state (requires ref access)
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);

    // Build aria-describedby from multiple sources
    const describedByIds: string[] = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperId);
    if (ariaDescribedBy) describedByIds.push(ariaDescribedBy);
    const computedDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    // Ensure checkbox has an accessible name
    const hasAccessibleName = Boolean(label || ariaLabel);
    if (!hasAccessibleName && process.env.NODE_ENV === "development") {
      console.warn(
        "Checkbox: Missing accessible name. Provide either a `label` prop or `aria-label` for screen reader users.",
      );
    }

    // Determine aria-checked value for indeterminate state
    const ariaChecked = indeterminate ? "mixed" : undefined;

    const containerClasses = [
      styles.container,
      styles[size],
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={containerClasses}>
        {/* Hidden input */}
        <input
          ref={inputRef}
          type="checkbox"
          id={checkboxId}
          className={styles.input}
          disabled={disabled}
          required={required}
          checked={checked}
          aria-required={required || undefined}
          aria-invalid={error ? "true" : "false"}
          aria-checked={ariaChecked}
          aria-describedby={computedDescribedBy}
          aria-label={!label ? ariaLabel : undefined}
          {...rest}
        />

        {/* Label wrapper (clickable area) */}
        <label htmlFor={checkboxId} className={styles.labelWrapper}>
          {/* Custom checkbox indicator */}
          <span className={styles.checkbox} aria-hidden="true">
            <span className={styles.checkmark}>
              {indeterminate ? (
                <Minus strokeWidth={3} />
              ) : (
                <Check strokeWidth={3} />
              )}
            </span>
          </span>

          {/* Label text */}
          {label && (
            <span className={styles.label}>
              {label}
              {required && (
                <span className={styles.required} aria-hidden="true">
                  *
                </span>
              )}
            </span>
          )}
        </label>

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className={styles.errorMessage}
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle size={14} aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
