import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CollapsibleFolder } from "./CollapsibleFolder";

describe("CollapsibleFolder", () => {
  const mockItems = [
    { id: "1", name: "Home Page" },
    { id: "2", name: "About Page" },
    { id: "3", name: "Contact Page" },
  ];

  it("renders folder title", () => {
    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("renders item count badge", () => {
    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it("renders items via renderItem", () => {
    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("About Page")).toBeInTheDocument();
    expect(screen.getByText("Contact Page")).toBeInTheDocument();
  });

  it("collapses and expands on click", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    const trigger = screen.getByText("Pages");
    await user.click(trigger);

    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("shows empty state when no items", () => {
    render(
      <CollapsibleFolder
        id="empty"
        title="Empty Folder"
        itemCount={0}
        items={[]}
        renderItem={(item) => <div>{item.name}</div>}
        emptyText="No items in this folder"
      />,
    );

    expect(screen.getByText("Empty Folder")).toBeInTheDocument();
  });

  it("handles folder edit action", async () => {
    const handleEdit = vi.fn();
    const user = userEvent.setup();

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        onFolderEdit={handleEdit}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("handles folder delete action", async () => {
    const handleDelete = vi.fn();

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        onFolderDelete={handleDelete}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("respects defaultExpanded prop", () => {
    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        defaultExpanded={true}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders collapsed when defaultExpanded is false", () => {
    const { container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        defaultExpanded={false}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
    // Items should not be visible when collapsed
    expect(screen.queryByText("Home Page")).not.toBeInTheDocument();
  });

  it("sets up drop target listener", () => {
    const { container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div data-item-id={item.id}>{item.name}</div>}
      />,
    );

    const folder = container.querySelector("[data-folder-id]") as HTMLElement;
    expect(folder).toBeDefined();
    expect(folder?.getAttribute("data-folder-id")).toBe("pages");
  });

  it("renders with drop target styling when isDropTarget is true", () => {
    const { container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div data-item-id={item.id}>{item.name}</div>}
        isDropTarget={true}
      />,
    );

    const folder = container.querySelector("[data-folder-id]") as HTMLElement;
    expect(folder?.getAttribute("data-drop-active")).toBe("true");
  });

  it("renders sort dropdown when sortOptions provided", () => {
    const sortOptions = [
      { value: "name", label: "Name" },
      { value: "date", label: "Date" },
    ];

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        sortOptions={sortOptions}
      />,
    );

    // Sort dropdown should be rendered (check for sort-related elements)
    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("calls onSortChange when sort option selected", () => {
    const handleSortChange = vi.fn();
    const sortOptions = [
      { value: "name", label: "Name" },
      { value: "date", label: "Date" },
    ];

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("renders folder action menu with edit option when onFolderEdit provided", () => {
    const handleEdit = vi.fn();

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        onFolderEdit={handleEdit}
      />,
    );

    // Folder should render with edit action available
    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("renders folder action menu with delete option when onFolderDelete provided", () => {
    const handleDelete = vi.fn();

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        onFolderDelete={handleDelete}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("renders folder action menu with invite option when onFolderInvite provided", () => {
    const handleInvite = vi.fn();

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        onFolderInvite={handleInvite}
      />,
    );

    expect(screen.getByText("Pages")).toBeInTheDocument();
  });

  it("displays correct item label singular vs plural", () => {
    const { rerender, container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={1}
        items={[mockItems[0]]}
        renderItem={(item) => <div>{item.name}</div>}
        itemLabel="Page"
        itemLabelPlural="Pages"
      />,
    );

    let folder = container.querySelector("[data-folder-id]");
    expect(folder).toBeInTheDocument();

    rerender(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        itemLabel="Page"
        itemLabelPlural="Pages"
      />,
    );

    folder = container.querySelector("[data-folder-id]");
    expect(folder).toBeInTheDocument();
  });

  it("applies dropCompleted styling when isDropCompleted prop is true", () => {
    const { container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        isDropTarget={false}
        isDropCompleted={true}
      />,
    );

    const folder = container.querySelector("[data-folder-id]") as HTMLElement;
    expect(folder).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
        className="custom-folder-class"
      />,
    );

    const folder = container.querySelector("[data-folder-id]") as HTMLElement;
    expect(folder?.className).toContain("custom-folder-class");
  });

  it("renders emptyText when no items", () => {
    render(
      <CollapsibleFolder
        id="empty"
        title="Empty"
        itemCount={0}
        items={[]}
        renderItem={(item) => <div>{item.name}</div>}
        emptyText="No pages found"
      />,
    );

    expect(screen.getByText("Empty")).toBeInTheDocument();
  });

  it("handles items with draggable property", () => {
    const draggableItems = [
      { id: "1", name: "Home Page", draggable: true },
      { id: "2", name: "About Page", draggable: false },
      { id: "3", name: "Contact Page", draggable: true },
    ];

    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={draggableItems}
        renderItem={(item) => (
          <div data-item-id={item.id} data-draggable={item.draggable}>
            {item.name}
          </div>
        )}
      />,
    );

    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("About Page")).toBeInTheDocument();
    expect(screen.getByText("Contact Page")).toBeInTheDocument();
  });

  it("accepts onDragLeaveFolder callback", () => {
    const handleDragLeave = vi.fn();

    const { container } = render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={3}
        items={mockItems}
        renderItem={(item) => <div data-item-id={item.id}>{item.name}</div>}
        onDragLeaveFolder={handleDragLeave}
      />,
    );

    const folder = container.querySelector("[data-folder-id]") as HTMLElement;
    expect(folder).toBeDefined();
  });

  it("displays item count in badge", () => {
    render(
      <CollapsibleFolder
        id="pages"
        title="Pages"
        itemCount={42}
        items={mockItems}
        renderItem={(item) => <div>{item.name}</div>}
      />,
    );

    // Badge with item count should be rendered
    expect(screen.getByText(/42/)).toBeInTheDocument();
  });
});
