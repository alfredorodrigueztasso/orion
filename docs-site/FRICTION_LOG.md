# Friction Log - docs-site

## Purpose
Document every friction point encountered while building docs-site with Orion. Each entry is a signal for potential improvement in Orion Design System.

---

## [2026-03-21] Blocks subpath exports missing from dist

**Status**: ✅ RESOLVED (Orion patch published)

**What I tried**:
```typescript
import { Hero, Features, CTA, Pricing } from '@orion-ds/react/blocks';
```

**What happened**:
```
Module not found: Can't resolve '@orion-ds/react/blocks'
```

**Expected**:
Block components import successfully since they're declared in package.json exports

**Root cause**:
- Orion @orion-ds/react@4.9.0 declares `/blocks` export in package.json
- Source exists: `packages/react/src/blocks/sections/` contains Hero, Features, CTA, Pricing, etc.
- Index file exists: `packages/react/src/blocks/index.ts` exports everything
- **Missing**: `.mjs` and `.cjs` files in `packages/react/dist/blocks/`
- Only `.d.ts` (TypeScript declaration) files were generated
- Webpack couldn't resolve the import path

**Impact**:
- docs-site couldn't import Orion blocks
- Homepage sections using blocks were blocked
- Feature "blocks consolidation" (v4.9.0) was unusable in Next.js

**Orion fix applied**:
- Updated Vite config to generate subpath exports (.mjs, .cjs)
- Ensures all declared export paths have corresponding dist files
- Fix merged to Orion main, published in patch

**Lesson learned**:
- Build configs must explicitly define all `exports` paths
- Declaring an export without generating dist files breaks consuming projects
- Pre-publish validation should check export completeness

**Resolution**:
1. ✅ Orion published patch with Vite fix
2. ✅ Updated docs-site package.json to use latest @orion-ds/react
3. ✅ ClientComponents now successfully imports from @orion-ds/react/blocks
4. ✅ Homepage sections use Orion blocks directly

**References**:
- Orion PR: [link to PR if available]
- Orion issue: [link to issue if available]

---

## [2026-03-21] Philosophy established: Use Orion, Report Friction

**Status**: ✅ COMPLETED

**Decision**:
docs-site will ALWAYS use Orion components directly. When friction is encountered:
1. Document in this log
2. Report to Orion team
3. Wait for Orion to fix
4. Never use workarounds

**Rationale**:
- docs-site is the flagship showcase → it hits problems first
- Orion improvements are driven by real-world usage
- Avoiding workarounds prevents tech debt
- Philosophy documented in ORION_PHILOSOPHY.md

**Action items**:
- [x] Create ORION_PHILOSOPHY.md with guidelines
- [x] Create this FRICTION_LOG.md
- [ ] Add friction reporting instructions to README
- [ ] Train team on philosophy

---

## Template for new friction entries

```markdown
## [YYYY-MM-DD] [Component/Feature] [Short issue description]

**Status**: 🔴 OPEN | 🟡 INVESTIGATING | 🟢 RESOLVED

**What I tried**:
[Code snippet or steps]

**What happened**:
[Error message or unexpected behavior]

**Expected**:
[Expected behavior]

**Root cause** (if known):
[Investigation findings]

**Impact**:
[How does this block the project?]

**Workaround**:
⚠️ None. Waiting for Orion fix.

**Orion action**:
[Issue filed? PR created? Status?]

**Lesson learned**:
[What did this teach us about Orion or component design?]

**References**:
- Orion PR:
- Orion issue:
```

---

## [2026-03-21] Preview modules registry path not accessible

**Status**: 🔴 OPEN

**What I tried**:
Building docs-site with Next.js build command

**What happened**:
```
Module not found: Can't resolve '../../registry/preview-modules/index'
```

**Expected**:
Preview modules should be accessible from docs-site/components/

**Root cause** (investigating):
- docs-site imports ComponentPreview and SectionPreview
- These components try to import from `../../registry/preview-modules/index`
- Path resolution fails in Next.js build context

**Impact**:
- docs-site build fails
- Component and section preview functionality blocked
- Cannot test component examples

**Orion action**:
- [ ] File issue for registry path accessibility
- [ ] Clarify how preview-modules should be imported in Next.js projects

---

## [2026-03-21] CSS parsing error in bundled styles

**Status**: ✅ RESOLVED (Complete token handler fix)

