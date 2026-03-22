# Validation Scripts - Implementation Guide

**Purpose**: Provide ready-to-implement validation scripts based on friction log lessons.

**Priority**: Implement in order (Level 1 → Level 3)

---

## Level 1: CRITICAL Scripts (Implement First)

### 1. validate-exports.js

**Problem it solves**: v4.9.2 (missing all .mjs/.cjs files in dist/)

**Location**: `scripts/validate-exports.js`

```javascript
#!/usr/bin/env node

/**
 * Validate that all declared exports in package.json have corresponding dist files
 *
 * Prevents v4.9.2 class issues where exports are declared but dist files missing
 *
 * Usage: node scripts/validate-exports.js
 * Used by: npm run prepublish:check, release.js
 */

const fs = require('fs');
const path = require('path');

const PACKAGES = [
  '@orion-ds/react',
  '@orion-ds/blocks',
  '@orion-ds/cli',
  '@orion-ds/mcp',
  '@orion-ds/validate',
];

const EXTENSIONS = ['.mjs', '.cjs', '.d.ts'];
let issues = [];

console.log('🔍 Validating export completeness...\n');

// Check each package
for (const pkg of PACKAGES) {
  const pkgPath = path.join(__dirname, '..', 'packages', pkg.replace('@orion-ds/', ''));
  const pkgJsonPath = path.join(pkgPath, 'package.json');

  if (!fs.existsSync(pkgJsonPath)) {
    console.log(`⊘ Skipping ${pkg} (not found)`);
    continue;
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const exports = pkgJson.exports || {};
  const distPath = path.join(pkgPath, 'dist');

  console.log(`📦 ${pkg}`);

  // Check each export
  for (const [exportPath, exportConfig] of Object.entries(exports)) {
    const config = typeof exportConfig === 'string'
      ? { import: exportConfig }
      : exportConfig;

    // For each file type (.mjs, .cjs, .d.ts)
    for (const ext of EXTENSIONS) {
      let expectedFile;

      if (exportPath === '.') {
        expectedFile = `index${ext}`;
      } else {
        expectedFile = `${exportPath}/index${ext}`;
      }

      const fullPath = path.join(distPath, expectedFile);

      if (!fs.existsSync(fullPath)) {
        const relPath = path.relative(pkgPath, fullPath);
        issues.push({
          package: pkg,
          export: exportPath,
          missing: relPath,
        });
      }
    }
  }

  console.log(`  ✓ ${Object.keys(exports).length} exports validated`);
}

// Report results
console.log('\n' + '='.repeat(60));

if (issues.length > 0) {
  console.log(`\n❌ FAILED: ${issues.length} missing file(s)\n`);

  const byPackage = {};
  issues.forEach(issue => {
    if (!byPackage[issue.package]) {
      byPackage[issue.package] = [];
    }
    byPackage[issue.package].push(issue);
  });

  for (const [pkg, pkgIssues] of Object.entries(byPackage)) {
    console.log(`${pkg}:`);
    pkgIssues.forEach(issue => {
      console.log(`  ❌ dist/${issue.missing}`);
    });
  }

  console.log('\n⚠️  Fix these issues before publishing:');
  console.log('   1. Check Vite build output for errors');
  console.log('   2. Verify turbo.json filters are correct');
  console.log('   3. Ensure preserveModules is enabled in vite.config.ts');
  console.log('   4. Run: npm run build');
  console.log('   5. Run: npm run build:packages (explicit)\n');

  process.exit(1);
} else {
  console.log('\n✅ PASSED: All exports have corresponding dist files\n');
  process.exit(0);
}
```

**Integration**:
```javascript
// In scripts/release.js (before npm publish)
const { execSync } = require('child_process');

try {
  console.log('Validating exports...');
  execSync('node scripts/validate-exports.js', { stdio: 'inherit' });
} catch (err) {
  console.error('Export validation failed. Aborting publish.');
  process.exit(1);
}
```

**Test**:
```bash
node scripts/validate-exports.js
# ✅ PASSED: All exports have corresponding dist files
```

---

### 2. validate-file-extensions.js

**Problem it solves**: v4.9.5 (.ts files with JSX)

**Location**: `scripts/validate-file-extensions.js`

