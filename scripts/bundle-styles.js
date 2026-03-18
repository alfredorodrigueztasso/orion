#!/usr/bin/env node

/**
 * Bundle Styles Script
 *
 * Creates a combined CSS bundle (styles.css) that includes:
 * 1. @orion-ds/core theme.css (design tokens)
 * 2. @orion-ds/react react.css (component styles)
 *
 * This allows users to import a single CSS file:
 *   import '@orion-ds/react/styles.css'
 *
 * Instead of importing both separately:
 *   import '@orion-ds/core/theme.css'
 *   import '@orion-ds/react/dist/react.css'
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIST_DIR = resolve(__dirname, '../dist');

// Paths to source CSS files
const THEME_CSS_PATH = resolve(__dirname, '../../core/dist/theme.css');
const REACT_CSS_PATH = resolve(DIST_DIR, 'react.css');
const OUTPUT_PATH = resolve(DIST_DIR, 'styles.css');

function bundleStyles() {
  console.log('Bundling styles...');

  // Check if theme.css exists
  if (!existsSync(THEME_CSS_PATH)) {
    console.error(`Error: theme.css not found at ${THEME_CSS_PATH}`);
    console.error('Make sure @orion-ds/core is built first: npm run build -w @orion-ds/core');
    process.exit(1);
  }

  // Check if react.css exists
  if (!existsSync(REACT_CSS_PATH)) {
    console.error(`Error: react.css not found at ${REACT_CSS_PATH}`);
    console.error('Make sure the Vite build completed successfully.');
    process.exit(1);
  }

  // Read source files
  const themeCss = readFileSync(THEME_CSS_PATH, 'utf-8');
  const reactCss = readFileSync(REACT_CSS_PATH, 'utf-8');

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
   @orion-ds/react - Component Styles (react.css)
   ═══════════════════════════════════════════════════════════════════════════ */

${reactCss}
`;

  // Write bundle
  writeFileSync(OUTPUT_PATH, bundle, 'utf-8');

  // Calculate sizes for logging
  const themeSize = (themeCss.length / 1024).toFixed(1);
  const reactSize = (reactCss.length / 1024).toFixed(1);
  const bundleSize = (bundle.length / 1024).toFixed(1);

  console.log(`  theme.css: ${themeSize}KB`);
  console.log(`  react.css: ${reactSize}KB`);
  console.log(`  styles.css: ${bundleSize}KB (bundle)`);
  console.log(`Bundle created at: ${OUTPUT_PATH}`);
}

bundleStyles();
