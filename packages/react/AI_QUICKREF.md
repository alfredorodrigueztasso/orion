# Orion DS - AI Quick Reference

## Setup (Required)

```tsx
// Option 1: Single import (recommended)
import "@orion-ds/react/styles.css";

// Option 2: Separate imports
// import '@orion-ds/core/theme.css';
// import '@orion-ds/react/dist/react.css';

import { ThemeProvider } from "@orion-ds/react";

// New flat props API (preferred)
<ThemeProvider defaultBrand="orion" defaultTheme="light">
  <App />
</ThemeProvider>;
```

## Core Components

Button, Card, Field, Select, Switch, Checkbox, Radio, Textarea, SearchInput, Slider, Combobox

## Layout

Navbar, Modal, Drawer, Tabs, Breadcrumb, Container, Section, Accordion, Divider, Popover, Dropdown

## Feedback

Alert, Badge, Spinner, ProgressBar, Tooltip, Toast, Skeleton, EmptyState

## Data Display

Avatar, Table, List, Chip, Pagination, Stepper

## Sections (Landing Pages)

Hero, Features, CTA, Footer, Pricing, Testimonials, Stats, FAQ, Carousel, Team, Contact, Newsletter, LogoCloud, Blog, Gallery, Timeline, Comparison, Banner, SocialProof, AppDownload

## Templates (Full Pages)

**Marketing:** LandingPageTemplate, PricingPageTemplate, AboutPageTemplate, ContactPageTemplate
**App:** DashboardTemplate, SettingsTemplate, ProfilePageTemplate, KanbanPageTemplate, LoginTemplate

## Icon Usage

```tsx
import { Search } from 'lucide-react';
<Button icon={<Search size={20} />}>Search</Button>
<Button iconOnly icon={<Search size={20} />} aria-label="Search" />
```

## Theme Switching

```tsx
const { theme, brand, setTheme, setBrand } = useThemeContext();
// brands: orion, red, deepblue, orange, lemon
// themes: light, dark
```

## Button Variants

`primary` | `secondary` | `ghost` | `danger`

## Card Variants

`base` | `glass` | `elevated` | `outlined` | `image`

## Alert Variants

`info` | `success` | `warning` | `error`

## Anti-Hallucination Rules

- NEVER pass `brand` or `theme` props to components (they're global)
- NEVER hardcode colors (`#fff`) - use `var(--text-primary)`
- NEVER skip ThemeProvider wrapper
- ALWAYS import styles.css (or both CSS files separately)
- ALWAYS add `aria-label` to iconOnly buttons

## Deprecated Props (v2.0)

| Old        | New           | Component     |
| ---------- | ------------- | ------------- |
| `headline` | `title`       | Hero, CTA     |
| `subtitle` | `description` | DetailPanel   |
| `options`  | flat props    | ThemeProvider |

## Full docs: AI_GUIDE.md, AI_COMPONENTS.md
