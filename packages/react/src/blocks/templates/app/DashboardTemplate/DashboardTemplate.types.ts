/**
 * DashboardTemplate Types
 */

import type { ReactNode } from "react";

export interface MetricCard {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
}

export interface ChartData {
  id: string;
  title: string;
  type: "line" | "bar" | "area";
  data: unknown[];
}

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
  type: "success" | "warning" | "error" | "info";
}

export interface DashboardTemplateProps {
  /** Dashboard title */
  title?: string;

  /** Subtitle or description */
  subtitle?: string;

  /** Metric cards */
  metrics?: MetricCard[];

  /** Charts to display */
  charts?: ChartData[];

  /** Recent activity items */
  activity?: ActivityItem[];

  /** Custom className */
  className?: string;

  /** Additional content */
  children?: ReactNode;
}
