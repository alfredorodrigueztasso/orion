# Using Lucide Icons with Orion React

Orion React includes **Lucide icons** - a comprehensive icon library with 5000+ beautiful, consistent icons.

## Quick Start

### 1. Import Icons

```tsx
import { Button } from "@orion/react";
import { Search, Download, Settings } from "lucide-react";

// Use with Button
<Button icon={<Search size={20} />}>Search</Button>;
```

### 2. Available Components with Icon Support

The following components support icons via `ReactNode` props:

#### Button

- `icon` - Icon displayed on left side
- `iconRight` - Icon displayed on right side
- `iconOnly` - Show only icon, no text (requires `aria-label`)

```tsx
<Button icon={<Download size={20} />}>
  Download
</Button>

<Button iconRight={<ChevronDown size={20} />}>
  Menu
</Button>

<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />
```

#### Field (Input)

- `icon` - Icon displayed inside input field

```tsx
import { Field } from "@orion/react";
import { Mail } from "lucide-react";

<Field type="email" placeholder="Email" icon={<Mail size={18} />} />;
```

#### Alert

- `icon` - Custom icon for alert (replaces default status icon)

```tsx
import { Alert } from "@orion/react";
import { AlertCircle } from "lucide-react";

<Alert variant="error" icon={<AlertCircle size={20} />}>
  Something went wrong
</Alert>;
```

#### Badge

- Custom icon support via `children`

```tsx
import { Badge } from "@orion/react";
import { Star } from "lucide-react";

<Badge variant="brand">
  <Star size={16} style={{ marginRight: "4px" }} />
  Featured
</Badge>;
```

### 3. All Available Lucide Icons

Browse the complete icon library at **https://lucide.dev**

#### Common Icons

**Navigation & UI**

```tsx
import {
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  Bell,
  User,
} from "lucide-react";
```

**Actions**

```tsx
import {
  Plus,
  Minus,
  Check,
  Copy,
  Download,
  Upload,
  Share2,
  Trash2,
  Edit,
  Eye,
  EyeOff,
} from "lucide-react";
```

**Status & Feedback**

```tsx
import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
} from "lucide-react";
```

**Media & Files**

```tsx
import {
  Image,
  Video,
  Music,
  FileText,
  File,
  Camera,
  Paperclip,
} from "lucide-react";
```

**Social & Communication**

```tsx
import { Mail, MessageSquare, Heart, Star, Share } from "lucide-react";
```

**Commerce**

```tsx
import { ShoppingCart, DollarSign, CreditCard, Tag } from "lucide-react";
```

### 4. Icon Sizing

Control icon size with the `size` prop (in pixels):

```tsx
<Search size={16} />  // Small
<Search size={20} />  // Default
<Search size={24} />  // Medium
<Search size={32} />  // Large
```

### 5. Styling Icons

Icons inherit color and can be styled with CSS:

```tsx
<Search
  size={20}
  style={{ color: 'var(--interactive-primary)' }}
/>

<Download
  size={20}
  className="my-icon-class"
/>
```

### 6. Icon with Text Combinations

```tsx
// Icon on left
<Button icon={<Download size={20} />}>
  Download File
</Button>

// Icon on right
<Button iconRight={<ChevronDown size={20} />}>
  Show More
</Button>

// Both sides
<Button
  icon={<Menu size={20} />}
  iconRight={<ChevronDown size={20} />}
>
  Options
</Button>

// Icon only
<Button iconOnly icon={<Heart size={20} />} aria-label="Like" />
```

### 7. Accessibility

Always use `aria-label` for icon-only buttons:

```tsx
{
  /* ❌ Bad - No label */
}
<Button iconOnly icon={<Settings size={20} />} />;

{
  /* ✅ Good - Has aria-label */
}
<Button iconOnly icon={<Settings size={20} />} aria-label="Settings" />;
```

### 8. Loading States

Combine icons with loading state:

```tsx
<Button icon={<Download size={20} />} isLoading={true}>
  Downloading...
</Button>
```

### 9. Custom Icon Colors

Use CSS variables to match your theme:

```tsx
import { useThemeContext } from "@orion/react";

function MyComponent() {
  return (
    <Search
      size={20}
      style={{
        color: "var(--interactive-primary)",
      }}
    />
  );
}
```

### 10. Icon Animations

Animate icons with CSS or React:

```tsx
import { RotateCw } from "lucide-react";

<RotateCw size={20} style={{ animation: "spin 1s linear infinite" }} />;
```

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## Complete Example

```tsx
import React from "react";
import { Button, Field, Alert, ThemeProvider } from "@orion/react";
import { Search, Download, AlertCircle, Settings } from "lucide-react";
import "@orion/core/theme.css";
import "@orion/react/dist/react.css";

function App() {
  return (
    <ThemeProvider>
      <div style={{ padding: "20px" }}>
        <h1>Lucide Icons with Orion React</h1>

        {/* Search with icon */}
        <Field
          type="text"
          placeholder="Search..."
          icon={<Search size={18} />}
        />

        {/* Buttons with icons */}
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <Button icon={<Search size={20} />}>Search</Button>
          <Button icon={<Download size={20} />} variant="secondary">
            Download
          </Button>
          <Button
            iconOnly
            icon={<Settings size={20} />}
            variant="ghost"
            aria-label="Settings"
          />
        </div>

        {/* Alert with icon */}
        <Alert variant="error" icon={<AlertCircle size={20} />}>
          Something went wrong. Please try again.
        </Alert>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

## Performance Tips

1. **Only import what you need** - Tree-shake unused icons:

   ```tsx
   // ✅ Good - Only imports Search
   import { Search } from "lucide-react";

   // ❌ Avoid - Imports entire library
   import * as Icons from "lucide-react";
   ```

2. **Reuse icon components** - Create icon constants:

   ```tsx
   const SearchIcon = <Search size={20} />;

   <Button icon={SearchIcon}>Search</Button>
   <Button icon={SearchIcon}>Find</Button>
   ```

3. **Lazy load icons** - Import only when needed:
   ```tsx
   const { Search } = await import("lucide-react");
   ```

## Resources

- **Lucide Icon Library**: https://lucide.dev
- **GitHub**: https://github.com/lucide-icons/lucide
- **NPM Package**: https://www.npmjs.com/package/lucide-react

## Troubleshooting

### Icons not appearing

1. Make sure CSS is imported:

   ```tsx
   import "@orion/core/theme.css";
   import "@orion/react/dist/react.css";
   ```

2. Check if icon is inside a component that supports icons:

   ```tsx
   // Only these components support icon props
   <Button icon={...} />
   <Field icon={...} />
   <Alert icon={...} />
   ```

3. Verify icon size is appropriate for component:
   ```tsx
   // For small buttons, use small icons
   <Button size="sm" icon={<Search size={16} />} />
   // For large buttons, use larger icons
   <Button size="lg" icon={<Search size={24} />} />
   ```

### Icon color not matching

Use CSS variables to ensure consistent theming:

```tsx
<Search size={20} style={{ color: "var(--text-primary)" }} />
```

## Contributing Icons

To request a new icon or suggest improvements, visit:
https://github.com/lucide-icons/lucide/issues

## License

Lucide icons are under the ISC License.
Orion React is under the MIT License.
