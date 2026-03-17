/**
 * Orion Design System - Theme Semantic Tokens
 *
 * Auto-generated from light.json and dark.json.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 */

import type { ThemeConfig } from "./types";

export const lightTheme: ThemeConfig = {
  theme: "light",
  semantic: {
    surface: {
      base: "{color.neutral.0}",
      subtle: "{color.neutral.50}",
      layer: "{color.neutral.100}",
      primary: "{color.neutral.100}",
      secondary: "{color.neutral.50}",
      glass: "color-mix(in srgb, {color.neutral.0} 70%, transparent)",
      sunken: "color-mix(in srgb, {color.neutral.0} 40%, transparent)",
      overlay: "color-mix(in srgb, {color.neutral.1000} 50%, transparent)",
    },
    text: {
      primary: "{color.neutral.900}",
      secondary: "{color.neutral.500}",
      tertiary: "{color.neutral.400}",
      inverse: "{color.neutral.0}",
      brand: "{color.brand.500}",
      "on-brand": {
        primary: "{color.neutral.0}",
        secondary: "color-mix(in srgb, {color.neutral.0} 90%, transparent)",
        tertiary: "color-mix(in srgb, {color.neutral.0} 70%, transparent)",
      },
    },
    border: {
      subtle: "{color.neutral.200}",
      strong: "{color.neutral.300}",
      interactive: "{color.brand.500}",
    },
    interactive: {
      primary: {
        default: "{color.brand.500}",
        hover: "{color.brand.700}",
        text: "{color.neutral.0}",
      },
      secondary: {
        default: "{color.neutral.100}",
        hover: "{color.neutral.200}",
        text: "{color.neutral.900}",
      },
      ghost: {
        hover: "color-mix(in srgb, {color.neutral.1000} 5%, transparent)",
      },
    },
    status: {
      error: "{color.error.500}",
      success: "{color.success.500}",
      warning: "{color.warning.500}",
      info: "{color.info.500}",
    },
    soft: {
      brand: "color-mix(in srgb, {color.brand.500} 10%, transparent)",
      "brand-hover": "color-mix(in srgb, {color.brand.500} 20%, transparent)",
      success: "color-mix(in srgb, {color.success.500} 10%, transparent)",
      error: "color-mix(in srgb, {color.error.500} 10%, transparent)",
      warning: "color-mix(in srgb, {color.warning.500} 10%, transparent)",
      info: "color-mix(in srgb, {color.info.500} 10%, transparent)",
    },
    focus: {
      ring: "0 0 0 3px color-mix(in srgb, {color.brand.500} 40%, transparent)",
    },
    gradient: {
      start: "{color.brand.400}",
      end: "{color.brand.600}",
    },
    chart: {
      "1": "{color.brand.500}",
      "2": "{color.brand.300}",
      "3": "{color.brand.700}",
      "4": "{color.success.500}",
      "5": "{color.warning.500}",
    },
  },
} as const;

export const darkTheme: ThemeConfig = {
  theme: "dark",
  semantic: {
    surface: {
      base: "{color.neutral.900}",
      subtle: "{color.neutral.950}",
      layer: "{color.neutral.900}",
      primary: "{color.neutral.900}",
      secondary: "{color.neutral.900}",
      glass: "color-mix(in srgb, {color.neutral.950} 60%, transparent)",
      sunken: "color-mix(in srgb, {color.neutral.950} 40%, transparent)",
      overlay: "color-mix(in srgb, {color.neutral.1000} 70%, transparent)",
    },
    text: {
      primary: "{color.neutral.50}",
      secondary: "{color.neutral.400}",
      tertiary: "{color.neutral.600}",
      inverse: "{color.neutral.950}",
      brand: "{color.brand.400}",
      "on-brand": {
        primary: "{color.neutral.0}",
        secondary: "color-mix(in srgb, {color.neutral.0} 90%, transparent)",
        tertiary: "color-mix(in srgb, {color.neutral.0} 70%, transparent)",
      },
    },
    border: {
      subtle: "{color.neutral.800}",
      strong: "{color.neutral.700}",
      interactive: "{color.brand.500}",
    },
    interactive: {
      primary: {
        default: "{color.brand.500}",
        hover: "{color.brand.400}",
        text: "{color.neutral.900}",
      },
      secondary: {
        default: "{color.neutral.800}",
        hover: "{color.neutral.700}",
        text: "{color.neutral.50}",
      },
      ghost: {
        hover: "color-mix(in srgb, {color.neutral.0} 10%, transparent)",
      },
    },
    status: {
      error: "{color.error.500}",
      success: "{color.success.500}",
      warning: "{color.warning.500}",
      info: "{color.info.500}",
    },
    soft: {
      brand: "color-mix(in srgb, {color.brand.500} 15%, transparent)",
      "brand-hover": "color-mix(in srgb, {color.brand.500} 25%, transparent)",
      success: "color-mix(in srgb, {color.success.500} 15%, transparent)",
      error: "color-mix(in srgb, {color.error.500} 15%, transparent)",
      warning: "color-mix(in srgb, {color.warning.500} 15%, transparent)",
      info: "color-mix(in srgb, {color.info.500} 15%, transparent)",
    },
    focus: {
      ring: "0 0 0 3px color-mix(in srgb, {color.brand.500} 50%, transparent)",
    },
    gradient: {
      start: "{color.brand.400}",
      end: "{color.brand.600}",
    },
    chart: {
      "1": "{color.brand.400}",
      "2": "{color.brand.200}",
      "3": "{color.brand.600}",
      "4": "{color.success.500}",
      "5": "{color.warning.500}",
    },
  },
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
