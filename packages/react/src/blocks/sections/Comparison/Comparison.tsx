"use client";

/**
 * Comparison Section Component
 *
 * A comparison table for products, plans, or features.
 */

import React, { useMemo } from "react";
import type { ComparisonProps, ComparisonFeature } from "./Comparison.types";
import styles from "./Comparison.module.css";

/**
 * Check icon for true values
 */
const CheckIcon: React.FC = () => (
  <span className={styles.checkIcon}>
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

/**
 * Cross icon for false values
 */
const CrossIcon: React.FC = () => (
  <span className={styles.crossIcon}>
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </span>
);

/**
 * Comparison section for comparing products/plans/features
 */
export const Comparison: React.FC<ComparisonProps> = ({
  eyebrow,
  title,
  description,
  columns,
  features,
  showCategories = true,
  showDescriptions = false,
  stickyHeader = true,
  background = "base",
  compact = false,
  className,
  ...rest
}) => {
  // Group features by category if categories exist
  const groupedFeatures = useMemo(() => {
    if (!showCategories) return { "": features };

    const groups: Record<string, ComparisonFeature[]> = {};
    features.forEach((feature) => {
      const category = feature.category || "";
      if (!groups[category]) groups[category] = [];
      groups[category].push(feature);
    });
    return groups;
  }, [features, showCategories]);

  const renderValue = (value: boolean | string | React.ReactNode) => {
    if (typeof value === "boolean") {
      return value ? <CheckIcon /> : <CrossIcon />;
    }
    return value;
  };

  return (
    <section
      className={`${styles.comparison} ${className || ""}`}
      data-background={background}
      data-sticky={stickyHeader}
      data-compact={compact}
      {...rest}
    >
      <div className={styles.container}>
        {(eyebrow || title || description) && (
          <header className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.featureLabelHeader}>Features</th>
                {columns.map((column, index) => (
                  <th key={index}>
                    <div
                      className={styles.columnHeader}
                      data-highlighted={column.highlighted}
                    >
                      {column.badge && (
                        <span className={styles.columnBadge}>
                          {column.badge}
                        </span>
                      )}
                      <h3 className={styles.columnTitle}>{column.title}</h3>
                      {column.subtitle && (
                        <p className={styles.columnSubtitle}>
                          {column.subtitle}
                        </p>
                      )}
                      {column.ctaLabel && column.ctaHref && (
                        <div className={styles.columnCta}>
                          <a href={column.ctaHref} className={styles.ctaButton}>
                            {column.ctaLabel}
                          </a>
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {Object.entries(groupedFeatures).map(
                ([category, categoryFeatures]) => (
                  <React.Fragment key={category || "default"}>
                    {showCategories && category && (
                      <tr className={styles.categoryRow}>
                        <td colSpan={columns.length + 1}>{category}</td>
                      </tr>
                    )}
                    {categoryFeatures.map((feature, featureIndex) => (
                      <tr key={featureIndex}>
                        <td>
                          <div className={styles.featureName}>
                            {feature.name}
                          </div>
                          {showDescriptions && feature.description && (
                            <div className={styles.featureDescription}>
                              {feature.description}
                            </div>
                          )}
                        </td>
                        {feature.values.map((value, valueIndex) => (
                          <td
                            key={valueIndex}
                            className={styles.valueCell}
                            data-highlighted={columns[valueIndex]?.highlighted}
                          >
                            {renderValue(value)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

Comparison.displayName = "Comparison";
