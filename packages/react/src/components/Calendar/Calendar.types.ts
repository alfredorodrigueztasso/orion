/**
 * Calendar Component Types
 *
 * Type definitions for the Orion Calendar component.
 * Supports single, range, and multiple date selection.
 */

import type { HTMLAttributes } from "react";

/**
 * Date range value
 */
export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

/**
 * Calendar selection mode
 */
export type CalendarMode = "single" | "range" | "multiple";

/**
 * Base calendar props shared across all modes
 */
interface CalendarBaseProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
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
  disabled?: Date[] | ((date: Date) => boolean);

  /**
   * Day the week starts on (0 = Sunday, 1 = Monday, etc.)
   * @default 0
   */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * Show days from adjacent months
   * @default true
   */
  showOutsideDays?: boolean;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Single date selection
 */
export interface CalendarSingleProps extends CalendarBaseProps {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
}

/**
 * Range date selection
 */
export interface CalendarRangeProps extends CalendarBaseProps {
  mode: "range";
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}

/**
 * Multiple date selection
 */
export interface CalendarMultipleProps extends CalendarBaseProps {
  mode: "multiple";
  selected?: Date[];
  onSelect?: (dates: Date[]) => void;
}

/**
 * Union type for all calendar modes
 */
export type CalendarProps =
  | CalendarSingleProps
  | CalendarRangeProps
  | CalendarMultipleProps;
