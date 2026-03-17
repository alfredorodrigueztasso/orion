# EmptyState

Placeholder for empty content areas with optional actions.

## Props

| Prop              | Type                   | Default      | Description             |
| ----------------- | ---------------------- | ------------ | ----------------------- |
| `icon`            | `ReactNode`            | -            | Icon or illustration    |
| `title`           | `string`               | **required** | Main title text         |
| `description`     | `string`               | -            | Description text        |
| `action`          | `ReactNode`            | -            | Primary action button   |
| `secondaryAction` | `ReactNode`            | -            | Secondary action button |
| `size`            | `'sm' \| 'md' \| 'lg'` | `'md'`       | Size variant            |

## Usage

### Basic

```tsx
import { EmptyState } from "@orion/react";

<EmptyState title="No items found" />;
```

### With Description

```tsx
<EmptyState
  title="No messages"
  description="Your inbox is empty. Messages you receive will appear here."
/>
```

### With Icon

```tsx
import { Inbox, Search, FileX } from 'lucide-react';

<EmptyState
  icon={<Inbox size={48} />}
  title="No messages"
  description="Your inbox is empty"
/>

<EmptyState
  icon={<Search size={48} />}
  title="No results"
  description="Try adjusting your search terms"
/>

<EmptyState
  icon={<FileX size={48} />}
  title="No files"
  description="Upload files to get started"
/>
```

### With Action

```tsx
import { Plus } from "lucide-react";

<EmptyState
  icon={<Inbox size={48} />}
  title="No projects"
  description="Create your first project to get started"
  action={<Button icon={<Plus size={20} />}>Create Project</Button>}
/>;
```

### With Multiple Actions

```tsx
<EmptyState
  icon={<Search size={48} />}
  title="No results found"
  description="We couldn't find anything matching your search"
  action={<Button onClick={handleClearFilters}>Clear Filters</Button>}
  secondaryAction={
    <Button variant="secondary" onClick={handleNewSearch}>
      New Search
    </Button>
  }
/>
```

### Sizes

```tsx
// Small - for compact areas
<EmptyState
  size="sm"
  title="No items"
  description="Add items to see them here"
/>

// Medium (default) - standard use
<EmptyState
  size="md"
  icon={<Inbox size={48} />}
  title="No messages"
  description="Your inbox is empty"
/>

// Large - for full-page states
<EmptyState
  size="lg"
  icon={<Inbox size={64} />}
  title="Welcome to your inbox"
  description="This is where your messages will appear"
  action={<Button size="lg">Compose Message</Button>}
/>
```

### Table Empty State

```tsx
function DataTable({ data }) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={<Database size={48} />}
        title="No data"
        description="There's no data to display yet"
        action={<Button>Import Data</Button>}
      />
    );
  }

  return <Table data={data} />;
}
```

### Search Empty State

```tsx
function SearchResults({ results, query }) {
  if (results.length === 0) {
    return (
      <EmptyState
        icon={<Search size={48} />}
        title={`No results for "${query}"`}
        description="Try different keywords or check your spelling"
        action={
          <Button variant="secondary" onClick={() => setQuery("")}>
            Clear Search
          </Button>
        }
      />
    );
  }

  return <ResultsList results={results} />;
}
```

### Error State

```tsx
<EmptyState
  icon={<AlertCircle size={48} />}
  title="Something went wrong"
  description="We couldn't load your data. Please try again."
  action={<Button onClick={handleRetry}>Try Again</Button>}
/>
```

## Tokens Used

- `--text-primary` - Title text
- `--text-secondary` - Description text
- `--text-tertiary` - Icon color
- `--spacing-4`, `--spacing-6` - Padding
- `--spacing-2`, `--spacing-3` - Element spacing

## Accessibility

- Title uses appropriate heading level
- Description is linked to title
- Actions are keyboard accessible
- Icon is decorative (`aria-hidden`)
