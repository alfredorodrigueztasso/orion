/**
 * Reporter — Generate build analysis reports and statistics
 *
 * Creates JSON analysis files and formats console output with
 * build statistics, recommendations, and optimization insights.
 */

import type { TokenUsageMap, ComponentAnalysis } from "./build-analyzer.js";
import * as fs from "node:fs";
import { formatBytes } from "./minifier.js";

export interface BuildStatistics {
  timestamp: string;
  projectName: string;
  buildTime: number;
  components: {
    name: string;
    path: string;
    cssSize: string;
    tokensReferenced: number;
  }[];
  tokens: {
    total: number;
    referenced: number;
    percentage: number;
    byCategory: {
      colors: number;
      spacing: number;
      typography: number;
      radius: number;
      effects: number;
      other: number;
    };
  };
  bundleSize: {
    original: string;
    minified: string;
    reduction: string;
    gzipped?: string;
  };
  recommendations: string[];
}

/**
 * Estimate gzip compression ratio (without actually compressing)
 * Formula: assume ~60-70% compression for repeated patterns
 */
export function estimateGzipSize(original: string): number {
  const originalSize = Buffer.byteLength(original, "utf-8");
  // Conservative estimate: 70% reduction for highly repetitive CSS
  return Math.round(originalSize * 0.3);
}

/**
 * Categorize tokens into groups
 */
function categorizeTokens(tokens: string[]): {
  colors: number;
  spacing: number;
  typography: number;
  radius: number;
  effects: number;
  other: number;
} {
  const categories = {
    colors: 0,
    spacing: 0,
    typography: 0,
    radius: 0,
    effects: 0,
    other: 0,
  };

  for (const token of tokens) {
    if (
      token.includes("color") ||
      token.includes("text") ||
      token.includes("background")
    ) {
      categories.colors++;
    } else if (token.includes("spacing") || token.includes("gap")) {
      categories.spacing++;
    } else if (
      token.includes("font") ||
      token.includes("size") ||
      token.includes("weight")
    ) {
      categories.typography++;
    } else if (token.includes("radius")) {
      categories.radius++;
    } else if (
      token.includes("shadow") ||
      token.includes("blur") ||
      token.includes("effect")
    ) {
      categories.effects++;
    } else {
      categories.other++;
    }
  }

  return categories;
}

/**
 * Generate recommendations based on analysis
 */
function generateRecommendations(
  stats: BuildStatistics,
  unusedTokenCount: number,
): string[] {
  const recommendations: string[] = [];

  // Recommend tree-shaking if many tokens are unused
  if (stats.tokens.percentage < 30) {
    recommendations.push(
      `Tree-shaking could remove ${unusedTokenCount} unused tokens (${Math.round((unusedTokenCount / stats.tokens.total) * 100)}% reduction)`,
    );
  }

  // Recommend adding more components if CSS is still large
  const originalSize = parseInt(stats.bundleSize.original.replace(/\D/g, ""));
  if (originalSize > 20) {
    recommendations.push(
      "Consider adding more components to better amortize token definitions",
    );
  }

  // Recommend importing only index.css
  recommendations.push('Import only the generated index.css in your app root');

  return recommendations;
}

/**
 * Generate build analysis report
 */
export function generateReport(
  usageMap: TokenUsageMap,
  components: ComponentAnalysis[],
  originalCSS: string,
  minifiedCSS: string,
  buildTimeMs: number = 0,
): BuildStatistics {
  const allTokens = new Set<string>();
  const usedTokens = new Set<string>();

  // Collect all unique tokens referenced
  for (const tokens of Object.values(usageMap)) {
    tokens.forEach((token) => {
      usedTokens.add(token);
    });
  }

  // For now, estimate total tokens from original CSS
  const varRegex = /--([\w-]+):/g;
  let match;
  while ((match = varRegex.exec(originalCSS)) !== null) {
    allTokens.add(match[1]!);
  }

  const totalTokens = allTokens.size;
  const referencedTokens = usedTokens.size;
  const percentage =
    totalTokens > 0 ? Math.round((referencedTokens / totalTokens) * 100) : 0;

  const originalSize = Buffer.byteLength(originalCSS, "utf-8");
  const minifiedSize = Buffer.byteLength(minifiedCSS, "utf-8");
  const reduction =
    originalSize > 0
      ? Math.round(((originalSize - minifiedSize) / originalSize) * 100)
      : 0;

  const gzipSize = estimateGzipSize(minifiedCSS);

  const stats: BuildStatistics = {
    timestamp: new Date().toISOString(),
    projectName: "my-app", // Could be extracted from package.json
    buildTime: buildTimeMs,
    components: components.map((c) => ({
      name: c.name,
      path: c.path,
      cssSize: formatBytes(c.cssSize),
      tokensReferenced: c.tokens.length,
    })),
    tokens: {
      total: totalTokens,
      referenced: referencedTokens,
      percentage,
      byCategory: categorizeTokens(Array.from(usedTokens)),
    },
    bundleSize: {
      original: formatBytes(originalSize),
      minified: formatBytes(minifiedSize),
      reduction: `${reduction}%`,
      gzipped: formatBytes(gzipSize),
    },
    recommendations: generateRecommendations(
      {} as BuildStatistics,
      totalTokens - referencedTokens,
    ),
  };

  return stats;
}

/**
 * Format statistics for console output
 */
export function formatStatsForConsole(stats: BuildStatistics): string[] {
  const lines: string[] = [];

  lines.push("");
  lines.push("📊 Build Summary");
  lines.push("─".repeat(50));

  // Components
  lines.push(`Components analyzed: ${stats.components.length}`);
  for (const comp of stats.components) {
    lines.push(`  • ${comp.name}: ${comp.tokensReferenced} tokens`);
  }

  // Tokens
  lines.push("");
  lines.push(`Tokens: ${stats.tokens.referenced}/${stats.tokens.total} used (${stats.tokens.percentage}%)`);
  lines.push(`  Colors: ${stats.tokens.byCategory.colors}`);
  lines.push(`  Spacing: ${stats.tokens.byCategory.spacing}`);
  lines.push(`  Typography: ${stats.tokens.byCategory.typography}`);
  lines.push(`  Radius: ${stats.tokens.byCategory.radius}`);
  lines.push(`  Effects: ${stats.tokens.byCategory.effects}`);
  lines.push(`  Other: ${stats.tokens.byCategory.other}`);

  // Bundle size
  lines.push("");
  lines.push("Bundle Size:");
  lines.push(`  Original:  ${stats.bundleSize.original}`);
  lines.push(`  Minified:  ${stats.bundleSize.minified}`);
  lines.push(`  Reduction: ${stats.bundleSize.reduction}`);
  if (stats.bundleSize.gzipped) {
    lines.push(`  Gzipped:   ${stats.bundleSize.gzipped}`);
  }

  // Build time
  if (stats.buildTime > 0) {
    lines.push("");
    lines.push(`Build time: ${stats.buildTime}ms`);
  }

  // Recommendations
  if (stats.recommendations.length > 0) {
    lines.push("");
    lines.push("💡 Recommendations:");
    for (const rec of stats.recommendations) {
      lines.push(`  • ${rec}`);
    }
  }

  return lines;
}

/**
 * Write analysis report to file
 */
export function writeAnalysisReport(
  stats: BuildStatistics,
  outputPath: string,
): void {
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2) + "\n", "utf-8");
}
