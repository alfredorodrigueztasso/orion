/**
 * useClickOutside Hook
 *
 * Detects clicks outside of a specified element.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, () => setIsOpen(false));
 *
 * return <div ref={ref}>Dropdown content</div>;
 * ```
 */

import { useEffect, type RefObject } from "react";

/**
 * Hook to detect clicks outside of a referenced element
 *
 * @param ref - React ref to the element to monitor
 * @param handler - Callback function when click outside is detected
 * @param enabled - Whether the hook is active (default: true)
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(target)) {
        return;
      }

      handler(event);
    };

    // Use mousedown instead of click for faster response
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, handler, enabled]);
}

/**
 * Hook to detect clicks outside of multiple elements
 *
 * @param refs - Array of React refs to monitor
 * @param handler - Callback function when click outside all refs is detected
 * @param enabled - Whether the hook is active (default: true)
 */
export function useClickOutsideMultiple<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null>[],
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true,
): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // Check if click is inside any of the refs
      const isInside = refs.some(
        (ref) => ref.current && ref.current.contains(target),
      );

      if (!isInside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [refs, handler, enabled]);
}
