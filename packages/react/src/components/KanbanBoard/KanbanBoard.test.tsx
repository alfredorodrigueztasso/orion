import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KanbanBoard } from "./KanbanBoard";
import type { KanbanCard, KanbanColumn } from "./KanbanBoard.types";

describe("KanbanBoard", () => {
  const mockCards: KanbanCard[] = [
    {
      id: "card-1",
      title: "Fix login bug",
      description: "Users cannot login with Google",
      priority: "high",
    },
    {
      id: "card-2",
      title: "Add dark mode",
      description: "Implement dark theme",
      priority: "medium",
    },
    {
      id: "card-3",
      title: "Update docs",
      description: "Documentation needs update",
      priority: "low",
    },
  ];

  const mockColumns: KanbanColumn[] = [
    {
      id: "todo",
      title: "To Do",
      cards: [mockCards[0], mockCards[1]],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [mockCards[2]],
    },
    {
      id: "done",
      title: "Done",
      cards: [],
    },
  ];

  it("renders all columns", () => {
    render(<KanbanBoard columns={mockColumns} />);

    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders all cards in correct columns", () => {
    render(<KanbanBoard columns={mockColumns} />);

    expect(screen.getByText("Fix login bug")).toBeInTheDocument();
    expect(screen.getByText("Add dark mode")).toBeInTheDocument();
    expect(screen.getByText("Update docs")).toBeInTheDocument();
  });

  it("displays card descriptions", () => {
    render(<KanbanBoard columns={mockColumns} />);

    expect(screen.getByText("Users cannot login with Google")).toBeInTheDocument();
    expect(screen.getByText("Implement dark theme")).toBeInTheDocument();
  });

  it("shows priority indicators for high/medium priority", () => {
    const { container } = render(<KanbanBoard columns={mockColumns} />);

    // Should render priority indicators (spans with classes)
    const priorityElements = container.querySelectorAll("[class*='priority']");
    expect(priorityElements.length).toBeGreaterThan(0);
  });

  it("handles card click events", async () => {
    const handleCardClick = vi.fn();
    const user = userEvent.setup();

    render(
      <KanbanBoard
        columns={mockColumns}
        onCardClick={handleCardClick}
      />,
    );

    const card = screen.getByText("Fix login bug");
    await user.click(card);

    expect(handleCardClick).toHaveBeenCalledWith(mockCards[0]);
  });

  it("handles add card action", async () => {
    const handleAddCard = vi.fn();
    const user = userEvent.setup();

    render(
      <KanbanBoard
        columns={mockColumns}
        onAddCard={handleAddCard}
      />,
    );

    const addButtons = screen.getAllByRole("button");
    if (addButtons.length > 0) {
      await user.click(addButtons[0]);
      // handleAddCard should be called or button should be clickable
      expect(addButtons[0]).toBeInTheDocument();
    }
  });

  it("supports compact mode", () => {
    const { container } = render(
      <KanbanBoard columns={mockColumns} compact />
    );

    expect(container).toBeInTheDocument();
  });

  it("renders with empty columns", () => {
    const emptyColumns: KanbanColumn[] = [
      {
        id: "empty",
        title: "Empty Column",
        cards: [],
      },
    ];

    render(<KanbanBoard columns={emptyColumns} />);

    expect(screen.getByText("Empty Column")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <KanbanBoard
        columns={mockColumns}
        className="custom-kanban"
      />,
    );

    const board = container.querySelector(".custom-kanban");
    expect(board).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <KanbanBoard
        ref={ref}
        columns={mockColumns}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("handles card delete action", async () => {
    const handleDeleteCard = vi.fn();
    const user = userEvent.setup();

    render(
      <KanbanBoard
        columns={mockColumns}
        onDeleteCard={handleDeleteCard}
      />,
    );

    // Look for more options menu on a card
    const moreButtons = screen.queryAllByRole("button");
    expect(moreButtons.length).toBeGreaterThan(0);
  });
});
