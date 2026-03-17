# @orion-ds/react AI Integration Guide

> The definitive reference for AI/LLM agents building UIs with Orion Design System.

**Version:** 2.0.0
**Last Updated:** 2026-02

---

## Quick Decision Tree

```
Need a UI element?
│
├─ Full page layout?
│  └─ Use a TEMPLATE (see Templates section)
│     ├─ Marketing page → LandingPageTemplate, PricingPageTemplate, etc.
│     └─ App page → DashboardTemplate, SettingsTemplate, LoginTemplate, etc.
│
├─ Page section?
│  └─ Use a SECTION (see Sections section)
│     ├─ Marketing → Hero, Features, Pricing, CTA, Footer, etc.
│     └─ App/SaaS → Sidebar, DataTable, MetricCards, etc.
│
└─ Single UI element?
   └─ Use a COMPONENT
      ├─ Action → Button, Link
      ├─ Form → Field, Select, Checkbox, Radio, Switch, Textarea
      ├─ Feedback → Alert, Badge, Spinner, Toast, Tooltip
      ├─ Layout → Card, Modal, Drawer, Accordion
      ├─ Navigation → Navbar, Tabs, Breadcrumb, Pagination
      └─ Data → Table, Avatar, List, Chip
```

---

## Setup (Required)

