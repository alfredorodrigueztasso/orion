"use client";

/**
 * Table Component
 *
 * Data display table with sorting, customizable columns, and interactive rows.
 *
 * @example
 * ```tsx
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 *   status: 'active' | 'inactive';
 * }
 *
 * const columns: TableColumn<User>[] = [
 *   { key: 'name', header: 'Name', sortable: true },
 *   { key: 'email', header: 'Email', sortable: true },
 *   {
 *     key: 'status',
 *     header: 'Status',
 *     cell: (user) => (
 *       <Badge variant={user.status === 'active' ? 'success' : 'neutral'}>
 *         {user.status}
 *       </Badge>
 *     ),
 *     align: 'center'
 *   }
 * ];
 *
 * <Table
 *   columns={columns}
 *   data={users}
 *   striped
 *   hoverable
 *   onRowClick={(user) => navigate(`/users/${user.id}`)}
 * />
 * ```
 */

import { useState, useCallback } from "react";
import type { TableProps, TableColumn, SortDirection } from "./Table.types";
import styles from "./Table.module.css";

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  size = "md",
  striped = false,
  hoverable = true,
  bordered = false,
  borderless = false,
  caption,
  emptyMessage = "No data available",
  onRowClick,
  onSortChange,
  sortState,
  getRowKey = (_, index) => index,
  className,
}: TableProps<T>) => {
  // Internal sort state (for uncontrolled sorting)
  const [internalSortState, setInternalSortState] = useState<{
    columnKey: string;
    direction: SortDirection;
  } | null>(null);

  // Use external sort state if provided, otherwise use internal
  const currentSort = sortState || internalSortState;

  // Handle column header click (sorting)
  const handleSort = useCallback(
    (column: TableColumn<T>) => {
      if (!column.sortable) return;

      const columnKey = column.key;
      let newDirection: SortDirection = "asc";

      // Toggle sort direction
      if (currentSort?.columnKey === columnKey) {
        if (currentSort.direction === "asc") {
          newDirection = "desc";
        } else if (currentSort.direction === "desc") {
          newDirection = null; // Clear sort
        }
      }

      // Update internal state if not controlled
      if (!sortState) {
        setInternalSortState(
          newDirection ? { columnKey, direction: newDirection } : null,
        );
      }

      // Notify parent
      onSortChange?.(columnKey, newDirection);
    },
    [currentSort, sortState, onSortChange],
  );

  // Render sort indicator
  const renderSortIndicator = (column: TableColumn<T>) => {
    if (!column.sortable) return null;

    const isActive = currentSort?.columnKey === column.key;
    const direction = isActive ? currentSort?.direction : null;

    const indicatorClasses = [styles.sortIndicator, isActive && styles.active]
      .filter(Boolean)
      .join(" ");

    if (direction === "asc") {
      return <span className={indicatorClasses}>▲</span>;
    }
    if (direction === "desc") {
      return <span className={indicatorClasses}>▼</span>;
    }

    return <span className={indicatorClasses}>⇅</span>;
  };

  // Render table header
  const renderHeader = () => (
    <thead className={styles.thead}>
      <tr>
        {columns.map((column) => {
          const thClasses = [
            styles.th,
            column.align &&
              styles[
                `align${column.align.charAt(0).toUpperCase()}${column.align.slice(1)}`
              ],
            column.sortable && styles.sortable,
          ]
            .filter(Boolean)
            .join(" ");

          const handleClick = column.sortable
            ? () => handleSort(column)
            : undefined;

          return (
            <th
              key={column.key}
              className={thClasses}
              style={{ width: column.width }}
              onClick={handleClick}
              tabIndex={column.sortable ? 0 : undefined}
              role={column.sortable ? "button" : undefined}
              aria-sort={
                currentSort?.columnKey === column.key
                  ? currentSort.direction === "asc"
                    ? "ascending"
                    : "descending"
                  : undefined
              }
              {...column.headerProps}
            >
              {column.header}
              {renderSortIndicator(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );

  // Render table body
  const renderBody = () => {
    if (data.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className={styles.empty}>
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className={styles.tbody}>
        {data.map((row, rowIndex) => {
          const rowKey = getRowKey(row, rowIndex);

          return (
            <tr
              key={rowKey}
              className={styles.tr}
              onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
            >
              {columns.map((column) => {
                const tdClasses = [
                  styles.td,
                  column.align &&
                    styles[
                      `align${column.align.charAt(0).toUpperCase()}${column.align.slice(1)}`
                    ],
                ]
                  .filter(Boolean)
                  .join(" ");

                // Use custom cell renderer if provided, otherwise use key accessor
                const cellContent = column.cell
                  ? column.cell(row, rowIndex)
                  : row[column.key];

                return (
                  <td
                    key={column.key}
                    className={tdClasses}
                    {...column.cellProps}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  // Container classes
  const containerClasses = [
    styles.container,
    styles[size],
    striped && styles.striped,
    hoverable && styles.hoverable,
    onRowClick && styles.clickable,
    bordered && styles.bordered,
    borderless && styles.borderless,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <table className={styles.table}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        {renderHeader()}
        {renderBody()}
      </table>
    </div>
  );
};

Table.displayName = "Table";
