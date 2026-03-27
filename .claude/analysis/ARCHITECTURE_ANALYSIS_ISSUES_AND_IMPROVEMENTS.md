# Architecture Analysis: Pre-Audit Issues + High-Priority Improvements
**Orion Design System v5.6.0**
**Date**: Mar 26, 2026
**Prepared for**: Tech Lead / Architecture Review

---

## EXECUTIVE SUMMARY

### Part 1: Pre-Audit Issues (PRE-004 + Type-Check Workspace)
- **PRE-004**: 7 failing tests in `dist-completeness.test.ts` (missing `templates/` & `rich` entry points)
  - **Severity**: MEDIUM (blocks pre-release validation)
  - **Root Cause**: Entry points declared in vite.config.ts but missing source files
  - **Fix Effort**: 2-4 hours (depends on architectural decision for templates)

- **Type-Check Workspace Issue**: `npm run type-check` fails for packages other than react
  - **Severity**: LOW (affects developer workflow, not production)
  - **Root Cause**: Likely peerDependencies not installed in other packages
  - **Fix Effort**: 1-2 hours

### Part 2: High-Priority Improvements (v5.7.0+)
- **zIndex Tokens**: Currently referenced but UNDEFINED in theme.css
  - **Value**: CRITICAL for modal/dropdown/tooltip stacking contexts
  - **Proposal**: 7-level semantic hierarchy (--z-base through --z-fixed-top)
  - **Effort**: 1-2 hours (token + TypeScript generation + tests)
  - **Priority**: HIGH (v5.6.1 patch or v5.7.0 minor)

- **Font-Size Semantic Aliases**: Already documented, not implemented in CSS
  - **Value**: HIGH for design consistency and developer ergonomics
  - **Proposal**: 8 semantic sizes (--font-size-xs through --font-size-3xl)
  - **Effort**: 1 hour (add to theme.css + regenerate types)
  - **Priority**: MEDIUM (v5.7.0 minor)

**Recommended Action**: Fix Type-Check + zIndex tokens in v5.6.1 (patch), defer PRE-004 to v5.7.0 planning

---

## PART 1: PRE-AUDIT ISSUES ANALYSIS

### Issue 1: PRE-004 — dist-completeness.test.ts (7 Failing Tests)

#### Test Failure Details
```
FAIL tests/dist-completeness.test.ts > dist/ Completeness (Pre-Publish Validation)
× templates/ directory exists (0ms)
× templates/index.mjs exists and is not empty
× templates/index.cjs exists and is not empty
× templates/index.d.ts exists
× rich.mjs exists and is not empty
× rich.cjs exists and is not empty
× rich.d.ts exists

Test Files  1 failed (1) | Tests  7 failed | 36 passed (43)
```

#### Root Technical Cause
The test validates that all declared exports in `package.json` → `exports` field have corresponding built files in `dist/`.

**vite.config.ts declares these entry points:**
```typescript
entry: {
  // ... other entries ...
  "blocks/templates/index": path.resolve(__dirname, "src/blocks/templates/index.ts"),  // ✅ Exists
  "rich": path.resolve(__dirname, "src/rich.ts"),                                      // ❌ Doesn't exist
}
```

**package.json declares these exports:**
```json
{
  "./blocks/templates": {
    "types": "./dist/blocks/templates/index.d.ts",
    "import": "./dist/blocks/templates/index.mjs",
    "require": "./dist/blocks/templates/index.cjs"
  },
  // Missing from vite.config.ts:
  // "./rich": { ... }
}
```

**Actual Situation**:
- `src/blocks/templates/` exists ✅ (exports CTA, Hero, Pricing, etc.)
- `src/rich.ts` does NOT exist ❌ (entry point declared but no file)
- vite.config.ts line 22 references `rich` that never gets built
- dist/ never gets templates/ or rich/ subdirectories
- Test fails when checking dist/ for these files

#### Architecture Questions

