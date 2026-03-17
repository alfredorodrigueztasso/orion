/**
 * Drawer Component Types
 *
 * Type definitions for the Orion Drawer component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Drawer placement options
 */
export type DrawerPlacement = "left" | "right" | "top" | "bottom";

/**
 * Drawer sizes
 */
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Drawer component props
 *
 * @example
 * ```tsx
 * <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
 *   <Drawer.Header>Settings</Drawer.Header>
 *   <Drawer.Body>Content here</Drawer.Body>
 * </Drawer>
 * ```
 */
export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the drawer is open
   */
  open: boolean;

  /**
   * Callback when the drawer should close
   */
  onClose: () => void;

  /**
   * Placement of the drawer
   * @default 'right'
   */
  placement?: DrawerPlacement;

  /**
   * Size of the drawer
   * @default 'md'
   */
  size?: DrawerSize;

  /**
   * Whether to close when clicking the backdrop
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Whether to close when pressing Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to show a close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Drawer content
   */
  children?: ReactNode;
}

/**
 * Drawer Header props
 */
export interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Drawer Body props
 */
export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * Drawer Footer props
 */
export interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
