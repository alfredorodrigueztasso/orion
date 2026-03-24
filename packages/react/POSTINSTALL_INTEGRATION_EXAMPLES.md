# Postinstall Validation — Integration Examples

This document shows how the postinstall validation script works with different project setups.

## Example 1: React + Vite (TypeScript)

**Project Structure**:

```
my-app/
├── src/
│   ├── main.tsx         ← Entry point
│   ├── App.tsx
│   └── components/
├── package.json
└── vite.config.ts
```

**Initial Setup** (before fixing):

```typescript
// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Validation Output**:

```
✓ Orion Installation Validation
📦 Package: @orion-ds/react v5.0.0

✓ CSS import found (src/main.tsx)       ← ❌ Would show warning
⚠ ThemeProvider not found
✓ Optional dependencies: ready

Action Required

Fix: Missing CSS Import
...

Fix: Missing ThemeProvider
...
```

**After Fixing**:

```typescript
// src/main.tsx
import '@orion-ds/react/styles.css'      // ← ADD THIS
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@orion-ds/react'  // ← ADD THIS
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>                      {/* ← WRAP WITH THIS */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
```

**Validation Output After Fix**:

```
✓ Orion Installation Validation
📦 Package: @orion-ds/react v5.0.0

✓ CSS import found (src/main.tsx)
✓ ThemeProvider found (src/main.tsx)
✓ Optional dependencies: ready

Your app is ready to use Orion! 🎉

Start with: import { Button } from '@orion-ds/react'
```

---

## Example 2: Next.js App Router (TypeScript)

**Project Structure**:

```
my-nextjs-app/
├── app/
│   ├── layout.tsx        ← Entry point
│   ├── page.tsx
│   └── components/
├── package.json
└── next.config.js
```

**Initial Setup**:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: 'My App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Validation Output**:

```
✓ Orion Installation Validation
⚠ CSS import not found
⚠ ThemeProvider not found
✓ Optional dependencies: ready

Action Required

Fix: Missing CSS Import
...

Fix: Missing ThemeProvider
...
```

**After Fixing**:

```typescript
// app/layout.tsx
import '@orion-ds/react/styles.css'      // ← ADD THIS
import { ThemeProvider } from '@orion-ds/react'  // ← ADD THIS
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>                  {/* ← WRAP WITH THIS */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**Validation Output After Fix**:

```
✓ Orion Installation Validation
📦 Package: @orion-ds/react v5.0.0

✓ CSS import found (app/layout.tsx)
✓ ThemeProvider found (app/layout.tsx)
✓ Optional dependencies: ready

Your app is ready to use Orion! 🎉
```

---

## Example 3: Next.js Pages Router (JavaScript)

**Project Structure**:

```
my-nextjs-app/
├── pages/
│   ├── _app.jsx          ← Entry point
│   ├── _document.jsx
│   └── index.jsx
├── package.json
└── next.config.js
```

**Initial Setup**:

```javascript
// pages/_app.jsx
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

**After Fixing**:

```javascript
// pages/_app.jsx
import "@orion-ds/react/styles.css"; // ← ADD THIS
import { ThemeProvider } from "@orion-ds/react"; // ← ADD THIS

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      {" "}
      {/* ← WRAP WITH THIS */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

---

## Example 4: Using Optional Dependencies

**Project Using Charts**:

```typescript
// src/components/Dashboard.tsx
import { LineChart } from '@orion-ds/react/chart'

export function Dashboard() {
  return (
    <LineChart
      data={[
        { name: 'Jan', value: 100 },
        { name: 'Feb', value: 120 },
      ]}
    />
  )
}
```

**First Install** (`npm install @orion-ds/react`):

```
✓ Orion Installation Validation
✓ CSS import found
✓ ThemeProvider found
⚠ Missing optional dependencies:

   → Chart component requires recharts. Install: npm install recharts

Install Missing Dependencies:

   npm install recharts

Learn more: https://github.com/orion-ds/orion#quick-start
```

**After Fixing** (`npm install recharts`):

```bash
npm install recharts
```

Next install/`npm install` will show:

```
✓ Orion Installation Validation
✓ CSS import found
✓ ThemeProvider found
✓ Optional dependencies: ready

Your app is ready to use Orion! 🎉
```

---

## Example 5: Disabling in CI/CD

**GitHub Actions**:

```yaml
# .github/workflows/build.yml
name: Build

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        env:
          ORION_SKIP_POSTINSTALL: "1" # ← DISABLE VALIDATION
        run: npm ci

      - name: Build
        run: npm run build
```

**Docker**:

```dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./

# Skip postinstall validation in Docker builds
RUN ORION_SKIP_POSTINSTALL=1 npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
```

**Explanation**: Disabling validation in CI/CD prevents:

- Output noise in logs
- Unnecessary file scanning
- Distraction from actual build output

Users still get validation when installing locally.

---

## Example 6: With Multiple Optional Dependencies

**Using Charts + Calendar + Rich Editor**:

```typescript
// src/components/Dashboard.tsx
import { LineChart } from "@orion-ds/react/chart";
import { Calendar } from "@orion-ds/react/calendar";
```

**Initial Install**:

```
⚠ Missing optional dependencies:

   → Chart component requires recharts. Install: npm install recharts
   → Calendar component requires date-fns. Install: npm install date-fns
   → Rich editor requires react-markdown. Install: npm install react-markdown

Install Missing Dependencies:

   npm install recharts
   npm install date-fns
   npm install react-markdown
```

**After Installing**:

```bash
npm install recharts date-fns react-markdown
```

Next install shows:

```
✓ Optional dependencies: ready
```

---

## Example 7: Entry File in Non-Standard Location

**Edge Case**: Entry file in unusual location

```
my-app/
├── src/
│   ├── bootstrap.ts     ← Entry point (non-standard name)
│   ├── App.tsx
│   └── components/
├── package.json
└── vite.config.ts
```

**Validation Output**:

```
⚠ CSS import not found
⚠ ThemeProvider not found

(Script checks standard entry points, misses src/bootstrap.ts)
```

**Action**: You can safely ignore warnings if you know CSS is imported elsewhere:

```typescript
// src/bootstrap.ts
import "@orion-ds/react/styles.css"; // This is fine, script just can't find it
import { ThemeProvider } from "@orion-ds/react";

// Your app is actually fine
```

**Future**: Script could accept custom entry points via config file (not yet implemented).

---

## Validation Rules Summary

**CSS Import Check**:

- Looks in: `src/main.tsx`, `src/main.ts`, `src/index.tsx`, `src/index.ts`, `app/layout.tsx`, `pages/_app.tsx`, `src/App.tsx`
- Accepts: `@orion-ds/react/styles.css` OR `@orion-ds/react/theme.css`
- Requirement: **Strongly recommended** (components won't have tokens without it)

**ThemeProvider Check**:

- Looks in: Same entry points as CSS check
- Detects: `<ThemeProvider>` wrapper OR `useThemeContext()` usage
- Requirement: **Recommended** (theme switching won't work without it)

**Optional Dependencies Check**:

- Scans: Source files for imports from `@orion-ds/react/chart`, `/calendar`, `/rich`, `/dnd`
- Checks: `package.json` dependencies list
- Requirement: **Only if using those features**

---

## Testing the Script

Create a test project and verify validation works:

```bash
# Create temp test project
mkdir test-orion && cd test-orion
npm init -y

# Install (validation should warn about missing setup)
npm install ../orion/packages/react

# Should show warnings about CSS and ThemeProvider

# Now add setup to package.json
echo 'import "@orion-ds/react/styles.css"' > src/main.tsx
echo 'import { ThemeProvider } from "@orion-ds/react"' >> src/main.tsx

# Reinstall (validation should pass)
npm install

# Should show "Your app is ready to use Orion!"
```

---

## Common Issues

| Issue                                      | Cause                                  | Solution                                             |
| ------------------------------------------ | -------------------------------------- | ---------------------------------------------------- |
| Warnings persist after fixing              | Entry file in non-standard location    | Ignore if you know setup is correct                  |
| `ORION_SKIP_POSTINSTALL` not working       | Env var set incorrectly                | Use `ORION_SKIP_POSTINSTALL=1` (not `true` or `yes`) |
| Script hangs                               | Very large project with many files     | Should complete in < 500ms; report if longer         |
| Missing optional dep warning not appearing | Optional feature not actually imported | Warnings only appear for used features               |

---

## See Also

- [POSTINSTALL_VALIDATION.md](./POSTINSTALL_VALIDATION.md) — Technical details
- [POSTINSTALL_QUICK_REF.md](./POSTINSTALL_QUICK_REF.md) — Quick reference
- [GETTING_STARTED.md](../../GETTING_STARTED.md) — Full setup guide
