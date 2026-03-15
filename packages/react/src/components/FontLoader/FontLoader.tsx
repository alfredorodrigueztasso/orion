"use client";

/**
 * FontLoader Component
 *
 * Automatically injects Google Fonts into the document head.
 * This ensures all brand fonts are available without manual HTML setup.
 *
 * **Note:** Since v1.1.4, ThemeProvider includes FontLoader automatically.
 * You don't need to add this component manually unless you've disabled
 * auto font loading with `disableAutoFontLoading` prop.
 *
 * @example
 * ```tsx
 * // ThemeProvider loads fonts automatically - no FontLoader needed!
 * import { ThemeProvider } from '@orion-ds/react';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <YourComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Use standalone only if you need callbacks or custom loading behavior
 * <FontLoader onLoad={() => console.log('Fonts ready!')} />
 * ```
 */

import { useEffect, useState } from "react";
import {
  GOOGLE_FONTS_URL,
  FONT_PRECONNECT_URLS,
  ALL_FONTS,
  waitForFonts,
} from "../../utils/fonts";

export interface FontLoaderProps {
  /**
   * Callback when fonts are loaded
   */
  onLoad?: () => void;

  /**
   * Callback when fonts fail to load
   */
  onError?: (error: Error) => void;

  /**
   * Show loading state while fonts are loading
   * @default false
   */
  showLoadingState?: boolean;

  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;

  /**
   * Children to render (will wait for fonts if showLoadingState is true)
   */
  children?: React.ReactNode;
}

/**
 * FontLoader - Injects Google Fonts into the document head
 *
 * Place this component near the root of your app to ensure
 * all brand fonts are loaded automatically.
 */
export function FontLoader({
  onLoad,
  onError,
  showLoadingState = false,
  loadingComponent,
  children,
}: FontLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInjected, setIsInjected] = useState(false);

  // Inject font links into head
  useEffect(() => {
    if (typeof document === "undefined" || isInjected) return;

    const head = document.head;

    // Check if fonts are already loaded
    const existingLink = head.querySelector(
      `link[href*="fonts.googleapis.com"]`,
    );
    if (existingLink) {
      setIsInjected(true);
      setIsLoaded(true);
      onLoad?.();
      return;
    }

    try {
      // Add preconnect links for faster loading
      FONT_PRECONNECT_URLS.forEach((url, index) => {
        const preconnect = document.createElement("link");
        preconnect.rel = "preconnect";
        preconnect.href = url;
        if (index === 1) {
          preconnect.crossOrigin = "anonymous";
        }
        preconnect.setAttribute("data-orion-fonts", "preconnect");
        head.appendChild(preconnect);
      });

      // Add Google Fonts stylesheet
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = GOOGLE_FONTS_URL;
      link.setAttribute("data-orion-fonts", "stylesheet");

      link.onload = async () => {
        // Wait for fonts to actually be ready
        try {
          await waitForFonts([...ALL_FONTS]);
          setIsLoaded(true);
          onLoad?.();
        } catch {
          // Fonts might still work, just not all loaded
          setIsLoaded(true);
          onLoad?.();
        }
      };

      link.onerror = () => {
        const error = new Error("Failed to load Google Fonts");
        console.error("[Orion] Failed to load fonts from Google Fonts");
        onError?.(error);
        setIsLoaded(true); // Still allow rendering
      };

      head.appendChild(link);
      setIsInjected(true);
    } catch (err) {
      console.error("[Orion] Error injecting font links:", err);
      onError?.(
        err instanceof Error ? err : new Error("Font injection failed"),
      );
      setIsLoaded(true);
    }
  }, [isInjected, onLoad, onError]);

  // If showLoadingState is enabled, wait for fonts
  if (showLoadingState && !isLoaded) {
    return loadingComponent ? <>{loadingComponent}</> : null;
  }

  return children ? <>{children}</> : null;
}

FontLoader.displayName = "FontLoader";
