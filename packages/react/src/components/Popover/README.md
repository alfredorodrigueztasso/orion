# Popover

Floating content panel triggered by click, hover, or focus. Supports 12 placement positions with automatic viewport edge detection.

## Props

| Prop                  | Type                                        | Default      | Description                  |
| --------------------- | ------------------------------------------- | ------------ | ---------------------------- |
| `trigger`             | `ReactNode`                                 | **required** | Trigger element              |
| `content`             | `ReactNode`                                 | **required** | Popover content              |
| `placement`           | `PopoverPlacement`                          | `'bottom'`   | Position relative to trigger |
| `triggerType`         | `'click' \| 'hover' \| 'focus' \| 'manual'` | `'click'`    | How to trigger               |
| `open`                | `boolean`                                   | -            | Controlled open state        |
| `defaultOpen`         | `boolean`                                   | `false`      | Default open (uncontrolled)  |
| `onOpenChange`        | `(open: boolean) => void`                   | -            | Open state callback          |
| `showArrow`           | `boolean`                                   | `true`       | Show pointing arrow          |
| `offset`              | `number`                                    | `8`          | Distance from trigger (px)   |
| `closeOnClickOutside` | `boolean`                                   | `true`       | Close on outside click       |
| `closeOnEscape`       | `boolean`                                   | `true`       | Close on Escape              |
| `openDelay`           | `number`                                    | `0`          | Delay before showing (hover) |
| `closeDelay`          | `number`                                    | `150`        | Delay before hiding (hover)  |

### PopoverPlacement

All 12 placement positions:

```ts
type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";
```

**Visual placement guide:**

```
              top-start    top    top-end
                   ┌────────┬────────┐
                   │        │        │
      left-start ──┤                 ├── right-start
                   │                 │
           left ───┤    [trigger]    ├─── right
                   │                 │
        left-end ──┤                 ├── right-end
                   │        │        │
                   └────────┴────────┘
           bottom-start  bottom  bottom-end
```

## Usage

### Basic (Click)

```tsx
import { Popover, Button } from "@orion/react";

<Popover
  trigger={<Button>Click me</Button>}
  content={
    <div style={{ padding: "16px" }}>
      <p>Popover content here!</p>
    </div>
  }
/>;
```

### All Placement Positions

```tsx
// Top variations
<Popover placement="top" trigger={<Button>Top</Button>} content={<Content />} />
<Popover placement="top-start" trigger={<Button>Top Start</Button>} content={<Content />} />
<Popover placement="top-end" trigger={<Button>Top End</Button>} content={<Content />} />

// Bottom variations
<Popover placement="bottom" trigger={<Button>Bottom</Button>} content={<Content />} />
<Popover placement="bottom-start" trigger={<Button>Bottom Start</Button>} content={<Content />} />
<Popover placement="bottom-end" trigger={<Button>Bottom End</Button>} content={<Content />} />

// Left variations
<Popover placement="left" trigger={<Button>Left</Button>} content={<Content />} />
<Popover placement="left-start" trigger={<Button>Left Start</Button>} content={<Content />} />
<Popover placement="left-end" trigger={<Button>Left End</Button>} content={<Content />} />

// Right variations
<Popover placement="right" trigger={<Button>Right</Button>} content={<Content />} />
<Popover placement="right-start" trigger={<Button>Right Start</Button>} content={<Content />} />
<Popover placement="right-end" trigger={<Button>Right End</Button>} content={<Content />} />
```

### Hover Trigger

```tsx
<Popover
  trigger={<span>Hover over me</span>}
  content={<div>More information</div>}
  triggerType="hover"
  openDelay={200}
/>
```

### Focus Trigger

Ideal for form field hints:

```tsx
<Popover
  trigger={<Field label="Email" placeholder="Enter email" />}
  content={<div>We'll send a confirmation to this address</div>}
  triggerType="focus"
  placement="right"
/>
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      trigger={<Button>Toggle</Button>}
      content={
        <div>
          <p>Controlled popover</p>
          <Button size="sm" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      }
      open={open}
      onOpenChange={setOpen}
    />
  );
}
```

### Without Arrow

```tsx
<Popover
  trigger={<Button>No arrow</Button>}
  content={<div>Clean look</div>}
  showArrow={false}
/>
```

### User Profile Menu

```tsx
<Popover
  trigger={<Avatar src="/user.jpg" interactive />}
  content={
    <div style={{ width: 250 }}>
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <strong>John Doe</strong>
        <p style={{ color: "var(--text-secondary)", margin: 0 }}>
          john@example.com
        </p>
      </div>
      <div style={{ padding: "8px" }}>
        <Button variant="ghost" fullWidth>
          View Profile
        </Button>
        <Button variant="ghost" fullWidth>
          Settings
        </Button>
        <Button variant="ghost" fullWidth>
          Sign out
        </Button>
      </div>
    </div>
  }
/>
```

### Form in Popover

For inline editing or quick forms:

```tsx
function QuickNote() {
  const [note, setNote] = useState("");
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    console.log("Saved:", note);
    setOpen(false);
    setNote("");
  };

  return (
    <Popover
      trigger={<Button>Add note</Button>}
      open={open}
      onOpenChange={setOpen}
      closeOnClickOutside={false}
      content={
        <form
          style={{ padding: "16px", width: 300 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <Textarea
            label="Note"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            autoFocus
          />
          <div
            style={{
              marginTop: "12px",
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Save
            </Button>
          </div>
        </form>
      }
    />
  );
}
```

