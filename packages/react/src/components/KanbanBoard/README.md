# KanbanBoard Section

> Drag-and-drop task board with columns, cards, and labels (Trello/Linear style).

## Quick Start

```tsx
import { KanbanBoard } from "@orion/react";

<KanbanBoard
  columns={[
    {
      id: "todo",
      title: "To Do",
      cards: [
        {
          id: "1",
          title: "Design homepage",
          labels: [{ id: "l1", text: "Design", color: "blue" }],
        },
        { id: "2", title: "Setup database" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [
        {
          id: "3",
          title: "Implement auth",
          assignees: [{ id: "u1", name: "John", avatar: "/john.jpg" }],
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      cards: [{ id: "4", title: "Project setup", priority: "high" }],
    },
  ]}
  onCardMove={(result) => handleMove(result)}
  onCardClick={(card) => openCard(card)}
/>;
```

---

## Features

- **Drag & Drop** — Move cards between columns
- **Labels & Tags** — Color-coded categorization
- **Assignees** — Avatar display for team members
- **Priority Levels** — Visual priority indicators
- **Due Dates** — Date display on cards
- **WIP Limits** — Column card limits
- **Cover Images** — Card header images
- **Column Colors** — Visual column differentiation
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface KanbanBoardProps {
  // Content
  columns: KanbanColumn[]; // REQUIRED - Board columns

  // Handlers
  onCardMove?: (result: KanbanDragResult) => void;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  onAddCard?: (columnId: string) => void;
  onAddColumn?: () => void;
  onColumnMenu?: (columnId: string) => void;

  // Display
  compact?: boolean; // Compact cards - default: false
  showCardCount?: boolean; // Show count in headers - default: true
  draggable?: boolean; // Enable drag/drop - default: true
}

interface KanbanColumn {
  id: string; // Column ID
  title: string; // Column title
  color?: "default" | "blue" | "green" | "yellow" | "red" | "purple";
  cards: KanbanCard[]; // Cards in column
  limit?: number; // WIP limit
}

interface KanbanCard {
  id: string; // Card ID
  title: string; // Card title
  description?: string; // Card description
  labels?: KanbanLabel[]; // Color labels
  assignees?: KanbanAssignee[]; // Assigned users
  dueDate?: string; // Due date
  priority?: "low" | "medium" | "high" | "urgent";
  metadata?: Record<string, ReactNode>;
  coverImage?: string; // Cover image URL
}

interface KanbanLabel {
  id: string;
  text: string;
  color:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "pink"
    | "gray";
}

interface KanbanAssignee {
  id: string;
  name: string;
  avatar?: string;
}

