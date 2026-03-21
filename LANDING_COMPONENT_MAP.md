# Orion Landing Page - Component Map (Top to Bottom)

**Last Updated**: March 21, 2026
**Scope**: Homepage (`/`), Pricing (`/pricing`), MCP Docs (`/docs/mcp`), Global Layout
**Format**: Visual hierarchy showing Orion components used by section

---

## ROOT LAYOUT — `app/layout.tsx`

### Global Structure
```
<html> [data-theme="light" data-brand="orion" data-mode="display"]
  ├── <head>
  │   └── Fonts: Libre Baskerville, DM Sans, Inter, JetBrains Mono, Work Sans, Poppins, Anton
  │
  └── <body>
      ├── Providers (Context wrapper)
      ├── DocsNavbar (Navbar + Theme/Brand Picker)
      ├── Sidebar (DocsSidebar)
      └── MainWrapper
          └── {children}
```

### Global CSS Imports
- `@orion-ds/react/styles.css` (tokens + components)
- `@orion-ds/react/blocks.css` (premium sections)
- `globals.css` (custom docs styling)

---

## NAVBAR (GLOBAL) — `DocsNavbar.tsx`

### Visual Hierarchy (Top of every page)
```
NAVBAR [variant="solid" sticky bordered height="md"]
├── Navbar.Brand
│   └── Text: "Orion DS"
│
├── Navbar.Nav (horizontal link group)
│   ├── Navbar.Link → "Docs" [href="/docs/getting-started"]
│   ├── Navbar.Link → "Components" [href="/components"]
│   ├── Navbar.Link → "Sections" [href="/sections"]
│   ├── Navbar.Link → "Templates" [href="/templates"]
│   └── Navbar.Link → "Pricing" [href="/pricing"]
│
└── Navbar.Actions (right-aligned controls)
    ├── Button [variant="primary" size="sm"] → "Founding Member"
    ├── Button [variant="ghost" iconOnly] + Popover → Brand Picker
    │   └── 6 BrandSwatch circles (orion, red, deepblue, orange, ember, lemon)
    ├── Button [variant="ghost" iconOnly] → Theme Toggle (Sun/Moon icon)
    └── GitHub SVG icon (external link)
```

**Key Props & Variants**:
- `variant="solid"` — Filled navbar background
- `sticky` — Stays at top on scroll
- `bordered` — Subtle bottom border
- `height="md"` — Standard height

**Files**: `DocsNavbar.tsx`

---

## SIDEBAR (GLOBAL) — `DocsSidebar.tsx`

### Visual Hierarchy (Left of docs pages)
```
SIDEBAR [collapsible on mobile]
├── Section 1 (Quick Links)
│   └── Sidebar.Item → "Home" [href="/"]
│
├── Section 2 (Getting Started)
│   ├── Sidebar.Item → "Introduction" [icon=BookOpen]
│   ├── Sidebar.Item → "Installation" [icon=Download]
│   ├── Sidebar.Item → "Theming" [icon=Palette]
│   ├── Sidebar.Item → "CLI" [icon=Terminal]
│   ├── Sidebar.Item → "Tokens" [icon=Layers]
│   └── Sidebar.Item → "MCP Server" [icon=Bot]
│
└── Section 3 (Library)
    ├── Sidebar.Item → "Components" [icon=Grid3x3]
    ├── Sidebar.Item → "Sections" [icon=Layout]
    └── Sidebar.Item → "Templates" [icon=FileText]
```

**Lucide Icons Used**: `Home`, `BookOpen`, `Download`, `Palette`, `Terminal`, `Layers`, `Bot`, `Grid3x3`, `Layout`, `FileText`

**Files**: `DocsSidebar.tsx`

---

## PAGE: HOMEPAGE (`/`) — `app/page.tsx`

### Overall Structure (Top to Bottom)
```
PAGE: Homepage
├── HomepageHero (Hero section)
├── HomepageInstall (Install commands)
├── HomepageLogoCloud (Tech partner logos)
├── ComponentShowcaseTabs (Main visual demo)
├── HomepageFeaturesSection (Why Orion)
├── HomepageStats (Numbers section)
├── HomepagePricing (Pricing table preview)
├── HomepageTestimonials (Social proof metrics)
└── HomepageCTA + Footer (Bottom CTA)
```

---

## SECTION 1: HERO — `HomepageHero.tsx`

