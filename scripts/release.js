#!/usr/bin/env node

/**
 * Orion Design System - Release Script
 *
 * Automated release management for the monorepo.
 * Ensures all packages are versioned synchronously and published correctly.
 * Integrates with CHANGELOG.md for automated GitHub Releases.
 *
 * Usage:
 *   npm run release:patch    # 1.0.0 → 1.0.1
 *   npm run release:minor    # 1.0.0 → 1.1.0
 *   npm run release:major    # 1.0.0 → 2.0.0
 *   npm run release:dry      # Preview without publishing
 *
 * After release:
 *   - Git tag is created: v{version}
 *   - Push with: git push origin --tags
 *   - GitHub Actions will automatically:
 *     1. Extract CHANGELOG entry
 *     2. Create GitHub Release
 *     3. Publish to npm
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PACKAGES = [
  { name: '@orion-ds/react', path: 'packages/react' },
  { name: '@orion-ds/cli', path: 'packages/cli' },
  { name: '@orion-ds/create', path: 'packages/create' },
  { name: '@orion-ds/mcp', path: 'packages/mcp' },
  { name: '@orion-ds/validate', path: 'packages/validate' }
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
 * Extract CHANGELOG entry for a version
 */
function extractChangelogEntry(version) {
  const changelogPath = path.join(ROOT_DIR, 'CHANGELOG.md');

  if (!fs.existsSync(changelogPath)) {
    logWarning('CHANGELOG.md not found - GitHub Release will use minimal description');
    return null;
  }

  const content = fs.readFileSync(changelogPath, 'utf8');
  const lines = content.split('\n');

  let inSection = false;
  let section = [];
  const versionHeader = `## [${version}]`;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith(versionHeader)) {
      inSection = true;
      // Skip the header line itself
      continue;
    }

    if (inSection) {
      // Stop at next version header or top-level separator
      if (line.startsWith('## [') || line.startsWith('---')) {
        break;
      }

      // Collect the section
      if (line.trim() || section.length > 0) {
        section.push(line);
      }
    }
  }

  if (section.length === 0) {
    logWarning(`No CHANGELOG entry found for v${version}`);
    return null;
  }

  // Trim trailing empty lines
  while (section.length > 0 && !section[section.length - 1].trim()) {
    section.pop();
  }

  return section.join('\n').trim();
}

/**
 * Create and push git tag for release
 */
function createGitTag(version, dryRun = false) {
  const tagName = `v${version}`;

  logStep('Tag', `Creating git tag: ${tagName}`);

  const changelogEntry = extractChangelogEntry(version) || `Release v${version}`;

  if (dryRun) {
    logInfo(`Would create tag: ${tagName}`);
    logInfo(`Tag message:\n${changelogEntry}`);
    return;
  }

  // Create annotated tag with changelog entry as message
  const tagMessage = `Release v${version}\n\n${changelogEntry}`;

  try {
    exec(`git tag -a "${tagName}" -m "${tagMessage.replace(/"/g, '\\"')}"`, {
      cwd: ROOT_DIR
    });
    logSuccess(`Git tag created: ${tagName}`);

    logInfo(`\nNext step: Push tags to GitHub with:`);
    logInfo(`  git push origin ${tagName}`);
    logInfo(`\nOr push all tags with:`);
    logInfo(`  git push origin --tags`);
    logInfo(`\nGitHub Actions will automatically create a Release and publish to npm.`);
  } catch (error) {
    logError(`Failed to create git tag: ${error.message}`);
    logWarning(`You can create it manually with:`);
    logWarning(`  git tag -a "${tagName}" -m "Release v${version}"`);
    logWarning(`  git push origin ${tagName}`);
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

    log('\n  Running build (tokens + packages)...');

    // P0 FIX: Avoid turbo recursion - run tokens then packages directly
    const tokensBuildResult = exec('npm run build:tokens');
    if (!tokensBuildResult.success) {
      logError('Token build failed. Please fix issues before releasing.');
      process.exit(1);
    }
    logSuccess('Tokens built');

    log('\n  Running package builds...');
    // List all packages explicitly to avoid Turbo 2.x filter syntax issues
    // (Turbo 2.x does NOT support !name negation, use explicit package names instead)
    const packagesBuildResult = exec(
      'turbo run build --filter=@orion-ds/react --filter=@orion-ds/cli --filter=@orion-ds/mcp --filter=@orion-ds/create --filter=@orion-ds/validate'
    );
    if (!packagesBuildResult.success) {
      logError('Package build failed. Please fix issues before releasing.');
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

      // Validate exports before publishing (prevents incidents like v4.9.2)
      log(`  Validating exports...`);
      const validateScriptPath = path.join(ROOT_DIR, 'scripts/validate-exports.js');
      const validateResult = exec(`node "${validateScriptPath}" "${pkg.path}"`);
      if (!validateResult.success) {
        logError(`Export validation failed for ${pkg.name}`);
        publishResults.push({ pkg: pkg.name, success: false, error: 'Export validation failed' });
        continue;
      }
      logSuccess(`Exports validated`);

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

  // Step 6: Create git tag and prepare for GitHub Actions
  const successful = publishResults.filter(r => r.success);
  const failed = publishResults.filter(r => !r.success);

  if (!dryRun && failed.length === 0) {
    createGitTag(newVersion, dryRun);
  }

  // Step 7: Summary
  logStep('7/7', 'Release Summary');

  log('\n' + '-'.repeat(60));

  if (dryRun) {
    log('\n  DRY RUN COMPLETE', colors.yellow);
    log('  The following would be executed:\n');
    log('  1. All package.json files would be updated to v' + newVersion);
    log('  2. Validation suite would run (audit, type-check)');
    log('  3. Packages would be built (npm run build:release)');
    log('  4. Packages would be published to npm');
    log('  5. Git tag v' + newVersion + ' would be created');
    log('  6. GitHub Actions would create a Release and publish changelog\n');
    log('  Run without --dry-run to execute for real.\n');
  } else {
    if (failed.length === 0) {
      log(`\n  ${colors.green}SUCCESS!${colors.reset} Release v${newVersion} prepared.\n`);
      log('  Published packages:');
      for (const pkg of PACKAGES) {
        log(`    ${colors.green}✓${colors.reset} ${pkg.name}@${newVersion}`);
      }
      log('\n  Installation:');
      log(`    npm install @orion-ds/react@${newVersion}`);
      log(`    npm install @orion-ds/cli@${newVersion}`);
      log(`    npm install @orion-ds/mcp@${newVersion}`);
      log('\n  GitHub Release:');
      log(`    Automated via GitHub Actions when tag is pushed`);
      log(`    Changelog extracted from CHANGELOG.md automatically`);
      log('\n  Next steps:');
      log(`    ${colors.cyan}git push origin --tags${colors.reset} (to trigger GitHub Actions)`);
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
