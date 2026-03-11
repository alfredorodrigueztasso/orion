import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders with children", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const variants = [
      "primary",
      "secondary",
      "success",
      "error",
      "warning",
      "info",
      "brand",
      "inverse",
    ] as const;

    variants.forEach((variant) => {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge.className).toMatch(new RegExp(variant));
    });
  });

  it("applies size classes correctly", () => {
    const { rerender, container } = render(<Badge size="sm">Small</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge.className).toMatch(/sm/);

    rerender(<Badge size="md">Medium</Badge>);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);

    rerender(<Badge size="lg">Large</Badge>);
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("uses default variant when not specified", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /secondary/,
    );
  });

  it("uses default size when not specified", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Badge className="custom-badge">Custom</Badge>,
    );
    expect(container.firstChild).toHaveClass("custom-badge");
  });

  it("passes through additional props", () => {
    render(<Badge data-testid="test-badge">Test</Badge>);
    expect(screen.getByTestId("test-badge")).toBeInTheDocument();
  });

  it("renders with numbers", () => {
    render(<Badge variant="error">99+</Badge>);
    expect(screen.getByText("99+")).toBeInTheDocument();
  });

  it("renders with icons/symbols", () => {
    render(<Badge variant="success">✓</Badge>);
    expect(screen.getByText("✓")).toBeInTheDocument();
  });
});
