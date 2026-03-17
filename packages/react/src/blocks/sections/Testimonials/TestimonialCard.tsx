import React from "react";
import type { TestimonialCardProps } from "./Testimonials.types";
import styles from "./Testimonials.module.css";

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={filled ? styles.starFilled : styles.starEmpty}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  rating,
  variant = "default",
  className,
}) => {
  return (
    <div
      className={`${styles.card} ${variant === "minimal" ? styles.cardMinimal : ""} ${className || ""}`}
    >
      {rating != null && rating > 0 && (
        <div className={styles.stars}>
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < rating} />
          ))}
        </div>
      )}
      <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>
      <div className={styles.author}>
        {author.avatar && (
          <div className={styles.authorAvatar}>{author.avatar}</div>
        )}
        <div className={styles.authorInfo}>
          <p className={styles.authorName}>{author.name}</p>
          {(author.role || author.company) && (
            <p className={styles.authorRole}>
              {[author.role, author.company].filter(Boolean).join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

TestimonialCard.displayName = "TestimonialCard";
