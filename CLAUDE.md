# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Orion Design System** is an AI-first design system built on the "Chain of Truth" principle. It's a token-governed framework that eliminates UI hallucination by enforcing strict separation between primitives, semantics, and components. The system supports multiple brands and themes with zero visual drift through automated validation.

### TypeScript & Consolidation (v3.0.0+)

The system now includes a **TypeScript-based monorepo architecture**:

- **@orion-ds/react v3.0.0+**: Type-safe React component library **with integrated design tokens** (consolidated from previously separate packages)
- **@orion-ds/vue**: Type-safe Vue 3 composables

See [TYPESCRIPT_SETUP.md](./TYPESCRIPT_SETUP.md) for complete setup instructions.

## Core Architecture

### The Chain of Truth (3-Layer System)

1. **Primitives (Layer 1)**: Raw values in `tokens/primary.json` - the immutable source of truth
2. **Semantics (Layer 2)**: Intent-based aliases in `tokens/light.json` and `tokens/dark.json` - describe what values do, not what they look like
3. **Components (Layer 3)**: Blind consumers that reference semantic tokens via CSS variables

**CRITICAL**: Components never hardcode values. All styling must use semantic tokens (e.g., `var(--surface-base)`, `var(--interactive-primary)`).

### Multi-Brand Architecture

