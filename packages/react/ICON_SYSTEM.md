# Orion Design System - Icon System

## Overview

The Orion Icon System provides a standardized, accessible, and tree-shaking friendly approach to using icons across the design system. It leverages **Lucide React** as the icon source and wraps it with a normalized `Icon` component.

---

## A) Architecture Decision

### Chosen Approach: Wrapper + Direct Imports

We use a **hybrid approach** combining:

1. **Direct imports** from `lucide-react` (preserves tree-shaking)
2. **`Icon` wrapper component** (normalizes sizing, colors, accessibility)

```tsx
// Pattern: Import Lucide icon + use Icon wrapper
import { Icon } from "@orion/react";
import { Search } from "lucide-react";

<Icon icon={Search} size="md" decorative />;
```

### Why This Architecture?

| Requirement       | How It's Solved                       |
| ----------------- | ------------------------------------- |
| Tree-shaking      | Direct imports from `lucide-react`    |
| Consistent sizing | `Icon` wrapper with token-based sizes |
| Theming           | CSS variables for colors              |
| Accessibility     | Built-in `aria-*` handling            |
| Type safety       | Full TypeScript support               |
| AI-friendly       | Single, predictable pattern           |

### Alternatives Considered

| Option                 | Pros                    | Cons                                | Verdict  |
| ---------------------- | ----------------------- | ----------------------------------- | -------- |
| **Re-export package**  | Curated set             | Maintenance burden, manual updates  | Rejected |
| **Registry/manifest**  | Compile-time validation | Breaks tree-shaking                 | Rejected |
| **Direct Lucide only** | Zero overhead           | Inconsistent a11y, no normalization | Rejected |

---

## B) Implementation

### 1. Icon Component

#### Types (`Icon.types.ts`)

```typescript
import type { LucideIcon } from "lucide-react";

// Size tokens (mapped to CSS variables)
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

// Color variants (semantic tokens)
export type IconColor =
  | "current" // inherits from parent
  | "primary" // --text-primary
  | "secondary" // --text-secondary
  | "tertiary" // --text-tertiary
  | "brand" // --text-brand
  | "success" // --status-success
  | "warning" // --status-warning
  | "error" // --status-error
  | "info" // --status-info
  | "inverse"; // --text-inverse

export interface IconProps {
  /** Lucide icon component */
  icon: LucideIcon;

  /** Size token or custom pixels */
  size?: IconSize | number;

  /** Color variant */
  color?: IconColor;

  /** Stroke width (default: 2) */
  strokeWidth?: number;

  /** Accessible label (required if not decorative) */
  label?: string;

  /** Hide from screen readers */
  decorative?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS class */
  className?: string;
}
```

#### Size Token Mapping

| Token | Pixels | CSS Variable     | Use Case                   |
| ----- | ------ | ---------------- | -------------------------- |
| `xs`  | 12px   | `--icon-size-sm` | Badges, compact UI         |
| `sm`  | 16px   | `--icon-size-sm` | Inline text, small buttons |
| `md`  | 20px   | `--icon-size-md` | Default for buttons/inputs |
| `lg`  | 24px   | `--icon-size-lg` | Section headers            |
| `xl`  | 32px   | `--icon-size-xl` | Large callouts             |

### 2. Folder Structure

```
packages/react/
├── src/
│   ├── components/
│   │   ├── Icon/
│   │   │   ├── Icon.tsx           # Main component
│   │   │   ├── Icon.types.ts      # TypeScript definitions
│   │   │   ├── Icon.module.css    # Token-based styles
│   │   │   └── index.ts           # Exports
│   │   ├── Button/                # Uses Icon pattern
│   │   ├── Field/                 # Uses Icon pattern
│   │   └── Alert/                 # Uses Icon with defaults
│   └── index.ts                   # Re-exports Icon
```

### 3. Usage Examples

#### Button with Icons

```tsx
import { Button } from '@orion/react';
import { Download, ChevronDown, Settings } from 'lucide-react';

// Icon on left
<Button icon={<Download size={20} />}>
  Download File
</Button>

// Icon on right
<Button iconRight={<ChevronDown size={20} />}>
  Options
</Button>

// Icon only (MUST have aria-label)
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />

// Both icons
<Button
  icon={<Download size={20} />}
  iconRight={<ChevronDown size={20} />}
>
  Download Options
</Button>
```

