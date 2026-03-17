/**
 * Pagination Component - Page navigation controls.
 *
 * @example
 * ```tsx
 * import { Pagination } from '@orion-ds/react';
 *
 * <Pagination
 *   total={100}
 *   current={1}
 *   pageSize={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 */
export { Pagination } from "./Pagination";
export type { PaginationProps, PaginationSize } from "./Pagination.types";
