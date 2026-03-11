/**
 * Testimonials Component
 *
 * A testimonials section with support for quotes, avatars, ratings, and
 * multiple visual variants. Composes atomic components from @orion/react.
 *
 * @example
 * ```tsx
 * <Testimonials
 *   eyebrow={<Badge>Testimonials</Badge>}
 *   title="What our customers say"
 *   description="See why thousands of teams love our product"
 *   testimonials={[
 *     {
 *       quote: "This product changed everything for us.",
 *       author: {
 *         name: "Jane Doe",
 *         role: "CEO",
 *         company: "Acme Corp",
 *         avatar: <img src="/avatar.jpg" alt="Jane" />
 *       },
 *       rating: 5
 *     }
 *   ]}
 *   columns={3}
 * />
 * ```
 */

import { forwardRef } from "react";
import type { TestimonialsProps } from "./Testimonials.types";
import { Section, Container } from "@orion-ds/react";
import { TestimonialCard } from "./TestimonialCard";
import styles from "./Testimonials.module.css";

export const Testimonials = forwardRef<HTMLElement, TestimonialsProps>(
  (
    {
      eyebrow,
      title,
      description,
      testimonials,
      columns = 3,
      variant = "default",
      background = "base",
      centered = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;

    const classNames = [
      styles.testimonials,
      centered && styles.centered,
      className,
    ]
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

          <div className={`${styles.grid} ${styles[`cols-${columns}`]}`}>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author.name || index}
                testimonial={testimonial}
                variant={variant}
              />
            ))}
          </div>
        </Container>
      </Section>
    );
  },
);

Testimonials.displayName = "Testimonials";
