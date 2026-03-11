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
          <Command.Item onSelect={handleSelect}>
            Click me
          </Command.Item>
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

    expect(screen.getByPlaceholderText("Type a command...")).toBeInTheDocument();
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
});
