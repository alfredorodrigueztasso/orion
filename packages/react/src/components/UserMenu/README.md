# UserMenu Section

> User profile dropdown menu for account actions and navigation.

## Quick Start

```tsx
import { UserMenu } from "@orion/react";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

<UserMenu
  user={{
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/john.jpg",
  }}
  sections={[
    {
      id: "account",
      items: [
        {
          id: "profile",
          label: "Profile",
          icon: <User size={16} />,
          href: "/profile",
        },
        {
          id: "settings",
          label: "Settings",
          icon: <Settings size={16} />,
          href: "/settings",
        },
      ],
    },
    {
      id: "support",
      items: [
        {
          id: "help",
          label: "Help Center",
          icon: <HelpCircle size={16} />,
          href: "/help",
        },
      ],
    },
    {
      id: "actions",
      items: [
        {
          id: "logout",
          label: "Sign out",
          icon: <LogOut size={16} />,
          onClick: handleLogout,
          danger: true,
        },
      ],
    },
  ]}
/>;
```

---

## Features

- **User Info Header** — Name, email, avatar display
- **Status Indicator** — Online, away, busy, offline
- **Section Groups** — Organize menu items
- **Icons & Labels** — Visual menu items
- **Danger Actions** — Highlighted destructive actions
- **Custom Trigger** — Customizable trigger button
- **Controlled State** — Open/close programmatically
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface UserMenuProps {
  // User Info
  user: UserInfo; // REQUIRED - User data

  // Menu Content
  sections: UserMenuSection[]; // REQUIRED - Menu sections

  // State
  open?: boolean; // Controlled open state
  onOpenChange?: (open: boolean) => void;

  // Display
  trigger?: ReactNode; // Custom trigger element
  align?: "start" | "end"; // Menu alignment - default: 'end'
  showHeader?: boolean; // Show user info - default: true
  compact?: boolean; // Compact trigger - default: false
}

interface UserInfo {
  name: string; // Display name
  email?: string; // Email address
  avatar?: string; // Avatar URL
  initials?: string; // Fallback initials
  status?: "online" | "away" | "busy" | "offline";
  role?: string; // Role or subscription tier
}

interface UserMenuSection {
  id: string; // Section ID
  label?: string; // Optional section label
  items: UserMenuItem[]; // Menu items
}

interface UserMenuItem {
  id: string; // Item ID
  label: string; // Display label
  icon?: ReactNode; // Optional icon
  href?: string; // Navigation URL
  onClick?: () => void; // Click handler
  danger?: boolean; // Danger styling
  disabled?: boolean; // Disabled state
}
```

---

## User Info Configuration

### Basic User

```tsx
user={{
  name: 'John Doe',
  email: 'john@example.com'
}}
```

### With Avatar

```tsx
user={{
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/john.jpg'
}}
```

### With Initials Fallback

```tsx
user={{
  name: 'John Doe',
  email: 'john@example.com',
  initials: 'JD'  // Shown when no avatar
}}
```

### With Status

```tsx
user={{
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/john.jpg',
  status: 'online'  // 'online' | 'away' | 'busy' | 'offline'
}}
```

### With Role

```tsx
user={{
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/avatars/john.jpg',
  role: 'Pro Member'
}}
```

---

## Menu Sections

### Single Section

```tsx
sections={[
  {
    id: 'main',
    items: [
      { id: 'profile', label: 'Profile', href: '/profile' },
      { id: 'settings', label: 'Settings', href: '/settings' },
      { id: 'logout', label: 'Sign out', onClick: logout }
    ]
  }
]}
```

### Multiple Sections

```tsx
sections={[
  {
    id: 'account',
    label: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: <User size={16} />, href: '/profile' },
      { id: 'settings', label: 'Settings', icon: <Settings size={16} />, href: '/settings' }
    ]
  },
  {
    id: 'support',
    label: 'Support',
    items: [
      { id: 'help', label: 'Help Center', icon: <HelpCircle size={16} />, href: '/help' },
      { id: 'feedback', label: 'Send Feedback', icon: <MessageSquare size={16} />, onClick: openFeedback }
    ]
  },
  {
    id: 'actions',
    items: [
      { id: 'logout', label: 'Sign out', icon: <LogOut size={16} />, onClick: logout, danger: true }
    ]
  }
]}
```

---

## Menu Items

### With Icon

```tsx
{ id: 'profile', label: 'Profile', icon: <User size={16} />, href: '/profile' }
```

### With Click Handler

```tsx
{ id: 'theme', label: 'Toggle Dark Mode', icon: <Moon size={16} />, onClick: toggleTheme }
```

### Danger Action

```tsx
{ id: 'delete', label: 'Delete Account', icon: <Trash size={16} />, onClick: confirmDelete, danger: true }
```

### Disabled Item

```tsx
{ id: 'premium', label: 'Premium Features', icon: <Crown size={16} />, disabled: true }
```

---

## Custom Trigger

```tsx
<UserMenu
  user={user}
  sections={sections}
  trigger={
    <Button variant="ghost" size="sm">
      <Avatar src={user.avatar} size="sm" />
      <span>{user.name}</span>
      <ChevronDown size={16} />
    </Button>
  }
