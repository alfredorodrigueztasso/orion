# @orion-ds/validate

Validate code against Orion Design System rules. Catches hardcoded values, incorrect prop names, brand prop violations, and other anti-patterns that cause UI hallucination. Designed for both CI pipelines and local development.

## Quick Start

```bash
npx @orion-ds/validate src/
```

## Usage

### CLI

```bash
# Validate a directory
npx @orion-ds/validate src/

# Validate specific files
npx @orion-ds/validate src/App.tsx src/components/

# Validate current directory
npx @orion-ds/validate .

# Show help
npx @orion-ds/validate --help
```

### Programmatic API

```typescript
import { validateCode, validateFiles } from "@orion-ds/validate";

// Validate a single code string
const result = validateCode(code, "MyComponent.tsx");
console.log(result.valid); // true or false
console.log(result.score); // 0-100
console.log(result.errors); // ValidationError[]

// Validate multiple files
const results = validateFiles([
  { path: "src/App.tsx", content: appCode },
  { path: "src/Button.tsx", content: buttonCode },
]);
console.log(results.totalScore); // Average score
console.log(results.summary.totalErrors);
```

## What It Checks

### Errors (block CI, score -15 each)

| Rule                  | What It Catches                                                  | Fix                                                                    |
| --------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `no-hardcoded-colors` | Hex codes (`#FFFFFF`), `rgb()`, `hsl()`                          | Use `var(--surface-base)`, `var(--text-primary)`, etc.                 |
| `no-hardcoded-fonts`  | `font-family: Inter` or any non-`var()` font                     | Use `var(--font-primary)`, `var(--font-secondary)`, `var(--font-mono)` |
| `no-brand-prop`       | `brand=` prop on components                                      | Remove it. Brand is global via `<ThemeProvider>`.                      |
| `no-data-brand`       | `data-brand=` on non-`<html>` elements                           | Remove it. ThemeProvider sets `data-brand` on `<html>` automatically.  |
| `wrong-prop-name`     | AI hallucinations like `leftIcon=`, `loading=`, `type="primary"` | Use Orion prop names: `icon=`, `isLoading=`, `variant="primary"`       |
| `non-existent-token`  | Fake CSS variables like `--font-sans`, `--gradient-primary`      | Use real tokens: `--font-secondary`, `--color-brand-400`               |

### Warnings (informational, score -5 each)

| Rule                  | What It Catches                                                  | Fix                                                        |
| --------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| `no-hardcoded-pixels` | Pixel values like `16px`, `24px` (except `0px`, `1px`, `9999px`) | Use spacing tokens: `var(--spacing-4)`, `var(--spacing-6)` |

### Suggestions (no score penalty)

- Missing CSS import when using `@orion-ds/react`
- Missing `<ThemeProvider>` wrapper

## Wrong Prop Names Detected

These are common AI hallucinations that the validator catches:

| Wrong              | Correct                       |
| ------------------ | ----------------------------- |
| `type="primary"`   | `variant="primary"`           |
| `type="secondary"` | `variant="secondary"`         |
| `type="ghost"`     | `variant="ghost"`             |
| `type="danger"`    | `variant="danger"`            |
| `leftIcon=`        | `icon=`                       |
| `rightIcon=`       | `iconRight=`                  |
| `loading=`         | `isLoading=`                  |
| `color=`           | `variant=`                    |
| `theme=`           | Use `<ThemeProvider>` at root |

## Non-Existent Tokens Detected

| Fake Variable          | Correct Alternative                                       |
| ---------------------- | --------------------------------------------------------- |
| `--font-sans`          | `--font-secondary` (DM Sans)                              |
| `--font-body`          | `--font-secondary` (DM Sans)                              |
| `--brand-accent-vivid` | `--color-brand-400` / `--color-brand-600`                 |
| `--gradient-primary`   | `--color-brand-400` and `--color-brand-600` for gradients |

## Scoring

The validator produces a score from 0 to 100:

- Start at 100
- Each **error** deducts 15 points
- Each **warning** deducts 5 points
- Minimum score is 0

A score of 100 with zero errors means the code is fully Orion-compliant.

## File Types Scanned

The CLI scans these file extensions: `.tsx`, `.ts`, `.jsx`, `.js`, `.css`, `.module.css`

These directories are automatically ignored: `node_modules`, `dist`, `build`, `.next`, `.nuxt`, `.git`

## CI/CD Integration

The CLI exits with code **1** when errors are found, making it suitable for CI pipelines:

```yaml
# GitHub Actions example
- name: Validate Orion compliance
  run: npx @orion-ds/validate src/
```

```json
// package.json
{
  "scripts": {
    "validate:orion": "orion-validate src/"
  }
}
```

## Output Format

The CLI outputs colorized results grouped by file:

```
Orion Validator -- Checking 12 files

src/components/Button.tsx
  error Hardcoded color #FF0000 :14
    -> Use a semantic CSS variable: var(--surface-base), var(--text-primary)
  error brand prop on component -- brand is GLOBAL :22
    -> Remove brand prop. Use <ThemeProvider> at root.

src/styles/card.css
  warn  Hardcoded 16px :8
    -> Use spacing token: var(--spacing-4)

--------------------------------------------------

  FAIL -- Score: 55/100
  2 errors, 1 warnings
  12 files checked
```

## API Reference

### `validateCode(code: string, fileName?: string): ValidationResult`

Validate a single code string.

```typescript
interface ValidationResult {
  valid: boolean; // true if zero errors
  score: number; // 0-100
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[];
}

interface ValidationError {
  rule: string; // Rule identifier (e.g., "no-hardcoded-colors")
  message: string; // Human-readable message
  line?: number; // Line number (1-indexed)
  file?: string; // File path (if provided)
  suggestion: string; // How to fix it
}
```

### `validateFiles(files: Array<{ path: string; content: string }>): AggregateResult`

Validate multiple files and get an aggregated result.

```typescript
interface AggregateResult {
  valid: boolean; // true if zero errors across all files
  totalScore: number; // Average score across all files
  fileResults: Array<{ path: string; result: ValidationResult }>;
  summary: {
    totalErrors: number;
    totalWarnings: number;
    totalSuggestions: number;
  };
}
```

## Development

```bash
# Build
cd packages/validate
npm run build

# Watch mode
npm run dev

# Type check
npm run type-check
```

## License

MIT
