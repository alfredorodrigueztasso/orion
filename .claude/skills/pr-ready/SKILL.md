---
name: pr-ready
description: Prepare code for pull request (format, lint, audit, build, test, registry). Auto-triggers when user says "ready for PR", "prepare pull request", "PR checklist", or "PR preparation". Complete PR workflow in ~1-2 minutes.
allowed-tools: ["Bash"]
---

# PR Readiness Check

Comprehensive PR preparation: auto-fixes formatting/linting, validates compliance, builds, and tests.

## What This Does

1. **Auto-Fix** - Format code, fix ESLint issues, fix CSS issues (Prettier + ESLint + Stylelint)
2. **Audit** - Full system validation (tokens, types, AI-First compliance)
3. **Preview Validation** - Check Storybook/docs for duplicate components and hardcoded styles
4. **Build** - Rebuild all packages to ensure no build errors
5. **Test** - Run unit tests to catch regressions
6. **Registry** - Update registry if components changed
7. **Generate commit message** - Suggest commit message based on changes

**Runtime**: ~1-2 minutes (sequential execution)

**Why this matters**: Ensures your PR meets all Orion quality standards before creating it.

## Usage

```bash
/pr-ready
/pr-ready --skip-tests  # Skip unit tests (faster)
```

## Execution Steps

1. Navigate to Orion root directory
2. **Step 1**: Auto-fix formatting and linting issues
3. **Step 2**: Run full audit (tokens + types + AI-First)
4. **Step 3**: Validate previews (Storybook/docs - no duplicates, no hardcoded styles)
5. **Step 4**: Rebuild all packages
6. **Step 5**: Run unit tests (if not skipped)
7. **Step 6**: Update registry if components changed
8. **Step 7**: Report PR readiness with commit suggestions

## Commands (Run Sequentially)

```bash
# Step 1: Auto-fix (run together)
cd "/Users/alfredo/Documents/AI First DS Library" && npm run format && npm run lint:fix && npm run lint:css:fix

# Step 2: Audit
cd "/Users/alfredo/Documents/AI First DS Library" && npm run audit

# Step 3: Preview Validation
# (Runs via /validate-previews skill - checks for duplicate components and hardcoded styles)

# Step 4: Build
cd "/Users/alfredo/Documents/AI First DS Library" && npm run build

# Step 4: Test (if not skipped)
cd "/Users/alfredo/Documents/AI First DS Library/packages/react" && npm test

# Step 5: Registry (if components changed)
cd "/Users/alfredo/Documents/AI First DS Library" && npm run build:registry
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "ready for PR"
- "prepare pull request"
- "PR checklist"
- "PR preparation"
- "prepare for review"
- Before creating a pull request

## Success Output Format

```
🚀 Preparing PR...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Step 1: Auto-Fix
   - Formatted 12 files (Prettier)
   - Fixed 8 ESLint issues
   - Fixed 3 Stylelint issues

✅ Step 2: Full Audit
   - Token validation: 97% compliant ✓
   - TypeScript: All types valid ✓
   - AI-First components: 100% compliant ✓

✅ Step 3: Build
   - @orion-ds/react built successfully
   - @orion-ds/core built successfully
   - @orion-ds/cli built successfully

✅ Step 4: Unit Tests
   - 145/145 tests passed
   - Coverage: 85% statements, 78% branches

✅ Step 5: Registry
   - Updated registry (90 items: 39 components, 41 sections, 10 templates)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 PR is ready!

Suggested commit message:

"feat(react): improve Chat component with file uploads

- Implemented compound component pattern
- Added retry, reactions, keyboard navigation
- Theme-aware code highlighting
- Fixed useAutoScroll lifecycle

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

Next steps:
1. Review changes: git diff
2. Stage changes: git add .
3. Commit: git commit (use message above)
4. Create PR: gh pr create

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🚀 Preparing PR...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Step 1: Auto-Fix
   - Formatted 12 files (Prettier)
   - Fixed 8 ESLint issues
   - Fixed 3 Stylelint issues

❌ Step 2: Full Audit FAILED

   AI-First Compliance: 89% (below 97% threshold)

   Violations:
   - Button.tsx:45 - Hardcoded color #1B5BFF
   - Card.module.css:12 - Hardcoded pixel 24px

   Fix violations and run /pr-ready again

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  PR NOT READY

