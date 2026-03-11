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
});
