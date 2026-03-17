"use client";

/**
 * @orion-ds/react/chart
 *
 * Heavy component entry point for Chart and related charting components.
 * This module requires the `recharts` peer dependency.
 *
 * Usage:
 *   npm install recharts
 *   import { ChartContainer, ChartTooltipContent, ChartLegend } from '@orion-ds/react/chart';
 */

export {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartGradient,
  ChartTooltip,
  ChartLegend,
} from "./components/Chart";
export type {
  ChartConfig,
  ChartConfigItem,
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
  ChartGradientProps,
} from "./components/Chart";
