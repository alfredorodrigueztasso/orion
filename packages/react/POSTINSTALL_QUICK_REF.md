# Postinstall Validation — Quick Reference

## What This Is

Automatic validation script that runs when users `npm install @orion-ds/react`.

Warns about 3 common setup issues:

1. **Missing CSS import** — Components appear unstyled
2. **Missing ThemeProvider** — Theme switching won't work
3. **Missing optional dependencies** — Cryptic build errors later

## Output You'll See

### ✅ All Good

```
✓ Orion Installation Validation
📦 Package: @orion-ds/react v5.0.0

✓ CSS import found (src/main.tsx)
✓ ThemeProvider found (src/main.tsx)
✓ Optional dependencies: ready

Your app is ready to use Orion! 🎉
```

### ⚠️ Needs Action

```
✓ Orion Installation Validation
⚠ CSS import not found
⚠ ThemeProvider not found
✓ Optional dependencies: ready

Action Required
[Shows helpful fix instructions...]
```

## How to Fix Issues

### Missing CSS Import

Add to your entry file (`src/main.tsx`, `app/layout.tsx`, etc.):

```typescript
import "@orion-ds/react/styles.css";
```

### Missing ThemeProvider

Wrap your app root:

```typescript
import { ThemeProvider } from '@orion-ds/react'

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}
```

### Missing Optional Dependencies

Install as needed:

```bash
npm install recharts                    # For Chart component
npm install date-fns                    # For Calendar component
npm install react-markdown              # For Rich editor
npm install @dnd-kit/core @dnd-kit/sortable  # For DnD
```

## Disable for CI/CD

```bash
ORION_SKIP_POSTINSTALL=1 npm install
```

## Implementation

| File                                              | Purpose                  |
| ------------------------------------------------- | ------------------------ |
| `packages/react/scripts/validate-install.js`      | Main validation script   |
| `packages/react/scripts/test-validate-install.js` | Test suite               |
| `package.json` → `postinstall`                    | Runs after `npm install` |

## Key Facts

- ✅ Runs automatically after `npm install @orion-ds/react`
- ✅ Never blocks installation
- ✅ Completes in < 500ms
- ✅ Can be disabled with env var
- ✅ Works on Node 18, 20, 22+
- ✅ No external dependencies
- ✅ Zero configuration needed

## Testing

```bash
cd packages/react
node scripts/test-validate-install.js
```

## User-Facing Copy

When explaining to users:

> "Orion includes a postinstall validation script that checks for common setup issues. If you see warnings, follow the action items—they'll help your components render correctly. You can disable with `ORION_SKIP_POSTINSTALL=1 npm install` if needed."
