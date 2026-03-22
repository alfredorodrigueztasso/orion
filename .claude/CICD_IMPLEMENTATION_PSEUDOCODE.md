# Implementation Pseudocode & Code Sketches

**Status**: 📝 READY FOR DEVELOPER IMPLEMENTATION
**Date**: 2026-03-21

---

## Script 1: validate-file-extensions.js

### Detailed Pseudocode

```javascript
#!/usr/bin/env node

/**
 * Validate File Extensions
 *
 * Prevents .ts files with JSX (which breaks in Next.js parsers)
 * Warns about .tsx files without JSX
 *
 * Exit codes:
 * - 0: All valid (or warnings only)
 * - 1: Critical errors found (blocks publish/commit)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ANSI_COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m'
};

const SKIP_PATTERNS = [
  /\.d\.ts$/,              // TypeScript declarations
  /\.generated\./,         // Auto-generated files
  /node_modules/,          // Dependencies
  /dist\//,                // Build output
  /\.next/,                // Next.js output
  /\.vercel/,              // Vercel output
  /build\//,               // Build directories
  /coverage\//,            // Test coverage
  /\.git/,                 // Git files
];

const JSX_PATTERN = /<[A-Za-z][\w:.-]*[\s/>]/; // Matches <Component>, <div>, etc.

// Logging helpers
function log(msg, color = '') {
  console.log(`${color}${msg}${ANSI_COLORS.reset}`);
}

function logError(msg) {
  console.error(`${ANSI_COLORS.red}✗${ANSI_COLORS.reset} ${msg}`);
}

function logWarn(msg) {
  console.warn(`${ANSI_COLORS.yellow}⚠${ANSI_COLORS.reset} ${msg}`);
}

function logSuccess(msg) {
  console.log(`${ANSI_COLORS.green}✓${ANSI_COLORS.reset} ${msg}`);
}

// Main validation function
function validateFileExtensions(rootPath = '.') {
  log(`\n${ANSI_COLORS.bright}File Extension Validation${ANSI_COLORS.reset}`);
  log(`${ANSI_COLORS.cyan}${'='.repeat(50)}${ANSI_COLORS.reset}`);

  // Step 1: Find all .ts and .tsx files
  const tsFiles = findFiles(rootPath, /\.ts$/);
  const tsxFiles = findFiles(rootPath, /\.tsx$/);

  log(`\nScanning ${tsFiles.length + tsxFiles.length} TypeScript files...`);

  // Step 2: Categorize files
  const errors = [];    // .ts with JSX (CRITICAL)
  const warnings = [];  // .tsx without JSX (WARNING)

  // Check .ts files for JSX
  for (const file of tsFiles) {
    if (shouldSkipFile(file)) continue;

    const content = fs.readFileSync(file, 'utf8');
    if (hasJSX(content)) {
      const lineNum = findJSXLineNumber(content);
      errors.push({
        file,
        type: 'ts-with-jsx',
        lineNum,
        message: `Contains JSX starting at line ${lineNum}`
      });
    }
  }

  // Check .tsx files for JSX (should have it)
  for (const file of tsxFiles) {
    if (shouldSkipFile(file)) continue;

    const content = fs.readFileSync(file, 'utf8');
    if (!hasJSX(content)) {
      // Only warn if file is not a hook or utility
      if (!isHookOrUtility(file)) {
        warnings.push({
          file,
          type: 'tsx-without-jsx',
          message: 'Is .tsx but does not contain JSX'
        });
      }
    }
  }

  // Step 3: Report results
  if (errors.length > 0) {
    log(`\n${ANSI_COLORS.red}${ANSI_COLORS.bright}ERRORS: ${errors.length} file(s) have wrong extension${ANSI_COLORS.reset}`);

    for (const err of errors) {
      logError(`${err.file}:${err.lineNum}`);
      console.error(`   Issue: ${err.message}`);
      console.error(`   Fix: Rename .ts to .tsx OR remove JSX code`);
      console.error('');
    }

    log(`${ANSI_COLORS.red}Validation FAILED${ANSI_COLORS.reset}`);
    return 1; // EXIT CODE 1 = BLOCK
  }

  if (warnings.length > 0) {
    log(`\n${ANSI_COLORS.yellow}Warnings: ${warnings.length} file(s) may not need .tsx${ANSI_COLORS.reset}`);
    for (const warn of warnings) {
      logWarn(`${warn.file}`);
      console.warn(`   Suggestion: Rename to .ts (optional, doesn't block)`);
    }
  }

  logSuccess(`All file extensions validated${
    errors.length === 0 ? ' ✓' : ''
  }`);
  return 0; // EXIT CODE 0 = PASS
}