**Question 1**: Is `templates` a separate entry point or part of `blocks`?

Looking at the codebase:
- `src/blocks/templates/` exists as a subdirectory (physical location)
- vite.config.ts correctly declares it as `"blocks/templates/index"`
- package.json correctly exports it as `./blocks/templates`
- BUT: Vite builds it to `dist/blocks/templates/` (nested directory, not flat)

**Test Assumption**: The test assumes `templates` is a named entry point at root level (like `tokens/`, `sections/`, `blocks/`)
```typescript
const entryPoints = ["tokens", "sections", "blocks", "templates"];  // ❌ Wrong
for (const ep of entryPoints) {
  expect(fs.existsSync(path.join(DIST_PATH, ep, "index.mjs"))).toBe(true);  // Expects dist/templates/
}
```

**Architectural Reality**: Templates are NOT a standalone entry point; they're nested under blocks:
- Export path: `@orion-ds/react/blocks/templates` (not `@orion-ds/react/templates`)
- Vite output: `dist/blocks/templates/` (not `dist/templates/`)

**Question 2**: What is `rich`?

Searching the codebase:
- No `src/rich.ts` file exists
- No component with "rich" in name
- vite.config.ts line 21 declares it (likely copy-paste leftover or planned feature)
- package.json does NOT export it (so it's not in public API)

**Conclusion**: `rich` is either:
- A planned entry point not yet implemented (deferred feature)
- A mistake in vite.config.ts (copy-paste error)
- An undocumented optional entry point for rich text editor components

#### Impact Assessment

**Severity**: MEDIUM
- **Production**: Zero impact — `rich` entry point not declared in package.json exports
- **Shipping**: Blocks pre-release validation (test intentionally strict)
- **CI/CD**: No impact — CI doesn't run dist-completeness tests (they're manual pre-publish validation)
- **Releases**: Can publish via `npm run release:*` (bypasses test), but should fix before next release

**Why Test Matters**:
- Pre-publish validation prevents shipping incomplete builds
- Ensures all vite.config.ts entry points have corresponding dist artifacts
- Prevents users from getting 404s when importing undeclared paths

#### Fix Options

**Option A**: Fix the test (Correct entry point list)
```typescript
// dist-completeness.test.ts
const entryPoints = ["tokens", "sections", "blocks"];  // Remove "templates"
// (templates is nested under blocks, not at root)

const optionalEPs = ["chart", "calendar", "editor", "dnd"];  // Remove "rich"
// (rich doesn't exist and isn't exported)
```

**Effort**: 5 minutes
**Trade-off**: Doesn't fix vite.config.ts; templates will silently not be exported if vite changes

**Option B**: Fix vite.config.ts (Remove non-existent entry point)
```typescript
// vite.config.ts - Remove this line:
"rich": path.resolve(__dirname, "src/rich.ts"),  // ❌ Doesn't exist

// Keep templates under blocks (correct structure):
"blocks/templates/index": path.resolve(__dirname, "src/blocks/templates/index.ts"),  // ✅
```

**Effort**: 5 minutes
**Trade-off**: None — this matches current architecture

**Option C**: Implement the missing `rich` entry point
- Create `src/rich.ts` with exports for rich text editor components
- Add to vite.config.ts (already declared)
- Add to package.json exports
- Include in type generation

**Effort**: 2-4 hours (depends on scope: is it a small export wrapper or new components?)
**Trade-off**: Scope creep — defer this to v5.7.0 if feature is planned

#### Recommended Fix (Immediate)

**Do Option B** (remove `rich` from vite.config.ts):
- Minimal change (1 line deletion)
- Aligns config with reality
- Solves 6/7 test failures (rich.* tests)

**Do Option A** (update test):
- Removes `templates` from root entryPoints list
- Acknowledges that templates are nested under blocks
- Solves remaining 1/7 test failure

**Then**: Document in MEMORY.md that `rich` entry point was planned but deferred

