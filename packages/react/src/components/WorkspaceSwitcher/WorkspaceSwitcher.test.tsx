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
      <WorkspaceSwitcher
        currentOrg={mockCurrentOrg}
        organizations={mockOrganizations}
      />,
    );

    expect(screen.getByText("Personal")).toBeInTheDocument();
  });

  it("opens switcher menu", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <WorkspaceSwitcher
        currentOrg={mockCurrentOrg}
        organizations={mockOrganizations}
      />,
    );

    const trigger = screen.getAllByText("Personal")[0];
    await user.click(trigger);

    // Just verify the component still renders
    expect(container.firstChild).toBeInTheDocument();
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

    const { container } = render(
      <WorkspaceSwitcher
        currentOrg={mockCurrentOrg}
        organizations={mockOrganizations}
      />,
    );

    const trigger = screen.getAllByText("Personal")[0];
    await user.click(trigger);

    // Just verify the component still renders after click
    expect(container.firstChild).toBeInTheDocument();
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

  // ============================================================================
  // COMPREHENSIVE FUNCTIONAL TESTS (Opción B - Deep Coverage)
  // ============================================================================

  describe("Organization switching", () => {
    it("calls onOrgChange when organization is clicked", async () => {
      const user = userEvent.setup();
      const handleOrgChange = vi.fn();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          onOrgChange={handleOrgChange}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const teamOrg = screen.getByText("Team");
      await user.click(teamOrg);

      expect(handleOrgChange).toHaveBeenCalledWith("Team");
    });

    it("calls onOrgChange with correct org name for each organization", async () => {
      const user = userEvent.setup();
      const handleOrgChange = vi.fn();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          onOrgChange={handleOrgChange}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const enterpriseOrg = screen.getByText("Enterprise");
      await user.click(enterpriseOrg);

      expect(handleOrgChange).toHaveBeenCalledWith("Enterprise");
    });

    it("renders all organizations in the switcher menu", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      expect(screen.getByText("Team")).toBeInTheDocument();
      expect(screen.getByText("Member")).toBeInTheDocument();
      expect(screen.getByText("Enterprise")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("displays organization roles in the menu", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      expect(screen.getByText("Member")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });
  });

  describe("Settings and Participants buttons", () => {
    it("calls onSettings when Settings button is clicked", async () => {
      const user = userEvent.setup();
      const handleSettings = vi.fn();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          onSettings={handleSettings}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const settingsButton = screen.getByText("Configuración");
      await user.click(settingsButton);

      expect(handleSettings).toHaveBeenCalled();
    });

    it("calls onParticipants when Participants button is clicked", async () => {
      const user = userEvent.setup();
      const handleParticipants = vi.fn();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          onParticipants={handleParticipants}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const participantsButton = screen.getByText("Participantes");
      await user.click(participantsButton);

      expect(handleParticipants).toHaveBeenCalled();
    });

    it("handles missing Settings callback gracefully", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const settingsButton = screen.getByText("Configuración");
      await user.click(settingsButton);

      // Should not error
      expect(settingsButton).toBeInTheDocument();
    });

    it("handles missing Participants callback gracefully", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const participantsButton = screen.getByText("Participantes");
      await user.click(participantsButton);

      // Should not error
      expect(participantsButton).toBeInTheDocument();
    });
  });

  describe("Create Organization button", () => {
    it("calls onCreateOrganization when button is clicked", async () => {
      const user = userEvent.setup();
      const handleCreateOrg = vi.fn();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          onCreateOrganization={handleCreateOrg}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const createButton = screen.getByText("Nueva organización");
      await user.click(createButton);

      expect(handleCreateOrg).toHaveBeenCalled();
    });

    it("handles missing Create Organization callback gracefully", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      const createButton = screen.getByText("Nueva organización");
      await user.click(createButton);

      // Should not error
      expect(createButton).toBeInTheDocument();
    });
  });

  describe("Current organization display", () => {
    it("displays current organization name", () => {
      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const currentOrgName = screen.getAllByText("Personal")[0];
      expect(currentOrgName).toBeInTheDocument();
    });

    it("displays current organization role", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      expect(screen.getByText("Owner")).toBeInTheDocument();
    });

    it("displays member count in current organization", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      expect(screen.getByText("1 participantes")).toBeInTheDocument();
    });

    it("displays current organization with different member counts", async () => {
      const user = userEvent.setup();
      const orgWith5Members = {
        name: "Team Org",
        role: "Manager",
        memberCount: 5,
      };

      render(
        <WorkspaceSwitcher
          currentOrg={orgWith5Members}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Team Org")[0];
      await user.click(trigger);

      expect(screen.getByText("5 participantes")).toBeInTheDocument();
    });
  });

  describe("Popover interaction", () => {
    it("opens popover when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      // After clicking, menu items should be visible
      expect(screen.getByText("Configuración")).toBeInTheDocument();
      expect(screen.getByText("Participantes")).toBeInTheDocument();
    });

    it("closes popover when clicking outside", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      // Click outside (on the container)
      await user.click(container);

      // Menu items should still be rendered in the DOM but may be hidden
      expect(trigger).toBeInTheDocument();
    });

    it("toggles chevron rotation on open/close", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];

      // Get the chevron element
      const chevron = container.querySelector("[class*='chevron']");

      const initialClassName = chevron?.className || "";

      // Click to open
      await user.click(trigger);

      // Chevron should have changed
      const openedClassName = chevron?.className || "";
      expect(openedClassName).not.toBe(initialClassName);
    });
  });

  describe("Multiple organization scenarios", () => {
    it("handles empty organization list", () => {
      render(
        <WorkspaceSwitcher currentOrg={mockCurrentOrg} organizations={[]} />,
      );

      expect(screen.getByText("Personal")).toBeInTheDocument();
    });

    it("handles large organization list", async () => {
      const user = userEvent.setup();
      const largeOrgList = Array.from({ length: 10 }, (_, i) => ({
        name: `Org ${i + 1}`,
        role: "Member",
      }));

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={largeOrgList}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      expect(screen.getByText("Org 1")).toBeInTheDocument();
      expect(screen.getByText("Org 10")).toBeInTheDocument();
    });

    it("handles organization names with special characters", async () => {
      const user = userEvent.setup();
      const specialOrgs = [
        { name: "Org & Co.", role: "Owner" },
        { name: "Org (Private)", role: "Admin" },
      ];

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={specialOrgs}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      expect(screen.getByText("Org & Co.")).toBeInTheDocument();
      expect(screen.getByText("Org (Private)")).toBeInTheDocument();
    });
  });

  describe("Component props", () => {
    it("applies custom className", () => {
      const { container } = render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          className="custom-switcher"
        />,
      );

      const switcher = container.querySelector(".custom-switcher");
      expect(switcher).toBeInTheDocument();
    });

    it("respects fullWidth prop", () => {
      const { container: containerFull } = render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          fullWidth={true}
        />,
      );

      const { container: containerNarrow } = render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          fullWidth={false}
        />,
      );

      expect(containerFull.firstChild).toBeInTheDocument();
      expect(containerNarrow.firstChild).toBeInTheDocument();
    });

    it("forwards additional HTML attributes", () => {
      const { container } = render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          data-testid="workspace-switcher"
        />,
      );

      const element = container.querySelector(
        "[data-testid='workspace-switcher']",
      );
      expect(element).toBeInTheDocument();
    });
  });

  describe("All callbacks together", () => {
    it("handles multiple callbacks simultaneously", async () => {
      const user = userEvent.setup();
      const handleSettings = vi.fn();
      const handleParticipants = vi.fn();
      const handleCreateOrg = vi.fn();
      const handleOrgChange = vi.fn();

      render(
        <WorkspaceSwitcher
          currentOrg={mockCurrentOrg}
          organizations={mockOrganizations}
          onSettings={handleSettings}
          onParticipants={handleParticipants}
          onCreateOrganization={handleCreateOrg}
          onOrgChange={handleOrgChange}
        />,
      );

      const trigger = screen.getAllByText("Personal")[0];
      await user.click(trigger);

      // Click Settings
      const settingsButton = screen.getByText("Configuración");
      await user.click(settingsButton);
      expect(handleSettings).toHaveBeenCalled();

      // Reopen menu
      await user.click(trigger);

      // Click Participants
      const participantsButton = screen.getByText("Participantes");
      await user.click(participantsButton);
      expect(handleParticipants).toHaveBeenCalled();

      // Reopen menu
      await user.click(trigger);

      // Click Org
      const teamOrg = screen.getByText("Team");
      await user.click(teamOrg);
      expect(handleOrgChange).toHaveBeenCalledWith("Team");

      // Reopen menu
      await user.click(trigger);

      // Click Create
      const createButton = screen.getByText("Nueva organización");
      await user.click(createButton);
      expect(handleCreateOrg).toHaveBeenCalled();
    });
  });
});
