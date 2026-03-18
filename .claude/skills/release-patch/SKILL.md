---
name: release-patch
description: Automated patch release (1.0.0 → 1.0.1). Auto-triggers when user says "release patch", "publish patch", "bump patch version", or "patch release". Includes audit, build, and npm publish with git tagging.
allowed-tools: ["Bash"]
disable-model-invocation: true
argument-hint: [--dry-run]
---

# Release Patch Version

Automated patch release: bumps version (1.0.0 → 1.0.1), builds, and publishes to npm.

## What This Does

1. **Validates system health** - Pre-release audit
2. **Bumps patch version** - Updates package.json in all workspace packages
3. **Builds all packages** - Clean build from scratch
4. **Publishes to npm** - Uploads packages to npm registry
5. **Creates git tag** - Tags commit as `v1.0.1`
6. **Commits changes** - Commits version bump

**Example**: 3.2.0 → 3.2.1

**Use for**: Bug fixes, documentation updates, internal improvements

**Runtime**: ~3-5 minutes (audit + build + publish)

## Usage

```bash
/release-patch
/release-patch --dry-run  # Preview without publishing
```

## Execution Steps

1. **Confirmation**: Ask user "Ready to release patch version?"
2. **Pre-release audit**: Run `/pre-release` validation
3. **Execute release**: Run `npm run release:patch`
4. **Report success**: Show new version and npm links

**Why confirmation?** This is a destructive operation that publishes to npm and pushes to git. Cannot be easily undone.

## Commands

```bash
# Dry run (preview)
cd "/Users/alfredo/Documents/AI First DS Library" && npm run release:dry

# Actual release
cd "/Users/alfredo/Documents/AI First DS Library" && npm run release:patch
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "release patch version"
- "publish patch"
- "bump to 3.2.1" (patch version)
- "patch release"

**Manual invocation only**: User must explicitly invoke this skill (not auto-triggered by AI)

**Why?** Publishing is destructive and requires human decision.

## Confirmation Required

Before running, ask user:

```
Ready to release patch version?

Current version: 3.2.0
New version: 3.2.1

This will:
1. Bump version in all packages
2. Build and publish to npm
3. Create git tag v3.2.1
4. Commit and push changes

Continue? (yes/no)
```

**If user says no**: Cancel operation, exit skill

**If user says yes**: Proceed with release

## Success Output Format

```
🚀 Releasing Patch Version...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Pre-Release Validation
   All checks passed

✅ Version Bump: 3.2.0 → 3.2.1

✅ Build Packages
   - @orion-ds/react@3.2.1
   - @orion-ds/core@1.3.1
   - @orion-ds/cli@1.0.1

✅ Publish to npm
   - @orion-ds/react@3.2.1
     https://www.npmjs.com/package/@orion-ds/react/v/3.2.1

   - @orion-ds/core@1.3.1 (deprecated)
     https://www.npmjs.com/package/@orion-ds/core/v/1.3.1

   - @orion-ds/cli@1.0.1
     https://www.npmjs.com/package/@orion-ds/cli/v/1.0.1

✅ Git Tag Created: v3.2.1

✅ Committed: "chore: release v3.2.1"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Release v3.2.1 published successfully!

Next steps:
1. Update CHANGELOG.md
   - Document bug fixes
   - Note any internal changes

2. Create GitHub release
   gh release create v3.2.1 --notes "Bug fixes and improvements"

3. Announce release
   - Discord/Slack: "Orion v3.2.1 released!"
   - Twitter: "#OrionDS v3.2.1 now available"

4. Update documentation site
   - Deploy latest docs
   - Update version number

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🚀 Releasing Patch Version...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Pre-Release Validation FAILED

   Tests failed: 5/145 tests

   Failed:
   - Chat.test.tsx: "should handle file upload"
   - Button.test.tsx: "should toggle theme"

   Fix failing tests before releasing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ RELEASE ABORTED

   System is not ready for release

   Fix:
   1. Run /test-full to see all failures
   2. Fix failing tests
   3. Run /pre-release to verify
   4. Run /release-patch again

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Dry Run Mode

Preview release without publishing:

```bash
/release-patch --dry-run
```

**What it does**:
- Runs pre-release validation
- Shows what version would be bumped to
- Shows which packages would be published
- Does NOT publish to npm
- Does NOT create git tag
- Does NOT commit changes

**Use for**:
- Testing release process
- Verifying package contents
- Checking npm authentication
- Practice runs

**Output example**:
```
🔍 DRY RUN - No changes will be made

Version bump: 3.2.0 → 3.2.1

Packages to publish:
- @orion-ds/react@3.2.1
- @orion-ds/core@1.3.1
- @orion-ds/cli@1.0.1

✅ Dry run complete - everything looks good!

To publish for real, run:
/release-patch
```

## Release Script Steps (Detailed)

The `npm run release:patch` script orchestrates 6 steps:

### Step 1: Validate NPM Authentication
```bash
npm whoami
```
- Checks if logged in to npm
- Verifies publish permissions
- Fails fast if not authenticated

### Step 2: Bump Version
```bash
npm version patch --no-git-tag-version --workspaces
```
- Updates package.json in all workspace packages
- Increments patch number (1.0.0 → 1.0.1)
- Keeps versions in sync across monorepo

