/**
 * Tree Shaker — Remove unused CSS tokens from build output
 *
 * Analyzes which tokens are actually referenced and removes unused
 * variable definitions from :root { } while preserving all component styles.
 */

import type { TokenUsageMap } from "./build-analyzer.js";

/**
 * Remove unused tokens from CSS output
 *
 * Strategy:
 * 1. Extract set of used tokens from usage map
 * 2. Find all :root { } blocks
 * 3. Remove --token definitions that aren't in used set
 * 4. Keep all component CSS unchanged
 * 5. Preserve comments and structure
 */
export function treeShakeTokens(
  cssContent: string,
  usageMap: TokenUsageMap,
): string {
  // Build set of all tokens actually used
  const usedTokens = new Set<string>();

  for (const tokens of Object.values(usageMap)) {
    tokens.forEach((token) => usedTokens.add(token));
  }

  // Process each :root block separately to preserve structure
  let result = cssContent;

  // Match :root { ... } blocks
  const rootRegex = /(:root\s*\{)([^}]+)(\})/gs;

  result = result.replace(rootRegex, (match, opening, content, closing) => {
    // Process variable definitions in this root block
    const varRegex = /--([\w-]+)\s*:\s*[^;]+;/g;

    let processedContent = content;
    let varMatch;

    // Collect all variables to remove
    const toRemove: string[] = [];

    while ((varMatch = varRegex.exec(content)) !== null) {
      const varName = varMatch[1]!;

      // If this token is NOT used, mark it for removal
      if (!usedTokens.has(varName)) {
        toRemove.push(varMatch[0]);
      }
    }

    // Remove unused variable definitions
    for (const varDef of toRemove) {
      processedContent = processedContent.replace(varDef, "");
    }

    // Clean up excess whitespace (multiple newlines)
    processedContent = processedContent.replace(/\n\s*\n\s*\n/g, "\n\n");
    processedContent = processedContent.replace(/\n\s*\n(\s*\})/g, "\n$1");

    return `${opening}${processedContent}${closing}`;
  });

  // Clean up any leftover excess whitespace
  result = result.replace(/\n\s*\n\s*\n/g, "\n\n");

  return result;
}

/**
 * Calculate how many bytes were saved by tree-shaking
 */
export function calculateSavings(
  original: string,
  shaken: string,
): { bytes: number; percentage: number } {
  const originalSize = Buffer.byteLength(original, "utf-8");
  const shakenSize = Buffer.byteLength(shaken, "utf-8");
  const bytes = originalSize - shakenSize;
  const percentage =
    originalSize > 0 ? Math.round((bytes / originalSize) * 100) : 0;

  return { bytes: Math.max(0, bytes), percentage };
}

/**
 * Extract unused tokens (for reporting)
 */
export function getUnusedTokens(
  cssContent: string,
  usageMap: TokenUsageMap,
): string[] {
  const usedTokens = new Set<string>();

  for (const tokens of Object.values(usageMap)) {
    tokens.forEach((token) => usedTokens.add(token));
  }

  const unusedTokens: string[] = [];

  // Find all token definitions in CSS
  const varRegex = /--([\w-]+)\s*:/g;
  let match;

  const checked = new Set<string>();

  while ((match = varRegex.exec(cssContent)) !== null) {
    const varName = match[1]!;

    // Only check each variable once
    if (!checked.has(varName)) {
      checked.add(varName);
      if (!usedTokens.has(varName)) {
        unusedTokens.push(varName);
      }
    }
  }

  return unusedTokens.sort();
}

/**
 * Extract only used tokens into separate file (for optimization)
 * Returns CSS with only :root { } containing used tokens
 */
export function extractUsedTokensOnly(
  cssContent: string,
  usageMap: TokenUsageMap,
): string {
  const usedTokens = new Set<string>();

  for (const tokens of Object.values(usageMap)) {
    tokens.forEach((token) => usedTokens.add(token));
  }

  // Extract all token definitions
  const definitions = new Map<string, string>();

  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(cssContent)) !== null) {
    const varName = match[1]!;
    const varValue = match[2]!.trim();

    if (usedTokens.has(varName)) {
      definitions.set(varName, varValue);
    }
  }

  // Generate :root block with only used tokens
  const tokenLines = Array.from(definitions.entries())
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n");

  return `:root {\n${tokenLines}\n}\n`;
}
