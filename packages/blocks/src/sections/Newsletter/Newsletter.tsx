/**
 * Newsletter Component
 *
 * A newsletter signup section with email input and customizable messaging.
 * Supports multiple layouts and states (loading, success, error).
 *
 * @example
 * ```tsx
 * <Newsletter
 *   eyebrow={<Badge>Newsletter</Badge>}
 *   title="Stay in the loop"
 *   description="Get the latest updates, tips, and resources delivered to your inbox."
 *   placeholder="you@example.com"
 *   buttonText="Subscribe"
 *   disclaimer="We respect your privacy. Unsubscribe at any time."
 *   onSubmit={(email) => handleSubscribe(email)}
 * />
 * ```
 */

import { forwardRef, useCallback, useState } from "react";
import type { NewsletterProps } from "./Newsletter.types";
import { Section, Container } from "@orion-ds/react";
import { Button, Field, Card } from "@orion-ds/react";
import { CheckCircle, AlertCircle } from "lucide-react";
import styles from "./Newsletter.module.css";

export const Newsletter = forwardRef<HTMLElement, NewsletterProps>(
  (
    {
      eyebrow,
      title,
      description,
      placeholder = "Enter your email",
      buttonText = "Subscribe",
      submitButton,
      onSubmit,
      disclaimer,
      layout = "inline",
      size = "md",
      background = "subtle",
      centered = true,
      successMessage,
      errorMessage,
      loading = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit && email) {
          onSubmit(email);
          setSubmitted(true);
          setError(false);
        }
      },
      [email, onSubmit],
    );

    const classNames = [
      styles.newsletter,
      styles[`layout-${layout}`],
      styles[`size-${size}`],
      centered && styles.centered,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderForm = () => {
      if (submitted && successMessage) {
        return (
          <div className={styles.successState}>
            <CheckCircle size={24} className={styles.successIcon} />
            <span>{successMessage}</span>
          </div>
        );
      }

      if (error && errorMessage) {
        return (
          <div className={styles.errorState}>
            <AlertCircle size={24} className={styles.errorIcon} />
            <span>{errorMessage}</span>
            <Button variant="ghost" size="sm" onClick={() => setError(false)}>
              Try again
            </Button>
          </div>
        );
      }

      return (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <Field
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.emailInput}
              aria-label="Email address"
            />
            {submitButton || (
              <Button
                type="submit"
                disabled={loading || !email}
                className={styles.submitButton}
              >
                {loading ? "Sending..." : buttonText}
              </Button>
            )}
          </div>

          {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
        </form>
      );
    };

    const content = (
      <>
        {hasHeader && (
          <header className={styles.header}>
            {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}

        {renderForm()}
      </>
    );

    return (
      <Section
        ref={ref}
        spacing={size === "lg" ? "lg" : "md"}
        background={background}
        className={classNames}
        {...rest}
      >
        <Container size="md">
          {layout === "card" ? (
            <Card variant="elevated" className={styles.card}>
              <Card.Body className={styles.cardBody}>{content}</Card.Body>
            </Card>
          ) : (
            content
          )}
        </Container>
      </Section>
    );
  },
);

Newsletter.displayName = "Newsletter";
