/**
 * useCopyToClipboard Hook
 *
 * Provides a function to copy text to clipboard with status tracking.
 *
 * @example
 * ```tsx
 * const { copy, copied, error } = useCopyToClipboard();
 *
 * return (
 *   <Button onClick={() => copy('Hello!')}>
 *     {copied ? 'Copied!' : 'Copy'}
 *   </Button>
 * );
 * ```
 */

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Options for useCopyToClipboard hook
 */
export interface UseCopyToClipboardOptions {
  /**
   * Duration in ms to show "copied" state
   * @default 2000
   */
  copiedDuration?: number;

  /**
   * Callback when copy succeeds
   */
  onSuccess?: (text: string) => void;

  /**
   * Callback when copy fails
   */
  onError?: (error: Error) => void;
}

/**
 * Return type for useCopyToClipboard hook
 */
export interface UseCopyToClipboardReturn {
  /**
   * Function to copy text to clipboard
   */
  copy: (text: string) => Promise<boolean>;

  /**
   * Whether text was recently copied
   */
  copied: boolean;

  /**
   * The last copied text
   */
  copiedText: string | null;

  /**
   * Any error that occurred
   */
  error: Error | null;

  /**
   * Reset the copied state
   */
  reset: () => void;
}

/**
 * Hook to copy text to clipboard
 *
 * @param options - Configuration options
 * @returns Copy function and status
 */
export function useCopyToClipboard(
  options: UseCopyToClipboardOptions = {},
): UseCopyToClipboardReturn {
  const { copiedDuration = 2000, onSuccess, onError } = options;

  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const reset = useCallback(() => {
    setCopied(false);
    setCopiedText(null);
    setError(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset error state
      setError(null);

      // Check if clipboard API is available
      if (!navigator?.clipboard) {
        const err = new Error("Clipboard API not available");
        setError(err);
        onError?.(err);
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);

        setCopied(true);
        setCopiedText(text);
        onSuccess?.(text);

        // Reset copied state after duration
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, copiedDuration);

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to copy");
        setError(error);
        onError?.(error);
        return false;
      }
    },
    [copiedDuration, onSuccess, onError],
  );

  return {
    copy,
    copied,
    copiedText,
    error,
    reset,
  };
}

/**
 * Simplified hook that just returns the copy function
 * For simple use cases where you don't need status tracking
 */
export function useCopy(): (text: string) => Promise<boolean> {
  const { copy } = useCopyToClipboard();
  return copy;
}
