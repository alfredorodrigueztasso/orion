---
name: validate-ai-first
description: Run AI-First compliance validation on React components. Auto-triggers when user mentions "validate", "check compliance", "AI-First rules", or after component changes. Validates no hardcoded colors, fonts, brand props, or pixel values.
allowed-tools: ["Bash", "Read"]
---

# AI-First Compliance Validation

Validates that all React components follow Orion's AI-First architecture rules to prevent UI hallucination.

## What This Checks

✅ **No hardcoded colors** - Must use CSS variables (e.g., `var(--interactive-primary)`)
✅ **No hardcoded pixels** - Must use spacing tokens (except 1px, 0px, 9999px)
✅ **No `data-brand` attributes** - Brand is set globally on `<html>`, not on components
✅ **No `brand` prop** - Brand is managed by `<ThemeProvider>`, not passed as prop
✅ **No hardcoded fonts** - Must use font variables (e.g., `var(--font-secondary)`)
✅ **No `any` types** - Proper TypeScript types required
✅ **No hardcoded shadows** - Must use shadow tokens
✅ **No hardcoded z-index** - Must use z-index tokens
✅ **No hardcoded transitions** - Must use transition tokens

**Pass threshold**: 97% compliance

**Pre-existing known violations** (acceptable):
- `Stepper.module.css`: Hardcoded font sizes (14px, 16px)
- Overlay components: z-index warnings

## Usage

```bash
/validate-ai-first
/validate-ai-first --verbose  # Show all files, not just violations
```

## Execution Steps

1. Navigate to Orion root directory
2. Run validation script: `node scripts/validate-components.js`
3. Parse output for compliance percentage and violations
4. If compliance < 97%, show violations with fix suggestions
5. If compliance >= 97%, confirm AI-First compliance

## Commands

```bash
cd "/Users/alfredo/Documents/AI First DS Library" && node scripts/validate-components.js
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "validate components"
- "check AI-First compliance"
- "are components compliant?"
- "validate" or "check compliance"
- After modifying any `.tsx` or `.module.css` file
- After creating new components with `/create-component`

## Success Output Format

```
✅ AI-First Compliance: 97.5% (39/40 components pass)

Test Results:
✅ No data-brand in JSX: 39/39 passed
✅ No brand prop in types: 39/39 passed
✅ No hardcoded colors: 38/39 passed
✅ No hardcoded fonts: 39/39 passed
✅ No any types: 39/39 passed
✅ No hardcoded shadows: 39/39 passed
✅ No hardcoded z-index: 37/39 passed (warnings)
✅ No hardcoded transitions: 39/39 passed
✅ No hardcoded font-sizes: 38/39 passed

Pre-existing violations (acceptable):
- Stepper.module.css: Hardcoded font sizes (14px, 16px)

System Status: AI-FIRST COMPLIANT ✨
```

## Failure Output Format

```
❌ AI-First Compliance: 89% (35/40 components)

Violations Found:

Button.tsx:45
  ❌ Hardcoded color: #1B5BFF
  Fix: Replace with var(--interactive-primary)

Card.module.css:12
  ❌ Hardcoded pixel: 24px
  Fix: Replace with var(--spacing-6)

Modal.types.ts:8
  ❌ Brand prop found in interface
  Fix: Remove brand prop. Brand is global via <ThemeProvider>

Hero.module.css:34
  ❌ Hardcoded font-family: Inter
  Fix: Replace with var(--font-secondary)

Run fixes and validate again with /validate-ai-first
```

## Common Fixes Reference

| Violation | Fix |
|-----------|-----|
| Hardcoded color `#1B5BFF` | Replace with `var(--interactive-primary)` |
| Hardcoded color `#FFFFFF` | Replace with `var(--surface-base)` or `var(--text-primary)` |
| Hardcoded pixel `16px` | Replace with `var(--spacing-4)` |
| Hardcoded pixel `24px` | Replace with `var(--spacing-6)` |
| `brand` prop in types | Remove prop, use `<ThemeProvider>` at app root |
| `data-brand` in JSX | Remove attribute, brand is set on `<html>` |
| `font-family: Inter` | Replace with `var(--font-secondary)` |
| `box-shadow: 0 4px...` | Replace with `var(--shadow-md)` |

## Integration with Other Skills

**Run automatically after**:
- `/create-component` - Validate newly created component
- Code changes to `.tsx` or `.module.css` files

**Run before**:
- `/pr-ready` - Ensure PR meets AI-First standards
- `/audit` - Part of full system validation

## Exit Codes

- **0** = All tests passed (>= 97% compliance)
- **1** = Violations found (< 97% compliance)

## References

- Validation script: `scripts/validate-components.js`
- AI-First rules: `CLAUDE.md` (Anti-Hallucination Rules section)
- Token reference: `tokens/index.json`
