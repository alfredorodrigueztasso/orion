# CollapsibleFolder

A generic collapsible container for organizing items with drag-and-drop support, sorting, and folder management actions.

## When to Use

| Scenario                            | Use CollapsibleFolder                        |
| ----------------------------------- | -------------------------------------------- |
| Organizing items into folders       | ✅ Yes - supports any item type via generics |
| Drag-and-drop file/item management  | ✅ Yes - built-in @dnd-kit integration       |
| Agent/project grouping with sorting | ✅ Yes - includes sort options               |
| Simple show/hide content            | ❌ No - use Collapsible instead              |
| Nested folder trees                 | ❌ No - use NavTree instead                  |

## Props Reference

| Prop            | Type                               | Default                   | Description                    |
| --------------- | ---------------------------------- | ------------------------- | ------------------------------ |
| id              | string                             | —                         | Unique folder identifier       |
| title           | string                             | —                         | Folder title                   |
| itemCount       | number                             | —                         | Number of items in folder      |
| items           | TItem[]                            | —                         | Array of items to display      |
| renderItem      | (item, index) => ReactNode         | —                         | Render function for each item  |
| itemLabel       | string                             | 'Item'                    | Singular label for items       |
| itemLabelPlural | string                             | 'Items'                   | Plural label for items         |
| emptyText       | string                             | 'No items in this folder' | Empty state message            |
| defaultExpanded | boolean                            | true                      | Default expanded state         |
| sortOptions     | SortOption[]                       | —                         | Available sort options         |
| selectedSort    | string                             | —                         | Currently selected sort value  |
| onSortChange    | (value: string) => void            | —                         | Sort change handler            |
| onDrop          | (itemId, folderId, index?) => void | —                         | Drop handler for drag-and-drop |
| onFolderEdit    | () => void                         | —                         | Rename folder handler          |
| onFolderDelete  | () => void                         | —                         | Delete folder handler          |
| onFolderInvite  | () => void                         | —                         | Invite participants handler    |

## Examples

### Basic Usage

```tsx
import { CollapsibleFolder } from "@orion-ds/react/dnd";

<CollapsibleFolder
  id="folder-1"
  title="Documents"
  itemCount={files.length}
  items={files}
  itemLabel="File"
  itemLabelPlural="Files"
  emptyText="No files in this folder"
  renderItem={(file) => <FileCard key={file.id} {...file} />}
/>;
```

### With Sorting and Actions

```tsx
<CollapsibleFolder
  id="folder-2"
  title="Projects"
  itemCount={projects.length}
  items={projects}
  renderItem={(project) => <ProjectCard {...project} />}
  sortOptions={[
    { label: "Name", value: "name" },
    { label: "Date", value: "date" },
  ]}
  selectedSort="name"
  onSortChange={handleSort}
  onFolderEdit={() => setEditing(true)}
  onFolderDelete={() => confirmDelete()}
  onDrop={handleDrop}
/>
```

## Accessibility

- Folder header is keyboard navigable
- Expand/collapse with Enter or Space
- Drag-and-drop uses @dnd-kit accessibility features
- Screen reader announces item count

## Token Usage

- `--surface-subtle` — Folder background
- `--border-subtle` — Folder border
- `--text-primary` — Title text
- `--text-secondary` — Item count badge
- `--spacing-4` — Internal padding
- `--radius-container` — Folder border radius
