/**
 * Hero Component Types
 *
 * Type definitions for the Orion Hero section component.
 */

import type { HTMLAttributes, ReactNode } from "react";
import type { SectionSpacing } from "@orion-ds/react";

/**
 * Hero text alignment
 */
export type HeroAlign = "left" | "center";

/**
 * Hero size variants
 */
export type HeroSize = "sm" | "md" | "lg";

/**
 * Hero visual variant
 * - 'default': Standard hero with optional side media
 * - 'background': Full-width background image with content overlay
 */
export type HeroVariant = "default" | "background";

/**
 * Hero layout mode
 * - 'contained': Default with container padding
 * - 'fullscreen': 100vh height, vertically centered, edge-to-edge width
 * - 'card': Inset with margins and border radius (floating card style)
 */
export type HeroLayout = "contained" | "fullscreen" | "card";

/**
 * Props for HeroHighlight compound component
 */
export interface HeroHighlightProps {
  /**
   * Text content to highlight with brand gradient
   */
  children: ReactNode;
}

/**
 * Hero component props
 *
 * @example
 * ```tsx
 * <Hero
 *   badge={<Badge>New</Badge>}
 *   title="Build faster with Orion"
 *   description="The AI-first design system for modern apps"
 *   primaryAction={<Button>Get Started</Button>}
 *   secondaryAction={<Button variant="ghost">Learn More</Button>}
 *   align="center"
 * />
 * ```
 *
 * @example Fullscreen with background
 * ```tsx
 * <Hero
 *   layout="fullscreen"
 *   variant="background"
 *   backgroundImage="https://example.com/hero.jpg"
 *   title={<>Build <Hero.Highlight>faster</Hero.Highlight></>}
 * />
 * ```
 */
export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /**
   * Optional badge/eyebrow element above title.
   * - String: auto-wrapped as <Badge variant="brand" size="lg">
   * - ReactNode: rendered as-is for full control
   * @example badge="New Release"
   * @example badge={<Badge variant="success">Beta</Badge>}
   */
  badge?: ReactNode;

  /**
   * Main title text or element.
   * Can include <Hero.Highlight> for gradient text.
   */
  title?: ReactNode;

  /**
   * @deprecated Use `title` instead. Will be removed in v3.0.
   */
  headline?: ReactNode;

  /**
   * Optional description text below headline
   */
  description?: ReactNode;

  /**
   * Primary action button/element
   */
  primaryAction?: ReactNode;

  /**
   * Secondary action button/element
   */
  secondaryAction?: ReactNode;

  /**
   * Optional media (image, video, illustration)
   */
  media?: ReactNode;

  /**
   * Media position when provided
   * @default 'right'
   */
  mediaPosition?: "left" | "right" | "bottom";

  /**
   * Show default placeholder image when media is not provided
   * @default false
   */
  showDefaultMedia?: boolean;

  /**
   * Trust indicators (logos, badges, social proof)
   */
  trustIndicators?: ReactNode;

  /**
   * Text alignment
   * @default 'center'
   */
  align?: HeroAlign;

  /**
   * Size variant affecting typography scale
   * - sm: Compact hero for sub-pages
   * - md: Standard hero
   * - lg: Large hero for landing pages
   * @default 'lg'
   */
  size?: HeroSize;

  /**
   * Hero layout mode
   * - 'contained': Default with container padding
   * - 'fullscreen': 100vh height, vertically centered, edge-to-edge width
   * - 'card': Inset with margins and border radius
   * @default 'contained'
   */
  layout?: HeroLayout;

  /**
   * Hero visual variant
   * - 'default': Standard hero with optional side media
   * - 'background': Full-width background image with content overlay
   * @default 'default'
   */
  variant?: HeroVariant;

  /**
   * Background image URL (only applies when variant='background')
   */
  backgroundImage?: string;

  /**
   * Background overlay opacity (0-1). Only applies when variant='background'.
   * @default 0.6
   */
  backgroundOverlay?: number;

  /**
   * Add elevation (shadow) to card layout.
   * Only applies when layout='card'.
   * @default false
   */
  elevated?: boolean;

  /**
   * Full viewport height
   * @deprecated Use layout="fullscreen" instead
   * @default false
   */
  fullHeight?: boolean;

  /**
   * Vertical padding of the Hero section.
   * Hero is designed for landing pages where generous padding (128px) is the standard.
   * @default 'xl' (128px) — all layouts default to generous spacing
   * @example
   * - `<Hero />` → 128px padding (standard)
   * - `<Hero spacing="none" />` → 0px padding (if you want to override)
   * - `<Hero spacing="md" />` → 64px padding (custom spacing)
   */
  spacing?: SectionSpacing;
}
