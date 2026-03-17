/**
 * Avatar Component Types
 *
 * Type definitions for the Orion Avatar component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Avatar sizes
 */
export type AvatarSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "profile";

/**
 * Avatar colors
 */
export type AvatarColor =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "red"
  | "teal"
  | "pink";

/**
 * Avatar component props
 *
 * @example
 * ```tsx
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" />
 *
 * // With initials and explicit color
 * <Avatar initials="JD" color="blue" />
 *
 * // With initials and auto-derived color (deterministic from initials)
 * <Avatar initials="JD" />
 *
 * // With icon
 * <Avatar icon={<UserIcon />} />
 * ```
 */
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Avatar image source
   */
  src?: string;

  /**
   * Alt text for image
   */
  alt?: string;

  /**
   * User initials (fallback if no image)
   */
  initials?: string;

  /**
   * Icon element (fallback if no image or initials)
   */
  icon?: ReactNode;

  /**
   * Avatar size
   * @default 'md'
   */
  size?: AvatarSize;

  /**
   * Avatar background color
   * When not provided, auto-derived from initials using a deterministic hash
   * (same initials always get the same color)
   */
  color?: AvatarColor;

  /**
   * Show online status indicator
   * @default false
   */
  status?: "online" | "offline" | "away" | "busy";

  /**
   * Make avatar clickable
   * @default false
   */
  interactive?: boolean;
}
