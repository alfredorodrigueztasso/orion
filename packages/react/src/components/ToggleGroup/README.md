# ToggleGroup

A group of toggle buttons where one or multiple items can be selected, commonly used for toolbars and option sets.

## When to Use

| Scenario                                          | Use ToggleGroup               |
| ------------------------------------------------- | ----------------------------- |
| Text formatting toolbar (bold, italic, underline) | ✅ Yes - type="multiple"      |
| View switcher (grid/list/table)                   | ✅ Yes - type="single"        |
| Segmented option selection                        | ✅ Yes - visual toggle group  |
| Form radio/checkbox groups                        | ❌ No - use Radio or Checkbox |
| Single toggle button                              | ❌ No - use Toggle instead    |

## Props Reference

### ToggleGroup (Root)

| Prop          | Type                   | Default   | Description                  |
| ------------- | ---------------------- | --------- | ---------------------------- |
| type          | 'single' \| 'multiple' | —         | Selection mode               |
| value         | string \| string[]     | —         | Controlled value             |
| defaultValue  | string \| string[]     | —         | Default value (uncontrolled) |
| onValueChange | (value) => void        | —         | Value change callback        |
| variant       | 'default' \| 'outline' | 'default' | Visual variant               |
| size          | 'sm' \| 'md' \| 'lg'   | 'md'      | Button size                  |
| disabled      | boolean                | —         | Disable all items            |
| children      | ReactNode              | —         | ToggleGroup.Item elements    |

### ToggleGroup.Item

| Prop     | Type      | Default | Description                |
| -------- | --------- | ------- | -------------------------- |
| value    | string    | —       | Unique value for this item |
| disabled | boolean   | —       | Disable this specific item |
| children | ReactNode | —       | Item content               |

## Examples

### Single Selection (View Switcher)

```tsx
import { ToggleGroup } from "@orion-ds/react";
import { LayoutGrid, List, Table } from "lucide-react";

<ToggleGroup type="single" value={view} onValueChange={setView}>
  <ToggleGroup.Item value="grid" aria-label="Grid view">
    <LayoutGrid size={16} />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="list" aria-label="List view">
    <List size={16} />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="table" aria-label="Table view">
    <Table size={16} />
  </ToggleGroup.Item>
</ToggleGroup>;
```

### Multiple Selection (Formatting Toolbar)

```tsx
<ToggleGroup
  type="multiple"
  value={formatting}
  onValueChange={setFormatting}
  variant="outline"
>
  <ToggleGroup.Item value="bold" aria-label="Bold">
    <Bold size={16} />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Italic">
    <Italic size={16} />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="underline" aria-label="Underline">
    <Underline size={16} />
  </ToggleGroup.Item>
</ToggleGroup>
```

## Accessibility

- Uses `role="group"` with proper ARIA attributes
- Each item uses `aria-pressed` for toggle state
- Supports keyboard navigation between items
- Include `aria-label` on icon-only items

## Token Usage

- `--surface-subtle` — Default item background
- `--interactive-primary` — Active/pressed item background
- `--text-primary` — Item icon/text color
- `--border-subtle` — Outline variant and group border
- `--radius-control` — Border radius
- `--spacing-1` — Gap between items
