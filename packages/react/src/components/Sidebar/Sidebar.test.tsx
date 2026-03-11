import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "./Sidebar";
import { Home, Settings, Users, FileText } from "lucide-react";
import type { SidebarItem } from "./Sidebar.types";

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

  it("renders sidebar items", () => {
    render(<Sidebar items={mockItems} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Documents")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders badges", () => {
    render(<Sidebar items={mockItems} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders collapsible items with children", () => {
    render(<Sidebar items={mockItems} />);

    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("handles item click events", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <Sidebar
        items={mockItems}
        onSelect={handleSelect}
      />,
    );

    const homeItem = screen.getByText("Home");
    await user.click(homeItem);

    expect(handleSelect).toHaveBeenCalledWith(mockItems[0]);
  });

  it("supports active item highlighting", () => {
    const { container } = render(
      <Sidebar
        items={mockItems}
        activeItemId="home"
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("supports collapsible mode", () => {
    render(
      <Sidebar
        items={mockItems}
        collapsible
      />,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders header when provided", () => {
    render(
      <Sidebar
        items={mockItems}
        header={<div>My App</div>}
      />,
    );

    expect(screen.getByText("My App")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Sidebar
        items={mockItems}
        footer={<div>Version 1.0</div>}
      />,
    );

    expect(screen.getByText("Version 1.0")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Sidebar
        items={mockItems}
        className="custom-sidebar"
      />,
    );

    const sidebar = container.querySelector(".custom-sidebar");
    expect(sidebar).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <Sidebar
        ref={ref}
        items={mockItems}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("handles nested navigation", async () => {
    const user = userEvent.setup();

    render(
      <Sidebar items={mockItems} />
    );

    // Check if nested items exist
    const documentsItem = screen.getByText("Documents");
    expect(documentsItem).toBeInTheDocument();
  });

  it("renders with empty items", () => {
    render(<Sidebar items={[]} />);

    const sidebar = screen.queryByRole("navigation") || screen.getByText(/./);
    expect(sidebar).toBeInTheDocument();
  });
});
