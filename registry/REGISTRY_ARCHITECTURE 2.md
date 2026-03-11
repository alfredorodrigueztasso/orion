# Registry Architecture Guide

## Overview

The Orion registry (`registry/*.json`) defines 4 categories of reusable UI building blocks. This document clarifies the structure, ownership, and usage of each category.

---

## Categories

### 1. **React Components** (`registry/components/`)

**Source**: `packages/react/src/components/`

**What**: Primitive UI components — the atoms and molecules of Orion.

**Examples**:
- Button, Input, Card, Modal, Dialog
- Avatar, Badge, Chip, Alert
- DataTable, KanbanBoard, Sidebar
- SearchInput, CommandBar, FilterBar

**Ownership**: `@orion-ds/react`

**Import**:
```typescript
import { Button, Card, DataTable } from '@orion-ds/react';
```

**Usage**: Building blocks for layouts. Mix and match to create sections.

**Total**: 71 components

---

### 2. **Block Sections** (`registry/sections/`)

**Source**: `packages/blocks/src/sections/`

**What**: Reusable, medium-grained layout blocks — combinations of components arranged for a specific use case.

**Examples (Marketing)**:
- Hero, Features, CTA, Pricing, Stats
- Testimonials, FAQ, Newsletter, Blog
- Team, LogoCloud, Contact, Comparison
- Footer, Breadcrumbs, SocialProof, Gallery

**Examples (App/SaaS)**:
- ActivityFeed, AgentFolder, Chat, SettingsLayout
- EmptyState, Stepper, Timeline
- Carousel, AppDownload

**Ownership**: `@orion-ds/blocks`

**Import**:
```typescript
import { Hero, Features, Pricing } from '@orion-ds/blocks';
```

**Usage**: Drop into your app. They're styled, functional, and ready to customize via props.

**Total**: 26 sections

---

### 3. **Block Templates** (`registry/templates/`)

**Source**: `packages/blocks/src/templates/`

**What**: Full-page templates — complete, end-to-end page layouts for common use cases.

**Examples (Marketing)**:
- LandingPageTemplate
- PricingPageTemplate
- AboutPageTemplate
- ContactPageTemplate

**Examples (App/SaaS)**:
- DashboardTemplate
- SettingsTemplate
- ProfilePageTemplate
- KanbanPageTemplate
- LoginTemplate
- ChatPageTemplate
- AgentWorkspace
- AgentEditor

**Ownership**: `@orion-ds/blocks`

**Import**:
```typescript
import { DashboardTemplate, KanbanPageTemplate } from '@orion-ds/blocks';
```

**Usage**: Full-page starting points. Customize the sections inside or integrate with your app state.

**Total**: 12 templates

---

### 4. **Phantom Entries** (Sections Registry Only)

**What**: React components that ARE components (live in `@orion-ds/react`) but appear in the sections registry because they're used AS blocks.

**Examples**:
- `sidebar` — React component (Sidebar), registered as a "section" for discoverability
- `data-table` — React component (DataTable), registered as a "section"
- `command-bar` — React component (CommandBar), registered as a "section"
- `nav-tree` — React component (NavTree), registered as a "section"
- And ~17 others

**Why**: Allows the CLI and MCP tools to recommend these components when building sections, even though they're primitives.

**Distinction**: They have `"type": "registry:component"` in their JSON (not `"type": "registry:section"`).

**Total in sections registry**: ~21 phantom entries (out of 44 total sections entries)

---

## Registry Structure

### File Organization

```
registry/
├── components/
│   ├── button.json              → Component: Button
│   ├── card.json                → Component: Card
│   ├── data-table.json          → Component: DataTable
│   └── ... (39 total)
├── sections/
│   ├── hero.json                → Section: Hero (real section)
│   ├── features.json            → Section: Features (real section)
│   ├── sidebar.json             → Phantom: Sidebar (React component, registered as section)
│   ├── data-table.json          → Phantom: DataTable (duplicate, registered as section)
│   └── ... (44 total, 26 real + 18 phantom)
├── templates/
│   ├── landing-page.json        → Template: LandingPageTemplate
│   ├── dashboard.json           → Template: DashboardTemplate
│   └── ... (11 total)
├── index.json                   → Master manifest
└── REGISTRY_ARCHITECTURE.md     → This document
```

### JSON Schema

Each entry (component, section, template) has:

```json
{
  "$schema": "https://orion-ds.dev/schema/registry-item.json",
  "name": "button",
  "type": "registry:component",
  "title": "Button",
  "description": "Primary button component",
  "category": "interactive",
  "dependencies": ["lucide-react"],
  "files": [
    { "path": "packages/react/src/components/Button/Button.tsx", "type": "registry:component" }
  ],
  "props": [
    { "name": "variant", "type": "string", "description": "Button variant", "required": true }
  ],
  "import": "import { Button } from '@orion-ds/react'",
  "cssImport": "import '@orion-ds/react/styles.css'"
}
```

