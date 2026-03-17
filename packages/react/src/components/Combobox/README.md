# Combobox

Autocomplete input with searchable dropdown options.

## Props

| Prop             | Type                                               | Default              | Description                 |
| ---------------- | -------------------------------------------------- | -------------------- | --------------------------- |
| `options`        | `ComboboxOption[]`                                 | **required**         | Available options           |
| `value`          | `string \| null`                                   | -                    | Selected value (controlled) |
| `onChange`       | `(value, option) => void`                          | -                    | Selection callback          |
| `onInputChange`  | `(value: string) => void`                          | -                    | Input change callback       |
| `size`           | `'sm' \| 'md' \| 'lg'`                             | `'md'`               | Input size                  |
| `label`          | `string`                                           | -                    | Field label                 |
| `helperText`     | `string`                                           | -                    | Helper text                 |
| `error`          | `string`                                           | -                    | Error message               |
| `loading`        | `boolean`                                          | `false`              | Loading state               |
| `clearable`      | `boolean`                                          | `true`               | Allow clearing              |
| `allowFreeInput` | `boolean`                                          | `false`              | Allow non-option input      |
| `filterFn`       | `(option, input) => boolean`                       | -                    | Custom filter               |
| `openOnFocus`    | `boolean`                                          | `true`               | Open on focus               |
| `minChars`       | `number`                                           | `0`                  | Min chars to show options   |
| `emptyText`      | `string`                                           | `'No results found'` | Empty state text            |
| `renderOption`   | `(option, isSelected, isHighlighted) => ReactNode` | -                    | Custom option render        |
| `maxHeight`      | `number`                                           | `300`                | Dropdown max height (px)    |
| `fullWidth`      | `boolean`                                          | `false`              | Full width input            |

### ComboboxOption

```ts
interface ComboboxOption {
  value: string; // Unique value
  label: string; // Display text
  description?: string; // Optional description
  icon?: ReactNode; // Optional icon
  disabled?: boolean; // Disabled state
  group?: string; // Group name
}
```

## Usage

### Basic

```tsx
import { Combobox } from "@orion/react";

<Combobox
  label="Framework"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
  ]}
  placeholder="Select a framework..."
/>;
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      label="Country"
      options={countries}
      value={value}
      onChange={(newValue, option) => {
        setValue(newValue);
        console.log("Selected:", option);
      }}
      placeholder="Search countries..."
    />
  );
}
```

### With Descriptions

```tsx
<Combobox
  label="Plan"
  options={[
    { value: "free", label: "Free", description: "Basic features" },
    { value: "pro", label: "Pro", description: "$10/month, advanced features" },
    {
      value: "team",
      label: "Team",
      description: "$25/month, collaboration tools",
    },
  ]}
/>
```

### With Icons

```tsx
import { Globe, Flag, MapPin } from "lucide-react";

<Combobox
  label="Location"
  options={[
    { value: "world", label: "Worldwide", icon: <Globe size={16} /> },
    { value: "us", label: "United States", icon: <Flag size={16} /> },
    { value: "local", label: "Local only", icon: <MapPin size={16} /> },
  ]}
/>;
```

### Async Loading

```tsx
function AsyncCombobox() {
  const [options, setOptions] = useState<ComboboxOption[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = async (query: string) => {
    if (query.length < 2) return;

    setLoading(true);
    const results = await searchAPI(query);
    setOptions(results.map((r) => ({ value: r.id, label: r.name })));
    setLoading(false);
  };

  return (
    <Combobox
      label="Search users"
      options={options}
      onInputChange={handleInputChange}
      loading={loading}
      minChars={2}
      placeholder="Type to search..."
    />
  );
}
```

### Allow Free Input

```tsx
<Combobox
  label="Tags"
  options={existingTags}
  allowFreeInput
  placeholder="Select or type new tag..."
/>
```

### Custom Filter

```tsx
<Combobox
  label="Search"
  options={options}
  filterFn={(option, input) => {
    const search = input.toLowerCase();
    return (
      option.label.toLowerCase().includes(search) ||
      option.description?.toLowerCase().includes(search)
    );
  }}
/>
```

### Custom Option Render

```tsx
<Combobox
  label="Users"
  options={users}
  renderOption={(option, isSelected, isHighlighted) => (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Avatar src={option.avatar} size="xs" />
      <div>
        <div>{option.label}</div>
        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          {option.email}
        </div>
      </div>
      {isSelected && <Check size={16} />}
    </div>
  )}
/>
```

### With Error

```tsx
<Combobox
  label="Category"
  options={categories}
  error="Please select a category"
/>
```

### Sizes

```tsx
<Combobox size="sm" label="Small" options={options} />
<Combobox size="md" label="Medium" options={options} />
<Combobox size="lg" label="Large" options={options} />
```

## Tokens Used

- `--surface-base` - Input/dropdown background
- `--surface-subtle` - Option hover
- `--border-default` - Border color
- `--border-focus` - Focus border
- `--text-primary` - Option text
- `--text-secondary` - Description, placeholder
- `--text-error` - Error message
- `--interactive-primary` - Selected option
- `--spacing-2`, `--spacing-3` - Padding
- `--radius-control` - Border radius
- `--shadow-lg` - Dropdown shadow

## Accessibility

- Uses `role="combobox"` with `aria-expanded`
- Listbox has `role="listbox"`
- Options have `role="option"` with `aria-selected`
- Keyboard: Arrow keys navigate, Enter selects
- `aria-activedescendant` tracks highlighted option
- Escape closes dropdown
- Screen readers announce option count
