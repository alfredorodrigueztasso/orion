---
name: fix-tokens
description: Regenerate TypeScript types and CSS after editing token JSON files. Auto-triggers when user modifies files in tokens/ directory or says "rebuild tokens", "regenerate types", "fix tokens". Ensures types and CSS stay in sync with JSON source.
allowed-tools: ["Bash"]
---

# Fix Tokens (Regenerate Types)

After editing token JSON files, this regenerates TypeScript types and CSS variables to keep the system in sync.

## What This Does

1. **Generates TypeScript types** from `tokens/*.json`
   - `packages/core/src/tokens/types.ts` - Type interfaces
   - `packages/core/src/tokens/primitives.ts` - Typed constants
   - `packages/core/src/tokens/themes.ts` - Light/dark theme definitions
   - `packages/core/src/tokens/brands.ts` - Brand configurations

2. **Compiles tokens to CSS variables** in `theme.css`
   - Primitives in `:root`
   - Brand overrides per `[data-brand]`
   - Light/dark semantics per `[data-theme]`

3. **Validates Chain of Truth compliance**
   - Ensures no hardcoded values in generated CSS
   - Validates radius scale integrity
   - Checks primitive consistency across brands

**When to use**: After editing any file in `tokens/` directory

**Runtime**: ~10-15 seconds

## Usage

```bash
/fix-tokens
```

## Execution Steps

1. Navigate to Orion root directory
2. Run token build script: `npm run build:tokens`
3. Run validation: `npm run validate`
4. Report updated files and compliance status

## Commands

```bash
cd "/Users/alfredo/Documents/AI First DS Library" && npm run build:tokens && npm run validate
```

## Auto-Trigger Patterns

This skill auto-triggers when:
- User modifies `tokens/primary.json` (primitives)
- User modifies `tokens/light.json` (light theme semantics)
- User modifies `tokens/dark.json` (dark theme semantics)
- User modifies `tokens/brands.json` (brand overrides)
- User modifies `tokens/components.json` (component definitions)
- User modifies `tokens/utilities.json` (utility classes)
- User says "rebuild tokens" or "regenerate types"
- User says "fix tokens" or "update types"

## Success Output Format

```
🔧 Regenerating tokens...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Generated TypeScript types:
   - packages/core/src/tokens/types.ts
   - packages/core/src/tokens/primitives.ts
   - packages/core/src/tokens/themes.ts
   - packages/core/src/tokens/brands.ts

✅ Updated CSS variables:
   - tokens/generated.css (600+ lines)
   - theme.css (includes generated.css)

✅ Validation: 97% compliant (Chain of Truth enforced)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Tokens regenerated successfully!

   TypeScript types are now in sync with JSON source
   CSS variables updated in theme.css
   Chain of Truth maintained

Next steps:
1. Import updated types in your code
2. Use new tokens in components
3. Run /validate-ai-first to check compliance
```

## Failure Output Format

```
🔧 Regenerating tokens...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Generated TypeScript types:
   - packages/core/src/tokens/types.ts
   - packages/core/src/tokens/primitives.ts
   - packages/core/src/tokens/themes.ts
   - packages/core/src/tokens/brands.ts

✅ Updated CSS variables:
   - tokens/generated.css
   - theme.css

❌ Validation failed: 89% compliant

   Violations in theme.css:
   - Line 156: Hardcoded color #1B5BFF
   - Line 234: Hardcoded pixel 24px

   This should NOT happen - token generation created invalid CSS!

   Fix tokens in JSON source:
   - Check tokens/primary.json for hardcoded values
   - Ensure all values reference primitives
   - Re-run /fix-tokens

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Tokens regenerated but validation failed

   Review violations above
   Fix token JSON files
   Run /fix-tokens again
```

## Common Token Edits

### 1. Add New Color

**File**: `tokens/primary.json`

