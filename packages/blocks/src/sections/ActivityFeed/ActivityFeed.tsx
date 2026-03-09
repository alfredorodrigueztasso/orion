"use client";

import React from "react";
import { Avatar, Chip, Badge, Button, Spinner } from "@orion-ds/react";
import type { ActivityFeedProps } from "./ActivityFeed.types";
import styles from "./ActivityFeed.module.css";

export const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      activities,
      showFilters,
      filters,
      activeFilter,
      onFilterChange,
      compact,
      hasMore,
      onLoadMore,
      loading,
      emptyMessage = "No activities yet",
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.feed} ${compact ? styles.compact : ""} ${className || ""}`}
        {...rest}
      >
        {/* Filter Bar */}
        {showFilters && filters && filters.length > 0 && (
          <div className={styles.filterBar}>
            {filters.map((filter) => (
              <Chip
                key={filter.value}
                clickable
                size={compact ? "sm" : "md"}
                selected={activeFilter === filter.value}
                onClick={() => onFilterChange?.(filter.value)}
              >
                {filter.label}{" "}
                {filter.count !== undefined && `(${filter.count})`}
              </Chip>
            ))}
          </div>
        )}

        {/* Empty State */}
        {activities.length === 0 && !loading && (
          <div className={styles.emptyState}>
            <p>{emptyMessage}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loading}>
            <Spinner size="sm" />
            <span>Loading activities...</span>
          </div>
        )}

        {/* Activity List */}
        {!loading && activities.length > 0 && (
          <div className={styles.list}>
            {activities.map((activity) => (
              <div key={activity.id} className={styles.item}>
                {/* Avatar with icon variant coloring */}
                <div
                  className={`${styles.avatar} ${activity.iconVariant ? styles[activity.iconVariant] : ""}`}
                >
                  <Avatar
                    src={activity.actor.avatar}
                    alt={activity.actor.name}
                    size={compact ? "sm" : "md"}
                  />
                </div>

                {/* Content */}
                <div className={styles.content}>
                  {/* Header: Actor name + time */}
                  <div className={styles.header}>
                    <span className={styles.actor}>{activity.actor.name}</span>
                    <span className={styles.time}>{activity.relativeTime}</span>
                  </div>

                  {/* Title */}
                  <div className={styles.title}>{activity.title}</div>

                  {/* Description */}
                  {activity.description && (
                    <div className={styles.description}>
                      {activity.description}
                    </div>
                  )}

                  {/* Metadata badges */}
                  {activity.metadata &&
                    Object.entries(activity.metadata).length > 0 && (
                      <div className={styles.metadata}>
                        {Object.entries(activity.metadata).map(
                          ([key, value]) => (
                            <Badge key={key} variant="secondary" size="sm">
                              {key}: {value}
                            </Badge>
                          ),
                        )}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && hasMore && (
          <div className={styles.loadMore}>
            <Button
              variant="secondary"
              size={compact ? "sm" : "md"}
              onClick={onLoadMore}
            >
              Load more activities
            </Button>
          </div>
        )}
      </div>
    );
  },
);

ActivityFeed.displayName = "ActivityFeed";
