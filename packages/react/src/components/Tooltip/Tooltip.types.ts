/**
 * Tooltip Component Types
 *
 * Type definitions for the Orion Tooltip component.
 */

import type { ReactNode } from "react";

/**
 * Tooltip placement
 */
export type TooltipPlacement = "top" | "right" | "bottom" | "left";

/**
 * Tooltip component props
 *
 * @example
 * ```tsx
 * <Tooltip content="Click to edit">
 *   <Button icon={<EditIcon />} />
 * </Tooltip>
 * ```
 */
export interface TooltipProps {
  /**
   * Tooltip content
   */
  content: ReactNode;

  /**
   * Tooltip placement
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Delay before showing (ms)
   * @default 200
   */
  delay?: number;

  /**
   * Element to attach tooltip to
   */
  children: ReactNode;

  /**
   * Disable tooltip
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional class name
   */
  className?: string;
}
