/**
 * useKeyboard Hook
 *
 * Handles keyboard shortcuts and key events.
 *
 * @example
 * ```tsx
 * // Single key
 * useKeyboard('Escape', () => closeModal());
 *
 * // With modifiers
 * useKeyboard('k', () => openSearch(), { meta: true });
 * useKeyboard('s', () => save(), { ctrl: true });
 *
 * // Multiple keys
 * useKeyboardShortcuts({
 *   'Escape': () => closeModal(),
 *   'Meta+k': () => openSearch(),
 *   'Ctrl+s': () => save(),
 * });
 * ```
 */

import { useEffect, useCallback, useRef } from "react";

/**
 * Key modifier options
 */
export interface KeyModifiers {
  /**
   * Require Ctrl key
   * @default false
   */
  ctrl?: boolean;

  /**
   * Require Alt/Option key
   * @default false
   */
  alt?: boolean;

  /**
   * Require Shift key
   * @default false
   */
  shift?: boolean;

  /**
   * Require Meta/Cmd key (Mac) or Windows key
   * @default false
   */
  meta?: boolean;
}

/**
 * Options for useKeyboard hook
 */
export interface UseKeyboardOptions extends KeyModifiers {
  /**
   * Whether the handler is enabled
   * @default true
   */
  enabled?: boolean;

  /**
   * Event type to listen for
   * @default 'keydown'
   */
  event?: "keydown" | "keyup" | "keypress";

  /**
   * Whether to prevent default browser behavior
   * @default true
   */
  preventDefault?: boolean;

  /**
   * Whether to stop event propagation
   * @default false
   */
  stopPropagation?: boolean;

  /**
   * Target element (default: document)
   */
  target?: HTMLElement | null;

  /**
   * Only trigger if target element is focused
   * @default false
   */
  targetOnly?: boolean;
}

/**
 * Hook to handle a single keyboard shortcut
 *
 * @param key - Key to listen for (e.g., 'Escape', 'Enter', 'k')
 * @param handler - Callback when key is pressed
 * @param options - Additional options
 */
export function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options: UseKeyboardOptions = {},
): void {
  const {
    ctrl = false,
    alt = false,
    shift = false,
    meta = false,
    enabled = true,
    event = "keydown",
    preventDefault = true,
    stopPropagation = false,
    target,
    targetOnly = false,
  } = options;

  // Use ref to avoid re-creating listener on handler change
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyEvent = (e: KeyboardEvent) => {
      // Check if key matches
      const keyMatches =
        e.key.toLowerCase() === key.toLowerCase() || e.code === key;

      if (!keyMatches) {
        return;
      }

      // Check modifiers
      if (ctrl !== e.ctrlKey) return;
      if (alt !== e.altKey) return;
      if (shift !== e.shiftKey) return;
      if (meta !== e.metaKey) return;

      // Check target if targetOnly is true
      if (targetOnly && target && e.target !== target) {
        return;
      }

      // Don't trigger if user is typing in an input
      const activeElement = document.activeElement;
      const isTyping =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      // Allow Escape to work even when typing
      if (isTyping && key.toLowerCase() !== "escape") {
        return;
      }

      if (preventDefault) {
        e.preventDefault();
      }

      if (stopPropagation) {
        e.stopPropagation();
      }

      handlerRef.current(e);
    };

    const targetElement = target || document;
    targetElement.addEventListener(event, handleKeyEvent as EventListener);

    return () => {
      targetElement.removeEventListener(event, handleKeyEvent as EventListener);
    };
  }, [
    key,
    ctrl,
    alt,
    shift,
    meta,
    enabled,
    event,
    preventDefault,
    stopPropagation,
    target,
    targetOnly,
  ]);
}

/**
 * Shortcut definition with handler
 */
export type KeyboardShortcuts = Record<string, () => void>;

/**
 * Parse shortcut string into key and modifiers
 * Supports formats like: "Escape", "Meta+k", "Ctrl+Shift+s"
 */
function parseShortcut(shortcut: string): {
  key: string;
  modifiers: KeyModifiers;
} {
  const parts = shortcut.split("+");
  const key = parts[parts.length - 1] || shortcut;
  const modifiers: KeyModifiers = {};

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (part) {
      const modifier = part.toLowerCase();
      switch (modifier) {
        case "ctrl":
        case "control":
          modifiers.ctrl = true;
          break;
        case "alt":
        case "option":
          modifiers.alt = true;
          break;
        case "shift":
          modifiers.shift = true;
          break;
        case "meta":
        case "cmd":
        case "command":
          modifiers.meta = true;
          break;
      }
    }
  }

  return { key, modifiers };
}

/**
 * Hook to handle multiple keyboard shortcuts
 *
 * @param shortcuts - Object mapping shortcut strings to handlers
 * @param options - Common options for all shortcuts
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcuts,
  options: Omit<UseKeyboardOptions, keyof KeyModifiers> = {},
): void {
  const {
    enabled = true,
    event = "keydown",
    preventDefault = true,
    stopPropagation = false,
  } = options;

  // Parse all shortcuts
  const parsedShortcuts = useCallback(() => {
    return Object.entries(shortcuts).map(([shortcut, handler]) => ({
      ...parseShortcut(shortcut),
      handler,
    }));
  }, [shortcuts]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyEvent = (e: KeyboardEvent) => {
      const parsed = parsedShortcuts();

      for (const { key, modifiers, handler } of parsed) {
        const keyMatches =
          e.key.toLowerCase() === key.toLowerCase() || e.code === key;

        if (!keyMatches) continue;

        // Check modifiers
        if ((modifiers.ctrl ?? false) !== e.ctrlKey) continue;
        if ((modifiers.alt ?? false) !== e.altKey) continue;
        if ((modifiers.shift ?? false) !== e.shiftKey) continue;
        if ((modifiers.meta ?? false) !== e.metaKey) continue;

        // Don't trigger if user is typing in an input (except Escape)
        const activeElement = document.activeElement;
        const isTyping =
          activeElement instanceof HTMLInputElement ||
          activeElement instanceof HTMLTextAreaElement ||
          activeElement?.getAttribute("contenteditable") === "true";

        if (isTyping && key.toLowerCase() !== "escape") {
          continue;
        }

        if (preventDefault) {
          e.preventDefault();
        }

        if (stopPropagation) {
          e.stopPropagation();
        }

        handler();
        break; // Only trigger first matching shortcut
      }
    };

    document.addEventListener(event, handleKeyEvent);

    return () => {
      document.removeEventListener(event, handleKeyEvent);
    };
  }, [enabled, event, preventDefault, stopPropagation, parsedShortcuts]);
}
