#!/usr/bin/env node

/**
 * Validate ai-manifest.json integrity
 *
 * Ensures:
 * - Required fields exist (version, last_updated, system_stats)
 * - Component counts match actual filesystem
 * - Brand counts are correct
 * - Dates are valid
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_FILE = path.join(__dirname, '..', 'tokens', 'ai-manifest.json');
const COMPONENTS_DIR = path.join(__dirname, '..', 'packages', 'react', 'src', 'components');

function log(msg) {
  console.log(msg);
}

function logError(msg) {
  console.error('❌', msg);
}

function logSuccess(msg) {
  console.log('✅', msg);
}

function getComponentCount() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    return 0;
  }
  return fs
    .readdirSync(COMPONENTS_DIR)
    .filter(f => {
      const fullPath = path.join(COMPONENTS_DIR, f);
      return fs.statSync(fullPath).isDirectory();
    }).length;
}

function isValidDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') {
    return false;
  }
  // Check format YYYY-MM-DD
  const match = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);
  if (!match) return false;

  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

function main() {
  log('🔍 Validating ai-manifest.json integrity...\n');

  // Load manifest
  let manifest;
  try {
    const content = fs.readFileSync(MANIFEST_FILE, 'utf-8');
    manifest = JSON.parse(content);
  } catch (e) {
    logError(`Could not load ${MANIFEST_FILE}: ${e.message}`);
    process.exit(1);
  }

  const errors = [];

  // Check required top-level fields
  log('🔎 Checking required fields...');
  if (!manifest.version) {
    errors.push('Missing "version" field');
  }
  if (!manifest.last_updated) {
    errors.push('Missing "last_updated" field');
  }
  if (!manifest.system_stats) {
    errors.push('Missing "system_stats" field');
  }

  // Validate last_updated format
  if (manifest.last_updated) {
    if (!isValidDate(manifest.last_updated)) {
      errors.push(`Invalid "last_updated" format: ${manifest.last_updated} (expected YYYY-MM-DD)`);
    }
  }

  // Validate system_stats
  log('🔎 Checking system_stats...');
  if (manifest.system_stats) {
    const realComponentCount = getComponentCount();
    const manifestComponentCount = manifest.system_stats.components?.total;

    if (manifestComponentCount !== realComponentCount) {
      errors.push(
        `Component count mismatch: manifest says ${manifestComponentCount}, ` +
        `actual filesystem has ${realComponentCount}`
      );
    } else {
      logSuccess(`Component count matches: ${realComponentCount}`);
    }

    // Check brands
    const brands = manifest.system_stats.brands;
    if (!brands || !brands.names || brands.names.length < 4) {
      errors.push(`Brands: expected at least 4, got ${brands?.names?.length || 0}`);
    } else {
      logSuccess(`Brands count OK: ${brands.names.length} brands`);
    }

    // Check implemented count
    if (brands && typeof brands.implemented === 'number') {
      if (brands.implemented < 4) {
        errors.push(`Only ${brands.implemented} brands implemented (expected ≥4)`);
      } else {
        logSuccess(`Brands implemented: ${brands.implemented}`);
      }
    }
  }

  // Validate ai_first_readiness
  log('🔎 Checking ai_first_readiness...');
  if (manifest.ai_first_readiness) {
    const score = manifest.ai_first_readiness.overall_score;
    if (typeof score !== 'number' || score < 0 || score > 100) {
      errors.push(`Invalid overall_score: ${score} (must be 0-100)`);
    } else {
      logSuccess(`AI-first readiness score: ${score}/100`);
    }
  } else {
    errors.push('Missing "ai_first_readiness" field');
  }

  // Report results
  log('');
  if (errors.length === 0) {
    logSuccess('Manifest integrity verified!');
    log(`   Version: ${manifest.version}`);
    log(`   Last updated: ${manifest.last_updated}`);
    process.exit(0);
  } else {
    log(`📋 Errors found (${errors.length}):`);
    errors.forEach(e => logError(`  ${e}`));
    process.exit(1);
  }
}

main();
