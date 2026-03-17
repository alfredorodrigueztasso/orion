# Navbar Component

> Site/app header using the compound component pattern.

## Compound Component Pattern

Navbar uses dot notation for its subcomponents:

```tsx
<Navbar>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="/features">Features</Navbar.Link>
    <Navbar.Link href="/pricing">Pricing</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button>Sign In</Button>
  </Navbar.Actions>
</Navbar>
```

---

## When to Use

| Scenario         | Use Navbar                   |
| ---------------- | ---------------------------- |
| Site header      | Main navigation for websites |
| App header       | Top bar for applications     |
| Dashboard header | Navigation for admin panels  |

## When NOT to Use

| Scenario          | Use Instead                  |
| ----------------- | ---------------------------- |
| Footer navigation | `<Footer>`                   |
| Side navigation   | `<Drawer>` or custom sidebar |
| Tab navigation    | `<Tabs>`                     |
| Mobile bottom nav | Custom bottom navigation     |

---

## Variants Guide

| Variant       | Visual Style         | Use When                                         |
| ------------- | -------------------- | ------------------------------------------------ |
| `solid`       | Solid background     | Default - most pages, especially in Product mode |
| `transparent` | No background        | Hero sections where navbar overlays content      |
| `glass`       | Frosted glass effect | Display mode only - marketing pages              |

### Mode Compatibility

| Variant       | Display Mode | Product Mode      | App Mode |
| ------------- | ------------ | ----------------- | -------- |
| `solid`       | Yes          | Yes (recommended) | Yes      |
| `transparent` | Yes          | No                | No       |
| `glass`       | Yes          | No                | No       |

---

## Props Reference

### Navbar Props

```typescript
interface NavbarProps {
  variant?: "solid" | "transparent" | "glass"; // default: 'solid'
  height?: "sm" | "md" | "lg"; // default: 'md'
  sticky?: boolean; // default: false
  bordered?: boolean; // default: true
  className?: string;
  children: ReactNode;
}
```

### Subcomponent Props

```typescript
interface NavbarBrandProps {
  href?: string; // Link to home
  children: ReactNode; // Logo or brand name
  className?: string;
}

interface NavbarNavProps {
  children: ReactNode; // Navbar.Link elements
  className?: string;
}

interface NavbarLinkProps {
  href: string; // Link destination
  active?: boolean; // Current page indicator
  children: ReactNode; // Link text
  className?: string;
}

interface NavbarActionsProps {
  children: ReactNode; // Buttons, icons, etc.
  className?: string;
}
```

---

## Subcomponents

| Subcomponent     | Purpose                    | Position   |
| ---------------- | -------------------------- | ---------- |
| `Navbar.Brand`   | Logo or brand name         | Left       |
| `Navbar.Nav`     | Navigation links container | Center     |
| `Navbar.Link`    | Individual navigation link | Inside Nav |
| `Navbar.Actions` | Action buttons             | Right      |

---

## Examples

### Basic Navbar

```tsx
import { Navbar, Button } from "@orion/react";

<Navbar>
  <Navbar.Brand href="/">
    <img src="/logo.svg" alt="Acme" height={32} />
  </Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="/features">Features</Navbar.Link>
    <Navbar.Link href="/pricing">Pricing</Navbar.Link>
    <Navbar.Link href="/about">About</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button variant="ghost">Sign In</Button>
    <Button>Get Started</Button>
  </Navbar.Actions>
</Navbar>;
```

### Sticky Navbar

```tsx
import { Navbar, Button } from "@orion/react";

<Navbar sticky>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="#features">Features</Navbar.Link>
    <Navbar.Link href="#pricing">Pricing</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button>Sign Up</Button>
  </Navbar.Actions>
</Navbar>;
```

### Transparent Variant (for Heroes)

```tsx
import { Navbar, Button, Hero } from "@orion/react";

<>
  <Navbar variant="transparent" sticky>
    <Navbar.Brand href="/">
      <img src="/logo-white.svg" alt="Acme" height={32} />
    </Navbar.Brand>
    <Navbar.Nav>
      <Navbar.Link href="#features">Features</Navbar.Link>
      <Navbar.Link href="#pricing">Pricing</Navbar.Link>
    </Navbar.Nav>
    <Navbar.Actions>
      <Button variant="ghost">Sign In</Button>
      <Button>Get Started</Button>
    </Navbar.Actions>
  </Navbar>

  <Hero
    headline="Welcome to Acme"
    // Hero content overlaps with transparent navbar
  />
</>;
```

