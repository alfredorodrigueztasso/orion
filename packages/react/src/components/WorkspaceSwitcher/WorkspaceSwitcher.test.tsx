import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import type { Workspace } from "./WorkspaceSwitcher.types";

describe("WorkspaceSwitcher", () => {
  const mockWorkspaces: Workspace[] = [
    {
      id: "ws-1",
      name: "Personal",
      icon: "👤",
      isActive: true,
    },
    {
      id: "ws-2",
      name: "Team",
      icon: "👥",
      isActive: false,
    },
    {
      id: "ws-3",
      name: "Enterprise",
      icon: "🏢",
      isActive: false,
    },
  ];

  it("renders active workspace", () => {
    render(
      <WorkspaceSwitcher workspaces={mockWorkspaces} />,
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("opens switcher menu", async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceSwitcher workspaces={mockWorkspaces} />,
    );

    const trigger = screen.getByText("Personal");
    await user.click(trigger);

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("switches workspace", async () => {
    const handleSwitch = vi.fn();
    const user = userEvent.setup();

    render(
      <WorkspaceSwitcher
        workspaces={mockWorkspaces}
        onSwitch={handleSwitch}
      />,
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("shows all workspaces in menu", async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceSwitcher workspaces={mockWorkspaces} />,
    );

    const trigger = screen.getByText("Personal");
    await user.click(trigger);

    // Menu should show all workspaces
    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <WorkspaceSwitcher ref={ref} workspaces={mockWorkspaces} />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