// Helper functions
function findFiles(rootPath, pattern) {
  const results = [];

  function walk(dir) {
    let items = [];
    try {
      items = fs.readdirSync(dir);
    } catch (e) {
      return; // Skip unreadable directories
    }

    for (const item of items) {
      const fullPath = path.join(dir, item);

      // Skip hidden directories and node_modules
      if (item.startsWith('.') || item === 'node_modules') continue;

      try {
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && pattern.test(fullPath)) {
          // Verify not in skip patterns
          if (!shouldSkipFile(fullPath)) {
            results.push(fullPath);
          }
        } else if (stat.isDirectory()) {
          walk(fullPath);
        }
      } catch (e) {
        // Skip files we can't stat
      }
    }
  }

  walk(rootPath);
  return results;
}

function shouldSkipFile(filePath) {
  return SKIP_PATTERNS.some(pattern => pattern.test(filePath));
}

function hasJSX(content) {
  // Skip files that are just comments/imports
  const codeLines = content
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('//') && !line.trim().startsWith('*'))
    .join('\n');

  return JSX_PATTERN.test(codeLines);
}

function findJSXLineNumber(content) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (JSX_PATTERN.test(lines[i])) {
      return i + 1;
    }
  }
  return 1;
}

function isHookOrUtility(filePath) {
  // Heuristic: hooks and utilities often don't have JSX
  const fileName = path.basename(filePath);
  return (
    fileName.startsWith('use') ||
    fileName.includes('hook') ||
    fileName.includes('util') ||
    fileName.includes('helper') ||
    fileName.includes('service')
  );
}

// Entry point
function main() {
  const scanPath = process.argv[2] || '.';

  if (!fs.existsSync(scanPath)) {
    logError(`Path not found: ${scanPath}`);
    process.exit(1);
  }

  const exitCode = validateFileExtensions(scanPath);
  process.exit(exitCode);
}

main();
```

### Usage Examples

```bash
# Validate root directory
node scripts/validate-file-extensions.js

# Validate specific directory
node scripts/validate-file-extensions.js packages/react/src/
node scripts/validate-file-extensions.js registry/

# Exit codes
# 0 = all valid
# 1 = errors found (blocks publish)
```

### Test Cases

```bash
# Test 1: Detect .ts with JSX
echo "export const Test = () => <div>Test</div>;" > test.ts
node scripts/validate-file-extensions.js .
# Expected: ❌ ERROR

# Test 2: Accept .tsx with JSX
echo "export const Test = () => <div>Test</div>;" > test.tsx
node scripts/validate-file-extensions.js .
# Expected: ✅ PASS

# Test 3: Warn about .tsx without JSX
echo "export const helper = () => 'string';" > test.tsx
node scripts/validate-file-extensions.js .
# Expected: ⚠️  WARN (doesn't block)

