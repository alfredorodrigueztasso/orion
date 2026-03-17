/**
 * ThemeController Component Types
 *
 * Type definitions for the Orion ThemeController component.
 */

import type { CSSProperties } from "react";
import type { Theme, Brand } from "../../hooks/useTheme";

/**
 * ThemeController component props
 *
 * @example
 * ```tsx
 * <ThemeController
 *   showBrandSelector
 *   showSummary
 * />
 * ```
 */
export interface ThemeControllerProps {
  /**
   * Show brand selector
   * @default true
   */
  showBrandSelector?: boolean;

  /**
   * Show theme toggle
   * @default true
   */
  showThemeToggle?: boolean;

  /**
   * Show current settings summary
   * @default true
   */
  showSummary?: boolean;

  /**
   * Compact mode (horizontal layout)
   * @default false
   */
  compact?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: CSSProperties;

  /**
   * Theme change callback
   */
  onThemeChange?: (theme: Theme) => void;

  /**
   * Brand change callback
   */
  onBrandChange?: (brand: Brand) => void;
}
