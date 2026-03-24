# v5.3.0 Implementation Plan (April 8-12, 2026)
## APPROACH B: Separate Runtime from Type Definitions

**Status**: Ready for Frontend Developer execution
**Duration**: 4.75-5.75 hours across 5 days
**Target Release**: April 15, 2026
**Architect Approval**: ✅ APPROACH B Selected (2026-03-24)

---

## 📋 Executive Summary

**Problem**: Template literal types in `scripts/generate-types-dynamic.ts` fail at ts-node runtime with `ERR_INVALID_TYPESCRIPT_SYNTAX`.

**Solution**: Split execution into two contexts:
1. `generate-types-dynamic.ts` → string generator (never executed)
2. `types.ts` → pure type definitions (TypeScript compiler only)
3. `tokens-runtime.ts` → runtime utilities (new file)

**Impact**: Unblocks type-safe development for v5.3.0 and beyond.

---

## 📅 Day-by-Day Implementation Timeline

### **DAY 1 (April 8) — Setup & APPROACH B Implementation**
**Duration**: 2.5 hours

#### 09:00 - 09:15 (15 min) — Pre-Implementation Checklist
```bash
# Verify current state
git status                    # Should show clean main
git log --oneline -n 5        # Confirm on main branch
npm run build:tokens          # Should fail with ERR_INVALID_TYPESCRIPT_SYNTAX
```

**Checklist**:
- [ ] Main branch is clean
- [ ] Current build fails as expected
- [ ] Have `scripts/generate-types-dynamic.ts` open for editing
- [ ] Have `tokens/primary.json`, `tokens/brands.json` ready as reference

#### 09:15 - 09:30 (15 min) — Create Implementation Branch
```bash
# Create feature branch
git checkout main
git pull origin main
git checkout -b feature/v5.3.0-dynamic-types-fix

# Verify branch created
git branch -v
```

**Expected Output**:
```
* feature/v5.3.0-dynamic-types-fix [new branch]
  main                         [tracked origin/main]
```

#### 09:30 - 11:00 (90 min) — Refactor generate-types-dynamic.ts (APPROACH B)

**Step 1: Backup Original (10 min)**
```bash
# Create backup in case we need to rollback
cp scripts/generate-types-dynamic.ts scripts/generate-types-dynamic.ts.backup
```

**Step 2: Create Helper Function (45 min)**

In `scripts/generate-types-dynamic.ts`, find line 215 where the type template string starts.

Replace the large inline template string (lines 215-638) with a function call:

```typescript
// === BEFORE: Lines 215-638 (large inline template)
const typesContent = `
export type Brand = ...
export type ColorTokenPath = \`color.brand.\${Brand}...
...
`;

// === AFTER: Replace with function
const typesContent = generateTypeDefinitionsString(
  actualBrands,
  typographySizes,
  spacingKeys,
  radiusKeys
);
```

Create the `generateTypeDefinitionsString()` function. Insert this BEFORE the type generation section (around line 210):

```typescript
/**
 * Generate TypeScript type definitions as a string
 * (APPROACH B: String generator - never executes its output)
 *
 * Key Insight: This function RETURNS a string containing template literal syntax.
 * The string is never parsed by ts-node, only written to disk.
 */
