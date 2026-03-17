import type { HTMLAttributes, ReactNode } from "react";

export type StatsVariant = "default" | "cards" | "inline";

export interface StatTrend {
  value: string;
  positive: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  icon?: ReactNode;
  trend?: StatTrend;
}

export interface StatsProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title?: string;
  /** Stat items to display */
  stats: StatItem[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Visual variant */
  variant?: StatsVariant;
  /** Additional class name */
  className?: string;
}
