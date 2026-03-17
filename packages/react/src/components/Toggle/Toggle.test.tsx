import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("renders with children", () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
  });

  it("is not pressed by default", () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("respects defaultPressed prop", () => {
    render(<Toggle defaultPressed>Bold</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles pressed state on click (uncontrolled)", async () => {
    const user = userEvent.setup();
    render(<Toggle>Bold</Toggle>);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });

  it("works as controlled component", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );

    const button = screen.getByRole("button");
    await user.click(button);
    expect(onPressedChange).toHaveBeenCalledWith(true);

    // Still false because parent hasn't updated
    expect(button).toHaveAttribute("aria-pressed", "false");

    // Simulate parent updating
    rerender(
      <Toggle pressed={true} onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("calls onPressedChange callback", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);

    await user.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(true);

    await user.click(screen.getByRole("button"));
    expect(onPressedChange).toHaveBeenCalledWith(false);
  });

  it("calls onClick handler", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Toggle onClick={onClick}>Bold</Toggle>);

    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Toggle variant="default">Bold</Toggle>);
    // 'default' variant has no extra class (base toggle class only)
    const defaultClasses = screen.getByRole("button").className;
    expect(defaultClasses).toMatch(/toggle/);

    rerender(<Toggle variant="outline">Bold</Toggle>);
    expect(screen.getByRole("button").className).toMatch(/outline/);
  });

  it("applies size classes", () => {
    const { rerender } = render(<Toggle size="sm">Bold</Toggle>);
    expect(screen.getByRole("button").className).toMatch(/sm/);

    rerender(<Toggle size="md">Bold</Toggle>);
    expect(screen.getByRole("button").className).toMatch(/md/);

    rerender(<Toggle size="lg">Bold</Toggle>);
    expect(screen.getByRole("button").className).toMatch(/lg/);
  });

  it("applies pressed class when pressed", async () => {
    const user = userEvent.setup();
    render(<Toggle>Bold</Toggle>);

    const button = screen.getByRole("button");
    await user.click(button);
    expect(button.className).toMatch(/pressed/);
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();

    await user.click(button);
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Toggle className="custom-class">Bold</Toggle>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Toggle ref={ref}>Bold</Toggle>);
    expect(ref).toHaveBeenCalled();
  });

  it('has type="button"', () => {
    render(<Toggle>Bold</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("passes through additional props", () => {
    render(
      <Toggle data-testid="my-toggle" aria-label="Toggle bold">
        B
      </Toggle>,
    );
    expect(screen.getByTestId("my-toggle")).toBeInTheDocument();
    expect(screen.getByLabelText("Toggle bold")).toBeInTheDocument();
  });
});
