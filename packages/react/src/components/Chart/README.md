# Chart

Themed wrapper components for Recharts that inject Orion design tokens as CSS variables for consistent chart styling.

## When to Use

| Scenario                           | Use Chart                                        |
| ---------------------------------- | ------------------------------------------------ |
| Data visualization in dashboards   | ✅ Yes - wraps Recharts with token-aware theming |
| Charts that match your brand/theme | ✅ Yes - auto-injects CSS color variables        |
| Simple inline metrics              | ❌ No - use MetricCards instead                  |
| Non-Recharts chart libraries       | ❌ No - this wraps Recharts specifically         |

## Props Reference

### ChartContainer

| Prop      | Type        | Default | Description                         |
| --------- | ----------- | ------- | ----------------------------------- |
| config    | ChartConfig | —       | Maps data keys to colors and labels |
| children  | ReactNode   | —       | Recharts chart element              |
| className | string      | —       | Additional class name               |

### ChartConfig (object)

```ts
Record<string, { label: string; color: string; icon?: ReactNode }>;
```

### ChartTooltipContent

| Prop           | Type                                    | Default | Description              |
| -------------- | --------------------------------------- | ------- | ------------------------ |
| indicator      | 'dot' \| 'line' \| 'dashed'             | 'dot'   | Color indicator style    |
| hideLabel      | boolean                                 | false   | Hide the label text      |
| hideIndicator  | boolean                                 | false   | Hide the color indicator |
| labelFormatter | (label: string) => string               | —       | Custom label formatter   |
| formatter      | (value: number, name: string) => string | —       | Custom value formatter   |

### ChartGradient

| Prop         | Type   | Default | Description                               |
| ------------ | ------ | ------- | ----------------------------------------- |
| id           | string | —       | Unique gradient ID for SVG fill reference |
| color        | string | —       | CSS color or token variable               |
| startOpacity | number | 0.4     | Opacity at gradient top                   |
| endOpacity   | number | 0.05    | Opacity at gradient bottom                |

## Examples

### Basic Area Chart

```tsx
import {
  ChartContainer,
  ChartTooltipContent,
  ChartGradient,
} from "@orion-ds/react/chart";
import { AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const config = {
  revenue: { label: "Revenue", color: "var(--color-brand-500)" },
  expenses: { label: "Expenses", color: "var(--status-error)" },
};

<ChartContainer config={config}>
  <AreaChart data={data}>
    <defs>
      <ChartGradient id="fillRevenue" color="var(--color-chart-1)" />
    </defs>
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip content={<ChartTooltipContent />} />
    <Area
      dataKey="revenue"
      fill="url(#fillRevenue)"
      stroke="var(--color-chart-1)"
    />
  </AreaChart>
</ChartContainer>;
```

## Accessibility

- Colors mapped to semantic tokens for contrast compliance
- Tooltip content is screen reader accessible
- Legend provides text labels for all data series

## Token Usage

- `--color-chart-1` through `--color-chart-5` — Chart series colors
- `--surface-base` — Tooltip background
- `--text-primary` — Tooltip text
- `--border-subtle` — Grid lines
- `--radius-sm` — Tooltip border radius
