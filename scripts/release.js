#!/usr/bin/env node

/**
 * Orion Design System - Release Script
 *
 * Automated release management for the monorepo.
 * Ensures all packages are versioned synchronously and published correctly.
 *
 * Usage:
 *   npm run release:patch    # 1.0.0 → 1.0.1
 *   npm run release:minor    # 1.0.0 → 1.1.0
 *   npm run release:major    # 1.0.0 → 2.0.0
 *   npm run release:dry      # Preview without publishing
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PACKAGES = [
  { name: '@orion-ds/core', path: 'packages/core' },
  { name: '@orion-ds/react', path: 'packages/react' }
];

const ROOT_DIR = path.resolve(__dirname, '..');

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = '') {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${colors.bright}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  log(`  ${colors.green}✓${colors.reset} ${message}`);
}

function logError(message) {
  log(`  ${colors.red}✗${colors.reset} ${message}`);
}

function logInfo(message) {
  log(`  ${colors.cyan}→${colors.reset} ${message}`);
}

function logWarning(message) {
  log(`  ${colors.yellow}⚠${colors.reset} ${message}`);
}

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const bumpType = args.find(arg => ['patch', 'minor', 'major'].includes(arg)) || 'patch';
  const dryRun = args.includes('--dry-run');

  return { bumpType, dryRun };
}

/**
 * Read package.json from a directory
 */
function readPackageJson(packagePath) {
  const fullPath = path.join(ROOT_DIR, packagePath, 'package.json');
  const content = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(content);
}

/**
 * Write package.json to a directory
 */
function writePackageJson(packagePath, data) {
  const fullPath = path.join(ROOT_DIR, packagePath, 'package.json');
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n');
}

/**
 * Calculate new version based on bump type
 */
function bumpVersion(currentVersion, bumpType) {
  const parts = currentVersion.split('.').map(Number);

  switch (bumpType) {
    case 'major':
      return `${parts[0] + 1}.0.0`;
    case 'minor':
      return `${parts[0]}.${parts[1] + 1}.0`;
    case 'patch':
    default:
      return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
  }
}

/**
 * Get the highest version among all packages
 */
function getHighestVersion() {
  let highest = '0.0.0';

  for (const pkg of PACKAGES) {
    const packageJson = readPackageJson(pkg.path);
    const version = packageJson.version;

    if (compareVersions(version, highest) > 0) {
      highest = version;
    }
  }

  return highest;
}

/**
 * Compare two semver versions
 * Returns: -1 if a < b, 0 if a == b, 1 if a > b
 */
function compareVersions(a, b) {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    if (partsA[i] > partsB[i]) return 1;
    if (partsA[i] < partsB[i]) return -1;
  }

  return 0;
}

/**
 * Execute a shell command
 */
