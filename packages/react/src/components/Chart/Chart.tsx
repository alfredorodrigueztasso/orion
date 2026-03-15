"use client";

/**
 * Chart Component
 *
 * Lightweight wrapper around Recharts providing Orion token theming.
 * Does NOT wrap Recharts — user accesses Recharts components directly.
 * Provides: ChartContainer (CSS variable injection), ChartTooltipContent,
 * and ChartLegendContent styled with Orion tokens.
 *
 * @example
 * ```tsx
 * const config: ChartConfig = {
 *   revenue: { label: 'Revenue', color: 'var(--color-brand-500)' },
 *   expenses: { label: 'Expenses', color: 'var(--status-error)' },
 * };
 *
 * <ChartContainer config={config}>
 *   <BarChart data={data}>
 *     <XAxis dataKey="month" />
 *     <YAxis />
 *     <ChartTooltip content={<ChartTooltipContent />} />
 *     <ChartLegend content={<ChartLegendContent />} />
 *     <Bar dataKey="revenue" fill="var(--color-revenue)" />
 *   </BarChart>
 * </ChartContainer>
 * ```
 */

import React, { createContext, useContext } from "react";
import { ResponsiveContainer, Tooltip, Legend } from "recharts";
import type {
  ChartConfig,
  ChartContainerProps,
  ChartTooltipContentProps,
  ChartLegendContentProps,
  ChartGradientProps,
} from "./Chart.types";
import { useResolvedChartColors } from "./useResolvedChartColors";
import styles from "./Chart.module.css";

// Context to share config across tooltip/legend
const ChartContext = createContext<ChartConfig>({});

/**
 * ChartContainer — wraps Recharts with CSS variable injection from config
 */
export const ChartContainer: React.FC<ChartContainerProps> = ({
  config,
  children,
  className,
  style,
  ...rest
}) => {
  // Resolve CSS variable chains to concrete hex values for SVG compatibility
  const { resolvedConfig, resolvedColorVars } = useResolvedChartColors(config);

  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(" ");

  return (
    <ChartContext.Provider value={resolvedConfig}>
      <div
        role="figure"
        className={containerClasses}
        style={{ ...resolvedColorVars, ...style } as React.CSSProperties}
        {...rest}
      >
        <ResponsiveContainer width="100%" height="100%">
          {children as React.ReactElement}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
};

ChartContainer.displayName = "ChartContainer";

/**
 * ChartTooltipContent — Orion-styled tooltip for Recharts
 */
export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  active,
  payload,
  label,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  labelFormatter,
  formatter,
  className,
}) => {
  const config = useContext(ChartContext);

  if (!active || !payload?.length) return null;

  const tooltipClasses = [styles.tooltip, className].filter(Boolean).join(" ");

  const formattedLabel = labelFormatter ? labelFormatter(String(label)) : label;

  const indicatorClass = {
    dot: styles.tooltipDot,
    line: styles.tooltipLine,
    dashed: styles.tooltipDashed,
  }[indicator];

  return (
    <div className={tooltipClasses}>
      {!hideLabel && formattedLabel && (
        <div className={styles.tooltipLabel}>{formattedLabel}</div>
      )}
      <div className={styles.tooltipItems}>
        {payload.map((entry) => {
          const dataKey = String(entry.dataKey || entry.name);
          const configItem = config[dataKey];
          const displayLabel = configItem?.label || dataKey;
          const displayValue = formatter
            ? formatter(entry.value, dataKey)
            : String(entry.value);
          const color = entry.color || configItem?.color;

          return (
            <div key={dataKey} className={styles.tooltipItem}>
              {!hideIndicator && (
                <span
                  className={indicatorClass}
                  style={{ backgroundColor: color, borderColor: color }}
                />
              )}
              <span className={styles.tooltipName}>{displayLabel}</span>
              <span className={styles.tooltipValue}>{displayValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ChartTooltipContent.displayName = "ChartTooltipContent";

/**
 * ChartLegendContent — Orion-styled legend for Recharts
 */
export const ChartLegendContent: React.FC<ChartLegendContentProps> = ({
  payload,
  className,
}) => {
  const config = useContext(ChartContext);

  if (!payload?.length) return null;

  const legendClasses = [styles.legend, className].filter(Boolean).join(" ");

  return (
    <div className={legendClasses}>
      {payload.map((entry) => {
        const dataKey = entry.dataKey || entry.value;
        const configItem = config[dataKey];
        const displayLabel = configItem?.label || dataKey;
        const color = entry.color || configItem?.color;

        return (
          <div key={dataKey} className={styles.legendItem}>
            <span
              className={styles.legendDot}
              style={{ backgroundColor: color }}
            />
            <span>{displayLabel}</span>
          </div>
        );
      })}
    </div>
  );
};

ChartLegendContent.displayName = "ChartLegendContent";

/**
 * ChartGradient — SVG linearGradient helper for elegant area chart fills.
 *
 * Place inside `<defs>` within a Recharts chart, then reference via `fill="url(#id)"`.
 *
 * @example
 * ```tsx
 * <AreaChart data={data}>
 *   <defs>
 *     <ChartGradient id="fillRevenue" color="var(--chart-1)" />
 *   </defs>
 *   <Area dataKey="revenue" fill="url(#fillRevenue)" fillOpacity={1} />
 * </AreaChart>
 * ```
 */
export const ChartGradient: React.FC<ChartGradientProps> = ({
  id,
  color,
  startOpacity = 0.4,
  endOpacity = 0.05,
}) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor={color} stopOpacity={startOpacity} />
    <stop offset="95%" stopColor={color} stopOpacity={endOpacity} />
  </linearGradient>
);

ChartGradient.displayName = "ChartGradient";

// Re-export Recharts Tooltip and Legend for convenience
export const ChartTooltip = Tooltip;
export const ChartLegend = Legend;
