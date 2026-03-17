/**
 * useResolvedChartColors
 *
 * Resolves CSS variable chains in ChartConfig to concrete color values
 * (hex/rgb) via getComputedStyle. This is necessary because SVG presentation
 * attributes (fill, stroke, stopColor) don't reliably resolve multi-level
 * CSS custom property chains like:
 *   var(--chart-1) → var(--color-brand-500) → #1B5BFF
 *
 * The hook also observes `data-theme` and `data-brand` attribute changes
 * on <html> to re-resolve colors when the user switches theme or brand.
 */

import { useState, useEffect } from "react";
import type { ChartConfig } from "./Chart.types";

/** Strip `var(...)` wrapper and return the custom property name, or null */
function extractCSSVarName(value: string): string | null {
  const match = value.match(/^var\(\s*(--[^),]+)\s*(?:,\s*.*)?\)$/);
  return match?.[1] ?? null;
}

/** Resolve a single color string — if it's a CSS variable, compute it */
function resolveColor(value: string): string {
  if (typeof window === "undefined") return value;

  const varName = extractCSSVarName(value);
  if (!varName) return value; // already a literal color

  const resolved = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();

  return resolved || value; // fallback to original if empty
}

/** Build resolved config + CSS variable map from a ChartConfig */
function resolveConfig(config: ChartConfig) {
  const resolvedConfig: ChartConfig = {};
  const resolvedColorVars: Record<string, string> = {};

  for (const [key, item] of Object.entries(config)) {
    const resolved = resolveColor(item.color);
    resolvedConfig[key] = { ...item, color: resolved };
    resolvedColorVars[`--color-${key}`] = resolved;
  }

  return { resolvedConfig, resolvedColorVars };
}

export function useResolvedChartColors(config: ChartConfig) {
  // Synchronous initial resolution (no flash on first paint)
  const [state, setState] = useState(() => resolveConfig(config));

  // Re-resolve when config changes
  useEffect(() => {
    setState(resolveConfig(config));
  }, [config]);

  // Re-resolve when theme or brand changes on <html>
  useEffect(() => {
    if (typeof window === "undefined") return;

    const htmlEl = document.documentElement;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "data-theme" ||
            mutation.attributeName === "data-brand")
        ) {
          setState(resolveConfig(config));
          break;
        }
      }
    });

    observer.observe(htmlEl, {
      attributes: true,
      attributeFilter: ["data-theme", "data-brand"],
    });

    return () => observer.disconnect();
  }, [config]);

  return state;
}
