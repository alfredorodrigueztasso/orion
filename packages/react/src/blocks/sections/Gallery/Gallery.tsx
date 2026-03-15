"use client";

/**
 * Gallery Section Component
 *
 * An image gallery section with optional lightbox functionality.
 */

import React, { useState, useMemo, useCallback, useEffect } from "react";
import type { GalleryProps, GalleryImage } from "./Gallery.types";
import styles from "./Gallery.module.css";

/**
 * Gallery section for displaying images with optional lightbox
 */
export const Gallery: React.FC<GalleryProps> = ({
  eyebrow,
  title,
  description,
  images,
  layout = "grid",
  columns = 4,
  lightbox = true,
  showCaptions = false,
  gap = "md",
  filterable = false,
  background = "base",
  aspectRatio = "square",
  className,
  ...rest
}) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    if (!filterable) return [];
    const cats = new Set<string>();
    images.forEach((img) => {
      if (img.category) cats.add(img.category);
    });
    return Array.from(cats);
  }, [images, filterable]);

  // Filter images
  const filteredImages = useMemo(() => {
    if (!activeFilter) return images;
    return images.filter((img) => img.category === activeFilter);
  }, [images, activeFilter]);

  // Lightbox navigation
  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      const prevImage = filteredImages[currentIndex - 1];
      if (prevImage) setSelectedImage(prevImage);
    }
  }, [currentIndex, filteredImages]);

  const goToNext = useCallback(() => {
    if (currentIndex < filteredImages.length - 1) {
      const nextImage = filteredImages[currentIndex + 1];
      if (nextImage) setSelectedImage(nextImage);
    }
  }, [currentIndex, filteredImages]);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, closeLightbox, goToPrevious, goToNext]);

  const layoutClass = layout === "masonry" ? styles.masonry : styles.grid;

  return (
    <section
      className={`${styles.gallery} ${className || ""}`}
      data-background={background}
      {...rest}
    >
      <div className={styles.container}>
        {(eyebrow || title || description) && (
          <header className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}

        {filterable && categories.length > 0 && (
          <div className={styles.filters}>
            <button
              className={styles.filterButton}
              data-active={activeFilter === null}
              onClick={() => setActiveFilter(null)}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={styles.filterButton}
                data-active={activeFilter === cat}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className={layoutClass} data-columns={columns} data-gap={gap}>
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={styles.imageItem}
              data-lightbox={lightbox}
              data-aspect={image.aspectRatio || aspectRatio}
              onClick={() => lightbox && setSelectedImage(image)}
              role={lightbox ? "button" : undefined}
              tabIndex={lightbox ? 0 : undefined}
              onKeyDown={(e) => {
                if (lightbox && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setSelectedImage(image);
                }
              }}
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt}
                className={styles.image}
                loading="lazy"
              />
              {lightbox && (
                <div className={styles.imageOverlay}>
                  <span className={styles.expandIcon}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </span>
                </div>
              )}
              {showCaptions && image.caption && (
                <div className={styles.caption}>{image.caption}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={styles.lightboxImage}
            />
            {selectedImage.caption && (
              <div className={styles.lightboxCaption}>
                {selectedImage.caption}
              </div>
            )}
          </div>

          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>

          {currentIndex > 0 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous image"
            >
              &#8249;
            </button>
          )}

          {currentIndex < filteredImages.length - 1 && (
            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </section>
  );
};

Gallery.displayName = "Gallery";
