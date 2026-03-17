/**
 * Table Component Types
 *
 * Type definitions for the Orion Table component.
 */

import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";

/**
 * Table sizes
 */
export type TableSize = "sm" | "md" | "lg";

/**
 * Sort direction
 */
export type SortDirection = "asc" | "desc" | null;

/**
 * Column definition
 */
export interface TableColumn<T = Record<string, unknown>> {
  /**
   * Column unique key (used as accessor for data)
   */
  key: string;

  /**
   * Column header label
   */
  header: ReactNode;

  /**
   * Custom cell renderer
   * @param row - Row data
   * @param rowIndex - Row index
   * @returns Rendered cell content
   */
  cell?: (row: T, rowIndex: number) => ReactNode;

  /**
   * Column width (CSS value)
   */
  width?: string;

  /**
   * Enable sorting for this column
   * @default false
   */
  sortable?: boolean;

  /**
   * Align cell content
   * @default 'left'
   */
  align?: "left" | "center" | "right";

  /**
   * Additional props for header cell
   */
  headerProps?: ThHTMLAttributes<HTMLTableCellElement>;

  /**
   * Additional props for data cells
   */
  cellProps?: TdHTMLAttributes<HTMLTableCellElement>;
}

/**
 * Table component props
 *
 * @example
 * ```tsx
 * const columns: TableColumn<User>[] = [
 *   { key: 'name', header: 'Name', sortable: true },
 *   { key: 'email', header: 'Email' },
 *   {
 *     key: 'status',
 *     header: 'Status',
 *     cell: (user) => <Badge>{user.status}</Badge>
 *   }
 * ];
 *
 * <Table
 *   columns={columns}
 *   data={users}
 *   onRowClick={(user) => console.log(user)}
 * />
 * ```
 */
export interface TableProps<T = Record<string, unknown>> {
  /**
   * Column definitions
   */
  columns: TableColumn<T>[];

  /**
   * Table data
   */
  data: T[];

  /**
   * Table size
   * @default 'md'
   */
  size?: TableSize;

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
   * Show borders
   * @default false
   */
  bordered?: boolean;

  /**
   * Remove container border (for integration inside Cards)
   * @default false
   */
  borderless?: boolean;

  /**
   * Table caption
   */
  caption?: ReactNode;

  /**
   * Empty state message
   */
  emptyMessage?: ReactNode;

  /**
   * Row click handler
   */
  onRowClick?: (row: T, rowIndex: number) => void;

  /**
   * Sort change handler
   */
  onSortChange?: (columnKey: string, direction: SortDirection) => void;

  /**
   * Current sort state (for controlled sorting)
   */
  sortState?: {
    columnKey: string;
    direction: SortDirection;
  };

  /**
   * Row key extractor (for React keys)
   * @default (row, index) => index
   */
  getRowKey?: (row: T, index: number) => string | number;

  /**
   * Additional CSS class
   */
  className?: string;
}
