# Breaking Changes Migration Guide
## @orion-ds/react v4.6.2 → v4.9.0

**Quick Reference**: 4 prop renames across 2 components
**Estimated Fix Time**: 15 minutes (automated search-replace possible)
**Risk Level**: ✅ LOW (simple prop renames)

---

## Change 1: Hero Component - `headline` → `title`

### Location Analysis
- **Component**: `Hero` section from `@orion-ds/react/blocks`
- **Files to check**:
  - `docs-site/components/HomepageHero.tsx` (explicitly in CURSOR-INSTRUCTIONS)
  - Any other Hero usage across docs-site

### Current Code (v4.6.2)
```tsx
import { Hero } from '@orion-ds/react/blocks';

export default function HomepageHero() {
  return (
    <Hero
      headline="The design system your AI agent already knows"  // ← OLD
      description="..."
    />
  );
}
```

### New Code (v4.9.0)
```tsx
import { Hero } from '@orion-ds/react/blocks';

export default function HomepageHero() {
  return (
    <Hero
      title="The design system your AI agent already knows"  // ← NEW
      description="..."
    />
  );
}
```

### Search-Replace Pattern
```bash
# From docs-site/ directory:
grep -r "headline" --include="*.tsx" --include="*.ts"

# Replace all occurrences:
sed -i '' 's/headline=/title=/g' components/**/*.tsx
```

### Verification
```bash
npm run type-check  # TypeScript will catch any remaining 'headline' props
```

---

## Change 2: CTA Component - `headline` → `title`

### Location Analysis
- **Component**: `CTA` section from `@orion-ds/react/blocks`
- **Files to check**:
  - `docs-site/components/HomepageCTA.tsx` (mentioned in CURSOR-INSTRUCTIONS)
  - Any modal/dialog CTAs

### Current Code (v4.6.2)
```tsx
import { CTA } from '@orion-ds/react/blocks';

export default function HomepageCTA() {
  return (
    <CTA
      headline="Ready to get started?"  // ← OLD
      description="Join thousands of developers"
      ctaLabel="Start Building"
    />
  );
}
```

### New Code (v4.9.0)
```tsx
import { CTA } from '@orion-ds/react/blocks';

export default function HomepageCTA() {
  return (
    <CTA
      title="Ready to get started?"  // ← NEW
      description="Join thousands of developers"
      ctaLabel="Start Building"
    />
  );
}
```

### Multi-Component Search
```bash
# Find all Hero and CTA usage:
grep -r "headline=" docs-site/components --include="*.tsx"

# Output example:
# HomepageCTA.tsx:      headline="Ready to get started?"
# HomepageHero.tsx:     headline="The design system..."
```

---

## Change 3: DetailPanel - `subtitle` → `description`

### Location Analysis
- **Component**: `DetailPanel` (not mentioned in CURSOR-INSTRUCTIONS)
- **Risk**: LOW — Likely not used in 18 tasks
- **Action**: Check if DetailPanel used anywhere:

```bash
grep -r "DetailPanel" docs-site/components --include="*.tsx"
```

### If DetailPanel is Used
```tsx
// Before (v4.6.2)
<DetailPanel
  title="Account Settings"
  subtitle="Manage your profile"  // ← OLD
/>

// After (v4.9.0)
<DetailPanel
  title="Account Settings"
  description="Manage your profile"  // ← NEW
/>
```

---

## Change 4: ThemeProvider - `options` → Flat Props

### Location Analysis
- **Component**: `ThemeProvider` from `@orion-ds/react`
- **Current usage**: `docs-site/app/layout.tsx` (root layout)

### Current Code (v4.6.2)
```tsx
import { ThemeProvider } from '@orion-ds/react';

export default function RootLayout() {
  return (
    <ThemeProvider>  {/* ← No options needed for defaults */}
      {children}
    </ThemeProvider>
  );
}
```

### New Code (v4.9.0) - Optional Props
```tsx
import { ThemeProvider } from '@orion-ds/react';

export default function RootLayout() {
  return (
    <ThemeProvider
      defaultTheme="light"     // ← Optional: 'light' | 'dark'
      defaultBrand="orion"     // ← Optional: 'orion' | 'red' | 'deepblue' | 'orange'
      disableAutoFontLoading={false}  // ← Optional: disable Google Fonts
      disableFontWarnings={false}     // ← Optional: suppress console warnings
    >
      {children}
    </ThemeProvider>
  );
}
```

### Decision Tree

**Q: Are you setting default theme/brand in docs-site?**

