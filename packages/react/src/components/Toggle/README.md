# Toggle

A two-state button that can be toggled on or off, similar to a checkbox but styled as a pressable button.

## When to Use

| Scenario                              | Use Toggle                                    |
| ------------------------------------- | --------------------------------------------- |
| On/off feature toggles (bold, italic) | ✅ Yes - visual pressed state                 |
| Toolbar formatting buttons            | ✅ Yes - classic toggle button pattern        |
| Single binary option                  | ✅ Yes - supports controlled and uncontrolled |
| Multiple exclusive options            | ❌ No - use ToggleGroup instead               |
| On/off switches                       | ❌ No - use Switch for form toggles           |

## Props Reference

| Prop            | Type                       | Default   | Description                          |
| --------------- | -------------------------- | --------- | ------------------------------------ |
| pressed         | boolean                    | —         | Controlled pressed state             |
| defaultPressed  | boolean                    | —         | Default pressed state (uncontrolled) |
| onPressedChange | (pressed: boolean) => void | —         | Pressed state change callback        |
| variant         | 'default' \| 'outline'     | 'default' | Visual variant                       |
| size            | 'sm' \| 'md' \| 'lg'       | 'md'      | Button size                          |
| disabled        | boolean                    | —         | Disable the toggle                   |
| children        | ReactNode                  | —         | Toggle content (icon/text)           |

## Examples

### Basic Usage

```tsx
import { Toggle } from "@orion-ds/react";
import { Bold } from "lucide-react";

<Toggle aria-label="Toggle bold">
  <Bold size={16} />
</Toggle>;
```

### Controlled with Outline Variant

```tsx
const [bold, setBold] = useState(false);

<Toggle
  pressed={bold}
  onPressedChange={setBold}
  variant="outline"
  aria-label="Toggle bold"
>
  <Bold size={16} />
</Toggle>;
```

### Different Sizes

```tsx
<Toggle size="sm"><Bold size={14} /></Toggle>
<Toggle size="md"><Bold size={16} /></Toggle>
<Toggle size="lg"><Bold size={20} /></Toggle>
```

## Accessibility

- Uses `aria-pressed` to indicate toggle state
- Supports keyboard activation (Enter/Space)
- Visible focus states via `:focus-visible`
- Always include `aria-label` for icon-only toggles

## Token Usage

- `--surface-subtle` — Default background
- `--interactive-primary` — Pressed state background
- `--text-primary` — Icon/text color
- `--border-subtle` — Outline variant border
- `--radius-control` — Border radius
- `--spacing-2` — Internal padding
