# Migration Guide: Orion v4 → v5

This guide helps you upgrade your Orion project from v4.x to v5.0.0. The upgrade typically takes **30 minutes** for most projects.

---

## What's Changing?

### The Big Picture

Orion v5 consolidates the package ecosystem and improves the developer experience:

| Feature | v4 | v5 |
|---------|----|----|
| **Main package** | `@orion-ds/react` | `@orion-ds/react` (consolidated) |
| **Core package** | `@orion-ds/core` | ❌ **Removed** (merged into react) |
| **TypeScript types** | Manual updates | ✨ **Auto-generated** from tokens |
| **Font loading** | `<FontLoader>` | ✨ **Automatic** via ThemeProvider |
| **CSS imports** | Multiple imports | ✨ **Single import** `styles.css` |
| **MCP server** | ❌ Not included | ✨ **Included** `@orion-ds/mcp` |

---

## Breaking Changes

Read this section carefully. These changes require action in your codebase.

### 1. Removed @orion-ds/core Package

**What changed:** The `@orion-ds/core` package has been merged into `@orion-ds/react`. You no longer need a separate core package.

**What you need to do:**

1. Remove `@orion-ds/core` from `package.json`:

```diff
{
  "dependencies": {
    "@orion-ds/react": "^5.0.0",
-   "@orion-ds/core": "^4.0.0"
  }
}
```

2. Run install:
```bash
npm install
```

3. Update any imports of `@orion-ds/core`:

```diff
- import { Button } from '@orion-ds/core';
+ import { Button } from '@orion-ds/react';

- import type { ButtonProps } from '@orion-ds/core';
+ import type { ButtonProps } from '@orion-ds/react';
```

### 2. Updated CSS Import Path

**What changed:** The recommended CSS import has changed from `@orion-ds/react/theme.css` to `@orion-ds/react/styles.css`.

**What you need to do:**

Update your CSS import in your root layout/app file:

```diff
- import '@orion-ds/react/theme.css';
+ import '@orion-ds/react/styles.css';
```

**Note:** This single import now includes everything:
- ✅ Design tokens (colors, spacing, typography)
- ✅ Component styles
- ✅ Light/dark theme support
- ✅ Brand overrides (orion, red, deepblue, orange)

### 3. ThemeProvider Now Includes Font Loading

**What changed:** Fonts load automatically via `ThemeProvider`. The separate `<FontLoader>` component is no longer needed.

**Before v5:**
```tsx
import { FontLoader, ThemeProvider } from '@orion-ds/react';

export default function App() {
  return (
    <FontLoader>
      <ThemeProvider>
        <YourApp />
      </ThemeProvider>
    </FontLoader>
  );
}
```

**After v5:**
```tsx
import { ThemeProvider } from '@orion-ds/react';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

If you were manually loading fonts via Google Fonts, you can remove that too:

```diff
- <link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet" />
```

Fonts are now loaded automatically.

### 4. TypeScript Types Are Auto-Generated

**What changed:** All TypeScript types are now auto-generated from JSON tokens. This means types always match your design system.

**Before v5:**
- Types were manually maintained
- Risk of drift between tokens and types
- Manual updates when tokens changed

**After v5:**
- Types auto-generated from `tokens/primary.json`, `tokens/light.json`, `tokens/dark.json`
- Types always match your tokens
- No manual type maintenance

**What you need to do:** Nothing! Just update to v5. If you have custom type files, verify they still compile.

---

## Step-by-Step Upgrade

### Step 1: Update package.json

1. Update `@orion-ds/react` to v5:
```bash
npm install @orion-ds/react@latest
```

2. Remove `@orion-ds/core`:
```bash
npm uninstall @orion-ds/core
```

Or edit `package.json` and remove the line, then run `npm install`.

### Step 2: Update Imports

Search your project for any imports from `@orion-ds/core` and change them to `@orion-ds/react`:

```bash
# Find all @orion-ds/core imports
grep -r "@orion-ds/core" src/

# Replace them
find src -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i 's/@orion-ds\/core/@orion-ds\/react/g'
```

Or do it manually:

```tsx
// Before
import { Button } from '@orion-ds/core';
import type { ButtonProps } from '@orion-ds/core';

// After
import { Button } from '@orion-ds/react';
import type { ButtonProps } from '@orion-ds/react';
```

### Step 3: Update CSS Import

Update your root layout/app file to use the new CSS import path:

**React (Vite/CRA):**
```tsx
// main.tsx or index.tsx
import '@orion-ds/react/styles.css';  // ← Update this
import App from './App';
```

**Next.js (App Router):**
```tsx
// app/layout.tsx
import '@orion-ds/react/styles.css';  // ← Update this

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

