# SocialProof (Section)

A social proof section combining company logos, customer testimonials, and key metrics. Designed for landing pages and marketing sites to build credibility.

## When to Use

| Scenario                  | Use SocialProof                       |
| ------------------------- | ------------------------------------- |
| Landing page social proof | ✅ Yes - logos + testimonials + stats |
| Client showcase           | ✅ Yes - display client logos         |
| Customer testimonials     | ✅ Yes - quotes from customers        |
| Trust indicators          | ✅ Yes - metrics to build credibility |
| Single testimonial        | ❌ No - use Testimonials section      |
| Data metrics only         | ❌ No - use Stats section             |

## Props Reference

| Prop         | Type                     | Default | Description                |
| ------------ | ------------------------ | ------- | -------------------------- |
| title        | string                   | —       | Section heading (required) |
| logos        | SocialProofLogo[]        | —       | Company logos to display   |
| testimonials | SocialProofTestimonial[] | —       | Customer testimonials      |
| stats        | SocialProofStat[]        | —       | Key metrics                |
| compact      | boolean                  | —       | Compact mode (stats only)  |
| className    | string                   | —       | Additional CSS class       |

### SocialProofLogo

| Prop | Type   | Description    |
| ---- | ------ | -------------- |
| name | string | Company name   |
| logo | string | Logo image URL |

### SocialProofTestimonial

| Prop    | Type             | Description       |
| ------- | ---------------- | ----------------- |
| id      | string \| number | Unique identifier |
| quote   | string           | Testimonial text  |
| author  | string           | Author name       |
| title   | string           | Author job title  |
| company | string           | Author company    |

### SocialProofStat

| Prop  | Type   | Description                            |
| ----- | ------ | -------------------------------------- |
| value | string | Metric value (e.g., "10K")             |
| label | string | Metric label (e.g., "Happy Customers") |

## Examples

### Full Social Proof Section

```tsx
import { SocialProof } from "@orion-ds/react";

<SocialProof
  title="Trusted by Industry Leaders"
  logos={[
    { name: "Company A", logo: "/logos/a.svg" },
    { name: "Company B", logo: "/logos/b.svg" },
  ]}
  testimonials={[
    {
      id: 1,
      quote: "This product changed how we work",
      author: "Jane Doe",
      title: "CEO",
      company: "TechCorp",
    },
  ]}
  stats={[
    { value: "10K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
  ]}
/>;
```

### Compact Mode (Stats Only)

```tsx
<SocialProof
  title="By The Numbers"
  compact
  stats={[
    { value: "1M+", label: "Transactions" },
    { value: "$500K+", label: "Processed" },
  ]}
/>
```

## Accessibility

- Logos are displayed as images with alt text
- Testimonial quotes use blockquote semantics
- Metrics are presented in semantic heading/value pairs
- Logos have descriptive alt attributes from name prop

## Token Usage

- `--surface-base` — Section background
- `--surface-subtle` — Logo container background
- `--surface-layer` — Testimonial card backgrounds
- `--border-subtle` — Card borders
- `--text-primary` — Section title and testimonial quotes
- `--text-secondary` — Author attribution and stat labels
- `--text-brand` — Highlighted stat values
- `--spacing-4` — Section padding
- `--radius-container` — Testimonial card radius
