# @orion/react AI Component Guide

> **READ THIS FIRST** before generating any React code with Orion Design System.

This document is the authoritative reference for AI agents building UIs with @orion/react. It prevents hallucination by providing a complete inventory of available components and sections.

---

## Quick Start (Required Setup)

```tsx
// 1. REQUIRED: Import styles
import "@orion-ds/react/styles.css"; // Single import (recommended)
// OR separate imports:
// import '@orion-ds/core/theme.css';
// import '@orion-ds/react/dist/react.css';

// 2. REQUIRED: Wrap app with ThemeProvider
import { ThemeProvider } from "@orion-ds/react";

function App() {
  return (
    <ThemeProvider defaultBrand="orion" defaultTheme="light">
      <YourComponents />
    </ThemeProvider>
  );
}
```

**Missing CSS = Unstyled Components.** Import styles.css is mandatory.

---

## Anti-Hallucination Rules

### NEVER Do These

| Rule                            | Bad Example                        | Why It's Wrong                          |
| ------------------------------- | ---------------------------------- | --------------------------------------- |
| Pass `brand` prop to components | `<Button brand="red">`             | Brand is GLOBAL, set on ThemeProvider   |
| Pass `theme` prop to components | `<Card theme="dark">`              | Theme is GLOBAL, set on ThemeProvider   |
| Hardcode colors                 | `style={{ color: '#1B5BFF' }}`     | Use CSS variables: `var(--text-brand)`  |
| Hardcode pixels                 | `style={{ padding: '16px' }}`      | Use tokens: `var(--spacing-4)`          |
| Create custom sections          | `<MyHeroSection>`                  | Use pre-built: `<Hero>`                 |
| Invent component variants       | `<Button variant="success">`       | Only: primary, secondary, ghost, danger |
| Skip ThemeProvider              | Render components without provider | Will cause hydration/context errors     |
| Use children in Field           | `<Field><input /></Field>`         | Field is self-contained, use props      |

### ALWAYS Do These

| Rule                         | Good Example                                                            |
| ---------------------------- | ----------------------------------------------------------------------- |
| Import both CSS files        | `import '@orion/core/theme.css'; import '@orion/react/dist/react.css';` |
| Wrap with ThemeProvider      | `<ThemeProvider><App /></ThemeProvider>`                                |
| Use pre-built sections       | `<Hero>`, `<Features>`, `<Pricing>`, `<CTA>`, `<Footer>`                |
| Use CSS variables            | `style={{ color: 'var(--text-primary)' }}`                              |
| Add aria-label for icon-only | `<Button iconOnly icon={<X />} aria-label="Close" />`                   |
| Check this doc first         | Before creating ANY component                                           |

---

## Component Inventory

### Actions

| Component | Use When                           | Variants                                  |
| --------- | ---------------------------------- | ----------------------------------------- |
| `Button`  | User triggers an action            | `primary`, `secondary`, `ghost`, `danger` |
| `Link`    | Navigation to another page/section | `default`, `subtle`, `brand`              |

### Forms

| Component     | Use When                          | Key Props                                               |
| ------------- | --------------------------------- | ------------------------------------------------------- |
| `Field`       | Single-line text input with label | `label`, `error`, `helperText`, `leftIcon`, `rightIcon` |
| `Textarea`    | Multi-line text input             | `label`, `error`, `resize`                              |
| `Select`      | Dropdown selection                | `options`, `label`, `placeholder`                       |
| `Checkbox`    | Boolean toggle with label         | `label`, `checked`, `indeterminate`                     |
| `Radio`       | Single choice from options        | `label`, `name`, `value`                                |
| `Switch`      | On/off toggle                     | `label`, `checked`                                      |
| `SearchInput` | Search with icon                  | `placeholder`, `onSearch`                               |
| `Slider`      | Range/value selection             | `min`, `max`, `value`                                   |
| `Combobox`    | Autocomplete/typeahead            | `options`, `onSelect`                                   |

### Layout

| Component   | Use When                      | Variants                                         |
| ----------- | ----------------------------- | ------------------------------------------------ |
| `Card`      | Container for related content | `base`, `glass`, `elevated`, `outlined`, `image` |
| `Divider`   | Visual separation             | `solid`, `dashed`, `dotted`                      |
| `Accordion` | Collapsible content sections  | `default`, `bordered`, `separated`               |

### Feedback