function generateTypeDefinitionsString(
  actualBrands: string[],
  typographySizes: string[],
  spacingKeys: string[],
  radiusKeys: string[]
): string {
  // === Generate Brand Union Type ===
  const brandType = actualBrands
    .map(b => `'${b}'`)
    .join(' | ');

  // === Generate Token Path Types (as strings with escaped backticks) ===
  // These CONTAIN template literal syntax when written to types.ts
  // But here they're just STRINGS with escaped backticks

  const colorShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']
    .join(', ');

  const tokenPathTypes = `
export type ColorShades = ${colorShades};
export type NeutralColors = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

export type ColorTokenPath =
  | \\\`color.brand.\\\${Brand}.\\\${keyof ColorShades}\\\`
  | \\\`color.neutral.\\\${keyof NeutralColors}\\\`
  | \\\`color.neutralPure.\\\${keyof NeutralColors}\\\`
  | 'color.error.500'
  | 'color.success.500'
  | 'color.warning.500'
  | 'color.info.500';

export type TypographyTokenPath =
  | \\\`typography.family.\\\${keyof TypographyFamily}\\\`
  | \\\`typography.weight.\\\${keyof TypographyWeight}\\\`
  | \\\`typography.size.\\\${keyof TypographySize}\\\`
  | \\\`typography.lineHeight.\\\${keyof TypographyLineHeight}\\\`;

export type SpacingTokenPath = \\\`spacing.\\\${keyof SpacingPrimitives}\\\`;
export type RadiusTokenPath = \\\`radius.\\\${keyof RadiusPrimitives}\\\`;
export type BlurTokenPath = \\\`blur.\\\${keyof BlurPrimitives}\\\`;
`;

  // === Generate Semantic Token Paths ===
  const semanticTokenPaths = `
export type SemanticTokenPath =
  | \\\`surface.\\\${keyof SurfaceTokens}\\\`
  | \\\`text.\\\${keyof TextTokens}\\\`
  | \\\`interactive.\\\${keyof InteractiveTokens}\\\`;
`;

  // === Generate Full Type Definitions ===
  return `/**
 * Orion Design System - TypeScript Type Definitions
 * DYNAMICALLY GENERATED from JSON token files.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 *
 * Generated: ${new Date().toISOString()}
 */

export type Brand = ${brandType};

// Typography
export type TypographyFamily = ${typographySizes.includes('primary') ? "'primary' | 'secondary' | 'mono'" : "'secondary' | 'mono'"};
export type TypographyWeight = 'normal' | 'bold' | 'light';
export type TypographySize = ${typographySizes.map(s => \`'\${s}'\`).join(' | ')};
export type TypographyLineHeight = '1' | '1.5' | '2' | '2.5';

// Spacing
export type SpacingPrimitives = ${spacingKeys.map(k => \`'\${k}'\`).join(' | ')};

// Radius
export type RadiusPrimitives = ${radiusKeys.map(k => \`'\${k}'\`).join(' | ')};

// Blur
export type BlurPrimitives = '0' | 'xs' | 'sm' | 'md' | 'lg';

// Surface Tokens
export type SurfaceTokens = 'base' | 'subtle' | 'layer' | 'sunken';

// Text Tokens
export type TextTokens = 'primary' | 'secondary' | 'tertiary' | 'brand' | 'inverse';

// Interactive Tokens
export type InteractiveTokens = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';

${tokenPathTypes}

${semanticTokenPaths}

export type SemanticTokenPath =
  | \\\`surface.\\\${SurfaceTokens}\\\`
  | \\\`text.\\\${TextTokens}\\\`
  | \\\`interactive.\\\${InteractiveTokens}\\\`;

export type TokenPath = ColorTokenPath | TypographyTokenPath | SpacingTokenPath | RadiusTokenPath | BlurTokenPath;

export interface Primitives {
  color: Record<string, any>;
  typography: Record<string, any>;
  spacing: Record<string, any>;
  radius: Record<string, any>;
  blur: Record<string, any>;
}

export type Theme = 'light' | 'dark';
`;
}
```

**Step 3: Verify String Content (15 min)**

After refactoring:
```bash
# Run the script to verify it generates types.ts
npm run build:tokens

# Check that types.ts contains template literal syntax (escaped backticks)
grep -n "color.brand" packages/react/src/tokens/types.ts

# Expected output (backticks present):
# export type ColorTokenPath =
#   | `color.brand.${Brand}.${keyof ColorShades}`
```

#### 11:00 - 11:30 (30 min) — Commit: APPROACH B Refactoring
```bash
# Stage changes
git add scripts/generate-types-dynamic.ts

# Commit with clear message
git commit -m "refactor(types): separate type generation from type definitions (APPROACH B)

- Extract generateTypeDefinitionsString() function
- types.ts now generated as pure string (never executed by ts-node)
- Move template literal syntax INTO the string literal (safe from ESM parser)
- Keys: Backticks escaped as \\\\` inside string template"

# Verify
git log --oneline -n 3
```

**Expected Commit**:
```
feature/v5.3.0-dynamic-types-fix
├─ commit: refactor(types): separate type generation...
```

---

### **DAY 2 (April 9) — P1 Fixes & Runtime Utilities**
**Duration**: 2 hours

#### 09:00 - 09:30 (30 min) — P1 Fix #1: JSON Error Handling

In `scripts/generate-types-dynamic.ts`, find lines 32-43 (JSON reading section).

Replace:
```typescript
const primaryTokens = JSON.parse(
  fs.readFileSync(path.join(TOKEN_DIR, 'primary.json'), 'utf-8')
);
// ... etc (no error handling)
```

With:
```typescript
/**
 * Safely read and parse token file
 * @param filename - File to read (e.g., 'primary.json')
 * @returns - Parsed JSON object
 * @throws - Error with helpful message if file missing or JSON invalid
 */
function readTokenFile(filename: string): any {
  const filepath = path.join(TOKEN_DIR, filename);

  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    // Handle missing file
    if (error instanceof Error && 'code' in error && (error as any).code === 'ENOENT') {
      console.error(
        `❌ Token file not found: ${filepath}\n` +
        `   Make sure tokens/ directory exists and contains:\n` +
        `   - primary.json\n` +
        `   - light.json\n` +
        `   - dark.json\n` +
        `   - brands.json`
      );
      process.exit(1);
    }

    // Handle invalid JSON
    if (error instanceof SyntaxError) {
      console.error(
        `❌ Invalid JSON in ${filename}:\n` +
        `   ${error.message}`
      );
      process.exit(1);
    }

    // Re-throw unknown errors
    throw error;
  }
}

// Replace all JSON.parse calls with:
const primaryTokens = readTokenFile('primary.json');
const lightTokens = readTokenFile('light.json');
const darkTokens = readTokenFile('dark.json');
const brandsTokens = readTokenFile('brands.json');
```