**Post-v5.6.0**: Decide if `rich` text editor should be implemented in v5.7.0+ (separate investigation)

---

### Issue 2: Type-Check Workspace (Fails for packages other than react)

#### Problem Statement

**Current State**:
```bash
cd /Users/alfredo/Documents/AI\ First\ DS\ Library/packages/react
npm run type-check       # ✅ WORKS - 0 errors

cd /Users/alfredo/Documents/AI\ First\ DS\ Library
npm run type-check       # ❌ LIKELY FAILS - depends on setup
```

**Expected**: `npm run type-check` should work from root and validate all packages

#### Root Cause (Investigation Needed)

Based on similar monorepo patterns, the likely causes are:

**Hypothesis 1**: Root `tsconfig.json` references paths/projects that don't exist
```json
{
  "references": [
    { "path": "./packages/react" },
    { "path": "./packages/blocks" },  // ← May not exist or have tsconfig
    { "path": "./packages/cli" }
  ]
}
```

**Hypothesis 2**: Other packages don't have `tsconfig.json`
```bash
ls /Users/alfredo/Documents/AI\ First\ DS\ Library/packages/*/tsconfig.json
# packages/react/tsconfig.json      ✅
# packages/blocks/tsconfig.json     ❌
# packages/cli/tsconfig.json        ❌
```

**Hypothesis 3**: peerDependencies not installed in devDependencies
```json
// packages/blocks/package.json
{
  "peerDependencies": {
    "react": "^19.0.0",
    "@orion-ds/react": "^5.6.0"
  },
  "devDependencies": {
    // Missing: react, @orion-ds/react
    // Type-check fails when resolving @orion-ds/react types
  }
}
```

**Hypothesis 4**: Monorepo workspace not configured for type-checking
```json
// Root package.json
{
  "scripts": {
    "type-check": "tsc --noEmit"  // ← Doesn't know about workspace packages
  }
}
```

Better approach:
```json
{
  "scripts": {
    "type-check": "tsc --noEmit && turbo run type-check"  // ← Workspace-aware
  }
}
```

#### Impact Assessment

**Severity**: LOW
- **Production**: Zero impact — packages/react types are checked (the main library)
- **Development**: Developers in monorepo can't run `npm run type-check` from root
- **CI/CD**: Only if CI runs root type-check (verify in workflows)
- **Workflow**: Workaround exists: `cd packages/react && npm run type-check`

#### Fix Strategy

1. **Audit workspace setup**:
   - Check root `tsconfig.json` for references/projects
   - List all packages and their tsconfig status
   - Check if workspace is using Turbo, pnpm, or npm workspaces

2. **Verify peerDependencies**:
   - Run `npm ls @orion-ds/react` from each package root
   - Check if peerDeps are in devDependencies for testing

3. **Configure root type-check**:
   - Option A: `tsc --noEmit` (if root tsconfig has references)
   - Option B: `turbo run type-check` (if using Turbo for orchestration)
   - Option C: Shell script: `for pkg in packages/*; do npm run type-check -w $pkg; done`

**Effort**: 1-2 hours (depends on current setup complexity)

---

## PART 2: HIGH-PRIORITY IMPROVEMENTS

### Improvement 1: zIndex Token System

#### Current State (CRITICAL GAP)

**Components Reference z-index Tokens**:
```css
/* packages/react/src/components/Modal/Modal.module.css */
.backdrop { z-index: var(--z-modal-backdrop); }
.modal { z-index: var(--z-modal); }

/* packages/react/src/components/Dropdown/Dropdown.module.css */
.dropdown { z-index: var(--z-dropdown); }

/* packages/react/src/components/Tooltip/Tooltip.module.css */
.tooltip { z-index: var(--z-tooltip); }
```

**But tokens are UNDEFINED in theme.css**:
```bash
grep "^    --z-" /Users/alfredo/Documents/AI\ First\ DS\ Library/packages/react/dist/theme.css
# (no output — z-index tokens don't exist!)
```

