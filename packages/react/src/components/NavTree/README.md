# NavTree

A Notion-style hierarchical navigation sidebar with collapsible sections, folders, pages, and context menu actions. Features include localStorage persistence of expanded/collapsed states, hover actions for managing tree nodes, and full support for nested hierarchies.

## Quick Start

```tsx
import { NavTree } from "@orion-ds/react/blocks";
import { Home, BookOpen, FolderOpen } from "lucide-react";

const sections = [
  {
    id: "essentials",
    title: "Lo esencial",
    icon: <Home size={16} />,
    nodes: [
      {
        id: "dashboard",
        type: "page",
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        id: "docs",
        type: "folder",
        label: "Documentación",
        icon: <BookOpen size={16} />,
        children: [
          {
            id: "getting-started",
            type: "page",
            label: "Getting Started",
            href: "/docs/getting-started",
          },
        ],
      },
    ],
  },
];

export default function App() {
  const [activeNodeId, setActiveNodeId] = useState("dashboard");

  return (
    <NavTree
      sections={sections}
      activeNodeId={activeNodeId}
      onNodeClick={(node) => {
        setActiveNodeId(node.id);
        // Navigate to node.href
      }}
      actions={{
        onDelete: (nodeId) => console.log("Delete", nodeId),
      }}
    />
  );
}
```

## Props

### NavTreeProps

| Prop           | Type                           | Default            | Description                                                               |
| -------------- | ------------------------------ | ------------------ | ------------------------------------------------------------------------- |
| `sections`     | `NavTreeSection[]`             | -                  | Array of collapsible sections                                             |
| `activeNodeId` | `string?`                      | -                  | ID of the currently active/highlighted node                               |
| `onNodeClick`  | `(node: NavTreeNode) => void?` | -                  | Callback when a node row is clicked                                       |
| `actions`      | `NavTreeActionConfig?`         | -                  | Object containing action callbacks (onAdd, onRename, onDelete, etc.)      |
| `persistKey`   | `string`                       | `'orion-nav-tree'` | localStorage key prefix for persisting expanded/collapsed states          |
| `header`       | `ReactNode?`                   | -                  | Optional header slot (e.g. workspace logo, switcher)                      |
| `footer`       | `ReactNode?`                   | -                  | Optional footer slot (e.g. UserMenu)                                      |
| `width`        | `number \| string`             | `240`              | Sidebar width in pixels or CSS value (e.g. `"clamp(200px, 25vw, 320px)"`) |
| `className`    | `string?`                      | -                  | Additional CSS class for the root container                               |
| `headless`     | `boolean`                      | `false`            | Render root nodes directly without section headers                        |

### NavTreeSection

| Field             | Type                | Default  | Description                                                                                                     |
| ----------------- | ------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `id`              | `string`            | -        | Unique section identifier                                                                                       |
| `title`           | `string`            | -        | Section title (displayed in collapsible header)                                                                 |
| `icon`            | `ReactNode?`        | -        | Optional icon next to section title (16px recommended)                                                          |
| `badge`           | `number \| string?` | -        | Optional badge/counter displayed on section header                                                              |
| `variant`         | `'node' \| 'label'` | `'node'` | Section header visual style: `'node'` = dark 14px bold (matches folder style), `'label'` = light 10px uppercase |
| `nodes`           | `NavTreeNode[]`     | -        | Root-level nodes in this section                                                                                |
| `defaultExpanded` | `boolean`           | `true`   | Whether section is expanded by default                                                                          |

### NavTreeNode

| Field      | Type                 | Default | Description                                                                                        |
| ---------- | -------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `id`       | `string`             | -       | Unique identifier within the section                                                               |
| `type`     | `'page' \| 'folder'` | -       | Node type: `'page'` (leaf, not expandable) or `'folder'` (container, expandable if children exist) |
| `label`    | `string`             | -       | Display label                                                                                      |
| `icon`     | `ReactNode?`         | -       | Optional icon (16px for root level, 14px for nested pages recommended)                             |
| `href`     | `string?`            | -       | Optional navigation href (typically used for page nodes)                                           |
| `badge`    | `number \| string?`  | -       | Optional badge (e.g. unread count, item count)                                                     |
| `children` | `NavTreeNode[]?`     | -       | Child nodes (folders only, but not enforced)                                                       |

### NavTreeActionConfig

| Callback           | Type                                                     | Description                                                                   |
| ------------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `onAdd`            | `(parentId: string \| null, sectionId: string) => void?` | Add new node: `parentId` is null for root, `sectionId` identifies the section |
| `onRename`         | `(nodeId: string) => void?`                              | Rename a node                                                                 |
| `onDuplicate`      | `(nodeId: string) => void?`                              | Duplicate a node                                                              |
| `onMove`           | `(nodeId: string) => void?`                              | Move a node to a different location                                           |
| `onDelete`         | `(nodeId: string) => void?`                              | Delete a node                                                                 |
| `getCustomActions` | `(node: NavTreeNode) => DropdownItem[]?`                 | Get custom dropdown actions (merged with standard ones)                       |

