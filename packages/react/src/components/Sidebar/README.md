# Sidebar Section

> Application navigation sidebar with sections, icons, badges, and collapsible state.

## Quick Start

```tsx
import { Sidebar } from "@orion/react";
import { Home, Users, Settings, Folder, BarChart } from "lucide-react";

<Sidebar
  header={<img src="/logo.svg" alt="Orion" height={32} />}
  sections={[
    {
      items: [
        { id: "home", label: "Dashboard", icon: <Home size={20} />, href: "/" },
        {
          id: "projects",
          label: "Projects",
          icon: <Folder size={20} />,
          href: "/projects",
        },
        {
          id: "analytics",
          label: "Analytics",
          icon: <BarChart size={20} />,
          href: "/analytics",
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          id: "users",
          label: "Users",
          icon: <Users size={20} />,
          href: "/users",
        },
        {
          id: "settings",
          label: "Settings",
          icon: <Settings size={20} />,
          href: "/settings",
        },
      ],
    },
  ]}
  activeItem="home"
/>;
```

---

## Features

- **Section Groups** — Organize navigation into logical groups
- **Icons & Badges** — Lucide icons with optional count badges
- **Collapsible** — Expand/collapse to icon-only mode
- **Nested Items** — Sub-navigation for complex hierarchies
- **Header/Footer** — Custom logo and user menu areas
- **Active State** — Visual indicator for current page
- **Keyboard Navigation** — Full keyboard accessibility

---

## Props Reference

```typescript
interface SidebarProps {
  // Navigation
  sections: SidebarSection[]; // REQUIRED - Navigation sections
  activeItem?: string; // Currently active item ID

  // Collapse
  collapsed?: boolean; // Icon-only mode - default: false
  onCollapsedChange?: (collapsed: boolean) => void;

  // Content
  header?: ReactNode; // Logo/brand area
  footer?: ReactNode; // User menu/settings area

  // Appearance
  variant?: "default" | "floating"; // default: 'default'
  width?: number; // Width in px - default: 240
  collapsedWidth?: number; // Collapsed width - default: 64
}

interface SidebarSection {
  title?: string; // Section title (optional)
  items: SidebarItem[]; // Navigation items
}

interface SidebarItem {
  id: string; // Unique identifier
  label: string; // Display text
  href?: string; // Navigation URL
  onClick?: () => void; // Click handler
  icon?: ReactNode; // Icon element
  badge?: ReactNode; // Badge/count
  children?: SidebarItem[]; // Nested items
  disabled?: boolean; // Disabled state
}
```

---

## Basic Usage

### Simple Navigation

```tsx
<Sidebar
  sections={[
    {
      items: [
        { id: "dashboard", label: "Dashboard", href: "/" },
        { id: "projects", label: "Projects", href: "/projects" },
        { id: "settings", label: "Settings", href: "/settings" },
      ],
    },
  ]}
  activeItem="dashboard"
/>
```

### With Icons

```tsx
import { Home, Folder, Settings } from "lucide-react";

<Sidebar
  sections={[
    {
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <Home size={20} />,
          href: "/",
        },
        {
          id: "projects",
          label: "Projects",
          icon: <Folder size={20} />,
          href: "/projects",
        },
        {
          id: "settings",
          label: "Settings",
          icon: <Settings size={20} />,
          href: "/settings",
        },
      ],
    },
  ]}
  activeItem="dashboard"
/>;
```

---

## Sections

### Named Sections

```tsx
<Sidebar
  sections={[
    {
      items: [
        { id: "home", label: "Home", icon: <Home size={20} />, href: "/" },
      ],
    },
    {
      title: "Workspace",
      items: [
        {
          id: "projects",
          label: "Projects",
          icon: <Folder size={20} />,
          href: "/projects",
        },
        { id: "team", label: "Team", icon: <Users size={20} />, href: "/team" },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          id: "account",
          label: "Account",
          icon: <User size={20} />,
          href: "/account",
        },
        {
          id: "billing",
          label: "Billing",
          icon: <CreditCard size={20} />,
          href: "/billing",
        },
      ],
    },
  ]}
/>
```

---

## Badges

### Count Badge

```tsx
{
  id: 'notifications',
  label: 'Notifications',
  icon: <Bell size={20} />,
  badge: <Badge>5</Badge>,
  href: '/notifications'
}
```

### Status Badge

```tsx
{
  id: 'status',
  label: 'System Status',
  icon: <Activity size={20} />,
  badge: <Badge variant="success">OK</Badge>,
  href: '/status'
}
```

---

## Nested Navigation

