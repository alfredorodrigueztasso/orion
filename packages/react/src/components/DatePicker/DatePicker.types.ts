/**
 * DatePicker Component Types
 *
 * Type definitions for the Orion DatePicker component.
 * Composes Calendar + Popover with formatted trigger display.
 */

import type { DateRange } from "../Calendar/Calendar.types";

/**
 * Preset option for quick date selection
 */
export interface DatePickerPreset {
  label: string;
  value: Date | DateRange;
}

/**
 * Base DatePicker props shared across modes
 */
interface DatePickerBaseProps {
  /**
   * Minimum selectable date
   */
  min?: Date;

  /**
   * Maximum selectable date
   */
  max?: Date;

  /**
   * Disabled dates — array of dates or predicate function
   */
  disabledDates?: Date[] | ((date: Date) => boolean);

  /**
   * Placeholder text for the trigger button
   * @default 'Pick a date'
   */
  placeholder?: string;

  /**
   * Quick-select presets (e.g., "Last 7 days")
   */
  presets?: DatePickerPreset[];

  /**
   * date-fns format string for displaying the selected date
   * @default 'PPP'
   */
  format?: string;

  /**
   * Whether the trigger is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional class name for the trigger button
   */
  triggerClassName?: string;

  /**
   * Additional class name for the wrapper
   */
  className?: string;
}

/**
 * Single date picker
 */
export interface DatePickerSingleProps extends DatePickerBaseProps {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

/**
 * Range date picker
 */
export interface DatePickerRangeProps extends DatePickerBaseProps {
  mode: "range";
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}

/**
 * Union type for all DatePicker modes
 */
export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;
