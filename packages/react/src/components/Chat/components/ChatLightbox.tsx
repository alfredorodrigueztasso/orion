"use client";

/**
 * ChatLightbox Component
 *
 * Full-screen image viewer with keyboard navigation and focus trap.
 */

import React, { useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import type { ChatLightboxProps } from "../Chat.types";
import styles from "../Chat.module.css";

export const ChatLightbox: React.FC<ChatLightboxProps> = ({
  src,
  alt = "Image",
  isOpen,
  onClose,
  className,
  ...rest
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap: cycle between close button and image
      if (e.key === "Tab") {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    },
    [onClose],
  );

  // Handle click outside image
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Add/remove keyboard listener, manage focus
  useEffect(() => {
    if (isOpen) {
      // Save previously focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Focus close button on open
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      // Restore focus to previously active element
      if (
        previousFocusRef.current &&
        typeof previousFocusRef.current.focus === "function"
      ) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={[styles.lightbox, className].filter(Boolean).join(" ")}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      {...rest}
    >
      <button
        ref={closeButtonRef}
        className={styles.lightboxClose}
        onClick={onClose}
        aria-label="Close image viewer"
      >
        <X size={24} />
      </button>

      <img src={src} alt={alt} className={styles.lightboxImage} />
    </div>
  );
};

ChatLightbox.displayName = "ChatLightbox";
