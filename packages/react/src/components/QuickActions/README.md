# QuickActions Section

> Floating action button (FAB) or action bar for quick access to common actions.

## Quick Start

```tsx
import { QuickActions } from "@orion/react";
import { Plus, Upload, Download, Share } from "lucide-react";

<QuickActions
  variant="fab"
  actions={[
    {
      id: "new",
      label: "New Item",
      icon: <Plus size={20} />,
      onClick: () => openNewModal(),
    },
    {
      id: "upload",
      label: "Upload",
      icon: <Upload size={20} />,
      onClick: () => openUpload(),
    },
    {
      id: "download",
      label: "Download",
      icon: <Download size={20} />,
      onClick: () => startDownload(),
    },
    {
      id: "share",
      label: "Share",
      icon: <Share size={20} />,
      onClick: () => openShare(),
    },
  ]}
/>;
```

---

## Features

- **3 Variants** — FAB (expandable), Bar, Menu
- **5 Positions** — Bottom-right, bottom-left, bottom-center, top-right, top-left
- **Primary Action** — Highlighted main action for FAB
- **Keyboard Shortcuts** — Optional shortcut display
- **Fixed Position** — Stays visible while scrolling
- **Custom Offset** — Adjustable edge distance
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface QuickActionsProps {
  // Content
  actions: QuickAction[]; // REQUIRED - Action items

  // Display
  variant?: "fab" | "bar" | "menu"; // default: 'fab'
  position?:
    | "bottom-right"
    | "bottom-left"
    | "bottom-center"
    | "top-right"
    | "top-left"; // default: 'bottom-right'

  // FAB-specific
  primaryAction?: QuickAction; // Main action (shown when collapsed)
  triggerIcon?: ReactNode; // Custom trigger icon

  // Behavior
  showLabels?: boolean; // Show action labels
  fixed?: boolean; // Fixed position - default: true
  offset?: number; // Edge offset in px - default: 24
}

interface QuickAction {
  id: string; // Unique identifier
  label: string; // Action label
  icon: ReactNode; // REQUIRED - Action icon
  onClick: () => void; // REQUIRED - Click handler
  shortcut?: string; // Keyboard shortcut display
  disabled?: boolean; // Disabled state
  variant?: "default" | "primary" | "danger"; // Action style
}
```

---

## Variants

### `variant="fab"` (Default)

Floating action button that expands to show actions.

```tsx
<QuickActions
  variant="fab"
  actions={[
    { id: "new", label: "New", icon: <Plus size={20} />, onClick: create },
    {
      id: "upload",
      label: "Upload",
      icon: <Upload size={20} />,
      onClick: upload,
    },
  ]}
/>
```

### `variant="bar"`

Horizontal action bar.

```tsx
<QuickActions
  variant="bar"
  showLabels
  actions={[
    { id: "new", label: "New", icon: <Plus size={20} />, onClick: create },
    {
      id: "upload",
      label: "Upload",
      icon: <Upload size={20} />,
      onClick: upload,
    },
    {
      id: "download",
      label: "Download",
      icon: <Download size={20} />,
      onClick: download,
    },
  ]}
/>
```

### `variant="menu"`

Vertical menu style.

```tsx
<QuickActions
  variant="menu"
  actions={[
    { id: "new", label: "New Item", icon: <Plus size={20} />, onClick: create },
    {
      id: "import",
      label: "Import",
      icon: <Upload size={20} />,
      onClick: importData,
    },
    {
      id: "export",
      label: "Export",
      icon: <Download size={20} />,
      onClick: exportData,
    },
  ]}
/>
```

---

## Positions

```tsx
// Bottom-right (default)
<QuickActions position="bottom-right" ... />

// Bottom-left
<QuickActions position="bottom-left" ... />

// Bottom-center
<QuickActions position="bottom-center" ... />

// Top-right
<QuickActions position="top-right" ... />

// Top-left
<QuickActions position="top-left" ... />
```

---

## Primary Action

Set a primary action that's shown when FAB is collapsed.

```tsx
<QuickActions
  variant="fab"
  primaryAction={{
    id: "create",
    label: "Create",
    icon: <Plus size={24} />,
    onClick: () => openCreateModal(),
    variant: "primary",
  }}
  actions={[
    {
      id: "upload",
      label: "Upload File",
      icon: <Upload size={20} />,
      onClick: upload,
    },
    {
      id: "import",
      label: "Import Data",
      icon: <FileUp size={20} />,
      onClick: importData,
    },
  ]}
/>
```

---

## Custom Trigger Icon

```tsx
<QuickActions
  variant="fab"
  triggerIcon={<Menu size={24} />}
  actions={actions}
/>
```

---

## Action Variants

### Default Action

```tsx
{ id: 'edit', label: 'Edit', icon: <Edit size={20} />, onClick: edit, variant: 'default' }
```

### Primary Action

```tsx
{ id: 'save', label: 'Save', icon: <Check size={20} />, onClick: save, variant: 'primary' }
```

### Danger Action

```tsx
{ id: 'delete', label: 'Delete', icon: <Trash size={20} />, onClick: confirmDelete, variant: 'danger' }
```

---

## Keyboard Shortcuts

Display keyboard shortcuts alongside actions.

```tsx
<QuickActions
  actions={[
    {
      id: "new",
      label: "New",
      icon: <Plus size={20} />,
      onClick: create,
      shortcut: "⌘N",
    },
    {
      id: "save",
      label: "Save",
      icon: <Save size={20} />,
      onClick: save,
      shortcut: "⌘S",
    },
    {
      id: "search",
      label: "Search",
      icon: <Search size={20} />,
      onClick: search,
      shortcut: "⌘K",
    },
  ]}
