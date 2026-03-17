# CodeEditor

A textarea-based code editor with synchronized line numbers and language badge display.

## When to Use

| Scenario | Use CodeEditor |
|----------|----------------|
| Code input or editing | ✅ Yes - provides line numbers and monospace styling |
| Displaying editable code snippets | ✅ Yes - supports read-only mode |
| Simple script/config editing | ✅ Yes - lightweight textarea-based |
| Full IDE experience | ❌ No - use Monaco or CodeMirror |
| Syntax highlighting | ❌ No - this is a plain text editor |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | — | Current editor content |
| onChange | (value: string) => void | — | Content change callback |
| language | string | — | Language name shown as badge |
| readOnly | boolean | false | Whether the editor is read-only |
| showLineNumbers | boolean | true | Show line numbers on the left |
| placeholder | string | — | Placeholder text when empty |
| minRows | number | 10 | Minimum number of rows to display |
| className | string | — | Additional class name |
| aria-label | string | — | Accessible label |

## Examples

### Basic Usage

```tsx
import { CodeEditor } from "@orion-ds/react/editor";

<CodeEditor
  value={code}
  onChange={setCode}
  language="javascript"
  placeholder="// Write your code here..."
/>
```

### Read-Only Display

```tsx
<CodeEditor
  value={snippet}
  language="python"
  readOnly
  showLineNumbers
/>
```

### Minimal (No Line Numbers)

```tsx
<CodeEditor
  value={config}
  onChange={setConfig}
  language="json"
  showLineNumbers={false}
  minRows={5}
/>
```

## Accessibility

- Supports `aria-label` for screen readers
- Tab key inserts indentation within the editor
- Read-only mode prevents modification

## Token Usage

- `--surface-subtle` — Editor background
- `--font-mono` — Monospace font family
- `--text-primary` — Code text color
- `--text-tertiary` — Line number color
- `--border-subtle` — Border color
- `--spacing-3` — Internal padding
- `--radius-control` — Border radius
