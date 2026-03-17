/**
 * Alert Component Types
 *
 * Type definitions for the Orion Alert component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Alert variants (status types)
 */
export type AlertVariant = "success" | "error" | "warning" | "info" | "inverse";

/**
 * Alert component props
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Success!">
 *   Your changes have been saved.
 * </Alert>
 *
 * <Alert variant="error" onClose={() => {}}>
 *   An error occurred.
 * </Alert>
 * ```
 */
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Alert variant (status type)
   * @default 'info'
   */
  variant?: AlertVariant;

  /**
   * Alert title (optional)
   */
  title?: string;

  /**
   * Show close button
   * @default false
   */
  dismissible?: boolean;

  /**
   * Close button callback
   */
  onClose?: () => void;

  /**
   * Custom icon (overrides default status icon)
   */
  icon?: ReactNode;

  /**
   * Alert content
   */
  children?: ReactNode;
}
