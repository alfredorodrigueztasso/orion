/**
 * Box Component Types
 *
 * Type definitions for the Orion Box layout component.
 */

import type { ElementType, HTMLAttributes, PropsWithChildren } from "react";

/**
 * Spacing scale for padding
 * Maps to design system spacing tokens (--spacing-0, --spacing-1, etc.)
 */
export type SpacingScale =
  | 0
  | "px"
  | "05"
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 16
  | 20
  | 24
  | 32;

/**
 * Semantic surface colors
 * Uses design system surface tokens for backgrounds
 */
export type SemanticSurface =
  | "surface-base"
  | "surface-subtle"
  | "surface-layer"
  | "surface-sunken"
  | "surface-glass";

/**
 * Border radius options
 * Maps to design system radius tokens
 */
export type Radius = "sm" | "control" | "container" | "full";

/**
 * Box component props
 *
 * A flexible layout primitive that handles padding and background styling using design tokens.
 * Supports polymorphic rendering with the `as` prop.
 *
 * @example
 * ```tsx
 * // Basic box with padding
 * <Box padding={4}>Content</Box>
 *
 * // With background and radius
 * <Box padding={4} bg="surface-layer" radius="control">
 *   Styled content
 * </Box>
 *
 * // Directional padding
 * <Box paddingX={4} paddingY={2}>
 *   Horizontal padding: 16px, Vertical padding: 8px
 * </Box>
 *
 * // Custom element type
 * <Box as="section" padding={4} bg="surface-subtle">
 *   Section content
 * </Box>
 * ```
 */
export interface BoxProps extends PropsWithChildren<
  HTMLAttributes<HTMLElement>
> {
  /**
   * Uniform padding on all sides
   * Uses inline-style for clean CSS handling
   */
  padding?: SpacingScale;

  /**
   * Horizontal padding (left and right)
   * Priority: paddingLeft/paddingRight > paddingX > padding
   */
  paddingX?: SpacingScale;

  /**
   * Vertical padding (top and bottom)
   * Priority: paddingTop/paddingBottom > paddingY > padding
   */
  paddingY?: SpacingScale;

  /**
   * Top padding only
   * Highest priority in vertical axis
   */
  paddingTop?: SpacingScale;

  /**
   * Bottom padding only
   * Highest priority in vertical axis
   */
  paddingBottom?: SpacingScale;

  /**
   * Left padding only
   * Highest priority in horizontal axis
   */
  paddingLeft?: SpacingScale;

  /**
   * Right padding only
   * Highest priority in horizontal axis
   */
  paddingRight?: SpacingScale;

  /**
   * Background surface color
   * Uses semantic surface tokens from design system
   * @default undefined
   */
  bg?: SemanticSurface;

  /**
   * Border radius
   * Maps to design system radius tokens
   * @default undefined
   */
  radius?: Radius;

  /**
   * Custom element type to render as
   * @default 'div'
   */
  as?: ElementType;
}
