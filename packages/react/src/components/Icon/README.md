# Icon

Wrapper component for Lucide icons with design token integration.

## Props

| Prop          | Type                 | Default      | Description              |
| ------------- | -------------------- | ------------ | ------------------------ |
| `icon`        | `LucideIcon`         | **required** | Lucide icon component    |
| `size`        | `IconSize \| number` | `'md'`       | Icon size                |
| `color`       | `IconColor`          | `'current'`  | Color variant            |
| `strokeWidth` | `number`             | `2`          | Stroke width             |
| `label`       | `string`             | -            | Accessible label         |
| `decorative`  | `boolean`            | `false`      | Hide from screen readers |
| `disabled`    | `boolean`            | `false`      | Disabled styling         |

### IconSize

```ts
type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
// xs: 12px, sm: 16px, md: 20px, lg: 24px, xl: 32px
```

### IconColor

```ts
type IconColor =
  | "current" // Inherits from parent
  | "primary" // --text-primary
  | "secondary" // --text-secondary
  | "tertiary" // --text-tertiary
  | "brand" // --text-brand
  | "success" // --status-success
  | "warning" // --status-warning
  | "error" // --status-error
  | "info" // --status-info
  | "inverse"; // --text-inverse
```

## Usage

### Basic

```tsx
import { Icon } from '@orion/react';
import { Search, User, Settings } from 'lucide-react';

<Icon icon={Search} />
<Icon icon={User} />
<Icon icon={Settings} />
```

### Sizes

```tsx
<Icon icon={Star} size="xs" />  {/* 12px */}
<Icon icon={Star} size="sm" />  {/* 16px */}
<Icon icon={Star} size="md" />  {/* 20px (default) */}
<Icon icon={Star} size="lg" />  {/* 24px */}
<Icon icon={Star} size="xl" />  {/* 32px */}

{/* Custom pixel size */}
<Icon icon={Star} size={18} />
```

### Colors

```tsx
<Icon icon={Check} color="success" />
<Icon icon={AlertCircle} color="warning" />
<Icon icon={XCircle} color="error" />
<Icon icon={Info} color="info" />
<Icon icon={Star} color="brand" />
```

### Decorative (Hidden from Screen Readers)

Use when icon is purely visual and adjacent text provides meaning.

```tsx
<Button>
  <Icon icon={Search} decorative /> Search
</Button>

<span>
  <Icon icon={Check} decorative color="success" /> Completed
</span>
```

### Semantic (Announced to Screen Readers)

Use when icon conveys meaning not available in surrounding text.

```tsx
<Icon icon={AlertCircle} label="Warning" color="warning" />

<button>
  <Icon icon={Trash2} label="Delete item" color="error" />
</button>
```

### Disabled

```tsx
<Icon icon={Edit} disabled />
```

### Stroke Width

```tsx
<Icon icon={Heart} strokeWidth={1} />   {/* Thin */}
<Icon icon={Heart} strokeWidth={2} />   {/* Default */}
<Icon icon={Heart} strokeWidth={3} />   {/* Bold */}
```

### In Buttons

```tsx
<Button>
  <Icon icon={Plus} decorative size="sm" /> Add Item
</Button>

<Button variant="ghost">
  <Icon icon={Settings} decorative />
</Button>
```

### In Alerts

```tsx
<Alert variant="error">
  <Icon icon={AlertCircle} color="error" decorative />
  An error occurred
</Alert>
```

### Status Indicators

```tsx
function StatusIcon({ status }) {
  const config = {
    success: { icon: CheckCircle, color: "success" },
    warning: { icon: AlertTriangle, color: "warning" },
    error: { icon: XCircle, color: "error" },
    info: { icon: Info, color: "info" },
  };

  const { icon, color } = config[status];

  return <Icon icon={icon} color={color} label={status} />;
}
```

## Why Use Icon Instead of Direct Lucide?

1. **Consistent sizing** - Uses design token sizes
2. **Semantic colors** - Maps to design system colors
3. **Accessibility** - Built-in `decorative` and `label` props
4. **Disabled state** - Automatic muted styling

```tsx
// Direct Lucide (no design system integration)
<Search size={20} className="text-gray-500" />

// With Icon component (design system aware)
<Icon icon={Search} size="md" color="secondary" />
```

## Tokens Used

- `--text-primary` - Primary color
- `--text-secondary` - Secondary color
- `--text-tertiary` - Tertiary/disabled color
- `--text-brand` - Brand color
- `--status-success` - Success color
- `--status-warning` - Warning color
- `--status-error` - Error color
- `--status-info` - Info color

## Accessibility

- `aria-hidden="true"` when `decorative`
- `role="img"` with `aria-label` when semantic
- Proper focus indication when interactive
- Color not sole indicator of meaning
