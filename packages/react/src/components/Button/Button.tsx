/**
 * Button Component
 *
 * A type-safe, accessible button component that uses the Orion Design System tokens.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 *
 * <Button variant="secondary" icon={<SearchIcon />}>
 *   Search
 * </Button>
 *
 * <Button variant="ghost" iconOnly icon={<MenuIcon />} aria-label="Menu" />
 * ```
 */

import { forwardRef } from "react";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";

// Convert kebab-case to camelCase for CSS Modules
const toCamelCase = (str: string) =>
  str.replace(/-([a-z])/g, (g) => g[1]?.toUpperCase() || "");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      fullWidth = false,
      icon,
      iconRight,
      iconOnly = false,
      className,
      children,
      disabled,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    // Convert variant to camelCase for CSS Modules access
    const variantClass = styles[toCamelCase(variant) as keyof typeof styles] as
      | string
      | undefined;

    // Combine class names
    const classNames = [
      styles.button,
      variantClass,
      styles[size],
      fullWidth && styles.fullWidth,
      iconOnly && styles.iconOnly,
      isLoading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Determine if button should be disabled
    const isDisabled = disabled || isLoading;

    const contentClass = isLoading ? styles.loadingContent : undefined;

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={isDisabled}
        {...rest}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}

        {icon && !iconOnly && (
          <span
            className={`${styles.icon} ${contentClass || ""}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {iconOnly && icon ? (
          <span
            className={`${styles.icon} ${contentClass || ""}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : (
          <span className={contentClass}>
            {isLoading && loadingText ? loadingText : children}
          </span>
        )}

        {iconRight && !iconOnly && (
          <span
            className={`${styles.icon} ${styles.iconRight} ${contentClass || ""}`}
            aria-hidden="true"
          >
            {iconRight}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