```tsx
<Sidebar
  sections={[
    {
      items: [
        {
          id: "products",
          label: "Products",
          icon: <Package size={20} />,
          children: [
            { id: "products-all", label: "All Products", href: "/products" },
            {
              id: "products-categories",
              label: "Categories",
              href: "/products/categories",
            },
            {
              id: "products-inventory",
              label: "Inventory",
              href: "/products/inventory",
            },
          ],
        },
        {
          id: "orders",
          label: "Orders",
          icon: <ShoppingCart size={20} />,
          children: [
            { id: "orders-pending", label: "Pending", href: "/orders/pending" },
            {
              id: "orders-completed",
              label: "Completed",
              href: "/orders/completed",
            },
          ],
        },
      ],
    },
  ]}
/>
```

---

## Collapsible Sidebar

### Controlled Collapse

```tsx
const [collapsed, setCollapsed] = useState(false);

<Sidebar
  sections={sections}
  activeItem={activeItem}
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  header={
    collapsed ? (
      <img src="/icon.svg" alt="" height={32} />
    ) : (
      <img src="/logo.svg" alt="Orion" height={32} />
    )
  }
/>;
```

### Toggle Button in Header

```tsx
<Sidebar
  header={
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {!collapsed && <img src="/logo.svg" alt="Orion" height={32} />}
      <Button
        variant="ghost"
        iconOnly
        icon={
          collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />
        }
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      />
    </div>
  }
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  sections={sections}
/>
```

---

## Header & Footer

### With Logo Header

```tsx
<Sidebar
  header={
    <div style={{ padding: "var(--spacing-4)" }}>
      <img src="/logo.svg" alt="Orion" height={32} />
    </div>
  }
  sections={sections}
/>
```

### With User Footer

```tsx
<Sidebar
  sections={sections}
  footer={
    <div
      style={{
        padding: "var(--spacing-4)",
        borderTop: "1px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        gap: "var(--spacing-3)",
      }}
    >
      <Avatar src="/avatar.jpg" fallback="JD" size="sm" />
      <div>
        <div style={{ fontWeight: 500 }}>Jane Doe</div>
        <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
          jane@example.com
        </div>
      </div>
    </div>
  }
/>
```

---

## Width Customization

```tsx
// Wider sidebar
<Sidebar
  width={280}
  collapsedWidth={72}
  sections={sections}
/>

// Narrower sidebar
<Sidebar
  width={200}
  collapsedWidth={56}
  sections={sections}
/>
```

---

## Visual Variants

### Default

Standard sidebar attached to page edge.

```tsx
<Sidebar variant="default" sections={sections} />
```

### Floating

Overlay sidebar with shadow (for mobile or overlay mode).

```tsx
<Sidebar variant="floating" sections={sections} />
```

---

## Complete Examples

### SaaS Dashboard Sidebar

```tsx
import { Sidebar, Badge, Avatar, Button } from "@orion/react";
import {
  Home,
  Folder,
  Users,
  BarChart,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <Sidebar
      collapsed={collapsed}
      onCollapsedChange={setCollapsed}
      header={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: "var(--spacing-4)",
          }}
        >
          {!collapsed && <img src="/logo.svg" alt="Acme" height={28} />}
          {collapsed && <img src="/icon.svg" alt="" height={28} />}
          {!collapsed && (
            <Button
              variant="ghost"
              size="sm"
              iconOnly
              icon={<ChevronLeft size={16} />}
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            />
          )}
        </div>
      }
      sections={[
        {
          items: [
            {
              id: "dashboard",
              label: "Dashboard",
              icon: <Home size={20} />,
              href: "/",
            },
            {
              id: "projects",
              label: "Projects",
              icon: <Folder size={20} />,
              href: "/projects",
            },
            {
              id: "analytics",
              label: "Analytics",
              icon: <BarChart size={20} />,
              href: "/analytics",
            },
          ],
        },
        {
          title: "Organization",
          items: [
            {
              id: "team",
              label: "Team",
              icon: <Users size={20} />,
              href: "/team",
              badge: <Badge>12</Badge>,
            },
            {
              id: "notifications",
              label: "Notifications",
              icon: <Bell size={20} />,
              href: "/notifications",
              badge: <Badge variant="error">3</Badge>,
            },
          ],
        },
        {
          title: "Settings",
          items: [
            {
              id: "settings",
              label: "Settings",
              icon: <Settings size={20} />,
              href: "/settings",
            },
            {
              id: "help",
              label: "Help",
              icon: <HelpCircle size={20} />,
              href: "/help",
            },
          ],
        },
      ]}
      activeItem={location.pathname.split("/")[1] || "dashboard"}
      footer={
        <div
          style={{
            padding: "var(--spacing-3)",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          {!collapsed ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-3)",
              }}
            >
              <Avatar src="/jane.jpg" fallback="JD" size="sm" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                  Jane Doe
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  jane@acme.com
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<LogOut size={16} />}
                aria-label="Sign out"
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              fullWidth
              iconOnly
              icon={<ChevronRight size={20} />}
              onClick={() => setCollapsed(false)}
              aria-label="Expand sidebar"
            />
          )}
        </div>
      }
    />
  );
}
```

### E-commerce Admin Sidebar

