import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders with FAB variant by default", () => {
    const { container } = render(<QuickActions actions={mockActions} />);
    const quickActions = container.firstChild as HTMLElement;
    expect(quickActions.className).toMatch(/variant-fab/);
  });

  it("renders with bar variant", () => {
    const { container } = render(
      <QuickActions variant="bar" actions={mockActions} />,
    );
    const quickActions = container.firstChild as HTMLElement;
    expect(quickActions.className).toMatch(/variant-bar/);
  });

  it("renders with menu variant", () => {
    const { container } = render(
      <QuickActions variant="menu" actions={mockActions} />,
    );
    const quickActions = container.firstChild as HTMLElement;
    expect(quickActions.className).toMatch(/variant-menu/);
  });

  it("renders with different position variants", () => {
    const positions = ["top-left", "top-right", "bottom-left", "bottom-right"];

    positions.forEach((position) => {
      const { container } = render(
        <QuickActions position={position as any} actions={mockActions} />,
      );
      const quickActions = container.firstChild as HTMLElement;
      expect(quickActions.className).toMatch(
        new RegExp(`position-${position}`),
      );
    });
  });

  it("applies fixed class when fixed prop is true", () => {
    const { container } = render(
      <QuickActions fixed={true} actions={mockActions} />,
    );
    const quickActions = container.firstChild as HTMLElement;
    expect(quickActions.className).toMatch(/fixed/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <QuickActions actions={mockActions} className="custom-class" />,
    );
    const quickActions = container.firstChild as HTMLElement;
    expect(quickActions.className).toContain("custom-class");
  });

  it("toggles open state on FAB trigger click", async () => {
    const user = userEvent.setup();
    render(<QuickActions actions={mockActions} />);

    const trigger = screen.getByLabelText("Open actions");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("closes FAB when action is clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const actions = [
      { id: "test", label: "Test", icon: null, onClick: handleClick },
    ];

    render(<QuickActions actions={actions} />);

    const trigger = screen.getByLabelText("Open actions");
    await user.click(trigger);

    const action = screen.getByTitle("Test");
    await user.click(action);

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("does not call disabled actions", () => {
    const handleClick = vi.fn();

    const actions = [
      {
        id: "test",
        label: "Test",
        icon: null,
        onClick: handleClick,
        disabled: true,
      },
    ];

    render(<QuickActions actions={actions} />);

    const button = screen.getByTitle("Test") as HTMLButtonElement;
    expect(button.disabled).toBe(true);

    // Use fireEvent to click disabled button (userEvent prevents this)
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows labels when showLabels prop is true", () => {
    render(<QuickActions actions={mockActions} showLabels={true} />);

    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    render(<QuickActions actions={mockActions} />);

    const trigger = screen.getByLabelText("Open actions");
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on click outside", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button>Outside</button>
        <QuickActions actions={mockActions} />
      </>,
    );

    const trigger = screen.getByLabelText("Open actions");
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByText("Outside"));

    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("renders disabled action with disabled class", () => {
    const actions = [
      {
        id: "test",
        label: "Test",
        icon: null,
        onClick: vi.fn(),
        disabled: true,
      },
    ];

    const { container } = render(<QuickActions actions={actions} />);

    const button = screen.getByTitle("Test") as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.className).toMatch(/actionDisabled/);
  });

  it("renders action with custom variant", () => {
    const actions = [
      {
        id: "test",
        label: "Test",
        icon: null,
        onClick: vi.fn(),
        variant: "primary",
      },
    ];

    const { container } = render(<QuickActions actions={actions} />);

    const button = screen.getByTitle("Test");
    expect(button.className).toMatch(/action-primary/);
  });

  it("shows action shortcut in bar variant", () => {
    const actions = [
      {
        id: "test",
        label: "Test",
        icon: null,
        onClick: vi.fn(),
        shortcut: "⌘T",
      },
    ];

    render(<QuickActions variant="bar" actions={actions} />);

    expect(screen.getByText("⌘T")).toBeInTheDocument();
  });

  it("applies offset style", () => {
    const { container } = render(
      <QuickActions actions={mockActions} offset={48} />,
    );

    const quickActions = container.firstChild as HTMLElement;
    const style = window.getComputedStyle(quickActions);
    expect(quickActions.style.getPropertyValue("--offset")).toBe("48px");
  });

  it("renders trigger with custom icon", async () => {
    const user = userEvent.setup();
    const customIcon = <Edit size={24} />;

    render(<QuickActions actions={mockActions} triggerIcon={customIcon} />);

    // Trigger should render with custom icon
    const trigger = screen.getByLabelText("Open actions");
    expect(trigger).toBeInTheDocument();
  });

  it("executes primary action immediately on FAB click", async () => {
    const user = userEvent.setup();
    const primaryActionClick = vi.fn();

    const primaryAction = {
      id: "primary",
      label: "Primary",
      icon: <Plus size={24} />,
      onClick: primaryActionClick,
    };

    render(
      <QuickActions actions={mockActions} primaryAction={primaryAction} />,
    );

    const trigger = screen.getByLabelText("Open actions");
    await user.click(trigger);

    expect(primaryActionClick).toHaveBeenCalled();
  });

  it("renders menu variant", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const actions = [
      {
        id: "action1",
        label: "Action 1",
        icon: <Plus size={20} />,
        onClick: handleClick,
      },
    ];

    render(<QuickActions variant="menu" actions={actions} />);

    // Click trigger to open menu
    const trigger = screen.getByLabelText("Open menu");
    await user.click(trigger);

    // Menu items should be visible
    expect(screen.getByText("Action 1")).toBeInTheDocument();

    // Click action
    const actionButton = screen.getByText("Action 1");
    await user.click(actionButton);

    expect(handleClick).toHaveBeenCalled();
  });

  it("closes menu variant when trigger clicked again", async () => {
    const user = userEvent.setup();

    const actions = [
      {
        id: "test",
        label: "Test",
        icon: <Plus size={20} />,
        onClick: vi.fn(),
      },
    ];

    render(<QuickActions variant="menu" actions={actions} />);

    const trigger = screen.getByLabelText("Open menu");

    // Open menu
    await user.click(trigger);
    expect(screen.getByText("Test")).toBeInTheDocument();

    // Close menu
    await user.click(trigger);
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });

  it("renders bar variant with all actions visible", () => {
    render(<QuickActions variant="bar" actions={mockActions} />);

    // All actions should be visible in bar variant
    expect(screen.getByTitle("Add")).toBeInTheDocument();
    expect(screen.getByTitle("Edit")).toBeInTheDocument();
    expect(screen.getByTitle("Delete")).toBeInTheDocument();
  });

  it("executes action when clicked in bar variant", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const actions = [
      {
        id: "test",
        label: "Test",
        icon: <Plus size={20} />,
        onClick: handleClick,
      },
    ];

    render(<QuickActions variant="bar" actions={actions} />);

    const button = screen.getByTitle("Test");
    await user.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
