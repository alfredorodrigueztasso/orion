# Button Component

> The primary action trigger in Orion Design System.

## When to Use

| Scenario               | Use Button                                            |
| ---------------------- | ----------------------------------------------------- |
| Submit forms           | `<Button type="submit">Save</Button>`                 |
| Trigger actions        | `<Button onClick={handleClick}>Download</Button>`     |
| Navigation with action | `<Button onClick={navigate}>Go to Dashboard</Button>` |
| Destructive actions    | `<Button variant="danger">Delete</Button>`            |

## When NOT to Use

| Scenario                  | Use Instead                    |
| ------------------------- | ------------------------------ |
| Navigate to another page  | `<Link href="/page">` or `<a>` |
| Toggle boolean state      | `<Switch>`                     |
| Select from options       | `<Select>` or `<Radio>`        |
| Text that looks like link | `<Link variant="subtle">`      |

---

## Background Context Rule (Critical)

> **Default rule**: Always use regular variants (`primary`, `secondary`, `ghost`). Only switch to inverse variants when the **surface itself is a brand color, gradient, or photo** — not because of dark mode.

> ⚠️ **Dark mode ≠ inverse.** Regular variants (`primary`, `secondary`, `ghost`) automatically adapt to dark mode via CSS tokens. You never need to switch to inverse just because the theme is dark.

| Background                            | Use                                           | Why                                           |
| ------------------------------------- | --------------------------------------------- | --------------------------------------------- |
| White surface (light mode default)    | `primary`, `secondary`, `ghost`, `danger`     | Regular variants designed for this            |
| Dark surface (`data-theme="dark"`)    | `primary`, `secondary`, `ghost`, `danger`     | Same variants — they adapt automatically      |
| Brand color (`--interactive-primary`) | `inverse`, `secondaryInverse`, `ghostInverse` | Colored surface needs contrast-specific style |
| Gradient background                   | `inverse`, `secondaryInverse`, `ghostInverse` | Same reason — colored surface                 |
| Photo / dark overlay                  | `inverse`, `secondaryInverse`, `ghostInverse` | Dark-colored surface, not dark mode           |

```tsx
// ✅ CORRECT — white/light background
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Skip</Button>

// ✅ CORRECT — dark background (dark mode)
<Button variant="primary">Save</Button>        // Still blue
<Button variant="secondary">Cancel</Button>    // Adapts automatically

// ✅ CORRECT — colored/photo background
<section style={{ background: 'var(--interactive-primary)' }}>
  <Button variant="inverse">Get Started</Button>
  <Button variant="secondaryInverse">Learn More</Button>
  <Button variant="ghostInverse">Skip</Button>
</section>

// ❌ WRONG — inverse on white background
<Button variant="inverse">Save</Button>         // White bg looks broken
<Button variant="secondaryInverse">Cancel</Button> // Invisible on white
```

---

## Variants Guide

| Variant            | Surface type              | Semantic Meaning          | Use When                                          |
| ------------------ | ------------------------- | ------------------------- | ------------------------------------------------- |
| `primary`          | Any theme (light or dark) | Main action               | Primary CTA - Submit, Save, Continue, Get Started |
| `secondary`        | Any theme (light or dark) | Supporting action         | Secondary CTA - Cancel, Back, Learn More          |
| `ghost`            | Any theme (light or dark) | Subtle action             | Tertiary - Close, Dismiss, Skip                   |
| `danger`           | Any surface               | Destructive action        | Irreversible - Delete, Remove, Unsubscribe        |
| `inverse`          | Colored surface only      | Primary CTA on colored bg | "Get Started" on brand banner or hero             |
| `secondaryInverse` | Colored surface only      | Supporting on colored bg  | "Learn More" next to an inverse primary           |
| `ghostInverse`     | Colored surface only      | Subtle on colored bg      | "Skip" or "Maybe Later" on colored banner         |

### Visual Hierarchy

```
Regular:  Primary  > Secondary > Ghost     (light mode AND dark mode)
Inverse:  Inverse  > SecondaryInverse > GhostInverse  (colored surfaces only)
```

**Rules:**

- Only ONE primary (or inverse) button per logical section
- **Dark mode uses the same regular variants** — `secondary` becomes white-overlay automatically, `ghost` becomes white text automatically
- Inverse variants are **theme-invariant** — they look identical in light and dark mode because they're designed for the colored surface, not the theme
- `danger` works on any surface and has no inverse version

---

## Size Variants

Sizes adapt to the current mode (`display`, `product`, `app`):

