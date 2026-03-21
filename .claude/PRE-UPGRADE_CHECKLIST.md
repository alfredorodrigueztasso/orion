# Pre-Upgrade Checklist
## @orion-ds/react v4.6.2 → v4.9.0

**Date**: March 20, 2026
**Executor**: System Architect
**Estimated Time**: 30 minutes
**Status**: Ready to execute

---

## Phase 1: Verification (5 minutes)

### ✓ Step 1.1: Current State Validation
```bash
# Check current @orion-ds/react version
cat docs-site/package.json | grep "@orion-ds/react"
# Expected: "^4.6.2"

# Verify docs-site builds with current version
cd docs-site
npm run build
# Expected: ✅ Build succeeds (or at least no @orion-ds/react errors)
```

### ✓ Step 1.2: Git State
```bash
# Ensure clean working directory
cd /Users/alfredo/Documents/AI\ First\ DS\ Library
git status
# Expected: No modified files in docs-site/ (or save them first)

# Optional: Create a new branch for upgrade
git checkout -b feat/upgrade-orion-4.9.0
```

### ✓ Step 1.3: Node/npm Versions
```bash
node --version   # Expected: >=16.0.0
npm --version    # Expected: >=8.0.0
# pnpm version might be used instead
```

---

## Phase 2: Dependency Update (10 minutes)

### ✓ Step 2.1: Update package.json
```bash
# Manual edit preferred (verify carefully)
cd docs-site
nano package.json
# OR use sed:
sed -i '' 's/"@orion-ds\/react": "\^4.6.2"/"@orion-ds\/react": "\^4.9.0"/' package.json

# Verify change
grep "@orion-ds/react" package.json
# Expected: "^4.9.0"
```

### ✓ Step 2.2: Install Dependencies
```bash
cd docs-site
npm install
# Watch for:
# ✅ "added/changed/removed X packages"
# ❌ Any peer dependency errors

# Verify installation
npm list @orion-ds/react
# Expected: @orion-ds/react@4.9.0
```

### ✓ Step 2.3: Root Level Verification
```bash
cd ..
npm run validate
# Expected: ✅ Token audit passed

npm run type-check
# Expected: ✅ TypeScript compilation successful
```

---

## Phase 3: Breaking Changes Audit (10 minutes)

### ✓ Step 3.1: Hero Component Audit
```bash
cd docs-site
grep -r "headline=" --include="*.tsx" .
# Expected: 0 results OR documented locations only
# If found: See BREAKING_CHANGES_MIGRATION.md → Change 1
```

### ✓ Step 3.2: CTA Component Audit
```bash
grep -r "headline=" --include="*.tsx" .
# Expected: Same as Hero (already fixed by 3.1)
```

### ✓ Step 3.3: DetailPanel Audit
```bash
grep -r "DetailPanel" --include="*.tsx" .
grep -r "subtitle=" --include="*.tsx" .
# Expected: 0 DetailPanel results OR all use description prop
# If found: See BREAKING_CHANGES_MIGRATION.md → Change 3
```

### ✓ Step 3.4: ThemeProvider Audit
```bash
grep -r "options={" --include="*.tsx" app/
# Expected: 0 results (v4.9.0 uses flat props now)
# Current app/layout.tsx should be fine (no options prop)
```

---

## Phase 4: Build & Type Validation (10 minutes)

### ✓ Step 4.1: Local Build
```bash
cd docs-site
npm run build
# Watch for:
# ✅ Next.js build succeeds
# ✅ No "Cannot find @orion-ds/react" errors
# ❌ Type errors = immediate rollback

# Output should end with:
# "✓ Compiled successfully"
```

### ✓ Step 4.2: Type-Check Full Monorepo
```bash
cd ..
npm run type-check
# Expected: ✅ No TypeScript errors
# If errors: Run only packages/react
# npm run type-check:react
```

### ✓ Step 4.3: Token Validation
```bash
npm run validate
# Expected: ✅ Token audit passed (97%+ compliance)
```

### ✓ Step 4.4: Full Audit
```bash
npm run audit
# Expected: All checks pass
```

---

## Phase 5: Component Import Validation (5 minutes)

### ✓ Step 5.1: ClientComponents.tsx Verification
```bash
cd docs-site/components
cat ClientComponents.tsx
# Verify:
# ✅ Imports from @orion-ds/react (not @orion-ds/core which was deleted)
# ✅ Imports from @orion-ds/react/blocks (sections)
# ✅ No compound component issues (Card.Body, etc. re-exported)
```

### ✓ Step 5.2: CSS Import Validation
```bash
grep -r "@orion-ds/react" docs-site/app --include="*.tsx"
# Expected output:
# app/layout.tsx: import '@orion-ds/react/styles.css';
# app/layout.tsx: import '@orion-ds/react/blocks.css';
# ✅ Confirms CSS properly imported
```

---

## Phase 6: Runtime Validation (5 minutes)

### ✓ Step 6.1: Quick Dev Server Test
```bash
cd docs-site
npm run dev &
# Wait for: "✓ Ready in XXXms"

# Test in browser:
# 1. Open http://localhost:3000
# 2. Check:
#    ✅ Page loads without errors
#    ✅ Hero section renders
#    ✅ Theme toggle works (light/dark)
#    ✅ Components don't have visible styling issues

# Stop server:
pkill -f "next dev"
```

