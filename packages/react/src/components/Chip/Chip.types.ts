/**
 * Chip Component Types
 *
 * Type definitions for the Orion Chip/Tag component.
 */

import type { HTMLAttributes, ReactNode } from "react";

/**
 * Chip visual variants
 */
export type ChipVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "inverse";

/**
 * Chip sizes
 */
export type ChipSize = "sm" | "md" | "lg";

/**
 * Chip component props
 *
 * @example
 * ```tsx
 * <Chip>Default</Chip>
 * <Chip variant="success">Completed</Chip>
 * <Chip onRemove={() => handleRemove()}>Removable</Chip>
 * ```
 */
export interface ChipProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onClick"
> {
  /**
   * Visual variant of the chip
   * @default 'default'
   */
  variant?: ChipVariant;

  /**
   * Size of the chip
   * @default 'md'
   */
  size?: ChipSize;

  /**
   * Icon to display before the label
   */
  icon?: ReactNode;

  /**
   * Whether the chip is clickable
   * @default false
   */
  clickable?: boolean;

  /**
   * Click handler (when clickable is true)
   */
  onClick?: () => void;

  /**
   * Callback to remove the chip (shows X button)
   */
  onRemove?: () => void;

  /**
   * Whether the chip is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the chip is selected (for selectable chips)
   * @default false
   */
  selected?: boolean;

  /**
   * Chip content
   */
  children?: ReactNode;
}