**Key fields**:
- `type`: Always one of `registry:component`, `registry:section`, `registry:template`
- `category`: Organizes items in CLI lists (e.g., "interactive", "layout", "marketing", "app")
- `files`: Where the code lives (used by CLI to copy files)
- `import`: Canonical import path
- `cssImport`: CSS bundle needed

---

## Generation

### Auto-Generated (Scalable)

Registry is auto-generated from source code via `npm run build:registry`:

```bash
npm run build:registry
```

This script (`scripts/generate-registry.ts`):
1. Scans `packages/react/src/components/` → generates `registry/components/*.json`
2. Scans `packages/blocks/src/sections/` → generates `registry/sections/*.json`
3. Scans `packages/blocks/src/templates/` → generates `registry/templates/*.json`
4. Generates `registry/index.json` (master manifest)

**Result**: Registry always stays in sync with source code. No manual JSON editing needed.

### When to Run

- After adding a new component: `npm run build:registry`
- After moving/renaming a component: `npm run build:registry`
- Before releasing: `npm run build:registry` (automated in release script)

---

## Usage by Consumers

### 1. **Component Consumers**

Developers using Orion components directly:

```typescript
// Get everything
import { Button, Card, Modal, DataTable } from '@orion-ds/react';

// Get only what you need (tree-shake)
import Button from '@orion-ds/react/components/Button';
```

**Use case**: Building custom pages in your app.

### 2. **Section Consumers**

Developers composing pages from sections:

```typescript
import { Hero, Features, CTA, Footer } from '@orion-ds/blocks';

export default function LandingPage() {
  return (
    <>
      <Hero title="Welcome" />
      <Features items={...} />
      <CTA />
      <Footer />
    </>
  );
}
```

**Use case**: Building marketing/app pages quickly.

### 3. **Template Consumers**

Developers using pre-built full pages:

```typescript
import { DashboardTemplate } from '@orion-ds/blocks';

export default function App() {
  return <DashboardTemplate />;
}
```

**Use case**: Quick start — customize sections inside the template.

### 4. **CLI Users** (`@orion-ds/cli`)

The Orion CLI reads the registry to enable copy-paste:

```bash
npx @orion-ds/cli add button card modal
npx @orion-ds/cli add hero features
npx @orion-ds/cli add landing-page-template
```

The registry tells the CLI:
- Which files to copy
- What dependencies to install
- Where files should go in the user's project

### 5. **MCP Agents** (`@orion-ds/mcp`)

AI agents (Claude in Claude Code, Cursor, Cline) use the registry to:
- Discover available components/sections
- Understand props and examples
- Generate code with correct imports
- Validate implementations

---

## Best Practices

### For Component Authors

1. **Every component MUST have**:
   - `.tsx` — implementation
   - `.types.ts` — TypeScript types (exported from `index.ts`)
   - `.module.css` — scoped styles
   - `.stories.tsx` — Storybook examples
   - `README.md` — documentation (optional but recommended)

2. **Run `npm run build:registry` after**:
   - Adding a new component
   - Adding/changing props
   - Changing import paths

### For Section Authors

1. **Same as components**, but live in `packages/blocks/src/sections/`
2. **Use `@orion-ds/react` components** inside sections (don't duplicate code)
3. **Export props interface** from `.types.ts` for customization

### For Template Authors

1. **Templates are layout containers** — they arrange sections + components
2. **Make templates customizable** via props (not hardcoded)
3. **Templates should live in `packages/blocks/src/templates/{marketing|app}/`**

---

## FAQ

### Q: Can I create a component that's also a section?

**A**: No. Choose one role:
- **Component** = primitive/reusable across many layouts
- **Section** = specific layout use case

If it's useful as both, create a component and register it as a phantom entry (optional).

### Q: Why are some sections "phantom"?

**A**: Backward compatibility. Early registry included React components that can be used as sections (e.g., Sidebar, DataTable). They live in `@orion-ds/react` but are discoverable in the sections registry for CLI users.

Future: We'll clean this up by creating real sections that WRAP these components.

### Q: Should I manually edit `registry/components/*.json`?

**A**: **No**. Always regenerate via `npm run build:registry`. Manual edits get overwritten.

### Q: How do I add metadata (e.g., custom category)?

**A**: Edit the component's `.types.ts` JSDoc or add metadata to `scripts/generate-registry.ts`. The script reads JSDoc and generates JSON from it.

### Q: Can I extend the registry schema?

**A**: Yes. Update `scripts/generate-registry.ts` and the TypeScript `RegistryItem` interface. Then run `npm run build:registry`.

---

## Migration Path

**Current state**: 21 phantom entries (React components in sections registry)

**Future state** (v2.0):
1. Create real sections that WRAP phantom components
2. Remove phantom entries
3. Simplify registry to 26 sections only

Example:
```typescript
// Current: Sidebar is a React component
import { Sidebar } from '@orion-ds/react';

// Future: SidebarSection is a real section
import { SidebarSection } from '@orion-ds/blocks';
```

---

## Tools

- **Generate registry**: `npm run build:registry`
- **Validate registry**: Built into `npm run audit`
- **View registry**: `registry/index.json` (master manifest)
- **Preview registry**: http://localhost:3009/sections (docs-site)
