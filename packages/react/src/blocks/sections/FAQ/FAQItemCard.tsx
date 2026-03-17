import React from "react";
import type { FAQItemCardProps } from "./FAQ.types";
import styles from "./FAQ.module.css";

export const FAQItemCard: React.FC<FAQItemCardProps> = ({
  id,
  question,
  answer,
  isOpen = false,
  onToggle,
  className,
}) => {
  return (
    <div
      className={`${styles.item} ${isOpen ? styles.itemOpen : ""} ${className || ""}`}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${id}`}
      >
        {question}
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div
        id={`faq-content-${id}`}
        role="region"
        className={`${styles.content} ${isOpen ? styles.contentOpen : ""}`}
      >
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
};

FAQItemCard.displayName = "FAQItemCard";
