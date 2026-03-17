"use client";

/**
 * Avatar Component
 *
 * User profile picture or initials display with status indicators.
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" />
 * <Avatar initials="JD" size="lg" />
 * <Avatar icon={<UserIcon />} status="online" />
 * <Avatar src="/user.jpg" status="away" interactive />
 * ```
 */

import React, { useState, useMemo } from "react";
import { User } from "lucide-react";
import type { AvatarProps, AvatarColor } from "./Avatar.types";
import styles from "./Avatar.module.css";

// Map size prop to CSS class names
const sizeClassMap: Record<string, string> = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  "2xl": "xxl",
  "3xl": "xxxl",
  "4xl": "xxxxl",
  "5xl": "xxxxxl",
  profile: "profile",
};

// Available colors for auto-derivation
const AVATAR_COLORS: AvatarColor[] = [
  "blue",
  "green",
  "purple",
  "orange",
  "red",
  "teal",
  "pink",
];

/**
 * Derive a deterministic color from a string using a simple hash
 * Same input always produces the same color
 */
const getColorFromString = (str: string): AvatarColor => {
  if (!str) return "blue"; // default fallback

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use absolute value to index into colors array
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index]!;
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  initials,
  icon,
  size = "md",
  status,
  interactive = false,
  color,
  className,
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClass = sizeClassMap[size] || size;

  // Derive color from initials if not provided
  const resolvedColor = useMemo((): AvatarColor => {
    if (color) return color;
    if (initials) return getColorFromString(initials);
    return "blue"; // default fallback
  }, [color, initials]);

  const classNames = [
    styles.avatar,
    styles[sizeClass],
    styles[resolvedColor],
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Determine what to display
  const showImage = src && !imageError;
  const showInitials = !showImage && initials;
  const showIcon = !showImage && !showInitials && icon;

  return (
    <div className={classNames} {...rest}>
      {/* Image */}
      {showImage && (
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onError={() => setImageError(true)}
        />
      )}

      {/* Initials */}
      {showInitials && <span className={styles.initials}>{initials}</span>}

      {/* Icon */}
      {showIcon && <span className={styles.icon}>{icon}</span>}

      {/* Default fallback icon */}
      {!showImage && !showInitials && !showIcon && (
        <span className={styles.icon}>
          <User />
        </span>
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={`${styles.statusIndicator} ${styles[status]}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

Avatar.displayName = "Avatar";