### Glass Variant (Display Mode)

```tsx
import { Navbar, Button } from "@orion/react";

// Only in data-mode="display"
<Navbar variant="glass" sticky>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="/features">Features</Navbar.Link>
    <Navbar.Link href="/pricing">Pricing</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button>Get Started</Button>
  </Navbar.Actions>
</Navbar>;
```

### Active Link State

```tsx
import { Navbar } from "@orion/react";
import { useLocation } from "react-router-dom";

function AppNavbar() {
  const location = useLocation();

  return (
    <Navbar>
      <Navbar.Brand href="/">Logo</Navbar.Brand>
      <Navbar.Nav>
        <Navbar.Link
          href="/dashboard"
          active={location.pathname === "/dashboard"}
        >
          Dashboard
        </Navbar.Link>
        <Navbar.Link
          href="/settings"
          active={location.pathname === "/settings"}
        >
          Settings
        </Navbar.Link>
      </Navbar.Nav>
    </Navbar>
  );
}
```

### Height Variants

```tsx
import { Navbar } from '@orion/react';

// Small - for dense UIs
<Navbar height="sm">...</Navbar>

// Medium - default
<Navbar height="md">...</Navbar>

// Large - for marketing pages
<Navbar height="lg">...</Navbar>
```

### Without Border

```tsx
import { Navbar } from "@orion/react";

<Navbar bordered={false}>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>...</Navbar.Nav>
</Navbar>;
```

### With Icons in Actions

```tsx
import { Navbar, Button } from "@orion/react";
import { Bell, User, Settings } from "lucide-react";

<Navbar>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="/dashboard">Dashboard</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button
      variant="ghost"
      iconOnly
      icon={<Bell size={20} />}
      aria-label="Notifications"
    />
    <Button
      variant="ghost"
      iconOnly
      icon={<Settings size={20} />}
      aria-label="Settings"
    />
    <Button
      variant="ghost"
      iconOnly
      icon={<User size={20} />}
      aria-label="Profile"
    />
  </Navbar.Actions>
</Navbar>;
```

### With Dropdown Menu

```tsx
import { Navbar, Button, Dropdown } from "@orion/react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";

<Navbar>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="/features">Features</Navbar.Link>
    <Dropdown
      trigger={
        <Button variant="ghost" iconRight={<ChevronDown size={16} />}>
          Products
        </Button>
      }
      items={[
        { label: "Product A", href: "/products/a" },
        { label: "Product B", href: "/products/b" },
        { label: "Product C", href: "/products/c" },
      ]}
    />
  </Navbar.Nav>
  <Navbar.Actions>
    <Dropdown
      trigger={
        <Button
          variant="ghost"
          iconOnly
          icon={<User size={20} />}
          aria-label="Account"
        />
      }
      items={[
        { label: "Profile", icon: <User size={16} />, href: "/profile" },
        { label: "Settings", icon: <Settings size={16} />, href: "/settings" },
        { type: "divider" },
        {
          label: "Sign Out",
          icon: <LogOut size={16} />,
          onClick: handleSignOut,
        },
      ]}
    />
  </Navbar.Actions>
</Navbar>;
```

---

## Common Patterns

### Landing Page Navbar

```tsx
import { Navbar, Button } from "@orion/react";

<Navbar variant="solid" sticky>
  <Navbar.Brand href="/">
    <img src="/logo.svg" alt="Company" height={32} />
  </Navbar.Brand>
  <Navbar.Nav>
    <Navbar.Link href="#features">Features</Navbar.Link>
    <Navbar.Link href="#pricing">Pricing</Navbar.Link>
    <Navbar.Link href="#testimonials">Testimonials</Navbar.Link>
    <Navbar.Link href="#faq">FAQ</Navbar.Link>
  </Navbar.Nav>
  <Navbar.Actions>
    <Button variant="ghost">Sign In</Button>
    <Button>Start Free Trial</Button>
  </Navbar.Actions>
</Navbar>;
```