**Root cause** (FOUND):
- 6 tokens anidados sin handlers explícitos en `scripts/build-tokens.js`
- `interactive.ghost`, `soft.*`, `focus.ring` causaban `[object Object]` en CSS
- cssnano fallaba al minificar valores inválidos

**Investigation process**:
1. Initial partial fix: Only flattened `text.on-brand` → INCOMPLETE
2. Team found 6 instances of `[object Object]` in generated CSS
3. Architect performed exhaustive analysis → found 16 nested tokens, identified 6 problematic
4. Root cause: Missing handlers in token compiler

**Orion fix applied**:
1. Added handler for `interactive.ghost` (lines ~311)
2. Added handler for `soft.*` variants (lines ~321)
3. Added handler for `focus.ring` (lines ~331)
4. Fixed `text.on-brand` with proper object detection (lines ~234)

**Validation**:
- ✅ Generated CSS: 308 lines, zero `[object Object]` instances
- ✅ TypeScript types regenerated successfully
- ✅ All radius scale validations passing
- ✅ Commit: `590469e` - Complete fix merged to main

**Lesson learned**:
- Token system requires explicit handling for ALL nested objects
- Partial fixes hide systemic issues
- Exhaustive analysis before implementation prevents incomplete solutions
- Build validation must check for JavaScript serialization artifacts in CSS

**References**:
- Architect investigation: Identified 16 nested tokens, 6 critical issues
- Frontend Dev implementation: Added 4 missing handlers to build pipeline
- QA validation: 100% compliance with cssnano requirements

---

---

## [2026-03-21] Issue Resolution Summary

**Status**: ✅ ALL CRITICAL ISSUES RESOLVED

### Final Validation Results
- ✅ Zero `[object Object]` instances in theme.css
- ✅ TypeScript compilation: All 6 packages passing
- ✅ Token compliance: 100%
- ✅ CSS validity: All variables properly formatted
- ✅ Commits: 590469e (token handlers) + 9b00245 (theme.css update)

### Next: Preview Modules Registry
The third open issue (preview modules path) can now be addressed independently.

---

## [2026-03-21] CRITICAL: @orion-ds/react@4.9.2 dist files are MISSING

**Status**: 🔴 BLOCKER (Complete build failure)

**Build attempt**: @orion-ds/react@4.9.2

**What I tried**:
```bash
cd docs-site
pnpm update @orion-ds/react  # Updated to 4.9.2
npm run build
```

**What happened**:
```
Module not found: Can't resolve '@orion-ds/react'
Module not found: Can't resolve '@orion-ds/react/blocks'
```

**Expected**:
- @orion-ds/react@4.9.2 should have compiled JavaScript files
- dist/ should contain index.mjs, index.cjs, blocks/index.mjs, etc.
- All declared exports should have corresponding dist files

**Root cause** (CRITICAL):
- @orion-ds/react@4.9.2 dist/ folder contains ONLY `theme.css`
- Missing files:
  - ❌ dist/index.mjs
  - ❌ dist/index.cjs
  - ❌ dist/index.d.ts
  - ❌ dist/client.mjs
  - ❌ dist/client.cjs
  - ❌ dist/blocks/index.mjs
  - ❌ dist/blocks/index.cjs
  - ❌ dist/tokens/index.mjs
  - ❌ dist/tokens/index.cjs
  - ❌ dist/chart.mjs
  - ❌ dist/chart.cjs
  - And all subpath exports declared in package.json
- Build completely failed
- REGRESSION from 4.9.1 which had these files

**Impact**:
- docs-site cannot import anything from @orion-ds/react
- Complete build failure - nothing works
- Package is completely broken for npm users
- 4.9.2 should NOT have been published

**Orion action URGENT**:
1. [ ] IMMEDIATELY investigate 4.9.2 build process
2. [ ] Check Vite build logs for errors
3. [ ] Verify build pipeline didn't skip JavaScript compilation
4. [ ] Publish 4.9.3 hotfix with complete dist files
5. [ ] Add CI validation: All declared exports must have dist files
6. [ ] Yank 4.9.2 from npm registry (broken release)

**Recommendation**:
- 4.9.1 should be used until 4.9.3 is published
- Do NOT use 4.9.2

**Severity**: 🔴 CRITICAL - Breaks all projects

---

**Last Updated**: 2026-03-21T04:00:00Z
**Project**: docs-site@1.0.0
**Orion Version**: @orion-ds/react@4.9.2 (BROKEN - revert to 4.9.1)
**Status**: ❌ BLOCKED - Awaiting 4.9.3 hotfix
