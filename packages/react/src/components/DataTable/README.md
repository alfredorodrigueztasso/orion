# DataTable

A full-featured data table for SaaS dashboards with sorting, filtering, pagination, row selection, and bulk actions.

## When to Use

| Scenario | Use DataTable |
|----------|---------------|
| Data management dashboards | ✅ Yes - full CRUD table with actions |
| Sortable/filterable data lists | ✅ Yes - built-in sort, search, filters |
| Paginated server-side data | ✅ Yes - controlled pagination |
| Simple key-value display | ❌ No - use Table instead |
| Card-based data views | ❌ No - use Card with List instead |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | DataTableColumn[] | — | Column definitions |
| data | T[] | — | Data rows |
| rowKey | keyof T \| function | 'id' | Row key accessor |
| searchable | boolean | false | Enable search |
| searchPlaceholder | string | — | Search input placeholder |
| searchValue | string | — | Controlled search value |
| onSearchChange | (value: string) => void | — | Search change handler |
| filters | DataTableFilter[] | — | Filter definitions |
| filterValues | Record<string, unknown> | — | Active filter values |
| onFilterChange | (key, value) => void | — | Filter change handler |
| pagination | DataTablePagination | — | Pagination config |
| onPaginationChange | (pagination) => void | — | Pagination change handler |
| selectable | boolean | false | Enable row selection |
| selectedKeys | Key[] | — | Selected row keys |
| onSelectionChange | (keys: Key[]) => void | — | Selection change handler |
| bulkActions | DataTableBulkAction[] | — | Bulk actions for selected rows |
| rowActions | DataTableRowAction[] | — | Per-row action menu |
| sort | DataTableSort | — | Current sort state |
| onSortChange | (sort) => void | — | Sort change handler |
| loading | boolean | false | Loading state |
| striped | boolean | false | Striped rows |
| hoverable | boolean | true | Hoverable rows |
| compact | boolean | false | Compact row height |
| stickyHeader | boolean | false | Sticky header |
| maxHeight | string | — | Max height with scrolling |
| onRowClick | (row, index) => void | — | Row click handler |
| emptyState | DataTableEmptyState | — | Empty state config |
| toolbar | ReactNode | — | Custom toolbar content |

### DataTableColumn

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| key | string | — | Unique column key |
| header | string | — | Column header label |
| width | string | — | Column width (CSS value) |
| align | 'left' \| 'center' \| 'right' | 'left' | Text alignment |
| sortable | boolean | false | Whether column is sortable |
| render | (value, row, index) => ReactNode | — | Custom cell renderer |
| sticky | 'left' \| 'right' | — | Sticky column position |
| hideOnMobile | boolean | false | Hide on mobile |

## Examples

### Basic Table

```tsx
import { DataTable } from "@orion-ds/react";

<DataTable
  columns={[
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
  ]}
  data={users}
  searchable
  searchPlaceholder="Search users..."
/>
```

### With Pagination and Selection

```tsx
<DataTable
  columns={columns}
  data={users}
  selectable
  selectedKeys={selected}
  onSelectionChange={setSelected}
  bulkActions={[
    { key: "delete", label: "Delete", variant: "danger", onClick: handleBulkDelete },
  ]}
  pagination={{ page: 1, pageSize: 10, total: 100 }}
  onPaginationChange={handlePageChange}
  sort={sort}
  onSortChange={setSort}
/>
```

## Accessibility

- Sortable headers use `aria-sort` attributes
- Row selection uses checkbox pattern with `aria-checked`
- Pagination announces page changes
- Loading state uses `aria-busy`

## Token Usage

- `--surface-base` — Table background
- `--surface-subtle` — Striped row and header background
- `--border-subtle` — Row borders
- `--text-primary` — Cell text
- `--text-secondary` — Header text
- `--interactive-primary` — Selected row highlight
- `--spacing-3` — Cell padding (compact)
- `--spacing-4` — Cell padding (default)
