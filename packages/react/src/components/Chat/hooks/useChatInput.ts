/**
 * useChatInput Hook
 *
 * Manages chat input state including text, attachments, and submission.
 */

import { useState, useCallback, useRef, useEffect } from "react";

export interface UseChatInputOptions {
  /** Maximum character count */
  maxLength?: number;
  /** Callback when message is sent */
  onSend?: (message: string, attachments?: File[]) => void;
  /** Whether input is disabled */
  disabled?: boolean;
}

export interface UseChatInputReturn {
  /** Current input value */
  value: string;
  /** Set input value */
  setValue: (value: string) => void;
  /** Pending file attachments */
  attachments: File[];
  /** Add files to attachments */
  addAttachments: (files: File[]) => void;
  /** Remove attachment by index */
  removeAttachment: (index: number) => void;
  /** Clear all attachments */
  clearAttachments: () => void;
  /** Handle form submission */
  handleSubmit: () => void;
  /** Handle key down (for Enter to send) */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Ref for textarea element */
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  /** Whether input is empty */
  isEmpty: boolean;
  /** Current character count */
  charCount: number;
  /** Whether character limit is exceeded */
  isOverLimit: boolean;
  /** Focus the input */
  focus: () => void;
}

export function useChatInput(
  options: UseChatInputOptions = {},
): UseChatInputReturn {
  const { maxLength, onSend, disabled = false } = options;

  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Computed values
  const charCount = value.length;
  const isOverLimit = maxLength !== undefined && charCount > maxLength;
  const isEmpty = value.trim().length === 0 && attachments.length === 0;

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get correct scrollHeight
    textarea.style.height = "auto";
    // Set height to scrollHeight (with max constraint handled by CSS)
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  // Add attachments
  const addAttachments = useCallback((files: File[]) => {
    setAttachments((prev) => [...prev, ...files]);
  }, []);

  // Remove attachment by index
  const removeAttachment = useCallback((index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Clear all attachments
  const clearAttachments = useCallback(() => {
    setAttachments([]);
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    if (disabled || (isEmpty && attachments.length === 0)) return;
    if (isOverLimit) return;

    const trimmedValue = value.trim();
    onSend?.(trimmedValue, attachments.length > 0 ? attachments : undefined);

    // Reset state
    setValue("");
    setAttachments([]);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [disabled, isEmpty, isOverLimit, value, attachments, onSend]);

  // Handle key down for Enter to send
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Send on Enter (without Shift)
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  // Focus the input
  const focus = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  return {
    value,
    setValue,
    attachments,
    addAttachments,
    removeAttachment,
    clearAttachments,
    handleSubmit,
    handleKeyDown,
    textareaRef,
    isEmpty,
    charCount,
    isOverLimit,
    focus,
  };
}
