# AlertDialog

A modal dialog that forces user acknowledgment before proceeding, unlike Modal which can be dismissed freely.

## When to Use

| Scenario                             | Use AlertDialog                       |
| ------------------------------------ | ------------------------------------- |
| Destructive actions (delete, remove) | ✅ Yes - forces explicit confirmation |
| Irreversible operations              | ✅ Yes - prevents accidental actions  |
| Critical warnings requiring response | ✅ Yes - blocks until user responds   |
| Informational messages               | ❌ No - use Modal or Toast instead    |
| Forms or complex content             | ❌ No - use Modal instead             |

## Props Reference

### AlertDialog (Root)

| Prop            | Type       | Default | Description                              |
| --------------- | ---------- | ------- | ---------------------------------------- |
| open            | boolean    | —       | Whether the dialog is open               |
| onClose         | () => void | —       | Callback when dialog should close        |
| closeOnBackdrop | boolean    | false   | Allow closing by clicking backdrop       |
| closeOnEscape   | boolean    | false   | Allow closing with Escape key            |
| children        | ReactNode  | —       | Dialog content (use compound components) |
| className       | string     | —       | Additional class name                    |

### AlertDialog.Icon

| Prop    | Type                            | Default | Description                     |
| ------- | ------------------------------- | ------- | ------------------------------- |
| variant | 'info' \| 'warning' \| 'danger' | 'info'  | Controls icon and accent color  |
| icon    | ReactNode                       | —       | Custom icon (overrides default) |

### AlertDialog.Title, AlertDialog.Description, AlertDialog.Actions

Each accepts `children` and `className` props.

## Examples

### Basic Usage

```tsx
import { AlertDialog, Button } from "@orion-ds/react";

<AlertDialog open={open} onClose={handleClose}>
  <AlertDialog.Icon variant="danger" />
  <AlertDialog.Title>Delete account?</AlertDialog.Title>
  <AlertDialog.Description>
    This action cannot be undone.
  </AlertDialog.Description>
  <AlertDialog.Actions>
    <Button variant="ghost" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleConfirm}>
      Delete
    </Button>
  </AlertDialog.Actions>
</AlertDialog>;
```

### Warning Variant

```tsx
<AlertDialog open={open} onClose={handleClose}>
  <AlertDialog.Icon variant="warning" />
  <AlertDialog.Title>Unsaved changes</AlertDialog.Title>
  <AlertDialog.Description>
    You have unsaved changes. Are you sure you want to leave?
  </AlertDialog.Description>
  <AlertDialog.Actions>
    <Button variant="ghost" onClick={handleClose}>
      Stay
    </Button>
    <Button variant="primary" onClick={handleLeave}>
      Leave
    </Button>
  </AlertDialog.Actions>
</AlertDialog>
```

## Accessibility

- Traps focus within the dialog when open
- Supports `aria-labelledby` and `aria-describedby` via compound components
- Backdrop and Escape closing disabled by default (forces explicit response)

## Token Usage

- `--surface-base` — Dialog background
- `--radius-container` — Border radius
- `--spacing-6` — Internal padding
- `--status-error` — Danger variant accent
- `--status-warning` — Warning variant accent