#### Field with Icon

```tsx
import { Field } from '@orion/react';
import { Search, Eye, EyeOff } from 'lucide-react';

// Search input
<Field
  type="text"
  placeholder="Search..."
  leftIcon={<Search size={18} />}
/>

// Password with toggle
<Field
  type="password"
  rightIcon={<Eye size={18} />}
/>
```

#### Alert with Custom Icon

```tsx
import { Alert } from '@orion/react';
import { Rocket, Bell } from 'lucide-react';

// Uses default icon for variant
<Alert variant="success" title="Success!">
  Your changes have been saved.
</Alert>

// Custom icon override
<Alert variant="info" icon={<Rocket size={20} />} title="New Feature">
  Check out what's new!
</Alert>
```

#### Using the Icon Wrapper (Advanced)

```tsx
import { Icon } from '@orion/react';
import { AlertCircle, Check, Star } from 'lucide-react';

// Decorative icon (hidden from screen readers)
<Icon icon={Star} size="md" decorative />

// Semantic icon (announced to screen readers)
<Icon icon={AlertCircle} size="lg" label="Warning" color="warning" />

// Custom pixel size
<Icon icon={Check} size={18} color="success" />

// Disabled state
<Icon icon={Star} size="md" disabled />
```

---

## C) Best Practices Guide

### Do's and Don'ts

#### DO

```tsx
// Import icons directly from lucide-react
import { Search } from 'lucide-react';

// Use consistent size props
<Search size={20} />

// Add aria-label to icon-only buttons
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />

// Use semantic color tokens
<Icon icon={AlertCircle} color="error" />

// Let icons inherit color from parent
<Button variant="primary">
  <Search size={20} /> {/* Inherits button text color */}
</Button>
```

#### DON'T

```tsx
// Don't import all icons
import * as Icons from 'lucide-react'; // Breaks tree-shaking

// Don't hardcode sizes in multiple places
<Search size={20} />
<Mail size={24} />  // Inconsistent!
<User size={18} />  // Inconsistent!

// Don't forget accessibility on standalone icons
<AlertCircle /> // Missing label or decorative flag

// Don't use raw hex colors
<Search color="#ff0000" /> // Use semantic tokens

// Don't mix icon libraries
import { FaSearch } from 'react-icons/fa'; // Use Lucide only
```

### Naming Conventions

| Context | Convention   | Example                                      |
| ------- | ------------ | -------------------------------------------- |
| Import  | PascalCase   | `import { AlertCircle } from 'lucide-react'` |
| Props   | camelCase    | `leftIcon`, `iconRight`                      |
| Sizes   | Tokens first | `size="md"` over `size={20}`                 |
| Colors  | Semantic     | `color="error"` over `color="red"`           |

### Adding a New Icon

Since we use direct imports from Lucide, no configuration is needed:

