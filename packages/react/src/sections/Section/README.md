# Section

> Vertical page section wrapper with consistent spacing, backgrounds, and borders.

## Quick Start

```tsx
import { Section, Container } from "@orion/react";

<Section spacing="lg" background="subtle">
  <Container>
    <h2>Section Title</h2>
    <p>Section content goes here.</p>
  </Container>
</Section>;
```

---

## Features

- **5 Spacing Options** — none, sm, md, lg, xl
- **5 Background Styles** — base, subtle, sunken, brand, none
- **Border Options** — Top and/or bottom borders
- **Semantic HTML** — Configurable element type
- **Building Block** — Foundation for all section components

---

## Props Reference

```typescript
interface SectionProps {
  // Element
  as?: "section" | "div" | "article" | "aside" | "header" | "footer"; // default: 'section'

  // Spacing
  spacing?: "none" | "sm" | "md" | "lg" | "xl"; // default: 'lg'

  // Background
  background?: "base" | "subtle" | "sunken" | "brand" | "none"; // default: 'none'

  // Borders
  borderTop?: boolean; // default: false
  borderBottom?: boolean; // default: false

  // Content
  children?: ReactNode;
}
```

---

## Spacing Options

Vertical padding for top and bottom of section.

| Spacing | Value | Best For                             |
| ------- | ----- | ------------------------------------ |
| `none`  | 0     | Edge-to-edge content, custom spacing |
| `sm`    | 32px  | Compact sections, dividers           |
| `md`    | 64px  | Standard sections                    |
| `lg`    | 96px  | Hero and feature sections (default)  |
| `xl`    | 128px | Extra spacious sections              |

### Small Spacing

```tsx
<Section spacing="sm">
  <Container>
    <LogoCloud logos={logos} />
  </Container>
</Section>
```

### Medium Spacing

```tsx
<Section spacing="md">
  <Container>
    <Stats stats={stats} />
  </Container>
</Section>
```

### Large Spacing (Default)

```tsx
<Section spacing="lg">
  <Container>
    <Features items={features} />
  </Container>
</Section>
```

### Extra Large Spacing

```tsx
<Section spacing="xl">
  <Container>
    <Hero headline="Big Impact" />
  </Container>
</Section>
```

---

## Background Options

| Background | Description                     | Use Case             |
| ---------- | ------------------------------- | -------------------- |
| `base`     | Main surface color (white/dark) | Standard content     |
| `subtle`   | Subtle gray                     | Alternating sections |
| `sunken`   | Recessed surface                | Footers, sidebars    |
| `brand`    | Brand accent color              | CTAs, highlights     |
| `none`     | Transparent                     | Custom backgrounds   |

### Base Background

```tsx
<Section background="base">
  <Container>
    <Content />
  </Container>
</Section>
```

### Subtle Background

```tsx
<Section background="subtle">
  <Container>
    <Features items={features} />
  </Container>
</Section>
```

### Brand Background

```tsx
<Section background="brand">
  <Container>
    <CTA headline="Ready to start?" />
  </Container>
</Section>
```

### Sunken Background

```tsx
<Section background="sunken" as="footer">
  <Container>
    <Footer {...footerProps} />
  </Container>
</Section>
```

---

## Alternating Backgrounds

Best practice: Alternate between `base` and `subtle` for visual rhythm.

```tsx
<Section background="base">
  <Hero headline="Welcome" />
</Section>

<Section background="subtle">
  <Features items={features} />
</Section>

<Section background="base">
  <Testimonials testimonials={testimonials} />
</Section>

<Section background="subtle">
  <Pricing plans={plans} />
</Section>

<Section background="brand">
  <CTA headline="Get Started" />
</Section>
```

---

## Borders

Add visual separation between sections.

### Top Border

```tsx
<Section borderTop>
  <Container>
    <Content />
  </Container>
</Section>
```

### Bottom Border

```tsx
<Section borderBottom>
  <Container>
    <Content />
  </Container>
</Section>
```

### Both Borders

```tsx
<Section borderTop borderBottom>
  <Container>
    <Content />
  </Container>
</Section>
```

---

## Semantic HTML

Use appropriate element for content type.

### Default Section

```tsx
<Section as="section">
  <Container>
    <Features items={features} />
  </Container>
</Section>
```

### Article

```tsx
<Section as="article">
  <Container size="sm">
    <BlogPost content={content} />
  </Container>
</Section>
```

### Aside

```tsx
<Section as="aside" background="subtle">
  <Container>
    <RelatedContent />
  </Container>
</Section>
```

### Footer

```tsx
<Section as="footer" background="sunken">
  <Container>
    <Footer {...footerProps} />
  </Container>
</Section>
```

---

## Complete Examples

### Landing Page Structure

