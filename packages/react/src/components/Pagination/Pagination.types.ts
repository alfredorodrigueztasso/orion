/**
 * Pagination Component Types
 *
 * Type definitions for the Orion Pagination component.
 */

import type { HTMLAttributes } from "react";

/**
 * Pagination sizes
 */
export type PaginationSize = "sm" | "md" | "lg";

/**
 * Pagination component props
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setPage(page)}
 * />
 * ```
 */
export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "onChange"
> {
  /**
   * Current active page (1-indexed)
   */
  currentPage: number;

  /**
   * Total number of pages
   */
  totalPages: number;

  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;

  /**
   * Number of sibling pages to show on each side of current page
   * @default 1
   */
  siblingCount?: number;

  /**
   * Whether to show first/last page buttons
   * @default true
   */
  showFirstLast?: boolean;

  /**
   * Whether to show previous/next buttons
   * @default true
   */
  showPrevNext?: boolean;

  /**
   * Size variant
   * @default 'md'
   */
  size?: PaginationSize;

  /**
   * Whether the pagination is disabled
   * @default false
   */
  disabled?: boolean;
}
