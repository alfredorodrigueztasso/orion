# @orion-ds/react Compatibility Guide

This document covers common compatibility issues and how to resolve them.

## Installation & Dependencies

### ⚠️ Critical: @orion-ds/react Must Be in `dependencies`

@orion-ds/react is a **runtime UI library** and must be in `dependencies`, not `devDependencies`.

**✅ CORRECT:**

```bash
npm install @orion-ds/react
```

**❌ WRONG (will fail in production):**

```bash
npm install --save-dev @orion-ds/react
```

**Fix if accidentally installed as devDependency:**

```bash
npm uninstall --save-dev @orion-ds/react
npm install @orion-ds/react
```

See [Installation](./README.md#installation) for complete details.

---

## CSS & Styling

### Missing Styles (Unstyled Components)

**Problem**: Components render but have no styling.

**Cause**: CSS import is missing or in the wrong place.

**Solution**: Import styles in your app's entry file:

```tsx
// main.tsx, index.tsx, or App.tsx (wherever your app starts)
import "@orion-ds/react/styles.css"; // Must import before using components
import App from "./App";
```

**Verify styles are loaded:**

1. Open browser DevTools (F12)
2. Go to Elements tab
3. Search for `--surface-base` or any CSS variable
4. If found, styles are loaded ✅

---

### Tailwind CSS Conflicts

**Problem**: Tailwind utilities (gap-_, p-_, m-\*) don't work well with Orion components.

**Why**: Both Orion and Tailwind use CSS classes, and they can conflict.

**Solution**: Use Orion's spacing system instead:

**❌ WRONG:**

```tsx
<Button className="gap-4 p-8 m-2">Click me</Button>
```

**✅ CORRECT:**

```tsx
import { Stack, Button } from '@orion-ds/react';

// Option 1: Use Orion's Stack component
<Stack gap="md">
  <Button>Click me</Button>
</Stack>

// Option 2: Use inline styles with CSS variables
<div style={{ gap: 'var(--spacing-4)', padding: 'var(--spacing-8)' }}>
  <Button>Click me</Button>
</div>
```

**If you must use Tailwind alongside Orion:**

1. **Isolate Tailwind**: Use CSS modules or shadow DOM
2. **Separate zones**: Have Orion-only sections and Tailwind-only sections
3. **Use Tailwind CSS layers**: `@layer components` to avoid conflicts

**See [TAILWIND_INTEGRATION.md](./TAILWIND_INTEGRATION.md) for complete setup guide, workarounds, and best practices.**

---

## React & Framework Compatibility

### React 18 vs React 19

@orion-ds/react supports both React 18 and 19. No changes needed.

```json
{
  "dependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "@orion-ds/react": "^5.5.2"
  }
}
```

---

### Next.js App Router Integration

**Next.js 13+ (App Router) - Recommended:**

```tsx
// app/layout.tsx
import "@orion-ds/react/styles.css";
import { ThemeProvider } from "@orion-ds/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

**Next.js 12 (Pages Router):**

```tsx
// pages/_app.tsx
import "@orion-ds/react/styles.css";
import { ThemeProvider } from "@orion-ds/react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

---

### Vite Setup

```tsx
// src/main.tsx
import "@orion-ds/react/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

---

## TypeScript

### Type Safety

@orion-ds/react is fully typed. TypeScript will catch most issues at compile time.

```tsx
import { Button, type ButtonProps } from "@orion-ds/react";

const MyButton: React.FC<ButtonProps> = (props) => (
  <Button variant="primary" {...props} />
);
```

### Missing Type Definitions

If you see type errors for components that should exist:

1. **Rebuild types**: `npm run build:tokens` (in monorepo)
2. **Check version**: `npm list @orion-ds/react`
3. **Update package**: `npm install @orion-ds/react@latest`

---

## Bundle Size & Tree-Shaking

### Large Bundle Size

**Problem**: Your app bundle is bigger than expected.

**Solution 1: Use granular imports**

```tsx
// ❌ Imports all components
import { Button, Card, Modal, Dropdown /* ... */ } from "@orion-ds/react";

// ✅ Import only what you use
import { Button } from "@orion-ds/react";
import { Card } from "@orion-ds/react";
```

**Solution 2: Use the /client entry point** (Next.js App Router)

```tsx
// ✅ Lighter bundle, excludes optional dependencies
import { Button, Card, Field } from "@orion-ds/react/client";

// ❌ Only import heavy components if needed
import { ChartContainer } from "@orion-ds/react/chart"; // requires recharts
```

**Solution 3: Extract tokens only** (advanced)

```tsx
// ✅ For tree-shaking optimization
import "@orion-ds/react/theme.css"; // Tokens only, ~228 KB
import { Button } from "@orion-ds/react"; // Individual component
```

---

## Theming & Branding

### Theme Not Changing

**Problem**: `setTheme()` or `setBrand()` doesn't update components.

**Cause**: Missing `<ThemeProvider>` wrapper.

**Solution**: Wrap your app with ThemeProvider:

```tsx
import { ThemeProvider, Button } from "@orion-ds/react";

<ThemeProvider>
  <MyApp /> {/* All children get theme updates */}
</ThemeProvider>;
```

### Brand-Specific Styling Not Working

**Problem**: Components don't change appearance when brand changes.

**Solution**: Brand styling is handled by CSS variables. Ensure:

1. ThemeProvider is wrapping the component
2. CSS is imported: `import '@orion-ds/react/styles.css'`
3. Brand is set correctly: `useThemeContext()` shows correct brand

---

## Performance

### Slow Component Rendering

**Problem**: Components render slowly in development.

**Solution 1: Check DevTools**

- Open React DevTools (Chrome/Firefox extension)
- Look for unnecessary re-renders
- Use `React.memo()` for pure components

**Solution 2: Use Suspense for lazy loading**

```tsx
import { Suspense } from "react";
import { Modal } from "@orion-ds/react";

<Suspense fallback={<div>Loading...</div>}>
  <Modal>Content</Modal>
</Suspense>;
```

**Solution 3: Profile with Chrome DevTools**

1. Open DevTools → Performance tab
2. Click record, interact with component, stop
3. Look for long tasks and optimize

---

## Testing

### Testing with Vitest

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@orion-ds/react";

describe("Button", () => {
  it("renders", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

### Testing with React Testing Library

Make sure styles are loaded in your test setup:

```tsx
// vitest.setup.ts
import "@orion-ds/react/styles.css";
```

---

## Browser Support

@orion-ds/react supports:

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (14+)
- ✅ Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/alfredorodrigueztasso/orion/issues)
- **Documentation**: [README.md](./README.md)
- **AI Help**: Use MCP server with Claude, Cursor, Cline
- **Examples**: Check [Storybook](./packages/react/README.md#storybook)

---

**Last updated**: March 26, 2026
