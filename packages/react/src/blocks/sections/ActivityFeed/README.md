# ActivityFeed (Section)

A complete activity feed section displaying a chronological list of events with actor avatars, timestamps, filtering, and pagination. Designed for dashboards and activity logs.

## When to Use

| Scenario                      | Use ActivityFeed                             |
| ----------------------------- | -------------------------------------------- |
| Dashboard activity log        | ✅ Yes - shows recent actions with filters   |
| Audit trail display           | ✅ Yes - chronological event list            |
| Notification-style event feed | ✅ Yes - supports icon variants and metadata |
| Real-time chat messages       | ❌ No - use Chat section instead             |
| Simple list of items          | ❌ No - use List component instead           |

## Props Reference

| Prop           | Type                    | Default | Description                      |
| -------------- | ----------------------- | ------- | -------------------------------- |
| activities     | Activity[]              | —       | Array of activity items          |
| showFilters    | boolean                 | —       | Show filter bar                  |
| filters        | ActivityFilter[]        | —       | Filter options                   |
| activeFilter   | string                  | —       | Currently active filter value    |
| onFilterChange | (value: string) => void | —       | Filter change callback           |
| compact        | boolean                 | —       | Compact display mode             |
| hasMore        | boolean                 | —       | Whether more items can be loaded |
| onLoadMore     | () => void              | —       | Load more callback               |
| loading        | boolean                 | —       | Loading state                    |
| emptyMessage   | string                  | —       | Empty state message              |

### Activity

| Prop         | Type                                                     | Description                        |
| ------------ | -------------------------------------------------------- | ---------------------------------- |
| id           | string                                                   | Unique identifier                  |
| type         | string                                                   | Activity type key                  |
| actor        | { name: string; avatar?: string }                        | Who performed the action           |
| title        | string                                                   | Activity title                     |
| description  | string                                                   | Optional description               |
| relativeTime | string                                                   | Time display (e.g., "2 hours ago") |
| iconVariant  | 'primary' \| 'success' \| 'warning' \| 'error' \| 'info' | Icon accent color                  |
| metadata     | Record<string, string>                                   | Additional key-value metadata      |

### ActivityFilter

| Prop  | Type   | Description          |
| ----- | ------ | -------------------- |
| label | string | Filter display label |
| value | string | Filter value         |
| count | number | Optional item count  |

## Examples

### Basic Feed

```tsx
import { ActivityFeed } from "@orion-ds/react";

<ActivityFeed
  activities={[
    {
      id: "1",
      type: "commit",
      actor: { name: "Jane Doe", avatar: "/avatars/jane.jpg" },
      title: "Pushed 3 commits to main",
      relativeTime: "2 hours ago",
      iconVariant: "success",
    },
    {
      id: "2",
      type: "review",
      actor: { name: "John Smith" },
      title: "Requested review on PR #42",
      description: "Fix authentication flow",
      relativeTime: "4 hours ago",
      iconVariant: "info",
    },
  ]}
/>;
```

### With Filters and Load More

```tsx
<ActivityFeed
  activities={activities}
  showFilters
  filters={[
    { label: "All", value: "all", count: 24 },
    { label: "Commits", value: "commit", count: 12 },
    { label: "Reviews", value: "review", count: 8 },
  ]}
  activeFilter={filter}
  onFilterChange={setFilter}
  hasMore={hasMore}
  onLoadMore={loadMore}
  loading={isLoading}
  emptyMessage="No activity to show"
/>
```

## Accessibility

- Activity items are structured as a list
- Filter buttons use proper toggle semantics
- Load more button is keyboard accessible
- Loading state announced to screen readers

## Token Usage

- `--surface-base` — Feed background
- `--surface-subtle` — Activity item hover
- `--text-primary` — Activity title
- `--text-secondary` — Description and timestamp
- `--border-subtle` — Item separators
- `--status-success` — Success icon variant
- `--status-error` — Error icon variant
- `--spacing-4` — Item padding
- `--radius-sm` — Avatar border radius
