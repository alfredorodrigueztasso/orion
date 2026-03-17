/**
 * Sidebar Component Types
 *
 * Type definitions for the Orion Sidebar section component.
 * Designed for Product Mode (SaaS dashboards) navigation.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Sidebar navigation item
 */
export interface SidebarItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Navigation URL
   */
  href?: string;

  /**
   * Click handler (alternative to href)
   */
  onClick?: () => void;

  /**
   * Icon element (Lucide icon recommended)
   */
  icon?: ReactNode;

  /**
   * Badge content (count, status, etc.)
   */
  badge?: ReactNode;

  /**
   * Nested items for sub-navigation
   */
  children?: SidebarItem[];

  /**
   * Disabled state
   */
  disabled?: boolean;
}

/**
 * Sidebar section grouping
 */
export interface SidebarSection {
  /**
   * Section title (optional)
   */
  title?: string;

  /**
   * Items in this section
   */
  items: SidebarItem[];
}

/**
 * Sidebar visual variant
 */
export type SidebarVariant = "default" | "floating";

/**
 * Sidebar section props
 *
 * @example
 * ```tsx
 * <Sidebar
 *   sections={[
 *     {
 *       items: [
 *         { id: 'dashboard', label: 'Dashboard', icon: <Home />, href: '/' },
 *         { id: 'projects', label: 'Projects', icon: <Folder />, href: '/projects' }
 *       ]
 *     }
 *   ]}
 *   activeItem="dashboard"
 * />
 * ```
 */
export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /**
   * Array of navigation sections
   */
  sections: SidebarSection[];

  /**
   * Currently active item ID
   */
  activeItem?: string;

  /**
   * Collapsed state (icon-only)
   * @default false
   */
  collapsed?: boolean;

  /**
   * Callback when collapse state changes
   */
  onCollapsedChange?: (collapsed: boolean) => void;

  /**
   * Header content (logo, app name)
   */
  header?: ReactNode;

  /**
   * Footer content (user menu, settings)
   */
  footer?: ReactNode;

  /**
   * Visual variant
   * - default: Standard sidebar
   * - floating: Floating overlay style
   * @default 'default'
   */
  variant?: SidebarVariant;

  /**
   * Width in pixels (when not collapsed)
   * @default 240
   */
  width?: number;

  /**
   * Collapsed width in pixels
   * @default 64
   */
  collapsedWidth?: number;
}

/**
 * Sidebar.Item sub-component props
 */
export interface SidebarItemProps extends HTMLAttributes<HTMLElement> {
  /**
   * Item data
   */
  item: SidebarItem;

  /**
   * Whether this item is active
   */
  active?: boolean;

  /**
   * Collapsed mode
   */
  collapsed?: boolean;

  /**
   * Nesting depth for indentation
   */
  depth?: number;
}

/**
 * Sidebar.Section sub-component props
 */
export interface SidebarSectionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Section data
   */
  section: SidebarSection;

  /**
   * Currently active item ID
   */
  activeItem?: string;

  /**
   * Collapsed mode
   */
  collapsed?: boolean;
}

/**
 * Sidebar.Divider sub-component props
 */
export interface SidebarDividerProps extends HTMLAttributes<HTMLHRElement> {}
