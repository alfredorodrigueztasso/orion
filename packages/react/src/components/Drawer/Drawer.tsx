"use client";

/**
 * Drawer Component
 *
 * A panel that slides in from the edge of the screen.
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="right">
 *   <Drawer.Header>Settings</Drawer.Header>
 *   <Drawer.Body>Content here</Drawer.Body>
 *   <Drawer.Footer>
 *     <Button onClick={() => setIsOpen(false)}>Close</Button>
 *   </Drawer.Footer>
 * </Drawer>
 * ```
 */

import { forwardRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type {
  DrawerProps,
  DrawerHeaderProps,
  DrawerBodyProps,
  DrawerFooterProps,
} from "./Drawer.types";
import styles from "./Drawer.module.css";

/**
 * Drawer Header
 */
const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.header} ${className || ""}`}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

DrawerHeader.displayName = "Drawer.Header";

/**
 * Drawer Body
 */
const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.body} ${className || ""}`} {...rest}>
        {children}
      </div>
    );
  },
);

DrawerBody.displayName = "Drawer.Body";

/**
 * Drawer Footer
 */
const DrawerFooter = forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.footer} ${className || ""}`}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

DrawerFooter.displayName = "Drawer.Footer";

/**
 * Drawer Component
 */
const DrawerRoot = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      placement = "right",
      size = "md",
      closeOnBackdrop = true,
      closeOnEscape = true,
      showCloseButton = true,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    // Handle escape key
    const handleEscape = useCallback(
      (event: KeyboardEvent) => {
        if (closeOnEscape && event.key === "Escape") {
          onClose();
        }
      },
      [closeOnEscape, onClose],
    );

    // Handle backdrop click
    const handleBackdropClick = useCallback(() => {
      if (closeOnBackdrop) {
        onClose();
      }
    }, [closeOnBackdrop, onClose]);

    // Lock body scroll when open
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleEscape);

        return () => {
          document.body.style.overflow = originalOverflow;
          document.removeEventListener("keydown", handleEscape);
        };
      }
    }, [open, handleEscape]);

    if (!open) {
      return null;
    }

    const overlayClasses = [styles.overlay, open && styles.overlayVisible]
      .filter(Boolean)
      .join(" ");

    const drawerClasses = [
      styles.drawer,
      styles[placement],
      styles[`size-${size}`],
      open && styles.drawerVisible,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const content = (
      <div className={overlayClasses}>
        {/* Backdrop */}
        <div
          className={styles.backdrop}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          ref={ref}
          className={drawerClasses}
          role="dialog"
          aria-modal="true"
          {...rest}
        >
          {showCloseButton && (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close drawer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    );

    // Render in portal
    return createPortal(content, document.body);
  },
);

DrawerRoot.displayName = "Drawer";

// Compose the component with subcomponents
export const Drawer = Object.assign(DrawerRoot, {
  Header: DrawerHeader,
  Body: DrawerBody,
  Footer: DrawerFooter,
});
