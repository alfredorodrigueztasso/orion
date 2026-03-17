/**
 * Skeleton Component Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
  it("renders a skeleton element", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveAttribute("aria-hidden", "true");
  });

  it("applies default variant and animation", () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton.className).toContain("text");
    expect(skeleton.className).toContain("pulse");
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <Skeleton variant="circular" data-testid="skeleton" />,
    );
    expect(screen.getByTestId("skeleton").className).toContain("circular");

    rerender(<Skeleton variant="rectangular" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("rectangular");

    rerender(<Skeleton variant="rounded" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("rounded");
  });

  it("applies animation classes", () => {
    const { rerender } = render(
      <Skeleton animation="wave" data-testid="skeleton" />,
    );
    expect(screen.getByTestId("skeleton").className).toContain("wave");

    rerender(<Skeleton animation="none" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("none");
  });

  it("applies width and height as numbers", () => {
    render(<Skeleton width={200} height={40} data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({ width: "200px", height: "40px" });
  });

  it("applies width and height as strings", () => {
    render(<Skeleton width="100%" height="2rem" data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({ width: "100%", height: "2rem" });
  });

  it("renders multiple lines for text variant", () => {
    render(<Skeleton variant="text" lines={3} data-testid="skeleton" />);
    const container = screen.getByTestId("skeleton");
    const lines = container.querySelectorAll('[class*="skeleton"]');

    expect(lines).toHaveLength(3);
  });

  it("applies custom borderRadius", () => {
    render(<Skeleton borderRadius={20} data-testid="skeleton" />);
    const skeleton = screen.getByTestId("skeleton");

    expect(skeleton).toHaveStyle({ borderRadius: "20px" });
  });

  it("applies custom className", () => {
    render(<Skeleton className="custom-class" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton").className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Skeleton ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through additional props", () => {
    render(<Skeleton data-testid="skeleton" data-custom="value" />);
    expect(screen.getByTestId("skeleton")).toHaveAttribute(
      "data-custom",
      "value",
    );
  });
});
