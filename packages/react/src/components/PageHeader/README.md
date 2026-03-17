# PageHeader Section

> Application page header with breadcrumbs, title, actions, and optional tabs.

## Quick Start

```tsx
import { PageHeader, Button, Badge } from "@orion/react";
import { Plus } from "lucide-react";

<PageHeader
  breadcrumbs={[
    { label: "Dashboard", href: "/" },
    { label: "Users", href: "/users" },
    { label: "Settings" },
  ]}
  title="User Settings"
  description="Manage user preferences and permissions"
  actions={<Button icon={<Plus size={20} />}>Add User</Button>}
/>;
```

---

## Features

- **Breadcrumb Navigation** — Full navigation path display
- **Title & Description** — Page title with optional description
- **Action Buttons** — Right-aligned primary actions
- **Tab Navigation** — Built-in tab support for sub-pages
- **Back Link** — Quick navigation to previous page
- **Badges** — Status or count badges next to title
- **Sticky Mode** — Pin header while scrolling
- **Size Variants** — Small, medium, large options

---

## Props Reference

```typescript
interface PageHeaderProps {
  // Content
  title: ReactNode; // REQUIRED - Page title
  description?: ReactNode; // Optional description
  badge?: ReactNode; // Badge next to title

  // Navigation
  breadcrumbs?: BreadcrumbItem[]; // Breadcrumb path
  backLink?: {
    // Back navigation
    label?: string;
    href?: string;
    onClick?: () => void;
  };

  // Actions
  actions?: ReactNode; // Action buttons (right-aligned)

  // Tabs
  tabs?: PageHeaderTab[]; // Tab navigation items
  activeTab?: string; // Currently active tab ID
  onTabChange?: (tabId: string) => void;

  // Appearance
  variant?: "default" | "compact" | "with-tabs" | "transparent"; // default: 'default'
  size?: "sm" | "md" | "lg"; // default: 'md'
  bordered?: boolean; // Show bottom border - default: true
  sticky?: boolean; // Sticky positioning - default: false
}

interface BreadcrumbItem {
  label: string; // Display text
  href?: string; // Navigation URL
  onClick?: () => void; // Click handler
}

interface PageHeaderTab {
  id: string; // Unique identifier
  label: string; // Display label
  badge?: ReactNode; // Optional badge/count
  href?: string; // Tab href for navigation
}
```

---

## Breadcrumbs

### Basic Breadcrumbs

```tsx
<PageHeader
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Edit Product" }, // Current page (no href)
  ]}
  title="Edit Product"
/>
```

### With Click Handlers

```tsx
<PageHeader
  breadcrumbs={[
    { label: "Dashboard", onClick: () => navigate("/") },
    { label: "Reports", onClick: () => navigate("/reports") },
    { label: "Monthly Report" },
  ]}
  title="Monthly Report"
/>
```

---

## Back Link

### Simple Back Link

```tsx
<PageHeader backLink={{ href: "/users" }} title="User Details" />
```

### With Custom Label

```tsx
<PageHeader
  backLink={{
    label: "Back to Dashboard",
    href: "/dashboard",
  }}
  title="Settings"
/>
```

### With Click Handler

```tsx
<PageHeader
  backLink={{
    label: "Go Back",
    onClick: () => router.back(),
  }}
  title="Order Details"
/>
```

---

## Actions

### Single Action

```tsx
<PageHeader title="Users" actions={<Button>Add User</Button>} />
```

### Multiple Actions

```tsx
import { Plus, Download, Settings } from "lucide-react";

<PageHeader
  title="Projects"
  actions={
    <>
      <Button variant="ghost" icon={<Download size={20} />}>
        Export
      </Button>
      <Button variant="ghost" icon={<Settings size={20} />}>
        Settings
      </Button>
      <Button icon={<Plus size={20} />}>New Project</Button>
    </>
  }
/>;
```

---

## Badges

### Status Badge

```tsx
<PageHeader title="API Keys" badge={<Badge variant="success">Active</Badge>} />
```

### Count Badge

```tsx
<PageHeader title="Notifications" badge={<Badge>12</Badge>} />
```

---

## Tab Navigation

### Basic Tabs

```tsx
const [activeTab, setActiveTab] = useState("general");

<PageHeader
  title="Settings"
  tabs={[
    { id: "general", label: "General" },
    { id: "security", label: "Security" },
    { id: "billing", label: "Billing" },
    { id: "team", label: "Team" },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>;
```

### Tabs with Badges

```tsx
<PageHeader
  title="Support"
  tabs={[
    { id: "open", label: "Open", badge: <Badge>5</Badge> },
    {
      id: "pending",
      label: "Pending",
      badge: <Badge variant="warning">2</Badge>,
    },
    { id: "closed", label: "Closed" },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Tabs with Links

```tsx
<PageHeader
  title="Account"
  tabs={[
    { id: "profile", label: "Profile", href: "/account/profile" },
    { id: "security", label: "Security", href: "/account/security" },
    {
      id: "notifications",
      label: "Notifications",
      href: "/account/notifications",
    },
  ]}
  activeTab={currentPath}
/>
```

---

## Size Variants

### Small

Best for compact layouts or secondary pages.

```tsx
<PageHeader size="sm" title="Quick Settings" />
```

### Medium (Default)

Standard page header.

```tsx
<PageHeader size="md" title="Dashboard" description="Welcome back, Jane" />
```

### Large

For prominent page titles.

```tsx
<PageHeader
  size="lg"
  title="Welcome to Orion"
  description="Your all-in-one platform for building modern apps"
