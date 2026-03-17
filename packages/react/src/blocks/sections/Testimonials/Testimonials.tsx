"use client";

import React from "react";
import type { TestimonialsProps, TestimonialCardProps } from "./Testimonials.types";
import { TestimonialCard } from "./TestimonialCard";
import styles from "./Testimonials.module.css";

type TestimonialsComponent = React.ForwardRefExoticComponent<
  TestimonialsProps & React.RefAttributes<HTMLElement>
> & {
  Card: React.FC<TestimonialCardProps>;
};

export const Testimonials = React.forwardRef<HTMLElement, TestimonialsProps>(
  ({ title, description, testimonials, columns = 3, variant = "default", className }, ref) => {
    const gridClass = columns === 2 ? styles.grid2 : styles.grid3;

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
          <div className={`${styles.grid} ${gridClass}`}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                variant={variant}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
) as TestimonialsComponent;

Testimonials.displayName = "Testimonials";
Testimonials.Card = TestimonialCard;
