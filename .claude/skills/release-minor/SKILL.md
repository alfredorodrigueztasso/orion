---
name: release-minor
description: Automated minor release (1.0.0 → 1.1.0). Auto-triggers when user says "release minor", "publish minor", "bump minor version", or "minor release". Includes audit, build, and npm publish with git tagging.
allowed-tools: ["Bash"]
disable-model-invocation: true
argument-hint: [--dry-run]
---

# Release Minor Version

Automated minor release: bumps version (1.0.0 → 1.1.0), builds, and publishes to npm.

## What This Does

1. **Validates system health** - Pre-release audit
2. **Bumps minor version** - Updates package.json in all workspace packages
3. **Builds all packages** - Clean build from scratch
4. **Publishes to npm** - Uploads packages to npm registry
5. **Creates git tag** - Tags commit as `v1.1.0`
6. **Commits changes** - Commits version bump

**Example**: 3.2.0 → 3.3.0

**Use for**: New features, backward-compatible functionality, component additions

**Runtime**: ~3-5 minutes (audit + build + publish)

## Usage

```bash
/release-minor
/release-minor --dry-run  # Preview without publishing
```

## Execution Steps

1. **Confirmation**: Ask user "Ready to release minor version?"
2. **Pre-release audit**: Run `/pre-release` validation
3. **Execute release**: Run `npm run release:minor`
4. **Report success**: Show new version and npm links

**Why confirmation?** This is a destructive operation that publishes to npm and pushes to git. Cannot be easily undone.

## Commands

```bash
# Dry run (preview)
cd "/Users/alfredo/Documents/AI First DS Library" && npm run release:dry

# Actual release
cd "/Users/alfredo/Documents/AI First DS Library" && npm run release:minor
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "release minor version"
- "publish minor"
- "bump minor"
- "minor release"

**Manual invocation only**: User must explicitly invoke this skill (not auto-triggered by AI)

**Why?** Publishing is destructive and requires human decision.

## Confirmation Required

Before running, ask user:

```
Ready to release minor version?

Current version: 3.2.0
New version: 3.3.0

This will:
1. Bump version in all packages
2. Build and publish to npm
3. Create git tag v3.3.0
4. Commit and push changes

Continue? (yes/no)
```

**If user says no**: Cancel operation, exit skill

**If user says yes**: Proceed with release

## Success Output Format

```
🚀 Releasing Minor Version...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Pre-Release Validation
   All checks passed

✅ Version Bump: 3.2.0 → 3.3.0

✅ Build Packages
   - @orion-ds/react@3.3.0
   - @orion-ds/cli@1.1.0

✅ Publish to npm
   - @orion-ds/react@3.3.0
     https://www.npmjs.com/package/@orion-ds/react/v/3.3.0

   - @orion-ds/cli@1.1.0
     https://www.npmjs.com/package/@orion-ds/cli/v/1.1.0

✅ Git Tag Created: v3.3.0

✅ Committed: "chore: release v3.3.0"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 Release v3.3.0 published successfully!

Next steps:
1. Update CHANGELOG.md
   - Document new features
   - Note any breaking changes (none for minor)

2. Create GitHub release
   gh release create v3.3.0 --notes "New features and improvements"

3. Announce release
   - Discord/Slack: "Orion v3.3.0 released!"
   - Twitter: "#OrionDS v3.3.0 with new features now available"

4. Update documentation site
   - Deploy latest docs
   - Update version number

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🚀 Releasing Minor Version...

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
   4. Run /release-minor again

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Dry Run Mode

Preview release without publishing:

```bash
/release-minor --dry-run
```

**What it does**:
- Runs pre-release validation
- Shows what version would be bumped to
- Shows which packages would be published
- Does NOT publish to npm
- Does NOT create git tag
- Does NOT commit changes

## When to Use Minor Release

Use minor releases for:
- ✅ New features (backward compatible)
- ✅ New components added
- ✅ New API methods (backward compatible)
- ✅ Performance improvements (no breaking changes)
- ✅ Improved documentation

**Do NOT use** for:
- ❌ Bug fixes (use patch)
- ❌ Breaking changes (use major)
- ❌ API removals (use major)
- ❌ Internal refactoring only (use patch)

## Related Skills

**Before release**:
- `/pr-ready` - Prepare code for PR
- `/pre-release` - Validate system health
- `/test-full` - Run complete test suite

**Alternative releases**:
- `/release-patch` - Patch version (1.0.0 → 1.0.1)
- `/release-major` - Major version (1.0.0 → 2.0.0)

**After release**:
- Update CHANGELOG.md manually
- Create GitHub release with `gh release create`
- Announce in community channels

## Exit Codes

- **Exit code 0** = Release successful
- **Exit code 1** = Release failed (validation, build, or publish error)