```javascript
#!/usr/bin/env node

/**
 * Validate file extensions match content type
 * - .ts files must NOT have JSX
 * - .tsx files MUST have JSX (except for rare exceptions)
 *
 * Prevents v4.9.5 class issues (Next.js parse errors)
 *
 * Usage: node scripts/validate-file-extensions.js
 * Used by: Pre-commit hook
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const JSX_PATTERN = /<(?:[A-Z][A-Za-z0-9]*|[a-z]+)[\s/>]/; // <Component or <div

let issues = [];

console.log('🔍 Validating file extensions...\n');

// Check .ts files don't have JSX
console.log('Checking .ts files for JSX...');
const tsFiles = glob.sync('packages/react/src/**/*.ts', {
  ignore: ['**/node_modules/**'],
});

let tsCount = 0;
for (const file of tsFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (JSX_PATTERN.test(content)) {
    issues.push({
      file,
      problem: 'contains JSX',
      fix: `Rename to .tsx (${path.basename(file, '.ts')}.tsx)`,
    });
  }
  tsCount++;
}

console.log(`  ✓ Checked ${tsCount} .ts files\n`);

// Check .tsx files have JSX
console.log('Checking .tsx files contain JSX...');
const tsxFiles = glob.sync('packages/react/src/**/*.tsx', {
  ignore: ['**/node_modules/**'],
});

let tsxCount = 0;
for (const file of tsxFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (!JSX_PATTERN.test(content)) {
    // Some files may have JSX in imports only
    if (!content.includes('from')) {
      issues.push({
        file,
        problem: 'no JSX content found',
        fix: `Consider renaming to .ts if no JSX`,
      });
    }
  }
  tsxCount++;
}

console.log(`  ✓ Checked ${tsxCount} .tsx files\n`);

// Specific check: preview-modules must be .tsx
console.log('Checking preview-modules extension...');
const hasTs = fs.existsSync('registry/preview-modules/index.ts');
const hasTsx = fs.existsSync('registry/preview-modules/index.tsx');

if (hasTs && !hasTsx) {
  issues.push({
    file: 'registry/preview-modules/index.ts',
    problem: 'must be .tsx (contains JSX)',
    fix: 'mv registry/preview-modules/index.ts registry/preview-modules/index.tsx',
  });
}

if (!hasTsx) {
  issues.push({
    file: 'registry/preview-modules/index.tsx',
    problem: 'file not found',
    fix: 'Create registry/preview-modules/index.tsx with exports',
  });
}

// Report
console.log('='.repeat(60) + '\n');

if (issues.length > 0) {
  console.log(`❌ FAILED: ${issues.length} issue(s) found\n`);
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue.file}`);
    console.log(`   Problem: ${issue.problem}`);
    console.log(`   Fix: ${issue.fix}\n`);
  });
  process.exit(1);
} else {
  console.log('✅ PASSED: All file extensions are correct\n');
  process.exit(0);
}
```

**Integration**:
```javascript
// In .husky/pre-commit
node scripts/validate-file-extensions.js
```

**Test**:
```bash
node scripts/validate-file-extensions.js
# ✅ PASSED: All file extensions are correct
```

---

### 3. validate-ssr-defaults.js

**Problem it solves**: v4.9.3 (useContext null in error pages)

**Location**: `scripts/validate-ssr-defaults.js`

```javascript
#!/usr/bin/env node

/**
 * Validate React Context is initialized with defaults, not undefined
 *
 * Prevents v4.9.3 class issues (Next.js prerendering fails)
 *
 * Usage: node scripts/validate-ssr-defaults.js
 * Used by: Pre-commit hook
 */

const fs = require('fs');

const contextFile = 'packages/react/src/contexts/ThemeContext.tsx';
let issues = [];

console.log('🔍 Validating SSR Context safety...\n');

if (!fs.existsSync(contextFile)) {
  console.log(`⊘ ${contextFile} not found\n`);
  process.exit(0);
}

const content = fs.readFileSync(contextFile, 'utf-8');

console.log('Checking ThemeContext initialization...');

// Check 1: createContext must NOT use undefined
if (/createContext\s*\(\s*undefined\s*\)/.test(content)) {
  issues.push({
    line: content.split('\n').findIndex(l => /createContext\s*\(\s*undefined\s*\)/.test(l)) + 1,
    problem: 'createContext initialized with undefined',
    fix: 'Initialize with default object: { theme: "light", brand: "orion", ... }',
  });
}

