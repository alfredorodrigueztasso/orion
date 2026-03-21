# ORION DESIGN SYSTEM - FIX RECOMMENDATIONS
## Quick Resolution Guide for ember Brand Issue

---

## SUMMARY OF ISSUE

The `ember` brand has been added to UI components (PreviewBrandModeBar, DocsNavbar) but is not fully defined in the token system:

- ❌ NOT in tokens/primary.json (no color palette)
- ❌ NOT in tokens/brands.json (no definition)
- ❌ NOT in theme.css (no CSS overrides)
- ❌ NOT in packages/react/src/tokens/ TypeScript files

This causes incomplete implementation that will confuse users when they try to switch to the ember brand.

---

## OPTION 1: REMOVE EMBER BRAND (RECOMMENDED)

**Time**: 5 minutes
**Complexity**: Very Low
**Recommendation**: ✅ RECOMMENDED

### Why Remove?
1. Quick fix with no risk
2. No token system changes needed
3. Maintains coherent 5-brand system
4. Ember can be added later when fully designed

### Step-by-Step

#### Step 1: Edit `/docs-site/components/PreviewBrandModeBar.tsx`

Find the `BRANDS` array and remove the ember entry:

**Before (lines 6, 13-20)**:
```tsx
type Brand = 'orion' | 'red' | 'deepblue' | 'orange' | 'ember' | 'lemon';

const BRANDS: Array<{ id: Brand; label: string; color: string }> = [
  { id: 'orion', label: 'Orion', color: '#1B5BFF' },
  { id: 'red', label: 'Red', color: '#D7282F' },
  { id: 'deepblue', label: 'Deep Blue', color: '#006FBA' },
  { id: 'orange', label: 'Orange', color: '#F15D22' },
  { id: 'ember', label: 'Ember', color: '#C1272D' },      // ← DELETE THIS
  { id: 'lemon', label: 'Lemon', color: '#FBBF24' },
];
```

**After**:
```tsx
type Brand = 'orion' | 'red' | 'deepblue' | 'orange' | 'lemon';

const BRANDS: Array<{ id: Brand; label: string; color: string }> = [
  { id: 'orion', label: 'Orion', color: '#1B5BFF' },
  { id: 'red', label: 'Red', color: '#D7282F' },
  { id: 'deepblue', label: 'Deep Blue', color: '#006FBA' },
  { id: 'orange', label: 'Orange', color: '#F15D22' },
  { id: 'lemon', label: 'Lemon', color: '#FBBF24' },
];
```

#### Step 2: Edit `/docs-site/components/DocsNavbar.tsx`

Same changes as above (lines 11, 14-20):

**Before (line 11)**:
```tsx
type BrandId = 'orion' | 'red' | 'deepblue' | 'orange' | 'ember' | 'lemon';
```

**After**:
```tsx
type BrandId = 'orion' | 'red' | 'deepblue' | 'orange' | 'lemon';
```

**Before (lines 18-19)**:
```tsx
  { id: 'ember', label: 'Ember', color: '#C1272D' },
```

**After**: Delete these lines

#### Step 3: Edit `/docs-site/app/layout.tsx`

Find the inline script and remove ember from the brands array:

**Before** (around line 50, in `<script>` tag):
```tsx
var brands = ['orion','red','deepblue','orange','ember','lemon'];
```

**After**:
```tsx
var brands = ['orion','red','deepblue','orange','lemon'];
```

### Verification

```bash
# Check no ember references remain in components
grep -r "ember" /Users/alfredo/Documents/AI\ First\ DS\ Library/docs-site/components/*.tsx

# Should output: (empty)

# Restart dev server
cd /Users/alfredo/Documents/AI\ First\ DS\ Library/docs-site
npm run dev

# Test in browser
# - Open http://localhost:3001
# - Open brand picker
# - Verify only 5 brands show (no ember)
```

---

## OPTION 2: IMPLEMENT EMBER FULLY

**Time**: 2 hours
**Complexity**: High
**Recommendation**: ⚠️ ONLY IF EMBER IS REQUIRED FOR LAUNCH

### Why Implement?
1. If ember is part of product vision for launch
2. If marketing materials already feature ember
3. If customer demand requires 6 brands

### Step-by-Step

#### Step 1: Add ember colors to `tokens/primary.json`

File: `/Users/alfredo/Documents/AI First DS Library/tokens/primary.json`

**Location**: After orange definition (around line 59)

**Add**:
```json
"ember": {
  "50": "#FDE8E8",
  "100": "#FCD5D5",
  "200": "#FAA5A5",
  "300": "#F87E7E",
  "400": "#E44D54",
  "500": "#C1272D",
  "600": "#B02429",
  "700": "#9A1F23",
  "800": "#83191D",
  "900": "#6D0F13",
  "950": "#47090C"
},
```

#### Step 2: Add ember CSS to `packages/react/assets/theme.css`

File: `/Users/alfredo/Documents/AI First DS Library/packages/react/assets/theme.css`

**Location**: After the lemon [data-brand] block

**Add**:
```css
[data-brand="ember"] {
  /* Brand colors */
  --color-brand-50: #FDE8E8;
  --color-brand-100: #FCD5D5;
  --color-brand-200: #FAA5A5;
  --color-brand-300: #F87E7E;
  --color-brand-400: #E44D54;
  --color-brand-500: #C1272D;
  --color-brand-600: #B02429;
  --color-brand-700: #9A1F23;
  --color-brand-800: #83191D;
  --color-brand-900: #6D0F13;
  --color-brand-950: #47090C;

  /* Interactive tokens (derived from brand colors) */
  --interactive-primary: var(--color-brand-500);
  --interactive-primary-hover: var(--color-brand-700);
  --interactive-primary-active: var(--color-brand-800);
  --interactive-primary-text: #ffffff;

  /* Radius overrides (ember uses pill buttons like red/orange) */
  --radius-button: var(--radius-full);
  --radius-container: var(--radius-3xl);
}
```

