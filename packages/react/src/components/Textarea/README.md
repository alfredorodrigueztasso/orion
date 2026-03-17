# Textarea

Multi-line text input with label, character counter, and resize options.

## Props

| Prop          | Type                                             | Default      | Description            |
| ------------- | ------------------------------------------------ | ------------ | ---------------------- |
| `label`       | `string`                                         | -            | Textarea label         |
| `helperText`  | `string`                                         | -            | Helper text below      |
| `error`       | `string`                                         | -            | Error message          |
| `size`        | `'sm' \| 'md' \| 'lg'`                           | `'md'`       | Textarea size          |
| `resize`      | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | Resize behavior        |
| `showCounter` | `boolean`                                        | `false`      | Show character counter |
| `maxLength`   | `number`                                         | -            | Maximum characters     |
| `rows`        | `number`                                         | -            | Number of visible rows |

_Extends all native `<textarea>` attributes except `size`._

## Usage

### Basic

```tsx
import { Textarea } from "@orion/react";

<Textarea label="Description" placeholder="Enter a description..." />;
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [value, setValue] = useState("");

  return (
    <Textarea
      label="Bio"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Tell us about yourself..."
    />
  );
}
```

### With Character Counter

```tsx
<Textarea
  label="Bio"
  maxLength={500}
  showCounter
  placeholder="Max 500 characters"
/>
```

### With Helper Text

```tsx
<Textarea
  label="Feedback"
  helperText="Your feedback helps us improve"
  rows={4}
/>
```

### With Error

```tsx
<Textarea label="Message" error="Message is required" required />
```

### Sizes

```tsx
<Textarea size="sm" label="Small" />
<Textarea size="md" label="Medium" />
<Textarea size="lg" label="Large" />
```

### Resize Options

```tsx
<Textarea label="No resize" resize="none" />
<Textarea label="Vertical only" resize="vertical" />
<Textarea label="Horizontal only" resize="horizontal" />
<Textarea label="Both directions" resize="both" />
```

### Fixed Height

```tsx
<Textarea label="Notes" rows={6} resize="none" />
```

### Auto-Growing (Custom)

```tsx
function AutoGrowTextarea(props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  return <Textarea ref={ref} onInput={handleInput} resize="none" {...props} />;
}
```

### Disabled

```tsx
<Textarea
  label="Read-only notes"
  value="This content cannot be edited"
  disabled
/>
```

## Tokens Used

- `--surface-base` - Textarea background
- `--border-default` - Border color
- `--border-focus` - Focus border
- `--text-primary` - Input text
- `--text-secondary` - Label, helper, counter
- `--text-error` - Error message
- `--spacing-3`, `--spacing-4` - Padding
- `--radius-control` - Border radius

## Accessibility

- Label associated via `htmlFor`/`id`
- `aria-invalid` set when error present
- `aria-describedby` links to helper/error/counter
- Character count announced to screen readers
- Required fields marked appropriately
