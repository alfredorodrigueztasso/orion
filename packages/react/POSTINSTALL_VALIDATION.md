# Postinstall Validation Hook

## Overview

When users install `@orion-ds/react`, an automatic postinstall validation script runs to check for common setup issues and provide actionable guidance.

This prevents the #1 support issue: **users install the package but forget to import CSS, resulting in unstyled components**.

## What Gets Checked

### 1. CSS Import (Required)

**Check**: Looks for `import '@orion-ds/react/styles.css'` in common entry files:

- `src/main.tsx` / `src/main.ts`
- `src/index.tsx` / `src/index.ts`
- `app/layout.tsx` (Next.js App Router)
- `pages/_app.tsx` (Next.js Pages Router)
- `src/App.tsx` / `src/App.jsx`

**Result if Missing**:

```
⚠ CSS import not found

Fix: Missing CSS Import

Add this to your app entry file (src/main.tsx, pages/_app.tsx, or app/layout.tsx):

   import '@orion-ds/react/styles.css'

This import includes all design tokens and component styles.
```

**Note**: Users can import either:

- `@orion-ds/react/styles.css` — Full bundle (tokens + components, recommended)
- `@orion-ds/react/theme.css` — Tokens only (for advanced tree-shaking)

Both pass validation.

### 2. ThemeProvider Wrapper (Recommended)

**Check**: Looks for `<ThemeProvider>` or `useThemeContext()` in entry files

**Result if Missing**:

```
⚠ ThemeProvider not found

Fix: Missing ThemeProvider

Wrap your app root with ThemeProvider:

   import { ThemeProvider } from '@orion-ds/react'
   import "@orion-ds/react/styles.css"

   export default function App() {
     return (
       <ThemeProvider>
         <YourApp />
       </ThemeProvider>
     )
   }
```

**Note**: This is recommended but not strictly required. Apps can manually set `data-theme` and `data-brand` on the `<html>` element without ThemeProvider, though theme switching won't work.

### 3. Optional Dependencies

**Check**: If code imports from optional entry points, warns if peer dependencies aren't installed:

| Import                     | Requires     | Warning                                                               |
| -------------------------- | ------------ | --------------------------------------------------------------------- |
| `@orion-ds/react/chart`    | `recharts`   | "Chart component requires recharts. Install: npm install recharts"    |
| `@orion-ds/react/calendar` | `date-fns`   | "Calendar component requires date-fns. Install: npm install date-fns" |
| `@orion-ds/react/dnd`      | `@dnd-kit/*` | "Drag-and-drop component requires @dnd-kit packages..."               |

This prevents cryptic build-time errors when users forget to install optional peer dependencies.

## Output Examples

### Success Case (All Checks Pass)

```
✓ Orion Installation Validation

📦 Package: @orion-ds/react v5.0.0

✓ CSS import found (src/main.tsx)
✓ ThemeProvider found (src/main.tsx)
✓ Optional dependencies: ready

Your app is ready to use Orion! 🎉

Start with: import { Button } from '@orion-ds/react'
```

### Partial Issues

```
✓ Orion Installation Validation

📦 Package: @orion-ds/react v5.0.0

✓ CSS import found (src/main.tsx)
⚠ ThemeProvider not found
✓ Optional dependencies: ready

Action Required

Fix: Missing ThemeProvider
...
```

### With Missing Optional Dependencies

```
⚠ Missing optional dependencies:

   → Chart component requires recharts. Install: npm install recharts
   → Calendar component requires date-fns. Install: npm install date-fns

Install Missing Dependencies:

   npm install recharts
   npm install date-fns
```

## Disabling Validation

For CI/CD pipelines or automated environments where validation output is unwanted, disable with:

```bash
ORION_SKIP_POSTINSTALL=1 npm install @orion-ds/react
```

## Configuration

### In package.json (Auto-Added)

```json
{
  "scripts": {
    "postinstall": "node scripts/validate-install.js"
  }
}
```

This runs automatically after `npm install` or `npm ci`.

## Implementation Details

**File**: `packages/react/scripts/validate-install.js`

**Key Features**:

- ✅ Uses Node.js `fs` and `path` modules (no external dependencies)
- ✅ Idempotent (safe to run multiple times)
- ✅ Performant (< 500ms execution time)
- ✅ Never throws errors (only warnings)
- ✅ Graceful error handling
- ✅ Color-coded output with actionable guidance
- ✅ Works on Node 18, 20, 22+
- ✅ Can be disabled with env var

**What It Does**:

1. Finds project root by walking up from `node_modules` to locate `package.json`
2. Scans common entry files for CSS imports
3. Scans entry files for ThemeProvider usage
4. Parses `package.json` to check optional peer dependencies
5. Scans source files for imports that require optional deps
6. Prints formatted results with fix instructions

**Error Handling**:

- Missing files are silently skipped
- File read errors are caught and ignored
- Script never crashes (errors logged only if `DEBUG_ORION_POSTINSTALL=1`)
- Package root detection is robust (walks up until it finds package.json)

## Testing

Run the test suite:

```bash
cd packages/react
node scripts/test-validate-install.js
```

**Test Coverage**:

- ✅ Complete setup (all checks pass)
- ✅ Missing CSS import
- ✅ Missing ThemeProvider
- ✅ Optional dependencies detection
- ✅ Next.js App Router support
- ✅ Skip validation with env var
- ✅ Graceful error handling
- ✅ Performance (< 500ms)

## Common Questions

### Q: Why do I see warnings if my app is working fine?

A: The warnings are for best practices:

- **CSS import** — While components might work with defaults, tokens are critical for consistent theming and dark mode
- **ThemeProvider** — Apps work without it, but theme switching won't work. Manual setup is more error-prone
- **Optional deps** — Warnings only appear if you import the feature. Cryptic build errors happen later without the package

### Q: Can I disable this for my CI/CD pipeline?

A: Yes, set `ORION_SKIP_POSTINSTALL=1`:

```bash
# In CI/CD
ORION_SKIP_POSTINSTALL=1 npm ci
```

### Q: The script says CSS is missing, but I imported it. Why?

A: The script checks specific common entry files:

- `src/main.tsx`, `src/main.ts`, `src/index.tsx`, `src/index.ts`
- `app/layout.tsx`
- `pages/_app.tsx`
- `src/App.tsx`

If your entry file has a different name, the check won't find it. You can safely ignore the warning if you know you imported CSS elsewhere.

### Q: What if I don't use ThemeProvider?

A: ThemeProvider is recommended but optional. You can:

1. Use ThemeProvider (recommended) — automatic theme/brand switching
2. Manually set `data-theme` on `<html>` — works but no easy switching
3. Use CSS variables directly without theme context — works but less flexible

The validation warns about best practices; it doesn't block installation.

## Future Enhancements

Possible improvements for later versions:

- [ ] Custom entry point detection (user-configurable file list)
- [ ] Detect TypeScript version compatibility
- [ ] Check for conflicting CSS imports (multiple theme systems)
- [ ] Validate brand choices against available brands
- [ ] Suggest using `@orion-ds/cli` for component installation
- [ ] Performance metrics in verbose mode
- [ ] Integration with npm audit for security warnings

## Related Documentation

- [Quick Start Guide](../../GETTING_STARTED.md) — Complete setup walkthrough
- [TypeScript Setup](../../TYPESCRIPT_SETUP.md) — For TypeScript projects
- [CLAUDE.md](../../CLAUDE.md) — Architecture and usage patterns
