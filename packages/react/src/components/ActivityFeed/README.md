# ActivityFeed Section

> Timeline of events and activities for dashboards and notification centers.

## Quick Start

```tsx
import { ActivityFeed } from "@orion/react";

<ActivityFeed
  activities={[
    {
      id: "1",
      type: "comment",
      actor: { name: "Jane Doe", avatar: "/avatars/jane.jpg" },
      title: "Commented on Project X",
      description: "Great progress on the design!",
      timestamp: "2024-01-15T10:30:00Z",
      relativeTime: "2 hours ago",
    },
    {
      id: "2",
      type: "create",
      actor: { name: "John Smith", avatar: "/avatars/john.jpg" },
      title: "Created new document",
      timestamp: "2024-01-15T09:00:00Z",
      relativeTime: "3 hours ago",
    },
  ]}
/>;
```

---

## Features

- **Activity Types** — Comment, update, create, delete, assign, complete, upload
- **Actor Info** — Name, avatar, and profile links
- **Timeline Connectors** — Visual lines between items
- **Filtering** — Filter by activity type
- **Load More** — Pagination support
- **Compact Mode** — Dense layout for sidebars
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface ActivityFeedProps {
  // Content
  activities: ActivityItem[]; // REQUIRED - Array of activities

  // Filtering
  showFilters?: boolean; // Show filter controls - default: false
  filters?: ActivityFilter[]; // Filter options
  activeFilter?: string; // Current filter
  onFilterChange?: (filter: string) => void;

  // Pagination
  onLoadMore?: () => void; // Load more callback
  hasMore?: boolean; // More items available
  loading?: boolean; // Loading state

  // Display
  showConnectors?: boolean; // Timeline lines - default: true
  compact?: boolean; // Compact mode - default: false
  emptyMessage?: string; // Empty state message
}

interface ActivityItem {
  id: string; // Unique identifier
  type?:
    | "comment"
    | "update"
    | "create"
    | "delete"
    | "assign"
    | "complete"
    | "upload"
    | "default";
  icon?: ReactNode; // Custom icon (overrides type)
  iconVariant?: "default" | "success" | "warning" | "error" | "info" | "brand";
  actor?: ActivityActor; // Who performed the action
  title: ReactNode; // Activity title/summary
  description?: ReactNode; // Additional details
  timestamp: string; // ISO timestamp
  relativeTime?: string; // "2 hours ago"
  metadata?: Record<string, ReactNode>; // Additional data
  actions?: ReactNode; // Action buttons
}

interface ActivityActor {
  name: string; // Actor name
  avatar?: string; // Avatar URL
  href?: string; // Profile link
}
```

---

## Activity Types

Each type has a default icon and color.

| Type       | Icon          | Color   | Use Case           |
| ---------- | ------------- | ------- | ------------------ |
| `comment`  | MessageSquare | Default | Comments, feedback |
| `update`   | Pencil        | Info    | Edits, changes     |
| `create`   | Plus          | Success | New items created  |
| `delete`   | Trash         | Error   | Deletions          |
| `assign`   | User          | Brand   | Assignments        |
| `complete` | Check         | Success | Completions        |
| `upload`   | Upload        | Info    | File uploads       |
| `default`  | Circle        | Default | Generic            |

---

## Activity Items

### Basic Activity

```tsx
{
  id: '1',
  title: 'Document updated',
  timestamp: '2024-01-15T10:30:00Z'
}
```

### With Actor

```tsx
{
  id: '1',
  type: 'comment',
  actor: {
    name: 'Jane Doe',
    avatar: '/avatars/jane.jpg',
    href: '/users/jane'
  },
  title: 'Commented on Project X',
  timestamp: '2024-01-15T10:30:00Z',
  relativeTime: '2 hours ago'
}
```

### With Description

```tsx
{
  id: '1',
  type: 'comment',
  actor: { name: 'Jane Doe' },
  title: 'Commented on Project X',
  description: '"This looks great! Let\'s proceed with the implementation."',
  timestamp: '2024-01-15T10:30:00Z'
}
```

### With Custom Icon

```tsx
import { Star } from 'lucide-react';

{
  id: '1',
  icon: <Star size={16} />,
  iconVariant: 'warning',
  title: 'Project starred',
  timestamp: '2024-01-15T10:30:00Z'
}
```

### With Actions

```tsx
{
  id: '1',
  type: 'comment',
  actor: { name: 'Jane Doe' },
  title: 'Commented on Project X',
  description: 'Great work on this!',
  timestamp: '2024-01-15T10:30:00Z',
  actions: (
    <>
      <Button size="sm" variant="ghost">Reply</Button>
      <Button size="sm" variant="ghost">View</Button>
    </>
  )
}
```

### With Metadata

```tsx
{
  id: '1',
  type: 'upload',
  actor: { name: 'Jane Doe' },
  title: 'Uploaded a file',
  timestamp: '2024-01-15T10:30:00Z',
  metadata: {
    'File': 'design-specs.pdf',
    'Size': '2.4 MB'
  }
}
```

---

## Filtering

### With Filters

```tsx
const [filter, setFilter] = useState("all");

<ActivityFeed
  activities={activities}
  showFilters
  filters={[
    { value: "all", label: "All Activity" },
    { value: "comment", label: "Comments", count: 12 },
    { value: "update", label: "Updates", count: 8 },
    { value: "create", label: "Created", count: 5 },
  ]}
  activeFilter={filter}
  onFilterChange={setFilter}