| Component     | Use When                      | Variants                                          |
| ------------- | ----------------------------- | ------------------------------------------------- |
| `Alert`       | System messages/notifications | `info`, `success`, `warning`, `error`             |
| `Badge`       | Status indicators, counts     | `default`, `success`, `warning`, `error`, `brand` |
| `Spinner`     | Loading state                 | `default`, `brand`                                |
| `ProgressBar` | Progress indication           | `default`, `success`, `brand`                     |
| `Tooltip`     | Hover information             | Position: `top`, `bottom`, `left`, `right`        |
| `Toast`       | Temporary notifications       | `info`, `success`, `warning`, `error`             |
| `Skeleton`    | Loading placeholder           | `text`, `circle`, `rectangle`                     |
| `EmptyState`  | No data available             | `sm`, `md`, `lg`                                  |

### Navigation

| Component    | Use When             | Key Props                                  |
| ------------ | -------------------- | ------------------------------------------ |
| `Navbar`     | Site/app header      | `variant`: `solid`, `transparent`, `glass` |
| `Tabs`       | Content switching    | `items`, `activeTab`                       |
| `Breadcrumb` | Location hierarchy   | `items`, `separator`                       |
| `Pagination` | Page navigation      | `total`, `current`, `onPageChange`         |
| `Stepper`    | Multi-step processes | `steps`, `current`                         |

### Overlays

| Component  | Use When               | Key Props                     |
| ---------- | ---------------------- | ----------------------------- |
| `Modal`    | Dialogs, confirmations | `isOpen`, `onClose`, `size`   |
| `Drawer`   | Side panels            | `isOpen`, `placement`, `size` |
| `Popover`  | Contextual content     | `trigger`, `content`          |
| `Dropdown` | Action menus           | `items`, `trigger`            |

### Data Display

| Component | Use When            | Key Props                     |
| --------- | ------------------- | ----------------------------- |
| `Avatar`  | User/entity images  | `src`, `name`, `size`         |
| `Table`   | Tabular data        | `columns`, `data`, `sortable` |
| `List`    | Vertical item lists | `items`, `variant`            |
| `Chip`    | Tags, filters       | `variant`, `onRemove`         |

### Utilities

| Component         | Use When                |
| ----------------- | ----------------------- |
| `ThemeController` | Theme/brand switcher UI |
| `FontLoader`      | Ensure fonts are loaded |
| `Icon`            | Render Lucide icons     |

---

## Pre-built Sections Inventory

Use these for landing pages, marketing sites, and product pages. **DO NOT create custom equivalents.**

### Core Sections (Landing Pages)

| Section    | Use When             | Required Props        |
| ---------- | -------------------- | --------------------- |
| `Hero`     | Landing page header  | `title`               |
| `Features` | Feature showcase     | `items`               |
| `CTA`      | Call-to-action block | `title`               |
| `Footer`   | Page footer          | `brand`, `linkGroups` |

### Engagement Sections

| Section        | Use When             | Required Props |
| -------------- | -------------------- | -------------- |
| `Pricing`      | Pricing tiers        | `plans`        |
| `Testimonials` | Customer quotes      | `items`        |
| `Stats`        | Key metrics          | `items`        |
| `FAQ`          | Common questions     | `items`        |
| `Carousel`     | Image/content slider | `items`        |

### Content Sections

| Section       | Use When             | Required Props                                    |
| ------------- | -------------------- | ------------------------------------------------- |
| `Team`        | Team members         | `members`                                         |
| `Contact`     | Contact form         | `onSubmit`                                        |
| `Newsletter`  | Email signup         | `onSubmit`                                        |
| `LogoCloud`   | Partner/client logos | `logos`                                           |
| `Blog`        | Article previews     | `articles`                                        |
| `Gallery`     | Image gallery        | `images`                                          |
| `Timeline`    | Chronological events | `events`                                          |
| `Comparison`  | Feature comparison   | `features`, `columns`                             |
| `Banner`      | Announcements        | `children`                                        |
| `SocialProof` | Trust indicators     | At least one of: `logos`, `testimonials`, `stats` |
| `AppDownload` | App store links      | `badges`                                          |

### Layout Utilities

| Component   | Use When                      |
| ----------- | ----------------------------- |
| `Container` | Constrain content width       |
| `Section`   | Vertical section with spacing |

### AI Chat Sections

| Section            | Use When             | Required Props              |
| ------------------ | -------------------- | --------------------------- |
| `ChatSection`      | Chat UI with sidebar | `messages`, `onSendMessage` |
| `ChatPageTemplate` | Full-page chat app   | `messages`, `onSendMessage` |

---

## Complete Landing Page Example

Copy this template for any landing page:

