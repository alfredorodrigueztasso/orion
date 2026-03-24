# v5.3.0 Risk Management & Rollback Plan

**Purpose**: Identify risks, define mitigation strategies, and document rollback procedures
**Target**: April 8-12, 2026 (APPROACH B Implementation)
**Reviewer**: Frontend Developer (Alfredo)

---

## 🚨 Risk Register

### Risk #1: Template Literals Still Fail at Runtime
**Severity**: CRITICAL
**Likelihood**: LOW
**Impact**: Blocks build, v5.3.0 release delayed

#### Root Cause Analysis
- APPROACH B assumes template literal types won't be parsed by ts-node
- If ts-node still evaluates types.ts at import time, error persists
- File structure error or import confusion could cause this

#### Mitigation Strategy
1. **Before implementation**: Verify ts-node behavior with test file
   ```bash
   # Create test file with template literals
   cat > test-template.ts << 'EOF'
   export type Test = `color.${any}`;
   EOF

   # Try to execute (should fail)
   ts-node test-template.ts

   # If succeeds, APPROACH B won't work
   # If fails with ERR_INVALID_TYPESCRIPT_SYNTAX, APPROACH B is correct
   ```

2. **During implementation**: Never import types.ts at runtime
   - Only tokens-runtime.ts imports from types.ts
   - tokens-runtime.ts never imported during ts-node execution
   - Verify with: `grep "import.*types.ts" scripts/generate-types-dynamic.ts`
   - Should return 0 matches (no runtime imports)

3. **During testing**: Run `npm run build:tokens` and verify:
   - No ERR_INVALID_TYPESCRIPT_SYNTAX error
   - types.ts file created successfully
   - Template literal syntax present in output file

#### Rollback
```bash
# If error persists after implementation:
git reset --hard HEAD~4

# Switch to APPROACH A (explicit unions) as fallback
git checkout main -- scripts/generate-types.ts
npm run build:tokens

# Document decision to defer further
echo "APPROACH B rollback at $(date)" >> .claude/rollback-log.txt
```

---

### Risk #2: Generated types.ts Invalid TypeScript
**Severity**: HIGH
**Likelihood**: MEDIUM
**Impact**: Type-check fails, all TypeScript development blocked

