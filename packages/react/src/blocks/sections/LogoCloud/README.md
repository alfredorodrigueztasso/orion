# LogoCloud (Section)

A logo showcase section for displaying partner logos, client logos, or brand endorsements. Commonly used to build social proof on marketing pages.

## When to Use

| Scenario                   | Use LogoCloud                         |
| -------------------------- | ------------------------------------- |
| Featured partners/clients  | ✅ Yes - shows social proof           |
| Brand partners section     | ✅ Yes - builds credibility           |
| Customer logos on homepage | ✅ Yes - common pattern               |
| Integrations showcase      | ✅ Yes - displays supported platforms |
| Text content               | ❌ No - use prose section instead     |
| Individual logo display    | ❌ No - use img tag directly          |

## Props Reference

| Prop      | Type       | Default | Description                          |
| --------- | ---------- | ------- | ------------------------------------ |
| title     | string     | —       | Section heading (optional)           |
| logos     | LogoItem[] | —       | Array of logos to display (required) |
| className | string     | —       | Additional CSS class                 |

### LogoItem

| Prop | Type      | Description                         |
| ---- | --------- | ----------------------------------- |
| name | string    | Company/brand name                  |
| logo | ReactNode | Logo element (typically img or SVG) |
| href | string    | Optional link to partner website    |

## Examples

### Basic Logo Cloud

```tsx
import { LogoCloud } from "@orion-ds/react";

<LogoCloud
  title="Trusted by leading companies"
  logos={[
    { name: "Acme", logo: <img src="/acme.svg" alt="Acme" /> },
    { name: "Tech Corp", logo: <img src="/techcorp.svg" alt="Tech Corp" /> },
    { name: "Global Inc", logo: <img src="/global.svg" alt="Global Inc" /> },
  ]}
/>;
```

### With Links

```tsx
<LogoCloud
  title="Our Partners"
  logos={[
    {
      name: "Partner 1",
      logo: <img src="/p1.svg" alt="Partner 1" />,
      href: "https://partner1.com",
    },
    {
      name: "Partner 2",
      logo: <img src="/p2.svg" alt="Partner 2" />,
      href: "https://partner2.com",
    },
  ]}
/>
```

## Accessibility

- Logo images have descriptive alt text via name prop
- Logos are semantically grouped
- Links are keyboard navigable
- No visual hierarchy imposed on logos (equal weight)

## Token Usage

- `--surface-base` — Container background
- `--surface-layer` — Logo item backgrounds
- `--text-secondary` — Logo text labels
- `--border-subtle` — Logo separators
- `--spacing-8` — Logo spacing
- `--radius-control` — Logo container radius
