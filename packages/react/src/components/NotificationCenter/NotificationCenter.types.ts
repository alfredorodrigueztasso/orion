/**
 * NotificationCenter Component Types
 *
 * Type definitions for the Orion NotificationCenter section component.
 * A notification panel/dropdown for SaaS applications.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Notification item
 */
export interface NotificationItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Notification type
   */
  type?: "info" | "success" | "warning" | "error" | "default";

  /**
   * Notification title
   */
  title: string;

  /**
   * Notification message
   */
  message?: string;

  /**
   * Custom icon (overrides type-based icon)
   */
  icon?: ReactNode;

  /**
   * Timestamp
   */
  timestamp: string;

  /**
   * Relative time (e.g., "2 min ago")
   */
  relativeTime?: string;

  /**
   * Read state
   */
  read?: boolean;

  /**
   * Action URL or click handler
   */
  href?: string;
  onClick?: () => void;

  /**
   * Avatar/image for the notification
   */
  avatar?: string;

  /**
   * Category for grouping
   */
  category?: string;
}

/**
 * NotificationCenter section props
 *
 * @example
 * ```tsx
 * <NotificationCenter
 *   notifications={[
 *     { id: '1', type: 'info', title: 'New message', message: 'You have a new message', relativeTime: '2 min ago' }
 *   ]}
 *   onMarkAsRead={(id) => markAsRead(id)}
 *   onMarkAllAsRead={() => markAllAsRead()}
 * />
 * ```
 */
export interface NotificationCenterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Notification items
   */
  notifications: NotificationItem[];

  /**
   * Mark single notification as read
   */
  onMarkAsRead?: (id: string) => void;

  /**
   * Mark all notifications as read
   */
  onMarkAllAsRead?: () => void;

  /**
   * Delete/dismiss notification
   */
  onDismiss?: (id: string) => void;

  /**
   * Clear all notifications
   */
  onClearAll?: () => void;

  /**
   * View all link/action
   */
  onViewAll?: () => void;

  /**
   * Header title
   * @default "Notifications"
   */
  title?: string;

  /**
   * Empty state message
   * @default "No notifications"
   */
  emptyMessage?: string;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Maximum height before scrolling
   */
  maxHeight?: string;

  /**
   * Group notifications by category
   * @default false
   */
  groupByCategory?: boolean;

  /**
   * Show unread count badge
   * @default true
   */
  showUnreadCount?: boolean;
}
