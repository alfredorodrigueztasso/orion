# Timeline (Section)

An event timeline section displaying a chronological sequence of events. Designed for history pages, process flows, product roadmaps, and milestones.

## When to Use

| Scenario | Use Timeline |
|----------|-------------|
| Product roadmap | ✅ Yes - shows upcoming milestones |
| Company history | ✅ Yes - displays historical events |
| Process flow | ✅ Yes - shows sequential steps |
| Journey progression | ✅ Yes - displays user progress |
| Vertical timeline | ✅ Yes - compact vertical layout |
| Data table | ❌ No - use DataTable component |
| Simple list | ❌ No - use List component |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Section heading |
| events | TimelineEvent[] | — | Array of timeline events (required) |
| orientation | TimelineOrientation | "vertical" | Layout direction |
| compact | boolean | — | Use compact layout |
| className | string | — | Additional CSS class |

### TimelineEvent

| Prop | Type | Description |
|------|------|-------------|
| id | string | Unique event identifier |
| date | string | Event date/time display |
| title | string | Event title (required) |
| description | string | Optional event description |
| icon | ReactNode | Optional icon element |

### TimelineOrientation

```typescript
type TimelineOrientation = "horizontal" | "vertical"
```

## Examples

### Vertical Timeline

```tsx
import { Timeline } from "@orion-ds/react";
import { Rocket, CheckCircle, Star } from "lucide-react";

<Timeline
  title="Our Journey"
  events={[
    {
      id: "1",
      date: "Jan 2023",
      title: "Founded",
      description: "Started with a vision",
      icon: <Rocket size={20} />,
    },
    {
      id: "2",
      date: "Jun 2023",
      title: "Series A Funding",
      description: "$2M raised",
      icon: <CheckCircle size={20} />,
    },
    {
      id: "3",
      date: "Dec 2023",
      title: "1M Users",
      description: "Hit major milestone",
      icon: <Star size={20} />,
    },
  ]}
  orientation="vertical"
/>
```

### Compact Horizontal Timeline

```tsx
<Timeline
  title="Product Roadmap"
  events={[
    { id: "q1", date: "Q1 2024", title: "Analytics Dashboard" },
    { id: "q2", date: "Q2 2024", title: "Mobile App" },
    { id: "q3", date: "Q3 2024", title: "AI Features" },
  ]}
  orientation="horizontal"
  compact
/>
```

## Accessibility

- Events are presented in semantic article elements
- Timeline connectors are decorative
- Event dates and titles are clearly labeled
- Icons are decorative and don't require alt text
- Timeline can be navigated with keyboard
- Screen readers announce each event and its details

## Token Usage

- `--surface-base` — Timeline background
- `--surface-layer` — Event card backgrounds
- `--border-subtle` — Timeline connectors and borders
- `--interactive-primary` — Event dot/marker color
- `--text-primary` — Event titles
- `--text-secondary` — Event dates and descriptions
- `--spacing-4` — Event padding
- `--radius-full` — Event marker circles
- `--radius-container` — Event card radius
