# Tailwind CSS Integration Guide

Orion Design System works seamlessly with Tailwind CSS. This guide covers setup, workarounds, and best practices for projects combining both frameworks.

---

## The Problem: Why Orion + Tailwind Conflict

Without explicit configuration, Orion component styles and Tailwind utilities compete for specificity:

- **Orion uses** `:global([data-brand])` and `:global([data-theme])` selectors with specificity `0,2,0`
- **Tailwind utilities** have specificity `0,1,0` (single class)
- **Result**: Orion wins by default, and Tailwind utilities don't apply to Orion components

Example:

```tsx
// ❌ This doesn't work (Orion wins):
<Button className="p-6 gap-4">Click me</Button>
// The p-6 and gap-4 utilities are ignored
```

---

## Quick Wins (Use These Today)

### Workaround #1: Declare `@layer orion` (Recommended)

Add this to your global CSS **before** importing Tailwind:

```css
/* globals.css or your main CSS file */

/* Declare the 'orion' layer before Tailwind styles load */
@layer orion;

/* Then import Tailwind */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Then import Orion */
@import "@orion-ds/react/styles.css";
```

**Why it works**: Tailwind utilities (which are unlayered by default) automatically win over the `orion` layer. This is a pure CSS cascade solution—no code changes needed.

**Works in**: Tailwind v3 and v4

**Browser support**: Chrome 99+, Firefox 97+, Safari 15.4+ (requires `@layer` support)

---

### Workaround #2: Add Tailwind Prefix (100% Effective)

If you want zero risk of conflicts, add a prefix to all Tailwind utilities:

```js
// tailwind.config.js or tailwind.config.mjs
module.exports = {
  prefix: "tw-",
  theme: {
    /* ... */
  },
};
```

Now all Tailwind utilities are namespaced: `tw-p-6`, `tw-gap-4`, `tw-flex`, etc.

```tsx
// ✅ This works (no conflict):
<Button className="tw-p-6 tw-gap-4">Click me</Button>
```

**Trade-off**: Longer class names, but 100% guarantee of no conflicts.

---

## Official Configuration Template

While we work on built-in `@layer orion` support (coming in v5.6.0+), use this `tailwind.config.js` to map Tailwind keys to Orion CSS variables:

```js
// tailwind.config.js or tailwind.config.mjs
module.exports = {
  theme: {
    extend: {
      // Map Tailwind color utilities to Orion tokens
      colors: {
        // Brand colors
        brand: "var(--color-brand-500)",
        "brand-400": "var(--color-brand-400)",
        "brand-600": "var(--color-brand-600)",

        // Surface colors
        "surface-base": "var(--surface-base)",
        "surface-subtle": "var(--surface-subtle)",
        "surface-layer": "var(--surface-layer)",
        "surface-sunken": "var(--surface-sunken)",

        // Text colors
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-brand": "var(--text-brand)",

        // Interactive colors
        "interactive-primary": "var(--interactive-primary)",
        "interactive-secondary": "var(--interactive-secondary)",
      },

      // Map spacing utilities to Orion spacing scale
      spacing: {
        "orion-0": "var(--spacing-0)", // 0px
        "orion-1": "var(--spacing-1)", // 4px
        "orion-2": "var(--spacing-2)", // 8px
        "orion-3": "var(--spacing-3)", // 12px
        "orion-4": "var(--spacing-4)", // 16px
        "orion-5": "var(--spacing-5)", // 20px
        "orion-6": "var(--spacing-6)", // 24px
        "orion-7": "var(--spacing-7)", // 28px
        "orion-8": "var(--spacing-8)", // 32px
        "orion-9": "var(--spacing-9)", // 36px
        "orion-10": "var(--spacing-10)", // 40px
        "orion-12": "var(--spacing-12)", // 48px
        "orion-16": "var(--spacing-16)", // 64px
        "orion-20": "var(--spacing-20)", // 80px
        "orion-24": "var(--spacing-24)", // 96px
      },

      // Map border-radius utilities to Orion tokens
      borderRadius: {
        control: "var(--radius-control)",
        container: "var(--radius-container)",
      },
    },
  },
};
```

