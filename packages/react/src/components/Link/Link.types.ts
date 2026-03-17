/**
 * Link Component Types
 *
 * Type definitions for the Orion Link component.
 */

import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Link visual variants
 */
export type LinkVariant = "default" | "subtle" | "brand";

/**
 * Link sizes
 */
export type LinkSize = "sm" | "md" | "lg";

/**
 * Icon animation types
 */
export type LinkIconAnimation = "arrow" | "arrow-left" | "external" | "none";

/**
 * Link component props
 *
 * @example
 * ```tsx
 * <Link href="/about">About us</Link>
 * <Link href="/docs" variant="brand" external>Documentation</Link>
 * ```
 */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Visual variant of the link
   * @default 'default'
   */
  variant?: LinkVariant;

  /**
   * Size of the link
   * @default 'md'
   */
  size?: LinkSize;

  /**
   * Whether the link opens in a new tab
   * Automatically adds rel="noopener noreferrer" for security
   * @default false
   */
  external?: boolean;

  /**
   * Whether to show an underline
   * @default true
   */
  underline?: boolean;

  /**
   * Whether to show the external link icon automatically when external is true
   * @default true
   */
  showExternalIcon?: boolean;

  /**
   * Icon to display before the link text
   */
  icon?: ReactNode;

  /**
   * Icon to display after the link text (e.g., external link icon)
   */
  iconRight?: ReactNode;

  /**
   * Icon hover animation type
   * - 'arrow': moves icon right on hover
   * - 'arrow-left': moves icon left on hover
   * - 'external': diagonal movement for external links
   * - 'none': no animation
   */
  iconAnimation?: LinkIconAnimation;

  /**
   * Link content
   */
  children?: ReactNode;
}
