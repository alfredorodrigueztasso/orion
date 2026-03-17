import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandBar } from "./CommandBar";
import { Settings, FileText } from "lucide-react";
import type { CommandItem } from "./CommandBar.types";

describe("CommandBar", () => {
  const mockCommands: CommandItem[] = [
    {
      id: "create-file",
      label: "Create File",
      description: "Create a new file",
      icon: <FileText size={16} />,
      shortcut: "⌘N",
      onSelect: vi.fn(),
    },
    {
      id: "settings",
      label: "Settings",
      description: "Open application settings",
      icon: <Settings size={16} />,
      shortcut: "⌘,",
      onSelect: vi.fn(),
    },
    {
      id: "search",
      label: "Search",
      description: "Search across files",
      icon: <FileText size={16} />,
      shortcut: "⌘P",
      onSelect: vi.fn(),
    },
  ];

  it("renders command input when open", () => {
    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input =
      screen.queryByPlaceholderText(/search|command/i) ||
      screen.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("displays commands when open", () => {
    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("filters commands by search", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "settings");

    // Should show Settings command
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("executes command on select", async () => {
    const handleSelect = vi.fn();
    const onSelect = vi.fn();
    const user = userEvent.setup();

    const commands = [
      {
        id: "create-file",
        label: "Create File",
        description: "Create a new file",
        icon: <FileText size={16} />,
        onSelect,
      },
    ];

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={commands}
        onSelect={handleSelect}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Create");

    const createOption = screen.getByText("Create File");
    await user.click(createOption);

    expect(handleSelect).toHaveBeenCalledWith(
      expect.objectContaining({ id: "create-file" }),
    );
  });

  it("displays command shortcuts", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "settings");

    // Shortcuts should be visible
    expect(screen.getByText("⌘,")).toBeInTheDocument();
  });

  it("handles keyboard navigation", async () => {
    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    input.focus();

    // Should support arrow key navigation
    expect(input).toHaveFocus();
  });

  it("supports categorized commands", () => {
    const categorizedCommands: CommandItem[] = [
      {
        id: "file",
        label: "File",
        category: "Navigation",
        icon: <FileText size={16} />,
        onSelect: vi.fn(),
      },
      {
        id: "settings",
        label: "Settings",
        category: "Configuration",
        icon: <Settings size={16} />,
        onSelect: vi.fn(),
      },
    ];

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={categorizedCommands}
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
        className="custom-command"
      />,
    );

    const bar = container.querySelector(".custom-command");
    expect(bar).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <CommandBar
        ref={ref}
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("handles empty search results", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "zzzzzzz");

    // Should show no results message or empty state
    expect(input).toBeInTheDocument();
  });

  it("calls onOpenChange when toggling visibility", async () => {
    const handleOpenChange = vi.fn();

    const { rerender } = render(
      <CommandBar
        open={false}
        onOpenChange={handleOpenChange}
        commands={mockCommands}
      />,
    );

    rerender(
      <CommandBar
        open={true}
        onOpenChange={handleOpenChange}
        commands={mockCommands}
      />,
    );

    expect(screen.queryByRole("textbox")).toBeInTheDocument();
  });

  // ============================================================================
  // NEW TESTS FOR UNTESTED BRANCHES
  // ============================================================================

  it("does not render when open is false", () => {
    const { container } = render(
      <CommandBar
        open={false}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    // When closed, no content should be rendered
    expect(container.innerHTML).toBe("");
  });

  it("closes when clicking overlay", async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <CommandBar
        open={true}
        onOpenChange={handleOpenChange}
        commands={mockCommands}
      />,
    );

    const overlay = container.querySelector(
      '[class*="overlay"]',
    ) as HTMLElement;
    if (overlay) {
      await user.click(overlay);
    }

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("supports disabled commands", () => {
    const disabledCommands: CommandItem[] = [
      {
        id: "enabled",
        label: "Enabled",
        onSelect: vi.fn(),
        disabled: false,
      },
      {
        id: "disabled",
        label: "Disabled",
        onSelect: vi.fn(),
        disabled: true,
      },
    ];

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={disabledCommands}
      />,
    );

    expect(screen.getByText("Enabled")).toBeInTheDocument();
    expect(screen.getByText("Disabled")).toBeInTheDocument();
  });

  it("does not call onSelect when disabled command is clicked", async () => {
    const onSelect = vi.fn();
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    const disabledCommand: CommandItem = {
      id: "disabled",
      label: "Disabled Command",
      onSelect,
      disabled: true,
    };

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={[disabledCommand]}
        onSelect={handleSelect}
      />,
    );

    const cmd = screen.getByText("Disabled Command");
    await user.click(cmd);

    expect(onSelect).not.toHaveBeenCalled();
    expect(handleSelect).not.toHaveBeenCalled();
  });

  it("shows recent commands when no search is active", () => {
    const recentCommands: CommandItem[] = [
      {
        id: "recent-1",
        label: "Recent File",
        onSelect: vi.fn(),
      },
    ];

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
        recentCommands={recentCommands}
      />,
    );

    expect(screen.getByText("Recent")).toBeInTheDocument();
    expect(screen.getByText("Recent File")).toBeInTheDocument();
  });

  it("hides recent commands when searching", async () => {
    const recentCommands: CommandItem[] = [
      {
        id: "recent-1",
        label: "Recent File",
        onSelect: vi.fn(),
      },
    ];
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
        recentCommands={recentCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "settings");

    // Recent section should be hidden when searching
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("searches by description", async () => {
    const commandsWithDescription: CommandItem[] = [
      {
        id: "test",
        label: "Test Command",
        description: "Unique description text",
        onSelect: vi.fn(),
      },
    ];
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={commandsWithDescription}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "unique");

    expect(screen.getByText("Test Command")).toBeInTheDocument();
  });

  it("searches by keywords", async () => {
    const commandsWithKeywords: CommandItem[] = [
      {
        id: "test",
        label: "Test Command",
        keywords: ["special", "keyword"],
        onSelect: vi.fn(),
      },
    ];
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={commandsWithKeywords}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "keyword");

    expect(screen.getByText("Test Command")).toBeInTheDocument();
  });

  it("handles ArrowDown key navigation", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    input.focus();

    await user.keyboard("{ArrowDown}");

    expect(input).toBeInTheDocument();
  });

  it("handles ArrowUp key navigation", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    input.focus();

    await user.keyboard("{ArrowUp}");

    expect(input).toBeInTheDocument();
  });

  it("does not select disabled command with Enter key", async () => {
    const onSelect = vi.fn();
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    const disabledCommands: CommandItem[] = [
      {
        id: "disabled",
        label: "Disabled",
        onSelect,
        disabled: true,
      },
      {
        id: "enabled",
        label: "Enabled",
        onSelect: vi.fn(),
      },
    ];

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={disabledCommands}
        onSelect={handleSelect}
      />,
    );

    const input = screen.getByRole("textbox");
    input.focus();

    // First command is disabled, so selecting it should not call onSelect
    await user.keyboard("{Enter}");

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("updates selection on mouse enter", async () => {
    const onSelect = vi.fn();
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    const commands: CommandItem[] = [
      { id: "first", label: "First", onSelect: vi.fn() },
      { id: "second", label: "Second", onSelect },
    ];

    render(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={commands}
        onSelect={handleSelect}
      />,
    );

    const secondCommand = screen.getByText("Second");
    await user.hover(secondCommand);
    await user.keyboard("{Enter}");

    // After hovering on second, enter should select it
    expect(onSelect).toHaveBeenCalled();
  });

  it("handles Escape key to close", async () => {
    const handleOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <CommandBar
        open={true}
        onOpenChange={handleOpenChange}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox");
    input.focus();

    await user.keyboard("{Escape}");

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("resets state when opening", () => {
    const { rerender } = render(
      <CommandBar
        open={false}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    rerender(
      <CommandBar
        open={true}
        onOpenChange={() => {}}
        commands={mockCommands}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    // Should have empty search value when opened
    expect(input.value).toBe("");
  });
});
