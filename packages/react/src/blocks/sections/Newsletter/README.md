# Newsletter (Section)

An email subscription form section for building subscriber lists. Designed for landing pages and marketing sites to capture visitor email addresses.

## When to Use

| Scenario                 | Use Newsletter                     |
| ------------------------ | ---------------------------------- |
| Email list signup form   | ✅ Yes - dedicated component       |
| Homepage subscription    | ✅ Yes - common CTA section        |
| Blog newsletter signup   | ✅ Yes - engaged audience          |
| Landing page bottom CTA  | ✅ Yes - secondary conversion      |
| Simple one-off form      | ❌ No - use Form component instead |
| Complex multi-field form | ❌ No - use dedicated form builder |

## Props Reference

| Prop        | Type                    | Default            | Description                             |
| ----------- | ----------------------- | ------------------ | --------------------------------------- |
| title       | string                  | —                  | Form heading (required)                 |
| description | string                  | —                  | Description text above input (optional) |
| placeholder | string                  | "Enter your email" | Input placeholder text                  |
| submitLabel | string                  | "Subscribe"        | Button text                             |
| disclaimer  | string                  | —                  | Small text below the form (optional)    |
| size        | "sm" \| "md"            | "md"               | Form size variant                       |
| onSubmit    | (email: string) => void | —                  | Callback when form submitted (optional) |
| className   | string                  | —                  | Additional CSS class                    |

## Examples

### Basic Newsletter Form

```tsx
import { Newsletter } from "@orion-ds/react";

<Newsletter
  title="Join our newsletter"
  description="Get the latest updates delivered to your inbox"
  onSubmit={(email) => console.log("Subscribe:", email)}
/>;
```

### Compact Form with Disclaimer

```tsx
<Newsletter
  title="Stay updated"
  description="Weekly insights from our team"
  size="sm"
  disclaimer="We never spam. Unsubscribe anytime."
  onSubmit={handleSubscribe}
/>
```

## Accessibility

- Form label is associated with input via title prop
- Submit button is keyboard accessible
- Input field is focusable with visible focus state
- Disclaimer text provides context for privacy-conscious users

## Token Usage

- `--surface-layer` — Form background
- `--text-primary` — Title text
- `--text-secondary` — Description and disclaimer
- `--interactive-primary` — Submit button
- `--border-subtle` — Input border
- `--spacing-4` — Input padding
- `--spacing-6` — Form field spacing
- `--radius-control` — Input and button border radius
