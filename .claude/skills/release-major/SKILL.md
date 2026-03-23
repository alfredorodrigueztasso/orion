---
name: release-major
description: Automated major release (1.0.0 → 2.0.0). Auto-triggers when user says "release major", "publish major", "bump major version", or "major release". Includes audit, build, and npm publish with git tagging.
allowed-tools: ["Bash"]
disable-model-invocation: true
argument-hint: [--dry-run]
---

# Release Major Version

Automated major release: bumps version (1.0.0 → 2.0.0), builds, and publishes to npm.

## What This Does

1. **Validates system health** - Pre-release audit
2. **Bumps major version** - Updates package.json in all workspace packages
3. **Builds all packages** - Clean build from scratch
4. **Publishes to npm** - Uploads packages to npm registry
5. **Creates git tag** - Tags commit as `v2.0.0`
6. **Commits changes** - Commits version bump

**Example**: 3.2.0 → 4.0.0

**Use for**: Breaking API changes, major refactors, deprecated feature removals, significant new direction

**Runtime**: ~3-5 minutes (audit + build + publish)

⚠️ **WARNING**: Major releases indicate breaking changes. Users may need to update their code. Communicate clearly before releasing.

## Usage

```bash
/release-major
/release-major --dry-run  # Preview without publishing
```

## Execution Steps

1. **Confirmation**: Ask user "Ready to release MAJOR version?" (with emphasis)
2. **Breaking changes check**: Ask user to confirm breaking changes are documented
3. **Pre-release audit**: Run `/pre-release` validation
4. **Execute release**: Run `npm run release:major`
5. **Report success**: Show new version and npm links

**Why strong confirmation?** Major releases indicate breaking changes. This is the most significant release type and requires careful consideration.

## Commands

```bash
# Dry run (preview)
cd "/Users/alfredo/Documents/AI First DS Library" && npm run release:dry

# Actual release
cd "/Users/alfredo/Documents/AI First DS Library" && npm run release:major
```

## Auto-Trigger Patterns

This skill auto-triggers when user says:
- "release major version"
- "publish major"
- "bump major"
- "major release"

**Manual invocation only**: User must explicitly invoke this skill (not auto-triggered by AI)

**Why?** Publishing is destructive and requires human decision. Major releases need extra care.

## Confirmation Required

Before running, ask user with emphasis:

```
⚠️  MAJOR RELEASE — Breaking Changes

Current version: 3.2.0
New version: 4.0.0

This will:
1. Bump MAJOR version (indicates breaking changes)
2. Build and publish to npm
3. Create git tag v4.0.0
4. Commit and push changes

⚠️  IMPORTANT:
- Have you documented all breaking changes?
- Have you updated migration guides?
- Have you notified stakeholders?

Continue? (yes/no)
```

**If user says no**: Cancel operation, exit skill

**If user says yes**: Proceed with release

## Success Output Format

```
🚀 Releasing MAJOR Version...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Pre-Release Validation
   All checks passed

✅ Version Bump: 3.2.0 → 4.0.0 (MAJOR RELEASE)

✅ Build Packages
   - @orion-ds/react@4.0.0
   - @orion-ds/cli@2.0.0

✅ Publish to npm
   - @orion-ds/react@4.0.0
     https://www.npmjs.com/package/@orion-ds/react/v/4.0.0

   - @orion-ds/cli@2.0.0
     https://www.npmjs.com/package/@orion-ds/cli/v/2.0.0

✅ Git Tag Created: v4.0.0

✅ Committed: "chore: release v4.0.0"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎉 MAJOR Release v4.0.0 published successfully!

⚠️  POST-RELEASE TASKS (CRITICAL):

1. Update Documentation
   [ ] CHANGELOG.md — Document breaking changes in detail
   [ ] Migration guide — How to upgrade from v3.x to v4.x
   [ ] API reference — All changed endpoints/methods
   [ ] Example code — Update all code examples

2. Stakeholder Communication
   [ ] GitHub release page — Detailed breaking changes list
   [ ] Blog post — Announcement with migration guide
   [ ] Email/Slack — Notify all users
   [ ] Twitter/Social — Announce major release

3. Community Support
   [ ] Pin migration guide in Discord/Community
   [ ] Prepare support team for upgrade questions
   [ ] Monitor issue tracker for upgrade problems

4. Post-Release Monitoring
   [ ] Track adoption of v4.0.0
   [ ] Monitor for critical issues
   [ ] Plan patch releases if needed
   [ ] Sunset timeline for v3.x support

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Failure Output Format

```
🚀 Releasing MAJOR Version...

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
   4. Run /release-major again

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Dry Run Mode

Preview release without publishing:

```bash
/release-major --dry-run
```

**What it does**:
- Runs pre-release validation
- Shows what version would be bumped to
- Shows which packages would be published
- Does NOT publish to npm
- Does NOT create git tag
- Does NOT commit changes

## When to Use Major Release

Use major releases for:
- ✅ API breaking changes
- ✅ Removing deprecated features
- ✅ Changing component API
- ✅ Removing components
- ✅ Significant architectural changes
- ✅ Major new direction/rewrite

**Do NOT use** for:
- ❌ Bug fixes (use patch)
- ❌ New backward-compatible features (use minor)
- ❌ Internal refactoring only (use patch)

## Breaking Changes Checklist

Before releasing major, ensure:

- [ ] All breaking changes are listed in CHANGELOG
- [ ] Migration guide is written
- [ ] Code examples are updated
- [ ] API documentation is updated
- [ ] Deprecation warnings are in v3.x (if possible)
- [ ] Community has been notified
- [ ] FAQ/Help docs prepared
- [ ] Stakeholders approved

## Related Skills

**Before release**:
- `/pr-ready` - Prepare code for PR
- `/pre-release` - Validate system health
- `/test-full` - Run complete test suite

**Alternative releases**:
- `/release-patch` - Patch version (1.0.0 → 1.0.1)
- `/release-minor` - Minor version (1.0.0 → 1.1.0)

**After release**:
- Create comprehensive GitHub release with migration guide
- Blog post announcing release and breaking changes
- Email all users about upgrade path
- Document sunset date for previous major version

## Exit Codes

- **Exit code 0** = Release successful
- **Exit code 1** = Release failed (validation, build, or publish error)

## Semantic Versioning (semver)

**Format**: MAJOR.MINOR.PATCH (e.g., 4.0.0)

Major releases are significant events:
- Communicate early and often
- Provide clear upgrade paths
- Support migration efforts
- Monitor adoption closely
