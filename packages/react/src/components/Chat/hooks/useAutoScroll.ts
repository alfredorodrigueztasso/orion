/**
 * useAutoScroll Hook
 *
 * Automatically scrolls to the bottom of a container when new content is added.
 * Includes smart detection to pause auto-scroll when user scrolls up.
 */

import { useRef, useEffect, useCallback, useState } from "react";

export interface UseAutoScrollOptions {
  /** Whether auto-scroll is enabled */
  enabled?: boolean;
  /** Threshold in pixels from bottom to consider "at bottom" */
  threshold?: number;
  /** Smooth scroll behavior */
  smooth?: boolean;
}

export interface UseAutoScrollReturn {
  /** Ref to attach to the scrollable container */
  scrollRef: React.RefObject<HTMLDivElement | null>;
  /** Whether the user is currently at the bottom */
  isAtBottom: boolean;
  /** Manually scroll to bottom */
  scrollToBottom: () => void;
}

export function useAutoScroll(
  options: UseAutoScrollOptions = {},
): UseAutoScrollReturn {
  const { enabled = true, threshold = 100, smooth = true } = options;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const isAutoScrolling = useRef(false);
  const isAtBottomRef = useRef(true);

  // Check if user is at bottom of scroll container
  const checkIsAtBottom = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return true;

    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight < threshold;
  }, [threshold]);

  // Scroll to bottom of container
  const scrollToBottom = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    isAutoScrolling.current = true;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });

    // Reset flag after scroll animation — re-check actual position
    setTimeout(
      () => {
        isAutoScrolling.current = false;
        const atBottom = checkIsAtBottom();
        isAtBottomRef.current = atBottom;
        setIsAtBottom(atBottom);
      },
      smooth ? 300 : 0,
    );
  }, [smooth, checkIsAtBottom]);

  // Handle scroll events
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Ignore if we triggered this scroll
      if (isAutoScrolling.current) return;

      const atBottom = checkIsAtBottom();
      // Update ref IMMEDIATELY (sync) so MutationObserver sees it right away
      isAtBottomRef.current = atBottom;
      setIsAtBottom(atBottom);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [checkIsAtBottom]);

  // Auto-scroll when content changes — observer always active
  useEffect(() => {
    if (!enabled) return;

    const container = scrollRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      // Only auto-scroll if user is at bottom (read from sync ref)
      if (isAtBottomRef.current) {
        scrollToBottom();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [enabled, scrollToBottom]);

  return {
    scrollRef,
    isAtBottom,
    scrollToBottom,
  };
}