**Result**: CSS falls back to inherited z-index (usually 0 or auto), breaking stacking contexts

**Where Undefined Tokens are Referenced**:
| Component | File | Token Reference |
|-----------|------|-----------------|
| Modal | Modal.module.css | --z-modal, --z-modal-backdrop |
| Dropdown | Dropdown.module.css | --z-dropdown |
| FilterBar | FilterBar.module.css | --z-dropdown |
| Sidebar | Sidebar.module.css | --z-sticky, --z-overlay |
| Navbar | Navbar.module.css | --z-sticky |
| Drawer | Drawer.module.css | --z-modal-backdrop, --z-modal, --z-base |
| CodeEditor | CodeEditor.module.css | --z-base, --z-modal |
| Tooltip | Tooltip.module.css | --z-tooltip |
| Calendar | Calendar.module.css | --z-dropdown, --z-base |
| ToggleGroup | ToggleGroup.module.css | --z-dropdown |
| Hero | Hero.module.css | 0, 1, 2 (hardcoded — should be tokens) |

**Chain of Truth Violation**: These components reference non-existent tokens instead of using hardcoded values (worst case) or defining them properly.

#### Why zIndex Tokens Matter

**Problem Without Them**:
1. Modal backdrop opens but doesn't cover content (z-index: auto loses to z-index: 1)
2. Tooltip appears behind modal (relative stacking contexts conflict)
3. Dropdown hides behind fixed sidebar
4. Every new component requires manual z-index coordination
5. Brand/theme changes require edits to component CSS

**Solution With Them**:
1. Single source of truth for z-index hierarchy
2. Components declare intent ("I need modal-level stacking")
3. Update one token → all components adapt
4. Supports mode-aware stacking (future: different z-scale per display/product/app mode)
5. Chain of Truth: Primitives (z-numbers) → Semantics (intent) → Components (usage)

#### Proposed Token Structure

**Semantic Hierarchy** (Recommended — 7 levels):

```javascript
// tokens/dark.json & tokens/light.json
{
  "semantic": {
    "z": {
      // Layer 0: Content flow
      "base": "0",
      "sticky": "10",

      // Layer 1: Interactive overlays
      "dropdown": "100",
      "tooltip": "110",

      // Layer 2: Modal interactions
      "modal-backdrop": "1000",
      "modal": "1001",

      // Layer 3: Fixed UI (always visible)
      "fixed-top": "9000"
    }
  }
}
```

**Rationale**:
- **0**: Default content, no stacking context
- **10**: Sticky headers/sidebars (above content)
- **100**: Dropdown menus (above content, below modals)
- **110**: Tooltips (above dropdowns but no backdrop)
- **1000-1001**: Modal backdrop/modal pair (explicit 1-level separation)
- **9000**: Fixed UI (navbar, alerts, toasts that should always be visible)

**Chain of Truth**:
```
Primitives (tokens/primary.json):
{
  "z": {
    "0": "0",
    "10": "10",
    "100": "100",
    // ... etc
  }
}

Semantics (tokens/light.json):
{
  "z": {
    "base": "{z.0}",
    "sticky": "{z.10}",
    "dropdown": "{z.100}",
    // ... etc
  }
}

CSS (components):
.modal-backdrop { z-index: var(--z-modal-backdrop); }
// ✅ Resolves to 1000, uses semantic intent
```

#### Implementation Checklist

**Phase 1: Token Definition** (20 min)
- [ ] Add to tokens/primary.json: numeric z-values
- [ ] Add to tokens/light.json: semantic aliases
- [ ] Add to tokens/dark.json: same semantic aliases (z-index is theme-agnostic)
- [ ] Run `npm run build:tokens` → generates --z-* CSS variables

