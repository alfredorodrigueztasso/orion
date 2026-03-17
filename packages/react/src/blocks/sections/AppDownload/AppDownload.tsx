"use client";

import { forwardRef } from "react";
import type { AppDownloadProps } from "./AppDownload.types";
import styles from "./AppDownload.module.css";

export const AppDownload = forwardRef<HTMLElement, AppDownloadProps>(
  (
    {
      title,
      description,
      badges,
      appImage,
      features,
      layout = "centered",
      showQrCode = false,
      qrCode,
      rating,
      compact = false,
      className,
      ...rest
    },
    ref,
  ) => {
    if (compact) {
      return (
        <section
          ref={ref}
          className={`${styles.section} ${styles.compact} ${className || ""}`}
          {...rest}
        >
          <div className={styles.container}>
            <div>
              <h2 className={styles.title}>{title}</h2>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
            <div className={styles.badges}>
              {badges.map((badge) => (
                <a
                  key={badge.store}
                  href={badge.href}
                  className={styles.badge}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.badgeIcon}>
                    {badge.store === "apple" ? "\uF8FF" : "\u25B6"}
                  </span>
                  {badge.store === "apple" ? "App Store" : "Google Play"}
                </a>
              ))}
            </div>
          </div>
        </section>
      );
    }

    const layoutClass =
      layout === "split-left"
        ? styles.splitLeft
        : layout === "split-right"
          ? styles.splitRight
          : styles.centered;

    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={`${styles.container} ${layoutClass}`}>
          <div className={styles.content}>
            <div>
              <h2 className={styles.title}>{title}</h2>
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>

            {rating && (
              <div className={styles.rating}>
                <span className={styles.ratingValue}>{rating.value}</span>
                <span>{rating.count}</span>
              </div>
            )}

            {showQrCode && qrCode && (
              <img
                src={qrCode}
                alt="Download QR Code"
                className={styles.qrCode}
              />
            )}

            <div className={styles.badges}>
              {badges.map((badge) => (
                <a
                  key={badge.store}
                  href={badge.href}
                  className={styles.badge}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.badgeIcon}>
                    {badge.store === "apple" ? "\uF8FF" : "\u25B6"}
                  </span>
                  {badge.store === "apple" ? "App Store" : "Google Play"}
                </a>
              ))}
            </div>

            {features && features.length > 0 && (
              <div className={styles.features}>
                {features.map((feature) => (
                  <div key={feature.title} className={styles.featureItem}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDescription}>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {appImage && (
            <div className={styles.imageWrapper}>
              <img
                src={appImage}
                alt={`${title} app preview`}
                className={styles.appImage}
              />
            </div>
          )}
        </div>
      </section>
    );
  },
);

AppDownload.displayName = "AppDownload";
