/**
 * Tabs Component Types
 *
 * Type definitions for the Orion Tabs component.
 */

import type { ReactNode } from "react";

/**
 * Tab item
 */
export interface TabItem {
  /**
   * Unique tab identifier
   */
  id: string;

  /**
   * Tab label
   */
  label: string;

  /**
   * Tab content
   */
  content: ReactNode;

  /**
   * Optional icon
   */
  icon?: ReactNode;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Badge/count indicator
   */
  badge?: string | number;
}

/**
 * Tabs component props
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     { id: 'tab1', label: 'Profile', content: <Profile /> },
 *     { id: 'tab2', label: 'Settings', content: <Settings /> }
 *   ]}
 * />
 * ```
 */
export interface TabsProps {
  /**
   * Array of tabs
   */
  tabs: TabItem[];

  /**
   * Default active tab ID
   */
  defaultTab?: string;

  /**
   * Controlled active tab ID
   */
  activeTab?: string;

  /**
   * Callback when tab changes
   */
  onChange?: (tabId: string) => void;

  /**
   * Full width tabs
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional class name
   */
  className?: string;

  /**
   * Remove top and bottom padding from the tab panel.
   * Useful when Tabs is inside a Card, Modal, or other padded container.
   * @default false
   */
  noPanelPadding?: boolean;
}
