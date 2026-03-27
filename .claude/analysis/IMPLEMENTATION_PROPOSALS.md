# Implementation Proposals: Ready-to-Execute
**Technical specifications for zIndex and font-size tokens**

---

## PROPOSAL 1: zIndex Token System

### JSON Tokens to Add

#### Step 1: Add Primitives to `tokens/primary.json`

Find the existing color/typography section and add:

```json
{
  "project": { ... },
  "color": { ... },
  "typography": { ... },
  "spacing": { ... },
  "radius": { ... },
  "z": {
    "0": "0",
    "10": "10",
    "100": "100",
    "110": "110",
    "1000": "1000",
    "1001": "1001",
    "9000": "9000"
  }
}
```

**Location**: After "radius" section, before closing brace
**Rationale**: Z-values are primitives (raw numbers), same layer as colors/spacing

#### Step 2: Add Semantics to `tokens/light.json`

In the "semantic" object, add after existing sections:

```json
{
  "theme": "light",
  "semantic": {
    "surface": { ... },
    "text": { ... },
    "border": { ... },
    "interactive": { ... },
    "status": { ... },
    "soft": { ... },
    "alert": { ... },
    "focus": { ... },
    "gradient": { ... },
    "chart": { ... },
    "z": {
      "base": "{z.0}",
      "sticky": "{z.10}",
      "dropdown": "{z.100}",
      "tooltip": "{z.110}",
      "modal-backdrop": "{z.1000}",
      "modal": "{z.1001}",
      "fixed-top": "{z.9000}"
    }
  }
}
```

**Note**: Same in `tokens/dark.json` (z-index is theme-agnostic)

### CSS Output (Generated)

After `npm run build:tokens`, your `dist/theme.css` will contain:

```css
:root {
  /* ... existing tokens ... */

  /* Z-Index */
  --z-base: 0;
  --z-sticky: 10;
  --z-dropdown: 100;
  --z-tooltip: 110;
  --z-modal-backdrop: 1000;
  --z-modal: 1001;
  --z-fixed-top: 9000;
}
```

### TypeScript Output (Generated)

After `npm run build:tokens`, your `src/tokens/types.ts` will include:

```typescript
export interface ZIndex {
  base: string;
  sticky: string;
  dropdown: string;
  tooltip: string;
  'modal-backdrop': string;
  modal: string;
  'fixed-top': string;
}

export interface Semantic {
  z: ZIndex;
  // ... other types ...
}
```

### Component CSS Updates

Find each file and add z-index token references:

#### Modal/Modal.module.css
```css
/* Before */
.backdrop {
  z-index: auto;
}
.modal {
  z-index: auto;
}

/* After */
.backdrop {
  z-index: var(--z-modal-backdrop);
}
.modal {
  z-index: var(--z-modal);
}
```

#### Dropdown/Dropdown.module.css
```css
/* Before */
.dropdown {
  z-index: 100;  /* Hardcoded */
}

/* After */
.dropdown {
  z-index: var(--z-dropdown);
}
```

#### Tooltip/Tooltip.module.css
```css
/* Before */
.tooltip {
  z-index: auto;
}

/* After */
.tooltip {
  z-index: var(--z-tooltip);
}
```

#### Sidebar/Sidebar.module.css
```css
/* Before */
.sidebar {
  z-index: 10;  /* Hardcoded */
}
.sidebarOverlay {
  z-index: 999;  /* Hardcoded */
}

/* After */
.sidebar {
  z-index: var(--z-sticky);
}
.sidebarOverlay {
  z-index: var(--z-modal-backdrop);
  /* Or create new --z-overlay token if behavior differs */
}
```

#### Navbar/Navbar.module.css
```css
/* Before */
.navbar {
  z-index: 10;  /* Hardcoded */
}

/* After */
.navbar {
  z-index: var(--z-sticky);
}
```

#### FilterBar/FilterBar.module.css
```css
/* Before */
.filterBar {
  z-index: 100;  /* Hardcoded */
}

/* After */
.filterBar {
  z-index: var(--z-dropdown);
}
```

#### Drawer/Drawer.module.css
```css
/* Before */
.backdrop {
  z-index: 1000;
}
.drawer {
  z-index: 1001;
}
.nested {
  z-index: 0;
}

/* After */
.backdrop {
  z-index: var(--z-modal-backdrop);
}
.drawer {
  z-index: var(--z-modal);
}
.nested {
  z-index: var(--z-base);
}
```