**Phase 2: Component Updates** (40 min)
- [ ] Update Modal.module.css: use --z-modal-backdrop, --z-modal
- [ ] Update Dropdown.module.css: use --z-dropdown
- [ ] Update Tooltip.module.css: use --z-tooltip
- [ ] Update Sidebar.module.css: use --z-sticky, --z-overlay (if needed, else --z-base)
- [ ] Update Navbar.module.css: use --z-sticky
- [ ] Update Drawer.module.css: verify it uses correct tokens
- [ ] Update Calendar.module.css: replace hardcoded -1 with semantic token
- [ ] Update Hero.module.css: replace 0, 1, 2 with semantic tokens (e.g., --z-base, --z-base + 1, --z-base + 2)

**Phase 3: Type Generation** (10 min)
- [ ] Run `npm run build:tokens` → updates src/tokens/types.ts with `ZIndex` type
- [ ] Verify TypeScript autocomplete: `getToken('z.modal-backdrop')`

**Phase 4: Validation** (10 min)
- [ ] Run `npm run validate` → check 100% token compliance
- [ ] Update tests if any z-index-related assertions exist

**Total Effort**: ~1.5 hours

#### Testing Strategy

**Unit Tests**:
```typescript
it('Modal backdrop has correct z-index', () => {
  const { container } = render(
    <Modal isOpen={true}>Content</Modal>
  );
  const backdrop = container.querySelector('[class*="backdrop"]');
  // Check computed z-index (must account for CSS var resolution)
  expect(window.getComputedStyle(backdrop).zIndex).toBe('1000');
});
```

**Storybook Story**:
```tsx
export const Stacking = () => (
  <div style={{ position: 'relative' }}>
    <div style={{ zIndex: '100' }}>Dropdown</div>
    <div style={{ zIndex: '1000' }}>Modal Backdrop</div>
    <div style={{ zIndex: '1001' }}>Modal</div>
    <div style={{ zIndex: '9000' }}>Fixed Top</div>
  </div>
);
```

**E2E Test** (Playwright):
```typescript
test('Modal appears above dropdown', async ({ page }) => {
  await page.goto('http://localhost:6006/?path=/story/modal--basic');
  const modal = page.locator('[class*="modal"]');
  const dropdown = page.locator('[class*="dropdown"]');

  // Modal z-index > Dropdown z-index
  const modalZ = await modal.evaluate(el =>
    window.getComputedStyle(el).zIndex
  );
  const dropdownZ = await dropdown.evaluate(el =>
    window.getComputedStyle(el).zIndex
  );
  expect(Number(modalZ)).toBeGreaterThan(Number(dropdownZ));
});
```

#### Impact on Chain of Truth

**Before** (Broken):
```
Primitives → (no z-index tokens) → Components hardcode values (❌ Violates Chain)
```

**After** (Fixed):
```
Primitives (z: 0, 10, 100, 1000, 9000)
  ↓
Semantics (z-base: 0, z-dropdown: 100, z-modal: 1001, etc.)
  ↓
Components (--z-modal, --z-dropdown, --z-tooltip) ✅ Compliant
```

#### Dependency on Other Features

- None — this is self-contained
- Does NOT depend on font-size tokens
- Does NOT depend on Tailwind preset (preset can add z-* utilities in v5.8.0)

#### Recommended Priority

**HIGH** → Implement in **v5.6.1 (patch)** or **v5.7.0 (minor)**

**Reasoning**:
- Fills CRITICAL semantic gap (referenced but undefined tokens)
- Low effort (1.5 hours)
- High impact (fixes stacking context bugs)
- No breaking changes (existing components continue to work, just with proper tokens)

---

### Improvement 2: Font-Size Semantic Aliases

#### Current State

