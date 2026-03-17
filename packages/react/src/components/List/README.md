# List

Structured list of items with optional interactions.

## Props

| Prop           | Type                                   | Default      | Description               |
| -------------- | -------------------------------------- | ------------ | ------------------------- |
| `items`        | `ListItem[]`                           | **required** | List items                |
| `size`         | `'sm' \| 'md' \| 'lg'`                 | `'md'`       | Size variant              |
| `variant`      | `'default' \| 'bordered' \| 'divided'` | `'default'`  | Visual variant            |
| `interactive`  | `boolean`                              | `false`      | Enable hover/click states |
| `selectable`   | `boolean`                              | `false`      | Enable selection          |
| `onSelect`     | `(item: ListItem) => void`             | -            | Selection callback        |
| `renderItem`   | `(item, index) => ReactNode`           | -            | Custom item renderer      |
| `emptyContent` | `ReactNode`                            | -            | Empty state content       |

### ListItem

```ts
interface ListItem {
  id: string; // Unique identifier
  primary: ReactNode; // Main content
  secondary?: ReactNode; // Secondary text
  leading?: ReactNode; // Left content (icon/avatar)
  trailing?: ReactNode; // Right content
  disabled?: boolean; // Disabled state
  selected?: boolean; // Selected state
  onClick?: () => void; // Click handler
  className?: string; // Additional class
}
```

## Usage

### Basic

```tsx
import { List } from "@orion/react";

<List
  items={[
    { id: "1", primary: "Item 1" },
    { id: "2", primary: "Item 2" },
    { id: "3", primary: "Item 3" },
  ]}
/>;
```

### With Secondary Text

```tsx
<List
  items={[
    { id: "1", primary: "John Doe", secondary: "john@example.com" },
    { id: "2", primary: "Jane Smith", secondary: "jane@example.com" },
  ]}
/>
```

### With Icons/Avatars

```tsx
import { User, Mail, Settings } from 'lucide-react';

<List
  items={[
    { id: '1', primary: 'Profile', leading: <User size={20} /> },
    { id: '2', primary: 'Messages', leading: <Mail size={20} /> },
    { id: '3', primary: 'Settings', leading: <Settings size={20} /> },
  ]}
/>

// With avatars
<List
  items={users.map(user => ({
    id: user.id,
    primary: user.name,
    secondary: user.role,
    leading: <Avatar src={user.avatar} size="sm" />,
  }))}
/>
```

### With Trailing Content

```tsx
<List
  items={[
    {
      id: "1",
      primary: "Notifications",
      trailing: <Switch />,
    },
    {
      id: "2",
      primary: "Messages",
      trailing: <Badge variant="error">5</Badge>,
    },
    {
      id: "3",
      primary: "Storage",
      trailing: <span>75%</span>,
    },
  ]}
/>
```

### Interactive

```tsx
<List
  interactive
  items={[
    { id: "1", primary: "Edit profile", onClick: () => navigate("/profile") },
    { id: "2", primary: "Settings", onClick: () => navigate("/settings") },
    { id: "3", primary: "Sign out", onClick: handleSignOut },
  ]}
/>
```

### Selectable

```tsx
function SelectableList() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <List
      selectable
      items={items.map((item) => ({
        ...item,
        selected: item.id === selected,
      }))}
      onSelect={(item) => setSelected(item.id)}
    />
  );
}
```

### Variants

```tsx
// Default - no borders
<List variant="default" items={items} />

// Bordered - border around entire list
<List variant="bordered" items={items} />

// Divided - dividers between items
<List variant="divided" items={items} />
```

### Sizes

```tsx
<List size="sm" items={items} />  {/* Compact */}
<List size="md" items={items} />  {/* Default */}
<List size="lg" items={items} />  {/* Spacious */}
```

### Custom Render

```tsx
<List
  items={users}
  renderItem={(user, index) => (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <strong>{user.primary}</strong>
        <p>{user.secondary}</p>
      </div>
      <Button size="sm">View</Button>
    </div>
  )}
/>
```

### Empty State

```tsx
<List
  items={filteredItems}
  emptyContent={
    <EmptyState title="No items" description="Add items to see them here" />
  }
/>
```

## Tokens Used

- `--surface-base` - Background
- `--surface-subtle` - Hover/selected background
- `--border-subtle` - Borders/dividers
- `--text-primary` - Primary text
- `--text-secondary` - Secondary text
- `--spacing-3`, `--spacing-4` - Padding
- `--radius-control` - Border radius (bordered)

## Accessibility

- Uses `<ul>` and `<li>` semantic elements
- Interactive items are focusable
- `aria-selected` for selectable items
- `aria-disabled` for disabled items
- Keyboard navigation supported