The system supports multiple brands via `data-brand` attribute:
- **orion** (default): Blue accent (#1B5BFF), 12px radius
- **red**: Red accent (#D7282F), 9999px radius (pill buttons)
- **deepblue**: Deep Blue accent (#006FBA), 12px radius
- **orange**: Red-Orange accent (#F15D22), 9999px radius

Brands are configured in `tokens/brands.json` and override base tokens in `theme.css`.

### Token System

All tokens are defined in JSON and compiled to CSS variables:
- `tokens/ai-manifest.json` - **AI system status & capabilities (READ THIS FIRST!)**
- `tokens/primary.json` - Primitive values (colors, spacing, typography, radius, blur)
- `tokens/light.json` - Light theme semantic mappings
- `tokens/dark.json` - Dark theme semantic mappings
- `tokens/components.json` - Component definitions with HTML templates
- `tokens/utilities.json` - Utility class definitions
- `tokens/brands.json` - Brand-specific overrides
- `tokens/index.json` - Unified reference (single source of truth for AI agents)

### TypeScript Token System (NEW)

TypeScript types are auto-generated from JSON tokens:

```bash
npm run build:tokens  # Generates TypeScript types from JSON
```

Generated files:
- `packages/react/src/tokens/types.ts` - TypeScript interfaces
- `packages/react/src/tokens/primitives.ts` - Typed constants
- `packages/react/src/tokens/themes.ts` - Light/dark theme definitions
- `packages/react/src/tokens/brands.ts` - Brand configurations
- `packages/react/src/tokens/utils.ts` - Helper functions

## Development Commands

### Build & Validation
```bash
npm run build:tokens                    # Generate TypeScript types from JSON
npm run build:packages                  # Build all TypeScript packages
npm run build:cli                       # Build @orion-ds/cli package
npm run type-check                      # Run TypeScript type checking
npm run validate                        # Audit theme.css for hardcoded values
npm run audit                           # Full validation suite
npm run dev                             # Start live-server on port 3000
npm run dev:packages                    # Start all packages in watch mode

# Component AI-First Validation (Prevents hallucination)
node scripts/validate-components.js     # Check React components follow AI-first rules
```

### Build Architecture Note (Turbo 2.x - v4.9.3+)

**Root task exclusion**: The build pipeline uses explicit package filtering in Turbo 2.x to prevent infinite recursion:

- Root `build` task → `npm run build:tokens && npm run build:packages`
- `build:packages` → `turbo run build` with explicit package filters (excludes root by design)
- Packages built: `@orion-ds/react`, `@orion-ds/cli`, `@orion-ds/mcp`, `@orion-ds/create`, `@orion-ds/validate`

**Why this matters**:
- Turbo 1.x supported negation syntax: `--filter=!name` (deprecated in 2.x)
- Turbo 2.x requires explicit package names: `--filter=@orion-ds/react --filter=@orion-ds/cli ...`
- Root task (`orion-design-system@1.0.0`) is NOT in the filter list, so it never gets re-executed by turbo
- This breaks the infinite recursion loop that occurred when root task invoked turbo that included root

**Result**:
✅ `npm run build` completes in ~2-3 minutes (no recursion)
✅ `npm run release:*` works correctly (uses explicit filters)
✅ Matches Turbo 2.x API (future-proof)

### Release & Infrastructure (Post-Split Improvements - Feb 28 2026)

**Problem**: After splitting @orion-ds/core into separate packages, the release pipeline became fragile:
- docs-site failures cancelled npm releases even when core packages were ready
- No validation of preview-module API drift until docs-site broke
- Divergent Vite configs in packages/react and packages/blocks required dual maintenance

**Solution**: Three critical infrastructure improvements implemented:

#### 1. Release Pipeline Separation (Mejora 1)
The `npm run build` command included docs-site, which could fail and block releases. Now:

```bash
npm run build:release          # Builds core packages, omits docs-site
                               # Uses: npm run build:tokens && turbo run build --filter=!orion-docs
npm run release:patch          # Release workflow now uses build:release (safe from docs-site)
npm run release:dry            # Simulate release without publishing (validates infrastructure)
```

**Files**: `scripts/release.js` (line 235), `package.json` (build:release script)

**Impact**: Releases now independent of docs-site status. Failing docs builds don't block npm publications.

#### 2. Pre-commit Preview-Modules Validation (Mejora 2)
API drift in preview-modules (92 component examples) often goes undetected until docs-site renders broken. Now:

```bash
npm run validate:preview-modules   # Syntax validation of all 92 preview modules
                                   # Automatically runs on git commit via .husky/pre-commit hook
```

**How it works**:
- `.husky/pre-commit` hook runs: `npx lint-staged` → `node scripts/validate-preview-modules.js`
- `scripts/validate-preview-modules.js` checks for syntax errors (mismatched braces/parentheses)
- Catches obvious issues before code is committed
- Can bypass with `git commit --no-verify` if needed

**Files**: `scripts/validate-preview-modules.js`, `.husky/pre-commit`, `registry/tsconfig.json` (paths config)

**Impact**: API drift detected immediately at pre-commit, not at deployment.

#### 3. Shared Vite Configuration (Mejora 3)
Both `packages/react` and `packages/blocks` had divergent, hard-to-maintain Vite configs. Now:

```bash
vite.shared.config.ts          # Factory function createViteConfig() + COMMON_EXTERNALS
packages/react/vite.config.ts  # Refactored: 56 → 12 lines (uses factory)
packages/blocks/vite.config.ts # Refactored: 60 → 15 lines (uses factory)
```

**Pattern**:
```typescript
// Before: 60 lines of duplicated config
export default defineConfig({
  plugins: [react(), dts()],
  build: { ... duplicated settings ... }
})

// After: 12 lines using factory
export default defineConfig(
  createViteConfig({
    entry: resolve(__dirname, 'src/index.ts'),
    name: 'OrionReact',
    resolveAlias: { '@': path.resolve(__dirname, './src') },
  })
);
```

**Features**:
- `COMMON_EXTERNALS`: React, lucide-react, react-markdown, recharts, @dnd-kit, date-fns (externalized)
- `BLOCKS_EXTERNALS`: @orion-ds/react sub-paths + CSS imports
- Both packages use `preserveModules: true` for tree-shaking
- Centralized: changes benefit both packages automatically

**Files**: `vite.shared.config.ts` (root), refactored config files, deleted legacy `vite.config.ts`

**Impact**: Single source of truth for build configuration. Easier to maintain and evolve.

**Validation**: All improvements tested and deployed:
```bash
npm run release:dry            # ✅ PASSES - Infrastructure working end-to-end
npm run validate:preview-modules # ✅ Checks 92 preview modules successfully
npm run build:release          # ✅ Builds 6 packages (omits docs-site)
```

#### 4. Dynamic Token Type Generation (Mejora 4 - In Progress)

**Problem**: Original `scripts/generate-types.ts` hardcodes type definitions. When JSON tokens change, types fall out of sync, causing TypeScript errors.

**Solution**: New `scripts/generate-types-dynamic.ts` introspects JSON files and generates types dynamically.

**How It Works**:
```typescript
// Instead of hardcoding:
export interface TypographySize {
  10: string;
  12: string;
  // ... hardcoded sizes
}

// Now reads JSON and generates:
export interface TypographySize {
  12: string;
  14: string;
  16: string;
  // ... extracted from tokens/primary.json
  [key: string]: any;  // Flexible catch-all
}
```

**Benefits**:
- ✅ Types always match JSON reality
- ✅ No manual sync between JSON and TypeScript
- ✅ Flexible to new tokens (only `[key: string]: any` needed)
- ✅ Extracts real brand names, spacing scales, radius values from JSON
- ✅ Optional properties marked with `?` automatically

**Usage**:
```bash
# Use new dynamic version (recommended for v5.2.0+)
ts-node scripts/generate-types-dynamic.ts

# Or keep original for backward compatibility
ts-node scripts/generate-types.ts
```

**Status**: ⏸️ **DEFERRED TO v5.3.0 (May 2026)**

**Why deferred?** v5.2.0 (April 2026) uses the proven original `generate-types.ts` to maintain schedule reliability. Dynamic type generation requires 3 P1 fixes (error handling, type validation, brand consistency) that will be properly refactored and tested in v5.3.0 with more time.

**v5.2.0 (April 11)**: Original `generate-types.ts` — stable, tested, reliable
**v5.3.0 (May 9)**: Dynamic generation with all P1 fixes — proper refactoring, not rushed

**Files**:
- `scripts/generate-types-dynamic.ts` (kept in repo for v5.3.0 reference, not active)
- `scripts/generate-types.ts` (original, in use through v5.2.0)
- See `memory/architecture-decisions.md` for full reasoning

### Storybook
```bash
cd packages/react
npm run storybook           # Start Storybook dev server on port 6006
npm run build-storybook     # Build static Storybook
```

**Usage**: All components have `.stories.tsx` files for visual development and testing.
**Location**: `packages/react/src/components/*/ComponentName.stories.tsx`

### CLI Commands (@orion-ds/cli)

The CLI lets developers copy individual components into their project (shadcn-style):

```bash
npx @orion-ds/cli init                    # Configure project, create orion.json
npx @orion-ds/cli add button card modal   # Copy components to project
npx @orion-ds/cli add theme-controller    # Resolves 6 deps automatically
npx @orion-ds/cli list                    # Show all 90 registry items
npx @orion-ds/cli list --type=component   # Filter by type
```

**Flags:** `--yes` (skip prompts), `--overwrite` (replace existing), `--local` (use `public/r/` instead of HTTP), `--type=component|section|template`

**Config file:** `orion.json` — created by `orion init`, controls output directories and registry URL.

See `packages/cli/README.md` for full documentation.

### Registry & HTTP API

**Registry**: `registry/` contains 90+ items as JSON files
- Components: `registry/components/*.json` (39 items)
- Sections: `registry/sections/*.json` (41 items)
- Templates: `registry/templates/*.json` (10 items)

**HTTP API**: `public/r/` contains static JSON endpoints

```bash
npm run build:registry       # Generate registry JSON from React components
npm run build:registry-api   # Build HTTP API endpoints in public/r/
```

**API Endpoints**:
- `GET /r/index.json` - Full registry manifest
- `GET /r/components/{name}.json` - Component details
- `GET /r/sections/{name}.json` - Section details
- `GET /r/templates/{name}.json` - Template details

**Used by**:
- `@orion-ds/cli` - Fetches components during `orion add`
- `@orion-ds/mcp` - Powers MCP server tools (9 tools for AI agents)
- Documentation sites - Renders component galleries

**MCP Server**: See `packages/mcp/README.md` for AI integration setup (Claude Desktop, Claude Code, Cursor, Cline)

### Python Utilities
```bash
python check_contrast.py   # Validate WCAG color contrast ratios
python check_tokens.py     # Additional token validation
```

## Testing

### Unit Tests (Vitest)
```bash
cd packages/react
npm test                    # Run unit tests
npm run test:ui             # Interactive test UI
npm run test:coverage       # Generate coverage report
```

**Coverage thresholds**: 80% statements, 75% branches, 80% functions, 80% lines

**Test files**: `*.test.tsx` files co-located with components

**Configuration**: `packages/react/vitest.config.ts`

### E2E Tests (Playwright)
```bash
cd packages/react
npm run test:e2e            # Run E2E tests
npm run test:e2e:headed     # Run with browser visible
npm run test:e2e:debug      # Debug mode
npm run test:e2e:report     # View HTML report
```

**Configured browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari, iPad

**Base URL**: `http://localhost:6006` (Storybook)

**Configuration**: `packages/react/playwright.config.ts`

**Test directory**: `packages/react/e2e/`

### Visual Regression (Percy)
```bash
cd packages/react
npm run test:visual         # Build Storybook and run Percy
npm run percy               # Run Percy only (requires pre-built Storybook)
```

**Percy configuration**: `packages/react/.percy.yml`

**CI/CD**: Integrated with GitHub Actions (`.github/workflows/visual-regression.yml`)

### Performance Benchmarks
```bash
cd packages/react
npm run bench               # Run Vitest benchmarks
npm run measure:bundle-size # Analyze bundle size
```

**Budget files**: `packages/react/performance.budgets.json`

## Code Quality

### Linting
```bash
npm run lint                # Lint all packages
npm run lint:fix            # Auto-fix ESLint issues
npm run lint:css            # Lint CSS files
npm run lint:css:fix        # Auto-fix Stylelint issues
```

**ESLint config**: Uses `typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `eslint-config-prettier`

**Stylelint config**: `stylelint-config-standard`

**Configuration files**:
- `.eslintrc.json` (root)
- `.stylelintrc.json` (root)

### Formatting
```bash
npm run format              # Format all files with Prettier
npm run format:check        # Check formatting without writing
```

**Prettier config**: Uses defaults with some overrides in `package.json`

**Files formatted**: `*.ts`, `*.tsx`, `*.json`, `*.css`, `*.md`

### Pre-commit Hooks (Husky + lint-staged)

Automatically runs on `git commit`:
- ESLint + Prettier on `*.ts`, `*.tsx` files
- Stylelint + Prettier on `*.css` files
- Prettier on `*.json`, `*.md` files

**Configuration**: `package.json` → `lint-staged` field

**Bypass** (not recommended): `git commit --no-verify`

**Setup**: Husky hooks are in `.husky/` directory

## Anti-Hallucination Rules (MANDATORY)

### ❌ NEVER Do These

1. **Hardcode colors**: `#FFFFFF`, `#000000`, `rgb(255,255,255)`
2. **Hardcode pixels**: `16px`, `24px`, `12px` (except `1px` borders, `0px`, `9999px` pills)
3. **Hardcode fonts**: `font-family: Inter`, `font-family: DM Sans`
4. **Invent components**: Only use components from `tokens/components.json`
5. **Create arbitrary wrappers**: Don't add unnecessary div layers
6. **Override brand tokens**: Never hardcode brand-specific values
7. **Use `any` type in TypeScript**: Always use proper types

### ✅ ALWAYS Do These

1. **Use CSS variables**: `var(--surface-base)`, `var(--text-primary)`, `var(--spacing-4)`
2. **Reference semantic tokens**: `var(--interactive-primary)`, `var(--border-subtle)`
3. **Check component manifest**: Use HTML patterns from `tokens/components.json`
4. **Verify brand context**: Check `data-brand` attribute before generating code
5. **Validate after changes**: Run `npm run validate` to ensure token compliance
6. **Use TypeScript types**: Import types from `@orion/core` for type safety
7. **Generate types after token changes**: Run `npm run build:tokens` after editing JSON

### React Component Specific Rules (CRITICAL FOR @orion/react)

**Brand and Theme are GLOBAL - NOT component props.**

#### ❌ NEVER Do These (Will Fail Validation)

1. **Add `brand` prop to components**: ❌ `export interface ButtonProps { brand?: Brand }`
2. **Set `data-brand` on component elements**: ❌ `<button data-brand={brand}>`
3. **Create brand-specific component variants**: ❌ Don't hardcode `--radius-button` differently per component
4. **Use `useTheme()` for component styling**: Components don't need individual theme/brand access
5. **Pass brand/theme between components**: Set once at app root via `<ThemeProvider>`

#### ✅ ALWAYS Do These

1. **Remove `brand` from all component prop interfaces**: Components never take brand/theme parameters
2. **Use `data-theme` and `data-brand` on `<html>` only**: Set globally via ThemeProvider
3. **Let CSS variables handle brand changes**: Use `var(--radius-button)` which changes per brand automatically
4. **Use `useThemeContext()` only if component needs to CHANGE brand/theme**: For theme switchers, not regular components
5. **Wrap your app with `<ThemeProvider>`**: Required once at root, all components inherit global state

#### Validation

Run the component validation to catch AI mistakes:

```bash
node scripts/validate-components.js
```

This script checks:
- ✅ No `data-brand` in component JSX
- ✅ No `brand` prop in TypeScript types
- ✅ No hardcoded colors (must use CSS variables)
- ✅ No hardcoded fonts (must use CSS variables)

**Exit code 0 = All tests passed (AI-first compliant)**

## Visual System Rules (Mode-Aware) — CRITICAL

The Orion Design System implements **"Contextual Minimalism"**: visual language adapts based on context (Display, Product, App mode). Each mode has distinct visual characteristics.

### ✅ ALWAYS Use Mode-Aware Tokens for Visual Effects

```css
/* Shadows - Mode-aware */
.btn:hover {
  box-shadow: var(--mode-shadow-hover);    /* Uses mode-specific shadow */
  transform: translateY(var(--mode-hover-lift));  /* Uses mode-specific lift */
  transition-duration: var(--mode-hover-duration);  /* Uses mode-specific speed */
}
```

### Mode Reference (Mode-Aware Styling)

| Mode | Visual Style | Glassmorphism | Hover Lift | Shadow | Duration |
|------|--------------|---------------|-----------|--------|----------|
| **Display** | Atmospheric (Apple) | ✅ Enabled | `-4px` | generous (shadow-lg) | 250ms |
| **Product** | Flat (Linear) | ❌ Disabled | `0px` | minimal (shadow-flat) | 150ms |
| **App** | Tactile (Material 3) | ❌ Disabled | `-2px` | native (shadow-md) | 200ms |

### Display Mode (Marketing & Landing Pages)
- **Philosophy**: Atmospheric & Narrative
- **Glassmorphism**: ✅ ENABLED (`backdrop-filter: blur(12px)` on navbars, sidebars, cards)
- **Shadows**: Generous (default: shadow-md, hover: shadow-lg)
- **Hover Lifts**: `-4px` translateY (dramatic, responsive)
- **Typography**: 20px+ body (readable at scale)
- **Use When**: Marketing pages, landing pages, hero sections

**Visual Rules**:
```css
[data-mode="display"] .navbar { backdrop-filter: blur(...); }
[data-mode="display"] .card-glass { backdrop-filter: blur(...); }
[data-mode="display"] .btn:hover { transform: translateY(-4px); }
```

### Product Mode (SaaS & Dashboards)
- **Philosophy**: Geometric Precision (Linear/Figma style)
- **Glassmorphism**: ❌ DISABLED (solid backgrounds only)
- **Shadows**: Minimal (default: shadow-flat, hover: shadow-sm)
- **Hover Lifts**: `0px` NO lift (background color change only)
- **Typography**: 14px body (dense, efficient)
- **Use When**: Dashboards, admin panels, data-heavy interfaces

**Visual Rules**:
```css
[data-mode="product"] .navbar { backdrop-filter: none; }
[data-mode="product"] .btn:hover { background-color: var(...); /* No lift */ }
[data-mode="product"] .card { box-shadow: var(--shadow-flat); }
```

### App Mode (Mobile & Touch-First)
- **Philosophy**: Tactile Elevation (Material 3 style)
- **Glassmorphism**: ❌ DISABLED (native feel)
- **Shadows**: Native (default: shadow-md, hover: shadow-lg)
- **Hover Lifts**: `-2px` translateY (subtle tactile feedback)
- **Typography**: 16px+ body minimum (mobile legibility)
- **Use When**: Mobile apps, touch interfaces, native feel required

**Visual Rules**:
```css
[data-mode="app"] .btn:hover { transform: translateY(-2px); }
[data-mode="app"] .card { border: none; /* No borders */ }
```

### ❌ NEVER Do These (Visual Violations)

1. **Add `backdrop-filter` outside Display mode**
   - ❌ `[data-mode="product"] .card { backdrop-filter: blur(...); }` — Use solid backgrounds
   - ✅ `[data-mode="display"] .card { backdrop-filter: blur(...); }` — Glass only in Display

2. **Use hover lifts in Product mode**
   - ❌ `[data-mode="product"] .btn:hover { transform: translateY(-4px); }` — No motion
   - ✅ `[data-mode="product"] .btn:hover { background-color: var(...); }` — Color only

3. **Hardcode shadow values**
   - ❌ `box-shadow: 0 4px 6px rgba(0,0,0,0.1);` — Violates Chain of Truth
   - ✅ `box-shadow: var(--mode-shadow-hover);` — Uses mode tokens

4. **Apply heavy shadows in Product mode**
   - ❌ `[data-mode="product"] .card { box-shadow: shadow-lg; }` — Too prominent
   - ✅ `[data-mode="product"] .card { box-shadow: var(--shadow-flat); }` — Minimal

5. **Forget brand tints on shadows**
   - ❌ Generic shadows for all brands
   - ✅ `[data-brand="orange"] .card:hover { box-shadow: 0 8px 16px -4px rgba(241, 93, 34, 0.2); }`

### ✅ ALWAYS Do These

1. **Use `var(--mode-shadow-*)` tokens**
   ```css
   .btn:hover { box-shadow: var(--mode-shadow-hover); }
   ```

2. **Use `var(--mode-hover-lift)` for transforms**
   ```css
   .card:hover { transform: translateY(var(--mode-hover-lift)); }
   ```

3. **Check mode before adding visual effects**
   ```css
   [data-mode="display"] .sidebar { backdrop-filter: blur(...); }
   [data-mode="product"] .sidebar { backdrop-filter: none; }
   ```

4. **Apply brand-specific shadow tints**
   - **Deepblue**: Blue-tinted shadows (`rgba(0, 111, 186, 0.3)`)
   - **Orange**: Red-orange-tinted shadows (`rgba(241, 93, 34, 0.2)`)

5. **Respect reduced motion**
   - Test with `prefers-reduced-motion: reduce`
   - Transforms disabled automatically
   - Blur effects preserved (not motion-inducing)

### Visual System Documentation

See [VISUAL_GUIDELINES.md](./VISUAL_GUIDELINES.md) for complete mode-aware styling guide.

### Button Size Variants (Mode-Aware)

Button sizes scale contextually per mode using a proportional system. Each mode maintains its own size hierarchy while preserving relative differences between small, medium, and large variants.

**Display Mode (Atmospheric - Spacious)**:
- `btn-sm`: 14px font, 40px min-height — Smaller but readable
- `btn` (default): 18px font, 56px min-height — Generous and impactful
- `btn-lg`: 20px font, 64px min-height — Dramatic and commanding

**Product Mode (Geometric Precision - Compact)**:
- `btn-sm`: 12px font, 28px min-height — Ultra-compact for dense layouts
- `btn` (default): 14px font, 32px min-height — Efficient and functional
- `btn-lg`: 16px font, 36px min-height — Prominent but space-conscious

**App Mode (Tactile - Touch-Friendly)**:
- `btn-sm`: 14px font, 40px min-height — Accessible touch target
- `btn` (default): 16px font, 44px min-height — iOS/Android standard
- `btn-lg`: 18px font, 48px min-height — Generous touch target

**Rule**: Each mode has proportional size scaling (sm ≈ 70-80% of base, lg ≈ 115-130% of base). Don't force a single button size across all modes—let the mode determine the visual context.

## ⚠️ Common Mistakes (CRITICAL)

### CSS Variables That DON'T EXIST

**Typography:**
- ❌ `var(--font-sans)` - DOES NOT EXIST
- ❌ `var(--font-body)` - DOES NOT EXIST
- ✅ **Use:** `var(--font-secondary)` for body text (DM Sans)
- ✅ **Use:** `var(--font-primary)` for headings (Libre Baskerville)
- ✅ **Use:** `var(--font-mono)` for code (JetBrains Mono)

**Colors for Gradients:**
- ❌ `var(--brand-accent-vivid)` - DOES NOT EXIST
- ❌ `var(--gradient-primary)` - DOES NOT EXIST
- ✅ **Use:** `var(--color-brand-400)` and `var(--color-brand-600)` for gradients
- ✅ **Use:** `var(--text-brand)` for single-color brand text

**Example gradient:**
```css
.gradient-text {
  background: linear-gradient(135deg, var(--color-brand-400), var(--color-brand-600));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

**Semantic Font Sizes (NOW EXIST - Mar 6 2026):**
- ✅ `var(--font-size-xs)` → EXISTS (12px) — Use for captions, small labels
- ✅ `var(--font-size-sm)` → EXISTS (13px) — Use for small UI text
- ✅ `var(--font-size-base)` → EXISTS (14px) — Use for standard body text
- ✅ `var(--font-size-md)` → EXISTS (16px) — Use for comfortable reading
- ✅ `var(--font-size-lg)` → EXISTS (18px) — Use for large UI text
- ✅ `var(--font-size-xl)` → EXISTS (20px) — Use for emphasis
- ✅ `var(--font-size-2xl)` → EXISTS (24px) — Use for headings
- ✅ `var(--font-size-3xl)` → EXISTS (32px) — Use for display text

These semantic aliases map to numeric primitives (`--font-size-12`, `--font-size-14`, etc.) for semantic clarity in component CSS. Use them in `.module.css` files instead of hardcoding pixel values or using numeric tokens directly.

### Font Loading (Automatic in React)

**For @orion/react users:** Fonts are loaded **automatically** by `ThemeProvider`. No manual setup required.

```tsx
// ✅ Fonts load automatically - zero config needed
<ThemeProvider>
  <App />
</ThemeProvider>
```

**To disable auto-loading** (if you want to manage fonts manually):
```tsx
<ThemeProvider disableAutoFontLoading>
  <App />
</ThemeProvider>
```

**For vanilla HTML projects:** Add Google Fonts manually in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
```

Without fonts, text will fallback to system fonts (Times New Roman, etc.)

### React Component CSS Import (v3.0.0+)

When using `@orion-ds/react@^3.0.0`, import styles using:

**Single Import (Recommended - All you need)**
```typescript
import '@orion-ds/react/styles.css';  // Complete bundle (tokens + components)
```

This single import includes:
- ✅ All design tokens (colors, spacing, typography, etc.)
- ✅ All component styles
- ✅ Theme switching (light/dark)
- ✅ Brand support (orion, red, deepblue, orange, lemon)

**Advanced: If you need tokens only (for tree-shaking)**
```typescript
import '@orion-ds/react/theme.css';    // Design tokens only (228 KB)
// Then import components individually for maximum tree-shaking
import { Button } from '@orion-ds/react/components/Button';
```

Missing CSS imports will result in unstyled components.

## TypeScript Development Workflow (NEW)

### 1. Working with Tokens

#### Using @orion-ds/react (Type-Safe Tokens - v3.0.0+)

```typescript
import {
  primitives,
  getToken,
  getSemanticToken,
  getBrand,
  type Theme,
  type Brand,
  type TokenPath
} from '@orion-ds/react';

// Access primitives with autocomplete
const color = primitives.color.brand.orion[500]; // "#1B5BFF"
const spacing = primitives.spacing[4]; // "16px"

// Type-safe token paths
const path: TokenPath = 'color.brand.orion.500'; // ✅ Autocomplete
const invalid: TokenPath = 'invalid.path'; // ❌ Type error

// Get semantic tokens
const surface = getSemanticToken('light', 'surface.base');
const text = getSemanticToken('dark', 'text.primary');
```

### 2. Creating React Components

#### Component Structure

```
packages/react/src/components/Button/
├── Button.tsx           # Component implementation
├── Button.types.ts      # TypeScript type definitions
├── Button.module.css    # CSS Modules (scoped styles)
└── index.ts            # Exports
```

#### Example Component (AI-First Pattern)

**CRITICAL: Do NOT pass brand as a component prop. Brand is GLOBAL.**

```typescript
// Button.types.ts - NO brand prop (AI-first architecture)
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}
```

```tsx
// Button.tsx - NO brand parameter (AI-first architecture)
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ''}`}
        {...rest}
      >
        {children}
    </button>
  );
};
```

```css
/* Button.module.css */
.button {
  padding: var(--spacing-4);
  border-radius: var(--radius-control);
  font-family: var(--font-secondary);
}

.primary {
  background: var(--interactive-primary);
  color: var(--interactive-primary-text);
}
```

### 3. Global Brand & Theme Management (AI-First Architecture)

**Brand and theme are GLOBAL - set once at app root via ThemeProvider.**

**Fonts load automatically** - no need to add `<FontLoader />` manually (since v1.1.4).

```tsx
// app.tsx - Root component MUST wrap with ThemeProvider
import { ThemeProvider, Button } from '@orion-ds/react';
import '@orion-ds/react/styles.css';  // Single import for all styles

export default function App() {
  return (
    <ThemeProvider>  {/* Fonts load automatically */}
      <YourComponents />
    </ThemeProvider>
  );
}
```

**ThemeProvider Props:**
| Prop | Default | Description |
|------|---------|-------------|
| `disableFontWarnings` | `false` | Disable console warnings for missing fonts |
| `disableAutoFontLoading` | `false` | Disable automatic font loading (use if managing fonts manually) |

#### Accessing Global Theme/Brand in Components

Components should NEVER have `brand` props. Instead, use the `useThemeContext()` hook:

```tsx
// Inside any component wrapped by ThemeProvider
import { useThemeContext } from '@orion/react';

function MyComponent() {
  const { theme, brand, setTheme, setBrand } = useThemeContext();

  return (
    <div>
      <p>Current brand: {brand}</p>
      <p>Current theme: {theme}</p>
      <button onClick={() => setBrand('red')}>Switch to Red</button>
      <button onClick={() => setTheme('dark')}>Switch to Dark</button>
    </div>
  );
}
```

**How it works:**
1. `ThemeProvider` wraps your app and manages global state via React Context
2. `useThemeContext()` gives any component access to `theme`, `brand`, and setters
3. Changes update the `<html data-theme="..." data-brand="..." />` attributes
4. CSS uses `:root` and `[data-theme]` selectors to apply styling globally
5. All components automatically inherit the correct brand/theme styling

### 4. Using React Components

```tsx
// ✅ CORRECT - Components don't manage brand/theme
import { Button } from '@orion/react';

function MyButton() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}
```

```tsx
// ❌ WRONG - Don't pass brand to components
<Button variant="primary" brand="red">  {/* This won't work - brand is not a prop */}
  Click me
