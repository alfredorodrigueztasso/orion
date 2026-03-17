# Dropdown

A menu that appears below a trigger element. Supports flat items or grouped items.

## Props

| Prop            | Type                           | Default          | Description                     |
| --------------- | ------------------------------ | ---------------- | ------------------------------- |
| `trigger`       | `ReactNode`                    | **required**     | Element that opens the dropdown |
| `items`         | `DropdownItem[]`               | `[]`             | Flat list of menu items         |
| `groups`        | `DropdownGroup[]`              | `[]`             | Grouped menu items              |
| `placement`     | `DropdownPlacement`            | `'bottom-start'` | Menu position                   |
| `open`          | `boolean`                      | -                | Controlled open state           |
| `onOpenChange`  | `(open: boolean) => void`      | -                | Open state change callback      |
| `onSelect`      | `(item: DropdownItem) => void` | -                | Item selection callback         |
| `minWidth`      | `number`                       | `180`            | Minimum menu width (px)         |
| `closeOnSelect` | `boolean`                      | `true`           | Close menu on item select       |

### DropdownItem

```ts
interface DropdownItem {
  id: string; // Unique identifier
  label: string; // Display text
  icon?: ReactNode; // Icon before label
  disabled?: boolean; // Disabled state
  danger?: boolean; // Destructive action (red)
  shortcut?: string; // Keyboard shortcut display
  onClick?: () => void; // Click handler
}
```

### DropdownGroup

```ts
interface DropdownGroup {
  label?: string; // Optional group label
  items: DropdownItem[];
}
```

### DropdownPlacement

```ts
type DropdownPlacement =
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "top-start"
  | "top"
  | "top-end";
```

## Usage

### Basic

```tsx
import { Dropdown, Button } from "@orion/react";

<Dropdown
  trigger={<Button>Options</Button>}
  items={[
    { id: "edit", label: "Edit", onClick: handleEdit },
    { id: "duplicate", label: "Duplicate", onClick: handleDuplicate },
    { id: "delete", label: "Delete", danger: true, onClick: handleDelete },
  ]}
/>;
```

### With Icons

```tsx
import { Edit, Copy, Trash2 } from "lucide-react";

<Dropdown
  trigger={<Button>Actions</Button>}
  items={[
    { id: "edit", label: "Edit", icon: <Edit size={16} /> },
    { id: "copy", label: "Copy", icon: <Copy size={16} /> },
    { id: "delete", label: "Delete", icon: <Trash2 size={16} />, danger: true },
  ]}
/>;
```

### With Keyboard Shortcuts

```tsx
<Dropdown
  trigger={<Button>File</Button>}
  items={[
    { id: "new", label: "New", shortcut: "⌘N" },
    { id: "open", label: "Open", shortcut: "⌘O" },
    { id: "save", label: "Save", shortcut: "⌘S" },
  ]}
/>
```

### Grouped Items

```tsx
<Dropdown
  trigger={<Button>Menu</Button>}
  groups={[
    {
      label: "Actions",
      items: [
        { id: "edit", label: "Edit" },
        { id: "duplicate", label: "Duplicate" },
      ],
    },
    {
      label: "Danger Zone",
      items: [
        { id: "archive", label: "Archive" },
        { id: "delete", label: "Delete", danger: true },
      ],
    },
  ]}
/>
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown
      trigger={<Button>Menu</Button>}
      items={items}
      open={open}
      onOpenChange={setOpen}
      onSelect={(item) => console.log("Selected:", item.id)}
    />
  );
}
```

### Placement

```tsx
<Dropdown
  trigger={<Button>Top Menu</Button>}
  items={items}
  placement="top-start"
/>

<Dropdown
  trigger={<Button>Centered</Button>}
  items={items}
  placement="bottom"
/>
```

### With Disabled Items

```tsx
<Dropdown
  trigger={<Button>Options</Button>}
  items={[
    { id: "view", label: "View" },
    { id: "edit", label: "Edit", disabled: true },
    { id: "delete", label: "Delete", disabled: true },
  ]}
/>
```

### Keep Open on Select

```tsx
<Dropdown
  trigger={<Button>Multi-select</Button>}
  items={items}
  closeOnSelect={false}
/>
```

## Tokens Used

- `--surface-base` - Menu background
- `--surface-subtle` - Item hover background
- `--text-primary` - Item text
- `--text-secondary` - Group label, shortcuts
- `--text-error` - Danger items
- `--border-subtle` - Separator, border
- `--spacing-2`, `--spacing-3` - Padding
- `--radius-control` - Border radius
- `--shadow-lg` - Menu shadow

## Accessibility

- Trigger has `aria-expanded` and `aria-haspopup="menu"`
- Menu has `role="menu"` and `aria-orientation="vertical"`
- Items have `role="menuitem"`
- Disabled items have `aria-disabled`
- Escape key closes menu
- Click outside closes menu
- Keyboard navigation (Enter/Space to select)
