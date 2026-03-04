# Card Component

> A versatile container using the compound component pattern.

## Compound Component Pattern

Card uses dot notation for its subcomponents:

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

**All subcomponents are optional.** Use only what you need.

---

## When to Use

| Scenario              | Example                         |
| --------------------- | ------------------------------- |
| Group related content | User profile card, product card |
| Form containers       | Login form, settings panel      |
| List items            | Blog post preview, notification |
| Feature showcase      | Feature cards in landing page   |
| Data display          | Stats card, metric card         |

## When NOT to Use

| Scenario             | Use Instead                 |
| -------------------- | --------------------------- |
| Full-page layout     | `<Section>` + `<Container>` |
| Modal content        | `<Modal>`                   |
| Navigation           | `<Navbar>`                  |
| Alerts/notifications | `<Alert>` or `<Toast>`      |

---

## Variants Guide

| Variant    | Visual Style                    | Use When                                     |
| ---------- | ------------------------------- | -------------------------------------------- |
| `base`     | Solid background, subtle border | Default - most cards                         |
| `glass`    | Frosted glass effect            | Display mode only - marketing sections       |
| `elevated` | Shadow elevation                | Floating content, cards that need prominence |
| `image`    | Background image with overlay   | Hero cards, featured content                 |
| `inverse`  | Light content on dark bg        | Dark backgrounds and overlays                |

### Mode Restrictions

| Variant    | Display Mode | Product Mode  | App Mode |
| ---------- | ------------ | ------------- | -------- |
| `base`     | Yes          | Yes           | Yes      |
| `glass`    | Yes          | No            | No       |
| `elevated` | Yes          | Use sparingly | Yes      |
| `image`    | Yes          | Yes           | Yes      |
| `inverse`  | Yes          | Yes           | Yes      |

**Rule:** `glass` variant only works in Display mode (marketing pages).

---

## Props Reference

### Card Props

```typescript
interface CardProps {
  variant?: "base" | "glass" | "elevated" | "outlined" | "image"; // default: 'base'
  interactive?: boolean; // Adds hover effect - default: false
  imageUrl?: string; // Background image (only for 'image' variant)
  imagePosition?: "top" | "center" | "bottom"; // Content position - default: 'bottom'
  aspectRatio?: string; // e.g., '16/9', '4/3', '1/1' - default: '16/9'
  className?: string;
  children?: ReactNode;
}
```

### Subcomponent Props

```typescript
// All subcomponents accept:
interface SubcomponentProps {
  className?: string;
  children?: ReactNode;
}
```

---

## Subcomponents

| Subcomponent            | Purpose                                   |
| ----------------------- | ----------------------------------------- |
| `Card.Header`           | Title area - typically contains heading   |
| `Card.Body`             | Main content area                         |
| `Card.Footer`           | Actions area - typically contains buttons |
| `Card.ImageContent`     | Content wrapper for image variant         |
| `Card.ImageTitle`       | Title for image variant                   |
| `Card.ImageDescription` | Description for image variant             |
| `Card.ImageMeta`        | Meta info for image variant               |

---

## Examples

### Basic Card

```tsx
import { Card } from "@orion/react";

<Card>
  <Card.Header>Card Title</Card.Header>
  <Card.Body>
    <p>This is the card content. It can contain any elements.</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button>Save</Button>
  </Card.Footer>
</Card>;
```

### Body Only

```tsx
import { Card } from "@orion/react";

<Card>
  <Card.Body>
    <p>Simple card with just body content.</p>
  </Card.Body>
</Card>;
```

### Glass Variant (Display Mode Only)

```tsx
import { Card } from "@orion/react";

// Only use in marketing pages with data-mode="display"
<Card variant="glass">
  <Card.Body>
    <h3>Premium Feature</h3>
    <p>Frosted glass effect for atmospheric feel.</p>
  </Card.Body>
</Card>;
```

### Elevated Variant

```tsx
import { Card } from "@orion/react";

<Card variant="elevated">
  <Card.Header>Featured</Card.Header>
  <Card.Body>
    <p>This card has shadow elevation.</p>
  </Card.Body>
</Card>;
```

### Base Variant (with subtle border)

```tsx
import { Card } from "@orion/react";

<Card variant="base">
  <Card.Body>
    <p>Default style with subtle border.</p>
  </Card.Body>
</Card>;
```

### Interactive Card

```tsx
import { Card } from "@orion/react";

// Adds hover effect
<Card interactive onClick={handleClick}>
  <Card.Body>
    <h3>Click me</h3>
    <p>This card responds to hover and click.</p>
  </Card.Body>
</Card>;
```

### Image Card

```tsx
import { Card } from "@orion/react";

<Card
  variant="image"
  imageUrl="/path/to/image.jpg"
  imagePosition="bottom"
  aspectRatio="16/9"
>
  <Card.ImageContent>
    <Card.ImageMeta>Category</Card.ImageMeta>
    <Card.ImageTitle>Article Title</Card.ImageTitle>
    <Card.ImageDescription>
      Brief description of the article content.
    </Card.ImageDescription>
  </Card.ImageContent>
</Card>;
```

