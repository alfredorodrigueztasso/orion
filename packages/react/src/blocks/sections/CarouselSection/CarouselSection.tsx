"use client";

import React, { useState, useEffect, useCallback } from "react";
import type { CarouselSectionProps, CarouselCardProps } from "./CarouselSection.types";
import { CarouselCard } from "./CarouselCard";
import styles from "./CarouselSection.module.css";

type CarouselSectionComponent = React.ForwardRefExoticComponent<
  CarouselSectionProps & React.RefAttributes<HTMLElement>
> & {
  Card: React.FC<CarouselCardProps>;
};

export const CarouselSection = React.forwardRef<HTMLElement, CarouselSectionProps>(
  (
    {
      items,
      autoScroll = false,
      autoScrollInterval = 5000,
      title,
      description,
      className,
    },
    ref,
  ) => {
    const [current, setCurrent] = useState(0);
    const total = items.length;

    const goTo = useCallback(
      (index: number) => {
        setCurrent(((index % total) + total) % total);
      },
      [total],
    );

    const goPrev = useCallback(() => goTo(current - 1), [current, goTo]);
    const goNext = useCallback(() => goTo(current + 1), [current, goTo]);

    useEffect(() => {
      if (!autoScroll || total <= 1) return;
      const timer = setInterval(() => {
        setCurrent((prev) => (prev + 1) % total);
      }, autoScrollInterval);
      return () => clearInterval(timer);
    }, [autoScroll, autoScrollInterval, total]);

    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        <div className={styles.container}>
          {(title || description) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {items.map((item) => (
                <div key={item.id} className={styles.slide}>
                  <CarouselCard {...item} />
                </div>
              ))}
            </div>
          </div>
          {total > 1 && (
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.navButton}
                onClick={goPrev}
                aria-label="Previous slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className={styles.dots}>
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`${styles.dot} ${index === current ? styles.dotActive : ""}`}
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className={styles.navButton}
                onClick={goNext}
                aria-label="Next slide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  },
) as CarouselSectionComponent;

CarouselSection.displayName = "CarouselSection";
CarouselSection.Card = CarouselCard;
