/**
 * Stats Component
 *
 * A stats/metrics section for displaying key numbers and KPIs.
 * Supports icons, trends, and multiple visual variants.
 *
 * @example
 * ```tsx
 * <Stats
 *   eyebrow={<Badge>Metrics</Badge>}
 *   title="By the numbers"
 *   description="Our platform's impact in real numbers"
 *   stats={[
 *     { value: "10K+", label: "Active users" },
 *     { value: "99.9%", label: "Uptime", trend: { value: "+0.1%", positive: true } },
 *     { value: "$1.2M", label: "Revenue" },
 *     { value: "150+", label: "Countries" }
 *   ]}
 *   columns={4}
 * />
 * ```
 */

import { forwardRef } from "react";
import type { StatsProps } from "./Stats.types";
import { Section, Container } from "@orion-ds/react";
import { StatItemCard } from "./StatItemCard";
import styles from "./Stats.module.css";

export const Stats = forwardRef<HTMLElement, StatsProps>(
  (
    {
      eyebrow,
      title,
      description,
      stats,
      columns = 4,
      variant = "default",
      background = "subtle",
      centered = true,
      highlightValue = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;

    const classNames = [styles.stats, centered && styles.centered, className]
      .filter(Boolean)
      .join(" ");

    return (
      <Section
        ref={ref}
        spacing="lg"
        background={background}
        className={classNames}
        {...rest}
      >
        <Container size="xl">
          {hasHeader && (
            <header className={styles.header}>
              {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </header>
          )}

          <div
            className={`${styles.grid} ${styles[`cols-${columns}`]} ${styles[`variant-${variant}`]}`}
          >
            {stats.map((stat, index) => (
              <StatItemCard
                key={stat.label || index}
                stat={stat}
                variant={variant}
                highlightValue={highlightValue}
              />
            ))}
          </div>
        </Container>
      </Section>
    );
  },
);

Stats.displayName = "Stats";
