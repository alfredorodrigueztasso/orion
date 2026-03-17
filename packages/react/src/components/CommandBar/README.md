# CommandBar Section

> Command palette (Cmd+K) for quick navigation, search, and actions.

## Quick Start

```tsx
import { CommandBar, Button } from "@orion/react";
import { Home, Settings, Users, FileText, Search } from "lucide-react";
import { useState, useEffect } from "react";

function App() {
  const [open, setOpen] = useState(false);

  // Open with keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Search size={16} /> Search... <kbd>⌘K</kbd>
      </Button>

      <CommandBar
        open={open}
        onOpenChange={setOpen}
        commands={[
          {
            id: "home",
            label: "Go to Home",
            icon: <Home size={16} />,
            onSelect: () => navigate("/"),
          },
          {
            id: "settings",
            label: "Settings",
            icon: <Settings size={16} />,
            shortcut: "⌘,",
            onSelect: () => navigate("/settings"),
          },
          {
            id: "users",
            label: "Manage Users",
            icon: <Users size={16} />,
            category: "Admin",
            onSelect: () => navigate("/users"),
          },
        ]}
      />
    </>
  );
}
```

---

## Features

- **Fuzzy Search** — Find commands by label or keywords
- **Categories** — Group commands by category
- **Keyboard Shortcuts** — Display shortcut hints
- **Recent Commands** — Show recently used items
- **Keyboard Navigation** — Full arrow key support
- **Custom Footer** — Add help text or links
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface CommandBarProps {
  // State
  open: boolean; // REQUIRED - Open state
  onOpenChange: (open: boolean) => void; // REQUIRED - State change handler

  // Content
  commands: CommandItem[]; // REQUIRED - Array of commands
  recentCommands?: CommandItem[]; // Recent/pinned commands

  // Events
  onSelect?: (command: CommandItem) => void; // Selection callback

  // Customization
  placeholder?: string; // Search placeholder - default: "Type a command or search..."
  emptyMessage?: string; // No results message - default: "No results found."
  footer?: ReactNode; // Custom footer content
}

interface CommandItem {
  id: string; // Unique identifier
  label: string; // Display label
  description?: string; // Optional description
  icon?: ReactNode; // Icon element
  shortcut?: string; // Keyboard shortcut display
  category?: string; // Group/category
  onSelect: () => void; // Action callback
  disabled?: boolean; // Disabled state
  keywords?: string[]; // Additional search terms
}
```

---

## Command Items

### Basic Command

```tsx
{
  id: 'home',
  label: 'Go to Home',
  onSelect: () => navigate('/')
}
```

### With Icon

```tsx
import { Home } from 'lucide-react';

{
  id: 'home',
  label: 'Go to Home',
  icon: <Home size={16} />,
  onSelect: () => navigate('/')
}
```

### With Shortcut

```tsx
{
  id: 'settings',
  label: 'Open Settings',
  icon: <Settings size={16} />,
  shortcut: '⌘,',
  onSelect: () => navigate('/settings')
}
```

### With Description

```tsx
{
  id: 'new-project',
  label: 'Create New Project',
  description: 'Start a new project from scratch',
  icon: <Plus size={16} />,
  onSelect: () => openNewProjectModal()
}
```

### With Category

```tsx
{
  id: 'users',
  label: 'Manage Users',
  icon: <Users size={16} />,
  category: 'Admin',
  onSelect: () => navigate('/admin/users')
}
```

### With Keywords

```tsx
{
  id: 'theme',
  label: 'Toggle Dark Mode',
  icon: <Moon size={16} />,
  keywords: ['dark', 'light', 'theme', 'appearance', 'color'],
  onSelect: () => toggleTheme()
}
```

### Disabled Command

```tsx
{
  id: 'export',
  label: 'Export Data',
  icon: <Download size={16} />,
  disabled: true,  // Grayed out
  onSelect: () => {}
}
```

---

## Categories

Commands with the same `category` are grouped together.

```tsx
<CommandBar
  commands={[
    // Navigation (grouped)
    { id: "home", label: "Home", category: "Navigation", onSelect: () => {} },
    {
      id: "projects",
      label: "Projects",
      category: "Navigation",
      onSelect: () => {},
    },
    {
      id: "settings",
      label: "Settings",
      category: "Navigation",
      onSelect: () => {},
    },

    // Actions (grouped)
    { id: "new", label: "Create New", category: "Actions", onSelect: () => {} },
    { id: "import", label: "Import", category: "Actions", onSelect: () => {} },
    { id: "export", label: "Export", category: "Actions", onSelect: () => {} },

    // Admin (grouped)
    {
      id: "users",
      label: "Manage Users",
      category: "Admin",
      onSelect: () => {},
    },
    { id: "billing", label: "Billing", category: "Admin", onSelect: () => {} },
  ]}
/>
```

---

## Recent Commands

Show recently used commands at the top.

```tsx
const [recentCommands, setRecentCommands] = useState([]);

const handleSelect = (command) => {
  // Add to recent
  setRecentCommands((prev) =>
    [command, ...prev.filter((c) => c.id !== command.id)].slice(0, 5),
  );

  // Execute command
  command.onSelect();
};

<CommandBar
  commands={commands}
  recentCommands={recentCommands}
  onSelect={handleSelect}
/>;
```

---

## Custom Footer

```tsx
<CommandBar
  commands={commands}
  footer={
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.75rem",
        color: "var(--text-tertiary)",
      }}
    >
      <span>↑↓ Navigate</span>
      <span>↵ Select</span>
      <span>Esc Close</span>
    </div>
  }
