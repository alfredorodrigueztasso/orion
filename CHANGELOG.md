# Changelog

All notable changes to the Orion Design System are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [4.5.0] - 2026-03-15

### ✨ Major: Next.js App Router Compatibility (Breaking Change in @orion-ds/react/client)

**Problem Solved**: Apps using `@orion-ds/react/client` failed to build with Next.js App Router if optional peer dependencies (`recharts`, `date-fns`, `@dnd-kit/*`, `react-markdown`, `react-syntax-highlighter`) weren't installed. Webpack/Turbopack resolved all imports transitively, failing even for apps using only `Button` and `Card`.

### Added
- **5 New Entry Points** for heavy components with optional peer dependencies:
  - `@orion-ds/react/chart` → Chart components (requires `recharts`)
  - `@orion-ds/react/calendar` → Calendar, DatePicker (requires `date-fns`)
  - `@orion-ds/react/editor` → CodeEditor (requires `react-syntax-highlighter`)
  - `@orion-ds/react/dnd` → CollapsibleFolder (requires `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`)
  - `@orion-ds/react/rich` → Chat (requires `react-markdown`, `react-syntax-highlighter`, `remark-gfm`)

- **Export Verification Script** (`scripts/verify-exports.mjs`) → Validates all declared exports exist in dist/ at build time

- **Documentation** → Updated CLAUDE.md with migration guide and usage examples for each heavy component entry point

### Changed
- **⚠️ BREAKING (in @orion-ds/react/client only)**: `/client` entry point now excludes heavy components
  - Removed: Chart, Calendar, DatePicker, CodeEditor, CollapsibleFolder, Chat from `/client` barrel
  - Added: Explicit exports of 60+ lightweight components instead of generic `export * from "./index"`
  - **Impact**: Apps using only Button/Card/Field no longer fail if optional deps aren't installed
  - **Migration**: Import heavy components from their dedicated entry points (see Added section)

- **Expanded peerDependenciesMeta**: Added `@dnd-kit/utilities` as optional peer dependency

### Fixed
- Added missing `"use client"` directives to 4 component files:
  - `ThemeController.tsx` (uses `useThemeContext()` hook)
  - `ChatVoiceRecorder.tsx` (uses `useVoiceRecorder()` hook)
  - `ChatMessages.tsx` (uses `useAutoScroll()` hook)
  - `ChatMarkdown.tsx` (uses `react-markdown` + `remark-gfm`)

### Infrastructure
- **Vite Config**: Added 5 new entry points to build pipeline
- **Build Output**: Each heavy component entry point generates individual `.mjs`, `.cjs`, and `.d.ts` files with `preserveModules: true` for optimal tree-shaking
- **CI/CD**: New export verification script catches broken entry points before release

### Backward Compatibility
- **Main entry (`.`) unaffected**: Still exports all components for users with all deps installed
- **`@orion-ds/react` → Same**: Direct component imports from main package still work
- **Zero breaking changes outside `/client`**: This only affects users explicitly importing from `@orion-ds/react/client` with heavy components

### Migration Examples

**Before (v4.4.0 — Broken in Next.js without heavy deps)**:
```typescript
import { Button, Chart, Calendar } from '@orion-ds/react/client'; // ❌ FAILS
```

**After (v4.5.0 — Flexible)**:
```typescript
// Always works - no deps needed
import { Button, Card, Field } from '@orion-ds/react/client';

// Optional - only if using these components
import { Chart } from '@orion-ds/react/chart';           // npm install recharts
import { Calendar, DatePicker } from '@orion-ds/react/calendar'; // npm install date-fns
import { CodeEditor } from '@orion-ds/react/editor';    // npm install react-syntax-highlighter
import { CollapsibleFolder } from '@orion-ds/react/dnd'; // npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
import { Chat } from '@orion-ds/react/rich';            // npm install react-markdown react-syntax-highlighter remark-gfm
```

---

## [4.2.11] - 2026-03-13

### Fixed
- **FormSection**: Made `title` prop optional (`title?: string`) to support auth flows, modals, and layouts without visible section titles ([#team-feedback](https://example.com))
- **Button**: Added `loadingText?: string` prop to display custom text during loading state instead of hardcoding boilerplate ([#team-feedback](https://example.com))

### Changed
- **FormSection**: Header element now only renders if there is content to display (title, icon, or collapsible toggle). Enables cleaner layouts without unnecessary header dividers.

### Clarified
- **Field**: Confirmed `error?: string` prop has been available since v3.0.0 with full accessibility support (`role="alert"`, `aria-invalid`, auto-inserted error icon). Team feedback indicated this feature was underdocumented in prior versions.

---

## [4.2.10] - 2026-03-13

### Added
- Unit test coverage improvements for Command and CommandBar components
- FormSection and CommandBar branch coverage optimizations

### Fixed
- Command component test reliability in jsdom environment
- CommandBar overlay interaction testing

---

## Earlier Versions

See git history for details on versions prior to 4.2.10.
