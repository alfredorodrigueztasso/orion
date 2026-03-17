/**
 * DetailPanel Component Types
 *
 * Type definitions for the Orion DetailPanel section component.
 * A slide-over panel for viewing and editing entity details.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * DetailPanel size
 */
export type DetailPanelSize = "sm" | "md" | "lg" | "xl";

/**
 * DetailPanel position
 */
export type DetailPanelPosition = "right" | "left";

/**
 * DetailPanel section props
 *
 * @example
 * ```tsx
 * <DetailPanel
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="User Details"
 *   description="Edit user profile information"
 *   footer={<Button>Save</Button>}
 * >
 *   <UserForm />
 * </DetailPanel>
 * ```
 */
export interface DetailPanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /**
   * Whether the panel is open
   */
  open: boolean;

  /**
   * Close callback
   */
  onClose: () => void;

  /**
   * Panel title
   */
  title: ReactNode;

  /**
   * Optional description text below title
   */
  description?: ReactNode;

  /**
   * @deprecated Use `description` instead. Will be removed in v3.0.
   */
  subtitle?: ReactNode;

  /**
   * Panel content
   */
  children: ReactNode;

  /**
   * Panel size
   * - sm: 320px
   * - md: 480px
   * - lg: 640px
   * - xl: 800px
   * @default 'md'
   */
  size?: DetailPanelSize;

  /**
   * Panel position
   * @default 'right'
   */
  position?: DetailPanelPosition;

  /**
   * Header actions (buttons in header area)
   */
  headerActions?: ReactNode;

  /**
   * Footer content
   */
  footer?: ReactNode;

  /**
   * Show overlay backdrop
   * @default true
   */
  overlay?: boolean;

  /**
   * Close on overlay click
   * @default true
   */
  closeOnOverlayClick?: boolean;

  /**
   * Close on Escape key
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;
}