#### 09:30 - 10:00 (30 min) — P1 Fix #2: Brand Validation

In `scripts/generate-types-dynamic.ts`, find the `extractBrandKeys()` function (around line 154).

Replace:
```typescript
function extractBrandKeys(brands: any): string[] {
  return Object.keys(brands).filter(key => key !== 'metadata');
}
```

With:
```typescript
// Define valid brands (source of truth)
const VALID_BRANDS = ['orion', 'deepblue', 'red', 'orange', 'lemon'] as const;
type ValidBrand = (typeof VALID_BRANDS)[number];

/**
 * Extract and validate brand keys from brands.json
 * @param brands - brands object from JSON
 * @returns - Array of valid brand names
 * @throws - Error if invalid brands found
 */
function extractBrandKeys(brands: any): ValidBrand[] {
  // Filter out metadata/config fields
  const extracted = Object.keys(brands).filter(
    key => key !== 'metadata' &&
           key !== 'brands' &&
           key !== 'defaultBrand' &&
           key !== 'name' &&
           key !== 'version' &&
           key !== 'description'
  );

  // Validate all extracted keys are known brands
  const invalid = extracted.filter(key => !VALID_BRANDS.includes(key as any));

  if (invalid.length > 0) {
    console.error(
      `❌ Unknown brands in tokens/brands.json:\n` +
      `   Found: ${invalid.join(', ')}\n` +
      `   Valid: ${VALID_BRANDS.join(', ')}\n\n` +
      `   Only these brands are supported: ${VALID_BRANDS.join(', ')}`
    );
    process.exit(1);
  }

  // Check we found at least one brand
  if (extracted.length === 0) {
    console.error(
      `❌ No valid brands found in tokens/brands.json\n` +
      `   Expected one or more of: ${VALID_BRANDS.join(', ')}`
    );
    process.exit(1);
  }

  return extracted as ValidBrand[];
}
```

#### 10:00 - 10:15 (15 min) — P1 Fix #3: Type Validation

Before the type generation section (around line 210), add:

```typescript
/**
 * Validate that generated types will be correct
 * @throws - Error if validation fails
 */
function validateGeneratedTypes(
  brands: string[],
  typographySizes: string[],
  spacingKeys: string[],
  radiusKeys: string[]
): void {
  const errors: string[] = [];
  const warnings: string[] = [];

  // === VALIDATE BRANDS ===
  if (brands.length === 0) {
    errors.push('No valid brands found in tokens/brands.json');
  }

  // Check for duplicates
  const brandSet = new Set(brands);
  if (brandSet.size !== brands.length) {
    errors.push(`Duplicate brands detected: ${brands.join(', ')}`);
  }

  // === VALIDATE TYPOGRAPHY ===
  if (typographySizes.length === 0) {
    warnings.push('No typography sizes found in tokens/primary.json');
  }

  // Check for required base size (14px)
  if (!typographySizes.includes('14')) {
    warnings.push('Base font size 14 (pixels) missing from typography.size');
  }

  // === VALIDATE SPACING ===
  if (spacingKeys.length === 0) {
    errors.push('No spacing keys found in tokens/primary.json');
  }

  // Check for required base spacing (4px)
  if (!spacingKeys.includes('4')) {
    errors.push('Base spacing 4 (pixels) missing — required by design system');
  }

  // === VALIDATE RADIUS ===
  if (radiusKeys.length === 0) {
    warnings.push('No radius keys found in tokens/primary.json');
  }

  // === REPORT RESULTS ===
  if (warnings.length > 0) {
    console.warn('⚠️  Warnings:');
    warnings.forEach(w => console.warn(`  - ${w}`));
  }

  if (errors.length > 0) {
    console.error('❌ Validation failed:');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }

  console.log('✅ Validation passed');
}
```

Then call this BEFORE type generation (around line 214):

```typescript
// Log validation start
console.log('\n📋 Validating token structure...');
validateGeneratedTypes(actualBrands, typographySizes, spacingKeys, radiusKeys);

// Then proceed with type generation
const typesContent = generateTypeDefinitionsString(...);
```

#### 10:15 - 10:30 (15 min) — Test P1 Fixes

```bash
# Test happy path
npm run build:tokens

# Expected output:
# ✅ Validation passed
# 📝 Generated: .../packages/react/src/tokens/types.ts
# 📊 Brands detected: orion, deepblue, red, orange, lemon
# 📊 Typography sizes: 12 detected
# 📊 Spacing scales: 13 detected
# 📊 Radius scales: 6 detected
```

#### 10:30 - 10:45 (15 min) — Commit: P1 Fixes

