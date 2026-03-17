# Command

A searchable command palette with keyboard navigation, similar to VS Code or Linear command menus. Uses compound components for flexible composition.

## When to Use

| Scenario | Use Command |
|----------|-------------|
| Global command palette (Cmd+K) | ✅ Yes - use Command.Dialog |
| Searchable action menu | ✅ Yes - filters items as you type |
| Inline command list | ✅ Yes - embeds directly in page |
| Simple dropdown selection | ❌ No - use Select or Combobox instead |
| Navigation menu | ❌ No - use Navbar or Sidebar instead |

## Props Reference

### Command (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | — | Controlled search value |
| onValueChange | (value: string) => void | — | Search value change callback |
| filter | (value, search) => number | — | Custom filter function (0=hide, 1=show) |
| children | ReactNode | — | Compound components |
| className | string | — | Additional class name |

### Command.Dialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | — | Whether dialog is open |
| onOpenChange | (open: boolean) => void | — | Open state change callback |

### Command.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| onSelect | () => void | — | Callback when item is selected |
| disabled | boolean | false | Whether item is disabled |
| value | string | — | Search value for filtering |

### Command.Group

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| heading | string | — | Group heading text |

## Examples

### Command Dialog (Cmd+K)

```tsx
import { Command } from "@orion-ds/react";

<Command.Dialog open={open} onOpenChange={setOpen}>
  <Command.Input placeholder="Type a command..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Actions">
      <Command.Item onSelect={handleNew}>
        New file <Command.Shortcut>Ctrl+N</Command.Shortcut>
      </Command.Item>
      <Command.Item onSelect={handleSave}>
        Save <Command.Shortcut>Ctrl+S</Command.Shortcut>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>
```

### Inline Command List

```tsx
<Command>
  <Command.Input placeholder="Search actions..." />
  <Command.List>
    <Command.Group heading="Navigation">
      <Command.Item onSelect={() => navigate("/home")}>Home</Command.Item>
      <Command.Item onSelect={() => navigate("/settings")}>Settings</Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Account">
      <Command.Item onSelect={handleLogout}>Log out</Command.Item>
    </Command.Group>
  </Command.List>
</Command>
```

## Accessibility

- Full keyboard navigation (Arrow Up/Down, Enter to select)
- Escape closes dialog
- Search input is auto-focused
- Items announce their position in the list

## Token Usage

- `--surface-base` — Command background
- `--surface-subtle` — Input background
- `--interactive-primary` — Selected/highlighted item
- `--text-primary` — Item text
- `--text-tertiary` — Shortcut text
- `--border-subtle` — Separator and borders
- `--radius-container` — Dialog border radius
- `--spacing-2` — Item padding
