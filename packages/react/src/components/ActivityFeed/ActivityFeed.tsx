"use client";

/**
 * ActivityFeed Component
 *
 * A timeline of events and activities for SaaS dashboards.
 * Optimized for Product Mode with efficient scanning and clear hierarchy.
 *
 * @example
 * ```tsx
 * <ActivityFeed
 *   activities={[
 *     {
 *       id: '1',
 *       type: 'comment',
 *       actor: { name: 'John Doe' },
 *       title: 'Commented on Project X',
 *       relativeTime: '2 hours ago'
 *     }
 *   ]}
 * />
 * ```
 */

import { forwardRef } from "react";
import {
  MessageSquare,
  Edit,
  Plus,
  Trash2,
  UserPlus,
  CheckCircle,
  Upload,
  Circle,
} from "lucide-react";
import { Chip } from "../../components/Chip";
import { Button } from "../../components/Button";
import type { ActivityFeedProps, ActivityItem } from "./ActivityFeed.types";
import styles from "./ActivityFeed.module.css";

// Icon size constant (matches --size-icon-sm: 16px)
const ICON_SIZE = 16;

// Type to icon mapping
const typeIcons: Record<string, React.ReactNode> = {
  comment: <MessageSquare size={ICON_SIZE} />,
  update: <Edit size={ICON_SIZE} />,
  create: <Plus size={ICON_SIZE} />,
  delete: <Trash2 size={ICON_SIZE} />,
  assign: <UserPlus size={ICON_SIZE} />,
  complete: <CheckCircle size={ICON_SIZE} />,
  upload: <Upload size={ICON_SIZE} />,
  default: <Circle size={ICON_SIZE} />,
};

// Activity item component
const ActivityItemComponent = ({
  item,
  showConnector,
  compact,
}: {
  item: ActivityItem;
  showConnector: boolean;
  compact: boolean;
}) => {
  const icon = item.icon || typeIcons[item.type || "default"];
  const iconVariant = item.iconVariant || "default";

  return (
    <div className={`${styles.item} ${compact ? styles.itemCompact : ""}`}>
      <div className={styles.iconColumn}>
        <div
          className={`${styles.iconWrapper} ${styles[`iconVariant-${iconVariant}`]}`}
        >
          {icon}
        </div>
        {showConnector && <div className={styles.connector} />}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          {item.actor && (
            <span className={styles.actor}>
              {item.actor.avatar && (
                <img
                  src={item.actor.avatar}
                  alt={item.actor.name}
                  className={styles.avatar}
                />
              )}
              {item.actor.href ? (
                <a href={item.actor.href} className={styles.actorName}>
                  {item.actor.name}
                </a>
              ) : (
                <span className={styles.actorName}>{item.actor.name}</span>
              )}
            </span>
          )}
          <span className={styles.title}>{item.title}</span>
          <span className={styles.time}>
            {item.relativeTime || item.timestamp}
          </span>
        </div>

        {item.description && (
          <div className={styles.description}>{item.description}</div>
        )}

        {item.metadata && Object.keys(item.metadata).length > 0 && (
          <div className={styles.metadata}>
            {Object.entries(item.metadata).map(([key, value]) => (
              <span key={key} className={styles.metadataItem}>
                <span className={styles.metadataKey}>{key}:</span>
                <span className={styles.metadataValue}>{value}</span>
              </span>
            ))}
          </div>
        )}

        {item.actions && <div className={styles.actions}>{item.actions}</div>}
      </div>
    </div>
  );
};

export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      activities,
      showFilters = false,
      filters,
      activeFilter,
      onFilterChange,
      onLoadMore,
      hasMore = false,
      loading = false,
      emptyMessage = "No activity yet.",
      showConnectors = true,
      compact = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.activityFeed,
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {/* Filters */}
        {showFilters && filters && filters.length > 0 && (
          <div className={styles.filters}>
            {filters.map((filter) => (
              <Chip
                key={filter.value}
                clickable
                selected={activeFilter === filter.value}
                onClick={() => onFilterChange?.(filter.value)}
              >
                {filter.label}
                {filter.count !== undefined && ` (${filter.count})`}
              </Chip>
            ))}
          </div>
        )}

        {/* Activity list */}
        <div className={styles.list}>
          {activities.length === 0 && !loading ? (
            <div className={styles.empty}>{emptyMessage}</div>
          ) : (
            activities.map((activity, index) => (
              <ActivityItemComponent
                key={activity.id}
                item={activity}
                showConnector={showConnectors && index < activities.length - 1}
                compact={compact}
              />
            ))
          )}

          {/* Loading skeleton */}
          {loading && (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeleton}>
                  <div className={styles.skeletonIcon} />
                  <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle} />
                    <div className={styles.skeletonDesc} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Load more */}
        {hasMore && !loading && (
          <Button
            variant="secondary"
            onClick={onLoadMore}
            style={{ width: "100%", marginTop: "var(--spacing-2)" }}
          >
            Load more
          </Button>
        )}
      </div>
    );
  },
);

ActivityFeed.displayName = "ActivityFeed";
