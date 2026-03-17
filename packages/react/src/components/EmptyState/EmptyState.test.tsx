/**
 * EmptyState Component Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders with title", () => {
    render(<EmptyState title="No items" />);
    expect(screen.getByText("No items")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(
      <EmptyState
        title="No items"
        description="Add some items to get started"
      />,
    );
    expect(
      screen.getByText("Add some items to get started"),
    ).toBeInTheDocument();
  });

  it("renders with icon", () => {
    render(
      <EmptyState title="No items" icon={<span data-testid="icon">📭</span>} />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with action", () => {
    render(<EmptyState title="No items" action={<button>Add Item</button>} />);
    expect(
      screen.getByRole("button", { name: "Add Item" }),
    ).toBeInTheDocument();
  });

  it("renders with secondary action", () => {
    render(
      <EmptyState
        title="No items"
        action={<button>Primary</button>}
        secondaryAction={<button>Secondary</button>}
      />,
    );
    expect(screen.getByRole("button", { name: "Primary" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Secondary" }),
    ).toBeInTheDocument();
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <EmptyState title="No items" size="sm" data-testid="empty" />,
    );
    expect(screen.getByTestId("empty").className).toContain("sm");

    rerender(<EmptyState title="No items" size="lg" data-testid="empty" />);
    expect(screen.getByTestId("empty").className).toContain("lg");
  });

  it("applies custom className", () => {
    render(
      <EmptyState
        title="No items"
        className="custom-class"
        data-testid="empty"
      />,
    );
    expect(screen.getByTestId("empty").className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<EmptyState ref={ref} title="No items" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