| Size | Display Mode | Product Mode | App Mode    | Use When                          |
| ---- | ------------ | ------------ | ----------- | --------------------------------- |
| `sm` | 40px height  | 28px height  | 40px height | Dense UIs, tables, inline actions |
| `md` | 56px height  | 32px height  | 44px height | Default - most buttons            |
| `lg` | 64px height  | 36px height  | 48px height | Hero CTAs, prominent actions      |

---

## Props Reference

```typescript
interface ButtonProps {
  variant?:
    | "primary" // Main CTA — white/light/dark backgrounds (default)
    | "secondary" // Supporting action — white/light/dark backgrounds
    | "ghost" // Subtle action — white/light/dark backgrounds
    | "danger" // Destructive action — any background
    | "inverse" // Primary CTA — colored/photo backgrounds only
    | "secondaryInverse" // Supporting action — colored/photo backgrounds only
    | "ghostInverse"; // Subtle action — colored/photo backgrounds only
  // default: 'primary'
  size?: "sm" | "md" | "lg"; // default: 'md'
  isLoading?: boolean; // default: false
  fullWidth?: boolean; // default: false
  icon?: ReactNode; // Left icon
  iconRight?: ReactNode; // Right icon
  iconOnly?: boolean; // default: false
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // default: 'button'
  children?: ReactNode;
}
```

---

## Examples

### Basic Usage

```tsx
import { Button } from '@orion/react';

// Primary (default)
<Button>Save Changes</Button>

// Secondary
<Button variant="secondary">Cancel</Button>

// Ghost
<Button variant="ghost">Skip</Button>

// Danger
<Button variant="danger">Delete Account</Button>

// Inverse (for colored backgrounds)
<Button variant="inverse">Get Started</Button>
```

### Inverse Variants (for Colored / Photo Backgrounds)

Use the full set of inverse variants to maintain visual hierarchy on colored backgrounds:

```tsx
import { Button } from '@orion/react';

// On brand-colored background — use all three inverse variants
<section style={{ background: 'var(--interactive-primary)', padding: '4rem' }}>
  <h1>Welcome to Orion</h1>
  <Button variant="inverse">Get Started</Button>           // Primary CTA
  <Button variant="secondaryInverse">Learn More</Button>   // Supporting
  <Button variant="ghostInverse">Skip</Button>             // Subtle / tertiary
</section>

// On photo/dark overlay background
<Hero backgroundImage="/hero.jpg">
  <Button variant="inverse" size="lg">Explore Features</Button>
  <Button variant="secondaryInverse" size="lg">See Pricing</Button>
</Hero>

// In a Banner component
<Banner variant="brand">
  <Button variant="inverse">Sign Up Free</Button>
  <Button variant="ghostInverse">Learn More</Button>
</Banner>
```

**When to use inverse variants**:

- ✅ Backgrounds using `var(--interactive-primary)` or any brand color
- ✅ Gradient backgrounds (`var(--color-brand-400)` to `var(--color-brand-600)`)
- ✅ Photo backgrounds with dark overlays
- ✅ Any context where regular variants lack contrast

**When NOT to use inverse variants**:

- ❌ White / light backgrounds → use `primary`, `secondary`, `ghost`
- ❌ In forms, tables, dashboards → always use regular variants
- ❌ Dark mode alone is not a reason to use inverse — dark mode adapts `secondary` and `ghost` automatically

### With Icons

```tsx
import { Button } from '@orion/react';
import { Download, ChevronRight, Settings, Plus } from 'lucide-react';

// Icon on left
<Button icon={<Download size={20} />}>
  Download Report
</Button>

// Icon on right
<Button iconRight={<ChevronRight size={20} />}>
  Continue
</Button>

// Both icons
<Button icon={<Plus size={20} />} iconRight={<ChevronRight size={20} />}>
  Add Item
</Button>

// Icon only (MUST have aria-label)
<Button
  iconOnly
  icon={<Settings size={20} />}
  aria-label="Settings"
/>
```

### Loading State

```tsx
import { Button } from "@orion/react";

<Button isLoading>Saving...</Button>;

// With loading state management
function SaveButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await saveData();
    setIsLoading(false);
  };

  return (
    <Button onClick={handleSave} isLoading={isLoading}>
      {isLoading ? "Saving..." : "Save"}
    </Button>
  );
}
```

### Full Width

```tsx
import { Button } from '@orion/react';

// Card footer with full-width button
<Card>
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Button fullWidth>Continue</Button>
  </Card.Footer>
</Card>

// Form submission
<form>
  <Field label="Email" type="email" />
  <Button type="submit" fullWidth>
    Sign Up
  </Button>
</form>
```

### Button Groups

