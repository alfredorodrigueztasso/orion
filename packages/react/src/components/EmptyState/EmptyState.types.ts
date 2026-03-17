/**
 * EmptyState Component Types
 *
 * Type definitions for the Orion EmptyState component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * EmptyState sizes
 */
export type EmptyStateSize = "sm" | "md" | "lg";

/**
 * EmptyState component props
 *
 * @example
 * ```tsx
 * <EmptyState
 *   icon={<InboxIcon />}
 *   title="No messages"
 *   description="Your inbox is empty"
 *   action={<Button>Compose</Button>}
 * />
 * ```
 */
export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Icon or illustration to display
   */
  icon?: ReactNode;

  /**
   * Main title text
   */
  title: string;

  /**
   * Description text
   */
  description?: string;

  /**
   * Primary action button
   */
  action?: ReactNode;

  /**
   * Secondary action button
   */
  secondaryAction?: ReactNode;

  /**
   * Size variant
   * @default 'md'
   */
  size?: EmptyStateSize;
}