/>
```

---

## Controlled State

```tsx
const [isOpen, setIsOpen] = useState(false);

<UserMenu
  user={user}
  sections={sections}
  open={isOpen}
  onOpenChange={setIsOpen}
/>;
```

---

## Complete Examples

### Full Featured User Menu

```tsx
import { UserMenu, Badge } from "@orion/react";
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  MessageSquare,
  Moon,
  LogOut,
} from "lucide-react";

function AppHeader() {
  const { user, logout, toggleTheme } = useAuth();

  return (
    <UserMenu
      user={{
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        status: "online",
        role: user.isPro ? "Pro" : "Free",
      }}
      sections={[
        {
          id: "account",
          items: [
            {
              id: "profile",
              label: "Your Profile",
              icon: <User size={16} />,
              href: "/profile",
            },
            {
              id: "settings",
              label: "Settings",
              icon: <Settings size={16} />,
              href: "/settings",
            },
            {
              id: "billing",
              label: "Billing",
              icon: <CreditCard size={16} />,
              href: "/billing",
            },
          ],
        },
        {
          id: "preferences",
          items: [
            {
              id: "theme",
              label: "Dark Mode",
              icon: <Moon size={16} />,
              onClick: toggleTheme,
            },
          ],
        },
        {
          id: "support",
          items: [
            {
              id: "help",
              label: "Help & Support",
              icon: <HelpCircle size={16} />,
              href: "/help",
            },
            {
              id: "feedback",
              label: "Send Feedback",
              icon: <MessageSquare size={16} />,
              onClick: openFeedback,
            },
          ],
        },
        {
          id: "actions",
          items: [
            {
              id: "logout",
              label: "Sign out",
              icon: <LogOut size={16} />,
              onClick: logout,
              danger: true,
            },
          ],
        },
      ]}
      showHeader
      align="end"
    />
  );
}
```

### Compact Navbar Menu

```tsx
<UserMenu
  user={{
    name: user.name,
    avatar: user.avatar,
    initials: user.initials,
  }}
  compact
  showHeader={false}
  sections={[
    {
      id: "main",
      items: [
        { id: "profile", label: "Profile", href: "/profile" },
        { id: "logout", label: "Sign out", onClick: logout },
      ],
    },
  ]}