function exec(command, options = {}) {
  const { silent = false, cwd = ROOT_DIR } = options;

  try {
    const result = execSync(command, {
      cwd,
      encoding: 'utf8',
      stdio: silent ? 'pipe' : 'inherit'
    });
    return { success: true, output: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Check if npm is logged in
 */
function checkNpmAuth() {
  const result = exec('npm whoami', { silent: true });
  return result.success ? result.output.trim() : null;
}

/**
 * Main release function
 */
async function release() {
  const { bumpType, dryRun } = parseArgs();

  log('\n' + '='.repeat(60), colors.cyan);
  log('  Orion Design System - Release Script', colors.bright);
  log('='.repeat(60), colors.cyan);

  if (dryRun) {
    logWarning('DRY RUN MODE - No changes will be published');
  }

  // Step 1: Check npm authentication
  logStep('1/6', 'Checking npm authentication...');
  const npmUser = checkNpmAuth();

  if (!npmUser) {
    logError('Not logged in to npm. Run: npm login');
    process.exit(1);
  }
  logSuccess(`Logged in as: ${npmUser}`);

  // Step 2: Get current versions and calculate new version
  logStep('2/6', 'Calculating versions...');

  const currentVersion = getHighestVersion();
  const newVersion = bumpVersion(currentVersion, bumpType);

  logInfo(`Current highest version: ${currentVersion}`);
  logInfo(`Bump type: ${bumpType}`);
  logInfo(`New version: ${colors.green}${newVersion}${colors.reset}`);

  // Show current state of each package
  log('\n  Package versions:');
  for (const pkg of PACKAGES) {
    const packageJson = readPackageJson(pkg.path);
    log(`    ${pkg.name}: ${packageJson.version} → ${colors.green}${newVersion}${colors.reset}`);
  }

  // Step 3: Update package.json files
  logStep('3/6', 'Updating package versions...');

  if (!dryRun) {
    for (const pkg of PACKAGES) {
      const packageJson = readPackageJson(pkg.path);
      packageJson.version = newVersion;
      writePackageJson(pkg.path, packageJson);
      logSuccess(`Updated ${pkg.name}`);
    }
  } else {
    logInfo('Skipped (dry run)');
  }

  // Step 4: Run audit and build
  logStep('4/6', 'Running audit and build...');

  if (!dryRun) {
    log('\n  Running npm run audit...');
    const auditResult = exec('npm run audit');
    if (!auditResult.success) {
      logError('Audit failed. Please fix issues before releasing.');
      process.exit(1);
    }

    log('\n  Running npm run build...');
    const buildResult = exec('npm run build');
    if (!buildResult.success) {
      logError('Build failed. Please fix issues before releasing.');
      process.exit(1);
    }
    logSuccess('Audit and build completed');
  } else {
    logInfo('Skipped (dry run)');
  }

  // Step 5: Publish packages
  logStep('5/6', 'Publishing packages to npm...');

  const publishResults = [];

  for (const pkg of PACKAGES) {
    const pkgDir = path.join(ROOT_DIR, pkg.path);

    if (dryRun) {
      // In dry-run mode, just show what would be published
      // (don't run npm publish --dry-run since versions weren't updated)
      logSuccess(`Would publish ${pkg.name}@${newVersion}`);
      publishResults.push({ pkg: pkg.name, success: true });
    } else {
      log(`\n  Publishing ${pkg.name}@${newVersion}...`);
      const result = exec('npm publish --access public', { cwd: pkgDir });

      if (result.success) {
        logSuccess(`Published ${pkg.name}@${newVersion}`);
        publishResults.push({ pkg: pkg.name, success: true });
      } else {
        logError(`Failed to publish ${pkg.name}`);
        publishResults.push({ pkg: pkg.name, success: false, error: result.error });
      }
    }
  }

  // Step 6: Summary
  logStep('6/6', 'Release Summary');

  log('\n' + '-'.repeat(60));

  const successful = publishResults.filter(r => r.success);
  const failed = publishResults.filter(r => !r.success);

  if (dryRun) {
    log('\n  DRY RUN COMPLETE', colors.yellow);
    log('  Run without --dry-run to publish for real.\n');
  } else {
    if (failed.length === 0) {
      log(`\n  ${colors.green}SUCCESS!${colors.reset} All packages published.\n`);
      log('  Published packages:');
      for (const pkg of PACKAGES) {
        log(`    - ${pkg.name}@${newVersion}`);
      }
      log('\n  Install with:');
      log(`    npm install @orion-ds/core@${newVersion}`);
      log(`    npm install @orion-ds/react@${newVersion}`);
      log(`    npm install @orion-ds/vue@${newVersion}`);
    } else {
      log(`\n  ${colors.red}PARTIAL FAILURE${colors.reset}`, colors.red);
      log(`  ${successful.length}/${publishResults.length} packages published.`);
      log('\n  Failed packages:');
      for (const result of failed) {
        log(`    - ${result.pkg}: ${result.error || 'Unknown error'}`);
      }
    }
  }

  log('\n' + '='.repeat(60) + '\n', colors.cyan);

  // Exit with appropriate code
  process.exit(failed.length > 0 ? 1 : 0);
}

// Run the release
release().catch(error => {
  logError(`Unexpected error: ${error.message}`);
  process.exit(1);
});
