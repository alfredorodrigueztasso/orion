"use client";

import React, { useState } from "react";
import type { NewsletterProps } from "./Newsletter.types";
import styles from "./Newsletter.module.css";

export const Newsletter = React.forwardRef<HTMLElement, NewsletterProps>(
  (
    {
      title,
      description,
      placeholder = "Enter your email",
      submitLabel = "Subscribe",
      disclaimer,
      size = "md",
      onSubmit,
      className,
    },
    ref
  ) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onSubmit?.(email);
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className={`${styles.section} ${size === "sm" ? styles.sectionSm : ""} ${
        className || ""
      }`}
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}

        {submitted ? (
          <p className={styles.successMessage}>
            Thanks for subscribing!
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              className={styles.input}
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit" className={styles.submitButton}>
              {submitLabel}
            </button>
          </form>
        )}

        {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
      </div>
    </section>
  );
  }
);

Newsletter.displayName = "Newsletter";
