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
 * Avatar component props
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="John Doe" />
 * <Avatar initials="JD" />
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
