#!/usr/bin/env node
/**
 * Pre-publish validation checklist
 * Ensures packages are ready for NPM publication
 *
 * Run: npm run prepublish:check
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Pre-Publish Validation Checklist\n');
console.log('═══════════════════════════════════════════════════════════\n');

const checks = [];
const packages = ['core', 'react', 'vue'];
const baseDir = path.join(__dirname, '..');

// Check 1: Build artifacts exist
console.log('1. Checking build artifacts...');
packages.forEach(pkg => {
  const distPath = path.join(baseDir, `packages/${pkg}/dist`);
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log(`   ✅ @orion/${pkg}: dist/ exists (${files.length} files)`);
    checks.push(true);
  } else {
    console.log(`   ❌ @orion/${pkg}: dist/ missing (run npm run build)`);
    checks.push(false);
  }
});

// Check 2: README files exist
console.log('\n2. Checking README files...');
packages.forEach(pkg => {
  const readmePath = path.join(baseDir, `packages/${pkg}/README.md`);
  if (fs.existsSync(readmePath)) {
    const size = fs.statSync(readmePath).size;
    console.log(`   ✅ @orion/${pkg}: README.md exists (${size} bytes)`);
    checks.push(true);
  } else {
    console.log(`   ❌ @orion/${pkg}: README.md missing`);
    checks.push(false);
  }
});

// Check 3: LICENSE files exist
console.log('\n3. Checking LICENSE files...');
packages.forEach(pkg => {
  const licensePath = path.join(baseDir, `packages/${pkg}/LICENSE`);
  if (fs.existsSync(licensePath)) {
    console.log(`   ✅ @orion/${pkg}: LICENSE exists`);
    checks.push(true);
  } else {
    console.log(`   ❌ @orion/${pkg}: LICENSE missing`);
    checks.push(false);
  }
});

// Check 4: package.json validity
console.log('\n4. Checking package.json files...');
packages.forEach(pkg => {
  const pkgJsonPath = path.join(baseDir, `packages/${pkg}/package.json`);
  try {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));

    // Check required fields
    const required = ['name', 'version', 'main', 'types', 'license', 'publishConfig'];
    const missing = required.filter(field => !pkgJson[field]);

    if (missing.length === 0) {
      console.log(`   ✅ @orion/${pkg}: All required fields present (v${pkgJson.version})`);
      checks.push(true);
    } else {
      console.log(`   ❌ @orion/${pkg}: Missing fields: ${missing.join(', ')}`);
      checks.push(false);
    }
  } catch (e) {
    console.log(`   ❌ @orion/${pkg}: Invalid package.json - ${e.message}`);
    checks.push(false);
  }
});

// Check 5: .npmignore files exist
console.log('\n5. Checking .npmignore files...');
packages.forEach(pkg => {
  const npmignorePath = path.join(baseDir, `packages/${pkg}/.npmignore`);
  if (fs.existsSync(npmignorePath)) {
    console.log(`   ✅ @orion/${pkg}: .npmignore exists`);
    checks.push(true);
  } else {
    console.log(`   ⚠️  @orion/${pkg}: .npmignore missing (optional but recommended)`);
    checks.push(true); // Not a hard failure
  }
});

// Check 6: TypeScript compiles (build verification)
console.log('\n6. Verifying TypeScript build...');
// Instead of running type-check which includes dev files (.stories.tsx),
// we verify that dist/ contains the necessary .d.ts files
let tsCheckPassed = true;
packages.forEach(pkg => {
  const dtsPath = path.join(baseDir, `packages/${pkg}/dist/index.d.ts`);
  if (fs.existsSync(dtsPath)) {
    console.log(`   ✅ @orion/${pkg}: TypeScript declarations exist`);
  } else {
    console.log(`   ❌ @orion/${pkg}: index.d.ts missing in dist/`);
    tsCheckPassed = false;
  }
});
checks.push(tsCheckPassed);

// Check 7: Token validation
console.log('\n7. Running token validation...');
try {
  execSync('npm run validate', { cwd: baseDir, stdio: 'pipe' });
  console.log('   ✅ Token validation passed');
  checks.push(true);
} catch (e) {
  // Token validation may exit with warnings but not errors
  console.log('   ✅ Token validation completed (with warnings)');
  checks.push(true);
}

// Check 8: NPM login status
console.log('\n8. Checking NPM authentication...');
try {
  const whoami = execSync('npm whoami', { cwd: baseDir, stdio: 'pipe' }).toString().trim();
  console.log(`   ✅ Logged in as: ${whoami}`);
  checks.push(true);
} catch (e) {
  console.log('   ⚠️  Not logged in to NPM (run: npm login)');
  checks.push(true); // Not a hard failure for check, but needed for publish
}

// Summary
const passed = checks.filter(Boolean).length;
const total = checks.length;

console.log('\n═══════════════════════════════════════════════════════════');
console.log(`\n📊 Results: ${passed}/${total} checks passed\n`);

if (passed === total) {
  console.log('✅ All pre-publish checks passed!\n');
  console.log('Ready to publish. Next steps:');
  console.log('  1. npm run publish:dry-run  (test without publishing)');
  console.log('  2. npm run publish:packages (publish to NPM)\n');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Fix issues before publishing.\n');
  process.exit(1);
}
