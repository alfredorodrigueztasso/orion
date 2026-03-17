# Stats (Section)

A metrics and statistics section displaying key performance indicators in various layouts. Designed for dashboards, landing pages, and analytics screens.

## When to Use

| Scenario             | Use Stats                         |
| -------------------- | --------------------------------- |
| Dashboard metrics    | ✅ Yes - displays KPIs in cards   |
| Landing page metrics | ✅ Yes - highlights achievements  |
| Analytics summary    | ✅ Yes - shows trends with icons  |
| Trend indicators     | ✅ Yes - positive/negative trends |
| Detailed data table  | ❌ No - use DataTable component   |
| Single metric        | ❌ No - use MetricCard component  |

## Props Reference

| Prop      | Type         | Default   | Description                    |
| --------- | ------------ | --------- | ------------------------------ |
| title     | string       | —         | Section heading                |
| stats     | StatItem[]   | —         | Array of statistics (required) |
| columns   | 2 \| 3 \| 4  | 3         | Grid column count              |
| variant   | StatsVariant | "default" | Visual layout variant          |
| className | string       | —         | Additional CSS class           |

### StatItem

| Prop  | Type      | Description                        |
| ----- | --------- | ---------------------------------- |
| value | string    | Metric value (e.g., "2,450")       |
| label | string    | Metric label (e.g., "Total Users") |
| icon  | ReactNode | Optional icon element              |
| trend | StatTrend | Optional trend indicator           |

### StatTrend

| Prop     | Type    | Description                                         |
| -------- | ------- | --------------------------------------------------- |
| value    | string  | Trend percentage (e.g., "+12%")                     |
| positive | boolean | Whether trend is positive (green) or negative (red) |

## Examples

### Default Grid Layout

```tsx
import { Stats } from "@orion-ds/react";
import { TrendingUp, Users } from "lucide-react";

<Stats
  title="Platform Metrics"
  stats={[
    { value: "12,450", label: "Total Users", icon: <Users size={20} /> },
    {
      value: "$52K",
      label: "Revenue",
      trend: { value: "+23%", positive: true },
    },
    { value: "94%", label: "Satisfaction" },
  ]}
  columns={3}
/>;
```

### Cards Variant with Trends

```tsx
<Stats
  stats={[
    {
      value: "8,234",
      label: "Transactions",
      trend: { value: "+5%", positive: true },
    },
    {
      value: "2.4s",
      label: "Avg Response",
      trend: { value: "-12%", positive: true },
    },
  ]}
  variant="cards"
  columns={2}
/>
```

### Inline Variant (Compact)

```tsx
<Stats
  stats={[
    { value: "99.9%", label: "Uptime" },
    { value: "500K+", label: "Requests/day" },
  ]}
  variant="inline"
  columns={4}
/>
```

## Accessibility

- Stat items use semantic heading/description pairs
- Metrics are announced with their labels
- Trend indicators include positive/negative semantics
- Icons are decorative and don't require alt text

## Token Usage

- `--surface-base` — Section background
- `--surface-layer` — Stat card backgrounds (cards variant)
- `--border-subtle` — Card borders
- `--text-primary` — Metric values and labels
- `--text-secondary` — Metric labels in default variant
- `--text-brand` — Highlighted values
- `--status-success` — Positive trend color
- `--status-error` — Negative trend color
- `--spacing-4` — Card padding
- `--radius-container` — Card border radius