### Rich Content with Images

```tsx
<Popover
  trigger={<Button variant="ghost">View details</Button>}
  placement="right"
  content={
    <div style={{ width: 320 }}>
      <img
        src="/product.jpg"
        alt="Product"
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />
      <div style={{ padding: "16px" }}>
        <h4 style={{ margin: "0 0 8px" }}>Premium Headphones</h4>
        <p style={{ margin: "0 0 12px", color: "var(--text-secondary)" }}>
          Wireless noise-canceling headphones with 30-hour battery life.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 18 }}>$299</span>
          <Button size="sm">Add to Cart</Button>
        </div>
      </div>
    </div>
  }
/>
```

### Confirmation Popover

```tsx
function DeleteConfirmation({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      trigger={<Button variant="ghost">Delete</Button>}
      placement="top"
      open={open}
      onOpenChange={setOpen}
      content={
        <div style={{ padding: "16px", width: 240 }}>
          <p style={{ margin: "0 0 12px", fontWeight: 500 }}>
            Delete this item?
          </p>
          <p
            style={{
              margin: "0 0 16px",
              color: "var(--text-secondary)",
              fontSize: 14,
            }}
          >
            This action cannot be undone.
          </p>
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              style={{ background: "var(--status-error)" }}
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      }
    />
  );
}
```

### List Content

```tsx
<Popover
  trigger={
    <Button
      variant="ghost"
      icon={<MoreVertical size={20} />}
      iconOnly
      aria-label="More options"
    />
  }
  placement="bottom-end"
  showArrow={false}
  content={
    <div style={{ width: 180 }}>
      <div style={{ padding: "4px" }}>
        <Button
          variant="ghost"
          fullWidth
          style={{ justifyContent: "flex-start" }}
        >
          <Edit size={16} style={{ marginRight: 8 }} /> Edit
        </Button>
        <Button
          variant="ghost"
          fullWidth
          style={{ justifyContent: "flex-start" }}
        >
          <Copy size={16} style={{ marginRight: 8 }} /> Duplicate
        </Button>
        <Button
          variant="ghost"
          fullWidth
          style={{ justifyContent: "flex-start" }}
        >
          <Archive size={16} style={{ marginRight: 8 }} /> Archive
        </Button>
        <Divider />
        <Button
          variant="ghost"
          fullWidth
          style={{ justifyContent: "flex-start", color: "var(--status-error)" }}
        >
          <Trash2 size={16} style={{ marginRight: 8 }} /> Delete
        </Button>
      </div>
    </div>
  }
/>
```

### Nested Information

```tsx
<Popover
  trigger={<Badge variant="info">3 contributors</Badge>}
  triggerType="hover"
  openDelay={300}
  placement="bottom"
  content={
    <div style={{ padding: "12px", width: 220 }}>
      <p style={{ margin: "0 0 12px", fontWeight: 500, fontSize: 13 }}>
        Contributors
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar src="/user1.jpg" size="sm" />
          <span>Alice Chen</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar src="/user2.jpg" size="sm" />
          <span>Bob Smith</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Avatar src="/user3.jpg" size="sm" />
          <span>Carol White</span>
        </div>
      </div>
    </div>
  }
/>
```

## Viewport Edge Handling

The Popover automatically adjusts when near viewport edges:

1. **Flip**: If there's not enough space in the preferred direction, it flips to the opposite side
2. **Shift**: If the popover would overflow horizontally, it shifts along the axis to stay visible
3. **Arrow adjustment**: The arrow stays pointed at the trigger even when shifted

```tsx
// Near right edge - will auto-flip to left if needed
<Popover
  placement="right"
  trigger={<Button>Edge button</Button>}
  content={<div style={{ width: 200 }}>Content that might overflow</div>}
/>
```

## Tokens Used

- `--surface-base` - Popover background
- `--border-subtle` - Border color
- `--text-primary` - Content text
- `--text-secondary` - Secondary text
- `--spacing-2`, `--spacing-4` - Padding
- `--radius-control` - Border radius
- `--shadow-lg` - Box shadow

## Accessibility

- Trigger has `aria-expanded` and `aria-haspopup="dialog"`
- Popover linked via `aria-controls`
- Focus management:
  - Focus moves to popover content when opened (for click/manual triggers)
  - Focus returns to trigger when closed
- Keyboard support:

| Key               | Action                        |
| ----------------- | ----------------------------- |
| `Escape`          | Close popover                 |
| `Tab`             | Move focus within popover     |
| `Enter` / `Space` | Activate trigger (click mode) |

- Click outside closes popover (configurable)
- Screen readers announce expanded state

## When to Use

| Use Case                 | Component   |
| ------------------------ | ----------- |
| Simple text hint         | Tooltip     |
| Rich interactive content | **Popover** |
| Full-page overlay        | Modal       |
| Navigation menu          | Dropdown    |
| Side panel               | Drawer      |

Use Popover when you need:

- Interactive content (buttons, forms, links)
- Rich content (images, lists, multiple sections)
- User-initiated details (click to show more)
- Inline editing without leaving context
