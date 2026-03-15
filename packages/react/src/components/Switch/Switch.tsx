"use client";

/**
 * Switch Component
 *
 * A toggle switch for boolean settings.
 * Implements WCAG 2.1 AA accessibility guidelines.
 *
 * @example
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 *
 * <Switch
 *   checked={enabled}
 *   onChange={(e) => setEnabled(e.target.checked)}
 *   label="Enable notifications"
 * />
 *
 * <Switch
 *   label="Dark mode"
 *   helperText="Use dark theme across the app"
 *   size="sm"
 * />
 * ```
 */

import { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";
import type { SwitchProps } from "./Switch.types";
import styles from "./Switch.module.css";

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      size = "sm",
      helperText,
      error,
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
    const switchId = id || `switch-${generatedId}`;

    // IDs for accessible associations
    const errorId = `${switchId}-error`;
    const helperId = `${switchId}-helper`;

    // Build aria-describedby from multiple sources
    const describedByIds: string[] = [];
    if (error) describedByIds.push(errorId);
    if (helperText && !error) describedByIds.push(helperId);
    if (ariaDescribedBy) describedByIds.push(ariaDescribedBy);
    const computedDescribedBy =
      describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

    // Ensure switch has an accessible name
    const hasAccessibleName = Boolean(label || ariaLabel);
    if (!hasAccessibleName && process.env.NODE_ENV === "development") {
      console.warn(
        "Switch: Missing accessible name. Provide either a `label` prop or `aria-label` for screen reader users.",
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
        {/* Hidden input with role="switch" for proper AT announcement */}
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          className={styles.input}
          disabled={disabled}
          required={required}
          checked={checked}
          aria-checked={checked}
          aria-required={required || undefined}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={computedDescribedBy}
          aria-label={!label ? ariaLabel : undefined}
          {...rest}
        />

        {/* Label wrapper (clickable area) */}
        <label htmlFor={switchId} className={styles.labelWrapper}>
          {/* Switch track and thumb */}
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
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

Switch.displayName = "Switch";
