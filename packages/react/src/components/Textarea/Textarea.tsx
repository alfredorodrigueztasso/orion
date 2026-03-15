"use client";

/**
 * Textarea Component
 *
 * Multi-line text input with label, error states, and character counter.
 * Implements WCAG 2.1 AA accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Description"
 *   placeholder="Enter description..."
 *   helperText="Provide detailed information"
 * />
 *
 * <Textarea
 *   label="Bio"
 *   maxLength={500}
 *   showCounter
 *   resize="vertical"
 * />
 *
 * <Textarea
 *   label="Comments"
 *   error="This field is required"
 *   size="lg"
 * />
 * ```
 */

import React, {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useId,
} from "react";
import { AlertCircle } from "lucide-react";
import type { TextareaProps } from "./Textarea.types";
import styles from "./Textarea.module.css";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      size = "md",
      resize = "vertical",
      showCounter = false,
      maxLength,
      className,
      id,
      value,
      defaultValue,
      onChange,
      disabled,
      required,
      optional = false,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    ref,
  ) => {
    // Use React's useId for stable, unique IDs (SSR-safe)
    const generatedId = useId();
    const textareaId = id || `textarea-${generatedId}`;

    // IDs for accessible associations
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const counterId = `${textareaId}-counter`;

    // Track character count for controlled/uncontrolled components
    const [charCount, setCharCount] = useState<number>(() => {
      if (value !== undefined) {
        return String(value).length;
      }
      if (defaultValue !== undefined) {
        return String(defaultValue).length;
      }
      return 0;
    });

    // Update character count when value prop changes (controlled component)
    useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length);
      }
    }, [value]);

    // Handle change event
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCharCount(event.target.value.length);
        onChange?.(event);
      },
      [onChange],
    );

    // Build aria-describedby from multiple sources
    const describedByIds: string[] = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperId);
    if (showCounter && maxLength) describedByIds.push(counterId);
    if (ariaDescribedBy) describedByIds.push(ariaDescribedBy);
    const computedDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    // Ensure textarea has an accessible name
    const hasAccessibleName = Boolean(label || ariaLabel);
    if (!hasAccessibleName && process.env.NODE_ENV === "development") {
      console.warn(
        "Textarea: Missing accessible name. Provide either a `label` prop or `aria-label` for screen reader users.",
      );
    }

    // Calculate counter classes and status
    const getCounterStatus = () => {
      if (!maxLength) return "normal";
      const percentage = (charCount / maxLength) * 100;
      if (percentage >= 100) return "error";
      if (percentage >= 90) return "warning";
      return "normal";
    };

    const counterStatus = getCounterStatus();
    const counterClasses = [
      styles.counter,
      counterStatus === "warning" && styles.counterWarning,
      counterStatus === "error" && styles.counterError,
    ]
      .filter(Boolean)
      .join(" ");

    // Container classes
    const containerClasses = [
      styles.container,
      styles[size],
      styles[`resize${resize.charAt(0).toUpperCase()}${resize.slice(1)}`],
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Show footer if counter or helper text exists
    const showFooter = showCounter || (helperText && !error);

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
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

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          className={styles.textarea}
          value={value}
          defaultValue={defaultValue}
          maxLength={maxLength}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={computedDescribedBy}
          aria-label={!label ? ariaLabel : undefined}
          {...rest}
        />

        {/* Footer (Counter + Helper Text) */}
        {showFooter && (
          <div className={styles.footer}>
            {/* Helper text */}
            {helperText && !error && (
              <p id={helperId} className={styles.helperText}>
                {helperText}
              </p>
            )}

            {/* Character counter - announced to screen readers */}
            {showCounter && maxLength && (
              <span
                id={counterId}
                className={counterClasses}
                aria-live="polite"
                aria-atomic="true"
              >
                {charCount}/{maxLength}
              </span>
            )}
          </div>
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

Textarea.displayName = "Textarea";
