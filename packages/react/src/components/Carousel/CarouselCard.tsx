/**
 * CarouselCard Component
 *
 * Internal component for rendering individual carousel cards.
 * Supports editorial (Apple-style), product, and gallery variants.
 */

import type { CarouselCardProps } from "./Carousel.types";
import styles from "./Carousel.module.css";

export const CarouselCard = ({
  item,
  aspectRatio = "16/9",
  variant = "editorial",
  className,
  style,
  ...rest
}: CarouselCardProps) => {
  const {
    image,
    eyebrow,
    title,
    description,
    action,
    overlay = "gradient",
  } = item;

  const classNames = [
    styles.card,
    styles[`variant-${variant}`],
    styles[`aspect-${aspectRatio.replace("/", "-")}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classNames} style={style} {...rest}>
      <div className={styles.imageWrapper}>{image}</div>

      {overlay !== "none" && (
        <div className={`${styles.overlay} ${styles[`overlay-${overlay}`]}`} />
      )}

      <div className={styles.content}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}

        <h3 className={styles.cardTitle}>{title}</h3>

        {description && <p className={styles.cardDescription}>{description}</p>}

        {action && <div className={styles.action}>{action}</div>}
      </div>
    </article>
  );
};

CarouselCard.displayName = "CarouselCard";
