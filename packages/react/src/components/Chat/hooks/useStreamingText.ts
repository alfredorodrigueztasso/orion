/**
 * useStreamingText Hook
 *
 * Reveals text progressively, word by word, simulating real-time
 * content generation. Content is final — text only grows, never rewrites.
 */

import { useState, useEffect, useRef } from "react";

export interface UseStreamingTextOptions {
  /** Words revealed per tick (default: 2) */
  wordsPerTick?: number;
  /** Milliseconds between ticks (default: 60) */
  intervalMs?: number;
  /** Whether streaming is active (default: true) */
  enabled?: boolean;
}

export interface UseStreamingTextReturn {
  /** The portion of text currently visible */
  displayText: string;
  /** Whether all text has been revealed */
  isComplete: boolean;
}

export function useStreamingText(
  fullText: string,
  options: UseStreamingTextOptions = {},
): UseStreamingTextReturn {
  const { wordsPerTick = 2, intervalMs = 60, enabled = true } = options;
  const words = useRef<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);

  // Split text into words once when fullText changes
  useEffect(() => {
    words.current = fullText.split(/(\s+)/); // preserve whitespace tokens
    if (enabled) {
      setWordIndex(0);
    } else {
      setWordIndex(words.current.length);
    }
  }, [fullText, enabled]);

  // Progressive reveal
  useEffect(() => {
    if (!enabled || wordIndex >= words.current.length) return;

    const timer = setInterval(() => {
      setWordIndex((prev) => {
        const next = prev + wordsPerTick;
        if (next >= words.current.length) {
          clearInterval(timer);
          return words.current.length;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [enabled, wordIndex, wordsPerTick, intervalMs]);

  const displayText = words.current.slice(0, wordIndex).join("");
  const isComplete = wordIndex >= words.current.length;

  return { displayText, isComplete };
}
