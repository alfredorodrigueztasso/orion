# Changelog

All notable changes to Orion Design System are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.7.0] — TBD (FUTURE)

### Features

#### Official Tailwind CSS Preset (Paso 3)

**NEW**: `@orion-ds/react/integrations/tailwind` — Official preset for seamless Orion + Tailwind integration.

**What's included:**

- `orionPreset` — JavaScript config object for Tailwind v3
- `v4.css` — CSS `@theme` block for Tailwind v4
- 40+ color tokens (surfaces, text, interactive, borders, status, alerts, gradients)
- 19 spacing values (`orion-0` through `orion-32`)
- 6 border radius tokens (button, container, sm, md, lg, xl)
- 3 font families (primary, secondary, mono)
- 4 backdrop blur values (orion-sm, orion-md, orion-lg, orion-xl)

**All values use CSS variables** — dark mode and brand switching work automatically.

**Usage:**

Tailwind v3:
```ts
import { orionPreset } from '@orion-ds/react/integrations/tailwind';

export default {
  presets: [orionPreset],
  content: ['./src/**/*.{ts,tsx}'],
};
```

Tailwind v4:
```css
@import 'tailwindcss';
@import '@orion-ds/react/integrations/tailwind/v4.css';
```

**Migration**: If you were manually mapping tokens, use the preset instead. See `TAILWIND_INTEGRATION.md` for details.

**Testing**: Added unit tests asserting no hardcoded hex values and all tokens use `var()` format.

### Improvements

- Cleaned up "coming in v5.6.0+" language from `TAILWIND_INTEGRATION.md` (v5.6.0 is now released)
- Added v5.7.0 section to official Tailwind documentation
- Added ESM gate test for new `integrations/tailwind` entry point
- Updated testing project to use official preset instead of manual config

### Zero Breaking Changes

No API changes — purely additive feature. Existing manual configs continue to work.

---

## [5.6.0] — 2026-03-26 (SHIPPED)

### 🎯 Major Release: Tailwind Integration Complete (Paso 2a + 2b + 3)

**CRITICAL FIX**: CSS cascade layers (`@layer orion`) now wrapped around all Orion styles to enable seamless Tailwind CSS coexistence.

#### Problem Solved
- ❌ **Before v5.6.0**: Orion component styles (specificity 0,2,0) overrode Tailwind utilities (0,1,0)
- ✅ **v5.6.0+**: Tailwind utilities automatically win due to CSS cascade layer semantics

#### Implementation (Opción B - Zero Dependencies)
- Modified `packages/react/scripts/bundle-styles.js` to wrap entire CSS bundle in `@layer orion { ... }`
- Added error handling following `readFileSafely` pattern from PRE-005
- No external dependencies (unlike PostCSS plugin approach)
- Better autonomy and sustainability for Orion

#### What Changed
- `packages/react/scripts/bundle-styles.js`: Added @layer orion wrapper (20 lines)
- `packages/react/dist/styles.css`: Now contains `@layer orion { ... }`
- `packages/react/dist/theme.css`: Remains unwrapped (for tree-shaking users)
- `packages/react/scripts/BUNDLE_STYLES.md`: New documentation
- `testing-projects/tailwind-integration/`: New testing project
- `TAILWIND_INTEGRATION.md`: Updated with "now available in v5.6.0"

#### Documentation
- **Architectural principle established**: "Orion should be as autonomous as possible" — no external dependencies
- Added `packages/react/scripts/BUNDLE_STYLES.md` explaining the layer implementation
- Testing project validates @layer orion with Tailwind v3 and v4

#### Browser Support
- ✅ Chrome 99+, Edge 99+, Firefox 97+, Safari 15.4+
- For older browsers: Use Tailwind `prefix: 'tw-'` workaround (v5.5.2 docs)

#### Migration
- **No breaking changes** — CSS behavior improves automatically
- `npm install @orion-ds/react@5.6.0`
- No configuration needed (users can still use workarounds from v5.5.2 if preferred)

#### Testing
- ✅ Vitest integration tests validate @layer orion presence
- ✅ CSS variables accessibility verified
- ✅ Layer semantics validated
- ✅ No regressions in existing components

#### Additional Features in v5.6.0

**Box Component (Paso 2b)**:
- New polymorphic `Box` component for type-safe spacing, surfaces, and radius
- Guarantees design token compliance (no arbitrary pixel values possible)
- 28 unit tests covering padding cascade, backgrounds, polymorphic rendering
- 10 Storybook stories with responsive and dark mode examples
- CSS Module implementation with semantic token references

