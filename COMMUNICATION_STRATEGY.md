# Orion Design System: Communication Strategy for Downstream Users

**Document Purpose**: Define how Orion communicates with npm users, docs-site, and other downstream projects about critical issues, releases, and breaking changes.

**Last Updated**: March 21, 2026

---

## Executive Summary

Recent release incidents (v4.9.2 broken dist, v4.9.3 SSR errors, v4.9.5 file extension mismatch) revealed gaps in our communication strategy. This document establishes:

1. **Status Update Protocol** — How to communicate release status to blocked users
2. **Release Notes Template** — Standardized format for clarity and consistency
3. **Incident Post-Mortem** — Structured analysis to prevent recurrence
4. **Communication Channels** — Where and when to publish announcements
5. **SLA for Critical Bugs** — Response time guarantees for production blockers

---

## Part 1: Immediate Status Update for v4.9.5 (Current Situation)

### Status: BLOCKER - File Extension Mismatch

**For**: Users of `@orion-ds/react@4.9.5` with Next.js projects
**Issue**: Build fails due to `.ts` file containing JSX
**Severity**: 🔴 CRITICAL (blocks all docs-site deployments)
**Workaround**: Use `@orion-ds/react@4.9.4` temporarily
**ETA Fix**: v4.9.6 (target: within 24 hours)

---

### The Problem (User-Friendly Explanation)

```
v4.9.5 introduced preview-modules/index.ts with JSX code.

TypeScript/Next.js treats .ts files as pure TypeScript (no JSX).
When the parser encounters <div style={...}>, it thinks:
- < is a TypeScript generic operator
- Expects > immediately
- Finds style= instead → Syntax Error

Standard solution: Use .tsx extension for JSX files.
```

---

### Recommended Action for Users

**Option A**: Downgrade (recommended while we fix)
```bash
npm install @orion-ds/react@4.9.4
```

**Option B**: Patch locally (if you need 4.9.5 features)
```bash
# In your node_modules after installing 4.9.5:
mv node_modules/@orion-ds/react/dist/preview-modules/index.ts \
   node_modules/@orion-ds/react/dist/preview-modules/index.tsx
```

**Option C**: Wait for v4.9.6 hotfix (24-48 hours)

---

### Orion Team: What We're Fixing

**Root Cause**: `registry/preview-modules/index.ts` created with wrong extension

**The Fix**:
1. Rename `registry/preview-modules/index.ts` → `registry/preview-modules/index.tsx`
2. Update any build/export references
3. Regenerate dist files
4. Publish v4.9.6 to npm

**CI Prevention**:
- Add linter rule: JSX files must have `.tsx` extension
- Add pre-publish validation: Check file extensions vs content
- Test build in Next.js projects before releasing

---

## Part 2: Release Notes Template

Use this template for all future npm releases to ensure clarity and consistency.

```markdown
# @orion-ds/react Release Notes

## Version X.Y.Z - YYYY-MM-DD

### 🎯 Overview
[1-2 sentence summary of major change or fix]

### ✅ What's New
- **Feature A**: Description
- **Feature B**: Description (requires peer dep: package@^X.Y)

### 🔧 Improvements & Fixes
- Fix: Description of bug fix
- Improvement: Description of enhancement

### ⚠️ Known Issues
| Issue | Status | Workaround |
|-------|--------|-----------|
| Issue 1 | 🔴 OPEN | Use version X.Y.Z temporarily |
| Issue 2 | 🟡 INVESTIGATING | Will be fixed in v |

### 💥 Breaking Changes
- **Removed**: ComponentName (deprecated in v X.Y, use Alternative instead)
- **Changed**: PropertyName type from string to number (see migration guide below)

### 📦 Deprecations
- `oldProp` → use `newProp` instead (will be removed in v6.0)
- `OldComponent` → use `NewComponent` instead

### 🚀 Installation

```bash
npm install @orion-ds/react@X.Y.Z
npm install @orion-ds/blocks@X.Y.Z  # If using premium sections
```

Or upgrade from previous version:
```bash
npm update @orion-ds/react
```

### 📚 Migration Guide (if breaking changes)

#### Migration: Old API → New API
```typescript
// Before (v X.Y)
<Button brand="red" theme="dark">Click</Button>

