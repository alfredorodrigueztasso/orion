# Downstream Communication Strategy — Executive Summary

**For**: Orion Leadership, Release Managers
**Purpose**: Quick reference for how to communicate with npm users, docs-site, and downstream projects
**Last Updated**: March 21, 2026

---

## Current Situation (March 21, 2026)

| Version | Status | Issue | Action |
|---------|--------|-------|--------|
| v4.9.1 | ✅ STABLE | None | Continue using |
| v4.9.2 | ❌ BROKEN | Missing dist files | **YANK from npm** |
| v4.9.3 | ✅ WORKING | (Hotfix) | Use this after v4.9.2 |
| v4.9.4 | ✅ STABLE | None | Current recommended version |
| v4.9.5 | 🔴 BLOCKER | File extension mismatch | Publish v4.9.6 fix |
| v4.9.6 | 🟡 IN PROGRESS | (Hotfix) | Release within 24h |

---

## Three Critical Issues & Responses

### Issue 1: v4.9.2 Broken Release ✅ RESOLVED

**What happened**: Package published with only `theme.css`, missing all JavaScript files
**Duration**: 2-4 hours
**Status**: Fixed in v4.9.3
**For users**: Use v4.9.4 (skip v4.9.2 entirely)

**Communication**:
```
"We identified a critical issue in v4.9.2 where dist files were incomplete.
This caused build failures for all npm users.

v4.9.2 has been yanked from npm registry.
v4.9.3 hotfix published and fully functional.

Recommended action: Use v4.9.4 (latest stable)"
```

---

### Issue 2: v4.9.3 SSR Context Error ✅ RESOLVED

**What happened**: React context initialized as `undefined`, broke Next.js prerendering
**Duration**: ~1 hour
**Status**: Fixed in v4.9.3 (same version, additional fix)
**For users**: Use v4.9.4 (current recommended)

**Communication**:
```
"Fixed SSR context issue that caused build errors in Next.js projects
when prerendering error pages (/404, /500).

✅ v4.9.4 fully tested and recommended."
```

---

### Issue 3: v4.9.5 File Extension Mismatch 🔴 NEEDS FIX

**What happened**: `registry/preview-modules/index.ts` contains JSX but uses `.ts` extension
**Impact**: Blocks all Next.js builds (syntax error parsing JSX as TypeScript)
**Status**: Fix in progress (v4.9.6)
**Workaround**: Downgrade to v4.9.4
**ETA**: 24-48 hours

**Communication**:
```
"CRITICAL ISSUE: v4.9.5 blocks Next.js builds due to file extension mismatch.

IMMEDIATE ACTION: Downgrade to v4.9.4
  npm install @orion-ds/react@4.9.4

SOLUTION: v4.9.6 releasing March 22 (within 24 hours)
  npm install @orion-ds/react@4.9.6

ROOT CAUSE: File created with wrong extension (.ts instead of .tsx)

PREVENTION: Added automated checks to prevent recurrence"
```

---

## Communication Checklist (Before Each Release)

### Pre-Release
- [ ] Release notes prepared (use template in COMMUNICATION_STRATEGY.md)
- [ ] Breaking changes clearly documented
- [ ] Migration guide written (if applicable)
- [ ] GitHub Release draft ready
- [ ] Email notification prepared (for major changes)

### Build & Test
- [ ] All packages build successfully
- [ ] TypeScript type-check passes: `npm run type-check`
- [ ] Validation passes: `npm run validate`
- [ ] Integration test: Mock Next.js project build succeeds
- [ ] Export validation: All package.json exports have dist files

### Release
- [ ] Publish to npm
- [ ] GitHub Release published
- [ ] Notify users (all applicable channels)
- [ ] Monitor npm downloads and GitHub issues (first 24h)

### Post-Release (If issue found)
- [ ] Acknowledge issue within 15 minutes
- [ ] Provide workaround (if available)
- [ ] Hotfix ready within 1-2 hours
- [ ] Publish hotfix + update all channels
- [ ] Schedule post-mortem for next sprint

---

## Channel Usage Quick Guide

| Channel | Use For | Speed | Example |
|---------|---------|-------|---------|
| **GitHub Release** | ALL releases | ~5 min | "v4.9.6: Fixed file extension issue" |
| **GitHub Issues** | Bug reports | ~1 hour | User reports issue, we respond |
| **npm Registry** | Auto-generated | Automatic | Appears when package published |
| **Email** | Critical issues | ~1 hour | "v4.9.5 blocks Next.js builds" |
| **Documentation** | Guides & migration | ~24 hours | Migration guide for breaking changes |
| **Discord/Slack** | Real-time team alerts | Immediate | "@team critical issue in v4.9.5" |

---

## SLA Commitment (What We Promise Users)

### Critical Issues (Build blockers, security, data loss)
- **Detection**: < 15 minutes (automated monitoring)
- **Root cause**: < 20 minutes (analysis)
- **Hotfix released**: < 2 hours total
- **User notification**: < 15 minutes