### Image Card - Different Positions

```tsx
import { Card } from '@orion/react';

// Content at top
<Card variant="image" imageUrl="/hero.jpg" imagePosition="top">
  <Card.ImageContent>
    <Card.ImageTitle>Top Position</Card.ImageTitle>
  </Card.ImageContent>
</Card>

// Content at center
<Card variant="image" imageUrl="/hero.jpg" imagePosition="center">
  <Card.ImageContent>
    <Card.ImageTitle>Center Position</Card.ImageTitle>
  </Card.ImageContent>
</Card>

// Content at bottom (default)
<Card variant="image" imageUrl="/hero.jpg" imagePosition="bottom">
  <Card.ImageContent>
    <Card.ImageTitle>Bottom Position</Card.ImageTitle>
  </Card.ImageContent>
</Card>
```

---

## Common Patterns

### User Profile Card

```tsx
import { Card, Avatar, Button } from "@orion/react";

<Card>
  <Card.Body>
    <div
      style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}
    >
      <Avatar src="/user.jpg" name="Jane Doe" size="lg" />
      <div>
        <h3>Jane Doe</h3>
        <p style={{ color: "var(--text-secondary)" }}>Product Designer</p>
      </div>
    </div>
  </Card.Body>
  <Card.Footer>
    <Button variant="secondary" fullWidth>
      View Profile
    </Button>
  </Card.Footer>
</Card>;
```

### Product Card

```tsx
import { Card, Badge, Button } from "@orion/react";

<Card interactive>
  <Card.Body>
    <Badge variant="brand">New</Badge>
    <h3>Product Name</h3>
    <p style={{ color: "var(--text-secondary)" }}>
      Product description goes here.
    </p>
    <p style={{ fontSize: "var(--text-lg)", fontWeight: 600 }}>$99.00</p>
  </Card.Body>
  <Card.Footer>
    <Button fullWidth>Add to Cart</Button>
  </Card.Footer>
</Card>;
```

### Feature Card (for Features section)

```tsx
import { Card } from "@orion/react";
import { Zap } from "lucide-react";

<Card>
  <Card.Body>
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "var(--radius-sm)",
        background: "var(--surface-layer)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "var(--spacing-4)",
      }}
    >
      <Zap size={24} color="var(--text-brand)" />
    </div>
    <h3>Lightning Fast</h3>
    <p style={{ color: "var(--text-secondary)" }}>
      Optimized for performance at every level.
    </p>
  </Card.Body>
</Card>;
```

### Pricing Card

```tsx
import { Card, Badge, Button } from "@orion/react";
import { Check } from "lucide-react";

<Card variant="elevated">
  <Card.Header>
    <Badge variant="brand">Popular</Badge>
    <h3>Pro Plan</h3>
    <p>
      <span style={{ fontSize: "var(--text-3xl)", fontWeight: 700 }}>$29</span>
      <span style={{ color: "var(--text-secondary)" }}>/month</span>
    </p>
  </Card.Header>
  <Card.Body>
    <ul style={{ listStyle: "none", padding: 0 }}>
      {["Unlimited projects", "Priority support", "API access"].map(
        (feature) => (
          <li
            key={feature}
            style={{
              display: "flex",
              gap: "var(--spacing-2)",
              marginBottom: "var(--spacing-2)",
            }}
          >
            <Check size={20} color="var(--text-brand)" />
            <span>{feature}</span>
          </li>
        ),
      )}
    </ul>
  </Card.Body>
  <Card.Footer>
    <Button fullWidth>Get Started</Button>
  </Card.Footer>
</Card>;
```

### Settings Card

```tsx
import { Card, Field, Switch, Button } from "@orion/react";

<Card>
  <Card.Header>
    <h3>Notification Settings</h3>
  </Card.Header>
  <Card.Body>
    <Switch label="Email notifications" defaultChecked />
    <Switch label="Push notifications" />
    <Switch label="SMS alerts" />
  </Card.Body>
  <Card.Footer>
    <Button variant="secondary">Cancel</Button>
    <Button>Save Changes</Button>
  </Card.Footer>
</Card>;
```

---

## Card Grid Layouts

### 2-Column Grid

```tsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "var(--spacing-6)",
  }}
>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

### 3-Column Grid (Responsive)

```tsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "var(--spacing-6)",
  }}
>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

---

## Anti-Patterns

### Glass Outside Display Mode

```tsx
// WRONG - Glass doesn't work in Product mode
<html data-mode="product">
  <Card variant="glass">...</Card>  // Will look broken
</html>

// CORRECT - Use base or elevated in Product mode
<Card variant="elevated">...</Card>
```

### Missing Body for Content

```tsx
// WRONG - Content directly in Card
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>

// CORRECT - Use subcomponents
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

### Interactive Without Click Handler

```tsx
// WRONG - Interactive but not clickable
<Card interactive>
  <Card.Body>Content</Card.Body>
</Card>

// CORRECT - Has click handler
<Card interactive onClick={handleClick}>
  <Card.Body>Content</Card.Body>
</Card>
```
