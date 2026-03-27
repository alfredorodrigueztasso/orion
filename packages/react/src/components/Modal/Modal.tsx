"use client";

/**
 * Modal Component
 *
 * Dialog/overlay component with backdrop and animation.
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Modal.Header>Confirm Action</Modal.Header>
 *   <Modal.Body>
 *     Are you sure you want to proceed?
 *   </Modal.Body>
 *   <Modal.Footer>
 *     <Button variant="secondary" onClick={() => setIsOpen(false)}>
 *       Cancel
 *     </Button>
 *     <Button variant="primary" onClick={handleConfirm}>
 *       Confirm
 *     </Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */

import React, { useEffect } from "react";
import type {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from "./Modal.types";
import styles from "./Modal.module.css";

// Main Modal component
export const Modal: React.FC<ModalProps> & {
  Header: React.FC<ModalHeaderProps>;
  Body: React.FC<ModalBodyProps>;
  Footer: React.FC<ModalFooterProps>;
} = ({
  open,
  onClose,
  size = "md",
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  className,
  "aria-label": ariaLabel,
}) => {
  // Handle Escape key
  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const modalClasses = [styles.modal, styles[size], className]
    .filter(Boolean)
    .join(" ");

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div className={modalClasses}>
        {/* Close button in corner */}
        {showCloseButton && (
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "var(--spacing-4)",
              right: "var(--spacing-4)",
            }}
          >
            ×
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

// Modal Header subcomponent
const ModalHeader: React.FC<ModalHeaderProps> = ({ className, children }) => {
  const classNames = [styles.header, className].filter(Boolean).join(" ");

  return <div className={classNames}>{children}</div>;
};

// Modal Body subcomponent
const ModalBody: React.FC<ModalBodyProps> = ({ className, children }) => {
  const classNames = [styles.body, className].filter(Boolean).join(" ");

  return <div className={classNames}>{children}</div>;
};

// Modal Footer subcomponent
const ModalFooter: React.FC<ModalFooterProps> = ({ className, children }) => {
  const classNames = [styles.footer, className].filter(Boolean).join(" ");

  return <div className={classNames}>{children}</div>;
};

// Attach subcomponents
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// Display names for debugging
Modal.displayName = "Modal";
ModalHeader.displayName = "Modal.Header";
ModalBody.displayName = "Modal.Body";
ModalFooter.displayName = "Modal.Footer";
