/**
 * Card Component Types
 *
 * Type definitions for the Orion Card component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Card visual variants
 *
 * @deprecated 'outlined' variant is deprecated. Use 'base' instead. Will be removed in the next major version.
 */
export type CardVariant =
  | "base"
  | "glass"
  | "elevated"
  | "outlined"
  | "image"
  | "inverse";

/**
 * Image card content position
 */
export type ImageCardPosition = "top" | "center" | "bottom";

/**
 * Card component props
 *
 * @example
 * ```tsx
 * <Card variant="base">
 *   <Card.Header>Title</Card.Header>
 *   <Card.Body>Content</Card.Body>
 *   <Card.Footer>Footer</Card.Footer>
 * </Card>
 * ```
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant
   * @default 'base'
   */
  variant?: CardVariant;

  /**
   * Interactive card (adds hover effect)
   * @default false
   */
  interactive?: boolean;

  /**
   * Background image URL (only for 'image' variant)
   */
  imageUrl?: string;

  /**
   * Content position for image variant
   * @default 'bottom'
   */
  imagePosition?: ImageCardPosition;

  /**
   * Aspect ratio for image card (e.g., '16/9', '4/3', '1/1')
   * @default '16/9'
   */
  aspectRatio?: string;

  /**
   * Card content
   */
  children?: ReactNode;
}

/**
 * Card Header props
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Header content
   */
  children?: ReactNode;
}

/**
 * Card Body props
 */
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Body content
   */
  children?: ReactNode;
}

/**
 * Card Footer props
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Footer content
   */
  children?: ReactNode;
}

/**
 * Image Card Content wrapper props
 */
export interface ImageContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Image Card Title props
 */
export interface ImageTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: ReactNode;
}

/**
 * Image Card Description props
 */
export interface ImageDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

/**
 * Image Card Meta props
 */
export interface ImageMetaProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
}
