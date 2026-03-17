# MetricCards Section

> KPI dashboard cards displaying metrics with trends and sparklines.

## Quick Start

```tsx
import { MetricCards } from "@orion/react";

<MetricCards
  metrics={[
    {
      label: "Revenue",
      value: "$12,345",
      change: { value: "+12%", positive: true },
    },
    {
      label: "Users",
      value: "1,234",
      change: { value: "+5%", positive: true },
    },
    {
      label: "Conversion",
      value: "3.2%",
      change: { value: "-0.5%", positive: false },
    },
    {
      label: "Avg. Order",
      value: "$89.50",
      change: { value: "+8%", positive: true },
    },
  ]}
  columns={4}
/>;
```

---

## Features

- **Trend Indicators** — Positive/negative change with colors
- **Sparklines** — Mini charts showing data over time
- **Flexible Columns** — 2-5 column layouts
- **3 Variants** — Default, Compact, Detailed
- **Icons Support** — Optional metric icons
- **Loading States** — Skeleton placeholders
- **Clickable Cards** — Navigate to detail views
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface MetricCardsProps {
  // Content
  metrics: MetricItem[]; // REQUIRED - Array of metrics

  // Layout
  columns?: 2 | 3 | 4 | 5; // Grid columns - default: 4

  // Display
  variant?: "default" | "compact" | "detailed"; // default: 'default'
  loading?: boolean; // Loading state - default: false
}

interface MetricItem {
  id?: string; // Unique identifier
  label: string; // Metric name
  value: string | number; // Main value
  change?: MetricTrend; // Trend indicator
  icon?: ReactNode; // Optional icon
  sparkline?: number[]; // Sparkline data points
  href?: string; // Link to detail view
  onClick?: () => void; // Click handler
  description?: string; // Additional description
  loading?: boolean; // Individual loading state
}

interface MetricTrend {
  value: string; // Trend value (e.g., "+12%")
  positive?: boolean; // Positive trend - default: true
  label?: string; // Comparison label (e.g., "vs last month")
}
```

---

## Metric Configuration

### Basic Metric

```tsx
{
  label: 'Total Revenue',
  value: '$45,231'
}
```

### With Trend

```tsx
{
  label: 'Monthly Revenue',
  value: '$45,231',
  change: {
    value: '+12.5%',
    positive: true,
    label: 'vs last month'
  }
}
```

### With Icon

```tsx
import { DollarSign, Users, TrendingUp } from 'lucide-react';

{
  label: 'Revenue',
  value: '$45,231',
  icon: <DollarSign size={20} />
}
```

### With Sparkline

```tsx
{
  label: 'Daily Active Users',
  value: '2,345',
  sparkline: [120, 145, 132, 168, 155, 189, 210, 198, 225, 240]
}
```

### Clickable Metric

```tsx
{
  label: 'Active Subscriptions',
  value: '1,234',
  href: '/subscriptions'
}
// Or with onClick
{
  label: 'Active Subscriptions',
  value: '1,234',
  onClick: () => navigate('/subscriptions')
}
```

### Full Metric

```tsx
{
  id: 'revenue',
  label: 'Monthly Revenue',
  value: '$45,231.89',
  icon: <DollarSign size={20} />,
  change: {
    value: '+12.5%',
    positive: true,
    label: 'vs last month'
  },
  sparkline: [30, 40, 35, 50, 49, 60, 70, 91, 85, 95],
  description: 'Total revenue from all sources',
  href: '/reports/revenue'
}
```

---

## Column Layouts

### 2 Columns

```tsx
<MetricCards columns={2} metrics={metrics} />
```

### 3 Columns

```tsx
<MetricCards columns={3} metrics={metrics} />
```

### 4 Columns (Default)

```tsx
<MetricCards columns={4} metrics={metrics} />
```

### 5 Columns

```tsx
<MetricCards columns={5} metrics={metrics} />
```

---

## Visual Variants

### `variant="default"` (Default)

Standard cards with borders.

```tsx
<MetricCards variant="default" metrics={metrics} />
```

### `variant="compact"`

Smaller padding and text for dense dashboards.

```tsx
<MetricCards variant="compact" metrics={metrics} />
```

### `variant="detailed"`

Includes sparklines and descriptions.

```tsx
<MetricCards variant="detailed" metrics={metrics} />
```

---

## Loading States

### All Cards Loading

```tsx
<MetricCards loading metrics={metrics} />
```

### Individual Card Loading

```tsx
<MetricCards
  metrics={[
    { label: "Revenue", value: "$45,231" },
    { label: "Users", value: "", loading: true }, // This card is loading
    { label: "Orders", value: "234" },
  ]}
/>
```

---

## Complete Examples

### E-commerce Dashboard

```tsx
import { MetricCards } from "@orion/react";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";

