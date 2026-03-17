"use client";

/**
 * MetricCards Component
 *
 * A row of KPI cards for dashboard overviews.
 * Optimized for Product Mode with minimal visual noise and data density.
 *
 * @example
 * ```tsx
 * <MetricCards
 *   metrics={[
 *     { label: 'Revenue', value: '$12,345', change: { value: '+12%', positive: true } },
 *     { label: 'Users', value: '1,234', change: { value: '+5%', positive: true } },
 *     { label: 'Conversion', value: '3.2%', change: { value: '-0.5%', positive: false } }
 *   ]}
 *   columns={3}
 * />
 * ```
 */

import { forwardRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { MetricCardsProps, MetricCardProps } from "./MetricCards.types";
import styles from "./MetricCards.module.css";

// Sparkline mini component
const Sparkline = ({ data }: { data: number[] }) => {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const height = 24;
  const width = 64;
  const stepX = width / (data.length - 1);

  const points = data
    .map((value, index) => {
      const x = index * stepX;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  const isPositive =
    firstValue !== undefined &&
    lastValue !== undefined &&
    lastValue >= firstValue;

  return (
    <svg
      className={styles.sparkline}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        fill="none"
        stroke={isPositive ? "var(--text-success)" : "var(--text-error)"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

// Individual MetricCard component
const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    { metric, variant = "default", loading = false, className, ...rest },
    ref,
  ) => {
    const {
      label,
      value,
      change,
      icon,
      sparkline,
      href,
      onClick,
      description,
      loading: itemLoading,
    } = metric;

    const isLoading = loading || itemLoading;
    const isInteractive = href || onClick;

    const classNames = [
      styles.card,
      styles[`variant-${variant}`],
      isInteractive && styles.interactive,
      isLoading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <>
        <div className={styles.cardHeader}>
          {icon && <span className={styles.cardIcon}>{icon}</span>}
          <span className={styles.label}>{label}</span>
        </div>

        <div className={styles.cardBody}>
          {isLoading ? (
            <div className={styles.skeleton} />
          ) : (
            <>
              <span className={styles.value}>{value}</span>
              {sparkline && variant === "detailed" && (
                <Sparkline data={sparkline} />
              )}
            </>
          )}
        </div>

        {(change || description) && !isLoading && (
          <div className={styles.cardFooter}>
            {change && (
              <span
                className={`${styles.change} ${change.positive ? styles.positive : styles.negative}`}
              >
                {change.positive ? (
                  <TrendingUp size={12} />
                ) : (
                  <TrendingDown size={12} />
                )}
                <span>{change.value}</span>
                {change.label && (
                  <span className={styles.changeLabel}>{change.label}</span>
                )}
              </span>
            )}
            {description && variant === "detailed" && (
              <span className={styles.description}>{description}</span>
            )}
          </div>
        )}
      </>
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classNames}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    if (onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={onClick}
          className={classNames}
          {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      );
    }

    return (
      <div ref={ref} className={classNames} {...rest}>
        {content}
      </div>
    );
  },
);

MetricCard.displayName = "MetricCard";

// Main MetricCards component
export const MetricCards = forwardRef<HTMLDivElement, MetricCardsProps>(
  (
    {
      metrics,
      columns = 4,
      variant = "default",
      loading = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const classNames = [
      styles.metricCards,
      styles[`cols-${columns}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.id || metric.label || index}
            metric={metric}
            variant={variant}
            loading={loading}
          />
        ))}
      </div>
    );
  },
);

MetricCards.displayName = "MetricCards";

export { MetricCard };