/>
```

---

## Complete Examples

### Full Application Command Bar

```tsx
import { CommandBar } from "@orion/react";
import {
  Home,
  Settings,
  Users,
  FileText,
  Search,
  Plus,
  Download,
  Upload,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";

function AppCommandBar() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands = [
    // Navigation
    {
      id: "home",
      label: "Go to Dashboard",
      icon: <Home size={16} />,
      category: "Navigation",
      shortcut: "⌘H",
      onSelect: () => navigate("/"),
    },
    {
      id: "projects",
      label: "View Projects",
      icon: <FileText size={16} />,
      category: "Navigation",
      onSelect: () => navigate("/projects"),
    },
    {
      id: "settings",
      label: "Open Settings",
      icon: <Settings size={16} />,
      category: "Navigation",
      shortcut: "⌘,",
      onSelect: () => navigate("/settings"),
    },

    // Quick Actions
    {
      id: "new-project",
      label: "Create New Project",
      description: "Start a fresh project",
      icon: <Plus size={16} />,
      category: "Actions",
      shortcut: "⌘N",
      onSelect: () => openNewProjectModal(),
    },
    {
      id: "import",
      label: "Import Data",
      icon: <Upload size={16} />,
      category: "Actions",
      onSelect: () => openImportModal(),
    },
    {
      id: "export",
      label: "Export Data",
      icon: <Download size={16} />,
      category: "Actions",
      onSelect: () => exportData(),
    },

    // Appearance
    {
      id: "theme",
      label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      category: "Appearance",
      keywords: ["dark", "light", "theme", "mode"],
      onSelect: toggleTheme,
    },

    // Account
    {
      id: "logout",
      label: "Sign Out",
      icon: <LogOut size={16} />,
      category: "Account",
      onSelect: () => signOut(),
    },
  ];

  return (
    <CommandBar
      open={open}
      onOpenChange={setOpen}
      commands={commands}
      placeholder="Search commands..."
      footer={
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-4)",
            fontSize: "0.75rem",
          }}
        >
          <span>
            <kbd>↑↓</kbd> Navigate
          </span>
          <span>
            <kbd>↵</kbd> Select
          </span>
          <span>
            <kbd>Esc</kbd> Close
          </span>
        </div>
      }
    />
  );
}
```

### Search-Focused Command Bar

```tsx
const searchCommands = useMemo(() => {
  return [
    // Pages/content that can be searched
    ...pages.map((page) => ({
      id: `page-${page.id}`,
      label: page.title,
      description: page.excerpt,
      icon: <FileText size={16} />,
      category: "Pages",
      keywords: page.tags,
      onSelect: () => navigate(`/page/${page.slug}`),
    })),

    // Users
    ...users.map((user) => ({
      id: `user-${user.id}`,
      label: user.name,
      description: user.email,
      icon: <User size={16} />,
      category: "Users",
      onSelect: () => navigate(`/users/${user.id}`),
    })),
  ];
}, [pages, users]);

<CommandBar
  open={open}
  onOpenChange={setOpen}
  commands={searchCommands}
  placeholder="Search pages, users..."
/>;
```

---

## Accessibility

- Modal has proper ARIA attributes
- Focus trapped within command bar
- Keyboard navigation (↑↓ to navigate, Enter to select, Esc to close)
- Search input is properly labeled
- Selected item announced to screen readers

```tsx
// Good: Descriptive labels
{ id: 'settings', label: 'Open Account Settings' }

// Avoid: Vague labels
{ id: 'settings', label: 'Settings' }  // Settings what?
```

---

## Anti-Patterns

### Too Many Commands

```tsx
// WRONG - 50+ commands without organization
<CommandBar commands={[...fiftyCommands]} />

// CORRECT - Organized with categories
<CommandBar
  commands={commands.map(cmd => ({
    ...cmd,
    category: cmd.section  // Group by category
  }))}
/>
```

### Missing onSelect

```tsx
// WRONG - Command does nothing
{ id: 'home', label: 'Home' }

// CORRECT - Always include action
{ id: 'home', label: 'Home', onSelect: () => navigate('/') }
```

### Duplicate Shortcuts

```tsx
// WRONG - Same shortcut for multiple commands
commands={[
  { id: 'save', label: 'Save', shortcut: '⌘S', onSelect: () => {} },
  { id: 'settings', label: 'Settings', shortcut: '⌘S', onSelect: () => {} }  // Conflict!
]}

// CORRECT - Unique shortcuts
commands={[
  { id: 'save', label: 'Save', shortcut: '⌘S', onSelect: () => {} },
  { id: 'settings', label: 'Settings', shortcut: '⌘,', onSelect: () => {} }
]}
```

---

## When to Use CommandBar

| Scenario          | Recommendation                      |
| ----------------- | ----------------------------------- |
| Power users       | Yes - keyboard-first navigation     |
| Complex apps      | Yes - quick access to deep features |
| Search-heavy apps | Yes - unified search experience     |
| Admin dashboards  | Yes - quick actions                 |

## When NOT to Use CommandBar

| Scenario             | Use Instead                    |
| -------------------- | ------------------------------ |
| Simple apps          | Standard navigation            |
| Mobile-first         | Bottom sheet or menu           |
| First-time users     | Guided UI with visible buttons |
| Single-purpose pages | Direct navigation              |

---

## Related Components

- **[Sidebar](../Sidebar/README.md)** — Persistent navigation
- **[PageHeader](../PageHeader/README.md)** — Page-level navigation
- **[Navbar](../../components/Navbar/README.md)** — Top navigation
- **[Modal](../../components/Modal/README.md)** — Modal component
