/**
 * Timeline Section Component
 *
 * A vertical or horizontal timeline for displaying events chronologically.
 */

import React from "react";
import type { TimelineProps, TimelineEvent } from "./Timeline.types";
import styles from "./Timeline.module.css";

/**
 * Default marker icon
 */
const DefaultMarker: React.FC = () => (
  <svg
    className={styles.markerIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="4" />
  </svg>
);

/**
 * Checkmark icon for completed
 */
const CheckIcon: React.FC = () => (
  <svg
    className={styles.markerIcon}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/**
 * Timeline section for displaying chronological events
 */
export const Timeline: React.FC<TimelineProps> = ({
  eyebrow,
  title,
  description,
  events,
  orientation = "vertical",
  alternating = false,
  showConnector = true,
  background = "base",
  compact = false,
  align = "center",
  className,
  ...rest
}) => {
  const layoutClass =
    orientation === "horizontal" ? styles.horizontal : styles.vertical;

  const getMarkerIcon = (event: TimelineEvent) => {
    if (event.icon) return event.icon;
    if (event.status === "completed") return <CheckIcon />;
    return <DefaultMarker />;
  };

  return (
    <section
      className={`${styles.timeline} ${className || ""}`}
      data-background={background}
      data-compact={compact}
      data-align={align}
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

        <div
          className={layoutClass}
          data-connector={showConnector}
          data-alternating={alternating && orientation === "vertical"}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className={styles.event}
              data-status={event.status || "default"}
            >
              <div className={styles.marker}>{getMarkerIcon(event)}</div>
              <div className={styles.eventContent}>
                <span className={styles.eventDate}>{event.date}</span>
                <h3 className={styles.eventTitle}>
                  {event.href ? (
                    <a href={event.href}>{event.title}</a>
                  ) : (
                    event.title
                  )}
                </h3>
                {event.description && (
                  <p className={styles.eventDescription}>{event.description}</p>
                )}
                {event.content && (
                  <div className={styles.eventExtra}>{event.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Timeline.displayName = "Timeline";
