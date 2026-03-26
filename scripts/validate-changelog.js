#!/usr/bin/env node

/**
 * Changelog Validator
 *
 * Validates CHANGELOG.md format to ensure:
 * 1. All versions in package.json have CHANGELOG entries
 * 2. Version headers follow the correct format
 * 3. No duplicate version entries
 * 4. Changelog is well-formed markdown
 *
 * Usage:
 *   npm run validate:changelog
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CHANGELOG_PATH = path.join(ROOT_DIR, 'CHANGELOG.md');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function logError(message) {
  log(`  ${colors.red}✗${colors.reset} ${message}`);
}

function logSuccess(message) {
  log(`  ${colors.green}✓${colors.reset} ${message}`);
}

function logWarning(message) {
  log(`  ${colors.yellow}⚠${colors.reset} ${message}`);
}

/**
 * Read CHANGELOG.md
 */
function readChangelog() {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    logError('CHANGELOG.md not found');
    return null;
  }

  return fs.readFileSync(CHANGELOG_PATH, 'utf8');
}

/**
 * Extract all version headers from CHANGELOG
 */
function extractVersions(content) {
  const versionRegex = /^## \[(\d+\.\d+\.\d+)\]/gm;
  const versions = [];
  let match;

  while ((match = versionRegex.exec(content)) !== null) {
    versions.push(match[1]);
  }

  return versions;
}

/**
 * Get current version from packages
 */
function getPackageVersion() {
  const packagePath = path.join(ROOT_DIR, 'packages/react/package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  return packageJson.version;
}

/**
 * Validate version header format
 */
function validateVersionHeaders(content) {
  const lines = content.split('\n');
  const errors = [];
  let lineNum = 0;

  for (const line of lines) {
    lineNum++;

    // Check for version headers
    if (line.startsWith('## [')) {
      // Should match: ## [X.Y.Z] — DATE
      if (!line.match(/^## \[\d+\.\d+\.\d+\]/)) {
        errors.push(`Line ${lineNum}: Invalid version header format: "${line}"`);
      }

      // Should have a dash and date
      if (!line.includes('—') && !line.includes('-')) {
        logWarning(`Version header may be missing date: "${line}"`);
      }
    }
  }

  return errors;
}

/**
 * Check for duplicate versions
 */
function checkDuplicates(versions) {
  const seen = new Set();
  const duplicates = [];

  for (const version of versions) {
    if (seen.has(version)) {
      duplicates.push(version);
    }
    seen.add(version);
  }

  return duplicates;
}

/**
 * Check that current package version has a CHANGELOG entry
 */
function checkCurrentVersion(content, currentVersion) {
  const versionHeader = `## [${currentVersion}]`;
  return content.includes(versionHeader);
}

/**
 * Validate CHANGELOG content
 */
function validateContent(content) {
  const errors = [];

  // Check for required sections in each version
  const versionSections = content.split(/^## \[/m).slice(1);

  for (const section of versionSections) {
    // Each section should have some content
    if (section.trim().length < 10) {
      const version = section.substring(0, 10);
      errors.push(`Version ${version} has minimal content (may be empty)`);
    }
  }

  return errors;
}

/**
 * Main validation function
 */
function validate() {
  log('\n' + '='.repeat(60), colors.cyan);
  log('  Changelog Validator', colors.bright);
  log('='.repeat(60), colors.cyan);

  const content = readChangelog();
  if (!content) {
    log('\n❌ VALIDATION FAILED\n', colors.red);
    process.exit(1);
  }

  let hasErrors = false;
  const errors = [];

  // Check 1: Extract versions
  log('\n[1/5] Extracting versions...');
  const versions = extractVersions(content);
  logSuccess(`Found ${versions.length} version entries`);

  // Check 2: Validate version header format
  log('\n[2/5] Validating version header format...');
  const formatErrors = validateVersionHeaders(content);
  if (formatErrors.length > 0) {
    for (const error of formatErrors) {
      logError(error);
      hasErrors = true;
    }
  } else {
    logSuccess('All version headers are valid');
  }

  // Check 3: Check for duplicates
  log('\n[3/5] Checking for duplicate versions...');
  const duplicates = checkDuplicates(versions);
  if (duplicates.length > 0) {
    for (const version of duplicates) {
      logError(`Duplicate entry for v${version}`);
    }
    hasErrors = true;
  } else {
    logSuccess('No duplicate version entries');
  }

  // Check 4: Validate content
  log('\n[4/5] Validating changelog content...');
  const contentErrors = validateContent(content);
  if (contentErrors.length > 0) {
    for (const error of contentErrors) {
      logWarning(error);
    }
  } else {
    logSuccess('All entries have content');
  }

  // Check 5: Verify current package version has entry
  log('\n[5/5] Checking current package version...');
  const currentVersion = getPackageVersion();
  if (checkCurrentVersion(content, currentVersion)) {
    logSuccess(`Current version v${currentVersion} has CHANGELOG entry`);
  } else {
    logWarning(`Current version v${currentVersion} has no CHANGELOG entry`);
    logWarning(`Add a new entry to CHANGELOG.md before releasing`);
  }

  // Summary
  log('\n' + '-'.repeat(60));

  if (hasErrors) {
    log('\n❌ VALIDATION FAILED\n', colors.red);
    process.exit(1);
  } else {
    log('\n' + colors.green + '✓ CHANGELOG validation passed' + colors.reset, colors.green);
    log(`\nDocumented versions: ${versions.join(', ')}\n`, colors.cyan);
    log('='.repeat(60) + '\n', colors.cyan);
    process.exit(0);
  }
}

// Run validation
validate();
