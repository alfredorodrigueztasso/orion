# NotificationCenter Section

> Notification panel/dropdown for displaying and managing user notifications.

## Quick Start

```tsx
import { NotificationCenter } from "@orion/react";

<NotificationCenter
  notifications={[
    {
      id: "1",
      type: "info",
      title: "New message",
      message: "You have a new message from John",
      timestamp: "2024-01-15T10:30:00Z",
      relativeTime: "2 min ago",
      read: false,
    },
    {
      id: "2",
      type: "success",
      title: "Export complete",
      message: "Your data export is ready to download",
      timestamp: "2024-01-15T10:00:00Z",
      relativeTime: "32 min ago",
      read: true,
    },
  ]}
  onMarkAsRead={(id) => markAsRead(id)}
  onMarkAllAsRead={() => markAllAsRead()}
/>;
```

---

## Features

- **Notification Types** — Info, success, warning, error styles
- **Read/Unread States** — Visual distinction for new items
- **Avatars** — Optional sender avatars
- **Categories** — Group notifications by type
- **Actions** — Mark as read, dismiss, clear all
- **Loading State** — Built-in loading indicator
- **Scrollable** — Configurable max height
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface NotificationCenterProps {
  // Content
  notifications: NotificationItem[]; // REQUIRED - Notifications

  // Actions
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  onClearAll?: () => void;
  onViewAll?: () => void;

  // Display
  title?: string; // Header title - default: "Notifications"
  emptyMessage?: string; // Empty state - default: "No notifications"
  maxHeight?: string; // Scrollable height
  loading?: boolean; // Loading state

  // Grouping
  groupByCategory?: boolean; // Group by category - default: false
  showUnreadCount?: boolean; // Show unread badge - default: true
}

interface NotificationItem {
  id: string; // Unique identifier
  type?: "info" | "success" | "warning" | "error" | "default";
  title: string; // Notification title
  message?: string; // Notification message
  icon?: ReactNode; // Custom icon
  timestamp: string; // ISO timestamp
  relativeTime?: string; // "2 min ago"
  read?: boolean; // Read state
  href?: string; // Click URL
  onClick?: () => void; // Click handler
  avatar?: string; // Sender avatar
  category?: string; // Category for grouping
}
```

---

## Notification Types

Each type has a default icon and color.

| Type      | Icon          | Color  | Use Case              |
| --------- | ------------- | ------ | --------------------- |
| `info`    | Info          | Blue   | General information   |
| `success` | CheckCircle   | Green  | Completed actions     |
| `warning` | AlertTriangle | Yellow | Attention needed      |
| `error`   | XCircle       | Red    | Errors or failures    |
| `default` | Bell          | Gray   | Generic notifications |

---

## Notification Configuration

### Basic Notification

```tsx
{
  id: '1',
  title: 'Welcome!',
  timestamp: '2024-01-15T10:30:00Z'
}
```

### With Type and Message

```tsx
{
  id: '1',
  type: 'success',
  title: 'Payment received',
  message: 'Your payment of $49.99 has been processed',
  timestamp: '2024-01-15T10:30:00Z',
  relativeTime: '5 min ago'
}
```

### With Avatar (User-related)

```tsx
{
  id: '1',
  title: 'New comment',
  message: 'Sarah commented on your post',
  avatar: '/avatars/sarah.jpg',
  timestamp: '2024-01-15T10:30:00Z',
  relativeTime: '10 min ago'
}
```

### With Custom Icon

```tsx
import { Download } from 'lucide-react';

{
  id: '1',
  title: 'Download ready',
  message: 'Your export file is ready',
  icon: <Download size={20} />,
  timestamp: '2024-01-15T10:30:00Z'
}
```

### Clickable Notification

```tsx
{
  id: '1',
  title: 'New order',
  message: 'Order #12345 received',
  href: '/orders/12345',
  timestamp: '2024-01-15T10:30:00Z'
}
```

### With Category

```tsx
{
  id: '1',
  title: 'System update',
  message: 'A new version is available',
  category: 'System',
  timestamp: '2024-01-15T10:30:00Z'
}
```

---

## Action Handlers

### Mark Single as Read

```tsx
<NotificationCenter
  notifications={notifications}
  onMarkAsRead={(id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }}
/>
```

### Mark All as Read

```tsx
<NotificationCenter
  notifications={notifications}
  onMarkAllAsRead={() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }}
/>
```

### Dismiss Notification

```tsx
<NotificationCenter
  notifications={notifications}
  onDismiss={(id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }}
/>
```

### Clear All

```tsx
<NotificationCenter
  notifications={notifications}
  onClearAll={() => setNotifications([])}