#### Step 3: Add ember to `tokens/brands.json`

File: `/Users/alfredo/Documents/AI First DS Library/tokens/brands.json`

**Location**: After lemon definition (around line 181), before closing brace

**Add**:
```json
"ember": {
  "name": "Ember",
  "description": "Ember brand - Deep red with pill buttons",
  "accent": {
    "primary": "{color.brand.ember.500}",
    "light": "{color.brand.ember.100}",
    "dark": "{color.brand.ember.900}"
  },
  "typography": {
    "primary": "Libre Baskerville",
    "secondary": "DM Sans",
    "mono": "JetBrains Mono"
  },
  "geometry": {
    "radiusControl": "{radius.full}",
    "buttonStyle": "pill"
  },
  "semantic": {
    "light": {
      "interactivePrimary": "{color.brand.ember.500}",
      "interactivePrimaryHover": "{color.brand.ember.700}",
      "interactivePrimaryText": "{color.neutral.0}"
    },
    "dark": {
      "interactivePrimary": "{color.brand.ember.500}",
      "interactivePrimaryHover": "{color.brand.ember.400}",
      "interactivePrimaryText": "{color.neutral.0}"
    }
  },
  "usage": {
    "html": "<html data-theme=\"dark\" data-brand=\"ember\">",
    "css": "/* Included in theme.css via [data-brand=\"ember\"] */",
    "attribute": "ember"
  }
}
```

#### Step 4: Regenerate TypeScript types

```bash
cd /Users/alfredo/Documents/AI\ First\ DS\ Library
npm run build:tokens

# This regenerates:
# - packages/react/src/tokens/types.ts
# - packages/react/src/tokens/primitives.ts
# - packages/react/src/tokens/brands.ts
# - packages/react/src/tokens/themes.ts
# - packages/react/src/tokens/utils.ts
```

#### Step 5: Keep ember in components (already done)

No changes needed to PreviewBrandModeBar.tsx or DocsNavbar.tsx—ember is already referenced there.

#### Step 6: Test

```bash
cd /Users/alfredo/Documents/AI\ First\ DS\ Library/docs-site
npm run dev

# In browser console:
document.documentElement.dataset.brand = 'ember'  # Should render red buttons
```

---

## DECISION MATRIX

| Aspect | Option 1 (Remove) | Option 2 (Implement) |
|--------|-------------------|----------------------|
| **Time** | 5 minutes | 2 hours |
| **Risk** | None | Low (if executed correctly) |
| **Files Changed** | 3 | 5 |
| **Token Changes** | 0 | 3 files |
| **Type Regeneration** | None | Yes (npm run build:tokens) |
| **Testing** | Simple | Comprehensive |
| **Deployment Readiness** | Immediate | After tests pass |

---

## FINAL RECOMMENDATION

### 🟢 OPTION 1: REMOVE EMBER BRAND

**Rationale**:
1. **Fastest path to deployment** (5 minutes)
2. **Zero risk** of incomplete implementation
3. **Maintains system coherence** (5 fully-implemented brands)
4. **Ember can be added later** when specifications are finalized
5. **No token system changes** = no type regeneration needed

### Timeline for Future ember Addition
```
Phase 1: Current (Remove ember from v4.9.6)
  ✅ Deploy with 5 brands

Phase 2: Q2 2026 (Design ember fully)
  - Define ember brand specifications
  - Color palette, typography, geometry
  - Customer feedback incorporated

Phase 3: Q2 2026 Release (Add ember to v4.10.0)
  - Follow Option 2 steps above
  - Full testing cycle
  - Deploy as new brand option
```

---

## VERIFICATION SCRIPTS

### After Option 1 (Remove):
```bash
#!/bin/bash
cd /Users/alfredo/Documents/AI\ First\ DS\ Library

# Check no ember in components
echo "Checking for ember references..."
grep -r "ember" docs-site/components/*.tsx && echo "FAIL: ember found" || echo "PASS: no ember"

# Check theme.css has 5 brands (not 6)
echo "Checking theme.css brands..."
grep -c "data-brand=" packages/react/assets/theme.css
# Should output: 4 (deepblue, lemon, orange, red) + orion (default) = 5 total

# Test dev server
cd docs-site
npm run dev &
sleep 5
curl -s http://localhost:3001 | grep -q "data-brand" && echo "PASS: Site running" || echo "FAIL: Site error"
```

### After Option 2 (Implement):
```bash
#!/bin/bash
cd /Users/alfredo/Documents/AI\ First\ DS\ Library

# Check ember is in tokens
echo "Checking tokens/primary.json..."
grep -q '"ember"' tokens/primary.json && echo "PASS: ember in primary.json" || echo "FAIL"

echo "Checking tokens/brands.json..."
grep -q '"ember"' tokens/brands.json && echo "PASS: ember in brands.json" || echo "FAIL"

echo "Checking theme.css..."
grep -c "data-brand=" packages/react/assets/theme.css
# Should output: 5 (deepblue, ember, lemon, orange, red)

# Rebuild types
npm run build:tokens
echo "Types regenerated"

# Test
cd docs-site
npm run dev &
sleep 5
curl -s http://localhost:3001 | grep -q "ember" && echo "PASS: ember in page" || echo "FAIL"
```

---

## SIGN-OFF

**Recommendation**: Remove ember (Option 1)
**Estimated Effort**: 5 minutes
**Risk Level**: None
**Deployment Readiness**: Ready after fix
**QA Notes**: Verify brand picker shows only 5 brands in light and dark modes
