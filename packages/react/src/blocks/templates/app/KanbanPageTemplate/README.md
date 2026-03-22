# KanbanPageTemplate (Template)

Task management board with multiple columns and individual task cards. Designed for agile workflows, sprint planning, and project management with drag-and-drop capability.

## When to Use

| Scenario                       | Use KanbanPageTemplate         |
| ------------------------------ | ------------------------------ |
| Agile sprint board             | ✅ Yes - organized by columns  |
| Task management interface      | ✅ Yes - card-based layout     |
| Project workflow visualization | ✅ Yes - status columns        |
| Team task assignment           | ✅ Yes - with metadata display |
| Progress tracking              | ✅ Yes - visual column layout  |

## Props Reference

| Prop         | Type                                       | Default        | Description          |
| ------------ | ------------------------------------------ | -------------- | -------------------- |
| title        | string                                     | "Kanban Board" | Board title          |
| columns      | KanbanColumn[]                             | []             | Column definitions   |
| tasks        | KanbanTask[]                               | []             | Array of tasks       |
| onTaskMove   | (taskId: string, columnId: string) => void | —              | Move task callback   |
| onCreateTask | (columnId: string) => void                 | —              | New task callback    |
| onEditTask   | (taskId: string) => void                   | —              | Edit task callback   |
| onDeleteTask | (taskId: string) => void                   | —              | Delete task callback |
| isLoading    | boolean                                    | false          | Loading state        |
| error        | string                                     | —              | Error message        |
| className    | string                                     | —              | Custom CSS class     |

### KanbanColumn Interface

| Property | Type   | Description       |
| -------- | ------ | ----------------- |
| id       | string | Unique identifier |
| title    | string | Column header     |

### KanbanTask Interface

| Property    | Type                              | Description             |
| ----------- | --------------------------------- | ----------------------- |
| id          | string                            | Unique identifier       |
| columnId    | string                            | Parent column ID        |
| title       | string                            | Task title              |
| description | string                            | Task details (optional) |
| priority    | "high" \| "medium" \| "low"       | Priority level          |
| dueDate     | Date                              | Deadline (optional)     |
| labels      | string[]                          | Tag labels (optional)   |
| assignee    | { name: string; avatar?: string } | Assignee info           |

## Key Features

- **Multiple columns** — Organize by status or stage
- **Task cards** — Title, description, priority, due date
- **Priority badges** — Color-coded importance
- **Assignee display** — Avatar and name
- **Label system** — Tag tasks for categorization
- **Column task count** — Shows items per column
- **Add task button** — Per-column creation
- **Edit/delete actions** — Manage individual tasks
- **Empty states** — When no columns or tasks exist

## Usage Example

```tsx
import { KanbanPageTemplate } from "@orion-ds/react";

const [tasks, setTasks] = useState([
  {
    id: "1",
    columnId: "todo",
    title: "Fix authentication bug",
    priority: "high",
    dueDate: new Date("2026-03-20"),
    assignee: { name: "Jane Doe" },
  },
]);

const columns = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

<KanbanPageTemplate
  title="Sprint Board"
  columns={columns}
  tasks={tasks}
  onCreateTask={(columnId) => console.log("Add to:", columnId)}
  onEditTask={(taskId) => console.log("Edit:", taskId)}
  onDeleteTask={(taskId) => setTasks(tasks.filter((t) => t.id !== taskId))}
/>;
```

## Component Composition

Built with:

- `Button` — Add task button with icon
- `Badge` — Priority indicators
- Lucide Icons — Plus, Edit2, Trash2, Calendar
- Custom TaskCard component — Individual task display
- Responsive grid layout — Column arrangement

## Accessibility

- Column headers are proper headings
- Task cards are semantically organized
- Edit and delete buttons have aria-labels
- Delete action shows confirmation
- Task count displayed per column
- Keyboard accessible buttons

## Token Usage

- `--surface-base` — Board background
- `--surface-layer` — Task card background
- `--text-primary` — Task title
- `--text-secondary` — Description and dates
- `--status-error` — High priority
- `--status-warning` — Medium priority
- `--status-success` — Low priority
- `--border-subtle` — Column separators
- `--spacing-4` — Card and column spacing
- `--radius-sm` — Task card radius
