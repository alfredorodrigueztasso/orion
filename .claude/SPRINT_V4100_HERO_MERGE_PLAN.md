# Sprint Plan: v4.10.0 — Hero Block Complete Merge

**Target Release**: April 4, 2026 (2 weeks)
**Status**: 📋 Planning
**Depends on**: Resolution of TEMPLATE_EXPORTS_ISSUE.md

---

## Context

In v4.9.7, we added `badge` and `trustIndicators` props to the Hero block as critical fixes. The worktree `amazing-fermat` branch contains a complete, richer implementation of Hero with additional features that should be merged to main as v4.10.0 (minor version bump).

This is not a patch — it's a proper feature release with architectural improvements.

---

## Feature Set: Hero v2 Complete API

### Current Hero (v4.9.7)
```typescript
interface HeroProps {
  badge?: ReactNode;           // NEW (v4.9.7)
  title: ReactNode;
  description?: string;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  trustIndicators?: ReactNode; // NEW (v4.9.7)
  align?: HeroAlign;           // 'center' | 'left'
  size?: HeroSize;             // 'sm' | 'md' | 'lg'
  variant?: HeroVariant;       // 'default' | 'gradient' | 'image'
  layout?: HeroLayout;         // 'stacked' | 'split'
  backgroundImage?: string;
  className?: string;
}
```

### Target Hero v2 (from amazing-fermat worktree)
```typescript
interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  badge?: ReactNode;
  title?: ReactNode;
  headline?: ReactNode;                    // @deprecated — use title
  description?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  trustIndicators?: ReactNode;
  media?: ReactNode;                       // NEW — split layout with images
  mediaPosition?: 'left' | 'right' | 'bottom';  // NEW
  showDefaultMedia?: boolean;              // NEW
  backgroundOverlay?: number;              // NEW — opacity 0–1
  elevated?: boolean;                      // NEW — mode-aware elevation
  fullHeight?: boolean;                    // @deprecated — use layout="fullscreen"
  align?: HeroAlign;                       // 'left' | 'center'
  size?: HeroSize;                         // 'sm' | 'md' | 'lg'
  layout?: HeroLayout;                     // 'contained' | 'fullscreen' | 'card'  ← BREAKING
  variant?: HeroVariant;                   // 'default' | 'background'  ← BREAKING
  className?: string;
}
```

---

## Breaking Changes

| Change | Impact | Migration Path |
|--------|--------|-----------------|
| `layout` enum: `stacked/split` → `contained/fullscreen/card` | Consumers using old values get silent fallback | Docs + migration guide |
| `variant` enum: `gradient/image` → `default/background` | Consumers using old values get silent fallback | Docs + migration guide |
| `media` prop (new) | No breaking change for existing code | New feature |
| `mediaPosition` prop (new) | No breaking change for existing code | New feature |
| `elevation` mode-aware | Requires component-level CSS to respect modes | V4.10.0 includes this CSS |

---

## Implementation Roadmap

### Phase 1: Setup (Day 1)
- [ ] Create release branch: `release/v4.10.0-hero-merge`
- [ ] Back up current main Hero implementation
- [ ] Diff worktree Hero against main Hero
- [ ] Identify all file changes needed

**Files to migrate from worktree**:
- `packages/react/src/blocks/sections/Hero/Hero.tsx`
- `packages/react/src/blocks/sections/Hero/Hero.types.ts`
- `packages/react/src/blocks/sections/Hero/Hero.module.css`
- `packages/react/src/blocks/sections/Hero/Hero.stories.tsx`
- New: Primitives `Section` and `Container` (if not already present)

### Phase 2: Integrate Primitives (Days 2–3)
- [ ] Review `Section` and `Container` primitives in worktree
- [ ] Port to main `packages/react/src/blocks/`
- [ ] Update imports in Hero to use new primitives
- [ ] Verify build succeeds

### Phase 3: Update Consumers (Days 3–4)
- [ ] Update `docs-site/components/HomepageHero.tsx` to use new layout/variant enums
  - Change `layout="contained"` to proper value
  - Verify props work as expected
- [ ] Update any other consumers of Hero in codebase
- [ ] Check Storybook stories for compatibility

### Phase 4: Mode-Aware CSS (Days 5–6)
- [ ] Add mode-aware styling for `elevated` prop
  - Display mode: Elevation enabled (shadow + lift)
  - Product mode: No elevation (solid flat)
  - App mode: Subtle elevation (shadow-md)
- [ ] Add CSS for `media` layout modes
- [ ] Test responsive media positioning (left/right/bottom)

### Phase 5: Testing & Validation (Days 6–7)
- [ ] Update/create render tests for new props
- [ ] Test all layout modes: `contained`, `fullscreen`, `card`
- [ ] Test all variant modes: `default`, `background`
- [ ] Test media positioning (left, right, bottom)
- [ ] Verify `elevated` respects mode (Display, Product, App)
- [ ] Storybook stories pass (visual regression check)
- [ ] Run full test suite: `npm run test:full`

