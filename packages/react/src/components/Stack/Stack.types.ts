/**
 * Stack Component Types
 *
 * Type definitions for the Orion Stack layout component.
 */

import type { HTMLAttributes, ElementType, PropsWithChildren } from "react";

/**
 * Stack gap (spacing between children)
 * Maps to design system spacing tokens
 */
export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Stack direction
 */
export type StackDirection = "horizontal" | "vertical";

/**
 * Flex align-items values
 */
export type StackAlign =
  | "flex-start"
  | "center"
  | "flex-end"
  | "stretch"
  | "baseline";

/**
 * Flex justify-content values
 */
export type StackJustify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

/**
 * Flex wrap values
 */
export type StackWrap = "nowrap" | "wrap" | "wrap-reverse";

/**
 * Stack component props
 *
 * @example
 * ```tsx
 * // Vertical stack with medium gap (default)
 * <Stack gap="md">
 *   <Card />
 *   <Card />
 *   <Card />
 * </Stack>
 *
 * // Horizontal stack
 * <Stack direction="horizontal" gap="sm" align="center">
 *   <Button>Action</Button>
 *   <Button>Cancel</Button>
 * </Stack>
 *
 * // Custom element type
 * <Stack as="form" direction="vertical" gap="lg">
 *   <Field label="Name" />
 *   <Field label="Email" />
 *   <Button type="submit">Submit</Button>
 * </Stack>
 * ```
 */
export interface StackProps extends PropsWithChildren<
  HTMLAttributes<HTMLElement>
> {
  /**
   * Stack direction
   * @default 'vertical'
   */
  direction?: StackDirection;

  /**
   * Gap between children (uses design system spacing tokens)
   * @default 'md'
   */
  gap?: StackGap;

  /**
   * Align items (flex align-items)
   * @default 'stretch'
   */
  align?: StackAlign;

  /**
   * Justify content (flex justify-content)
   * @default 'flex-start'
   */
  justify?: StackJustify;

  /**
   * Flex wrap behavior
   * @default 'nowrap'
   */
  wrap?: StackWrap;

  /**
   * Custom element type to render as
   * @default 'div'
   */
  as?: ElementType;
}
