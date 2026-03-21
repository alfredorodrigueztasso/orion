/**
 * Build Analyzer — Extract token references from component CSS files
 *
 * Scans all .module.css files in component directory and identifies which
 * design tokens (CSS variables) are referenced in each component.
 */

import * as fs from "node:fs";
import * as path from "node:path";

export interface TokenUsageMap {
  [componentName: string]: string[];
}

export interface ComponentAnalysis {
  name: string;
  path: string;
  cssSize: number;
  tokens: string[];
}

/**
 * Extract all token references from CSS content
 * Matches patterns like: var(--token-name)
 */
function extractTokens(cssContent: string): string[] {
  const tokenRegex = /var\(--[\w-]+\)/g;
  const matches = cssContent.match(tokenRegex) || [];

  // Remove duplicates and extract token name (remove 'var(' and ')')
  const tokens = new Set(matches.map((match) => match.slice(4, -1)));

  return Array.from(tokens).sort();
}

/**
 * Find all .module.css files in a directory
 */
function findModuleCSSFiles(dir: string): string[] {
  const cssFiles: string[] = [];

  function walk(currentDir: string): void {
    try {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
          // Recursively walk subdirectories
          walk(fullPath);
        } else if (entry.name.endsWith(".module.css")) {
          cssFiles.push(fullPath);
        }
      }
    } catch {
      // Skip directories we can't read
    }
  }

  walk(dir);
  return cssFiles;
}

/**
 * Extract component name from file path
 * E.g., src/components/orion/button/Button.module.css -> button
 */
function extractComponentName(filePath: string): string {
  const parts = filePath.split(path.sep);

  // Find the part before .module.css (usually the component folder)
  for (let i = parts.length - 1; i >= 0; i--) {
    if (parts[i] && !parts[i].includes(".")) {
      // Return the first folder-like name before .module.css
      return parts[i].toLowerCase();
    }
  }

  return path.basename(filePath, ".module.css").toLowerCase();
}

/**
 * Analyze all components in a directory
 * Returns mapping of component names to their token references
 */
export function analyzeComponents(componentDir: string): {
  usageMap: TokenUsageMap;
  components: ComponentAnalysis[];
  totalTokens: Set<string>;
} {
  const usageMap: TokenUsageMap = {};
  const components: ComponentAnalysis[] = [];
  const totalTokens = new Set<string>();

  // Find all CSS files
  const cssFiles = findModuleCSSFiles(componentDir);

  if (cssFiles.length === 0) {
    return { usageMap, components, totalTokens };
  }

  // Process each CSS file
  for (const cssFile of cssFiles) {
    try {
      const cssContent = fs.readFileSync(cssFile, "utf-8");
      const tokens = extractTokens(cssContent);
      const componentName = extractComponentName(cssFile);

      // Store usage map
      usageMap[componentName] = tokens;

      // Track all unique tokens
      tokens.forEach((token) => totalTokens.add(token));

      // Store component analysis
      components.push({
        name: componentName,
        path: cssFile,
        cssSize: Buffer.byteLength(cssContent, "utf-8"),
        tokens,
      });
    } catch {
      // Skip files we can't read
    }
  }

  return { usageMap, components, totalTokens };
}

/**
 * Count how many tokens are actually used
 */
export function countUsedTokens(usageMap: TokenUsageMap): number {
  const usedTokens = new Set<string>();

  for (const tokens of Object.values(usageMap)) {
    tokens.forEach((token) => usedTokens.add(token));
  }

  return usedTokens.size;
}

/**
 * Merge all component CSS content into a single string
 */
export function loadComponentCSS(componentDir: string): string {
  const cssFiles = findModuleCSSFiles(componentDir);
  const cssContents: string[] = [];

  for (const cssFile of cssFiles) {
    try {
      const content = fs.readFileSync(cssFile, "utf-8");
      cssContents.push(content);
    } catch {
      // Skip files we can't read
    }
  }

  return cssContents.join("\n");
}

/**
 * Extract primitive token definitions from CSS
 * Returns all :root { --token: value; } declarations
 */
export function extractTokenDefinitions(
  cssContent: string,
): Map<string, string> {
  const definitions = new Map<string, string>();

  // Match :root { ... }
  const rootRegex = /:root\s*\{([^}]+)\}/gs;
  const rootMatch = rootRegex.exec(cssContent);

  if (!rootMatch) {
    return definitions;
  }

  const rootContent = rootMatch[1];

  // Match individual variable definitions: --name: value;
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g;
  let match;

  while ((match = varRegex.exec(rootContent)) !== null) {
    const varName = match[1]!;
    const varValue = match[2]!.trim();
    definitions.set(varName, varValue);
  }

  return definitions;
}
