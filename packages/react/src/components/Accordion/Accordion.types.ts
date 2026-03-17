/**
 * Accordion Component Types
 *
 * Type definitions for the Orion Accordion component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Accordion visual variants
 */
export type AccordionVariant = "default" | "bordered" | "separated";

/**
 * Single accordion item data
 */
export interface AccordionItem {
  /**
   * Unique identifier for the item
   */
  id: string;

  /**
   * Title/header of the accordion item
   */
  title: ReactNode;

  /**
   * Content shown when expanded
   */
  content: ReactNode;

  /**
   * Whether the item is disabled
   */
  disabled?: boolean;

  /**
   * Optional icon to display before the title
   */
  icon?: ReactNode;
}

/**
 * Accordion component props
 *
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { id: '1', title: 'Section 1', content: 'Content 1' },
 *     { id: '2', title: 'Section 2', content: 'Content 2' },
 *   ]}
 * />
 * ```
 */
export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  /**
   * Array of accordion items
   */
  items: AccordionItem[];

  /**
   * Visual variant of the accordion
   * @default 'default'
   */
  variant?: AccordionVariant;

  /**
   * Allow multiple items to be expanded at once
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * Default expanded item IDs (uncontrolled)
   */
  defaultExpanded?: string[];

  /**
   * Controlled expanded item IDs
   */
  expanded?: string[];

  /**
   * Callback when expansion state changes
   */
  onChange?: (expandedIds: string[]) => void;

  /**
   * Whether to animate the expand/collapse
   * @default true
   */
  animated?: boolean;
}

/**
 * AccordionItem component props (internal)
 */
export interface AccordionItemProps {
  item: AccordionItem;
  isExpanded: boolean;
  onToggle: () => void;
  variant: AccordionVariant;
  animated: boolean;
}
