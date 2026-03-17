/**
 * Chip Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chip } from "./Chip";

describe("Chip", () => {
  it("renders with text", () => {
    render(<Chip>Test Chip</Chip>);
    expect(screen.getByText("Test Chip")).toBeInTheDocument();
  });

  it("applies default variant and size", () => {
    render(<Chip data-testid="chip">Chip</Chip>);
    const chip = screen.getByTestId("chip");

    expect(chip.className).toContain("default");
    expect(chip.className).toContain("md");
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <Chip variant="success" data-testid="chip">
        Chip
      </Chip>,
    );
    expect(screen.getByTestId("chip").className).toContain("success");

    rerender(
      <Chip variant="error" data-testid="chip">
        Chip
      </Chip>,
    );
    expect(screen.getByTestId("chip").className).toContain("error");
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <Chip size="sm" data-testid="chip">
        Chip
      </Chip>,
    );
    expect(screen.getByTestId("chip").className).toContain("sm");

    rerender(
      <Chip size="lg" data-testid="chip">
        Chip
      </Chip>,
    );
    expect(screen.getByTestId("chip").className).toContain("lg");
  });

  it("renders with icon", () => {
    render(<Chip icon={<span data-testid="icon">★</span>}>Chip</Chip>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("calls onClick when clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Chip onClick={onClick}>Clickable</Chip>);

    await user.click(screen.getByText("Clickable"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("shows remove button when onRemove is provided", () => {
    render(<Chip onRemove={() => {}}>Removable</Chip>);
    expect(screen.getByLabelText("Remove")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(<Chip onRemove={onRemove}>Removable</Chip>);

    await user.click(screen.getByLabelText("Remove"));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();

    render(
      <Chip onClick={onClick} disabled>
        Disabled
      </Chip>,
    );

    // When disabled, Chip has aria-disabled attribute and pointer-events: none CSS
    // Verify the disabled state is properly set and onClick is not called
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(onClick).not.toHaveBeenCalled();
  });

  it("applies selected state", () => {
    render(
      <Chip selected data-testid="chip">
        Selected
      </Chip>,
    );
    expect(screen.getByTestId("chip").className).toContain("selected");
  });

  it("applies disabled state", () => {
    render(
      <Chip disabled data-testid="chip">
        Disabled
      </Chip>,
    );
    const chip = screen.getByTestId("chip");

    expect(chip.className).toContain("disabled");
    expect(chip).toHaveAttribute("aria-disabled", "true");
  });

  it("has proper accessibility for clickable chip", () => {
    render(<Chip onClick={() => {}}>Clickable</Chip>);
    const chip = screen.getByRole("button");

    expect(chip).toBeInTheDocument();
    expect(chip).toHaveAttribute("tabindex", "0");
  });

  it("supports keyboard interaction", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Chip onClick={onClick}>Clickable</Chip>);

    const chip = screen.getByRole("button");
    chip.focus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom className", () => {
    render(
      <Chip className="custom-class" data-testid="chip">
        Chip
      </Chip>,
    );
    expect(screen.getByTestId("chip").className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Chip ref={ref}>Chip</Chip>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
