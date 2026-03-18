# AGENTS.md — AI Agent Quick Reference

This file is the canonical quick reference for AI agents working with Orion Design System. Read this after `tokens/ai-manifest.json`.

## Agent Read Order

When starting work on Orion, follow this sequence (each file builds on the previous):

1. **tokens/ai-manifest.json** — System status & capabilities (start here)
2. **AGENTS.md** (this file) — Token quick reference + rules + anti-hallucination dictionary
3. **tokens/index.json** — Unified token reference (semantic structure)
4. **tokens/components.json** — Component definitions and HTML patterns

---

## Token Quick Reference

### Surfaces (Backgrounds)
```css
--surface-base        /* Main background (white/near-black) */
--surface-subtle      /* Subtle background (gray-50/gray-900) */
--surface-layer       /* Layered surface (gray-100/gray-800) */
--surface-sunken      /* Recessed surface (sidebars, panels) */
```

### Text Colors
```css
--text-primary        /* Main content text */
--text-secondary      /* Descriptions, labels */
--text-tertiary       /* Captions, hints, disabled */
--text-brand          /* Brand accent text */
--text-inverse        /* Text on dark backgrounds */
```

### Interactive
```css
--interactive-primary         /* Primary button background */
--interactive-primary-hover   /* Primary button hover */
--interactive-primary-text    /* Primary button text */
--interactive-secondary       /* Secondary button background */
```

### Spacing (base unit: 4px)
```css
--spacing-1  (4px)    --spacing-8  (32px)   --spacing-16 (64px)
--spacing-2  (8px)    --spacing-10 (40px)   --spacing-20 (80px)
--spacing-3  (12px)   --spacing-12 (48px)   --spacing-24 (96px)
--spacing-4  (16px)   --spacing-14 (56px)   --spacing-32 (128px)
--spacing-6  (24px)
```

### Typography (Semantic Size Aliases)
```css
--font-size-xs    (12px)  /* captions, small labels */
--font-size-sm    (13px)  /* small UI text */
--font-size-base  (14px)  /* standard body text */
--font-size-md    (16px)  /* comfortable reading */
--font-size-lg    (18px)  /* large UI text */
--font-size-xl    (20px)  /* emphasis text */
--font-size-2xl   (24px)  /* headings */
--font-size-3xl   (32px)  /* display text */
```

### Font Families
```css
--font-primary    /* Libre Baskerville (headings) */
--font-secondary  /* DM Sans (body) */
--font-mono       /* JetBrains Mono (code) */
```

### Radius
```css
--radius-sm       (6px)     /* Small elements */
--radius-control  (12px)    /* Buttons, controls (brand-aware) */
--radius-container (16px)   /* Large containers */
--radius-full     (9999px)  /* Pills, circles */
```

---

## Core Import Paths (Canonical)

**Components & Hooks:**
```typescript
import { Button, Card, Field, ThemeProvider, useThemeContext } from '@orion-ds/react';
```

**Sections & Blocks:**
```typescript
import { Hero, Features, CTA, Pricing, Footer, SettingsLayout } from '@orion-ds/react/blocks';
```

**Styles:**
```typescript
import '@orion-ds/react/styles.css';  // Single import (recommended)
```

**Icons:**
```typescript
import { Search, Download, Settings } from 'lucide-react';
```

---

## Top 10 Anti-Hallucination Rules

### ❌ NEVER DO THESE

1. **Hardcode colors**: `#FFFFFF`, `#000000`, `rgb(255,255,255)`
   - ✅ USE: `var(--text-primary)`, `var(--surface-base)`

2. **Hardcode pixels**: `16px`, `24px`, `12px` (except `1px` borders, `0px`, `9999px` pills)
   - ✅ USE: `var(--spacing-4)`, `var(--font-size-lg)`

3. **Hardcode fonts**: `font-family: Inter`, `font-family: DM Sans`
   - ✅ USE: `var(--font-secondary)`, `var(--font-primary)`

4. **Add `brand` prop to components**: `<Button brand="red">`
   - ✅ USE: Brand is global via `<ThemeProvider>` only

5. **Set `data-brand` on component elements**: `<button data-brand="red">`
   - ✅ USE: Set on `<html>` tag via ThemeProvider

6. **Invent components** not in `tokens/components.json`
   - ✅ USE: Only components listed in the manifest

7. **Create arbitrary wrapper divs** (`<div class="custom-wrapper">`)
   - ✅ USE: Only standard components from Orion

8. **Use `any` type in TypeScript**: `const x: any = ...`
   - ✅ USE: Import types from `@orion-ds/react`