</Button>
```

### Package Exports & Import Paths (v4.5.0+ - Next.js App Router Compatible)

`@orion-ds/react@^4.5.0` supports multiple entry points optimized for different use cases:

#### Core Imports (No Optional Dependencies)
```typescript
// Main export - ALL components + hooks + contexts
import { Button, ThemeProvider, useThemeContext } from '@orion-ds/react';

// Client-safe import (Next.js App Router) - Light bundle without heavy deps
import { Button, Card, Field } from '@orion-ds/react/client';

// Styles (CSS)
import '@orion-ds/react/styles.css';     // Recommended - Full bundle (tokens + components)
import '@orion-ds/react/theme.css';      // Tokens only (for advanced tree-shaking)

// Tokens (TypeScript)
import { primitives, getToken, getSemanticToken } from '@orion-ds/react/tokens';
```

#### Heavy Components (Require Optional Peer Dependencies)

**`@orion-ds/react/chart`** — Requires `recharts`
```bash
npm install recharts
```
```typescript
import { ChartContainer, ChartTooltipContent, ChartLegend } from '@orion-ds/react/chart';
```

**`@orion-ds/react/calendar`** — Requires `date-fns`
```bash
npm install date-fns
```
```typescript
import { Calendar, DatePicker } from '@orion-ds/react/calendar';
```

**`@orion-ds/react/editor`** — Requires `react-syntax-highlighter`
```bash
npm install react-syntax-highlighter
```
```typescript
import { CodeEditor } from '@orion-ds/react/editor';
```

**`@orion-ds/react/dnd`** — Requires `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```
```typescript
import { CollapsibleFolder } from '@orion-ds/react/dnd';
```

**`@orion-ds/react/rich`** — Requires `react-markdown`, `react-syntax-highlighter`, `remark-gfm`

> ⚠️ **DEPRECATED in v5.1.13** — Chat will be removed in v5.2.0 (April 2026).
> See `packages/react/CHAT_MIGRATION_GUIDE.md` for migration alternatives.

**IMPORTANT**: Chat component is ONLY available via this subpath, not from the main export.
```bash
npm install react-markdown react-syntax-highlighter remark-gfm
```
```typescript
// ✅ CORRECT - Import from ./rich subpath
import { Chat } from '@orion-ds/react/rich';

