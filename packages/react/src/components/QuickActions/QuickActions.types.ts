/**
 * QuickActions Component Types
 *
 * Type definitions for the Orion QuickActions section component.
 * A FAB or floating action bar for quick access to common actions.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Quick action item
 */
export interface QuickAction {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Action label
   */
  label: string;

  /**
   * Action icon
   */
  icon: ReactNode;

  /**
   * Click handler
   */
  onClick: () => void;

  /**
   * Keyboard shortcut display
   */
  shortcut?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Variant for styling
   */
  variant?: "default" | "primary" | "danger";
}

/**
 * QuickActions position
 */
export type QuickActionsPosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center"
  | "top-right"
  | "top-left";

/**
 * QuickActions variant
 */
export type QuickActionsVariant = "fab" | "bar" | "menu";

/**
 * QuickActions section props
 *
 * @example
 * ```tsx
 * // FAB variant (single expandable button)
 * <QuickActions
 *   variant="fab"
 *   actions={[
 *     { id: 'new', label: 'New Item', icon: <Plus />, onClick: () => {} },
 *     { id: 'upload', label: 'Upload', icon: <Upload />, onClick: () => {} }
 *   ]}
 * />
 *
 * // Bar variant (horizontal action bar)
 * <QuickActions
 *   variant="bar"
 *   actions={[...]}
 * />
 * ```
 */
export interface QuickActionsProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of quick actions
   */
  actions: QuickAction[];

  /**
   * Display variant
   * - fab: Floating action button that expands
   * - bar: Horizontal action bar
   * - menu: Vertical menu style
   * @default 'fab'
   */
  variant?: QuickActionsVariant;

  /**
   * Position on screen
   * @default 'bottom-right'
   */
  position?: QuickActionsPosition;

  /**
   * Primary action (shown when FAB is collapsed)
   */
  primaryAction?: QuickAction;

  /**
   * Custom trigger icon for FAB
   */
  triggerIcon?: ReactNode;

  /**
   * Always show labels (bar variant)
   * @default true for bar, false for fab
   */
  showLabels?: boolean;

  /**
   * Fixed position
   * @default true
   */
  fixed?: boolean;

  /**
   * Offset from edge in pixels
   * @default 24
   */
  offset?: number;
}
