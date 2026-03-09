import type { HTMLAttributes } from "react";

export interface ActivityActor {
  name: string;
  avatar?: string;
}

export interface Activity {
  id: string;
  type: string;
  actor: ActivityActor;
  title: string;
  description?: string;
  relativeTime: string;
  iconVariant?: "primary" | "success" | "warning" | "error" | "info";
  metadata?: Record<string, string>;
}

export interface ActivityFilter {
  label: string;
  value: string;
  count?: number;
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLDivElement> {
  activities: Activity[];
  showFilters?: boolean;
  filters?: ActivityFilter[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
  compact?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  emptyMessage?: string;
}
