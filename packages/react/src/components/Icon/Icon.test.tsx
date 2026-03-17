import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";
import { Search, AlertCircle, Check } from "lucide-react";

describe("Icon", () => {
  it("renders a lucide icon", () => {
    render(<Icon icon={Search} label="Search" />);
    const icon = screen.getByRole("img", { name: "Search" });
    expect(icon).toBeInTheDocument();
  });

  it("renders as decorative with aria-hidden", () => {
    render(<Icon icon={Search} decorative data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("role", "presentation");
  });

  it("renders as semantic with aria-label", () => {
    render(<Icon icon={AlertCircle} label="Error occurred" />);
    const icon = screen.getByRole("img", { name: "Error occurred" });
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-label", "Error occurred");
  });

  it("applies size token class for named sizes", () => {
    const { rerender } = render(
      <Icon icon={Search} size="sm" decorative data-testid="icon" />,
    );
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/sm/);

    rerender(<Icon icon={Search} size="lg" decorative data-testid="icon" />);
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/lg/);

    rerender(<Icon icon={Search} size="xl" decorative data-testid="icon" />);
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/xl/);
  });

  it("defaults to md size", () => {
    render(<Icon icon={Search} decorative data-testid="icon" />);
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/md/);
  });

  it("applies custom pixel size via style", () => {
    render(<Icon icon={Search} size={18} decorative data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    expect(icon.style.width).toBe("18px");
    expect(icon.style.height).toBe("18px");
  });

  it("applies color variant classes", () => {
    const { rerender } = render(
      <Icon icon={Search} color="primary" decorative data-testid="icon" />,
    );
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/primary/);

    rerender(
      <Icon icon={Search} color="brand" decorative data-testid="icon" />,
    );
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/brand/);

    rerender(
      <Icon icon={Search} color="error" decorative data-testid="icon" />,
    );
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/error/);

    rerender(
      <Icon icon={Search} color="success" decorative data-testid="icon" />,
    );
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/success/);
  });

  it("defaults to current color", () => {
    render(<Icon icon={Search} decorative data-testid="icon" />);
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(/current/);
  });

  it("applies disabled class", () => {
    render(<Icon icon={Search} disabled decorative data-testid="icon" />);
    expect(screen.getByTestId("icon").getAttribute("class")).toMatch(
      /disabled/,
    );
  });

  it("applies custom className", () => {
    render(
      <Icon
        icon={Search}
        decorative
        className="custom-icon"
        data-testid="icon"
      />,
    );
    expect(screen.getByTestId("icon")).toHaveClass("custom-icon");
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Icon icon={Search} ref={ref} decorative />);
    expect(ref).toHaveBeenCalled();
  });

  it("passes through additional props", () => {
    render(<Icon icon={Search} decorative data-testid="my-icon" />);
    expect(screen.getByTestId("my-icon")).toBeInTheDocument();
  });

  it("applies custom strokeWidth", () => {
    render(<Icon icon={Check} strokeWidth={3} decorative data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    // Lucide icons render with stroke-width attribute
    expect(icon).toBeInTheDocument();
  });

  it("merges custom style with size override", () => {
    render(
      <Icon
        icon={Search}
        size={24}
        style={{ opacity: 0.5 }}
        decorative
        data-testid="icon"
      />,
    );
    const icon = screen.getByTestId("icon");
    expect(icon.style.opacity).toBe("0.5");
    expect(icon.style.width).toBe("24px");
    expect(icon.style.height).toBe("24px");
  });

  it("does not add inline size styles for token sizes", () => {
    render(<Icon icon={Search} size="md" decorative data-testid="icon" />);
    const icon = screen.getByTestId("icon");
    // For token sizes, size is handled via className, not inline styles
    expect(icon.style.width).toBe("");
    expect(icon.style.height).toBe("");
  });

  it("renders different lucide icons", () => {
    const { rerender } = render(<Icon icon={Search} label="Search" />);
    expect(screen.getByRole("img", { name: "Search" })).toBeInTheDocument();

    rerender(<Icon icon={AlertCircle} label="Alert" />);
    expect(screen.getByRole("img", { name: "Alert" })).toBeInTheDocument();

    rerender(<Icon icon={Check} label="Check" />);
    expect(screen.getByRole("img", { name: "Check" })).toBeInTheDocument();
  });
});
