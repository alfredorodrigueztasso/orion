/**
 * Carousel Component Types
 *
 * Type definitions for the atomic Carousel component.
 * This is a low-level component for use within cards, modals, or custom layouts.
 * For full-page carousel sections, use CarouselSection from sections.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Carousel visual variant
 */
export type CarouselVariant = "editorial" | "product" | "gallery";

/**
 * Carousel aspect ratio
 */
export type CarouselAspectRatio = "16/9" | "4/3" | "1/1" | "3/4";

/**
 * Carousel gap size
 */
export type CarouselGap = "sm" | "md" | "lg";

/**
 * Overlay style for carousel cards
 */
export type CarouselOverlay = "none" | "gradient" | "dark";

/**
 * Track alignment relative to container
 */
export type CarouselAlign = "container" | "edge";

/**
 * Navigation render props
 */
export interface CarouselNavigationProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  activeIndex: number;
  totalItems: number;
}

/**
 * Carousel item data structure
 */
export interface CarouselItem {
  /**
   * Background image element (typically an img)
   */
  image: ReactNode;

  /**
   * Small category/tag text above title
   */
  eyebrow?: string;

  /**
   * Main headline for the card
   */
  title: string;

  /**
   * Short description/subtitle
   */
  description?: string;

  /**
   * Optional action element (link or button)
   */
  action?: ReactNode;

  /**
   * Overlay style for text legibility
   * @default 'gradient'
   */
  overlay?: CarouselOverlay;
}

/**
 * Carousel card props (internal component)
 */
export interface CarouselCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Carousel item data
   */
  item: CarouselItem;

  /**
   * Aspect ratio of the card
   * @default '16/9'
   */
  aspectRatio?: CarouselAspectRatio;

  /**
   * Visual variant
   * @default 'editorial'
   */
  variant?: CarouselVariant;
}

/**
 * Atomic Carousel component props
 *
 * This is the low-level carousel component. For page sections, use CarouselSection.
 *
 * @example
 * ```tsx
 * // Inside a Card or Modal
 * <Carousel
 *   items={[
 *     { image: <img src="/1.jpg" />, title: "Slide 1" },
 *     { image: <img src="/2.jpg" />, title: "Slide 2" },
 *   ]}
 *   variant="gallery"
 *   aspectRatio="16/9"
 * />
 * ```
 */
export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
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
   * Track alignment
   * - 'container': First card aligns with Container (matches section title)
   * - 'edge': Cards start from screen edge (Apple style)
   * @default 'edge'
   */
  align?: CarouselAlign;

  /**
   * Show navigation arrows
   * @default true
   */
  showNavigation?: boolean;

  /**
   * Show pagination dots
   * @default false
   */
  showPagination?: boolean;

  /**
   * Callback when active slide changes
   */
  onSlideChange?: (index: number) => void;

  /**
   * Custom navigation renderer
   */
  renderNavigation?: (props: CarouselNavigationProps) => ReactNode;

  /**
   * Pixel offset for container alignment.
   * Used by CarouselSection to align first card snap point with title.
   * When set, scroll-padding-inline-start aligns snap points to this offset.
   * @internal
   */
  alignOffset?: number;

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