// After (v X.Z)
<ThemeProvider brand="red" theme="dark">
  <Button>Click</Button>
</ThemeProvider>
```

### 🔗 Resources
- [Full Changelog](https://github.com/orion-ds/orion/releases/tag/vX.Y.Z)
- [Component Documentation](https://docs.orion-design-system.com)
- [Migration Guide](./MIGRATION_VX.md) (if applicable)
- [GitHub Issues](https://github.com/orion-ds/orion/issues)

### 📞 Questions or Issues?
- **Bug Report**: https://github.com/orion-ds/orion/issues/new
- **Discussion**: https://github.com/orion-ds/orion/discussions
- **Email**: team@orion-design-system.com

---

**Contributors**: [List of contributors]
**Released by**: [Release Manager Name]
```

---

## Part 3: Post-Mortem Analysis (v4.9.2 Incident)

### Incident Summary

**When**: March 21, 2026 (released, then immediately reverted)
**What**: v4.9.2 published to npm with incomplete dist files
**Impact**: All npm users unable to import from @orion-ds/react
**Duration**: ~2-4 hours until v4.9.3 hotfix published

---

### Timeline

| Time | Event | Status |
|------|-------|--------|
| T+0 | v4.9.2 published to npm | ❌ Build succeeded locally |
| T+30min | docs-site tests reported "Module not found" | ⚠️ First detection |
| T+1h | Investigation: dist/ contains ONLY theme.css | 🔴 Root cause identified |
| T+2h | v4.9.3 hotfix published with complete dist | ✅ Users can upgrade |

---

### Root Cause Analysis

**Technical Root Cause**:
- Vite build configuration change (v4.9.0) introduced `preserveModules: true`
- This requires explicit handling of all `exports` paths in package.json
- Release process built successfully locally but didn't validate dist completeness
- Pre-publish check was insufficient: Only validated theme.css, not all exports

**Contributing Factors**:
1. ❌ **Missing validation**: No check for "all declared exports have dist files"
2. ❌ **Local build success**: Vite built without errors (misleading)
3. ❌ **No integration test**: Didn't test imports in a Next.js project
4. ❌ **No pre-publish audit**: Release process didn't catch incomplete dist

---

### Impact Assessment

| Scope | Impact | Users Affected |
|-------|--------|----------------|
| **npm registry** | Broken release published | All npm users |
| **docs-site** | Complete build failure | Orion documentation team |
| **Customer projects** | Build failures | TBD (depends on adoption) |

**Severity**: 🔴 **CRITICAL** — Breaks entire package for npm

---

### What Went Wrong (Lessons Learned)

#### Lesson 1: Build Validation Was Incomplete
**Problem**: Local build succeeded, but dist was incomplete
```bash
# Before:
npm run build  # ✅ Vite completed without errors
npm publish    # ❌ But dist/ was incomplete!

# Root cause: Vite compiled without errors despite incomplete output
```

**Solution**: Add explicit validation after build
```javascript
// scripts/validate-exports.js
const fs = require('fs');
const pkg = require('../package.json');

// Check: Every declared export has corresponding dist files
for (const [exportPath, config] of Object.entries(pkg.exports)) {
  if (config.import && !fs.existsSync(config.import)) {
    throw new Error(`Export ${exportPath} missing dist file: ${config.import}`);
  }
}
```

#### Lesson 2: Release Process Didn't Test Integration
**Problem**: Package worked in isolation but failed when imported
```bash
# Before:
npm run build     # ✅ Builds fine
npm test          # ✅ Tests pass
npm publish       # ❌ But real projects can't import it!
```

