# Landing Component Quick Reference

**For rapid lookups: "What components are in section X?"**

---

## QUICK MAP (Sections in Order)

### NAVBAR (Global)
```
DocsNavbar.tsx
├── Navbar [sticky]
├── Button [primary] → "Founding Member"
├── Popover + 6 BrandSwatches
└── Button [ghost] + Theme Toggle
```

---

### HOMEPAGE (/)

#### 1️⃣ HERO
```
HomepageHero.tsx → Hero block
├── Hero.Highlight
├── Badge [secondary] ×4
└── Button [primary, ghost] ×2
```

#### 2️⃣ INSTALL
```
HomepageInstall.tsx → Card block
├── Card [base]
├── Custom tabs (Package / MCP)
└── Copy button (Lucide)
```

#### 3️⃣ LOGO CLOUD
```
HomepageLogoCloud.tsx → LogoCloud block
└── 7 custom SVG logos
```

#### 4️⃣ COMPONENT SHOWCASE
```
ComponentShowcaseTabs.tsx → Tabs
├── Button [primary, secondary, ghost, danger] ×20+
├── Card [base, outlined, elevated] ×10+
├── Badge [6 variants] ×10+
├── Alert [4 variants] ×4
├── Field, Select, Switch, Toggle
├── Avatar, Chip, Spinner, ProgressBar
└── Breadcrumb, Pagination, SearchInput
```

#### 5️⃣ FEATURES
```
HomepageFeaturesSection.tsx → Features block
├── 6 feature items
├── Icons: Bot, Zap, Package, Layers, Palette, Moon
└── 3 columns
```

#### 6️⃣ STATS
```
HomepageStats.tsx → Stats block
├── 5 stat cards
├── Values: 72, 26, 10, 9, 200
└── 5 columns, highlighted values
```

#### 7️⃣ PRICING
```
HomepagePricing.tsx → Pricing block
├── 3 plans: Free, Founding Member, Team
├── Button [secondary, primary, ghost] ×3
└── Popular badge on Founding Member
```

#### 8️⃣ TESTIMONIALS
```
HomepageTestimonials.tsx
├── Badge [secondary]
├── Card [outlined] ×3
├── Icons: Star, Download, Code
└── Social proof metrics
```

#### 9️⃣ CTA + FOOTER
```
HomepageCTA.tsx
├── CTA block [variant="brand"]
├── Button [primary, ghost] ×2
├── Icons: ArrowRight, Github
└── Custom HTML footer
```

---

### PRICING PAGE (/pricing)

```
PricingPage
├── Custom hero (not Hero block)
├── HomepagePricing (same as homepage)
└── FAQ block
    └── Accordion [separated] with 6 Q&A items
```

---

### MCP DOCS (/docs/mcp)

```
McpPage
├── DocsPageHero
│   ├── Badge [brand, secondary] ×3
│   └── H1 + subtitle
│
├── DocsFeatureGrid (custom)
│   ├── 6 features with icons
│   └── Icons: Bot, Zap, Code2, Package, Settings, BookOpen
│
├── CodeBlockSimple
│   └── Bash syntax highlight
│
├── Accordion [separated]
│   └── 9 tool descriptions with code examples
│
└── DocsNextStepsGrid (custom)
    └── 2 next step cards
```

---

## COMPONENT USAGE SUMMARY

### Most Used
- **Button**: 30+ instances (primary, secondary, ghost, danger, sizes: sm/md/lg)
- **Card**: 15+ instances (base, outlined, elevated)
- **Badge**: 12+ instances (secondary, primary, success, warning, error, info, brand)
- **Block components**: 10 instances (Hero, Features, CTA, Pricing, Stats, LogoCloud, FAQ)

### Moderately Used
- **Alert**: 4 instances (info, success, warning, error)
- **Field/Select/Switch**: 5+ instances in showcase
- **Accordion**: 2 instances (MCP tools, FAQ)
- **Tabs**: 2 instances (Install commands, Showcase)

### Custom/Non-Orion
- `ComponentShowcaseTabs` — Displays all components
- `HomepageInstall` — Custom tabs (not using Orion Tabs)
- `CodeBlockSimple` — Syntax highlighting
- `DocsPageHero` — Custom wrapper (uses Badge)
- `DocsFeatureGrid` — Custom grid layout
- `HomepageCTA` — Footer is custom HTML

---

## FILE LOCATIONS

