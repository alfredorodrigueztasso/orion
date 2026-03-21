# CI/CD Improvement Plan — Prevent v4.9.2 & v4.9.5 Regressions

**Status**: 📋 PLAN DOCUMENT (Review Before Implementation)
**Date**: 2026-03-21
**Context**: Analysis of FRICTION_LOG.md issues to strengthen release validation
**Owner**: Backend/Infra Developer

---

## Executive Summary

Orion has experienced two critical release issues:
- **v4.9.2**: Missing all JavaScript files (only theme.css published) — **CRITICAL**
- **v4.9.5**: Wrong file extension for JSX (`.ts` instead of `.tsx`) — **HIGH**

This plan adds 2 validation scripts and integrates them into the release pipeline to catch these issues **before** publish.

**Current State**:
- ✅ `scripts/validate-exports.js` exists and works (catches missing dist files)
- ✅ `scripts/validate-build-completeness.js` exists (comprehensive build validation)
- ❌ `scripts/validate-file-extensions.js` does NOT exist (NEW — needed for v4.9.5 prevention)
- ❌ Integration in release.js is INCOMPLETE (validates exports but not file extensions)

---

## Issue Analysis

### Issue 1: v4.9.2 — Missing Dist Files (RESOLVED via validate-exports.js)

**What Happened**:
- package.json declared exports for 10+ subpaths (`.`, `/client`, `/blocks`, `/tokens`, `/chart`, `/calendar`, `/editor`, `/dnd`, `/rich`)
- Vite build FAILED silently or partially
- Published npm package contained **ONLY** `theme.css`, no `.mjs/.cjs/.d.ts` files
- All imports from @orion-ds/react failed downstream

**Root Cause** (Line 261 in FRICTION_LOG.md):
- Build process incomplete
- Vite config or TypeScript compilation error not caught before publish

**Current Prevention** (Already Implemented):
- `scripts/validate-exports.js` (line 279 in release.js)
- Checks every export path in package.json
- Validates corresponding dist files exist before npm publish
- Exit code 1 blocks publish if validation fails

**Validation**: ✅ WORKING (used in release.js line 281)

---

### Issue 2: v4.9.5 — Wrong File Extension for JSX (NEEDS NEW VALIDATOR)

**What Happened**:
- File: `registry/preview-modules/index.ts` (line 1 is `'use client'`)
- Content: **Full React JSX code** (div, components, React hooks from line 57+)
- Extension: `.ts` (TypeScript only, NO JSX support)
- Next.js parser: Treats `<div>` as TypeScript generic syntax
- Error (line 409-413): `Error: Expected '>', got 'style'` — syntax error

**Root Cause** (Lines 423-424):
```
Files with JSX should use `.tsx` extension.
This is standard in every React/Next.js project.
```

**Why Current Validators Don't Catch This**:
1. `validate-exports.js` — Only checks if files exist, not their content
2. `validate-build-completeness.js` — Only checks dist/ directory completeness
3. Neither validates **source file extensions** match their content