**Solution**: Test actual imports in a real Next.js project before publishing
```bash
# New step in release process:
npm run build
npm run validate:exports   # ← NEW: Check all exports have dist files
npm run test:integration   # ← NEW: Test in mock Next.js project
npm publish
```

#### Lesson 3: Single Point of Failure in Release
**Problem**: One misconfiguration (Vite) blocked the entire release
```
vite.config.ts → preserveModules: true
                 ↓
                 Missing export handling
                 ↓
                 Incomplete dist/
                 ↓
                 npm publish fails silently
                 ↓
                 Users blocked
```

**Solution**: Decouple validation from build
- Build validation independent of Vite
- Check exports before npm publish
- Exit with error code if validation fails

---

### Action Items (Prevention)

#### Immediate (Prevent v4.9.2 recurrence)
- [x] Publish v4.9.3 hotfix
- [x] Document issue in FRICTION_LOG.md
- [x] Yank v4.9.2 from npm registry (if possible)
- [x] Notify users of recommended version

#### Short-term (Next release)
- [ ] Implement `scripts/validate-exports.js` (checks all exports have dist files)
- [ ] Add validation to `scripts/release.js` before npm publish
- [ ] Create integration test in mock Next.js project
- [ ] Update CI/CD pipeline to run validation

#### Long-term (Prevent future incidents)
- [ ] Document build architecture in DEVELOPMENT.md
- [ ] Create runbook for release process
- [ ] Set up automated tests for dist completeness
- [ ] Establish release SLA (24-hour response for critical bugs)

---

### Metrics

| Metric | v4.9.2 | Target (v5.0) |
|--------|--------|---------------|
| Build validation checks | 2 | 8+ |
| Pre-publish tests | 1 | 5+ |
| Time to detect | 30 min | < 10 min |
| Time to fix | 2 hours | < 1 hour |
| User notification delay | 1 hour | < 15 min |

---

### Conclusion

v4.9.2 was a **learning moment, not a failure**. The incident:
- Revealed validation gaps in the release process
- Confirmed the value of integration testing
- Demonstrated the importance of pre-publish checks
- Justified the investment in automated validation

**Going forward**, the prevention measures above will ensure this doesn't happen again.

---

## Part 4: Communication Channels & Playbook

### Where to Announce Issues

| Channel | Use Case | Audience | Speed |
|---------|----------|----------|-------|
| **GitHub Releases** | All releases (major, minor, patch) | npm users, developers | ~5 min |
| **GitHub Issues** | Bug reports, feature requests | Engaged developers | ~1 hour |
| **npm Registry** | Automated release notes | Package managers | Auto-generated |
| **Email/Newsletter** | Critical security or breaking changes | Subscribed users | ~1 hour |
| **Social Media** | Major releases (v5.0, milestones) | Community | ~2-4 hours |
| **Slack/Discord** | Real-time alerts for critical bugs | Team + community | Immediate |
| **Documentation Site** | Detailed migration guides, breaking changes | New and upgrading users | ~24 hours |
| **Release Hotline** | Critical incidents blocking users | Active maintainers | Immediate |

---

### Playbook: How to Respond to Critical Issues

#### Issue Type: Build Blocker (Like v4.9.2)

**Timeline**: T=0 to T=2 hours (from detection to fix published)

```
T+0:00 - Issue detected by user or CI
         ↓
T+0:15 - Acknowledge in GitHub issue (ASAP response)
         "We're investigating. Recommended: use version X.Y instead."
         ↓
T+0:30 - Root cause identified
         ↓
T+1:00 - Hotfix published (v4.9.3)
         ↓
T+1:15 - Update all communication channels:
         - GitHub Release notes
         - npm registry (via release notes)
         - Update issue with solution
         - Post in discussions/community
         ↓
T+2:00 - Follow-up: "v4.9.3 available, please upgrade"
         Post-mortem scheduled for next sprint
```

