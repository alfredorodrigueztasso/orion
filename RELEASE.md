# Release Management & GitHub Releases

Complete guide to publishing new versions of Orion Design System with automated GitHub Releases and npm publishing.

---

## Quick Start

### 1. Update CHANGELOG.md

Add a new entry at the top of CHANGELOG.md for the new version:

```markdown
## [5.5.3] — 2026-03-26

### Fixed
- Describe your fixes here
- List each fix on its own line

### Added
- Describe new features

### Changed
- Describe breaking changes or behavioral changes

### Migration
- No breaking changes. Update with: `npm install @orion-ds/react@5.5.3`
```

**Format rules:**
- Version must be semantic: `MAJOR.MINOR.PATCH`
- Date format: `YYYY-MM-DD`
- Must include at least one section (Fixed, Added, Changed, etc.)
- Must include a Migration section at the end

### 2. Run Release Command

```bash
# Patch release (1.0.0 → 1.0.1)
npm run release:patch

# Minor release (1.0.0 → 1.1.0)
npm run release:minor

# Major release (1.0.0 → 2.0.0)
npm run release:major
```

### 3. Push Tags to GitHub

After the release script completes successfully, push the git tag:

```bash
git push origin --tags
```

Or push a specific tag:

```bash
git push origin v5.5.3
```

### 4. GitHub Actions Automates the Rest

Once tags are pushed, GitHub Actions will:
1. ✅ Extract CHANGELOG entry for the version
2. ✅ Create a GitHub Release with changelog as description
3. ✅ Publish all packages to npm with correct versioning
4. ✅ Set npm dist-tag to `latest`

---

## Release Workflow in Detail

### Release Script Steps (npm run release:patch/minor/major)

```
[1/6] Check npm authentication
  └─ Ensure npm credentials are valid (npm login)

[2/6] Calculate new version
  └─ Determine bump from current version (semantic versioning)

[3/6] Update package.json files
  └─ Update all workspace package.json files with new version

[4/6] Run validation suite
  └─ npm run audit (validate tokens, type-check)

[5/6] Build packages
  └─ npm run build:release (tokens + packages + validation)

[6/6] Publish to npm
  └─ Publish all 5 packages with --access public

[7/7] Create Git Tag
  └─ Tag: git tag -a v{version} -m "Release message"
  └─ You then push: git push origin --tags
```

### GitHub Actions Workflow (on tag push)

File: `.github/workflows/release.yml`

**Job 1: Create GitHub Release**
- Extract version from git tag
- Read CHANGELOG.md for matching version
- Extract changelog section for that version
- Create GitHub Release with changelog as body
- Release automatically appears on GitHub Releases page

**Job 2: Publish to npm**
- Verify version consistency (tag matches package.json)
- Run full validation suite
- Build all packages
- Publish each package to npm registry
- Set dist-tag to `latest`

---

## Version Stability & Support

### Current Release Status (Mar 26, 2026)

| Version | Status | Recommendation | Notes |
|---------|--------|-----------------|-------|
| **v5.5.2** | ✅ LATEST | ✅ **Recommended** | All fixes, latest features, safe for production |
| **v5.5.1** | ✅ Stable | ✅ **Recommended** | useThemeContext strict mode (DISC-003) |
| **v5.5.0** | ✅ Stable | ✅ **Recommended** | CodeEditor optimizations (30s → 2-3s tests) |
| **v5.4.0** | ✅ Stable | ✅ **Recommended** | API drift detection, ESM compliance |
| **v5.3.2** | ✅ Stable | ✅ **Recommended** | Critical build fixes (PRE-001, PRE-007–009) |
| **v5.3.1** | ⚠️ Partial | ⚠️ **Not Recommended** | ESM hotfix only, missing build sequencing fix |
| **v5.3.0** | ❌ BROKEN | ❌ **DO NOT USE** | Critical issues: fresh clone fails, tests timeout, ESM guards incomplete |
| **v5.2.0** | ⚠️ Old | ⛔ **Deprecated** | Chat component removed in v5.3.0 (breaking change) |

### Understanding the Versions

**✅ Safe to Use**:
- `npm install @orion-ds/react@latest` → Gets v5.5.2
- `npm install @orion-ds/react@5.5` → Gets latest patch in v5.5.x series
- Any version in green checkmark column is safe

**⚠️ Use with Caution**:
- `npm install @orion-ds/react@5.3.1` → Missing critical build fix
- Consider upgrading to v5.3.2 or later instead

