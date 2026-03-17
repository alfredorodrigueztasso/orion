/**
 * DatePicker Component - Date selection with popover calendar.
 *
 * @example
 * ```tsx
 * import { DatePicker } from '@orion-ds/react';
 *
 * <DatePicker selected={date} onSelect={setDate} />
 * <DatePicker mode="range" selected={range} onSelect={setRange} presets={presets} />
 * ```
 */
export { DatePicker } from "./DatePicker";
export type {
  DatePickerProps,
  DatePickerSingleProps,
  DatePickerRangeProps,
  DatePickerPreset,
} from "./DatePicker.types";