```bash
git add scripts/generate-types-dynamic.ts
git commit -m "feat(types): add error handling and validation (3 P1 fixes)

- Fix #1: JSON parse error handling with clear messages
  Catches ENOENT (missing files) and SyntaxError (invalid JSON)

- Fix #2: Brand key validation (only 5 valid brands)
  Whitelist check against VALID_BRANDS constant
  Prevents phantom brands (e.g., 'ember') from being added to types

- Fix #3: Generated types validation (required fields)
  Validates spacing.4, typography sizes, and brand count before writing
  Prevents corrupted types.ts file

Resolves template literal compilation error by:
- Separating type generation from execution
- Adding robust error handling
- Validating output before writing"

git log --oneline -n 5
```

#### 10:45 - 11:00 (15 min) — Create tokens-runtime.ts

Create new file: `packages/react/src/tokens/tokens-runtime.ts`

```typescript
/**
 * Orion Design System - Runtime Token Utilities
 *
 * Type-safe token access at runtime.
 * Uses types generated from JSON tokens.
 *
 * Key Pattern (APPROACH B):
 * - Import types from './types' (never executed)
 * - Define runtime utilities and maps (executed)
 * - Export both for type-safe development
 */

import type {
  TokenPath,
  SemanticTokenPath,
  ColorTokenPath,
  Primitives,
  Brand,
  Theme,
} from './types';

// Token primitive map (built from primary.json)
// This would be populated from the actual JSON in a complete implementation
const PRIMITIVES_MAP: Record<string, string> = {
  // Color tokens populated from tokens/primary.json
  'color.brand.orion.50': '#e8f0ff',
  'color.brand.orion.100': '#c7daff',
  'color.brand.orion.200': '#95bfff',
  'color.brand.orion.300': '#6aa5ff',
  'color.brand.orion.400': '#458aff',
  'color.brand.orion.500': '#1b5bff',
  'color.brand.orion.600': '#1445cc',
  'color.brand.orion.700': '#0d2e99',
  'color.brand.orion.800': '#061766',
  'color.brand.orion.900': '#030a33',

  // Spacing tokens populated from tokens/primary.json
  'spacing.1': '4px',
  'spacing.2': '8px',
  'spacing.3': '12px',
  'spacing.4': '16px',
  'spacing.6': '24px',
  'spacing.8': '32px',

  // Radius tokens
  'radius.sm': '6px',
  'radius.control': '12px',
  'radius.container': '16px',
  'radius.full': '9999px',
};

// Token semantic map (built from light.json / dark.json)
const SEMANTIC_MAP: Record<`${Theme}:${string}`, string> = {
  'light:surface.base': '#ffffff',
  'light:surface.subtle': '#f8f8f8',
  'light:text.primary': '#020617',
  'dark:surface.base': '#020617',
  'dark:surface.subtle': '#1a1a2e',
  'dark:text.primary': '#ffffff',
};

/**
 * Get primitive token value
 * @param path - Token path like 'color.brand.orion.500'
 * @returns - CSS value like '#1B5BFF'
 */
export function getToken(path: ColorTokenPath): string {
  const value = PRIMITIVES_MAP[path as string];
  if (!value) {
    console.warn(`Unknown token: ${path}`);
    return '';
  }
  return value;
}

/**
 * Get semantic token value (theme-aware)
 * @param theme - 'light' or 'dark'
 * @param path - Semantic token path like 'surface.base'
 * @returns - CSS value for the theme
 */
export function getSemanticToken(theme: Theme, path: SemanticTokenPath): string {
  const key = `${theme}:${path}` as const;
  const value = SEMANTIC_MAP[key];
  if (!value) {
    console.warn(`Unknown semantic token: ${path} for theme ${theme}`);
    return '';
  }
  return value;
}

/**
 * Validate that a string is a valid token path
 * @param path - String to validate
 * @returns - true if valid token path, false otherwise
 */
export function isValidTokenPath(path: string): path is TokenPath {
  return path in PRIMITIVES_MAP;
}

/**
 * Export primitive types for type checking (types-only)
 */
export type { TokenPath, ColorTokenPath, SemanticTokenPath, Primitives, Brand, Theme };
```

#### 11:00 - 11:15 (15 min) — Commit: New File

```bash
git add packages/react/src/tokens/tokens-runtime.ts
git commit -m "feat(tokens): create tokens-runtime.ts for type-safe token access

- Import types from types.ts (never executed)
- Define PRIMITIVES_MAP and SEMANTIC_MAP at runtime
- Export getToken(), getSemanticToken(), isValidTokenPath()
- Export types for type-safe development

This completes APPROACH B separation:
- generate-types-dynamic.ts: string generator
- types.ts: type definitions (output)
- tokens-runtime.ts: runtime utilities (new)"

git log --oneline -n 3
```

---

### **DAY 3 (April 10) — Integration & Smoke Tests**
**Duration**: 1.5 hours

#### 09:00 - 09:15 (15 min) — Test 1: Happy Path
```bash
# Clean build
rm -f packages/react/src/tokens/types.ts
npm run build:tokens

# Expected output:
# ✅ Validation passed
# 📝 Generated: .../packages/react/src/tokens/types.ts
# 📊 Brands detected: orion, deepblue, red, orange, lemon
```

