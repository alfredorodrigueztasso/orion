"use client";

/**
 * ChatImagePreview Component
 *
 * Displays image attachments with thumbnail and lightbox support.
 */

import React, { useState } from "react";
import { ImageOff } from "lucide-react";
import type { ChatImagePreviewProps } from "../Chat.types";
import styles from "../Chat.module.css";
import { ChatLightbox } from "./ChatLightbox";

export const ChatImagePreview: React.FC<ChatImagePreviewProps> = ({
  src,
  alt = "Image attachment",
  thumbnail,
  onClick,
  enableLightbox = true,
  className,
  ...rest
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (enableLightbox) {
      setIsLightboxOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div
        className={[styles.imagePreview, styles.attachmentPreview, className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <div className={styles.attachmentPreviewIcon}>
          <ImageOff size={20} />
        </div>
        <span className={styles.attachmentPreviewName}>
          Image failed to load
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        className={[styles.imagePreview, className].filter(Boolean).join(" ")}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={alt}
        {...rest}
      >
        <img
          src={thumbnail || src}
          alt={alt}
          className={styles.imagePreviewImg}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {enableLightbox && (
        <ChatLightbox
          src={src}
          alt={alt}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
};

ChatImagePreview.displayName = "ChatImagePreview";
