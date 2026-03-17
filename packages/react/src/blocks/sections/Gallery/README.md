# Gallery (Section)

An image gallery section with responsive grid layout for displaying photos, screenshots, or media. Perfect for portfolios, product pages, and showcases.

## When to Use

| Scenario               | Use Gallery                             |
| ---------------------- | --------------------------------------- |
| Portfolio images       | ✅ Yes - grid with captions             |
| Product screenshots    | ✅ Yes - organized showcase             |
| Team photo gallery     | ✅ Yes - responsive layout              |
| Case study images      | ✅ Yes - with optional captions         |
| Lightbox modal gallery | ❌ No - use dedicated gallery component |
| Single large image     | ❌ No - use img tag directly            |

## Props Reference

| Prop      | Type           | Default | Description                           |
| --------- | -------------- | ------- | ------------------------------------- |
| title     | string         | —       | Section heading (optional)            |
| images    | GalleryImage[] | —       | Array of images to display (required) |
| columns   | 2 \| 3 \| 4    | 3       | Number of grid columns                |
| className | string         | —       | Additional CSS class                  |

### GalleryImage

| Prop    | Type   | Description                  |
| ------- | ------ | ---------------------------- |
| id      | string | Unique image identifier      |
| src     | string | Image URL                    |
| alt     | string | Alt text for accessibility   |
| caption | string | Optional caption below image |

## Examples

### Basic Gallery

```tsx
import { Gallery } from "@orion-ds/react";

<Gallery
  title="Project Showcase"
  images={[
    { id: "1", src: "/img1.jpg", alt: "Project 1" },
    { id: "2", src: "/img2.jpg", alt: "Project 2" },
    { id: "3", src: "/img3.jpg", alt: "Project 3" },
  ]}
/>;
```

### With Captions

```tsx
<Gallery
  title="Team Gallery"
  images={[
    { id: "1", src: "/team1.jpg", alt: "Jane", caption: "Design Lead" },
    { id: "2", src: "/team2.jpg", alt: "John", caption: "Engineering" },
  ]}
  columns={2}
/>
```

## Accessibility

- All images have descriptive alt text
- Image captions reinforce content
- Grid structure is semantic
- Responsive layout works on all screen sizes

## Token Usage

- `--surface-base` — Gallery background
- `--border-subtle` — Image borders/separators
- `--text-secondary` — Caption text
- `--spacing-4` — Gap between images
- `--radius-control` — Image border radius
