"use client";

import { forwardRef } from "react";
import type { GalleryProps } from "./Gallery.types";
import styles from "./Gallery.module.css";

export const Gallery = forwardRef<HTMLElement, GalleryProps>(
  ({ title, images, columns = 3, className, ...rest }, ref) => {
    const colsClass =
      columns === 2
        ? styles.cols2
        : columns === 4
          ? styles.cols4
          : styles.cols3;

    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={`${styles.grid} ${colsClass}`}>
            {images.map((image) => (
              <div key={image.id} className={styles.item}>
                <img src={image.src} alt={image.alt} className={styles.image} />
                {image.caption && (
                  <p className={styles.caption}>{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
);

Gallery.displayName = "Gallery";
