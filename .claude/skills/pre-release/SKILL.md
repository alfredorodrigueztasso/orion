---
name: pre-release
description: Gate de release — checklist completo antes de publicar a npm (audit + build + tests + registry). Diferente de /audit (validación diaria de desarrollo). Usar SOLO cuando se prepara un release real a npm. Auto-triggers cuando user dice "prepare release", "pre-release check", "ready to publish".
allowed-tools: ["Bash", "Read"]
---

# Pre-Release Checklist — Release Gate

Comprehensive pre-release validation before publishing to npm. Runs all audits, builds, tests, and registry generation.

**This is the FINAL checkpoint before npm publish. Use ONLY when releasing.**

## When to Use This

- ✅ **Use `/pre-release`** — When preparing an actual npm release
- ❌ **Don't use** — For daily development validation (use `/audit` instead)
- ❌ **Don't use** — For PR validation (use `/pr-ready` instead)

Release gate = the last checklist before `npm publish`.

## What This Runs

1. **Full Audit** - Tokens + types + AI-First compliance (3-layer validation)
2. **Clean Build** - Rebuild all packages from scratch
3. **Unit Tests** - Run Vitest test suite with coverage
4. **Registry Generation** - Update HTTP API for CLI/MCP
5. **Pre-Publish Checks** - Validate package.json, exports, files (8-point checklist)

**Runtime**: ~2-3 minutes (sequential execution)

**Purpose**: Gate-check before npm publish to prevent broken releases

## Usage

```bash
/pre-release
/pre-release --skip-tests  # Skip unit tests (faster, not recommended)
```

## Execution Steps

1. Navigate to Orion root directory
2. **Step 1**: Run full audit (`/audit`)
3. **Step 2**: Clean and rebuild all packages
4. **Step 3**: Run unit tests with coverage
5. **Step 4**: Regenerate registry and HTTP API
6. **Step 5**: Run pre-publish validation checks
7. **Step 6**: Report readiness for npm publish

**Why sequential?** Each step validates foundation for the next. If audit fails, build likely fails.

## Commands (Run Sequentially)

```bash
# Step 1: Full audit
cd "/Users/alfredo/Documents/AI First DS Library" && npm run audit

# Step 2: Build all packages
cd "/Users/alfredo/Documents/AI First DS Library" && npm run build:all

# Step 3: Run tests with coverage
cd "/Users/alfredo/Documents/AI First DS Library/packages/react" && npm run test:coverage

# Step 4: Regenerate registry and HTTP API
cd "/Users/alfredo/Documents/AI First DS Library" && npm run build:registry-api

# Step 5: Pre-publish validation
cd "/Users/alfredo/Documents/AI First DS Library" && npm run prepublish:check
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "prepare release"
- "pre-release checks"
- "ready to publish?"
- "validate for release"
- Before running `/release-patch`, `/release-minor`, or `/release-major`

## Success Output Format

```
🔍 Pre-Release Validation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Step 1: Full Audit
   - Token validation: 97% compliant ✓
   - TypeScript: All types valid ✓
   - AI-First components: 100% compliant ✓

✅ Step 2: Clean Build
   - @orion-ds/react v3.2.0 built ✓
   - @orion-ds/core v1.3.0 built ✓
   - @orion-ds/cli v1.0.0 built ✓
   - @orion-ds/mcp v1.0.0 built ✓
   - @orion-ds/validate v1.0.0 built ✓

✅ Step 3: Unit Tests
   - 145/145 tests passed
   - Coverage: 85% statements, 78% branches, 87% functions
   - Report: packages/react/coverage/index.html

