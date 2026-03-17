# Radio

Radio button input for single selection from a group.

## Props

| Prop         | Type                   | Default | Description                        |
| ------------ | ---------------------- | ------- | ---------------------------------- |
| `label`      | `string`               | -       | Radio label                        |
| `helperText` | `string`               | -       | Helper text below                  |
| `error`      | `string`               | -       | Error message                      |
| `size`       | `'sm' \| 'md' \| 'lg'` | `'md'`  | Radio size                         |
| `name`       | `string`               | -       | Group name (required for grouping) |
| `value`      | `string`               | -       | Radio value                        |
| `checked`    | `boolean`              | -       | Controlled checked state           |
| `disabled`   | `boolean`              | `false` | Disabled state                     |

_Extends all native `<input>` attributes except `size` and `type`._

## Usage

### Basic Group

```tsx
import { Radio } from "@orion/react";

<fieldset>
  <legend>Select plan</legend>
  <Radio name="plan" value="free" label="Free" />
  <Radio name="plan" value="pro" label="Pro" />
  <Radio name="plan" value="enterprise" label="Enterprise" />
</fieldset>;
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [plan, setPlan] = useState("free");

  return (
    <fieldset>
      <legend>Select plan</legend>
      <Radio
        name="plan"
        value="free"
        label="Free"
        checked={plan === "free"}
        onChange={() => setPlan("free")}
      />
      <Radio
        name="plan"
        value="pro"
        label="Pro"
        checked={plan === "pro"}
        onChange={() => setPlan("pro")}
      />
      <Radio
        name="plan"
        value="enterprise"
        label="Enterprise"
        checked={plan === "enterprise"}
        onChange={() => setPlan("enterprise")}
      />
    </fieldset>
  );
}
```

### With Helper Text

```tsx
<Radio
  name="shipping"
  value="standard"
  label="Standard shipping"
  helperText="5-7 business days"
/>
<Radio
  name="shipping"
  value="express"
  label="Express shipping"
  helperText="1-2 business days"
/>
```

### With Error

```tsx
<fieldset>
  <legend>Payment method</legend>
  <Radio name="payment" value="card" label="Credit card" error="" />
  <Radio
    name="payment"
    value="paypal"
    label="PayPal"
    error="Please select a payment method"
  />
</fieldset>
```

### Sizes

```tsx
<Radio size="sm" name="size" value="sm" label="Small" />
<Radio size="md" name="size" value="md" label="Medium" />
<Radio size="lg" name="size" value="lg" label="Large" />
```

### Disabled

```tsx
<Radio name="option" value="a" label="Available" />
<Radio name="option" value="b" label="Unavailable" disabled />
<Radio name="option" value="c" label="Selected disabled" disabled defaultChecked />
```

### Horizontal Layout

```tsx
<fieldset style={{ display: "flex", gap: "16px" }}>
  <legend>Size</legend>
  <Radio name="tshirt" value="s" label="S" />
  <Radio name="tshirt" value="m" label="M" />
  <Radio name="tshirt" value="l" label="L" />
  <Radio name="tshirt" value="xl" label="XL" />
</fieldset>
```

### Card-Style Radio

```tsx
function RadioCard({ value, label, description, ...props }) {
  return (
    <label
      style={{
        display: "block",
        padding: "var(--spacing-4)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-control)",
        cursor: "pointer",
      }}
    >
      <Radio value={value} label={label} {...props} />
      <p style={{ marginLeft: "28px", color: "var(--text-secondary)" }}>
        {description}
      </p>
    </label>
  );
}
```

## Tokens Used

- `--surface-base` - Radio background
- `--border-default` - Border color
- `--interactive-primary` - Selected fill
- `--interactive-primary-text` - Inner dot color
- `--text-primary` - Label text
- `--text-secondary` - Helper text
- `--text-error` - Error text
- `--radius-full` - Circular shape

## Accessibility

- Uses native `<input type="radio">`
- Grouped by `name` attribute
- Label associated via `htmlFor`/`id`
- `aria-invalid` set when error present
- `aria-describedby` links to helper/error
- Keyboard navigation within group (arrow keys)
