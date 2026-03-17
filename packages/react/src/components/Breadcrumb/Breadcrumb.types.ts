/**
 * Breadcrumb Component Types
 *
 * Type definitions for the Orion Breadcrumb component.
 */

import type { ReactNode, AnchorHTMLAttributes } from "react";

/**
 * Breadcrumb sizes
 */
export type BreadcrumbSize = "sm" | "md" | "lg";

/**
 * Breadcrumb separator type
 */
export type BreadcrumbSeparator = "chevron" | "slash" | "custom";

/**
 * Individual breadcrumb item
 */
export interface BreadcrumbItem {
  /**
   * Item label
   */
  label: string;

  /**
   * Link href (if undefined, renders as span)
   */
  href?: string;

  /**
   * Optional icon
   */
  icon?: ReactNode;
}

/**
 * Breadcrumb component props
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Laptop' }
 *   ]}
 * />
 *
 * <Breadcrumb
 *   items={items}
 *   separator="slash"
 *   showHomeIcon
 *   size="lg"
 * />
 * ```
 */
export interface BreadcrumbProps {
  /**
   * Breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Separator type
   * @default 'chevron'
   */
  separator?: BreadcrumbSeparator;

  /**
   * Custom separator element
   * (only used if separator is 'custom')
   */
  customSeparator?: ReactNode;

  /**
   * Show home icon for first item
   * @default false
   */
  showHomeIcon?: boolean;

  /**
   * Maximum number of items to display
   * (items in middle will be collapsed if exceeded)
   */
  maxItems?: number;

  /**
   * Breadcrumb size
   * @default 'md'
   */
  size?: BreadcrumbSize;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Link props (applied to all anchor elements)
   */
  linkProps?: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;
}
