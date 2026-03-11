/**
 * TestimonialCard Component
 *
 * Internal component for rendering individual testimonial cards.
 */

import type { TestimonialCardProps } from "./Testimonials.types";
import { Card } from "@orion-ds/react";
import { Star } from "lucide-react";
import styles from "./Testimonials.module.css";

export const TestimonialCard = ({
  testimonial,
  variant = "default",
  className,
}: TestimonialCardProps) => {
  const { quote, author, rating } = testimonial;
  const { name, role, company, avatar } = author;

  const classNames = [
    styles.testimonialCard,
    styles[`variant-${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {rating && rating > 0 && (
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? styles.starFilled : styles.starEmpty}
              fill={i < rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      )}

      <blockquote className={styles.quote}>
        <p>"{quote}"</p>
      </blockquote>

      <div className={styles.author}>
        {avatar && <div className={styles.avatar}>{avatar}</div>}
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{name}</span>
          {(role || company) && (
            <span className={styles.authorRole}>
              {role}
              {role && company && ", "}
              {company}
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (variant === "minimal") {
    return <div className={classNames}>{content}</div>;
  }

  return (
    <Card
      variant={variant === "cards" ? "elevated" : "base"}
      className={classNames}
    >
      <Card.Body>{content}</Card.Body>
    </Card>
  );
};

TestimonialCard.displayName = "TestimonialCard";
