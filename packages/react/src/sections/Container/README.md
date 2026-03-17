# Container

> Responsive content wrapper with configurable max-width and centering.

## Quick Start

```tsx
import { Container } from "@orion/react";

<Container size="lg">
  <h1>Page Content</h1>
  <p>This content is constrained to a maximum width.</p>
</Container>;
```

---

## Features

- **5 Size Variants** — sm, md, lg, xl, full
- **Auto-Centering** — Horizontally centered by default
- **Responsive Padding** — Consistent horizontal padding
- **Flexible Usage** — Works inside or outside Section

---

## Props Reference

```typescript
interface ContainerProps {
  // Size
  size?: "sm" | "md" | "lg" | "xl" | "full"; // default: 'lg'

  // Layout
  centered?: boolean; // Center horizontally - default: true
  padded?: boolean; // Add horizontal padding - default: true

  // Content
  children?: ReactNode;
}
```

---

## Size Variants

| Size   | Max Width | Best For                                      |
| ------ | --------- | --------------------------------------------- |
| `sm`   | 640px     | Text-focused content, blog posts, legal pages |
| `md`   | 768px     | Medium content, forms, documentation          |
| `lg`   | 1024px    | Standard layouts, most pages (default)        |
| `xl`   | 1280px    | Wide layouts, dashboards, data tables         |
| `full` | 100%      | Full-width content, hero sections             |

### Small (`size="sm"`)

Narrow container for text-focused content.

```tsx
<Container size="sm">
  <article>
    <h1>Terms of Service</h1>
    <p>Long-form legal text that benefits from narrow line length...</p>
  </article>
</Container>
```

### Medium (`size="md"`)

Balanced width for forms and documentation.

```tsx
<Container size="md">
  <form>
    <h2>Contact Us</h2>
    {/* Form fields */}
  </form>
</Container>
```

### Large (`size="lg"`) — Default

Standard width for most page content.

```tsx
<Container size="lg">
  <h1>Dashboard</h1>
  {/* Standard content */}
</Container>
```

### Extra Large (`size="xl"`)

Wide layout for complex interfaces.

```tsx
<Container size="xl">
  <DataTable columns={manyColumns} data={data} />
</Container>
```

### Full Width (`size="full"`)

No width constraint, uses full available width.

```tsx
<Container size="full">
  <img src="/hero-banner.jpg" alt="Banner" style={{ width: "100%" }} />
</Container>
```

---

## Layout Options

### Centered (Default)

Content is horizontally centered with auto margins.

```tsx
<Container centered>
  <Content />
</Container>
```

### Left-Aligned

Content starts from the left edge.

```tsx
<Container centered={false}>
  <Content />
</Container>
```

### With Padding (Default)

Horizontal padding prevents content from touching edges.

```tsx
<Container padded>
  <Content />
</Container>
```

### Without Padding

Edge-to-edge content within the container.

```tsx
<Container padded={false}>
  <img src="/full-width.jpg" alt="" style={{ width: "100%" }} />
</Container>
```

---

## Usage Patterns

### Inside Section

Most common pattern: Container inside Section for proper spacing.

```tsx
<Section spacing="lg" background="subtle">
  <Container size="lg">
    <h2>Features</h2>
    <p>Content here...</p>
  </Container>
</Section>
```

### Standalone

Use Container directly for simple page layouts.

```tsx
<Container size="md">
  <main>
    <h1>Page Title</h1>
    <p>Page content...</p>
  </main>
</Container>
```

### Nested Containers

Different widths for different content sections.

```tsx
<Section>
  <Container size="xl">
    <h2>Wide Header</h2>
  </Container>
  <Container size="md">
    <p>Narrower content for better readability...</p>
  </Container>
</Section>
```

---

## Complete Examples

### Blog Post Layout

```tsx
<main>
  {/* Hero - Full width */}
  <Section background="subtle">
    <Container size="lg">
      <h1>Blog Post Title</h1>
      <p>Published on Jan 15, 2024</p>
    </Container>
  </Section>

  {/* Content - Narrow for readability */}
  <Section>
    <Container size="sm">
      <article>
        <p>Article content with optimal line length for reading...</p>
        <p>More paragraphs...</p>
      </article>
    </Container>
  </Section>
</main>
```

### Dashboard Layout

```tsx
<main>
  <Container size="xl">
    <PageHeader title="Dashboard" />

    {/* Stats row */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "var(--spacing-4)",
      }}
    >
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>

    {/* Full-width table */}
    <DataTable columns={columns} data={data} />
  </Container>
</main>
```

### Marketing Page

```tsx
<main>
  {/* Full-width hero */}
  <Hero headline="Welcome" layout="fullscreen" />

  {/* Standard features section */}
  <Section background="subtle">
    <Container size="lg">
      <Features items={features} />
    </Container>
  </Section>

  {/* Narrow CTA */}
  <Section>
    <Container size="md">
      <CTA headline="Ready to start?" />
    </Container>
  </Section>
</main>
```

---

## Accessibility

- Container is a presentational wrapper (`<div>`)
- Does not affect document structure or semantics
- Content inside should use proper heading hierarchy
- Works with any content type

---

## Anti-Patterns

### Using Wrong Size for Content

```tsx
// WRONG - Narrow container for wide table
<Container size="sm">
  <DataTable columns={tenColumns} data={data} />  {/* Horizontal scroll */}
</Container>

// CORRECT - Wide container for tables
<Container size="xl">
  <DataTable columns={tenColumns} data={data} />
</Container>
```

### Forgetting Container in Sections

```tsx
// WRONG - Content touches section edges
<Section>
  <h2>Title</h2>
  <p>Content...</p>
</Section>

// CORRECT - Container provides proper width and padding
<Section>
  <Container>
    <h2>Title</h2>
    <p>Content...</p>
  </Container>
</Section>
```

### Nesting with Same Size

```tsx
// WRONG - Redundant nesting
<Container size="lg">
  <Container size="lg">  {/* Unnecessary */}
    <Content />
  </Container>
</Container>

// CORRECT - Single container
<Container size="lg">
  <Content />
</Container>
```

---

## When to Use Container

| Scenario             | Recommended Size |
| -------------------- | ---------------- |
| Blog/article content | `sm` (640px)     |
| Forms, documentation | `md` (768px)     |
| Standard pages       | `lg` (1024px)    |
| Dashboards, tables   | `xl` (1280px)    |
| Edge-to-edge content | `full`           |

---

## Related Components

- **[Section](../Section/README.md)** — Vertical section wrapper (often wraps Container)
- **[Hero](../Hero/README.md)** — Hero section (has built-in Container)
- **[Features](../Features/README.md)** — Features section (has built-in Container)
