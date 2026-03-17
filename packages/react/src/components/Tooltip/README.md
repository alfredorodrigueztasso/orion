# Tooltip

Contextual information popup on hover/focus.

## Props

| Prop        | Type                                     | Default      | Description               |
| ----------- | ---------------------------------------- | ------------ | ------------------------- |
| `content`   | `ReactNode`                              | **required** | Tooltip content           |
| `placement` | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`      | Tooltip position          |
| `delay`     | `number`                                 | `200`        | Delay before showing (ms) |
| `disabled`  | `boolean`                                | `false`      | Disable tooltip           |
| `children`  | `ReactNode`                              | **required** | Trigger element           |
| `className` | `string`                                 | -            | Additional CSS class      |

## Usage

### Basic

```tsx
import { Tooltip, Button } from "@orion/react";

<Tooltip content="Click to save">
  <Button>Save</Button>
</Tooltip>;
```

### Placement

```tsx
<Tooltip content="Above" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="To the right" placement="right">
  <Button>Right</Button>
</Tooltip>

<Tooltip content="Below" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="To the left" placement="left">
  <Button>Left</Button>
</Tooltip>
```

### With Icon Button

```tsx
import { Settings } from "lucide-react";

<Tooltip content="Settings">
  <Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
</Tooltip>;
```

### Rich Content

```tsx
<Tooltip
  content={
    <div>
      <strong>Keyboard shortcut</strong>
      <br />
      Press <kbd>Ctrl+S</kbd> to save
    </div>
  }
>
  <Button>Save</Button>
</Tooltip>
```

### Custom Delay

```tsx
// Instant
<Tooltip content="Instant tooltip" delay={0}>
  <Button>Hover me</Button>
</Tooltip>

// Slower
<Tooltip content="Delayed tooltip" delay={500}>
  <Button>Hover me</Button>
</Tooltip>
```

### Disabled Tooltip

```tsx
<Tooltip content="Won't show" disabled>
  <Button>No tooltip</Button>
</Tooltip>
```

### On Disabled Elements

```tsx
// Wrap disabled element in a span for tooltip to work
<Tooltip content="This action is not available">
  <span>
    <Button disabled>Disabled</Button>
  </span>
</Tooltip>
```

### Form Field Help

```tsx
<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  <label>Email</label>
  <Tooltip content="We'll never share your email">
    <HelpCircle size={16} />
  </Tooltip>
</div>
```

## Tokens Used

- `--surface-inverse` - Tooltip background
- `--text-inverse` - Tooltip text
- `--spacing-2`, `--spacing-3` - Padding
- `--radius-sm` - Border radius
- `--shadow-md` - Box shadow

## Accessibility

- Uses `role="tooltip"`
- Trigger has `aria-describedby` linking to tooltip
- Shows on focus (keyboard accessible)
- Dismissed on Escape key
- Content readable by screen readers
