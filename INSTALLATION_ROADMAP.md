# Orion Installation UX — Roadmap Ordenado

**Created**: 2026-03-23
**Status**: PLANNING
**Owner**: Tech Lead + Architect + Backend Dev
**Goal**: Make Orion easy to install, update, and integrate with AI

---

## 📋 THE BIG PICTURE

We have **7 initiatives** to improve installation experience. This roadmap orders them by:
1. **Dependencies** — What must happen before what?
2. **Impact** — Which fixes help the most users?
3. **Risk** — What could break if we're not careful?
4. **Effort** — How long does each take?

---

## 🎯 PHASES & TIMELINE

### PHASE 1: FOUNDATION (Week 1-2) ← START HERE
**Goal**: Fix critical friction points that block users TODAY. **v5.0.0 is already released — focus on unblocking current users.**

#### 1a. Release Notes v5.0.0 (RETROACTIVE - 2 hours) ⚠️ URGENT
**What**: Publish missing release notes for v5.0.0 (already released tag but no docs)
**Include**:
- What's new in v5.0.0 (breaking changes from v4.x)
- Migration guide link (MIGRATION_v5.md)
- How to upgrade (`npm install @orion-ds/react@latest`)
- New features (AI Integration, MCP setup, TypeScript types)

**Why now**: v5.0.0 is already in production. Users need this info immediately.
**Dependencies**: None
**Risk**: Very low — documentation only
**Deliverable**: `docs-site/src/docs/ReleaseNotes.mdx` with prominent link from homepage

---

#### 1b. Quick Start Guide (NEW - Critical Gap - 3 hours)
**What**: Step-by-step guide for 90% of new users (was missing from roadmap)
**Sections**:
1. Install: `npm install @orion-ds/react`
2. Import CSS: `import '@orion-ds/react/styles.css'`
3. Wrap app: `<ThemeProvider><App /></ThemeProvider>`
4. Use a component: `<Button>Click me</Button>`
5. Next steps: Links to component docs, Storybook, MCP

**Why now**: 90% of new users hit this first. Missing Quick Start = friction for everyone.
**Dependencies**: None
**Risk**: Low
**Deliverable**: `docs-site/src/docs/QuickStart.mdx` + homepage link

---

#### 1d. Post-Install Validation Hook (4 hours)
**What**: npm script that runs after `npm install @orion-ds/react`
**Checks**:
- ✓ CSS import present in entry file
- ✓ ThemeProvider wrapping app
- ✓ Optional deps (recharts, date-fns) available if needed
- ✓ No hardcoded values (AI-First validation)

**Why now**: Prevents #1 issue (unstyled components)
**Dependencies**: None
**Risk**: Low — only warnings, doesn't modify code
**Deliverable**:
- `packages/react/scripts/validate-install.js`
- Entry in package.json `"postinstall": "node scripts/validate-install.js"`
- Clear warning messages in stdout

---

#### 1e. Migration v4→v5 Documentation (2 hours)
**What**: Single source of truth for upgrading from v4 to v5
**Sections**:
1. "What changed in v5" — Breaking changes
2. "How to upgrade" — Step-by-step (remove @orion-ds/core, update imports, etc.)
3. "New features in v5" — AI-First compliance, TypeScript types, MCP
4. "FAQ" — Common migration questions

**Why now**: Existing users need clear upgrade path
**Dependencies**: None
**Risk**: Very low — documentation only
**Deliverable**:
- `MIGRATION_v5.md` at project root
- Linked from packages/react/README.md and Release Notes

---

#### 1f. Component Discovery Documentation (NEW - Critical Gap - 2 hours)
**What**: Help users find the component they need (was missing from roadmap)
**Contents**:
1. Component browser (grid view with search)
2. "Find a component by use case" (e.g., "I need a form field" → Field component)
3. Component categories: Layout, Form, Feedback, Navigation
4. Links to Storybook for live examples

**Why now**: 70% of users waste time searching for the right component
**Dependencies**: Existing components (no new components needed)
**Risk**: Low — documentation only
**Deliverable**: `docs-site/src/docs/ComponentBrowser.mdx` with searchable grid