### Visual Hierarchy
```
HERO [layout="contained" size="lg" align="center"]
├── Badge [variant="secondary" size="sm"]
│   └── "✦ MCP Server included — Claude Code ready"
│
├── Title (Headline with highlight)
│   ├── Text: "The design system"
│   ├── Hero.Highlight → "your AI agent"
│   ├── Text: "already knows."
│
├── Description
│   └── "Install components with a single instruction..."
│
├── Primary Action
│   └── Link → Button [size="lg" variant="primary" iconRight=<ArrowRight>]
│       └── "Get Started Free"
│
├── Secondary Action
│   └── Link → Button [size="lg" variant="ghost"]
│       └── "View on GitHub"
│
└── Trust Indicators
    ├── Badge [variant="secondary" size="sm"] → "↗ 72 components"
    ├── Badge [variant="secondary" size="sm"] → "↗ MCP Server"
    └── Badge [variant="secondary" size="sm"] → "↗ MIT License"
```

**Orion Components Used**:
- `Hero` (Block) — Main container
- `Badge` (Component) — 4 instances with `variant="secondary"`, `size="sm"`
- `Button` (Component) — 2 instances: primary + ghost

**Lucide Icons**: `ArrowRight`

**File**: `HomepageHero.tsx`

**Props Passed**: `componentCount`, `sectionCount`, `templateCount` (from registry metadata)

---

## SECTION 2: INSTALL — `HomepageInstall.tsx`

### Visual Hierarchy
```
SECTION: Install
├── Label (Small caps)
│   ├── Lucide Icon: <Terminal>
│   └── Text: "Install"
│
└── Card [variant="base"]
    └── Card.Body [padding="var(--spacing-4)"]
        ├── Main Tabs (Package / MCP Server)
        │   ├── Button (custom styled) → "Package"
        │   └── Button (custom styled) → "MCP Server"
        │
        ├── Package Manager Tabs (npm/pnpm/yarn) — only when "Package" tab active
        │   ├── Button (custom styled) → "pnpm"
        │   ├── Button (custom styled) → "npm"
        │   └── Button (custom styled) → "yarn"
        │
        ├── Command Display (monospace)
        │   ├── Text: "$"
        │   ├── Code: "npm install @orion-ds/react"
        │   └── Button (custom Copy) → Lucide Icons: <Copy> or <Check>
        │
        └── Info Box (MCP tab only)
            └── "Claude Code can then install any Orion component..."
```

**Orion Components Used**:
- `Card` (Component) — `variant="base"`
- `Card.Body` (Subcomponent)

**Custom HTML**: `<button>` elements (styled with tokens, not Orion Button)

**Lucide Icons**: `Terminal`, `Copy`, `Check`

**Interactive State**: Tabs with local state (`tab`, `pm`, `copied`)

**File**: `HomepageInstall.tsx`

---

## SECTION 3: LOGO CLOUD — `HomepageLogoCloud.tsx`

### Visual Hierarchy
```
LOGO CLOUD [layout="inline" grayscale=true background="subtle" centered=true]
├── Eyebrow: "Built for AI-native workflows"
├── Title: "Your AI agent can use Orion directly"
└── Logo Grid (7 logos)
    ├── Custom SVG: Claude Code
    ├── Custom SVG: Cursor
    ├── Custom SVG: Cline
    ├── Custom SVG: Continue
    ├── Custom SVG: React
    ├── Custom SVG: Next.js
    └── Custom SVG: TypeScript
```

**Orion Components Used**:
- `LogoCloud` (Block) — Main container

**Props**:
- `layout="inline"`
- `grayscale={true}`
- `background="subtle"`
- `centered={true}`

**File**: `HomepageLogoCloud.tsx`

---

## SECTION 4: COMPONENT SHOWCASE — `ComponentShowcaseTabs.tsx`

