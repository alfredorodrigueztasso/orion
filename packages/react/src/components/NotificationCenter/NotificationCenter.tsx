"use client";

/**
 * NotificationCenter Component
 *
 * A notification panel/dropdown for SaaS applications.
 * Optimized for Product Mode with efficient notification management.
 *
 * @example
 * ```tsx
 * <NotificationCenter
 *   notifications={notifications}
 *   onMarkAsRead={handleMarkAsRead}
 *   onMarkAllAsRead={handleMarkAllAsRead}
 * />
 * ```
 */

import { forwardRef, useMemo } from "react";
import {
  Bell,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  X,
  Check,
} from "lucide-react";
import type {
  NotificationCenterProps,
  NotificationItem,
} from "./NotificationCenter.types";
import styles from "./NotificationCenter.module.css";

// Type to icon mapping
const typeIcons: Record<string, React.ReactNode> = {
  info: <Info size={18} />,
  success: <CheckCircle size={18} />,
  warning: <AlertTriangle size={18} />,
  error: <XCircle size={18} />,
  default: <Bell size={18} />,
};

// Single notification item
const NotificationItemComponent = ({
  notification,
  onMarkAsRead,
  onDismiss,
}: {
  notification: NotificationItem;
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}) => {
  const icon = notification.icon || typeIcons[notification.type || "default"];
  const isClickable = notification.href || notification.onClick;

  const handleClick = () => {
    if (notification.onClick) {
      notification.onClick();
    }
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  const content = (
    <>
      <div className={styles.itemLeft}>
        {notification.avatar ? (
          <img src={notification.avatar} alt="" className={styles.itemAvatar} />
        ) : (
          <div
            className={`${styles.itemIcon} ${styles[`icon-${notification.type || "default"}`]}`}
          >
            {icon}
          </div>
        )}
      </div>

      <div className={styles.itemContent}>
        <div className={styles.itemHeader}>
          <span className={styles.itemTitle}>{notification.title}</span>
          {!notification.read && <span className={styles.unreadDot} />}
        </div>
        {notification.message && (
          <p className={styles.itemMessage}>{notification.message}</p>
        )}
        <span className={styles.itemTime}>
          {notification.relativeTime || notification.timestamp}
        </span>
      </div>

      <div className={styles.itemActions}>
        {!notification.read && onMarkAsRead && (
          <button
            type="button"
            className={styles.itemAction}
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(notification.id);
            }}
            title="Mark as read"
          >
            <Check size={14} />
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            className={styles.itemAction}
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(notification.id);
            }}
            title="Dismiss"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </>
  );

  if (notification.href) {
    return (
      <a
        href={notification.href}
        className={`${styles.item} ${notification.read ? styles.itemRead : ""}`}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={`${styles.item} ${notification.read ? styles.itemRead : ""} ${isClickable ? styles.itemClickable : ""}`}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      {content}
    </div>
  );
};

export const NotificationCenter = forwardRef<
  HTMLDivElement,
  NotificationCenterProps
>(
  (
    {
      notifications,
      onMarkAsRead,
      onMarkAllAsRead,
      onDismiss,
      onClearAll,
      onViewAll,
      title = "Notifications",
      emptyMessage = "No notifications",
      loading = false,
      maxHeight = "400px",
      groupByCategory = false,
      showUnreadCount = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const unreadCount = useMemo(
      () => notifications.filter((n) => !n.read).length,
      [notifications],
    );

    const groupedNotifications = useMemo(() => {
      if (!groupByCategory) return null;

      const groups: Record<string, NotificationItem[]> = {};
      notifications.forEach((n) => {
        const category = n.category || "Other";
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(n);
      });
      return groups;
    }, [notifications, groupByCategory]);

    const classNames = [styles.notificationCenter, className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <span>{title}</span>
            {showUnreadCount && unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </div>
          <div className={styles.headerActions}>
            {onMarkAllAsRead && unreadCount > 0 && (
              <button
                type="button"
                className={styles.headerAction}
                onClick={onMarkAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={styles.content} style={{ maxHeight }}>
          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
            </div>
          ) : notifications.length === 0 ? (
            <div className={styles.empty}>
              <Bell size={32} />
              <span>{emptyMessage}</span>
            </div>
          ) : groupByCategory && groupedNotifications ? (
            Object.entries(groupedNotifications).map(([category, items]) => (
              <div key={category} className={styles.group}>
                <div className={styles.groupTitle}>{category}</div>
                {items.map((notification) => (
                  <NotificationItemComponent
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={onMarkAsRead}
                    onDismiss={onDismiss}
                  />
                ))}
              </div>
            ))
          ) : (
            notifications.map((notification) => (
              <NotificationItemComponent
                key={notification.id}
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onDismiss={onDismiss}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {(onViewAll || onClearAll) && notifications.length > 0 && (
          <div className={styles.footer}>
            {onClearAll && (
              <button
                type="button"
                className={styles.footerAction}
                onClick={onClearAll}
              >
                Clear all
              </button>
            )}
            {onViewAll && (
              <button
                type="button"
                className={styles.footerActionPrimary}
                onClick={onViewAll}
              >
                View all notifications
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

NotificationCenter.displayName = "NotificationCenter";
