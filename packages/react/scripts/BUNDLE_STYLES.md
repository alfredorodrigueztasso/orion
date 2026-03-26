# Bundle Styles Script Documentation

## Purpose

`bundle-styles.js` creates the combined CSS bundle (`styles.css`) that includes:

1. Design tokens from `theme.css`
2. Component styles from all `.module.css` files in `dist/components/` and `dist/sections/`

## Critical Feature: @layer orion

**All CSS is wrapped in `@layer orion`** to enable Tailwind CSS compatibility.

### The Problem

Without the layer, there's a CSS specificity conflict:

- Orion component styles: `:global([data-brand])` selectors with specificity `0,2,0`
- Tailwind utilities: single class selectors with specificity `0,1,0`
- Result: Orion wins by default, Tailwind utilities don't apply to Orion components

### The Solution

CSS cascade layers (`@layer`) allow unlayered styles (Tailwind utilities) to automatically win over layered styles (Orion components). This is pure CSS semantics—no configuration needed by users.

```css
@layer orion {
  /* Orion tokens and component styles */
}

/* Tailwind utilities (unlayered) automatically win */
```

**Reference**: [TAILWIND_INTEGRATION.md](../TAILWIND_INTEGRATION.md) for complete Tailwind + Orion guide

## Output Files

### `styles.css` (Main Bundle)

- **Contains**: Theme CSS + Component CSS
- **Wrapped in**: `@layer orion { ... }`
- **Size**: ~500-600 KB (typical)
- **Use**: `import '@orion-ds/react/styles.css';`
- **Tailwind compatible**: ✅ Yes

### `theme.css` (Standalone Tokens)

- **Contains**: Only design tokens (CSS variables)
- **Wrapped in**: No layer
- **Size**: ~228 KB
- **Use**: `import '@orion-ds/react/theme.css';` (advanced tree-shaking)
- **Tailwind compatible**: ✅ Yes

### `blocks.css` (Premium Sections)

- **Contains**: Styles for blocks and templates
- **Wrapped in**: No layer (currently)
- **Size**: Varies
- **Use**: `import '@orion-ds/react/blocks.css';`

## How It Works

### File Collection

The script walks the `dist/` directory tree:

```
dist/
├── components/
│   ├── Button/
│   │   └── Button.module.css ← collected
│   ├── Card/
│   │   └── Card.module.css ← collected
│   └── ...
├── sections/
│   ├── Hero/
│   │   └── Hero.module.css ← collected
│   └── ...
└── blocks/
    └── ... ← collected separately
```

### CSS Inlining

The script inlines `tokens/generated.css` into `theme.css` to prevent broken relative imports in the published bundle:

```javascript
// Before:
@import url('tokens/generated.css');
/* Other CSS variables */

// After:
/* ─── Inlined: tokens/generated.css ─── */
/* All CSS variables from tokens/generated.css */
/* Other CSS variables */
```

### Layer Wrapping

All component CSS is wrapped in a single `@layer orion { ... }` block:

```css
@layer orion {
  /* All theme CSS variables */
  /* All component styles */
}
```

This ensures Tailwind utilities (added by the user) automatically win due to CSS cascade semantics.

## Error Handling

The script uses `readFileSafely()` to handle file I/O errors gracefully:

| Error                          | Behavior                            |
| ------------------------------ | ----------------------------------- |
| **ENOENT** (file not found)    | Log helpful error, exit with code 1 |
| **EACCES** (permission denied) | Log helpful error, exit with code 1 |
| **Generic error**              | Log error message, exit with code 1 |

**Component CSS errors**: If a component CSS file can't be read, the script logs a warning and continues with other files (doesn't fail the build).

## Usage

Run automatically as part of the build:

```bash
npm run build:react    # Calls bundle-styles.js automatically
npm run build          # Builds all packages, including bundle-styles.js
```

Or run directly:

```bash
node scripts/bundle-styles.js
```

## Validation

Verify the layer is present in the output:

```bash
grep -n "@layer orion" dist/styles.css
# Output: 1:@layer orion {

grep -n "@layer orion" dist/theme.css
# Output: (empty - theme.css has no layer)
```

Test with Tailwind:

```css
/* In your app CSS */
@import "@orion-ds/react/styles.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

The utilities will work with Orion components:

```tsx
<Button className="p-6 gap-4">
  {" "}
  {/* Tailwind utilities apply correctly */}
  Click me
</Button>
```

## Troubleshooting

### Issue: Bundle not created

**Cause**: Vite build didn't complete successfully
**Fix**: Run `npm run build:react` to ensure dist/ exists

### Issue: CSS variables not in output

**Cause**: theme.css not found
**Fix**: Ensure `npm run copy:assets` ran during build

### Issue: Component styles missing

**Cause**: No `.module.css` files found
**Fix**: Check that Vite compiled components to dist/components/

### Issue: Tailwind utilities still don't work

**Cause**: styles.css imported AFTER Tailwind utilities
**Fix**: Import styles BEFORE Tailwind:

```css
/* CORRECT */
@import "@orion-ds/react/styles.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```css
/* WRONG - Tailwind wins by default position, then Orion added later */
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@orion-ds/react/styles.css"; /* Too late */
```

## Future Improvements

- [ ] Wrap `blocks.css` in `@layer orion-blocks` (separate layer for blocks)
- [ ] Add CSS minification option
- [ ] Generate source maps for debugging
- [ ] Validate no hardcoded colors or pixels in output
- [ ] Performance metrics (compare bundle size before/after @layer)

## See Also

- [TAILWIND_INTEGRATION.md](../TAILWIND_INTEGRATION.md) — Complete Tailwind + Orion setup
- [COMPATIBILITY.md](../COMPATIBILITY.md) — Troubleshooting guide
- [DEVELOPMENT.md](../../DEVELOPMENT.md) — Development setup
