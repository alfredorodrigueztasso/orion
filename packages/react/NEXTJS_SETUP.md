# Using @orion-ds/react with Next.js

This guide explains how to set up Orion Design System in Next.js projects with both the **Pages Router** and **App Router**.

## Quick Start (App Router — Recommended)

### 1. Install the package

```bash
npm install @orion-ds/react lucide-react
```

### 2. Import styles in your root layout

```tsx
// app/layout.tsx
import "@orion-ds/react/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 3. Add ThemeProvider with the `/client` entry point

Create a new client component for your providers:

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "@orion-ds/react/client";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

Then wrap your app in the root layout:

```tsx
// app/layout.tsx
import "@orion-ds/react/styles.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

Note the `suppressHydrationWarning` attribute — this is recommended when using theme state that persists to localStorage.

### 4. Use Orion components

In Server Components (the default in App Router), you can import display-only components directly:

```tsx
// app/page.tsx — Server Component
import { Button, Card, Hero } from "@orion-ds/react/client";

export default function Page() {
  return (
    <Hero>
      <Card>
        <h1>Welcome</h1>
        <Button>Get Started</Button>
      </Card>
    </Hero>
  );
}
```

In Client Components (for interactive features), use the `'use client'` directive:

```tsx
// app/components/counter.tsx
"use client";

import { Button } from "@orion-ds/react/client";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return <Button onClick={() => setCount(count + 1)}>Count: {count}</Button>;
}
```

## Preventing Theme Flash

By default, the theme preference is read from localStorage **after hydration** (to prevent hydration mismatches in SSR). This means users with a stored theme preference will briefly see the default light theme before it switches.

To prevent this flash, add a blocking inline script in your `<head>`:

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('orion-theme');
                  const brand = localStorage.getItem('orion-brand');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                  if (brand) {
                    document.documentElement.setAttribute('data-brand', brand);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

This script runs **synchronously before React hydrates**, so the correct theme attributes are already on `<html>` when CSS loads. No flash.

## Importing from `/client` vs `/`

The main entry point (`@orion-ds/react`) contains all components, hooks, and utilities. The `/client` entry point is identical in content but marked with `'use client'`:

```tsx
// Both import the same components, but /client is explicitly marked for RSC
import { Button } from "@orion-ds/react"; // Works everywhere
import { Button } from "@orion-ds/react/client"; // Explicitly marks RSC boundary
```

**Recommendation**: Use `/client` in your provider files and client components for clarity. The `'use client'` directive propagates to all re-exports, making your intent explicit to the framework.

## Pages Router Setup

For Next.js **Pages Router** (older projects):

### 1. Install styles

Create a custom `_app.tsx`:

```tsx
// pages/_app.tsx
import "@orion-ds/react/styles.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@orion-ds/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### 2. Use components normally

```tsx
// pages/index.tsx
import { Button, Hero } from "@orion-ds/react";

export default function Home() {
  return (
    <Hero>
      <Button>Click me</Button>
    </Hero>
  );
}
```

Pages Router doesn't have RSC boundaries, so you don't need to use the `/client` entry point.

## Vite / Create React App Setup

For non-Next.js projects (Vite, Create React App, etc.):

### 1. Install

```bash
npm install @orion-ds/react lucide-react
```

### 2. Set up in your main app file

```tsx
// main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "@orion-ds/react/styles.css";
import { ThemeProvider } from "@orion-ds/react";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
```

### 3. Use components

```tsx
import { Button, Card } from "@orion-ds/react";

export default function App() {
  return (
    <Card>
      <Button>Hello Orion</Button>
    </Card>
  );
}
```

No SSR concerns, so use the main entry point directly.

## TypeScript

All Orion components are fully typed. Your IDE will provide autocomplete and type checking automatically:

```tsx
import { Button, type ButtonProps } from "@orion-ds/react/client";

// You can use props with type safety
const config: ButtonProps = {
  variant: "primary",
  size: "lg",
  disabled: false,
};

export function MyButton() {
  return <Button {...config}>Click</Button>;
}
```

## Troubleshooting

### "Hydration mismatch" errors in console

These are expected if you're using theme/brand persistence without the blocking script. Either:

1. Add the blocking script (recommended), or
2. Remove localStorage persistence: `<ThemeProvider disableAutoFontLoading>...</ThemeProvider>`

(Note: `disableAutoFontLoading` is for fonts; there's no explicit way to disable localStorage reading, but you can manually reset state in a useEffect if needed.)

### Blank/unstyled components

Check that you've imported the CSS:

```tsx
import "@orion-ds/react/styles.css"; // Required!
```

This single import includes all design tokens, component styles, and theme support.

### "Cannot find module '@orion-ds/react/client'"

Your build step may not have run yet. Try:

```bash
npm install
npm run build  # if your package has a build script
```

If you're in a monorepo, ensure the `@orion-ds/react` package has been built:

```bash
npm run build:packages
```

### Theme not switching

Ensure `ThemeProvider` wraps your app. The theme state is managed via React Context, so it must be a ancestor of all components that use `useTheme()` or `ThemeController`.

Also check that you're using `useTheme()` or `useThemeContext()` correctly:

```tsx
"use client";

import { useThemeContext } from "@orion-ds/react/client";

export function ThemeSwitcher() {
  const { theme, setTheme } = useThemeContext();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}
```

## FAQ

**Q: Do I need to use `/client` or can I import from the main package?**

A: Either works. The `/client` entry is explicitly marked with `'use client'` for clarity in RSC environments. Use it for consistency with modern Next.js patterns.

**Q: Can I use Orion components in Server Components?**

A: Yes, as long as they don't use hooks or event handlers. Display-only components like `Card`, `Button`, and `Hero` work in Server Components because they have no browser-API dependencies. The `/client` directive in our re-export just marks the module boundary; it doesn't prevent usage in Server Components.

**Q: How do I change the theme programmatically?**

A: Use the `useThemeContext()` hook inside a Client Component:

```tsx
"use client";

import { useThemeContext } from "@orion-ds/react/client";

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
```

**Q: What's the difference between `useTheme()` and `useThemeContext()`?**

A: `useTheme()` is a standalone hook that works without `ThemeProvider`. `useThemeContext()` requires `ThemeProvider` but gives you access to the full context. Unless you have a specific reason to use standalone mode, use `useThemeContext()` inside `<ThemeProvider>`.

**Q: Can I use Orion with another CSS library like Tailwind?**

A: Yes, but note that Orion uses **CSS custom properties (variables)** exclusively, not Tailwind classes. Mixing them works fine:

```tsx
<div className="flex gap-4">
  {/* Tailwind classes */}
  <Card>{/* Orion components use CSS vars, not Tailwind */}</Card>
</div>
```

Avoid using Tailwind's `space-y-*` utilities with Orion components, as they add margins to children which conflicts with component internal spacing. Use `gap-*` in flexbox/grid containers instead.
