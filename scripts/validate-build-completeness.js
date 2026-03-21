#!/usr/bin/env node

/**
 * Validate that build output is complete before publishing
 *
 * Checks:
 * 1. dist/ directory exists and is not empty
 * 2. All exports declared in package.json exist in dist/
 * 3. Minimum required files are present (index.*, client.*)
 * 4. No orphaned/auto-numbered files from Vite (index2.mjs, etc.)
 *
 * This prevents regressions like v4.9.2 where only theme.css was built.
 *
 * Usage:
 *   npm run validate:build              # Validate all packages
 *   node scripts/validate-build-completeness.js packages/react
 */

const fs = require('fs');
const path = require('path');

const ANSI = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

function log(msg, color = '') {
  console.log(`${color}${msg}${ANSI.reset}`);
}

function logError(msg) {
  console.error(`${ANSI.red}✗ ${msg}${ANSI.reset}`);
}

function logSuccess(msg) {
  console.log(`${ANSI.green}✓ ${msg}${ANSI.reset}`);
}

function logWarning(msg) {
  console.log(`${ANSI.yellow}⚠ ${msg}${ANSI.reset}`);
}

/**
 * Validate a single package's build completeness
 */
function validatePackage(packagePath) {
  const packageName = path.basename(packagePath);
  const packageJsonPath = path.join(packagePath, 'package.json');
  const distPath = path.join(packagePath, 'dist');

  log(`\n${ANSI.bright}Validating: ${packageName}${ANSI.reset}`);

  // 1. Check package.json exists
  if (!fs.existsSync(packageJsonPath)) {
    logError(`package.json not found at ${packageJsonPath}`);
    return false;
  }

  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  } catch (error) {
    logError(`Failed to parse package.json: ${error.message}`);
    return false;
  }

  // 2. Check dist/ exists
  if (!fs.existsSync(distPath)) {
    logError(`dist/ directory does not exist. Run: npm run build`);
    return false;
  }

  // 3. Check dist/ is not empty
  const distFiles = fs.readdirSync(distPath);
  if (distFiles.length === 0) {
    logError(`dist/ is empty (0 files). Build did not complete successfully.`);
    return false;
  }

  logSuccess(`dist/ directory exists with ${distFiles.length} file(s)`);

  // 4. Check for auto-numbered collision files (Vite bug indicator)
  const collisionFiles = distFiles.filter(f => /^index\d+\.(mjs|cjs|js)$/.test(f));
  if (collisionFiles.length > 0) {
    logError(
      `Found auto-numbered collision files (Vite multi-entry bug): ${collisionFiles.join(', ')}\n` +
      `  This indicates the Vite config fileName callback is not using the entryName parameter.\n` +
      `  Check: vite.shared.config.ts or vite.config.ts fileName function.`
    );
    return false;
  }

  // 5. Validate exports map
  const exports = packageJson.exports || {};
  if (Object.keys(exports).length === 0) {
    logWarning('No exports declared in package.json');
    return true; // Not an error, but unusual
  }

  const missingExports = [];
  const foundExports = [];
  let requiredFilesFound = {
    'index.mjs': false,
    'index.cjs': false,
    'index.d.ts': false,
  };

  // Collect all required files from exports
  const requiredByExports = new Set();

  for (const [exportPath, config] of Object.entries(exports)) {
    // Skip string exports (like "./package.json")
    if (typeof config === 'string') continue;
    if (!config || typeof config !== 'object') continue;

    // Check import path (.mjs)
    if (config.import) {
      const file = path.join(packagePath, config.import);
      const relPath = config.import;
      requiredByExports.add(relPath);

      if (fs.existsSync(file)) {
        foundExports.push({ export: exportPath, format: 'import', file: relPath });
        if (relPath.includes('index.mjs')) requiredFilesFound['index.mjs'] = true;
      } else {
        missingExports.push({ export: exportPath, format: 'import', file: relPath });
      }
    }

    // Check require path (.cjs)
    if (config.require) {
      const file = path.join(packagePath, config.require);
      const relPath = config.require;
      requiredByExports.add(relPath);

      if (fs.existsSync(file)) {
        foundExports.push({ export: exportPath, format: 'require', file: relPath });
        if (relPath.includes('index.cjs')) requiredFilesFound['index.cjs'] = true;
      } else {
        missingExports.push({ export: exportPath, format: 'require', file: relPath });
      }
    }

    // Check types path (.d.ts)
    if (config.types) {
      const file = path.join(packagePath, config.types);
      const relPath = config.types;
      requiredByExports.add(relPath);

      if (fs.existsSync(file)) {
        foundExports.push({ export: exportPath, format: 'types', file: relPath });
        if (relPath.includes('index.d.ts')) requiredFilesFound['index.d.ts'] = true;
      } else {
        missingExports.push({ export: exportPath, format: 'types', file: relPath });
      }
    }

    // Check string exports (CSS files)
    if (typeof config === 'string') {
      const file = path.join(packagePath, config);
      if (fs.existsSync(file)) {
        foundExports.push({ export: exportPath, format: 'css', file: config });
      } else {
        missingExports.push({ export: exportPath, format: 'css', file: config });
      }
    }
  }

  // Report found exports
  if (foundExports.length > 0) {
    logSuccess(`Found ${foundExports.length} of ${Object.keys(exports).length} export files`);
  }

  // Report missing exports
  if (missingExports.length > 0) {
    logError(`${missingExports.length} export file(s) missing from dist/:`);
    missingExports.forEach(({ export: exp, format, file }) => {
      console.error(`    ${ANSI.red}✗${ANSI.reset} ${exp} (${format}): ${file}`);
    });

    // Diagnostic hints
    console.error(`\n  ${ANSI.cyan}Diagnostic Hints:${ANSI.reset}`);
    console.error('  1. Run: npm run build (in ' + packageName + ' directory)');
    console.error('  2. Check that Vite fileName uses entryName parameter');
    console.error('  3. Verify TypeScript compilation succeeded');
    return false;
  }

  // Check minimum required files
  const missingRequired = Object.entries(requiredFilesFound)
    .filter(([_, found]) => !found)
    .map(([file, _]) => file);

  if (missingRequired.length > 0) {
    logError(`Missing required files: ${missingRequired.join(', ')}`);
    return false;
  }

  logSuccess(`All ${foundExports.length} export files validated`);

  return true;
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);
  const rootDir = path.resolve(__dirname, '..');

  let packagesToValidate = [];

  if (args.length === 0) {
    // Validate all packages in packages/ directory
    const packagesDir = path.join(rootDir, 'packages');
    if (fs.existsSync(packagesDir)) {
      const items = fs.readdirSync(packagesDir);
      packagesToValidate = items
        .map(item => path.join(packagesDir, item))
        .filter(dir => {
          // Only validate directories with package.json
          return fs.existsSync(path.join(dir, 'package.json'));
        });
    }
  } else {
    // Validate specific packages
    packagesToValidate = args.map(arg => {
      // Handle relative paths like "packages/react" or absolute paths
      const fullPath = path.isAbsolute(arg) ? arg : path.join(rootDir, arg);
      return fullPath;
    });
  }

  if (packagesToValidate.length === 0) {
    logError('No packages to validate');
    process.exit(1);
  }

  log(`${ANSI.cyan}${ANSI.bright}Build Completeness Validation${ANSI.reset}`);
  log(`${ANSI.cyan}${'='.repeat(50)}${ANSI.reset}`);

  const results = [];

  for (const pkgPath of packagesToValidate) {
    const isValid = validatePackage(pkgPath);
    results.push({
      package: path.basename(pkgPath),
      valid: isValid,
    });
  }

  // Summary
  log(`\n${ANSI.cyan}${'='.repeat(50)}${ANSI.reset}`);
  const passed = results.filter(r => r.valid).length;
  const total = results.length;

  log(`\n${ANSI.bright}Summary: ${passed}/${total} packages valid${ANSI.reset}`);

  if (passed === total) {
    log(`\n${ANSI.green}✅ All packages have complete builds!${ANSI.reset}\n`);
    process.exit(0);
  } else {
    const failed = results.filter(r => !r.valid);
    log(`\n${ANSI.red}❌ ${failed.length} package(s) failed validation:${ANSI.reset}`);
    failed.forEach(r => {
      console.error(`   - ${r.package}`);
    });
    log(`\n${ANSI.yellow}Fix the build issues before publishing.${ANSI.reset}\n`);
    process.exit(1);
  }
}

main();
