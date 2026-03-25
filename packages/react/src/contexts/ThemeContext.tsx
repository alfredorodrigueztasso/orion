"use client";

/**
 * Theme Context
 *
 * Provides global theme and brand state to all components.
 * This ensures consistent theming across the entire application.
 *
 * Fonts are loaded automatically by default. No need to add <FontLoader /> manually.
 *
 * @example
 * ```tsx
 * // App.tsx
 * import { ThemeProvider } from '@orion/react';
 *
 * export default function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourComponents />
 *     </ThemeProvider>
 *   );
 * }
 *
 * // Inside any component
 * import { useTheme } from '@orion/react';
 *
 * function MyComponent() {
 *   const { theme, brand } = useTheme();
 *   return <div>Current: {theme} / {brand}</div>;
 * }
 *
 * // To disable automatic font loading:
 * <ThemeProvider disableAutoFontLoading>
 *   <YourComponents />
 * </ThemeProvider>
 * ```
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  useTheme as useThemeHook,
  type UseThemeOptions,
  type UseThemeReturn,
} from "../hooks/useTheme";
import { getMissingFonts, GOOGLE_FONTS_URL, BRAND_FONTS } from "../utils/fonts";
import { FontLoader } from "../components/FontLoader";

/**
 * SSR-safe defaults for Theme Context
 * Used when ThemeContext is accessed outside of ThemeProvider (e.g., during Next.js static prerendering)
 */
const SSR_DEFAULTS: UseThemeReturn = {
  theme: "light",
  brand: "orion",
  setTheme: () => {},
  setBrand: () => {},
  toggleTheme: () => {},
  isDark: false,
  isLight: true,
};

/**
 * Theme Context - provides theme and brand state globally
 * Initialized with SSR defaults to prevent null errors during static prerendering
 */
const ThemeContext = createContext<UseThemeReturn>(SSR_DEFAULTS);

/**
 * Check if component styles (react.css) are loaded
 * Uses a CSS custom property marker set in styles/marker.css
 */
function checkComponentStylesLoaded(): boolean {
  if (typeof window === "undefined") return true;

  const styles = getComputedStyle(document.documentElement);
  const marker = styles.getPropertyValue("--orion-react-styles-loaded");
  return marker.trim() === "1";
}

/**
 * Theme Provider Props
 */
export interface ThemeProviderProps {
  /**
   * Child components
   */
  children: ReactNode;

  /**
   * Default theme
   * @default 'light'
   */
  defaultTheme?: "light" | "dark";

  /**
   * Default brand
   * @default 'orion'
   */
  defaultBrand?: "orion" | "red" | "deepblue" | "orange" | "lemon";

  /**
   * Theme options (see useTheme for full options)
   * @deprecated Use flat props (defaultTheme, defaultBrand) instead.
   */
  options?: UseThemeOptions;

  /**
   * Disable font loading warnings in development
   * @default false
   */
  disableFontWarnings?: boolean;

  /**
   * Disable automatic font loading via FontLoader
   * When false (default), fonts are loaded automatically.
   * Set to true if you want to manage font loading manually.
   * @default false
   */
  disableAutoFontLoading?: boolean;

  /**
   * Disable CSS import warnings in development
   * When false (default), a warning is shown if react.css is not imported.
   * @default false
   */
  disableCSSWarnings?: boolean;
}

/**
 * ThemeProvider Component
 *
 * Wraps your application to provide global theme and brand state.
 * Must be placed near the root of your application.
 */
