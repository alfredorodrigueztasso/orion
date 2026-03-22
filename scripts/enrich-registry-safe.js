#!/usr/bin/env node
/**
 * enrich-registry-safe.js
 *
 * Safety wrapper for enrich-registry.js
 * - Only runs if registry/ exists (created by generate-registry or build:registry)
 * - Enriches component/section JSON files with metadata from tokens/registry-metadata.json
 * - Safe to call during any build (silently skips if registry doesn't exist yet)
 *
 * Usage: node scripts/enrich-registry-safe.js
 * Automatically called from: npm run build
 */

const fs = require('fs');
const path = require('path');

const REGISTRY_DIR = path.join(__dirname, '../registry');

// Only proceed if registry/ exists (i.e., after generate-registry has run)
if (!fs.existsSync(REGISTRY_DIR)) {
  console.log('ℹ️  Registry not generated yet, skipping enrichment');
  process.exit(0);
}

// If registry exists, run the full enrichment
try {
  require('./enrich-registry.js');
  process.exit(0);
} catch (error) {
  console.error('❌ Registry enrichment failed:', error.message);
  process.exit(1);
}