### Visual Hierarchy
```
SECTION: Component Showcase (Main visual demo)
├── Tabs [12 tab items showing different component categories]
│   ├── Tab: "Buttons"
│   │   └── ButtonShowcase (4 variants × 3 sizes = grid)
│   │       ├── Button [variant="primary"]
│   │       ├── Button [variant="secondary"]
│   │       ├── Button [variant="ghost"]
│   │       ├── Button [variant="danger"]
│   │       └── Size examples: sm, md, lg
│   │
│   ├── Tab: "Cards"
│   │   └── CardShowcase (3 variants)
│   │       ├── Card [variant="base" interactive=true]
│   │       ├── Card [variant="outlined" interactive=true]
│   │       └── Card [variant="elevated" interactive=true]
│   │
│   ├── Tab: "Badges"
│   │   └── BadgeShowcase (6 variants + 3 sizes)
│   │       ├── Badge [variant="primary"]
│   │       ├── Badge [variant="secondary"]
│   │       ├── Badge [variant="success"]
│   │       ├── Badge [variant="warning"]
│   │       ├── Badge [variant="error"]
│   │       └── Badge [variant="info"]
│   │
│   ├── Tab: "Alerts"
│   │   └── AlertShowcase (4 variants)
│   │       ├── Alert [variant="info" icon=<Info>]
│   │       ├── Alert [variant="success" icon=<CheckCircle>]
│   │       ├── Alert [variant="warning" icon=<AlertCircle>]
│   │       └── Alert [variant="error" icon=<AlertCircle>]
│   │
│   ├── Tab: "Forms"
│   │   └── FormShowcase (Field, Select, Switch, etc.)
│   │
│   ├── Tab: "Navigation"
│   │   └── NavigationShowcase (Breadcrumb, Pagination, SearchInput)
│   │
│   └── Tab: "Data Display"
│       └── DataShowcase (Avatar, Chip, Spinner, ProgressBar)
│
└── [More tabs...]
```

**Orion Components Imported & Displayed**:
- `Button` (20+ instances across variants/sizes)
- `Card` (10+ instances with variants)
- `Badge` (10+ instances)
- `Alert` (4 instances)
- `Field` (form inputs)
- `Select`
- `Switch`
- `Toggle`
- `ProgressBar`
- `Spinner`
- `Avatar`
- `Chip`
- `Breadcrumb`
- `Pagination`
- `SearchInput`

**Lucide Icons**: `AlertCircle`, `CheckCircle`, `Info` (used in Alert variants)

**File**: `ComponentShowcaseTabs.tsx`

---

## SECTION 5: FEATURES — `HomepageFeaturesSection.tsx`

### Visual Hierarchy
```
FEATURES [columns=3 background="base" interactive=true centered=true]
├── Eyebrow: "Why Orion"
├── Title: "Built for the AI era"
├── Description: "Every design decision in Orion..."
│
└── Feature Grid (6 items, 3 columns)
    ├── Feature 1
    │   ├── Icon: <Bot size={24}>
    │   ├── Title: "MCP Server native"
    │   └── Description: "9 tools for Claude Code..."
    │
    ├── Feature 2
    │   ├── Icon: <Zap size={24}>
    │   ├── Title: "Chain of Truth"
    │   └── Description: "Token-governed architecture..."
    │
    ├── Feature 3
    │   ├── Icon: <Package size={24}>
    │   ├── Title: "72 components"
    │   └── Description: "Production-ready React..."
    │
    ├── Feature 4
    │   ├── Icon: <Layers size={24}>
    │   ├── Title: "26 sections"
    │   └── Description: "Pre-built page blocks..."
    │
    ├── Feature 5
    │   ├── Icon: <Palette size={24}>
    │   ├── Title: "6 brands"
    │   └── Description: "Multi-brand architecture..."
    │
    └── Feature 6
        ├── Icon: <Moon size={24}>
        ├── Title: "Dark mode"
        └── Description: "Full light/dark theme..."
```

**Orion Components Used**:
- `Features` (Block) — Main container

**Props**:
- `columns={3}`
- `background="base"`
- `interactive={true}`
- `centered={true}`
- `items` array with 6 feature objects

**Lucide Icons**: `Bot`, `Zap`, `Package`, `Layers`, `Palette`, `Moon`

**File**: `HomepageFeaturesSection.tsx`

---

## SECTION 6: STATS — `HomepageStats.tsx`