---

#### 1g. AI Integration Visibility (2 hours - Reduced)
**What**: Surface MCP + AI capabilities in README
**Changes**:
1. Add "AI Integration" section to `packages/react/README.md`
2. Link to MCP setup (3 steps)
3. Note: "Works with Claude Code, Cursor, Cline"

**Why now**: AI agents need to discover Orion
**Dependencies**: None
**Risk**: Low
**Deliverable**: Updated packages/react/README.md with AI section

---

**PHASE 1 TOTAL: 15 hours (was 9h, team feedback shows critical gaps)**
**Impact**: Fixes ~80% of adoption friction
**Timeline**: Week 1 (can be done in parallel)

---

### PHASE 2: ROBUSTNESS (Week 3-4) ← AFTER PHASE 1
**Goal**: Prevent common errors and improve DX. **Note**: 2a moved to Phase 4 (affects only 5-10% of monorepo contributors, niche use case per team feedback).

#### 2a. CLI Working Directory Validation (MOVED TO PHASE 4 - Lower Priority)
**Status**: Deprioritized. Monorepo structure support affects only 5-10% of users. Keep for future v6.0.0.

---

#### 2b. Optional Dependency Error Messages (2 hours)
**What**: When user imports `<Chart>` without recharts, show helpful error
**Current error**: `Cannot find module 'recharts'` ← cryptic
**New error**:
```
🔴 Chart component requires recharts

Try: npm install recharts

Learn more: https://orion-ds.dev/docs/chart
```

**Why now**: Reduces cryptic errors → user frustration
**Risk**: Low
**Deliverable**: Enhanced error boundary in `packages/react/src/components/Chart/index.ts`

---

#### 2c. First-Use Template (MVP VERSION - 3-4 hours)
**What**: `npx @orion-ds/cli create my-app` includes working example
**MVP scope**: Single Next.js template with:
- 1 working Button component example
- Light/dark mode toggle
- Inline comments
- README with "next steps"

**Full scope** (deferred): 3 templates (Next.js, Vite, Create React App) = 5-6h

**Why MVP now**: Most new users need Node-based template. Others can follow Quick Start.
**Risk**: Low
**Deliverable**: `packages/cli/templates/next-app/` with working example

---

**PHASE 2 TOTAL: 7-8 hours (was 9h, focused on higher-impact items)**
**Impact**: Prevents common errors
**Timeline**: Week 3-4 (can be parallel after Phase 1)
**Dependencies**: PHASE 1 should be complete first (so users have good docs)

---

### PHASE 3: DOCUMENTATION & POLISH (Week 5-6) ← OPTIONAL
**Goal**: Increase user confidence and adoption

#### 3a. Video Walkthrough (3 hours)
**What**: 2-minute video: install → import → use Button
**Shows**:
- npm install @orion-ds/react
- CSS import
- ThemeProvider setup
- Brand switching
- Light/dark mode toggle

**Why now**: Video explains better than text for some users
**Dependencies**: PHASE 1 (so everything is documented)
**Risk**: Very low — optional content
**How to verify**: Video published on docs site

---

**PHASE 3 TOTAL: 3 hours**
**Impact**: Increases adoption for visual learners
**Timeline**: Week 5-6
**Dependencies**: PHASE 1 complete

---

### PHASE 4: FUTURE & NICE-TO-HAVE (v5.1.0+) ← OPTIONAL

#### 4a. CLI Working Directory Validation (3 hours)
**What**: Detect if user runs `orion init` from monorepo subdirectory
**Impact**: Prevents confusion for 5-10% of monorepo contributors
**Why deferred**: Niche use case; Phase 1-3 address 90% of users
**Timeline**: After 5.0.0 adoption is solid

#### 4b. Automated Upgrade Assistant (6 hours)
**What**: `orion upgrade --from=v4 --to=v5` auto-fixes migrations
**Impact**: Nice-to-have convenience, not blocking
**Why deferred**: Manual upgrade is documented in Phase 1e
**Timeline**: v6.0.0 or later

