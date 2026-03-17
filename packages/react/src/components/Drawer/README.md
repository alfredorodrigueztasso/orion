# Drawer

Slide-out panel from screen edge with compound components.

## Props

### Drawer

| Prop              | Type                                     | Default      | Description             |
| ----------------- | ---------------------------------------- | ------------ | ----------------------- |
| `open`            | `boolean`                                | **required** | Whether drawer is open  |
| `onClose`         | `() => void`                             | **required** | Close callback          |
| `placement`       | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'`    | Slide direction         |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`       | Drawer width/height     |
| `closeOnBackdrop` | `boolean`                                | `true`       | Close on backdrop click |
| `closeOnEscape`   | `boolean`                                | `true`       | Close on Escape key     |
| `showCloseButton` | `boolean`                                | `true`       | Show X button           |

### Drawer.Header / Drawer.Body / Drawer.Footer

| Prop        | Type        | Description          |
| ----------- | ----------- | -------------------- |
| `children`  | `ReactNode` | Section content      |
| `className` | `string`    | Additional CSS class |

## Usage

### Basic

```tsx
import { Drawer, Button } from "@orion/react";
import { useState } from "react";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Header>Settings</Drawer.Header>
        <Drawer.Body>
          <p>Drawer content goes here.</p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}
```

### Placement

```tsx
// Right (default)
<Drawer open={open} onClose={onClose} placement="right">
  ...
</Drawer>

// Left
<Drawer open={open} onClose={onClose} placement="left">
  ...
</Drawer>

// Top
<Drawer open={open} onClose={onClose} placement="top">
  ...
</Drawer>

// Bottom (sheet style)
<Drawer open={open} onClose={onClose} placement="bottom">
  ...
</Drawer>
```

### Sizes

```tsx
<Drawer size="sm">   {/* 320px */}
<Drawer size="md">   {/* 400px */}
<Drawer size="lg">   {/* 560px */}
<Drawer size="xl">   {/* 720px */}
<Drawer size="full"> {/* 100% */}
```

### Navigation Drawer

```tsx
<Drawer open={menuOpen} onClose={() => setMenuOpen(false)} placement="left">
  <Drawer.Header>Menu</Drawer.Header>
  <Drawer.Body>
    <nav>
      <a href="/">Home</a>
      <a href="/products">Products</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </Drawer.Body>
</Drawer>
```

### Filter Drawer

```tsx
<Drawer open={filterOpen} onClose={() => setFilterOpen(false)}>
  <Drawer.Header>Filters</Drawer.Header>
  <Drawer.Body>
    <Select label="Category" options={categories} />
    <Select label="Price Range" options={priceRanges} />
    <Checkbox label="In Stock Only" />
  </Drawer.Body>
  <Drawer.Footer>
    <Button variant="secondary" onClick={clearFilters}>
      Clear All
    </Button>
    <Button onClick={applyFilters}>Apply Filters</Button>
  </Drawer.Footer>
</Drawer>
```

### Without Close Button

```tsx
<Drawer open={open} onClose={onClose} showCloseButton={false}>
  <Drawer.Header>
    <span>Custom Header</span>
    <Button variant="ghost" onClick={onClose}>
      Done
    </Button>
  </Drawer.Header>
  ...
</Drawer>
```

### Prevent Close on Backdrop

```tsx
<Drawer
  open={open}
  onClose={onClose}
  closeOnBackdrop={false}
  closeOnEscape={false}
>
  {/* User must use explicit close action */}
</Drawer>
```

## Tokens Used

- `--surface-base` - Drawer background
- `--surface-overlay` - Backdrop color
- `--border-subtle` - Header/footer borders
- `--text-primary` - Header text
- `--spacing-4`, `--spacing-6` - Padding
- `--shadow-xl` - Drawer shadow

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Focus trapped inside drawer
- Escape key closes drawer (configurable)
- Close button has `aria-label`
- Body scroll locked when open
- Focus returns to trigger on close