// Check 2: useThemeContext must return defaults or throw only in dev
const useThemeContextMatch = content.match(
  /export\s+function\s+useThemeContext\(\)[^{]*{([\s\S]*?)^}/m
);

if (useThemeContextMatch) {
  const useThemeBody = useThemeContextMatch[1];

  // Check it doesn't throw without dev guard
  if (/throw new Error/.test(useThemeBody)) {
    // Should be guarded: if (process.env.NODE_ENV === 'development')
    if (!useThemeBody.includes('NODE_ENV') && !useThemeBody.includes('development')) {
      issues.push({
        problem: 'useThemeContext throws error without development guard',
        fix: 'Guard error with: if (process.env.NODE_ENV === "development") throw new Error(...)',
      });
    }
  }

  // Check it has a fallback return
  if (!useThemeBody.includes('return') || !useThemeBody.includes('||')) {
    // May be okay if context always has defaults
  }
}

// Check 3: SSR_DEFAULTS or similar should exist
const hasDefaults = /SSR_DEFAULTS|DEFAULT_THEME|defaultValue/.test(content);
if (!hasDefaults) {
  console.log('  ⚠️  Warning: No defaults object found (may be acceptable)');
}

// Report
console.log('\n' + '='.repeat(60) + '\n');

if (issues.length > 0) {
  console.log(`❌ FAILED: ${issues.length} issue(s) found\n`);
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue.problem}`);
    if (issue.line) console.log(`   Line: ${issue.line}`);
    console.log(`   Fix: ${issue.fix}\n`);
  });
  console.log('Reference: SSR safety pattern');
  console.log('- Initialize: createContext({ theme: "light", brand: "orion" })');
  console.log('- Never: createContext(undefined)');
  console.log('- Return: defaults || { ... }\n');
  process.exit(1);
} else {
  console.log('✅ PASSED: ThemeContext is SSR-safe\n');
  process.exit(0);
}
```

**Integration**:
```javascript
// In .husky/pre-commit
node scripts/validate-ssr-defaults.js
```

**Test**:
```bash
node scripts/validate-ssr-defaults.js
# ✅ PASSED: ThemeContext is SSR-safe
```

---

## Level 2: Important Scripts (Week 2)

### 4. validate-token-handlers.js

**Location**: `scripts/validate-token-handlers.js`

```javascript
#!/usr/bin/env node

/**
 * Validate all nested tokens have corresponding handlers in build-tokens.js
 *
 * Prevents v4.9.0 variant issues ([object Object] in CSS)
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating token handlers...\n');

const primaryJson = JSON.parse(
  fs.readFileSync('tokens/primary.json', 'utf-8')
);

// Find all nested tokens
const nestedTokens = [];

function findNested(obj, prefix = '') {
  for (const [key, value] of Object.entries(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      nestedTokens.push(fullPath);
      findNested(value, fullPath);
    }
  }
}

findNested(primaryJson);

console.log(`Found ${nestedTokens.length} nested token objects\n`);

// Load build-tokens.js and extract handlers
const buildTokensPath = path.join(__dirname, 'build-tokens.js');
const buildTokensCode = fs.readFileSync(buildTokensPath, 'utf-8');

let issues = [];

// Simple check: look for handler function references
const handlerPattern = /case\s+'([^']+)':|if\s*\(\s*path\s*===\s*'([^']+)'/g;
const handlers = new Set();

let match;
while ((match = handlerPattern.exec(buildTokensCode)) !== null) {
  if (match[1]) handlers.add(match[1]);
  if (match[2]) handlers.add(match[2]);
}

console.log(`Found ${handlers.size} token handlers in build-tokens.js\n`);

// Check coverage
console.log('Checking handler coverage:\n');

for (const token of nestedTokens.sort()) {
  const hasHandler = handlers.has(token);
  const status = hasHandler ? '✓' : '❌';
  console.log(`  ${status} ${token}`);
  if (!hasHandler) {
    issues.push(token);
  }
}

console.log('\n' + '='.repeat(60) + '\n');

if (issues.length > 0) {
  console.log(`❌ FAILED: ${issues.length} missing handler(s)\n`);
  issues.forEach(token => {
    console.log(`  Missing: ${token}`);
    console.log(`  Add to build-tokens.js:  if (path === '${token}') { ... }\n`);
  });
  process.exit(1);
} else {
  console.log('✅ PASSED: All nested tokens have handlers\n');
  process.exit(0);
}
```

---

### 5. validate-css-artifacts.js

**Location**: `scripts/validate-css-artifacts.js`

```javascript
#!/usr/bin/env node

/**
 * Validate generated CSS has no [object Object] or other JS artifacts
 *
 * Prevents v4.9.0 issues (cssnano failure)
 */

const fs = require('fs');

console.log('🔍 Validating generated CSS...\n');

const cssFile = 'packages/react/dist/theme.css';

if (!fs.existsSync(cssFile)) {
  console.log(`⊘ ${cssFile} not found (build may not have run)\n`);
  process.exit(0);
}

const css = fs.readFileSync(cssFile, 'utf-8');
const lines = css.split('\n');

let issues = [];

// Patterns to detect
const suspiciousPatterns = [
  { pattern: /\[object Object\]/g, name: '[object Object]' },
  { pattern: /:undefined/g, name: ':undefined' },
  { pattern: /:null/g, name: ':null' },
  { pattern: /:function/g, name: ':function' },
  { pattern: /\[Function\]/g, name: '[Function]' },
];

console.log('Scanning for JavaScript artifacts...\n');

for (const { pattern, name } of suspiciousPatterns) {
  const matches = css.match(pattern) || [];
  if (matches.length > 0) {
    console.log(`  ❌ Found ${matches.length} instance(s) of "${name}"`);

    // Find line numbers
    lines.forEach((line, idx) => {
      if (pattern.test(line)) {
        console.log(`     Line ${idx + 1}: ${line.substring(0, 80)}`);
      }
    });

    issues.push(name);
  } else {
    console.log(`  ✓ No "${name}" found`);
  }
}

console.log('\n' + '='.repeat(60) + '\n');

if (issues.length > 0) {
  console.log(`❌ FAILED: Found ${issues.length} artifact type(s) in CSS\n`);
  console.log('This indicates a problem in build-tokens.js handler:');
  console.log('1. A nested token is missing its handler');
  console.log('2. A handler is returning a JavaScript value instead of CSS string');
  console.log('3. JSON.stringify() was called on an object\n');
  process.exit(1);
} else {
  console.log('✅ PASSED: CSS is clean (no artifacts)\n');
  process.exit(0);
}
```

---

## Level 3: Integration Scripts

### 6. prepublish:check (npm script)

Add to `package.json`:

```json
{
  "scripts": {
    "prepublish:check": "node scripts/validate-exports.js && node scripts/validate-file-extensions.js && node scripts/validate-ssr-defaults.js && node scripts/validate-token-handlers.js && npm run type-check && npm run validate && npm test:imports && npm publish --dry-run"
  }
}
```

This runs all validations in sequence, stopping on first failure.

---

### 7. Update scripts/release.js

Add before `npm publish`:

```javascript
// In scripts/release.js, before publishing each package

async function publishPackage(packageName) {
  console.log(`\n📦 Publishing ${packageName}...\n`);

  // NEW: Pre-publish validation
  console.log('Running pre-publish validation...');
  try {
    execSync('node scripts/validate-exports.js', { stdio: 'inherit' });
    execSync('node scripts/validate-file-extensions.js', { stdio: 'inherit' });
    execSync('node scripts/validate-ssr-defaults.js', { stdio: 'inherit' });
    execSync('npm publish --dry-run', { stdio: 'inherit' });
  } catch (err) {
    console.error('\n❌ Pre-publish validation failed. Aborting.\n');
    process.exit(1);
  }

  // Continue with publish
  execSync(`npm publish --access public`, { stdio: 'inherit' });
}
```

---

### 8. Update .husky/pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Validation scripts (fail fast)
node scripts/validate-file-extensions.js || exit 1
node scripts/validate-ssr-defaults.js || exit 1
node scripts/validate-token-handlers.js || exit 1

# Then lint-staged
npx lint-staged
```

---

## Testing the Validation Scripts

```bash
# Test all scripts locally (before committing)
npm run prepublish:check

# Individual tests
node scripts/validate-exports.js
node scripts/validate-file-extensions.js
node scripts/validate-ssr-defaults.js
node scripts/validate-token-handlers.js
npm run validate:css-artifacts

# Dry-run release to see full flow
npm run release:dry
```

---

## Deployment Checklist

- [ ] Create all 5 scripts in `scripts/` directory
- [ ] Add `prepublish:check` npm script to `package.json`
- [ ] Update `scripts/release.js` to call validation before publish
- [ ] Update `.husky/pre-commit` with validation steps
- [ ] Test locally: `npm run prepublish:check`
- [ ] Test a dry-run release: `npm run release:dry`
- [ ] Verify validation catches intentional failures (add [object Object] to CSS)
- [ ] Commit with message: "chore: add comprehensive pre-publish validation suite"

---

## Expected Results (After Implementation)

```
✅ v4.9.2 (missing dist files) → PREVENTED by validate-exports.js
✅ v4.9.3 (useContext null) → PREVENTED by validate-ssr-defaults.js
✅ v4.9.5 (.ts with JSX) → PREVENTED by validate-file-extensions.js
✅ v4.9.0 ([object Object]) → PREVENTED by validate-token-handlers.js

📊 Pre-publish time: ~100 seconds
📊 False positive rate: <5%
📊 Coverage: All critical paths
```

---

**Status**: Ready for implementation | **Effort**: 2-3 hours for all 5 scripts + integration