Fix errors above before creating PR

Quick fixes:
- Run /validate-ai-first for detailed guidance
- Replace #1B5BFF with var(--interactive-primary)
- Replace 24px with var(--spacing-6)

Then run /pr-ready again

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Commit Message Generation

The skill analyzes changes and generates commit messages following Conventional Commits:

**Format**: `<type>(<scope>): <subject>`

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `docs` - Documentation changes
- `test` - Test additions/changes
- `chore` - Build process or auxiliary tool changes

**Example analysis**:
```
Changes detected:
- Modified: packages/react/src/components/Chat/Chat.tsx
- Modified: packages/react/src/components/Chat/Chat.module.css
- Added: packages/react/src/components/Chat/utils.ts
- Modified: packages/react/src/components/Chat/Chat.types.ts

Analysis:
- Scope: react (changes in packages/react)
- Component: Chat
- Type: feat (new functionality added - retry, reactions)

Generated message:
"feat(react): improve Chat component with file uploads"
```

## Workflow Integration

**Use before**:
- Creating pull requests
- Pushing to remote
- Requesting code review

**Includes**:
- `/quick-check` logic (format, lint, types)
- `/audit` logic (tokens, types, AI-First)
- Build validation
- Test execution
- Registry update

**Run after**:
- Making significant changes to components
- Before requesting PR review
- After merging main into your branch

## Skip Tests Mode

For faster PR preparation during iterative development:

```bash
/pr-ready --skip-tests
```

**Skips**:
- Unit test execution
- Test coverage report

**Still runs**:
- Auto-fix (format, lint)
- Full audit
- Build validation
- Registry update

**When to use**:
- Rapid iteration during development
- Non-code changes (docs, configs)
- When tests already passed recently

**When NOT to use**:
- Before final PR submission
- After significant code changes
- When components were modified

## Common Issues & Fixes

### Auto-Fix Couldn't Resolve All Issues

**Issue**: Some linting issues require manual fixes

**Solution**: Review output for manual fixes needed:
```
Manual fixes required:
- Button.tsx:45 - Remove unused variable 'props'
- Card.tsx:67 - Fix type error (string | undefined)
```

### Build Failed

**Issue**: TypeScript compilation errors

**Solution**:
1. Check error messages in output
2. Fix type errors manually
3. Run `/pr-ready` again

### Tests Failed

**Issue**: Unit tests are failing

**Solution**:
1. Review failed test output
2. Fix failing tests
3. Run `npm test ComponentName` to verify
4. Run `/pr-ready` again

### Audit Failed

**Issue**: AI-First compliance < 97%

**Solution**:
1. Run `/validate-ai-first` for detailed violations
2. Apply suggested fixes
3. Run `/pr-ready` again

## Integration with Git Workflow

**Typical workflow**:

```bash
# 1. Make changes to code
# (edit files...)

# 2. Prepare PR
/pr-ready

# 3. Review changes
git diff

# 4. Stage and commit
git add .
git commit -m "feat(react): improve Chat component"

# 5. Push to remote
git push origin feature-branch

# 6. Create PR
gh pr create --title "Improve Chat component" --body "..."
```

## Pre-Commit Hook Integration

This skill complements (not replaces) pre-commit hooks:

**Pre-commit hooks** (Husky):
- Run automatically on `git commit`
- Fast checks (format, lint staged files)
- Prevents bad commits

**`/pr-ready` skill**:
- Run manually before creating PR
- Comprehensive checks (full audit, build, tests)
- Ensures PR quality

**Best practice**: Run `/pr-ready` before pushing to remote, let pre-commit hooks catch individual commit issues.

## Exit Codes

- **All pass** = Exit code 0 (PR ready)
- **Any fail** = Exit code 1 (PR not ready, fix errors)

## References

- Auto-fix: `npm run format`, `npm run lint:fix`, `npm run lint:css:fix`
- Audit: `/audit` skill, `npm run audit`
- Build: `npm run build`
- Test: `npm test` (Vitest)
- Registry: `npm run build:registry`
- Commit conventions: Conventional Commits (conventionalcommits.org)