**❌ Avoid**:
- `npm install @orion-ds/react@5.3.0` → See [Incident Report](https://github.com/.../blob/main/.claude/workspace-docs/incidents/INCIDENT_V5_3_0_BUILD_FAILURE.md)
- If already on v5.3.0: `npm install @orion-ds/react@5.5.2` immediately

### What Went Wrong with v5.3.0

v5.3.0 was released with dynamic token type generation (great feature!), but **three critical issues** made it unusable:

1. **PRE-001 (CRITICAL)**: Fresh clone builds fail — `build:react` missing `build:tokens` prerequisite
2. **PRE-003 (MEDIUM)**: Tests timeout at 30+ seconds — blocking CI/CD
3. **PRE-006 (MEDIUM)**: Incomplete `require()` guards — ESM clarity issue

**All fixed in v5.3.2** (released same day, Mar 25, 2026).

**Full Details**: See [INCIDENT_V5_3_0_BUILD_FAILURE.md](./.claude/workspace-docs/incidents/INCIDENT_V5_3_0_BUILD_FAILURE.md)

### Migration Guide

**From v5.3.0 or v5.3.1**:
```bash
npm install @orion-ds/react@5.5.2
# No code changes needed (no breaking API changes)
```

**From v5.2.0**:
```bash
npm install @orion-ds/react@5.5.2
# BREAKING: Chat component removed in v5.3.0
# See MIGRATION_v5.md for replacement patterns
```

### Support Policy

- **Latest version (v5.5.2)**: Full support, security updates, feature requests
- **Previous stable versions (v5.4.0, v5.3.2, v5.5.0, v5.5.1)**: Bug fixes, security updates
- **v5.3.1**: Recommended to upgrade to v5.3.2 (same release day)
- **v5.3.0 and below**: No longer supported (too many issues)

---

## Release Checklist

Before running `npm run release:patch`:

- [ ] CHANGELOG.md updated with new version entry
- [ ] CHANGELOG.md entry follows format rules (see above)
- [ ] All code changes committed to git
- [ ] Tests passing: `npm run audit`
- [ ] Type checking passing: `npm run type-check`
- [ ] ESM validation passing: `npm run validate:esm`

After running `npm run release:patch`:

- [ ] Release script completed with "SUCCESS"
- [ ] Git tag created locally (`git tag --list v5.5.*`)
- [ ] Git tag pushed to GitHub: `git push origin --tags`
- [ ] GitHub Actions workflow triggered
- [ ] GitHub Release created automatically
- [ ] npm packages published (check npm registry)

---

## Dry-Run Mode

Test the entire release process without publishing:

```bash
npm run release:dry
```

**What dry-run does:**
- ✅ Tests npm authentication
- ✅ Calculates new version
- ✅ Shows what would be updated
- ✅ Shows what would be built
- ✅ Shows what would be published
- ❌ Does NOT update files
- ❌ Does NOT publish to npm
- ❌ Does NOT create git tag

**Use this to verify:**
- Package.json versions are correct
- Release script logic is working
- No unexpected side effects

---

## CHANGELOG Validation

Validate CHANGELOG.md before releasing:

```bash
npm run validate:changelog
```

**Checks:**
- ✓ Version header format is correct
- ✓ No duplicate version entries
- ✓ All entries have content
- ✓ Current package version has entry
- ✓ Dates are present

---

## Manual GitHub Release (Advanced)

If GitHub Actions fails or you need to create a release manually:

```bash
# 1. Go to GitHub Releases page
https://github.com/alfredorodrigueztasso/orion/releases/new

# 2. Fill in:
Tag version: v5.5.3
Title: Release v5.5.3
Description: [Copy from CHANGELOG.md section for 5.5.3]

# 3. Click "Publish Release"
```

---

## Troubleshooting

### "Not logged in to npm"
```bash
npm login
# Then try again: npm run release:patch
```

### "Version mismatch between tag and package.json"
This means the git tag doesn't match the version in packages/react/package.json.

**Fix:**
- Check the tag: `git tag -l v5.5.*`
- Check package.json: `jq '.version' packages/react/package.json`
- If they differ, create a new tag or fix package.json

### "Build failed during release"
The release script stops before publishing if build fails.

**Fix:**
```bash
# Run build separately to debug
npm run build:release

# Fix the issues, then run release again
npm run release:patch
```

### "GitHub Actions workflow didn't trigger"
After pushing tags, GitHub Actions takes 30-60 seconds to start.

**Check:**
1. Go to GitHub Actions tab
2. Look for workflow named "Release"
3. Check if it's queued or running
4. If not showing, ensure tags were pushed: `git push origin --tags`

### "Package already published"
If npm says the version already exists, you need to increment the version.

**Fix:**
- Use `npm run release:minor` or `npm run release:major` instead
- Or manually increment `packages/react/package.json` and try again

---

## Workflow Customization

### Change release behavior

Edit `.github/workflows/release.yml` to customize:
- Which packages get published
- Build steps before publishing
- Notifications after release

### Change CHANGELOG format

Edit `scripts/validate-changelog.js` to customize:
- Version header format requirements
- Required sections per version
- Validation rules

### Change release script

Edit `scripts/release.js` to customize:
- Bump calculation logic
- Which packages are versioned together
- Post-release steps

---

## FAQ

**Q: Can I skip CHANGELOG update?**
A: Not recommended. CHANGELOG is your user-facing documentation. Always update it before releasing.

**Q: What if I want to release without pushing to GitHub?**
A: That's fine. Just run `npm run release:patch` and don't push tags. Packages will be on npm, but no GitHub Release will be created.

**Q: Can I revert a release?**
A: Partially. You can:
- Delete the git tag: `git tag -d v5.5.3 && git push origin --delete v5.5.3`
- Unpublish from npm (if within 72 hours): `npm unpublish @orion-ds/react@5.5.3`
- Then re-release with correct version

**Q: Do all packages have to be same version?**
A: Yes. The release script ensures all packages in `packages/` are versioned together for consistency.

---

## Environment Variables

GitHub Actions uses these environment variables during release:

| Variable | Source | Used For |
|----------|--------|----------|
| `NODE_AUTH_TOKEN` | GitHub Secrets | npm authentication |
| `GITHUB_TOKEN` | GitHub (automatic) | GitHub API calls |
| `NODE_VERSION` | Workflow env | Node.js setup |
| `PNPM_VERSION` | Workflow env | pnpm setup |

**To update npm credentials:**
1. Go to Repository Settings → Secrets and variables → Actions
2. Update or create `NPM_TOKEN` with your npm auth token
3. Next release will use new credentials

---

## See Also

- `CHANGELOG.md` - Release notes for all versions
- `.github/workflows/release.yml` - GitHub Actions automation
- `scripts/release.js` - Release script logic
- `scripts/validate-changelog.js` - CHANGELOG validation
- `package.json` - Release commands: `npm run release:*`

---

**Last updated:** Mar 26, 2026
**Maintained by:** Orion Team
