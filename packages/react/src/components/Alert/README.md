# Alert

Notification and message alert component with status variants. Uses Lucide icons for consistent iconography.

## Props

| Prop          | Type                                          | Default  | Description                     |
| ------------- | --------------------------------------------- | -------- | ------------------------------- |
| `variant`     | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Alert status type               |
| `title`       | `string`                                      | -        | Optional alert title            |
| `dismissible` | `boolean`                                     | `false`  | Show close button               |
| `onClose`     | `() => void`                                  | -        | Close button callback           |
| `icon`        | `ReactNode`                                   | -        | Custom icon (overrides default) |
| `children`    | `ReactNode`                                   | -        | Alert content                   |

## Usage

### Basic

```tsx
import { Alert } from "@orion/react";

<Alert variant="info">This is an informational message.</Alert>;
```

### With Title

```tsx
<Alert variant="success" title="Success!">
  Your changes have been saved successfully.
</Alert>
```

### Dismissible

```tsx
<Alert
  variant="warning"
  dismissible
  onClose={() => console.log("Alert closed")}
>
  This action cannot be undone.
</Alert>
```

### With Custom Icon

```tsx
import { Bell } from "lucide-react";

<Alert variant="info" icon={<Bell size={20} />}>
  You have new notifications.
</Alert>;
```

### All Variants

```tsx
<Alert variant="info">Info message</Alert>
<Alert variant="success">Success message</Alert>
<Alert variant="warning">Warning message</Alert>
<Alert variant="error">Error message</Alert>
```

## Tokens Used

- `--surface-*` - Background colors per variant
- `--text-primary` - Title text
- `--text-secondary` - Message text
- `--spacing-3`, `--spacing-4` - Padding
- `--radius-control` - Border radius

## Accessibility

- Uses `role="alert"` for screen reader announcement
- Close button has `aria-label="Close alert"`
- Icons are marked `aria-hidden="true"`