# Test 4: Accept .ts without JSX
echo "export const helper = () => 'string';" > test.ts
node scripts/validate-file-extensions.js .
# Expected: ✅ PASS
```

---

## Script 2: Integration in release.js

### Current Code (Lines 279-287)

```javascript
// Validate exports before publishing (prevents incidents like v4.9.2)
log(`  Validating exports...`);
const validateResult = exec(`node ${path.join(ROOT_DIR, 'scripts/validate-exports.js')} ${pkg.path}`);
if (!validateResult.success) {
  logError(`Export validation failed for ${pkg.name}`);
  publishResults.push({ pkg: pkg.name, success: false, error: 'Export validation failed' });
  continue;
}
logSuccess(`Exports validated`);
```

### Updated Code (Add 10 Lines)

```javascript
// Validate exports before publishing (prevents incidents like v4.9.2)
log(`  Validating exports...`);
const validateExportsResult = exec(
  `node ${path.join(ROOT_DIR, 'scripts/validate-exports.js')} ${pkg.path}`
);
if (!validateExportsResult.success) {
  logError(`Export validation failed for ${pkg.name}`);
  publishResults.push({ pkg: pkg.name, success: false, error: 'Export validation failed' });
  continue;
}
logSuccess(`Exports validated`);

// ✅ NEW: Validate file extensions before publishing (prevents incidents like v4.9.5)
log(`  Validating file extensions...`);
const validateExtensionsResult = exec(
  `node ${path.join(ROOT_DIR, 'scripts/validate-file-extensions.js')} ${pkg.path}`
);
if (!validateExtensionsResult.success) {
  logError(`File extension validation failed for ${pkg.name}`);
  publishResults.push({ pkg: pkg.name, success: false, error: 'File extension validation failed' });
  continue;
}
logSuccess(`File extensions validated`);
```

### Integration Point in release.js

```
Line 264-300: publishResults loop
  ↓
  For each package:
    1. validate-exports.js    ✅ EXISTS
    2. validate-file-extensions.js  ✅ NEW (insert here)
    3. npm publish            (only if both pass)
```

---

## Script 3: Pre-commit Hook Integration

### Current .husky/pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

### Updated .husky/pre-commit

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Existing validation
npx lint-staged

# ✅ NEW: Validate file extensions before commit
echo "Validating file extensions..."

if ! node scripts/validate-file-extensions.js .; then
  echo ""
  echo "❌ File extension validation failed"
  echo "   Run: npm run validate:file-extensions -- packages/react/src/"
  echo "   And fix the errors before committing"
  exit 1
fi

echo "✅ File extensions validated"
exit 0
```

### Behavior

```
git commit -m "Add new component"
↓
.husky/pre-commit executes
↓
lint-staged runs      (ESLint, Prettier, etc.)
↓
validate-file-extensions.js runs
↓
❌ If .ts with JSX found → git commit REJECTED
✅ If all valid → git commit SUCCEEDS
```

---

## Script 4: package.json npm Scripts

### Current Scripts Section

```json
{
  "scripts": {
    "validate": "node scripts/validate-tokens.js",
    "validate:theme": "node scripts/validate-tokens.js theme.css",
    "validate:code": "node packages/validate/dist/cli.js",
    "audit": "npm run validate && npm run type-check && echo '✅ Token audit passed'"
  }
}
```

### Add These Lines

```json
{
  "scripts": {
    "validate": "node scripts/validate-tokens.js",
    "validate:theme": "node scripts/validate-tokens.js theme.css",
    "validate:code": "node packages/validate/dist/cli.js",
    "validate:file-extensions": "node scripts/validate-file-extensions.js",
    "validate:build": "node scripts/validate-build-completeness.js",
    "validate:exports": "node scripts/validate-exports.js",
    "validate:pre-publish": "npm run validate:exports && npm run validate:file-extensions && npm run validate:build",
    "audit": "npm run validate && npm run type-check && npm run validate:pre-publish && echo '✅ Full audit passed'"
  }
}
```

### New Workflow

```bash
# Before committing
npm run validate:file-extensions

# Before publishing
npm run validate:pre-publish

# Full audit
npm run audit
```

---

## Script 5: GitHub Actions Workflow

### File: .github/workflows/validate.yml

```yaml
name: Validation

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Validate file extensions
        run: npm run validate:file-extensions

      - name: Validate tokens
        run: npm run validate

      - name: Build
        run: npm run build:release

      - name: Validate exports
        run: npm run validate:exports

      - name: Validate build completeness
        run: npm run validate:build

      - name: Report status
        if: always()
        run: |
          echo "✅ All validations completed"
          exit 0
```

