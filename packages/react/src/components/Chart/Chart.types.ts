/**
 * Chart Component Types
 *
 * Type definitions for the Orion Chart wrapper components.
 * Provides themed containers, tooltips, and legends for Recharts.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Configuration for a single data series in a chart
 */
export interface ChartConfigItem {
  /**
   * Display label for the series
   */
  label: string;

  /**
   * CSS color value or token variable (e.g., 'var(--color-brand-500)')
   */
  color: string;

  /**
   * Optional icon for the legend
   */
  icon?: ReactNode;
}

/**
 * Chart configuration object — maps data keys to display settings
 *
 * @example
 * ```ts
 * const config: ChartConfig = {
 *   revenue: { label: 'Revenue', color: 'var(--color-brand-500)' },
 *   expenses: { label: 'Expenses', color: 'var(--status-error)' },
 * };
 * ```
 */
export type ChartConfig = Record<string, ChartConfigItem>;

/**
 * ChartContainer props — wraps Recharts with CSS variable injection
 */
export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Chart configuration mapping data keys to colors/labels
   */
  config: ChartConfig;

  /**
   * The Recharts chart element
   */
  children: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * ChartTooltipContent props
 */
export interface ChartTooltipContentProps {
  /**
   * Whether to show the color indicator dot
   * @default true
   */
  indicator?: "dot" | "line" | "dashed";

  /**
   * Hide the label text
   * @default false
   */
  hideLabel?: boolean;

  /**
   * Hide the indicator
   * @default false
   */
  hideIndicator?: boolean;

  /**
   * Custom label formatter
   */
  labelFormatter?: (label: string) => string;

  /**
   * Custom value formatter
   */
  formatter?: (value: number, name: string) => string;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Recharts injected props (passed automatically)
   */
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey: string;
    color: string;
    payload: Record<string, unknown>;
  }>;
  label?: string;
}

/**
 * ChartGradient props — SVG linearGradient helper for area charts
 */
export interface ChartGradientProps {
  /**
   * Unique ID for the gradient (referenced via `fill="url(#id)"`)
   */
  id: string;

  /**
   * CSS color value or token variable
   */
  color: string;

  /**
   * Opacity at the top of the gradient
   * @default 0.4
   */
  startOpacity?: number;

  /**
   * Opacity at the bottom of the gradient
   * @default 0.05
   */
  endOpacity?: number;
}

/**
 * ChartLegendContent props
 */
export interface ChartLegendContentProps {
  /**
   * Additional class name
   */
  className?: string;

  /**
   * Recharts injected props (passed automatically)
   */
  payload?: Array<{
    value: string;
    type: string;
    id: string;
    color: string;
    dataKey: string;
  }>;
}