```tsx
// 1. Import styles (choose ONE method)
import "@orion-ds/react/styles.css"; // Recommended: single import
// OR
// import '@orion-ds/core/theme.css';
// import '@orion-ds/react/dist/react.css';

// 2. Wrap app with ThemeProvider
import { ThemeProvider } from "@orion-ds/react";

function App() {
  return (
    <ThemeProvider defaultBrand="orion" defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## Complete Export Reference

### Components (40)

| Component         | Import                                                      | Primary Props                                         |
| ----------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| `Accordion`       | `import { Accordion } from '@orion-ds/react'`               | `items`, `variant`                                    |
| `Alert`           | `import { Alert } from '@orion-ds/react'`                   | `variant`, `title`, `onClose`                         |
| `Avatar`          | `import { Avatar } from '@orion-ds/react'`                  | `src`, `name`, `size`                                 |
| `Badge`           | `import { Badge } from '@orion-ds/react'`                   | `variant`, `size`                                     |
| `Breadcrumb`      | `import { Breadcrumb } from '@orion-ds/react'`              | `items`, `separator`                                  |
| `Button`          | `import { Button } from '@orion-ds/react'`                  | `variant`, `size`, `icon`, `iconOnly`                 |
| `Card`            | `import { Card } from '@orion-ds/react'`                    | `variant` + `Card.Header`, `Card.Body`, `Card.Footer` |
| `Carousel`        | `import { Carousel } from '@orion-ds/react'`                | `items`, `autoPlay`                                   |
| `Checkbox`        | `import { Checkbox } from '@orion-ds/react'`                | `label`, `checked`, `indeterminate`                   |
| `Chip`            | `import { Chip } from '@orion-ds/react'`                    | `variant`, `onRemove`                                 |
| `Combobox`        | `import { Combobox } from '@orion-ds/react'`                | `options`, `onSelect`, `placeholder`                  |
| `Divider`         | `import { Divider } from '@orion-ds/react'`                 | `orientation`, `variant`                              |
| `Drawer`          | `import { Drawer } from '@orion-ds/react'`                  | `isOpen`, `onClose`, `placement`, `size`              |
| `Dropdown`        | `import { Dropdown } from '@orion-ds/react'`                | `items`, `trigger`                                    |
| `EmptyState`      | `import { EmptyState } from '@orion-ds/react'`              | `title`, `description`, `action`                      |
| `Field`           | `import { Field } from '@orion-ds/react'`                   | `label`, `type`, `error`, `icon`                      |
| `FontLoader`      | `import { FontLoader } from '@orion-ds/react'`              | (auto-loaded by ThemeProvider)                        |
| `Icon`            | `import { Icon } from '@orion-ds/react'`                    | `name`, `size`, `color`                               |
| `Link`            | `import { Link } from '@orion-ds/react'`                    | `href`, `variant`                                     |
| `List`            | `import { List } from '@orion-ds/react'`                    | `items`, `variant`                                    |
| `Modal`           | `import { Modal } from '@orion-ds/react'`                   | `isOpen`, `onClose`, `size`                           |
| `Navbar`          | `import { Navbar } from '@orion-ds/react'`                  | `variant`, `sticky`                                   |
| `Pagination`      | `import { Pagination } from '@orion-ds/react'`              | `total`, `current`, `onPageChange`                    |
| `Popover`         | `import { Popover } from '@orion-ds/react'`                 | `trigger`, `content`, `placement`                     |
| `ProgressBar`     | `import { ProgressBar } from '@orion-ds/react'`             | `value`, `max`, `variant`                             |
| `Radio`           | `import { Radio } from '@orion-ds/react'`                   | `label`, `name`, `value`                              |
| `SearchInput`     | `import { SearchInput } from '@orion-ds/react'`             | `placeholder`, `onSearch`                             |
| `Select`          | `import { Select } from '@orion-ds/react'`                  | `options`, `label`, `placeholder`                     |
| `Skeleton`        | `import { Skeleton } from '@orion-ds/react'`                | `variant`, `width`, `height`                          |
| `Slider`          | `import { Slider } from '@orion-ds/react'`                  | `min`, `max`, `value`, `onChange`                     |
| `Spinner`         | `import { Spinner } from '@orion-ds/react'`                 | `size`, `variant`                                     |
| `Stepper`         | `import { Stepper } from '@orion-ds/react'`                 | `steps`, `current`                                    |
| `Switch`          | `import { Switch } from '@orion-ds/react'`                  | `label`, `checked`, `onChange`                        |
| `Table`           | `import { Table } from '@orion-ds/react'`                   | `columns`, `data`, `sortable`                         |
| `Tabs`            | `import { Tabs } from '@orion-ds/react'`                    | `items`, `activeTab`                                  |
| `Textarea`        | `import { Textarea } from '@orion-ds/react'`                | `label`, `rows`, `resize`                             |
| `ThemeController` | `import { ThemeController } from '@orion-ds/react'`         | (theme/brand switcher UI)                             |
| `Toast`           | `import { ToastProvider, useToast } from '@orion-ds/react'` | `variant`, `position`                                 |
| `Tooltip`         | `import { Tooltip } from '@orion-ds/react'`                 | `content`, `placement`                                |

### Sections (30+)

**Marketing Sections:**
| Section | Primary Props | Use For |
|---------|---------------|---------|
| `Hero` | `title`, `description`, `primaryAction` | Landing page headers |
| `Features` | `items`, `columns` | Feature showcases |
| `Pricing` | `plans` | Pricing tables |
| `CTA` | `title`, `description`, `actions` | Call-to-action blocks |
| `Footer` | `brand`, `linkGroups`, `socialLinks` | Page footers |
| `Testimonials` | `testimonials` | Customer quotes |
| `Stats` | `stats` | Key metrics display |
| `FAQ` | `items` | Q&A sections |
| `Team` | `members` | Team member grids |
| `Contact` | `onSubmit` | Contact forms |
| `Newsletter` | `onSubmit` | Email signup |
| `LogoCloud` | `logos` | Partner/client logos |
| `Blog` | `articles` | Article previews |
| `Gallery` | `images` | Image galleries |
| `Timeline` | `events` | Chronological events |
| `Comparison` | `features`, `columns` | Feature comparisons |
| `Banner` | `children` | Announcements |
| `SocialProof` | `logos`, `testimonials`, `stats` | Trust indicators |
| `AppDownload` | `badges` | App store links |

**App/SaaS Sections:**
| Section | Primary Props | Use For |
|---------|---------------|---------|
| `Sidebar` | `items`, `sections` | App navigation |
| `DataTable` | `columns`, `data`, `filters` | Data grids |
| `MetricCards` | `items` | Dashboard metrics |
| `PageHeader` | `title`, `breadcrumbs`, `actions` | Page headers |
| `FormSection` | `title`, `children` | Form layouts |
| `CommandBar` | `items`, `onSelect` | Command palettes |
| `ActivityFeed` | `items` | Activity logs |
| `DetailPanel` | `title`, `description`, `open`, `onClose` | Slide-over panels |
| `FilterBar` | `filters`, `activeFilters` | Filter UIs |
| `SettingsLayout` | `navItems`, `children` | Settings pages |
| `QuickActions` | `actions` | FAB menus |
| `KanbanBoard` | `columns`, `cards` | Kanban boards |
| `NotificationCenter` | `notifications` | Notification panels |
| `UserMenu` | `user`, `items` | User dropdowns |
| `FileUploader` | `onUpload`, `accept` | File uploads |

### Templates (9)

**Marketing Templates:**

```tsx
import {
  LandingPageTemplate,
  PricingPageTemplate,
  AboutPageTemplate,
  ContactPageTemplate,
} from "@orion-ds/react";
```

**App Templates:**

```tsx
import {
  DashboardTemplate,
  SettingsTemplate,
  ProfilePageTemplate,
  KanbanPageTemplate,
  LoginTemplate,
} from "@orion-ds/react";
```

### Hooks

```tsx
import {
  // Theme
  useTheme,
  useThemeContext,

  // Media queries
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,

  // UI utilities
  useDisclosure,
  useClickOutside,
  useDebounce,
  useDebouncedCallback,
  useLocalStorage,
  useSessionStorage,
  useCopyToClipboard,
  useKeyboard,
  useKeyboardShortcuts,
} from "@orion-ds/react";
```

### Context Providers

```tsx
import { ThemeProvider, ToastProvider } from "@orion-ds/react";
```

---

## Common AI Mistakes (Anti-Patterns)

### 1. Passing Brand/Theme to Components

```tsx
// WRONG - brand is global, not a component prop
<Button brand="red">Click me</Button>
<Card theme="dark">Content</Card>

