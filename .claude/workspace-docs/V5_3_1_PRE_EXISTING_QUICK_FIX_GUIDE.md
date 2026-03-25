# v5.3.1 Pre-Existing Issues — Quick Fix Guide

**One-page reference for v5.3.2 sprint execution**

Audience: Backend/Infra Developers, QA, Git Manager
Status: ✅ Ready to execute
Sprint: v5.3.2 (patch release)

---

## 🎯 Fix Order (Sequential)

| # | Issue | Owner | Time | Commit |
|---|-------|-------|------|--------|
| 1 | PRE-001: build:react sequencing | Backend | 30 min | Commit 1 |
| 2 | PRE-007: validate-esm.sh gate | Backend | 15 min | Commit 1 |
| 3 | PRE-008: @dnd-kit/utilities peerDeps | Backend | 5 min | Commit 1 |
| 4 | PRE-009: ESM test fix | QA | 20 min | Commit 1 |
| 5 | Documentation (3 files) | Tech Lead | 45 min | Commit 2 |
| 6 | GitHub Actions (stretch) | Infra | 1.5h | Commit 3 |
| 7 | Version bump (all packages) | Git Manager | 5 min | Commit 4 |

**Total Sprint**: 3h technical fixes + 45 min docs + optional 1.5h CI/CD = **4.75h critical** + **1.5h stretch**

---

## 🔧 Technical Fixes (Commit 1)

### PRE-001: Build Sequencing Gap

**File**: `package.json` (line 17)

**Before**:
```json
"build:react": "turbo run build --filter=@orion-ds/react",
```

**After**:
```json
"build:react": "npm run build:tokens && turbo run build --filter=@orion-ds/react",
```

**Verification**:
```bash
rm -rf theme.css tokens/generated.css     # Simulate fresh clone
npm run build:react                        # Must complete without ENOENT
ls -la packages/react/dist/theme.css      # Must exist and be non-empty
```

---

### PRE-007: Validate-ESM.sh False Assurance

**File**: `scripts/validate-esm.sh` (after line 70)

**Add before final echo**:
```bash
echo "Checking for require() calls in compiled .mjs files..."
if grep -r "require(" packages/react/dist --include="*.mjs" | grep -v "//"; then
  echo "✗ Found require() calls in ESM modules — ESM spec violation"
  exit 1
fi
echo "✓ No require() calls found in compiled .mjs files"
```

**Verification**:
```bash
npm run build:react
npm run validate:esm                       # Should pass with "✓ No require() calls"
```

---

### PRE-008: @dnd-kit/utilities Missing from peerDependencies

**File**: `packages/react/package.json` → `peerDependencies` (add after @dnd-kit/sortable)

**Add**:
```json
"@dnd-kit/utilities": "^3.2.0",
```

**Verification**:
```bash
npm install                                # Should not warn about @dnd-kit/utilities
npm list @dnd-kit/utilities               # Should resolve correctly
```

---

### PRE-009: ESM Compliance Test Uses require()

**File**: `packages/react/src/utils/optionalDeps.test.ts` (lines 158-171)

**Replace entire test**:
```typescript
it("should not use require() - only import()", async () => {
  const fs = await import("fs");
  const path = await import("path");
  const sourceFile = path.join(__dirname, "./optionalDeps.ts");
  const source = fs.readFileSync(sourceFile, "utf-8");

  // Check for require() calls (excluding comments and strings)
  const requirePattern = /(?<!\\/\\/.*)require\\(/g;
  const matches = source.match(requirePattern);

  expect(matches).toBeNull();
});
```

**Verification**:
```bash
cd packages/react
npm test -- optionalDeps.test.ts          # All tests pass
```

---

## 📋 Definition of Done (DoD) — Per Issue

### PRE-001 DoD (Build Sequencing)
- [ ] `npm run build:react` completes on fresh clone (no theme.css pre-generated)
- [ ] `packages/react/dist/theme.css` is non-empty after build
- [ ] `packages/react/dist/tokens/generated.css` exists after build
- [ ] No new warnings or errors in turbo output
- [ ] Existing builds (warm cache) still work without slowdown

### PRE-007 DoD (Validate-ESM.sh)
- [ ] `npm run validate:esm` runs without errors
- [ ] Output shows "✓ No require() calls found in compiled .mjs files"
- [ ] If require() calls added to dist/, script exits with code 1
- [ ] No false positives from comments like `// require(...)`

