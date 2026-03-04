import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders spinner with loading status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Spinner size="xs" />);
    let spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/xs/);

    rerender(<Spinner size="sm" />);
    spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/sm/);

    rerender(<Spinner size="md" />);
    spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/md/);

    rerender(<Spinner size="lg" />);
    spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/lg/);

    rerender(<Spinner size="xl" />);
    spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/xl/);
  });

  it("uses default size when not specified", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/md/);
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Spinner variant="primary" />);
    let spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/primary/);

    rerender(<Spinner variant="secondary" />);
    spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/secondary/);

    rerender(<Spinner variant="secondary" />);
    spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/neutral/);
  });

  it("uses default variant when not specified", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/primary/);
  });

  it("has default aria-label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading...",
    );
  });

  it("accepts custom label for accessibility", () => {
    render(<Spinner label="Loading data..." />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading data...",
    );
  });

  it('has aria-live="polite" for accessibility', () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
  });

  it("does not show label text by default", () => {
    render(<Spinner />);
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("shows label text when showLabel is true", () => {
    render(<Spinner showLabel />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows custom label text when showLabel is true", () => {
    render(<Spinner label="Please wait..." showLabel />);
    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Spinner className="custom-spinner" />);
    expect(container.firstChild).toHaveClass("custom-spinner");
  });

  it("passes through HTML attributes", () => {
    render(<Spinner data-testid="test-spinner" />);
    expect(screen.getByTestId("test-spinner")).toBeInTheDocument();
  });

  it("combines size and variant classes", () => {
    render(<Spinner size="lg" variant="secondary" />);
    const spinner = screen.getByRole("status");
    expect(spinner.className).toMatch(/lg/);
    expect(spinner.className).toMatch(/secondary/);
  });

  it("renders with all props combined", () => {
    render(
      <Spinner
        size="xl"
        variant="secondary"
        label="Loading content..."
        showLabel
        className="custom"
        data-testid="full-spinner"
      />,
    );

    const container = screen.getByTestId("full-spinner");
    const spinner = screen.getByRole("status");

    expect(container).toHaveClass("custom");
    expect(spinner.className).toMatch(/xl/);
    expect(spinner.className).toMatch(/neutral/);
    expect(spinner).toHaveAttribute("aria-label", "Loading content...");
    expect(screen.getByText("Loading content...")).toBeInTheDocument();
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes for screen readers", () => {
      render(<Spinner label="Processing request..." />);
      const spinner = screen.getByRole("status");

      expect(spinner).toHaveAttribute("role", "status");
      expect(spinner).toHaveAttribute("aria-label", "Processing request...");
      expect(spinner).toHaveAttribute("aria-live", "polite");
    });

    it("remains accessible without visible label", () => {
      render(<Spinner label="Loading" showLabel={false} />);
      const spinner = screen.getByRole("status");

      // Label not visible but accessible via aria-label
      expect(screen.queryByText("Loading")).not.toBeInTheDocument();
      expect(spinner).toHaveAttribute("aria-label", "Loading");
    });
  });

  describe("Size variants", () => {
    it("renders extra small spinner", () => {
      render(<Spinner size="xs" />);
      expect(screen.getByRole("status").className).toMatch(/xs/);
    });

    it("renders small spinner", () => {
      render(<Spinner size="sm" />);
      expect(screen.getByRole("status").className).toMatch(/sm/);
    });

    it("renders medium spinner", () => {
      render(<Spinner size="md" />);
      expect(screen.getByRole("status").className).toMatch(/md/);
    });

    it("renders large spinner", () => {
      render(<Spinner size="lg" />);
      expect(screen.getByRole("status").className).toMatch(/lg/);
    });

    it("renders extra large spinner", () => {
      render(<Spinner size="xl" />);
      expect(screen.getByRole("status").className).toMatch(/xl/);
    });
  });

  describe("Color variants", () => {
    it("renders primary variant", () => {
      render(<Spinner variant="primary" />);
      expect(screen.getByRole("status").className).toMatch(/primary/);
    });

    it("renders secondary variant", () => {
      render(<Spinner variant="secondary" />);
      expect(screen.getByRole("status").className).toMatch(/secondary/);
    });

    it("renders neutral variant", () => {
      render(<Spinner variant="secondary" />);
      expect(screen.getByRole("status").className).toMatch(/neutral/);
    });
  });
});
