"use client";

/**
 * DataTable Component
 *
 * A data table for SaaS dashboards with sorting, pagination, filtering, and selection.
 * Optimized for Product Mode with efficient data display and minimal visual noise.
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

import { forwardRef, useState, useMemo, useCallback, type Key } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Inbox,
} from "lucide-react";
import type {
  DataTableProps,
  DataTableToolbarProps,
  DataTablePaginationProps,
  DataTableEmptyStateProps,
  DataTableSort,
  DataTableColumn,
} from "./DataTable.types";
import styles from "./DataTable.module.css";

// Toolbar sub-component
const DataTableToolbar = forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ left, right, children, className, ...rest }, ref) => (
    <div ref={ref} className={`${styles.toolbar} ${className || ""}`} {...rest}>
      {left && <div className={styles.toolbarLeft}>{left}</div>}
      {children}
      {right && <div className={styles.toolbarRight}>{right}</div>}
    </div>
  ),
);

DataTableToolbar.displayName = "DataTable.Toolbar";

// Pagination sub-component
const DataTablePaginationComponent = forwardRef<
  HTMLDivElement,
  DataTablePaginationProps
>(({ pagination, onChange, className, ...rest }, ref) => {
  const {
    page,
    pageSize,
    total,
    pageSizeOptions = [10, 25, 50, 100],
  } = pagination;
  const totalPages = Math.ceil(total / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onChange({ page: newPage, pageSize });
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ page: 1, pageSize: Number(e.target.value) });
  };

  return (
    <div
      ref={ref}
      className={`${styles.pagination} ${className || ""}`}
      {...rest}
    >
      <div className={styles.paginationInfo}>
        <span className={styles.paginationText}>
          {startItem}-{endItem} of {total}
        </span>
        <select
          className={styles.pageSizeSelect}
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>

      <div className={styles.paginationControls}>
        <button
          type="button"
          className={styles.paginationButton}
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        <span className={styles.paginationPages}>
          {page} / {totalPages}
        </span>
        <button
          type="button"
          className={styles.paginationButton}
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
});

DataTablePaginationComponent.displayName = "DataTable.Pagination";

// Empty state sub-component
const DataTableEmptyStateComponent = forwardRef<
  HTMLDivElement,
  DataTableEmptyStateProps
>(({ state, className, ...rest }, ref) => (
  <div
    ref={ref}
    className={`${styles.emptyState} ${className || ""}`}
    {...rest}
  >
    {state.icon && <div className={styles.emptyIcon}>{state.icon}</div>}
    <h3 className={styles.emptyTitle}>{state.title}</h3>
    {state.description && (
      <p className={styles.emptyDescription}>{state.description}</p>
    )}
    {state.action && <div className={styles.emptyAction}>{state.action}</div>}
  </div>
));

DataTableEmptyStateComponent.displayName = "DataTable.EmptyState";

// Main DataTable component
function DataTableInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    rowKey = "id" as keyof T,
    searchable = false,
    searchPlaceholder = "Search...",
    searchValue: controlledSearchValue,
    onSearchChange,
    pagination,
    onPaginationChange,
    selectable = false,
    selectedKeys: controlledSelectedKeys,
    onSelectionChange,
    bulkActions,
    rowActions,
    sort: controlledSort,
    onSortChange,
    emptyState,
    loading = false,
    striped = false,
    hoverable = true,
    compact = false,
    stickyHeader = false,
    maxHeight,
    onRowClick,
    toolbar,
    className,
    ...rest
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  // Internal state for uncontrolled mode
  const [internalSearchValue, setInternalSearchValue] = useState("");
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Key[]>([]);
  const [internalSort, setInternalSort] = useState<DataTableSort | undefined>();
  const [actionMenuOpen, setActionMenuOpen] = useState<Key | null>(null);

  // Use controlled or internal state
  const searchValue = controlledSearchValue ?? internalSearchValue;
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const sort = controlledSort ?? internalSort;

  // Get row key
  const getRowKey = useCallback(
    (row: T, index: number): Key => {
      if (typeof rowKey === "function") {
        return rowKey(row, index);
      }
      return (row[rowKey] as Key) ?? index;
    },
    [rowKey],
  );

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearchValue(value);
    }
  };

  // Handle sort
  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) return;

    let newSort: DataTableSort | undefined;
    if (sort?.key === column.key) {
      if (sort.direction === "asc") {
        newSort = { key: column.key, direction: "desc" };
      } else {
        newSort = undefined;
      }
    } else {
      newSort = { key: column.key, direction: "asc" };
    }

    if (onSortChange) {
      onSortChange(newSort);
    } else {
      setInternalSort(newSort);
    }
  };

  // Handle selection
  const handleSelectAll = () => {
    const allKeys = data.map((row, index) => getRowKey(row, index));
    const newSelection = selectedKeys.length === data.length ? [] : allKeys;
    if (onSelectionChange) {
      onSelectionChange(newSelection);
    } else {
      setInternalSelectedKeys(newSelection);
    }
  };

  const handleSelectRow = (key: Key) => {
    const newSelection = selectedKeys.includes(key)
      ? selectedKeys.filter((k) => k !== key)
      : [...selectedKeys, key];
    if (onSelectionChange) {
      onSelectionChange(newSelection as Key[]);
    } else {
      setInternalSelectedKeys(newSelection as Key[]);
    }
  };

  // Filter and sort data (only for uncontrolled search/sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search filter (uncontrolled mode only)
    if (!onSearchChange && searchValue) {
      const lowerSearch = searchValue.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(lowerSearch),
        ),
      );
    }

    // Apply sort (uncontrolled mode only)
    if (!onSortChange && sort) {
      result.sort((a, b) => {
        const aVal = a[sort.key];
        const bVal = b[sort.key];
        const comparison = String(aVal).localeCompare(String(bVal));
        return sort.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchValue, sort, onSearchChange, onSortChange]);

  const classNames = [styles.dataTable, compact && styles.compact, className]
    .filter(Boolean)
    .join(" ");

  const tableClassNames = [
    styles.table,
    striped && styles.striped,
    hoverable && styles.hoverable,
    stickyHeader && styles.stickyHeader,
  ]
    .filter(Boolean)
    .join(" ");

  const isAllSelected = data.length > 0 && selectedKeys.length === data.length;
  const isPartialSelected =
    selectedKeys.length > 0 && selectedKeys.length < data.length;

  const defaultEmptyState = {
    icon: <Inbox size={48} />,
    title: "No data",
    description: "There are no items to display.",
  };

  return (
    <div ref={ref} className={classNames} {...rest}>
      {/* Toolbar */}
      {(searchable || toolbar || (selectable && selectedKeys.length > 0)) && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            {selectable && selectedKeys.length > 0 && bulkActions && (
              <div className={styles.bulkActions}>
                <span className={styles.selectedCount}>
                  {selectedKeys.length} selected
                </span>
                {bulkActions.map((action) => (
                  <button
                    key={action.key}
                    type="button"
                    className={`${styles.bulkAction} ${action.variant === "danger" ? styles.bulkActionDanger : ""}`}
                    onClick={() => action.onClick(selectedKeys)}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}
            {toolbar}
          </div>

          <div className={styles.toolbarRight}>
            {searchable && (
              <div className={styles.searchWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Table container */}
      <div className={styles.tableContainer} style={{ maxHeight: maxHeight }}>
        {loading ? (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
          </div>
        ) : processedData.length === 0 ? (
          <DataTableEmptyStateComponent
            state={emptyState || defaultEmptyState}
          />
        ) : (
          <table className={tableClassNames}>
            <thead className={styles.thead}>
              <tr>
                {selectable && (
                  <th className={`${styles.th} ${styles.checkboxCell}`}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={isAllSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = isPartialSelected;
                      }}
                      onChange={handleSelectAll}
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`${styles.th} ${column.sortable ? styles.sortable : ""} ${column.sticky ? styles[`sticky-${column.sticky}`] : ""} ${column.hideOnMobile ? styles.hideOnMobile : ""}`}
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                      textAlign: column.align,
                    }}
                    onClick={() => handleSort(column)}
                  >
                    <span className={styles.thContent}>
                      {column.header}
                      {column.sortable && (
                        <span className={styles.sortIcon}>
                          {sort?.key === column.key ? (
                            sort.direction === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )
                          ) : (
                            <ChevronUp
                              size={14}
                              className={styles.sortIconInactive}
                            />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
                {rowActions && rowActions.length > 0 && (
                  <th className={`${styles.th} ${styles.actionsCell}`}>
                    <span className="sr-only">Actions</span>
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {processedData.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);
                const isSelected = selectedKeys.includes(key);

                return (
                  <tr
                    key={key}
                    className={`${styles.tr} ${isSelected ? styles.trSelected : ""}`}
                    onClick={(e) => {
                      if (
                        (e.target as HTMLElement).closest(
                          `.${styles.checkbox}`,
                        ) ||
                        (e.target as HTMLElement).closest(
                          `.${styles.actionMenu}`,
                        )
                      ) {
                        return;
                      }
                      onRowClick?.(row, rowIndex);
                    }}
                  >
                    {selectable && (
                      <td className={`${styles.td} ${styles.checkboxCell}`}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={isSelected}
                          onChange={() => handleSelectRow(key)}
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`${styles.td} ${column.sticky ? styles[`sticky-${column.sticky}`] : ""} ${column.hideOnMobile ? styles.hideOnMobile : ""}`}
                        style={{ textAlign: column.align }}
                      >
                        {column.render
                          ? column.render(row[column.key], row, rowIndex)
                          : String(row[column.key] ?? "")}
                      </td>
                    ))}
                    {rowActions && rowActions.length > 0 && (
                      <td className={`${styles.td} ${styles.actionsCell}`}>
                        <div className={styles.actionMenu}>
                          <button
                            type="button"
                            className={styles.actionMenuTrigger}
                            onClick={() =>
                              setActionMenuOpen(
                                actionMenuOpen === key ? null : key,
                              )
                            }
                            aria-label="Row actions"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                          {actionMenuOpen === key && (
                            <div className={styles.actionMenuDropdown}>
                              {rowActions
                                .filter(
                                  (action) => !action.show || action.show(row),
                                )
                                .map((action) => (
                                  <button
                                    key={action.key}
                                    type="button"
                                    className={`${styles.actionMenuItem} ${action.variant === "danger" ? styles.actionMenuItemDanger : ""}`}
                                    onClick={() => {
                                      action.onClick(row);
                                      setActionMenuOpen(null);
                                    }}
                                  >
                                    {action.icon}
                                    <span>{action.label}</span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination && processedData.length > 0 && (
        <DataTablePaginationComponent
          pagination={pagination}
          onChange={onPaginationChange || (() => {})}
        />
      )}
    </div>
  );
}

// Forward ref with generic support
export const DataTable = forwardRef(DataTableInner) as <
  T extends Record<string, unknown>,
>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof DataTableInner>;

// Attach sub-components
(
  DataTable as typeof DataTable & {
    Toolbar: typeof DataTableToolbar;
    Pagination: typeof DataTablePaginationComponent;
    EmptyState: typeof DataTableEmptyStateComponent;
  }
).Toolbar = DataTableToolbar;
(
  DataTable as typeof DataTable & {
    Toolbar: typeof DataTableToolbar;
    Pagination: typeof DataTablePaginationComponent;
    EmptyState: typeof DataTableEmptyStateComponent;
  }
).Pagination = DataTablePaginationComponent;
(
  DataTable as typeof DataTable & {
    Toolbar: typeof DataTableToolbar;
    Pagination: typeof DataTablePaginationComponent;
    EmptyState: typeof DataTableEmptyStateComponent;
  }
).EmptyState = DataTableEmptyStateComponent;
