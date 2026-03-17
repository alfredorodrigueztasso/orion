/**
 * Accordion Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion } from "./Accordion";

const mockItems = [
  { id: "1", title: "Section 1", content: "Content 1" },
  { id: "2", title: "Section 2", content: "Content 2" },
  { id: "3", title: "Section 3", content: "Content 3" },
];

describe("Accordion", () => {
  it("renders all items", () => {
    render(<Accordion items={mockItems} />);

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Section 3")).toBeInTheDocument();
  });

  it("all items are collapsed by default", () => {
    render(<Accordion items={mockItems} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("expands an item when clicked", async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByText("Section 1");
    await user.click(firstButton);

    expect(firstButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Content 1")).toBeVisible();
  });

  it("collapses an expanded item when clicked again", async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} defaultExpanded={["1"]} />);

    const firstButton = screen.getByText("Section 1");
    expect(firstButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.click(firstButton);
    expect(firstButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("only allows one item expanded at a time by default", async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} />);

    const firstButton = screen.getByText("Section 1");
    const secondButton = screen.getByText("Section 2");

    await user.click(firstButton);
    expect(firstButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.click(secondButton);
    expect(firstButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(secondButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("allows multiple items expanded when allowMultiple is true", async () => {
    const user = userEvent.setup();
    render(<Accordion items={mockItems} allowMultiple />);

    const firstButton = screen.getByText("Section 1");
    const secondButton = screen.getByText("Section 2");

    await user.click(firstButton);
    await user.click(secondButton);

    expect(firstButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(secondButton.closest("button")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("respects defaultExpanded prop", () => {
    render(<Accordion items={mockItems} defaultExpanded={["2"]} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[2]).toHaveAttribute("aria-expanded", "false");
  });

  it("works as controlled component", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Accordion items={mockItems} expanded={["1"]} onChange={onChange} />,
    );

    const secondButton = screen.getByText("Section 2");
    await user.click(secondButton);

    expect(onChange).toHaveBeenCalledWith(["2"]);

    // Rerender with new expanded state
    rerender(
      <Accordion items={mockItems} expanded={["2"]} onChange={onChange} />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("calls onChange callback", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Accordion items={mockItems} onChange={onChange} />);

    const firstButton = screen.getByText("Section 1");
    await user.click(firstButton);

    expect(onChange).toHaveBeenCalledWith(["1"]);
  });

  it("renders disabled items correctly", () => {
    const itemsWithDisabled = [
      { id: "1", title: "Section 1", content: "Content 1", disabled: true },
      { id: "2", title: "Section 2", content: "Content 2" },
    ];
    render(<Accordion items={itemsWithDisabled} />);

    const disabledButton = screen.getByText("Section 1").closest("button");
    expect(disabledButton).toBeDisabled();
    expect(disabledButton).toHaveAttribute("aria-expanded", "false");
  });

  it("renders items with icons", () => {
    const itemsWithIcons = [
      {
        id: "1",
        title: "Section 1",
        content: "Content 1",
        icon: <span data-testid="icon">📁</span>,
      },
    ];
    render(<Accordion items={itemsWithIcons} />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <Accordion
        items={mockItems}
        variant="bordered"
        data-testid="accordion"
      />,
    );
    expect(screen.getByTestId("accordion").className).toMatch(/bordered/);

    rerender(
      <Accordion
        items={mockItems}
        variant="separated"
        data-testid="accordion"
      />,
    );
    expect(screen.getByTestId("accordion").className).toMatch(/separated/);
  });

  it("applies custom className", () => {
    render(
      <Accordion
        items={mockItems}
        className="custom-class"
        data-testid="accordion"
      />,
    );
    expect(screen.getByTestId("accordion").className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Accordion ref={ref} items={mockItems} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("has proper accessibility attributes", () => {
    render(<Accordion items={mockItems} />);

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-expanded");
      expect(button).toHaveAttribute("aria-controls");
    });

    const regions = screen.getAllByRole("region", { hidden: true });
    regions.forEach((region) => {
      expect(region).toHaveAttribute("aria-labelledby");
    });
  });
});
