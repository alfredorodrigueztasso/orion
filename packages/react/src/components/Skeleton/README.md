# Skeleton

Placeholder loading state for content.

## Props

| Prop           | Type                                                 | Default   | Description              |
| -------------- | ---------------------------------------------------- | --------- | ------------------------ |
| `variant`      | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'text'`  | Shape variant            |
| `animation`    | `'pulse' \| 'wave' \| 'none'`                        | `'pulse'` | Animation type           |
| `width`        | `number \| string`                                   | -         | Width (px or CSS value)  |
| `height`       | `number \| string`                                   | -         | Height (px or CSS value) |
| `lines`        | `number`                                             | `1`       | Number of text lines     |
| `borderRadius` | `number \| string`                                   | -         | Custom border radius     |

## Usage

### Basic Text

```tsx
import { Skeleton } from "@orion/react";

<Skeleton width={200} />;
```

### Multiple Lines

```tsx
<Skeleton lines={3} />
```

### Shapes

```tsx
// Text (default)
<Skeleton variant="text" width={200} />

// Circular (avatars)
<Skeleton variant="circular" width={40} height={40} />

// Rectangular (images, cards)
<Skeleton variant="rectangular" width="100%" height={200} />

// Rounded (buttons, chips)
<Skeleton variant="rounded" width={100} height={36} />
```

### Animations

```tsx
<Skeleton animation="pulse" />   {/* Default pulsing */}
<Skeleton animation="wave" />    {/* Shimmer effect */}
<Skeleton animation="none" />    {/* Static */}
```

### Card Skeleton

```tsx
function CardSkeleton() {
  return (
    <div className="card">
      <Skeleton variant="rectangular" width="100%" height={200} />
      <div style={{ padding: 16 }}>
        <Skeleton width="60%" height={24} />
        <Skeleton lines={2} />
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
}
```

### List Skeleton

```tsx
function ListSkeleton({ count = 5 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Skeleton variant="circular" width={40} height={40} />
          <div style={{ flex: 1 }}>
            <Skeleton width="40%" height={16} />
            <Skeleton width="80%" height={14} style={{ marginTop: 4 }} />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Table Skeleton

```tsx
function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <table>
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i}>
              <Skeleton width="80%" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => (
              <td key={colIndex}>
                <Skeleton />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Conditional Loading

```tsx
function UserProfile({ user, isLoading }) {
  if (isLoading) {
    return (
      <div style={{ display: "flex", gap: 16 }}>
        <Skeleton variant="circular" width={64} height={64} />
        <div>
          <Skeleton width={150} height={24} />
          <Skeleton width={200} height={16} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Avatar src={user.avatar} size="xl" />
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    </div>
  );
}
```

## Tokens Used

- `--surface-subtle` - Skeleton background
- `--surface-layer` - Animation highlight
- `--radius-sm` - Text border radius
- `--radius-full` - Circular border radius
- `--radius-control` - Rounded border radius

## Accessibility

- Uses `aria-hidden="true"` (decorative)
- Animation respects `prefers-reduced-motion`
- Not announced to screen readers
- Use with actual loading states for context
