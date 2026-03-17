"use client";

/**
 * Slider Component
 *
 * A range input for selecting numeric values.
 *
 * @example
 * ```tsx
 * <Slider
 *   value={50}
 *   onChange={(value) => setValue(value)}
 *   min={0}
 *   max={100}
 * />
 * ```
 */

import { forwardRef, useCallback, useRef, useId } from "react";
import type { SliderProps } from "./Slider.types";
import styles from "./Slider.module.css";

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      size = "md",
      disabled = false,
      showValue = false,
      formatValue,
      showLabels = false,
      showTicks = false,
      tickValues,
      label,
      id: providedId,
      onChangeStart,
      onChangeEnd,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const isDragging = useRef(false);

    const percentage = ((value - min) / (max - min)) * 100;

    const displayValue = formatValue ? formatValue(value) : value.toString();

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        onChange(newValue);
      },
      [onChange],
    );

    const handleMouseDown = useCallback(() => {
      isDragging.current = true;
      onChangeStart?.();
    }, [onChangeStart]);

    const handleMouseUp = useCallback(() => {
      if (isDragging.current) {
        isDragging.current = false;
        onChangeEnd?.(value);
      }
    }, [onChangeEnd, value]);

    // Calculate tick marks
    const getTicks = () => {
      if (tickValues) {
        return tickValues;
      }

      const ticks: number[] = [];
      const tickStep = (max - min) / 4; // Default to 5 ticks
      for (let i = min; i <= max; i += tickStep) {
        ticks.push(Math.round(i * 100) / 100);
      }
      return ticks;
    };

    const containerClasses = [
      styles.container,
      styles[size],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={containerClasses} {...rest}>
        {showValue && (
          <div
            className={styles.valueDisplay}
            style={{ left: `${percentage}%` }}
            aria-hidden="true"
          >
            {displayValue}
          </div>
        )}

        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ width: `${percentage}%` }}
            aria-hidden="true"
          />

          <input
            id={inputId}
            type="range"
            className={styles.input}
            value={value}
            onChange={handleChange}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleMouseUp}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            aria-label={label}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={displayValue}
          />
        </div>

        {showTicks && (
          <div className={styles.ticks} aria-hidden="true">
            {getTicks().map((tick) => (
              <div
                key={tick}
                className={styles.tick}
                style={{ left: `${((tick - min) / (max - min)) * 100}%` }}
              />
            ))}
          </div>
        )}

        {showLabels && (
          <div className={styles.labels} aria-hidden="true">
            <span className={styles.labelMin}>
              {formatValue ? formatValue(min) : min}
            </span>
            <span className={styles.labelMax}>
              {formatValue ? formatValue(max) : max}
            </span>
          </div>
        )}
      </div>
    );
  },
);

Slider.displayName = "Slider";