### Visual Hierarchy
```
STATS [columns=5 variant="cards" background="subtle" highlightValue=true centered=true]
├── Eyebrow: "The numbers"
├── Title: "Everything you need, nothing you don't"
├── Description: "Orion ships with a complete set..."
│
└── Stats Grid (5 items, 5 columns)
    ├── Stat 1
    │   ├── Value: "72" [highlighted/gradient]
    │   ├── Label: "Components"
    │   └── Description: "Ready-to-use React building blocks"
    │
    ├── Stat 2
    │   ├── Value: "26" [highlighted/gradient]
    │   ├── Label: "Sections"
    │   └── Description: "Pre-composed page blocks"
    │
    ├── Stat 3
    │   ├── Value: "10" [highlighted/gradient]
    │   ├── Label: "Templates"
    │   └── Description: "Full-page starter layouts"
    │
    ├── Stat 4
    │   ├── Value: "9" [highlighted/gradient]
    │   ├── Label: "MCP Tools"
    │   └── Description: "AI agent integrations built-in"
    │
    └── Stat 5
        ├── Value: "200" [highlighted/gradient]
        ├── Label: "Founding Member spots"
        └── Description: "Limited early access pricing"
```

**Orion Components Used**:
- `Stats` (Block) — Main container

**Props**:
- `columns={5}`
- `variant="cards"`
- `background="subtle"`
- `highlightValue={true}`
- `centered={true}`
- `stats` array with 5 stat objects

**File**: `HomepageStats.tsx`

---

## SECTION 7: PRICING — `HomepagePricing.tsx`

### Visual Hierarchy
```
PRICING [title, description, 3 plans]
├── Title: "Start free. Go Pro when you're ready."
├── Description: "All core components are open source..."
│
└── Pricing Plans (3 cards)
    ├── Plan 1: Free
    │   ├── Name: "Free"
    │   ├── Price: "$0"
    │   ├── Period: "/ forever"
    │   ├── Description: "Everything you need to start building."
    │   ├── Features (8 items):
    │   │   ├── "72 base components"
    │   │   ├── "26 sections"
    │   │   ├── "10 templates"
    │   │   ├── "CLI installer"
    │   │   ├── "MCP Server — 9 tools"
    │   │   ├── "Chain of Truth architecture"
    │   │   ├── "Dark mode + 6 brands"
    │   │   └── "MIT License"
    │   │
    │   └── Action Button
    │       └── Link → Button [variant="secondary" size="md"]
    │           └── "Get Started Free"
    │
    ├── Plan 2: Founding Member (popular=true)
    │   ├── Name: "Founding Member"
    │   ├── Price: "$29"
    │   ├── Period: "/ month"
    │   ├── Description: "First 200 users. Price locks forever."
    │   ├── Popular Badge (automatic styling)
    │   ├── Features (9 items):
    │   │   ├── "Everything in Free"
    │   │   ├── "10+ AI / Agentic components"
    │   │   ├── "AgentThinking · StreamText · ToolCall"
    │   │   ├── "ActionConfirmation · DiffViewer · ContextBar"
    │   │   ├── "4 production-ready AI templates"
    │   │   ├── "Figma Kit completo"
    │   │   ├── "Extended docs — the 'why' behind each pattern"
    │   │   ├── "Private Slack channel"
    │   │   └── "Early access to new components"
    │   │
    │   └── Action Button
    │       └── Link → Button [variant="primary" size="md" iconRight=<ArrowRight>]
    │           └── "Become a Founding Member"
    │
    ├── Plan 3: Team
    │   ├── Name: "Team"
    │   ├── Price: "$149"
    │   ├── Period: "/ month"
    │   ├── Description: "Up to 5 people. With design guidance."
    │   ├── Features (5 items):
    │   │   ├── "Everything in Pro"
    │   │   ├── "Up to 5 seats"
    │   │   ├── "Brand customization guidance"
    │   │   ├── "1 design session / month (30 min)"
    │   │   └── "Priority support"
    │   │
    │   └── Action Button
    │       └── Link (mailto) → Button [variant="ghost" size="md"]
    │           └── "Contact Us"
    │
    └── Footnote
        └── "Price increases to $49/month after..."
```

**Orion Components Used**:
- `Pricing` (Block) — Main container
- `Button` (Component) — 3 instances (secondary, primary, ghost)

**Lucide Icons**: `ArrowRight`

**File**: `HomepagePricing.tsx` (also used in `/pricing` page)

---

## SECTION 8: TESTIMONIALS (SOCIAL PROOF) — `HomepageTestimonials.tsx`

