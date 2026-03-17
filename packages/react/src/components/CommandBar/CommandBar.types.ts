/**
 * CommandBar Component Types
 *
 * Type definitions for the Orion CommandBar section component.
 * A command palette (Cmd+K) for quick navigation and actions.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Command item for the palette
 */
export interface CommandItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Icon element
   */
  icon?: ReactNode;

  /**
   * Keyboard shortcut display (e.g., "⌘K", "Ctrl+P")
   */
  shortcut?: string;

  /**
   * Category/group this command belongs to
   */
  category?: string;

  /**
   * Action callback
   */
  onSelect: () => void;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Keywords for search matching
   */
  keywords?: string[];
}

/**
 * Command group for categorization
 */
export interface CommandGroup {
  /**
   * Group title
   */
  title: string;

  /**
   * Commands in this group
   */
  commands: CommandItem[];
}

/**
 * CommandBar section props
 *
 * @example
 * ```tsx
 * <CommandBar
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   commands={[
 *     { id: 'home', label: 'Go to Home', icon: <Home />, onSelect: () => navigate('/') },
 *     { id: 'settings', label: 'Settings', icon: <Settings />, shortcut: '⌘,', onSelect: () => navigate('/settings') }
 *   ]}
 * />
 * ```
 */
export interface CommandBarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /**
   * Whether the command bar is open
   */
  open: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Flat list of commands (will be grouped by category if specified)
   */
  commands: CommandItem[];

  /**
   * Recent commands to show at the top
   */
  recentCommands?: CommandItem[];

  /**
   * Callback when a command is selected
   */
  onSelect?: (command: CommandItem) => void;

  /**
   * Placeholder text for search input
   * @default "Type a command or search..."
   */
  placeholder?: string;

  /**
   * Empty state message when no results
   * @default "No results found."
   */
  emptyMessage?: string;

  /**
   * Custom footer content
   */
  footer?: ReactNode;
}
