/**
 * orion build — Optimize components for production
 *
 * Analyzes copied components, tree-shakes unused tokens,
 * minifies CSS, and generates bundle analysis reports.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { loadConfig } from "../lib/config.js";
import * as logger from "../lib/logger.js";
import {
  analyzeComponents,
  loadComponentCSS,
  countUsedTokens,
} from "../lib/build-analyzer.js";
import { treeShakeTokens, calculateSavings, getUnusedTokens } from "../lib/tree-shaker.js";
import { minifyCSS, calculateCompressionRatio, formatBytes } from "../lib/minifier.js";
import {
  generateReport,
  formatStatsForConsole,
  writeAnalysisReport,
} from "../lib/reporter.js";

interface BuildArgs {
  analyze: boolean;
  minify: boolean;
  treeShakeTokens: boolean;
  outputDir: string;
  watch: boolean;
  statsOnly: boolean;
  verbose: boolean;
  help: boolean;
}

/**
 * Parse command-line arguments
 */
function parseArgs(args: string[]): BuildArgs {
  let analyze = false;
  let minify = true;
  let treeShakeTokens = true;
  let outputDir = ".orion-build";
  let watch = false;
  let statsOnly = false;
  let verbose = false;
  let help = false;

  for (const arg of args) {
    if (arg === "--analyze") {
      analyze = true;
    } else if (arg === "--no-minify") {
      minify = false;
    } else if (arg === "--no-tree-shake-tokens") {
      treeShakeTokens = false;
    } else if (arg === "--watch") {
      watch = true;
    } else if (arg === "--stats-only") {
      statsOnly = true;
    } else if (arg === "--verbose") {
      verbose = true;
    } else if (arg === "--help" || arg === "-h") {
      help = true;
    } else if (arg.startsWith("--output-dir=")) {
      outputDir = arg.split("=")[1]!;
    }
  }

  return {
    analyze,
    minify,
    treeShakeTokens,
    outputDir,
    watch,
    statsOnly,
    verbose,
    help,
  };
}

/**
 * Show help text
 */
function showHelp(): void {
  console.log(`
  ${logger.bold("orion build")} — Optimize components for production

  ${logger.bold("Usage:")}
    orion build [options]

  ${logger.bold("Options:")}
    --analyze                Generate build analysis report (JSON)
    --no-minify              Skip CSS minification
    --no-tree-shake-tokens   Keep all tokens (disable tree-shaking)
    --watch                  Watch for changes and rebuild
    --stats-only             Show stats without writing files
    --verbose                Detailed logging
    --output-dir=<path>      Output directory (default: .orion-build)
    --help, -h               Show this help text

  ${logger.bold("Examples:")}
    orion build
    orion build --analyze
    orion build --no-tree-shake-tokens --verbose
    orion build --watch
    orion build --output-dir=build/orion

  ${logger.bold("Output:")}
    .orion-build/index.css              Optimized CSS (with tree-shaking & minification)
    .orion-build/variables.css          Used tokens only
    .orion-build/build-analysis.json    (with --analyze flag)
`);
}

/**
 * Validate build environment
 */
function validateEnvironment(config: any): void {
  // Verify component directory exists
  const componentDir = config.componentDir;

  if (!fs.existsSync(componentDir)) {
    throw new Error(
      `Component directory not found: ${componentDir}\nRun 'orion add <name>' first.`,
    );
  }

  // Check if any components are installed
  const entries = fs.readdirSync(componentDir);
  if (entries.length === 0) {
    throw new Error(
      `No components found in ${componentDir}\nRun 'orion add <name>' first.`,
    );
  }
}

/**
 * Ensure output directory exists and is writable
 */
function ensureOutputDir(outputDir: string): void {
  try {
    fs.mkdirSync(outputDir, { recursive: true });

    // Test write permission
    const testFile = path.join(outputDir, ".orion-build-test");
    fs.writeFileSync(testFile, "", "utf-8");
    fs.unlinkSync(testFile);
  } catch (err) {
    throw new Error(
      `Cannot write to output directory: ${outputDir}\nCheck permissions.`,
    );
  }
}

/**
 * Perform a single build
 */
