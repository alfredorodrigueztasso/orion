# DashboardTemplate (Template)

Analytics and business intelligence dashboard with metrics grid, charts section, and activity feed. Designed to display KPIs, visualizations, and recent system activity.

## When to Use

| Scenario                     | Use DashboardTemplate          |
| ---------------------------- | ------------------------------ |
| Business analytics dashboard | ✅ Yes - metrics and charts    |
| Admin control panel          | ✅ Yes - with activity feed    |
| Metrics overview page        | ✅ Yes - display KPIs          |
| Real-time monitoring         | ✅ Yes - activity log included |
| Data visualization page      | ✅ Yes - chart card layout     |

## Props Reference

| Prop      | Type           | Default     | Description           |
| --------- | -------------- | ----------- | --------------------- |
| title     | string         | "Dashboard" | Page title            |
| subtitle  | string         | —           | Optional subtitle     |
| metrics   | MetricCard[]   | []          | Array of metric cards |
| charts    | ChartCard[]    | []          | Array of chart cards  |
| activity  | ActivityItem[] | []          | Recent activity items |
| className | string         | —           | Custom CSS class      |

### MetricCard Interface

| Property | Type                        | Description          |
| -------- | --------------------------- | -------------------- |
| id       | string                      | Unique identifier    |
| label    | string                      | Metric label         |
| value    | string \| number            | Current value        |
| change   | number                      | Change percentage    |
| trend    | "up" \| "down" \| "neutral" | Trend direction      |
| icon     | ReactNode                   | Optional metric icon |

### ChartCard Interface

| Property | Type      | Description                 |
| -------- | --------- | --------------------------- |
| id       | string    | Unique identifier           |
| title    | string    | Chart title                 |
| type     | string    | Chart type (line, bar, etc) |
| content  | ReactNode | Chart visualization         |

### ActivityItem Interface

| Property    | Type   | Description          |
| ----------- | ------ | -------------------- |
| id          | string | Unique identifier    |
| title       | string | Activity title       |
| description | string | Optional description |
| type        | string | Activity type        |
| timestamp   | Date   | When it occurred     |

## Key Features

- **Metrics grid** — KPI cards with trending indicators
- **Trend visualization** — Up/down arrows with percentages
- **Chart section** — Flexible card layout for visualizations
- **Activity feed** — Timestamped recent events
- **Color coding** — Type-based activity indicators
- **Responsive layout** — Adapts to screen size
- **Status badges** — Chart type labels
- **Empty states** — Graceful handling of no data

## Usage Example

```tsx
import { DashboardTemplate } from "@orion-ds/react";
import { Users, TrendingUp } from "lucide-react";

<DashboardTemplate
  title="Analytics"
  subtitle="Week of March 10"
  metrics={[
    {
      id: "1",
      label: "Total Users",
      value: "24,582",
      change: 12,
      trend: "up",
      icon: <Users size={24} />,
    },
  ]}
  charts={[
    {
      id: "1",
      title: "Revenue Over Time",
      type: "line",
      content: <YourChartComponent />,
    },
  ]}
  activity={[
    {
      id: "1",
      title: "User signup",
      type: "user",
      timestamp: new Date(),
    },
  ]}
/>;
```

## Component Composition

Built with:

- `Card` — Metric, chart, and activity containers
- `Badge` — Chart type indicators
- Lucide Icons — TrendingUp, TrendingDown, Clock
- Custom MetricCard component — Displays KPIs with trends
- Custom ActivityItem component — Renders events with timestamps

## Accessibility

- Metrics are properly labeled
- Trend arrows and percentages are clear
- Activity timestamps are readable
- Cards are clearly separated
- Status badges provide context

## Token Usage

- `--surface-base` — Dashboard background
- `--surface-layer` — Card backgrounds
- `--text-primary` — Labels and titles
- `--text-secondary` — Values and descriptions
- `--status-success` — Up trending color
- `--status-error` — Down trending color
- `--status-warning` — Neutral trend color
- `--border-subtle` — Card separators
- `--spacing-4` — Card padding
- `--spacing-6` — Grid gaps
