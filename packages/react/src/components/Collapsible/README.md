# Collapsible

A primitive component for toggling content visibility with a trigger. Supports both controlled and uncontrolled modes.

## When to Use

| Scenario                          | Use Collapsible                     |
| --------------------------------- | ----------------------------------- |
| Show/hide a single section        | ✅ Yes - simple toggle pattern      |
| Custom expandable UI elements     | ✅ Yes - unstyled, fully composable |
| FAQ or multiple expandable items  | ❌ No - use Accordion instead       |
| Navigation tree with nested items | ❌ No - use NavTree instead         |

## Props Reference

### Collapsible (Root)

| Prop         | Type                    | Default | Description                       |
| ------------ | ----------------------- | ------- | --------------------------------- |
| open         | boolean                 | —       | Controlled open state             |
| defaultOpen  | boolean                 | —       | Default open state (uncontrolled) |
| onOpenChange | (open: boolean) => void | —       | Callback when state changes       |
| disabled     | boolean                 | —       | Disable the trigger               |
| children     | ReactNode               | —       | Trigger and content components    |

### Collapsible.Trigger

| Prop     | Type      | Default | Description                               |
| -------- | --------- | ------- | ----------------------------------------- |
| asChild  | boolean   | —       | Render as child element instead of button |
| children | ReactNode | —       | Trigger content                           |

### Collapsible.Content

| Prop       | Type      | Default | Description                     |
| ---------- | --------- | ------- | ------------------------------- |
| forceMount | boolean   | —       | Keep content in DOM when closed |
| children   | ReactNode | —       | Collapsible content             |

## Examples

### Basic Usage

```tsx
import { Collapsible } from "@orion-ds/react";

<Collapsible>
  <Collapsible.Trigger>Toggle details</Collapsible.Trigger>
  <Collapsible.Content>
    <p>Hidden content revealed on toggle.</p>
  </Collapsible.Content>
</Collapsible>;
```

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Collapsible open={open} onOpenChange={setOpen}>
  <Collapsible.Trigger>{open ? "Hide" : "Show"} details</Collapsible.Trigger>
  <Collapsible.Content>
    <p>Controlled collapsible content.</p>
  </Collapsible.Content>
</Collapsible>;
```

## Accessibility

- Trigger has `aria-expanded` reflecting open state
- Content has `aria-hidden` when collapsed
- Trigger and content are linked via `aria-controls` / `id`
- Supports keyboard activation (Enter/Space)

## Token Usage

- `--spacing-2` — Gap between trigger and content
- `--border-subtle` — Optional border styling
- `--text-primary` — Trigger text color
