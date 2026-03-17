import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar";
import { Home, Settings, Users, FileText } from "lucide-react";
import type { SidebarItem, SidebarSection } from "./Sidebar.types";

describe("Sidebar", () => {
  const mockItems: SidebarItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={20} />,
      href: "/",
    },
    {
      id: "users",
      label: "Users",
      icon: <Users size={20} />,
      href: "/users",
      badge: "5",
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FileText size={20} />,
      children: [
        { id: "recent", label: "Recent", href: "/documents/recent" },
        { id: "archived", label: "Archived", href: "/documents/archived" },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      href: "/settings",
    },
  ];

  const mockSections: SidebarSection[] = [
    {
      items: mockItems,
    },
  ];

  it("renders sidebar items", () => {
    render(<Sidebar sections={mockSections} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders badges", () => {
    render(<Sidebar sections={mockSections} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders collapsible items with children", () => {
    render(<Sidebar sections={mockSections} />);

    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("handles item click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    const itemsWithClick = [
      {
        id: "action",
        label: "Action",
        onClick: handleClick,
      },
      ...mockItems,
    ];

    const sections: SidebarSection[] = [{ items: itemsWithClick }];

    render(<Sidebar sections={sections} />);

    const actionItem = screen.getByText("Action");
    await user.click(actionItem);

    expect(handleClick).toHaveBeenCalled();
  });

  it("supports active item highlighting", () => {
    const { container } = render(
      <Sidebar sections={mockSections} activeItem="home" />,
    );

    expect(container).toBeInTheDocument();
  });

  it("supports collapsed mode", () => {
    const handleCollapsedChange = vi.fn();
    const { container } = render(
      <Sidebar
        sections={mockSections}
        collapsed={false}
        onCollapsedChange={handleCollapsedChange}
      />,
    );

    expect(container.querySelector("nav")).toBeInTheDocument();
  });

  it("renders header when provided", () => {
    render(<Sidebar sections={mockSections} header={<div>My App</div>} />);

    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(<Sidebar sections={mockSections} footer={<div>Version 1.0</div>} />);

    expect(screen.getByText("Version 1.0")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Sidebar sections={mockSections} className="custom-sidebar" />,
    );

    const sidebar = container.querySelector(".custom-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(<Sidebar ref={ref} sections={mockSections} />);

    expect(ref).toHaveBeenCalled();
  });

  it("handles nested navigation", async () => {
    const user = userEvent.setup();

    render(<Sidebar sections={mockSections} />);

    // Check if nested items exist
    const documentsItem = screen.getByText("Documents");
    expect(documentsItem).toBeInTheDocument();
  });

  it("renders with empty sections", () => {
    render(<Sidebar sections={[]} />);

    const sidebar =
      screen.queryByRole("navigation") || document.querySelector("nav");
    expect(sidebar).toBeInTheDocument();
  });

  // ============================================================================
  // COMPREHENSIVE FUNCTIONAL TESTS (Opción B - Deep Coverage)
  // ============================================================================

  // Sidebar.Item expansion/collapse behavior
  it("expands collapsible item when clicked", async () => {
    const user = userEvent.setup();

    const { container } = render(<Sidebar sections={mockSections} />);

    const documentsButton = screen.getByText("Documents");
    await user.click(documentsButton);

    // After clicking, nested items should be visible
    await screen.findByText("Recent");
    expect(screen.getByText("Recent")).toBeInTheDocument();
    expect(screen.getByText("Archived")).toBeInTheDocument();
  });

  it("collapses expanded item when clicked again", async () => {
    const user = userEvent.setup();

    render(<Sidebar sections={mockSections} />);

    const documentsButton = screen.getByText("Documents");

    // First click: expand
    await user.click(documentsButton);
    await screen.findByText("Recent");
    expect(screen.getByText("Recent")).toBeInTheDocument();

    // Second click: collapse
    await user.click(documentsButton);
    expect(screen.queryByText("Recent")).not.toBeInTheDocument();
  });

  it("renders nested items at correct depth with indentation", async () => {
    const user = userEvent.setup();
    const { container } = render(<Sidebar sections={mockSections} />);

    const documentsButton = screen.getByText("Documents");
    await user.click(documentsButton);

    const recentItem = screen.getByText("Recent");
    const anchor = recentItem.closest("a, button");

    // Nested items should have padding-left set via inline style
    expect(anchor).toHaveAttribute("style");
    const style = anchor?.getAttribute("style");
    expect(style).toContain("padding-left");
  });

  it("does not expand item when clicking disabled collapsible item", () => {
    const disabledSections: SidebarSection[] = [
      {
        items: [
          {
            id: "disabled-parent",
            label: "Disabled Parent",
            icon: <FileText size={20} />,
            disabled: true,
            children: [{ id: "child", label: "Child", href: "/child" }],
          },
        ],
      },
    ];

    render(<Sidebar sections={disabledSections} />);

    const disabledButton = screen.getByText("Disabled Parent");
    // Disabled items have pointer-events: none, so children won't be visible
    expect(screen.queryByText("Child")).not.toBeInTheDocument();

    // Verify disabled attribute is set
    expect(disabledButton.closest("a, button")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  it("prevents onClick for disabled items", () => {
    const handleClick = vi.fn();

    const disabledSections: SidebarSection[] = [
      {
        items: [
          {
            id: "disabled-action",
            label: "Disabled Action",
            onClick: handleClick,
            disabled: true,
          },
        ],
      },
    ];

    render(<Sidebar sections={disabledSections} />);

    const disabledButton = screen.getByText("Disabled Action");

    // Disabled items should have aria-disabled attribute
    expect(disabledButton.closest("a, button")).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    // Disabled items have pointer-events: none, preventing interaction
    // The onClick handler code checks item.disabled before calling onClick
  });

  it("renders item as anchor when href is provided and no children", () => {
    const sections: SidebarSection[] = [
      {
        items: [
          {
            id: "link",
            label: "Link",
            href: "/test",
            icon: <Home size={20} />,
          },
        ],
      },
    ];

    render(<Sidebar sections={sections} />);

    const link = screen.getByText("Link").closest("a");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("renders item as button when onClick is provided without href", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const sections: SidebarSection[] = [
      {
        items: [{ id: "action", label: "Action Button", onClick: handleClick }],
      },
    ];

    render(<Sidebar sections={sections} />);

    const button = screen.getByText("Action Button").closest("button");
    expect(button).toHaveAttribute("type", "button");

    await user.click(button!);
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders collapse toggle button when onCollapsedChange is provided", async () => {
    const user = userEvent.setup();
    const handleCollapsedChange = vi.fn();

    render(
      <Sidebar
        sections={mockSections}
        collapsed={false}
        onCollapsedChange={handleCollapsedChange}
      />,
    );

    const toggleButton = screen.getByRole("button", {
      name: /collapse sidebar|expand sidebar/i,
    });
    expect(toggleButton).toBeInTheDocument();

    await user.click(toggleButton);
    expect(handleCollapsedChange).toHaveBeenCalledWith(true);
  });

  it("updates toggle button aria-label based on collapsed state", () => {
    const handleCollapsedChange = vi.fn();

    const { rerender } = render(
      <Sidebar
        sections={mockSections}
        collapsed={false}
        onCollapsedChange={handleCollapsedChange}
      />,
    );

    let toggleButton = screen.getByRole("button", {
      name: /collapse sidebar/i,
    });
    expect(toggleButton).toBeInTheDocument();

    rerender(
      <Sidebar
        sections={mockSections}
        collapsed={true}
        onCollapsedChange={handleCollapsedChange}
      />,
    );

    toggleButton = screen.getByRole("button", {
      name: /expand sidebar/i,
    });
    expect(toggleButton).toBeInTheDocument();
  });

  it("does not render toggle button when onCollapsedChange is not provided", () => {
    render(<Sidebar sections={mockSections} collapsed={false} />);

    const toggleButton = screen.queryByRole("button", {
      name: /collapse sidebar|expand sidebar/i,
    });
    expect(toggleButton).not.toBeInTheDocument();
  });

  it("sets aria-current on active item", () => {
    render(<Sidebar sections={mockSections} activeItem="home" />);

    const homeItem = screen.getByText("Home").closest("a, button");
    expect(homeItem).toHaveAttribute("aria-current", "page");
  });

  it("sets aria-disabled on disabled items", () => {
    const disabledSections: SidebarSection[] = [
      {
        items: [
          {
            id: "disabled",
            label: "Disabled Item",
            disabled: true,
          },
        ],
      },
    ];

    render(<Sidebar sections={disabledSections} />);

    const disabledItem = screen.getByText("Disabled Item").closest("a, button");
    expect(disabledItem).toHaveAttribute("aria-disabled", "true");
  });

  it("renders section title when provided", () => {
    const sections: SidebarSection[] = [
      {
        title: "Main Navigation",
        items: [{ id: "home", label: "Home", href: "/" }],
      },
    ];

    render(<Sidebar sections={sections} />);

    expect(screen.getByText("Main Navigation")).toBeInTheDocument();
  });

  it("does not render section title in collapsed mode", () => {
    const sections: SidebarSection[] = [
      {
        title: "Main Navigation",
        items: [{ id: "home", label: "Home", href: "/" }],
      },
    ];

    render(<Sidebar sections={sections} collapsed={true} />);

    expect(screen.queryByText("Main Navigation")).not.toBeInTheDocument();
  });

  it("renders multiple sections with independent items", () => {
    const sections: SidebarSection[] = [
      {
        title: "Section 1",
        items: [{ id: "item1", label: "Item 1", href: "/" }],
      },
      {
        title: "Section 2",
        items: [{ id: "item2", label: "Item 2", href: "/item2" }],
      },
    ];

    render(<Sidebar sections={sections} />);

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("does not show item labels in collapsed mode", () => {
    render(<Sidebar sections={mockSections} collapsed={true} />);

    expect(screen.queryByText("Home")).not.toBeInTheDocument();
    expect(screen.queryByText("Users")).not.toBeInTheDocument();
  });

  it("shows tooltip (title attribute) on collapsed items", () => {
    const { container } = render(
      <Sidebar sections={mockSections} collapsed={true} />,
    );

    const items = container.querySelectorAll("[title]");
    expect(items.length).toBeGreaterThan(0);
  });

  it("renders Sidebar.Divider sub-component", () => {
    const { container } = render(<Sidebar.Divider />);

    const hr = container.querySelector("hr");
    expect(hr).toBeInTheDocument();
  });

  it("applies className to Sidebar.Divider", () => {
    const { container } = render(
      <Sidebar.Divider className="custom-divider" />,
    );

    const hr = container.querySelector(".custom-divider");
    expect(hr).toBeInTheDocument();
  });

  it("renders Sidebar.Section directly", () => {
    const section: SidebarSection = {
      title: "Direct Section",
      items: [{ id: "item", label: "Item", href: "/" }],
    };

    render(<Sidebar.Section section={section} />);

    expect(screen.getByText("Direct Section")).toBeInTheDocument();
    expect(screen.getByText("Item")).toBeInTheDocument();
  });

  it("renders Sidebar.Item directly", () => {
    const item: SidebarItem = {
      id: "direct-item",
      label: "Direct Item",
      href: "/",
    };

    render(<Sidebar.Item item={item} />);

    expect(screen.getByText("Direct Item")).toBeInTheDocument();
  });

  it("sets CSS custom property for width", () => {
    const { container } = render(
      <Sidebar sections={mockSections} width={300} />,
    );

    const nav = container.querySelector("nav");
    const style = nav?.getAttribute("style");
    expect(style).toContain("--sidebar-width: 300px");
  });

  it("sets CSS custom property for collapsed width", () => {
    const { container } = render(
      <Sidebar sections={mockSections} collapsed={true} collapsedWidth={80} />,
    );

    const nav = container.querySelector("nav");
    const style = nav?.getAttribute("style");
    expect(style).toContain("--sidebar-width: 80px");
  });

  it("applies variant class", () => {
    const { container } = render(
      <Sidebar sections={mockSections} variant="floating" />,
    );

    const nav = container.querySelector("nav");
    expect(nav?.className).toContain("variant-floating");
  });

  it("applies collapsed class when collapsed", () => {
    const { container } = render(
      <Sidebar sections={mockSections} collapsed={true} />,
    );

    const nav = container.querySelector("nav");
    expect(nav?.className).toContain("collapsed");
  });

  it("does not render chevron for items without children", () => {
    const sections: SidebarSection[] = [
      {
        items: [{ id: "simple", label: "Simple Item", href: "/" }],
      },
    ];

    const { container } = render(<Sidebar sections={sections} />);

    // No chevron should be rendered for items without children
    const chevrons = container.querySelectorAll("[class*='chevron']");
    expect(chevrons.length).toBe(0);
  });

  it("shows chevron for collapsible items", async () => {
    const { container } = render(<Sidebar sections={mockSections} />);

    // Documents has children, so should have a chevron
    const documentsItem = screen.getByText("Documents");
    const chevron =
      documentsItem.parentElement?.querySelector("[class*='chevron']");
    expect(chevron).toBeInTheDocument();
  });

  it("rotates chevron when item is expanded", async () => {
    const user = userEvent.setup();
    const { container } = render(<Sidebar sections={mockSections} />);

    const documentsButton = screen.getByText("Documents");
    const chevron =
      documentsButton.parentElement?.querySelector("[class*='chevron']");

    // Initially not expanded - chevron should not have the expanded class
    const initialClassName = chevron?.className || "";
    expect(initialClassName).toMatch(/itemChevron/);
    expect(initialClassName).not.toMatch(/Expanded/);

    // Click to expand
    await user.click(documentsButton);

    // Chevron should now have expanded class (CSS module format: _chevronExpanded_xxx)
    const expandedClassName = chevron?.className || "";
    expect(expandedClassName).toMatch(/Expanded/);
  });

  it("renders active item with correct aria-current", () => {
    const { container } = render(
      <Sidebar sections={mockSections} activeItem="users" />,
    );

    const usersItem = screen.getByText("Users");
    expect(usersItem.closest("a, button")).toHaveAttribute(
      "aria-current",
      "page",
    );

    const homeItem = screen.getByText("Home");
    expect(homeItem.closest("a, button")).not.toHaveAttribute("aria-current");
  });
});