<MetricCards
  columns={4}
  metrics={[
    {
      label: "Total Revenue",
      value: "$124,592.00",
      icon: <DollarSign size={20} />,
      change: { value: "+12.5%", positive: true, label: "vs last month" },
      sparkline: [45, 52, 48, 61, 58, 72, 85, 91, 88, 95],
      href: "/reports/revenue",
    },
    {
      label: "Orders",
      value: "1,429",
      icon: <ShoppingCart size={20} />,
      change: { value: "+8.2%", positive: true, label: "vs last month" },
      sparkline: [120, 132, 145, 142, 158, 165, 172, 180, 178, 192],
      href: "/orders",
    },
    {
      label: "Customers",
      value: "3,847",
      icon: <Users size={20} />,
      change: { value: "+15.3%", positive: true, label: "vs last month" },
      sparkline: [280, 295, 310, 325, 340, 355, 370, 385, 400, 420],
      href: "/customers",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      icon: <TrendingUp size={20} />,
      change: { value: "-0.4%", positive: false, label: "vs last month" },
      sparkline: [3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 3.1, 3.2, 3.3, 3.24],
      href: "/reports/conversion",
    },
  ]}
/>;
```

### SaaS Dashboard

```tsx
<MetricCards
  columns={4}
  variant="detailed"
  metrics={[
    {
      label: "MRR",
      value: "$48,352",
      change: { value: "+$2,340", positive: true },
      description: "Monthly Recurring Revenue",
    },
    {
      label: "Active Users",
      value: "12,847",
      change: { value: "+892", positive: true },
      description: "Last 30 days",
    },
    {
      label: "Churn Rate",
      value: "2.4%",
      change: { value: "-0.3%", positive: true }, // Lower churn is positive
      description: "Monthly churn",
    },
    {
      label: "NPS Score",
      value: "72",
      change: { value: "+5", positive: true },
      description: "Net Promoter Score",
    },
  ]}
/>
```

### Compact Overview

```tsx
<MetricCards
  columns={5}
  variant="compact"
  metrics={[
    { label: "Views", value: "24.5K" },
    { label: "Clicks", value: "1.2K" },
    { label: "CTR", value: "4.9%" },
    { label: "Conversions", value: "342" },
    { label: "Revenue", value: "$8.4K" },
  ]}
/>
```

### Real-time Metrics

```tsx
function LiveMetrics() {
  const { data, isLoading } = useMetrics();

  return (
    <MetricCards
      loading={isLoading}
      columns={3}
      metrics={[
        {
          label: "Active Sessions",
          value: data?.sessions.toLocaleString() ?? "-",
          change: {
            value: data?.sessionsChange ?? "-",
            positive: (data?.sessionsChange ?? 0) > 0,
          },
        },
        {
          label: "Requests/min",
          value: data?.rpm.toLocaleString() ?? "-",
          sparkline: data?.rpmHistory,
        },
        {
          label: "Error Rate",
          value: `${data?.errorRate ?? 0}%`,
          change: {
            value: `${data?.errorRateChange ?? 0}%`,
            positive: (data?.errorRateChange ?? 0) < 0, // Lower is better
          },
        },
      ]}
    />
  );
}
```

---

## Accessibility

- Cards are keyboard navigable when clickable
- Trend colors have text labels (not just color)
- Sparklines have aria-hidden (decorative)
- Loading state announced to screen readers
- Links have descriptive labels

```tsx
// Good: Clear metric labels
{
  label: "Monthly Recurring Revenue (MRR)";
}

// Avoid: Abbreviated labels without context
{
  label: "MRR";
}
```

---

## Anti-Patterns

### Too Many Metrics

```tsx
// WRONG - Information overload
<MetricCards
  columns={5}
  metrics={[...fifteenMetrics]}
/>

// CORRECT - Focus on key metrics
<MetricCards
  columns={4}
  metrics={topFourKPIs}
/>
// Use tabs or filters for more metrics
```

### Missing Trend Context

```tsx
// WRONG - No comparison period
{
  label: 'Revenue',
  value: '$10,000',
  change: { value: '+15%' }  // 15% of what timeframe?
}

// CORRECT - Include comparison
{
  label: 'Revenue',
  value: '$10,000',
  change: { value: '+15%', positive: true, label: 'vs last month' }
}
```

### Unclear Value Formatting

```tsx
// WRONG - Inconsistent formats
metrics={[
  { label: 'Revenue', value: 10000 },        // Raw number
  { label: 'Users', value: '1,234' },        // Formatted string
  { label: 'Rate', value: '0.032' }          // Raw decimal
]}

// CORRECT - Consistent, human-readable
metrics={[
  { label: 'Revenue', value: '$10,000' },
  { label: 'Users', value: '1,234' },
  { label: 'Rate', value: '3.2%' }
]}
```

---

## When to Use MetricCards

| Scenario           | Recommendation              |
| ------------------ | --------------------------- |
| Dashboard overview | 4 columns with trends       |
| Executive summary  | Large cards with sparklines |
| Status monitoring  | Compact with live data      |
| Reports header     | Detailed with descriptions  |

## When NOT to Use MetricCards

| Scenario               | Use Instead        |
| ---------------------- | ------------------ |
| Detailed data analysis | Charts/graphs      |
| Time series data       | Line chart         |
| Single key metric      | Stats section      |
| Comparison data        | Comparison section |

---

## Related Components

- **[Stats](../Stats/README.md)** — Simple stat display
- **[DataTable](../DataTable/README.md)** — Detailed data view
- **[PageHeader](../PageHeader/README.md)** — Page context
- **[ActivityFeed](../ActivityFeed/README.md)** — Recent changes
