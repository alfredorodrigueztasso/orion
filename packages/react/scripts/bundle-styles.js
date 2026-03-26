#!/usr/bin/env node

/**
 * Bundle Styles Script
 *
 * Creates a combined CSS bundle (styles.css) that includes:
 * 1. @orion-ds/core theme.css (design tokens)
 * 2. @orion-ds/react component styles (collected from dist/components/ and dist/sections/)
 *
 * CRITICAL: Wraps all CSS in @layer orion { ... } to enable Tailwind CSS compatibility.
 * Without this layer, Orion component styles (specificity 0,2,0) override Tailwind utilities (0,1,0).
 * CSS cascade layers ensure Tailwind utilities (unlayered by default) automatically win over Orion.
 *
 * This allows users to import a single CSS file:
 *   import '@orion-ds/react/styles.css'
 *
 * Note: With preserveModules: true, individual CSS Module files are generated per component.
 * This script collects and concatenates them into a single bundle.
 *
 * See: packages/react/TAILWIND_INTEGRATION.md for complete Tailwind + Orion guide
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = resolve(__dirname, '../dist');

/**
 * Safely read file with helpful error messages
 * @param {string} filePath - Path to file
 * @param {string} description - What we were trying to do (for error message)
 * @returns {string|null} - File contents or null if error
 */
function readFileSafely(filePath, description) {
  try {
    return readFileSync(filePath, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`❌ Error: ${description} - File not found at ${filePath}`);
    } else if (error.code === 'EACCES') {
      console.error(`❌ Error: ${description} - Permission denied: ${filePath}`);
    } else {
      console.error(`❌ Error: ${description} - ${error.message}`);
    }
    return null;
  }
}

// Paths to source CSS files
const THEME_CSS_PATH = resolve(__dirname, '../assets/theme.css');
const MARKER_CSS_PATH = resolve(__dirname, '../src/styles/marker.css');
const OUTPUT_PATH = resolve(DIST_DIR, 'styles.css');

function collectComponentStyles(dirPath) {
  const cssFiles = [];

  if (!existsSync(dirPath)) {
    return cssFiles;
  }

  const walk = (path) => {
    const entries = readdirSync(path, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = resolve(path, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.module.css')) {
        cssFiles.push(fullPath);
      }
    }
  };

  walk(dirPath);
  return cssFiles;
}

