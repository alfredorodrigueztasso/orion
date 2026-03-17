# FilterBar Section

> Horizontal filter controls with chips for filtering data in SaaS dashboards.

## Quick Start

```tsx
import { FilterBar } from "@orion/react";

function ProductList() {
  const [filters, setFilters] = useState([]);

  return (
    <>
      <FilterBar
        filters={[
          {
            key: "status",
            label: "Status",
            type: "select",
            options: [
              { value: "active", label: "Active", count: 42 },
              { value: "inactive", label: "Inactive", count: 8 },
            ],
          },
          {
            key: "category",
            label: "Category",
            type: "multi-select",
            options: [
              { value: "electronics", label: "Electronics" },
              { value: "clothing", label: "Clothing" },
            ],
          },
        ]}
        activeFilters={filters}
        onFilterChange={(key, value) => updateFilter(key, value)}
        onFilterRemove={(key) => removeFilter(key)}
      />
      <ProductTable filters={filters} />
    </>
  );
}
```

---

## Features

- **Multiple Filter Types** — Select, multi-select, date, date-range, text
- **Active Filter Chips** — Visual display of applied filters
- **Search Integration** — Optional search input
- **Filter Counts** — Show item counts per option
- **Clear All** — One-click clear all filters
- **Compact Mode** — Dense layout for tight spaces
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface FilterBarProps {
  // Filter Definitions
  filters: FilterDefinition[]; // REQUIRED - Available filters

  // Active State
  activeFilters: ActiveFilter[]; // REQUIRED - Currently applied filters

  // Handlers
  onFilterChange: (key: string, value: FilterValue) => void; // REQUIRED
  onFilterRemove: (key: string) => void; // REQUIRED - Remove single filter
  onClearAll?: () => void; // Clear all filters

  // Search
  searchable?: boolean; // Enable search input - default: false
  searchValue?: string; // Controlled search value
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string; // Search placeholder

  // Display
  showCount?: boolean; // Show filter counts - default: true
  compact?: boolean; // Compact mode - default: false
}

interface FilterDefinition {
  key: string; // Unique filter key
  label: string; // Display label
  type: "select" | "multi-select" | "date" | "date-range" | "text";
  options?: FilterOption[]; // Options for select types
  placeholder?: string; // Placeholder text
  icon?: ReactNode; // Filter icon
}

interface FilterOption {
  value: string; // Option value
  label: string; // Display label
  count?: number; // Optional item count
}

interface ActiveFilter {
  key: string; // Filter key
  value: string | string[] | { start: string; end: string };
  label: string; // Display label for chip
}
```

---

## Filter Types

### Select (Single Choice)

```tsx
{
  key: 'status',
  label: 'Status',
  type: 'select',
  options: [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'inactive', label: 'Inactive' }
  ]
}
```

### Multi-Select (Multiple Choices)

```tsx
{
  key: 'tags',
  label: 'Tags',
  type: 'multi-select',
  options: [
    { value: 'featured', label: 'Featured' },
    { value: 'sale', label: 'On Sale' },
    { value: 'new', label: 'New Arrival' }
  ]
}
```

### Date

```tsx
{
  key: 'created',
  label: 'Created Date',
  type: 'date',
  placeholder: 'Select date'
}
```

### Date Range

```tsx
{
  key: 'dateRange',
  label: 'Date Range',
  type: 'date-range',
  placeholder: 'Select range'
}
```

### Text Search

```tsx
{
  key: 'name',
  label: 'Name',
  type: 'text',
  placeholder: 'Search by name...'
}
```

---

## With Search

Add a global search input to the filter bar.

```tsx
<FilterBar
  searchable
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
  searchPlaceholder="Search products..."
  filters={filters}
  activeFilters={activeFilters}
  onFilterChange={handleFilterChange}
  onFilterRemove={handleFilterRemove}
/>
```

---

## With Filter Counts

Show item counts for each option.

```tsx
<FilterBar
  showCount
  filters={[
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active', count: 156 },
        { value: 'pending', label: 'Pending', count: 23 },
        { value: 'inactive', label: 'Inactive', count: 8 }
      ]
    }
  ]}
  ...
/>
```

---

## Clear All Filters

Provide a way to reset all filters at once.

```tsx
<FilterBar
  filters={filters}
  activeFilters={activeFilters}
  onFilterChange={handleChange}
  onFilterRemove={handleRemove}
  onClearAll={() => setActiveFilters([])}
/>
```

---

## Complete Examples

### Dashboard Filter Bar

```tsx
import { FilterBar } from "@orion/react";
import { useState, useMemo } from "react";