**What's Needed**:
- New script: `scripts/validate-file-extensions.js`
- Detects `.ts` files with JSX markers (`<...>` tags)
- Detects `.tsx` files without JSX (warns only, doesn't block)
- Suggests renames
- Integrated into pre-commit hook (early catch) AND release validation (final catch)

---

## Solution: Two Validators + Integration

### Architecture Decision

| Validator | Purpose | Scope | When Run | Block? |
|-----------|---------|-------|----------|--------|
| **validate-exports.js** | Ensures all package.json exports have dist files | dist/ directory | Pre-publish | YES |
| **validate-build-completeness.js** | Full build audit (dist size, no orphans, min files) | dist/ directory | Pre-publish | YES |
| **validate-file-extensions.js** (NEW) | Prevents .ts with JSX / .tsx without JSX | Source files | Pre-commit + Pre-publish | WARN on .tsx without JSX, BLOCK on .ts with JSX |

**Integration Points**:
1. **Pre-commit hook**: Early warning (developers catch errors before pushing)
2. **Pre-publish validation** (release.js): Final validation before npm publish
3. **CI/CD** (GitHub Actions): Automated on every PR

---

## Implementation Details

### Script 1: validate-file-extensions.js (NEW)

**Purpose**: Detect and report file extension mismatches

**Checks**:
```javascript
1. Find all .ts files in registry/ and packages/
2. Scan for JSX markers: /\<[A-Za-z]/g (opening tags)
3. Find all .tsx files
4. Scan for JSX markers - if NOT found, warn
5. Report results
```

**Logic Flow**:
```
✅ .ts file without JSX → OK
✅ .tsx file with JSX → OK
❌ .ts file WITH JSX → ERROR (block publish)
⚠️  .tsx file WITHOUT JSX → WARN (doesn't block)
```

**Error Message Examples**:

```bash
# ERROR: .ts with JSX → BLOCK
❌ CRITICAL: .ts file with JSX content
   File: registry/preview-modules/index.ts
   Issue: Contains JSX code (line 58: <div style={{...}}>)
   Fix: Rename to .tsx OR remove JSX

   npm run fix:extension-error registry/preview-modules/index.ts

Exit code: 1 (blocks publish)
```

```bash
# WARNING: .tsx without JSX → WARN ONLY
⚠️  HINT: .tsx file without JSX
   File: packages/react/src/utils/helpers.tsx
   Issue: No JSX found in .tsx file
   Suggestion: Rename to .ts for clarity (doesn't block)

Exit code: 0 (continues)
```

**Pseudocode**:
```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ANSI = { red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m' };

function validateFileExtensions(scanPath = '.') {
  const tsFiles = findFiles(scanPath, /\.ts$/);
  const tsxFiles = findFiles(scanPath, /\.tsx$/);

  const errors = [];   // .ts with JSX
  const warnings = []; // .tsx without JSX

  for (const file of tsFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (hasJSX(content)) {
      errors.push({
        file,
        type: 'ts-with-jsx',
        message: `${file} is .ts but contains JSX (line ${findJSXLineNumber(content)})`
      });
    }
  }

  for (const file of tsxFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (!hasJSX(content)) {
      warnings.push({
        file,
        type: 'tsx-without-jsx',
        message: `${file} is .tsx but has no JSX content`
      });
    }
  }

  // Report
  if (errors.length > 0) {
    console.error(`\n${ANSI.red}❌ CRITICAL: ${errors.length} file(s) have wrong extension${ANSI.reset}`);
    errors.forEach(e => console.error(`   ${e.file}: ${e.message}`));
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn(`\n${ANSI.yellow}⚠️  ${warnings.length} .tsx file(s) may not need JSX${ANSI.reset}`);
    warnings.forEach(w => console.warn(`   ${w.file}`));
    // Don't exit - just warn
  }

  console.log(`${ANSI.green}✅ File extensions validated${ANSI.reset}`);
  process.exit(0);
}

function hasJSX(content) {
  // Detect: <Component>, <div>, <span>, etc.
  return /<[A-Za-z][\w-]*[\s/>]/.test(content);
}

function findFiles(dir, pattern) {
  const results = [];
  const walk = (current) => {
    const items = fs.readdirSync(current);
    for (const item of items) {
      const fullPath = path.join(current, item);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && pattern.test(fullPath)) {
        results.push(fullPath);
      } else if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        walk(fullPath);
      }
    }
  };
  walk(dir);
  return results;
}

validateFileExtensions(process.argv[2] || '.');
```

**Scope for validation** (via CLI arg or default):
```bash
# Default (scan root)
node scripts/validate-file-extensions.js

# Specific path
node scripts/validate-file-extensions.js registry/
node scripts/validate-file-extensions.js packages/react/src/
```

---

### Script 2: Integration in release.js (UPDATE EXISTING)

**Current State** (line 279-287):
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

**Updated Code** (add file extension check):
```javascript
// ✅ Existing: Validate exports before publishing (prevents v4.9.2)
log(`  Validating exports...`);
const validateResult = exec(`node ${path.join(ROOT_DIR, 'scripts/validate-exports.js')} ${pkg.path}`);
if (!validateResult.success) {
  logError(`Export validation failed for ${pkg.name}`);
  publishResults.push({ pkg: pkg.name, success: false, error: 'Export validation failed' });
  continue;
}
logSuccess(`Exports validated`);

// ✅ NEW: Validate file extensions before publishing (prevents v4.9.5)
log(`  Validating source file extensions...`);
const extensionResult = exec(`node ${path.join(ROOT_DIR, 'scripts/validate-file-extensions.js')} ${pkg.path}`);
if (!extensionResult.success) {
  logError(`File extension validation failed for ${pkg.name}`);
  publishResults.push({ pkg: pkg.name, success: false, error: 'File extension validation failed' });
  continue;
}
logSuccess(`File extensions validated`);
```

**Key Points**:
- Runs AFTER build, BEFORE npm publish
- Blocks publish on error (exit code 1)
- Allows warnings (exit code 0) to continue

---

### Script 3: Pre-commit Integration (.husky/pre-commit)

**Current State**: Runs lint-staged with ESLint/Stylelint

**Add to .husky/pre-commit** (after lint-staged):
```bash
#!/bin/sh

# Existing: Run lint-staged
. "$(dirname "$0")/_/husky.sh"
npx lint-staged

# ✅ NEW: Validate file extensions before commit
echo "Validating file extensions..."
node scripts/validate-file-extensions.js . || {
  echo "❌ File extension validation failed. Fix the errors and try again."
  exit 1
}
```

**Effect**:
- Developers can't commit `.ts` files with JSX
- Caught immediately during `git commit`, not during release
- Can bypass with `git commit --no-verify` if absolutely needed

---

### Script 4: package.json npm scripts (ADD NEW)

**Current Scripts** (root package.json):
```json
"validate": "node scripts/validate-tokens.js",
"validate:theme": "node scripts/validate-tokens.js theme.css",
"validate:code": "node packages/validate/dist/cli.js",
"audit": "npm run validate && npm run type-check && echo '✅ Token audit passed'"
```

**Add to scripts**:
```json
"validate:file-extensions": "node scripts/validate-file-extensions.js",
"validate:build": "node scripts/validate-build-completeness.js",
"validate:exports": "node scripts/validate-exports.js",
"validate:pre-publish": "npm run validate:exports && npm run validate:file-extensions && npm run validate:build"
```

**Usage**:
```bash
npm run validate:file-extensions         # Quick check before commit
npm run validate:pre-publish             # Full pre-publish validation
npm run audit                            # Comprehensive audit
```

---

## Integration Points

### 1. Pre-commit Hook (Immediate Feedback)

**File**: `.husky/pre-commit`
**When**: Before `git commit`
**What**: Validates file extensions in changed files
**Impact**: Catches mistakes before they're committed

```bash
# Add to .husky/pre-commit after lint-staged
node scripts/validate-file-extensions.js . && echo "✅ File extensions OK"
```

### 2. Pre-publish Validation (Release Script)

**File**: `scripts/release.js`
**When**: Before each `npm publish` in release.js (line ~280)
**What**: Validates exports + file extensions for package being published
**Impact**: Blocks broken releases from reaching npm

```javascript
// In release() function, before npm publish:
const validateExports = exec(`node scripts/validate-exports.js ${pkg.path}`);
const validateExtensions = exec(`node scripts/validate-file-extensions.js ${pkg.path}`);

if (!validateExports.success || !validateExtensions.success) {
  logError(`Validation failed for ${pkg.name}`);
  process.exit(1);
}
```

### 3. GitHub Actions Workflow (Automated CI)

**File**: `.github/workflows/validate.yml` (CREATE NEW)
**When**: On every PR/push to main
**What**: Runs all validators
**Impact**: Catches issues in CI before merge

```yaml
name: Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Validate file extensions
        run: npm run validate:file-extensions

      - name: Validate exports
        run: npm run validate:exports

      - name: Validate build completeness
        run: npm run validate:build

      - name: Full audit
        run: npm run audit
```

### 4. CI/CD Chain

```
git commit → .husky/pre-commit → validate-file-extensions → ✅/❌
   ↓
git push → GitHub Actions → validate.yml → all validators → ✅/❌
   ↓
npm run release:patch → release.js → validate-exports + validate-file-extensions → npm publish → ✅/❌
```

---

## Changes Required

### Files to Create
- ✅ `scripts/validate-file-extensions.js` (NEW — ~150 lines)
- ✅ `.github/workflows/validate.yml` (NEW — ~50 lines)

### Files to Modify
- ✅ `scripts/release.js` (+10 lines to add extension validation)
- ✅ `package.json` (+5 lines for new npm scripts)
- ✅ `.husky/pre-commit` (+2 lines for pre-commit validation)

### No Changes Needed
- ❌ `turbo.json` (current config sufficient)
- ❌ `tsconfig.json` (no TypeScript config changes)
- ❌ `vite.config.ts` (build output already correct)

---

## Validation Strategy Before Implementation

**CRITICAL**: Verify each issue is real before building validators:

### Verify Issue #1: v4.9.2 (Missing dist files)

**Current**: ✅ VALIDATED
- `scripts/validate-exports.js` exists
- `release.js` calls it (line 281)
- Used in `npm run release:patch`

**Test**:
```bash
# Should validate successfully
node scripts/validate-exports.js packages/react

# Should show: "✅ Exports validation passed: 10 exports verified"
```

### Verify Issue #2: v4.9.5 (Wrong file extension)

**Current**: ⚠️ NEEDS VERIFICATION
- File: `registry/preview-modules/index.ts` exists
- Content: Contains JSX code (checked ✅ line 58: `<div style={{...}}>`)
- Problem: `.ts` extension + JSX content = syntax error in Next.js

**Test**:
```bash
# Check if file has JSX
grep -n '<[A-Za-z]' registry/preview-modules/index.ts | head -3

# Output should show lines with JSX tags
# Line 58: const ButtonPreviews = () => (
# Line 58:   <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap', alignItems: 'center' }}>

# ✅ Confirms: JSX is present in .ts file
```

**Reproduce Error**:
```bash
# This would fail with error like v4.9.5 in Next.js
# (Not testing directly as it requires docs-site setup)
```

### Verify Issue #3: Impact on Downstream Projects

**What We Know** (from FRICTION_LOG.md):
- docs-site upgrade to 4.9.2 failed: "Module not found: Can't resolve '@orion-ds/react'"
- docs-site upgrade to 4.9.5 failed: "Error: Expected '>', got 'style'" at registry/preview-modules/index.ts:58

**Both issues blocked downstream consumption** ✅ Confirmed

---

## Success Criteria

After implementation:

### Criterion 1: Pre-commit Validation Works
```bash
# Create a .ts file with JSX
echo "export const Test = () => <div>Test</div>;" > test.ts

# Commit should fail
git add test.ts
git commit -m "test"

# Expected: ❌ File extension validation failed
# Fix: mv test.ts test.tsx && git add test.tsx
```

### Criterion 2: Release Validation Blocks Bad Publishes
```bash
# In a package's dist, rename a required .mjs file
mv dist/index.mjs dist/index.mjs.bak

# Release should fail at validation
npm run release:patch

# Expected: ❌ Export validation failed: Missing "." (import) → ./dist/index.mjs
# Fix: mv dist/index.mjs.bak dist/index.mjs
```

### Criterion 3: CI/CD Catches Issues
```bash
# Push PR with .ts file containing JSX
git push origin feature/my-component

# GitHub Actions should fail
# Status: ❌ Validate file extensions

# Fix: rename .ts to .tsx
git add -u
git commit -m "fix: rename to .tsx"
git push
```

---

## Timeline & Implementation Order

| Phase | Task | Duration | Owner |
|-------|------|----------|-------|
| 1 | Create `validate-file-extensions.js` | 2 hours | Backend Dev |
| 2 | Update `release.js` to call new validator | 30 min | Backend Dev |
| 3 | Add npm scripts to `package.json` | 15 min | Backend Dev |
| 4 | Update `.husky/pre-commit` for pre-commit validation | 15 min | Backend Dev |
| 5 | Create GitHub Actions workflow `validate.yml` | 1 hour | Backend Dev |
| 6 | Test all 3 validators end-to-end | 1.5 hours | QA |
| 7 | Commit & document in git | 30 min | Backend Dev |
| **Total** | **Implementation** | **~5.5 hours** | |

---

## Rollback Plan

If validation proves too strict:

1. **Warnings-only mode**: Change validator exit code from 1 to 0 for warnings
2. **Pre-commit bypass**: Use `--no-verify` flag (documented, not recommended)
3. **Disable validator**: Comment out validation call in release.js temporarily

**Risk Level**: 🟢 LOW (non-breaking, adds validation only)

---

## Open Questions

1. **Should pre-commit validation be strict or warning-only?**
   - Current plan: Strict (exit 1, blocks commit)
   - Alternative: Warning-only (exit 0, allows commit but warns)

2. **Where should file-extension validation run?**
   - Current plan: Root level (all .ts/.tsx files)
   - Alternative: Only check specific directories (registry/, packages/react/src/)

3. **Should we auto-fix or only report?**
   - Current plan: Report only (developers rename manually)
   - Alternative: Add `npm run fix:extensions` to auto-rename files

4. **How to handle generated files?**
   - Some `.d.ts` files are auto-generated and don't need JSX
   - Should we skip `dist/**` and `.generated.ts` patterns?

---

## References

- **FRICTION_LOG.md** (Full issue history)
  - Line 223: v4.9.2 missing dist files (CRITICAL)
  - Line 392: v4.9.5 file extension issue (HIGH)
  - Line 370: validate-exports.js already implemented

- **scripts/release.js**
  - Line 279-287: Current validation (exports only)
  - Line 249-257: Package list and turbo filter

- **scripts/validate-exports.js**
  - Existing implementation (can use as reference)
  - Checks both string and object exports

- **registry/preview-modules/index.ts**
  - Line 1: `'use client';` directive
  - Line 57-100: JSX components (ButtonPreviews, CardPreviews, etc.)
  - Contains 35+ component preview definitions

---

## Summary

This plan prevents future v4.9.2 and v4.9.5 incidents by:

1. ✅ **Already done**: validate-exports.js catches missing dist files
2. ✅ **Needed**: validate-file-extensions.js catches wrong extensions
3. ✅ **Needed**: Integration in release.js pre-publish validation
4. ✅ **Needed**: Pre-commit hook for early feedback
5. ✅ **Needed**: GitHub Actions workflow for CI/CD automation

**Next Step**: Review this plan, then proceed to implementation phase.
