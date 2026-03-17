# Select

Styled dropdown select with label, error states, and helper text.

## Props

| Prop          | Type                   | Default                 | Description                       |
| ------------- | ---------------------- | ----------------------- | --------------------------------- |
| `label`       | `string`               | -                       | Select label                      |
| `error`       | `string`               | -                       | Error message (shows error state) |
| `helperText`  | `string`               | -                       | Helper text below select          |
| `options`     | `SelectOption[]`       | -                       | Array of options                  |
| `placeholder` | `string`               | `'Select an option...'` | Placeholder text                  |
| `fullWidth`   | `boolean`              | `false`                 | Full width select                 |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`                  | Select size                       |
| `optional`    | `boolean`              | `false`                 | Show "(optional)" indicator       |
| `children`    | `ReactNode`            | -                       | Custom `<option>` elements        |

### SelectOption

```ts
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Usage

### Basic with Options Array

```tsx
import { Select } from "@orion/react";

<Select
  label="Country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ]}
/>;
```

### With Children

```tsx
<Select label="Status">
  <option value="">Choose status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
</Select>
```

### With Error State

```tsx
<Select
  label="Category"
  options={categories}
  error="Please select a category"
/>
```

### With Helper Text

```tsx
<Select
  label="Priority"
  options={priorities}
  helperText="Select the task priority level"
/>
```

### Full Width

```tsx
<Select label="Department" options={departments} fullWidth />
```

### Optional Field

```tsx
<Select label="Secondary Contact" options={contacts} optional />
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [value, setValue] = useState("");

  return (
    <Select
      label="Role"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      options={[
        { value: "admin", label: "Administrator" },
        { value: "user", label: "User" },
        { value: "guest", label: "Guest", disabled: true },
      ]}
    />
  );
}
```

### Sizes

```tsx
<Select label="Small" size="sm" options={options} />
<Select label="Medium" size="md" options={options} />
<Select label="Large" size="lg" options={options} />
```

## Tokens Used

- `--surface-base` - Select background
- `--border-default` - Border color
- `--border-focus` - Focus border color
- `--text-primary` - Label and value text
- `--text-secondary` - Helper text
- `--text-error` - Error message
- `--spacing-2`, `--spacing-3` - Padding
- `--radius-control` - Border radius

## Accessibility

- Label linked via `htmlFor`/`id`
- `aria-invalid` set when error present
- `aria-describedby` links to helper/error text
- Required fields marked with `*`
- Disabled options properly indicated