**Usage**:

```tsx
// Tailwind utilities mapped to Orion tokens
<div className="p-orion-4 gap-orion-6 rounded-control bg-surface-base">
  <Button>Click me</Button>
</div>
```

---

## The Coexistence Zone

The best way to use Orion + Tailwind is to divide responsibilities:

| Layer          | Tool                                      | Use for                                                   |
| -------------- | ----------------------------------------- | --------------------------------------------------------- |
| **Layout**     | Tailwind (`flex`, `grid`, `gap-*`, `p-*`) | Spacing between components, grid systems, flexbox layouts |
| **Components** | Orion (`<Button>`, `<Card>`, `<Modal>`)   | Interactive elements, forms, modals, cards                |
| **Theme**      | Orion (via CSS variables)                 | Colors, fonts, brand switching, dark mode                 |

**Example: Right way to combine them**

```tsx
import { Button, Card } from "@orion-ds/react";

export default function Dashboard() {
  return (
    // Tailwind for layout
    <div className="flex gap-4 p-6">
      {/* Orion for components */}
      <Card title="Analytics">
        <Button variant="primary">View Details</Button>
      </Card>
      <Card title="Settings">
        <Button variant="secondary">Configure</Button>
      </Card>
    </div>
  );
}
```

---

## Framework-Specific Setup

### Next.js + Tailwind + Orion

**Step 1**: Configure Tailwind in `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ... */
    },
  },
  plugins: [],
};
```

**Step 2**: Configure globals in `app/globals.css` (App Router) or `pages/_app.tsx` (Pages Router)

```css
/* app/globals.css */

/* Declare @layer orion BEFORE Tailwind */
@layer orion;

/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Orion styles */
@import "@orion-ds/react/styles.css";
```

**Step 3**: Wrap your app with ThemeProvider

```tsx
// app/layout.tsx
import { ThemeProvider } from "@orion-ds/react";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

**Result**: Full coexistence of Tailwind + Orion ✅

---

### Vite + React + Tailwind + Orion

**Step 1**: Install dependencies

```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Step 2**: Configure `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* ... */
    },
  },
  plugins: [],
};
```

**Step 3**: Configure CSS in `src/index.css`

```css
@layer orion;
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@orion-ds/react/styles.css";
```

**Step 4**: Wrap app with ThemeProvider

```tsx
// src/App.tsx
import { ThemeProvider } from "@orion-ds/react";

export default function App() {
  return <ThemeProvider>{/* Your app */}</ThemeProvider>;
}
```

---

## Tailwind v3 vs v4

### Tailwind v3

- Uses `@tailwind base; @tailwind components; @tailwind utilities;`
- Layers work as described in this guide
- The `@layer orion;` workaround works out of the box

### Tailwind v4

- Uses `@import "tailwindcss";` (all-in-one import)
- Layers are handled differently
- **Recommendation**: Still use `@layer orion;` but place it **before** the Tailwind import:

```css
/* Tailwind v4 setup */
@layer orion;
@import "tailwindcss";
@import "@orion-ds/react/styles.css";
```

If you're on Tailwind v4 and encounter issues, see [Tailwind v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide).

---

## Browser Support

The `@layer` workaround requires modern browser support:

| Browser | Min Version |
| ------- | ----------- |
| Chrome  | 99+         |
| Firefox | 97+         |
| Safari  | 15.4+       |
| Edge    | 99+         |

If you need to support older browsers, use **Workaround #2** (Tailwind prefix) instead, which has zero browser requirements.

---

## Troubleshooting

### "Tailwind utilities aren't applying to Orion components"

**Cause**: Orion's component styles (specificity `0,2,0`) win over Tailwind utilities (specificity `0,1,0`).