#### Root Cause Analysis
- Escaping backticks incorrectly (`` \` `` vs `` \\\` ``)
- Template literal syntax wrong (`` ${} `` vs something else)
- Missing imports or interface definitions
- Duplicate type names

#### Mitigation Strategy
1. **Before generation**: Test escaping in isolation
   ```bash
   # Create test to verify escaping works
   cat > test-escaping.js << 'EOF'
   const template = `export type X = \\\`color.\\\${Brand}\\\`;`;
   console.log(template);
   // Should output: export type X = `color.${Brand}`;
   EOF

   node test-escaping.js
   ```

2. **During implementation**:
   - Use triple-backslash escaping: `` \\\` ``
   - Test output by examining file: `cat packages/react/src/tokens/types.ts | head -50`
   - Verify no red squiggly lines in editor (TypeScript syntax error indicator)

3. **After generation**:
   ```bash
   # Immediate type check
   npm run type-check

   # Should pass with no errors about types.ts
   ```

#### Rollback
```bash
# If types.ts is invalid:
# 1. Examine the file
cat packages/react/src/tokens/types.ts | grep "color.brand"

# 2. Check escaping (should see backticks, not backslashes)
# Expected: export type ColorTokenPath = `color.brand...
# Wrong: export type ColorTokenPath = \`color.brand...

# 3. If wrong escaping, fix the function and rerun
npm run build:tokens

# 4. If still broken, rollback
git reset --hard HEAD~4
```

---

### Risk #3: Type Regression (Old Types Disappear)
**Severity**: HIGH
**Likelihood**: LOW
**Impact**: IDE autocomplete broken, type safety lost

#### Root Cause Analysis
- New type generation doesn't include all the old types
- Template literal types incomplete or malformed
- Semantic token types missing
- Missing brand variants

#### Mitigation Strategy
1. **Before implementation**: Document current types.ts
   ```bash
   # Count type definitions in current output
   cp packages/react/src/tokens/types.ts packages/react/src/tokens/types.ts.CURRENT

   wc -l packages/react/src/tokens/types.ts.CURRENT
   grep "export type" packages/react/src/tokens/types.ts.CURRENT | wc -l
   ```

2. **After generation**: Compare new vs old
   ```bash
   # Count new types
   wc -l packages/react/src/tokens/types.ts
   grep "export type" packages/react/src/tokens/types.ts | wc -l

   # Should be similar to old version (within 10% variance)

   # Diff the files
   diff packages/react/src/tokens/types.ts.CURRENT packages/react/src/tokens/types.ts
   ```

3. **Type coverage test**:
   ```typescript
   // Create test file
   import type {
     ColorTokenPath,
     TypographyTokenPath,
     SpacingTokenPath,
     SemanticTokenPath,
     Brand,
     Theme
   } from '@orion-ds/react/tokens';

   // If all imports work, types are present
   ```

#### Rollback
```bash
# If types are incomplete:
git reset --hard HEAD~4

# Restore from backup
cp packages/react/src/tokens/types.ts.CURRENT packages/react/src/tokens/types.ts

# Or regenerate with old script
ts-node scripts/generate-types.ts  # (original version)
```

---

### Risk #4: P1 Fix Error Messages Too Strict
**Severity**: MEDIUM
**Likelihood**: MEDIUM
**Impact**: Developers blocked by overly strict validation

#### Root Cause Analysis
- P1 Fix #2 (brand validation) rejects brands that should be valid
- P1 Fix #3 (type validation) fails for edge cases
- Error messages unhelpful or misleading
- Whitelist doesn't match actual tokens/brands.json

#### Mitigation Strategy
1. **Before implementation**: Review actual token files
   ```bash
   # Check actual brands
   cat tokens/brands.json | jq keys
   # Should output: ["deepblue", "lemon", "orange", "orion", "red"] (5 brands)

   # Check actual spacing
   cat tokens/primary.json | jq '.spacing | keys'
   # Should include "4" (base spacing)
   ```

2. **During P1 Fix #2 implementation**:
   - Hardcode VALID_BRANDS exactly as they appear in tokens/brands.json
   - Test with each brand individually
   - Verify with: `jq 'to_entries | map(.key) | .[]' tokens/brands.json`

3. **During P1 Fix #3 implementation**:
   - Test with valid tokens first
   - Only fail on actually missing tokens
   - Check tokens/primary.json before defining requirements

#### Rollback
```bash
# If validation too strict:
git reset --hard HEAD~2

# Revert P1 Fixes only
git reset --hard HEAD~3
git cherry-pick HEAD~1  # Keep APPROACH B
git cherry-pick HEAD~0  # Skip P1 fixes

# Make validation less strict
# Edit: change "must have" to "warn if missing"
```

---

### Risk #5: Timeline Overrun (Takes Longer Than 5-6 Hours)
**Severity**: MEDIUM
**Likelihood**: MEDIUM
**Impact**: Less buffer time, rushed testing, releases slip

#### Root Cause Analysis
- Unexpected issues with escaping or syntax
- Debugging P1 fixes takes longer than expected
- Testing more thorough than anticipated
- Documentation more complex

#### Mitigation Strategy
1. **Build-in buffer**: 9-hour sprint with 5-6 hours planned work = 3-4 hours buffer
   ```
   Available: 9 hours
   Planned: 5-6 hours (APPROACH B + 3 P1 fixes + testing)
   Buffer: 3-4 hours (33-44% contingency)
   ```

2. **Break work into day-based chunks**:
   - Day 1: 2.5 hours (APPROACH B only, commit by 11:30am)
   - Day 2: 2 hours (P1 fixes, commit by 11:00am)
   - Day 3: 1.5 hours (testing, commit by 10:30am)
   - Day 4-5: 1 hour (docs/PR, commit by 11:00am)
   - **Total: 7 hours, leaving 2-hour buffer**

3. **Kill switches** (stop and reassess if...):
   - 2+ hours spent debugging escaping issue → Use APPROACH A
   - P1 Fix #2 fails on real brands → Skip validation, use warnings only
   - Type-check still failing after 1.5 hours → Rollback and reschedule

#### Mitigation
```bash
# If running out of time:

# Option 1: Ship without P1 fixes (RISKY)
git reset --hard HEAD~2  # Remove P1 fixes
npm run build:tokens
npm run type-check
# Missing error handling, but unblocks v5.3.0

# Option 2: Defer entire v5.3.0 (SAFE)
git reset --hard main
git branch -D feature/v5.3.0-dynamic-types-fix
# Reschedule for next sprint (May 2026)

# Option 3: Partial release (MEDIUM RISK)
# Ship APPROACH B + P1 Fix #1 (error handling)
# Defer P1 Fix #2, #3 to v5.3.1 patch
git reset --hard HEAD~1  # Remove P1 fixes #2, #3
```

---

### Risk #6: Rollback Required After PR Merged
**Severity**: MEDIUM
**Likelihood**: LOW
**Impact**: Requires git revert commit, users affected

#### Root Cause Analysis
- Critical bug found in production
- Types breaking in unexpected way
- P1 fixes too strict and blocking users
- Performance issue with type generation

#### Mitigation Strategy
1. **Pre-merge validation**:
   - [ ] All 5 smoke tests pass locally
   - [ ] PR review complete (at least 1 other person)
   - [ ] `npm run audit` passes (full validation suite)
   - [ ] Manual testing in IDE (autocomplete works)

2. **Post-merge monitoring** (Day 1-3):
   - Check npm download stats (unexpected spike = problem)
   - Monitor GitHub issues (any v5.3.0 complaints)
   - Monitor Slack/Discord (user feedback)

#### Rollback
```bash
# If critical bug found post-merge:

# Step 1: Revert the merge commit
git log --oneline main | head -5
# Find the merge commit hash (e.g., "abc123f Merge: v5.3.0...")

git revert -m 1 abc123f -m "Revert v5.3.0 due to [reason]"

# Step 2: Push revert commit
git push origin main

# Step 3: Publish v5.3.1 with rollback
npm version patch
npm publish
# Publishes v5.3.1 (reverted to v5.3.0 behavior)

# Step 4: Investigate and schedule v5.3.0 re-fix
# Fix the issue and re-implement in next sprint
```

---

## 🛡️ Prevention Strategy

### Pre-Implementation Validation (Before Apr 8)

**Checklist** (complete Apr 1-7):

- [ ] **1. Test escaping logic**
  ```bash
  # Create test file to verify backtick escaping
  node scripts/test-escaping.js
  # Should output string with actual backticks (not backslashes)
  ```

- [ ] **2. Verify token files are valid**
  ```bash
  # Validate all JSON token files
  for file in tokens/*.json; do
    jq empty "$file" || echo "ERROR: $file is invalid JSON"
  done
  ```

- [ ] **3. Compare old vs new architecture**
  ```bash
  # Understand current generate-types.ts
  wc -l scripts/generate-types.ts
  grep "export type" scripts/generate-types.ts | wc -l

  # Will be similar count in new version
  ```

- [ ] **4. Document current behavior**
  ```bash
  # Capture baseline
  npm run build:tokens > baseline-output.txt 2>&1
  cp packages/react/src/tokens/types.ts baseline-types.ts
  ```

- [ ] **5. Plan rollback steps**
  - [ ] Know exact git commits to revert
  - [ ] Have backup of current types.ts
  - [ ] Know APPROACH A (explicit unions) fallback location

### During Implementation (Apr 8-12)

**Daily Validation**:
- [ ] **After each commit**: Run `npm run build:tokens` immediately
- [ ] **After P1 fixes**: Run error case tests (corrupt JSON, phantom brand)
- [ ] **After tokens-runtime.ts**: Run `npm run type-check`
- [ ] **End of each day**: Commit with passing tests

**Risk Checkpoints**:

| Day | Checkpoint | Action if Failed |
|-----|-----------|-----------------|
| Apr 8 | APPROACH B generates valid types.ts | Stop, debug escaping (max 1 hour) |
| Apr 9 | P1 Fix #1 catches JSON errors | Adjust error handling (max 30 min) |
| Apr 9 | P1 Fix #2 accepts 5 brands only | Fix whitelist (max 30 min) |
| Apr 10 | All 5 smoke tests pass | Debug specific test, rollback if needed |
| Apr 11 | `npm run type-check` passes | Investigate type errors (max 1 hour) |

---

## 🔄 Rollback Procedures

### Level 1: Local Rollback (During Development, Before Commit)

**Scenario**: Implementation isn't working, need to undo changes

```bash
# Discard current day's work
git reset --hard HEAD

# Or go back to start of feature branch
git reset --hard origin/main
git checkout -b feature/v5.3.0-dynamic-types-fix
```

---

### Level 2: Commit-Level Rollback (Undo Last Commit)

**Scenario**: Last commit is broken, want to remove it

```bash
# Remove last commit but keep changes
git reset --soft HEAD~1

# OR remove last commit and discard changes
git reset --hard HEAD~1

# Verify
git log --oneline -n 3
```

---

### Level 3: Branch-Level Rollback (Abort Feature)

**Scenario**: Entire feature branch broken, abandon it

```bash
# Switch back to main
git checkout main

# Delete feature branch
git branch -D feature/v5.3.0-dynamic-types-fix

# Verify main is clean
git log --oneline -n 5
npm run build:tokens  # Should work with old version
```

---

### Level 4: Release-Level Rollback (After Merge to Main)

**Scenario**: v5.3.0 released with critical bug, need to rollback

```bash
# Step 1: Find merge commit
git log --oneline main | grep "Merge: v5.3.0"
# Example: abc123f Merge: v5.3.0 dynamic types

# Step 2: Revert merge commit
git revert -m 1 abc123f

# This creates a NEW commit that undoes the merge
# (Better than git reset --hard, which rewrites history)

# Step 3: Push revert commit
git push origin main

# Step 4: Verify revert
git log --oneline -n 5
# Should show: "Revert: Merge v5.3.0..."

# Step 5: Publish patch with rollback
npm version patch           # v5.3.1
npm publish                 # Publishes with old behavior

# Step 6: Notify users
# GitHub: Create issue documenting rollback reason
# Slack: Post in #releases channel
```

---

### Level 5: Emergency Hotfix (If Rollback Incomplete)

**Scenario**: Revert didn't fix the issue, need emergency patch

```bash
# Create fix branch from before the bad merge
git checkout main
git log --oneline | grep "before v5.3.0"
git checkout -b hotfix/v5.3.0-emergency <commit-hash>

# Make minimal fix
# ... fix code ...
# git add ... && git commit -m "hotfix: ..."

# Merge hotfix
git checkout main
git merge --no-ff hotfix/v5.3.0-emergency

# Publish emergency patch
npm version patch
npm publish
# Publishes v5.3.2
```

---

## 📋 Rollback Checklist

Print this and use it if rollback is needed:

### Before Rollback Decision
- [ ] Confirmed issue is critical (not minor bug)
- [ ] Confirmed it affects v5.3.0 only (not earlier versions)
- [ ] Discussed with team (not unilateral decision)
- [ ] No workaround available (rollback only last resort)

### Executing Rollback
- [ ] Determine rollback level (1-5 from above)
- [ ] Have backup of current code (git tags or local copies)
- [ ] Follow exact commands for that level
- [ ] Verify rollback worked (`npm run build:tokens` succeeds)
- [ ] Document reason for rollback in commit message

### Post-Rollback
- [ ] Update CHANGELOG.md with rollback note
- [ ] Create GitHub issue documenting root cause
- [ ] Schedule re-implementation (next sprint)
- [ ] Notify users (if released to npm)
- [ ] Reflect on lessons learned

---

## 🎯 Risk-Benefit Analysis

| Factor | Impact | Notes |
|--------|--------|-------|
| **Benefit**: Unblocks v5.3.0+ development | HIGH | Type safety restored, types auto-sync |
| **Risk**: Template literals still fail | LOW | APPROACH B specifically designed for this |
| **Risk**: Takes longer than planned | MEDIUM | 3-4 hour buffer built in |
| **Risk**: User-facing bugs in production | LOW | 5 smoke tests + type-check prevent most issues |
| **Cost**: 7 hours of development time | LOW | 1-2 weeks of blocked development avoided |

**Net**: Risk-benefit ratio is FAVORABLE (HIGH benefit, LOW-MEDIUM risk)

---

## 📞 Escalation Contacts

If serious issues arise:

| Issue | Contact | Action |
|-------|---------|--------|
| Template literals still failing | Architect | Review APPROACH B validity, consider APPROACH A |
| Type regression (types.ts broken) | Tech Lead | Debug type generation, verify escaping |
| Timeline slipping badly | Manager | Discuss deferral to May 2026 |
| Critical bug in production | On-call | Execute Level 4 rollback + hotfix |
| Uncertainty on next step | Alfredo (Frontend Dev) | Document decision point, escalate if needed |

---

## 📊 Metrics to Monitor

**During implementation**:
- Hours spent per day (should be ~1.5h/day)
- Number of `npm run build:tokens` failures
- Number of commits (should be 4 total)
- Test pass rate (should hit 100% by Day 3)

**After release**:
- npm downloads of v5.3.0 (baseline for detecting issues)
- GitHub issues mentioning v5.3.0
- Type-check errors in user projects
- Type generation failures reported

---

**Status**: Risk assessment complete, ready for implementation
**Architect Approval**: ✅ APPROACH B strategy approved
**Contingency Budget**: 3-4 hours (33-44% of sprint time)
**Escalation Path**: Clear and documented

Last Updated: 2026-03-24
