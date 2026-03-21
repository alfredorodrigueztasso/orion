#!/usr/bin/env node

/**
 * Validate that all exports declared in @orion-ds/react package.json
 * have corresponding files in dist/
 *
 * Prevents regression of the v4.9.0 bug where named entry points
 * (e.g., blocks/index.mjs) were not generated despite being declared
 * in the exports map.
 */

const fs = require('fs');
const path = require('path');

const REACT_PACKAGE_DIR = path.join(__dirname, '../packages/react');
const DIST_DIR = path.join(REACT_PACKAGE_DIR, 'dist');
const PACKAGE_JSON_PATH = path.join(REACT_PACKAGE_DIR, 'package.json');

function validateExports() {
  // Read package.json
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  } catch (error) {
    console.error('❌ Failed to read package.json:', error.message);
    process.exit(1);
  }

  const exports = packageJson.exports || {};
  const missingFiles = [];
  const foundFiles = [];

  // Check each export path
  for (const [exportPath, exportConfig] of Object.entries(exports)) {
    // Skip non-subpath exports (like . and ./package.json)
    if (!exportConfig || typeof exportConfig !== 'object') continue;

    const importPath = exportConfig.import;
    const requirePath = exportConfig.require;

    // Check import (.mjs) path
    if (importPath) {
      const fullPath = path.join(REACT_PACKAGE_DIR, importPath);
      if (fs.existsSync(fullPath)) {
        foundFiles.push({ export: exportPath, format: 'import', file: importPath });
      } else {
        missingFiles.push({ export: exportPath, format: 'import', file: importPath });
      }
    }

    // Check require (.cjs) path
    if (requirePath) {
      const fullPath = path.join(REACT_PACKAGE_DIR, requirePath);
      if (fs.existsSync(fullPath)) {
        foundFiles.push({ export: exportPath, format: 'require', file: requirePath });
      } else {
        missingFiles.push({ export: exportPath, format: 'require', file: requirePath });
      }
    }
  }

  // Report results
  if (foundFiles.length > 0) {
    console.log(`✅ Found ${foundFiles.length} export file(s):`);
    foundFiles.forEach(({ export: exp, format, file }) => {
      console.log(`   ${exp} (${format}): ${file}`);
    });
  }

  if (missingFiles.length > 0) {
    console.error(`\n❌ ERROR: ${missingFiles.length} missing export file(s):`);
    missingFiles.forEach(({ export: exp, format, file }) => {
      console.error(`   ${exp} (${format}): ${file} NOT FOUND`);
    });
    console.error('\nThis matches the v4.9.0 bug where Vite did not generate');
    console.error('named output files for multi-entry builds.');
    console.error('\nVerify that vite.shared.config.ts fileName function uses');
    console.error('the entryName parameter: fileName: (format, entryName) => ...');
    process.exit(1);
  }

  console.log(`\n✅ All ${foundFiles.length} exports validated successfully.`);
  process.exit(0);
}

validateExports();
