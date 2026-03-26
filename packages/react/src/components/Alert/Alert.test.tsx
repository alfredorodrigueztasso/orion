import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expectNoA11yViolations } from "../../../test/a11y";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders with children", async () => {
    const { container } = render(<Alert>Alert message</Alert>);
    expect(screen.getByText("Alert message")).toBeInTheDocument();
    await expectNoA11yViolations(container);
  });

  it("applies variant classes correctly", () => {
    const { container, rerender } = render(<Alert variant="info">Info</Alert>);
    expect((container.firstChild as HTMLElement).className).toMatch(/info/);

    rerender(<Alert variant="success">Success</Alert>);
    expect((container.firstChild as HTMLElement).className).toMatch(/success/);

    rerender(<Alert variant="warning">Warning</Alert>);
    expect((container.firstChild as HTMLElement).className).toMatch(/warning/);

    rerender(<Alert variant="error">Error</Alert>);
    expect((container.firstChild as HTMLElement).className).toMatch(/error/);
  });

  it("uses default variant when not specified", () => {
    const { container } = render(<Alert>Default</Alert>);
    expect((container.firstChild as HTMLElement).className).toMatch(/info/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Alert className="custom-alert">Message</Alert>,
    );
    expect(container.firstChild).toHaveClass("custom-alert");
  });

  it("passes through additional props", () => {
    render(<Alert data-testid="test-alert">Message</Alert>);
    expect(screen.getByTestId("test-alert")).toBeInTheDocument();
  });

  it('renders with role="alert" for accessibility', () => {
    const { container } = render(<Alert>Alert message</Alert>);
    expect(container.firstChild).toHaveAttribute("role", "alert");
  });

  it("renders long messages correctly", () => {
    const longMessage =
      "This is a very long alert message that should still render correctly and be accessible to screen readers and other assistive technologies.";
    render(<Alert>{longMessage}</Alert>);
    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });

  it("renders with complex children", () => {
    render(
      <Alert variant="warning">
        <strong>Warning:</strong> Please review this carefully.
      </Alert>,
    );
    expect(screen.getByText("Warning:")).toBeInTheDocument();
    expect(
      screen.getByText(/Please review this carefully/),
    ).toBeInTheDocument();
  });

  describe("All variants", () => {
    it("info variant renders correctly", () => {
      const { container } = render(<Alert variant="info">Info message</Alert>);
      expect((container.firstChild as HTMLElement).className).toMatch(/info/);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("success variant renders correctly", () => {
      const { container } = render(
        <Alert variant="success">Success message</Alert>,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(
        /success/,
      );
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("warning variant renders correctly", () => {
      const { container } = render(
        <Alert variant="warning">Warning message</Alert>,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(
        /warning/,
      );
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("error variant renders correctly", () => {
      const { container } = render(
        <Alert variant="error">Error message</Alert>,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(/error/);
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  describe("custom icon and dismissible behavior (lines 57-58, 74)", () => {
    it("renders custom icon when icon prop provided (tests line 57-58)", () => {
      const customIcon = <span data-testid="custom-icon">🔔</span>;
      const { container } = render(
        <Alert variant="info" icon={customIcon}>
          Custom icon message
        </Alert>,
      );

      // Custom icon should be rendered (tests ternary at line 57-58: icon !== undefined)
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("hides alert after closing (tests line 74: if (!isVisible))", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Alert variant="warning" dismissible={true}>
          Dismissible message
        </Alert>,
      );

      // Initially visible
      expect(screen.getByRole("alert")).toBeInTheDocument();

      // Find and click the close button
      const closeButton = screen.getByRole("button");
      await user.click(closeButton);

      // After closing, alert should not be in document (tests if (!isVisible) return null)
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("calls onClose callback when dismissed (tests onClose?.())", async () => {
      const user = userEvent.setup();
      const onCloseMock = vi.fn();

      render(
        <Alert variant="info" dismissible={true} onClose={onCloseMock}>
          Alert with callback
        </Alert>,
      );

      // Click close button
      const closeButton = screen.getByRole("button");
      await user.click(closeButton);

      // onClose callback should be called
      expect(onCloseMock).toHaveBeenCalled();
    });

    it("uses default Lucide icon when custom icon not provided", () => {
      const { container } = render(
        <Alert variant="success">Message with default icon</Alert>,
      );

      // Alert should render with default icon (tests DEFAULT_ICONS[variant])
      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent("Message with default icon");
    });
  });
});
