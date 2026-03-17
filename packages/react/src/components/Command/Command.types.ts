/**
 * Command Component Types
 *
 * Type definitions for the Orion Command palette component.
 * A searchable command menu with keyboard navigation.
 */

import type { HTMLAttributes, ReactNode, InputHTMLAttributes } from "react";

/**
 * Command root props
 */
export interface CommandProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /**
   * Controlled search value
   */
  value?: string;

  /**
   * Callback when search value changes
   */
  onValueChange?: (value: string) => void;

  /**
   * Custom filter function. Return 0 to hide, 1 to show.
   * By default uses case-insensitive includes.
   */
  filter?: (value: string, search: string) => number;

  /**
   * Children (compound components)
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.Dialog props — renders Command inside a modal overlay
 */
export interface CommandDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Children (Command compound components)
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.Input props
 */
export interface CommandInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> {
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.List props
 */
export interface CommandListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Children (groups and items)
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.Empty props
 */
export interface CommandEmptyProps {
  /**
   * Content to show when no results match
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.Group props
 */
export interface CommandGroupProps {
  /**
   * Group heading
   */
  heading?: string;

  /**
   * Group items
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.Item props
 */
export interface CommandItemProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /**
   * Callback when item is selected (click or Enter)
   */
  onSelect?: () => void;

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Search value for filtering (defaults to text content)
   */
  value?: string;

  /**
   * Children
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.Separator props
 */
export interface CommandSeparatorProps {
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Command.Shortcut props
 */
export interface CommandShortcutProps {
  /**
   * Keyboard shortcut text
   */
  children?: ReactNode;

  /**
   * Additional class name
   */
  className?: string;
}
