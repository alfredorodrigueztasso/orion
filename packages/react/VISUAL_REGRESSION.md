# Visual Regression Testing with Percy

Automated visual testing to catch UI regressions across themes, brands, and browsers.

## Overview

Percy captures screenshots of all Storybook stories and compares them against baseline images. Any visual changes are flagged for review before merging PRs.

## Setup

### 1. Percy Account

Create a free Percy account at https://percy.io/signup

### 2. Create Percy Project

1. Go to https://percy.io/projects/new
2. Name: `orion-ds-react`
3. Framework: Storybook
4. Copy the `PERCY_TOKEN`

### 3. Set Environment Variable

**Local development:**

```bash
# Add to ~/.bashrc or ~/.zshrc
export PERCY_TOKEN=your_percy_token_here
```

**GitHub Actions:**

1. Go to repository Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `PERCY_TOKEN`
4. Value: Your Percy token
5. Click "Add secret"

## Running Visual Tests

### Local Snapshots

```bash
# Build Storybook
npm run build-storybook

# Run Percy snapshots
npm run percy

# Or do both in one command
npm run test:visual
```

Output:

```
[percy] Percy has started!
[percy] Snapshot taken: Button - Primary
[percy] Snapshot taken: Button - Secondary
[percy] Snapshot taken: Card - Default
[percy] Build #123 started: https://percy.io/org/orion-ds-react/builds/123
[percy] Build #123 finished! [Approved]
```

### Review Changes

1. Percy creates a build for each run
2. Go to the build URL (shown in console)
3. Review visual diffs side-by-side
4. Approve or reject changes

### CI Integration

Percy runs automatically on every PR:

- Captures all Storybook stories
- Compares against main branch baseline
- Posts status check to PR
- Blocks merge if not approved

## Configuration

Percy is configured in `.percy.yml`:

```yaml
version: 2

browsers:
  - name: chromium
    widths: [375, 768, 1280] # Mobile, Tablet, Desktop
  - name: firefox
    widths: [1280] # Desktop only
  - name: webkit
    widths: [375, 1280] # iOS + Safari

snapshot:
  minHeight: 1024
  enableJavaScript: true

  # Disable animations for consistent snapshots
  percyCSS: |
    * { animation-duration: 0s !important; }
```

## Coverage

Percy captures **ALL Storybook stories** across:

### Components (51 stories)

- Button, Card, Modal, Dropdown, Tabs, etc.
- All variants (primary, secondary, ghost, etc.)
- All states (default, hover, disabled, loading)

### Sections (41 stories)

- Navbar, Sidebar, Hero, Features, etc.
- Complex composed components

### Templates (10 stories)

- Dashboard, Landing Page, Login, etc.
- Full-page layouts

### Themes & Brands

- **Light theme** (default)
- **Dark theme** (via global parameter)
- **4 brands**: orion, red, deepblue, orange

### Viewports

- **375px** - Mobile (iPhone, Pixel)
- **768px** - Tablet (iPad)
- **1280px** - Desktop

**Total snapshots per build:** ~500-600 screenshots

- 102 stories × 2 themes × 3 viewports × 1-2 browsers = ~600 snapshots

## Best Practices

### 1. Stabilize Dynamic Content

Use `data-percy-hide` for dynamic content:

```tsx
<div data-percy-hide>
  {/* Timestamps, random data, etc. */}
  <p>Generated at {Date.now()}</p>
</div>
```

### 2. Ignore Regions

Use `data-percy-ignore` for specific elements:

```tsx
<div data-percy-ignore>
  {/* Video players, maps, etc. */}
  <VideoPlayer />
</div>
```

### 3. Mark Ready State

For components with async loading:

```tsx
<div data-percy-ready={isLoaded}>{isLoaded ? <Content /> : <Skeleton />}</div>
```

### 4. Disable Animations

Percy automatically disables animations via `percyCSS`, but you can also:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0s !important;
    transition-duration: 0s !important;
  }
}
```

## Workflow

### Making Visual Changes

1. Make changes to component styles
2. Run Storybook locally: `npm run storybook`
3. Verify changes look correct
4. Commit and push changes
5. Percy runs automatically on PR
6. Review visual diffs in Percy dashboard
7. Approve changes if intentional
8. Merge PR

### Reviewing Percy Builds

**No changes:**

```
✅ Build finished - No changes detected
```

**Changes detected:**

```
⚠️ Build finished - 5 changes detected
👁️ Review at: https://percy.io/org/project/builds/123
```

Click link to review:

- Side-by-side comparison
- Diff overlay showing exact pixel changes
- Approve all or individual changes

### Handling False Positives

If Percy flags changes that aren't regressions:

1. Review the diff carefully
2. Check if it's anti-aliasing or font rendering
3. Adjust `.percy.yml` threshold if needed
4. Approve the build

## Troubleshooting

### Build Failed

```bash
# Check if Storybook builds correctly
npm run build-storybook

# Check for console errors
npx percy exec -- npx http-server storybook-static --port 8080 &
```

### Token Not Found

```bash
# Verify token is set
echo $PERCY_TOKEN

# Re-export token
export PERCY_TOKEN=your_token_here
```

### Too Many Snapshots

```yaml
# In .percy.yml, exclude specific stories
stories:
  exclude:
    - "**/Docs.stories.*"
    - "**/internal/**"
```

### Snapshots Look Different Locally vs CI

- Fonts may render differently on different OS
- Ensure same Chromium version
- Use Percy's browser environments (recommended)

## Percy Dashboard

### Build Status

- ✅ **Approved** - All changes reviewed and approved
- ⚠️ **Unreviewed** - Changes detected, awaiting review
- ❌ **Failed** - Build error or threshold exceeded

### Baseline Updates

When you approve changes, Percy updates the baseline:

- Next builds compare against new baseline
- Previous baseline is archived

### Build Comparisons

Compare any two builds:

1. Go to Percy dashboard
2. Select two builds
3. Click "Compare builds"
4. See all differences side-by-side

## Cost & Limits

**Percy Free Plan:**

- 5,000 snapshots/month
- Unlimited team members
- 1 concurrent build

**Snapshot Math:**

- 102 stories × 2 themes × 3 viewports = 612 snapshots/build
- 5,000 / 612 = ~8 builds/month on free plan
- Upgrade for more snapshots or concurrent builds

**Pro Tips:**

- Exclude non-critical stories to save snapshots
- Combine theme/brand variations in single story
- Use `include`/`exclude` in `.percy.yml`

## Additional Resources

- Percy Docs: https://www.percy.io/docs
- Storybook Integration: https://www.percy.io/docs/integrations/storybook
- Best Practices: https://www.percy.io/docs/learn/best-practices

---

**Last Updated:** 2026-02-13
**Coverage:** ~600 snapshots per build (102 stories × 2 themes × 3 viewports)
**Browsers:** Chromium, Firefox, WebKit
