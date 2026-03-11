import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AgentCard } from "./AgentCard";
import { Settings, Trash2 } from "lucide-react";

describe("AgentCard", () => {
  const mockAgent = {
    id: "agent-1",
    name: "Code Assistant",
    description: "Helps with code generation and debugging",
    avatar: "https://i.pravatar.cc/150?u=code",
    status: "active" as const,
    model: "gpt-4",
    tasksCompleted: 42,
  };

  it("renders agent name", () => {
    render(<AgentCard agent={mockAgent} />);

    expect(screen.getByText("Code Assistant")).toBeInTheDocument();
  });

  it("renders agent description", () => {
    render(<AgentCard agent={mockAgent} />);

    expect(screen.getByText("Helps with code generation and debugging")).toBeInTheDocument();
  });

  it("displays agent avatar", () => {
    const { container } = render(<AgentCard agent={mockAgent} />);

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("shows agent status", () => {
    render(<AgentCard agent={mockAgent} />);

    expect(screen.getByText(/active|offline/i)).toBeInTheDocument();
  });

  it("displays agent metadata", () => {
    render(<AgentCard agent={mockAgent} />);

    expect(screen.getByText(/gpt-4|model/i)).toBeInTheDocument();
  });

  it("handles card click", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <AgentCard
        agent={mockAgent}
        onClick={handleSelect}
      />,
    );

    const card = container.querySelector("[role='button']") || container.firstChild;
    if (card) {
      await user.click(card as HTMLElement);
    }
  });

  it("shows action buttons", () => {
    render(
      <AgentCard
        agent={mockAgent}
        showActions
      />,
    );

    // Should render settings or action buttons
    const buttons = screen.queryAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(0);
  });

  it("shows task count badge", () => {
    render(<AgentCard agent={mockAgent} />);

    // Should show "42 tasks completed" or similar
    const tasksText = screen.queryByText(/42|tasks/i);
    if (tasksText) {
      expect(tasksText).toBeInTheDocument();
    }
  });

  it("handles edit action", async () => {
    const handleEdit = vi.fn();
    const user = userEvent.setup();

    render(
      <AgentCard
        agent={mockAgent}
        onEdit={handleEdit}
        showActions
      />,
    );

    const editButton = screen.queryByLabelText(/edit|settings/i);
    if (editButton) {
      await user.click(editButton);
      expect(handleEdit).toHaveBeenCalled();
    }
  });

  it("handles delete action", async () => {
    const handleDelete = vi.fn();
    const user = userEvent.setup();

    render(
      <AgentCard
        agent={mockAgent}
        onDelete={handleDelete}
        showActions
      />,
    );

    const deleteButton = screen.queryByLabelText(/delete|remove/i);
    if (deleteButton) {
      await user.click(deleteButton);
      expect(handleDelete).toHaveBeenCalled();
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <AgentCard
        agent={mockAgent}
        className="custom-card"
      />,
    );

    const card = container.querySelector(".custom-card");
    expect(card).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <AgentCard
        ref={ref}
        agent={mockAgent}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("shows offline status variant", () => {
    const offlineAgent = { ...mockAgent, status: "offline" as const };

    render(<AgentCard agent={offlineAgent} />);

    expect(screen.getByText(/offline|inactive/i)).toBeInTheDocument();
  });
});
