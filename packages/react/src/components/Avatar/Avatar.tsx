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

import React, { useState } from "react";
import { User } from "lucide-react";
import type { AvatarProps } from "./Avatar.types";
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

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "",
  initials,
  icon,
  size = "md",
  status,
  interactive = false,
  className,
  ...rest
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClass = sizeClassMap[size] || size;

  const classNames = [
    styles.avatar,
    styles[sizeClass],
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
