"use client";

/**
 * Pagination Component
 *
 * Navigation control for paginated content.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   onPageChange={setCurrentPage}
 * />
 * ```
 */

import { forwardRef, useMemo } from "react";
import type { PaginationProps } from "./Pagination.types";
import styles from "./Pagination.module.css";

/**
 * Generate array of page numbers to display
 */
const generatePages = (
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): (number | "ellipsis")[] => {
  const totalNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 ellipses

  // If we can show all pages
  if (totalPages <= totalNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;

  const pages: (number | "ellipsis")[] = [];

  // First page
  pages.push(1);

  // Left ellipsis
  if (showLeftEllipsis) {
    pages.push("ellipsis");
  } else if (leftSiblingIndex === 2) {
    pages.push(2);
  }

  // Middle pages
  for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
    if (i !== 1 && i !== totalPages) {
      pages.push(i);
    }
  }

  // Right ellipsis
  if (showRightEllipsis) {
    pages.push("ellipsis");
  } else if (rightSiblingIndex === totalPages - 1) {
    pages.push(totalPages - 1);
  }

  // Last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      siblingCount = 1,
      showFirstLast = true,
      showPrevNext = true,
      size = "md",
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const pages = useMemo(
      () => generatePages(currentPage, totalPages, siblingCount),
      [currentPage, totalPages, siblingCount],
    );

    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    const handlePageChange = (page: number) => {
      if (
        !disabled &&
        page >= 1 &&
        page <= totalPages &&
        page !== currentPage
      ) {
        onPageChange(page);
      }
    };

    const classNames = [
      styles.pagination,
      styles[size],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (totalPages <= 0) {
      return null;
    }

    return (
      <nav ref={ref} className={classNames} aria-label="Pagination" {...rest}>
        <ul className={styles.list}>
          {/* First page button */}
          {showFirstLast && (
            <li>
              <button
                type="button"
                className={styles.button}
                onClick={() => handlePageChange(1)}
                disabled={!canGoPrev || disabled}
                aria-label="Go to first page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11 12L7 8l4-4M5 12V4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          )}

          {/* Previous button */}
          {showPrevNext && (
            <li>
              <button
                type="button"
                className={styles.button}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!canGoPrev || disabled}
                aria-label="Go to previous page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12L6 8l4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          )}

          {/* Page numbers */}
          {pages.map((page, index) => (
            <li key={page === "ellipsis" ? `ellipsis-${index}` : page}>
              {page === "ellipsis" ? (
                <span className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  type="button"
                  className={`${styles.button} ${styles.pageButton} ${
                    page === currentPage ? styles.active : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                  disabled={disabled}
                  aria-label={`Go to page ${page}`}
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next button */}
          {showPrevNext && (
            <li>
              <button
                type="button"
                className={styles.button}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!canGoNext || disabled}
                aria-label="Go to next page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          )}

          {/* Last page button */}
          {showFirstLast && (
            <li>
              <button
                type="button"
                className={styles.button}
                onClick={() => handlePageChange(totalPages)}
                disabled={!canGoNext || disabled}
                aria-label="Go to last page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M5 12l4-4-4-4M11 12V4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </li>
          )}
        </ul>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
