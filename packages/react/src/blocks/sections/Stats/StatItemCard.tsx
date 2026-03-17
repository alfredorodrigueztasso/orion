import type { StatItem as StatItemType } from "./Stats.types";
import styles from "./Stats.module.css";

export const StatItemCard = ({ stat }: { stat: StatItemType }) => {
  return (
    <div className={styles.statItem}>
      {stat.icon && <div className={styles.statIcon}>{stat.icon}</div>}
      <p className={styles.statValue}>{stat.value}</p>
      <p className={styles.statLabel}>{stat.label}</p>
      {stat.trend && (
        <p
          className={`${styles.statTrend} ${stat.trend.positive ? styles.trendPositive : styles.trendNegative}`}
        >
          {stat.trend.value}
        </p>
      )}
    </div>
  );
};

StatItemCard.displayName = "StatItemCard";
