# Breadcrumbs (Section)

A breadcrumb navigation component displaying the current page location within a hierarchy. Helps users understand site structure and navigate back.

## When to Use

| Scenario                     | Use Breadcrumbs                           |
| ---------------------------- | ----------------------------------------- |
| Showing navigation hierarchy | ✅ Yes - displays page location           |
| E-commerce product pages     | ✅ Yes - category > subcategory > product |
| Documentation sites          | ✅ Yes - section > subsection > page      |
| Flat site structure          | ❌ No - not needed for linear navigation  |
| Mobile-first apps            | ❌ No - use back button instead           |

## Props Reference

| Prop      | Type             | Default | Description                             |
| --------- | ---------------- | ------- | --------------------------------------- |
| items     | BreadcrumbItem[] | —       | Breadcrumb items (last is current page) |
| separator | string           | "/"     | Custom separator character              |
| className | string           | —       | Additional CSS class                    |

### BreadcrumbItem

| Prop  | Type   | Description                      |
| ----- | ------ | -------------------------------- |
| id    | string | Unique identifier                |
| label | string | Display text                     |
| href  | string | Link URL (omit for current page) |

## Examples

### Basic Breadcrumbs

```tsx
import { Breadcrumbs } from "@orion-ds/react";

<Breadcrumbs
  items={[
    { id: "1", label: "Home", href: "/" },
    { id: "2", label: "Products", href: "/products" },
    { id: "3", label: "Electronics" },
  ]}
/>;
```

### Custom Separator

```tsx
<Breadcrumbs
  items={[
    { id: "1", label: "Docs", href: "/docs" },
    { id: "2", label: "Components", href: "/docs/components" },
    { id: "3", label: "Button" },
  ]}
  separator="→"
/>
```

## Accessibility

- Last item (current page) is not a link and has `aria-current="page"`
- Navigation landmarks properly structured as `<nav>`
- Links have descriptive text for screen readers
- Separator is semantic and not announced

## Token Usage

- `--text-primary` — Link text color
- `--text-secondary` — Current page text
- `--interactive-primary` — Link hover state
- `--spacing-2` — Item spacing
