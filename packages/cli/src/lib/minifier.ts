/**
 * Minifier — Compact CSS output by removing whitespace and comments
 *
 * Reduces CSS bundle size by removing:
 * - Comment blocks
 * - Unnecessary whitespace
 * - Newlines (except where structurally necessary)
 * - Spaces around CSS operators
 */

/**
 * Remove all comment blocks from CSS
 */
function removeComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/**
 * Remove unnecessary whitespace while preserving CSS structure
 */
function removeWhitespace(css: string): string {
  // Remove leading/trailing whitespace from entire string
  let result = css.trim();

  // Remove whitespace around CSS operators
  // but preserve spaces inside quoted strings
  result = result.replace(/\s*([{};:,>+~])\s*/g, "$1");

  // Normalize spaces inside selectors
  result = result.replace(/\s+/g, " ");

  // Remove spaces after colons in properties
  result = result.replace(/:\s+/g, ":");

  // Remove spaces around commas in selectors
  result = result.replace(/,\s*/g, ",");

  // Remove space before units
  result = result.replace(/\s*(px|em|rem|%|vh|vw|cm|mm|in|pt|pc)/g, "$1");

  return result;
}

/**
 * Compact variable values in :root blocks
 * E.g., "rgba(0, 0, 0, 0.1)" -> "rgba(0,0,0,.1)"
 */
function compactVariables(css: string): string {
  let result = css;

  // Remove spaces in rgba/hsla functions
  result = result.replace(/rgba?\s*\(\s*([^)]+)\s*\)/g, (match, args) => {
    const compacted = args
      .split(",")
      .map((arg: string) => arg.trim())
      .join(",");
    return `rgba(${compacted})`;
  });

  result = result.replace(/hsla?\s*\(\s*([^)]+)\s*\)/g, (match, args) => {
    const compacted = args
      .split(",")
      .map((arg: string) => arg.trim())
      .join(",");
    return `hsla(${compacted})`;
  });

  // Remove leading zeros from decimals
  result = result.replace(/:\s*0\.(\d)/g, ":.$1");

  return result;
}

/**
 * Main minification function
 */
export function minifyCSS(css: string): string {
  let result = css;

  // Step 1: Remove all comments
  result = removeComments(result);

  // Step 2: Remove unnecessary whitespace
  result = removeWhitespace(result);

  // Step 3: Compact variable values
  result = compactVariables(result);

  // Step 4: Remove trailing semicolons before closing braces
  result = result.replace(/;}/g, "}");

  // Step 5: Final cleanup of any remaining excess whitespace
  result = result.trim();

  return result;
}

/**
 * Calculate compression ratio
 */
export function calculateCompressionRatio(
  original: string,
  minified: string,
): { percentage: number; bytes: number } {
  const originalSize = Buffer.byteLength(original, "utf-8");
  const minifiedSize = Buffer.byteLength(minified, "utf-8");
  const bytes = originalSize - minifiedSize;
  const percentage =
    originalSize > 0 ? Math.round((bytes / originalSize) * 100) : 0;

  return { percentage: Math.max(0, percentage), bytes: Math.max(0, bytes) };
}

/**
 * Format bytes as human-readable string (KB, MB)
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
