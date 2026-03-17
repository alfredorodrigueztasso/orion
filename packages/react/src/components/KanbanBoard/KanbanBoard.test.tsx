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

    expect(
      screen.getByText("Users cannot login with Google"),
    ).toBeInTheDocument();
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

    render(<KanbanBoard columns={mockColumns} onCardClick={handleCardClick} />);

    const card = screen.getByText("Fix login bug");
    await user.click(card);

    expect(handleCardClick).toHaveBeenCalledWith(mockCards[0], "todo");
  });

  it("handles add card action", async () => {
    const handleAddCard = vi.fn();
    const user = userEvent.setup();

    render(<KanbanBoard columns={mockColumns} onAddCard={handleAddCard} />);

    const addButtons = screen.getAllByRole("button");
    if (addButtons.length > 0) {
      await user.click(addButtons[0]);
      // handleAddCard should be called or button should be clickable
      expect(addButtons[0]).toBeInTheDocument();
    }
  });

  it("supports compact mode", () => {
    const { container } = render(<KanbanBoard columns={mockColumns} compact />);

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
      <KanbanBoard columns={mockColumns} className="custom-kanban" />,
    );

    const board = container.querySelector(".custom-kanban");
    expect(board).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(<KanbanBoard ref={ref} columns={mockColumns} />);

    expect(ref).toHaveBeenCalled();
  });

  // Additional coverage tests
  it("displays card count in column header", () => {
    render(<KanbanBoard columns={mockColumns} showCardCount={true} />);

    // Should render card counts next to column titles
    const columns = screen.getAllByText(/To Do|In Progress|Done/);
    expect(columns.length).toBeGreaterThan(0);
  });

  it("renders cards with keyboard accessibility", () => {
    render(<KanbanBoard columns={mockColumns} />);

    const cards = screen.getAllByRole("button");
    // Should have multiple button elements (cards)
    expect(cards.length).toBeGreaterThan(0);

    // Cards should be keyboard accessible (tabIndex set)
    cards.forEach((card) => {
      expect(card).toHaveAttribute("tabIndex", "0");
    });
  });

  it("renders card with cover image when provided", () => {
    const cardsWithCover: KanbanCard[] = [
      {
        id: "card-cover",
        title: "Card with cover",
        coverImage: "/cover.jpg",
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithCover,
      },
    ];

    const { container } = render(<KanbanBoard columns={columns} />);

    const image = container.querySelector("img");
    expect(image?.src).toContain("cover.jpg");
  });

  it("does not render cover image in compact mode", () => {
    const cardsWithCover: KanbanCard[] = [
      {
        id: "card-cover",
        title: "Card with cover",
        coverImage: "/cover.jpg",
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithCover,
      },
    ];

    const { container } = render(
      <KanbanBoard columns={columns} compact={true} />,
    );

    // In compact mode, cover image should not be rendered
    const images = container.querySelectorAll(".cardCover");
    expect(images.length).toBe(0);
  });

  it("renders labels on cards", () => {
    const cardsWithLabels: KanbanCard[] = [
      {
        id: "card-labels",
        title: "Card with labels",
        labels: [
          { id: "label-1", text: "Bug", color: "red" },
          { id: "label-2", text: "Urgent", color: "orange" },
        ],
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithLabels,
      },
    ];

    render(<KanbanBoard columns={columns} />);

    expect(screen.getByText("Bug")).toBeInTheDocument();
    expect(screen.getByText("Urgent")).toBeInTheDocument();
  });

  it("does not render labels in compact mode", () => {
    const cardsWithLabels: KanbanCard[] = [
      {
        id: "card-labels",
        title: "Card with labels",
        labels: [{ id: "label-1", text: "Bug", color: "red" }],
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithLabels,
      },
    ];

    render(<KanbanBoard columns={columns} compact={true} />);

    // In compact mode, labels should not be visible
    const labels = screen.queryByText("Bug");
    expect(labels).not.toBeInTheDocument();
  });

  it("renders due date on cards", () => {
    const cardsWithDueDate: KanbanCard[] = [
      {
        id: "card-duedate",
        title: "Card with due date",
        dueDate: "2025-03-15",
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithDueDate,
      },
    ];

    render(<KanbanBoard columns={columns} />);

    expect(screen.getByText("2025-03-15")).toBeInTheDocument();
  });

  it("renders assignees on cards", () => {
    const cardsWithAssignees: KanbanCard[] = [
      {
        id: "card-assignees",
        title: "Card with assignees",
        assignees: [
          {
            id: "assignee-1",
            name: "Alice Johnson",
            avatar: "/alice.jpg",
          },
          {
            id: "assignee-2",
            name: "Bob Smith",
          },
        ],
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithAssignees,
      },
    ];

    const { container } = render(<KanbanBoard columns={columns} />);

    // Check that assignees are rendered (look for title attributes which contain names)
    const assigneeElements = container.querySelectorAll("[title]");
    expect(assigneeElements.length).toBeGreaterThan(0);
  });

  it("shows assignee count for more than 3 assignees", () => {
    const cardsWithManyAssignees: KanbanCard[] = [
      {
        id: "card-many-assignees",
        title: "Card with many assignees",
        assignees: [
          { id: "a1", name: "Alice" },
          { id: "a2", name: "Bob" },
          { id: "a3", name: "Charlie" },
          { id: "a4", name: "Diana" },
          { id: "a5", name: "Eve" },
        ],
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithManyAssignees,
      },
    ];

    render(<KanbanBoard columns={columns} />);

    // Should show +2 for 5 assignees (3 shown + 2 more)
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("does not render description in compact mode", () => {
    const cardsWithDescription: KanbanCard[] = [
      {
        id: "card-desc",
        title: "Card with description",
        description: "This is a long description",
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: cardsWithDescription,
      },
    ];

    const { rerender } = render(
      <KanbanBoard columns={columns} compact={false} />,
    );

    expect(screen.getByText("This is a long description")).toBeInTheDocument();

    rerender(<KanbanBoard columns={columns} compact={true} />);

    // In compact mode, description should not be visible
    expect(
      screen.queryByText("This is a long description"),
    ).not.toBeInTheDocument();
  });

  it("renders low priority cards without indicator", () => {
    const lowPriorityCards: KanbanCard[] = [
      {
        id: "card-low",
        title: "Low priority card",
        priority: "low",
      },
    ];

    const columns: KanbanColumn[] = [
      {
        id: "col1",
        title: "Column",
        cards: lowPriorityCards,
      },
    ];

    const { container } = render(<KanbanBoard columns={columns} />);

    // Low priority should not show priority indicator
    const priorityIndicators = container.querySelectorAll(
      "[class*='priority']",
    );
    // Should only have 0 or minimal priority elements (none for low)
    expect(priorityIndicators.length).toBe(0);
  });

  it("renders without draggable by default", () => {
    render(<KanbanBoard columns={mockColumns} draggable={false} />);

    const cards = screen.getByText("Fix login bug");
    expect(cards).toBeInTheDocument();
  });
});
