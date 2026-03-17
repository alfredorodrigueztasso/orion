# EmptyState (Section)

A flexible empty state section for displaying placeholder content when data is not available. Use for dashboards, lists, or search results with no content to display.

## When to Use

| Scenario                       | Use EmptyState                           |
| ------------------------------ | ---------------------------------------- |
| No search results              | ✅ Yes - shows user what happened        |
| Empty list or table            | ✅ Yes - provides context and next steps |
| First-time user onboarding     | ✅ Yes - can include action button       |
| Data loading error             | ✅ Yes - with optional action to retry   |
| Deleted all items confirmation | ✅ Yes - acknowledges empty state        |
| Loading placeholder            | ❌ No - use Skeleton component instead   |

## Props Reference

| Prop        | Type      | Default | Description                                  |
| ----------- | --------- | ------- | -------------------------------------------- |
| icon        | ReactNode | —       | Icon element to display (optional)           |
| title       | string    | —       | Main heading text (required)                 |
| description | string    | —       | Explanation of why state is empty (optional) |
| action      | ReactNode | —       | Call-to-action button or element (optional)  |
| className   | string    | —       | Additional CSS class                         |

## Examples

### Basic Empty State

```tsx
import { EmptyState } from "@orion-ds/react";
import { Search } from "lucide-react";

<EmptyState
  icon={<Search size={48} />}
  title="No results found"
  description="Try adjusting your search filters"
/>;
```

### With Action Button

```tsx
<EmptyState
  icon={<FileText size={48} />}
  title="No documents yet"
  description="Create your first document to get started"
  action={<Button>Create Document</Button>}
/>
```

### Minimal Empty State

```tsx
<EmptyState title="No data available" />
```

## Accessibility

- Title is rendered as prominent heading for semantic structure
- Icon is decorative (no aria-label needed)
- Action button is keyboard accessible
- Description text provides context for screen readers

## Token Usage

- `--surface-base` — Background container
- `--text-primary` — Title text
- `--text-secondary` — Description text
- `--interactive-primary` — Action button (if included)
- `--spacing-8` — Icon and text spacing
- `--spacing-16` — Section padding
