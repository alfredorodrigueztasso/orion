# Features (Section)

A grid-based feature showcase section for displaying product features, capabilities, or benefits. Commonly used on marketing pages and product landing pages.

## When to Use

| Scenario                 | Use Features                      |
| ------------------------ | --------------------------------- |
| Product feature list     | ✅ Yes - grid layout with icons   |
| Service offerings        | ✅ Yes - structured feature cards |
| Key benefits section     | ✅ Yes - highlights capabilities  |
| Why choose us section    | ✅ Yes - comparative advantages   |
| Long text descriptions   | ❌ No - use prose section instead |
| Single feature highlight | ❌ No - use dedicated component   |

## Props Reference

| Prop        | Type          | Default | Description                                |
| ----------- | ------------- | ------- | ------------------------------------------ |
| title       | string        | —       | Section heading (optional)                 |
| description | string        | —       | Section description below title (optional) |
| items       | FeatureItem[] | —       | Array of features to display (required)    |
| columns     | 2 \| 3 \| 4   | 3       | Number of grid columns                     |
| className   | string        | —       | Additional CSS class                       |

### FeatureItem

| Prop        | Type      | Description                                  |
| ----------- | --------- | -------------------------------------------- |
| icon        | ReactNode | Icon element rendered above title (optional) |
| title       | string    | Feature name/title (required)                |
| description | string    | Feature description (required)               |

## Examples

### Standard Feature Grid

```tsx
import { Features } from "@orion-ds/react";
import { Zap, Shield, Layers } from "lucide-react";

<Features
  title="Powerful Features"
  items={[
    {
      icon: <Zap size={24} />,
      title: "Fast",
      description: "Optimized for speed",
    },
    {
      icon: <Shield size={24} />,
      title: "Secure",
      description: "Enterprise-grade security",
    },
    {
      icon: <Layers size={24} />,
      title: "Scalable",
      description: "Grows with your needs",
    },
  ]}
/>;
```

### Two-Column Layout

```tsx
<Features
  title="Key Capabilities"
  description="Everything you need to succeed"
  items={features}
  columns={2}
/>
```

## Accessibility

- Feature titles have proper heading hierarchy
- Icons are decorative (no aria-labels)
- Grid structure is semantically correct
- Description text is associated with each feature

## Token Usage

- `--surface-base` — Section background
- `--surface-layer` — Feature card backgrounds
- `--text-primary` — Feature titles
- `--text-secondary` — Feature descriptions
- `--spacing-6` — Icon spacing
- `--spacing-8` — Card padding
- `--radius-container` — Card border radius
