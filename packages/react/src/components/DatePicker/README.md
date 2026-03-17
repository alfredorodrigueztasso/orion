# DatePicker

A date selection component that composes Calendar with a Popover trigger, displaying the formatted selected date in a button.

## When to Use

| Scenario | Use DatePicker |
|----------|----------------|
| Form date input | ✅ Yes - dropdown calendar with formatted display |
| Date range selection in forms | ✅ Yes - use mode="range" |
| Quick date presets ("Last 7 days") | ✅ Yes - supports presets |
| Always-visible calendar | ❌ No - use Calendar directly |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| mode | 'single' \| 'range' | 'single' | Selection mode |
| selected | Date \| DateRange | — | Currently selected value |
| onSelect | function | — | Selection change callback |
| min | Date | — | Minimum selectable date |
| max | Date | — | Maximum selectable date |
| disabledDates | Date[] \| (date: Date) => boolean | — | Disabled dates |
| placeholder | string | 'Pick a date' | Trigger button placeholder |
| presets | DatePickerPreset[] | — | Quick-select presets |
| format | string | 'PPP' | date-fns format string |
| disabled | boolean | false | Disable the trigger |
| triggerClassName | string | — | Class name for trigger button |
| className | string | — | Wrapper class name |

## Examples

### Single Date

```tsx
import { DatePicker } from "@orion-ds/react/calendar";

<DatePicker
  mode="single"
  selected={date}
  onSelect={setDate}
  placeholder="Select a date"
/>
```

### Date Range with Presets

```tsx
<DatePicker
  mode="range"
  selected={range}
  onSelect={setRange}
  presets={[
    { label: "Last 7 days", value: { from: subDays(new Date(), 7), to: new Date() } },
    { label: "Last 30 days", value: { from: subDays(new Date(), 30), to: new Date() } },
  ]}
/>
```

### With Constraints

```tsx
<DatePicker
  selected={date}
  onSelect={setDate}
  min={new Date()}
  max={addMonths(new Date(), 3)}
  disabledDates={(d) => d.getDay() === 0}
  format="dd/MM/yyyy"
/>
```

## Accessibility

- Trigger button announces selected date
- Calendar popup is keyboard navigable
- Escape closes the popover
- Focus returns to trigger on close

## Token Usage

- `--surface-base` — Popover background
- `--border-subtle` — Trigger border
- `--text-primary` — Selected date text
- `--text-tertiary` — Placeholder text
- `--interactive-primary` — Selected calendar day
- `--radius-control` — Trigger border radius
- `--spacing-3` — Trigger padding
