import React from "react";
import type { CarouselCardProps } from "./CarouselSection.types";
import styles from "./CarouselSection.module.css";

export const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  image,
  description,
  className,
}) => {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <img src={image} alt={title} className={styles.cardImage} />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {description && (
          <p className={styles.cardDescription}>{description}</p>
        )}
      </div>
    </div>
  );
};

CarouselCard.displayName = "CarouselCard";
