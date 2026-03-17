import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { KanbanBoard } from "./KanbanBoard";
import type { KanbanColumn, KanbanCard } from "./KanbanBoard.types";

const meta: Meta<typeof KanbanBoard> = {
  title: "Sections/App/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

// Sample data
const sampleColumns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "default",
    cards: [
      {
        id: "card-1",
        title: "Research competitor analysis",
        description: "Analyze top 5 competitors and create a comparison report",
        labels: [{ id: "research", text: "Research", color: "purple" }],
        priority: "low",
      },
      {
        id: "card-2",
        title: "Update documentation",
        description: "Add new API endpoints to the docs",
        labels: [{ id: "docs", text: "Docs", color: "blue" }],
      },
    ],
  },
  {
    id: "todo",
    title: "To Do",
    color: "blue",
    limit: 5,
    cards: [
      {
        id: "card-3",
        title: "Design new dashboard layout",
        description: "Create wireframes for the analytics dashboard",
        labels: [{ id: "design", text: "Design", color: "green" }],
        assignees: [
          {
            id: "user-1",
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        ],
        dueDate: "2024-02-15",
        priority: "high",
      },
      {
        id: "card-4",
        title: "Implement authentication flow",
        labels: [
          { id: "feature", text: "Feature", color: "yellow" },
          { id: "backend", text: "Backend", color: "purple" },
        ],
        assignees: [
          {
            id: "user-2",
            name: "Jane Smith",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
          {
            id: "user-3",
            name: "Bob Wilson",
            avatar: "https://i.pravatar.cc/150?img=3",
          },
        ],
        priority: "urgent",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "yellow",
    limit: 3,
    cards: [
      {
        id: "card-5",
        title: "Fix navigation bug on mobile",
        description: "Menu not closing after selection on iOS",
        labels: [{ id: "bug", text: "Bug", color: "red" }],
        assignees: [
          {
            id: "user-1",
            name: "John Doe",
            avatar: "https://i.pravatar.cc/150?img=1",
          },
        ],
        priority: "high",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "purple",
    cards: [
      {
        id: "card-6",
        title: "Code review: Payment integration",
        assignees: [
          {
            id: "user-2",
            name: "Jane Smith",
            avatar: "https://i.pravatar.cc/150?img=2",
          },
        ],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "green",
    cards: [
      {
        id: "card-7",
        title: "Setup CI/CD pipeline",
        labels: [{ id: "devops", text: "DevOps", color: "blue" }],
      },
      {
        id: "card-8",
        title: "Create design system tokens",
        labels: [{ id: "design", text: "Design", color: "green" }],
      },
    ],
  },
];

/**
 * Default KanbanBoard with sample project data
 */
export const Default: Story = {
  args: {
    columns: sampleColumns,
    onCardClick: (card: KanbanCard, columnId: string) =>
      console.log("Card clicked:", card.id, "in", columnId),
    onAddCard: (columnId: string) => console.log("Add card to:", columnId),
  },
};

/**
 * Interactive KanbanBoard with state
 */
export const Interactive: Story = {
  render: () => {
    const [columns, setColumns] = useState<KanbanColumn[]>(sampleColumns);

    const handleCardClick = (card: KanbanCard, columnId: string) => {
      alert(`Clicked "${card.title}" in ${columnId}`);
    };

    const handleAddCard = (columnId: string) => {
      const newCard: KanbanCard = {
        id: `card-${Date.now()}`,
        title: "New Task",
      };
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? { ...col, cards: [...col.cards, newCard] }
            : col,
        ),
      );
    };

    return (
      <KanbanBoard
        columns={columns}
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
      />
    );
  },
};

/**
 * Compact variant for dense layouts
 */
export const Compact: Story = {
  args: {
    columns: sampleColumns.slice(0, 3),
    compact: true,
    onCardClick: (card: KanbanCard) => console.log("Card clicked:", card.id),
  },
};

/**
 * Without card count
 */
export const WithoutCardCount: Story = {
  args: {
    columns: sampleColumns.map((col) => ({ ...col, limit: undefined })),
    showCardCount: false,
    onCardClick: (card: KanbanCard) => console.log("Card clicked:", card.id),
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    columns: [
      { id: "todo", title: "To Do", color: "blue", cards: [] },
      { id: "in-progress", title: "In Progress", color: "yellow", cards: [] },
      { id: "done", title: "Done", color: "green", cards: [] },
    ],
    onAddCard: (columnId: string) => console.log("Add card to:", columnId),
  },
};

/**
 * Simple board without extras
 */
export const Simple: Story = {
  args: {
    columns: [
      {
        id: "todo",
        title: "To Do",
        cards: [
          { id: "1", title: "Task 1" },
          { id: "2", title: "Task 2" },
          { id: "3", title: "Task 3" },
        ],
      },
      {
        id: "doing",
        title: "Doing",
        cards: [{ id: "4", title: "Task 4" }],
      },
      {
        id: "done",
        title: "Done",
        cards: [{ id: "5", title: "Task 5" }],
      },
    ],
    showCardCount: false,
    onCardClick: (card: KanbanCard) => console.log("Card clicked:", card.id),
  },
};

/**
 * With add column button
 */
export const WithAddColumn: Story = {
  args: {
    columns: sampleColumns.slice(0, 3),
    onAddCard: (columnId: string) => console.log("Add card to:", columnId),
    onAddColumn: () => console.log("Add column"),
    onColumnMenu: (columnId: string) => console.log("Column menu:", columnId),
  },
};
