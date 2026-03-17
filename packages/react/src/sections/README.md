# @orion/react Sections

> Pre-built UI sections for rapidly building landing pages, marketing sites, and product pages.

## Overview

Sections are complete, ready-to-use page blocks that compose atomic components. **Use these instead of building custom sections.**

```tsx
import {
  Hero,
  Features,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@orion/react";
```

---

## Available Sections (22 Total)

### Layout Utilities

| Section     | Purpose                                                  |
| ----------- | -------------------------------------------------------- |
| `Container` | Constrain content width with responsive max-width        |
| `Section`   | Vertical section with consistent spacing and backgrounds |

### Core Sections (Landing Pages)

| Section    | Purpose                                                    | Required Props        |
| ---------- | ---------------------------------------------------------- | --------------------- |
| `Hero`     | Landing page header with headline, CTA, and optional media | `headline`            |
| `Features` | Feature/benefit showcase in grid layout                    | `items`               |
| `CTA`      | Call-to-action block                                       | `headline`            |
| `Footer`   | Page footer with links, social, and legal                  | `brand`, `linkGroups` |

### Engagement Sections

| Section        | Purpose                                | Required Props |
| -------------- | -------------------------------------- | -------------- |
| `Pricing`      | Pricing tiers/plans comparison         | `plans`        |
| `Testimonials` | Customer quotes and reviews            | `items`        |
| `Stats`        | Key metrics and numbers                | `items`        |
| `FAQ`          | Frequently asked questions (accordion) | `items`        |
| `Carousel`     | Image/content slider                   | `items`        |

### Content Sections

| Section       | Purpose                      | Required Props                                    |
| ------------- | ---------------------------- | ------------------------------------------------- |
| `Team`        | Team member profiles         | `members`                                         |
| `Contact`     | Contact form with info       | `onSubmit`                                        |
| `Newsletter`  | Email signup form            | `onSubmit`                                        |
| `LogoCloud`   | Partner/client logos         | `logos`                                           |
| `Blog`        | Article previews             | `articles`                                        |
| `Gallery`     | Image gallery with lightbox  | `images`                                          |
| `Timeline`    | Chronological events/history | `events`                                          |
| `Comparison`  | Feature comparison table     | `features`, `columns`                             |
| `Banner`      | Announcement/alert banner    | `children`                                        |
| `SocialProof` | Combined trust indicators    | At least one of: `logos`, `testimonials`, `stats` |
| `AppDownload` | Mobile app store links       | `badges`                                          |

---

## Landing Page Template

Standard section order for landing pages:

