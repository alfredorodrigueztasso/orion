/**
 * Dropdown Component Types
 *
 * Type definitions for the Orion Dropdown/Menu component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Dropdown placement options
 */
export type DropdownPlacement =
  | "bottom-start"
  | "bottom"
  | "bottom-end"
  | "top-start"
  | "top"
  | "top-end";

/**
 * Dropdown menu item
 */
export interface DropdownItem {
  /**
   * Unique identifier for the item
   */
  id: string;

  /**
   * Label to display
   */
  label: string;

  /**
   * Optional icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Whether this is a destructive action (red text)
   */
  danger?: boolean;

  /**
   * Optional keyboard shortcut to display
   */
  shortcut?: string;

  /**
   * Click handler for the item
   */
  onClick?: () => void;
}

/**
 * Dropdown item group (for organizing items)
 */
export interface DropdownGroup {
  /**
   * Optional label for the group
   */
  label?: string;

  /**
   * Items in this group
   */
  items: DropdownItem[];
}

/**
 * Dropdown component props
 *
 * @example
 * ```tsx
 * <Dropdown
 *   trigger={<Button>Options</Button>}
 *   items={[
 *     { id: 'edit', label: 'Edit', icon: <EditIcon /> },
 *     { id: 'delete', label: 'Delete', danger: true },
 *   ]}
 * />
 * ```
 */
export interface DropdownProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "onSelect"
> {
  /**
   * The trigger element that opens the dropdown
   */
  trigger: ReactNode;

  /**
   * Menu items (flat list or grouped)
   */
  items?: DropdownItem[];

  /**
   * Grouped menu items
   */
  groups?: DropdownGroup[];

  /**
   * Placement of the dropdown
   * @default 'bottom-start'
   */
  placement?: DropdownPlacement;

  /**
   * Whether the dropdown is open (controlled)
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Callback when an item is selected
   */
  onSelect?: (item: DropdownItem) => void;

  /**
   * Minimum width of the dropdown menu
   * @default 180
   */
  minWidth?: number;

  /**
   * Whether to close when an item is selected
   * @default true
   */
  closeOnSelect?: boolean;
}

/**
 * Dropdown Item component props (internal)
 */
export interface DropdownMenuItemProps {
  item: DropdownItem;
  onSelect: () => void;
}
