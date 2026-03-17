"use client";

import { forwardRef } from "react";
import type { SocialProofProps } from "./SocialProof.types";
import styles from "./SocialProof.module.css";

export const SocialProof = forwardRef<HTMLElement, SocialProofProps>(
  (
    { title, logos, testimonials, stats, compact = false, className, ...rest },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={`${styles.section} ${compact ? styles.compact : ""} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>

          {logos && logos.length > 0 && !compact && (
            <div className={styles.logos}>
              {logos.map((item) => (
                <img
                  key={item.name}
                  src={item.logo}
                  alt={item.name}
                  className={styles.logoImage}
                />
              ))}
            </div>
          )}

          {stats && stats.length > 0 && (
            <div className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {testimonials && testimonials.length > 0 && !compact && (
            <div className={styles.testimonials}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={styles.testimonialCard}>
                  <p className={styles.quote}>{testimonial.quote}</p>
                  <div className={styles.testimonialAuthor}>
                    <p className={styles.authorName}>{testimonial.author}</p>
                    {(testimonial.title || testimonial.company) && (
                      <p className={styles.authorTitle}>
                        {[testimonial.title, testimonial.company]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  },
);

SocialProof.displayName = "SocialProof";
