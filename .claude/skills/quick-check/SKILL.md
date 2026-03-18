---
name: quick-check
description: Fast pre-commit validation (format, lint, type-check, CSS lint in parallel). Auto-triggers when user says "check code", "pre-commit", "ready to commit", or "quick validation". Runs in ~15-30 seconds.
allowed-tools: ["Bash"]
---

# Quick Code Check

Runs format check, linting, and type-checking in parallel for fast pre-commit validation.

## What This Runs

1. **Format Check** (Prettier) - Ensures consistent code style across TypeScript, CSS, JSON, Markdown
2. **ESLint** - Catches code quality issues, unused variables, potential bugs
3. **TypeScript** - Validates types across all packages in monorepo
4. **CSS Lint** (Stylelint) - Validates CSS and CSS Modules files

**Runtime**: ~15-30 seconds (parallel execution)

**Why parallel?** Running these checks simultaneously saves time. If any check fails, you'll see all failures at once instead of discovering them one by one.

## Usage

```bash
/quick-check
```

## Execution Steps

1. Navigate to Orion root directory
2. Run all 4 checks in parallel (use multiple Bash tool calls in single response)
3. Collect results from all checks
4. Report pass/fail for each check with color-coded output
5. If any check fails, provide auto-fix suggestions

## Commands (Run in Parallel)

**IMPORTANT**: Execute these 4 commands in parallel using separate Bash tool calls in a single response:

```bash
# Check 1: Format (Prettier)
cd "/Users/alfredo/Documents/AI First DS Library" && npm run format:check

# Check 2: ESLint
cd "/Users/alfredo/Documents/AI First DS Library" && npm run lint

# Check 3: TypeScript
cd "/Users/alfredo/Documents/AI First DS Library" && npm run type-check

# Check 4: CSS Lint (Stylelint)
cd "/Users/alfredo/Documents/AI First DS Library" && npm run lint:css
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "check my code"
- "pre-commit check"
- "is this ready to commit?"
- "quick validation"
- "check before commit"
- Before running `/commit` (if not already run)

## Success Output Format

```
✅ Format check passed (Prettier)
   All files properly formatted

✅ ESLint passed
   No code quality issues found

✅ TypeScript passed
   All types valid across packages

✅ CSS Lint passed (Stylelint)
   All CSS files follow style guide

🎉 All checks passed! Ready to commit.
```

## Failure Output Format

```
❌ Format check failed (Prettier)
   12 files need formatting

   Auto-fix: npm run format

✅ ESLint passed
   No code quality issues

❌ TypeScript failed
   3 type errors in packages/react/src/components/Button.tsx

   Button.tsx:45 - Type 'string | undefined' is not assignable to type 'string'
   Button.tsx:67 - Property 'variant' does not exist on type 'ButtonProps'

   Fix type errors manually

✅ CSS Lint passed (Stylelint)

⚠️  2 of 4 checks failed. Fix errors above before committing.
```

## Auto-Fix Suggestions

When checks fail, suggest appropriate auto-fix commands:

| Failed Check | Auto-Fix Command | What It Does |
|-------------|------------------|--------------|
| Format check | `npm run format` | Auto-formats all TypeScript, CSS, JSON, Markdown files |
| ESLint | `npm run lint:fix` | Auto-fixes ESLint violations (unused vars, formatting, etc.) |
| CSS Lint | `npm run lint:css:fix` | Auto-fixes Stylelint violations |
| TypeScript | (manual) | Type errors must be fixed manually |

**Example auto-fix output**:
```
Run these commands to auto-fix:

npm run format       # Fix 12 formatting issues
npm run lint:fix     # Fix ESLint violations

TypeScript errors require manual fixes in:
- packages/react/src/components/Button.tsx:45
- packages/react/src/components/Button.tsx:67
```

## Integration with Other Skills

**Run before**:
- `/commit` - Ensure code quality before committing
- `/pr-ready` - Part of PR preparation workflow

**Complementary skills**:
- `/validate-ai-first` - Checks AI-First compliance (different from code quality)
- `/audit` - Full system validation (includes quick-check + more)

## Performance Notes

- **Parallel execution**: All checks run simultaneously, not sequentially
- **Fast feedback**: Results in 15-30 seconds vs 60-90 seconds sequential
- **Cached builds**: TypeScript and linters use caching for faster subsequent runs
- **Turbo caching**: Monorepo task orchestration with intelligent caching

## Common Issues & Fixes

### Format Check Failures

**Issue**: "12 files need formatting"

**Fix**: Run `npm run format` to auto-format all files

### ESLint Failures

**Issue**: "Unused variable 'props'"

**Fix**: Run `npm run lint:fix` or manually remove unused variables

### TypeScript Errors

**Issue**: "Type 'string | undefined' is not assignable to type 'string'"

**Fix**: Manual fixes required:
- Add type guards: `if (value !== undefined)`
- Update types: Change type to allow undefined
- Provide default values: `value ?? 'default'`

### CSS Lint Failures

**Issue**: "Unexpected unknown property 'colour'"

**Fix**: Run `npm run lint:css:fix` or manually fix typo (colour → color)

## Exit Codes

- **All pass** = Exit code 0 for all 4 checks
- **Any fail** = At least one check has exit code 1

## References

- Prettier config: `package.json` (prettier field)
- ESLint config: `.eslintrc.json`
- TypeScript config: `tsconfig.json` (root) + package-specific configs
- Stylelint config: `.stylelintrc.json`
- Husky hooks: `.husky/pre-commit` (runs lint-staged on commit)
