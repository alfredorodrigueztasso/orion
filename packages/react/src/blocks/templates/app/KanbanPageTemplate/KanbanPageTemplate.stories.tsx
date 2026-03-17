import type { Meta, StoryObj } from "@storybook/react";
import { KanbanPageTemplate } from "./KanbanPageTemplate";

const meta = {
  title: "Templates/App/KanbanPageTemplate",
  component: KanbanPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanPageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockColumns = [
  { id: "todo", title: "To Do", count: 3 },
  { id: "in-progress", title: "In Progress", count: 2 },
  { id: "in-review", title: "In Review", count: 1 },
  { id: "done", title: "Done", count: 5 },
];

const mockTasks = [
  {
    id: "task-1",
    title: "Design landing page",
    description: "Create mockups for the new landing page",
    columnId: "todo",
    priority: "high" as const,
    dueDate: new Date(Date.now() + 86400000),
    labels: ["design", "ui"],
    assignee: { name: "Alice Chen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice" },
  },
  {
    id: "task-2",
    title: "Implement auth",
    columnId: "in-progress",
    priority: "high" as const,
    labels: ["backend"],
    assignee: { name: "Bob Smith", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob" },
  },
  {
    id: "task-3",
    title: "Write API docs",
    columnId: "in-progress",
    priority: "medium" as const,
    labels: ["documentation"],
  },
  {
    id: "task-4",
    title: "Code review PR #42",
    columnId: "in-review",
    priority: "medium" as const,
  },
  {
    id: "task-5",
    title: "Fix login bug",
    columnId: "todo",
    priority: "high" as const,
    labels: ["bug", "urgent"],
  },
  {
    id: "task-6",
    title: "Update dependencies",
    columnId: "todo",
    priority: "low" as const,
    labels: ["maintenance"],
  },
];

export const Default: Story = {
  args: {
    title: "Sprint Board",
    columns: mockColumns,
    tasks: mockTasks,
    onCreateTask: (columnId) => console.log("Create task in column:", columnId),
    onTaskMove: (taskId, columnId) =>
      console.log("Move task:", taskId, "to column:", columnId),
    onEditTask: (taskId) => console.log("Edit task:", taskId),
    onDeleteTask: (taskId) => console.log("Delete task:", taskId),
  },
};

export const EmptyBoard: Story = {
  args: {
    title: "New Sprint",
    columns: mockColumns,
    tasks: [],
    onCreateTask: (columnId) => console.log("Create task in column:", columnId),
    onTaskMove: (taskId, columnId) =>
      console.log("Move task:", taskId, "to column:", columnId),
  },
};

export const SingleColumn: Story = {
  args: {
    title: "Backlog",
    columns: [{ id: "backlog", title: "Backlog" }],
    tasks: mockTasks.filter((t) => t.columnId === "todo"),
    onCreateTask: (columnId) => console.log("Create task in column:", columnId),
    onTaskMove: (taskId, columnId) =>
      console.log("Move task:", taskId, "to column:", columnId),
    onEditTask: (taskId) => console.log("Edit task:", taskId),
    onDeleteTask: (taskId) => console.log("Delete task:", taskId),
  },
};

export const WithError: Story = {
  args: {
    title: "Sprint Board",
    columns: mockColumns,
    tasks: mockTasks,
    error: "Failed to load tasks. Please try again.",
    onCreateTask: (columnId) => console.log("Create task in column:", columnId),
  },
};
