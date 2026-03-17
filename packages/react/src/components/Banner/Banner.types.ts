/**
 * Banner Section Types
 *
 * Type definitions for the Orion Banner section component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Banner variant styles
 */
export type BannerVariant = "default" | "gradient" | "image" | "split";

/**
 * Banner section props
 *
 * @example
 * ```tsx
 * <Banner
 *   title="Summer Sale"
 *   description="Up to 50% off on selected items"
 *   ctaLabel="Shop Now"
 *   ctaHref="/sale"
 *   variant="gradient"
 * />
 * ```
 */
export interface BannerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /**
   * Optional eyebrow/badge text
   */
  eyebrow?: ReactNode;

  /**
   * Banner title
   */
  title: ReactNode;

  /**
   * Banner description
   */
  description?: ReactNode;

  /**
   * Primary CTA button label
   */
  ctaLabel?: string;

  /**
   * Primary CTA button href
   */
  ctaHref?: string;

  /**
   * Secondary CTA label
   */
  secondaryCtaLabel?: string;

  /**
   * Secondary CTA href
   */
  secondaryCtaHref?: string;

  /**
   * Banner variant
   * @default 'default'
   */
  variant?: BannerVariant;

  /**
   * Background image URL (for 'image' and 'split' variants)
   */
  backgroundImage?: string;

  /**
   * Side image URL (for 'split' variant)
   */
  sideImage?: string;

  /**
   * Image position for split variant
   * @default 'right'
   */
  imagePosition?: "left" | "right";

  /**
   * Custom background color
   */
  backgroundColor?: string;

  /**
   * Custom gradient (overrides default)
   */
  gradient?: string;

  /**
   * Dismissible banner
   * @default false
   */
  dismissible?: boolean;

  /**
   * On dismiss callback
   */
  onDismiss?: () => void;

  /**
   * Full width (no max-width constraint)
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Compact mode
   * @default false
   */
  compact?: boolean;

  /**
   * Center content
   * @default true
   */
  centered?: boolean;
}