**If NO** (current setup):
```tsx
// ✅ This still works in v4.9.0 (backward compatible for empty props)
<ThemeProvider>
  {children}
</ThemeProvider>
```
**Action**: No changes needed

**If YES** (custom defaults):
```tsx
// ❌ Old pattern (v4.6.2)
<ThemeProvider options={{ defaultTheme: 'dark', defaultBrand: 'red' }}>
  {children}
</ThemeProvider>

// ✅ New pattern (v4.9.0)
<ThemeProvider defaultTheme="dark" defaultBrand="red">
  {children}
</ThemeProvider>
```
**Action**: Flatten the `options` prop

---

## Automated Fix Script

Create a shell script to batch fix all 4 changes:

```bash
#!/bin/bash
# migrate-v4.9.0.sh

set -e

echo "🔄 Migrating to @orion-ds/react v4.9.0..."

# 1. Update package.json
echo "1️⃣ Updating package.json..."
sed -i '' 's/"@orion-ds\/react": "^4.6.2"/"@orion-ds\/react": "^4.9.0"/g' docs-site/package.json

# 2. Hero: headline → title
echo "2️⃣ Fixing Hero headline → title..."
find docs-site/components -name "*.tsx" -exec sed -i '' 's/headline=/title=/g' {} \;

# 3. CTA: headline → title (already covered above)
echo "3️⃣ CTA headlines fixed (same as Hero)"

# 4. DetailPanel: subtitle → description
echo "4️⃣ Fixing DetailPanel subtitle → description..."
find docs-site/components -name "*.tsx" -exec sed -i '' 's/subtitle=/description=/g' {} \;

# 5. ThemeProvider: options → flat props
echo "5️⃣ Checking ThemeProvider usage..."
grep -r "options={" docs-site/app --include="*.tsx" || echo "   (No options prop found - already compatible)"

# 6. Install and verify
echo "6️⃣ Installing dependencies..."
cd docs-site && npm install

echo "7️⃣ Type-checking..."
cd .. && npm run type-check

echo "✅ Migration complete!"
echo "Next: Review changes and test with: npm run dev:packages"
```

### Usage
```bash
chmod +x migrate-v4.9.0.sh
./migrate-v4.9.0.sh
```

---

## Validation Checklist

After applying all 4 changes:

- [ ] **Search for old prop names**:
  ```bash
  grep -r "headline=" docs-site --include="*.tsx"  # Should return 0 results
  grep -r "subtitle=" docs-site --include="*.tsx"  # Should return 0 results (unless deliberate)
  grep -r "options={" docs-site --include="*.tsx"  # Should return 0 results
  ```

- [ ] **TypeScript validation**:
  ```bash
  npm run type-check  # Should pass without "headline", "subtitle", or options errors
  ```

- [ ] **Build verification**:
  ```bash
  cd docs-site && npm run build  # Should complete successfully
  ```

- [ ] **Visual QA** (if time permits):
  ```bash
  npm run dev  # Start dev server, check Hero/CTA/DetailPanel render correctly
  ```

---

## Per-Component Risk Assessment

| Component | Change | Risk | Effort | Status |
|-----------|--------|------|--------|--------|
| **Hero** | `headline` → `title` | ✅ LOW | 1 min | Simple grep-replace |
| **CTA** | `headline` → `title` | ✅ LOW | 1 min | Same as Hero |
| **DetailPanel** | `subtitle` → `description` | ✅ LOW | 1 min (if used) | Verify first |
| **ThemeProvider** | `options` → flat props | ✅ LOW | 2 min (if custom) | Likely no change needed |

---

## Fallback: Manual Component Audit

If you prefer to audit manually instead of scripting:

```bash
# List all Hero/CTA/DetailPanel/ThemeProvider usage:
grep -rn "headline\|subtitle\|options={" docs-site/components docs-site/app --include="*.tsx" | tee /tmp/audit.txt

# Review each line, then apply fixes manually
```

---

## Rollback Plan (if needed)

```bash
# If migration causes issues, revert with:
git checkout -- docs-site/

# Or restore a specific file:
git checkout -- docs-site/components/HomepageHero.tsx
```

---

## Summary

- **Total changes**: 4 prop renames
- **Files affected**: 3-5 (depending on DetailPanel usage)
- **Time to fix**: 10-15 minutes (automated) or 20 minutes (manual review)
- **Breaking change severity**: ⭐ TRIVIAL (simple renames, no behavior changes)
- **Recommended approach**: Use automated script + manual verification

---

**Next Step**: After upgrading package.json to 4.9.0, run the automated fix script above, then proceed with the 18 tasks from CURSOR-INSTRUCTIONS.md.
