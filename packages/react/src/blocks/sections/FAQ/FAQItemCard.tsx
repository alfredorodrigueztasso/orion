"use client";

/**
 * FAQItemCard Component
 *
 * Internal component for rendering individual FAQ items.
 * Supports accordion (expandable) and grid (static) variants.
 */

import { useState } from "react";
import type { FAQItemCardProps } from "./FAQ.types";
import { ChevronDown } from "lucide-react";
import styles from "./FAQ.module.css";

export const FAQItemCard = ({
  item,
  variant = "accordion",
  isOpen: controlledIsOpen,
  onToggle,
  className,
}: FAQItemCardProps) => {
  const { question, answer, defaultOpen } = item;
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen || false);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
    if (!isControlled) {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const classNames = [
    styles.faqItem,
    styles[`variant-${variant}`],
    isOpen && styles.open,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "grid") {
    return (
      <div className={classNames}>
        <h3 className={styles.question}>{question}</h3>
        <div className={styles.answer}>{answer}</div>
      </div>
    );
  }

  return (
    <div className={classNames}>
      <button
        type="button"
        className={styles.trigger}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.question}>{question}</span>
        <ChevronDown size={20} className={styles.chevron} />
      </button>
      <div className={styles.content}>
        <div className={styles.answer}>{answer}</div>
      </div>
    </div>
  );
};

FAQItemCard.displayName = "FAQItemCard";
