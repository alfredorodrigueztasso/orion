# ErrorBoundary

A React error boundary that catches JavaScript errors in its child component tree and displays a fallback UI instead of crashing.

## When to Use

| Scenario                                 | Use ErrorBoundary                   |
| ---------------------------------------- | ----------------------------------- |
| Wrapping unstable third-party components | ✅ Yes - isolates crash to boundary |
| Page-level error recovery                | ✅ Yes - shows fallback with retry  |
| Around async data-fetching sections      | ✅ Yes - catches render errors      |
| Catching event handler errors            | ❌ No - use try/catch in handlers   |
| Server-side errors                       | ❌ No - handle at API/server level  |

## Props Reference

| Prop     | Type                                     | Default | Description                             |
| -------- | ---------------------------------------- | ------- | --------------------------------------- |
| children | ReactNode                                | —       | Content to render when no error         |
| fallback | ReactNode \| (error, reset) => ReactNode | —       | Custom fallback UI                      |
| onError  | (error, errorInfo) => void               | —       | Callback when error is caught           |
| resetKey | string \| number                         | —       | Reset error state when this key changes |

## Examples

### Basic Usage

```tsx
import { ErrorBoundary } from "@orion-ds/react";

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>;
```

### With Custom Fallback

```tsx
<ErrorBoundary
  fallback={(error, reset) => (
    <div>
      <h3>Something went wrong</h3>
      <p>{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  )}
  onError={(error, info) => logErrorToService(error, info)}
>
  <DashboardWidget />
</ErrorBoundary>
```

### With Reset Key

```tsx
<ErrorBoundary resetKey={userId} fallback={<p>Failed to load user data.</p>}>
  <UserProfile userId={userId} />
</ErrorBoundary>
```

## Accessibility

- Fallback UI should include actionable recovery options
- Error messages should be descriptive for all users
- Focus management returns to a meaningful element after reset

## Token Usage

- `--surface-subtle` — Default fallback background
- `--status-error` — Error accent color
- `--text-primary` — Error message text
- `--spacing-6` — Fallback padding
- `--radius-container` — Fallback border radius
