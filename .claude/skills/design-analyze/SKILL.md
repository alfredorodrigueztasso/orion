---
name: design-analyze
description: Auditoría visual completa del design system. Coherencia, escalabilidad, deuda de diseño. Auto-triggers con "audita sistema", "design system audit", "analiza coherencia".
allowed-tools: ["Read", "Glob", "Grep", "AskUserQuestion"]
---

# 🎨 Design — System Analysis & Audit

Perform a comprehensive visual and structural audit of the entire design system, identifying gaps, inconsistencies, technical debt, and scalability issues.

## System Analysis Dimensions

### Visual Coherence
- [ ] All components use semantic tokens (no hardcoded colors/values)
- [ ] Color palette consistent across all brands
- [ ] Typography hierarchy aligned (font families, weights, sizes)
- [ ] Spacing system applied uniformly (token-based spacing)
- [ ] Radius system consistent (brand-specific rules applied)
- [ ] Shadow system coherent (mode-aware shadows)
- [ ] Component spacing aligns (padding, gaps, margins)

### Brand Consistency (4x)
- [ ] **Orion**: Blue accent (#1B5BFF), 12px radius, applied everywhere
- [ ] **Red**: Red accent (#D7282F), 9999px pills, applied everywhere
- [ ] **Deepblue**: Navy accent (#006FBA), 12px radius, applied everywhere
- [ ] **Orange**: Orange accent (#F15D22), 9999px pills, applied everywhere
- [ ] No brand-specific hardcoding (all via tokens)
- [ ] Brand tokens override correctly in `theme.css`
- [ ] Brand colors tint shadows appropriately

### Theme Coverage (Light/Dark)
- [ ] Light theme: Colors, shadows, backgrounds defined
- [ ] Dark theme: Colors, shadows, backgrounds inverted correctly
- [ ] Semantic tokens work in both themes (no light-only or dark-only tokens)
- [ ] Contrast maintained (4.5:1) in both themes
- [ ] Shadows visible in both themes

### Mode Alignment (Display/Product/App)
- [ ] **Display mode**: Atmospheric, generous spacing, visible glassmorphism
- [ ] **Product mode**: Geometric, compact spacing, minimal motion
- [ ] **App mode**: Tactile, adaptable spacing, native feel
- [ ] Mode-aware tokens (--mode-hover-lift, --mode-shadow-hover, etc.)
- [ ] Animations adjust per mode (timing, easing, lift)

### Token System Health
- [ ] **Primitives** (`tokens/primary.json`): Raw values, immutable
- [ ] **Semantics** (`tokens/light.json`, `tokens/dark.json`): Intent-based aliases
- [ ] **Components** (`tokens/components.json`): HTML patterns with class names
- [ ] **Brands** (`tokens/brands.json`): Brand-specific overrides
- [ ] **Index** (`tokens/index.json`): Unified reference for AI agents
- [ ] TypeScript generation: Types match JSON (run `npm run build:tokens`)
- [ ] CSS generation: Variables match JSON (run `npm run validate`)

### Component Library Completeness
- [ ] **Core components**: Button, Card, Field, Modal, Alert, Badge, etc.
- [ ] **Sections/Blocks**: Hero, Features, Pricing, CTA, Footer, etc.
- [ ] **Templates**: Landing, Dashboard, Settings, etc.
- [ ] **Variants documented**: All size × style × state combinations
- [ ] **States covered**: default, hover, active, disabled, loading, error
- [ ] **Accessibility**: WCAG 2.1 AA verified for all components
- [ ] **Responsive**: Mobile/tablet/desktop verified for all components

### Accessibility Baseline
- [ ] **Contrast**: 4.5:1 text/background, 3:1 graphics (all components, all brands)
- [ ] **Keyboard navigation**: All interactive elements keyboard-accessible
- [ ] **Focus indicators**: Visible :focus-visible on all interactive elements
- [ ] **ARIA labels**: Proper role, aria-label, aria-described-by usage
- [ ] **Screen reader testing**: Verified with NVDA, JAWS, VoiceOver
- [ ] **Reduced motion**: prefers-reduced-motion respected
- [ ] **Touch targets**: ≥44px on mobile, ≥40px on desktop

### Scalability Assessment
- [ ] Token system scales to new brands (add in `tokens/brands.json`)
- [ ] Component system scales to new variants (update component definition)
- [ ] Color palette extensible (no hardcoded color values in components)
- [ ] Typography scalable (semantic font size tokens)
- [ ] Spacing system extensible (proportional spacing scale)
- [ ] Motion system extensible (mode-aware timing)
- [ ] Documentation maintainable (auto-generated from JSON, not manual)

### Technical Debt Assessment
- [ ] **Hardcoded values**: None in component CSS (all via tokens)
- [ ] **Duplicate styles**: No repeated CSS patterns (consolidate with tokens)
- [ ] **Abandoned components**: Deprecated components removed or marked
- [ ] **Breaking changes**: Version history documented (CHANGELOG)
- [ ] **Build performance**: Acceptable build times (< 2 minutes)
- [ ] **Bundle size**: Components tree-shakeable, no bloat
- [ ] **Documentation**: Complete and up-to-date

### Design System Governance
- [ ] **Design Lead approval process**: New tokens/variants require approval
- [ ] **API stability**: Component props don't change unexpectedly
- [ ] **Deprecation process**: Old patterns phased out gracefully
- [ ] **Version management**: Semantic versioning (MAJOR.MINOR.PATCH)
- [ ] **Changelog**: All changes documented
- [ ] **Migration guides**: Users can upgrade versions
- [ ] **Release cadence**: Regular, predictable releases

## Audit Checklist

### Structure & Organization
- [ ] Token files organized logically (primitives, semantics, components, brands)
- [ ] Component files follow consistent naming (ComponentName.tsx, ComponentName.module.css, etc.)
- [ ] Stories organized by component (ComponentName.stories.tsx)
- [ ] Tests co-located with components (*.test.tsx)
- [ ] Docs up-to-date (README, CLAUDE.md, type comments)

### Visual Consistency
- [ ] All components render correctly in all 4 brands
- [ ] All components render correctly in light and dark themes
- [ ] All components render correctly in all 3 modes
- [ ] No visual regressions in Storybook
- [ ] No hardcoded colors in CSS (all via tokens)
- [ ] No hardcoded fonts (all via tokens)
- [ ] No hardcoded spacing (all via tokens)

### Quality Metrics
- [ ] Test coverage: ≥80% on all components
- [ ] TypeScript: 0 errors, 0 type mismatches
- [ ] Accessibility: WCAG 2.1 AA on all components
- [ ] Performance: Bundle size stable or reduced
- [ ] Build time: < 2 minutes
- [ ] Type-check: Passes cleanly (no `any` types)

### Documentation
- [ ] CLAUDE.md: Current and accurate
- [ ] README.md: Setup instructions work
- [ ] TYPESCRIPT_SETUP.md: TypeScript instructions current
- [ ] Component JSDoc: Proper parameter and return documentation
- [ ] Storybook: All stories render without errors
- [ ] Type definitions: Auto-generated and match implementation

## Output Deliverable

A Design System Audit Report including:
1. **Executive Summary**: Overall health score (%), key findings
2. **Visual Coherence**: Brand consistency, theme coverage, spacing alignment
3. **Token System**: Primitives/semantics/components/brands health check
4. **Component Library**: Completeness matrix (missing components/variants)
5. **Accessibility**: WCAG 2.1 AA compliance score, gaps
6. **Scalability**: Extensibility analysis, future-proofing assessment
7. **Technical Debt**: Hardcoded values, duplicates, performance issues
8. **Governance**: Design approval process, versioning, documentation
9. **Priority Issues**: Critical (must fix), major (should fix), minor (nice to fix)
10. **Recommendations**: Roadmap for improvements and maintenance

Example audit report structure:

```markdown
# Design System Audit Report: Orion

## Executive Summary
- **Overall Health**: 92% ✅
- **Status**: Production Ready
- **Last Updated**: 2026-03-17
- **Key Findings**: System is coherent and scalable. Minor improvements in documentation.

## Visual Coherence: PASS ✅ (100%)
- ✅ All components use semantic tokens
- ✅ Color palette consistent across 4 brands
- ✅ Typography hierarchy aligned
- ✅ Spacing system unified (token-based)
- ✅ Radius consistent per brand

## Token System Health: PASS ✅ (100%)
### Primitives (primary.json)
- 128 primitive values defined
- All colors, spacing, typography present
- Brand-specific values correctly separated

### Semantics (light.json, dark.json)
- Light: 89 semantic tokens
- Dark: 89 semantic tokens
- Both themes semantically equivalent
- Contrast: 4.5:1 minimum verified

### Components (components.json)
- 45 components documented
- 8 sections/blocks documented
- 5 templates documented
- All HTML patterns current

### Brands (brands.json)
- 4 brands defined (orion, red, deepblue, orange)
- Token overrides correct per brand
- No hardcoding detected

### TypeScript Generation
- ✅ Types auto-generated from JSON
- ✅ 0 type mismatches
- ✅ All tokens in type system
- ✅ npm run build:tokens passes

## Component Library: 92% COMPLETE
### Core Components (18/18) ✅
- Button, Card, Field, Modal, Alert, Badge, Avatar, Chip, etc.
- All have variants and states documented
- All tests passing (899/899)

### Sections/Blocks (17/17) ✅
- Hero, Features, Pricing, CTA, Footer, etc.
- All render correctly in all brands
- All responsive on mobile/tablet/desktop

### Templates (5/5) ✅
- Landing, Dashboard, Settings, etc.
- All use Orion components (no duplicates)

### Missing: None ✅

## Accessibility: 100% WCAG 2.1 AA ✅
- Contrast: 4.5:1 text/background verified
- Keyboard: All interactive elements accessible (Tab works)
- Focus: Visible focus rings on all elements
- ARIA: Proper labels, roles, states
- Screen readers: Tested with NVDA, VoiceOver
- Reduced motion: Respected on all animations
- Touch targets: ≥44px on mobile, ≥40px desktop

## Brand Consistency: PASS ✅ (4/4 brands)
| Brand | Accent | Radius | Status |
|-------|--------|--------|--------|
| Orion | #1B5BFF | 12px | ✅ |
| Red | #D7282F | 9999px | ✅ |
| Deepblue | #006FBA | 12px | ✅ |
| Orange | #F15D22 | 9999px | ✅ |

## Theme Coverage: PASS ✅ (2/2 themes)
| Theme | Contrast | Readability | Status |
|-------|----------|-------------|--------|
| Light | 4.5:1+ | ✅ | ✅ |
| Dark | 4.5:1+ | ✅ | ✅ |

## Mode Alignment: PASS ✅ (3/3 modes)
| Mode | Animation | Spacing | Status |
|------|-----------|---------|--------|
| Display | Slow (250ms) | Expansive | ✅ |
| Product | Fast (150ms) | Compact | ✅ |
| App | Medium (200ms) | Adaptable | ✅ |

## Scalability: EXCELLENT ✅
- **Token extensibility**: New brands can be added via tokens/brands.json (proven with 4 brands)
- **Component extensibility**: New components follow established pattern (CSS Modules + TypeScript types)
- **Color palette**: 50+ semantic tokens, extensible for new accent colors
- **Typography**: 7 semantic font sizes, room for expansion
- **Spacing**: 12-level spacing scale, covers common use cases
- **Future-proof**: System designed for multi-brand, multi-theme, multi-mode scaling

## Technical Debt: MINIMAL ✅
- ❌ Hardcoded values: None detected (0/100 scanned files)
- ❌ Duplicate styles: None (CSS Modules prevent collision)
- ❌ Abandoned components: None (old patterns removed cleanly)
- ✅ Breaking changes: Documented (CHANGELOG maintained)
- ✅ Build performance: 1.8 minutes (< 2 min target)
- ✅ Bundle size: 45KB (tree-shakeable)
- ✅ Documentation: Current (CLAUDE.md updated 2026-03-17)

## Governance: STRONG ✅
- ✅ Design Lead approval process in place
- ✅ Component API stable (v4.6.x maintains backward compatibility)
- ✅ Deprecation process documented (MIGRATION_V3.md)
- ✅ Semantic versioning (4.MINOR.PATCH)
- ✅ Changelog maintained (recent releases documented)
- ✅ Migration guides available (v3.0.0, v4.0.0)
- ✅ Release cadence: Monthly (predictable)

## Critical Issues: 0 🟢
All systems healthy, no blockers.

## Major Issues: 0 🟢
Minor improvements available, no urgency.

## Minor Issues: 2 🟡

### 1. Documentation Gap (Low Priority)
- **Issue**: Custom mode demo incomplete in VISUAL_GUIDELINES.md
- **Impact**: Developers may misunderstand mode switching
- **Recommendation**: Add example of toggling modes in browser (localStorage override)
- **Effort**: 30 minutes

### 2. Test Coverage (Low Priority)
- **Issue**: Visual regression tests cover ~80% of component states
- **Impact**: Rare edge cases may slip through
- **Recommendation**: Add Percy tests for all state combinations
- **Effort**: 2 hours

## Recommendations: Strategic Roadmap

### Immediate (Next Sprint)
- [ ] Add missing Percy tests for edge-case component states
- [ ] Update VISUAL_GUIDELINES.md with mode-switching demo
- [ ] Verify all preview-modules pass syntax validation

### Short-term (Q2 2026)
- [ ] Extend token system for new semantic colors (success, warning, info tokens currently minimal)
- [ ] Add animation state tokens for common transitions
- [ ] Create Design System RFC process for major changes

### Medium-term (Q3 2026)
- [ ] Explore advanced Storybook features (Chromatic integration, design tokens plugin)
- [ ] Consider CSS-in-JS solution if component library grows beyond 100 components
- [ ] Plan v5.0.0 for potential breaking changes (TypeScript 5.x features, React 18 Suspense)

## Conclusion

✅ **Orion Design System is Production Ready**

The system is visually coherent, technically sound, and scales well to multiple brands and themes. Token governance is strong, accessibility compliant, and documentation is maintainable. Minor improvements recommended for edge-case coverage and developer experience, but no blockers for continued development.

**Rating**: ⭐⭐⭐⭐⭐ (5/5 stars)
```

This audit becomes the strategic foundation for future system improvements.