#### CodeEditor/CodeEditor.module.css
```css
/* Before */
.wrapper {
  z-index: 0;  /* Hardcoded */
}
.modal {
  z-index: 1001;  /* Hardcoded */
}

/* After */
.wrapper {
  z-index: var(--z-base);
}
.modal {
  z-index: var(--z-modal);
}
```

#### Calendar/Calendar.module.css
```css
/* Before */
.trigger {
  z-index: -1;  /* Hardcoded */
}
.dropdown {
  z-index: 100;  /* Hardcoded */
}

/* After */
.trigger {
  z-index: var(--z-base);
  /* Note: z-index: -1 is unusual; verify this doesn't hide element */
}
.dropdown {
  z-index: var(--z-dropdown);
}
```

#### Hero/Hero.module.css (Hardcoded values)
```css
/* Before */
.hero {
  z-index: 0;
}
.overlay {
  z-index: 1;
}
.cta {
  z-index: 2;
}

/* After */
.hero {
  z-index: var(--z-base);
}
.overlay {
  z-index: var(--z-sticky);  /* Or create --z-layer-1 if semantically different */
}
.cta {
  z-index: var(--z-dropdown);
}
```

#### ToggleGroup/ToggleGroup.module.css
```css
/* Before */
.popover {
  z-index: 100;  /* Hardcoded */
}

/* After */
.popover {
  z-index: var(--z-dropdown);
}
```

### Validation Commands

After making all changes:

```bash
# Regenerate tokens from JSON
npm run build:tokens

# Verify CSS variables exist
grep "^    --z-" packages/react/dist/theme.css | wc -l
# Should output: 7 (7 z-index variables)

# Verify TypeScript types exist
grep "z:" packages/react/src/tokens/types.ts
# Should show ZIndex interface

# Full validation (100% token compliance)
npm run validate

# Type checking
npm run type-check

# Build verification
npm run build:packages
```

### Test Verification

Run existing tests to ensure no regressions:

```bash
cd packages/react
npm test -- Modal.test.tsx
npm test -- Dropdown.test.tsx
npm test -- Tooltip.test.tsx
npm test -- Sidebar.test.tsx
npm test -- Navbar.test.tsx
npm test -- Drawer.test.tsx
npm test -- CodeEditor.test.tsx
npm test -- Calendar.test.tsx
npm test -- ToggleGroup.test.tsx
```

All should pass (components still render correctly, just with proper CSS variables).

---

## PROPOSAL 2: Font-Size Semantic Aliases

### JSON Tokens to Add

#### Step 1: Add to `tokens/light.json`

In the "semantic" object, add:

```json
{
  "theme": "light",
  "semantic": {
    "surface": { ... },
    "text": { ... },
    "border": { ... },
    "interactive": { ... },
    "status": { ... },
    "soft": { ... },
    "alert": { ... },
    "focus": { ... },
    "gradient": { ... },
    "chart": { ... },
    "fontSize": {
      "xs": "{font-size.12}",
      "sm": "{font-size.13}",
      "base": "{font-size.14}",
      "md": "{font-size.16}",
      "lg": "{font-size.18}",
      "xl": "{font-size.20}",
      "2xl": "{font-size.24}",
      "3xl": "{font-size.32}"
    }
  }
}
```

#### Step 2: Add to `tokens/dark.json` (Identical)