### Visual Hierarchy
```
SECTION: Testimonials [background="subtle"]
├── Badge [variant="secondary"]
│   └── "Community"
│
├── Heading
│   ├── H2: "Built with Orion"
│   └── Description: "Teams building AI-native products..."
│
└── Social Proof Metrics Grid (3 cards, auto-fit columns)
    ├── Card 1 [variant="outlined"]
    │   └── Card.Body
    │       ├── Icon: <Star size={32}>
    │       ├── Value: "2.5K+"
    │       └── Label: "GitHub Stars"
    │
    ├── Card 2 [variant="outlined"]
    │   └── Card.Body
    │       ├── Icon: <Download size={32}>
    │       ├── Value: "50K+"
    │       └── Label: "Weekly Downloads"
    │
    └── Card 3 [variant="outlined"]
        └── Card.Body
            ├── Icon: <Code size={32}>
            ├── Value: "90+"
            └── Label: "Shipped Components"
```

**Orion Components Used**:
- `Badge` (Component) — 1 instance
- `Card` (Component) — 3 instances with `variant="outlined"`
- `Card.Body` (Subcomponent) — 3 instances

**Lucide Icons**: `Star`, `Download`, `Code`

**File**: `HomepageTestimonials.tsx`

---

## SECTION 9: CTA + FOOTER — `HomepageCTA.tsx`

### Visual Hierarchy
```
CTA [variant="brand" size="lg" align="center" contained=true]
├── Title: "Start building with Orion today"
├── Description: "Join builders creating AI-native interfaces..."
│
├── Actions (Flex container, center-aligned)
│   ├── Link → Button [size="lg" variant="primary" iconRight=<ArrowRight>]
│   │   └── "Become a Founding Member"
│   │
│   └── Link → Button [size="lg" variant="ghost" icon=<Github>]
│       └── "View on GitHub"
│
└── Footnote: "Open source · MIT License · Free forever..."

FOOTER [custom HTML styled with tokens]
├── Copyright: "© 2026 Orion Design System. Built with AI-first principles."
│
└── Footer Links Grid
    ├── Link → "GitHub"
    ├── Link → "NPM"
    ├── Link → "Docs"
    └── Link → "Pricing"
```

**Orion Components Used**:
- `CTA` (Block) — Main container
- `Button` (Component) — 2 instances (primary, ghost)

**Lucide Icons**: `ArrowRight`, `Github`

**Custom HTML**: Footer built with custom styled HTML (not Footer block due to SSR compatibility)

**File**: `HomepageCTA.tsx`

---

## PAGE: PRICING (`/pricing`) — `app/pricing/page.tsx`

### Overall Structure (Top to Bottom)
```
PAGE: Pricing
├── Custom Hero Section
│   ├── H1: "Simple, transparent pricing"
│   └── Description: "Start building for free..."
│
├── HomepagePricing (reused from homepage)
│   └── [See SECTION 7 above]
│
└── FAQ Accordion
    └── [See DOCS/MCP section below for Accordion usage]
```

**Orion Components Used**:
- Custom HTML for hero (not using Hero block)
- `HomepagePricing` (imported and reused)
- `FAQ` (Block) — Accordion-style FAQs

**File**: `app/pricing/page.tsx`

---

## PAGE: MCP DOCS (`/docs/mcp`) — `app/docs/mcp/page.tsx`

### Overall Structure (Top to Bottom)
```
PAGE: MCP Server Documentation
├── DocsPageHero (Hero with badges)
│   ├── Title: "MCP Server — AI-Native Component Discovery"
│   ├── Subtitle: "Give Claude, Cursor, and other AI tools..."
│   └── Badges (3):
│       ├── Badge [variant="brand"] → "Model Context Protocol"
│       ├── Badge [variant="secondary"] → "AI-First"
│       └── Badge [variant="secondary"] → "9 Tools"
│
├── SECTION: "What You Can Do"
│   └── DocsFeatureGrid (6 features)
│       ├── Feature with Icon + Title + Description (Bot, Zap, Code2, Package, Settings, BookOpen)
│       └── [Renders as grid]
│
├── SECTION: "Quick Start (30 seconds)"
│   └── CodeBlockSimple [code snippet]
│
├── SECTION: "The 9 Tools"
│   └── Accordion [variant="separated" items={TOOLS}]
│       ├── Accordion.Item 1: "list-components"
│       ├── Accordion.Item 2: "get-component"
│       ├── Accordion.Item 3: "search-components"
│       ├── Accordion.Item 4: "list-tokens"
│       └── [5+ more tool items]
│
└── SECTION: "Next Steps"
    └── DocsNextStepsGrid (2 next steps)
        ├── Item: "Getting Started" [icon=BookOpen]
        └── Item: "Component Library" [icon=Code2]
```

