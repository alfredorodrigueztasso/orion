# AgentFolder Section

A specialized folder component designed specifically for organizing AI agents with native HTML5 drag & drop, collapsible content, sorting, and folder management.

## What is AgentFolder?

AgentFolder is a collapsible folder section that displays AI agents in a responsive grid layout. It provides:

- **Collapsible content** - Expand/collapse to show or hide agents
- **Drag & drop support** - Move agents between folders with visual feedback
- **Sort options** - Custom sorting via dropdown menu
- **Folder management** - Rename, delete, or invite participants
- **Empty state** - Graceful display when folder has no agents
- **Responsive design** - Adapts to different screen sizes

## When to Use AgentFolder

Use `AgentFolder` when:

- ✅ Organizing **AI agents** in a template like AgentWorkspace
- ✅ You want to leverage pre-built Spanish labels ("Agente", "Agentes", "Ordenar")
- ✅ You're building a feature that needs agent-specific behavior

## Basic Usage

```tsx
import { AgentFolder } from "@orion-ds/react";

export function MyAgentFolder() {
  const agents = [
    { id: "1", name: "Sales Agent", status: "online" },
    { id: "2", name: "Support Agent", status: "offline" },
  ];

  return (
    <AgentFolder
      id="folder-1"
      title="Customer Support"
      agentCount={agents.length}
      agents={agents}
      defaultExpanded={true}
    />
  );
}
```

## Props Reference

| Prop                | Type                                  | Default | Description                                           |
| ------------------- | ------------------------------------- | ------- | ----------------------------------------------------- |
| `id`                | `string`                              | —       | Unique folder identifier                              |
| `title`             | `string`                              | —       | Folder title/name                                     |
| `agentCount`        | `number`                              | —       | Number of agents (shown in badge)                     |
| `agents`            | `AgentCardProps[]`                    | —       | Array of agents to display                            |
| `defaultExpanded`   | `boolean`                             | `true`  | Initial expanded/collapsed state                      |
| `sortOptions`       | `SortOption[]`                        | —       | Available sort options                                |
| `selectedSort`      | `string`                              | —       | Currently selected sort value                         |
| `onSortChange`      | `(value: string) => void`             | —       | Called when sort selection changes                    |
| `onDrop`            | `(agentId, folderId, index?) => void` | —       | Called when agent is dropped in folder                |
| `onFolderEdit`      | `() => void`                          | —       | Called when rename action is clicked                  |
| `onFolderDelete`    | `() => void`                          | —       | Called when delete action is clicked                  |
| `onFolderInvite`    | `() => void`                          | —       | Called when invite action is clicked                  |
| `isDropTarget`      | `boolean`                             | `false` | Internal: folder is valid drop target (from @dnd-kit) |
| `isDropCompleted`   | `boolean`                             | `false` | Internal: successful drop micro-feedback              |
| `onDragEnter`       | `() => void`                          | —       | Internal: notify parent of drag enter                 |
| `onDragLeaveFolder` | `() => void`                          | —       | Internal: notify parent of drag leave                 |

## Drag & Drop

AgentFolder supports native HTML5 drag & drop with sophisticated visual feedback:

### Visual States

- **Drop target active**: Folder shows blue dashed border and soft background when dragging an agent over it
- **Insertion indicator**: Blue line with circular dot shows exactly where the agent will be inserted
- **Empty folder**: Centered insertion line appears in empty folders during drag

### Callbacks

AgentFolder notifies the parent container via callbacks to synchronize with `@dnd-kit`:

```tsx
<AgentFolder
  id="folder-1"
  // ... other props
  onDragEnter={() => {
    // Mark this folder as active drop target in parent state
    setActiveDropTarget(id);
  }}
  onDragLeaveFolder={() => {
    // Clear drop target state in parent
    setActiveDropTarget(null);
  }}
  onDrop={(agentId, folderId, insertionIndex) => {
    // Move agent from source folder to target folder
    moveAgent(agentId, folderId, insertionIndex);
  }}
/>
```

### Integration with AgentWorkspace

In `AgentWorkspace`, drag & drop is fully integrated:

```tsx
const [folders, setFolders] = useState(initialFolders);

const handleDrop = (
  agentId: string,
  targetFolderId: string,
  insertionIndex?: number,
) => {
  // Find source and target
  const sourceFolder = folders.find((f) =>
    f.agents.find((a) => a.id === agentId),
  );
  const targetFolder = folders.find((f) => f.id === targetFolderId);

  if (sourceFolder && targetFolder) {
    // Remove from source
    const agent = sourceFolder.agents.find((a) => a.id === agentId);
    sourceFolder.agents = sourceFolder.agents.filter((a) => a.id !== agentId);

    // Add to target at insertion index
    const targetIndex = insertionIndex ?? targetFolder.agents.length;
    targetFolder.agents.splice(targetIndex, 0, agent);

    // Update state
    setFolders([...folders]);
  }
};

return (
  <AgentWorkspace
    folders={folders.map((folder) => ({
      ...folder,
      onDrop: handleDrop,
    }))}
  />
);
```

## Sort Options

Add a sort dropdown by providing `sortOptions`:

```tsx
<AgentFolder
  // ... other props
  sortOptions={[
    { label: "Most Recent", value: "recent" },
    { label: "Alphabetical", value: "alpha" },
    { label: "Most Used", value: "used" },
  ]}
  selectedSort="recent"
  onSortChange={(value) => {
    console.log("Sorting by:", value);
    // Update agents array based on sort value
  }}
/>
```

## Folder Actions

Enable folder management actions (rename, delete, invite):

```tsx
<AgentFolder
  // ... other props
  onFolderEdit={() => {
    // Show modal to rename folder
    setRenameModalOpen(true);
  }}
  onFolderDelete={() => {
    // Delete folder
    deleteFolderById(id);
  }}
  onFolderInvite={() => {
    // Show invite dialog
    setInviteModalOpen(true);
  }}
/>
```

## Examples

### With AgentWorkspace

See [AgentWorkspace documentation](../../templates/app/AgentWorkspace/README.md) for complete examples.

### Custom Sort Handling

```tsx
const [selectedSort, setSelectedSort] = useState("recent");
const sortedAgents = useMemo(() => {
  const sorted = [...agents];
  if (selectedSort === "recent") {
    return sorted.sort((a, b) => b.createdAt - a.createdAt);
  }
  if (selectedSort === "alpha") {
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
  return sorted;
}, [agents, selectedSort]);

return (
  <AgentFolder
    // ... other props
    agents={sortedAgents}
    sortOptions={[
      { label: "Most Recent", value: "recent" },
      { label: "Alphabetical", value: "alpha" },
    ]}
    selectedSort={selectedSort}
    onSortChange={setSelectedSort}
  />
);
```

## Accessibility

- ✅ Keyboard navigable (Tab, Enter, Space)
- ✅ ARIA labels for all interactive elements
- ✅ Semantic HTML structure
- ✅ Focus visible states for keyboard users
- ✅ Respects `prefers-reduced-motion` setting

## Responsive Design

AgentFolder is fully responsive:

| Screen              | Grid Columns |
| ------------------- | ------------ |
| Desktop (>1200px)   | 3 columns    |
| Tablet (768-1200px) | 2 columns    |
| Mobile (<768px)     | 1 column     |

On mobile, the sort label and badge suffix are hidden to save space.

## Related Components

- [`AgentCard`](../../components/AgentCard/) - Individual agent card
- [`Collapsible`](../../components/Collapsible/) - Core collapsible component
- [`AgentWorkspace`](../../templates/app/AgentWorkspace/) - Complete agent organization template
