# Spinner

Loading indicator for async operations.

## Props

| Prop        | Type                                    | Default        | Description                   |
| ----------- | --------------------------------------- | -------------- | ----------------------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`  | `'md'`         | Spinner size                  |
| `variant`   | `'primary' \| 'secondary' \| 'neutral'` | `'primary'`    | Spinner color                 |
| `label`     | `string`                                | `'Loading...'` | Accessibility label           |
| `showLabel` | `boolean`                               | `false`        | Show label text below spinner |

## Usage

### Basic

```tsx
import { Spinner } from "@orion/react";

<Spinner />;
```

### Sizes

```tsx
<Spinner size="xs" />  {/* 16px */}
<Spinner size="sm" />  {/* 20px */}
<Spinner size="md" />  {/* 24px */}
<Spinner size="lg" />  {/* 32px */}
<Spinner size="xl" />  {/* 48px */}
```

### Variants

```tsx
<Spinner variant="primary" />
<Spinner variant="secondary" />
<Spinner variant="neutral" />
```

### With Visible Label

```tsx
<Spinner showLabel />
<Spinner showLabel label="Loading data..." />
```

### In Button

```tsx
<Button disabled>
  <Spinner size="sm" variant="neutral" />
  Loading...
</Button>
```

### Full Page Loading

```tsx
function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Spinner size="xl" showLabel label="Loading application..." />
    </div>
  );
}
```

### Inline Loading

```tsx
<p>
  Fetching results <Spinner size="xs" />
</p>
```

### Conditional Loading

```tsx
{
  isLoading ? <Spinner /> : <DataTable data={data} />;
}
```

## Tokens Used

- `--interactive-primary` - Primary variant color
- `--interactive-secondary` - Secondary variant color
- `--text-tertiary` - Neutral variant color
- `--text-secondary` - Label text color
- `--spacing-2` - Label margin

## Accessibility

- Uses `role="status"` for live region
- `aria-label` provides context for screen readers
- Hidden from screen readers when purely decorative
- Respects `prefers-reduced-motion` (animation paused)