**Verify**:
```bash
# Check types.ts exists and contains template literals
file packages/react/src/tokens/types.ts

grep "color.brand" packages/react/src/tokens/types.ts | head -5
# Should show: export type ColorTokenPath = | `color.brand...
```

#### 09:15 - 09:30 (15 min) — Test 2: Invalid JSON Error Handling
```bash
# Corrupt primary.json temporarily
cp tokens/primary.json tokens/primary.json.backup
echo "{ invalid json" > tokens/primary.json

# Run script (should fail with clear error)
npm run build:tokens

# Expected error:
# ❌ Invalid JSON in primary.json:
#    Unexpected token

# Restore file
mv tokens/primary.json.backup tokens/primary.json
```

#### 09:30 - 09:45 (15 min) — Test 3: Brand Validation
```bash
# Add phantom brand to brands.json temporarily
cp tokens/brands.json tokens/brands.json.backup
# (Edit to add "phantom" brand)
jq '.phantom = {}' tokens/brands.json > tokens/brands.json.tmp
mv tokens/brands.json.tmp tokens/brands.json

# Run script (should fail with clear error)
npm run build:tokens

# Expected error:
# ❌ Unknown brands in tokens/brands.json:
#    Found: phantom
#    Valid: orion, deepblue, red, orange, lemon

# Restore file
mv tokens/brands.json.backup tokens/brands.json
```

#### 09:45 - 10:00 (15 min) — Test 4: Type Checking
```bash
# Run TypeScript compiler
npm run type-check

# Should pass with no errors
# If errors, they should be in OTHER files, not generated types.ts
```

#### 10:00 - 10:15 (15 min) — Test 5: Full Package Build
```bash
# Build all packages
npm run build:packages

# Should complete successfully
# Watch for cascading errors
```

#### 10:15 - 10:30 (15 min) — Commit: Tests Pass

```bash
git add -A  # If any test changes
git commit -m "test(types): verify all smoke tests pass

✅ Test 1: Happy path generates types.ts correctly
✅ Test 2: Invalid JSON caught with clear error
✅ Test 3: Phantom brands rejected
✅ Test 4: npm run type-check passes
✅ Test 5: npm run build:packages succeeds

All 5 smoke tests passing. Ready for release."

# Optional: Create git tag for this milestone
git tag -a v5.3.0-implementation-complete -m "APPROACH B implementation complete, tests passing"

git log --oneline -n 5
```

---

### **DAY 4 (April 11) — Documentation & PR Preparation**
**Duration**: 1 hour

#### 09:00 - 09:20 (20 min) — Update CHANGELOG.md

Add to top of `CHANGELOG.md`:

```markdown
## [5.3.0] - 2026-04-15

### Added
- Dynamic TypeScript type generation from JSON tokens (APPROACH B)
- `tokens-runtime.ts` for type-safe token access at runtime
- Brand validation in type generation (only 5 valid brands)
- Comprehensive error handling for JSON parsing and validation

### Changed
- `scripts/generate-types-dynamic.ts` refactored to separate type generation from execution
- Template literal types now safely handled via APPROACH B (string generation)
- Improved error messages for token validation

### Fixed
- Template literal compilation error (ERR_INVALID_TYPESCRIPT_SYNTAX) ✅
- Phantom brand "ember" no longer included in types
- Missing error handling for corrupt JSON token files

### Technical Details
- Implements APPROACH B architecture per Architect Decision 2026-03-24
- P1 Fix #1: JSON error handling (clear messages for ENOENT, SyntaxError)
- P1 Fix #2: Brand validation (whitelist check against 5 valid brands)
- P1 Fix #3: Type validation (required tokens: spacing.4, base typography)
- All 3 P1 fixes prevent silent failures and improve developer experience
```

#### 09:20 - 09:35 (15 min) — Create DYNAMIC_TYPES.md Documentation

Create: `docs/DYNAMIC_TYPES.md`

```markdown
# Dynamic TypeScript Type Generation (v5.3.0+)

## Overview

Orion Design System now generates TypeScript types **dynamically** from JSON token files, eliminating the need to manually update type definitions when tokens change.

## Architecture (APPROACH B)

The system uses **three separate execution contexts**:

### 1. Type Generator (`scripts/generate-types-dynamic.ts`)
- **Role**: String generator (never executes its output)
- **Input**: JSON token files (primary.json, brands.json, etc.)
- **Output**: Type definitions written as strings
- **Key Pattern**: Backticks escaped as `\`` in string literal

### 2. Type Definitions (`packages/react/src/tokens/types.ts`)
- **Role**: Pure type definitions (TypeScript compiler only)
- **Execution**: Never executed by ts-node or runtime
- **Contains**: Template literal types like `` `color.brand.${Brand}...` ``
- **Safety**: TypeScript compiler handles templates; Node.js ESM never parses

### 3. Runtime Utilities (`packages/react/src/tokens/tokens-runtime.ts`)
- **Role**: Runtime token access functions
- **Imports**: Types from types.ts (types-only, not executed)
- **Exports**: getToken(), getSemanticToken(), isValidTokenPath()
- **Safe**: Never imports or executes types.ts at runtime

