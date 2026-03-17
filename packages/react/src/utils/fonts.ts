/**
 * Font Configuration for Orion Design System
 *
 * This module provides font URLs and utilities for loading Google Fonts
 * required by each brand in the design system.
 *
 * @example
 * ```tsx
 * import { GOOGLE_FONTS_URL, BRAND_FONTS } from '@orion-ds/react';
 *
 * // Add to your HTML <head>
 * <link href={GOOGLE_FONTS_URL} rel="stylesheet" />
 *
 * // Or check which fonts a brand needs
 * console.log(BRAND_FONTS.lemon); // ['Anton', 'Work Sans', 'JetBrains Mono']
 * ```
 */

import type { Brand } from "../hooks/useTheme";

/**
 * Font families used by each brand
 */
export const BRAND_FONTS: Record<Brand, string[]> = {
  orion: ["Libre Baskerville", "Inter", "JetBrains Mono"],
  deepblue: ["Work Sans", "JetBrains Mono"],
  red: ["Poppins", "Inter", "JetBrains Mono"],
  orange: ["DM Sans", "Inter", "JetBrains Mono"],
  ember: ["DM Sans", "Inter", "JetBrains Mono"],
  lemon: ["Anton", "Work Sans", "JetBrains Mono"],
};

/**
 * All unique font families used across all brands
 */
export const ALL_FONTS = [
  "Libre Baskerville",
  "DM Sans",
  "Inter",
  "JetBrains Mono",
  "Work Sans",
  "Poppins",
  "Anton",
] as const;

/**
 * Google Fonts URL with all fonts needed for all brands
 *
 * Add this to your HTML <head>:
 * ```html
 * <link rel="preconnect" href="https://fonts.googleapis.com">
 * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 * <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
 * ```
 */
export const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?" +
  "family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&" +
  "family=DM+Sans:wght@400;500;700&" +
  "family=Inter:wght@400;500;700&" +
  "family=JetBrains+Mono:wght@400;500&" +
  "family=Work+Sans:wght@400;500;700&" +
  "family=Poppins:wght@400;500;700&" +
  "family=Anton&" +
  "display=swap";

/**
 * Preconnect URLs for faster font loading
 */
export const FONT_PRECONNECT_URLS = [
  "https://fonts.googleapis.com",
  "https://fonts.gstatic.com",
] as const;

/**
 * Check if a font is loaded in the document
 */
export function isFontLoaded(fontFamily: string): boolean {
  if (typeof document === "undefined") return true;

  try {
    return document.fonts.check(`16px "${fontFamily}"`);
  } catch {
    // Fallback for browsers that don't support document.fonts
    return true;
  }
}

/**
 * Check if all fonts for a brand are loaded
 */
export function areBrandFontsLoaded(brand: Brand): boolean {
  const fonts = BRAND_FONTS[brand];
  return fonts.every(isFontLoaded);
}

/**
 * Get missing fonts for a brand
 */
export function getMissingFonts(brand: Brand): string[] {
  const fonts = BRAND_FONTS[brand];
  return fonts.filter((font) => !isFontLoaded(font));
}

/**
 * Wait for fonts to be loaded
 */
export async function waitForFonts(fonts: string[]): Promise<boolean> {
  if (typeof document === "undefined") return true;

  try {
    await Promise.all(
      fonts.map((font) => document.fonts.load(`16px "${font}"`)),
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate the HTML link tags for Google Fonts
 */
export function getFontLinkTags(): string {
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${GOOGLE_FONTS_URL}" rel="stylesheet">`;
}