/>
```

### View All (Link to Full Page)

```tsx
<NotificationCenter
  notifications={notifications}
  onViewAll={() => navigate("/notifications")}
/>
```

---

## Grouping by Category

```tsx
<NotificationCenter
  groupByCategory
  notifications={[
    { id: '1', title: 'New message', category: 'Messages', ... },
    { id: '2', title: 'Task assigned', category: 'Tasks', ... },
    { id: '3', title: 'System update', category: 'System', ... }
  ]}
/>
```

---

## Complete Examples

### Full Notification Center

```tsx
import { NotificationCenter, Button } from "@orion/react";
import { useState } from "react";

function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "info",
      title: "New team member",
      message: "Sarah has joined your team",
      avatar: "/avatars/sarah.jpg",
      timestamp: "2024-01-15T10:30:00Z",
      relativeTime: "2 min ago",
      read: false,
      category: "Team",
    },
    {
      id: "2",
      type: "success",
      title: "Deployment complete",
      message: "Production deployment successful",
      timestamp: "2024-01-15T10:00:00Z",
      relativeTime: "32 min ago",
      read: false,
      category: "System",
      href: "/deployments/latest",
    },
    {
      id: "3",
      type: "warning",
      title: "Storage warning",
      message: "You have used 90% of your storage",
      timestamp: "2024-01-15T09:00:00Z",
      relativeTime: "1 hour ago",
      read: true,
      category: "System",
      href: "/settings/storage",
    },
    {
      id: "4",
      type: "error",
      title: "Build failed",
      message: "CI build failed for main branch",
      timestamp: "2024-01-15T08:00:00Z",
      relativeTime: "2 hours ago",
      read: true,
      category: "CI/CD",
      href: "/builds/456",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationCenter
      title={`Notifications ${unreadCount > 0 ? `(${unreadCount})` : ""}`}
      notifications={notifications}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      onDismiss={handleDismiss}
      onViewAll={() => navigate("/notifications")}
      groupByCategory
      maxHeight="400px"
      showUnreadCount
    />
  );
}
```

### Simple Notification List

```tsx
<NotificationCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  emptyMessage="You're all caught up!"
/>
```

### Loading State

```tsx
<NotificationCenter loading notifications={[]} />
```

### Empty State

```tsx
<NotificationCenter notifications={[]} emptyMessage="No new notifications" />
```

---

## Accessibility

- List uses proper `<ul>/<li>` markup
- Unread notifications announced to screen readers
- Actions have accessible labels
- Keyboard navigation supported
- Focus management on dismiss

```tsx
// Good: Descriptive notification titles
{
  title: "Your export is ready to download";
}

// Avoid: Vague titles
{
  title: "Action complete";
}
```

---

## Anti-Patterns

### No Timestamps

```tsx
// WRONG - No time context
{
  id: '1',
  title: 'New message'
  // When did this happen?
}

// CORRECT - Include timestamp
{
  id: '1',
  title: 'New message',
  timestamp: '2024-01-15T10:30:00Z',
  relativeTime: '2 min ago'
}
```

### Too Many Unread

```tsx
// WRONG - 100 unread notifications overwhelms users
<NotificationCenter
  notifications={[...hundredUnread]}
/>

// CORRECT - Paginate or aggregate
<NotificationCenter
  notifications={recentNotifications.slice(0, 10)}
  onViewAll={() => navigate('/notifications')}
/>
```

### No Way to Clear

```tsx
// WRONG - Notifications pile up
<NotificationCenter
  notifications={notifications}
  // No dismiss or clear actions
/>

// CORRECT - Provide management options
<NotificationCenter
  notifications={notifications}
  onDismiss={handleDismiss}
  onClearAll={handleClearAll}
/>
```

---

## When to Use NotificationCenter

| Scenario         | Recommendation            |
| ---------------- | ------------------------- |
| Header dropdown  | With max height           |
| Sidebar panel    | Full height               |
| Dashboard widget | Compact list              |
| Settings page    | Full notification history |

## When NOT to Use NotificationCenter

| Scenario         | Use Instead          |
| ---------------- | -------------------- |
| Real-time alerts | Toast notifications  |
| System messages  | Alert component      |
| Chat messages    | Chat/messaging UI    |
| Activity history | ActivityFeed section |

---

## Related Components

- **[ActivityFeed](../ActivityFeed/README.md)** — Activity timeline
- **[Toast](../../components/Toast/README.md)** — Temporary alerts
- **[Alert](../../components/Alert/README.md)** — Inline alerts
- **[UserMenu](../UserMenu/README.md)** — User dropdown