interface KanbanDragResult {
  cardId: string;
  sourceColumnId: string;
  sourceIndex: number;
  destinationColumnId: string;
  destinationIndex: number;
}
```

---

## Card Configuration

### Basic Card

```tsx
{
  id: '1',
  title: 'Implement user authentication'
}
```

### With Labels

```tsx
{
  id: '1',
  title: 'Design system update',
  labels: [
    { id: 'l1', text: 'Design', color: 'blue' },
    { id: 'l2', text: 'High Priority', color: 'red' }
  ]
}
```

### With Assignees

```tsx
{
  id: '1',
  title: 'Code review',
  assignees: [
    { id: 'u1', name: 'Alice', avatar: '/avatars/alice.jpg' },
    { id: 'u2', name: 'Bob', avatar: '/avatars/bob.jpg' }
  ]
}
```

### With Due Date

```tsx
{
  id: '1',
  title: 'Launch marketing campaign',
  dueDate: '2024-03-15'
}
```

### With Priority

```tsx
{
  id: '1',
  title: 'Fix critical bug',
  priority: 'urgent'
}
```

### With Cover Image

```tsx
{
  id: '1',
  title: 'Homepage redesign',
  coverImage: '/covers/homepage-mockup.png',
  labels: [{ id: 'l1', text: 'Design', color: 'purple' }]
}
```

### Full Card

```tsx
{
  id: '1',
  title: 'Implement checkout flow',
  description: 'Add payment processing and order confirmation',
  labels: [
    { id: 'l1', text: 'Feature', color: 'green' },
    { id: 'l2', text: 'Backend', color: 'blue' }
  ],
  assignees: [
    { id: 'u1', name: 'Sarah', avatar: '/avatars/sarah.jpg' }
  ],
  dueDate: '2024-02-28',
  priority: 'high',
  metadata: {
    'Story Points': '8',
    'Sprint': 'Sprint 5'
  }
}
```

---

## Column Configuration

### Basic Columns

```tsx
columns={[
  { id: 'backlog', title: 'Backlog', cards: [...] },
  { id: 'todo', title: 'To Do', cards: [...] },
  { id: 'doing', title: 'In Progress', cards: [...] },
  { id: 'done', title: 'Done', cards: [...] }
]}
```

### With Colors

```tsx
columns={[
  { id: 'backlog', title: 'Backlog', color: 'default', cards: [...] },
  { id: 'todo', title: 'To Do', color: 'blue', cards: [...] },
  { id: 'doing', title: 'In Progress', color: 'yellow', cards: [...] },
  { id: 'review', title: 'Review', color: 'purple', cards: [...] },
  { id: 'done', title: 'Done', color: 'green', cards: [...] }
]}
```

### With WIP Limits

```tsx
columns={[
  { id: 'todo', title: 'To Do', cards: [...] },
  { id: 'doing', title: 'In Progress', limit: 3, cards: [...] },  // Max 3 cards
  { id: 'review', title: 'Review', limit: 2, cards: [...] },      // Max 2 cards
  { id: 'done', title: 'Done', cards: [...] }
]}
```

---

## Event Handlers

### Card Move

```tsx
const handleCardMove = (result: KanbanDragResult) => {
  const { cardId, sourceColumnId, destinationColumnId, destinationIndex } =
    result;

  // Update your state/backend
  setColumns((prev) => {
    // Remove from source
    const sourceCards = prev.find((c) => c.id === sourceColumnId).cards;
    const [card] = sourceCards.splice(result.sourceIndex, 1);

    // Add to destination
    const destCards = prev.find((c) => c.id === destinationColumnId).cards;
    destCards.splice(destinationIndex, 0, card);

    return [...prev];
  });
};

<KanbanBoard columns={columns} onCardMove={handleCardMove} />;
```

### Card Click

```tsx
<KanbanBoard
  columns={columns}
  onCardClick={(card, columnId) => {
    setSelectedCard(card);
    openDetailPanel();
  }}
/>
```

### Add Card

```tsx
<KanbanBoard
  columns={columns}
  onAddCard={(columnId) => {
    openNewCardModal(columnId);
  }}
/>
```

### Add Column

```tsx
<KanbanBoard
  columns={columns}
  onAddColumn={() => {
    openNewColumnModal();
  }}
/>
```

---

## Complete Examples

### Project Management Board

```tsx
import { KanbanBoard, DetailPanel } from "@orion/react";
import { useState } from "react";