#### 4c. Framework Templates (Vite, CRA) (4 hours)
**What**: Expand template library beyond MVP Next.js
**Impact**: Convenience for non-Next.js users
**Why deferred**: Phase 2c MVP covers majority use case
**Timeline**: v5.1.0 or later

---

## 📊 DEPENDENCY MAP

```
PHASE 1 (All tasks parallel - 15 hours)
  1a. Release notes (2h)     ← CRITICAL - v5.0.0 already released
  1b. Quick Start (3h)       ← NEW - unblocks 90% of users
  1c. Post-install (4h)      ← Prevents unstyled components
  1d. Migration docs (2h)    ← Existing users need upgrade path
  1e. Component discovery (2h) ← NEW - helps users find components
  1f. AI visibility (2h)     ← Enables AI integration
       ↓
PHASE 2 (After Phase 1 - 7-8 hours)
  2a. Deps errors (2h)       ← Independent, can happen parallel
  2b. Template MVP (3-4h)    ← Depends on Quick Start context
       ↓
PHASE 3 (After Phase 2 - 3 hours)
  3a. Video walkthrough (3h) ← Nice-to-have, not blocking
       ↓
PHASE 4 (Future - 13 hours total)
  - CLI validation (3h)
  - Upgrade assistant (6h)
  - Additional templates (4h)
```

**Critical path (blocking)**:
- Phase 1 (15h, parallel) → Phase 2 (8h) → Phase 3 (3h) = **26 hours**

**MVP path (unblock most users)**:
- Phase 1a, 1b, 1d (7h) → Phase 2b MVP (3h) = **10 hours fast-track**

---

## ✅ EXECUTION CHECKLIST

### Before Starting Phase 1
- [ ] Assign team members (Backend Dev, UX Writer, Product Owner)
- [ ] Set up branch: `feat/installation-ux`
- [ ] Schedule daily sync (15 min) to catch issues early

### Phase 1 (Week 1-2) — 6 parallel workstreams
**Can all be done in parallel since no dependencies between them**

- [ ] **1a: Release Notes v5.0.0** (CRITICAL - RETROACTIVE)
  - [ ] Create `docs-site/src/docs/ReleaseNotes.mdx`
  - [ ] Document breaking changes from v4→v5
  - [ ] Link to MIGRATION_v5.md
  - [ ] Add homepage link (visible on first visit)
  - [ ] Publish to docs-site

- [ ] **1b: Quick Start Guide** (NEW - UNBLOCKS 90%)
  - [ ] Create `docs-site/src/docs/QuickStart.mdx`
  - [ ] 5 steps: Install → Import CSS → Wrap App → Use Component → Next Steps
  - [ ] Include code examples for each step
  - [ ] Add prominent link from homepage
  - [ ] Verify all links work

- [ ] **1c: Post-install Validation Hook**
  - [ ] Write `packages/react/scripts/validate-install.js`
  - [ ] Test with npm install (missing CSS → warn)
  - [ ] Test with missing ThemeProvider (→ warn)
  - [ ] Add to package.json `"postinstall"`
  - [ ] Merge to main

- [ ] **1d: Migration v4→v5 Documentation**
  - [ ] Create `MIGRATION_v5.md` at root
  - [ ] List all breaking changes (remove @orion-ds/core, etc.)
  - [ ] Step-by-step upgrade instructions
  - [ ] FAQ section
  - [ ] Link from README and Release Notes

- [ ] **1e: Component Discovery Documentation** (NEW)
  - [ ] Create `docs-site/src/docs/ComponentBrowser.mdx`
  - [ ] Searchable component grid (39 components)
  - [ ] Organize by category: Layout, Form, Feedback, Navigation
  - [ ] "Find by use case" section
  - [ ] Links to Storybook

- [ ] **1f: AI Integration Visibility**
  - [ ] Add "AI Integration" section to `packages/react/README.md`
  - [ ] 3-step MCP setup
  - [ ] Note compatible tools (Claude Code, Cursor, Cline)
  - [ ] Link to packages/mcp/README.md

