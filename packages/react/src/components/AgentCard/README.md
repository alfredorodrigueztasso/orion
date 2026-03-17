# AgentCard

Specialized card component for displaying AI agent information. Built as a composition of Orion primitives: `Card`, `Avatar`, `Button`, and `Dropdown`.

## When to Use

- Agent library or gallery views
- AI agent management dashboards
- Any list/grid of AI agents with actions

## When NOT to Use

- Generic content cards → use `Card` directly
- Product or article cards → use `Card` with custom content

---

## Props Reference

```typescript
interface AgentCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string; // Unique agent identifier (used for drag & drop)
  avatar: string | ReactNode; // Image URL or icon component (e.g. <Bot size={32} />)
  title: string; // Agent name
  description: string; // Short description — truncated after 2 lines
  timestamp?: string; // Footer text (e.g. "Updated 2 hours ago")
  status?: "draft" | "published" | "archived"; // Status badge
  badge?: ReactNode; // Custom badge — overrides status when provided
  onClick?: () => void; // Makes the card clickable (adds hover lift)
  onEdit?: () => void; // Adds Edit option to the actions menu
  onDelete?: () => void; // Adds Delete option to the actions menu (danger style)
  draggable?: boolean; // Enables HTML5 drag & drop  @default false
  isDragging?: boolean; // External dragging state (dimmed + scale)  @internal
}
```

---

## Internal Composition

| Orion Component | Used For                                                          |
| --------------- | ----------------------------------------------------------------- |
| `Card`          | Outer container with `Card.Header`, `Card.Body`, `Card.Footer`    |
| `Avatar`        | Image avatar (`size="lg"`, 48px)                                  |
| `Button`        | Actions menu trigger (`variant="ghost"`, `iconOnly`, `size="sm"`) |
| `Dropdown`      | Actions menu popup (`placement="bottom-end"`, portal-rendered)    |

---

## Avatar Types

### Image URL

```tsx
<AgentCard
  id="agent-1"
  avatar="https://example.com/avatar.png"
  title="Customer Support Agent"
  description="Handles customer inquiries"
/>
```

### Icon (ReactNode)

```tsx
import { Bot } from "lucide-react";

<AgentCard
  id="agent-2"
  avatar={<Bot size={32} />}
  title="AI Research Agent"
  description="Conducts research and synthesis"
/>;
```

Icon avatars render inside a 48×48 circular container with `var(--surface-subtle)` background.

---

## Status Variants

```tsx
<AgentCard status="draft" />      // Gray text + subtle border
<AgentCard status="published" />  // Green text + green border
<AgentCard status="archived" />   // Tertiary text + subtle border
```

The `status` prop is hidden when `badge` is provided — `badge` takes precedence.

---

## Actions Menu

When `onEdit` and/or `onDelete` are provided, a `···` button appears in the header. Clicking it opens a `Dropdown` menu:

```tsx
<AgentCard
  id="agent-1"
  avatar="https://example.com/avatar.png"
  title="Support Agent"
  description="Handles tickets"
  onEdit={() => openEditModal()}
  onDelete={() => confirmDelete()}
/>
```

- The trigger is an Orion `Button` (`variant="ghost"`, `iconOnly`, `size="sm"`) — uses `var(--radius-button)`, brand-aware
- The menu uses `Dropdown` with portal rendering (no overflow clipping)
- Keyboard navigation: `Tab` → trigger → `Enter` to open → `↑↓` to navigate → `Escape` to close
- Delete item renders in `var(--status-error)` (danger style)

---

## Click Behavior

```tsx
<AgentCard
  id="agent-1"
  avatar="https://example.com/avatar.png"
  title="Clickable Agent"
  description="Click anywhere on the card"
  onClick={() => navigate(`/agents/agent-1`)}
/>
```

Adding `onClick` enables:

- `cursor: pointer`
- Hover lift via `var(--mode-hover-lift)` (mode-aware: Display = −4px, Product = 0px, App = −2px)
- `box-shadow: var(--shadow-lg)` on hover

The actions menu click does NOT propagate to `onClick`.

---

## Drag & Drop

```tsx
<AgentCard
  id="agent-1"
  avatar="https://example.com/avatar.png"
  title="Draggable Agent"
  description="Drag me to reorder"
  draggable
/>
```

When dragging starts:

- `cursor: grabbing`
- `opacity: 0.5`
- `transform: scale(0.98)`
- `dataTransfer` sets `text/plain` (id) and `application/json` (`{ id, title }`)

The actions menu button has `onDragStart` stopped so it doesn't trigger card drag.

---

## Examples

### Basic

```tsx
<AgentCard
  id="agent-1"
  avatar="https://api.dicebear.com/7.x/bottts/svg?seed=1"
  title="Customer Support Agent"
  description="Handles customer inquiries and support tickets"
  timestamp="Updated 2 hours ago"
/>
```

### Full Featured

```tsx
import { Star } from "lucide-react";

<AgentCard
  id="agent-1"
  avatar="https://api.dicebear.com/7.x/bottts/svg?seed=1"
  title="Premium Support Agent"
  description="Advanced customer support with sentiment analysis and auto-escalation"
  timestamp="Updated today"
  status="published"
  badge={
    <Star
      size={16}
      fill="var(--status-warning)"
      color="var(--status-warning)"
    />
  }
  onClick={() => navigate("/agents/agent-1")}
  onEdit={() => openEditor("agent-1")}
  onDelete={() => confirmDelete("agent-1")}
  draggable
/>;
```

### Grid Layout

```tsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "var(--spacing-4)",
  }}
>
  {agents.map((agent) => (
    <AgentCard
      key={agent.id}
      id={agent.id}
      avatar={agent.avatarUrl}
      title={agent.name}
      description={agent.description}
      timestamp={agent.updatedAt}
      status={agent.status}
      onClick={() => navigate(`/agents/${agent.id}`)}
      onEdit={() => openEditor(agent.id)}
      onDelete={() => confirmDelete(agent.id)}
    />
  ))}
</div>
```

---

## Accessibility

- The `···` trigger button has `aria-label="Actions"` and `aria-expanded` (managed by `Dropdown`)
- The dropdown menu has `role="menu"` with `role="menuitem"` per item
- Cards with `onClick` respond to `focus-visible` with a 2px `var(--interactive-primary)` outline
- Supports `prefers-reduced-motion`: all transitions disabled when enabled
- Delete items are visually distinct (`var(--status-error)`) — not hidden, just styled as danger

---

## Anti-Patterns

```tsx
// ❌ Don't pass brand as a prop — brand is global via ThemeProvider
<AgentCard brand="red" ... />

// ❌ Don't use status AND badge together — badge overrides status silently
<AgentCard status="published" badge={<CustomBadge />} ... />

// ❌ Don't use custom inline styles for the card — use className with CSS Modules
<AgentCard style={{ padding: '24px' }} ... />

// ✅ Correct — compose with className if you need layout overrides
<AgentCard className={styles.myCard} ... />
```