// ❌ WRONG - Chat is NOT in main export
// import { Chat } from '@orion-ds/react';  // Will fail
```

This design reduces bundle size for users not using Chat (heavy dependencies not loaded).

#### Migration from v4.4.0 to v4.5.0

**Problem (v4.4.0)**:
```typescript
// ❌ FAILS if recharts/date-fns not installed
import { Button, Chart, Calendar } from '@orion-ds/react/client';
```

**Solution (v4.5.0)**:
```typescript
// ✅ ALWAYS WORKS - no optional deps required
import { Button, Card, Field } from '@orion-ds/react/client';

// ✅ OPTIONAL - only import if you use these components
import { Chart } from '@orion-ds/react/chart';      // requires recharts
import { Calendar } from '@orion-ds/react/calendar'; // requires date-fns
```

#### Why Separate Entry Points?

- **Smaller bundle**: Apps using only Button/Card don't need recharts, date-fns, etc.
- **Faster builds**: Webpack/Turbopack don't try to resolve optional deps
- **Next.js compatible**: `@orion-ds/react/client` works without all peer deps installed
- **Tree-shaking**: Each entry point is independently tree-shakeable with `preserveModules: true`

**Exports configuration**: See `packages/react/package.json` → `exports` field

### 4a. Using Premium Sections & Templates (Bloques)

**Important**: Premium marketing sections (Hero, Features, Pricing, etc.) and full-page templates are consolidated into `@orion-ds/react` with dedicated subpath exports.

#### Quick Start

```typescript
// Bloques = Premium sections for marketing pages
import { Hero, Features, CTA, Pricing, Footer } from '@orion-ds/react/blocks';

