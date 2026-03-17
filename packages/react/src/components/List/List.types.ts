/**
 * List Component Types
 *
 * Type definitions for the Orion List component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * List size variants
 */
export type ListSize = "sm" | "md" | "lg";

/**
 * List variant
 */
export type ListVariant = "default" | "bordered" | "divided";

/**
 * List item
 */
export interface ListItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Primary content (text or element)
   */
  primary: ReactNode;

  /**
   * Secondary content (smaller text below primary)
   */
  secondary?: ReactNode;

  /**
   * Icon or avatar on the left
   */
  leading?: ReactNode;

  /**
   * Content on the right (icon, badge, etc.)
   */
  trailing?: ReactNode;

  /**
   * Whether this item is disabled
   */
  disabled?: boolean;

  /**
   * Whether this item is selected (for selectable lists)
   */
  selected?: boolean;

  /**
   * Click handler for the item
   */
  onClick?: () => void;

  /**
   * Additional class name for the item
   */
  className?: string;
}

/**
 * List component props
 *
 * @example
 * ```tsx
 * <List
 *   items={[
 *     { id: '1', primary: 'Item 1', secondary: 'Description' },
 *     { id: '2', primary: 'Item 2', leading: <UserIcon /> },
 *   ]}
 * />
 * ```
 */
export interface ListProps extends Omit<
  HTMLAttributes<HTMLUListElement>,
  "onSelect"
> {
  /**
   * List items
   */
  items: ListItem[];

  /**
   * Size variant
   * @default 'md'
   */
  size?: ListSize;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: ListVariant;

  /**
   * Whether the list items are interactive (hoverable/clickable)
   * @default false
   */
  interactive?: boolean;

  /**
   * Whether items can be selected
   * @default false
   */
  selectable?: boolean;

  /**
   * Callback when an item is selected
   */
  onSelect?: (item: ListItem) => void;

  /**
   * Render custom list item content
   */
  renderItem?: (item: ListItem, index: number) => ReactNode;

  /**
   * Custom empty state when no items
   */
  emptyContent?: ReactNode;
}

/**
 * List Item component props (internal)
 */
export interface ListItemProps {
  item: ListItem;
  size: ListSize;
  interactive: boolean;
  selectable: boolean;
  onClick?: () => void;
}
