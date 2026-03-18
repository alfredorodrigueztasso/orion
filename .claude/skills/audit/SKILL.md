---
name: audit
description: Full system audit (tokens + types + AI-First compliance). Auto-triggers when user says "full audit", "system check", "validate everything", or before releasing. Comprehensive validation of Chain of Truth, TypeScript, and component compliance.
allowed-tools: ["Bash", "Read"]
---

# Full System Audit

Comprehensive validation of the entire Orion Design System: Chain of Truth compliance, TypeScript types, and AI-First component rules.

## What This Checks

1. **Token Validation** (Chain of Truth) - Ensures no hardcoded values in `theme.css` outside `:root` blocks
2. **TypeScript** - Validates types across all packages in monorepo
3. **AI-First Compliance** - Validates React components follow AI-First rules (no brand props, hardcoded colors, fonts)

**Compliance threshold**: 97% for tokens, 97% for components

**Runtime**: ~45-60 seconds (sequential execution)

## Usage

```bash
/audit
/audit --skip-types  # Skip type-checking (faster, for quick audits)
```

## Execution Steps

1. Navigate to Orion root directory
2. **Step 1**: Run token validation (`npm run validate`)
3. **Step 2**: Run TypeScript type-checking (`npm run type-check`)
4. **Step 3**: Run AI-First component validation (`node scripts/validate-components.js`)
5. Calculate overall system health score
6. Report compliance scores with color-coded output

**Why sequential?** Each validation builds context for the next. If tokens fail, component validation may be affected.

## Commands (Run Sequentially)

```bash
cd "/Users/alfredo/Documents/AI First DS Library" && npm run validate && npm run type-check && node scripts/validate-components.js
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "audit the system"
- "full validation"
- "check everything"
- "system health check"
- Before running `/pre-release` or `/publish`
- After major changes to tokens or components

## Success Output Format

```
🔍 ORION DESIGN SYSTEM - FULL AUDIT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Token Validation (Chain of Truth)
   Compliance: 97% (687/708 token usages)

   Violations: 21 acceptable instances
   - :root blocks (primitives defined here)
   - CSS comments
   - var() references

   Chain of Truth: ENFORCED ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ TypeScript Type Checking
   All types valid across packages:

   ✓ @orion-ds/react
   ✓ @orion-ds/core
   ✓ @orion-ds/cli
   ✓ @orion-ds/mcp
   ✓ @orion-ds/validate

   Type Safety: VERIFIED ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ AI-First Component Compliance
   Compliance: 97.5% (39/40 components)

   Test Results:
   ✅ No data-brand in JSX: 39/39
   ✅ No brand prop in types: 39/39
   ✅ No hardcoded colors: 38/39
   ✅ No hardcoded fonts: 39/39
   ✅ No any types: 39/39
   ✅ No hardcoded shadows: 39/39
   ✅ No hardcoded z-index: 37/39 (warnings)
   ✅ No hardcoded transitions: 39/39
   ✅ No hardcoded font-sizes: 38/39

   Pre-existing violations (acceptable):
   - Stepper.module.css: Hardcoded font sizes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 SYSTEM HEALTH: EXCELLENT

   Overall Compliance: 97%
   Status: PRODUCTION READY ✅

   ✓ Chain of Truth enforced
   ✓ Type-safe across all packages
   ✓ AI-First principles maintained

   Ready for release!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🔍 ORION DESIGN SYSTEM - FULL AUDIT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Token Validation (Chain of Truth)
   Compliance: 89% (629/708 token usages)

   Violations in theme.css:

   Line 245: Hardcoded color #1B5BFF
   Line 287: Hardcoded pixel 24px
   Line 334: Hardcoded font-family: Inter

   Fix: Replace with semantic tokens
   - #1B5BFF → var(--interactive-primary)
   - 24px → var(--spacing-6)
   - font-family: Inter → var(--font-secondary)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ TypeScript Type Checking
   3 type errors in @orion-ds/react:

   Button.tsx:45
     Type 'string | undefined' not assignable to 'string'

   Card.tsx:67
     Property 'variant' does not exist on type 'CardProps'

   Modal.tsx:89
     Cannot find name 'ModalProps'

   Fix type errors manually

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ AI-First Component Compliance
   Compliance: 85% (34/40 components)

   6 components with violations:

   Button.tsx - Hardcoded color #1B5BFF
   Card.module.css - Hardcoded pixel 24px
   Hero.tsx - Brand prop in interface
   Modal.module.css - Hardcoded font-family
   Navbar.tsx - data-brand attribute found
   Sidebar.module.css - Hardcoded shadow values

   Run /validate-ai-first for detailed fixes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  SYSTEM HEALTH: NEEDS ATTENTION

   Overall Compliance: 86%
   Status: NOT PRODUCTION READY ❌

   ✗ Chain of Truth violations found
   ✗ Type errors present
   ✗ AI-First violations detected

   Fix violations above before releasing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Pre-Existing Known Issues

These violations are acceptable and should NOT fail the audit:

**Token validation**:
- `:root` blocks (where primitives are defined)
- CSS comments
- `var()` references

**AI-First validation**:
- `Stepper.module.css`: Hardcoded font sizes (14px, 16px)
- Overlay components: z-index warnings (controlled via tokens)

**TypeScript**:
- None (all type errors must be fixed)

## System Health Scoring

| Compliance % | Health Status | Production Ready? |
|--------------|---------------|-------------------|
| 95-100% | EXCELLENT | ✅ Yes |
| 90-94% | GOOD | ⚠️  Review recommended |
| 85-89% | NEEDS ATTENTION | ❌ No |
| < 85% | CRITICAL | ❌ No |

**Calculation**: Average of token compliance, type validity (100% or 0%), and AI-First compliance

## Integration with Other Skills

**Includes**:
- Token validation from `npm run validate`
- Type checking from `npm run type-check`
- AI-First validation from `/validate-ai-first`

**Run before**:
- `/pre-release` - Ensures system health before releasing
- `/release-patch` - Pre-release gate check

**Complementary skills**:
- `/quick-check` - Fast code quality (format, lint, types)
- `/test-full` - Complete test suite (unit, E2E, visual)

## Quick Audit (Skip Types)

For faster audits during development, skip TypeScript checking:

```bash
/audit --skip-types
```

This runs only token validation + AI-First compliance (~20-30 seconds).

Use full audit before:
- Creating PRs
- Releasing versions
- Major refactors

## Auto-Fix Workflow

If audit fails, follow this workflow:

1. **Token violations** → Fix manually in `theme.css`
   - Replace hardcoded values with semantic tokens
   - Run `npm run validate` to verify

2. **Type errors** → Fix manually in TypeScript files
   - Add proper types
   - Fix type mismatches
   - Run `npm run type-check` to verify

3. **AI-First violations** → Run `/validate-ai-first` for detailed fixes
   - See line-by-line violations
   - Apply suggested fixes
   - Re-validate

4. **Re-run audit** → `/audit` to confirm all fixes

## Exit Codes

- **All pass** = Exit code 0 (>= 97% compliance on all checks)
- **Any fail** = Exit code 1 (< 97% compliance or type errors)

## References

- Token validation: `scripts/validate-tokens.js`, `npm run validate`
- TypeScript: `tsconfig.json` (root + package configs)
- AI-First validation: `scripts/validate-components.js`
- Chain of Truth: `CLAUDE.md` (Core Architecture section)
- Compliance rules: `CLAUDE.md` (Anti-Hallucination Rules section)