✅ Step 4: Registry & HTTP API
   - Generated registry: 90 items
   - Components: 39
   - Sections: 41
   - Templates: 10
   - HTTP API: public/r/*.json

✅ Step 5: Pre-Publish Checks (8/8)
   1. Build artifacts exist ✓
   2. README files present ✓
   3. LICENSE files present ✓
   4. package.json valid ✓
   5. .npmignore configured ✓
   6. TypeScript declarations (.d.ts) ✓
   7. Token validation passed ✓
   8. NPM authentication verified ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 READY TO PUBLISH!

   All pre-release checks passed
   System is production-ready

Next steps:
1. Choose version bump:
   - /release-patch (1.0.0 → 1.0.1)
   - /release-minor (1.0.0 → 1.1.0)
   - /release-major (1.0.0 → 2.0.0)

2. Or publish manually:
   cd packages/react && npm publish --access public

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🔍 Pre-Release Validation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Step 1: Full Audit
   - All checks passed ✓

✅ Step 2: Clean Build
   - All packages built ✓

❌ Step 3: Unit Tests FAILED

   5 tests failed in Chat component:

   Chat.test.tsx:
   - "should handle file upload" - FAIL
   - "should show retry button on error" - FAIL
   - "should display reactions correctly" - FAIL
   - "should trap focus in chat input" - FAIL
   - "should validate file size limits" - FAIL

   Fix failing tests before releasing

   Debug:
   cd packages/react && npm test Chat

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ NOT READY TO PUBLISH

Fix failing tests and run /pre-release again

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Pre-Publish Checks (8-Point Checklist)

The `npm run prepublish:check` script validates:

### 1. Build Artifacts Exist
- `packages/react/dist/` contains compiled code
- `packages/core/dist/` contains token types
- All `.d.ts` files generated

### 2. README Files Present
- `packages/react/README.md`
- `packages/core/README.md`
- Each package has documentation

### 3. LICENSE Files Present
- `packages/react/LICENSE`
- `packages/core/LICENSE`
- Ensures legal compliance

### 4. package.json Valid
- Required fields: name, version, main, types, exports
- Valid semver version
- Correct repository URL
- Author information present

### 5. .npmignore Configured
- Excludes test files
- Excludes source maps (unless intended)
- Excludes dev configs

### 6. TypeScript Declarations
- `.d.ts` files present for all exports
- Types are valid and importable
- Ensures TypeScript support

### 7. Token Validation
- Chain of Truth maintained (97%+ compliance)
- No hardcoded values in published CSS
- Semantic tokens enforced

### 8. NPM Authentication
- `npm whoami` succeeds
- User is logged in to npm
- Has publish permissions

## Version Bump Recommendations

After successful pre-release, choose version bump:

| Change Type | Version Bump | Command |
|-------------|--------------|---------|
| Bug fixes only | Patch (1.0.0 → 1.0.1) | `/release-patch` |
| New features (backward compatible) | Minor (1.0.0 → 1.1.0) | `/release-minor` |
| Breaking changes | Major (1.0.0 → 2.0.0) | `/release-major` |

**Semantic Versioning (semver)**:
- **Patch**: Bug fixes, docs, internal changes
- **Minor**: New components, new features, enhancements
- **Major**: Breaking API changes, removed features, migration required

## Integration with Release Workflow

**Complete release workflow**:

1. **Development**:
   - Make changes
   - Run `/pr-ready`
   - Create PR
   - Merge to main

2. **Pre-Release** (this skill):
   - Run `/pre-release`
   - Verify all checks pass
   - Choose version bump

3. **Release**:
   - Run `/release-patch` (or minor/major)
   - Publish to npm
   - Create GitHub release

4. **Post-Release**:
   - Update CHANGELOG.md
   - Announce in Discord/Slack
   - Update documentation site

## Skip Tests Mode

For rapid pre-release checks (not recommended for final release):

```bash
/pre-release --skip-tests
```

**Skips**:
- Unit test execution
- Coverage report generation

**When to use**:
- Quick validation during release prep
- When tests already passed in CI/CD
- For documentation-only releases

**When NOT to use**:
- Final release validation
- First time publishing
- After significant code changes

## Common Issues & Fixes

### Tests Failing

**Issue**: Unit tests fail during pre-release

**Solution**:
1. Run tests locally: `cd packages/react && npm test`
2. Fix failing tests
3. Verify with `npm test -- ComponentName`
4. Run `/pre-release` again

### Build Failing

**Issue**: TypeScript compilation errors

**Solution**:
1. Check error output for file:line numbers
2. Fix type errors
3. Run `npm run type-check` to verify
4. Run `/pre-release` again

### Pre-Publish Check Failing

**Issue**: Missing artifacts or invalid package.json

**Solution**:
1. Review specific check that failed
2. Fix the issue (e.g., add missing README)
3. Run `npm run prepublish:check` directly to verify
4. Run `/pre-release` again

### NPM Authentication Failed

**Issue**: Not logged in to npm

**Solution**:
```bash
npm login
# Follow prompts
# Then run /pre-release again
```

## Fail-Fast Philosophy

This skill **fails fast** - stops at first error:
- If audit fails → stops (no point building broken code)
- If build fails → stops (can't test broken build)
- If tests fail → stops (can't publish broken code)
- If pre-publish checks fail → stops (can't publish invalid package)

**Why?** Saves time and prevents cascading issues.

## Exit Codes

- **Exit code 0** = All checks passed (ready to publish)
- **Exit code 1** = At least one check failed (not ready)

## CI/CD Integration

This skill can run in CI/CD:

```yaml
# .github/workflows/release.yml
- name: Pre-Release Validation
  run: npm run pre-release

- name: Publish if validation passed
  if: success()
  run: npm run release:patch
```

**Benefits**:
- Automated release validation
- Prevents manual mistakes
- Consistent release process

## References

- Full audit: `/audit` skill
- Build: `npm run build:all`
- Tests: `npm run test:coverage`
- Registry: `npm run build:registry-api`
- Pre-publish checks: `scripts/pre-publish-check.js`
- Release script: `scripts/release.js`