```json
{
  "color": {
    "brand": {
      "orion": {
        "500": "#1B5BFF",
        "600": "#0D4FDB",  // Add new shade
        "700": "#0A3FB0"   // Add new shade
      }
    }
  }
}
```

**After edit**: Run `/fix-tokens` to generate types and CSS

### 2. Add Semantic Token

**File**: `tokens/light.json` or `tokens/dark.json`

```json
{
  "text": {
    "primary": "{color.gray.900}",
    "secondary": "{color.gray.600}",
    "tertiary": "{color.gray.500}",
    "brand-hover": "{color.brand.600}"  // Add new semantic token
  }
}
```

**After edit**: Run `/fix-tokens` to generate types and CSS

### 3. Add Brand Override

**File**: `tokens/brands.json`

```json
{
  "lemon": {
    "accent": "#FFD700",
    "radius": {
      "control": "16px",
      "button": "16px",
      "container": "20px"
    },
    "shadow": {
      "tint": "rgba(255, 215, 0, 0.2)"
    }
  }
}
```

**After edit**: Run `/fix-tokens` to generate brand CSS overrides

### 4. Update Spacing Scale

**File**: `tokens/primary.json`

```json
{
  "spacing": {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",  // Add new spacing value
    "6": "24px"
  }
}
```

**After edit**: Run `/fix-tokens` to update CSS and types

## Files Updated

After running `/fix-tokens`, these files are updated:

**TypeScript** (generated):
```
packages/core/src/tokens/
├── types.ts        - TypeScript interfaces (TokenPath, SemanticTokenPath, Brand, Theme)
├── primitives.ts   - Typed constants (primitives object)
├── themes.ts       - Light/dark theme definitions (lightTheme, darkTheme)
├── brands.ts       - Brand configurations (orion, red, deepblue, orange)
└── utils.ts        - Helper functions (getToken, getSemanticToken, getBrand)
```

**CSS** (generated):
```
tokens/generated.css   - 600+ lines of CSS variables
theme.css              - Includes generated.css + custom CSS
```

## Integration with Other Skills

**Run after**:
- Editing any file in `tokens/` directory
- Creating new brand with `/create-brand`
- Adding new semantic tokens

**Run before**:
- `/audit` - Ensure token changes don't break compliance
- `/pr-ready` - Ensure types are in sync before PR
- Using new tokens in components

## Validation After Token Changes

After running `/fix-tokens`, always validate:

1. **Token compliance**: `npm run validate` (included in skill)
2. **Type checking**: `npm run type-check` (ensure no type errors)
3. **AI-First compliance**: `/validate-ai-first` (ensure components still compliant)

**Full validation workflow**:
```bash
/fix-tokens
/audit
```

## Troubleshooting

### "Radius scale integrity check failed"

**Problem**: Brand radius values don't follow proper scale (button < control < container)

**Fix**: Check `tokens/brands.json` and ensure:
```json
{
  "brandName": {
    "radius": {
      "button": "12px",      // Smallest
      "control": "12px",     // Same or larger
      "container": "16px"    // Largest
    }
  }
}
```

### "Hardcoded values in generated CSS"

**Problem**: Token JSON contains hardcoded values instead of primitives

**Fix**: Ensure semantic tokens reference primitives:
```json
// ❌ Wrong - hardcoded
{
  "text": {
    "primary": "#000000"
  }
}

// ✅ Correct - references primitive
{
  "text": {
    "primary": "{color.gray.900}"
  }
}
```

### "TypeScript types out of sync"

**Problem**: Code imports types that don't exist

**Fix**: Run `/fix-tokens` to regenerate types from latest JSON

## Exit Codes

- **Exit code 0** = Types generated successfully, validation passed
- **Exit code 1** = Generation failed or validation failed (< 97% compliance)

## References

- Token build script: `scripts/build-tokens.js`
- Token validation: `scripts/validate-tokens.js`
- Token JSON files: `tokens/*.json`
- Generated types: `packages/core/src/tokens/`
- Chain of Truth: `CLAUDE.md` (Core Architecture section)
