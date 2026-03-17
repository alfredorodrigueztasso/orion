/**
 * List Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { List } from "./List";

const mockItems = [
  { id: "1", primary: "Item 1" },
  { id: "2", primary: "Item 2", secondary: "Description" },
  { id: "3", primary: "Item 3" },
];

describe("List", () => {
  it("renders list items", () => {
    render(<List items={mockItems} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("renders secondary text", () => {
    render(<List items={mockItems} />);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders leading content", () => {
    const items = [
      {
        id: "1",
        primary: "Item 1",
        leading: <span data-testid="leading">Icon</span>,
      },
    ];
    render(<List items={items} />);
    expect(screen.getByTestId("leading")).toBeInTheDocument();
  });

  it("renders trailing content", () => {
    const items = [
      {
        id: "1",
        primary: "Item 1",
        trailing: <span data-testid="trailing">Badge</span>,
      },
    ];
    render(<List items={items} />);
    expect(screen.getByTestId("trailing")).toBeInTheDocument();
  });

  it("handles interactive items", () => {
    const onClick = vi.fn();
    const items = [{ id: "1", primary: "Item 1", onClick }];
    render(<List items={items} interactive />);

    fireEvent.click(screen.getByText("Item 1"));
    expect(onClick).toHaveBeenCalled();
  });

  it("handles selectable items", () => {
    const onSelect = vi.fn();
    render(<List items={mockItems} selectable onSelect={onSelect} />);

    fireEvent.click(screen.getByText("Item 1"));
    expect(onSelect).toHaveBeenCalledWith(mockItems[0]);
  });

  it("renders selected items with checkmark", () => {
    const items = [
      { id: "1", primary: "Item 1", selected: true },
      { id: "2", primary: "Item 2", selected: false },
    ];
    render(<List items={items} selectable />);

    const listItems = screen.getAllByRole("option");
    expect(listItems[0]).toHaveAttribute("aria-selected", "true");
    expect(listItems[1]).toHaveAttribute("aria-selected", "false");
  });

  it("does not trigger click on disabled items", () => {
    const onClick = vi.fn();
    const items = [{ id: "1", primary: "Item 1", onClick, disabled: true }];
    render(<List items={items} interactive />);

    fireEvent.click(screen.getByText("Item 1"));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders different sizes", () => {
    const { container, rerender } = render(
      <List items={mockItems} size="sm" />,
    );
    expect(container.querySelector('[class*="sm"]')).toBeInTheDocument();

    rerender(<List items={mockItems} size="md" />);
    expect(container.querySelector('[class*="md"]')).toBeInTheDocument();

    rerender(<List items={mockItems} size="lg" />);
    expect(container.querySelector('[class*="lg"]')).toBeInTheDocument();
  });

  it("renders different variants", () => {
    const { container, rerender } = render(
      <List items={mockItems} variant="bordered" />,
    );
    expect(container.querySelector('[class*="bordered"]')).toBeInTheDocument();

    rerender(<List items={mockItems} variant="divided" />);
    expect(container.querySelector('[class*="divided"]')).toBeInTheDocument();
  });

  it("renders empty content when no items", () => {
    render(<List items={[]} emptyContent={<span>No items found</span>} />);
    expect(screen.getByText("No items found")).toBeInTheDocument();
  });

  it("renders custom items via renderItem", () => {
    render(
      <List
        items={mockItems}
        renderItem={(item) => <div data-testid="custom">{item.primary}</div>}
      />,
    );
    expect(screen.getAllByTestId("custom")).toHaveLength(3);
  });

  it("handles keyboard navigation", () => {
    const onClick = vi.fn();
    const items = [{ id: "1", primary: "Item 1", onClick }];
    render(<List items={items} interactive />);

    const item = screen.getByText("Item 1").closest("li");
    fireEvent.keyDown(item!, { key: "Enter" });
    expect(onClick).toHaveBeenCalled();

    onClick.mockClear();
    fireEvent.keyDown(item!, { key: " " });
    expect(onClick).toHaveBeenCalled();
  });

  it("has correct ARIA roles for selectable list", () => {
    render(<List items={mockItems} selectable />);

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("has correct ARIA roles for regular list", () => {
    render(<List items={mockItems} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<List ref={ref} items={mockItems} />);
    expect(ref).toHaveBeenCalled();
  });
});
