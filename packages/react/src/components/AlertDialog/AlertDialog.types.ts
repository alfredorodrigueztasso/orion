/**
 * AlertDialog Component Types
 *
 * Type definitions for the Orion AlertDialog component.
 * Unlike Modal, AlertDialog forces a user response (no close on backdrop/escape by default).
 */

import type { ReactNode } from "react";

/**
 * AlertDialog variant — controls accent color of icon
 */
export type AlertDialogVariant = "info" | "warning" | "danger";

/**
 * AlertDialog component props
 *
 * @example
 * ```tsx
 * <AlertDialog open={open} onClose={handleClose}>
 *   <AlertDialog.Icon variant="danger" />
 *   <AlertDialog.Title>Delete account?</AlertDialog.Title>
 *   <AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
 *   <AlertDialog.Actions>
 *     <Button variant="ghost" onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Delete</Button>
 *   </AlertDialog.Actions>
 * </AlertDialog>
 * ```
 */
export interface AlertDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;

  /**
   * Callback when dialog should close
   */
  onClose: () => void;

  /**
   * Close on backdrop click
   * @default false
   */
  closeOnBackdrop?: boolean;

  /**
   * Close on Escape key
   * @default false
   */
  closeOnEscape?: boolean;

  /**
   * Dialog content (use compound components)
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * AlertDialog.Icon props
 */
export interface AlertDialogIconProps {
  /**
   * Visual variant — controls icon and color
   * @default 'info'
   */
  variant?: AlertDialogVariant;

  /**
   * Custom icon (overrides default)
   */
  icon?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * AlertDialog.Title props
 */
export interface AlertDialogTitleProps {
  children?: ReactNode;
  className?: string;
}

/**
 * AlertDialog.Description props
 */
export interface AlertDialogDescriptionProps {
  children?: ReactNode;
  className?: string;
}

/**
 * AlertDialog.Actions props
 */
export interface AlertDialogActionsProps {
  children?: ReactNode;
  className?: string;
}