## Why This Architecture?

TypeScript template literals like `` `color.brand.${Brand}` `` fail at ts-node runtime because Node.js ESM cannot distinguish between:
- **Type-level**: `${Type}` syntax (compile-time only)
- **Runtime**: `${var}` interpolation (runtime evaluation)

APPROACH B solves this by:
1. Never executing the types.ts file (it's types-only)
2. Generating types as strings in the generator script
3. Keeping template literals in the type definitions (TypeScript compiler handles them)

## Usage

### Automatic Type Generation

Types are generated automatically when you run:

```bash
npm run build:tokens
```

This:
1. Reads JSON token files (primary.json, brands.json, etc.)
2. Validates token structure and brands
3. Generates `packages/react/src/tokens/types.ts`
4. Validates output (no silent failures)

### Using Generated Types

```typescript
import { getToken, getSemanticToken, type TokenPath } from '@orion-ds/react/tokens';

// Type-safe token access
const color: TokenPath = 'color.brand.orion.500';
const value = getToken(color); // IDE autocomplete works!

// Semantic tokens (theme-aware)
const surface = getSemanticToken('light', 'surface.base');
```

### Adding New Tokens

1. Edit `tokens/primary.json`, `tokens/light.json`, or `tokens/brands.json`
2. Run `npm run build:tokens`
3. Types are automatically generated and in sync with JSON

## Validation (3 P1 Fixes)

The script includes three production-quality fixes:

### P1 Fix #1: JSON Error Handling
Catches file missing (`ENOENT`) and invalid JSON (`SyntaxError`) with clear error messages. No silent failures.

### P1 Fix #2: Brand Validation
Only accepts 5 valid brands: `orion`, `deepblue`, `red`, `orange`, `lemon`. Rejects phantom brands with clear error.

### P1 Fix #3: Type Validation
Checks for required tokens (spacing.4, base typography) before generating. Prevents corrupted types.ts.

## Development Workflow

```bash
# Make changes to tokens
vim tokens/primary.json

# Generate new types
npm run build:tokens

# Type-check your code
npm run type-check

# Build packages
npm run build:packages
```

## Troubleshooting

### ❌ `npm run build:tokens` fails with "Invalid JSON"
- **Cause**: Corrupt token file (syntax error)
- **Fix**: Check the file path and JSON syntax in your editor

### ❌ "Unknown brands in tokens/brands.json"
- **Cause**: Added a brand that's not in the VALID_BRANDS list
- **Fix**: Only use: orion, deepblue, red, orange, lemon

### ❌ Type checking fails after `npm run build:tokens`
- **Cause**: Missing required tokens (spacing.4, base typography)
- **Fix**: Ensure tokens/primary.json contains all base tokens

### ❌ IDE autocomplete not working for tokens
- **Cause**: types.ts not generated (run build:tokens)
- **Fix**: Run `npm run build:tokens` and restart TypeScript server in IDE

## Related Documents

- **Decision**: `.claude/workspace-docs/ARCHITECT_DECISION_SUMMARY.md`
- **Implementation**: `.claude/workspace-docs/APPROACH_B_IMPLEMENTATION_GUIDE.md`
- **Quick Reference**: `.claude/workspace-docs/APPROACH_B_QUICK_REFERENCE.md`
```

#### 09:35 - 09:50 (15 min) — Update CLAUDE.md

Update section: "TypeScript Token System (NEW)" in CLAUDE.md

Find the section and update it with:

```markdown
### TypeScript Token System (v5.3.0+: Dynamic Generation)

TypeScript types are **auto-generated dynamically** from JSON tokens:

```bash
npm run build:tokens  # Generates TypeScript types from JSON
```

This solves the problem: types are always in sync with JSON (no manual sync needed).

#### How It Works (APPROACH B Architecture)

1. **generate-types-dynamic.ts** reads JSON token files
2. **Validates** tokens and brands (3 P1 fixes)
3. **Generates** types.ts as pure string output (never executed)
4. **types.ts** contains template literal types (TypeScript compiler compatible)
5. **tokens-runtime.ts** provides runtime utilities (getToken, getSemanticToken)

#### Generated Files

- `packages/react/src/tokens/types.ts` - TypeScript interfaces ✅ Dynamic
- `packages/react/src/tokens/tokens-runtime.ts` - Runtime utilities ✅ New in v5.3.0
- `packages/react/src/tokens/primitives.ts` - Typed constants (if needed)

#### When to Regenerate

Run `npm run build:tokens` after:
- Editing `tokens/primary.json`
- Editing `tokens/light.json` or `tokens/dark.json`
- Editing `tokens/brands.json`
- Adding new brand or removing old one

The script validates and prevents corrupt output with 3 P1 fixes:
1. **JSON error handling** — Clear messages for missing/invalid files
2. **Brand validation** — Only 5 valid brands (orion, deepblue, red, orange, lemon)
3. **Type validation** — Ensures required tokens present before writing

See `docs/DYNAMIC_TYPES.md` for complete architecture.
```

#### 09:50 - 10:05 (15 min) — Commit: Documentation

```bash
git add CHANGELOG.md docs/DYNAMIC_TYPES.md CLAUDE.md
git commit -m "docs(v5.3.0): add dynamic type generation documentation

- Updated CHANGELOG.md with v5.3.0 features
- Created docs/DYNAMIC_TYPES.md (architecture + troubleshooting)
- Updated CLAUDE.md TypeScript section with v5.3.0 info

Documents:
- APPROACH B architecture (3 execution contexts)
- 3 P1 fixes (error handling, validation, constraints)
- Development workflow (edit JSON, run build:tokens)
- Troubleshooting guide (common issues + fixes)"
```

---

### **DAY 5 (April 11-12) — PR Creation & Release Prep**
**Duration**: 1 hour

#### 10:05 - 10:15 (10 min) — Final Verification

```bash
# Comprehensive test
npm run audit

# Should pass:
# ✅ npm run type-check
# ✅ npm run validate (token compliance)
# ✅ npm run build:tokens
# ✅ npm run build:packages
```

#### 10:15 - 10:25 (10 min) — Push Branch & Create PR

```bash
# Push feature branch to remote
git push -u origin feature/v5.3.0-dynamic-types-fix

# Verify all commits are there
git log --oneline origin/main..HEAD
# Should show 4 commits:
# 1. refactor: separate type generation (APPROACH B)
# 2. feat: 3 P1 fixes (error handling, validation)
# 3. feat: tokens-runtime.ts
# 4. docs: v5.3.0 documentation
```

#### 10:25 - 10:50 (25 min) — Create GitHub PR

```bash
# Using gh CLI (if installed)
gh pr create \
  --title "fix(types): resolve template literal compilation blocker (APPROACH B)" \
  --body "$(cat <<'EOF'
## Summary

Resolves template literal compilation error (`ERR_INVALID_TYPESCRIPT_SYNTAX`) by implementing APPROACH B architecture:
- Separate type generation (string generator) from type definitions (types-only)
- Prevent ts-node from parsing template literals
- Add 3 production-quality P1 fixes

## What Changed

### Code Changes
- **scripts/generate-types-dynamic.ts**: Refactored for APPROACH B
  - Extract `generateTypeDefinitionsString()` function
  - Move template literals INTO string literal (escaped backticks)
  - Add P1 Fix #1: JSON error handling
  - Add P1 Fix #2: Brand validation (whitelist 5 brands)
  - Add P1 Fix #3: Type validation (required fields)

- **packages/react/src/tokens/tokens-runtime.ts**: New file
  - Runtime token utilities (getToken, getSemanticToken)
  - Import types from types.ts (types-only)
  - Export for type-safe development

- **packages/react/src/tokens/types.ts**: Regenerated
  - Same content as before, different generation process
  - Now generated as pure string (never executed)

### Documentation Changes
- **CHANGELOG.md**: Added v5.3.0 entry (features, fixes)
- **docs/DYNAMIC_TYPES.md**: New architecture guide
- **CLAUDE.md**: Updated TypeScript section with v5.3.0 info

## Architecture (APPROACH B)

```
generate-types-dynamic.ts     types.ts (generated)      tokens-runtime.ts
     (string generator)         (types-only)              (runtime utils)
    - Reads JSON              - Contains templates      - Import types
    - Validates               - Never executed        - Define MAPS
    - Writes strings          - TypeScript compiler    - Export functions
                               - Safe from ts-node
```

## Validation Results

✅ **Test 1**: Happy path generates types.ts correctly
✅ **Test 2**: Invalid JSON caught with clear error
✅ **Test 3**: Phantom brands rejected
✅ **Test 4**: npm run type-check passes
✅ **Test 5**: npm run build:packages succeeds

## Issues Fixed

- ✅ Template literal compilation error (ERR_INVALID_TYPESCRIPT_SYNTAX)
- ✅ Phantom brand "ember" no longer in types
- ✅ Missing error handling for corrupt JSON
- ✅ No validation of generated types

## Ready for Review

- [x] All tests passing (5/5 smoke tests)
- [x] Code review checklist complete
- [x] Documentation updated
- [x] CHANGELOG.md updated
- [x] No breaking changes (internal refactor only)

Timeline: Approved for April 15, 2026 release (v5.3.0)
EOF
)"
```

**Or manually**: Open GitHub UI and create PR with above template.

#### 10:50 - 11:00 (10 min) — Merge to Main (After Review)

Once PR is approved:

```bash
# Switch to main
git checkout main

