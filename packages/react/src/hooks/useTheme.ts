/**
 * useTheme Hook
 *
 * React hook for managing theme and brand state in Orion Design System.
 *
 * @example
 * ```tsx
 * function App() {
 *   const { theme, brand, setTheme, setBrand } = useTheme();
 *
 *   return (
 *     <div>
 *       <button onClick={() => setTheme('dark')}>
 *         Switch to {theme === 'light' ? 'dark' : 'light'} mode
 *       </button>
 *       <button onClick={() => setBrand('red')}>
 *         Switch to Red brand
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */

import { useEffect, useState, useCallback } from "react";

// Local type definitions
export type Theme = "light" | "dark";
export type Brand = "orion" | "red" | "deepblue" | "orange" | "ember" | "lemon";

// Local validation functions
const isValidTheme = (value: string): value is Theme => {
  return value === "light" || value === "dark";
};

const isValidBrand = (value: string): value is Brand => {
  return ["orion", "red", "deepblue", "orange", "ember", "lemon"].includes(
    value,
  );
};

export interface UseThemeOptions {
  /**
   * Default theme to use
   * @default 'light'
   */
  defaultTheme?: Theme;

  /**
   * Default brand to use
   * @default 'orion'
   */
  defaultBrand?: Brand;

  /**
   * Store theme preference in localStorage
   * @default true
   */
  storageEnabled?: boolean;

  /**
   * localStorage key for theme
   * @default 'orion-theme'
   */
  storageKey?: string;

  /**
   * localStorage key for brand
   * @default 'orion-brand'
   */
  brandStorageKey?: string;
}

export interface UseThemeReturn {
  /** Current theme */
  theme: Theme;

  /** Current brand */
  brand: Brand;

  /** Set theme */
  setTheme: (theme: Theme) => void;

  /** Set brand */
  setBrand: (brand: Brand) => void;

  /** Toggle between light and dark themes */
  toggleTheme: () => void;

  /** Check if current theme is dark */
  isDark: boolean;

  /** Check if current theme is light */
  isLight: boolean;
}

/**
 * Hook for managing theme and brand state
 */
export function useTheme(options: UseThemeOptions = {}): UseThemeReturn {
  const {
    defaultTheme = "light",
    defaultBrand = "orion",
    storageEnabled = true,
    storageKey = "orion-theme",
    brandStorageKey = "orion-brand",
  } = options;

  // Always initialize with server-safe defaults to prevent hydration mismatch.
  // Reading from localStorage in the lazy initializer would cause the server
  // to render one value (defaultTheme) and the client to render another
  // (stored value), breaking React hydration.
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [brand, setBrandState] = useState<Brand>(defaultBrand);

  // Set theme and update DOM
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);

      if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-theme", newTheme);

        if (storageEnabled) {
          localStorage.setItem(storageKey, newTheme);
        }
      }
    },
    [storageEnabled, storageKey],
  );

  // Set brand and update DOM
  const setBrand = useCallback(
    (newBrand: Brand) => {
      setBrandState(newBrand);

      if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-brand", newBrand);

        if (storageEnabled) {
          localStorage.setItem(brandStorageKey, newBrand);
        }
      }
    },
    [storageEnabled, brandStorageKey],
  );

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  // Update DOM on mount and when theme/brand changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.setAttribute("data-brand", brand);
    }
  }, [theme, brand]);

  // Rehydrate from localStorage after mount (SSR-safe pattern).
  // This effect runs only on the client after React has hydrated the server HTML.
  // By deferring localStorage reads to after hydration, we ensure the server
  // and client's first render always match (both use defaultTheme/defaultBrand).
  useEffect(() => {
    if (!storageEnabled) return;

    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme && isValidTheme(storedTheme)) {
      setThemeState(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    }

    const storedBrand = localStorage.getItem(brandStorageKey);
    if (storedBrand && isValidBrand(storedBrand)) {
      setBrandState(storedBrand);
      document.documentElement.setAttribute("data-brand", storedBrand);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount for SSR hydration

  // Listen to system theme preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !storageEnabled) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(storageKey);
      if (!stored) {
        // Only auto-switch if user hasn't set a preference
        setTheme(e.matches ? "dark" : "light");
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [storageEnabled, storageKey, setTheme]);

  return {
    theme,
    brand,
    setTheme,
    setBrand,
    toggleTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
}
