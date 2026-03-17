/**
 * Container Component Types
 *
 * Type definitions for the Orion Container section component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Container size variants
 */
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Container component props
 *
 * @example
 * ```tsx
 * <Container size="lg">
 *   <Content />
 * </Container>
 * ```
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width variant
   * - sm: 640px (small content, text-focused)
   * - md: 768px (medium content)
   * - lg: 1024px (standard layouts)
   * - xl: 1280px (wide layouts)
   * - full: 100% (full width)
   * @default 'lg'
   */
  size?: ContainerSize;

  /**
   * Center the container horizontally
   * @default true
   */
  centered?: boolean;

  /**
   * Add horizontal padding
   * @default true
   */
  padded?: boolean;

  /**
   * Container content
   */
  children?: ReactNode;
}