### After Phase 1 Completion
- [ ] Verify: Fresh `npm install @orion-ds/react` shows helpful warnings if CSS missing
- [ ] Verify: Existing users can follow Quick Start + Migration docs
- [ ] Verify: New users can find components via ComponentBrowser
- [ ] Verify: AI agents can discover Orion via README
- [ ] Publish v5.0.1 (patch with new docs) or tag v5.0.0 release publicly

### Phase 2 (Week 3-4) — After Phase 1 complete
- [ ] **2a: Optional Dependency Error Messages**
  - [ ] Enhance Chart component error (no recharts → helpful message)
  - [ ] Test: Import Chart without recharts installed
  - [ ] Test: Import Calendar without date-fns installed
  - [ ] Merge to main

- [ ] **2b: First-Use Template (MVP)**
  - [ ] Create `packages/cli/templates/next-app/`
  - [ ] Include working Button example
  - [ ] Add light/dark mode toggle
  - [ ] Include setup comments
  - [ ] Test: `npx @orion-ds/cli create test-app`
  - [ ] Verify `npm run dev` works
  - [ ] Merge to main

### After Phase 2
- [ ] Publish v5.1.0 (minor with improved UX)

### Phase 3 (Week 5-6) — After Phase 2 complete
- [ ] **3a: Video Walkthrough**
  - [ ] Record 2-min video: install → import CSS → use Button
  - [ ] Show light/dark mode switching
  - [ ] Show brand switching
  - [ ] Upload to docs-site
  - [ ] Link from Quick Start guide

### After Phase 3
- [ ] Publish v5.2.0 (minor with video/polish)

### Phase 4 — Defer to v5.1.0+ (no timeline yet)
- [ ] CLI monorepo validation (3h)
- [ ] Upgrade assistant script (6h)
- [ ] Vite/CRA templates (4h)

---

## 🚨 RISK MITIGATION

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Post-install script breaks npm install | HIGH | Test on 3 Node versions (18, 20, 22) before merge |
| Migration docs miss breaking changes | MEDIUM | Have 2 people review + test on real v4→v5 project |
| CLI validation false positives | MEDIUM | Test from many directories, document all cases |
| Template becomes stale | MEDIUM | Add to CI: rebuild template monthly, test still works |
| Video shows old API | LOW | Record after Phase 1 complete, not before |

---

## 📈 SUCCESS METRICS

### After PHASE 1 (Most Critical)
- [ ] v5.0.0 release notes published (retroactive - urgent)
- [ ] New users can follow 5-step Quick Start
- [ ] Users can find any component via ComponentBrowser
- [ ] Existing users understand v4→v5 upgrade path
- [ ] Post-install validation catches missing CSS import
- [ ] AI agents can discover Orion via README

### After PHASE 2
- [ ] Optional dep errors are helpful (Chart without recharts, etc.)
- [ ] `npm create my-app` produces working Next.js project
- [ ] Verify template stays in sync with component API

### After PHASE 3
- [ ] 2-minute video demonstrates end-to-end setup
- [ ] Video embedded in Quick Start guide
- [ ] Installation satisfaction measured > 8/10 (target)

---

## 🎯 WHO DOES WHAT

| Phase | Task | Owner | Support |
|-------|------|-------|---------|
| 1a | Release notes v5.0.0 | UX Writer | PO (approval) |
| 1b | Quick Start guide | UX Writer | Backend Dev (code examples) |
| 1c | Post-install validation | Backend Dev | QA (testing) |
| 1d | Migration v4→v5 docs | UX Writer | Architect (review) |
| 1e | Component discovery | Frontend Dev | Designer (organization) |
| 1f | AI Integration section | UX Writer | Backend Dev (MCP setup) |
| 2a | Deps error messages | Frontend Dev | QA (testing) |
| 2b | Next.js template (MVP) | Backend Dev | UX Writer (comments) |
| 3a | Video walkthrough | UX Writer | Frontend Dev (setup help) |
| 4a-c | Future Phase 4 | TBD (defer) | — |

**Parallel execution**: Phase 1 tasks (1a-1f) can all run in parallel, reducing calendar time from 15h to ~3-4 days with team of 3-4.

---