/>
```

---

## Visual Variants

### Default

Standard header with padding and border.

```tsx
<PageHeader variant="default" title="Dashboard" />
```

### Compact

Reduced spacing for dense layouts.

```tsx
<PageHeader variant="compact" title="Settings" breadcrumbs={breadcrumbs} />
```

### With Tabs

Optimized layout when using tab navigation.

```tsx
<PageHeader
  variant="with-tabs"
  title="Account"
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

### Transparent

No background, blends with page content.

```tsx
<PageHeader variant="transparent" title="Welcome" bordered={false} />
```

---

## Sticky Header

```tsx
<PageHeader title="Products" actions={<Button>Add Product</Button>} sticky />
```

---

## Complete Examples

### Dashboard Page Header

```tsx
import { PageHeader, Button, Badge } from "@orion/react";
import { Plus, Download } from "lucide-react";

<PageHeader
  breadcrumbs={[{ label: "Home", href: "/" }, { label: "Analytics" }]}
  title="Analytics Dashboard"
  description="Track your key metrics and performance"
  actions={
    <>
      <Button variant="ghost" icon={<Download size={20} />}>
        Export
      </Button>
      <Button icon={<Plus size={20} />}>New Report</Button>
    </>
  }
/>;
```

### Settings Page with Tabs

```tsx
const [tab, setTab] = useState("general");

<PageHeader
  backLink={{ href: "/dashboard", label: "Back to Dashboard" }}
  title="Settings"
  badge={<Badge variant="brand">Pro Plan</Badge>}
  tabs={[
    { id: "general", label: "General" },
    { id: "security", label: "Security" },
    { id: "billing", label: "Billing" },
    { id: "team", label: "Team", badge: <Badge>5</Badge> },
  ]}
  activeTab={tab}
  onTabChange={setTab}
  variant="with-tabs"
/>;

{
  tab === "general" && <GeneralSettings />;
}
{
  tab === "security" && <SecuritySettings />;
}
{
  /* ... */
}
```

### Detail Page Header

```tsx
<PageHeader
  breadcrumbs={[
    { label: "Dashboard", href: "/" },
    { label: "Users", href: "/users" },
    { label: "Jane Doe" },
  ]}
  title="Jane Doe"
  badge={<Badge variant="success">Active</Badge>}
  description="jane@example.com • Joined Jan 15, 2024"
  actions={
    <>
      <Button variant="ghost">Send Message</Button>
      <Button variant="secondary">Edit Profile</Button>
      <Button variant="danger">Delete User</Button>
    </>
  }
/>
```

### Minimal Page Header

```tsx
<PageHeader
  variant="compact"
  size="sm"
  title="Notifications"
  badge={<Badge>3 new</Badge>}
/>
```

---

## Accessibility

- Breadcrumbs use semantic `<nav>` with `aria-label="Breadcrumb"`
- Current breadcrumb has `aria-current="page"`
- Tab navigation is keyboard accessible
- Focus management for sticky mode
- Proper heading hierarchy (title is `<h1>`)

```tsx
// Good: Clear, descriptive breadcrumbs
breadcrumbs={[
  { label: 'Dashboard', href: '/' },
  { label: 'User Management', href: '/users' },
  { label: 'Edit User' }
]}

// Avoid: Abbreviated breadcrumbs
breadcrumbs={[
  { label: 'Dash', href: '/' },
  { label: 'Users', href: '/users' },
  { label: 'Edit' }
]}
```

---

## Anti-Patterns

### Too Many Breadcrumbs

```tsx
// WRONG - Deep nesting overwhelms users
breadcrumbs={[
  { label: 'Home' },
  { label: 'Products' },
  { label: 'Category' },
  { label: 'Subcategory' },
  { label: 'Product Type' },
  { label: 'Product' },
  { label: 'Edit' }
]}

// CORRECT - Flatten hierarchy, max 3-4 levels
breadcrumbs={[
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Edit iPhone 15' }
]}
```

### Too Many Actions

```tsx
// WRONG - Button overload
actions={
  <>
    <Button>Edit</Button>
    <Button>Delete</Button>
    <Button>Archive</Button>
    <Button>Export</Button>
    <Button>Share</Button>
    <Button>Settings</Button>
  </>
}

// CORRECT - Primary action + dropdown for secondary
actions={
  <>
    <DropdownMenu>
      <DropdownTrigger>
        <Button variant="ghost" icon={<MoreHorizontal size={20} />} />
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Export</DropdownItem>
        <DropdownItem>Archive</DropdownItem>
        <DropdownItem>Delete</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
    <Button>Edit</Button>
  </>
}
```

### Missing Title

```tsx
// WRONG - title is required
<PageHeader breadcrumbs={[...]} actions={<Button>Add</Button>} />

// CORRECT
<PageHeader
  title="Products"
  breadcrumbs={[...]}
  actions={<Button>Add Product</Button>}
/>
```

---

## When to Use PageHeader

| Scenario        | Recommendation                     |
| --------------- | ---------------------------------- |
| Dashboard pages | Yes - with breadcrumbs and actions |
| Detail pages    | Yes - with back link and context   |
| Settings pages  | Yes - with tabs for sections       |
| List pages      | Yes - with search and actions      |

## When NOT to Use PageHeader

| Scenario       | Use Instead             |
| -------------- | ----------------------- |
| Landing page   | `Hero` section          |
| Marketing page | `Hero` or custom header |
| Modal content  | Modal's built-in header |
| Simple forms   | Form title directly     |

---

## Related Components

- **[Sidebar](../Sidebar/README.md)** — Navigation sidebar
- **[DataTable](../DataTable/README.md)** — Data tables (often below PageHeader)
- **[Breadcrumbs](../Breadcrumbs/README.md)** — Standalone breadcrumbs
- **[Tabs](../../components/Tabs/README.md)** — Tab component