**Orion Components Used**:
- `DocsPageHero` (custom wrapper) — Uses `Badge`
- `Badge` (Component) — 3 instances with different variants
- `Card` (Component) — Used in feature grid items
- `Accordion` (Component) — 9+ items with `variant="separated"`
- `Alert` (Component) — Used in feature descriptions
- Custom components: `DocsFeatureGrid`, `DocsNextStepsGrid`, `CodeBlockSimple`

**Lucide Icons**: `Bot`, `Zap`, `Package`, `Code2`, `BookOpen`, `Layers`, `Settings`, `GitBranch`, `Terminal`

**File**: `app/docs/mcp/page.tsx`

---

## COMPONENT IMPORTS REFERENCE

### From `@orion-ds/react` (Core Components)
```typescript
import {
  Button,
  Card,
  Badge,
  Alert,
  Field,
  Select,
  Switch,
  Toggle,
  ProgressBar,
  Spinner,
  Avatar,
  Chip,
  Breadcrumb,
  Pagination,
  SearchInput,
  Tabs,
  Accordion,
  Table,
  Navbar,
  Sidebar,
  Modal,
  Drawer,
  Dropdown,
  Popover,
  Tooltip,
  PageHeader,
  ThemeController,
  Radio,
  Checkbox,
  Icon,
  Stepper,
  Skeleton,
  Link,
} from '@orion-ds/react';
```

### From `@orion-ds/react/blocks` (Premium Sections)
```typescript
import {
  Hero,
  Features,
  CTA,
  Pricing,
  Testimonials,
  Stats,
  FAQ,
  Team,
  Contact,
  Newsletter,
  LogoCloud,
  Timeline,
} from '@orion-ds/react/blocks';
```

### All Lucide Icons Used Across Landing
```typescript
// Navbar & Theme
import { Sun, Moon, Paintbrush, Check, Github } from 'lucide-react';

// Sidebar
import { Home, BookOpen, Download, Palette, Terminal, Layers, Grid3x3, Layout, FileText, Bot } from 'lucide-react';

// Homepage
import { ArrowRight, Terminal, Copy, Check } from 'lucide-react';
import { Zap, Package, Layers, Palette, Moon, Bot } from 'lucide-react';

// Testimonials
import { Star, Download, Code } from 'lucide-react';

// MCP Docs
import { Bot, Zap, Package, Code2, BookOpen, Layers, Settings, GitBranch, Terminal } from 'lucide-react';

// Install component
import { Terminal, Copy, Check } from 'lucide-react';

// Showcase
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
```

---

## SUMMARY TABLE

| Section | Page | Component(s) | File | Key Props |
|---------|------|--------------|------|-----------|
| Navbar | All | `Navbar` + `Button` + `Popover` | `DocsNavbar.tsx` | `sticky`, `bordered`, `height="md"` |
| Sidebar | Docs | `Sidebar` | `DocsSidebar.tsx` | — |
| Hero | Home | `Hero`, `Badge`, `Button` | `HomepageHero.tsx` | `layout="contained"`, `size="lg"` |
| Install | Home | `Card`, `Button` (custom) | `HomepageInstall.tsx` | `variant="base"` |
| LogoCloud | Home | `LogoCloud` | `HomepageLogoCloud.tsx` | `grayscale`, `layout="inline"` |
| Showcase | Home | `Tabs`, 15+ components | `ComponentShowcaseTabs.tsx` | — |
| Features | Home | `Features` | `HomepageFeaturesSection.tsx` | `columns=3`, `interactive` |
| Stats | Home | `Stats` | `HomepageStats.tsx` | `variant="cards"`, `highlightValue` |
| Pricing | Home/Pricing | `Pricing`, `Button` | `HomepagePricing.tsx` | — |
| Testimonials | Home | `Badge`, `Card` | `HomepageTestimonials.tsx` | `variant="outlined"` |
| CTA | Home | `CTA`, `Button` | `HomepageCTA.tsx` | `variant="brand"` |
| MCP Hero | Docs | `Badge` | `DocsPageHero.tsx` | — |
| MCP Features | Docs | Custom grid | `DocsFeatureGrid.tsx` | — |
| MCP Tools | Docs | `Accordion` | — (inline) | `variant="separated"` |
| FAQ | Pricing | `FAQ` | (inline) | — |

