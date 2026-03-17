# Badge

Small status indicator for labels, counts, and statuses.

## Props

| Prop       | Type                                                                                              | Default     | Description         |
| ---------- | ------------------------------------------------------------------------------------------------- | ----------- | ------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'neutral' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'brand'` | `'neutral'` | Badge color variant |
| `size`     | `'sm' \| 'md' \| 'lg'`                                                                            | `'md'`      | Badge size          |
| `dot`      | `boolean`                                                                                         | `false`     | Show dot indicator  |
| `children` | `ReactNode`                                                                                       | -           | Badge content       |

## Usage

### Basic

```tsx
import { Badge } from '@orion/react';

<Badge>Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="error">Failed</Badge>
```

### All Variants

```tsx
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="brand">Brand</Badge>
```

### Sizes

```tsx
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### With Dot Indicator

```tsx
<Badge variant="success" dot>Online</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="warning" dot>Away</Badge>
```

### In Context

```tsx
// With button
<Button>
  Notifications <Badge variant="error">5</Badge>
</Button>

// In table cell
<Table
  columns={[
    {
      key: 'status',
      header: 'Status',
      cell: (row) => (
        <Badge variant={row.active ? 'success' : 'neutral'}>
          {row.active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
  ]}
  data={data}
/>
```

## Tokens Used

- `--color-*-100`, `--color-*-700` - Background/text per variant
- `--text-primary` - Neutral text
- `--spacing-1`, `--spacing-2` - Padding
- `--radius-full` - Border radius (pill shape)
- `--font-secondary` - Font family

## Accessibility

- Uses semantic `<span>` element
- Color alone does not convey meaning (text label included)
- Sufficient contrast ratios per variant
