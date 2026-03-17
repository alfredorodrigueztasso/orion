/**
 * ActivityFeed Component Types
 *
 * Type definitions for the Orion ActivityFeed section component.
 * A timeline of events and activities for SaaS dashboards.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Activity item actor (who performed the action)
 */
export interface ActivityActor {
  /**
   * Actor name
   */
  name: string;

  /**
   * Avatar URL
   */
  avatar?: string;

  /**
   * Link to actor profile
   */
  href?: string;
}

/**
 * Activity item for the feed
 */
export interface ActivityItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Activity type for icon selection
   */
  type?:
    | "comment"
    | "update"
    | "create"
    | "delete"
    | "assign"
    | "complete"
    | "upload"
    | "default";

  /**
   * Custom icon (overrides type-based icon)
   */
  icon?: ReactNode;

  /**
   * Icon background color variant
   */
  iconVariant?: "default" | "success" | "warning" | "error" | "info" | "brand";

  /**
   * Actor who performed the action
   */
  actor?: ActivityActor;

  /**
   * Activity title/summary
   */
  title: ReactNode;

  /**
   * Activity description/content
   */
  description?: ReactNode;

  /**
   * Timestamp
   */
  timestamp: string;

  /**
   * Relative time (e.g., "2 hours ago")
   */
  relativeTime?: string;

  /**
   * Associated metadata
   */
  metadata?: Record<string, ReactNode>;

  /**
   * Action buttons
   */
  actions?: ReactNode;
}

/**
 * ActivityFeed filter option
 */
export interface ActivityFilter {
  /**
   * Filter value
   */
  value: string;

  /**
   * Filter label
   */
  label: string;

  /**
   * Item count for this filter
   */
  count?: number;
}

/**
 * ActivityFeed section props
 *
 * @example
 * ```tsx
 * <ActivityFeed
 *   activities={[
 *     {
 *       id: '1',
 *       type: 'comment',
 *       actor: { name: 'John Doe', avatar: '/avatars/john.jpg' },
 *       title: 'Commented on Project X',
 *       description: 'Great progress on the design!',
 *       timestamp: '2024-01-15T10:30:00Z',
 *       relativeTime: '2 hours ago'
 *     }
 *   ]}
 * />
 * ```
 */
export interface ActivityFeedProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of activity items
   */
  activities: ActivityItem[];

  /**
   * Show filter controls
   * @default false
   */
  showFilters?: boolean;

  /**
   * Filter options
   */
  filters?: ActivityFilter[];

  /**
   * Current filter value
   */
  activeFilter?: string;

  /**
   * Filter change handler
   */
  onFilterChange?: (filter: string) => void;

  /**
   * Load more callback
   */
  onLoadMore?: () => void;

  /**
   * Whether more items are available
   */
  hasMore?: boolean;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Show connector lines between items
   * @default true
   */
  showConnectors?: boolean;

  /**
   * Compact mode
   * @default false
   */
  compact?: boolean;
}
