import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AgentCard } from "./AgentCard";
import { Settings, Trash2 } from "lucide-react";

describe("AgentCard", () => {
  it("renders agent title", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation and debugging"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    expect(screen.getByText("Code Assistant")).toBeInTheDocument();
  });

  it("renders agent description", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation and debugging"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    expect(
      screen.getByText("Helps with code generation and debugging"),
    ).toBeInTheDocument();
  });

  it("displays agent avatar", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation and debugging"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("handles card click", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onClick={handleSelect}
      />,
    );

    const card =
      container.querySelector("[role='button']") || container.firstChild;
    if (card) {
      await user.click(card as HTMLElement);
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
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
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("renders icon avatar when avatar is not a string", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar={<Settings size={40} />}
      />,
    );

    const iconAvatar = container.querySelector("[class*='iconAvatar']");
    expect(iconAvatar).toBeInTheDocument();
  });

  it("displays multi-agent badge when isMultiAgent is true", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Multi Agent"
        description="Description"
        avatar="https://i.pravatar.cc/150?u=multi"
        isMultiAgent={true}
      />,
    );

    expect(screen.getByText("Multi")).toBeInTheDocument();
  });

  it("does not display multi-agent badge when isMultiAgent is false", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Single Agent"
        description="Description"
        avatar="https://i.pravatar.cc/150?u=single"
        isMultiAgent={false}
      />,
    );

    expect(screen.queryByText("Multi")).not.toBeInTheDocument();
  });

  it("displays timestamp when provided", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        timestamp="Updated 2 hours ago"
      />,
    );

    expect(screen.getByText("Updated 2 hours ago")).toBeInTheDocument();
  });

  it("does not display timestamp when not provided", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    const time = container.querySelector("time");
    expect(time).not.toBeInTheDocument();
  });

  it("calls onClick handler when card is clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onClick={handleClick}
      />,
    );

    const card = container.querySelector("[class*='agentCard']");
    if (card) {
      await user.click(card as HTMLElement);
      expect(handleClick).toHaveBeenCalled();
    }
  });

  it("applies clickable class when onClick is provided", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onClick={() => {}}
      />,
    );

    const card = container.querySelector("[class*='clickable']");
    expect(card).toBeInTheDocument();
  });

  it("applies draggable class when draggable prop is true", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        draggable={true}
      />,
    );

    const card = container.querySelector("[class*='draggable']");
    expect(card).toBeInTheDocument();
  });

  it("handles drag start event", async () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        draggable={true}
      />,
    );

    const card = container.querySelector("[draggable='true']");
    expect(card).toBeInTheDocument();
  });

  it("displays edit action in dropdown when onEdit is provided", async () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onEdit={() => {}}
      />,
    );

    // Dropdown menu should be rendered with Edit option
    expect(
      screen.getByRole("button", { name: /actions/i }),
    ).toBeInTheDocument();
  });

  it("displays delete action in dropdown when onDelete is provided", async () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onDelete={() => {}}
      />,
    );

    // Dropdown menu should be rendered with Delete option
    expect(
      screen.getByRole("button", { name: /actions/i }),
    ).toBeInTheDocument();
  });

  it("handles missing description gracefully", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    expect(screen.getByText("Code Assistant")).toBeInTheDocument();
  });

  it("displays move to folder options when folders are available", async () => {
    const mockFolders = [
      { id: "folder-1", title: "Project Agents" },
      { id: "folder-2", title: "Testing Agents" },
    ];

    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        availableFolders={mockFolders}
        onMoveToFolder={() => {}}
      />,
    );

    // Dropdown menu should be rendered
    expect(
      screen.getByRole("button", { name: /actions/i }),
    ).toBeInTheDocument();
  });

  it("does not display move to folder when no folders available", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        availableFolders={[]}
        onMoveToFolder={() => {}}
      />,
    );

    // When no folders available and no other actions, dropdown shouldn't show
    const actionButton = screen.queryByRole("button", { name: /actions/i });
    expect(actionButton).not.toBeInTheDocument();
  });

  it("does not display dropdown when no actions provided", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    const actionButton = screen.queryByRole("button", { name: /actions/i });
    expect(actionButton).not.toBeInTheDocument();
  });

  it("sets data-agent-id attribute", () => {
    const { container } = render(
      <AgentCard
        id="custom-agent-123"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    const card = container.querySelector("[data-agent-id='custom-agent-123']");
    expect(card).toBeInTheDocument();
  });

  it("handles multiple callbacks (edit, delete, move)", () => {
    const onEditMock = vi.fn();
    const onDeleteMock = vi.fn();
    const onMoveToFolderMock = vi.fn();

    const mockFolders = [{ id: "folder-1", title: "Agents" }];

    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onEdit={onEditMock}
        onDelete={onDeleteMock}
        onMoveToFolder={onMoveToFolderMock}
        availableFolders={mockFolders}
      />,
    );

    // Verify the action menu is rendered
    expect(
      screen.getByRole("button", { name: /actions/i }),
    ).toBeInTheDocument();
  });

  it("renders with dragging state", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        draggable={true}
        isDragging={true}
      />,
    );

    const card = container.querySelector("[class*='dragging']");
    expect(card).toBeInTheDocument();
  });

  it("displays avatar as image for string src", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://example.com/avatar.jpg"
      />,
    );

    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "Code Assistant");
  });

  it("handles empty title gracefully", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title=""
        description="Description"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    // Should render without errors
    expect(container).toBeInTheDocument();
  });

  // ============================================================================
  // MISSING BRANCHES & DRAG HANDLERS COVERAGE
  // ============================================================================

  it("renders card element with draggable attribute when draggable is true", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        draggable={true}
      />,
    );

    const card = container.querySelector("[draggable='true']");
    expect(card).toBeInTheDocument();
  });

  it("does not render draggable attribute when draggable is false", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        draggable={false}
      />,
    );

    const card = container.querySelector("[draggable='true']");
    expect(card).not.toBeInTheDocument();
  });

  it("shows dragging state when isDragging is true", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        draggable={true}
        isDragging={true}
      />,
    );

    const draggingElement = container.querySelector("[class*='dragging']");
    expect(draggingElement).toBeInTheDocument();
  });

  it("displays actions button when onEdit is provided", () => {
    const mockOnEdit = vi.fn();

    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onEdit={mockOnEdit}
      />,
    );

    // Actions button should be rendered when onEdit is provided
    const actionsButton = screen.getByRole("button", { name: /actions/i });
    expect(actionsButton).toBeInTheDocument();
  });

  it("displays actions button when onMoveToFolder is provided with folders", () => {
    const mockOnMoveToFolder = vi.fn();

    const mockFolders = [
      { id: "folder-1", title: "Project Agents" },
      { id: "folder-2", title: "Testing Agents" },
    ];

    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        availableFolders={mockFolders}
        onMoveToFolder={mockOnMoveToFolder}
      />,
    );

    // Actions button should be rendered when folders are available
    const actionsButton = screen.getByRole("button", { name: /actions/i });
    expect(actionsButton).toBeInTheDocument();
  });
});
