/**
 * Chart Component - Orion-themed wrappers for Recharts.
 *
 * @example
 * ```tsx
 * import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@orion-ds/react';
 * import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
 *
 * <ChartContainer config={config}>
 *   <BarChart data={data}>
 *     <XAxis dataKey="month" />
 *     <YAxis />
 *     <Tooltip content={<ChartTooltipContent />} />
 *     <Legend content={<ChartLegendContent />} />
 *     <Bar dataKey="revenue" fill="var(--color-revenue)" />
 *   </BarChart>
 * </ChartContainer>
 * ```
 */
export {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartGradient,
  ChartTooltip,
  ChartLegend,
} from "./Chart";
export type {
  ChartConfig,
  ChartConfigItem,
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
  ChartGradientProps,
} from "./Chart.types";
