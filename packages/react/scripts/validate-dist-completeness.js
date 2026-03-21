#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');
const DIST_PATH = path.join(ROOT, 'dist');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

function log(msg, color = '') {
  console.log(`${color}${msg}${colors.reset}`);
}

function logError(msg) {
  log(`  ✗ ${msg}`, colors.red);
}

function logSuccess(msg) {
  log(`  ✓ ${msg}`, colors.green);
}

function logInfo(msg) {
  log(`  → ${msg}`, colors.cyan);
}

function logStep(step, msg) {
  log(`\n${colors.bright}[${step}]${colors.reset} ${msg}`);
}

// Start validation
log('\n' + '='.repeat(60), colors.cyan);
log('  Dist Completeness Validation', colors.bright);
log('='.repeat(60) + '\n', colors.cyan);

// Step 1: Check if dist/ exists
logStep('1/5', 'Checking dist/ directory...');

if (!fs.existsSync(DIST_PATH)) {
  logError('dist/ directory does not exist. Run: npm run build');
  process.exit(1);
}
logSuccess('dist/ directory found');

// Step 2: Read package.json
logStep('2/5', 'Reading package.json...');

let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
} catch (e) {
  logError(`Cannot read package.json: ${e.message}`);
  process.exit(1);
}

logSuccess(`Package: ${packageJson.name}@${packageJson.version}`);

// Step 3: Extract expected exports
logStep('3/5', 'Extracting expected exports...');

const expectedFiles = new Set();
const exports = packageJson.exports || {};

for (const [exportPath, exportDef] of Object.entries(exports)) {
  if (exportPath === '.') {
    // Main export
    expectedFiles.add('index.mjs');
    expectedFiles.add('index.cjs');
    expectedFiles.add('index.d.ts');
    logInfo(`Main export: index.{mjs,cjs,d.ts}`);
  } else if (typeof exportDef === 'string') {
    // Direct string (e.g., "./dist/styles.css")
    const filePath = exportDef.replace(/^\.\/dist\//, '').replace(/^\.\//, '');
    expectedFiles.add(filePath);
    logInfo(`String export: ${filePath}`);
  } else if (typeof exportDef === 'object') {
    // Conditional exports
    if (exportDef.types) {
      const filePath = exportDef.types.replace(/^\.\/dist\//, '');
      expectedFiles.add(filePath);
    }
    if (exportDef.import) {
      const filePath = exportDef.import.replace(/^\.\/dist\//, '');
      expectedFiles.add(filePath);
    }
    if (exportDef.require) {
      const filePath = exportDef.require.replace(/^\.\/dist\//, '');
      expectedFiles.add(filePath);
    }
    logInfo(`Conditional export: ${exportPath}`);
  }
}

logSuccess(`Total exports: ${expectedFiles.size}`);

// Step 4: Validate all files exist
logStep('4/5', 'Validating file existence...');

const missingFiles = [];
const emptyFiles = [];
const smallFiles = [];
const validFiles = [];

for (const file of expectedFiles) {
  const fullPath = path.join(DIST_PATH, file);

  if (!fs.existsSync(fullPath)) {
    logError(`${file} NOT FOUND`);
    missingFiles.push(file);
  } else {
    const stat = fs.statSync(fullPath);
    const sizeKB = (stat.size / 1024).toFixed(2);
    const sizeB = stat.size;

    // Check for empty files
    if (sizeB === 0) {
      logError(`${file} (0 bytes - EMPTY)`);
      emptyFiles.push(file);
    }
    // Check for suspiciously small JS files
    else if ((file.endsWith('.mjs') || file.endsWith('.cjs')) && sizeB < 100) {
      logError(`${file} (${sizeB} bytes - TOO SMALL)`);
      smallFiles.push(file);
    } else {
      logSuccess(`${file} (${sizeKB} KB)`);
      validFiles.push(file);
    }
  }
}

// Step 5: Summary and exit
logStep('5/5', 'Summary');

const totalIssues = missingFiles.length + emptyFiles.length + smallFiles.length;
log(`\n  Files checked: ${expectedFiles.size}`);
logSuccess(`Valid files: ${validFiles.length}`);

if (missingFiles.length > 0) {
  log(`\n  ${colors.red}Missing Files (${missingFiles.length}):${colors.reset}`);
  for (const file of missingFiles) {
    log(`    - ${file}`);
  }
}

if (emptyFiles.length > 0) {
  log(`\n  ${colors.red}Empty Files (${emptyFiles.length}):${colors.reset}`);
  for (const file of emptyFiles) {
    log(`    - ${file}`);
  }
}

if (smallFiles.length > 0) {
  log(`\n  ${colors.red}Suspiciously Small Files (${smallFiles.length}):${colors.reset}`);
  for (const file of smallFiles) {
    log(`    - ${file}`);
  }
}

log('\n' + '='.repeat(60), colors.cyan);

if (totalIssues > 0) {
  log(`  ${colors.red}VALIDATION FAILED${colors.reset} (${totalIssues} issues)`, colors.red);
  log(`  Build appears incomplete. Do not publish.\n`, colors.red);
  log('='.repeat(60) + '\n', colors.cyan);
  process.exit(1);
}

log(`  ${colors.green}VALIDATION PASSED${colors.reset}`, colors.green);
log(`  All exports present and valid. Ready to publish!\n`, colors.green);
log('='.repeat(60) + '\n', colors.cyan);
process.exit(0);
