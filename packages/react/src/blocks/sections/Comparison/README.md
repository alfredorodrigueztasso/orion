# Comparison (Section)

A feature comparison table section for comparing multiple products, plans, or options side-by-side. Perfect for pricing pages and product comparisons.

## When to Use

| Scenario                | Use Comparison                       |
| ----------------------- | ------------------------------------ |
| Pricing plan comparison | ✅ Yes - shows plan features         |
| Product feature matrix  | ✅ Yes - side-by-side features       |
| Service tiers           | ✅ Yes - highlights differences      |
| Single product features | ❌ No - use Features section instead |
| Narrative comparison    | ❌ No - use text or Blog instead     |

## Props Reference

| Prop      | Type                | Default | Description              |
| --------- | ------------------- | ------- | ------------------------ |
| title     | string              | —       | Section heading          |
| columns   | ComparisonColumn[]  | —       | Column definitions       |
| features  | ComparisonFeature[] | —       | Feature rows with values |
| className | string              | —       | Additional CSS class     |

### ComparisonColumn

| Prop        | Type    | Description                            |
| ----------- | ------- | -------------------------------------- |
| title       | string  | Column header text                     |
| highlighted | boolean | Highlight this column                  |
| badge       | string  | Optional badge label (e.g., "Popular") |

### ComparisonFeature

| Prop   | Type                  | Description                        |
| ------ | --------------------- | ---------------------------------- |
| name   | string                | Feature name                       |
| values | (boolean \| string)[] | Values per column (one per column) |

## Examples

### Pricing Comparison

```tsx
import { Comparison } from "@orion-ds/react";

<Comparison
  title="Plan Comparison"
  columns={[
    { title: "Starter", highlighted: false },
    { title: "Pro", highlighted: true, badge: "Popular" },
    { title: "Enterprise" },
  ]}
  features={[
    { name: "Users", values: ["1", "5", "Unlimited"] },
    { name: "Storage", values: ["5 GB", "100 GB", "Custom"] },
    { name: "Support", values: [false, true, true] },
  ]}
/>;
```

### Product Features

```tsx
<Comparison
  title="Feature Matrix"
  columns={[{ title: "Basic" }, { title: "Standard" }, { title: "Advanced" }]}
  features={[
    { name: "API Access", values: [false, true, true] },
    { name: "Analytics", values: [false, true, true] },
    { name: "Custom Domain", values: [false, false, true] },
  ]}
/>
```

## Accessibility

- Table structure is semantically correct
- Column headers are marked with proper scope
- Boolean values are displayed as checkmarks/crosses
- Feature names are clearly associated with values

## Token Usage

- `--surface-base` — Table background
- `--surface-layer` — Row backgrounds
- `--text-primary` — Feature names
- `--interactive-primary` — Highlighted column
- `--status-success` — Checkmark indicators
- `--border-subtle` — Table grid lines
- `--spacing-4` — Cell padding