```tsx
import {
  // Provider
  ThemeProvider,
  // Components
  Button,
  Badge,
  Navbar,
  // Sections
  Hero,
  Features,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@orion-ds/react";
import { Zap, Shield, Rocket, Star } from "lucide-react";

// REQUIRED CSS
import "@orion-ds/react/styles.css";

function LandingPage() {
  return (
    <ThemeProvider>
      {/* Navigation */}
      <Navbar variant="solid" sticky>
        <Navbar.Brand href="/">
          <img src="/logo.svg" alt="Acme" height={32} />
        </Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="#features">Features</Navbar.Link>
          <Navbar.Link href="#pricing">Pricing</Navbar.Link>
          <Navbar.Link href="#faq">FAQ</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost">Sign In</Button>
          <Button variant="primary">Get Started</Button>
        </Navbar.Actions>
      </Navbar>

      {/* Hero Section */}
      <Hero
        badge={<Badge variant="brand">New Release</Badge>}
        title="Build Products Faster Than Ever"
        description="The AI-first design system that eliminates guesswork and accelerates development."
        primaryAction={<Button size="lg">Start Free Trial</Button>}
        secondaryAction={
          <Button variant="ghost" size="lg">
            Watch Demo
          </Button>
        }
        align="center"
        size="lg"
      />

      {/* Features Section */}
      <Features
        eyebrow="Features"
        title="Everything you need"
        description="Built for modern teams who ship fast."
        items={[
          {
            icon: <Zap size={24} />,
            title: "Lightning Fast",
            description: "Optimized for speed at every level.",
          },
          {
            icon: <Shield size={24} />,
            title: "Secure by Default",
            description: "Enterprise-grade security built in.",
          },
          {
            icon: <Rocket size={24} />,
            title: "Scale Infinitely",
            description: "Grows with your business needs.",
          },
        ]}
        columns={3}
      />

      {/* Pricing Section */}
      <Pricing
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="No hidden fees. Cancel anytime."
        plans={[
          {
            name: "Starter",
            price: "$9",
            period: "/month",
            description: "Perfect for individuals",
            features: [
              { text: "5 projects", included: true },
              { text: "Basic analytics", included: true },
              { text: "Email support", included: true },
              { text: "API access", included: false },
            ],
            action: (
              <Button variant="secondary" fullWidth>
                Get Started
              </Button>
            ),
          },
          {
            name: "Pro",
            price: "$29",
            period: "/month",
            description: "For growing teams",
            features: [
              { text: "Unlimited projects", included: true },
              { text: "Advanced analytics", included: true },
              { text: "Priority support", included: true },
              { text: "API access", included: true },
            ],
            action: (
              <Button variant="primary" fullWidth>
                Start Free Trial
              </Button>
            ),
            popular: true,
          },
          {
            name: "Enterprise",
            price: "Custom",
            description: "For large organizations",
            features: [
              { text: "Everything in Pro", included: true },
              { text: "Custom integrations", included: true },
              { text: "Dedicated support", included: true },
              { text: "SLA guarantee", included: true },
            ],
            action: (
              <Button variant="secondary" fullWidth>
                Contact Sales
              </Button>
            ),
          },
        ]}
      />

      {/* Testimonials Section */}
      <Testimonials
        eyebrow="Testimonials"
        title="Loved by teams worldwide"
        testimonials={[
          {
            quote: "This transformed how we build products. Shipped 3x faster.",
            author: {
              name: "Sarah Chen",
              role: "CTO",
              company: "TechCorp",
              avatar: <img src="/avatars/sarah.jpg" alt="" />,
            },
          },
          {
            quote: "The best design system we've ever used. Period.",
            author: {
              name: "Mike Johnson",
              role: "Lead Designer",
              company: "StartupXYZ",
              avatar: <img src="/avatars/mike.jpg" alt="" />,
            },
          },
        ]}
      />

      {/* FAQ Section */}
      <FAQ
        eyebrow="FAQ"
        title="Common questions"
        items={[
          {
            question: "How do I get started?",
            answer:
              "Sign up for a free trial and follow our quick start guide.",
          },
          {
            question: "Can I cancel anytime?",
            answer:
              "Yes, you can cancel your subscription at any time with no penalties.",
          },
          {
            question: "Is there a free tier?",
            answer: "Yes! Our Starter plan is free for individual use.",
          },
        ]}
      />

      {/* CTA Section */}
      <CTA
        title="Ready to get started?"
        description="Join thousands of teams building with Orion."
        actions={
          <>
            <Button size="lg">Start Free Trial</Button>
            <Button variant="ghost" size="lg">
              Talk to Sales
            </Button>
          </>
        }
      />

      {/* Footer */}
      <Footer
        brand={{
          name: "Acme Inc",
          logo: "/logo.svg",
          description: "Building the future of design systems.",
        }}
        linkGroups={[
          {
            title: "Product",
            links: [
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "Changelog", href: "/changelog" },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
            ],
          },
          {
            title: "Legal",
            links: [
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ],
          },
        ]}
        socialLinks={[
          {
            label: "Twitter",
            href: "https://twitter.com/acme",
            icon: <Twitter />,
          },
          {
            label: "GitHub",
            href: "https://github.com/acme",
            icon: <Github />,
          },
          {
            label: "LinkedIn",
            href: "https://linkedin.com/company/acme",
            icon: <Linkedin />,
          },
        ]}
        copyright="2024 Acme Inc. All rights reserved."
      />
    </ThemeProvider>
  );
}

export default LandingPage;
```

