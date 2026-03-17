"use client";

/**
 * Chip Component
 *
 * A compact element for displaying tags, filters, or selections.
 *
 * @example
 * ```tsx
 * <Chip>Default</Chip>
 * <Chip variant="success" icon={<Check size={14} />}>Completed</Chip>
 * <Chip onRemove={() => removeTag(tag)}>{tag}</Chip>
 * ```
 */

import { forwardRef } from "react";
import type { ChipProps } from "./Chip.types";
import styles from "./Chip.module.css";

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      variant = "default",
      size = "md",
      icon,
      clickable = false,
      onClick,
      onRemove,
      disabled = false,
      selected = false,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const isInteractive = clickable || !!onClick;

    const classNames = [
      styles.chip,
      styles[variant],
      styles[size],
      isInteractive && styles.clickable,
      selected && styles.selected,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClick = () => {
      if (!disabled && onClick) {
        onClick();
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onRemove) {
        onRemove();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick?.();
      }

      if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        onRemove?.();
      }
    };

    return (
      <div
        ref={ref}
        className={classNames}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        aria-disabled={disabled}
        aria-pressed={selected}
        onClick={isInteractive ? handleClick : undefined}
        onKeyDown={isInteractive ? handleKeyDown : undefined}
        {...rest}
      >
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}

        <span className={styles.label}>{children}</span>

        {onRemove && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={handleRemove}
            disabled={disabled}
            aria-label="Remove"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5l7 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Chip.displayName = "Chip";
