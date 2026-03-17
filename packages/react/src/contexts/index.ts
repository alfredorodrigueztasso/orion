/**
 * Orion React Contexts
 */

export { ThemeProvider, useThemeContext } from "./ThemeContext";
export type { ThemeProviderProps } from "./ThemeContext";

// Re-export useTheme hook and types from hooks
export { useTheme } from "../hooks/useTheme";
export type {
  UseThemeOptions,
  UseThemeReturn,
  Theme,
  Brand,
} from "../hooks/useTheme";
