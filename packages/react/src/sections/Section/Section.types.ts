/**
 * Section Component Types
 *
 * Type definitions for the Orion Section wrapper component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Section spacing variants (vertical padding)
 */
export type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

/**
 * Section background variants
 */
export type SectionBackground = "base" | "subtle" | "sunken" | "brand" | "none";

/**
 * Section component props
 *
 * @example
 * ```tsx
 * <Section spacing="lg" background="subtle">
 *   <Container>
 *     <Content />
 *   </Container>
 * </Section>
 * ```
 */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * HTML element to render
   * @default 'section'
   */
  as?: "section" | "div" | "article" | "aside" | "header" | "footer";

  /**
   * Vertical spacing (padding)
   * - none: 0
   * - sm: spacing-8 (32px)
   * - md: spacing-16 (64px)
   * - lg: spacing-24 (96px)
   * - xl: spacing-32 (128px)
   * @default 'lg'
   */
  spacing?: SectionSpacing;

  /**
   * Background style
   * - base: surface-base (main background)
   * - subtle: surface-subtle (gray background)
   * - sunken: surface-sunken (recessed)
   * - brand: interactive-primary (brand color)
   * - none: transparent
   * @default 'none'
   */
  background?: SectionBackground;

  /**
   * Add top border
   * @default false
   */
  borderTop?: boolean;

  /**
   * Add bottom border
   * @default false
   */
  borderBottom?: boolean;

  /**
   * Section content
   */
  children?: ReactNode;
}
