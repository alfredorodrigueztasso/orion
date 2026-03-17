# @orion-ds/react (v3.0.0)

> **Orion Design System** - AI-First React Component Library with Integrated Tokens

TypeScript-first React component library built on the Orion Design System. Features 40+ components, 30+ sections, and 9 page templates with full type safety, theme switching, and multi-brand support.

**New in v3.0.0**: Design tokens and theming from `@orion-ds/core` are now included. No need for separate Core package!

[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)](#)
[![Bundle Size](<https://img.shields.io/badge/bundle-2.8MB--4.7MB%20(minified)-orange>)](#)
[![Optional Deps](https://img.shields.io/badge/optional%20deps-1MB%20savings-success)](./BUNDLE_OPTIMIZATION.md)

## Features

- 🤖 **AI-First Design** - Optimized for AI/LLM code generation (see AI_GUIDE.md)
- ✅ **40+ Components** - Fully typed with IntelliSense support
- 📐 **30+ Sections** - Pre-built page sections (Hero, Features, Pricing, etc.)
- 📄 **9 Templates** - Complete page templates (Landing, Dashboard, Profile, etc.)
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
npx @orion-ds/cli init # Creates orion.json, installs @orion-ds/core
npx @orion-ds/cli add button card modal # Copies component source files
npx @orion-ds/cli list # Shows all 90 available items
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

## Quick Start

\`\`\`tsx
// 1. Import styles (pick one option)
import '@orion-ds/react/styles.css'; // Recommended: single import

// 2. Import components
import { Button, Card, Field, useTheme, ThemeProvider } from '@orion-ds/react';

function App() {
return (
<ThemeProvider> {/_ Fonts load automatically! _/}
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

## AI / LLM Integration

This library is optimized for AI code generation. When using with Claude, Cursor, Copilot, or other AI tools:

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
| **Orion**    | Libre Baskerville | Inter          |
| **Deepblue** | Work Sans         | Work Sans      |
| **Red**      | Poppins           | Inter          |
| **Orange**   | DM Sans           | Inter          |
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

### Forms

- **Button** - Primary, secondary, ghost variants
- **Field** - Text input with label, helper, error states
- **Select** - Dropdown with options
- **Switch** - Toggle switch
- **Checkbox** - Checkbox input
- **Radio** - Radio button
- **Textarea** - Multi-line text input

### Layout

- **Card** - Container with header, body, footer
- **Modal** - Overlay dialog
- **Navbar** - Navigation bar with brand, links, actions

### Feedback

- **Alert** - Info, success, warning, error messages
- **Badge** - Status indicators
- **Spinner** - Loading indicator
- **ProgressBar** - Progress visualization
- **Tooltip** - Hover information

### Data Display

- **Avatar** - User profile picture
- **Table** - Data table with sorting
- **Tabs** - Tab navigation
- **Breadcrumb** - Navigation breadcrumbs

### Utilities

- **ThemeController** - Theme & brand selector
- **useTheme** - Theme management hook

## Sections

Pre-built page sections for rapid development:

| Category      | Sections                                                |
| ------------- | ------------------------------------------------------- |
| **Marketing** | Hero, Features, Pricing, CTA, Testimonials, FAQ, Footer |
| **App**       | Sidebar, Header, DetailPanel, StatCards                 |
| **Content**   | ArticleContent, MediaGallery, Timeline                  |

\`\`\`tsx
import { Hero, Features, Pricing } from '@orion-ds/react';

<Hero title="Welcome" description="Build faster" />
<Features items={[...]} columns={3} />
<Pricing plans={[...]} />
\`\`\`

[View all 30+ sections in AI_COMPONENTS.md](./AI_COMPONENTS.md)

## Templates

Complete page templates ready to use:

| Template              | Use Case                |
| --------------------- | ----------------------- |
| `LandingPageTemplate` | Marketing landing pages |
| `DashboardTemplate`   | Admin dashboards        |
| `ProfilePageTemplate` | User profile pages      |
| `SettingsTemplate`    | Settings pages          |
| `LoginTemplate`       | Authentication pages    |
| `OnboardingTemplate`  | User onboarding flows   |
| `NotFoundTemplate`    | 404 error pages         |
| `MaintenanceTemplate` | Maintenance pages       |
| `ComingSoonTemplate`  | Pre-launch pages        |

\`\`\`tsx
import { LandingPageTemplate } from '@orion-ds/react';

<LandingPageTemplate
hero={{ title: 'Welcome', description: '...' }}
features={{ items: [...] }}
pricing={{ plans: [...] }}
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

## v2.0.0 Migration Guide

### Breaking Changes

#### Hero & CTA: `headline` → `title`

\`\`\`diff

- <Hero headline="Welcome" description="..." />

* <Hero title="Welcome" description="..." />
  \`\`\`

#### DetailPanel: `subtitle` → `description`

\`\`\`diff

- <DetailPanel title="Edit" subtitle="User profile" />

* <DetailPanel title="Edit" description="User profile" />
  \`\`\`

#### ThemeProvider: Flat Props (Optional)

\`\`\`diff

- <ThemeProvider options={{ defaultBrand: 'red' }}>

* <ThemeProvider defaultBrand="red">
  \`\`\`

> **Backward Compatibility**: The old props still work but show deprecation warnings in development.

## License

MIT © Orion Team

---

**Built with ❤️ using TypeScript, React, and Vite**