## 📅 REALISTIC TIMELINE

**WEEK 1: Phase 1** (15 hours effort, ~3-4 days calendar with team parallel)
- **Mon-Tue**: All 6 Phase 1 tasks start in parallel
  - 1a: Release notes (UX Writer)
  - 1b: Quick Start (UX Writer + FE Dev)
  - 1c: Post-install hook (Backend Dev)
  - 1d: Migration docs (UX Writer)
  - 1e: Component browser (FE Dev + Designer)
  - 1f: AI visibility (UX Writer + Backend Dev)
- **Wed**: Parallel review & iteration
- **Thu**: Final testing & merge
- **Fri**: Publish v5.0.1 with new docs

**WEEK 2: Phase 2** (7-8 hours, ~2 days)
- **Mon-Tue**: Phase 2 tasks
  - 2a: Deps errors (FE Dev)
  - 2b: Template MVP (Backend Dev)
- **Wed**: Testing & final tweaks
- **Thu**: Merge & publish v5.1.0

**WEEK 3: Phase 3** (3 hours, ~1 day)
- **Mon-Tue**: Video recording & editing
- **Wed**: Publish & link from docs
- **Thu-Fri**: Marketing push (announce improvements)

**TOTAL: 3-4 weeks calendar (vs 6 weeks serial) = 40% time savings with parallel execution**

---

## 🎬 NEXT STEP

**Priority 1: Immediate Action (This Week)**
1. ✅ Create release notes for v5.0.0 (CRITICAL - already released)
2. ✅ Create Quick Start guide (unblocks 90% of new users)
3. ✅ Create Migration v4→v5 docs (unblocks existing users)
4. Create branch `feat/installation-ux-phase1` for all 6 Phase 1 tasks

**Priority 2: Schedule Team Kickoff**
- Architect: Review Phase 1d (migration docs) for technical accuracy
- Product Owner: Approve Phase 1a (release notes) messaging
- Backend Dev: Implement Phase 1c (post-install hook)
- UX Writer: Draft all Phase 1 copy
- Estimate: 3-4 days with parallel execution

**Priority 3: Defer to Next Sprint**
- Phase 4 (CLI validation, upgrade assistant, extra templates) → Move to v5.1.0+ backlog
- These are nice-to-haves, not blocking critical users

---

## 📌 DECISION CHECKPOINTS

After each phase, ask:
- ✅ Did we solve the problem we targeted?
- ✅ Did we introduce new issues?
- ✅ Are users happier?
- ✅ Ready to move to next phase?

If ANY NO, pause and debug before continuing.

---

**Status**: REVISED & READY FOR EXECUTION
**Created**: 2026-03-23
**Last Updated**: 2026-03-23 (Team feedback incorporated)
**Owner**: Tech Lead

---

## REVISIONS FROM TEAM FEEDBACK (2026-03-23)

✅ **Incorporated Feedback**:
1. **Product Owner**: Identified critical gaps (Quick Start, Component Discovery missing)
   - Added Phase 1b: Quick Start (3h) - unblocks 90% of users
   - Added Phase 1e: Component Discovery (2h) - helps users find components

2. **Architect**: Confirmed Phase 2a should be deferred (niche use case)
   - Moved CLI validation to Phase 4 (affects only 5-10% of users)

3. **Backend Dev**: Timeline was underestimated, scope decisions needed
   - Phase 2c now MVP (1 Next.js template, 3-4h) vs Full (3 templates, 5-6h)
   - Effort reestimated: 26h total (vs 23h estimate)
   - Can achieve 3-4 week delivery with parallel Phase 1 execution

4. **Alfredo**: v5.0.0 is already released
   - Phase 1a added as RETROACTIVE: Create missing v5.0.0 release notes (2h, URGENT)
   - Phase 3a (release notes) REMOVED (already in Phase 1a)
   - Clarified this roadmap is for improving DX post-release, not pre-release

**New Timeline**:
- Original estimate: 23h over 6 weeks (serial)
- Revised estimate: 26h over 3-4 weeks (with parallel Phase 1)
- **40% calendar time savings** with team coordination

