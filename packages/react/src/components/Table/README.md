# Table

Data display table with sorting, customizable columns, and interactive rows.

## Props

| Prop           | Type                                              | Default               | Description           |
| -------------- | ------------------------------------------------- | --------------------- | --------------------- |
| `columns`      | `TableColumn<T>[]`                                | **required**          | Column definitions    |
| `data`         | `T[]`                                             | **required**          | Table data            |
| `size`         | `'sm' \| 'md' \| 'lg'`                            | `'md'`                | Table size            |
| `striped`      | `boolean`                                         | `false`               | Striped rows          |
| `hoverable`    | `boolean`                                         | `true`                | Hoverable rows        |
| `bordered`     | `boolean`                                         | `false`               | Show borders          |
| `caption`      | `ReactNode`                                       | -                     | Table caption         |
| `emptyMessage` | `ReactNode`                                       | `'No data available'` | Empty state message   |
| `onRowClick`   | `(row: T, index: number) => void`                 | -                     | Row click handler     |
| `onSortChange` | `(key: string, direction: SortDirection) => void` | -                     | Sort change handler   |
| `sortState`    | `{ columnKey: string; direction: SortDirection }` | -                     | Controlled sort state |
| `getRowKey`    | `(row: T, index: number) => string \| number`     | `(_, i) => i`         | Row key extractor     |

### TableColumn<T>

```ts
interface TableColumn<T> {
  key: string; // Column key (data accessor)
  header: ReactNode; // Column header label
  cell?: (row: T, index: number) => ReactNode; // Custom cell renderer
  width?: string; // Column width (CSS)
  sortable?: boolean; // Enable sorting
  align?: "left" | "center" | "right"; // Cell alignment
  headerProps?: ThHTMLAttributes; // Header cell props
  cellProps?: TdHTMLAttributes; // Data cell props
}
```

### SortDirection

```ts
type SortDirection = "asc" | "desc" | null;
```

## Usage

### Basic

```tsx
import { Table } from "@orion/react";
import type { TableColumn } from "@orion/react";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: TableColumn<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
];

const users: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

<Table columns={columns} data={users} />;
```

### With Custom Cell Renderer

```tsx
import { Badge } from "@orion/react";

const columns: TableColumn<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  {
    key: "status",
    header: "Status",
    align: "center",
    cell: (user) => (
      <Badge variant={user.status === "active" ? "success" : "neutral"}>
        {user.status}
      </Badge>
    ),
  },
];
```

### With Sorting

```tsx
import { useState } from "react";

function Example() {
  const [sortState, setSortState] = useState<{
    columnKey: string;
    direction: SortDirection;
  } | null>(null);

  const sortedData = useMemo(() => {
    if (!sortState?.direction) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortState.columnKey];
      const bVal = b[sortState.columnKey];
      const modifier = sortState.direction === "asc" ? 1 : -1;
      return aVal > bVal ? modifier : -modifier;
    });
  }, [data, sortState]);

  return (
    <Table
      columns={columns}
      data={sortedData}
      sortState={sortState}
      onSortChange={(columnKey, direction) =>
        setSortState(direction ? { columnKey, direction } : null)
      }
    />
  );
}
```

### With Row Click

```tsx
<Table
  columns={columns}
  data={users}
  onRowClick={(user) => navigate(`/users/${user.id}`)}
/>
```

### Striped and Bordered

```tsx
<Table columns={columns} data={users} striped bordered />
```

### With Caption

```tsx
<Table
  columns={columns}
  data={users}
  caption="User directory - Last updated: Today"
/>
```

### Custom Row Key

```tsx
<Table columns={columns} data={users} getRowKey={(user) => user.id} />
```

## Tokens Used

- `--surface-base` - Table background
- `--surface-subtle` - Striped row background
- `--border-subtle` - Border color
- `--text-primary` - Cell text
- `--text-secondary` - Header text
- `--spacing-3`, `--spacing-4` - Cell padding
- `--interactive-hover` - Row hover background

## Accessibility

- Proper `<table>`, `<thead>`, `<tbody>` structure
- Sortable columns have `aria-sort` attribute
- Sortable headers have `role="button"` and `tabIndex`
- Caption linked to table for screen readers
- Empty state announced properly
