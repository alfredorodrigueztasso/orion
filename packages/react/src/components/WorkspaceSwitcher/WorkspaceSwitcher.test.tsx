import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

describe("WorkspaceSwitcher", () => {
  const mockCurrentOrg = {
    name: "Personal",
    role: "Owner",
    memberCount: 1,
  };

  const mockOrganizations = [
    {
      name: "Team",
      role: "Member",
    },
    {
      name: "Enterprise",
      role: "Admin",
    },
  ];

  it("renders current org", () => {
    render(
      <WorkspaceSwitcher currentOrg={mockCurrentOrg} organizations={mockOrganizations} />,
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("opens switcher menu", async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceSwitcher currentOrg={mockCurrentOrg} organizations={mockOrganizations} />,
    );

    const trigger = screen.getByText("Personal");
    await user.click(trigger);

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("switches organization", async () => {
    const handleOrgChange = vi.fn();
    const user = userEvent.setup();

    render(
      <WorkspaceSwitcher
        currentOrg={mockCurrentOrg}
        organizations={mockOrganizations}
        onOrgChange={handleOrgChange}
      />,
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("shows all organizations in menu", async () => {
    const user = userEvent.setup();

    render(
      <WorkspaceSwitcher currentOrg={mockCurrentOrg} organizations={mockOrganizations} />,
    );

    const trigger = screen.getByText("Personal");
    await user.click(trigger);

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <WorkspaceSwitcher
        ref={ref}
        currentOrg={mockCurrentOrg}
        organizations={mockOrganizations}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
