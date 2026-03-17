/**
 * Popover Component Types
 *
 * Type definitions for the Orion Popover component.
 */

import type { HTMLAttributes, ReactNode, RefObject } from "react";

/**
 * Popover placement options
 */
export type PopoverPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

/**
 * Popover trigger types
 */
export type PopoverTrigger = "click" | "hover" | "focus" | "manual";

/**
 * Popover component props
 *
 * @example
 * ```tsx
 * <Popover
 *   trigger={<Button>Open</Button>}
 *   content={<div>Popover content</div>}
 * />
 * ```
 */
export interface PopoverProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "content"
> {
  /**
   * The trigger element that opens the popover
   */
  trigger: ReactNode;

  /**
   * The content to display in the popover
   */
  content: ReactNode;

  /**
   * Placement of the popover relative to the trigger
   * @default 'bottom'
   */
  placement?: PopoverPlacement;

  /**
   * How to trigger the popover
   * @default 'click'
   */
  triggerType?: PopoverTrigger;

  /**
   * Whether the popover is open (controlled mode)
   */
  open?: boolean;

  /**
   * Default open state (uncontrolled mode)
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether to show an arrow pointing to the trigger
   * @default true
   */
  showArrow?: boolean;

  /**
   * Offset from the trigger in pixels
   * @default 8
   */
  offset?: number;

  /**
   * Whether to close when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean;

  /**
   * Whether to close when pressing Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Delay before showing (for hover trigger)
   * @default 0
   */
  openDelay?: number;

  /**
   * Delay before hiding (for hover trigger)
   * @default 150
   */
  closeDelay?: number;

  /**
   * Whether the trigger wrapper should stretch to fill its container
   * Set to true when Popover is placed inside a constrained container (e.g., sidebar header)
   * Changes trigger from display: inline-block to display: block with width: 100%
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Internal hook return type
 */
export interface UsePopoverReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLDivElement | null>;
  popoverRef: RefObject<HTMLDivElement | null>;
  triggerProps: Record<string, unknown>;
  popoverProps: Record<string, unknown>;
}
