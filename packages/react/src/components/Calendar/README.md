# Calendar

A date picker calendar supporting single, range, and multiple date selection modes.

## When to Use

| Scenario                | Use Calendar                          |
| ----------------------- | ------------------------------------- |
| Inline date selection   | ✅ Yes - renders directly in the page |
| Date range picking      | ✅ Yes - use mode="range"             |
| Multi-date selection    | ✅ Yes - use mode="multiple"          |
| Date input with popover | ❌ No - use DatePicker instead        |

## Props Reference

| Prop            | Type                              | Default  | Description                               |
| --------------- | --------------------------------- | -------- | ----------------------------------------- |
| mode            | 'single' \| 'range' \| 'multiple' | 'single' | Selection mode                            |
| selected        | Date \| DateRange \| Date[]       | —        | Currently selected value (varies by mode) |
| onSelect        | function                          | —        | Callback when selection changes           |
| min             | Date                              | —        | Minimum selectable date                   |
| max             | Date                              | —        | Maximum selectable date                   |
| disabled        | Date[] \| (date: Date) => boolean | —        | Disabled dates                            |
| weekStartsOn    | 0-6                               | 0        | Day the week starts on (0 = Sunday)       |
| showOutsideDays | boolean                           | true     | Show days from adjacent months            |
| className       | string                            | —        | Additional class name                     |

## Examples

### Single Date

```tsx
import { Calendar } from "@orion-ds/react/calendar";

<Calendar mode="single" selected={date} onSelect={setDate} />;
```

### Date Range

```tsx
<Calendar
  mode="range"
  selected={{ from: startDate, to: endDate }}
  onSelect={setRange}
/>
```

### With Disabled Dates

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(d) => d.getDay() === 0 || d.getDay() === 6}
  min={new Date()}
/>
```

## Accessibility

- Full keyboard navigation (arrow keys, Home, End)
- Screen reader announces selected dates and navigation
- Visible focus states on all interactive cells

## Token Usage

- `--surface-base` — Calendar background
- `--interactive-primary` — Selected date background
- `--text-primary` — Day text color
- `--text-tertiary` — Outside days text color
- `--radius-sm` — Day cell border radius
- `--spacing-2` — Cell gap spacing