### Phase 6: Documentation (Day 8)
- [ ] Create migration guide: Layout & Variant enums
- [ ] Document new props: media, mediaPosition, elevated, etc.
- [ ] Update Hero component JSDoc
- [ ] Add examples to Storybook
- [ ] Update CLAUDE.md if needed

### Phase 7: Release (Days 8–9)
- [ ] Type check: `npm run type-check`
- [ ] Validate tokens: `npm run validate`
- [ ] Full audit: `npm run audit`
- [ ] Resolve template exports issue (Option A or B from TEMPLATE_EXPORTS_ISSUE.md)
- [ ] Version bump: v4.9.8 → v4.10.0
- [ ] Release: `npm run release:minor`
- [ ] Create release notes
- [ ] Announce on marketing channels

---

## Critical Files & Checkpoints

| File | Action | Status |
|------|--------|--------|
| `packages/react/src/blocks/sections/Hero/Hero.tsx` | Migrate from worktree | 📋 Pending |
| `packages/react/src/blocks/sections/Hero/Hero.types.ts` | Migrate from worktree | 📋 Pending |
| `packages/react/src/blocks/sections/Hero/Hero.module.css` | Migrate + add mode-aware CSS | 📋 Pending |
| `docs-site/components/HomepageHero.tsx` | Update to new API | 📋 Pending |
| `.storybook/preview.ts` | Verify stories render | 📋 Pending |
| `packages/react/src/blocks/` | Add Section/Container primitives | 📋 Pending |
| `package.json` | Resolve template exports | ⏸️ Blocked |

---

## Risk Assessment

### High Risk ⚠️
- **Enum breaking changes** (layout/variant) → Could break existing consumers
  - Mitigation: Clear migration guide, deprecation warnings in JSDoc
  - Mitigation: `npm ls @orion-ds/react` to identify dependent projects

### Medium Risk ⚠️
- **Primitive dependencies** (Section/Container may not exist in main)
  - Mitigation: Verify before merging, add to build if missing
  - Mitigation: Check diff against main first

### Low Risk ✅
- **CSS mode-awareness** (new feature, no breaking changes)
- **New props** (all optional, backward compatible)

---

## Success Criteria

- [ ] All Hero props from worktree are implemented
- [ ] No breaking changes (optional props only, or documented migration path)
- [ ] All tests pass (unit + E2E + visual regression)
- [ ] Storybook stories render correctly
- [ ] Docs-site HomepageHero uses new API without errors
- [ ] `npm run audit` passes (type-check + validate + compliance)
- [ ] v4.10.0 published to npm with all 5 packages
- [ ] Git tags created (v4.10.0)
- [ ] Release notes published
- [ ] Migration guide published for enum changes

---

## Parallel Work (While Waiting)

While release/v4.10.0-hero-merge is in progress:

**Other priority work**:
- [ ] Resolve TEMPLATE_EXPORTS_ISSUE (Option A or B decision)
- [ ] Fix Issue #1 from LANDING_AUDIT_ACTION_ITEMS.md (HomepageInstall font tokens) — 5 min
- [ ] Start planning v4.11.0 features (if any)

**Nice-to-have**:
- [ ] Review and update VISUAL_GUIDELINES.md if Hero changes mode-aware CSS
- [ ] Add Hero examples to docs-site
- [ ] Create video/GIF showing media layout modes

---

## Rollback Plan

If Hero merge encounters critical issues:

1. **Revert to main**: `git reset --hard main`
2. **Keep v4.9.7 published**: Users can stay on v4.9.7 while fix is prepared
3. **Create bug fix branch**: `bugfix/hero-merge-issues`
4. **Retry merge**: After root cause is addressed
5. **Retag release**: v4.10.0 retry

---

## Dependencies & Blockers

| Blocker | Dependency | Owner | ETA |
|---------|------------|-------|-----|
| Template exports validation | TEMPLATE_EXPORTS_ISSUE resolution | Tech Lead | EOD |
| Primitives import paths | Confirm Section/Container exist or migrate | Architect | Day 2 |
| Mode-aware CSS | Tri-modal system must be active | Design Lead | Day 5 |

---

## Communication Plan

1. **Day 1**: Announce sprint to team
2. **Day 5**: Mid-sprint check-in (architecture review)
3. **Day 9**: Release announcement
4. **Post-release**: Migration guide to users

---

## Appendix: Worktree Branch Info

**Branch**: `.claude/worktrees/amazing-fermat`
**Base commit**: Unknown (check git log)
**Hero changes from main**: ~424 lines CSS, ~200 lines TSX/types

**To explore worktree**:
```bash
cd .claude/worktrees/amazing-fermat
find . -name "Hero.*" | head -20
git log --oneline -5
```

---

## Next Steps

1. ✅ This document is created and approved by Architect
2. 📋 Tech Lead decides on TEMPLATE_EXPORTS_ISSUE (Option A vs B)
3. 📋 Review worktree Hero implementation in detail
4. 📋 Create release/v4.10.0-hero-merge branch
5. 📋 Begin Phase 1 (Setup)

**Owner**: Alfredo (implementation) + Tech Lead (guidance) + Architect (decisions)