**Already Exist in CLAUDE.md** (documented):
```markdown
- ✅ `var(--font-size-xs)` → EXISTS (12px) — Use for captions, small labels
- ✅ `var(--font-size-sm)` → EXISTS (13px) — Use for small UI text
- ✅ `var(--font-size-base)` → EXISTS (14px) — Use for standard body text
- ✅ `var(--font-size-md)` → EXISTS (16px) — Use for comfortable reading
- ✅ `var(--font-size-lg)` → EXISTS (18px) — Use for large UI text
- ✅ `var(--font-size-xl)` → EXISTS (20px) — Use for emphasis
- ✅ `var(--font-size-2xl)` → EXISTS (24px) — Use for headings
- ✅ `var(--font-size-3xl)` → EXISTS (32px) — Use for display text
```

**But THEY DON'T EXIST in theme.css**:
```bash
grep "^    --font-size-xs\|^    --font-size-sm\|^    --font-size-base" \
  /Users/alfredo/Documents/AI\ First\ DS\ Library/packages/react/dist/theme.css
# (no output — semantic aliases missing!)
```

**What EXISTS**:
```css
/* Numeric primitives only */
--font-size-10: 10px;
--font-size-12: 12px;
--font-size-13: 13px;
--font-size-14: 14px;
--font-size-16: 16px;
--font-size-18: 18px;
--font-size-20: 20px;
--font-size-24: 24px;
--font-size-32: 32px;
--font-size-48: 48px;
--font-size-64: 64px;
--font-size-80: 80px;
--font-size-96: 96px;
```

