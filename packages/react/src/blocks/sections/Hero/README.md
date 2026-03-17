# Hero (Section)

A large hero banner section for page introductions with headline, description, and call-to-action buttons. Designed for landing pages, homepage, and product introductions.

## When to Use

| Scenario               | Use Hero                          |
| ---------------------- | --------------------------------- |
| Page headline section  | ✅ Yes - prominent introduction   |
| Product launch page    | ✅ Yes - large visual impact      |
| Homepage banner        | ✅ Yes - with CTAs                |
| Feature highlight      | ✅ Yes - draws attention          |
| Inline text content    | ❌ No - use prose section instead |
| Multiple hero sections | ❌ No - one hero per page maximum |

## Props Reference

| Prop            | Type                               | Default   | Description                                            |
| --------------- | ---------------------------------- | --------- | ------------------------------------------------------ |
| title           | ReactNode                          | —         | Heading content, can include Hero.Highlight (required) |
| description     | string                             | —         | Supporting text below title (optional)                 |
| primaryAction   | ReactNode                          | —         | Primary CTA button element (optional)                  |
| secondaryAction | ReactNode                          | —         | Secondary CTA button element (optional)                |
| align           | "center" \| "left"                 | "center"  | Text alignment                                         |
| size            | "sm" \| "md" \| "lg"               | "md"      | Size variant affecting typography and spacing          |
| variant         | "default" \| "gradient" \| "image" | "default" | Visual variant                                         |
| layout          | "stacked" \| "split"               | "stacked" | Layout mode                                            |
| backgroundImage | string                             | —         | Background image URL (for image variant)               |
| className       | string                             | —         | Additional CSS class                                   |

### Hero.Highlight

Static component for highlighting text with gradient:

| Prop      | Type      | Description          |
| --------- | --------- | -------------------- |
| children  | ReactNode | Text to highlight    |
| className | string    | Additional CSS class |

## Examples

### Basic Hero

```tsx
import { Hero, Button } from "@orion-ds/react";

<Hero
  title="Build amazing products"
  description="Create the future with our platform"
  primaryAction={<Button>Get Started</Button>}
/>;
```

### With Highlighted Text

```tsx
<Hero
  title={
    <>
      Build <Hero.Highlight>amazing</Hero.Highlight> products
    </>
  }
  description="Create the future with our platform"
  primaryAction={<Button>Get Started</Button>}
  secondaryAction={<Button variant="ghost">Learn more</Button>}
  size="lg"
/>
```

### Large Hero with Gradient

```tsx
<Hero
  title="The future is here"
  size="lg"
  variant="gradient"
  align="center"
  primaryAction={<Button>Join us</Button>}
/>
```

## Accessibility

- Title is properly structured with heading hierarchy
- CTA buttons are keyboard accessible
- Description text provides context
- Gradient text (Hero.Highlight) includes semantic text underneath

## Token Usage

- `--surface-base` — Background container
- `--text-primary` — Title text
- `--text-secondary` — Description text
- `--color-brand-400` — Highlight gradient start
- `--color-brand-600` — Highlight gradient end
- `--interactive-primary` — Primary action button
- `--spacing-16` — Title spacing
- `--spacing-6` — Action button gap