// Templates = Full-page layouts (landing, dashboard, settings, etc.)
import { LandingPageTemplate, DashboardTemplate } from '@orion-ds/react/templates';

// Styles for sections/templates (included in main styles.css but can be imported separately)
import '@orion-ds/react/blocks.css';
```

#### What's Available

**Premium Marketing Sections** (17 items):
- Layout: Hero, Features, CTA, Pricing, Footer
- Content: Blog, Gallery, Testimonials, Team, Contact
- Engagement: Newsletter, Stats, Comparison, LogoCloud, Timeline
- Social: AppDownload, SocialProof, FAQ

**App/SaaS Sections** (4 items):
- Settings interfaces: SettingsLayout
- Navigation: Breadcrumbs, AgentFolder
- Process flows: Stepper

**Full-Page Templates** (5 items):
- Marketing: LandingPageTemplate, ContactPageTemplate, PricingPageTemplate, AboutPageTemplate
- App: DashboardTemplate (in `@orion-ds/blocks` for now)

#### Import Paths Explained

**Two equivalent ways to import:**

```typescript
// Method 1: From @orion-ds/react (Recommended for new projects)
import { Hero, Features } from '@orion-ds/react/blocks';
import { LandingPageTemplate } from '@orion-ds/react/templates';

// Method 2: From @orion-ds/blocks (Deprecated but maintained for backward compatibility)
import { Hero, Features, LandingPageTemplate } from '@orion-ds/blocks';
```

**Why two paths?**
- **Old architecture**: Bloques lived in separate `@orion-ds/blocks` package
- **New architecture (v4.5.0+)**: Consolidated into `@orion-ds/react` with subpaths
- **Backward compatibility**: `@orion-ds/blocks` re-exports from `@orion-ds/react/blocks` and `@orion-ds/react/templates`
- **Future**: Use `@orion-ds/react/blocks` and `@orion-ds/react/templates` — `@orion-ds/blocks` will be removed in v6.0.0

#### Using Sections in Your App

**Example 1: Marketing Landing Page**

```tsx
import { ThemeProvider } from '@orion-ds/react';
import { Hero, Features, Pricing, CTA, Footer } from '@orion-ds/react/blocks';
import '@orion-ds/react/styles.css';

export default function LandingPage() {
  return (
    <ThemeProvider>
      <Hero
        title="Build Faster with Orion"
        subtitle="AI-ready components for modern web apps"
        ctaLabel="Get Started"
        ctaHref="/docs"
      />
      <Features
        title="Powerful Features"
        features={[
          { icon: 'Zap', label: 'Fast', description: 'Built for speed' },
          { icon: 'Package', label: 'Light', description: 'Minimal dependencies' },
        ]}
      />
      <Pricing
        title="Simple Pricing"
        plans={[
          { name: 'Starter', price: '$0', features: [...] },
          { name: 'Pro', price: '$99', features: [...] },
        ]}
      />
      <CTA
        title="Ready to get started?"
        description="Join thousands of developers using Orion"
        ctaLabel="Start Building"
      />
      <Footer
        company="Orion Design System"
        links={[...]}
      />
    </ThemeProvider>
  );
}
```

**Example 2: SaaS Dashboard with SettingsLayout**

```tsx
import { Sidebar, DataTable, SettingsLayout } from '@orion-ds/react';
import { Breadcrumbs } from '@orion-ds/react/blocks';
import '@orion-ds/react/styles.css';

