"use client";

/**
 * DatePicker Component
 *
 * Composes Popover + Calendar into a single date selection control.
 * Supports single and range modes with optional presets.
 *
 * @example
 * ```tsx
 * <DatePicker selected={date} onSelect={setDate} placeholder="Pick a date" />
 *
 * <DatePicker mode="range" selected={range} onSelect={setRange} />
 * ```
 */

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover } from "../Popover";
import { Calendar } from "../Calendar";
import { Button } from "../Button";
import { MissingDependencyError } from "../MissingDependencyError";
import {
  checkComponent,
  type OptionalDepError,
} from "../../utils/optionalDeps";
import type { DateRange } from "../Calendar/Calendar.types";
import type { DatePickerProps, DatePickerPreset } from "./DatePicker.types";
import styles from "./DatePicker.module.css";

// date-fns imports with graceful error handling
let formatDate: any;

if (typeof require !== "undefined") {
  try {
    const dateFns = require("date-fns");
    formatDate = dateFns.format;
  } catch (error) {
    // Fallback: require() can fail if date-fns is not installed
    // Async validation will catch actual missing dependencies
  }
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  // FIRST: Props destructuring (needed for hook initialization)
  const {
    mode = "single",
    min,
    max,
    disabledDates,
    placeholder = "Pick a date",
    presets,
    format: dateFormat = "PPP",
    disabled = false,
    triggerClassName,
    className,
  } = props;

  // FIRST (continued): Declare ALL hooks - BEFORE conditionals
  const [depError, setDepError] = useState<OptionalDepError | undefined>();
  const [isChecking, setIsChecking] = useState(true);
  const [open, setOpen] = useState(false);

  // Format the display text
  const displayText = useMemo(() => {
    if (mode === "single" && props.mode !== "range") {
      if (!props.selected) return null;
      return formatDate(props.selected, dateFormat);
    }
    if (mode === "range" && props.mode === "range") {
      if (!props.selected?.from) return null;
      if (!props.selected.to) {
        return formatDate(props.selected.from, dateFormat);
      }
      return `${formatDate(props.selected.from, dateFormat)} - ${formatDate(props.selected.to, dateFormat)}`;
    }
    return null;
  }, [mode, props, dateFormat]);

  // Handle calendar selection
  const handleSelect = useCallback(
    (value: Date | undefined | DateRange | Date[]) => {
      if (mode === "single" && props.mode !== "range") {
        const onSelect = props.onSelect as
          | ((d: Date | undefined) => void)
          | undefined;
        onSelect?.(value as Date | undefined);
        setOpen(false);
      } else if (mode === "range" && props.mode === "range") {
        const onSelect = props.onSelect as
          | ((r: DateRange | undefined) => void)
          | undefined;
        const range = value as DateRange | undefined;
        onSelect?.(range);
        // Close popover when range is complete
        if (range?.from && range?.to) {
          setOpen(false);
        }
      }
    },
    [mode, props],
  );

  // Handle preset selection
  const handlePreset = useCallback(
    (preset: DatePickerPreset) => {
      if (mode === "single" && props.mode !== "range") {
        const onSelect = props.onSelect as
          | ((d: Date | undefined) => void)
          | undefined;
        onSelect?.(preset.value as Date);
      } else if (mode === "range" && props.mode === "range") {
        const onSelect = props.onSelect as
          | ((r: DateRange | undefined) => void)
          | undefined;
        onSelect?.(preset.value as DateRange);
      }
      setOpen(false);
    },
    [mode, props],
  );

  // SECOND: useEffect for dependency checking
  useEffect(() => {
    const checkDeps = async () => {
      try {
        const result = checkComponent("DatePicker");
        if (result instanceof Promise) {
          setDepError(await result);
        } else {
          setDepError(result);
        }
      } catch (error) {
        // Fallback: assume deps available (optimistic)
        setDepError(undefined);
      } finally {
        setIsChecking(false);
      }
    };

    checkDeps();
  }, []);

  // THIRD: Conditional rendering AFTER all hooks
  if (depError) {
    return <MissingDependencyError {...depError} />;
  }

  if (isChecking) {
    return <div>Loading date picker...</div>;
  }

  const triggerClasses = [styles.trigger, triggerClassName]
    .filter(Boolean)
    .join(" ");

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(" ");

  // Build calendar props
  const calendarProps = {
    min,
    max,
    disabled: disabledDates,
  };

  const popoverContent = (
    <div className={styles.popoverContent}>
      {presets && presets.length > 0 && (
        <div className={styles.presets}>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className={styles.presetButton}
              onClick={() => handlePreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
      {mode === "single" ? (
        <Calendar
          mode="single"
          selected={props.mode !== "range" ? props.selected : undefined}
          onSelect={handleSelect as (d: Date | undefined) => void}
          {...calendarProps}
        />
      ) : (
        <Calendar
          mode="range"
          selected={props.mode === "range" ? props.selected : undefined}
          onSelect={handleSelect as (r: DateRange | undefined) => void}
          {...calendarProps}
        />
      )}
    </div>
  );

  const trigger = (
    <Button
      variant="secondary"
      className={triggerClasses}
      disabled={disabled}
      aria-label={placeholder}
      icon={<CalendarIcon size={16} className={styles.triggerIcon} />}
    >
      {displayText ? (
        <span>{displayText}</span>
      ) : (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
    </Button>
  );

  return (
    <div className={wrapperClasses}>
      <Popover
        trigger={trigger}
        content={popoverContent}
        placement="bottom-start"
        open={open}
        onOpenChange={setOpen}
        showArrow={false}
        offset={4}
        className={styles.popover}
      />
    </div>
  );
};

DatePicker.displayName = "DatePicker";
