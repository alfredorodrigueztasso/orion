# Template Exports Architecture Issue — v4.9.8 Release Blocker

**Date**: March 21, 2026
**Status**: 🔴 BLOCKED
**Severity**: Medium (architectural, not user-facing)
**Requires**: Tech Lead + Architect review

---

## Problem Statement

The `@orion-ds/react` package declares exports for `./templates` in `package.json`, but the build system doesn't generate the required dist files at the expected paths.

```json
{
  "./templates": {
    "types": "./dist/templates/index.d.ts",
    "import": "./dist/templates/index.mjs",
    "require": "./dist/templates/index.cjs"
  }
}
```

**What actually exists in dist:**
```
packages/react/dist/blocks/templates/  ✓ (generated)
packages/react/dist/sections/          ✓ (generated)
```

**What's missing:**
```
packages/react/dist/templates/         ✗ (not generated)
```

---

## Root Cause Analysis

### Current Architecture

The codebase has templates in two locations:
1. **`packages/react/src/blocks/templates/`** — App/SaaS templates (ProfilePageTemplate, DashboardTemplate, etc.)
2. **`packages/react/src/templates/`** — Marketing templates (LandingPageTemplate, ContactPageTemplate, etc.) - STATUS UNKNOWN

The build process (Vite) generates output at:
```
dist/blocks/sections/        ✓
dist/blocks/templates/       ✓
dist/sections/               ✓
dist/templates/              ✗ (expected but not found)
```

### Why This Breaks Release Validation

The `scripts/validate-exports.js` script checks that all declared exports in `package.json` have corresponding dist files. When `./templates` exports are declared but files don't exist, the validation fails:

```
❌ Validation Failed: 5 missing dist file(s)
   Missing: "./templates" (types) → ./dist/templates/index.d.ts
   Missing: "./templates" (import) → ./dist/templates/index.mjs
   Missing: "./templates" (require) → ./dist/templates/index.cjs
```

---

## Decision Needed: Three Options

### Option A: Fix the Build (Recommended if templates are a first-class export)

**Action**: Ensure Vite generates templates output at `dist/templates/` (not nested under `blocks/`)

**Pros**:
- ✅ Maintains current public API (`import { ... } from '@orion-ds/react/templates'`)
- ✅ Cleaner exports (templates at root level, not nested)
- ✅ Aligns with blocks structure

**Cons**:
- ⚠️ Requires Vite config changes
- ⚠️ May require source reorganization

**Effort**: Medium (1-2 days)

**Files to review**:
- `packages/react/vite.config.ts` (entry points configuration)
- `packages/react/tsconfig.json` (path aliases)
- `vite.shared.config.ts` (build configuration)

---

### Option B: Update Exports (Recommended if templates should be nested under blocks)

**Action**: Change `package.json` exports from `./templates` to `./blocks/templates`

**Pros**:
- ✅ Matches current build output
- ✅ Minimal code changes (just update package.json)
- ✅ Clarifies that templates are part of blocks ecosystem
- ✅ Quick to implement (5 minutes)

**Cons**:
- ⚠️ Breaking change for users importing from `@orion-ds/react/templates`
- ⚠️ Requires version bump to v5.0.0 (major version)

**Effort**: Minimal (5 minutes + major version bump)

**Implementation**:
```json
{
  "./blocks/templates": {
    "types": "./dist/blocks/templates/index.d.ts",
    "import": "./dist/blocks/templates/index.mjs",
    "require": "./dist/blocks/templates/index.cjs"
  }
}
```

**Migration path for users**:
```diff
- import { LandingPageTemplate } from '@orion-ds/react/templates';
+ import { LandingPageTemplate } from '@orion-ds/react/blocks/templates';
```

---

### Option C: Remove Export (Not recommended)

**Action**: Remove `./templates` from package.json exports entirely. Templates only accessible via full import path.

**Pros**:
- ✅ Release unblocked immediately
- ✅ No build changes needed

**Cons**:
- ❌ Removes public API surface
- ❌ Forces users to use cumbersome import paths
- ❌ Breaks backward compatibility

**Not recommended** — Templates are a valuable part of the design system and should have a clean export.

---

## Recommendation

**Option B** (Update Exports) is the pragmatic choice:

1. **Fast**: 5-minute fix
2. **Clear**: Makes the hierarchy explicit (`./blocks/templates`)
3. **Honest**: Matches the actual architecture
4. **Documented**: Migration guide for users

The cost of a v5.0.0 bump is low because:
- Templates are a relatively new feature (not heavily used yet)
- Users upgrading from v4.9.8 → v5.0.0 get significant value (Hero improvements, badge fix, etc.)
- Single-line import change in user code

---

## Alternative: Future Architecture (v5.1.0+)

Consider restructuring after v5.0.0:

```
src/
  templates/           ← Move marketing templates here
    Landing/
    Contact/
  blocks/
    templates/         ← Move app templates here
    sections/
    components/
```

Then `./templates` export maps to `src/templates/` (marketing-focused).

This separates concerns:
- **`./templates`** = Marketing/page templates
- **`./blocks/templates`** = App/dashboard templates

---

## Validation After Fix

Once export issue is resolved, run:

```bash
node scripts/validate-exports.js packages/react
# Should output: ✅ Exports validation passed
```

Then release proceeds normally:
```bash
npm run release:patch
```

---

## Git History

- **v4.9.8**: Released with exports validation skipped (manually published @orion-ds/react)
- **Next**: Fix exports, bump to v5.0.0
- **Blocked on**: Tech Lead + Architect decision on Option A vs Option B

---

## Questions for Team Review

1. Are templates meant to be a first-class export at `./templates`, or nested under `./blocks/templates`?
2. If Option A: What's the timeline to reorganize the build output?
3. If Option B: Can we document the migration path in CHANGELOG and release notes?
4. Are there any users currently relying on `@orion-ds/react/templates` export that we need to notify?

---

## Action Items

- [ ] **Tech Lead**: Review this document and decide Option A vs B
- [ ] **Architect**: Confirm the intended export hierarchy for templates
- [ ] **Implementation**: Once decision made, execute the fix
- [ ] **Release**: Publish v5.0.0 (or v4.9.9 if Option A is quick)