**Solution**: Use one of the workarounds above:

1. Add `@layer orion;` to your global CSS (recommended)
2. Add `prefix: 'tw-'` to your Tailwind config

### "Orion colors look wrong when I use Tailwind color utilities"

**Cause**: Tailwind defaults (like `bg-white`, `text-black`) override Orion's theme system.

**Solution**: Only use Orion tokens for colors inside Orion components. Use Tailwind for layout only (spacing, flexbox, grid). See "The Coexistence Zone" above.

### "Tailwind font sizes conflict with Orion"

**Cause**: Orion uses semantic font sizes (`--font-size-sm`, `--font-size-md`). Tailwind's default sizes (`text-sm`, `text-md`) are different values.

**Solution**: Don't apply Tailwind text size utilities inside Orion components. Orion components handle their own typography.

```tsx
// ❌ Wrong
<Button className="text-2xl">Click me</Button>

// ✅ Right
<Button>Click me</Button>  {/* Button handles its own size */}
```

### "Dark mode isn't working"

**Cause**: Missing `<ThemeProvider>` wrapper or CSS not imported.

**Solution**:

1. Wrap your app with `<ThemeProvider>`
2. Import Orion styles: `import '@orion-ds/react/styles.css';`
3. Dark mode is controlled by `<ThemeProvider>` — Tailwind's `darkMode: 'class'` still works

---

## ✅ Now Available (v5.6.0+): Automatic @layer orion Support

Built-in `@layer orion` support is now available in v5.6.0+! This makes Tailwind + Orion coexistence automatic with zero configuration.

**What changed:**

- All Orion styles are now wrapped in `@layer orion { ... }` automatically during build
- No manual `@layer orion;` declaration needed in your CSS anymore
- Tailwind utilities automatically work with Orion components
- Implementation uses zero external dependencies (Opción B approach)

**Upgrade to use it:**

```bash
npm install @orion-ds/react@5.6.0
```

**That's it!** Tailwind utilities will now work seamlessly with Orion components:

```tsx
// ✅ This now works automatically (no @layer config needed!)
<Button className="p-6 gap-4">Click me</Button>
```

**Browser support:** Chrome 99+, Firefox 97+, Safari 15.4+, Edge 99+

For **older browser support**, you can still use **Workaround #2** (Tailwind prefix) from the "Quick Wins" section above.

**See also:** [scripts/BUNDLE_STYLES.md](./scripts/BUNDLE_STYLES.md) for technical details on how the layer is implemented.

---

## Full Example Project

Here's a complete example combining Orion and Tailwind:

```tsx
// app.tsx
import { ThemeProvider, Button, Card, Stack } from "@orion-ds/react";
import "@orion-ds/react/styles.css";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-surface-base p-orion-6">
        <div className="flex gap-orion-4">
          {/* Left sidebar with Tailwind layout */}
          <aside className="w-64 bg-surface-subtle rounded-container p-orion-4">
            <h2 className="text-lg font-bold text-primary mb-orion-4">Menu</h2>
            <Stack gap="sm">
              <Button variant="ghost" className="w-full justify-start">
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Settings
              </Button>
            </Stack>
          </aside>

          {/* Main content with Orion components */}
          <main className="flex-1">
            <div className="grid grid-cols-2 gap-orion-6">
              <Card title="Analytics" footer="Last updated: today">
                <p className="text-secondary mb-orion-4">
                  You have 1,234 active users.
                </p>
                <Button variant="primary">View Report</Button>
              </Card>

              <Card title="Notifications" footer="5 unread">
                <p className="text-secondary mb-orion-4">
                  No urgent notifications.
                </p>
                <Button variant="secondary">Configure</Button>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
```

---

## Need Help?

- 📖 [Orion Design System Docs](https://orion-ds.dev)
- 🎨 [Tailwind CSS Docs](https://tailwindcss.com)
- 💬 [GitHub Issues](https://github.com/alfredorodrigueztasso/orion/issues)
