/**
 * Orion Design System - Token Utilities
 *
 * Helper functions for working with design tokens in TypeScript.
 */

import type { Theme, Brand, TokenPath, SemanticTokenPath } from "./types";
import { primitives } from "./primitives";
import { themes } from "./themes";
import { brands } from "./brands";

/**
 * Get a primitive token value by path
 *
 * @example
 * getToken('color.brand.orion.500') // "#1B5BFF"
 * getToken('spacing.4') // "16px"
 */
export function getToken(path: TokenPath): string {
  const keys = path.split(".");
  let value: any = primitives;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      throw new Error(`Token path "${path}" not found`);
    }
  }

  return value;
}

/**
 * Get a semantic token value by theme and path
 *
 * @example
 * getSemanticToken('light', 'surface.base') // "#ffffff"
 * getSemanticToken('dark', 'text.primary') // "#ffffff"
 */
export function getSemanticToken(
  theme: Theme,
  path: SemanticTokenPath,
): string {
  const keys = path.split(".");
  let value: any = themes[theme].semantic;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      throw new Error(
        `Semantic token path "${path}" not found in ${theme} theme`,
      );
    }
  }

  // Resolve token references (e.g., "{color.neutral.0}")
  if (
    typeof value === "string" &&
    value.startsWith("{") &&
    value.endsWith("}")
  ) {
    const refPath = value.slice(1, -1);
    return getToken(refPath as TokenPath);
  }

  return value;
}

/**
 * Get brand configuration
 *
 * @example
 * getBrand('orion') // { name: 'orion', accentColor: '#1B5BFF', ... }
 */
export function getBrand(brand: Brand) {
  return brands[brand];
}

/**
 * Generate CSS variable name from semantic path
 *
 * @example
 * toCSSVariable('surface.base') // "--surface-base"
 * toCSSVariable('text.primary') // "--text-primary"
 */
export function toCSSVariable(path: SemanticTokenPath): string {
  return `--${path.replace(/\./g, "-")}`;
}

/**
 * Type guard for valid theme
 */
export function isValidTheme(value: string): value is Theme {
  return value === "light" || value === "dark";
}

/**
 * Type guard for valid brand
 */
export function isValidBrand(value: string): value is Brand {
  return value in brands;
}
