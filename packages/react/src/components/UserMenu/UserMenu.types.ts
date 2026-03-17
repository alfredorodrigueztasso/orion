/**
 * UserMenu Component Types
 *
 * Type definitions for the Orion UserMenu section component.
 * A dropdown profile menu for SaaS applications.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * User menu item
 */
export interface UserMenuItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Item label
   */
  label: string;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Link URL
   */
  href?: string;

  /**
   * Click handler
   */
  onClick?: () => void;

  /**
   * Danger styling (for logout, delete account, etc.)
   */
  danger?: boolean;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Keyboard shortcut hint (e.g., "⌘K", "Ctrl+S")
   */
  shortcut?: string;

  /**
   * Notification badge count
   */
  badge?: number;
}

/**
 * User menu section (group of items)
 */
export interface UserMenuSection {
  /**
   * Section ID
   */
  id: string;

  /**
   * Optional section label
   */
  label?: string;

  /**
   * Items in this section
   */
  items: UserMenuItem[];
}

/**
 * User info displayed in menu header
 */
export interface UserInfo {
  /**
   * User's display name
   */
  name: string;

  /**
   * User's email
   */
  email?: string;

  /**
   * Avatar URL
   */
  avatar?: string;

  /**
   * Initials fallback (if no avatar)
   */
  initials?: string;

  /**
   * Status indicator
   */
  status?: "online" | "away" | "busy" | "offline";

  /**
   * Role or subscription tier
   */
  role?: string;
}

/**
 * UserMenu section props
 *
 * @example
 * ```tsx
 * <UserMenu
 *   user={{ name: 'John Doe', email: 'john@example.com', avatar: '/avatar.jpg' }}
 *   sections={[
 *     { id: 'account', items: [{ id: 'profile', label: 'Profile', icon: <User /> }] },
 *     { id: 'actions', items: [{ id: 'logout', label: 'Sign out', danger: true }] }
 *   ]}
 * />
 * ```
 */
export interface UserMenuProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /**
   * User information
   */
  user: UserInfo;

  /**
   * Menu sections
   */
  sections: UserMenuSection[];

  /**
   * Open state (controlled)
   */
  open?: boolean;

  /**
   * Open state change handler
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Trigger element (custom trigger button)
   */
  trigger?: ReactNode;

  /**
   * Menu alignment
   * @default "end"
   */
  align?: "start" | "end";

  /**
   * Dropdown placement direction
   * @default "bottom"
   */
  placement?: "top" | "bottom";

  /**
   * Show user info header in dropdown
   * @default true
   */
  showHeader?: boolean;

  /**
   * Compact mode (smaller trigger)
   * @default false
   */
  compact?: boolean;

  /**
   * Whether the menu wrapper should stretch to fill its container
   * Set to true when UserMenu is inside a constrained container (e.g., sidebar footer)
   * Changes wrapper from display: inline-block to display: block with width: 100%
   * @default false
   */
  fullWidth?: boolean;
}
