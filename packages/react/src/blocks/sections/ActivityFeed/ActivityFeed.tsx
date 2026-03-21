"use client";

import React, { useState } from "react";
import type { ActivityFeedProps } from "./ActivityFeed.types";
import styles from "./ActivityFeed.module.css";

export const ActivityFeed = React.forwardRef<HTMLElement, ActivityFeedProps>(
  (
    {
      activities,
      showFilters = false,
      filters = [],
      activeFilter: activeFilterProp,
      onFilterChange,
      compact = false,
      hasMore = false,
      onLoadMore,
      emptyMessage = "No activities yet",
      className,
    },
    ref,
  ) => {
    const [activeFilter, setActiveFilter] = useState(activeFilterProp || "all");

    const handleFilterChange = (value: string) => {
      setActiveFilter(value);
      onFilterChange?.(value);
    };

    const filteredActivities =
      activeFilter === "all"
        ? activities
        : activities.filter((a) => a.type === activeFilter);

    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        {showFilters && filters.length > 0 && (
          <div className={styles.filters}>
            {filters.map((filter) => (
              <button
                key={filter.value}
                className={`${styles.filterButton} ${
                  activeFilter === filter.value ? styles.filterButtonActive : ""
                }`}
                onClick={() => handleFilterChange(filter.value)}
                type="button"
              >
                {filter.label}
                {filter.count != null && (
                  <span className={styles.filterCount}>{filter.count}</span>
                )}
              </button>
            ))}
          </div>
        )}

        {filteredActivities.length === 0 ? (
          <div className={styles.empty}>{emptyMessage}</div>
        ) : (
          <div className={styles.list}>
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`${styles.item} ${compact ? styles.itemCompact : ""}`}
              >
                {activity.iconVariant && (
                  <div
                    className={`${styles.iconIndicator} ${
                      styles[
                        `icon${activity.iconVariant.charAt(0).toUpperCase() + activity.iconVariant.slice(1)}` as keyof typeof styles
                      ] || ""
                    }`}
                  />
                )}
                {activity.actor.avatar ? (
                  <img
                    src={activity.actor.avatar}
                    alt={activity.actor.name}
                    className={`${styles.avatar} ${
                      compact ? styles.avatarCompact : ""
                    }`}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {activity.actor.name.charAt(0)}
                  </div>
                )}
                <div className={styles.content}>
                  <p className={styles.title}>{activity.title}</p>
                  {activity.description && (
                    <p className={styles.description}>{activity.description}</p>
                  )}
                </div>
                <span className={styles.time}>{activity.relativeTime}</span>
              </div>
            ))}
          </div>
        )}

        {hasMore && (
          <div className={styles.loadMore}>
            <button
              className={styles.loadMoreButton}
              onClick={onLoadMore}
              type="button"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    );
  },
);

ActivityFeed.displayName = "ActivityFeed";
