/**
 * Textarea Component Types
 *
 * Type definitions for the Orion Textarea component.
 * Implements WCAG 2.1 AA accessibility guidelines.
 */

import type { TextareaHTMLAttributes } from "react";

/**
 * Textarea sizes
 */
export type TextareaSize = "sm" | "md" | "lg";

/**
 * Textarea resize behavior
 */
export type TextareaResize = "none" | "vertical" | "horizontal" | "both";

/**
 * Textarea component props
 *
 * @example
 * ```tsx
 * <Textarea label="Description" placeholder="Enter description..." />
 * <Textarea
 *   label="Bio"
 *   helperText="Tell us about yourself"
 *   maxLength={500}
 *   showCounter
 * />
 * ```
 */
export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  /**
   * Textarea label text.
   * Required for accessibility unless aria-label is provided.
   */
  label?: string;

  /**
   * Helper text displayed below the textarea.
   * Automatically linked via aria-describedby.
   */
  helperText?: string;

  /**
   * Error message.
   * Shows error state and displays message below textarea.
   */
  error?: string;

  /**
   * Textarea size variant.
   * @default 'md'
   */
  size?: TextareaSize;

  /**
   * Resize behavior.
   * @default 'vertical'
   */
  resize?: TextareaResize;

  /**
   * Show character counter.
   * Counter is announced to screen readers via aria-live.
   * @default false
   */
  showCounter?: boolean;

  /**
   * Maximum character length.
   * Required if showCounter is true.
   */
  maxLength?: number;

  /**
   * Shows "(optional)" indicator next to label.
   * @default false
   */
  optional?: boolean;

  // ============================================================================
  // ACCESSIBILITY PROPS
  // ============================================================================

  /**
   * Accessible label for screen readers when no visible label is provided.
   * REQUIRED if `label` prop is not provided.
   *
   * @example
   * ```tsx
   * <Textarea
   *   aria-label="Additional comments"
   *   placeholder="Enter your comments..."
   * />
   * ```
   */
  "aria-label"?: string;

  /**
   * Additional element IDs that describe this textarea.
   * Automatically includes error, helper text, and counter IDs when provided.
   */
  "aria-describedby"?: string;
}
