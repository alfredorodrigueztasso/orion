"use client";

/**
 * Radio Component
 *
 * Single-select radio input with label and validation.
 * Implements WCAG 2.1 AA accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Radio name="plan" value="free" label="Free Plan" />
 * <Radio name="plan" value="pro" label="Pro Plan" checked />
 * <Radio name="plan" value="enterprise" label="Enterprise" />
 *
 * <Radio
 *   name="size"
 *   value="small"
 *   label="Small"
 *   helperText="Recommended for personal use"
 * />
 * ```
 */

import { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";
import type { RadioProps } from "./Radio.types";
import styles from "./Radio.module.css";

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
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
    const radioId = id || `radio-${generatedId}`;

    // IDs for accessible associations
    const errorId = `${radioId}-error`;
    const helperId = `${radioId}-helper`;

    // Build aria-describedby from multiple sources
    const describedByIds: string[] = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperId);
    if (ariaDescribedBy) describedByIds.push(ariaDescribedBy);
    const computedDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    // Ensure radio has an accessible name
    const hasAccessibleName = Boolean(label || ariaLabel);
    if (!hasAccessibleName && process.env.NODE_ENV === "development") {
      console.warn(
        "Radio: Missing accessible name. Provide either a `label` prop or `aria-label` for screen reader users.",
      );
    }

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
          ref={ref}
          type="radio"
          id={radioId}
          className={styles.input}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={computedDescribedBy}
          aria-label={!label ? ariaLabel : undefined}
          {...rest}
        />

        {/* Label wrapper (clickable area) */}
        <label htmlFor={radioId} className={styles.labelWrapper}>
          {/* Custom radio indicator */}
          <span className={styles.radio} aria-hidden="true">
            <span className={styles.dot} />
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

Radio.displayName = "Radio";