```tsx
import { Button } from '@orion/react';

// Primary + Secondary pair
<div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Save Changes</Button>
</div>

// Multiple actions
<div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
  <Button variant="ghost">Skip</Button>
  <Button variant="secondary">Save Draft</Button>
  <Button variant="primary">Publish</Button>
</div>
```

### Size Examples

```tsx
import { Button } from '@orion/react';

// Small - for dense UIs
<Button size="sm">Edit</Button>

// Medium - default
<Button size="md">Submit</Button>

// Large - for hero sections
<Button size="lg">Get Started Free</Button>
```

---

## Accessibility Requirements

### Icon-Only Buttons MUST Have aria-label

```tsx
// CORRECT
<Button iconOnly icon={<X size={20} />} aria-label="Close dialog" />

// WRONG - Screen readers can't announce purpose
<Button iconOnly icon={<X size={20} />} />
```

### Disabled State

```tsx
// Buttons automatically handle disabled styling
<Button disabled>Cannot Submit</Button>

// Loading also disables
<Button isLoading>Processing...</Button>
```

### Focus States

All buttons have visible `:focus-visible` states. Do not override.

---

## Common Patterns

### Modal Actions

```tsx
<Modal.Footer>
  <Button variant="ghost" onClick={onClose}>
    Cancel
  </Button>
  <Button variant="primary" onClick={onConfirm}>
    Confirm
  </Button>
</Modal.Footer>
```

### Destructive Confirmation

```tsx
<Modal.Footer>
  <Button variant="secondary" onClick={onClose}>
    Keep
  </Button>
  <Button variant="danger" onClick={onDelete}>
    Delete Forever
  </Button>
</Modal.Footer>
```

### Form Submission

```tsx
<form onSubmit={handleSubmit}>
  <Field label="Email" name="email" required />
  <Button type="submit" fullWidth isLoading={isSubmitting}>
    {isSubmitting ? "Signing up..." : "Sign Up"}
  </Button>
</form>
```

### Hero CTA Pair

```tsx
<Hero
  headline="Welcome"
  primaryAction={<Button size="lg">Get Started</Button>}
  secondaryAction={
    <Button variant="ghost" size="lg">
      Learn More
    </Button>
  }
/>
```

---

## Anti-Patterns

### Multiple Primary Buttons

```tsx
// WRONG - Confusing hierarchy
<div>
  <Button variant="primary">Save</Button>
  <Button variant="primary">Publish</Button>
  <Button variant="primary">Share</Button>
</div>

// CORRECT - Clear hierarchy
<div>
  <Button variant="ghost">Share</Button>
  <Button variant="secondary">Save Draft</Button>
  <Button variant="primary">Publish</Button>
</div>
```

### Ghost for Primary Actions

```tsx
// WRONG - Primary actions need visual prominence
<Button variant="ghost">Submit Form</Button>

// CORRECT
<Button variant="primary">Submit Form</Button>
```

### Danger Without Confirmation

```tsx
// DANGEROUS - No confirmation for destructive action
<Button variant="danger" onClick={deleteAccount}>
  Delete Account
</Button>

// BETTER - With confirmation
<Button variant="danger" onClick={openDeleteConfirmation}>
  Delete Account
</Button>
```

### Inverse Variants on Regular Backgrounds

```tsx
// WRONG - inverse on white background looks broken (white on white)
<div style={{ background: 'white' }}>
  <Button variant="inverse">Save</Button>
</div>

// WRONG - using inline styles to fake inverse instead of the right variant
<Button variant="ghost" style={{ color: 'white', border: '2px solid white' }}>
  Learn More
</Button>

// CORRECT - use regular variants on white/light backgrounds
<div style={{ background: 'white' }}>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Learn More</Button>
</div>

// CORRECT - use inverse variants only on colored/photo backgrounds
<section style={{ background: 'var(--interactive-primary)' }}>
  <Button variant="inverse">Save</Button>
  <Button variant="secondaryInverse">Learn More</Button>
</section>
```

### Wrong Inverse for Supporting Actions

```tsx
// WRONG - using primary inverse for a supporting action on colored bg
<section style={{ background: 'var(--interactive-primary)' }}>
  <Button variant="inverse">Get Started</Button>
  <Button variant="inverse">Learn More</Button>  // ❌ Two primary-level buttons
</section>

// CORRECT - maintain hierarchy with the full inverse set
<section style={{ background: 'var(--interactive-primary)' }}>
  <Button variant="inverse">Get Started</Button>          // Primary
  <Button variant="secondaryInverse">Learn More</Button>  // Supporting
</section>
```
