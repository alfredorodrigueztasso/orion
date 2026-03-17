import type { ReactNode } from "react";

export type ActivityIconVariant = "info" | "success" | "warning" | "error" | "primary";

export interface ActivityActor {
  name: string;
  avatar?: string;
}

export interface ActivityItem {
  id: string;
  type: string;
  actor: ActivityActor;
  title: string;
  description?: string;
  relativeTime: string;
  iconVariant?: ActivityIconVariant;
  icon?: ReactNode;
}

export interface ActivityFilter {
  label: string;
  value: string;
  count?: number;
}

export interface ActivityFeedProps {
  /** List of activity items to display */
  activities: ActivityItem[];
  /** Whether to show filter controls */
  showFilters?: boolean;
  /** Available filter options */
  filters?: ActivityFilter[];
  /** Currently active filter value */
  activeFilter?: string;
  /** Callback when filter changes */
  onFilterChange?: (value: string) => void;
  /** Use compact layout */
  compact?: boolean;
  /** Whether more items can be loaded */
  hasMore?: boolean;
  /** Callback for loading more items */
  onLoadMore?: () => void;
  /** Message to display when activities list is empty */
  emptyMessage?: string;
  /** Optional className */
  className?: string;
}