export default function SettingsPage() {
  return (
    <SettingsLayout
      title="Account Settings"
      sections={[
        { id: 'profile', label: 'Profile' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'billing', label: 'Billing' },
      ]}
    >
      {/* Content per section */}
    </SettingsLayout>
  );
}
```

#### Sections vs Components vs Blocks

| Term | What It Is | Size | Use When |
|------|-----------|------|----------|
| **Component** | Single UI element (Button, Card, Field) | Small | Building individual interactive pieces |
| **Section** | Reusable content block (Hero, Features) | Medium | Composing full pages or app layouts |
| **Block** | Section or template bundled with styles | Large | Rapidly building marketing pages or dashboard layouts |
| **Template** | Full-page layout (LandingPageTemplate) | Full page | Jump-starting entire page structures |

**Components live in** `@orion-ds/react` (default export)
**Sections live in** `@orion-ds/react/blocks` or `@orion-ds/react/sections`
**Templates live in** `@orion-ds/react/templates` or `@orion-ds/blocks/templates`

#### Styling Sections

All sections use the same token system as components:

```tsx
import { Hero } from '@orion-ds/react/blocks';

// Sections automatically inherit theme/brand from ThemeProvider
<ThemeProvider>
  <Hero
    title="Dark mode? ✓ Orion brand? ✓ Custom fonts? ✓"
    // All styling comes from CSS variables automatically
  />
</ThemeProvider>
```

#### What's NOT Documented Yet (Known Gaps)

- ❌ Prop interfaces for each section (check Storybook for now)
- ❌ Customization patterns (how to override section styles)
- ❌ Responsive behavior per section
- ⚠️ Some templates still in `@orion-ds/blocks` (being migrated)

**To see available props**: Open Storybook and browse `Sections` and `Templates` folders

```bash
cd packages/react
npm run storybook  # http://localhost:6006
```

### 4b. Using Lucide Icons in React Components

Orion React includes **Lucide icons** - a comprehensive icon library with 5000+ icons.

Components with icon support:
- `Button` - `icon`, `iconRight`, `iconOnly` props
- `Field` - `icon` prop for input icons
- `Alert` - `icon` prop for custom alert icons
- Other components - Accept `ReactNode` for icon content

```tsx
import { Button, Field } from '@orion/react';
import { Search, Download, ChevronDown, Settings } from 'lucide-react';

// Icon on left
<Button icon={<Search size={20} />}>Search</Button>

// Icon on right
<Button iconRight={<ChevronDown size={20} />}>Menu</Button>

// Icon only (must have aria-label)
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />

// With form field
<Field
  type="email"
  placeholder="Email"
  icon={<Search size={18} />}
/>

// Multiple icons
<Button
  icon={<Download size={20} />}
  iconRight={<ChevronDown size={20} />}
>
  Download Options
</Button>
```

**Common Icons**

```tsx
// Navigation
import { Menu, X, ChevronDown, ChevronUp, Home, Settings, User } from 'lucide-react';

// Actions
import { Plus, Minus, Check, Copy, Download, Upload, Trash2, Edit } from 'lucide-react';

// Status
import { AlertCircle, CheckCircle, XCircle, Info, HelpCircle } from 'lucide-react';

// Media & Social
import { Heart, Star, Mail, MessageSquare, Image, Video } from 'lucide-react';

// Commerce
import { ShoppingCart, DollarSign, CreditCard } from 'lucide-react';
```

**Browse all 5000+ icons**: https://lucide.dev

**Icon Sizing** - Use `size` prop in pixels:
```tsx
<Search size={16} />  // Small
<Search size={20} />  // Default (icon=prop default)
<Search size={24} />  // Medium
<Search size={32} />  // Large
```

**Accessibility** - Icon-only buttons MUST have `aria-label`:
```tsx
// ✅ CORRECT
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />

// ❌ WRONG - No label for screen readers
<Button iconOnly icon={<Settings size={20} />} />
```

**AI-First Icon Rules** for component generation:
- ✅ Always use `<Button icon={<IconName size={20} />}>` pattern
- ✅ Import icons directly from `lucide-react`
- ✅ Include `aria-label` for icon-only buttons
- ✅ Size icons to match component (sm=16-18px, md=20px, lg=24px)
- ❌ Never create custom SVG icons - use Lucide library
- ❌ Never hardcode `<svg>` markup - import from lucide-react
- ❌ Never forget `aria-label` on icon-only buttons

See `/packages/react/LUCIDE_ICONS.md` for complete icon documentation.

### 4b. Vue 3 Development

```vue
<script setup lang="ts">
import { useTheme } from '@orion-ds/vue';
// Note: Design tokens are now included in @orion-ds/react
// Vue users can reference @orion-ds/react/styles.css or theme.css
import '@orion-ds/react/theme.css';