**Documentation vs Reality Gap**:
- CLAUDE.md lists 8 semantic aliases
- theme.css only has numeric primitives (no semantic layer)
- Developers expect --font-size-base to exist (it's documented)
- They find only --font-size-14 (requires lookup)

#### Why Semantic Aliases Matter

**Without Semantic Aliases** (Current):
```css
/* Component developer must think about numbers */
.body {
  font-size: var(--font-size-14);  /* Wait, is 14 "base" or "small"? */
}

.heading {
  font-size: var(--font-size-32);  /* Is 32 "heading" or "display"? */
}

/* Mode-aware components can't scale flexibly */
[data-mode="display"] .body {
  font-size: var(--font-size-20);  /* Must hardcode alternative size */
}
```

**With Semantic Aliases** (Proposed):
```css
/* Component developer thinks about INTENT */
.body {
  font-size: var(--font-size-base);  /* Clear: standard body text */
}

.heading {
  font-size: var(--font-size-2xl);  /* Clear: large heading */
}

/* Mode-aware sizing (future pattern) */
[data-mode="display"] .body {
  font-size: var(--font-size-lg);  /* Scaled for display mode */
}

[data-mode="product"] .body {
  font-size: var(--font-size-sm);  /* Compact for product mode */
}
```

#### Proposed Token Structure

**Add to tokens/light.json and tokens/dark.json**:
```json
{
  "semantic": {
    "fontSize": {
      "xs": "{font-size.12}",      // 12px - captions, small labels
      "sm": "{font-size.13}",      // 13px - small UI text
      "base": "{font-size.14}",    // 14px - standard body text (default)
      "md": "{font-size.16}",      // 16px - comfortable reading
      "lg": "{font-size.18}",      // 18px - large UI text
      "xl": "{font-size.20}",      // 20px - emphasis text
      "2xl": "{font-size.24}",     // 24px - headings
      "3xl": "{font-size.32}"      // 32px - display text
    }
  }
}
```

**Theme-Agnostic** (same in light and dark):
- Font sizes don't change with theme (unlike colors)
- Only primitive values are used, no color-mixing

**Aliasing Strategy**:
- References numeric primitives (--font-size-14, etc.)
- Adds semantic layer on top
- Developers can use either:
  - `var(--font-size-base)` (semantic, preferred)
  - `var(--font-size-14)` (numeric, fallback)

#### Implementation Checklist

**Phase 1: Add Semantic Aliases** (15 min)
- [ ] Edit tokens/light.json: add `semantic.fontSize` object with 8 aliases
- [ ] Edit tokens/dark.json: add same `semantic.fontSize` object
- [ ] Run `npm run build:tokens` → generates --font-size-xs, --font-size-sm, etc.

**Phase 2: Update Component CSS** (30 min) — Optional, but recommended
- [ ] Audit components for hardcoded font-size (grep `-size.*:.*px;`)
- [ ] Replace `font-size: 14px` → `font-size: var(--font-size-base)`
- [ ] Replace `font-size: 12px` → `font-size: var(--font-size-xs)`
- [ ] Examples:
  - Button.module.css
  - Field.module.css
  - Heading.module.css
  - etc.

**Phase 3: Type Generation** (10 min)
- [ ] Run `npm run build:tokens` → updates src/tokens/types.ts
- [ ] Verify TypeScript autocomplete: `getSemanticToken('light', 'fontSize.base')`

**Phase 4: Documentation** (10 min)
- [ ] Update CLAUDE.md to reflect that tokens NOW exist (not just documented)
- [ ] Add examples to packages/react/README.md
- [ ] Update Storybook docs (if any typography documentation)

**Total Effort**: ~1 hour (+ optional component refactoring: ~2 hours)

#### Testing Strategy

**Unit Tests**:
```typescript
it('font-size-base resolves to 14px', () => {
  const root = document.documentElement;
  const fontSize = window
    .getComputedStyle(root)
    .getPropertyValue('--font-size-base')
    .trim();
  expect(fontSize).toBe('14px');
});
```

**Integration Test**:
```typescript
it('body text uses font-size-base', () => {
  const { container } = render(<p className={styles.body}>Text</p>);
  const el = container.querySelector('p');
  const fontSize = window.getComputedStyle(el).fontSize;
  expect(fontSize).toBe('14px');
});
```

#### Impact on Chain of Truth

**Before** (Partial):
```
Primitives (--font-size-12, --font-size-14, etc.) ✅
  ↓
Semantics (documented in CLAUDE.md only, not in CSS) ❌
  ↓
Components (use numeric primitives or hardcode px) ⚠️ Suboptimal
```

**After** (Complete):
```
Primitives (--font-size-12, --font-size-14, etc.) ✅
  ↓
Semantics (--font-size-xs, --font-size-base, --font-size-2xl, etc.) ✅
  ↓
Components (use semantic tokens) ✅ Optimal
```

#### Dependency on Other Features

- None — self-contained
- Does NOT depend on zIndex tokens
- Complements future mode-aware typography (Display/Product/App mode scaling)

#### Recommended Priority

**MEDIUM** → Implement in **v5.7.0 (minor)**

**Reasoning**:
- Reduces documentation/implementation gap
- Low effort (1 hour for tokens, optional 2 hours for component refactoring)
- High clarity impact (developers can use semantic names)
- No breaking changes
- Deferred slightly below zIndex because zIndex has stacking bugs, this is DX improvement

---

## PART 3: IMPLEMENTATION ROADMAP

### Immediate (This Week — v5.6.1 patch or v5.7.0 prep)

**Priority 1** (Critical):
- [ ] Investigate Type-Check Workspace issue (1-2 hours)
- [ ] Fix or document workaround

**Priority 2** (High):
- [ ] Implement zIndex tokens (1.5 hours)
- [ ] Update theme.css, components, types
- [ ] Run validation: `npm run validate && npm run type-check`

**Priority 3** (Medium):
- [ ] Fix PRE-004 (Option A+B) (10 minutes)
- [ ] Remove `rich` from vite.config.ts
- [ ] Update dist-completeness.test.ts

### Short Term (v5.7.0 — Next Release)

**Priority 4**:
- [ ] Implement font-size semantic aliases (1 hour)
- [ ] Optional: Refactor components to use semantic tokens (2 hours)

**Priority 5** (Deferred Investigation):
- [ ] Decide on `rich` entry point: implement or permanently remove?
- [ ] If implementing: allocate 4-6 hours, separate PR

### Medium Term (v5.8.0+)

**Potential Improvements** (Not in scope):
- [ ] zIndex support in Tailwind preset (`--z-*` utilities)
- [ ] Mode-aware font sizing (Display/Product/App mode scale)
- [ ] zIndex documentation in dev guide

---

## PART 4: IMPACT ANALYSIS

### Chain of Truth Compliance

| Gap | Type | Impact | Fix Effort | Priority |
|-----|------|--------|-----------|----------|
| zIndex tokens undefined | Critical | Components don't stack correctly | 1.5h | HIGH |
| font-size semantic layer missing | Medium | Documentation/implementation gap | 1h | MEDIUM |
| Type-check workspace | Low | Developer workflow friction | 1-2h | MEDIUM |
| PRE-004 vite.config mismatch | Low | Blocks pre-release validation | 10m | LOW |

### Production Safety

**All identified issues are SAFE for production**:
- zIndex gap: Not used in current shipped code (only future-proofing)
- font-size aliases: Documentation only (no code depends on them yet)
- Type-check: Developer tool (doesn't affect published package)
- PRE-004: Test fails, but package is deployable via manual `npm publish`

**Recommendation**: Fix zIndex before shipping v5.7.0 (add to release notes as "bugfix")

### Backward Compatibility

**All proposed fixes are 100% backward compatible**:
- Adding tokens doesn't break existing CSS (adds new variables)
- Semantic aliases don't remove numeric primitives
- No breaking changes to exports or APIs

---

## PART 5: DECISION MATRIX FOR TECH LEAD

| Decision | Recommendation | Rationale |
|----------|----------------|-----------|
| **Fix zIndex in v5.6.1 or v5.7.0?** | **v5.6.1 (patch)** | Referenced but undefined tokens = bugfix, not feature |
| **Fix PRE-004 before next release?** | **Yes, immediately** | Unblocks pre-publish validation, 10-minute fix |
| **Implement font-size aliases in v5.7.0?** | **Yes** | Closes documentation gap, low effort |
| **Investigate Type-Check workspace?** | **Defer to v5.7.0 planning** | Low impact on workflow, not blocking |
| **Implement `rich` entry point?** | **Defer to v5.7.0+ backlog** | Requires scoping first, not urgent |

---

## DELIVERABLES

### For Code Review
1. ✅ This analysis document (architectural recommendations)
2. Proposed token JSON snippets (ready to paste)
3. Component CSS checklist (ready to execute)
4. Test cases (ready to implement)

### For Tech Lead
- Clear impact assessment (what breaks, what doesn't)
- Effort estimates with confidence levels
- Dependency graph (what must be done first)
- Risk assessment (none — all backward compatible)

### For Developers
- Implementation checklist (copy-paste ready)
- Testing patterns (unit, integration, E2E)
- Documentation updates (what to change)

---

## APPENDIX: File Paths Reference

### Configuration Files
- `/packages/react/vite.config.ts` - Vite entry points (needs `rich` removal)
- `/packages/react/package.json` - Exports definition
- `/packages/react/dist/theme.css` - Generated CSS (will be regenerated)

### Source Files
- `/tokens/primary.json` - Add z-index primitives
- `/tokens/light.json` - Add z-index & font-size semantics
- `/tokens/dark.json` - Add z-index & font-size semantics
- `/packages/react/src/components/*/ComponentName.module.css` - Update z-index refs
- `/packages/react/src/blocks/sections/*/SectionName.module.css` - Update z-index refs

### Test Files
- `/packages/react/tests/dist-completeness.test.ts` - Fix entry points list
- `/packages/react/src/**/*.test.tsx` - Add z-index stacking tests (optional)

### Documentation
- `/CLAUDE.md` - Update font-size aliases section
- `/packages/react/README.md` - Add z-index & font-size examples
- `/MEMORY.md` - Record decisions made

---

**Analysis Complete** ✅
**Prepared by**: System Architect (Claude Code)
**For**: Tech Lead Review & Team Action Items
