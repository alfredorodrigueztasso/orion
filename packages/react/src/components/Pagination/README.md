# Pagination

Page navigation controls for paginated content.

## Props

| Prop            | Type                     | Default      | Description                |
| --------------- | ------------------------ | ------------ | -------------------------- |
| `currentPage`   | `number`                 | **required** | Current page (1-indexed)   |
| `totalPages`    | `number`                 | **required** | Total number of pages      |
| `onPageChange`  | `(page: number) => void` | **required** | Page change callback       |
| `siblingCount`  | `number`                 | `1`          | Pages shown beside current |
| `showFirstLast` | `boolean`                | `true`       | Show first/last buttons    |
| `showPrevNext`  | `boolean`                | `true`       | Show prev/next buttons     |
| `size`          | `'sm' \| 'md' \| 'lg'`   | `'md'`       | Button size                |
| `disabled`      | `boolean`                | `false`      | Disable all controls       |

## Usage

### Basic

```tsx
import { Pagination } from "@orion/react";
import { useState } from "react";

function Example() {
  const [page, setPage] = useState(1);

  return (
    <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
  );
}
```

### With Data Table

```tsx
function DataTableWithPagination() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalItems = 95;
  const totalPages = Math.ceil(totalItems / pageSize);

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <Table columns={columns} data={paginatedData} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}
```

### Sibling Count

```tsx
// Show 1 page on each side of current (default)
<Pagination siblingCount={1} ... />
// [1] ... [4] [5] [6] ... [10]

// Show 2 pages on each side
<Pagination siblingCount={2} ... />
// [1] ... [3] [4] [5] [6] [7] ... [10]
```

### Minimal (No First/Last)

```tsx
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  showFirstLast={false}
/>
// Shows: < [4] [5] [6] >
```

### Simple (Prev/Next Only)

```tsx
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  showFirstLast={false}
  siblingCount={0}
/>
// Shows: < Page 5 of 10 >
```

### Sizes

```tsx
<Pagination size="sm" ... />
<Pagination size="md" ... />
<Pagination size="lg" ... />
```

### Disabled

```tsx
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  disabled={isLoading}
/>
```

### With Page Size Selector

```tsx
function PaginationWithSize() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 95;
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
      <Select
        value={pageSize.toString()}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
          setPage(1);
        }}
        options={[
          { value: "10", label: "10 per page" },
          { value: "25", label: "25 per page" },
          { value: "50", label: "50 per page" },
        ]}
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
```

### With URL Sync

```tsx
import { useSearchParams } from "react-router-dom";

function PaginatedList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <Pagination
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
```

## Tokens Used

- `--surface-base` - Button background
- `--surface-subtle` - Hover background
- `--interactive-primary` - Active page
- `--text-primary` - Button text
- `--text-secondary` - Disabled text
- `--border-subtle` - Button borders
- `--spacing-2` - Button padding
- `--radius-control` - Border radius

## Accessibility

- Uses `<nav>` with `aria-label="Pagination"`
- Current page has `aria-current="page"`
- Buttons have descriptive `aria-label`
- Disabled buttons have `aria-disabled`
- Keyboard navigable with Tab
- Ellipsis announced as "more pages"
