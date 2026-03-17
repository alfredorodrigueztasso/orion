/**
 * DataTable Component Types
 *
 * Type definitions for the Orion DataTable section component.
 * Designed for Product Mode (SaaS dashboards) data management.
 */

import type { HTMLAttributes, ReactNode, Key } from "react";

/**
 * Column definition for the table
 */
export interface DataTableColumn<T = unknown> {
  /**
   * Unique column key
   */
  key: string;

  /**
   * Column header label
   */
  header: string;

  /**
   * Column width (CSS value)
   */
  width?: string;

  /**
   * Minimum column width
   */
  minWidth?: string;

  /**
   * Text alignment
   * @default 'left'
   */
  align?: "left" | "center" | "right";

  /**
   * Whether column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Custom cell renderer
   */
  render?: (value: unknown, row: T, rowIndex: number) => ReactNode;

  /**
   * Whether column is sticky
   */
  sticky?: "left" | "right";

  /**
   * Hide column on mobile
   * @default false
   */
  hideOnMobile?: boolean;
}

/**
 * Sort state
 */
export interface DataTableSort {
  /**
   * Column key being sorted
   */
  key: string;

  /**
   * Sort direction
   */
  direction: "asc" | "desc";
}

/**
 * Pagination state
 */
export interface DataTablePagination {
  /**
   * Current page (1-indexed)
   */
  page: number;

  /**
   * Items per page
   */
  pageSize: number;

  /**
   * Total number of items
   */
  total: number;

  /**
   * Available page size options
   * @default [10, 25, 50, 100]
   */
  pageSizeOptions?: number[];
}

/**
 * Filter definition
 */
export interface DataTableFilter {
  /**
   * Unique filter key
   */
  key: string;

  /**
   * Filter label
   */
  label: string;

  /**
   * Filter type
   */
  type: "text" | "select" | "date" | "dateRange";

  /**
   * Options for select type
   */
  options?: { value: string; label: string }[];

  /**
   * Placeholder text
   */
  placeholder?: string;
}

/**
 * Bulk action definition
 */
export interface DataTableBulkAction {
  /**
   * Action key
   */
  key: string;

  /**
   * Action label
   */
  label: string;

  /**
   * Action icon
   */
  icon?: ReactNode;

  /**
   * Action variant for styling
   */
  variant?: "default" | "danger";

  /**
   * Action callback
   */
  onClick: (selectedIds: Key[]) => void;
}

/**
 * Row action definition
 */
export interface DataTableRowAction<T = unknown> {
  /**
   * Action key
   */
  key: string;

  /**
   * Action label
   */
  label: string;

  /**
   * Action icon
   */
  icon?: ReactNode;

  /**
   * Action variant
   */
  variant?: "default" | "danger";

  /**
   * Action callback
   */
  onClick: (row: T) => void;

  /**
   * Show condition
   */
  show?: (row: T) => boolean;
}

/**
 * Empty state configuration
 */
export interface DataTableEmptyState {
  /**
   * Icon element
   */
  icon?: ReactNode;

  /**
   * Title text
   */
  title: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Action element
   */
  action?: ReactNode;
}

/**
 * DataTable section props
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email' },
 *     { key: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> }
 *   ]}
 *   data={users}
 *   searchable
 *   selectable
 *   pagination={{ page: 1, pageSize: 10, total: 100 }}
 * />
 * ```
 */
export interface DataTableProps<T = Record<string, unknown>> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Column definitions
   */
  columns: DataTableColumn<T>[];

  /**
   * Data rows
   */
  data: T[];

  /**
   * Row key accessor (defaults to 'id')
   */
  rowKey?: keyof T | ((row: T, index: number) => Key);

  /**
   * Enable search functionality
   * @default false
   */
  searchable?: boolean;

  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;

  /**
   * Current search value (controlled)
   */
  searchValue?: string;

  /**
   * Search change handler
   */
  onSearchChange?: (value: string) => void;

  /**
   * Filter definitions
   */
  filters?: DataTableFilter[];

  /**
   * Active filter values
   */
  filterValues?: Record<string, unknown>;

  /**
   * Filter change handler
   */
  onFilterChange?: (key: string, value: unknown) => void;

  /**
   * Pagination configuration
   */
  pagination?: DataTablePagination;

  /**
   * Pagination change handler
   */
  onPaginationChange?: (
    pagination: Pick<DataTablePagination, "page" | "pageSize">,
  ) => void;

  /**
   * Enable row selection
   * @default false
   */
  selectable?: boolean;

  /**
   * Selected row keys
   */
  selectedKeys?: Key[];

  /**
   * Selection change handler
   */
  onSelectionChange?: (keys: Key[]) => void;

  /**
   * Bulk actions for selected rows
   */
  bulkActions?: DataTableBulkAction[];

  /**
   * Per-row actions
   */
  rowActions?: DataTableRowAction<T>[];

  /**
   * Current sort state
   */
  sort?: DataTableSort;

  /**
   * Sort change handler
   */
  onSortChange?: (sort: DataTableSort | undefined) => void;

  /**
   * Empty state configuration
   */
  emptyState?: DataTableEmptyState;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Striped rows
   * @default false
   */
  striped?: boolean;

  /**
   * Hoverable rows
   * @default true
   */
  hoverable?: boolean;

  /**
   * Compact mode
   * @default false
   */
  compact?: boolean;

  /**
   * Sticky header
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Table max height (enables scrolling)
   */
  maxHeight?: string;

  /**
   * Row click handler
   */
  onRowClick?: (row: T, index: number) => void;

  /**
   * Toolbar content (rendered before table)
   */
  toolbar?: ReactNode;
}

/**
 * DataTable.Toolbar sub-component props
 */
export interface DataTableToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Left-aligned content
   */
  left?: ReactNode;

  /**
   * Right-aligned content
   */
  right?: ReactNode;

  /**
   * Children content
   */
  children?: ReactNode;
}

/**
 * DataTable.Pagination sub-component props
 */
export interface DataTablePaginationProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Pagination state
   */
  pagination: DataTablePagination;

  /**
   * Change handler
   */
  onChange: (
    pagination: Pick<DataTablePagination, "page" | "pageSize">,
  ) => void;
}

/**
 * DataTable.EmptyState sub-component props
 */
export interface DataTableEmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Empty state configuration
   */
  state: DataTableEmptyState;
}