/>
```

---

## Complete Examples

### Document Editor FAB

```tsx
import { QuickActions } from "@orion/react";
import { Plus, FileText, Image, Table, Link } from "lucide-react";

<QuickActions
  variant="fab"
  position="bottom-right"
  primaryAction={{
    id: "add",
    label: "Add Block",
    icon: <Plus size={24} />,
    onClick: () => {},
    variant: "primary",
  }}
  actions={[
    {
      id: "text",
      label: "Text Block",
      icon: <FileText size={20} />,
      onClick: addText,
    },
    {
      id: "image",
      label: "Image",
      icon: <Image size={20} />,
      onClick: addImage,
    },
    {
      id: "table",
      label: "Table",
      icon: <Table size={20} />,
      onClick: addTable,
    },
    {
      id: "link",
      label: "Embed Link",
      icon: <Link size={20} />,
      onClick: addEmbed,
    },
  ]}
/>;
```

### Dashboard Action Bar

```tsx
<QuickActions
  variant="bar"
  position="bottom-center"
  showLabels
  actions={[
    {
      id: "filter",
      label: "Filter",
      icon: <Filter size={20} />,
      onClick: openFilters,
    },
    {
      id: "export",
      label: "Export",
      icon: <Download size={20} />,
      onClick: exportData,
    },
    {
      id: "share",
      label: "Share",
      icon: <Share size={20} />,
      onClick: shareReport,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      onClick: openSettings,
    },
  ]}
/>
```

### Content Creation Menu

```tsx
<QuickActions
  variant="menu"
  position="bottom-right"
  actions={[
    {
      id: "post",
      label: "Create Post",
      icon: <PenSquare size={20} />,
      onClick: newPost,
      shortcut: "⌘P",
    },
    {
      id: "story",
      label: "Add Story",
      icon: <BookOpen size={20} />,
      onClick: newStory,
      shortcut: "⌘S",
    },
    {
      id: "reel",
      label: "Create Reel",
      icon: <Video size={20} />,
      onClick: newReel,
    },
    {
      id: "live",
      label: "Go Live",
      icon: <Radio size={20} />,
      onClick: goLive,
      variant: "primary",
    },
  ]}
/>
```

### File Manager Actions

```tsx
<QuickActions
  variant="fab"
  position="bottom-right"
  offset={32}
  actions={[
    {
      id: "upload",
      label: "Upload Files",
      icon: <Upload size={20} />,
      onClick: upload,
    },
    {
      id: "folder",
      label: "New Folder",
      icon: <FolderPlus size={20} />,
      onClick: newFolder,
    },
    {
      id: "scan",
      label: "Scan Document",
      icon: <Scan size={20} />,
      onClick: scan,
    },
  ]}
/>
```

### Mobile-Style Bottom Bar

```tsx
<QuickActions
  variant="bar"
  position="bottom-center"
  fixed
  showLabels
  actions={[
    { id: "home", label: "Home", icon: <Home size={20} />, onClick: goHome },
    {
      id: "search",
      label: "Search",
      icon: <Search size={20} />,
      onClick: openSearch,
    },
    {
      id: "add",
      label: "Add",
      icon: <Plus size={20} />,
      onClick: create,
      variant: "primary",
    },
    {
      id: "inbox",
      label: "Inbox",
      icon: <Inbox size={20} />,
      onClick: goInbox,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
      onClick: goProfile,
    },
  ]}
/>
```

---

## Accessibility

- FAB trigger has accessible label
- Actions are keyboard navigable
- Expanded state announced to screen readers
- Disabled actions properly marked
- Escape closes expanded FAB

```tsx
// Good: Descriptive action labels
{
  label: "Create New Document";
}

// Avoid: Icon-only without aria-label
{
  label: "";
} // Screen reader can't announce
```

---

## Anti-Patterns

### Too Many Actions

```tsx
// WRONG - 10 actions in FAB
<QuickActions actions={[...tenActions]} />

// CORRECT - Limit to 4-5 most important actions
<QuickActions actions={topFiveActions} />
// Or use menu variant for more options
```

### Missing onClick

```tsx
// WRONG - Action does nothing
{ id: 'save', label: 'Save', icon: <Save size={20} /> }

// CORRECT - Always include handler
{ id: 'save', label: 'Save', icon: <Save size={20} />, onClick: saveDocument }
```

### Overlapping with Content

```tsx
// WRONG - FAB covers important content
<QuickActions position="bottom-right" offset={0} />

// CORRECT - Appropriate offset
<QuickActions position="bottom-right" offset={24} />
// Or ensure content has bottom padding
```

### All Actions Same Importance

```tsx
// WRONG - No visual hierarchy
<QuickActions
  actions={[
    { ...action1 },
    { ...action2 },
    { ...action3 }  // Which is primary?
  ]}
/>

// CORRECT - Highlight primary action
<QuickActions
  primaryAction={{ ...createAction, variant: 'primary' }}
  actions={[...secondaryActions]}
/>
```

---

## When to Use QuickActions

| Scenario        | Recommendation           |
| --------------- | ------------------------ |
| Document editor | FAB with add options     |
| Dashboard       | Bar with common actions  |
| Content app     | Menu with create options |
| Mobile web      | Bottom bar               |

## When NOT to Use QuickActions

| Scenario           | Use Instead        |
| ------------------ | ------------------ |
| Navigation         | Navbar or sidebar  |
| Form actions       | Form submit button |
| Context actions    | Dropdown menu      |
| Page-level actions | PageHeader actions |

---

## Related Components

- **[PageHeader](../PageHeader/README.md)** — Page actions
- **[CommandBar](../CommandBar/README.md)** — Keyboard command palette
- **[Button](../../components/Button/README.md)** — Standard buttons
- **[Dropdown](../../components/Dropdown/README.md)** — Menu dropdowns
