#!/usr/bin/env node
/**
 * Generate theme.css from compiled tokens
 * Creates the root theme.css file that bundle-styles.js expects
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const OUTPUT_PATH = path.join(__dirname, '..', 'theme.css');
const GENERATED_CSS = path.join(TOKENS_DIR, 'generated.css');

function generateThemeCss() {
  // Read the generated tokens CSS
  if (!fs.existsSync(GENERATED_CSS)) {
    console.error('❌ tokens/generated.css not found. Run npm run build:tokens first.');
    process.exit(1);
  }

  const generatedCss = fs.readFileSync(GENERATED_CSS, 'utf-8');
  
  // Create theme.css that imports the generated tokens
  const themeCss = `/**
 * Orion Design System — Theme CSS
 * Generated from tokens/**\/*.json
 * 
 * This file is the source of truth for all design tokens.
 * It's compiled from JSON token definitions and imported by all packages.
 */

${generatedCss}

/**
 * ─────────────────────────────────────────────────────────
 * Brand Overrides (applied via data-brand attribute)
 * ─────────────────────────────────────────────────────────
 */

/* Brand overrides are composed from primitives - no hardcoded colors */
`;

  fs.writeFileSync(OUTPUT_PATH, themeCss);
  console.log(`✅ Generated ${OUTPUT_PATH}`);
}

generateThemeCss();