```tsx
import {
  ThemeProvider,
  Button,
  Badge,
  Navbar,
  Hero,
  LogoCloud,
  Features,
  Stats,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@orion/react";

// REQUIRED - Import CSS at app root
import "@orion/core/theme.css";
import "@orion/react/dist/react.css";

function LandingPage() {
  return (
    <ThemeProvider>
      {/* 1. Navigation */}
      <Navbar sticky>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="#features">Features</Navbar.Link>
          <Navbar.Link href="#pricing">Pricing</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost">Sign In</Button>
          <Button>Get Started</Button>
        </Navbar.Actions>
      </Navbar>

      {/* 2. Hero - Main message */}
      <Hero
        badge={<Badge variant="brand">New</Badge>}
        headline="Your Headline Here"
        description="Your value proposition in one sentence."
        primaryAction={<Button size="lg">Primary CTA</Button>}
        secondaryAction={
          <Button variant="ghost" size="lg">
            Secondary
          </Button>
        }
      />

      {/* 3. LogoCloud - Trust (optional) */}
      <LogoCloud logos={[{ name: "Company", logo: "/logo.svg" }]} />

      {/* 4. Features - What you offer */}
      <Features
        id="features"
        eyebrow="Features"
        title="Everything you need"
        items={[
          { icon: <Icon />, title: "Feature", description: "Description" },
        ]}
        columns={3}
      />

      {/* 5. Stats - Social proof numbers (optional) */}
      <Stats stats={[{ value: "10K+", label: "Users" }]} />

      {/* 6. Pricing - Plans */}
      <Pricing
        id="pricing"
        eyebrow="Pricing"
        title="Simple pricing"
        plans={[
          {
            name: "Starter",
            price: "$9",
            period: "/month",
            features: [{ text: "Feature", included: true }],
            action: <Button fullWidth>Get Started</Button>,
          },
        ]}
      />

      {/* 7. Testimonials - Customer proof */}
      <Testimonials
        eyebrow="Testimonials"
        title="What customers say"
        testimonials={[
          {
            quote: "Quote here",
            author: { name: "Name", role: "Title" },
          },
        ]}
      />

      {/* 8. FAQ - Answer objections */}
      <FAQ
        id="faq"
        eyebrow="FAQ"
        title="Common questions"
        items={[{ question: "Question?", answer: "Answer." }]}
      />

      {/* 9. CTA - Final push */}
      <CTA
        headline="Ready to start?"
        actions={<Button size="lg">Get Started</Button>}
      />

      {/* 10. Footer - Navigation & legal */}
      <Footer
        brand={{ name: "Company", description: "Tagline" }}
        linkGroups={[
          {
            title: "Product",
            links: [{ label: "Features", href: "#features" }],
          },
        ]}
        copyright="2024 Company. All rights reserved."
      />
    </ThemeProvider>
  );
}
```

---

## Section Backgrounds

Sections alternate backgrounds automatically. You can also control manually:

```tsx
// Explicit background
<Features background="subtle" />  // Gray background
<Pricing background="base" />     // White background
<CTA background="brand" />        // Brand color background
```

Available backgrounds:

- `base` - Main surface color (white/dark)
- `subtle` - Subtle gray
- `layer` - Layered surface
- `brand` - Brand accent color

---

## Section Spacing

Sections have consistent vertical spacing. Override with:

```tsx
<Hero spacing="lg" />     // Extra spacious
<Features spacing="md" /> // Default
<Stats spacing="sm" />    // Compact
```

---

## Section Examples

### Hero

```tsx
<Hero
  badge={<Badge>New</Badge>}
  headline="Build faster"
  description="Ship products in days, not months."
  primaryAction={<Button size="lg">Start Free</Button>}
  secondaryAction={
    <Button variant="ghost" size="lg">
      Learn More
    </Button>
  }
  media={<img src="/hero.png" alt="Product" />}
  mediaPosition="right"
  align="left"
  size="lg"
/>
```

### Features

```tsx
<Features
  eyebrow="Features"
  title="Everything you need"
  description="Built for modern teams."
  items={[
    {
      icon: <Zap size={24} />,
      title: "Fast",
      description: "Lightning fast performance.",
    },
    // ... more items
  ]}
  columns={3} // 2, 3, or 4
/>
```

### Pricing

```tsx
<Pricing
  eyebrow="Pricing"
  title="Simple pricing"
  plans={[
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "For individuals",
      features: [
        { text: "5 projects", included: true },
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
      description: "For teams",
      features: [
        { text: "Unlimited projects", included: true },
        { text: "API access", included: true },
      ],
      action: <Button fullWidth>Start Trial</Button>,
      popular: true, // Emphasize this plan
    },
  ]}
/>
```

### Testimonials

```tsx
<Testimonials
  eyebrow="Testimonials"
  title="What customers say"
  testimonials={[
    {
      quote: "This transformed our workflow completely.",
      author: {
        name: "Jane Doe",
        role: "CTO",
        company: "TechCorp",
        avatar: <img src="/jane.jpg" alt="" />,
      },
      rating: 5, // Optional, 1-5
    },
  ]}
  variant="cards" // 'cards' | 'minimal' | 'default'
/>
```

### FAQ