### PRE-008 DoD (@dnd-kit/utilities)
- [ ] `npm install` completes with no warnings
- [ ] `npm list @dnd-kit/utilities` resolves to ^3.2.0
- [ ] `CollapsibleFolder` component works without manual dep install

### PRE-009 DoD (ESM Test)
- [ ] Test passes: `npm test -- optionalDeps.test.ts`
- [ ] Test fails if require() is added to optionalDeps.ts (validates it actually checks)
- [ ] No type errors in test file

---

## 📚 Documentation Checklist (Commit 2)

| File | Type | Lines | Status |
|------|------|-------|--------|
| V5_3_1_SESSION_PROBLEMS_SUMMARY.md | Created | 200+ | ✅ DONE |
| V5_3_1_PRE_EXISTING_ISSUES_AUDIT.md | Created | 450+ | ✅ DONE |
| V5_3_1_PRE_EXISTING_QUICK_FIX_GUIDE.md | Created | 150+ | ✅ DONE |

**Verification**:
```bash
ls -la .claude/workspace-docs/V5_3_1_*.md  # All 3 files exist
wc -l .claude/workspace-docs/V5_3_1_*.md   # Content present
```

---

## 🔄 Release Commands

### Pre-Release Checks
```bash
npm run audit                              # Type-check + token validation
npm run type-check && npm run validate     # Comprehensive check
npm run build:release                      # Build without docs-site
```

### Release Workflow
```bash
# Step 1: Test release without publishing
npm run release:dry

# Step 2: If dry-run passes, execute real release
npm run release:patch                      # Bumps v5.3.1 → v5.3.2, publishes

# Step 3: Push tags to origin
git push origin main --tags

# Step 4: Update dist-tags
npm dist-tag add @orion-ds/react@5.3.2 latest
npm dist-tag rm @orion-ds/react@5.3.0 latest
```

---

## 🚨 Risk Mitigation

| Risk | Level | Mitigation |
|------|-------|-----------|
| `build:react` slower due to build:tokens | LOW | Documented as expected; verified no Turbo cache impact |
| validate-esm.sh false positives | MEDIUM | Test with `npm run validate:esm` before release |
| npm version not bumped | LOW | Automated by `npm run release:patch` |
| GitHub Actions not added | LOW | Stretch goal; v5.3.2 release doesn't depend on it |

**Rollback if needed**:
```bash
npm unpublish @orion-ds/react@5.3.2
npm dist-tag add @orion-ds/react@5.3.1 latest
git revert <commit-hash>
```

---

## ✅ Acceptance Criteria (Final)

1. **All fixes committed** (1 commit, all 4 issues)
2. **All docs committed** (1 commit, 3 files)
3. **Version bumped to 5.3.2** (all packages)
4. **Released to npm** (npm publish works)
5. **Git tags pushed** (v5.3.2 tag exists on origin)
6. **dist-tag updated** (latest points to 5.3.2)
7. **GitHub release created** with release notes
8. **CLAUDE.md updated** if behavior changed
9. **Team notified** (blockers unblocked, migration path clear)

---

## 📞 Owner Assignments

| Owner | Issues | Status |
|-------|--------|--------|
| Backend/Infra Dev | PRE-001, PRE-007, PRE-008 | Ready |
| QA | PRE-009 (test fix) | Ready |
| Tech Lead | Documentation | Ready |
| Git Manager | Commits, release, version bump | Ready |

---

## 📅 Estimated Timeline (4-5 hours)

| Phase | Time | Gate |
|-------|------|------|
| Technical fixes (PRE-001-009) | 1.5h | All DoD passed |
| Documentation creation | 45 min | 3 files committed |
| Version bump + first 3 commits | 30 min | Branch: fix/pre-001-build-artifacts |
| Release (dry-run → real) | 30 min | npm release:dry passes |
| Post-release sync | 30 min | Tags pushed, GitHub release created |
| **TOTAL** | **~4 hours** | **Ship ready** |

---

## 🔗 Reference Documents

- **Full Technical Details**: `V5_3_1_PRE_EXISTING_ISSUES_AUDIT.md`
- **All Issues Overview**: `V5_3_1_SESSION_PROBLEMS_SUMMARY.md`
- **Git Workflow**: See plan file (`fix/pre-001-build-artifacts` branch)
- **PR Template**: In plan file (4 required commits, exact messages)

---

**Status**: Ready to execute. All issues documented. Team assigned. DoD defined. 🚀
