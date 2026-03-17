/**
 * Toast Component Types
 *
 * Type definitions for the Orion Toast notification system.
 */

import type { ReactNode } from "react";

/**
 * Toast variants
 */
export type ToastVariant = "info" | "success" | "warning" | "error";

/**
 * Toast position on screen
 */
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

/**
 * Individual toast data
 */
export interface Toast {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Toast title (optional)
   */
  title?: string;

  /**
   * Toast message content
   */
  message: ReactNode;

  /**
   * Visual variant of the toast
   * @default 'info'
   */
  variant?: ToastVariant;

  /**
   * Duration in milliseconds before auto-dismiss (0 = no auto-dismiss)
   * @default 5000
   */
  duration?: number;

  /**
   * Whether the toast can be dismissed by the user
   * @default true
   */
  dismissible?: boolean;

  /**
   * Optional action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: () => void;
}

/**
 * Toast creation options (without id)
 */
export type ToastOptions = Omit<Toast, "id">;

/**
 * Toast Provider props
 */
export interface ToastProviderProps {
  /**
   * Children to wrap
   */
  children: ReactNode;

  /**
   * Default position for toasts
   * @default 'bottom-right'
   */
  position?: ToastPosition;

  /**
   * Maximum number of toasts to show at once
   * @default 5
   */
  maxToasts?: number;

  /**
   * Default duration for toasts
   * @default 5000
   */
  defaultDuration?: number;
}

/**
 * Toast context value
 */
export interface ToastContextValue {
  /**
   * Add a new toast
   */
  toast: (options: ToastOptions) => string;

  /**
   * Add an info toast (shorthand)
   */
  info: (message: string, options?: Partial<ToastOptions>) => string;

  /**
   * Add a success toast (shorthand)
   */
  success: (message: string, options?: Partial<ToastOptions>) => string;

  /**
   * Add a warning toast (shorthand)
   */
  warning: (message: string, options?: Partial<ToastOptions>) => string;

  /**
   * Add an error toast (shorthand)
   */
  error: (message: string, options?: Partial<ToastOptions>) => string;

  /**
   * Dismiss a toast by id
   */
  dismiss: (id: string) => void;

  /**
   * Dismiss all toasts
   */
  dismissAll: () => void;
}

/**
 * Single toast item props (internal)
 */
export interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}
