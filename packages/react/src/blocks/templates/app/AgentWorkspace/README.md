# AgentWorkspace (Template)

Main workspace for managing multiple AI agents in a grid layout. Displays agent cards with status indicators, usage metrics, and action buttons for editing and deletion.

## When to Use

| Scenario                    | Use AgentWorkspace                           |
| --------------------------- | -------------------------------------------- |
| Agent management dashboard  | ✅ Yes - shows all agents with actions       |
| Multi-agent workspace       | ✅ Yes - organize and manage multiple agents |
| Agent listing and selection | ✅ Yes - clickable agent cards               |
| Quick agent access          | ✅ Yes - status and metadata at a glance     |

## Props Reference

| Prop            | Type                 | Default           | Description                 |
| --------------- | -------------------- | ----------------- | --------------------------- |
| title           | string               | "Agent Workspace" | Page title                  |
| agents          | WorkspaceAgent[]     | []                | Array of agents to display  |
| selectedAgentId | string               | —                 | Currently selected agent ID |
| onSelectAgent   | (id: string) => void | —                 | Agent selection callback    |
| onCreateAgent   | () => void           | —                 | New agent creation callback |
| onDeleteAgent   | (id: string) => void | —                 | Agent deletion callback     |
| onEditAgent     | (id: string) => void | —                 | Agent edit callback         |
| isLoading       | boolean              | false             | Loading state               |
| error           | string               | —                 | Error message               |
| subtitle        | string               | —                 | Optional page subtitle      |
| className       | string               | —                 | Custom CSS class            |

### WorkspaceAgent Interface

| Property    | Type                              | Description                  |
| ----------- | --------------------------------- | ---------------------------- |
| id          | string                            | Unique identifier            |
| name        | string                            | Agent display name           |
| description | string                            | Brief description            |
| status      | "active" \| "inactive" \| "error" | Current status               |
| lastUpdated | Date                              | Last modification time       |
| usageCount  | number                            | Total usage count (optional) |

## Key Features

- **Grid layout** — Responsive card grid for agent display
- **Status badges** — Color-coded status (active, inactive, error)
- **Action buttons** — Edit and delete with confirmation
- **Metadata display** — Last updated date and usage count
- **New Agent button** — Create new agent from workspace
- **Selection support** — Highlight selected agent
- **Empty state** — Guidance when no agents exist
- **Error handling** — Display and manage errors

## Usage Example

```tsx
import { AgentWorkspace } from "@orion-ds/react";

const [agents, setAgents] = useState([
  {
    id: "1",
    name: "Support Bot",
    description: "Handles customer inquiries",
    status: "active",
    lastUpdated: new Date(),
    usageCount: 42,
  },
]);

<AgentWorkspace
  agents={agents}
  selectedAgentId="1"
  onSelectAgent={(id) => console.log("Selected:", id)}
  onCreateAgent={() => setShowEditor(true)}
  onDeleteAgent={(id) => {
    setAgents(agents.filter((a) => a.id !== id));
  }}
/>;
```

## Component Composition

Built with:

- `Card` — Agent card container with body
- `Badge` — Status indicator variant
- `Button` — New Agent action button
- Lucide Icons — Plus, Edit2, Trash2, Clock icons
- Grid layout — Responsive card arrangement

## Accessibility

- Agent cards are clickable with visual feedback
- Action buttons (edit/delete) have aria-labels
- Delete action shows confirmation dialog
- Selection state visually highlighted
- Empty state provides clear guidance

## Token Usage

- `--surface-base` — Card background
- `--surface-layer` — Hover effect
- `--text-primary` — Agent name
- `--text-secondary` — Description and metadata
- `--interactive-primary` — New Agent button
- `--status-success` — Active badge
- `--status-info` — Inactive badge
- `--status-error` — Error badge
- `--border-subtle` — Card separators
- `--spacing-4` — Card padding