### ✓ Step 6.2: Console Check
```bash
# When dev server runs, watch browser console for:
# ✅ No hydration warnings
# ✅ No "Cannot find component" errors
# ✅ No TypeErrors about missing props
# ❌ If errors: Check ClientComponents.tsx exports
```

---

## Phase 7: Git & Documentation (5 minutes)

### ✓ Step 7.1: Commit Upgrade
```bash
cd /Users/alfredo/Documents/AI\ First\ DS\ Library
git add docs-site/package.json docs-site/package-lock.json
git commit -m "chore(docs-site): upgrade @orion-ds/react to 4.9.0"
# OR if breaking changes were needed:
git commit -m "chore(docs-site): upgrade @orion-ds/react to 4.9.0 + fix breaking changes

- Changed Hero/CTA headline prop to title
- Changed DetailPanel subtitle prop to description (if applicable)
- ThemeProvider already compatible (no options prop)"
```

### ✓ Step 7.2: Tag for Rollback
```bash
git tag -a pre-4.9.0-upgrade -m "Backup before @orion-ds/react 4.9.0 upgrade"
git push origin --tags
```

### ✓ Step 7.3: Documentation
```bash
# Note in commit: This upgrade is compatible with:
# - Next.js 15 App Router
# - React 19
# - TypeScript 5.0
# - All 18 tasks in CURSOR-INSTRUCTIONS.md
```

---

## Phase 8: Post-Upgrade Smoke Tests (5 minutes)

### ✓ Step 8.1: Component Rendering Test
```bash
# Verify key components render without errors
# Add temporary test in docs-site/app/test-page.tsx:
/*
'use client';
import { Button, Card, Badge, Hero } from '@/components/ClientComponents';
export default function TestPage() {
  return (
    <>
      <Hero title="Test" description="Hero renders" />
      <Card>
        <Button>Test Button</Button>
        <Badge>Test Badge</Badge>
      </Card>
    </>
  );
}
*/

# Then visit http://localhost:3000/test-page
# Delete file after testing
```

### ✓ Step 8.2: Bundle Size Check
```bash
cd docs-site
npm run build
# Note output size. Compare to pre-upgrade:
# Expected: Similar size (±5%) or slightly smaller
# ❌ If >20% increase: Investigate why
```

### ✓ Step 8.3: Next.js Lint
```bash
npm run lint
# Expected: No new errors introduced
```

---

## Rollback Instructions (If Needed)

### Emergency Rollback
```bash
# If upgrade causes blocking issues:
cd docs-site
git checkout HEAD^ -- package.json package-lock.json
npm install
npm run build
# Should restore v4.6.2

# Then investigate using:
git log --oneline | head -3
git show HEAD:docs-site/package.json  # See what changed
```

### Partial Rollback
```bash
# If only specific components broke:
git checkout HEAD -- docs-site/components/BrokenComponent.tsx
npm run type-check
```

---

## Success Criteria

✅ **All checks must pass**:

- [ ] `npm run type-check` passes
- [ ] `npm run validate` passes (97%+ compliance)
- [ ] `docs-site/npm run build` succeeds
- [ ] `npm run audit` passes
- [ ] No console errors in dev server
- [ ] Hero/CTA components render correctly
- [ ] Theme switcher works
- [ ] All 4 breaking changes fixed (or verified as not applicable)

---

## Timeline Summary

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 1 | Verification | 5 min | ✅ Pending |
| 2 | Dependency Update | 10 min | ✅ Pending |
| 3 | Breaking Changes Audit | 10 min | ✅ Pending |
| 4 | Build & Type Validation | 10 min | ✅ Pending |
| 5 | Component Import Validation | 5 min | ✅ Pending |
| 6 | Runtime Validation | 5 min | ✅ Pending |
| 7 | Git & Documentation | 5 min | ✅ Pending |
| 8 | Smoke Tests | 5 min | ✅ Pending |
| **TOTAL** | **Complete Upgrade** | **55 min** | **Ready** |

---

## Quick Reference Commands

```bash
# Update version
sed -i '' 's/"@orion-ds\/react": "\^4.6.2"/"@orion-ds\/react": "\^4.9.0"/' docs-site/package.json

# Install
cd docs-site && npm install && cd ..

# Validate
npm run type-check && npm run validate && npm run audit

# Fix breaking changes (if needed)
find docs-site/components -name "*.tsx" -exec sed -i '' 's/headline=/title=/g' {} \;

# Test
cd docs-site && npm run build && npm run dev

# Commit
git add -A && git commit -m "chore(docs-site): upgrade @orion-ds/react to 4.9.0"
```

---

## Contact & Support

- **For breaking change issues**: See `BREAKING_CHANGES_MIGRATION.md`
- **For architecture questions**: See `ARCHITECTURE_VALIDATION_REPORT.md`
- **For build issues**: Check `npm run audit` output
- **For rollback**: Follow "Rollback Instructions" above

---

**Status**: ✅ Ready to execute
**Confidence**: ⭐⭐⭐⭐⭐ (Very High)
**Risk**: ✅ LOW (simple upgrade, 4 trivial prop renames)
**Next Action**: Run Phase 1 verification, then proceed through Phase 8

