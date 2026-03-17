/**
 * MetricCards Component Types
 *
 * Type definitions for the Orion MetricCards section component.
 * Designed for Product Mode (SaaS dashboards) KPI displays.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Trend indicator for a metric
 */
export interface MetricTrend {
  /**
   * Trend value (e.g., "+12%", "-5%")
   */
  value: string;

  /**
   * Whether the trend is positive
   * @default true
   */
  positive?: boolean;

  /**
   * Comparison period label (e.g., "vs last month")
   */
  label?: string;
}

/**
 * Sparkline data point
 */
export type SparklineData = number[];

/**
 * Individual metric item
 */
export interface MetricItem {
  /**
   * Unique identifier
   */
  id?: string;

  /**
   * Metric label
   */
  label: string;

  /**
   * Main value (e.g., "$12,345", "89%", "1,234")
   */
  value: string | number;

  /**
   * Optional change/trend indicator
   */
  change?: MetricTrend;

  /**
   * Optional icon element
   */
  icon?: ReactNode;

  /**
   * Optional sparkline data
   */
  sparkline?: SparklineData;

  /**
   * Optional link to detailed view
   */
  href?: string;

  /**
   * Click handler (alternative to href)
   */
  onClick?: () => void;

  /**
   * Additional description
   */
  description?: string;

  /**
   * Loading state for this metric
   */
  loading?: boolean;
}

/**
 * MetricCards column count
 */
export type MetricCardsColumns = 2 | 3 | 4 | 5;

/**
 * MetricCards visual variant
 */
export type MetricCardsVariant = "default" | "compact" | "detailed";

/**
 * MetricCards section props
 *
 * @example
 * ```tsx
 * <MetricCards
 *   metrics={[
 *     { label: 'Revenue', value: '$12,345', change: { value: '+12%', positive: true } },
 *     { label: 'Users', value: '1,234', change: { value: '+5%', positive: true } },
 *     { label: 'Conversion', value: '3.2%', change: { value: '-0.5%', positive: false } }
 *   ]}
 *   columns={3}
 * />
 * ```
 */
export interface MetricCardsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of metric items
   */
  metrics: MetricItem[];

  /**
   * Number of grid columns
   * @default 4
   */
  columns?: MetricCardsColumns;

  /**
   * Visual variant
   * - default: Standard cards with borders
   * - compact: Smaller padding and text
   * - detailed: Includes sparklines and descriptions
   * @default 'default'
   */
  variant?: MetricCardsVariant;

  /**
   * Loading state for all cards
   * @default false
   */
  loading?: boolean;
}

/**
 * Individual MetricCard props (internal component)
 */
export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Metric data
   */
  metric: MetricItem;

  /**
   * Visual variant
   */
  variant?: MetricCardsVariant;

  /**
   * Loading state
   */
  loading?: boolean;
}