export function ThemeProvider({
  children,
  defaultTheme,
  defaultBrand,
  options,
  disableFontWarnings = false,
  disableAutoFontLoading = false,
  disableCSSWarnings = false,
}: ThemeProviderProps) {
  // Merge flat props with options (flat props take precedence)
  const mergedOptions: UseThemeOptions = {
    ...options,
    ...(defaultTheme !== undefined && { defaultTheme }),
    ...(defaultBrand !== undefined && { defaultBrand }),
  };

  const themeState = useThemeHook(mergedOptions);
  const hasWarnedRef = useRef<Set<string>>(new Set());
  const hasWarnedCSSRef = useRef(false);

  // Check for missing component styles (react.css) in development
  useEffect(() => {
    if (disableCSSWarnings || typeof window === "undefined") return;

    // Only warn in development
    const isDev =
      process.env.NODE_ENV === "development" ||
      window.location.hostname === "localhost";

    if (!isDev) return;

    // Check after a short delay to allow CSS to load
    const timeoutId = setTimeout(() => {
      if (!hasWarnedCSSRef.current && !checkComponentStylesLoaded()) {
        hasWarnedCSSRef.current = true;

        console.warn(
          `[Orion] Component styles not detected!\n\n` +
            `You must import the component CSS file:\n\n` +
            `  import '@orion-ds/react/styles.css'; // Single import includes all styles\n\n` +
            `Add this import in your app entry file. It includes both design tokens and component styles.\n\n` +
            `To disable this warning, set disableCSSWarnings={true} on ThemeProvider.`,
        );
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [disableCSSWarnings]);

  // Check for missing fonts in development
  useEffect(() => {
    if (disableFontWarnings || typeof window === "undefined") return;

    // Only warn in development
    const isDev =
      process.env.NODE_ENV === "development" ||
      (typeof window !== "undefined" &&
        window.location.hostname === "localhost");

    if (!isDev) return;

    // Wait a bit for fonts to potentially load
    const timeoutId = setTimeout(() => {
      const { brand } = themeState;
      const missingFonts = getMissingFonts(brand);

      if (missingFonts.length > 0 && !hasWarnedRef.current.has(brand)) {
        hasWarnedRef.current.add(brand);

        const fontsNeeded = BRAND_FONTS[brand].join(", ");

        console.warn(
          `[Orion] Missing fonts for "${brand}" brand: ${missingFonts.join(", ")}\n\n` +
            `The "${brand}" brand requires these fonts: ${fontsNeeded}\n\n` +
            `To fix this, add one of the following to your app:\n\n` +
            `Option 1: Use <FontLoader /> component (recommended)\n` +
            `  import { FontLoader } from '@orion-ds/react';\n` +
            `  <ThemeProvider>\n` +
            `    <FontLoader />\n` +
            `    <App />\n` +
            `  </ThemeProvider>\n\n` +
            `Option 2: Add Google Fonts to your HTML <head>\n` +
            `  <link rel="preconnect" href="https://fonts.googleapis.com">\n` +
            `  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n` +
            `  <link href="${GOOGLE_FONTS_URL}" rel="stylesheet">\n\n` +
            `To disable this warning, set disableFontWarnings={true} on ThemeProvider.`,
        );
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [themeState.brand, disableFontWarnings, themeState]);

  return (
    <ThemeContext.Provider value={themeState}>
      {!disableAutoFontLoading && <FontLoader />}
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access global theme state
 *
 * ⚠️ IMPORTANT: Must be used inside a ThemeProvider for full functionality
 *
 * **Development**: Throws a clear error if used outside ThemeProvider
 * (helps catch integration mistakes early)
 *
 * **Production**: Returns SSR-safe defaults if used outside ThemeProvider
 * (maintains compatibility during Next.js static prerendering)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, brand, setTheme, setBrand } = useThemeContext();
 *   // Components automatically inherit theme/brand from <html> attributes
 *   // DO NOT pass brand prop to components - it's applied globally!
 * }
 * ```
 */
export function useThemeContext(): UseThemeReturn {
  const context = useContext(ThemeContext);

  // DISC-003: Strict mode in development — fail fast with clear error
  // Maintains SSR compatibility by returning defaults in production
  if (context === SSR_DEFAULTS) {
    if (process.env.NODE_ENV === "development") {
      // Development: throw error to catch integration mistakes early
      throw new Error(
        "useThemeContext must be used within a <ThemeProvider> component.\n\n" +
          "Wrap your app at the root:\n\n" +
          "  import { ThemeProvider } from '@orion-ds/react';\n\n" +
          "  export default function App() {\n" +
          "    return (\n" +
          "      <ThemeProvider>\n" +
          "        <YourComponents />\n" +
          "      </ThemeProvider>\n" +
          "    );\n" +
          "  }",
      );
    }
    // Production: silently return SSR defaults (maintains compatibility)
  }

  return context;
}
