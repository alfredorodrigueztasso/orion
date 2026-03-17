# Checkbox

Selectable checkbox input with label, helper text, and indeterminate state.

## Props

| Prop             | Type                   | Default | Description                    |
| ---------------- | ---------------------- | ------- | ------------------------------ |
| `label`          | `string`               | -       | Checkbox label                 |
| `helperText`     | `string`               | -       | Helper text below              |
| `error`          | `string`               | -       | Error message                  |
| `size`           | `'sm' \| 'md' \| 'lg'` | `'md'`  | Checkbox size                  |
| `indeterminate`  | `boolean`              | `false` | Indeterminate (partial) state  |
| `checked`        | `boolean`              | -       | Controlled checked state       |
| `defaultChecked` | `boolean`              | -       | Default checked (uncontrolled) |
| `disabled`       | `boolean`              | `false` | Disabled state                 |

_Extends all native `<input>` attributes except `size` and `type`._

## Usage

### Basic

```tsx
import { Checkbox } from "@orion/react";

<Checkbox label="Accept terms and conditions" />;
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Subscribe to newsletter"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
```

### With Helper Text

```tsx
<Checkbox label="Remember me" helperText="Stay signed in for 30 days" />
```

### With Error

```tsx
<Checkbox
  label="I agree to the terms"
  error="You must accept the terms to continue"
/>
```

### Sizes

```tsx
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />
```

### Indeterminate State

Used for "select all" when some items are selected.

```tsx
function SelectAll() {
  const [items, setItems] = useState([
    { id: 1, checked: true },
    { id: 2, checked: false },
    { id: 3, checked: true },
  ]);

  const allChecked = items.every((i) => i.checked);
  const someChecked = items.some((i) => i.checked);

  return (
    <>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={(e) => {
          setItems(items.map((i) => ({ ...i, checked: e.target.checked })));
        }}
      />
      {items.map((item) => (
        <Checkbox
          key={item.id}
          label={`Item ${item.id}`}
          checked={item.checked}
          onChange={(e) => {
            setItems(
              items.map((i) =>
                i.id === item.id ? { ...i, checked: e.target.checked } : i,
              ),
            );
          }}
        />
      ))}
    </>
  );
}
```

### Checkbox Group

```tsx
function CheckboxGroup() {
  const [selected, setSelected] = useState<string[]>([]);

  const options = ["React", "Vue", "Angular", "Svelte"];

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  return (
    <fieldset>
      <legend>Select frameworks</legend>
      {options.map((option) => (
        <Checkbox
          key={option}
          label={option}
          checked={selected.includes(option)}
          onChange={() => toggle(option)}
        />
      ))}
    </fieldset>
  );
}
```

### Disabled

```tsx
<Checkbox label="Disabled unchecked" disabled />
<Checkbox label="Disabled checked" disabled defaultChecked />
```

## Tokens Used

- `--surface-base` - Checkbox background
- `--border-default` - Border color
- `--interactive-primary` - Checked background
- `--interactive-primary-text` - Checkmark color
- `--text-primary` - Label text
- `--text-secondary` - Helper text
- `--text-error` - Error text
- `--radius-sm` - Border radius

## Accessibility

- Uses native `<input type="checkbox">`
- Label associated via `htmlFor`/`id`
- `aria-invalid` set when error present
- `aria-describedby` links to helper/error
- `aria-checked="mixed"` for indeterminate
- Keyboard operable (Space to toggle)
