#!/usr/bin/env node

/**
 * Bundle Styles Script
 *
 * Creates a combined CSS bundle (styles.css) that includes:
 * 1. @orion-ds/core theme.css (design tokens)
 * 2. @orion-ds/react component styles (collected from dist/components/ and dist/sections/)
 *
 * This allows users to import a single CSS file:
 *   import '@orion-ds/react/styles.css'
 *
 * Note: With preserveModules: true, individual CSS Module files are generated per component.
 * This script collects and concatenates them into a single bundle.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = resolve(__dirname, '../dist');

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
  console.log('Bundling styles...');

  // Check if theme.css exists
  if (!existsSync(THEME_CSS_PATH)) {
    console.error(`Error: theme.css not found at ${THEME_CSS_PATH}`);
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
    console.error(`Error: No CSS files found in ${DIST_DIR}/components or ${DIST_DIR}/sections`);
    console.error('Make sure the Vite build completed successfully.');
    process.exit(1);
  }

  // Read source files
  const themeCssRaw = readFileSync(THEME_CSS_PATH, 'utf-8');
  const markerCss = existsSync(MARKER_CSS_PATH) ? readFileSync(MARKER_CSS_PATH, 'utf-8') : '';
  const reactCss = componentCssFiles.map(file => readFileSync(file, 'utf-8')).join('\n');

  // Resolve @import url('tokens/generated.css') by inlining its contents
  // This prevents a broken relative import in the published bundle
  const GENERATED_CSS_PATH = resolve(__dirname, '../assets/tokens/generated.css');
  let themeCss = themeCssRaw;
  if (existsSync(GENERATED_CSS_PATH)) {
    const generatedCss = readFileSync(GENERATED_CSS_PATH, 'utf-8');
    themeCss = themeCssRaw.replace(
      /@import\s+url\(['"]?tokens\/generated\.css['"]?\);?/,
      `/* ─── Inlined: tokens/generated.css ─── */\n${generatedCss}`
    );
  }

  // Create bundle with header
  const bundle = `/**
 * @orion-ds/react - Combined Styles Bundle
 *
 * This file includes:
 * - Design tokens from @orion-ds/core (CSS variables)
 * - Component styles from @orion-ds/react
 *
 * Usage:
 *   import '@orion-ds/react/styles.css';
 *
 * Generated automatically during build.
 */

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
`;

  // Write bundle
  writeFileSync(OUTPUT_PATH, bundle, 'utf-8');

  // Also write theme.css standalone
  const THEME_OUTPUT_PATH = resolve(DIST_DIR, 'theme.css');
  writeFileSync(THEME_OUTPUT_PATH, themeCss, 'utf-8');

  // Write blocks CSS separately (includes blocks sections + templates)
  const BLOCKS_OUTPUT_PATH = resolve(DIST_DIR, 'blocks.css');
  const blocksCss = blocksCssFiles.map(file => readFileSync(file, 'utf-8')).join('\n');
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
  writeFileSync(BLOCKS_OUTPUT_PATH, blocksBundleHeader + blocksCss, 'utf-8');

  // Calculate sizes for logging
  const themeSize = (themeCss.length / 1024).toFixed(1);
  const reactSize = (reactCss.length / 1024).toFixed(1);
  const bundleSize = (bundle.length / 1024).toFixed(1);
  const blocksSize = (blocksCss.length / 1024).toFixed(1);

  console.log(`  theme.css: ${themeSize}KB`);
  console.log(`  react.css: ${reactSize}KB`);
  console.log(`  styles.css: ${bundleSize}KB (bundle)`);
  console.log(`  blocks.css: ${blocksSize}KB (blocks only)`);
  console.log(`Bundle created at: ${OUTPUT_PATH}`);
  console.log(`Theme created at: ${THEME_OUTPUT_PATH}`);
  console.log(`Blocks CSS created at: ${BLOCKS_OUTPUT_PATH}`);
}

bundleStyles();