### Dashboard Navbar

```tsx
import { Navbar, Button, Avatar, SearchInput } from "@orion/react";
import { Bell, HelpCircle } from "lucide-react";

<Navbar>
  <Navbar.Brand href="/dashboard">
    <img src="/logo.svg" alt="App" height={28} />
  </Navbar.Brand>
  <Navbar.Nav>
    <SearchInput placeholder="Search..." size="sm" style={{ width: 300 }} />
  </Navbar.Nav>
  <Navbar.Actions>
    <Button
      variant="ghost"
      iconOnly
      icon={<HelpCircle size={20} />}
      aria-label="Help"
    />
    <Button
      variant="ghost"
      iconOnly
      icon={<Bell size={20} />}
      aria-label="Notifications"
    />
    <Avatar src="/user.jpg" name="John Doe" size="sm" />
  </Navbar.Actions>
</Navbar>;
```

### Minimal Navbar

```tsx
import { Navbar, Button } from "@orion/react";

<Navbar bordered={false}>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Actions>
    <Button variant="ghost">Sign In</Button>
  </Navbar.Actions>
</Navbar>;
```

---

## Responsive Considerations

The Navbar component handles desktop layout. For mobile:

1. Use a hamburger menu button in `Navbar.Actions`
2. Open a `<Drawer>` for mobile navigation

```tsx
import { Navbar, Button, Drawer } from "@orion/react";
import { Menu } from "lucide-react";
import { useDisclosure, useIsMobile } from "@orion/react";

function ResponsiveNavbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useIsMobile();

  return (
    <>
      <Navbar>
        <Navbar.Brand href="/">Logo</Navbar.Brand>

        {!isMobile && (
          <Navbar.Nav>
            <Navbar.Link href="/features">Features</Navbar.Link>
            <Navbar.Link href="/pricing">Pricing</Navbar.Link>
          </Navbar.Nav>
        )}

        <Navbar.Actions>
          {isMobile ? (
            <Button
              variant="ghost"
              iconOnly
              icon={<Menu size={24} />}
              onClick={onOpen}
              aria-label="Open menu"
            />
          ) : (
            <>
              <Button variant="ghost">Sign In</Button>
              <Button>Get Started</Button>
            </>
          )}
        </Navbar.Actions>
      </Navbar>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <Drawer.Header>Menu</Drawer.Header>
        <Drawer.Body>
          <nav>
            <a href="/features">Features</a>
            <a href="/pricing">Pricing</a>
            <a href="/about">About</a>
          </nav>
        </Drawer.Body>
        <Drawer.Footer>
          <Button fullWidth>Get Started</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
}
```

---

## Anti-Patterns

### Glass Outside Display Mode

```tsx
// WRONG - Glass doesn't work in Product mode
<html data-mode="product">
  <Navbar variant="glass">...</Navbar>  // Will look broken
</html>

// CORRECT - Use solid in Product mode
<Navbar variant="solid">...</Navbar>
```

### Missing Brand

```tsx
// WRONG - No brand/logo
<Navbar>
  <Navbar.Nav>...</Navbar.Nav>
  <Navbar.Actions>...</Navbar.Actions>
</Navbar>

// CORRECT - Always include brand
<Navbar>
  <Navbar.Brand href="/">Logo</Navbar.Brand>
  <Navbar.Nav>...</Navbar.Nav>
</Navbar>
```

### Links Without href

```tsx
// WRONG - Missing href
<Navbar.Link>Features</Navbar.Link>

// CORRECT
<Navbar.Link href="/features">Features</Navbar.Link>
```

### Too Many Actions

```tsx
// WRONG - Cluttered
<Navbar.Actions>
  <Button>Action 1</Button>
  <Button>Action 2</Button>
  <Button>Action 3</Button>
  <Button>Action 4</Button>
</Navbar.Actions>

// CORRECT - Maximum 2-3 actions
<Navbar.Actions>
  <Button variant="ghost">Sign In</Button>
  <Button>Get Started</Button>
</Navbar.Actions>
```