/>
```

### Admin User Menu

```tsx
<UserMenu
  user={{
    name: "Admin User",
    email: "admin@company.com",
    avatar: "/avatars/admin.jpg",
    role: "Administrator",
    status: "online",
  }}
  sections={[
    {
      id: "account",
      label: "Account",
      items: [
        { id: "profile", label: "My Profile", icon: <User size={16} /> },
        { id: "settings", label: "Preferences", icon: <Settings size={16} /> },
      ],
    },
    {
      id: "admin",
      label: "Admin",
      items: [
        {
          id: "dashboard",
          label: "Admin Dashboard",
          icon: <LayoutDashboard size={16} />,
          href: "/admin",
        },
        {
          id: "users",
          label: "Manage Users",
          icon: <Users size={16} />,
          href: "/admin/users",
        },
        {
          id: "logs",
          label: "Audit Logs",
          icon: <FileText size={16} />,
          href: "/admin/logs",
        },
      ],
    },
    {
      id: "actions",
      items: [
        {
          id: "logout",
          label: "Sign out",
          icon: <LogOut size={16} />,
          onClick: logout,
          danger: true,
        },
      ],
    },
  ]}
/>
```

### Team Switcher Menu

```tsx
<UserMenu
  user={{
    name: currentTeam.name,
    avatar: currentTeam.logo,
    role: `${teams.length} teams`,
  }}
  trigger={
    <Button variant="ghost">
      <Avatar src={currentTeam.logo} size="sm" />
      {currentTeam.name}
      <ChevronsUpDown size={16} />
    </Button>
  }
  sections={[
    {
      id: "teams",
      label: "Switch Team",
      items: teams.map((team) => ({
        id: team.id,
        label: team.name,
        icon: <Avatar src={team.logo} size="xs" />,
        onClick: () => switchTeam(team.id),
      })),
    },
    {
      id: "actions",
      items: [
        {
          id: "create",
          label: "Create Team",
          icon: <Plus size={16} />,
          onClick: createTeam,
        },
      ],
    },
  ]}
/>
```

---

## Accessibility

- Menu uses proper ARIA menu pattern
- Trigger has aria-expanded state
- Items are keyboard navigable
- Focus trapped in open menu
- Escape closes menu

```tsx
// Good: Descriptive menu labels
{
  label: "Account Settings";
}

// Avoid: Vague labels
{
  label: "Settings";
} // Settings for what?
```

---

## Anti-Patterns

### Too Many Items

```tsx
// WRONG - 20 menu items overwhelming
sections={[
  { id: 'all', items: [...twentyItems] }
]}

// CORRECT - Group into sections or link to pages
sections={[
  { id: 'quick', label: 'Quick Access', items: topFiveItems },
  { id: 'more', items: [{ id: 'all', label: 'All Settings', href: '/settings' }] }
]}
```

### Missing Sign Out

```tsx
// WRONG - No way to sign out
sections={[
  { id: 'account', items: [profile, settings] }
]}

// CORRECT - Always include sign out
sections={[
  { id: 'account', items: [profile, settings] },
  { id: 'actions', items: [{ id: 'logout', label: 'Sign out', danger: true, onClick: logout }] }
]}
```

### No User Context

```tsx
// WRONG - Generic trigger, no user info
<UserMenu
  user={{ name: 'User' }}
  showHeader={false}
  ...
/>

// CORRECT - Show who is signed in
<UserMenu
  user={{ name: 'John Doe', email: 'john@example.com', avatar: '...' }}
  showHeader={true}
  ...
/>
```

---

## When to Use UserMenu

| Scenario         | Recommendation              |
| ---------------- | --------------------------- |
| App navbar       | Full featured with sections |
| Dashboard header | With status indicator       |
| Admin panel      | With admin actions          |
| Mobile nav       | Compact with essentials     |

## When NOT to Use UserMenu

| Scenario        | Use Instead       |
| --------------- | ----------------- |
| Anonymous users | Sign In button    |
| Settings page   | SettingsLayout    |
| Navigation menu | Sidebar or navbar |
| Action menu     | Dropdown menu     |

---

## Related Components

- **[Sidebar](../Sidebar/README.md)** — App sidebar navigation
- **[Navbar](../../components/Navbar/README.md)** — Top navigation bar
- **[Dropdown](../../components/Dropdown/README.md)** — Generic dropdown
- **[Avatar](../../components/Avatar/README.md)** — User avatar
