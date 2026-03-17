# AgentEditor (Template)

A configuration editor form for creating and editing AI agent profiles. Provides a structured interface for setting agent name, description, model selection, temperature, token limits, and system prompts.

## When to Use

| Scenario | Use AgentEditor |
|----------|-----------------|
| Agent configuration workflow | ✅ Yes - create and edit agent settings |
| AI assistant setup interface | ✅ Yes - manage model and behavior parameters |
| Agent creation modal | ✅ Yes - controlled form with save/cancel |
| Bulk agent import | ❌ No - designed for single agent editing |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Edit Agent" | Form title |
| agent | Agent | undefined | Agent being edited (undefined for new) |
| availableModels | string[] | ["gpt-4", "gpt-3.5-turbo", "claude-3-opus"] | Model options |
| onSave | (agent: Agent) => void | — | Called when user saves |
| onCancel | () => void | — | Called when user cancels |
| isLoading | boolean | false | Loading state during save |
| error | string | — | Error message to display |
| className | string | — | Custom CSS class |

### Agent Interface

| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier |
| name | string | Agent name |
| description | string | Purpose and behavior |
| model | string | LLM model selection |
| systemPrompt | string | System-level instructions |
| temperature | number | Response creativity (0-2) |
| maxTokens | number | Token limit (1-32000) |

## Key Features

- **Structured form layout** — Name, description, model selection, advanced settings
- **Real-time form state** — All fields update component state
- **Model selector** — Dropdown with configurable model options
- **Advanced parameters** — Temperature and token limits for fine-tuning
- **System prompt editor** — Textarea for detailed agent instructions
- **Save/cancel actions** — Disabled buttons until name is provided
- **Loading and error states** — Feedback during submission
- **Accessible form** — Labels and semantic HTML

## Usage Example

```tsx
import { AgentEditor } from "@orion-ds/react";

const [agent, setAgent] = useState(null);

<AgentEditor
  title="Create New Agent"
  availableModels={["gpt-4", "gpt-3.5-turbo"]}
  onSave={(agentData) => {
    console.log("Saving agent:", agentData);
    setAgent(agentData);
  }}
  onCancel={() => console.log("Cancelled")}
  isLoading={false}
/>
```

## Component Composition

Built with:
- `Card` — Form container with header, body, footer
- `Button` — Save and cancel actions with loading state
- `Field` — Text and number inputs with labels
- `select` element — Model dropdown
- `textarea` — System prompt multi-line input

## Accessibility

- All form fields have associated labels
- Save button disabled until name is provided
- Cancel and Save buttons are keyboard accessible
- Error messages displayed prominently
- Loading state communicated to screen readers

## Token Usage

- `--surface-base` — Form background
- `--interactive-primary` — Save button
- `--interactive-primary-text` — Button text
- `--text-primary` — Form labels
- `--text-secondary` — Helper text
- `--border-subtle` — Form field borders
- `--spacing-4` — Form field spacing
- `--radius-control` — Input field radius
