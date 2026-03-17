# Link

Styled anchor component with variants and external link handling.

## Props

| Prop        | Type                               | Default     | Description      |
| ----------- | ---------------------------------- | ----------- | ---------------- |
| `variant`   | `'default' \| 'subtle' \| 'brand'` | `'default'` | Visual style     |
| `size`      | `'sm' \| 'md' \| 'lg'`             | `'md'`      | Link size        |
| `external`  | `boolean`                          | `false`     | Open in new tab  |
| `underline` | `boolean`                          | `true`      | Show underline   |
| `icon`      | `ReactNode`                        | -           | Icon before text |
| `iconRight` | `ReactNode`                        | -           | Icon after text  |
| `href`      | `string`                           | -           | Link destination |
| `children`  | `ReactNode`                        | -           | Link text        |

_Extends all native `<a>` attributes._

## Usage

### Basic

```tsx
import { Link } from "@orion/react";

<Link href="/about">About us</Link>;
```

### Variants

```tsx
<Link href="/page" variant="default">Default link</Link>
<Link href="/page" variant="subtle">Subtle link</Link>
<Link href="/page" variant="brand">Brand link</Link>
```

### Sizes

```tsx
<Link href="/page" size="sm">Small link</Link>
<Link href="/page" size="md">Medium link</Link>
<Link href="/page" size="lg">Large link</Link>
```

### External Link

```tsx
<Link href="https://example.com" external>
  Visit Example
</Link>
// Automatically adds target="_blank" rel="noopener noreferrer"
```

### Without Underline

```tsx
<Link href="/page" underline={false}>
  No underline
</Link>
```

### With Icons

```tsx
import { ArrowRight, ExternalLink } from 'lucide-react';

<Link href="/docs" iconRight={<ArrowRight size={14} />}>
  Documentation
</Link>

<Link href="https://github.com" external iconRight={<ExternalLink size={14} />}>
  GitHub
</Link>
```

### In Text

```tsx
<p>
  Read our <Link href="/terms">Terms of Service</Link> and{" "}
  <Link href="/privacy">Privacy Policy</Link> for more information.
</p>
```

### Navigation Links

```tsx
<nav>
  <Link href="/" variant="subtle" underline={false}>
    Home
  </Link>
  <Link href="/products" variant="subtle" underline={false}>
    Products
  </Link>
  <Link href="/contact" variant="subtle" underline={false}>
    Contact
  </Link>
</nav>
```

### With Router

```tsx
// Wrap with your router's Link component
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@orion/react";

<Link as={RouterLink} to="/dashboard" variant="brand">
  Go to Dashboard
</Link>;
```

## Tokens Used

- `--text-primary` - Default link color
- `--text-secondary` - Subtle link color
- `--text-brand` - Brand link color
- `--interactive-primary` - Hover color
- `--font-secondary` - Font family

## Accessibility

- Uses native `<a>` element
- External links have `rel="noopener noreferrer"`
- Focus visible styles included
- Icons have `aria-hidden="true"`
- External indicator visible to screen readers
