#!/usr/bin/env node

/**
 * Validate Exports — Ensure all declared exports in package.json have corresponding dist files
 *
 * Prevents incidents like v4.9.2 where only theme.css was published with no JS files.
 *
 * Usage: node scripts/validate-exports.js [packagePath]
 * Example: node scripts/validate-exports.js ./packages/react
 *
 * Exit codes:
 * - 0: All exports have valid dist files
 * - 1: Missing dist files or invalid exports detected
 */

const fs = require('fs');
const path = require('path');

function validateExports(packagePath = '.') {
  const packageJsonPath = path.join(packagePath, 'package.json');
  const distPath = path.join(packagePath, 'dist');

  // Read package.json
  if (!fs.existsSync(packageJsonPath)) {
    console.error(`❌ package.json not found at ${packageJsonPath}`);
    process.exit(1);
  }

  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
  } catch (err) {
    console.error(`❌ Failed to parse package.json: ${err.message}`);
    process.exit(1);
  }

  const exports = packageJson.exports;
  if (!exports) {
    console.log('✅ No exports defined in package.json (OK if this is a template/config package)');
    process.exit(0);
  }

  // Check if dist exists
  if (!fs.existsSync(distPath)) {
    console.error(`❌ dist/ directory not found at ${distPath}`);
    console.error(`   Build may have failed. Run: npm run build`);
    process.exit(1);
  }

  const errors = [];

  // Iterate through exports
  Object.entries(exports).forEach(([exportKey, exportValue]) => {
    // Handle simple string exports: "export": "./dist/index.js"
    if (typeof exportValue === 'string') {
      const filePath = path.join(packagePath, exportValue);
      if (!fs.existsSync(filePath)) {
        errors.push(`Missing: "${exportKey}" → ${exportValue}`);
      }
      return;
    }

    // Handle object exports with { types, import, require, default }
    if (typeof exportValue === 'object' && exportValue !== null) {
      const targets = {
        types: exportValue.types,
        import: exportValue.import,
        require: exportValue.require,
        default: exportValue.default,
      };

      Object.entries(targets).forEach(([targetType, filePath]) => {
        if (filePath) {
          const fullPath = path.join(packagePath, filePath);
          if (!fs.existsSync(fullPath)) {
            errors.push(`Missing: "${exportKey}" (${targetType}) → ${filePath}`);
          }
        }
      });
    }
  });

  // Report results
  if (errors.length > 0) {
    console.error(`\n❌ Validation Failed: ${errors.length} missing dist file(s)\n`);
    errors.forEach((err) => console.error(`   ${err}`));
    console.error(`\n📋 Declared exports in package.json:\n`);
    console.error(JSON.stringify(exports, null, 2));
    console.error(`\n💡 Fix: Verify all export paths are generated during build`);
    console.error(`   Check: npm run build (from repo root)`);
    console.error(`   Then:  node scripts/validate-exports.js ${packagePath}\n`);
    process.exit(1);
  }

  console.log(`✅ Exports validation passed: ${Object.keys(exports).length} exports verified`);
  process.exit(0);
}

// Parse CLI args
const packagePath = process.argv[2] || '.';
validateExports(packagePath);