const { theme, brand, setTheme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">
    {{ theme === 'light' ? '🌙' : '☀️' }}
  </button>
</template>
```

**Note:** Vue 3 development uses tokens from @orion-ds/react v3.0.0+. If you have a separate Vue-specific token package, import from that instead. For now, use `@orion-ds/react/theme.css` or create an alias in your bundler config.

## Component Generation Workflow

### Step 1: Read Component Definition
Always check `tokens/components.json` for:
- Available variants (e.g., button: primary, secondary, ghost)
- Required tokens (e.g., `--interactive-primary`, `--radius-control`)
- HTML structure and modifiers

### Step 2: Use Standard HTML Patterns (Vanilla)
Example button:
```html
<button class="btn btn-primary">Label</button>
<button class="btn btn-secondary btn-icon-only"><i data-lucide="search" class="icon"></i></button>
```

Example card:
```html
<div class="card">
  <div class="card-header">Title</div>
  <div class="card-body">Content</div>
</div>
```

### Step 3: Use TypeScript Components (React/Vue)

**React:**
```tsx
<Button variant="primary">Label</Button>
<Button variant="secondary" iconOnly icon={<SearchIcon />} />
```

**Vue:**
```vue
<Button variant="primary">Label</Button>
<Button variant="secondary" :iconOnly="true" :icon="SearchIcon" />
```

### Step 4: External Reference Protocol (Critical)

When user provides external references (screenshots, website URLs, brand names like "Revolut", "Linear"):

1. **Inventory**: List every visual element from the reference
2. **Cross-reference**: Match each element to `tokens/components.json`
3. **Flag orphans**: If element doesn't exist, ask user for guidance:
   - (A) Extend the library
   - (B) Use existing alternatives
   - (C) Proceed without those elements
4. **Generate mapping table** before coding:
   ```markdown
   | External Element | Orion Component | Token/Class |
   |------------------|-----------------|-------------|
   | Hero gradient    | (orphan)        | Request extension |
   | Nav bar          | .navbar         | Standard |
   | CTA button       | .btn-primary    | --interactive-primary |
   ```

**NEVER invent styles** for external elements. Use utility classes or request library extension.

## File Structure

### Core Files
- `theme.css` - Main CSS file with all tokens + component styles (DO NOT edit generated sections)
- `index.html` - Landing page
- `library.html` - Component library with live examples
- `components.html` - Component documentation
- `tokens.html` - Token reference
- `rules.html` - Rendered governance rules
- `rules.md` - The Constitution (governance document)
- `AGENTS.md` - Quick reference for AI agents
- `TYPESCRIPT_SETUP.md` - TypeScript migration guide (NEW)

### Monorepo Architecture

**Package manager**: pnpm (v10.28.1) or npm

**Build orchestration**: Turbo (caching, parallel builds)

```
packages/
├── blocks/         # @orion-ds/blocks - Marketing sections & templates
├── cli/            # @orion-ds/cli - Component installer (shadcn-style)
├── create/         # @orion-ds/create - Project scaffolder
├── mcp/            # @orion-ds/mcp - MCP server for AI agents
├── react/          # @orion-ds/react - React components + tokens (v3.0.0+)
└── validate/       # @orion-ds/validate - Code validator
```

**Build order** (enforced by Turbo):
1. `@orion-ds/react` (main package with tokens + components)
2. `@orion-ds/blocks`, `@orion-ds/cli`, `@orion-ds/mcp`, `@orion-ds/validate` (depend on react)

**Key files**:
- `pnpm-workspace.yaml` - Workspace definition
- `turbo.json` - Build pipeline configuration (task dependencies, caching)
- Root `package.json` - Workspace scripts and shared devDependencies

**Building**:
```bash
npm run build                # Builds all packages in correct order
npm run build:packages       # Same as above (alias)
npm run build:react          # Build core + react only
turbo run build              # Direct Turbo invocation
```

### Testing Projects
- `testing-projects/` - Brand-specific demo implementations
  - `aura-finance/` - Finance app demo
  - `nexus-health/` - Health tracking demo
  - `premium-finance/` - Premium finance demo
  - `student-platform/` - Student platform demo
  - `red-demo/` - Red brand demo

### Assets
- `assets/docs.css` - Documentation page styles
- `assets/landing.css` - Landing page specific styles
- `assets/docs-shell.js` - Navigation shell for docs
- `brands/` - Brand-specific CSS overrides (e.g., `red.css`)

## Common Token Reference

### Surfaces (Backgrounds)
- `--surface-base` - Main background (white in light, near-black in dark)
- `--surface-subtle` - Subtle background (gray-50 in light, gray-900 in dark)
- `--surface-layer` - Layered surface (gray-100 in light, gray-800 in dark)
- `--surface-sunken` - Recessed surface (for sidebars)

### Text
- `--text-primary` - Main content text
- `--text-secondary` - Descriptions, labels
- `--text-tertiary` - Captions, hints, disabled
- `--text-brand` - Brand accent text

### Interactive
- `--interactive-primary` - Primary button background
- `--interactive-primary-hover` - Primary button hover state
- `--interactive-primary-text` - Primary button text color
- `--interactive-secondary` - Secondary button background

### Spacing (base unit: 4px)
- `--spacing-1` (4px), `--spacing-2` (8px), `--spacing-3` (12px)
- `--spacing-4` (16px) - Standard component padding
- `--spacing-6` (24px), `--spacing-8` (32px)
- `--spacing-16` (64px), `--spacing-32` (128px)

### Radius
- `--radius-sm` (6px) - Small elements
- `--radius-control` (12px) - The master knob (brand override possible)
- `--radius-container` (16px) - Larger containers
- `--radius-full` (9999px) - Pills/circles

### Typography Scale (Semantic Size Aliases)
- `--font-size-xs` (12px) — captions, small labels
- `--font-size-sm` (13px) — small UI text
- `--font-size-base` (14px) — standard body text
- `--font-size-md` (16px) — comfortable reading
- `--font-size-lg` (18px) — large UI text
- `--font-size-xl` (20px) — emphasis text
- `--font-size-2xl` (24px) — headings
- `--font-size-3xl` (32px) — display text
- `--spacing-14` (56px) — fills gap between spacing-12 (48px) and spacing-16 (64px)

## Tri-Modal Operating System

The system supports three distinct contexts (not yet fully implemented in codebase):

| Mode | Philosophy | Typography | Spacing | Use Case |
|------|-----------|------------|---------|----------|
| **Display** | Atmospheric & Narrative | 80px+ titles | Expansive (64px+) | Marketing pages |
| **Product** | Dense & Functional | 13-14px body | Compact (16px) | SaaS dashboards |
| **App** | Fluid & Tactile | 16px+ body | Adaptable | Touch interfaces |

## Split Layout Contract

For dashboards and split-view layouts:

1. **Unified Margin**: Use `--spacing-4` (16px) margin on all sides
2. **Height Calculation**: `height: calc(100vh - (var(--spacing-4) * 2))`
3. **Zero-Margin Mandate**: Reset internal margins when using padded shells

Example:
```html
<div class="app-shell" style="padding: var(--spacing-4); gap: var(--spacing-4);">
  <aside class="sidebar" style="height: calc(100vh - 32px); margin: 0;"></aside>
  <main class="content" style="height: calc(100vh - 32px);"></main>
</div>
```

## Icon System

Default: **Lucide Icons** via CDN (`https://unpkg.com/lucide@latest`)

Usage:
```html
<i data-lucide="icon-name" class="icon"></i>
<i data-lucide="check-circle" class="icon icon-lg"></i>
```

Initialize after DOM load: `lucide.createIcons();`

## Accessibility Requirements

- All interactive elements must have visible focus states (`:focus-visible`)
- Use proper ARIA attributes (`aria-label`, `aria-pressed`, `role`, `aria-live`)
- Support `prefers-reduced-motion` for animations
- Screen reader utilities: `.sr-only`, `.skip-link`

## Validation & CI/CD

The `validate-tokens.js` script enforces token compliance:
- Detects hardcoded HEX colors, pixel values, font families
- Skips `:root` blocks (where primitives are defined)
- Calculates compliance score
- Exit code 1 if violations found (CI/CD integration ready)

### TypeScript Validation (NEW)

```bash
npm run type-check  # Ensures all TypeScript is valid
npm run validate    # Ensures CSS uses tokens correctly
npm run audit       # Runs both checks
```

### Preview Validation (Storybook/Docs)

The system validates Storybook stories and documentation for consistency:

```bash
npm run validate:previews
```

**What it checks**:
1. ✅ **No duplicate components** - Use `@orion-ds/react`, not recreated components
2. ✅ **No relative imports** - Use package imports (except templates)
3. ✅ **No hardcoded styles** - Use semantic tokens (except demo decorators)
4. ✅ **No style tags** - Use CSS Modules or Orion components

**Acceptable patterns** (not violations):
- **Templates** - Can use relative imports during development (before build)
- **Demo wrappers** - `ToastDemo`, `ModalWrapper`, `InteractiveSearchInput` for Storybook state management
- **Decorator sizing** - `height: '600px'`, `width: '900px'` for viewport simulation
- **Placeholder dimensions** - `width: '32px'` for avatar/logo demos in story examples
- **Icon sizes** - `size={20}` for Lucide icons

**Real violations to fix**:
- `padding: '20px'` → Use `var(--spacing-5)`
- `import { X } from '../../components/X'` → Use `@orion-ds/react` (components/sections only, not templates)
- `const Button = () => <button />` → Use Orion Button instead

**Exit codes**:
- 0 = All valid (or warnings only)
- 1 = Critical violations found (blocks CI/CD)

See [COMPONENT_COMPOSITION.md](./COMPONENT_COMPOSITION.md) for detailed exception patterns.

## Publishing & Release

### Pre-publish Checks
```bash
npm run prepublish:check    # Validates package.json, builds, tests
npm run publish:dry-run     # Simulates npm publish (tests without publishing)
```

### Automated Release (Recommended)
```bash
npm run release:patch       # Bump patch version, build, publish (1.0.0 → 1.0.1)
npm run release:minor       # Bump minor version (1.0.0 → 1.1.0)
npm run release:major       # Bump major version (1.0.0 → 2.0.0)
npm run release:dry         # Test release without publishing
```

**What happens**:
1. Runs validation (`npm run audit`)
2. Bumps version in all workspace package.json files
3. Builds all packages (`npm run build`)
4. Publishes to npm (all packages in `packages/`)
5. Creates git tag and commits version changes

**Release script**: `scripts/release.js`

### Manual Publish (Advanced - packages/react)
```bash
cd packages/react
npm run build
npm publish --access public
```

**⚠️ Never run `npm publish` from root** - The root package is private. Use workspace-specific publish or automated release scripts.

**Registry**: https://registry.npmjs.org/

**Access**: Public packages (@orion-ds scope)

**Published packages**:
- `@orion-ds/react` - Main component library (v3.0.0+ with integrated tokens)
- `@orion-ds/blocks` - Marketing sections & full-page templates
- `@orion-ds/cli` - Component installer
- `@orion-ds/create` - Project scaffolder
- `@orion-ds/mcp` - MCP server for AI agents
- `@orion-ds/validate` - Code validator

## Key Principles for AI Agents

1. **Check system status**: Always read `tokens/ai-manifest.json` FIRST to understand system capabilities
2. **Read documentation**: Then read `AGENTS.md`, `tokens/index.json`, and `tokens/components.json`
3. **TypeScript first**: When available, use TypeScript packages (`@orion/react`, `@orion/vue`) over vanilla HTML
4. **Type safety**: Always import and use TypeScript types from `@orion-ds/react`
5. **Validate after**: Run `npm run validate` and `npm run type-check` after making changes
6. **Brand awareness**: Check `data-brand` attribute and use appropriate tokens
7. **No innovation**: Don't invent components or tokens - use what exists or ask
8. **Semantic intent**: Use semantic tokens that describe purpose, not appearance
9. **External references**: Always run Mapping Protocol when given screenshots or brand references
10. **Generate types**: Run `npm run build:tokens` after editing JSON token files
11. **Update docs after changes**: Follow the Documentation Update Protocol below

## Documentation Update Protocol

When making changes to the codebase, **always update the relevant documentation**. This ensures AI agents and developers have accurate, up-to-date information.

### Which Files to Update

| Change Type | Files to Update |
|-------------|-----------------|
| **Component API change** | `CLAUDE.md`, `packages/react/README.md`, component's JSDoc |
| **New component** | `CLAUDE.md`, `packages/react/README.md`, `tokens/components.json` |
| **Token change** | `CLAUDE.md`, `tokens/*.json`, regenerate types |
| **ThemeProvider change** | `CLAUDE.md` (section 3), `packages/react/README.md` |
| **Build/CLI change** | `CLAUDE.md` (Development Commands section) |
| **New package feature** | Package `README.md`, `CLAUDE.md` if affects usage patterns |
| **Breaking change** | All docs + add to CHANGELOG if exists |

### Documentation Checklist

After any significant change, verify:

1. **CLAUDE.md** - Is the relevant section updated?
2. **Package README** - Does the Quick Start still work?
3. **Code examples** - Do all code snippets reflect current API?
4. **JSDoc comments** - Are function/component docs accurate?
5. **Type definitions** - Do TypeScript types match implementation?

### Example: Publishing a New Version

```bash
# 1. Make your code changes
# 2. Update documentation
# 3. Run validation
npm run type-check
npm run validate

# 4. Bump version in package.json
# 5. Build and publish
cd packages/react
npm run build
npm publish --access public

# 6. Update CLAUDE.md if behavior changed
```

### Self-Documenting Commits

When committing changes that affect documentation:

```bash
git commit -m "feat(react): auto-load fonts in ThemeProvider

- ThemeProvider now includes FontLoader by default
- Added disableAutoFontLoading prop for opt-out
- Updated CLAUDE.md and README with new behavior"
```

## Common Pitfalls

### Vanilla CSS
- Don't use `#000000` or `#ffffff` - use `--text-primary` and `--surface-base`
- Don't hardcode `16px` padding - use `var(--spacing-4)`
- Don't add `font-family: Inter` - it's already set via `--font-sans`
- Don't create `<div class="custom-card-v2">` - use standard `.card` from components.json
- Don't assume brand colors - check `data-brand` and reference `tokens/brands.json`

### TypeScript (NEW)
- Don't use `any` type - always use proper types from `@orion-ds/core`
- Don't skip type generation - run `npm run build:tokens` after editing JSON
- Don't bypass type checking - ensure `npm run type-check` passes
- Don't hardcode token paths - use `TokenPath` and `SemanticTokenPath` types
- Don't forget to import CSS - use `import '@orion-ds/react/styles.css'` (recommended) or separate imports

### Infrastructure & Build Pipeline (Feb 28 2026)
**New infrastructure post-split — respect these patterns:**

- **Don't modify `vite.shared.config.ts` lightly** — changes affect both @orion-ds/react and @orion-ds/blocks. Test with `npm run build:release` after changes.
- **Don't bypass the pre-commit hook** — `git commit --no-verify` skips preview-module validation. Only use if absolutely necessary. Fix issues instead.
- **Don't use `npm run build` for releases** — always use `npm run build:release` (excludes docs-site). The release script automatically uses this.
- **Don't add CSS imports to bundle-styles.js logic** — the script automatically collects all `.module.css` files with `preserveModules: true`. Trust the walking algorithm.
- **Don't change preview-modules without testing** — changes to component APIs must be reflected in `registry/preview-modules/*.tsx`. Pre-commit validation will catch syntax errors, but not API drift. Run Storybook to verify visually.

**Proper workflow:**
```bash
# Making component API changes
1. Update component in packages/react/src/components/ComponentName/
2. Update preview-module in registry/preview-modules/component-name.tsx
3. npm run storybook                              # Verify visually
4. git commit                                     # Pre-commit validates syntax
5. npm run validate:preview-modules               # Optional: explicit check
6. npm run release:dry                            # Optional: test release flow
```

**Release checklist (automated by `npm run release:patch/minor/major`):**
```
✅ npm run audit                    # Type-check, token validation
✅ npm run build:release            # Build 6 packages (no docs-site)
✅ npm publish                      # Publish to npm
```

## Documentation Pages

- `index.html` - Landing page with hero, Chain of Truth explanation, tri-modal overview
- `library.html` - Live component library with code snippets
- `components.html` - Component documentation
- `tokens.html` - Token reference with visual examples
- `rules.html` - Governance rules (rendered from rules.md)
- `examples.html` - Real-world implementation examples
- `TYPESCRIPT_SETUP.md` - Complete TypeScript setup guide (NEW)

## Theme Switching

Themes are controlled via `data-theme` attribute on `<html>`:
```html
<html data-theme="dark" data-brand="orion">
<html data-theme="light" data-brand="red">
```

JavaScript for theme toggle:
```javascript
document.documentElement.dataset.theme = 'dark'; // or 'light'
document.documentElement.dataset.brand = 'red'; // or 'orion'
```

TypeScript with hooks (NEW):
```typescript
// React
import { useTheme } from '@orion/react';
const { setTheme, setBrand } = useTheme();
setTheme('dark');
setBrand('red');
```

```typescript
// Vue
import { useTheme } from '@orion/vue';
const { setTheme, setBrand } = useTheme();
setTheme('dark');
setBrand('red');
```

### Theme Switcher Component (Interactive Testing)

All testing projects include an **interactive Theme Switcher** for quick testing of themes, brands, and modes:

**Location**: Fixed floating panel in bottom-right corner

**Features**:
- 🌙 **Theme Toggle**: Switch between light and dark themes
- 🎨 **Brand Selector**: Choose between orion, red, deepblue, orange
- 📱 **Mode Switcher**: Switch between display, product, app modes
- 💾 **Persistence**: All selections saved to localStorage
- 📱 **Responsive**: Stacks vertically on mobile

**How to Use**:
1. Open any testing project (e.g., `http://localhost:3000/testing-projects/tri-modal-showcase/`)
2. Look for the floating control panel in bottom-right
3. Change theme, brand, or mode
4. Observe CSS updates in real-time
5. Close and reopen page — preferences persist

**Files**:
- `assets/theme-switcher.js` - Main logic
- `assets/theme-switcher.css` - Styling
- `THEME_SWITCHER.md` - Complete documentation

**Programmatic Control** (in browser console):
```javascript
// Access current settings
console.log(document.documentElement.dataset.theme);   // 'light' or 'dark'
console.log(document.documentElement.dataset.brand);   // 'orion', 'red', 'deepblue', 'orange'
console.log(document.documentElement.dataset.mode);    // 'display', 'product', 'app'

// Check localStorage
localStorage.getItem('orion-theme');
localStorage.getItem('orion-brand');
localStorage.getItem('orion-mode');
```