### High-Priority Issues (Significant impact, workarounds exist)
- **Fix released**: < 24 hours
- **User notification**: < 1 hour

### Standard Releases
- **Release notes**: Clear and complete (use template)
- **Breaking changes**: Clearly marked with migration guide
- **Security updates**: Immediate notification via email

---

## Release Notes Template (One-Pager)

```markdown
# @orion-ds/react v4.9.6

## ✅ What's Fixed
- File extension mismatch in preview-modules (fixes Next.js build failures)
- All documented exports now have corresponding dist files

## ⚠️ If You're on v4.9.5
If you upgraded to v4.9.5 and hit build errors, upgrade to v4.9.6:
```bash
npm install @orion-ds/react@4.9.6
```

## 📦 What to Do
```bash
npm update @orion-ds/react
```

## Need Help?
- Issues: https://github.com/orion-ds/orion/issues
- Email: team@orion-design-system.com
```

---

## Three Key Principles

### 1. **Transparency First**
- Tell users what's broken ASAP (don't hide problems)
- Explain root cause in plain language (not just technical jargon)
- Provide clear workarounds or ETA for fix

### 2. **Speed Matters**
- Acknowledge critical issues < 15 minutes
- Publish hotfixes < 2 hours
- Notify all channels simultaneously

### 3. **Prevention Over Reaction**
- Build validation catches 90% of issues before release
- Integration testing prevents real-world surprises
- Post-mortems prevent recurrence

---

## What Downstream Users Need

### For docs-site Team
- **Early warning** when v4.9.5 breaks: Early notification allows planning
- **Clear workaround**: Use v4.9.4 while we fix v4.9.6
- **ETA for fix**: Know when they can upgrade again
- **Confidence**: Know we're preventing future issues

### For npm Users
- **Clear release notes**: What changed and why
- **Migration guide**: If breaking changes (with examples)
- **Support channels**: Where to report issues
- **SLA guarantees**: When critical bugs get fixed

### For Integration Testing
- **Preview modules feature**: Test with Next.js projects before release
- **All declared exports**: Ensure every export path has dist files
- **Real-world scenarios**: Test in actual user environments

---

## Quick Decision Tree

```
Issue reported
│
├─ Build blocker? → CRITICAL (< 2h fix, email users)
├─ Affects >50% users? → HIGH (< 24h fix, notify)
├─ Minor bug? → MEDIUM (next release)
└─ Polish/docs? → LOW (backlog)

Fix ready?
│
├─ YES → Test + publish + notify
└─ NO → Provide workaround + update status
```

---

## Files Created (Complete Strategy)

1. **COMMUNICATION_STRATEGY.md** (Detailed, 400+ lines)
   - Communication channels
   - SLA commitments
   - Release notes template
   - Incident response playbook
   - Prevention measures

2. **STATUS_UPDATE_V4.9.5.md** (For users, 1-pager)
   - What's happening
   - What you should do
   - Timeline
   - Support channels

3. **POSTMORTEM_V4.9.2.md** (Detailed analysis)
   - What went wrong
   - Why it happened
   - How to prevent
   - Lessons learned

4. **This summary** (Quick reference)
   - Current status of all versions
   - Communication checklist
   - Quick decision tree
   - SLA commitments

---

## Next Actions (Priority Order)

### Today (March 21)
- [ ] Finalize v4.9.6 fix (rename index.ts → index.tsx)
- [ ] Post status update on GitHub (STATUS_UPDATE_V4.9.5.md content)
- [ ] Email users with workaround + timeline

### Tomorrow (March 22)
- [ ] Publish v4.9.6 to npm
- [ ] Update all communication channels
- [ ] Verify users can upgrade successfully

### This Week
- [ ] Implement validation script (scripts/validate-exports.js)
- [ ] Add integration testing to CI/CD
- [ ] Schedule team post-mortem

### This Month
- [ ] Train team on SLA commitments
- [ ] Document release runbook
- [ ] Set up monitoring for package health

---

## Success Criteria

After implementing this strategy, measure:

✅ **Speed**: 100% of critical issues acknowledged < 15 min
✅ **Clarity**: Users understand status from one-page summary
✅ **Prevention**: No repeat of v4.9.2 / v4.9.5 incidents
✅ **Trust**: Users feel confident in release quality

---

## Support Contacts

| Role | Responsibility | Escalation |
|------|---|---|
| **Release Manager** | Own release process, validate exports | Team lead |
| **Team Lead** | Approve releases, critical bug decisions | CTO |
| **Communications** | Notify users, GitHub/email/social | Release Manager |
| **QA** | Integration testing, build validation | Team lead |

---

**Document Version**: 1.0
**Last Review**: March 21, 2026
**Next Review**: After v4.9.6 release (March 23)