**Next.js (Pages Router):**
```tsx
// pages/_app.tsx
import '@orion-ds/react/styles.css';  // ← Update this

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Step 4: Remove FontLoader

If you were using `<FontLoader>`, remove it:

```diff
- import { FontLoader, ThemeProvider } from '@orion-ds/react';
+ import { ThemeProvider } from '@orion-ds/react';

- export default function App() {
-   return (
-     <FontLoader>
-       <ThemeProvider>
-         <YourApp />
-       </ThemeProvider>
-     </FontLoader>
-   );
- }

+ export default function App() {
+   return (
+     <ThemeProvider>
+       <YourApp />
+     </ThemeProvider>
+   );
+ }
```

### Step 5: Run Tests

Run your test suite to verify nothing broke:

```bash
npm test
npm run type-check
npm run build
```

If you see TypeScript errors, update `@orion-ds/react` to the latest version:

```bash
npm install @orion-ds/react@latest
```

### Step 6: Remove Manual Font Loads

If you were manually loading Google Fonts in your HTML, remove them:

```diff
- <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
```

Fonts are now loaded automatically by `ThemeProvider`.

---

## New Features in v5

### MCP Server for AI Integration

v5 includes an MCP (Model Context Protocol) server that lets AI agents like Claude Code and Cursor generate Orion-compliant code automatically.

**Setup (optional, 3 steps):**

1. Install:
```bash
npm install @orion-ds/mcp
```

2. Configure in your tool's settings (see tool documentation)

3. Start using AI:
```
"Add a button component"
"Create a responsive card layout"
"Generate form input component"
```

See [AI Integration Guide](/docs/ai-integration) for complete setup.

### Auto-Generated TypeScript Types

All types are now auto-generated from tokens. Benefits:

- 🔄 Types always match tokens
- ✅ No manual type updates needed
- 📦 Better TypeScript support
- 🎨 Autocomplete for token values

Use types as you normally would:

```tsx
import type { ButtonProps, Badge, Card } from '@orion-ds/react';

const MyComponent: React.FC<ButtonProps> = (props) => {
  // Types are auto-generated and always correct
};
```

---

## FAQ

### Q: Do I need to update my components?

**A:** No. Your components will work as-is. Just update the imports and CSS path.

### Q: What about my custom token files?

**A:** If you have custom tokens, they should still work. The auto-generation only affects Orion's built-in types. See [Token Reference](/docs/tokens) for details.

### Q: Can I still use the old @orion-ds/core import path?

**A:** No. @orion-ds/core is no longer published. You must update to @orion-ds/react v5.

### Q: Will my existing v4 components break?

**A:** No. Component APIs haven't changed. Only imports and CSS paths need updating.

### Q: How long does the upgrade take?

**A:** Most projects take 15-30 minutes:
- 5 min: Update package.json
- 10 min: Update imports
- 5 min: Update CSS import
- 5 min: Remove FontLoader
- 5 min: Run tests and verify

### Q: What if I have issues during upgrade?

**A:** Check the [Troubleshooting](/docs/installation#troubleshooting) section or report an issue on [GitHub](https://github.com/orion-ds/orion/issues).

### Q: Can I stay on v4?

**A:** v4 is no longer maintained. We recommend upgrading to v5. The upgrade is quick and low-risk.

### Q: What about the MCP server?

**A:** Optional! The MCP server helps AI agents generate code. If you're not using AI tools, you don't need to install it.

---

## Rollback (If Needed)

If something goes wrong, you can roll back:

1. Restore your `package.json` from git:
```bash
git checkout package.json
npm install
```

2. Revert your code changes:
```bash
git checkout .
```

Then try the upgrade again, or report the issue on [GitHub](https://github.com/orion-ds/orion/issues).

---

## Getting Help

- **[Quick Start Guide](/docs/quick-start)** — Get started in 5 minutes
- **[Installation Guide](/docs/installation)** — Framework-specific setup
- **[Troubleshooting](/docs/installation#troubleshooting)** — Fix common issues
- **[GitHub Issues](https://github.com/orion-ds/orion/issues)** — Report bugs

---

## Summary

**Before you start:**
- ✅ Back up your code (or commit to git)
- ✅ Read this guide
- ✅ Plan for 30 minutes

**The upgrade:**
1. Update `@orion-ds/react` to v5
2. Remove `@orion-ds/core`
3. Update imports from `@orion-ds/core` → `@orion-ds/react`
4. Update CSS import to `@orion-ds/react/styles.css`
5. Remove `<FontLoader>`
6. Run tests

**After the upgrade:**
- ✅ All components work as before
- ✅ Fonts load automatically
- ✅ TypeScript types are auto-generated
- ✅ Optional: Set up MCP for AI integration

Welcome to v5! 🚀
