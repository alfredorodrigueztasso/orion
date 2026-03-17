"use client";

/**
 * Banner Section Component
 *
 * A promotional banner section with multiple style variants.
 */

import React from "react";
import { X } from "lucide-react";
import { Button } from "../../components/Button";
import type { BannerProps } from "./Banner.types";
import styles from "./Banner.module.css";

/**
 * Banner section for promotions and announcements
 */
export const Banner: React.FC<BannerProps> = ({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  variant = "default",
  backgroundImage,
  sideImage,
  imagePosition = "right",
  backgroundColor,
  gradient,
  dismissible = false,
  onDismiss,
  fullWidth = false,
  compact = false,
  centered = true,
  className,
  style,
  ...rest
}) => {
  const customStyle: React.CSSProperties = {
    ...style,
    ...(backgroundImage &&
      variant === "image" && {
        backgroundImage: `url(${backgroundImage})`,
      }),
    ...(backgroundColor && { backgroundColor }),
    ...(gradient &&
      variant === "gradient" && {
        background: gradient,
      }),
  };

  const renderContent = () => (
    <div className={styles.content}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {(ctaLabel || secondaryCtaLabel) && (
        <div className={styles.actions}>
          {ctaLabel && ctaHref && (
            <Button
              variant={variant === "split" ? "primary" : "inverse"}
              onClick={() => (window.location.href = ctaHref)}
            >
              {ctaLabel}
            </Button>
          )}
          {secondaryCtaLabel && secondaryCtaHref && (
            <Button
              variant={variant === "split" ? "secondary" : "ghost"}
              onClick={() => (window.location.href = secondaryCtaHref)}
            >
              {secondaryCtaLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section
      className={`${styles.banner} ${className || ""}`}
      data-variant={variant}
      data-compact={compact}
      data-centered={centered && variant !== "split"}
      data-full-width={fullWidth}
      style={customStyle}
      {...rest}
    >
      <div className={styles.container}>
        {variant === "split" && sideImage ? (
          <div
            className={styles.splitLayout}
            data-image-position={imagePosition}
          >
            <div className={styles.splitContent}>{renderContent()}</div>
            <img
              src={sideImage}
              alt=""
              className={styles.splitImage}
              aria-hidden="true"
            />
          </div>
        ) : (
          renderContent()
        )}
      </div>

      {dismissible && (
        <div className={styles.dismissButton}>
          <Button
            iconOnly
            icon={<X size={20} />}
            variant="ghost"
            onClick={onDismiss}
            aria-label="Dismiss banner"
          />
        </div>
      )}
    </section>
  );
};

Banner.displayName = "Banner";