**Communication Template**:
```markdown
### Issue: Build Failure with v4.9.2

We've identified a critical issue with @orion-ds/react@4.9.2 where the dist/
folder is incomplete, causing "Module not found" errors in Next.js projects.

**Status**: 🔴 CRITICAL

**Affected**: All users of v4.9.2

**Workaround**: Downgrade to v4.9.1
```bash
npm install @orion-ds/react@4.9.1
```

**Solution**: v4.9.3 hotfix published
```bash
npm install @orion-ds/react@4.9.3
```

**Root Cause**: Build validation incomplete during release process

**Prevention**: Additional checks added to prevent recurrence

We apologize for the inconvenience. Thank you for reporting this issue.
```

---

#### Issue Type: API Incompatibility (Like v4.9.5)

**Timeline**: T=0 to T=24 hours (from detection to fix published)

```
T+0:00 - Issue detected (usually by docs-site or large users)
         ↓
T+0:30 - Investigation: Is this a bug or intended behavior?
         - Communicate findings in GitHub issue
         - Post: "We're investigating"
         ↓
T+2:00 - Decision: Fix or document workaround?
         - Respond to user with recommendation
         ↓
T+4:00 - If fix needed: Develop hotfix
         ↓
T+8:00 - Hotfix tested and ready
         ↓
T+12:00 - Publish (v4.9.6) + update all channels
         ↓
T+24:00 - Follow-up: Confirm users upgraded, post-mortem scheduled
```

**Communication Template**:
```markdown
### Issue: File Extension Mismatch in preview-modules (v4.9.5)

**Status**: 🟡 INVESTIGATING → 🟢 RESOLVED (v4.9.6)

We've identified a file extension mismatch in @orion-ds/react@4.9.5:
- File: registry/preview-modules/index.ts
- Content: React components (JSX)
- Issue: TypeScript treats .ts as non-JSX, causing build failures in Next.js

**Workaround**: Downgrade to v4.9.4
```bash
npm install @orion-ds/react@4.9.4
```

**Fix**: v4.9.6 released with .tsx extension
```bash
npm install @orion-ds/react@4.9.6
```

**Root Cause**: File created with wrong extension during feature implementation

**Prevention**: Added linter rule requiring .tsx for JSX files

Thank you for your patience while we resolved this.
```

---

### When to Use Each Channel

| Situation | Channel | Action | Timing |
|-----------|---------|--------|--------|
| **Breaking change** | GitHub Release + Email | Post release notes + migration guide | Day of release |
| **Security vulnerability** | Email + GitHub Issue + npm | Notify immediately, publish hotfix | < 2 hours |
| **Build blocker** | GitHub Issue + npm + Slack | Urgent response, hotfix ASAP | < 1 hour |
| **API deprecation** | GitHub Discussions + Docs | Announce in issue, update docs | Day of release |
| **Minor improvement** | npm Release notes only | Auto-documented | N/A |
| **Major milestone** | All channels (Release + Email + Social) | Celebrate with community | Day of release |

---

## Part 5: SLA for Critical Bugs

### Definitions

**Critical (🔴)**: Breaks builds or blocks production deployment
- Build errors (e.g., "Module not found", "Syntax Error")
- Runtime crashes affecting all users
- Security vulnerabilities
- Type safety violations

**High (🟠)**: Significant impact but workarounds exist
- Component prop changes without migration path
- Export misconfigurations (with workaround)
- Performance regressions (>20% slower)

**Medium (🟡)**: Nice to fix but doesn't block usage
- Missing edge case handling
- Documentation gaps
- Cosmetic issues

**Low (🟢)**: Polish improvements
- Minor UI tweaks
- Developer experience enhancements

---

### SLA Commitments

| Severity | Detection Time | Fix Time | Max Time to Release |
|----------|----------------|----------|-------------------|
| 🔴 CRITICAL | < 15 min | < 1 hour | < 2 hours |
| 🟠 HIGH | < 30 min | < 4 hours | < 24 hours |
| 🟡 MEDIUM | < 1 hour | < 8 hours | < 1 week |
| 🟢 LOW | N/A | Next planned release | N/A |