---

## Compound Components Pattern

Some components use the compound pattern with dot notation:

### Card

```tsx
<Card variant="base">
  <Card.Header>Title</Card.Header>
  <Card.Body>Content goes here</Card.Body>
  <Card.Footer>Footer actions</Card.Footer>
</Card>
```

### Navbar

```tsx
<Navbar variant="solid" sticky>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="/features">Features</Navbar.Link>
    <Navbar.Link href="/pricing">Pricing</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button>Sign In</Button>
  </Navbar.Actions>
</Navbar>
```

### Modal

```tsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Header>Confirm Action</Modal.Header>
  <Modal.Body>Are you sure you want to proceed?</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Confirm
    </Button>
  </Modal.Footer>
</Modal>
```

### Drawer

```tsx
<Drawer isOpen={isOpen} onClose={handleClose} placement="right">
  <Drawer.Header>Settings</Drawer.Header>
  <Drawer.Body>Settings content</Drawer.Body>
  <Drawer.Footer>
    <Button onClick={handleClose}>Close</Button>
  </Drawer.Footer>
</Drawer>
```

### Chat (AI Chat Interface)

Full-featured chat interface with multimodal support (text, images, audio, files, code).

```tsx
<Chat>
  <Chat.Header title="AI Assistant" subtitle="Online" />
  <Chat.Messages>
    {messages.map((msg) => (
      <Chat.Message
        key={msg.id}
        role={msg.role}
        content={msg.content}
        timestamp={msg.timestamp}
        attachments={msg.attachments}
      />
    ))}
    {isTyping && <Chat.TypingIndicator />}
  </Chat.Messages>
  <Chat.Input onSend={handleSend} allowAttachments allowVoiceRecording />
</Chat>
```

**Chat Sub-components:**

- `Chat.Header` - Title, avatar, and actions
- `Chat.Messages` - Scrollable message container with auto-scroll
- `Chat.Message` - Individual message (user/assistant/system)
- `Chat.Input` - Multi-line input with attachments and voice
- `Chat.TypingIndicator` - Animated "typing" dots
- `Chat.CodeBlock` - Syntax-highlighted code
- `Chat.Markdown` - Markdown rendering
- `Chat.ImagePreview` - Image with lightbox
- `Chat.AudioPlayer` - Audio playback
- `Chat.VoiceRecorder` - Voice recording
- `Chat.FileUpload` - Drag-and-drop file upload
- `Chat.Attachment` - Attachment preview
- `Chat.Sidebar` - Conversation history list

**Pre-built Sections:**

- `ChatSection` - Chat with sidebar layout
- `ChatPageTemplate` - Full-page ChatGPT-style layout

```tsx
// Full-page template (ChatGPT-style)
<ChatPageTemplate
  conversations={conversations}
  activeConversationId={activeId}
  messages={messages}
  onSendMessage={handleSend}
  onSelectConversation={handleSelect}
  onNewConversation={handleNew}
  isTyping={isTyping}
  user={{ name: "John", avatar: "..." }}
/>
```

---

## Icons (Lucide)

