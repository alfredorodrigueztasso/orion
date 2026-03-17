/**
 * Orion React Hooks
 *
 * A collection of utility hooks for building React applications.
 */

// Theme management
export { useTheme } from "./useTheme";
export type { UseThemeOptions, UseThemeReturn } from "./useTheme";

// Media queries & responsive
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from "./useMediaQuery";

// Event handlers
export { useClickOutside, useClickOutsideMultiple } from "./useClickOutside";

// State management
export { useDisclosure } from "./useDisclosure";
export type {
  UseDisclosureOptions,
  UseDisclosureReturn,
} from "./useDisclosure";

// Debouncing
export { useDebounce, useDebouncedCallback } from "./useDebounce";
export type { UseDebouncedCallbackOptions } from "./useDebounce";

// Storage
export { useLocalStorage, useSessionStorage } from "./useLocalStorage";
export type { UseLocalStorageOptions } from "./useLocalStorage";

// Clipboard
export { useCopyToClipboard, useCopy } from "./useCopyToClipboard";
export type {
  UseCopyToClipboardOptions,
  UseCopyToClipboardReturn,
} from "./useCopyToClipboard";

// Keyboard
export { useKeyboard, useKeyboardShortcuts } from "./useKeyboard";
export type {
  KeyModifiers,
  UseKeyboardOptions,
  KeyboardShortcuts,
} from "./useKeyboard";