# Pull latest
git pull origin main

# Merge feature branch
git merge --no-ff feature/v5.3.0-dynamic-types-fix \
  -m "Merge: v5.3.0 dynamic types fix (APPROACH B)

- Resolves template literal compilation error
- Implements APPROACH B (separate generation from types)
- Adds 3 P1 fixes (error handling, validation, constraints)
- Includes runtime utilities (tokens-runtime.ts)
- Complete documentation (DYNAMIC_TYPES.md, CHANGELOG.md)"

# Push to origin
git push origin main

# Create release tag (optional, for v5.3.0 release)
git tag -a v5.3.0 -m "Release v5.3.0: Dynamic TypeScript type generation

APPROACH B Implementation:
- Generate types as strings (never executed)
- Support for 5 valid brands (orion, deepblue, red, orange, lemon)
- Error handling and validation included
- Runtime utilities in tokens-runtime.ts

Fixes template literal compilation error completely."

git push origin v5.3.0
```

---

## 🎯 Success Criteria

### ✅ Code Quality
- [ ] `npm run build:tokens` completes without errors
- [ ] `npm run type-check` passes (all packages)
- [ ] `npm run build:packages` succeeds
- [ ] No TypeScript errors in generated types.ts
- [ ] No console warnings or errors during build

### ✅ Functionality
- [ ] All 5 brands detected (orion, deepblue, red, orange, lemon)
- [ ] IDE autocomplete works for token paths
- [ ] Template literals present in types.ts (as string content)
- [ ] Runtime utilities exported correctly

### ✅ Error Handling
- [ ] Invalid JSON caught with clear error message
- [ ] Missing files caught with helpful message
- [ ] Phantom brands rejected with explanation
- [ ] Missing required tokens caught before writing

### ✅ Testing
- [ ] Test 1: Happy path ✅
- [ ] Test 2: Invalid JSON ✅
- [ ] Test 3: Brand validation ✅
- [ ] Test 4: Type checking ✅
- [ ] Test 5: Full build ✅

### ✅ Documentation
- [ ] CHANGELOG.md updated
- [ ] docs/DYNAMIC_TYPES.md created
- [ ] CLAUDE.md TypeScript section updated
- [ ] GitHub PR with complete description
- [ ] Commit messages clear and detailed

---

## 🔄 Git Workflow Summary

### Expected Commits (4 total)

1. **refactor(types)**: APPROACH B implementation
   ```
   - Extract generateTypeDefinitionsString() function
   - Move template literals INTO string literal (escaped backticks)
   ```

2. **feat(types)**: 3 P1 Fixes
   ```
   - Fix #1: JSON error handling
   - Fix #2: Brand validation
   - Fix #3: Type validation
   ```

3. **feat(tokens)**: New tokens-runtime.ts
   ```
   - Runtime token utilities
   - Import types from types.ts
   ```

4. **docs(v5.3.0)**: Documentation
   ```
   - CHANGELOG.md, docs/DYNAMIC_TYPES.md, CLAUDE.md
   ```

### Branch Status
```
feature/v5.3.0-dynamic-types-fix
├─ 4 commits ahead of main
├─ All tests passing
└─ Ready to merge to main
```

---

## 🚨 Rollback Plan (If Needed)

If critical issues discovered during testing:

```bash
# Revert to previous state
git reset --hard HEAD~4