### Behavior on PR

```
Push to GitHub
↓
GitHub Actions triggered
↓
validate.yml runs all steps
↓
Each step checks for:
  - Type errors (tsc)
  - Lint errors (ESLint)
  - File extensions (our validator)
  - Token compliance (our validator)
  - Build output (our validator)
↓
❌ ANY FAILURE → PR shows red ✗
✅ ALL PASS → PR shows green ✓
↓
Merge blocked if checks fail (branch protection)
```

---

## Error Message Examples

### Error: .ts File with JSX

```bash
$ npm run validate:file-extensions

File Extension Validation
==================================================

Scanning 245 TypeScript files...

✗ ERRORS: 1 file(s) have wrong extension

✗ registry/preview-modules/index.ts:58
   Issue: Contains JSX starting at line 58
   Fix: Rename .ts to .tsx OR remove JSX code

Validation FAILED

Exit code: 1
```

### Error: In Release Process

```bash
$ npm run release:patch

[1/6] Checking npm authentication...
✓ Logged in as: orion-release-bot

[2/6] Calculating versions...
→ Current highest version: 4.9.5
→ New version: 4.9.6

[3/6] Updating package versions...
✓ Updated @orion-ds/react

[4/6] Running audit and build...
✓ Audit completed
✓ Build completed

[5/6] Publishing packages to npm...

  Publishing @orion-ds/react@4.9.6...
  Validating exports...
  ✓ Exports validated

  Validating file extensions...
  ✗ File extension validation failed for @orion-ds/react

  Error: CRITICAL: .ts file with JSX content
    File: registry/preview-modules/index.ts
    Issue: Contains JSX code (line 58: <div style={{...}}>)

    Fix: Rename to .tsx OR remove JSX

  ✗ Failed to publish @orion-ds/react

[6/6] Release Summary
==================================================

PARTIAL FAILURE

1/5 packages published.

Failed packages:
  - @orion-ds/react: File extension validation failed

Exit code: 1
```

### Warning: .tsx Without JSX

```bash
$ npm run validate:file-extensions

File Extension Validation
==================================================

Scanning 245 TypeScript files...

✓ All file extensions validated

Warnings: 2 file(s) may not need .tsx

⚠ packages/react/src/hooks/useTheme.tsx
   Suggestion: Rename to .ts (optional, doesn't block)

⚠ packages/react/src/utils/helpers.tsx
   Suggestion: Rename to .ts (optional, doesn't block)

Exit code: 0  # Continues despite warnings
```

---

## Implementation Checklist

### Phase 1: Create Script (2 hours)

- [ ] Copy validate-file-extensions.js pseudocode
- [ ] Create file: `scripts/validate-file-extensions.js`
- [ ] Test with 5 test cases (see Test Cases section above)
- [ ] Verify exit codes (0 = pass, 1 = fail)
- [ ] Run against actual codebase: `node scripts/validate-file-extensions.js`
- [ ] Verify no false positives on existing code

### Phase 2: Integrate in Release (30 min)

- [ ] Open `scripts/release.js`
- [ ] Find line 279-287 (validate exports section)
- [ ] Add 10 lines for validate-file-extensions call
- [ ] Test release: `npm run release:dry`
- [ ] Verify validation runs before publish attempt

### Phase 3: Add npm Scripts (15 min)

- [ ] Open root `package.json`
- [ ] Add 5 new validate scripts
- [ ] Test: `npm run validate:file-extensions`
- [ ] Test: `npm run validate:pre-publish`

### Phase 4: Pre-commit Hook (15 min)

- [ ] Open `.husky/pre-commit`
- [ ] Add 8 lines for validation call
- [ ] Create test file: `test.ts` with JSX
- [ ] Try to commit: `git add test.ts && git commit -m "test"`
- [ ] Verify commit is REJECTED by pre-commit hook
- [ ] Remove test file and verify normal commit works

