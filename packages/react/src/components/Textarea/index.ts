/**
 * Textarea Component - Multi-line text input.
 *
 * @example
 * ```tsx
 * import { Textarea } from '@orion-ds/react';
 *
 * <Textarea label="Message" placeholder="Enter your message..." />
 * <Textarea label="Bio" rows={4} resize="vertical" />
 * <Textarea label="Notes" error="This field is required" />
 * ```
 */
export { Textarea } from "./Textarea";
export type {
  TextareaProps,
  TextareaSize,
  TextareaResize,
} from "./Textarea.types";
