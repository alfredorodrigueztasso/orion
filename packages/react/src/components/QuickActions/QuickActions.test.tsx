import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuickActions } from "./QuickActions";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { QuickAction } from "./QuickActions.types";

describe("QuickActions", () => {
  const mockActions: QuickAction[] = [
    {
      id: "add",
      label: "Add",
      icon: <Plus size={20} />,
      onClick: vi.fn(),
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit size={20} />,
      onClick: vi.fn(),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 size={20} />,
      onClick: vi.fn(),
    },
  ];

  it("renders all actions", () => {
    render(<QuickActions actions={mockActions} />);

    expect(screen.getByTitle("Add")).toBeInTheDocument();
    expect(screen.getByTitle("Edit")).toBeInTheDocument();
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });

  it("executes action on click", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    const actions = [
      { id: "test", label: "Test", icon: null, onClick: handleClick },
    ];

    render(<QuickActions actions={actions} />);

    const button = screen.getByTitle("Test");
    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<QuickActions ref={ref} variant="bar" actions={mockActions} />);
    expect(ref).toHaveBeenCalled();
  });
});
