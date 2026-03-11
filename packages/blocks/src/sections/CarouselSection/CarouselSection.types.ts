/**
 * CarouselSection Component Types
 *
 * Type definitions for the full-page CarouselSection component.
 * This wraps the atomic Carousel with Section/Container for page layouts.
 */

import type { HTMLAttributes, ReactNode } from "react";
import type {
  CarouselItem,
  CarouselVariant,
  CarouselAspectRatio,
  CarouselGap,
} from "@orion-ds/react";

// Re-export types from atomic component for convenience
export type {
  CarouselItem,
  CarouselVariant,
  CarouselAspectRatio,
  CarouselGap,
  CarouselOverlay,
} from "@orion-ds/react";

/**
 * CarouselSection props
 *
 * Full-page carousel section with title, description, and navigation.
 *
 * @example
 * ```tsx
 * <CarouselSection
 *   eyebrow={<Badge>Featured</Badge>}
 *   title="Featured Stories"
 *   description="Check out our latest articles."
 *   alignToTitle={true}
 *   items={[
 *     {
 *       image: <img src="/hero-1.jpg" alt="" />,
 *       eyebrow: "Design",
 *       title: "The future of interfaces",
 *       description: "How AI is reshaping how we build",
 *       overlay: "gradient"
 *     }
 *   ]}
 * />
 * ```
 */
export interface CarouselSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  /**
   * Optional eyebrow/badge above title
   */
  eyebrow?: ReactNode;

  /**
   * Section title
   */
  title?: ReactNode;

  /**
   * Section description
   */
  description?: ReactNode;

  /**
   * Array of carousel items
   */
  items: CarouselItem[];

  /**
   * Visual variant
   * - editorial: Magazine-style with large images and text overlays
   * - product: Product showcase cards
   * - gallery: Simple image gallery
   * @default 'editorial'
   */
  variant?: CarouselVariant;

  /**
   * Aspect ratio for cards
   * @default '16/9'
   */
  aspectRatio?: CarouselAspectRatio;

  /**
   * Show cards cut at edge (Apple style peek effect)
   * @default true
   */
  peek?: boolean;

  /**
   * Enable auto-scroll
   * @default false
   */
  autoScroll?: boolean;

  /**
   * Auto-scroll interval in milliseconds
   * @default 5000
   */
  autoScrollInterval?: number;

  /**
   * Gap between cards
   * @default 'md'
   */
  gap?: CarouselGap;

  /**
   * Background style
   * @default 'base'
   */
  background?: "base" | "subtle" | "sunken" | "none";

  /**
   * Show navigation arrows in header
   * @default true
   */
  showNavigation?: boolean;

  /**
   * Show pagination dots below carousel
   * @default false
   */
  showPagination?: boolean;

  /**
   * Align first card with the Container edge (same as title)
   * - true: First card aligns with title (container alignment)
   * - false: Cards start from screen edge (Apple style)
   * @default true
   */
  alignToTitle?: boolean;

  /**
   * Make the active (focused) card 10% larger than the rest.
   * Creates a "spotlight" effect that follows the scroll position.
   * @default false
   */
  highlightActive?: boolean;

  /**
   * Enable infinite loop scrolling.
   * When reaching the end, navigation continues from the beginning.
   * @default false
   */
  loop?: boolean;
}
