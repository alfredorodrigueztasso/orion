# Tailwind + Orion Integration Testing Project

This testing project validates that **Tailwind CSS** and **Orion Design System** work seamlessly together with the `@layer orion` CSS cascade fix (v5.6.0+).

## Purpose

The Tailwind + Orion integration testing project serves three purposes:

1. **Validation**: Verify @layer orion is correctly applied to the CSS bundle
2. **Documentation**: Demonstrate proper setup and import order
3. **Regression Prevention**: Catch future breakages in the integration

## What Gets Tested

✅ **@layer orion wrapper** — CSS bundle contains the layer declaration
✅ **CSS variables** — All Orion tokens are accessible and working
✅ **Tailwind utilities** — t-*, gap-*, flex utilities apply correctly
✅ **No specificity conflicts** — Tailwind doesn't override Orion component styles
✅ **Theme switching** — data-theme and data-brand attributes work
✅ **Brand support** — All brands (orion, red, deepblue, orange) render correctly

## File Structure

```
testing-projects/tailwind-integration/
├── README.md                          ← This file
├── package.json                       ← Dependencies
├── tailwind.config.v3.js              ← Tailwind v3 config
├── tailwind.config.v4.js              ← Tailwind v4 config
├── tailwind-integration.test.ts       ← Vitest tests
├── index.html                         ← App HTML
└── src/
    ├── main.tsx                       ← React entry point
    ├── App.tsx                        ← Demo app
    └── styles.css                     ← Proper import order example
```

## Critical: Import Order

The `src/styles.css` file demonstrates the **correct import order** for Tailwind + Orion:

```css
/* 1. Declare @layer orion FIRST */
@layer orion;

/* 2. Import Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 3. Import Orion styles (contains @layer orion { ... } wrapper) */
@import '@orion-ds/react/styles.css';
```

**Why this order matters**:
- Orion styles are in a CSS layer
- Tailwind utilities are unlayered (by default)
- CSS cascade: unlayered > layered (unlayered wins)
- Result: Tailwind utilities automatically override Orion without configuration

## Setup

### Installation

```bash
# From root of monorepo
npm install

# Install testing-project dependencies
cd testing-projects/tailwind-integration
npm install
```

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:5173
```

The app demonstrates:
- Orion components (Button, Card, Stack) rendering correctly
- Tailwind utilities (flex, gap, grid) controlling layout
- No CSS conflicts or specificity issues
- Theme switching (data-theme, data-brand)

### Testing

```bash
# Run integration tests
npm run test

# Or specific test files
npm run test:tailwind-v3
npm run test:tailwind-v4
```

Tests verify:
- ✅ @layer orion is present in bundled CSS
- ✅ CSS variables are accessible
- ✅ Layer semantics are correct
- ✅ theme.css (standalone) has NO layer

## Tailwind Configuration

Two config files are provided for testing different Tailwind versions:

### `tailwind.config.v3.js` (Tailwind v3)

Uses the traditional `@tailwind` directives:

```js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--color-brand-500)',
        'surface-base': 'var(--surface-base)',
        // ... more mappings
      },
    },
  },
};
```

### `tailwind.config.v4.js` (Tailwind v4)

Uses the new `@import 'tailwindcss'` syntax:

```js
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'var(--color-brand-500)',
        // ... same mappings
      },
    },
  },
};
```

**To test Tailwind v4**:

```js
// Update src/main.tsx or build config to use tailwind.config.v4.js
// Or update vite.config.ts if using Vite
```

## How @layer orion Works

### The Problem (Before v5.6.0)

```css
/* Orion styles - high specificity */
:global([data-brand="orion"]) .btn {
  background: var(--interactive-primary);  /* specificity: 0,2,0 */
}

/* Tailwind utilities - low specificity */
.p-6 {
  padding: 1.5rem;  /* specificity: 0,1,0 */
}
```

Result: Orion wins because `0,2,0 > 0,1,0` — Tailwind utilities don't apply to Orion components.

### The Solution (v5.6.0+)

```css
@layer orion {
  /* Orion styles - now in a layer */
  :global([data-brand="orion"]) .btn {
    background: var(--interactive-primary);
  }
}

/* Tailwind utilities - unlayered (by default) */
.p-6 {
  padding: 1.5rem;
}
```

Result: Due to CSS cascade layer semantics, unlayered styles (Tailwind) automatically win over layered styles (Orion) regardless of specificity.

**Reference**: [MDN: CSS Cascade Layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

## Validation Results

Run this to verify the integration:

```bash
# Check that styles.css has @layer orion
grep -n "@layer orion" ../../packages/react/dist/styles.css
# Output: 1:@layer orion {

# Check that theme.css does NOT have @layer (for tree-shaking users)
grep "@layer orion" ../../packages/react/dist/theme.css
# Output: (empty)

# Run tests
npm run test
# Output: All tests passing ✓
```

## Troubleshooting

### Issue: Tailwind utilities don't work with Orion components

**Cause**: Import order is wrong or @layer orion not in CSS bundle

**Fix**:
1. Verify `src/styles.css` import order (see Critical section above)
2. Confirm `npm run build:react` was run (creates dist/styles.css)
3. Check that dist/styles.css contains `@layer orion {`

### Issue: Tests fail with "styles.css not found"

**Cause**: Build hasn't been run yet

**Fix**:
```bash
npm run build:react    # From root
npm run test           # Try again
```

### Issue: Styling looks broken or unstyled

**Cause**: CSS import failing or browser doesn't support @layer

**Fix**:
1. Check browser support (Chrome 99+, Firefox 97+, Safari 15.4+)
2. Open DevTools → Styles tab
3. Search for `--surface-base` to verify CSS variables are loaded
4. Check console for import errors

## Browser Support

`@layer` CSS Cascade Layers support:
- ✅ Chrome 99+
- ✅ Edge 99+
- ✅ Firefox 97+
- ✅ Safari 15.4+
- ✅ Mobile (iOS Safari 15.4+, Chrome Mobile)

For older browsers, use the **Tailwind prefix** workaround instead:

```js
// tailwind.config.js
module.exports = {
  prefix: 'tw-',  // All utilities become tw-p-6, tw-gap-4, etc.
  // ...
};
```

See [TAILWIND_INTEGRATION.md](../../packages/react/TAILWIND_INTEGRATION.md) for complete guide.

## Next Steps

After validating this integration project:

1. **Run the tests**: `npm run test`
2. **Check the demo**: `npm run dev` and visit http://localhost:5173
3. **Review the code**: Compare `src/styles.css` with your own project
4. **Update your project**: Use the same import order in your app's CSS

## Documentation

- [TAILWIND_INTEGRATION.md](../../packages/react/TAILWIND_INTEGRATION.md) — Complete setup guide
- [COMPATIBILITY.md](../../packages/react/COMPATIBILITY.md) — Troubleshooting
- [BUNDLE_STYLES.md](../../packages/react/scripts/BUNDLE_STYLES.md) — How bundle-styles.js works

## Related

- **Orion v5.6.0+**: @layer orion implementation
- **Orion v5.5.x**: Workarounds (documentation only, no @layer)
- **Future (v5.7.0)**: Official Tailwind preset auto-generation

---

**Last updated**: March 26, 2026
**Status**: ✅ Opción B implementation (manual @layer wrapper in bundle-styles.js)