// CORRECT - set on ThemeProvider
<ThemeProvider defaultBrand="red" defaultTheme="dark">
  <Button>Click me</Button>
  <Card>Content</Card>
</ThemeProvider>
```

### 2. Using Deprecated Props

```tsx
// DEPRECATED (still works, shows warning)
<Hero headline="Welcome" />
<CTA headline="Get Started" />
<DetailPanel subtitle="User info" />

// CORRECT - use new prop names
<Hero title="Welcome" />
<CTA title="Get Started" />
<DetailPanel description="User info" />
```

### 3. Using options Object Instead of Flat Props

```tsx
// OLD API (still works)
<ThemeProvider options={{ defaultBrand: 'red', defaultTheme: 'dark' }}>

// NEW API (preferred)
<ThemeProvider defaultBrand="red" defaultTheme="dark">
```

### 4. Missing CSS Import

```tsx
// WRONG - components will be unstyled
import { Button } from "@orion-ds/react";

// CORRECT - always import styles
import "@orion-ds/react/styles.css";
import { Button } from "@orion-ds/react";
```

### 5. Icon-Only Button Without aria-label

```tsx
// WRONG - not accessible
<Button iconOnly icon={<Settings size={20} />} />

// CORRECT - always include aria-label
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
```

### 6. Using Field as a Wrapper

```tsx
// WRONG - Field is not a wrapper component
<Field label="Email">
  <input type="email" />
</Field>

// CORRECT - Field is self-contained
<Field label="Email" type="email" placeholder="you@example.com" />
```

### 7. Hardcoding Colors/Spacing

```tsx
// WRONG - hardcoded values
<div style={{ color: '#1B5BFF', padding: '16px' }}>

// CORRECT - use CSS variables
<div style={{ color: 'var(--text-brand)', padding: 'var(--spacing-4)' }}>
```

### 8. Creating Custom Sections

```tsx
// WRONG - don't create custom versions
function MyHeroSection() { ... }
function CustomPricingTable() { ... }

// CORRECT - use pre-built sections
<Hero title="Welcome" />
<Pricing plans={[...]} />
```

---

## Template Reference

### LoginTemplate

Authentication page with optional editorial panel.

```tsx
import { LoginTemplate } from "@orion-ds/react";

<LoginTemplate
  logo={<img src="/logo.svg" alt="Company" />}
  title="Welcome back"
  subtitle="Sign in to your account"
  formConfig={{
    emailLabel: "Email",
    passwordLabel: "Password",
    submitLabel: "Sign in",
    showRememberMe: true,
    showForgotPassword: true,
  }}
  socialProviders={[
    { name: "Google", icon: <GoogleIcon />, onClick: handleGoogleAuth },
    { name: "GitHub", icon: <GithubIcon />, onClick: handleGithubAuth },
  ]}
  editorial={{
    headline: "Ship faster with Orion",
    description: "Join thousands of developers building amazing products.",
    quote: "This platform changed how we build.",
    author: "Sarah Chen",
    authorRole: "CTO, TechCorp",
  }}
  onSubmit={({ email, password, rememberMe }) => {
    // Handle login
  }}
  isLoading={isLoading}
  error={error}
/>;
```

### DashboardTemplate

App dashboard with sidebar, metrics, and data tables.

```tsx
import { DashboardTemplate } from "@orion-ds/react";

<DashboardTemplate
  sidebar={{
    items: [
      { label: "Dashboard", icon: <Home />, href: "/" },
      { label: "Analytics", icon: <BarChart />, href: "/analytics" },
    ],
  }}
  header={{
    title: "Dashboard",
    actions: <Button>New Report</Button>,
  }}
  metrics={[
    {
      label: "Total Users",
      value: "10,234",
      trend: { value: 12, direction: "up" },
    },
    {
      label: "Revenue",
      value: "$54,321",
      trend: { value: 8, direction: "up" },
    },
  ]}
>
  <DataTable columns={columns} data={data} />
</DashboardTemplate>;
```

### LandingPageTemplate

Marketing landing page with all sections.

```tsx
import { LandingPageTemplate } from "@orion-ds/react";

