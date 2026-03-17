# Breadcrumb

Navigation trail showing the current page location within a hierarchy.

## Props

| Prop              | Type                               | Default      | Description                   |
| ----------------- | ---------------------------------- | ------------ | ----------------------------- |
| `items`           | `BreadcrumbItem[]`                 | **required** | Breadcrumb items              |
| `separator`       | `'chevron' \| 'slash' \| 'custom'` | `'chevron'`  | Separator type                |
| `customSeparator` | `ReactNode`                        | -            | Custom separator element      |
| `showHomeIcon`    | `boolean`                          | `false`      | Show home icon for first item |
| `maxItems`        | `number`                           | -            | Max items before collapsing   |
| `size`            | `'sm' \| 'md' \| 'lg'`             | `'md'`       | Breadcrumb size               |
| `linkProps`       | `AnchorHTMLAttributes`             | -            | Props for all links           |

### BreadcrumbItem

```ts
interface BreadcrumbItem {
  label: string; // Item text
  href?: string; // Link URL (optional for current page)
  icon?: ReactNode; // Optional icon
}
```

## Usage

### Basic

```tsx
import { Breadcrumb } from "@orion/react";

<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptops", href: "/products/laptops" },
    { label: "MacBook Pro" }, // Current page (no href)
  ]}
/>;
```

### With Home Icon

```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Settings", href: "/settings" },
    { label: "Profile" },
  ]}
  showHomeIcon
/>
```

### Custom Separators

```tsx
// Slash separator
<Breadcrumb
  items={items}
  separator="slash"
/>

// Custom separator
<Breadcrumb
  items={items}
  separator="custom"
  customSeparator={<span>→</span>}
/>
```

### With Icons

```tsx
import { Home, Folder, File } from "lucide-react";

<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: <Home size={14} /> },
    { label: "Documents", href: "/docs", icon: <Folder size={14} /> },
    { label: "Report.pdf", icon: <File size={14} /> },
  ]}
/>;
```

### Collapsed (Max Items)

```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Category", href: "/category" },
    { label: "Subcategory", href: "/category/sub" },
    { label: "Section", href: "/category/sub/section" },
    { label: "Current Page" },
  ]}
  maxItems={3}
/>
// Shows: Home / ... / Current Page
```

### Sizes

```tsx
<Breadcrumb items={items} size="sm" />
<Breadcrumb items={items} size="md" />
<Breadcrumb items={items} size="lg" />
```

### With Router Integration

```tsx
// Using React Router
import { Link } from "react-router-dom";

<Breadcrumb
  items={items}
  linkProps={{
    as: Link,
    // Link-specific props
  }}
/>;

// Or render custom links
{
  items.map((item, i) =>
    item.href ? (
      <Link to={item.href}>{item.label}</Link>
    ) : (
      <span>{item.label}</span>
    ),
  );
}
```

## Tokens Used

- `--text-secondary` - Link text
- `--text-primary` - Current page text
- `--text-tertiary` - Separator color
- `--interactive-primary` - Link hover
- `--spacing-2` - Item spacing
- `--font-secondary` - Font family

## Accessibility

- Uses `<nav>` with `aria-label="Breadcrumb"`
- Ordered list (`<ol>`) structure
- Current page has `aria-current="page"`
- Separators hidden from screen readers
- Links are keyboard focusable
