# Chip

Compact element for tags, filters, or selections.

## Props

| Prop        | Type                                                                    | Default     | Description              |
| ----------- | ----------------------------------------------------------------------- | ----------- | ------------------------ |
| `variant`   | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color variant            |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                  | `'md'`      | Chip size                |
| `icon`      | `ReactNode`                                                             | -           | Icon before label        |
| `clickable` | `boolean`                                                               | `false`     | Make chip clickable      |
| `onClick`   | `() => void`                                                            | -           | Click handler            |
| `onRemove`  | `() => void`                                                            | -           | Remove handler (shows X) |
| `disabled`  | `boolean`                                                               | `false`     | Disabled state           |
| `selected`  | `boolean`                                                               | `false`     | Selected state           |
| `children`  | `ReactNode`                                                             | -           | Chip label               |

## Usage

### Basic

```tsx
import { Chip } from '@orion/react';

<Chip>Default</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="success">Success</Chip>
```

### All Variants

```tsx
<Chip variant="default">Default</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="error">Error</Chip>
<Chip variant="info">Info</Chip>
```

### Sizes

```tsx
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
```

### With Icon

```tsx
import { Tag, Check, AlertCircle } from 'lucide-react';

<Chip icon={<Tag size={14} />}>Tagged</Chip>
<Chip icon={<Check size={14} />} variant="success">Completed</Chip>
<Chip icon={<AlertCircle size={14} />} variant="error">Error</Chip>
```

### Removable

```tsx
function TagList() {
  const [tags, setTags] = useState(["React", "TypeScript", "CSS"]);

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <Chip key={tag} onRemove={() => removeTag(tag)}>
          {tag}
        </Chip>
      ))}
    </div>
  );
}
```

### Clickable

```tsx
<Chip clickable onClick={() => console.log("clicked")}>
  Click me
</Chip>
```

### Selectable Chips

```tsx
function SelectableChips() {
  const [selected, setSelected] = useState<string[]>([]);
  const options = ["Small", "Medium", "Large"];

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {options.map((option) => (
        <Chip
          key={option}
          clickable
          selected={selected.includes(option)}
          onClick={() => toggle(option)}
        >
          {option}
        </Chip>
      ))}
    </div>
  );
}
```

### Filter Chips (Removable)

```tsx
function FilterChips({ filters, onRemove, onClear }) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {filters.map((filter) => (
        <Chip key={filter.id} onRemove={() => onRemove(filter.id)}>
          {filter.label}: {filter.value}
        </Chip>
      ))}
      {filters.length > 0 && (
        <Chip clickable variant="primary" onClick={onClear}>
          Clear all
        </Chip>
      )}
    </div>
  );
}
```

### Category Filter Pills (Gallery/Directory)

**Use `size="lg"` for primary category filters** in gallery/directory interfaces (Components, Sections, Templates pages).

```tsx
function CategoryFilters({ categories, activeCategory, onSelect, counts }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-2)",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* Main filter: All items */}
      <Chip
        size="lg"
        clickable
        selected={activeCategory === "all"}
        onClick={() => onSelect("all")}
      >
        All ({counts.total})
      </Chip>

      {/* Category filters */}
      {categories.map((category) => (
        <Chip
          size="lg"
          key={category}
          clickable
          selected={activeCategory === category}
          onClick={() => onSelect(category)}
        >
          {category} ({counts[category]})
        </Chip>
      ))}
    </div>
  );
}
```

**Why `size="lg"`**:

- Creates visual hierarchy (filters prominent, cards below are smaller)
- Improves touch target size for mobile
- Clearer navigation affordance
- See: [Chip size="lg" for Filter Pills pattern](../../memory/patterns.md)

### Disabled

```tsx
<Chip disabled>Disabled</Chip>
<Chip disabled onRemove={() => {}}>Can't remove</Chip>
```

## Tokens Used

- `--surface-subtle` - Default background
- `--color-*-100` - Variant backgrounds
- `--color-*-700` - Variant text
- `--text-primary` - Default text
- `--spacing-1`, `--spacing-2` - Padding
- `--radius-full` - Border radius (pill)

## Accessibility

- Clickable chips use `role="button"`
- Remove button has `aria-label="Remove"`
- Disabled state uses `aria-disabled`
- Selected state uses `aria-pressed`
- Keyboard operable (Enter/Space)
