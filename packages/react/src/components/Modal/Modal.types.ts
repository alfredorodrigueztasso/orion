/**
 * Modal Component Types
 *
 * Type definitions for the Orion Modal component (dialog/overlay).
 */

import type { ReactNode } from "react";

/**
 * Modal sizes
 */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Modal component props
 *
 * @example
 * ```tsx
 * <Modal open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Modal.Header>Title</Modal.Header>
 *   <Modal.Body>Content</Modal.Body>
 *   <Modal.Footer>
 *     <Button onClick={handleSave}>Save</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
export interface ModalProps {
  /**
   * Whether the modal is open
   */
  open: boolean;

  /**
   * Callback when modal should close
   */
  onClose: () => void;

  /**
   * Modal size
   * @default 'md'
   */
  size?: ModalSize;

  /**
   * Close on backdrop click
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Close on Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Show close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Modal content
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Modal Header props
 */
export interface ModalHeaderProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Modal Body props
 */
export interface ModalBodyProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Modal Footer props
 */
export interface ModalFooterProps {
  children?: ReactNode;
  className?: string;
}
