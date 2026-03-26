# @orion-ds/react

> **Orion Design System** - AI-First React Component Library with Integrated Tokens

TypeScript-first React component library built on the Orion Design System. Features 70+ components, 25+ sections, and 8 full-page templates with full type safety, theme switching, and multi-brand support.

[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](#)
[![Bundle Size](<https://img.shields.io/badge/bundle-2.8MB--4.7MB%20(minified)-orange>)](#)
[![Optional Deps](https://img.shields.io/badge/optional%20deps-1MB%20savings-success)](./BUNDLE_OPTIMIZATION.md)

## 🎉 What's New in v5.6.0

**Major additions:**

- ✨ **Official Tailwind CSS Preset** (`@orion-ds/react/integrations/tailwind`) - Use all Orion tokens with Tailwind utilities (supports v3 & v4)
- ✨ **Box Component** - Type-safe polymorphic component for spacing, surfaces, and borders with guaranteed token compliance
- 🔄 **@layer orion CSS Cascade** - Seamless Tailwind + Orion coexistence (Tailwind utilities automatically win)
- 🐛 **Type-Check Fix** - Resolved pre-existing type errors with optional dependencies (date-fns, recharts)

[Full release notes](https://github.com/alfredorodrigueztasso/orion/releases/tag/v5.6.0)

## Features

- 🤖 **AI-First Design** - Optimized for AI/LLM code generation (see AI_GUIDE.md)
- ✅ **70+ Components** - Fully typed with IntelliSense support
- 📐 **25+ Sections** - Pre-built page sections (Hero, Features, Pricing, etc.)
- 📄 **7 Templates** - Complete page templates (Dashboard, Login, Profile, Settings, Chat, etc.)
- 🎨 **Theme Switching** - Light/Dark modes with CSS variables
- 🏢 **Multi-Brand** - orion, red, deepblue, orange, lemon brands
- 🎯 **Lucide Icons** - 5000+ icons built-in
- ♿ **Accessible** - WCAG AA compliant
- 📦 **Tree-Shakeable** - ESM + CJS

## Compatibility

| Dependency    | Supported Versions     |
| ------------- | ---------------------- |
| **React**     | `^18.0.0 \|\| ^19.0.0` |
| **React DOM** | `^18.0.0 \|\| ^19.0.0` |

The library uses standard React APIs (`forwardRef`, `useState`, `useEffect`, `useContext`, `useRef`, etc.) and does not rely on React 19-exclusive features, so it works with both React 18 and 19.

## Installation

### ⚠️ CRITICAL: @orion-ds/react is a **Runtime Dependency**, NOT a Dev Tool

**@orion-ds/react must be installed in `dependencies`**, not `devDependencies`. It contains UI components and styles needed in production.

#### ✅ CORRECT Installation

\`\`\`bash
npm install @orion-ds/react
\`\`\`

This puts it in `dependencies` where it belongs.

**Your `package.json` should show:**
\`\`\`json
{
"dependencies": {
"@orion-ds/react": "^5.6.0",
"react": "^19.0.0",
"react-dom": "^19.0.0"
},
"devDependencies": {
"@types/react": "^19.0.0",
"@types/react-dom": "^19.0.0",
"typescript": "^5.0.0"
}
}
\`\`\`

#### ❌ WRONG: Using --save-dev (Will Break in Production!)

\`\`\`bash

# ❌ DON'T DO THIS

npm install --save-dev @orion-ds/react
\`\`\`

If you accidentally installed it as a dev dependency, fix it:
\`\`\`bash
npm uninstall --save-dev @orion-ds/react
npm install @orion-ds/react
\`\`\`

#### Why This Matters

| Location          | Behavior                           | Use Case                              |
| ----------------- | ---------------------------------- | ------------------------------------- |
| `dependencies`    | ✅ Included in production builds   | **UI libraries, components, styling** |
| `devDependencies` | ❌ Excluded from production builds | Testing tools, linters, TypeScript    |

**If @orion-ds/react is in `devDependencies`, your components will be missing from the production build!**

### Option A: npm install (Recommended)

\`\`\`bash
npm install @orion-ds/react

# or

pnpm add @orion-ds/react

# or

yarn add @orion-ds/react
\`\`\`

**No need for `@orion-ds/core`** - tokens and theming are now included!

### Option B: CLI copy (own the code)

Copy individual components into your project, shadcn-style. You own the source and can modify freely.

\`\`\`bash
npx @orion-ds/cli init # Creates orion.json configuration
npx @orion-ds/cli add button card modal # Copies component source files
npx @orion-ds/cli list # Shows all 90+ available items
\`\`\`

See [@orion-ds/cli README](../cli/README.md) for full documentation.

## CSS Setup

### Single Import (All you need)

\`\`\`tsx
// In your app entry file (e.g., main.tsx, App.tsx)
import '@orion-ds/react/styles.css';
\`\`\`

This single import includes:

- ✅ All design tokens (colors, spacing, typography, etc.)
- ✅ All component styles
- ✅ Theme switching (light/dark)
- ✅ Brand support (orion, red, deepblue, orange, lemon)

> **⚠️ IMPORTANT**: Don't forget the CSS import! Without it, components will be unstyled. In development, ThemeProvider will warn you if styles are missing.

## ⚠️ Common Setup Mistakes

### Mistake 1: @orion-ds/react in devDependencies (CRITICAL!)

**❌ WRONG:**
\`\`\`bash
npm install --save-dev @orion-ds/react
\`\`\`

**Why it breaks**: devDependencies are excluded from production builds. Your components won't be available in production!

**✅ FIX:**
\`\`\`bash
npm uninstall --save-dev @orion-ds/react
npm install @orion-ds/react
\`\`\`

Check your `package.json` - should be in `dependencies`:
\`\`\`json
{
"dependencies": {
"@orion-ds/react": "^5.6.0" // ✅ Runtime dependency
}
}
\`\`\`

---

### Mistake 2: Forgot CSS imports

**❌ WRONG:**
\`\`\`tsx
import { Button, Card } from '@orion-ds/react';
// Forgot to import styles! Components will be unstyled
\`\`\`

**✅ CORRECT:**
\`\`\`tsx
import '@orion-ds/react/styles.css'; // Must come first
import { Button, Card } from '@orion-ds/react';
\`\`\`

**Or in your app entry file:**
\`\`\`tsx
// main.tsx or index.tsx (root of your app)
import '@orion-ds/react/styles.css';
import App from './App';
\`\`\`

---

### Using Tailwind CSS with Orion (NEW in v5.6.0! ✨)

**v5.6.0 introduces official Tailwind CSS preset support!** You can now use Tailwind utilities alongside Orion components seamlessly.

#### Setup (Tailwind v3)

\`\`\`typescript
// tailwind.config.ts
import { orionPreset } from '@orion-ds/react/integrations/tailwind';

export default {
presets: [orionPreset],
content: ['./src/**/*.{ts,tsx}'],
};
\`\`\`

#### Setup (Tailwind v4)

\`\`\`css
/_ tailwind.css _/
@import 'tailwindcss';
@import '@orion-ds/react/integrations/tailwind/v4.css';
\`\`\`

#### Use Tailwind Utilities

Now you can use Orion tokens with Tailwind utilities:

\`\`\`tsx
// ✅ NOW WORKS - Mix Orion components with Tailwind utilities!
import { Box, Button } from '@orion-ds/react';

<Box className="flex gap-4 p-6">
  <Button className="bg-surface-base text-text-primary">Click</Button>
</Box>

// All Orion tokens available as Tailwind utilities:
// - Colors: bg-surface-base, text-text-primary, border-border-subtle, etc.
// - Spacing: p-orion-4, gap-orion-6, m-orion-8, etc.
// - Radius: rounded-button, rounded-container, rounded-sm, etc.
// - Fonts: font-primary, font-secondary, font-mono
\`\`\`

For complete Tailwind + Orion integration guide, see [TAILWIND_INTEGRATION.md](./TAILWIND_INTEGRATION.md).

## Quick Start

````tsx
// 1. Import styles (pick one option)
import '@orion-ds/react/styles.css'; // Recommended: single import

// 2. Import components
import { Button, Card, Field, useTheme, ThemeProvider } from '@orion-ds/react';

function App() {
return (
<ThemeProvider> {/* Fonts load automatically! */}
<MyApp />
</ThemeProvider>
);
}

function MyApp() {
const { theme, toggleTheme } = useTheme();

return (
<Card>
<Card.Header>Welcome to Orion</Card.Header>
<Card.Body>
<Field label="Email" type="email" placeholder="your@email.com" />
<Button onClick={toggleTheme}>
Switch to {theme === 'light' ? 'dark' : 'light'} mode
</Button>
</Card.Body>
</Card>
);
}
\`\`\`

## Box Component (Type-Safe Layouts)

**NEW in v5.6.0!** Use the `Box` component for guaranteed design token compliance in layouts:

\`\`\`tsx
import { Box, Button } from '@orion-ds/react';

// Type-safe spacing, surfaces, and radius — no arbitrary pixel values possible!
<Box
  bg="surface-base"
  p={4}           // Always a token value (16px)
  radius="container"
  className="flex gap-4"
>
  <Button>Click me</Button>
</Box>

// Polymorphic rendering
<Box as="section" className="py-12">
  {/* Renders as <section> instead of <div> */}
</Box>

// Padding with directional control
<Box pX={6} pY={4}>
  {/* padding-left/right: 24px, padding-top/bottom: 16px */}
</Box>
\`\`\`

Benefits:
- ✅ **Type-safe** - Only valid token values accepted (no `p="20px"`)
- ✅ **Dark mode aware** - Automatically switches surfaces based on theme
- ✅ **Brand aware** - Respects brand-specific radius and colors
- ✅ **Polymorphic** - Render as any HTML element with `as` prop

See [Box Component Documentation](https://github.com/alfredorodrigueztasso/orion#) for full API.

## 🤖 AI Integration (MCP)

Orion includes an MCP (Model Context Protocol) server that lets AI agents generate Orion-compliant code automatically. Use with Claude Code, Cursor, Cline, and other AI tools.

### 3-Minute Setup

1. **Install the MCP server:**
   ```bash
   npm install @orion-ds/mcp
````

2. **Configure in your tool's settings** (see tool documentation):
   - Claude Code: Add to `.claude.json`
   - Cursor: Add to Cursor settings
   - Cline: Add to MCP settings in VS Code

3. **Start using AI commands:**
   ```
   "Add a Button component"
   "Create a responsive card layout"
   "Generate form input component"
   ```

### What's Available

The MCP server exposes **9 tools**:

- `list-components` — List all 70+ components, 25+ sections, and 8 templates
- `get-component` — Get full details: props, examples, tokens, accessibility
- `search-components` — Semantic search (e.g., "form input" finds Field, Select, Checkbox)
- `list-tokens` — List design tokens by category
- `get-token` — Get token values per theme and brand
- `validate-code` — Validate code against Orion's anti-hallucination rules
- `get-setup-guide` — Framework-specific setup (Vite, Next.js, React)
- `list-sections` — Pre-built page sections and templates
- `get-section` — Get section code and examples

### Complete Documentation

For setup instructions and advanced configuration:

- **[MCP Documentation](../mcp/README.md)** — Complete MCP reference
- **[AI Integration Guide](../../docs-site/content/docs/ai-integration.mdx)** — Step-by-step setup

### AI Code Generation

This library is optimized for AI code generation. For detailed guidance:

| Document           | Purpose                                                   |
| ------------------ | --------------------------------------------------------- |
| `AI_GUIDE.md`      | Complete integration guide, decision trees, anti-patterns |
| `AI_QUICKREF.md`   | Quick reference for common patterns                       |
| `AI_COMPONENTS.md` | All components with examples                              |

These files are included in the npm package.

## Google Fonts (Automatic)

**Fonts are loaded automatically by `ThemeProvider`** (since v1.1.4). No manual setup required!

\`\`\`tsx
// ✅ Just use ThemeProvider - fonts load automatically
<ThemeProvider>
<YourApp />
</ThemeProvider>
\`\`\`

### Opt-out of Automatic Font Loading

If you need to manage fonts manually (e.g., self-hosted fonts, custom font strategy):

\`\`\`tsx
<ThemeProvider disableAutoFontLoading>
<YourApp />
</ThemeProvider>
\`\`\`

### Manual HTML Setup (Alternative)

For vanilla HTML projects or if you disabled auto-loading, add these links to your HTML `<head>`:

\`\`\`html

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Work+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&family=Anton&display=swap" rel="stylesheet">
\`\`\`

### Fonts by Brand

| Brand        | Primary Font      | Secondary Font |
| ------------ | ----------------- | -------------- |
| **Orion**    | Libre Baskerville | DM Sans        |
| **Deepblue** | Work Sans         | Work Sans      |
| **Red**      | Poppins           | DM Sans        |
| **Orange**   | DM Sans           | DM Sans        |
| **Lemon**    | Anton             | Work Sans      |

### Programmatic Access

\`\`\`tsx
import { GOOGLE_FONTS_URL, BRAND_FONTS, getMissingFonts } from '@orion-ds/react';

// Get the full Google Fonts URL
console.log(GOOGLE_FONTS_URL);

// Get fonts for a specific brand
console.log(BRAND_FONTS.lemon); // ['Anton', 'Work Sans', 'JetBrains Mono']

// Check which fonts are missing for a brand
const missing = getMissingFonts('lemon');
if (missing.length > 0) {
console.warn('Missing fonts:', missing);
}
\`\`\`

## Components

### Forms & Input

- **Button** - Primary, secondary, ghost variants with icon support
- **Field** - Text input with label, helper, error states, and icons
- **Select** - Dropdown with options and multi-select
- **Combobox** - Searchable dropdown
- **DatePicker** - Date selection with calendar
- **InputOTP** - One-time password input
- **SearchInput** - Specialized search field with autocomplete
- **Textarea** - Multi-line text input
- **Switch** - Toggle switch
- **Checkbox** - Checkbox input
- **Radio** - Radio button
- **FileUploader** - File upload with preview
- **Slider** - Range slider input

### Layout & Structure

- **Card** - Container with header, body, footer
- **Stack** - Flexible stack layout (horizontal/vertical)
- **Divider** - Visual separator
- **Modal** - Overlay dialog
- **Drawer** - Slide-out panel
- **Navbar** - Navigation bar with brand, links, actions
- **Sidebar** - Side navigation panel
- **NavTree** - Hierarchical navigation tree

### Feedback & Status

- **Alert** - Info, success, warning, error messages
- **Badge** - Status indicators
- **Spinner** - Loading indicator
- **ProgressBar** - Progress visualization
- **Tooltip** - Hover information
- **Banner** - Dismissible banner notifications

### Data Display

- **Avatar** - User profile picture
- **Table** - Data table with sorting
- **DataTable** - Advanced data table with filtering/sorting
- **Tabs** - Tab navigation
- **Breadcrumb** - Navigation breadcrumbs
- **List** - Structured list component
- **MetricCards** - Metric display cards
- **Pagination** - Page navigation

### AI & Collaboration

- **AgentCard** - Agent profile card
- **CommandBar** - Command palette
- **NotificationCenter** - Notification management
- **KanbanBoard** - Kanban board layout

### Utilities & Behavior

- **ThemeController** - Theme & brand selector
- **useTheme** - Theme management hook
- **Collapsible** - Collapsible section
- **Popover** - Floating popover
- **Dropdown** - Dropdown menu
- **Toggle** - Toggle button group
- **ToggleGroup** - Group of toggle buttons
- **Skeleton** - Loading skeleton
- **EmptyState** - Empty state display
- **ErrorBoundary** - Error boundary wrapper
- **Carousel** - Image carousel

## Sections

Pre-built page sections for rapid development:

| Category       | Sections                                                           |
| -------------- | ------------------------------------------------------------------ |
| **Marketing**  | Hero, Features, Pricing, CTA, Testimonials, FAQ, Footer, LogoCloud |
| **Content**    | Blog, Timeline, Gallery, TeamShowcase                              |
| **App**        | Sidebar, Header, DetailPanel, SettingsLayout, Breadcrumbs          |
| **Engagement** | Newsletter, SocialProof, Comparison, Contact                       |
| **Navigation** | ActivityFeed, CarouselSection, AppDownload                         |

\`\`\`tsx
import { Hero, Features, Pricing } from '@orion-ds/react/blocks';

<Hero title="Welcome" description="Build faster" />
<Features items={[...]} columns={3} />
<Pricing plans={[...]} />
\`\`\`

[View all 25+ sections in AI_COMPONENTS.md](./AI_COMPONENTS.md)

## Templates

Complete full-page templates ready to use:

| Template              | Use Case                                          |
| --------------------- | ------------------------------------------------- |
| `DashboardTemplate`   | Admin dashboards with sidebar, header, data views |
| `LoginTemplate`       | Authentication and login flows                    |
| `ProfilePageTemplate` | User profile pages                                |
| `SettingsTemplate`    | Settings and preferences pages                    |
| `AgentWorkspace`      | AI agent builder and management                   |
| `AgentEditor`         | AI agent configuration editor                     |
| `KanbanPageTemplate`  | Kanban board for task management                  |

\`\`\`tsx
import { DashboardTemplate } from '@orion-ds/react/templates';

<DashboardTemplate
sidebar={{ items: [...] }}
header={{ title: 'Dashboard' }}
content={<YourContent />}
/>
\`\`\`

## Lucide Icons

All components support **Lucide icons** - 5000+ beautiful, consistent icons.

\`\`\`tsx
import { Button, Field, Alert } from '@orion-ds/react';
import { Search, Download, AlertCircle } from 'lucide-react';

// Icon in button (left side)
<Button icon={<Search size={20} />}>Search</Button>

// Icon in button (right side)
<Button iconRight={<Download size={20} />}>Download</Button>

// Icon-only button (must have aria-label)
<Button iconOnly icon={<Download size={20} />} aria-label="Download" />

// Icon in form field
<Field placeholder="Search..." icon={<Search size={18} />} />

// Icon in alert
<Alert variant="error" icon={<AlertCircle size={20} />}>
Something went wrong
</Alert>
\`\`\`

**Browse all icons**: https://lucide.dev

**Size reference**: `size={16}` (small), `size={20}` (default), `size={24}` (medium), `size={32}` (large)

See [LUCIDE_ICONS.md](./LUCIDE_ICONS.md) for complete icon documentation.

## Entry Points

The library provides multiple entry points optimized for different use cases:

### Core Imports

```typescript
// Main export - all components, sections, and hooks
import { Button, Card, Hero, useTheme, ThemeProvider } from "@orion-ds/react";

// Next.js App Router compatible - excludes heavy dependencies
import { Button, Card, Field } from "@orion-ds/react/client";

// Design tokens (TypeScript)
import { primitives, getToken, getSemanticToken } from "@orion-ds/react/tokens";

// CSS imports
import "@orion-ds/react/styles.css"; // Complete bundle (recommended)
import "@orion-ds/react/theme.css"; // Tokens only (advanced tree-shaking)
```

### Heavy Components (Optional Dependencies)

These components require optional peer dependencies. Install only what you need:

| Entry Point                | Components                                      | Peer Dependency                                            | Install Command                                                  |
| -------------------------- | ----------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| `@orion-ds/react/chart`    | `ChartContainer`, `ChartTooltip`, `ChartLegend` | `recharts`                                                 | `npm install recharts`                                           |
| `@orion-ds/react/calendar` | `Calendar`, `DatePicker`                        | `date-fns`                                                 | `npm install date-fns`                                           |
| `@orion-ds/react/editor`   | `CodeEditor`                                    | `react-syntax-highlighter`                                 | `npm install react-syntax-highlighter`                           |
| `@orion-ds/react/dnd`      | `CollapsibleFolder`, `KanbanBoard`              | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` | `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities` |

```typescript
// Only import if you've installed the peer dependency
import { ChartContainer } from "@orion-ds/react/chart"; // requires recharts
import { Calendar } from "@orion-ds/react/calendar"; // requires date-fns
import { CodeEditor } from "@orion-ds/react/editor"; // requires react-syntax-highlighter
import { CollapsibleFolder } from "@orion-ds/react/dnd"; // requires @dnd-kit/*
```

### Sections & Templates

```typescript
import { Hero, Features, Pricing } from "@orion-ds/react/blocks";
import { DashboardTemplate, LoginTemplate } from "@orion-ds/react/templates";
```

## Theme & Brand Switching

### Using the Hook

\`\`\`tsx
import { useTheme } from '@orion-ds/react';

function ThemeSwitcher() {
const { theme, brand, setTheme, setBrand, toggleTheme } = useTheme();

return (
<>
<button onClick={toggleTheme}>
Current: {theme}
</button>
<button onClick={() => setBrand('deepblue')}>
Switch to Deepblue Brand
</button>
</>
);
}
\`\`\`

## License

MIT © Orion Team

---

**Built with ❤️ using TypeScript, React, and Vite**
