"use client";

/**
 * Link Component
 *
 * A styled anchor element for navigation.
 *
 * @example
 * ```tsx
 * <Link href="/about">About us</Link>
 * <Link href="https://docs.example.com" external>Documentation</Link>
 * <Link href="/profile" variant="brand">View Profile</Link>
 * ```
 */

import { forwardRef } from "react";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import type { LinkProps } from "./Link.types";
import styles from "./Link.module.css";

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "default",
      size = "md",
      external = false,
      underline = true,
      showExternalIcon = true,
      icon,
      iconRight,
      iconAnimation,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.link,
      styles[variant],
      styles[size],
      underline && styles.underline,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Security attributes for external links
    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    // Get icon size based on link size
    const getIconSize = () => {
      switch (size) {
        case "sm":
          return 12;
        case "lg":
          return 16;
        default:
          return 14;
      }
    };

    // Get icon animation class
    const getIconAnimationClass = (position: "left" | "right") => {
      if (!iconAnimation) {
        // Default animations based on context
        if (position === "right" && external) return styles.iconExternal;
        return "";
      }
      switch (iconAnimation) {
        case "arrow":
          return styles.iconArrow;
        case "arrow-left":
          return styles.iconArrowLeft;
        case "external":
          return styles.iconExternal;
        default:
          return "";
      }
    };

    // Determine the right icon to show
    const renderRightIcon = () => {
      if (iconRight) {
        return (
          <span
            className={`${styles.icon} ${styles.iconRight} ${getIconAnimationClass("right")}`}
            aria-hidden="true"
          >
            {iconRight}
          </span>
        );
      }

      // Auto-show external icon if external and showExternalIcon is true
      if (external && showExternalIcon) {
        return (
          <span
            className={`${styles.icon} ${styles.iconRight} ${styles.iconExternal}`}
            aria-hidden="true"
          >
            <ExternalLinkIcon size={getIconSize()} />
          </span>
        );
      }

      return null;
    };

    return (
      <a ref={ref} className={classNames} {...externalProps} {...rest}>
        {icon && (
          <span
            className={`${styles.icon} ${getIconAnimationClass("left")}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span>{children}</span>
        {renderRightIcon()}
      </a>
    );
  },
);

Link.displayName = "Link";