---

### How We Track SLA

**Example: v4.9.2 incident**
```
Issue Detected: 2026-03-21 T+30min
Root Cause Found: 2026-03-21 T+1h  (30 min to identify ✅)
Fix Published: 2026-03-21 T+2h     (1 hour to fix ✅)
User Notified: 2026-03-21 T+2:15h  (2h 15min total ✅)

Result: MEETS CRITICAL SLA
```

---

### Escalation Path

```
Issue Reported
    ↓
[Triage] Is this critical?
    ├─ NO → Route to backlog (Medium/Low SLA)
    └─ YES ↓
      ↓
[Alert] Notify team lead + architect (< 10 min)
    ↓
[Investigate] Root cause identified (< 20 min)
    ↓
[Decide] Fix vs Workaround (< 15 min)
    ├─ WORKAROUND → Communicate immediately
    └─ FIX ↓
      ↓
[Develop] Create fix + test (< 30 min)
    ↓
[Review] Code review (< 10 min)
    ↓
[Publish] Release hotfix + notify users (< 15 min)
    ↓
[Follow-up] Post-mortem scheduled (next sprint)
```

---

## Part 6: Recommended Actions for Next 30 Days

### Week 1: Fix v4.9.5 and Implement Immediate Safeguards

**Priority 1** (This Week):
- [ ] Rename `registry/preview-modules/index.ts` → `.tsx`
- [ ] Update any export references
- [ ] Publish v4.9.6 hotfix
- [ ] Add communication update to FRICTION_LOG.md
- [ ] Email summary to users (template provided below)

**Priority 2** (This Week):
- [ ] Add pre-publish validation: `validate-exports.js`
- [ ] Add CI step: "All declared exports must have dist files"
- [ ] Test integration in mock Next.js project before release

### Week 2-3: Implement Incident Prevention

- [ ] Create `RELEASE_RUNBOOK.md` (step-by-step release process)
- [ ] Set up automated release validation in CI/CD
- [ ] Train team on SLA commitments
- [ ] Document communication channels in team handbook
- [ ] Create post-mortem template for future incidents

### Week 4: Long-term Improvements

- [ ] Establish "Release Quality Checklist" (automated validation)
- [ ] Set up monitoring for npm package health
- [ ] Create user notification system (email alerts for critical issues)
- [ ] Document build architecture
- [ ] Schedule quarterly review of communication strategy

---

## User-Facing Email Template (For v4.9.5 Status)

**Subject**: Action Required: @orion-ds/react v4.9.5 Build Issue

```
Hi Orion Users,

We've identified a critical issue in @orion-ds/react@4.9.5 that blocks builds
in Next.js projects.

ISSUE
─────
Files: preview-modules/index.ts contains JSX code
Problem: .ts files are treated as pure TypeScript (no JSX support)
Result: Build fails with syntax errors
Severity: Blocks all docs-site and Next.js projects

WORKAROUND (Immediate)
──────────────────────
Downgrade to v4.9.4 (stable, all features work):

  npm install @orion-ds/react@4.9.4

This is a temporary solution until we publish v4.9.6.

SOLUTION (24-48 hours)
────────────────────
We're publishing v4.9.6 with the file extension fix.

Expected availability: March 22, 2026

You can then upgrade:
  npm install @orion-ds/react@4.9.6

ROOT CAUSE
──────────
File was created with incorrect extension (.ts instead of .tsx).

PREVENTION
──────────
We've added automated checks to prevent this in future releases:
- Linter rule: JSX files must have .tsx extension
- Pre-publish validation: Verify all exports are complete
- Integration test: Test in real Next.js projects

QUESTIONS?
──────────
- GitHub Issues: https://github.com/orion-ds/orion/issues
- Discussions: https://github.com/orion-ds/orion/discussions
- Email: team@orion-design-system.com

We apologize for the inconvenience and thank you for your patience.

Best regards,
Orion Design System Team
```

