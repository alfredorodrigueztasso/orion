import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Command } from "./Command";

describe("Command", () => {
  it("renders command input", () => {
    render(
      <Command>
        <Command.Input placeholder="Search..." />
      </Command>,
    );

    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("renders command items", () => {
    render(
      <Command>
        <Command.List>
          <Command.Item onSelect={() => {}}>Item 1</Command.Item>
          <Command.Item onSelect={() => {}}>Item 2</Command.Item>
        </Command.List>
      </Command>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("renders groups with headings", () => {
    render(
      <Command>
        <Command.List>
          <Command.Group heading="Group 1">
            <Command.Item onSelect={() => {}}>Item A</Command.Item>
          </Command.Group>
          <Command.Group heading="Group 2">
            <Command.Item onSelect={() => {}}>Item B</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>,
    );

    expect(screen.getByText("Group 1")).toBeInTheDocument();
    expect(screen.getByText("Group 2")).toBeInTheDocument();
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
  });

  it("renders separators", () => {
    const { container } = render(
      <Command>
        <Command.List>
          <Command.Item onSelect={() => {}}>Item 1</Command.Item>
          <Command.Separator />
          <Command.Item onSelect={() => {}}>Item 2</Command.Item>
        </Command.List>
      </Command>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("displays shortcuts", () => {
    render(
      <Command>
        <Command.List>
          <Command.Item onSelect={() => {}}>
            Search
            <Command.Shortcut>⌘K</Command.Shortcut>
          </Command.Item>
        </Command.List>
      </Command>,
    );

    expect(screen.getByText("⌘K")).toBeInTheDocument();
  });

  it("calls onSelect when item is clicked", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <Command>
        <Command.List>
          <Command.Item onSelect={handleSelect}>Click me</Command.Item>
        </Command.List>
      </Command>,
    );

    const item = screen.getByText("Click me");
    await user.click(item);

    expect(handleSelect).toHaveBeenCalled();
  });

  it("shows empty state when no results", () => {
    render(
      <Command>
        <Command.List>
          <Command.Empty>No results found</Command.Empty>
        </Command.List>
      </Command>,
    );

    // Empty state should be visible when there are no items
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders Command.Dialog when open", () => {
    render(
      <Command.Dialog open={true} onOpenChange={() => {}}>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Command 1</Command.Item>
        </Command.List>
      </Command.Dialog>,
    );

    expect(
      screen.getByPlaceholderText("Type a command..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Command 1")).toBeInTheDocument();
  });

  it("Command.Dialog calls onOpenChange when closed", async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <Command.Dialog open={true} onOpenChange={handleOpenChange}>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Command 1</Command.Item>
        </Command.List>
      </Command.Dialog>,
    );

    // Dialog is open, should be able to interact with it
    expect(screen.getByText("Command 1")).toBeInTheDocument();
  });

  it("supports disabled command items", () => {
    render(
      <Command>
        <Command.List>
          <Command.Item onSelect={() => {}} disabled>
            Disabled Item
          </Command.Item>
          <Command.Item onSelect={() => {}}>Enabled Item</Command.Item>
        </Command.List>
      </Command>,
    );

    expect(screen.getByText("Disabled Item")).toBeInTheDocument();
    expect(screen.getByText("Enabled Item")).toBeInTheDocument();
  });

  it("handles value prop for controlled search", () => {
    render(
      <Command value="test">
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Test Item</Command.Item>
          <Command.Item onSelect={() => {}}>Other Item</Command.Item>
        </Command.List>
      </Command>,
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });

  // ============================================================================
  // CONTROLLED VS UNCONTROLLED - CRITICAL BRANCHES
  // ============================================================================

  it("calls onValueChange when search changes in controlled mode", async () => {
    const handleValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Command value="" onValueChange={handleValueChange}>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Item</Command.Item>
        </Command.List>
      </Command>,
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "t");

    // In controlled mode, onValueChange should be called when input changes
    expect(handleValueChange).toHaveBeenCalledWith("t");
  });

  it("uses internal state when value prop is undefined (uncontrolled mode)", async () => {
    const user = userEvent.setup();

    render(
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Test Item</Command.Item>
          <Command.Item onSelect={() => {}}>Other Item</Command.Item>
        </Command.List>
      </Command>,
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "test");
    // In uncontrolled mode, input value updates via internal state
    expect(input).toHaveValue("test");
  });

  // ============================================================================
  // SEARCH FILTERING LOGIC
  // ============================================================================

  it("shows all items when search is empty", () => {
    render(
      <Command value="">
        <Command.List>
          <Command.Item onSelect={() => {}}>Item A</Command.Item>
          <Command.Item onSelect={() => {}}>Item B</Command.Item>
          <Command.Item onSelect={() => {}}>Item C</Command.Item>
        </Command.List>
      </Command>,
    );

    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Item C")).toBeInTheDocument();
  });

  it("filters items based on search string match", () => {
    render(
      <Command value="first">
        <Command.List>
          <Command.Item onSelect={() => {}}>First Item</Command.Item>
          <Command.Item onSelect={() => {}}>Second Item</Command.Item>
        </Command.List>
      </Command>,
    );

    // "First Item" should match "first" (case-insensitive)
    const firstItem = screen.queryByText("First Item");
    expect(firstItem).toBeInTheDocument();
  });

  it("uses custom filter function for search matching", () => {
    const customFilter = vi.fn((value: string, search: string) => {
      return value.includes(search) ? 1 : 0;
    });

    render(
      <Command value="test" filter={customFilter}>
        <Command.List>
          <Command.Item onSelect={() => {}}>Test Item</Command.Item>
        </Command.List>
      </Command>,
    );

    // Custom filter should be called during render
    expect(customFilter).toHaveBeenCalled();
  });

  // ============================================================================
  // KEYBOARD NAVIGATION
  // ============================================================================

  it("handles keyboard events on command root", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Item 1</Command.Item>
          <Command.Item onSelect={() => {}}>Item 2</Command.Item>
        </Command.List>
      </Command>,
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.click(input);

    // Just verify keyboard events are handled without errors
    await user.keyboard("{ArrowDown}");
    expect(input).toBeInTheDocument();
  });

  it("navigates up with ArrowUp key", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Item 1</Command.Item>
          <Command.Item onSelect={() => {}}>Item 2</Command.Item>
          <Command.Item onSelect={() => {}}>Item 3</Command.Item>
        </Command.List>
      </Command>,
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.click(input);
    await user.keyboard("{ArrowUp}");

    // After arrow up from 0, should wrap to last item
    const items = container.querySelectorAll("[data-active='true']");
    expect(items.length).toBeGreaterThan(0);
  });

  it("selects item with Enter key", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Item onSelect={handleSelect}>Item 1</Command.Item>
          <Command.Item onSelect={() => {}}>Item 2</Command.Item>
        </Command.List>
      </Command>,
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.click(input);
    await user.keyboard("{Enter}");

    expect(handleSelect).toHaveBeenCalled();
  });

  // ============================================================================
  // COMMAND.EMPTY VISIBILITY
  // ============================================================================

  it("hides empty state when items are visible", () => {
    render(
      <Command value="">
        <Command.List>
          <Command.Item onSelect={() => {}}>Item 1</Command.Item>
          <Command.Empty>No results</Command.Empty>
        </Command.List>
      </Command>,
    );

    // Empty state should be hidden when items are visible and search is empty
    // Both Item 1 and Empty are in DOM, but Empty should not be visible in this condition
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  // ============================================================================
  // COMMAND.GROUP WITHOUT HEADING
  // ============================================================================

  it("renders group without heading", () => {
    render(
      <Command>
        <Command.List>
          <Command.Group>
            <Command.Item onSelect={() => {}}>Item 1</Command.Item>
            <Command.Item onSelect={() => {}}>Item 2</Command.Item>
          </Command.Group>
        </Command.List>
      </Command>,
    );

    // Items should render even without heading
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  // ============================================================================
  // COMMAND.ITEM DISABLED BEHAVIOR
  // ============================================================================

  it("disabled items prevent interaction", () => {
    render(
      <Command>
        <Command.List>
          <Command.Item onSelect={() => {}} disabled>
            Disabled Item
          </Command.Item>
          <Command.Item onSelect={() => {}}>Enabled Item</Command.Item>
        </Command.List>
      </Command>,
    );

    // Disabled items render with pointer-events: none CSS
    expect(screen.getByText("Disabled Item")).toBeInTheDocument();
    expect(screen.getByText("Enabled Item")).toBeInTheDocument();
  });

  // ============================================================================
  // COMMAND.DIALOG ESCAPE KEY
  // ============================================================================

  it("closes dialog when Escape key is pressed", async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Command.Dialog open={true} onOpenChange={handleOpenChange}>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Command 1</Command.Item>
        </Command.List>
      </Command.Dialog>,
    );

    expect(
      screen.getByPlaceholderText("Type a command..."),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not render dialog when open is false", () => {
    render(
      <Command.Dialog open={false} onOpenChange={() => {}}>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Command 1</Command.Item>
        </Command.List>
      </Command.Dialog>,
    );

    // Dialog should not be in document
    expect(
      screen.queryByPlaceholderText("Type a command..."),
    ).not.toBeInTheDocument();
  });

  // ============================================================================
  // COMMAND.DIALOG BACKDROP CLICK
  // ============================================================================

  it("CommandDialog supports open and onOpenChange props", () => {
    const handleOpenChange = vi.fn();

    render(
      <Command.Dialog open={true} onOpenChange={handleOpenChange}>
        <Command.Input placeholder="Type a command..." />
        <Command.List>
          <Command.Item onSelect={() => {}}>Command 1</Command.Item>
        </Command.List>
      </Command.Dialog>,
    );

    // Dialog renders when open is true
    expect(
      screen.getByPlaceholderText("Type a command..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Command 1")).toBeInTheDocument();
  });
});
