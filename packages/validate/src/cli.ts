#!/usr/bin/env node
/**
 * Orion Validator CLI
 *
 * Usage:
 *   npx @orion-ds/validate src/
 *   npx @orion-ds/validate src/App.tsx src/components/
 *   npx @orion-ds/validate --help
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { validateFiles, type ValidationResult } from "./validator.js";

// ============================================================================
// File discovery
// ============================================================================

const EXTENSIONS = new Set([
  ".tsx",
  ".ts",
  ".jsx",
  ".js",
  ".css",
  ".module.css",
]);
const IGNORED_DIRS = new Set([
  "node_modules",
  "dist",
  "build",
  ".next",
  ".nuxt",
  ".git",
]);

function findFiles(dir: string): Array<{ path: string; content: string }> {
  const results: Array<{ path: string; content: string }> = [];

  const stat = fs.statSync(dir);
  if (stat.isFile()) {
    const ext = path.extname(dir);
    if (
      EXTENSIONS.has(ext) ||
      EXTENSIONS.has(path.basename(dir).replace(/^[^.]+/, ""))
    ) {
      results.push({ path: dir, content: fs.readFileSync(dir, "utf-8") });
    }
    return results;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || IGNORED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.has(ext)) {
        results.push({
          path: fullPath,
          content: fs.readFileSync(fullPath, "utf-8"),
        });
      }
    }
  }

  return results;
}

// ============================================================================
// Output formatting
// ============================================================================

const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function formatResult(filePath: string, result: ValidationResult): string {
  if (result.errors.length === 0 && result.warnings.length === 0) return "";

  const lines: string[] = [];
  lines.push(`\n${BOLD}${filePath}${RESET}`);

  for (const err of result.errors) {
    const loc = err.line ? `${DIM}:${err.line}${RESET}` : "";
    lines.push(`  ${RED}error${RESET} ${err.message}${loc}`);
    lines.push(`  ${DIM}  → ${err.suggestion}${RESET}`);
  }

  for (const warn of result.warnings) {
    const loc = warn.line ? `${DIM}:${warn.line}${RESET}` : "";
    lines.push(`  ${YELLOW}warn${RESET}  ${warn.message}${loc}`);
    lines.push(`  ${DIM}  → ${warn.suggestion}${RESET}`);
  }

  return lines.join("\n");
}

// ============================================================================
// Main
// ============================================================================

function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
  @orion-ds/validate — Check code against Orion Design System rules

  Usage:
    npx @orion-ds/validate <paths...>

  Examples:
    npx @orion-ds/validate src/
    npx @orion-ds/validate src/App.tsx src/components/
    npx @orion-ds/validate .

  Checks for:
    - Hardcoded colors (hex, rgb, hsl) → use CSS variables
    - Hardcoded pixel values → use spacing tokens
    - Hardcoded font families → use font tokens
    - Wrong prop names (common AI hallucinations)
    - brand prop on components (brand is global)
    - Non-existent CSS variables
    - Missing CSS imports
`);
    return;
  }

  const paths = args.filter((a) => !a.startsWith("--"));
  if (paths.length === 0) {
    console.error(
      "Error: No paths specified. Usage: npx @orion-ds/validate <paths...>",
    );
    process.exit(1);
  }

  // Find all files
  const allFiles: Array<{ path: string; content: string }> = [];
  for (const p of paths) {
    const resolved = path.resolve(p);
    if (!fs.existsSync(resolved)) {
      console.error(`Error: Path not found: ${p}`);
      process.exit(1);
    }
    allFiles.push(...findFiles(resolved));
  }

  if (allFiles.length === 0) {
    console.log(
      "No .tsx/.ts/.jsx/.js/.css files found in the specified paths.",
    );
    return;
  }

  console.log(
    `\n${BOLD}Orion Validator${RESET} — Checking ${allFiles.length} files\n`,
  );

  // Validate
  const result = validateFiles(allFiles);

  // Output results
  for (const fr of result.fileResults) {
    const output = formatResult(fr.path, fr.result);
    if (output) console.log(output);
  }

  // Summary
  console.log(`\n${"─".repeat(50)}`);

  if (result.valid) {
    console.log(
      `\n  ${GREEN}${BOLD}PASS${RESET} — Score: ${result.totalScore}/100`,
    );
    console.log(`  ${allFiles.length} files checked, 0 errors\n`);
  } else {
    console.log(
      `\n  ${RED}${BOLD}FAIL${RESET} — Score: ${result.totalScore}/100`,
    );
    console.log(
      `  ${result.summary.totalErrors} errors, ${result.summary.totalWarnings} warnings`,
    );
    console.log(`  ${allFiles.length} files checked\n`);
  }

  // Suggestions (deduplicated)
  const allSuggestions = new Set<string>();
  for (const fr of result.fileResults) {
    for (const s of fr.result.suggestions) {
      allSuggestions.add(s);
    }
  }
  if (allSuggestions.size > 0) {
    console.log(`  ${BOLD}Suggestions:${RESET}`);
    for (const s of allSuggestions) {
      console.log(`  ${DIM}•${RESET} ${s}`);
    }
    console.log();
  }

  process.exit(result.valid ? 0 : 1);
}

main();
