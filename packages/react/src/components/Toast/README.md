# Toast

Notification system for showing temporary messages. Uses Context API with a provider pattern.

## Setup

Wrap your app with `ToastProvider`:

```tsx
import { ToastProvider } from "@orion/react";

function App() {
  return (
    <ToastProvider>
      <YourApp />
    </ToastProvider>
  );
}
```

## ToastProvider Props

| Prop              | Type            | Default          | Description                    |
| ----------------- | --------------- | ---------------- | ------------------------------ |
| `position`        | `ToastPosition` | `'bottom-right'` | Toast position on screen       |
| `maxToasts`       | `number`        | `5`              | Maximum visible toasts         |
| `defaultDuration` | `number`        | `5000`           | Default auto-dismiss time (ms) |

### ToastPosition

```ts
type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";
```

## useToast Hook

```ts
const {
  toast, // (options: ToastOptions) => string
  info, // (message: string, options?) => string
  success, // (message: string, options?) => string
  warning, // (message: string, options?) => string
  error, // (message: string, options?) => string
  dismiss, // (id: string) => void
  dismissAll, // () => void
} = useToast();
```

### ToastOptions

```ts
interface ToastOptions {
  title?: string;
  message: ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  duration?: number; // 0 = no auto-dismiss
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}
```

## Usage

### Basic Toasts

```tsx
import { useToast, Button } from "@orion/react";

function Example() {
  const { success, error, warning, info } = useToast();

  return (
    <>
      <Button onClick={() => info("Information message")}>Info</Button>
      <Button onClick={() => success("Operation completed!")}>Success</Button>
      <Button onClick={() => warning("Please review your input")}>
        Warning
      </Button>
      <Button onClick={() => error("Something went wrong")}>Error</Button>
    </>
  );
}
```

### With Title

```tsx
const { toast } = useToast();

toast({
  title: "File uploaded",
  message: "Your document has been saved successfully.",
  variant: "success",
});
```

### With Action Button

```tsx
const { toast } = useToast();

toast({
  message: "Item deleted",
  variant: "info",
  action: {
    label: "Undo",
    onClick: () => restoreItem(),
  },
});
```

### Custom Duration

```tsx
const { success, error } = useToast();

// Quick toast (2 seconds)
success("Saved!", { duration: 2000 });

// Persistent toast (no auto-dismiss)
error("Connection lost. Please check your network.", { duration: 0 });
```

### Dismiss Programmatically

```tsx
const { toast, dismiss, dismissAll } = useToast();

// Dismiss specific toast
const id = toast({ message: "Processing..." });
// Later...
dismiss(id);

// Dismiss all toasts
dismissAll();
```

### With onDismiss Callback

```tsx
toast({
  message: "Session expiring soon",
  variant: "warning",
  onDismiss: () => console.log("User acknowledged"),
});
```

### Provider Configuration

```tsx
<ToastProvider position="top-center" maxToasts={3} defaultDuration={3000}>
  <App />
</ToastProvider>
```

## Tokens Used

- `--surface-base` - Toast background
- `--text-primary` - Title text
- `--text-secondary` - Message text
- `--color-success-*` - Success variant
- `--color-error-*` - Error variant
- `--color-warning-*` - Warning variant
- `--color-info-*` - Info variant
- `--spacing-3`, `--spacing-4` - Padding
- `--radius-control` - Border radius
- `--shadow-lg` - Toast shadow

## Accessibility

- Toasts have `role="alert"` and `aria-live="polite"`
- Dismiss button has `aria-label="Dismiss"`
- Timer pauses on hover (allows reading)
- Focus not trapped (non-modal)
- Screen readers announce new toasts