| Component | File |
|-----------|------|
| Navbar | `/docs-site/components/DocsNavbar.tsx` |
| Sidebar | `/docs-site/components/DocsSidebar.tsx` |
| Hero | `/docs-site/components/HomepageHero.tsx` |
| Install | `/docs-site/components/HomepageInstall.tsx` |
| LogoCloud | `/docs-site/components/HomepageLogoCloud.tsx` |
| Showcase | `/docs-site/components/ComponentShowcaseTabs.tsx` |
| Features | `/docs-site/components/HomepageFeaturesSection.tsx` |
| Stats | `/docs-site/components/HomepageStats.tsx` |
| Pricing | `/docs-site/components/HomepagePricing.tsx` |
| Testimonials | `/docs-site/components/HomepageTestimonials.tsx` |
| CTA/Footer | `/docs-site/components/HomepageCTA.tsx` |
| DocsPageHero | `/docs-site/components/DocsPageHero.tsx` |
| DocsFeatureGrid | `/docs-site/components/DocsFeatureGrid.tsx` |
| CodeBlockSimple | `/docs-site/components/CodeBlockSimple.tsx` |
| ClientComponents | `/docs-site/components/ClientComponents.tsx` |

---

## THEME/BRAND INHERITANCE

All components automatically inherit from root:
```html
<html data-theme="light" data-brand="orion" data-mode="display">
```

**User controls** (in Navbar):
- 🌙 **Theme toggle**: light ↔ dark
- 🎨 **Brand picker**: 6 brands (orion, red, deepblue, orange, ember, lemon)

---

## LUCIDE ICONS USED

| Icon | Sections |
|------|----------|
| `ArrowRight` | Hero, CTA |
| `Terminal`, `Copy`, `Check` | Install |
| `Bot` | Features, MCP Docs |
| `Zap`, `Package`, `Layers`, `Palette`, `Moon` | Features |
| `Star`, `Download`, `Code` | Testimonials |
| `Github` | CTA, Navbar |
| `Sun`, `Moon`, `Paintbrush` | Navbar (theme/brand) |
| `Home`, `BookOpen`, `Download`, `Terminal`, `Layers`, `Grid3x3`, `Layout`, `FileText` | Sidebar |
| `Code2`, `Settings` | MCP Docs |

---

## IMPORT PATTERNS

### Orion Components
```typescript
import { Button, Card, Badge, Alert, ... } from '@orion-ds/react';
```

### Orion Blocks
```typescript
import { Hero, Features, CTA, Pricing, ... } from '@orion-ds/react/blocks';
```

### Re-exports
```typescript
// ClientComponents.tsx handles Next.js SSR boundary
import { Button, Card, ... } from '@/components/ClientComponents';
```

### Lucide Icons
```typescript
import { ArrowRight, Copy, Check, ... } from 'lucide-react';
```

---

## QUICK EDIT GUIDE

**Need to change something? Here's where to edit:**

- **Navbar links/buttons** → `DocsNavbar.tsx` (line 118-173)
- **Homepage sections order** → `app/page.tsx` (line 17-58)
- **Hero badge/title** → `HomepageHero.tsx` (line 23-76)
- **Feature icons/titles** → `HomepageFeaturesSection.tsx` (line 24-61)
- **Stats values/labels** → `HomepageStats.tsx` (line 24-50)
- **Pricing plans/features** → `HomepagePricing.tsx` (line 13-82)
- **MCP tools/content** → `app/docs/mcp/page.tsx` (line 46-138)
- **Footer links** → `HomepageCTA.tsx` (line 64-69)

---

## KNOWN QUIRKS

1. **Install component** uses custom `<button>` elements, not Orion `Button` (due to tab state complexity)
2. **Footer** is custom HTML, not `Footer` block (SSR compatibility issue with AgentWorkspace)
3. **ComponentShowcaseTabs** dynamically renders all Orion components for demo
4. **ClientComponents.tsx** re-exports Orion components to handle Next.js `'use client'` boundary

---

## VALIDATION CHECKLIST

After editing landing components, verify:

- [ ] Navbar sticks on scroll
- [ ] Theme toggle works (light/dark)
- [ ] Brand picker shows 6 colors
- [ ] All sections render on mobile
- [ ] Component showcase loads all tabs
- [ ] Pricing card shows "popular" badge on Founding Member
- [ ] Links navigate to correct pages
- [ ] Icons display correctly
- [ ] Copy button works in Install section

---

**Last Updated**: March 21, 2026
**See also**: `LANDING_COMPONENT_MAP.md` for detailed breakdown