1. **Find the icon**: Browse [lucide.dev](https://lucide.dev)
2. **Import it**: `import { IconName } from 'lucide-react';`
3. **Use it**: `<IconName size={20} />`

### Accessibility Checklist

| Scenario                 | Requirement                                  |
| ------------------------ | -------------------------------------------- |
| Icon with text           | Mark as `decorative` or `aria-hidden="true"` |
| Icon-only button         | Add `aria-label` to button                   |
| Standalone semantic icon | Add `label` prop to Icon                     |
| Status indicators        | Ensure color is not the only indicator       |
| Focus states             | Icons in buttons inherit focus styles        |

### Performance Checklist

| Check           | Status                                 | Notes |
| --------------- | -------------------------------------- | ----- |
| Tree-shaking    | Use named imports only                 |
| Bundle analysis | Run `npm run build && npm run analyze` |
| SSR/Next.js     | Lucide works out of the box            |
| Lazy loading    | Not needed (icons are small)           |
| Caching         | Browser caches SVG inline              |

---

## D) AI-First Guidelines

### Rules for AI Code Generation

Copy this block to your `CLAUDE.md` or AI guidelines:

````markdown
## Icon System Rules (AI-First)

### ALWAYS

1. **Import icons from `lucide-react`**:
   ```tsx
   import { Search, Download, AlertCircle } from "lucide-react";
   ```
````

2. **Use consistent sizing**:
   - Buttons: `size={20}` (matches `--icon-size-md`)
   - Small buttons (sm): `size={16}`
   - Large buttons (lg): `size={24}`
   - Fields: `size={18}`

3. **Add `aria-label` to icon-only buttons**:

   ```tsx
   <Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
   ```

4. **Use existing component patterns**:

   ```tsx
   // Button with icon
   <Button icon={<Download size={20} />}>Download</Button>

   // Field with icon
   <Field leftIcon={<Search size={18} />} placeholder="Search..." />

   // Alert (uses default icons automatically)
   <Alert variant="success">Message</Alert>
   ```

### NEVER

1. **Don't import all icons**:

   ```tsx
   // WRONG - breaks tree-shaking
   import * as Icons from "lucide-react";
   ```

2. **Don't create custom SVG icons**:

   ```tsx
   // WRONG - use Lucide instead
   <svg viewBox="0 0 24 24">...</svg>
   ```

3. **Don't hardcode colors**:

   ```tsx
   // WRONG
   <Search color="#3b82f6" />

   // RIGHT - inherit from parent or use Icon wrapper
   <Icon icon={Search} color="brand" />
   ```

4. **Don't forget accessibility**:

   ```tsx
   // WRONG - no label
   <Button iconOnly icon={<Settings size={20} />} />

   // RIGHT
   <Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
   ```

### Common Icon Mappings

| Use Case         | Icon Import                 | Size    |
| ---------------- | --------------------------- | ------- |
| Search           | `Search`                    | 18-20px |
| Close/Dismiss    | `X`                         | 18-20px |
| Menu             | `Menu`                      | 24px    |
| Settings         | `Settings`                  | 20px    |
| User/Profile     | `User`                      | 20-24px |
| Download         | `Download`                  | 20px    |
| Upload           | `Upload`                    | 20px    |
| Edit             | `Edit` or `Pencil`          | 16-20px |
| Delete           | `Trash2`                    | 18-20px |
| Add              | `Plus`                      | 20px    |
| Success          | `CheckCircle`               | 20px    |
| Error            | `XCircle`                   | 20px    |
| Warning          | `AlertTriangle`             | 20px    |
| Info             | `Info`                      | 20px    |
| Arrow navigation | `ChevronLeft/Right/Up/Down` | 20px    |
| External link    | `ExternalLink`              | 16px    |
| Copy             | `Copy`                      | 16-18px |
| Eye (show)       | `Eye`                       | 18px    |
| Eye (hide)       | `EyeOff`                    | 18px    |

### Alert Variants (Auto-Icons)

Alert component automatically uses these Lucide icons:

| Variant   | Icon            | Token Color        |
| --------- | --------------- | ------------------ |
| `success` | `CheckCircle`   | `--status-success` |
| `error`   | `XCircle`       | `--status-error`   |
| `warning` | `AlertTriangle` | `--status-warning` |
| `info`    | `Info`          | `--status-info`    |

Override with custom icon:

```tsx
<Alert variant="info" icon={<Rocket size={20} />}>
  Custom icon alert
</Alert>
```

````

---

## Quick Reference

### Import Pattern
```tsx
import { Icon, Button, Field, Alert } from '@orion/react';
import { Search, Download, AlertCircle } from 'lucide-react';
````

### Size Quick Reference

```tsx
// Use these sizes consistently:
<Icon icon={...} size="sm" />  // 16px - small contexts
<Icon icon={...} size="md" />  // 20px - default
<Icon icon={...} size="lg" />  // 24px - headers
<Icon icon={...} size="xl" />  // 32px - large callouts
<Icon icon={...} size={18} />  // Custom pixel value
```

### Color Quick Reference

```tsx
<Icon icon={...} color="current" />   // Inherit from parent
<Icon icon={...} color="primary" />   // Main text color
<Icon icon={...} color="secondary" /> // Muted text
<Icon icon={...} color="brand" />     // Brand accent
<Icon icon={...} color="success" />   // Success green
<Icon icon={...} color="error" />     // Error red
<Icon icon={...} color="warning" />   // Warning yellow
<Icon icon={...} color="info" />      // Info blue
```

---

## Browse Icons

Full icon library: **[lucide.dev](https://lucide.dev)**

5000+ icons available. All icons support:

- Consistent 24x24 viewBox
- Customizable stroke width
- Tree-shakeable imports
- TypeScript support
