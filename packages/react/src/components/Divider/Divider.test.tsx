/**
 * Divider Component Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal divider by default", () => {
    render(<Divider data-testid="divider" />);
    const divider = screen.getByTestId("divider");

    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute("role", "separator");
    expect(divider).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("renders a vertical divider", () => {
    render(<Divider orientation="vertical" data-testid="divider" />);
    const divider = screen.getByTestId("divider");

    expect(divider).toHaveAttribute("aria-orientation", "vertical");
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <Divider variant="dashed" data-testid="divider" />,
    );
    expect(screen.getByTestId("divider").className).toContain("dashed");

    rerender(<Divider variant="dotted" data-testid="divider" />);
    expect(screen.getByTestId("divider").className).toContain("dotted");
  });

  it("applies spacing classes", () => {
    const { rerender } = render(<Divider spacing="sm" data-testid="divider" />);
    expect(screen.getByTestId("divider").className).toContain("spacing-sm");

    rerender(<Divider spacing="lg" data-testid="divider" />);
    expect(screen.getByTestId("divider").className).toContain("spacing-lg");

    rerender(<Divider spacing="none" data-testid="divider" />);
    expect(screen.getByTestId("divider").className).toContain("spacing-none");
  });

  it("renders with a label", () => {
    render(<Divider label="OR" />);

    expect(screen.getByText("OR")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Divider className="custom-class" data-testid="divider" />);
    expect(screen.getByTestId("divider").className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });
});