```tsx
import {
  Section,
  Container,
  Hero,
  Features,
  Pricing,
  CTA,
  Footer,
} from "@orion/react";

function LandingPage() {
  return (
    <>
      {/* Hero - base background */}
      <Section background="base" spacing="lg">
        <Container>
          <Hero headline="Build Faster" />
        </Container>
      </Section>

      {/* Features - subtle background */}
      <Section background="subtle" spacing="lg">
        <Container>
          <Features title="Everything You Need" items={features} />
        </Container>
      </Section>

      {/* Pricing - base background */}
      <Section background="base" spacing="lg">
        <Container>
          <Pricing title="Simple Pricing" plans={plans} />
        </Container>
      </Section>

      {/* CTA - brand background */}
      <Section background="brand" spacing="lg">
        <Container size="md">
          <CTA headline="Ready to Start?" />
        </Container>
      </Section>

      {/* Footer - sunken background */}
      <Section as="footer" background="sunken" spacing="lg" borderTop>
        <Container>
          <Footer {...footerProps} />
        </Container>
      </Section>
    </>
  );
}
```

### Blog Page Structure

```tsx
function BlogPost({ post }) {
  return (
    <>
      {/* Header */}
      <Section background="subtle" spacing="md">
        <Container size="lg">
          <h1>{post.title}</h1>
          <p>
            {post.date} • {post.author}
          </p>
        </Container>
      </Section>

      {/* Content - narrow for readability */}
      <Section background="base" spacing="lg">
        <Container size="sm">
          <article>{post.content}</article>
        </Container>
      </Section>

      {/* Related posts */}
      <Section background="subtle" spacing="md" borderTop>
        <Container size="lg">
          <h2>Related Posts</h2>
          {/* Related posts grid */}
        </Container>
      </Section>
    </>
  );
}
```

### Dashboard Page

```tsx
function DashboardPage() {
  return (
    <>
      {/* Page header - compact */}
      <Section background="base" spacing="sm" borderBottom>
        <Container size="xl">
          <PageHeader title="Dashboard" />
        </Container>
      </Section>

      {/* Main content */}
      <Section background="subtle" spacing="md">
        <Container size="xl">
          <div className="grid">
            <StatCards stats={stats} />
            <Charts data={chartData} />
            <RecentActivity items={activities} />
          </div>
        </Container>
      </Section>
    </>
  );
}
```

---

## Accessibility

- Uses semantic `<section>` element by default
- Change element type with `as` prop for proper document outline
- Backgrounds maintain WCAG contrast requirements
- Works with skip links and landmark navigation

```tsx
// Good: Proper semantic structure
<Section as="article" id="main-content">
  <Container>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </Container>
</Section>

// Also good: Add aria-labelledby for sections
<Section aria-labelledby="features-heading">
  <Container>
    <h2 id="features-heading">Features</h2>
    {/* Feature content */}
  </Container>
</Section>
```

---

## Anti-Patterns

### Missing Container

```tsx
// WRONG - Content touches edges
<Section>
  <h2>Title</h2>
  <p>Content...</p>
</Section>

// CORRECT - Container provides width and padding
<Section>
  <Container>
    <h2>Title</h2>
    <p>Content...</p>
  </Container>
</Section>
```

### Same Backgrounds Adjacent

```tsx
// WRONG - No visual separation
<Section background="base">
  <Features />
</Section>
<Section background="base">
  <Pricing />
</Section>

// CORRECT - Alternate backgrounds
<Section background="base">
  <Features />
</Section>
<Section background="subtle">
  <Pricing />
</Section>
```

### Inconsistent Spacing

```tsx
// WRONG - Random spacing creates visual noise
<Section spacing="lg">...</Section>
<Section spacing="sm">...</Section>
<Section spacing="xl">...</Section>
<Section spacing="md">...</Section>

// CORRECT - Consistent spacing throughout
<Section spacing="lg">...</Section>
<Section spacing="lg">...</Section>
<Section spacing="lg">...</Section>
```

### Wrong Semantic Element

```tsx
// WRONG - Footer content in generic section
<Section>
  <Footer />
</Section>

// CORRECT - Use appropriate semantic element
<Section as="footer">
  <Footer />
</Section>
```

---

## When to Use Section

| Scenario              | Recommendation                     |
| --------------------- | ---------------------------------- |
| Landing page sections | Yes - with alternating backgrounds |
| Page content wrapper  | Yes - with Container inside        |
| Footer wrapper        | Yes - with `as="footer"`           |
| Sidebar content       | Consider `as="aside"`              |
| Article wrapper       | Use `as="article"`                 |

## When NOT to Use Section

| Scenario                | Use Instead          |
| ----------------------- | -------------------- |
| Inline content grouping | `<div>`              |
| Card container          | `Card` component     |
| Modal content           | Modal's content area |
| List items              | List/grid layout     |

---

## Related Components

- **[Container](../Container/README.md)** — Content width wrapper (use inside Section)
- **[Hero](../Hero/README.md)** — Hero section (has built-in Section)
- **[Features](../Features/README.md)** — Features section (has built-in Section)
- **[CTA](../CTA/README.md)** — CTA section (has built-in Section)