/>;
```

---

## Pagination

### Load More

```tsx
<ActivityFeed
  activities={activities}
  hasMore={hasMoreItems}
  loading={isLoading}
  onLoadMore={loadNextPage}
/>
```

---

## Display Options

### With Connectors (Default)

```tsx
<ActivityFeed activities={activities} showConnectors={true} />
```

### Without Connectors

```tsx
<ActivityFeed activities={activities} showConnectors={false} />
```

### Compact Mode

```tsx
<ActivityFeed activities={activities} compact />
```

---

## Complete Examples

### Dashboard Activity Feed

```tsx
import { ActivityFeed, Button } from "@orion/react";
import { MessageSquare, FileText, CheckCircle, UserPlus } from "lucide-react";

function DashboardActivity() {
  const [activities] = useState([
    {
      id: "1",
      type: "comment",
      actor: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
      title: (
        <>
          Commented on <a href="#">Project Alpha</a>
        </>
      ),
      description: '"The new designs look fantastic! Ready for development."',
      timestamp: "2024-01-15T10:30:00Z",
      relativeTime: "10 minutes ago",
      actions: (
        <Button size="sm" variant="ghost">
          Reply
        </Button>
      ),
    },
    {
      id: "2",
      type: "complete",
      iconVariant: "success",
      actor: { name: "Marcus Johnson", avatar: "/avatars/marcus.jpg" },
      title: (
        <>
          Completed task <a href="#">Update user dashboard</a>
        </>
      ),
      timestamp: "2024-01-15T09:45:00Z",
      relativeTime: "1 hour ago",
    },
    {
      id: "3",
      type: "assign",
      actor: { name: "Emily Rodriguez", avatar: "/avatars/emily.jpg" },
      title: (
        <>
          Assigned <a href="#">API Integration</a> to John Smith
        </>
      ),
      timestamp: "2024-01-15T09:00:00Z",
      relativeTime: "2 hours ago",
    },
    {
      id: "4",
      type: "create",
      iconVariant: "brand",
      actor: { name: "David Kim", avatar: "/avatars/david.jpg" },
      title: "Created new project: Mobile App v2",
      timestamp: "2024-01-15T08:30:00Z",
      relativeTime: "2.5 hours ago",
    },
  ]);

  return (
    <ActivityFeed
      activities={activities}
      showFilters
      filters={[
        { value: "all", label: "All" },
        { value: "comment", label: "Comments" },
        { value: "complete", label: "Completed" },
      ]}
    />
  );
}
```

### Notification Center

```tsx
<ActivityFeed
  activities={notifications}
  compact
  showConnectors={false}
  emptyMessage="You're all caught up!"
/>
```

### Sidebar Feed

```tsx
<aside>
  <h3>Recent Activity</h3>
  <ActivityFeed
    activities={recentActivities.slice(0, 5)}
    compact
    showConnectors
    hasMore={recentActivities.length > 5}
    onLoadMore={() => showAllActivity()}
  />
</aside>
```

---

## Accessibility

- Activity items are semantic list items
- Actor avatars have alt text
- Timestamps use `<time>` element
- Actions are keyboard accessible
- Loading states announced to screen readers

```tsx
// Good: Clear activity title
{
  title: "Sarah Chen commented on Project Alpha";
}

// Avoid: Vague titles
{
  title: "New activity";
}
```

---

## Anti-Patterns

### Too Much Information Per Item

```tsx
// WRONG - Overwhelming
{
  title: 'Sarah Chen commented',
  description: 'Full 500 word comment text...',
  metadata: { /* 10 metadata items */ }
}

// CORRECT - Scannable summary
{
  title: 'Sarah Chen commented on Project Alpha',
  description: '"Great progress on the designs!"',  // Truncated
  actions: <Button size="sm">View Full Comment</Button>
}
```

### Missing Timestamps

```tsx
// WRONG - No time context
{
  id: '1',
  title: 'Document updated'
  // When?
}

// CORRECT - Include timestamp
{
  id: '1',
  title: 'Document updated',
  timestamp: '2024-01-15T10:30:00Z',
  relativeTime: '2 hours ago'
}
```

### No Actor Attribution

```tsx
// WRONG - Anonymous activities
{
  title: 'Comment added'
}

// CORRECT - Show who did it
{
  actor: { name: 'Jane Doe', avatar: '/jane.jpg' },
  title: 'Added a comment'
}
```

---

## When to Use ActivityFeed

| Scenario            | Recommendation              |
| ------------------- | --------------------------- |
| Dashboard sidebar   | Compact mode, recent items  |
| Notification center | With filters, no connectors |
| Audit log           | Full mode with metadata     |
| Project timeline    | With connectors and actors  |

## When NOT to Use ActivityFeed

| Scenario        | Use Instead           |
| --------------- | --------------------- |
| Chat/messages   | Chat component        |
| Comments thread | Comments component    |
| Event calendar  | Timeline or Calendar  |
| Status updates  | Status badge or alert |

---

## Related Components

- **[NotificationCenter](../NotificationCenter/README.md)** — Notification list
- **[Timeline](../Timeline/README.md)** — Chronological events
- **[DataTable](../DataTable/README.md)** — For detailed audit logs
- **[EmptyState](../EmptyState/README.md)** — Empty activity state