---

## NAVIGATION FLOW

```
Navbar (sticky at top)
  ├── Orion DS → Home (/)
  ├── Docs → /docs/getting-started
  │   └── Sidebar shows:
  │       ├── Introduction
  │       ├── Installation
  │       ├── Theming
  │       ├── CLI
  │       ├── Tokens
  │       └── MCP Server → /docs/mcp ← [YOU ARE HERE shows Accordion + Badges]
  ├── Components → /components
  ├── Sections → /sections
  ├── Templates → /templates
  ├── Pricing → /pricing ← [Shows HomepagePricing + FAQ]
  ├── Brand Picker Popover
  ├── Theme Toggle
  └── GitHub
```

---

## RESPONSIVE BREAKPOINTS

- **Mobile** (<640px): Sidebar collapses, Navbar stacks, grid columns reduce
- **Tablet** (640-1024px): 2-3 column grids, sidebar hidden
- **Desktop** (>1024px): Full layout, sticky sidebar, multi-column grids

---

## THEME/BRAND CONTEXT

All pages inherit from root `<html>`:
```html
<html data-theme="light" data-brand="orion" data-mode="display">
```

- **data-theme**: "light" | "dark" (toggle via Moon/Sun icon)
- **data-brand**: "orion" | "red" | "deepblue" | "orange" | "ember" | "lemon" (6-option picker)
- **data-mode**: "display" (marketing mode, CSS variables scale effects globally)

---

## COMPONENT COMPOSITION PATTERNS USED

1. **Hero + CTAs**: Standard pattern on home/docs pages
2. **Card Grid**: Homepage sections use Card + Grid combo
3. **Tabs + Showcase**: Interactive component demo pattern
4. **Accordion + Content**: Tool documentation pattern
5. **Pricing Cards**: 3-tier plan layout with Badge for popular
6. **Feature Grid**: 3-6 columns with icons + text
7. **Stats Display**: 5-column metric grid with highlighted values
8. **Navbar + Sidebar**: Persistent layout shell

---

## CUSTOM COMPONENTS (Non-Orion)

These are docs-specific wrappers or custom implementations:

- `HomepageHero.tsx` — Wrapper around `Hero` block
- `HomepageInstall.tsx` — Custom tabs + copy button (not using Orion Tabs due to state complexity)
- `HomepageLogoCloud.tsx` — Wrapper around `LogoCloud` block
- `ComponentShowcaseTabs.tsx` — Showcase grid with Orion components (uses `Tabs` from Orion)
- `HomepageFeaturesSection.tsx` — Wrapper around `Features` block
- `HomepageStats.tsx` — Wrapper around `Stats` block
- `HomepagePricing.tsx` — Wrapper around `Pricing` block
- `HomepageTestimonials.tsx` — Custom cards grid with metrics
- `HomepageCTA.tsx` — Wrapper around `CTA` block + custom footer
- `DocsNavbar.tsx` — Wrapper using `Navbar` + custom Brand Picker
- `DocsSidebar.tsx` — Wrapper using `Sidebar`
- `DocsPageHero.tsx` — Custom hero for docs pages (uses Badge)
- `DocsFeatureGrid.tsx` — Custom feature grid renderer
- `DocsNextStepsGrid.tsx` — Custom next steps renderer
- `CodeBlockSimple.tsx` — Custom syntax-highlighted code block
- `ClientComponents.tsx` — Re-export wrapper for Next.js SSR boundary

---

## PERFORMANCE NOTES

- Lazy loading: Not visible in component source (Suspense at page level)
- CSS imports: Single `@orion-ds/react/styles.css` covers all tokens
- Bundle: Premium sections imported selectively from `/blocks` subpath
- Icons: Lucide icons tree-shakeable (unused icons stripped)

---

## TESTING GUIDE

To update the landing, reference this map when modifying:
- **Change navbar**: Edit `DocsNavbar.tsx` (affects all pages)
- **Change pricing**: Edit `HomepagePricing.tsx` (used on `/` and `/pricing`)
- **Add new showcase components**: Update `ComponentShowcaseTabs.tsx`
- **Update MCP docs**: Edit `app/docs/mcp/page.tsx` or components it imports
- **Change footer**: Edit `HomepageCTA.tsx` (currently uses custom HTML)

All component visuals inherit theme/brand from root `<html>` attributes automatically.