# Or use original generate-types.ts (static version)
git checkout HEAD~20 -- scripts/generate-types.ts
npm run build:tokens
```

The original `scripts/generate-types.ts` (static, hardcoded types) is always available as fallback. No data loss; v5.3.0 can be rescheduled.

---

## 📊 Effort Breakdown

| Day | Task | Duration | Total |
|-----|------|----------|-------|
| Apr 8 | APPROACH B refactor + first commit | 2.5h | 2.5h |
| Apr 9 | P1 Fixes + tokens-runtime.ts + docs commit | 2.0h | 4.5h |
| Apr 10 | Smoke tests + test commit | 1.5h | 6.0h |
| Apr 11-12 | Docs + PR + merge + tag | 1.0h | **7.0h** |
| **TOTAL** | | | **7 hours** |

**Buffer**: 2 hours (9-hour sprint - 7 hours work = 2h buffer for debugging)

---

## 📝 Notes for Frontend Developer

### Key Patterns to Remember

1. **String Escaping in Type Generation**:
   ```typescript
   // Template literal as string content (uses \\` escaping)
   const typeString = `export type X = \\\`color.brand.\\\${Brand}\\\`;`;
   //                                  ↑ Escaped backticks = string content
   ```

2. **APPROACH B Separation**:
   - `generate-types-dynamic.ts` = string generator (never executes output)
   - `types.ts` = type definitions (never executed, TypeScript compiler only)
   - `tokens-runtime.ts` = runtime utilities (imports types, exports functions)

3. **P1 Fix Pattern**:
   - Extract validation into named functions
   - Call BEFORE type generation
   - Exit with clear error messages (no silent failures)

### Questions?

Refer to:
- `ARCHITECT_DECISION_SUMMARY.md` — Decision rationale
- `APPROACH_B_IMPLEMENTATION_GUIDE.md` — Step-by-step details
- `APPROACH_B_QUICK_REFERENCE.md` — Code patterns and checklist

---

**Status**: Ready for April 8 implementation
**Architect Approval**: ✅ APPROACH B Selected (2026-03-24)
**Release Target**: April 15, 2026 (v5.3.0)
