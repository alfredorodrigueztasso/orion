"use client";

import { forwardRef } from "react";
import type { ComparisonProps } from "./Comparison.types";
import styles from "./Comparison.module.css";

export const Comparison = forwardRef<HTMLElement, ComparisonProps>(
  ({ title, columns, features, className, ...rest }, ref) => {
    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                <th className={styles.headerCell} />
                {columns.map((col) => (
                  <th
                    key={col.title}
                    className={`${styles.headerCell} ${col.highlighted ? styles.highlighted : ""}`}
                  >
                    {col.title}
                    {col.badge && (
                      <span className={styles.badge}>{col.badge}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.name} className={styles.featureRow}>
                  <td className={styles.featureName}>{feature.name}</td>
                  {feature.values.map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className={`${styles.featureValue} ${columns[colIndex]?.highlighted ? styles.highlightedCol : ""}`}
                    >
                      {typeof value === "boolean" ? (
                        value ? (
                          <span className={styles.checkIcon} aria-label="Yes">
                            &#10003;
                          </span>
                        ) : (
                          <span className={styles.crossIcon} aria-label="No">
                            &#8212;
                          </span>
                        )
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  },
);

Comparison.displayName = "Comparison";