function bundleStyles() {
  console.log('🎨 Bundling styles with @layer orion...\n');

  // Check if theme.css exists
  if (!existsSync(THEME_CSS_PATH)) {
    console.error(`❌ Error: theme.css not found at ${THEME_CSS_PATH}`);
    console.error('Make sure npm run copy:assets ran successfully during build.');
    process.exit(1);
  }

  // Collect all component CSS files (main bundle - no blocks)
  const componentCssFiles = [
    ...collectComponentStyles(resolve(DIST_DIR, 'components')),
    ...collectComponentStyles(resolve(DIST_DIR, 'sections')),
  ];

  // Collect blocks CSS separately
  const blocksCssFiles = [
    ...collectComponentStyles(resolve(DIST_DIR, 'blocks')),
    ...collectComponentStyles(resolve(DIST_DIR, 'templates')),
  ];

  if (componentCssFiles.length === 0) {
    console.error(`❌ Error: No CSS files found in ${DIST_DIR}/components or ${DIST_DIR}/sections`);
    console.error('Make sure the Vite build completed successfully.');
    process.exit(1);
  }

  // Read source files with error handling
  const themeCssRaw = readFileSafely(THEME_CSS_PATH, 'Reading theme.css');
  if (!themeCssRaw) process.exit(1);

  const markerCss = existsSync(MARKER_CSS_PATH)
    ? readFileSafely(MARKER_CSS_PATH, 'Reading marker.css') || ''
    : '';

  // Read component CSS files
  let reactCss = '';
  for (const file of componentCssFiles) {
    const css = readFileSafely(file, `Reading ${file}`);
    if (!css) {
      console.error(`⚠️  Skipping ${file} due to read error`);
      continue;
    }
    reactCss += css + '\n';
  }

  if (!reactCss) {
    console.error(`❌ Error: No component CSS could be read`);
    process.exit(1);
  }

  // Resolve @import url('tokens/generated.css') by inlining its contents
  // This prevents a broken relative import in the published bundle
  const GENERATED_CSS_PATH = resolve(__dirname, '../assets/tokens/generated.css');
  let themeCss = themeCssRaw;
  if (existsSync(GENERATED_CSS_PATH)) {
    const generatedCss = readFileSafely(GENERATED_CSS_PATH, 'Reading generated.css');
    if (generatedCss) {
      themeCss = themeCssRaw.replace(
        /@import\s+url\(['"]?tokens\/generated\.css['"]?\);?/,
        `/* ─── Inlined: tokens/generated.css ─── */\n${generatedCss}`
      );
    }
  }

  // Create bundle with header + @layer orion wrapper
  // CRITICAL: All CSS is wrapped in @layer orion to enable Tailwind CSS compatibility
  // See: packages/react/TAILWIND_INTEGRATION.md
  const bundle = `/**
 * @orion-ds/react - Combined Styles Bundle
 *
 * This file includes:
 * - Design tokens from @orion-ds/core (CSS variables)
 * - Component styles from @orion-ds/react
 *
 * IMPORTANT: All styles are wrapped in @layer orion to ensure Tailwind CSS utilities
 * automatically win over Orion component styles due to CSS cascade layer semantics.
 *
 * See: packages/react/TAILWIND_INTEGRATION.md for Tailwind + Orion setup guide
 *
 * Usage:
 *   import '@orion-ds/react/styles.css';
 *
 * Generated automatically during build.
 */

@layer orion {
/* ═══════════════════════════════════════════════════════════════════════════
   @orion-ds/core - Design Tokens (theme.css)
   ═══════════════════════════════════════════════════════════════════════════ */

${themeCss}

/* ═══════════════════════════════════════════════════════════════════════════
   Styles Detection Marker
   ═══════════════════════════════════════════════════════════════════════════ */

${markerCss}

/* ═══════════════════════════════════════════════════════════════════════════
   @orion-ds/react - Component Styles (react.css)
   ═══════════════════════════════════════════════════════════════════════════ */

${reactCss}
} /* end @layer orion */
`;

  // Write main bundle
  try {
    writeFileSync(OUTPUT_PATH, bundle, 'utf-8');
    console.log(`✅ styles.css bundled with @layer orion`);
  } catch (error) {
    console.error(`❌ Error writing ${OUTPUT_PATH}: ${error.message}`);
    process.exit(1);
  }

  // Also write theme.css standalone (NO layer - for advanced tree-shaking users)
  const THEME_OUTPUT_PATH = resolve(DIST_DIR, 'theme.css');
  try {
    writeFileSync(THEME_OUTPUT_PATH, themeCss, 'utf-8');
    console.log(`✅ theme.css written (tokens only, no layer)`);
  } catch (error) {
    console.error(`❌ Error writing ${THEME_OUTPUT_PATH}: ${error.message}`);
    process.exit(1);
  }

  // Write blocks CSS separately (includes blocks sections + templates)
  const BLOCKS_OUTPUT_PATH = resolve(DIST_DIR, 'blocks.css');
  let blocksCss = '';
  for (const file of blocksCssFiles) {
    const css = readFileSafely(file, `Reading ${file}`);
    if (css) blocksCss += css + '\n';
  }

  if (blocksCss) {
    const blocksBundleHeader = `/**
 * @orion-ds/react/blocks - Blocks Styles Bundle
 *
 * This file includes styles for premium blocks and templates.
 *
 * Usage:
 *   import '@orion-ds/react/blocks.css';
 *
 * Generated automatically during build.
 */

`;
    try {
      writeFileSync(BLOCKS_OUTPUT_PATH, blocksBundleHeader + blocksCss, 'utf-8');
      console.log(`✅ blocks.css written`);
    } catch (error) {
      console.error(`❌ Error writing ${BLOCKS_OUTPUT_PATH}: ${error.message}`);
      process.exit(1);
    }
  }

  // Calculate sizes for logging
  const themeSize = (themeCss.length / 1024).toFixed(1);
  const reactSize = (reactCss.length / 1024).toFixed(1);
  const bundleSize = (bundle.length / 1024).toFixed(1);
  const blocksSize = (blocksCss.length / 1024).toFixed(1);

  console.log(`\n📊 Bundle sizes:`);
  console.log(`  ├─ theme.css: ${themeSize}KB (tokens only)`);
  console.log(`  ├─ react.css: ${reactSize}KB (component styles)`);
  console.log(`  ├─ styles.css: ${bundleSize}KB (full bundle with @layer orion)`);
  console.log(`  └─ blocks.css: ${blocksSize}KB (blocks & templates)`);

  // Copy Tailwind integration files to proper subdirectory structure
  const TAILWIND_DIST_DIR = resolve(DIST_DIR, 'integrations/tailwind');

  try {
    // Ensure directory exists
    if (!existsSync(TAILWIND_DIST_DIR)) {
      mkdirSync(TAILWIND_DIST_DIR, { recursive: true });
    }

    // Copy vite-generated .mjs and .cjs files from flat to subdirectory
    const tailwindMjs = resolve(DIST_DIR, 'integrations/tailwind.mjs');
    const tailwindCjs = resolve(DIST_DIR, 'integrations/tailwind.cjs');

    if (existsSync(tailwindMjs)) {
      const content = readFileSafely(tailwindMjs, 'Reading tailwind.mjs');
      if (content) {
        writeFileSync(resolve(TAILWIND_DIST_DIR, 'index.mjs'), content, 'utf-8');
      }
    }

    if (existsSync(tailwindCjs)) {
      const content = readFileSafely(tailwindCjs, 'Reading tailwind.cjs');
      if (content) {
        writeFileSync(resolve(TAILWIND_DIST_DIR, 'index.cjs'), content, 'utf-8');
      }
    }

    // Copy Tailwind v4 CSS file (static asset for @theme integration)
    const V4_CSS_SRC = resolve(__dirname, '../src/integrations/tailwind/v4.css');
    if (existsSync(V4_CSS_SRC)) {
      const v4Css = readFileSafely(V4_CSS_SRC, 'Reading Tailwind v4.css');
      if (v4Css) {
        writeFileSync(resolve(TAILWIND_DIST_DIR, 'v4.css'), v4Css, 'utf-8');
        console.log(`✅ integrations/tailwind files organized (index.mjs, index.cjs, v4.css)`);
      }
    }
  } catch (error) {
    console.error(`⚠ Warning: Could not organize tailwind files: ${error.message}`);
  }

  console.log(`\n📦 Output:`);
  console.log(`  ├─ ${OUTPUT_PATH}`);
  console.log(`  ├─ ${THEME_OUTPUT_PATH}`);
  console.log(`  └─ ${BLOCKS_OUTPUT_PATH}`);

  console.log(`\n🎉 Styles bundled successfully with @layer orion for Tailwind compatibility!`);
}

bundleStyles();
