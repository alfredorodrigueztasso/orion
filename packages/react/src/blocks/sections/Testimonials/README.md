# Testimonials (Section)

A customer testimonials section showcasing quotes and reviews in a grid layout. Designed for landing pages, case studies, and marketing sites.

## When to Use

| Scenario           | Use Testimonials                         |
| ------------------ | ---------------------------------------- |
| Customer quotes    | ✅ Yes - displays multiple testimonials  |
| Social proof       | ✅ Yes - builds credibility with reviews |
| Landing page       | ✅ Yes - feature customer feedback       |
| Case study section | ✅ Yes - shows client satisfaction       |
| Single testimonial | ❌ No - use Card with quote content      |
| Long-form review   | ❌ No - use custom layout                |

## Props Reference

| Prop         | Type                | Default   | Description                      |
| ------------ | ------------------- | --------- | -------------------------------- |
| title        | string              | —         | Section heading                  |
| description  | string              | —         | Section description              |
| testimonials | TestimonialItem[]   | —         | Array of testimonials (required) |
| columns      | 2 \| 3              | 2         | Grid column count                |
| variant      | TestimonialsVariant | "default" | Visual layout style              |
| className    | string              | —         | Additional CSS class             |

### TestimonialItem

| Prop   | Type              | Description                   |
| ------ | ----------------- | ----------------------------- |
| quote  | string            | Testimonial text (required)   |
| author | TestimonialAuthor | Author information (required) |
| rating | number            | Star rating 1-5               |

### TestimonialAuthor

| Prop    | Type      | Description            |
| ------- | --------- | ---------------------- |
| name    | string    | Author name (required) |
| role    | string    | Job title or role      |
| company | string    | Company name           |
| avatar  | ReactNode | Avatar element         |

## Examples

### Default Testimonials Grid

```tsx
import { Testimonials } from "@orion-ds/react";

<Testimonials
  title="What Our Customers Say"
  testimonials={[
    {
      quote: "This product transformed our workflow completely",
      author: {
        name: "Jane Smith",
        role: "Product Manager",
        company: "TechCorp",
      },
      rating: 5,
    },
    {
      quote: "Best investment we made this year",
      author: {
        name: "John Doe",
        role: "CTO",
        company: "StartupXYZ",
      },
      rating: 5,
    },
  ]}
  columns={2}
/>;
```

### Minimal Variant with Two Columns

```tsx
<Testimonials
  testimonials={[
    {
      quote: "Outstanding support and documentation",
      author: { name: "Alice Johnson", company: "BigCorp" },
    },
  ]}
  variant="minimal"
  columns={3}
/>
```

## Accessibility

- Testimonial quotes use blockquote semantics
- Author information is clearly presented
- Star ratings are accessible with aria-label
- Avatar images have alt text from author name
- Quote text is semantically marked

## Token Usage

- `--surface-base` — Section background
- `--surface-layer` — Testimonial card backgrounds
- `--border-subtle` — Card borders
- `--text-primary` — Quote text and author names
- `--text-secondary` — Author role and company
- `--text-brand` — Star ratings
- `--spacing-4` — Card padding
- `--radius-container` — Card border radius
