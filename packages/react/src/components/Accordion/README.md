# Accordion

Expandable/collapsible content sections.

## Props

| Prop              | Type                                     | Default      | Description                         |
| ----------------- | ---------------------------------------- | ------------ | ----------------------------------- |
| `items`           | `AccordionItem[]`                        | **required** | Accordion items                     |
| `variant`         | `'default' \| 'bordered' \| 'separated'` | `'default'`  | Visual variant                      |
| `allowMultiple`   | `boolean`                                | `false`      | Allow multiple open items           |
| `defaultExpanded` | `string[]`                               | `[]`         | Default expanded IDs (uncontrolled) |
| `expanded`        | `string[]`                               | -            | Controlled expanded IDs             |
| `onChange`        | `(expandedIds: string[]) => void`        | -            | Expansion change callback           |
| `animated`        | `boolean`                                | `true`       | Animate expand/collapse             |

### AccordionItem

```ts
interface AccordionItem {
  id: string; // Unique identifier
  title: ReactNode; // Header content
  content: ReactNode; // Body content
  disabled?: boolean; // Disabled state
  icon?: ReactNode; // Icon before title
}
```

## Usage

### Basic

```tsx
import { Accordion } from "@orion/react";

<Accordion
  items={[
    {
      id: "faq-1",
      title: "What is your return policy?",
      content: "You can return items within 30 days of purchase.",
    },
    {
      id: "faq-2",
      title: "How long does shipping take?",
      content: "Standard shipping takes 5-7 business days.",
    },
    {
      id: "faq-3",
      title: "Do you ship internationally?",
      content: "Yes, we ship to over 100 countries.",
    },
  ]}
/>;
```

### Allow Multiple Open

```tsx
<Accordion items={items} allowMultiple />
```

### Default Expanded

```tsx
<Accordion items={items} defaultExpanded={["faq-1", "faq-2"]} allowMultiple />
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [expanded, setExpanded] = useState<string[]>(["faq-1"]);

  return (
    <Accordion
      items={items}
      expanded={expanded}
      onChange={setExpanded}
      allowMultiple
    />
  );
}
```

### Variants

```tsx
// Default - minimal styling
<Accordion items={items} variant="default" />

// Bordered - with border around all items
<Accordion items={items} variant="bordered" />

// Separated - each item is a separate card
<Accordion items={items} variant="separated" />
```

### With Icons

```tsx
import { CreditCard, Truck, RefreshCw } from "lucide-react";

<Accordion
  items={[
    {
      id: "payment",
      title: "Payment options",
      icon: <CreditCard size={18} />,
      content: "We accept all major credit cards...",
    },
    {
      id: "shipping",
      title: "Shipping information",
      icon: <Truck size={18} />,
      content: "Free shipping on orders over $50...",
    },
    {
      id: "returns",
      title: "Returns & exchanges",
      icon: <RefreshCw size={18} />,
      content: "30-day hassle-free returns...",
    },
  ]}
/>;
```

### Disabled Items

```tsx
<Accordion
  items={[
    { id: "1", title: "Enabled section", content: "Content here" },
    {
      id: "2",
      title: "Disabled section",
      content: "Cannot open",
      disabled: true,
    },
    { id: "3", title: "Another enabled", content: "More content" },
  ]}
/>
```

### Without Animation

```tsx
<Accordion items={items} animated={false} />
```

### Rich Content

```tsx
<Accordion
  items={[
    {
      id: "details",
      title: <strong>Product Details</strong>,
      content: (
        <div>
          <p>Full description with formatting.</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
          </ul>
          <Button size="sm">Learn more</Button>
        </div>
      ),
    },
  ]}
/>
```

## Tokens Used

- `--surface-base` - Content background
- `--surface-subtle` - Header background (hover)
- `--border-subtle` - Borders
- `--text-primary` - Title text
- `--text-secondary` - Content text
- `--spacing-3`, `--spacing-4` - Padding
- `--radius-control` - Border radius (separated variant)

## Accessibility

- Uses `<button>` for headers
- `aria-expanded` indicates state
- `aria-controls` links header to panel
- Panel has `role="region"` and `aria-labelledby`
- Keyboard: Enter/Space to toggle
- Disabled items have `aria-disabled`
