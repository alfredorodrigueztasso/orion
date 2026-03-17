/**
 * useDebounce Hook
 *
 * Debounces a value, updating only after a specified delay.
 *
 * @example
 * ```tsx
 * const [search, setSearch] = useState('');
 * const debouncedSearch = useDebounce(search, 300);
 *
 * useEffect(() => {
 *   // Only runs 300ms after user stops typing
 *   fetchResults(debouncedSearch);
 * }, [debouncedSearch]);
 * ```
 */

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Hook to debounce a value
 *
 * @param value - Value to debounce
 * @param delay - Debounce delay in milliseconds
 * @returns Debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Options for useDebouncedCallback
 */
export interface UseDebouncedCallbackOptions {
  /**
   * Whether to call immediately on the leading edge
   * @default false
   */
  leading?: boolean;

  /**
   * Whether to call on the trailing edge
   * @default true
   */
  trailing?: boolean;

  /**
   * Maximum time to wait before forcing invocation
   */
  maxWait?: number;
}

/**
 * Hook to create a debounced callback function
 *
 * @param callback - Function to debounce
 * @param delay - Debounce delay in milliseconds
 * @param options - Additional options
 * @returns Debounced callback and control functions
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
  options: UseDebouncedCallbackOptions = {},
): {
  callback: (...args: Parameters<T>) => void;
  cancel: () => void;
  flush: () => void;
  isPending: () => boolean;
} {
  const { leading = false, trailing = true, maxWait } = options;

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<unknown[] | null>(null);
  const lastCallTimeRef = useRef<number | null>(null);
  const pendingRef = useRef(false);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
    pendingRef.current = false;
    lastArgsRef.current = null;
    lastCallTimeRef.current = null;
  }, []);

  const flush = useCallback(() => {
    if (pendingRef.current && lastArgsRef.current !== null) {
      callback(...(lastArgsRef.current as Parameters<T>));
      cancel();
    }
  }, [callback, cancel]);

  const isPending = useCallback(() => pendingRef.current, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      lastArgsRef.current = args;
      lastCallTimeRef.current = now;
      pendingRef.current = true;

      // Handle leading edge
      if (leading && !timerRef.current) {
        callback(...args);
      }

      // Clear existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set up trailing edge timer
      if (trailing) {
        timerRef.current = setTimeout(() => {
          if (trailing && lastArgsRef.current !== null) {
            callback(...(lastArgsRef.current as Parameters<T>));
          }
          cancel();
        }, delay);
      }

      // Set up max wait timer
      if (maxWait && !maxTimerRef.current) {
        maxTimerRef.current = setTimeout(() => {
          if (lastArgsRef.current !== null) {
            callback(...(lastArgsRef.current as Parameters<T>));
          }
          cancel();
        }, maxWait);
      }
    },
    [callback, delay, leading, trailing, maxWait, cancel],
  );

  // Cleanup on unmount
  useEffect(() => {
    return cancel;
  }, [cancel]);

  return {
    callback: debouncedCallback,
    cancel,
    flush,
    isPending,
  };
}