### Step 3: Run Pre-Publish Checks
```bash
npm run prepublish:check
```
- Validates build artifacts
- Checks package.json validity
- Ensures README/LICENSE present
- Confirms TypeScript declarations exist

### Step 4: Build All Packages
```bash
npm run build:all
```
- Clean build from scratch
- Generates production bundles
- Creates TypeScript declarations
- Updates theme.css

### Step 5: Publish to npm
```bash
npm publish --access public --workspace=@orion-ds/react
npm publish --access public --workspace=@orion-ds/core
# ... for each package
```
- Uploads to npm registry
- Makes public (not scoped/private)
- Creates immutable release

### Step 6: Git Tag and Commit
```bash
git add .
git commit -m "chore: release v3.2.1"
git tag v3.2.1
git push origin main --tags
```
- Commits version bump changes
- Creates git tag for release
- Pushes to remote repository

## Related Skills

**Before release**:
- `/pr-ready` - Prepare code for PR
- `/pre-release` - Validate system health
- `/test-full` - Run complete test suite

**Alternative releases**:
- `/release-minor` - Minor version (1.0.0 → 1.1.0)
- `/release-major` - Major version (1.0.0 → 2.0.0)

**After release**:
- Update CHANGELOG.md manually
- Create GitHub release with `gh release create`
- Announce in community channels

## When to Use Patch Release

Use patch releases for:
- ✅ Bug fixes
- ✅ Documentation updates
- ✅ Internal refactoring
- ✅ Performance improvements (no API changes)
- ✅ Dependency updates
- ✅ Build process improvements

**Do NOT use** for:
- ❌ New features (use minor)
- ❌ Breaking changes (use major)
- ❌ New components (use minor)
- ❌ API changes (use minor or major)

## Semantic Versioning (semver)

**Format**: MAJOR.MINOR.PATCH (e.g., 3.2.1)

- **MAJOR**: Breaking changes (3.0.0 → 4.0.0)
- **MINOR**: New features, backward compatible (3.2.0 → 3.3.0)
- **PATCH**: Bug fixes, backward compatible (3.2.0 → 3.2.1)

**Examples**:
```
1.0.0 → 1.0.1  Patch: Fixed button hover state bug
1.0.1 → 1.1.0  Minor: Added new Card component
1.1.0 → 2.0.0  Major: Removed deprecated Button sizes
```

## NPM Package Links

After publishing, packages are available at:

```
https://www.npmjs.com/package/@orion-ds/react/v/3.2.1
https://www.npmjs.com/package/@orion-ds/core/v/1.3.1
https://www.npmjs.com/package/@orion-ds/cli/v/1.0.1
https://www.npmjs.com/package/@orion-ds/mcp/v/1.0.1
https://www.npmjs.com/package/@orion-ds/validate/v/1.0.1
```

**Users install with**:
```bash
npm install @orion-ds/react@3.2.1
```

## Git Tags

Tags are created in format `vMAJOR.MINOR.PATCH`:

```
v3.2.1
v3.2.2
v3.3.0
v4.0.0
```

**View tags**:
```bash
git tag
git log v3.2.1  # Show commit for specific tag
```

**Tags enable**:
- GitHub release creation
- Changelog generation
- Version history tracking
- Rollback if needed

## Rollback (If Needed)

If release has critical issues:

### Option 1: Publish New Patch
```bash
# Fix the issue
/release-patch  # Publishes v3.2.2 with fix
```

### Option 2: Deprecate Version
```bash
npm deprecate @orion-ds/react@3.2.1 "Critical bug, use 3.2.2 instead"
```

### Option 3: Unpublish (within 72 hours)
```bash
npm unpublish @orion-ds/react@3.2.1
```

**Recommended**: Option 1 (publish fix) - most transparent

## Common Issues & Fixes

### Not Logged in to npm

**Issue**: `npm whoami` fails

**Solution**:
```bash
npm login
# Follow prompts
# Then run /release-patch again
```

### Version Already Published

**Issue**: Version 3.2.1 already exists on npm

**Solution**:
```bash
# Bump to next patch
npm version patch
# Then run /release-patch again
```

### Tests Failing

**Issue**: Pre-release validation fails

**Solution**:
1. Run `/test-full` to see failures
2. Fix failing tests
3. Run `/pre-release` to verify
4. Run `/release-patch` again

### Build Failing

**Issue**: Build errors during release

**Solution**:
1. Run `npm run build` to see errors
2. Fix TypeScript/build issues
3. Run `/release-patch` again

### Git Push Failed

**Issue**: Can't push to remote (permissions, conflicts)

**Solution**:
1. Pull latest changes: `git pull origin main`
2. Resolve conflicts if any
3. Push manually: `git push origin main --tags`

## Exit Codes

- **Exit code 0** = Release successful
- **Exit code 1** = Release failed (validation, build, or publish error)

## Invocation Control

**User-only invocation**: `disable-model-invocation: true`

**Why?** Publishing to npm is destructive and requires:
- Human decision
- Confirmation
- Understanding of release impact

**AI cannot invoke** this skill automatically.

## References

- Release script: `scripts/release.js`
- Pre-publish checks: `scripts/pre-publish-check.js`
- Semantic versioning: https://semver.org
- npm publish docs: https://docs.npmjs.com/cli/publish
- Git tagging: https://git-scm.com/book/en/v2/Git-Basics-Tagging
