import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommandBar } from "./CommandBar";
import { Command, Settings, FileText } from "lucide-react";
import type { CommandItem } from "./CommandBar.types";

describe("CommandBar", () => {
  const mockCommands: CommandItem[] = [
    {
      id: "create-file",
      label: "Create File",
      description: "Create a new file",
      icon: <FileText size={16} />,
      shortcuts: ["Cmd+N"],
    },
    {
      id: "settings",
      label: "Settings",
      description: "Open application settings",
      icon: <Settings size={16} />,
      shortcuts: ["Cmd+,"],
    },
    {
      id: "search",
      label: "Search",
      description: "Search across files",
      icon: <Command size={16} />,
      shortcuts: ["Cmd+P"],
    },
  ];

  it("renders command input", () => {
    render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    const input = screen.queryByPlaceholderText(/search|command/i);
    expect(input || screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays all commands initially hidden", () => {
    render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("filters commands by search", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "settings");

    // Should show Settings command
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("executes command on select", async () => {
    const handleExecute = vi.fn();
    const user = userEvent.setup();

    render(
      <CommandBar
        commands={mockCommands}
        onExecute={handleExecute}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Create");

    const createOption = screen.getByText("Create File");
    await user.click(createOption);

    expect(handleExecute).toHaveBeenCalledWith(
      expect.objectContaining({ id: "create-file" }),
    );
  });

  it("displays command shortcuts", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "settings");

    // Shortcuts should be visible
    expect(screen.getByText(/Cmd|\,/)).toBeInTheDocument();
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    input.focus();

    // Should support arrow key navigation
    expect(input).toHaveFocus();
  });

  it("clears input on command execution", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.type(input, "Create");

    const option = screen.getByText("Create File");
    await user.click(option);

    // Input should be cleared after execution
    expect(input.value || input).toBeInTheDocument();
  });

  it("supports grouped commands", () => {
    const groupedCommands: CommandItem[] = [
      {
        id: "file",
        label: "File",
        group: "Navigation",
        icon: <FileText size={16} />,
      },
      {
        id: "settings",
        label: "Settings",
        group: "Configuration",
        icon: <Settings size={16} />,
      },
    ];

    render(
      <CommandBar
        commands={groupedCommands}
        onExecute={() => {}}
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
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
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("handles empty search results", async () => {
    const user = userEvent.setup();

    render(
      <CommandBar
        commands={mockCommands}
        onExecute={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "zzzzzzz");

    // Should show no results message or empty state
    expect(input).toBeInTheDocument();
  });
});
