# Carousel Component

An atomic carousel component with horizontal scrolling, snap behavior, and peek effect. This is a low-level component designed for use within cards, modals, or custom layouts.

**For full-page carousel sections with title/description, use `CarouselSection` from sections.**

## When to Use

| Need                           | Use                                   |
| ------------------------------ | ------------------------------------- |
| Carousel inside a Card         | `<Carousel />` (this component)       |
| Carousel inside a Modal        | `<Carousel />` (this component)       |
| Carousel in custom layout      | `<Carousel />` (this component)       |
| Full-page carousel section     | `<CarouselSection />` (from sections) |
| Carousel with title/background | `<CarouselSection />` (from sections) |

## Installation

```tsx
import { Carousel } from "@orion/react";
// or
import { Carousel } from "@orion/react/components";
```

## Basic Usage

```tsx
import { Carousel } from "@orion/react";
import { Card } from "@orion/react";

// Inside a Card
function ProductShowcase() {
  return (
    <Card>
      <Carousel
        items={[
          {
            image: <img src="/product-1.jpg" alt="Product 1" />,
            title: "Product 1",
            description: "Amazing product",
            overlay: "gradient",
          },
          {
            image: <img src="/product-2.jpg" alt="Product 2" />,
            title: "Product 2",
            description: "Another great product",
            overlay: "gradient",
          },
        ]}
        variant="product"
        aspectRatio="1/1"
      />
    </Card>
  );
}
```

## Inside a Modal

```tsx
import { Modal, Carousel } from "@orion/react";

function ImageGalleryModal({ images, open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} size="lg">
      <Modal.Body>
        <Carousel
          items={images.map((src) => ({
            image: <img src={src} alt="" />,
            title: "",
            overlay: "none",
          }))}
          variant="gallery"
          aspectRatio="16/9"
          showNavigation
          showPagination
        />
      </Modal.Body>
    </Modal>
  );
}
```

## Props

| Prop                 | Type                                    | Default       | Description                          |
| -------------------- | --------------------------------------- | ------------- | ------------------------------------ |
| `items`              | `CarouselItem[]`                        | required      | Array of carousel items              |
| `variant`            | `'editorial' \| 'product' \| 'gallery'` | `'editorial'` | Visual style variant                 |
| `aspectRatio`        | `'16/9' \| '4/3' \| '1/1' \| '3/4'`     | `'16/9'`      | Card aspect ratio                    |
| `peek`               | `boolean`                               | `true`        | Show cards cut at edge (Apple style) |
| `gap`                | `'sm' \| 'md' \| 'lg'`                  | `'md'`        | Gap between cards                    |
| `align`              | `'container' \| 'edge'`                 | `'edge'`      | Track alignment                      |
| `showNavigation`     | `boolean`                               | `true`        | Show navigation arrows               |
| `showPagination`     | `boolean`                               | `false`       | Show pagination dots                 |
| `autoScroll`         | `boolean`                               | `false`       | Enable auto-scroll                   |
| `autoScrollInterval` | `number`                                | `5000`        | Auto-scroll interval (ms)            |
| `onSlideChange`      | `(index: number) => void`               | -             | Callback when slide changes          |
| `renderNavigation`   | `(props: NavigationProps) => ReactNode` | -             | Custom navigation renderer           |

## CarouselItem

```typescript
interface CarouselItem {
  image: ReactNode; // Background image element
  title: string; // Card headline
  eyebrow?: string; // Category/tag text
  description?: string; // Subtitle/description
  action?: ReactNode; // Optional button/link
  overlay?: "none" | "gradient" | "dark";
}
```

## Variants

### Editorial (Default)

Magazine-style cards with large images and text overlays.

```tsx
<Carousel variant="editorial" items={items} />
```

### Product

Product showcase cards with separate content area.

```tsx
<Carousel variant="product" aspectRatio="1/1" items={items} />
```

### Gallery

Simple image gallery with hover-reveal content.

```tsx
<Carousel variant="gallery" items={items} />
```

## Alignment

The `align` prop controls where the carousel track starts:

```tsx
// Cards start from screen edge (Apple style)
<Carousel align="edge" items={items} />

// Cards aligned with container (matches section title)
<Carousel align="container" items={items} />
```

## Custom Navigation

```tsx
<Carousel
  items={items}
  renderNavigation={({
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
  }) => (
    <div className="custom-nav">
      <button onClick={scrollLeft} disabled={!canScrollLeft}>
        Prev
      </button>
      <button onClick={scrollRight} disabled={!canScrollRight}>
        Next
      </button>
    </div>
  )}
/>
```

## Accessibility

- Uses `role="region"` with `aria-label="Carousel"`
- Navigation buttons have proper `aria-label`
- Pagination dots have `aria-label` for each slide
- Supports keyboard navigation when focused

## Related

- [CarouselSection](../../sections/CarouselSection/README.md) - Full-page carousel with title/description