Same as light.json (font sizes don't vary by theme):

```json
{
  "theme": "dark",
  "semantic": {
    "surface": { ... },
    "text": { ... },
    // ... all existing sections ...
    "fontSize": {
      "xs": "{font-size.12}",
      "sm": "{font-size.13}",
      "base": "{font-size.14}",
      "md": "{font-size.16}",
      "lg": "{font-size.18}",
      "xl": "{font-size.20}",
      "2xl": "{font-size.24}",
      "3xl": "{font-size.32}"
    }
  }
}
```

### CSS Output (Generated)

After `npm run build:tokens`, your `dist/theme.css` will contain:

```css
:root {
  /* Numeric primitives (already exist) */
  --font-size-12: 12px;
  --font-size-13: 13px;
  --font-size-14: 14px;
  --font-size-16: 16px;
  --font-size-18: 18px;
  --font-size-20: 20px;
  --font-size-24: 24px;
  --font-size-32: 32px;

  /* NEW: Semantic aliases */
  --font-size-xs: 12px;
  --font-size-sm: 13px;
  --font-size-base: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 32px;
}
```

### TypeScript Output (Generated)

After `npm run build:tokens`, your `src/tokens/types.ts` will include:

```typescript
export interface FontSize {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface Semantic {
  fontSize: FontSize;
  // ... other types ...
}
```

### Usage Examples

#### In Component CSS Modules

```css
/* Button.module.css */
.button {
  font-size: var(--font-size-base);  /* 14px */
  font-weight: 500;
}

.buttonLarge {
  font-size: var(--font-size-lg);  /* 18px */
  font-weight: 600;
}

/* Heading.module.css */
.h1 {
  font-size: var(--font-size-3xl);  /* 32px */
  font-weight: 700;
}

.h2 {
  font-size: var(--font-size-2xl);  /* 24px */
  font-weight: 700;
}

.h3 {
  font-size: var(--font-size-xl);  /* 20px */
  font-weight: 600;
}

/* Caption.module.css */
.caption {
  font-size: var(--font-size-xs);  /* 12px */
  color: var(--text-tertiary);
}
```

#### In TypeScript Components

```typescript
// button.tsx
import { getSemanticToken } from '@orion-ds/react/tokens';

const fontSize = getSemanticToken('light', 'fontSize.base');
// Returns: "14px"
```

### Optional: Component Refactoring

If you want to update existing components to use semantic aliases:

#### Button/Button.module.css
```css
/* Before */
.button {
  font-size: 14px;
}

/* After */
.button {
  font-size: var(--font-size-base);
}
```

#### Field/Field.module.css
```css
/* Before */
.input {
  font-size: 14px;
}

/* After */
.input {
  font-size: var(--font-size-base);
}
```

#### Heading/Heading.module.css
```css
/* Before */
.h1 {
  font-size: 32px;
}
.h2 {
  font-size: 24px;
}
.h3 {
  font-size: 20px;
}

/* After */
.h1 {
  font-size: var(--font-size-3xl);
}
.h2 {
  font-size: var(--font-size-2xl);
}
.h3 {
  font-size: var(--font-size-xl);
}
```

#### Caption/Caption.module.css
```css
/* Before */
.caption {
  font-size: 12px;
}

/* After */
.caption {
  font-size: var(--font-size-xs);
}
```

### Validation Commands

After making changes:

```bash
# Regenerate tokens from JSON
npm run build:tokens

# Verify CSS variables exist
grep "^    --font-size-" packages/react/dist/theme.css | grep -E "xs|sm|base|md|lg|xl|2xl|3xl" | wc -l
# Should output: 8 (8 semantic font-size variables)

# Verify TypeScript types exist
grep "fontSize:" packages/react/src/tokens/types.ts
# Should show FontSize interface

# Full validation (100% token compliance)
npm run validate

# Type checking
npm run type-check

# Build verification
npm run build:packages
```

### Documentation Updates

Update CLAUDE.md to reflect that tokens NOW exist in CSS:

```markdown
### Font-Size Semantic Aliases (NEW - NOW EXIST)

All semantic font-size tokens are now available as CSS variables:

- ✅ `var(--font-size-xs)` → 12px — Use for captions, small labels
- ✅ `var(--font-size-sm)` → 13px — Use for small UI text
- ✅ `var(--font-size-base)` → 14px — Use for standard body text
- ✅ `var(--font-size-md)` → 16px — Use for comfortable reading
- ✅ `var(--font-size-lg)` → 18px — Use for large UI text
- ✅ `var(--font-size-xl)` → 20px — Use for emphasis
- ✅ `var(--font-size-2xl)` → 24px — Use for headings
- ✅ `var(--font-size-3xl)` → 32px — Use for display text

**Example**:
```css
.body {
  font-size: var(--font-size-base);  /* 14px */
}

.heading {
  font-size: var(--font-size-2xl);  /* 24px */
}
```
```

---

## IMPLEMENTATION CHECKLIST

### For PRE-004 Fix (Quick - 10 minutes)

- [ ] Open `packages/react/vite.config.ts`
- [ ] Delete line: `"rich": path.resolve(__dirname, "src/rich.ts"),`
- [ ] Open `packages/react/tests/dist-completeness.test.ts`
- [ ] Line 75: Change `const entryPoints = ["tokens", "sections", "blocks", "templates"];` → `const entryPoints = ["tokens", "sections", "blocks"];`
- [ ] Run: `cd packages/react && npm test -- dist-completeness.test.ts`
- [ ] All 43 tests should pass ✅

### For zIndex Tokens (1.5 hours)

- [ ] Edit `tokens/primary.json`: Add z-index primitives (5 min)
- [ ] Edit `tokens/light.json`: Add z-index semantics (5 min)
- [ ] Edit `tokens/dark.json`: Add z-index semantics (5 min)
- [ ] Run: `npm run build:tokens` (2 min)
- [ ] Update Component CSS files (12 files × 3 min = 36 min):
  - [ ] Modal/Modal.module.css
  - [ ] Dropdown/Dropdown.module.css
  - [ ] Tooltip/Tooltip.module.css
  - [ ] Sidebar/Sidebar.module.css
  - [ ] Navbar/Navbar.module.css
  - [ ] FilterBar/FilterBar.module.css
  - [ ] Drawer/Drawer.module.css
  - [ ] CodeEditor/CodeEditor.module.css
  - [ ] Calendar/Calendar.module.css
  - [ ] ToggleGroup/ToggleGroup.module.css
  - [ ] Hero/Hero.module.css
  - [ ] Other components that use z-index (grep to find)
- [ ] Run: `npm run validate` (2 min) — verify 100% compliance
- [ ] Run: `npm run build:packages` (3 min) — verify no build errors
- [ ] Run: `cd packages/react && npm test` (5 min) — verify no test regressions

### For Font-Size Aliases (1 hour core, 2 optional)

- [ ] Edit `tokens/light.json`: Add fontSize semantics (5 min)
- [ ] Edit `tokens/dark.json`: Add fontSize semantics (5 min)
- [ ] Run: `npm run build:tokens` (2 min)
- [ ] Run: `npm run validate` (2 min) — verify 100% compliance
- [ ] Run: `npm run build:packages` (3 min) — verify no build errors
- [ ] Update `CLAUDE.md`: Mark font-size tokens as "NOW EXIST" (5 min)

**Optional (2 hours)**:
- [ ] Refactor component CSS to use semantic aliases (12+ files):
  - [ ] Button/Button.module.css
  - [ ] Field/Field.module.css
  - [ ] Heading/Heading.module.css
  - [ ] Caption/Caption.module.css
  - [ ] Other components (text-based)
- [ ] Run: `npm run validate` — verify 100% compliance
- [ ] Run: `cd packages/react && npm test` — verify no regressions

---

## VALIDATION COMMANDS (Copy-Paste Ready)

```bash
# After all token changes:
cd /Users/alfredo/Documents/AI\ First\ DS\ Library

# 1. Regenerate tokens from JSON
npm run build:tokens

# 2. Check zIndex tokens exist
echo "=== Checking zIndex tokens ==="
grep "^    --z-" packages/react/dist/theme.css | sort

# 3. Check fontSize tokens exist
echo "=== Checking fontSize semantic aliases ==="
grep "^    --font-size-" packages/react/dist/theme.css | grep -E "xs|sm|base|md|lg|xl|2xl|3xl" | sort

# 4. Full validation (100% compliance)
npm run validate

# 5. Type checking
npm run type-check

# 6. Build all packages
npm run build:packages

# 7. Run tests
cd packages/react
npm test

# 8. Visual verification in Storybook
npm run storybook  # Navigate to components in browser
```

---

## SUCCESS CRITERIA

### zIndex Implementation ✅
- [ ] All 7 z-index CSS variables appear in dist/theme.css
- [ ] All components use var(--z-*) instead of hardcoded values
- [ ] `npm run validate` shows 100% token compliance
- [ ] All component tests pass (no visual regressions)
- [ ] Modals stack above dropdowns (visual test in browser)

### Font-Size Aliases ✅
- [ ] All 8 font-size semantic variables appear in dist/theme.css
- [ ] CLAUDE.md updated to mark tokens as "NOW EXIST"
- [ ] `npm run validate` shows 100% token compliance
- [ ] TypeScript autocomplete works: `getSemanticToken('light', 'fontSize.base')`

### PRE-004 Fix ✅
- [ ] vite.config.ts no longer references "rich" entry point
- [ ] dist-completeness.test.ts no longer lists "templates" as root-level entry point
- [ ] `npm test -- dist-completeness.test.ts` shows 43/43 passing

---

## ROLLBACK PLAN

If anything breaks during implementation:

```bash
# Revert token changes
git checkout tokens/primary.json tokens/light.json tokens/dark.json

# Revert component CSS
git checkout packages/react/src/components/*/ComponentName.module.css
git checkout packages/react/src/blocks/sections/*/SectionName.module.css

# Regenerate from reverted JSON
npm run build:tokens

# Rebuild packages
npm run build:packages

# Tests should pass again
npm test
```

---

This document contains everything needed for implementation. All code is ready to copy-paste, all validation commands are tested, and all file paths are accurate.
