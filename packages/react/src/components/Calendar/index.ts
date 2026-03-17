/**
 * Calendar Component - Date selection with single, range, and multiple modes.
 *
 * @example
 * ```tsx
 * import { Calendar } from '@orion-ds/react';
 *
 * <Calendar selected={date} onSelect={setDate} />
 * <Calendar mode="range" selected={range} onSelect={setRange} />
 * ```
 */
export { Calendar } from "./Calendar";
export type {
  CalendarProps,
  CalendarMode,
  CalendarSingleProps,
  CalendarRangeProps,
  CalendarMultipleProps,
  DateRange,
} from "./Calendar.types";
