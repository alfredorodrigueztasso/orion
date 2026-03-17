import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Collapsible } from "./Collapsible";

describe("Collapsible", () => {
  it("renders with trigger and content", () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByRole("button", { name: "Toggle" })).toBeInTheDocument();
  });

  it("is closed by default", () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText("Content here")).not.toBeInTheDocument();
  });

  it("respects defaultOpen prop", () => {
    render(
      <Collapsible defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content here")).toBeInTheDocument();
  });

  it("opens content when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content here")).toBeInTheDocument();
  });

  it("closes content when trigger is clicked again", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText("Content here")).not.toBeInTheDocument();
  });

  it("calls onOpenChange callback", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("works as controlled component", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <Collapsible open={false} onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    await user.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    // Still closed because controlled
    expect(screen.queryByText("Content here")).not.toBeInTheDocument();

    // Parent updates
    rerender(
      <Collapsible open={true} onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );
    expect(screen.getByText("Content here")).toBeInTheDocument();
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Collapsible disabled onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("sets data-state attribute on root based on open state", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible data-testid="collapsible">
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByTestId("collapsible")).toHaveAttribute(
      "data-state",
      "closed",
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByTestId("collapsible")).toHaveAttribute(
      "data-state",
      "open",
    );
  });

  it('sets data-state="open" when defaultOpen is true', () => {
    render(
      <Collapsible data-testid="collapsible" defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByTestId("collapsible")).toHaveAttribute(
      "data-state",
      "open",
    );
  });

  it("content has proper accessibility attributes", () => {
    render(
      <Collapsible defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("aria-labelledby");

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-controls");

    // aria-controls on trigger should match content id
    const contentId = button.getAttribute("aria-controls");
    expect(region).toHaveAttribute("id", contentId);
  });

  it("forceMount keeps content in DOM when closed", () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content forceMount>Content here</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByText("Content here")).toBeInTheDocument();
  });

  it("applies custom className to root", () => {
    render(
      <Collapsible className="custom-class" data-testid="collapsible">
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );

    expect(screen.getByTestId("collapsible")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Collapsible ref={ref}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content here</Collapsible.Content>
      </Collapsible>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("throws when Trigger is used outside Collapsible", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<Collapsible.Trigger>Toggle</Collapsible.Trigger>);
    }).toThrow("Collapsible.Trigger/Content must be used within a Collapsible");
    consoleSpy.mockRestore();
  });

  it("throws when Content is used outside Collapsible", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<Collapsible.Content>Content</Collapsible.Content>);
    }).toThrow("Collapsible.Trigger/Content must be used within a Collapsible");
    consoleSpy.mockRestore();
  });
});
