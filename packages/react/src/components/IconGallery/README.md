# IconGallery

Display component for browsing available Lucide icons. Used for documentation and design exploration.

## Props

| Prop        | Type      | Default | Description          |
| ----------- | --------- | ------- | -------------------- |
| `columns`   | `number`  | `6`     | Grid columns         |
| `showNames` | `boolean` | `true`  | Show icon names      |
| `showCode`  | `boolean` | `false` | Show usage code      |
| `className` | `string`  | -       | Additional CSS class |

### IconCategory

Available categories:

- `'Navigation'`
- `'Actions'`
- `'Status & Feedback'`
- `'Media & Files'`
- `'Social & Communication'`
- `'Commerce & Business'`
- `'UI & Objects'`

## Usage

### Basic

```tsx
import { IconGallery } from "@orion/react";

<IconGallery />;
```

### Custom Columns

```tsx
<IconGallery columns={4} />
<IconGallery columns={8} />
```

### Without Names

```tsx
<IconGallery showNames={false} />
```

### With Code Examples

```tsx
<IconGallery showCode />
```

### In Documentation Page

```tsx
function IconsDocPage() {
  return (
    <div>
      <h1>Icon Library</h1>
      <p>Browse available icons from Lucide. Click to copy import statement.</p>

      <IconGallery columns={6} showNames showCode />
    </div>
  );
}
```

## Note

This is primarily a **documentation component** for exploring the icon library. In production code, import icons directly from `lucide-react`:

```tsx
// In your components
import { Search, User, Settings } from "lucide-react";

<Button icon={<Search size={20} />}>Search</Button>;
```

## Tokens Used

- `--surface-subtle` - Icon tile background
- `--surface-base` - Hover background
- `--text-primary` - Icon color
- `--text-secondary` - Icon name text
- `--spacing-3`, `--spacing-4` - Grid gaps
- `--radius-control` - Tile border radius

## Full Icon Reference

For the complete list of 1000+ icons, visit:
**https://lucide.dev/icons**

### Common Icons by Category

**Navigation:**
`Home`, `Menu`, `X`, `ChevronDown`, `ChevronRight`, `ArrowLeft`, `ArrowRight`

**Actions:**
`Plus`, `Minus`, `Check`, `Edit`, `Trash2`, `Copy`, `Download`, `Upload`, `Search`

**Status:**
`CheckCircle`, `XCircle`, `AlertCircle`, `AlertTriangle`, `Info`, `HelpCircle`

**Media:**
`Image`, `Video`, `Music`, `File`, `Folder`, `Camera`

**Social:**
`Mail`, `MessageSquare`, `Heart`, `Star`, `Share2`, `Send`

**Commerce:**
`ShoppingCart`, `CreditCard`, `DollarSign`, `Package`