**Official Tailwind CSS Preset (Paso 3)**:
- New `@orion-ds/react/integrations/tailwind` export with `orionPreset` Config
- 46 color tokens all using CSS variable references for dark mode + brand switching
- 19 spacing values with `orion-` prefix (avoids collision with Tailwind's rem scale)
- 6 borderRadius tokens, 3 fontFamily tokens, 4 backdropBlur tokens
- Separate `v4.css` file for Tailwind v4 static `@theme` block
- 8 unit tests validating CSS variable references only (no hardcoded hex)

### Added
- `@layer orion` wrapper in `styles.css` for CSS cascade layer compliance
- Error handling in bundle-styles.js (`readFileSafely` helper)
- Testing project: `testing-projects/tailwind-integration/` with Vitest tests
- Documentation: `packages/react/scripts/BUNDLE_STYLES.md` (how the bundle works)
- Documentation: Updated `TAILWIND_INTEGRATION.md` with "now available" section

### Changed
- Bundle script now provides detailed logging and error messages
- All component CSS now wrapped in CSS layer (architectural change, no API changes)
- Improved bundle-styles.js code quality and error handling

### Fixed
- **P1 FIX**: Tailwind CSS utilities now work with Orion components (specificity conflict resolved)
- **PRE-EXISTING**: Fixed type-check errors with optional dependencies (date-fns, recharts) by adding to devDependencies

### Improved
- Design System autonomy: Zero external dependencies for @layer implementation
- Tailwind compatibility: Works with Tailwind v3 and v4
- Error messages: Clearer feedback when build issues occur

### Impact (Early User Feedback Response)
This release directly addresses Pawo's Tailwind + Orion adoption blocker:
1. ✅ Utilities now apply correctly (Tailwind p-6, gap-4 work with Orion Button)
2. ✅ No configuration needed (automatic via @layer orion)
3. ✅ Documented workarounds no longer needed (but still supported)
4. 🛣️ Future: Official Tailwind preset (planned v5.7.0)

---

## [5.5.4] — 2026-03-26

### Added
- **Public CHANGELOG.md** — Release notes now publicly visible on GitHub
- **CHANGELOG automation** — GitHub Actions workflow for automated GitHub Releases
- **Release checklist** — 22-gate pre-release validation checklist to prevent future incidents
- **Incident documentation** — Full incident report for v5.3.0 with lessons learned
- **COMPATIBILITY.md** — Troubleshooting guide for common setup issues
- **package.json clarity** — Enhanced README and CLAUDE.md with installation guidance
- **Release process documentation** — RELEASE.md user guide for release workflow

### Fixed
- **Storybook**: Added missing `id` property to Dropdown story items (TypeScript compliance)

### Improved
- Installation documentation now clearly distinguishes between `dependencies` vs `devDependencies`
- v5.3.0 version status now documented with full incident context
- Release process now fully automated via GitHub Actions

### Impact (Early User Feedback Response)
This release addresses friction points reported during early v5.5.2 adoption:
1. ✅ CHANGELOG transparency (was private, now public)
2. ✅ v5.3.0 context (incident documented with prevention measures)
3. ✅ package.json confusion (dependencies guidance clarified)
4. 🛣️ Tailwind compatibility (planned for v5.6.0)

### Migration
- No breaking changes. Update with: `npm install @orion-ds/react@5.5.4`

---

## [5.5.2] — 2026-03-26

### Fixed
- **PRE-005**: Add comprehensive error handling to validate-components.js
  - Wrapped all 13+ `fs.readFileSync()` calls with `readFileSafely()` helper
  - Proper handling of ENOENT, EACCES, and generic file system errors
  - Build system now provides helpful messages instead of cryptic Node.js errors

### Security
- Improved robustness of component validation tool for malformed input files

### Migration
- No breaking changes. Update with: `npm install @orion-ds/react@5.5.2`

---

## [5.5.1] — 2026-03-25

### Fixed
- **DISC-003**: useThemeContext now throws clear errors in development when used outside ThemeProvider
  - Development: Clear error message guiding developers to wrap with `<ThemeProvider>`
  - Production: Returns SSR-safe defaults for compatibility with server-side rendering
  - All 34 ThemeContext tests passing

### Changed
- useThemeContext behavior is now context-aware (dev vs. production)

### Migration
- No breaking changes to component APIs. Update with: `npm install @orion-ds/react@5.5.1`

---

## [5.5.0] — 2026-03-25

### Fixed
- **PRE-003**: CodeEditor test timeout issue (30s+ → 2-3s)
  - Replaced per-test `setTimeout()` timeouts with proper `vi.mock('react-syntax-highlighter')` pattern
  - Mock now intercepts all module imports for consistent behavior
  - Test suite completion: 30+ seconds → 2-3 seconds
- **PRE-006**: Explicit `typeof` checks for optional dependency guards in CodeEditor
  - Improved code clarity for dynamic module detection

### Changed
- Test suite performance improved significantly (10x faster)
- CodeEditor uses standard Vitest mocking patterns

### Migration
- No breaking changes. Update with: `npm install @orion-ds/react@5.5.0`

---

## [5.4.0] — 2026-03-25

### Added
- **PRE-002**: Build-time API drift detection for preview modules
  - New `docs-site/registry-link.json` maps components to preview exports
  - New `npm run build:registry` generates `registry/artifacts/api-manifest.json` manifest
  - Pre-commit hook validates drift with graceful fallback for fresh clones
- Complete ESM spec compliance test fix (PRE-009)

### Changed
- ESM compliance test no longer uses `require()` to test for absence of `require()`
- Now greps compiled `.mjs` output directly
- Pre-commit validation automatically checks 92 preview modules

### Fixed
- Prevented API drift from going undetected until docs-site renders

### Migration
- No breaking changes. Update with: `npm install @orion-ds/react@5.4.0`

---

## [5.3.2] — 2026-03-25

### Fixed
- **PRE-001**: Critical fresh-clone build failure
  - `build:react` now runs `build:tokens` prerequisite before copying assets
  - Ensures CSS variables are generated before components try to import them
- **PRE-007**: ESM validation gate now greps compiled `.mjs` files (not source)
- **PRE-008**: Added `@dnd-kit/utilities` to peerDependencies
- **PRE-009**: ESM compliance test rewritten to validate generated output

### Added
- GitHub Actions CI/CD validation pipeline
- Preventive fixes for build system robustness

### Migration
- Recommended: `npm install @orion-ds/react@5.3.2` (or 5.5.2 for latest)

---

## [5.3.1] — 2026-03-24

### Fixed
- ESM specification compliance tests
- Build pipeline validation

### Migration
- Use v5.3.2 or later instead (this is superseded)

---

## [5.3.0] — 2026-03-24

### ⚠️ DO NOT USE — CRITICAL ISSUES

This release contains three critical issues affecting fresh-clone builds and test execution. All issues are documented in the incident report below.

**Status**: BROKEN (fixed in v5.3.2 same day)
**Recommendation**: Use v5.5.2 or later

**See**: [INCIDENT_V5_3_0_BUILD_FAILURE.md](./.claude/workspace-docs/incidents/INCIDENT_V5_3_0_BUILD_FAILURE.md) for complete incident report

### What Was Added (Features)
- Dynamic token type generation: `generate-types-dynamic.ts` now introspects JSON tokens and auto-generates TypeScript types
- Error handling for missing/malformed token files in `generate-types-dynamic.ts`
- TypeScript validation of generated `types.ts` immediately after creation
- Brand consistency validation between `brands.json` and `primary.json`

### What Was Fixed (Features Only)
- **Critical**: Corrected JSON access paths in `generate-types-dynamic.ts` (removed erroneous `.primitives?.` wrapper from primaryTokens reads)
- Removed `[key: string]: any` from fixed-structure interfaces (`SemanticTokens`, `Primitives`, `ColorPrimitives`)
- Phantom "ember" brand no longer appears in generated types (only 5 real brands: orion, deepblue, red, orange, lemon)

### Issues Discovered During v5.3.0 Testing
- **PRE-001 (CRITICAL)**: Fresh clone builds fail — Build sequencing gap in Turbo pipeline — ✅ Fixed in v5.3.2
- **PRE-003 (MEDIUM)**: CodeEditor tests timeout at 30s+, blocking CI/CD — Missing optional dependency mock — ✅ Fixed in v5.5.0
- **PRE-006 (MEDIUM)**: Incomplete `require()` guards in optional dependency handling — ESM clarity issue — ✅ Fixed in v5.5.0

### Migration
- **⛔ DO NOT MIGRATE TO v5.3.0**
- If already on v5.3.0: `npm install @orion-ds/react@5.5.2` (latest, all fixes)
- If on npm registry: No action needed (pre-built assets work), but upgrade for consistency

## [5.2.0] — 2026-03-24

### Removed
- **BREAKING**: Chat component completely removed from `@orion-ds/react` main export
- Removed `@orion-ds/react/rich` subpath export (Chat previously accessed via this path)
- Removed ChatPageTemplate from templates list

### Added
- `MissingDependencyError` component for graceful handling of optional dependency failures in `@orion-ds/react`
- Postinstall script to validate optional dependencies and guide users on installation

### Fixed
- Postinstall distribution issues (v5.1.9-v5.1.11)

## [5.1.13] — 2026-03-23

### Added
- Chat component deprecated with console warnings
- `CHAT_MIGRATION_GUIDE.md` with migration options and alternatives

### Changed
- Chat functionality moved to deprecation notice (no longer recommended)
- Postinstall script improvements for dependency validation

### Fixed
- Distribution issues from v5.1.9-v5.1.11 postinstall crashes
- Smoke tests validation (27/28 passing in v5.1.13)

---

## Previous Versions

For changes in versions prior to v5.1.13, see `git log` history.

Each release tag corresponds to:
- `@orion-ds/react` npm package version
- Git tag format: `v{major}.{minor}.{patch}`
- All packages in the monorepo (`@orion-ds/blocks`, `@orion-ds/cli`, etc.) versioned together
