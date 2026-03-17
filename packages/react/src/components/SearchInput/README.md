# SearchInput

Specialized input for search functionality with clear and search actions.

## Props

| Prop               | Type                      | Default          | Description                      |
| ------------------ | ------------------------- | ---------------- | -------------------------------- |
| `size`             | `'sm' \| 'md' \| 'lg'`    | `'md'`           | Input size                       |
| `onClear`          | `() => void`              | -                | Clear button callback            |
| `onSearch`         | `(value: string) => void` | -                | Search callback (Enter/button)   |
| `showClear`        | `boolean`                 | `true`           | Show clear button when has value |
| `showSearchButton` | `boolean`                 | `false`          | Show search button               |
| `searchIcon`       | `ReactNode`               | -                | Custom search icon               |
| `clearLabel`       | `string`                  | `'Clear search'` | Clear button aria-label          |
| `searchLabel`      | `string`                  | `'Search'`       | Search button aria-label         |
| `loading`          | `boolean`                 | `false`          | Loading state                    |
| `fullWidth`        | `boolean`                 | `false`          | Full width input                 |

_Extends all native `<input>` attributes except `size` and `type`._

## Usage

### Basic

```tsx
import { SearchInput } from "@orion/react";

<SearchInput placeholder="Search..." />;
```

### Controlled with Clear

```tsx
import { useState } from "react";

function Example() {
  const [query, setQuery] = useState("");

  return (
    <SearchInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClear={() => setQuery("")}
      placeholder="Search products..."
    />
  );
}
```

### With Search Callback

```tsx
function SearchExample() {
  const [query, setQuery] = useState("");

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Perform search
  };

  return (
    <SearchInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClear={() => setQuery("")}
      onSearch={handleSearch}
      placeholder="Press Enter to search"
    />
  );
}
```

### With Search Button

```tsx
<SearchInput placeholder="Search..." showSearchButton onSearch={handleSearch} />
```

### Sizes

```tsx
<SearchInput size="sm" placeholder="Small" />
<SearchInput size="md" placeholder="Medium" />
<SearchInput size="lg" placeholder="Large" />
```

### Loading State

```tsx
<SearchInput
  value={query}
  onChange={handleChange}
  loading={isSearching}
  placeholder="Search..."
/>
```

### Full Width

```tsx
<SearchInput fullWidth placeholder="Search entire site..." />
```

### Debounced Search

```tsx
import { useState, useEffect } from "react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <SearchInput
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onClear={() => setQuery("")}
      placeholder="Search (debounced)..."
    />
  );
}
```

### In Header/Navbar

```tsx
<nav className="navbar">
  <Logo />
  <SearchInput size="sm" placeholder="Search..." style={{ width: 250 }} />
  <NavLinks />
</nav>
```

### Custom Search Icon

```tsx
import { Filter } from "lucide-react";

<SearchInput
  placeholder="Filter results..."
  searchIcon={<Filter size={18} />}
/>;
```

## Tokens Used

- `--surface-base` - Input background
- `--border-default` - Border color
- `--border-focus` - Focus border
- `--text-primary` - Input text
- `--text-secondary` - Placeholder
- `--text-tertiary` - Icons
- `--spacing-3` - Padding
- `--radius-control` - Border radius

## Accessibility

- Uses `type="search"` for semantic meaning
- Clear button has `aria-label`
- Search button has `aria-label`
- Loading state has `aria-busy`
- Keyboard: Enter triggers search
- Escape clears input (native behavior)
