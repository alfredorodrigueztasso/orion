# Waiting for Orion Hotfix — docs-site v1.0.0

## Current Status: ⏳ AWAITING @orion-ds/react@4.9.3 HOTFIX

docs-site is blocked on **2 critical issues in Orion** that need fixes before we can proceed.

---

## Issues Blocking docs-site

### 1. 🔴 Preview Modules Registry Not Importable (4.9.1)
**Impact**: Cannot use ComponentPreview/SectionPreview components
**Status**: OPEN - Waiting for Orion fix
**Location**: FRICTION_LOG.md → "Preview modules registry path not accessible"

**What Orion needs to do**:
- Make `registry/preview-modules` importable from npm packages
- Option A: Publish as separate npm package
- Option B: Include in @orion-ds/react with subpath export
- Option C: Provide path resolution config

### 2. 🔴 CSS Parser Error — cssnano Incompatibility (4.9.1)
**Impact**: Next.js build fails at CSS minification
**Status**: OPEN - Waiting for Orion fix
**Location**: FRICTION_LOG.md → "CSS parsing error in bundled styles"

**What Orion needs to do**:
- Fix unescaped `/` character in dist/styles.css (line 20, col 29)
- Validate CSS with cssnano before releasing
- Add CI step: All CSS must pass cssnano validation

### 3. 🔴 CRITICAL: 4.9.2 dist files completely missing
**Impact**: Package is completely broken
**Status**: CRITICAL - Do NOT use 4.9.2
**Location**: FRICTION_LOG.md → "CRITICAL: @orion-ds/react@4.9.2 dist files are MISSING"

**Action**: Orion should yank 4.9.2 from npm

---

## What We're Waiting For

### Next release: @orion-ds/react@4.9.3
Should include:
- ✅ Fix for issue #1: Preview modules accessibility
- ✅ Fix for issue #2: CSS cssnano validation
- ✅ Build pipeline improvement: Validate all exports have dist files
- ✅ CI enhancement: CSS minification validation

---

## docs-site Readiness

### ✅ Completed
- [x] ORION_PHILOSOPHY.md — Established "use Orion, report friction" philosophy
- [x] FRICTION_LOG.md — Documented all friction points
- [x] ClientComponents.tsx — Updated to import from @orion-ds/react/blocks
- [x] HomepageHero.tsx — Updated to use Hero block directly
- [x] package.json — Updated to @orion-ds/react@4.9.1 (current stable)
- [x] Build scripts — Ready for when issues are fixed

### ⏳ Blocked (waiting for Orion)
- [ ] Complete Next.js build pass
- [ ] ComponentPreview/SectionPreview functionality
- [ ] CSS validation pass
- [ ] Production deployment

---

## How to Proceed Once 4.9.3 is Released

```bash
# 1. Update to latest version
cd docs-site
pnpm update @orion-ds/react

# 2. Run full build
npm run build

# 3. If build passes, update FRICTION_LOG.md to mark issues RESOLVED

# 4. Proceed with docs-site features
```

---

## Documentation

- **ORION_PHILOSOPHY.md** — Philosophy of using Orion without workarounds
- **FRICTION_LOG.md** — Detailed friction report with all issues, root causes, and required actions
- **package.json** — Pinned to @orion-ds/react@4.9.1 (do NOT auto-update)

---

**Status**: ⏳ BLOCKED on Orion 4.9.3
**Team**: Waiting for Orion team
**Next Action**: Check for @orion-ds/react@4.9.3 release
**Last Updated**: 2026-03-21T04:15:00Z
