"use client";

/**
 * DashboardTemplate
 *
 * Main dashboard layout with metrics, charts, and activity feed.
 * Designed for business intelligence and analytics applications.
 *
 * @example
 * ```tsx
 * <DashboardTemplate
 *   title="Analytics"
 *   metrics={metrics}
 *   charts={charts}
 *   activity={activity}
 * />
 * ```
 */

import { forwardRef } from "react";
import { Card, Badge } from "@orion-ds/react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import type {
  DashboardTemplateProps,
  MetricCard,
  ActivityItem,
} from "./DashboardTemplate.types";
import styles from "./DashboardTemplate.module.css";

function MetricCardComponent({ metric }: { metric: MetricCard }) {
  return (
    <Card className={styles.metricCard}>
      <Card.Body className={styles.metricBody}>
        <div className={styles.metricHeader}>
          <div className={styles.metricLabel}>{metric.label}</div>
          {metric.icon && (
            <div className={styles.metricIcon}>{metric.icon}</div>
          )}
        </div>
        <div className={styles.metricValue}>{metric.value}</div>
        {metric.change !== undefined && (
          <div className={styles.metricChange}>
            {metric.trend === "up" && (
              <>
                <TrendingUp size={16} />
                <span className={styles.changeUp}>+{metric.change}%</span>
              </>
            )}
            {metric.trend === "down" && (
              <>
                <TrendingDown size={16} />
                <span className={styles.changeDown}>{metric.change}%</span>
              </>
            )}
            {metric.trend === "neutral" && (
              <span className={styles.changeNeutral}>{metric.change}%</span>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

function ActivityItemComponent({ item }: { item: ActivityItem }) {
  return (
    <div className={styles.activityItem}>
      <div
        className={[styles.activityDot, styles[`type${item.type}`]]
          .filter(Boolean)
          .join(" ")}
      />
      <div className={styles.activityContent}>
        <div className={styles.activityTitle}>{item.title}</div>
        {item.description && (
          <div className={styles.activityDescription}>{item.description}</div>
        )}
        <div className={styles.activityTime}>
          <Clock size={14} />
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

export const DashboardTemplate = forwardRef<
  HTMLDivElement,
  DashboardTemplateProps
>(
  (
    {
      title = "Dashboard",
      subtitle,
      metrics = [],
      charts = [],
      activity = [],
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>

        {/* Metrics Grid */}
        {metrics.length > 0 && (
          <div className={styles.metricsGrid}>
            {metrics.map((metric) => (
              <MetricCardComponent key={metric.id} metric={metric} />
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className={styles.contentGrid}>
          {/* Charts Section */}
          {charts.length > 0 && (
            <div className={styles.chartsSection}>
              {charts.map((chart) => (
                <Card key={chart.id} className={styles.chartCard}>
                  <Card.Header>
                    <h3 className={styles.chartTitle}>{chart.title}</h3>
                    <Badge variant="info" size="sm">
                      {chart.type}
                    </Badge>
                  </Card.Header>
                  <Card.Body className={styles.chartBody}>
                    <div className={styles.chartPlaceholder}>
                      Chart: {chart.title}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {/* Activity Feed Section */}
          {activity.length > 0 && (
            <Card className={styles.activityCard}>
              <Card.Header>
                <h3 className={styles.activityTitle}>Recent Activity</h3>
              </Card.Header>
              <Card.Body className={styles.activityBody}>
                <div className={styles.activityList}>
                  {activity.map((item) => (
                    <ActivityItemComponent key={item.id} item={item} />
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    );
  },
);

DashboardTemplate.displayName = "DashboardTemplate";
export default DashboardTemplate;