```tsx
<Sidebar
  header={<img src="/store-logo.svg" alt="Store Admin" height={32} />}
  sections={[
    {
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <Home size={20} />,
          href: "/",
        },
      ],
    },
    {
      title: "Catalog",
      items: [
        {
          id: "products",
          label: "Products",
          icon: <Package size={20} />,
          children: [
            { id: "products-all", label: "All Products", href: "/products" },
            { id: "products-add", label: "Add Product", href: "/products/new" },
            { id: "categories", label: "Categories", href: "/categories" },
          ],
        },
        {
          id: "inventory",
          label: "Inventory",
          icon: <Box size={20} />,
          href: "/inventory",
        },
      ],
    },
    {
      title: "Sales",
      items: [
        {
          id: "orders",
          label: "Orders",
          icon: <ShoppingCart size={20} />,
          href: "/orders",
          badge: <Badge variant="warning">5</Badge>,
        },
        {
          id: "customers",
          label: "Customers",
          icon: <Users size={20} />,
          href: "/customers",
        },
      ],
    },
  ]}
  activeItem={activeItem}
/>
```

---

## Accessibility

- Navigation uses semantic `<nav>` element
- Active item has `aria-current="page"`
- Collapsed state communicated via `aria-expanded`
- Full keyboard navigation support
- Focus management for nested items

```tsx
// Good: Descriptive labels for icons
{ id: 'settings', label: 'Settings', icon: <Settings size={20} /> }

// Bad: Icon-only in expanded mode
{ id: 'settings', icon: <Settings size={20} /> }  // Missing label!
```

---

## Anti-Patterns

### Too Many Top-Level Items

```tsx
// WRONG - No organization, overwhelming
sections={[
  {
    items: [
      { id: '1', label: 'Dashboard', ... },
      { id: '2', label: 'Projects', ... },
      { id: '3', label: 'Tasks', ... },
      { id: '4', label: 'Calendar', ... },
      { id: '5', label: 'Messages', ... },
      { id: '6', label: 'Files', ... },
      { id: '7', label: 'Reports', ... },
      { id: '8', label: 'Users', ... },
      { id: '9', label: 'Settings', ... },
      { id: '10', label: 'Help', ... },
    ]
  }
]}

// CORRECT - Organized into sections
sections={[
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', ... },
    ]
  },
  {
    title: 'Workspace',
    items: [
      { id: 'projects', label: 'Projects', ... },
      { id: 'tasks', label: 'Tasks', ... },
      { id: 'calendar', label: 'Calendar', ... },
    ]
  },
  {
    title: 'Communication',
    items: [
      { id: 'messages', label: 'Messages', ... },
      { id: 'files', label: 'Files', ... },
    ]
  },
  {
    title: 'Settings',
    items: [
      { id: 'settings', label: 'Settings', ... },
      { id: 'help', label: 'Help', ... },
    ]
  }
]}
```

### Deep Nesting

```tsx
// WRONG - Too many nesting levels
{
  id: 'products',
  label: 'Products',
  children: [
    {
      id: 'electronics',
      label: 'Electronics',
      children: [
        {
          id: 'phones',
          label: 'Phones',
          children: [...] // Too deep!
        }
      ]
    }
  ]
}

// CORRECT - Max 2 levels
{
  id: 'products',
  label: 'Products',
  children: [
    { id: 'products-all', label: 'All Products', href: '/products' },
    { id: 'products-electronics', label: 'Electronics', href: '/products?cat=electronics' },
    { id: 'products-phones', label: 'Phones', href: '/products?cat=phones' },
  ]
}
```

### Missing Icons in Collapsed Mode

```tsx
// WRONG - Labels only, unusable when collapsed
items: [
  { id: "dashboard", label: "Dashboard", href: "/" }, // No icon!
];

// CORRECT - Always include icons
items: [
  { id: "dashboard", label: "Dashboard", icon: <Home size={20} />, href: "/" },
];
```

---

## When to Use Sidebar

| Scenario            | Recommendation                  |
| ------------------- | ------------------------------- |
| SaaS dashboard      | Yes - collapsible with sections |
| Admin panel         | Yes - with nested navigation    |
| Document management | Yes - with tree structure       |
| E-commerce admin    | Yes - organized by function     |

## When NOT to Use Sidebar

| Scenario      | Use Instead                   |
| ------------- | ----------------------------- |
| Landing pages | Top `Navbar` only             |
| Simple apps   | Top navigation                |
| Mobile-first  | Bottom tabs or hamburger menu |
| Content sites | Top navigation or none        |

---

## Related Components

- **[Navbar](../../components/Navbar/README.md)** — Top navigation bar
- **[PageHeader](../PageHeader/README.md)** — Page header with breadcrumbs
- **[SettingsLayout](../SettingsLayout/README.md)** — Settings page layout
- **[UserMenu](../UserMenu/README.md)** — User profile dropdown
