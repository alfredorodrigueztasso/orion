# Development Setup & Best Practices

## Fresh Clone Setup

When you clone this repo for the first time, follow these steps **in order**:

```bash
# 1. Install dependencies
npm install

# 2. Build tokens FIRST (generates TypeScript types + CSS)
npm run build:tokens

# 3. Then run tests (tests depend on generated types)
npm test

# 4. Build the packages
npm run build
```

## Important: Token Types Generation

**⚠️ DISC-001**: Before running `npm test`, you **must** run `npm run build:tokens` first.

**Why?**
- `npm run build:tokens` generates `packages/react/src/tokens/types.ts`
- Unit tests import from this generated file
- Running `npm test` without building tokens → tests fail with "ENOENT" (file not found)
- **In CI/CD this is not an issue** because the pipeline runs `npm run build:tokens` before tests

**The Fix if You Forget**:
```bash
npm run build:tokens  # Generates the types
npm test              # Now tests pass ✅
```

## Development Workflow

### Running Tests

```bash
# Full suite
npm test

# Specific component
npm test -- CodeEditor

# With UI
npm run test:ui

# Watch mode
npm test -- --watch
```

### Building Packages

```bash
# All packages
npm run build

# React only
npm run build:react

# With token generation
npm run build:tokens

# Release build (for publishing)
npm run build:release
```

### Type Checking

```bash
# All packages
npm run type-check

# Validate AI-First rules
npm run validate:ai-first
```

## Common Issues

### Test Failures: "ENOENT: no such file or directory ... types.ts"

**Cause**: Token types not generated
**Solution**:
```bash
npm run build:tokens
npm test
```

### Build Failures: "theme.css not found"

**Cause**: Token build not completed
**Solution**:
```bash
npm run build:tokens
npm run build
```

### Type Errors in IDE

**Cause**: `src/tokens/types.ts` not synced
**Solution**:
```bash
npm run build:tokens
# Reload IDE (Cmd+Shift+P → "Developer: Reload Window" in VSCode)
```

## Code Quality

### Before Committing

```bash
# Quick check (format + lint + type-check)
/quick-check

# Full audit
npm run audit
```

### Pre-commit Hooks

The repo includes Husky + lint-staged. They run automatically:
- ESLint + Prettier on `*.ts`, `*.tsx`
- Stylelint + Prettier on `*.css`
- Preview module validation

**To bypass** (not recommended):
```bash
git commit --no-verify
```

## Release Process

For maintainers:

```bash
# Check status
/team-git --status

# Prepare commits
/team-git --commit-only

# Create PR
/team-git --pr

# Release
npm run release:patch   # Bump patch version
npm run release:minor   # Bump minor version
npm run release:major   # Bump major version
```

## Documentation

- `CLAUDE.md` — Active documentation (component API, tokens, workflows)
- `DEVELOPMENT.md` — This file (setup + development workflow)
- `.claude/workspace-docs/` — Completed phases (archived, reference)
- `memory/` — Institutional knowledge (patterns, debugging, decisions)

## Getting Help

- **Unclear requirements?** Check CLAUDE.md for comprehensive guides
- **Component API questions?** Read the component's JSDoc + Storybook
- **Build issues?** See "Common Issues" section above
- **Bugs?** Check `memory/debugging.md` for patterns of resolved issues
- **Architecture decisions?** See `memory/architecture-decisions.md`

## Latest Release Notes

**v5.5.1** (Mar 25, 2026): useThemeContext strict mode in development
**v5.5.0** (Mar 25, 2026): CodeEditor test reliability + source cleanup
**v5.4.0** (Mar 25, 2026): API drift detection + ESM test fix
**v5.3.2** (Mar 25, 2026): Build sequencing fix + preventive improvements

See `.claude/workspace-docs/V5_5_1_RELEASE_STATUS.md` for complete release history.
