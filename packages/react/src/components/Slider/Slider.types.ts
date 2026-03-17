/**
 * Slider Component Types
 *
 * Type definitions for the Orion Slider/Range component.
 */

import type { HTMLAttributes } from "react";

/**
 * Slider size variants
 */
export type SliderSize = "sm" | "md" | "lg";

/**
 * Slider component props
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
export interface SliderProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Current value
   */
  value: number;

  /**
   * Callback when value changes
   */
  onChange: (value: number) => void;

  /**
   * Minimum value
   * @default 0
   */
  min?: number;

  /**
   * Maximum value
   * @default 100
   */
  max?: number;

  /**
   * Step increment
   * @default 1
   */
  step?: number;

  /**
   * Size variant
   * @default 'md'
   */
  size?: SliderSize;

  /**
   * Whether the slider is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Show the current value above the thumb
   * @default false
   */
  showValue?: boolean;

  /**
   * Format function for displaying the value
   */
  formatValue?: (value: number) => string;

  /**
   * Show min and max labels
   * @default false
   */
  showLabels?: boolean;

  /**
   * Show tick marks
   * @default false
   */
  showTicks?: boolean;

  /**
   * Custom tick values (if not provided, uses step)
   */
  tickValues?: number[];

  /**
   * Label for the slider (accessibility)
   */
  label?: string;

  /**
   * ID for the slider input
   */
  id?: string;

  /**
   * Callback when dragging starts
   */
  onChangeStart?: () => void;

  /**
   * Callback when dragging ends
   */
  onChangeEnd?: (value: number) => void;
}
