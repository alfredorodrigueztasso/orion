# Switch

Toggle switch for binary on/off settings. Styled after iOS with a sleek, native-feeling design.

## Visual Design

The Switch uses an **iOS-style design** with:

- **Always-white thumb** with subtle shadow for depth
- **Smooth slide animation** on toggle
- **Brand-colored track** when checked (uses `--interactive-primary`)
- **Gray track** when unchecked

## Props

| Prop             | Type                   | Default | Description                                                            |
| ---------------- | ---------------------- | ------- | ---------------------------------------------------------------------- |
| `label`          | `string`               | -       | Switch label (required for accessibility unless `aria-label` provided) |
| `size`           | `'sm' \| 'md' \| 'lg'` | `'sm'`  | Switch size                                                            |
| `helperText`     | `string`               | -       | Helper text below switch                                               |
| `error`          | `string`               | -       | Error message (shows error state)                                      |
| `checked`        | `boolean`              | -       | Controlled checked state                                               |
| `defaultChecked` | `boolean`              | -       | Default checked (uncontrolled)                                         |
| `disabled`       | `boolean`              | `false` | Disabled state                                                         |
| `required`       | `boolean`              | `false` | Mark as required                                                       |
| `onChange`       | `ChangeEventHandler`   | -       | Change handler                                                         |

_Extends all native `<input>` attributes except `size` and `type`._

## Usage

### Basic

```tsx
import { Switch } from "@orion/react";

<Switch label="Enable notifications" />;
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      label="Dark mode"
      checked={enabled}
      onChange={(e) => setEnabled(e.target.checked)}
    />
  );
}
```

### With Helper Text

```tsx
<Switch
  label="Email notifications"
  helperText="Receive updates about your account"
/>
```

### With Error State

```tsx
<Switch
  label="Accept terms"
  error="You must accept the terms to continue"
  required
/>
```

### Sizes

The default size is `'sm'` which matches typical form controls. Use larger sizes for emphasis or touch-friendly interfaces.

```tsx
<Switch size="sm" label="Small (default)" />
<Switch size="md" label="Medium (iOS standard)" />
<Switch size="lg" label="Large (touch-friendly)" />
```

| Size | Track Width | Track Height | Use Case                        |
| ---- | ----------- | ------------ | ------------------------------- |
| `sm` | 42px        | 26px         | Default, compact forms          |
| `md` | 51px        | 31px         | iOS standard, emphasis          |
| `lg` | 60px        | 36px         | Touch interfaces, accessibility |

### Disabled

```tsx
<Switch label="Disabled off" disabled />
<Switch label="Disabled on" disabled defaultChecked />
```

### Without Label

When no visible label is needed, you **must** provide `aria-label` for screen readers:

```tsx
<Switch aria-label="Toggle feature" />
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Switch name="marketing" label="Marketing emails" />
  <Switch name="updates" label="Product updates" defaultChecked />
  <Switch name="terms" label="Accept terms" required />
  <Button type="submit">Save preferences</Button>
</form>
```

### Settings Panel Example

```tsx
function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    sms: false,
  });

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((prev) => ({ ...prev, [key]: e.target.checked }));
    };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Switch
        label="Email notifications"
        helperText="Receive order updates and promotions"
        checked={settings.email}
        onChange={handleChange("email")}
      />
      <Switch
        label="Push notifications"
        helperText="Get instant alerts on your device"
        checked={settings.push}
        onChange={handleChange("push")}
      />
      <Switch
        label="SMS notifications"
        helperText="Receive text messages for critical updates"
        checked={settings.sms}
        onChange={handleChange("sms")}
      />
    </div>
  );
}
```

## Tokens Used

- `--interactive-primary` - Track background (on state)
- `--interactive-primary-hover` - Track background on hover (on state)
- `--soft-brand` - Focus ring color
- `--status-error` - Error state ring and message
- `--soft-error` - Error state focus ring
- `--text-primary` - Label text
- `--text-secondary` - Helper text
- `--spacing-1`, `--spacing-3` - Spacing
- `--radius-full` - Track border radius
- `--font-secondary` - Font family
- `--font-size-12`, `--font-size-13`, `--font-size-14`, `--font-size-16` - Font sizes

## Accessibility

The Switch component follows WCAG 2.1 AA guidelines:

### Semantic HTML

- Uses native `<input type="checkbox">` with `role="switch"` for proper screen reader announcement
- The `role="switch"` tells assistive technology this is a toggle, not a checkbox
- `aria-checked` reflects the current state for AT synchronization

### Accessible Names

- Label associated via `htmlFor`/`id` attributes
- When no visible label: `aria-label` is **required**
- Development warning if neither `label` nor `aria-label` is provided

### States & Descriptions

- `aria-invalid="true"` when error is present
- `aria-required` when required
- `aria-describedby` automatically links to:
  - Error message (when error)
  - Helper text (when no error)
  - Any custom `aria-describedby` value

### Keyboard Support

| Key     | Action                    |
| ------- | ------------------------- |
| `Space` | Toggle switch             |
| `Tab`   | Move focus to/from switch |

### Visual Accessibility

- Focus visible styles with ring (`:focus-visible`)
- High contrast mode support (`forced-colors`)
- Reduced motion support (`prefers-reduced-motion`)

### Error Announcements

- Error messages use `role="alert"` and `aria-live="assertive"`
- Screen readers announce errors immediately when they appear

## High Contrast Mode

The Switch automatically adapts for Windows High Contrast Mode:

- Track uses system `Canvas` and `CanvasText` colors
- Checked state uses `Highlight` color
- Focus uses visible 3px outline
- Disabled state uses `GrayText`