async function performBuild(
  componentDir: string,
  outputDir: string,
  args: BuildArgs,
): Promise<number> {
  const startTime = Date.now();

  // Step 1: Analyze components
  let spin = logger.spinner("Analyzing components...");

  const { usageMap, components, totalTokens } = analyzeComponents(componentDir);

  if (components.length === 0) {
    spin.stop();
    logger.error("No components found");
    throw new Error("No .module.css files found in component directory");
  }

  spin.stop();
  logger.success(`Found ${components.length} component${components.length !== 1 ? "s" : ""}`);

  if (args.verbose) {
    for (const comp of components) {
      logger.info(`  ${logger.cyan(comp.name)}: ${comp.tokens.length} tokens`);
    }
  }

  // Step 2: Load component CSS
  spin = logger.spinner("Loading component CSS...");
  const originalCSS = loadComponentCSS(componentDir);
  spin.stop();
  logger.success("CSS loaded");

  // Step 3: Tree-shake tokens (if enabled)
  let processedCSS = originalCSS;
  let treeShakeSavings = { bytes: 0, percentage: 0 };

  if (args.treeShakeTokens) {
    spin = logger.spinner("Tree-shaking unused tokens...");
    processedCSS = treeShakeTokens(originalCSS, usageMap);
    treeShakeSavings = calculateSavings(originalCSS, processedCSS);
    spin.stop();
    logger.success(
      `Removed ${getUnusedTokens(originalCSS, usageMap).length} unused tokens (${treeShakeSavings.percentage}% reduction)`,
    );
  }

  // Step 4: Minify CSS (if enabled)
  let minifiedCSS = processedCSS;
  let minifySavings = { bytes: 0, percentage: 0 };

  if (args.minify) {
    spin = logger.spinner("Minifying CSS...");
    minifiedCSS = minifyCSS(processedCSS);
    minifySavings = calculateCompressionRatio(processedCSS, minifiedCSS);
    spin.stop();
    logger.success(
      `Minification: ${formatBytes(minifySavings.bytes)} saved (${minifySavings.percentage}% reduction)`,
    );
  }

  // Step 5: Skip file writing if stats-only
  if (!args.statsOnly) {
    spin = logger.spinner("Writing output files...");
    ensureOutputDir(outputDir);

    // Write main CSS file
    const cssPath = path.join(outputDir, "index.css");
    fs.writeFileSync(cssPath, minifiedCSS, "utf-8");

    // Write variables-only file
    const varPath = path.join(outputDir, "variables.css");
    const usedTokensOnly = extractUsedTokensCSS(originalCSS, usageMap);
    fs.writeFileSync(varPath, usedTokensOnly, "utf-8");

    spin.stop();
    logger.success(`Build artifacts written to ${logger.cyan(outputDir)}`);

    if (args.verbose) {
      logger.info(`  ${logger.cyan(cssPath)} (${formatBytes(Buffer.byteLength(minifiedCSS, "utf-8"))})`);
      logger.info(`  ${logger.cyan(varPath)} (${formatBytes(Buffer.byteLength(usedTokensOnly, "utf-8"))})`);
    }
  }

  // Step 6: Generate analysis report (if --analyze)
  if (args.analyze) {
    spin = logger.spinner("Generating analysis report...");
    const buildTime = Date.now() - startTime;
    const stats = generateReport(
      usageMap,
      components,
      originalCSS,
      minifiedCSS,
      buildTime,
    );

    const reportPath = path.join(outputDir, "build-analysis.json");
    if (!args.statsOnly) {
      writeAnalysisReport(stats, reportPath);
      spin.stop();
      logger.success(`Analysis report: ${logger.cyan(reportPath)}`);
    } else {
      spin.stop();
    }

    // Print formatted stats
    const formattedLines = formatStatsForConsole(stats);
    for (const line of formattedLines) {
      logger.info(line);
    }
  } else {
    // Show simple summary
    logger.info("");
    const originalSize = Buffer.byteLength(originalCSS, "utf-8");
    const finalSize = Buffer.byteLength(minifiedCSS, "utf-8");
    const reduction =
      originalSize > 0
        ? Math.round(((originalSize - finalSize) / originalSize) * 100)
        : 0;

    logger.info(logger.bold("Build Summary"));
    logger.info(`  Original:  ${formatBytes(originalSize)}`);
    logger.info(`  Final:     ${formatBytes(finalSize)}`);
    logger.info(`  Reduction: ${reduction}%`);
    logger.info(`  Time:      ${Date.now() - startTime}ms`);
    logger.info("");
  }

  return Date.now() - startTime;
}

/**
 * Extract only used tokens into a CSS file
 */
function extractUsedTokensCSS(
  cssContent: string,
  usageMap: any,
): string {
  const usedTokens = new Set<string>();

  for (const tokens of Object.values(usageMap)) {
    (tokens as string[]).forEach((token) => usedTokens.add(token));
  }

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

  const tokenLines = Array.from(definitions.entries())
    .map(([name, value]) => `  --${name}: ${value};`)
    .join("\n");

  return `:root {\n${tokenLines}\n}\n`;
}

/**
 * Main build command
 */
export async function build(args: string[]): Promise<void> {
  // Parse arguments
  const parsed = parseArgs(args);

  // Show help if requested
  if (parsed.help) {
    showHelp();
    return;
  }

  // Load configuration
  let config: any;
  try {
    config = loadConfig(process.cwd());
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  // Validate environment
  try {
    validateEnvironment(config);
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  // Resolve output directory
  const outputDir = path.isAbsolute(parsed.outputDir)
    ? parsed.outputDir
    : path.resolve(process.cwd(), parsed.outputDir);

  // Ensure output directory is writable
  try {
    ensureOutputDir(outputDir);
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  // Get component directory
  const componentDir = path.isAbsolute(config.componentDir)
    ? config.componentDir
    : path.resolve(process.cwd(), config.componentDir);

  // Perform initial build
  try {
    await performBuild(componentDir, outputDir, parsed);
  } catch (err) {
    logger.error((err as Error).message);
    process.exit(1);
  }

  // Watch mode (if enabled)
  if (parsed.watch) {
    logger.info("");
    logger.success("Watching for changes... (Press Ctrl+C to stop)");
    logger.info("");

    const watchFiles = new Map<string, number>();
    let debounceTimer: NodeJS.Timeout | null = null;

    const watcher = fs.watch(componentDir, { recursive: true }, (event, filename) => {
      if (!filename || !filename.endsWith(".module.css")) {
        return;
      }

      // Debounce rapid changes
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(async () => {
        try {
          logger.info(`\nRebuilding after change: ${logger.cyan(filename)}`);
          await performBuild(componentDir, outputDir, { ...parsed, watch: false });
        } catch (err) {
          logger.error((err as Error).message);
        }
      }, 500);
    });

    // Handle Ctrl+C gracefully
    process.on("SIGINT", () => {
      logger.info("");
      logger.success("Build watch stopped");
      watcher.close();
      process.exit(0);
    });
  }
}
