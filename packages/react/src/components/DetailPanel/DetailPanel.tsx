"use client";

/**
 * DetailPanel Component
 *
 * A slide-over panel for viewing and editing entity details.
 * Optimized for Product Mode with focused interactions.
 *
 * @example
 * ```tsx
 * <DetailPanel
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="User Details"
 *   description="Edit user profile information"
 *   footer={<Button>Save Changes</Button>}
 * >
 *   <UserForm />
 * </DetailPanel>
 * ```
 */

import { forwardRef, useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { DetailPanelProps } from "./DetailPanel.types";
import styles from "./DetailPanel.module.css";

export const DetailPanel = forwardRef<HTMLDivElement, DetailPanelProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      subtitle,
      children,
      size = "md",
      position = "right",
      headerActions,
      footer,
      overlay = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      loading = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const panelRef = useRef<HTMLDivElement>(null);

    // Support deprecated subtitle prop with warning
    const effectiveDescription = description ?? subtitle;

    // Deprecation warning
    useEffect(() => {
      if (subtitle && process.env.NODE_ENV === "development") {
        console.warn(
          '[DetailPanel] The "subtitle" prop is deprecated. Use "description" instead. ' +
            "subtitle will be removed in v3.0.",
        );
      }
    }, [subtitle]);

    // Handle Escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, closeOnEscape, onClose]);

    // Trap focus and prevent body scroll
    useEffect(() => {
      if (open) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Focus the panel
        setTimeout(() => {
          panelRef.current?.focus();
        }, 0);

        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }, [open]);

    if (!open) return null;

    const handleOverlayClick = () => {
      if (closeOnOverlayClick) {
        onClose();
      }
    };

    const classNames = [
      styles.panel,
      styles[`size-${size}`],
      styles[`position-${position}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.container}>
        {/* Overlay */}
        {overlay && (
          <div
            className={styles.overlay}
            onClick={handleOverlayClick}
            aria-hidden="true"
          />
        )}

        {/* Panel */}
        <div
          ref={ref || panelRef}
          className={classNames}
          role="dialog"
          aria-modal="true"
          aria-labelledby="detail-panel-title"
          tabIndex={-1}
          {...rest}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h2 id="detail-panel-title" className={styles.title}>
                {title}
              </h2>
              {effectiveDescription && (
                <p className={styles.subtitle}>{effectiveDescription}</p>
              )}
            </div>
            <div className={styles.headerActions}>
              {headerActions}
              <button
                type="button"
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close panel"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className={styles.body}>
            {loading ? (
              <div className={styles.loading}>
                <div className={styles.spinner} />
              </div>
            ) : (
              children
            )}
          </div>

          {/* Footer */}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  },
);

DetailPanel.displayName = "DetailPanel";
