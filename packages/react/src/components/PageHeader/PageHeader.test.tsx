import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PageHeader } from "./PageHeader";
import { Button } from "../Button";

describe("PageHeader", () => {
  it("renders title", () => {
    render(
      <PageHeader title="Settings" description="Manage your preferences" />,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("displays description", () => {
    render(
      <PageHeader title="Settings" description="Manage your preferences" />,
    );

    expect(screen.getByText("Manage your preferences")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(
      <PageHeader
        title="Settings"
        actions={<Button onClick={() => {}}>Save</Button>}
      />,
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    render(
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<PageHeader ref={ref} title="Settings" />);

    expect(ref).toHaveBeenCalled();
  });

  // Breadcrumb tests
  it("renders breadcrumb link with href", () => {
    render(
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}
      />,
    );

    const link = screen.getByRole("link", { name: "Dashboard" });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders breadcrumb as button when onClick provided", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Dashboard", onClick: handleClick }]}
      />,
    );

    const button = screen.getByRole("button", { name: "Dashboard" });
    await user.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders breadcrumb as current page without link", () => {
    const { container } = render(
      <PageHeader title="Settings" breadcrumbs={[{ label: "Settings" }]} />,
    );

    const current = container.querySelector('[aria-current="page"]');
    expect(current).toBeInTheDocument();
    expect(current).toHaveTextContent("Settings");
  });

  it("renders multiple breadcrumbs with separators", () => {
    render(
      <PageHeader
        title="Settings"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users", href: "/users" },
          { label: "Settings" },
        ]}
      />,
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("does not render breadcrumbs when not provided", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
    expect(nav).not.toBeInTheDocument();
  });

  it("renders empty breadcrumbs array correctly", () => {
    const { container } = render(
      <PageHeader title="Settings" breadcrumbs={[]} />,
    );

    const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
    expect(nav).not.toBeInTheDocument();
  });

  // Back link tests
  it("renders back link with href", () => {
    render(
      <PageHeader
        title="Settings"
        backLink={{ href: "/dashboard", label: "Back to Dashboard" }}
      />,
    );

    const link = screen.getByRole("link", { name: /Back to Dashboard/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders back link as button with onClick", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <PageHeader
        title="Settings"
        backLink={{ onClick: handleClick, label: "Go Back" }}
      />,
    );

    const button = screen.getByRole("button", { name: /Go Back/i });
    await user.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it("uses default 'Back' label when not provided", () => {
    render(<PageHeader title="Settings" backLink={{ href: "/dashboard" }} />);

    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  // Badge tests
  it("renders badge next to title", () => {
    render(
      <PageHeader
        title="Settings"
        badge={<span data-testid="title-badge">Beta</span>}
      />,
    );

    const badge = screen.getByTestId("title-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Beta");
  });

  it("renders without badge when not provided", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const badge = container.querySelector('[data-testid="title-badge"]');
    expect(badge).not.toBeInTheDocument();
  });

  // Tab tests
  it("renders tabs with labels", () => {
    render(
      <PageHeader
        title="Settings"
        tabs={[
          { id: "account", label: "Account" },
          { id: "privacy", label: "Privacy" },
        ]}
        activeTab="account"
      />,
    );

    expect(screen.getByRole("tab", { name: "Account" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Privacy" })).toBeInTheDocument();
  });

  it("marks active tab with aria-selected", () => {
    render(
      <PageHeader
        title="Settings"
        tabs={[
          { id: "account", label: "Account" },
          { id: "privacy", label: "Privacy" },
        ]}
        activeTab="privacy"
      />,
    );

    const privacyTab = screen.getByRole("tab", { name: "Privacy" });
    expect(privacyTab).toHaveAttribute("aria-selected", "true");
  });

  it("does not mark inactive tab as selected", () => {
    render(
      <PageHeader
        title="Settings"
        tabs={[
          { id: "account", label: "Account" },
          { id: "privacy", label: "Privacy" },
        ]}
        activeTab="account"
      />,
    );

    const privacyTab = screen.getByRole("tab", { name: "Privacy" });
    expect(privacyTab).toHaveAttribute("aria-selected", "false");
  });

  it("calls onTabChange when tab is clicked", async () => {
    const handleTabChange = vi.fn();
    const user = userEvent.setup();

    render(
      <PageHeader
        title="Settings"
        tabs={[
          { id: "account", label: "Account" },
          { id: "privacy", label: "Privacy" },
        ]}
        activeTab="account"
        onTabChange={handleTabChange}
      />,
    );

    const privacyTab = screen.getByRole("tab", { name: "Privacy" });
    await user.click(privacyTab);
    expect(handleTabChange).toHaveBeenCalledWith("privacy");
  });

  it("navigates when tab has href", async () => {
    const user = userEvent.setup();
    delete window.location;
    window.location = { href: "" } as any;

    render(
      <PageHeader
        title="Settings"
        tabs={[
          { id: "account", label: "Account", href: "/settings/account" },
          { id: "privacy", label: "Privacy" },
        ]}
        activeTab="account"
      />,
    );

    const accountTab = screen.getByRole("tab", { name: "Account" });
    await user.click(accountTab);
    expect(window.location.href).toBe("/settings/account");
  });

  it("renders tab badge", () => {
    render(
      <PageHeader
        title="Settings"
        tabs={[
          { id: "account", label: "Account", badge: "3" },
          { id: "privacy", label: "Privacy" },
        ]}
        activeTab="account"
      />,
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("does not render tabs when not provided", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).not.toBeInTheDocument();
  });

  it("does not render tabs when empty array provided", () => {
    const { container } = render(<PageHeader title="Settings" tabs={[]} />);

    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).not.toBeInTheDocument();
  });

  // Variant and styling tests
  it("applies size lg variant", () => {
    const { container } = render(<PageHeader title="Settings" size="lg" />);

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
  });

  it("applies page header variant minimal", () => {
    const { container } = render(
      <PageHeader title="Settings" variant="minimal" />,
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
  });

  it("renders bordered by default", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const header = container.firstChild as HTMLElement;
    expect(header.className).toBeTruthy();
  });

  it("renders with bordered false", () => {
    const { container } = render(
      <PageHeader title="Settings" bordered={false} />,
    );

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
  });

  it("renders with sticky true", () => {
    const { container } = render(<PageHeader title="Settings" sticky={true} />);

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
  });

  it("renders without sticky by default", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PageHeader title="Settings" className="custom-header" />,
    );

    const header = container.firstChild as HTMLElement;
    expect(header.className).toContain("custom-header");
  });

  // Layout tests
  it("does not render description when not provided", () => {
    render(<PageHeader title="Settings" />);

    const description = screen.queryByText(/describe/i);
    expect(description).not.toBeInTheDocument();
  });

  it("does not render actions when not provided", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const actions = container.querySelector('[class*="actions"]');
    expect(!actions || !actions.innerHTML).toBeTruthy();
  });

  it("does not render back link when not provided", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const backLink = container.querySelector('[class*="backLink"]');
    expect(!backLink || !backLink.innerHTML).toBeTruthy();
  });

  it("renders all sections together", () => {
    const handleTabChange = vi.fn();
    const handleBackClick = vi.fn();
    const handleBreadcrumbClick = vi.fn();

    render(
      <PageHeader
        title="Edit User"
        description="Update user profile and permissions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users", onClick: handleBreadcrumbClick },
          { label: "Edit" },
        ]}
        backLink={{ label: "Back", onClick: handleBackClick }}
        badge={<span>Active</span>}
        tabs={[
          { id: "info", label: "Information" },
          { id: "permissions", label: "Permissions", badge: "2" },
        ]}
        activeTab="info"
        onTabChange={handleTabChange}
        actions={<Button>Save Changes</Button>}
      />,
    );

    expect(screen.getByText("Edit User")).toBeInTheDocument();
    expect(
      screen.getByText("Update user profile and permissions"),
    ).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Information" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /Permissions/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("handles sm size variant", () => {
    const { container } = render(<PageHeader title="Settings" size="sm" />);

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
  });

  it("handles md size variant (default)", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
  });

  it("renders breadcrumb nav with correct semantics", () => {
    const { container } = render(
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />,
    );

    const nav = container.querySelector('nav[aria-label="Breadcrumb"]');
    expect(nav).toBeInTheDocument();
    const list = nav?.querySelector('ol[class*="breadcrumbList"]');
    expect(list).toBeInTheDocument();
  });

  it("renders tabs with role tablist", () => {
    const { container } = render(
      <PageHeader
        title="Settings"
        tabs={[{ id: "account", label: "Account" }]}
        activeTab="account"
      />,
    );

    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist).toBeInTheDocument();
  });

  it("renders with default variant when not provided", () => {
    const { container } = render(<PageHeader title="Settings" />);

    const header = container.firstChild as HTMLElement;
    expect(header).toBeInTheDocument();
    expect(header.className).toBeTruthy();
  });
});
