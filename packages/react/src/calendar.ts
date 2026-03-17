"use client";

/**
 * @orion-ds/react/calendar
 *
 * Heavy component entry point for Calendar and DatePicker components.
 * These modules require the `date-fns` peer dependency.
 *
 * Usage:
 *   npm install date-fns
 *   import { Calendar, DatePicker } from '@orion-ds/react/calendar';
 */

export { Calendar } from "./components/Calendar";
export type {
  CalendarProps,
  CalendarMode,
  CalendarSingleProps,
  CalendarRangeProps,
  CalendarMultipleProps,
  DateRange,
} from "./components/Calendar";

export { DatePicker } from "./components/DatePicker";
export type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerPreset,
} from "./components/DatePicker";
