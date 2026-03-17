import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("renders with label", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByLabelText("Enable notifications")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { container, rerender } = render(<Switch label="Test" size="sm" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);

    rerender(<Switch label="Test" size="md" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);

    rerender(<Switch label="Test" size="lg" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("uses default size when not specified", () => {
    const { container } = render(<Switch label="Test" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
  });

  it("renders unchecked by default", () => {
    render(<Switch label="Test" />);
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("renders checked state", () => {
    render(<Switch label="Test" checked readOnly />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("displays helper text", () => {
    render(
      <Switch label="Dark mode" helperText="Use dark theme across the app" />,
    );
    expect(
      screen.getByText("Use dark theme across the app"),
    ).toBeInTheDocument();
  });

  it("renders disabled state", () => {
    render(<Switch label="Disabled" disabled />);
    expect(screen.getByRole("switch")).toBeDisabled();
  });

  it("renders required state", () => {
    render(<Switch label="Required" required />);
    expect(screen.getByRole("switch")).toHaveAttribute("required");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Switch label="Test" className="custom-switch" />,
    );
    expect(container.firstChild).toHaveClass("custom-switch");
  });

  it("passes through input attributes", () => {
    render(
      <Switch
        label="Test"
        data-testid="test-switch"
        name="notifications"
        value="enabled"
      />,
    );
    const switchInput = screen.getByTestId("test-switch");
    expect(switchInput).toHaveAttribute("name", "notifications");
    expect(switchInput).toHaveAttribute("value", "enabled");
  });

  it("handles user toggling on", async () => {
    const user = userEvent.setup();
    const { container } = render(<Switch label="Test" />);
    const switchInput = screen.getByRole("switch");
    const label = container.querySelector("label");

    expect(switchInput).not.toBeChecked();

    await user.click(label!);
    expect(switchInput).toBeChecked();
  });

  it("handles user toggling off", async () => {
    const user = userEvent.setup();
    const { container } = render(<Switch label="Test" defaultChecked />);
    const switchInput = screen.getByRole("switch");
    const label = container.querySelector("label");

    expect(switchInput).toBeChecked();

    await user.click(label!);
    expect(switchInput).not.toBeChecked();
  });

  it("can be toggled by clicking label", async () => {
    const user = userEvent.setup();
    render(<Switch label="Click label" />);
    const switchInput = screen.getByRole("switch");

    await user.click(screen.getByText("Click label"));
    expect(switchInput).toBeChecked();

    await user.click(screen.getByText("Click label"));
    expect(switchInput).not.toBeChecked();
  });

  it("links label with switch via id", () => {
    render(<Switch label="Test" id="custom-id" />);
    const switchInput = screen.getByLabelText("Test");
    expect(switchInput).toHaveAttribute("id", "custom-id");
  });

  it("generates unique id when not provided", () => {
    render(<Switch label="Test" />);
    const switchInput = screen.getByLabelText("Test");
    expect(switchInput).toHaveAttribute("id");
    expect(switchInput.id).toMatch(/^switch-/);
  });

  it("works without label", () => {
    render(<Switch data-testid="no-label" />);
    expect(screen.getByTestId("no-label")).toBeInTheDocument();
  });

  it("works without helper text", () => {
    render(<Switch label="Test" />);
    expect(screen.queryByText(/helper/i)).not.toBeInTheDocument();
  });

  it("supports controlled component pattern", async () => {
    const _user = userEvent.setup();
    const { rerender } = render(
      <Switch label="Controlled" checked={false} readOnly />,
    );
    expect(screen.getByRole("switch")).not.toBeChecked();

    rerender(<Switch label="Controlled" checked={true} readOnly />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("does not allow user interaction when disabled", () => {
    const { container } = render(<Switch label="Disabled" disabled />);
    const switchInput = screen.getByRole("switch");
    const label = container.querySelector("label");

    expect(switchInput).not.toBeChecked();
    expect(switchInput).toBeDisabled();

    // Even if we try to click, it should not change
    fireEvent.click(label!);
    expect(switchInput).not.toBeChecked();
  });

  it("renders with all props combined", () => {
    const { container } = render(
      <Switch
        label="Notifications"
        helperText="Get email updates"
        size="lg"
        checked
        readOnly
        className="custom"
        data-testid="full-switch"
      />,
    );

    expect(screen.getByTestId("full-switch")).toBeInTheDocument();
    expect(screen.getByLabelText("Notifications")).toBeChecked();
    expect(screen.getByText("Get email updates")).toBeInTheDocument();
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
    expect(container.firstChild).toHaveClass("custom");
  });

  describe("Size variants", () => {
    it("renders small switch", () => {
      const { container } = render(<Switch label="Small" size="sm" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
    });

    it("renders medium switch", () => {
      const { container } = render(<Switch label="Medium" size="md" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/md/);
    });

    it("renders large switch", () => {
      const { container } = render(<Switch label="Large" size="lg" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
    });
  });

  describe("Interaction", () => {
    it("toggles between on and off states", async () => {
      const user = userEvent.setup();
      const { container } = render(<Switch label="Toggle test" />);
      const switchInput = screen.getByRole("switch");
      const label = container.querySelector("label");

      // Start unchecked
      expect(switchInput).not.toBeChecked();

      // Toggle on
      await user.click(label!);
      expect(switchInput).toBeChecked();

      // Toggle off
      await user.click(label!);
      expect(switchInput).not.toBeChecked();

      // Toggle on again
      await user.click(label!);
      expect(switchInput).toBeChecked();
    });

    it("can be toggled via label multiple times", async () => {
      const user = userEvent.setup();
      render(<Switch label="Label toggle" />);
      const switchInput = screen.getByRole("switch");
      const label = screen.getByText("Label toggle");

      await user.click(label);
      expect(switchInput).toBeChecked();

      await user.click(label);
      expect(switchInput).not.toBeChecked();

      await user.click(label);
      expect(switchInput).toBeChecked();
    });
  });

  describe("Accessibility", () => {
    it("uses switch role for switch semantics", () => {
      render(<Switch label="Accessible switch" />);
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("associates label with input correctly", () => {
      const { container } = render(
        <Switch label="Associated" id="test-switch" />,
      );
      const input = screen.getByLabelText("Associated");
      const label = container.querySelector("label");

      expect(label).toHaveAttribute("for", "test-switch");
      expect(input).toHaveAttribute("id", "test-switch");
    });
  });
});
