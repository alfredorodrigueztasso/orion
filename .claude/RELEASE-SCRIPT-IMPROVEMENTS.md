# Release Script Improvements - Optional Enhancement

**Status**: Optional (recommended for v4.9.4+)
**File**: `scripts/release.js`
**Change Type**: Add validation step before npm publish

---

## Problem This Solves

**Current flow**:
```
npm run audit
npm run build:release
npm publish                    ← No validation of dist/ completeness
```

**Issue**: Build can complete "successfully" but generate incomplete dist/ (as happened in v4.9.2)

**New flow**:
```
npm run audit
npm run build:release
npm run validate:preview-modules (optional, already implemented)
validate-dist-completeness      ← NEW: Prevents incomplete exports
npm publish                      ← Only runs if validation passed
```

---

## Implementation: Two Approaches

### Option A: Minimal (Recommended for v4.9.3)

Add one validation step in release.js **before publishing @orion-ds/react**:

**File**: `scripts/release.js`, line 249

**Location**: Add between "npm run build:release" (line 247) and "Publishing packages" (line 249)

**Insert this code**:

```javascript
  // Step 5a: Validate dist completeness for @orion-ds/react
  logStep('5a/7', 'Validating dist/ completeness...');

  if (!dryRun) {
    const validateScript = path.join(ROOT_DIR, 'packages/react/scripts/validate-dist-completeness.js');
    const validateResult = exec(`node ${validateScript}`, { silent: true });

    if (!validateResult.success) {
      logError('Dist validation failed for @orion-ds/react');
      logError('Build appears incomplete. Aborting publish.');
      logError('Please rebuild manually and verify all exports are present.');
      process.exit(1);
    }
    logSuccess('Dist validation passed for @orion-ds/react');
  } else {
    logInfo('Skipped (dry run)');
  }

  // Step 5b: Publish packages (renumber from Step 5)
  logStep('5b/7', 'Publishing packages to npm...');
```

**Changes needed**:
1. Rename existing "Step 5/6" comment to "Step 5b/7"
2. Rename existing "Step 6/6" comment to "Step 6/7"

---

### Option B: Comprehensive (For v4.9.4+)

Validate ALL packages before publishing:

```javascript
  // Step 5a: Validate all packages
  logStep('5a/7', 'Validating package completeness...');

  const validationErrors = [];

  for (const pkg of PACKAGES) {
    if (dryRun) {
      logInfo(`Would validate ${pkg.name}`);
    } else {
      if (pkg.path === 'packages/react') {
        // React has dist/ completeness check
        const validateScript = path.join(ROOT_DIR, 'packages/react/scripts/validate-dist-completeness.js');
        const validateResult = exec(`node ${validateScript}`, { silent: true });

        if (!validateResult.success) {
          validationErrors.push({
            pkg: pkg.name,
            error: 'Dist validation failed'
          });
        } else {
          logSuccess(`${pkg.name} dist/ validated`);
        }
      } else {
        // Other packages: check package.json exists
        const pkgJsonPath = path.join(ROOT_DIR, pkg.path, 'package.json');
        if (!fs.existsSync(pkgJsonPath)) {
          validationErrors.push({
            pkg: pkg.name,
            error: 'package.json not found'
          });
        } else {
          logSuccess(`${pkg.name} package.json found`);
        }
      }
    }
  }

  if (validationErrors.length > 0) {
    log('\n' + '-'.repeat(60));
    logError(`Validation failed for ${validationErrors.length} package(s):`);
    for (const error of validationErrors) {
      log(`  - ${error.pkg}: ${error.error}`);
    }
    log('-'.repeat(60));
    logError('Aborting publish. Please fix issues and retry.');
    process.exit(1);
  }

  // Step 5b: Publish packages (renumber from Step 5)
  logStep('5b/7', 'Publishing packages to npm...');
```

---

## Integration Steps

### Step 1: Add Validation Before Publishing (v4.9.3+)

**File**: `scripts/release.js`, line ~249

**Before**:
```javascript
  // Step 5: Publish packages
  logStep('5/6', 'Publishing packages to npm...');
```

**After**:
```javascript
  // Step 5a: Validate dist completeness for @orion-ds/react
  logStep('5a/7', 'Validating dist/ completeness...');

  if (!dryRun) {
    const validateScript = path.join(ROOT_DIR, 'packages/react/scripts/validate-dist-completeness.js');
    const validateResult = exec(`node ${validateScript}`, { silent: true });

    if (!validateResult.success) {
      logError('Dist validation failed for @orion-ds/react');
      process.exit(1);
    }
    logSuccess('Dist validation passed for @orion-ds/react');
  } else {
    logInfo('Skipped (dry run)');
  }

  // Step 5b: Publish packages
  logStep('5b/7', 'Publishing packages to npm...');
```

### Step 2: Add fs import (if not present)

Check top of `scripts/release.js`:

```javascript
const fs = require('fs');  // Should already exist
const path = require('path');  // Should already exist
```

If not present, add them.

### Step 3: Update Step Numbering

Find all references to step numbers:
- "Step 5/6" → "Step 5b/7"
- "Step 6/6" → "Step 6/7"

(Only if implementing full validation)

---

## Testing the Changes

### Test 1: Dry-Run Release
```bash
npm run release:dry

# Expected:
# [5a/7] Validating dist/ completeness...
#   → Skipped (dry run)
# [5b/7] Publishing packages to npm...
#   → Would publish @orion-ds/react@X.Y.Z
```

### Test 2: Real Release with Valid Build
```bash
cd packages/react && npm run build
# Should pass validation

npm run release:patch
# Expected:
# [5a/7] Validating dist/ completeness...
#   ✓ Dist validation passed
# [5b/7] Publishing packages to npm...
#   → Publishing...
```

### Test 3: Real Release with Invalid Build
```bash
# Simulate bad build
rm packages/react/dist/index.mjs

npm run release:patch
# Expected:
# [5a/7] Validating dist/ completeness...
#   ✗ Dist validation failed
#   ✗ Build appears incomplete. Aborting publish.
# Exit code: 1
```

---

## Why This is Optional for v4.9.3

1. **One-time hotfix**: v4.9.3 is immediate recovery for v4.9.2
2. **Can be added later**: Validation scripts already created
3. **Backward compatible**: Release.js works without this change
4. **Recommended for v4.9.4+**: Add validation to prevent future issues

---

## Why Add It for v4.9.4+

1. **Prevents recurrence**: No package can be released with incomplete dist/
2. **No performance impact**: Validation script runs in <2 seconds
3. **Clear error messages**: Users know exactly what went wrong
4. **Matches best practices**: Modern release pipelines validate before publishing

---

## Timeline

**v4.9.3**: Release with validation scripts (no release.js changes required)
**v4.9.4+**: Add validation to release.js for automation

Or do both now and mark as tested.

---

## File Reference

**Release validation scripts** (already created):
- `packages/react/scripts/validate-dist-completeness.js` — Pre-publish check
- `packages/react/tests/dist-completeness.test.ts` — CI/CD automation

**These work standalone OR integrated with release.js**

---

## Recommendation

For v4.9.3 release: **NOT required** (scripts exist, manual validation sufficient)
For v4.9.4+: **Highly recommended** (automates the validation step)

Can be implemented when starting v4.9.4 release.