All icons come from [Lucide](https://lucide.dev). Import directly:

```tsx
import { Search, Settings, User, ChevronDown } from 'lucide-react';

// Use with Button
<Button icon={<Search size={20} />}>Search</Button>
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />

// Use with Field
<Field leftIcon={<Search size={18} />} placeholder="Search..." />
```

**Common icons:**

- Navigation: `Menu`, `X`, `ChevronDown`, `ChevronRight`, `ArrowLeft`
- Actions: `Plus`, `Minus`, `Check`, `Copy`, `Download`, `Trash2`, `Edit`
- Status: `AlertCircle`, `CheckCircle`, `XCircle`, `Info`
- User: `User`, `LogIn`, `LogOut`, `Settings`

---

## Theme & Brand (Global Only)

Theme and brand are **always global**. Set them on ThemeProvider, not on individual components.

```tsx
// Set default brand and theme (new flat props - preferred)
<ThemeProvider defaultBrand="red" defaultTheme="dark">
  <App />
</ThemeProvider>;

// Legacy API (still works)
// <ThemeProvider options={{ defaultBrand: 'red', defaultTheme: 'dark' }}>

// Access/change theme in any component
import { useThemeContext } from "@orion-ds/react";

function ThemeSwitcher() {
  const { theme, brand, setTheme, setBrand } = useThemeContext();

  return (
    <>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <button onClick={() => setBrand("deepblue")}>Switch to DeepBlue</button>
    </>
  );
}
```

**Available brands:** `orion`, `red`, `deepblue`, `orange`, `lemon`
**Available themes:** `light`, `dark`

---

## Mode-Aware Styling

Components automatically adapt to the current mode (`display`, `product`, `app`):

| Mode      | Context         | Button Height | Visual Style             |
| --------- | --------------- | ------------- | ------------------------ |
| `display` | Marketing pages | 56px          | Atmospheric, hover lifts |
| `product` | Dashboards      | 32px          | Flat, minimal motion     |
| `app`     | Mobile apps     | 44px          | Tactile, subtle lifts    |

Set mode on the HTML element:

```html
<html data-mode="display"></html>
```

Or via ThemeProvider:

```tsx
<ThemeProvider options={{ defaultMode: 'display' }}>
```

---

## Common Mistakes & Fixes

### Missing Styles

**Problem:** Components render but look unstyled.

**Fix:** Import the styles CSS:

```tsx
import "@orion-ds/react/styles.css";
```

### Brand Prop on Components

**Problem:** `<Button brand="red">` doesn't work.

**Fix:** Brand is global. Use ThemeProvider:

```tsx
<ThemeProvider defaultBrand="red">
```

### Custom Section Components

**Problem:** Created `<MyHero>` instead of using `<Hero>`.

**Fix:** Always use pre-built sections from this inventory.

### Icon-Only Button Without Label

**Problem:** `<Button iconOnly icon={<X />} />` - no accessibility.

**Fix:** Always add aria-label:

```tsx
<Button iconOnly icon={<X size={20} />} aria-label="Close" />
```

### Using Field Children

**Problem:** `<Field><input /></Field>` - Field isn't a wrapper.

**Fix:** Field is self-contained:

```tsx
<Field label="Email" type="email" placeholder="Enter email" />
```

---

## Quick Reference Card

```
IMPORTS (Required):
  import '@orion-ds/react/styles.css';
  import { ThemeProvider, Button, ... } from '@orion-ds/react';

LANDING PAGE SECTIONS (In Order):
  <Navbar>     - Navigation header
  <Hero>       - Main title + CTA
  <LogoCloud>  - Trust logos (optional)
  <Features>   - Feature showcase
  <Stats>      - Key metrics (optional)
  <Pricing>    - Pricing tiers
  <Testimonials> - Customer quotes
  <FAQ>        - Common questions
  <CTA>        - Final call-to-action
  <Footer>     - Links + copyright

TEMPLATES (Full Pages):
  Marketing: LandingPageTemplate, PricingPageTemplate, AboutPageTemplate, ContactPageTemplate
  App: DashboardTemplate, SettingsTemplate, ProfilePageTemplate, KanbanPageTemplate, LoginTemplate

BUTTON VARIANTS:
  primary   - Main CTA (Submit, Save)
  secondary - Supporting action (Cancel)
  ghost     - Subtle action (Close)
  danger    - Destructive (Delete)

CARD VARIANTS:
  base      - Standard container
  glass     - Frosted glass (Display mode only)
  elevated  - Shadow elevation
  outlined  - Border only
  image     - Background image

ALERT VARIANTS:
  info, success, warning, error

THEME CONTROL:
  const { theme, brand, setTheme, setBrand } = useThemeContext();

DEPRECATED PROPS (v2.0):
  Hero/CTA: headline → title
  DetailPanel: subtitle → description
  ThemeProvider: options → flat props (defaultTheme, defaultBrand)
```

---

**Last Updated:** 2026-02
**Version:** 2.0.0
