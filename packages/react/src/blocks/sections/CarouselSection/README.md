# CarouselSection (Section)

A carousel/slider section displaying items with auto-scroll capability, navigation controls, and optional links. Great for showcasing featured content.

## When to Use

| Scenario                  | Use CarouselSection                 |
| ------------------------- | ----------------------------------- |
| Featured content rotation | ✅ Yes - auto-scrolling items       |
| Product showcase          | ✅ Yes - image-heavy display        |
| Customer testimonials     | ✅ Yes - rotating quotes            |
| Static item listing       | ❌ No - use Gallery or Blog instead |
| Single item display       | ❌ No - use Card component instead  |

## Props Reference

| Prop               | Type           | Default | Description                          |
| ------------------ | -------------- | ------- | ------------------------------------ |
| items              | CarouselItem[] | —       | Array of carousel items              |
| title              | string         | —       | Section heading                      |
| description        | string         | —       | Section description                  |
| autoScroll         | boolean        | —       | Enable automatic scrolling           |
| autoScrollInterval | number         | —       | Auto-scroll interval in milliseconds |
| className          | string         | —       | Additional CSS class                 |

### CarouselItem

| Prop        | Type   | Description          |
| ----------- | ------ | -------------------- |
| id          | string | Unique identifier    |
| title       | string | Item title           |
| image       | string | Image URL            |
| description | string | Optional description |
| href        | string | Optional link URL    |

## Examples

### Basic Carousel

```tsx
import { CarouselSection } from "@orion-ds/react";

<CarouselSection
  title="Featured Products"
  items={[
    { id: "1", title: "Product A", image: "/products/a.jpg" },
    { id: "2", title: "Product B", image: "/products/b.jpg" },
    { id: "3", title: "Product C", image: "/products/c.jpg" },
  ]}
/>;
```

### With Auto-scroll

```tsx
<CarouselSection
  title="Customer Wins"
  items={items}
  autoScroll={true}
  autoScrollInterval={5000}
/>
```

## Accessibility

- Navigation buttons are keyboard accessible
- Current slide indicator announced to screen readers
- Images have descriptive alt text
- Links are properly labeled
- Auto-play respects `prefers-reduced-motion`

## Token Usage

- `--surface-base` — Carousel background
- `--surface-layer` — Item card background
- `--text-primary` — Item title
- `--interactive-primary` — Navigation buttons
- `--border-subtle` — Item borders
- `--spacing-6` — Section padding
