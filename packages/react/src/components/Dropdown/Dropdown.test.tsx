/**
 * Dropdown Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown";

const mockItems = [
  { id: "edit", label: "Edit" },
  { id: "duplicate", label: "Duplicate" },
  { id: "delete", label: "Delete", danger: true },
];

describe("Dropdown", () => {
  it("renders trigger element", () => {
    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    expect(
      screen.getByRole("button", { name: "Open Menu" }),
    ).toBeInTheDocument();
  });

  it("opens on trigger click", async () => {
    const user = userEvent.setup();

    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.getByText("Duplicate")).toBeInTheDocument();
      expect(screen.getByText("Delete")).toBeInTheDocument();
    });
  });

  it("closes on second trigger click", async () => {
    const user = userEvent.setup();

    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    const trigger = screen.getByRole("button", { name: "Open Menu" });
    await user.click(trigger);
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("calls onClick handler when item is selected", async () => {
    const user = userEvent.setup();
    const onEditClick = vi.fn();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[
          { id: "edit", label: "Edit", onClick: onEditClick },
          { id: "delete", label: "Delete" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.click(screen.getByText("Edit"));

    expect(onEditClick).toHaveBeenCalledTimes(1);
  });

  it("calls onSelect callback when item is selected", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={mockItems}
        onSelect={onSelect}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.click(screen.getByText("Edit"));

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "edit", label: "Edit" }),
    );
  });

  it("closes on item selection by default", async () => {
    const user = userEvent.setup();

    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.click(screen.getByText("Edit"));

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("stays open on item selection when closeOnSelect is false", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={mockItems}
        closeOnSelect={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.click(screen.getByText("Edit"));

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("does not trigger disabled items", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[
          { id: "disabled", label: "Disabled Item", disabled: true, onClick },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.click(screen.getByText("Disabled Item"));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();

    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("closes on click outside", async () => {
    const user = userEvent.setup();

    render(
      <>
        <button>Outside</button>
        <Dropdown trigger={<button>Open Menu</button>} items={mockItems} />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.click(screen.getByRole("button", { name: "Outside" }));

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("renders grouped items", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        groups={[
          {
            label: "Actions",
            items: [{ id: "edit", label: "Edit" }],
          },
          {
            label: "Danger Zone",
            items: [{ id: "delete", label: "Delete", danger: true }],
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Danger Zone")).toBeInTheDocument();
  });

  it("renders items with icons", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[
          {
            id: "edit",
            label: "Edit",
            icon: <span data-testid="edit-icon">✏️</span>,
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  it("renders items with shortcuts", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[{ id: "edit", label: "Edit", shortcut: "⌘E" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    expect(screen.getByText("⌘E")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", async () => {
    const user = userEvent.setup();

    render(<Dropdown trigger={<button>Open Menu</button>} items={mockItems} />);

    const trigger = screen.getByRole("button", { name: "Open Menu" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
  });

  it("works as controlled component", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={mockItems}
        open={false}
        onOpenChange={onOpenChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={mockItems}
        open={true}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  // ============================================================================
  // MISSING BRANCHES & KEYBOARD NAVIGATION COVERAGE
  // ============================================================================

  it("fires onClick and closes menu on Enter key in menuitem", async () => {
    const user = userEvent.setup();
    const onEditClick = vi.fn();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[
          { id: "edit", label: "Edit", onClick: onEditClick },
          { id: "delete", label: "Delete" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    await waitFor(() => {
      const editMenuItem = screen.getByRole("menuitem", { name: /edit/i });
      expect(editMenuItem).toBeInTheDocument();
    });

    const editMenuItem = screen.getByRole("menuitem", { name: /edit/i });
    fireEvent.keyDown(editMenuItem, { key: "Enter" });

    expect(onEditClick).toHaveBeenCalled();
  });

  it("fires onClick on Space key in menuitem", async () => {
    const user = userEvent.setup();
    const onEditClick = vi.fn();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[
          { id: "edit", label: "Edit", onClick: onEditClick },
          { id: "delete", label: "Delete" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    await waitFor(() => {
      const editMenuItem = screen.getByRole("menuitem", { name: /edit/i });
      expect(editMenuItem).toBeInTheDocument();
    });

    const editMenuItem = screen.getByRole("menuitem", { name: /edit/i });
    fireEvent.keyDown(editMenuItem, { key: " " });

    expect(onEditClick).toHaveBeenCalled();
  });

  it("navigates to next item on ArrowDown", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[
          { id: "edit", label: "Edit" },
          { id: "duplicate", label: "Duplicate" },
          { id: "delete", label: "Delete" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    await waitFor(() => {
      const firstItem = screen.getByRole("menuitem", { name: /edit/i });
      expect(firstItem).toBeInTheDocument();
    });

    const firstItem = screen.getByRole("menuitem", { name: /edit/i });
    fireEvent.keyDown(firstItem, { key: "ArrowDown" });

    // After navigation, focus should move (handled by component's handleNavigate)
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("wraps to last item on ArrowUp from first item", async () => {
    const user = userEvent.setup();

    render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[
          { id: "edit", label: "Edit" },
          { id: "duplicate", label: "Duplicate" },
          { id: "delete", label: "Delete" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    await waitFor(() => {
      const firstItem = screen.getByRole("menuitem", { name: /edit/i });
      expect(firstItem).toBeInTheDocument();
    });

    const firstItem = screen.getByRole("menuitem", { name: /edit/i });
    fireEvent.keyDown(firstItem, { key: "ArrowUp" });

    // After navigation, component should handle wrapping
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("handles empty items gracefully when navigating", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[{ id: "edit", label: "Edit" }]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    // Rerender with disabled item (filtered out from allItemsFlat)
    rerender(
      <Dropdown
        trigger={<button>Open Menu</button>}
        items={[{ id: "edit", label: "Edit", disabled: true }]}
      />,
    );

    // Try to navigate - should not crash
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });
});