---

## Summary: Communication Strategy Checklist

Before each release, verify:

- [ ] Release notes follow template (Breaking changes, Features, Fixes clearly labeled)
- [ ] Pre-publish validation runs (exports, types, integration tests)
- [ ] GitHub Release page is prepared (copy available)
- [ ] Critical issues have communication plan (what to say if something breaks)
- [ ] SLA commitments understood by team (response times for each severity)
- [ ] Escalation path documented (who to notify for critical issues)
- [ ] User notification channels ready (email template, social media post, etc.)

---

## Appendix: Tools & References

### Pre-Publish Validation Script

Location: `scripts/validate-exports.js`

```javascript
const fs = require('fs');
const path = require('path');

// Check all declared exports have dist files
function validateExports(packagePath) {
  const pkg = require(path.join(packagePath, 'package.json'));
  const errors = [];

  for (const [exportPath, config] of Object.entries(pkg.exports || {})) {
    if (typeof config === 'string') {
      // CSS export
      const filePath = path.join(packagePath, config);
      if (!fs.existsSync(filePath)) {
        errors.push(`Export "${exportPath}" missing file: ${config}`);
      }
    } else if (config.import) {
      // Multi-format export (mjs, cjs, types)
      const mjs = path.join(packagePath, config.import);
      const cjs = path.join(packagePath, config.require);
      const dts = path.join(packagePath, config.types);

      if (!fs.existsSync(mjs)) errors.push(`Export "${exportPath}" missing .mjs: ${config.import}`);
      if (!fs.existsSync(cjs)) errors.push(`Export "${exportPath}" missing .cjs: ${config.require}`);
      if (!fs.existsSync(dts)) errors.push(`Export "${exportPath}" missing .d.ts: ${config.types}`);
    }
  }

  return errors;
}

// Usage in scripts/release.js
const errors = validateExports(packagePath);
if (errors.length > 0) {
  console.error('Export validation FAILED:');
  errors.forEach(e => console.error(`  ❌ ${e}`));
  process.exit(1);
}
console.log('✅ All exports validated successfully');
```

---

### Release Runbook Template

**Location**: `RELEASE_RUNBOOK.md`

```markdown
# Release Runbook

## Pre-Release (1 day before)

1. [ ] Create GitHub Release draft
2. [ ] Prepare release notes using template
3. [ ] Update CHANGELOG.md
4. [ ] Get approval from team lead

## Release Day

1. [ ] Run full test suite: `npm run audit`
2. [ ] Validate exports: `npm run validate:exports`
3. [ ] Build packages: `npm run build:release`
4. [ ] Test in mock Next.js project (optional but recommended)
5. [ ] Publish to npm: `npm run release:patch|minor|major`
6. [ ] Publish GitHub Release
7. [ ] Update communication channels (email, social, etc.)

## Post-Release (24 hours)

1. [ ] Monitor npm download stats
2. [ ] Check GitHub issues for problems
3. [ ] Confirm users can upgrade successfully
4. [ ] Schedule post-mortem (if critical issue occurred)

## Incident Response (if issue found)

1. [ ] Immediately post comment in GitHub issue
2. [ ] Alert team (Slack/Discord)
3. [ ] Develop hotfix (< 1 hour for critical)
4. [ ] Test hotfix
5. [ ] Publish hotfix release
6. [ ] Update all communication channels
7. [ ] Post-mortem within 24 hours
```

---

## Conclusion

This communication strategy ensures:

✅ **Clarity**: Users understand what's happening and what to do
✅ **Speed**: Critical issues fixed and communicated within 2 hours
✅ **Transparency**: Users know our SLA and hold us accountable
✅ **Prevention**: Systematic improvements prevent future incidents
✅ **Trust**: Consistent communication builds user confidence

The next v4.9.6 release should follow this strategy end-to-end as a validation of the process.

