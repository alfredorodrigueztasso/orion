"use client";

import React from "react";
import type { TimelineProps } from "./Timeline.types";
import styles from "./Timeline.module.css";

export const Timeline: React.FC<TimelineProps> = ({
  title,
  events,
  orientation = "horizontal",
  compact = false,
  className,
}) => {
  const isVertical = orientation === "vertical";

  return (
    <section
      className={`${styles.section} ${compact ? styles.compact : ""} ${
        className || ""
      }`}
    >
      {title && <h2 className={styles.title}>{title}</h2>}

      <div
        className={
          isVertical ? styles.eventsVertical : styles.eventsHorizontal
        }
      >
        {events.map((event, index) => (
          <React.Fragment key={event.id}>
            <div
              className={`${styles.event} ${
                isVertical ? styles.eventVertical : ""
              }`}
            >
              <div
                className={`${styles.eventDot} ${
                  isVertical ? styles.eventDotVertical : ""
                }`}
              />
              <div className={styles.eventContent}>
                <p className={styles.eventDate}>{event.date}</p>
                <p className={styles.eventTitle}>{event.title}</p>
                {event.description && (
                  <p className={styles.eventDescription}>
                    {event.description}
                  </p>
                )}
              </div>
            </div>
            {!isVertical && index < events.length - 1 && (
              <div className={styles.connector} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

Timeline.displayName = "Timeline";