```tsx
<FAQ
  eyebrow="FAQ"
  title="Common questions"
  items={[
    {
      question: "How do I get started?",
      answer: "Sign up for a free account and follow our quick start guide.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, cancel anytime with no penalties.",
    },
  ]}
  columns={1} // 1 or 2
/>
```

### Stats

```tsx
<Stats
  eyebrow="By the Numbers"
  title="Trusted by thousands"
  stats={[
    { value: "10K+", label: "Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "$5M+", label: "Processed" },
  ]}
/>
```

### CTA

```tsx
<CTA
  headline="Ready to get started?"
  description="Join thousands of teams shipping faster."
  actions={
    <>
      <Button size="lg">Start Free Trial</Button>
      <Button variant="ghost" size="lg">
        Contact Sales
      </Button>
    </>
  }
/>
```

### Footer

```tsx
import { Twitter, Github } from "lucide-react";

<Footer
  brand={{
    name: "Acme Inc",
    logo: "/logo.svg", // Optional
    description: "Building the future.",
  }}
  linkGroups={[
    {
      title: "Product",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
      ],
    },
  ]}
  socialLinks={[
    {
      label: "Twitter",
      href: "https://twitter.com/acme",
      icon: <Twitter size={20} />,
    },
    {
      label: "GitHub",
      href: "https://github.com/acme",
      icon: <Github size={20} />,
    },
  ]}
  copyright="2024 Acme Inc. All rights reserved."
/>;
```

---

## Composition Rules

### 1. Section Order Matters

Follow the standard landing page structure for best conversion:

1. Navbar (navigation)
2. Hero (main message)
3. LogoCloud (trust)
4. Features (value)
5. Stats (proof)
6. Pricing (offer)
7. Testimonials (social proof)
8. FAQ (objections)
9. CTA (action)
10. Footer (navigation)

### 2. Alternate Backgrounds

Don't place two sections with the same background adjacent:

```tsx
// GOOD - Alternating backgrounds
<Hero />          {/* base */}
<LogoCloud />     {/* subtle */}
<Features />      {/* base */}
<Stats />         {/* subtle */}

// BAD - Same backgrounds adjacent
<Features background="base" />
<Stats background="base" />  {/* Looks like one section */}
```

### 3. Consistent Eyebrows

Use eyebrows consistently across sections:

```tsx
// GOOD - All sections have eyebrows
<Features eyebrow="Features" headline="..." />
<Pricing eyebrow="Pricing" headline="..." />
<FAQ eyebrow="FAQ" headline="..." />

// BAD - Inconsistent
<Features headline="..." />  {/* No eyebrow */}
<Pricing eyebrow="Pricing" headline="..." />  {/* Has eyebrow */}
```

### 4. One CTA Per Section

Each section should have at most one primary CTA:

```tsx
// GOOD
<Hero
  primaryAction={<Button>Start Free</Button>}
  secondaryAction={<Button variant="ghost">Learn More</Button>}
/>

// BAD - Multiple primary CTAs
<Hero
  primaryAction={<Button>Start Free</Button>}
  secondaryAction={<Button>Buy Now</Button>}  {/* Should be ghost */}
/>
```

---

## Anti-Patterns

### Creating Custom Sections

```tsx
// WRONG - Don't create custom sections
function MyHeroSection({ title, subtitle }) {
  return (
    <div className="my-hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

// CORRECT - Use pre-built Hero
<Hero headline={title} description={subtitle} />;
```

### Nesting Sections

```tsx
// WRONG - Don't nest sections
<Hero>
  <Features items={[...]} />  {/* Nested */}
</Hero>

// CORRECT - Sections are siblings
<Hero headline="..." />
<Features items={[...]} />
```

### Missing Required Props

```tsx
// WRONG - Missing required headline
<Hero
  description="Description only"
  primaryAction={<Button>CTA</Button>}
/>

// CORRECT
<Hero
  headline="Required Headline"  {/* headline is required */}
  description="Description"
  primaryAction={<Button>CTA</Button>}
/>
```