function ProjectBoard() {
  const [columns, setColumns] = useState([
    {
      id: "backlog",
      title: "Backlog",
      color: "default",
      cards: [
        {
          id: "1",
          title: "User research",
          labels: [{ id: "l1", text: "Research", color: "blue" }],
        },
        {
          id: "2",
          title: "Competitive analysis",
          labels: [{ id: "l1", text: "Research", color: "blue" }],
        },
      ],
    },
    {
      id: "todo",
      title: "To Do",
      color: "blue",
      cards: [
        {
          id: "3",
          title: "Design homepage wireframes",
          labels: [{ id: "l2", text: "Design", color: "purple" }],
          assignees: [{ id: "u1", name: "Alice", avatar: "/alice.jpg" }],
          dueDate: "2024-02-20",
        },
      ],
    },
    {
      id: "doing",
      title: "In Progress",
      color: "yellow",
      limit: 3,
      cards: [
        {
          id: "4",
          title: "Implement authentication",
          labels: [{ id: "l3", text: "Backend", color: "green" }],
          assignees: [{ id: "u2", name: "Bob", avatar: "/bob.jpg" }],
          priority: "high",
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      color: "purple",
      limit: 2,
      cards: [],
    },
    {
      id: "done",
      title: "Done",
      color: "green",
      cards: [
        { id: "5", title: "Project setup", priority: "low" },
        { id: "6", title: "CI/CD pipeline" },
      ],
    },
  ]);

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardMove = (result) => {
    // Update columns state
  };

  return (
    <>
      <KanbanBoard
        columns={columns}
        onCardMove={handleCardMove}
        onCardClick={(card) => setSelectedCard(card)}
        onAddCard={(columnId) => openNewCardModal(columnId)}
        showCardCount
      />

      <DetailPanel
        open={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        title={selectedCard?.title}
      >
        <CardDetails card={selectedCard} />
      </DetailPanel>
    </>
  );
}
```

### Sprint Board

```tsx
<KanbanBoard
  columns={[
    {
      id: "sprint-backlog",
      title: "Sprint Backlog",
      cards: sprintTasks.filter((t) => t.status === "backlog"),
    },
    {
      id: "in-progress",
      title: "In Progress",
      limit: 5,
      cards: sprintTasks.filter((t) => t.status === "in-progress"),
    },
    {
      id: "testing",
      title: "Testing",
      limit: 3,
      cards: sprintTasks.filter((t) => t.status === "testing"),
    },
    {
      id: "done",
      title: "Done",
      cards: sprintTasks.filter((t) => t.status === "done"),
    },
  ]}
  compact
  onCardMove={handleMove}
/>
```

### Personal Task Board

```tsx
<KanbanBoard
  columns={[
    { id: "today", title: "Today", color: "red", cards: todayTasks },
    { id: "this-week", title: "This Week", color: "yellow", cards: weekTasks },
    { id: "later", title: "Later", color: "default", cards: laterTasks },
  ]}
  onCardMove={handleMove}
  onAddCard={addNewTask}
/>
```

---

## Accessibility

- Cards are keyboard focusable
- Drag operations have keyboard alternatives
- Column headers use proper heading levels
- Card actions are accessible via keyboard
- Screen reader announcements for card moves

```tsx
// Good: Descriptive card titles
{
  title: "Implement user authentication with OAuth";
}

// Avoid: Vague titles
{
  title: "Auth stuff";
}
```

---

## Anti-Patterns

### Too Many Columns

```tsx
// WRONG - 10 columns hard to manage
<KanbanBoard columns={[...tenColumns]} />

// CORRECT - 4-6 columns max
<KanbanBoard columns={[todo, inProgress, review, done]} />
```

### No WIP Limits

```tsx
// WRONG - Unlimited work in progress
<KanbanBoard
  columns={[
    { id: 'doing', title: 'In Progress', cards: [...fiftyCards] }
  ]}
/>

// CORRECT - Set reasonable limits
<KanbanBoard
  columns={[
    { id: 'doing', title: 'In Progress', limit: 5, cards: [...] }
  ]}
/>
```

### Cards Without Context

```tsx
// WRONG - Ambiguous card
{ id: '1', title: 'Fix bug' }

// CORRECT - Descriptive with context
{
  id: '1',
  title: 'Fix login timeout bug',
  description: 'Users are being logged out after 5 minutes',
  labels: [{ id: 'l1', text: 'Bug', color: 'red' }],
  priority: 'high'
}
```

---

## When to Use KanbanBoard

| Scenario           | Recommendation      |
| ------------------ | ------------------- |
| Project management | Full featured       |
| Sprint planning    | With WIP limits     |
| Personal tasks     | Compact mode        |
| Content workflow   | With status columns |

## When NOT to Use KanbanBoard

| Scenario          | Use Instead         |
| ----------------- | ------------------- |
| Simple task list  | Checklist component |
| Timeline view     | Timeline section    |
| Calendar planning | Calendar component  |
| Data display      | DataTable section   |

---

## Related Components

- **[DataTable](../DataTable/README.md)** — Table view of tasks
- **[DetailPanel](../DetailPanel/README.md)** — Card detail editing
- **[Timeline](../Timeline/README.md)** — Chronological view
- **[Stepper](../Stepper/README.md)** — Process steps
