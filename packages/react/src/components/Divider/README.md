# Divider

Visual separator between content sections.

## Props

| Prop          | Type                              | Default        | Description           |
| ------------- | --------------------------------- | -------------- | --------------------- |
| `orientation` | `'horizontal' \| 'vertical'`      | `'horizontal'` | Divider orientation   |
| `variant`     | `'solid' \| 'dashed' \| 'dotted'` | `'solid'`      | Line style            |
| `spacing`     | `'none' \| 'sm' \| 'md' \| 'lg'`  | `'md'`         | Margin around divider |
| `label`       | `string`                          | -              | Text label in center  |

## Usage

### Basic

```tsx
import { Divider } from "@orion/react";

<div>
  <p>Content above</p>
  <Divider />
  <p>Content below</p>
</div>;
```

### Variants

```tsx
<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />
```

### Spacing

```tsx
<Divider spacing="none" />  {/* No margin */}
<Divider spacing="sm" />    {/* 8px margin */}
<Divider spacing="md" />    {/* 16px margin (default) */}
<Divider spacing="lg" />    {/* 24px margin */}
```

### Vertical

```tsx
<div style={{ display: "flex", alignItems: "center", height: 40 }}>
  <span>Item 1</span>
  <Divider orientation="vertical" />
  <span>Item 2</span>
  <Divider orientation="vertical" />
  <span>Item 3</span>
</div>
```

### With Label

```tsx
<Divider label="OR" />
<Divider label="Continue with" />
```

### In Forms

```tsx
<form>
  <Field label="Email" />
  <Field label="Password" />

  <Divider label="OR" spacing="lg" />

  <Button variant="secondary" fullWidth>
    Sign in with Google
  </Button>
</form>
```

### In Navigation

```tsx
<nav style={{ display: "flex", alignItems: "center", gap: "16px" }}>
  <a href="/">Home</a>
  <Divider orientation="vertical" />
  <a href="/products">Products</a>
  <Divider orientation="vertical" />
  <a href="/about">About</a>
</nav>
```

## Tokens Used

- `--border-subtle` - Divider color
- `--text-tertiary` - Label text color
- `--surface-base` - Label background
- `--spacing-2`, `--spacing-4`, `--spacing-6` - Margin

## Accessibility

- Uses `<hr>` element for semantic separation
- `role="separator"` for vertical dividers
- `aria-orientation` set appropriately
- Decorative when no label (hidden from screen readers)