9. **Import all icons** at once: `import * as Icons from 'lucide-react'`
   - ✅ USE: Named imports only: `import { Search, Download } from 'lucide-react'`

10. **Forget aria-label on icon-only buttons**: `<Button iconOnly icon={<Settings />} />`
    - ✅ USE: `<Button iconOnly icon={<Settings />} aria-label="Settings" />`

---

## Common Hallucinated Variables

These CSS variables **DO NOT EXIST**. When you invent them, use these alternatives instead:

| ❌ Hallucinated | ✅ Alternative |
|---|---|
| `--font-sans` | `var(--font-secondary)` |
| `--font-body` | `var(--font-secondary)` |
| `--gradient-primary` | Use gradient with brand colors |
| `--color-primary` | `var(--interactive-primary)` |
| `--bg-primary` | `var(--surface-base)` |
| `--text-muted` | `var(--text-tertiary)` |
| `--shadow-default` | `var(--shadow-md)` |
| `--transition-default` | `transition: 150ms ease-in-out` |
| `--padding-base` | `var(--spacing-4)` |
| `--blue-500` | Brand-specific color token |
| `--gray-100` | `var(--surface-subtle)` |
| `--accent` | `var(--interactive-primary)` |
| `--border-radius` | `var(--radius-control)` |
| `--font-weight-bold` | `font-weight: 600` |
| `--hover-bg` | `var(--surface-layer)` |

---

## Component Generation Cheatsheet

### Button (All Variants)
```typescript
import { Button } from '@orion-ds/react';
import { Download, Settings, ChevronDown } from 'lucide-react';

<Button variant="primary">Submit</Button>
<Button size="md">Default</Button>
<Button icon={<Download size={20} />}>Download</Button>
<Button iconRight={<ChevronDown size={20} />}>Menu</Button>
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
<Button isLoading>Saving...</Button>
<Button disabled>Disabled</Button>
```

### Field (Input)
```typescript
import { Field } from '@orion-ds/react';
import { Search, Mail } from 'lucide-react';

<Field type="text" placeholder="Search..." />
<Field type="email" placeholder="name@example.com" />
<Field type="search" icon={<Search size={18} />} placeholder="Search..." />
<Field label="Email" type="email" />
<Field type="text" error="This field is required" />
<Field disabled placeholder="Disabled input" />
```

### Alert (Auto-Icons)
```typescript
import { Alert } from '@orion-ds/react';

<Alert variant="success">Changes saved successfully</Alert>
<Alert variant="error">Something went wrong</Alert>
<Alert variant="warning">Please review before proceeding</Alert>
<Alert variant="info">New feature available</Alert>
```

### Hero Block
```typescript
import { Hero } from '@orion-ds/react/blocks';

<Hero
  headline="Build Faster with Orion"
  subheadline="AI-ready components for modern web apps"
/>
```

---

## Theme & Brand System (Global)

**CRITICAL**: Brand and theme are GLOBAL, not component props.

```typescript
import { ThemeProvider } from '@orion-ds/react';
import '@orion-ds/react/styles.css';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Available Brands (6)
- **orion** — Blue accent, 12px radius
- **red** — Red accent, 9999px radius (pill)
- **deepblue** — Deep blue accent, 12px radius
- **orange** — Red-orange accent, 9999px radius
- **lemon** — Lime green accent, 9999px radius
- **ember** — Red accent, 12px radius

---

## MCP Tools Overview (9 Tools)

| Tool | Purpose |
|---|---|
| `list-components` | Browse all 72+ components, sections, templates |
| `get-component` | Fetch component spec with props, variants, examples |
| `search-components` | Search by keyword (button, form, layout, etc.) |
| `list-tokens` | Browse all design tokens |
| `get-token` | Get token value and usage context |
| `validate-component` | Check AI-First compliance |
| `generate-component-code` | Generate TSX code for patterns |
| `check-brand-consistency` | Verify all 6 brands work |
| `audit-system` | Full health check |

---

## Accessibility Requirements (WCAG 2.1 AA)

- ✅ Icon-only buttons MUST have `aria-label`
- ✅ Form fields MUST have associated `<label>` or `aria-label`
- ✅ Focus indicators visible
- ✅ Contrast ratio: 4.5:1 for text, 3:1 for graphics
- ✅ Support `prefers-reduced-motion`
- ✅ Keyboard navigation: Tab, Enter, Space, Arrow keys

---

**Last Updated**: 2026-03-18 | **Version**: 4.6.2+ | **Status**: ✅ Production Ready
