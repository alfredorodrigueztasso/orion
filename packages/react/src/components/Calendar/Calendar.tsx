"use client";

/**
 * Calendar Component
 *
 * A date picker grid supporting single, range, and multiple selection.
 * Built without react-day-picker — uses date-fns for date manipulation.
 *
 * @example
 * ```tsx
 * // Single date
 * <Calendar selected={date} onSelect={setDate} />
 *
 * // Range
 * <Calendar mode="range" selected={range} onSelect={setRange} />
 *
 * // Multiple
 * <Calendar mode="multiple" selected={dates} onSelect={setDates} />
 * ```
 */

import React, { useId, useState, useMemo, useCallback } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday,
  isBefore,
  isAfter,
  format,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../Button";
import type { CalendarProps, DateRange } from "./Calendar.types";
import styles from "./Calendar.module.css";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function rotateArray<T>(arr: T[], n: number): T[] {
  const len = arr.length;
  const offset = ((n % len) + len) % len;
  return [...arr.slice(offset), ...arr.slice(0, offset)];
}

export const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    mode = "single",
    min,
    max,
    disabled,
    weekStartsOn = 0,
    showOutsideDays = true,
    className,
    ...rest
  } = props;

  // Remove non-DOM props before spreading
  const {
    selected: _s,
    onSelect: _o,
    ...domProps
  } = rest as Record<string, unknown>;

  const [currentMonth, setCurrentMonth] = useState(() => {
    if (
      mode === "single" &&
      props.mode !== "range" &&
      props.mode !== "multiple" &&
      props.selected
    ) {
      return startOfMonth(props.selected);
    }
    if (mode === "range" && props.mode === "range" && props.selected?.from) {
      return startOfMonth(props.selected.from);
    }
    return startOfMonth(new Date());
  });

  // Generate days grid
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const gridStart = startOfWeek(monthStart, { weekStartsOn });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth, weekStartsOn]);

  // Weekday headers
  const weekdays = useMemo(
    () => rotateArray(WEEKDAY_LABELS, weekStartsOn),
    [weekStartsOn],
  );

  // Check if a date is disabled
  const isDisabled = useCallback(
    (date: Date): boolean => {
      if (min && isBefore(date, startOfDay(min))) return true;
      if (max && isAfter(date, endOfDay(max))) return true;
      if (!disabled) return false;
      if (Array.isArray(disabled)) {
        return disabled.some((d) => isSameDay(d, date));
      }
      return disabled(date);
    },
    [min, max, disabled],
  );

  // Selection state checks
  const isSelected = useCallback(
    (date: Date): boolean => {
      if (
        mode === "single" &&
        props.mode !== "range" &&
        props.mode !== "multiple"
      ) {
        return props.selected ? isSameDay(props.selected, date) : false;
      }
      if (mode === "multiple" && props.mode === "multiple") {
        return props.selected?.some((d) => isSameDay(d, date)) ?? false;
      }
      return false;
    },
    [mode, props],
  );

  const getRangeState = useCallback(
    (date: Date): "start" | "middle" | "end" | null => {
      if (mode !== "range" || props.mode !== "range" || !props.selected)
        return null;
      const { from, to } = props.selected;
      if (!from) return null;

      if (!to) {
        return isSameDay(date, from) ? "start" : null;
      }

      if (isSameDay(date, from) && isSameDay(date, to)) return "start";
      if (isSameDay(date, from)) return "start";
      if (isSameDay(date, to)) return "end";
      if (isAfter(date, from) && isBefore(date, to)) return "middle";
      return null;
    },
    [mode, props],
  );

  // Handle date selection
  const handleSelect = useCallback(
    (date: Date) => {
      if (isDisabled(date)) return;

      if (
        mode === "single" &&
        props.mode !== "range" &&
        props.mode !== "multiple"
      ) {
        const onSelect = props.onSelect as
          | ((d: Date | undefined) => void)
          | undefined;
        onSelect?.(date);
      } else if (mode === "range" && props.mode === "range") {
        const onSelect = props.onSelect as
          | ((r: DateRange | undefined) => void)
          | undefined;
        const current = props.selected;

        if (!current?.from || (current.from && current.to)) {
          // Start a new range
          onSelect?.({ from: date, to: undefined });
        } else {
          // Complete the range
          if (isBefore(date, current.from)) {
            onSelect?.({ from: date, to: current.from });
          } else {
            onSelect?.({ from: current.from, to: date });
          }
        }
      } else if (mode === "multiple" && props.mode === "multiple") {
        const onSelect = props.onSelect as ((d: Date[]) => void) | undefined;
        const current = props.selected ?? [];
        const exists = current.findIndex((d) => isSameDay(d, date));
        if (exists >= 0) {
          onSelect?.(current.filter((_, i) => i !== exists));
        } else {
          onSelect?.([...current, date]);
        }
      }
    },
    [mode, props, isDisabled],
  );

  // Navigation
  const goToPrevMonth = () => setCurrentMonth((m) => subMonths(m, 1));
  const goToNextMonth = () => setCurrentMonth((m) => addMonths(m, 1));

  // Build day cell classnames
  const getDayClassName = (date: Date): string => {
    const classes = [styles.day];
    const outsideMonth = !isSameMonth(date, currentMonth);

    if (outsideMonth) classes.push(styles.outside);
    if (isToday(date)) classes.push(styles.today);
    if (isDisabled(date)) classes.push(styles.disabled);

    if (mode === "range") {
      const rangeState = getRangeState(date);
      if (rangeState === "start") {
        classes.push(styles.rangeStart);
        // Same-day range: also add rangeEnd so .rangeStart.rangeEnd matches
        if (
          props.mode === "range" &&
          props.selected?.from &&
          props.selected?.to &&
          isSameDay(props.selected.from, props.selected.to)
        ) {
          classes.push(styles.rangeEnd);
        }
      }
      if (rangeState === "middle") classes.push(styles.rangeMiddle);
      if (rangeState === "end") classes.push(styles.rangeEnd);
    } else if (isSelected(date)) {
      classes.push(styles.selected);
    }

    return classes.join(" ");
  };

  const calendarClasses = [styles.calendar, className]
    .filter(Boolean)
    .join(" ");
  const monthLabelId = useId();

  return (
    <div className={calendarClasses} {...domProps}>
      {/* Header: month navigation */}
      <div className={styles.header}>
        <Button
          variant="ghost"
          iconOnly
          size="sm"
          icon={<ChevronLeft size={16} />}
          onClick={goToPrevMonth}
          aria-label="Previous month"
        />
        <span id={monthLabelId} className={styles.monthLabel}>
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <Button
          variant="ghost"
          iconOnly
          size="sm"
          icon={<ChevronRight size={16} />}
          onClick={goToNextMonth}
          aria-label="Next month"
        />
      </div>

      {/* Grid */}
      <div className={styles.grid} role="grid" aria-labelledby={monthLabelId}>
        {/* Weekday headers */}
        {weekdays.map((label) => (
          <div
            key={label}
            className={styles.weekday}
            role="columnheader"
            aria-label={label}
          >
            {label}
          </div>
        ))}

        {/* Day cells */}
        {days.map((day) => {
          const outsideMonth = !isSameMonth(day, currentMonth);

          if (outsideMonth && !showOutsideDays) {
            return <div key={day.toISOString()} />;
          }

          return (
            <button
              key={day.toISOString()}
              type="button"
              className={getDayClassName(day)}
              onClick={() => handleSelect(day)}
              disabled={isDisabled(day)}
              tabIndex={isToday(day) ? 0 : -1}
              aria-label={format(day, "EEEE, MMMM d, yyyy")}
              aria-selected={isSelected(day) || getRangeState(day) !== null}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Calendar.displayName = "Calendar";

// Helper functions (not exported from date-fns by default in some versions)
function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