function OrdersDashboard() {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [search, setSearch] = useState("");

  const handleFilterChange = (key: string, value: any) => {
    setActiveFilters((prev) => {
      const existing = prev.find((f) => f.key === key);
      if (existing) {
        return prev.map((f) =>
          f.key === key ? { ...f, value, label: getLabel(key, value) } : f,
        );
      }
      return [...prev, { key, value, label: getLabel(key, value) }];
    });
  };

  const handleFilterRemove = (key: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.key !== key));
  };

  return (
    <div>
      <FilterBar
        searchable
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search orders..."
        filters={[
          {
            key: "status",
            label: "Status",
            type: "multi-select",
            options: [
              { value: "pending", label: "Pending", count: 23 },
              { value: "processing", label: "Processing", count: 12 },
              { value: "shipped", label: "Shipped", count: 45 },
              { value: "delivered", label: "Delivered", count: 156 },
            ],
          },
          {
            key: "dateRange",
            label: "Order Date",
            type: "date-range",
          },
          {
            key: "total",
            label: "Order Total",
            type: "select",
            options: [
              { value: "under50", label: "Under $50" },
              { value: "50to100", label: "$50 - $100" },
              { value: "100to500", label: "$100 - $500" },
              { value: "over500", label: "Over $500" },
            ],
          },
        ]}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onFilterRemove={handleFilterRemove}
        onClearAll={() => setActiveFilters([])}
      />

      <OrdersTable filters={activeFilters} search={search} />
    </div>
  );
}
```

### User Management Filters

```tsx
<FilterBar
  filters={[
    {
      key: "role",
      label: "Role",
      type: "multi-select",
      options: [
        { value: "admin", label: "Admin", count: 5 },
        { value: "editor", label: "Editor", count: 12 },
        { value: "viewer", label: "Viewer", count: 43 },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "pending", label: "Pending Invite" },
      ],
    },
    {
      key: "joined",
      label: "Joined",
      type: "date-range",
    },
  ]}
  searchable
  searchPlaceholder="Search users by name or email..."
  activeFilters={filters}
  onFilterChange={handleChange}
  onFilterRemove={handleRemove}
  onClearAll={clearAll}
/>
```

### Compact Mode

For tight spaces or secondary filter locations.

```tsx
<FilterBar
  compact
  filters={[
    {
      key: "type",
      label: "Type",
      type: "select",
      options: typeOptions,
    },
  ]}
  activeFilters={filters}
  onFilterChange={handleChange}
  onFilterRemove={handleRemove}
/>
```

---

## Accessibility

- Filter dropdowns are keyboard accessible
- Active filters announced as list items
- Remove buttons have accessible labels
- Search input has proper label
- Focus management on filter changes

```tsx
// Good: Descriptive filter labels
{ key: 'status', label: 'Order Status', ... }

// Avoid: Vague labels
{ key: 'status', label: 'Status', ... }  // Status of what?
```

---

## Anti-Patterns

### Too Many Filters

```tsx
// WRONG - Overwhelming number of filters
<FilterBar
  filters={[...twentyFilters]}  // Too many choices
/>

// CORRECT - Group into sections or use "More Filters" modal
<FilterBar
  filters={primaryFilters}
/>
<Button onClick={openAdvancedFilters}>More Filters</Button>
```

### Missing Clear Option

```tsx
// WRONG - No way to reset
<FilterBar
  activeFilters={filters}
  onFilterRemove={remove}
  // No onClearAll!
/>

// CORRECT - Always provide clear all
<FilterBar
  activeFilters={filters}
  onFilterRemove={remove}
  onClearAll={() => setFilters([])}
/>
```

### Mismatched Filter State

```tsx
// WRONG - Active filters don't match options
activeFilters={[
  { key: 'status', value: 'deleted', label: 'Deleted' }  // Not in options!
]}

// CORRECT - Validate values against options
activeFilters={[
  { key: 'status', value: 'active', label: 'Active' }  // Matches option
]}
```

---

## When to Use FilterBar

| Scenario    | Recommendation               |
| ----------- | ---------------------------- |
| Data tables | With search and multi-select |
| List views  | Primary filters only         |
| Dashboards  | Compact mode                 |
| Reports     | Date ranges prominent        |

## When NOT to Use FilterBar

| Scenario        | Use Instead    |
| --------------- | -------------- |
| Simple sorting  | Sort dropdown  |
| Two options     | Toggle or tabs |
| Search only     | Search input   |
| Complex queries | Query builder  |

---

## Related Components

- **[DataTable](../DataTable/README.md)** — Tables with filtering
- **[PageHeader](../PageHeader/README.md)** — Page header with actions
- **[Field](../../components/Field/README.md)** — Form inputs
- **[CommandBar](../CommandBar/README.md)** — Quick search/actions