### Phase 5: GitHub Actions Workflow (1 hour)

- [ ] Create `.github/workflows/validate.yml`
- [ ] Push to PR branch
- [ ] Verify Actions workflow runs
- [ ] Check all steps pass
- [ ] Verify red ✗ if validation fails

### Phase 6: Testing & Documentation (1.5 hours)

- [ ] Test all 3 error scenarios:
  1. `.ts` file with JSX → blocks commit AND publish
  2. Missing dist file → blocks publish
  3. Build failure → fails validation
- [ ] Document in CICD_IMPLEMENTATION_GUIDE.md
- [ ] Create git commit with all changes
- [ ] Update MEMORY.md with completion status

---

## Testing Scenarios

### Scenario 1: Prevent v4.9.5-Style Issue

**Setup**:
```bash
# Create a .ts file with JSX
cat > test-component.ts << 'EOF'
export const TestComponent = () => (
  <div style={{ padding: '16px' }}>
    <h1>Test</h1>
  </div>
);
EOF
```

**Expected Behavior**:
```
# Pre-commit
git add test-component.ts
git commit -m "Add test"
→ .husky/pre-commit runs
→ validate-file-extensions.js detects .ts with JSX
→ ❌ COMMIT REJECTED
→ Message: "Fix: Rename .ts to .tsx"

# Fix
mv test-component.ts test-component.tsx
git add -u
git commit -m "Add test"
→ ✅ COMMIT SUCCEEDS
```

### Scenario 2: Prevent v4.9.2-Style Issue

**Setup**:
```bash
# Simulate incomplete build (missing .mjs file)
cd packages/react
rm -f dist/index.mjs
npm run release:patch
```

**Expected Behavior**:
```
npm run release:patch
→ Step 4: Audit and build ✅
→ Step 5: Publishing...
→ validate-exports.js runs
→ ❌ Missing: "." (import) → ./dist/index.mjs
→ ERROR: Export validation failed
→ ❌ PUBLISH BLOCKED
→ Exit code: 1
```

### Scenario 3: Normal Successful Release

**Setup**:
```bash
# No issues, everything built correctly
npm run release:patch
```

**Expected Behavior**:
```
npm run release:patch
→ Step 4: Audit and build ✅
→ Step 5: Publishing...
→ validate-exports.js ✓ (all files present)
→ validate-file-extensions.js ✓ (all extensions correct)
→ npm publish ✅
→ Exit code: 0
```

---

## Performance Notes

### Execution Time

```
validate-file-extensions.js:
  - ~500ms for typical monorepo
  - Scans ~300 TypeScript files
  - ~1.5ms per file

Added release overhead:
  - ~1s per package validation
  - Negligible vs 2-3min build time

Pre-commit hook overhead:
  - ~500ms (only validates changed files if integrated properly)
```

### Optimization for Large Codebases

If performance becomes an issue:

```javascript
// Only validate changed files in pre-commit
const changedFiles = exec('git diff --cached --name-only').output.split('\n');
const filesToCheck = changedFiles.filter(f => /\.ts$|\.tsx$/.test(f));
```

---

## Rollback Plan

If validation proves too strict:

### Option 1: Disable Warnings (Keep Errors)
```javascript
// In validate-file-extensions.js
if (warnings.length > 0) {
  // Comment out warning output
  // logWarn(...);
}
```

### Option 2: Skip Pre-commit Hook
```bash
git commit --no-verify  # Bypass pre-commit
```

### Option 3: Disable Validation in Release
```javascript
// In release.js
// Comment out:
// const validateExtensionsResult = exec(...);
```

---

## Next Steps

1. ✅ Review this pseudocode
2. ✅ Validate assumptions about file extensions
3. → Implement `validate-file-extensions.js`
4. → Test on current codebase
5. → Integrate in release.js
6. → Add npm scripts
7. → Update pre-commit hook
8. → Create GitHub Actions workflow
9. → Test all 3 scenarios
10. → Commit to main