## Features

### Icon-to-Chevron Swap

When you hover over a colapsable element (section with nodes, folder with children), the icon smoothly fades out and a chevron appears in its place. This is the Notion-style interaction for indicating which elements can be expanded/collapsed.

- **Section headers with icon**: icon fades to chevron on hover (if section has nodes)
- **Folder nodes with icon**: icon fades to chevron on hover (if folder has children)
- **Page nodes**: icon always visible (pages are not colapsable)
- **Nodes without icon**: chevron appears directly (no icon to swap)

### localStorage Persistence

All expanded/collapsed states are automatically persisted to localStorage under the key `${persistKey}-sections` and `${persistKey}-nodes`. Pass `persistKey="my-app-nav"` to customize the storage prefix.

### Header & Footer Slots

```tsx
<NavTree
  header={
    <div style={{ padding: "16px", textAlign: "center" }}>
      <img src="logo.png" alt="Logo" />
    </div>
  }
  footer={<UserMenu userName="John Doe" userEmail="john@example.com" />}
  sections={sections}
/>
```

### Headless Mode

Render root nodes directly without section headers:

```tsx
<NavTree
  headless={true}
  sections={sections}
  // Sections still exist for organization, but headers are hidden
  // Root nodes from all sections are rendered directly
/>
```

## Styling

All styling uses Orion semantic tokens for theme-aware light/dark mode support:

- Text colors: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-tertiary)`
- Backgrounds: `var(--surface-base)`, `var(--surface-subtle)`
- Borders: `var(--border-subtle)`, `var(--border-interactive)`
- Radius: `var(--radius-sm)`
- Spacing: `var(--spacing-*)` system

CSS is scoped via CSS Modules in `NavTree.module.css`.

## Examples

### With Avatar Icons (Agent Pattern)

```tsx
import { Avatar } from "@orion-ds/react/components";
import { Sparkles } from "lucide-react";

const sections = [
  {
    id: "agents",
    title: "Agentes IA",
    icon: <Sparkles size={16} />,
    nodes: [
      {
        id: "agent-1",
        type: "folder",
        label: "Marketing Bot",
        icon: <Avatar size="xs" initials="MB" />,
        children: [
          {
            id: "agent-1-edit",
            type: "page",
            label: "Edit",
            icon: <Edit2 size={14} />,
          },
          {
            id: "agent-1-metrics",
            type: "page",
            label: "Metrics",
            icon: <BarChart3 size={14} />,
          },
        ],
      },
    ],
  },
];
```

### With Badges

```tsx
const sections = [
  {
    id: "essentials",
    title: "Essentials",
    badge: 5, // Section-level badge
    nodes: [
      {
        id: "inbox",
        type: "page",
        label: "Inbox",
        badge: 3, // Node-level badge
      },
    ],
  },
];
```

### With Custom Actions

```tsx
<NavTree
  sections={sections}
  actions={{
    onAdd: (parentId, sectionId) => {
      console.log(
        `Add new node in section "${sectionId}" under parent "${parentId || "root"}"`,
      );
    },
    onDelete: (nodeId) => {
      console.log(`Delete node "${nodeId}"`);
    },
    getCustomActions: (node) => [
      {
        id: "export",
        label: "Export",
        icon: <Download size={14} />,
        onClick: () => console.log("Export", node.id),
      },
    ],
  }}
/>
```

## Related Components

- **[Collapsible](../../components/Collapsible/)** — Low-level collapsible component used internally
- **[Dropdown](../../components/Dropdown/)** — Context menu used for node actions
- **[Button](../../components/Button/)** — Hover action buttons (add, menu)
- **[Avatar](../../components/Avatar/)** — Recommended for agent/user icons

## Accessibility

- Full keyboard navigation (Tab, Enter, Space to toggle)
- Focus visible outlines (`outline: 2px solid var(--interactive-primary)`)
- ARIA attributes: `role="tree"`, `role="group"`, `role="treeitem"`
- Proper `aria-expanded` states on folders
- `aria-label` on icon-only buttons

## Responsive

NavTree works on all screen sizes:

- Desktop: full-height sidebar, default 240px width
- Tablet: smaller width or collapsible sidebar pattern
- Mobile: consider using `headless={true}` or a drawer pattern instead

Customize width with `width="clamp(200px, 25vw, 320px)"` for responsive sizing.