<LandingPageTemplate
  navbar={{ variant: "solid", sticky: true }}
  hero={{
    title: "Build faster with Orion",
    description: "The AI-first design system",
    primaryAction: <Button>Get Started</Button>,
  }}
  features={{
    items: featureItems,
    columns: 3,
  }}
  pricing={{
    plans: pricingPlans,
  }}
  testimonials={{
    testimonials: testimonialItems,
  }}
  faq={{
    items: faqItems,
  }}
  cta={{
    title: "Ready to start?",
    actions: <Button size="lg">Start Free Trial</Button>,
  }}
  footer={{
    brand: { name: "Acme Inc" },
    linkGroups: footerLinks,
  }}
/>;
```

---

## API Conventions

### Prop Naming Patterns

| Pattern         | Meaning                   | Example                        |
| --------------- | ------------------------- | ------------------------------ |
| `title`         | Main heading text         | `<Hero title="Welcome" />`     |
| `description`   | Supporting/secondary text | `<Hero description="..." />`   |
| `items`         | Array of child data       | `<Features items={[...]} />`   |
| `variant`       | Visual style variant      | `<Button variant="primary" />` |
| `size`          | Size variant              | `<Button size="lg" />`         |
| `onX`           | Event callback            | `<Button onClick={...} />`     |
| `isX` / `showX` | Boolean state             | `<Modal isOpen={true} />`      |

### Variant Conventions

**Button:** `primary` | `secondary` | `ghost` | `danger`
**Card:** `base` | `glass` | `elevated` | `outlined` | `image`
**Alert:** `info` | `success` | `warning` | `error`
**Badge:** `default` | `success` | `warning` | `error` | `brand`

---

## Naming Aliases (Migration)

These props are deprecated but still work (with console warnings in development):

| Old Prop   | New Prop      | Component     | Migration                              |
| ---------- | ------------- | ------------- | -------------------------------------- |
| `headline` | `title`       | Hero          | `<Hero title="..." />`                 |
| `headline` | `title`       | CTA           | `<CTA title="..." />`                  |
| `subtitle` | `description` | DetailPanel   | `<DetailPanel description="..." />`    |
| `options`  | flat props    | ThemeProvider | `<ThemeProvider defaultBrand="..." />` |

---

## Quick Examples

### Landing Page

```tsx
import '@orion-ds/react/styles.css';
import { ThemeProvider, Hero, Features, CTA, Footer, Button } from '@orion-ds/react';

function LandingPage() {
  return (
    <ThemeProvider>
      <Hero
        title="Build Products Faster"
        description="The AI-first design system for modern teams."
        primaryAction={<Button size="lg">Get Started</Button>}
        align="center"
      />
      <Features
        title="Everything you need"
        items={[
          { icon: <Zap />, title: 'Fast', description: 'Lightning quick' },
          { icon: <Shield />, title: 'Secure', description: 'Enterprise-grade' },
        ]}
      />
      <CTA
        title="Ready to start?"
        actions={<Button>Start Free Trial</Button>}
      />
      <Footer
        brand={{ name: 'Acme' }}
        linkGroups={[{ title: 'Product', links: [...] }]}
      />
    </ThemeProvider>
  );
}
```

### Dashboard

```tsx
import "@orion-ds/react/styles.css";
import {
  ThemeProvider,
  Sidebar,
  PageHeader,
  MetricCards,
  DataTable,
} from "@orion-ds/react";

function Dashboard() {
  return (
    <ThemeProvider defaultTheme="light">
      <div style={{ display: "flex" }}>
        <Sidebar items={navItems} />
        <main style={{ flex: 1, padding: "var(--spacing-6)" }}>
          <PageHeader title="Dashboard" actions={<Button>Export</Button>} />
          <MetricCards items={metrics} />
          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </ThemeProvider>
  );
}
```

### Login Page

```tsx
import "@orion-ds/react/styles.css";
import { ThemeProvider, LoginTemplate } from "@orion-ds/react";

function LoginPage() {
  return (
    <ThemeProvider>
      <LoginTemplate
        logo={<img src="/logo.svg" alt="Company" />}
        title="Welcome back"
        onSubmit={handleLogin}
        socialProviders={[
          { name: "Google", icon: <GoogleIcon />, onClick: handleGoogle },
        ]}
      />
    </ThemeProvider>
  );
}
```

---

## Verification Checklist

Before submitting generated code, verify:

- [ ] `@orion-ds/react/styles.css` is imported
- [ ] App is wrapped with `<ThemeProvider>`
- [ ] No `brand` or `theme` props on individual components
- [ ] Using `title` not `headline` for Hero/CTA
- [ ] Using `description` not `subtitle` for DetailPanel
- [ ] All icon-only buttons have `aria-label`
- [ ] No hardcoded colors or pixel values
- [ ] Using pre-built sections, not custom equivalents

---

**Full documentation:** See `AI_COMPONENTS.md` for detailed component reference.
