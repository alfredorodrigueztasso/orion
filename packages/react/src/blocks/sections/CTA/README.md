# CTA (Section)

A call-to-action section with a headline, description, and action buttons. Designed to drive user engagement and conversions.

## When to Use

| Scenario                | Use CTA                                     |
| ----------------------- | ------------------------------------------- |
| End of content sections | ✅ Yes - prompts next action                |
| Signup prompts          | ✅ Yes - encourages registration            |
| Feature promotion       | ✅ Yes - highlights key benefits            |
| Inline action           | ❌ No - use Button component instead        |
| Form submission         | ❌ No - use Form with submit button instead |

## Props Reference

| Prop        | Type                             | Default   | Description                 |
| ----------- | -------------------------------- | --------- | --------------------------- |
| title       | string                           | —         | Main heading text           |
| description | string                           | —         | Supporting description text |
| variant     | "default" \| "brand" \| "subtle" | "default" | CTA style variant           |
| actions     | ReactNode                        | —         | Action buttons (ReactNode)  |
| className   | string                           | —         | Additional CSS class        |

## Examples

### Basic CTA

```tsx
import { CTA } from "@orion-ds/react";
import { Button } from "@orion-ds/react";

<CTA
  title="Ready to get started?"
  description="Join thousands of users simplifying their workflow"
  actions={<Button variant="primary">Get Started Free</Button>}
/>;
```

### Brand Variant with Multiple Actions

```tsx
<CTA
  title="Upgrade Your Plan"
  description="Unlock advanced features and grow your business"
  variant="brand"
  actions={
    <div style={{ display: "flex", gap: "16px" }}>
      <Button variant="primary">Upgrade Now</Button>
      <Button variant="secondary">Learn More</Button>
    </div>
  }
/>
```

### Subtle Variant

```tsx
<CTA
  title="Need help?"
  description="Our support team is ready to assist you"
  variant="subtle"
  actions={<Button variant="ghost">Contact Support</Button>}
/>
```

## Accessibility

- Heading uses proper semantic heading level
- Button actions are keyboard accessible
- Description text is readable and clear
- Color contrast meets WCAG standards

## Token Usage

- `--surface-base` — CTA section background
- `--surface-layer` — Card background (subtle variant)
- `--text-primary` — Heading text
- `--text-secondary` — Description text
- `--interactive-primary` — Primary action button
- `--interactive-secondary` — Secondary action button
- `--spacing-8` — Section padding
