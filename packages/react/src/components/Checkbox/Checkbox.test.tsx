import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { container, rerender } = render(<Checkbox label="Test" size="sm" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);

    rerender(<Checkbox label="Test" size="md" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);

    rerender(<Checkbox label="Test" size="lg" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("uses default size when not specified", () => {
    const { container } = render(<Checkbox label="Test" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);
  });

  it("renders unchecked by default", () => {
    render(<Checkbox label="Test" />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders checked state", () => {
    render(<Checkbox label="Test" checked readOnly />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renders indeterminate state", () => {
    render(<Checkbox label="Select all" indeterminate />);
    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it("displays checkmark when checked", () => {
    const { container } = render(<Checkbox label="Test" checked readOnly />);
    expect(
      container.querySelector('[data-lucide="Check"]'),
    ).toBeInTheDocument();
  });

  it("displays minus when indeterminate", () => {
    const { container } = render(<Checkbox label="Test" indeterminate />);
    expect(
      container.querySelector('[data-lucide="Minus"]'),
    ).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<Checkbox label="Terms" error="You must accept the terms" />);
    expect(screen.getByRole("alert")).toHaveTextContent(
      "You must accept the terms",
    );
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("displays helper text when no error", () => {
    render(<Checkbox label="Subscribe" helperText="We send updates weekly" />);
    expect(screen.getByText("We send updates weekly")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("hides helper text when error is shown", () => {
    render(
      <Checkbox
        label="Subscribe"
        helperText="Weekly updates"
        error="Required field"
      />,
    );
    expect(screen.queryByText("Weekly updates")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Required field");
  });

  it("renders disabled state", () => {
    render(<Checkbox label="Disabled" disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders required state", () => {
    render(<Checkbox label="Required" required />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("required");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Checkbox label="Test" className="custom-checkbox" />,
    );
    expect(container.firstChild).toHaveClass("custom-checkbox");
  });

  it("passes through input attributes", () => {
    render(
      <Checkbox
        label="Test"
        data-testid="test-checkbox"
        name="terms"
        value="accepted"
      />,
    );
    const checkbox = screen.getByTestId("test-checkbox");
    expect(checkbox).toHaveAttribute("name", "terms");
    expect(checkbox).toHaveAttribute("value", "accepted");
  });

  it("handles user checking", async () => {
    const user = userEvent.setup();
    const { container } = render(<Checkbox label="Test" />);
    const checkbox = screen.getByRole("checkbox");
    const label = container.querySelector("label");

    expect(checkbox).not.toBeChecked();

    await user.click(label!);
    expect(checkbox).toBeChecked();
  });

  it("handles user unchecking", async () => {
    const user = userEvent.setup();
    const { container } = render(<Checkbox label="Test" defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    const label = container.querySelector("label");

    expect(checkbox).toBeChecked();

    await user.click(label!);
    expect(checkbox).not.toBeChecked();
  });

  it("can be toggled by clicking label", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Click label" />);
    const checkbox = screen.getByRole("checkbox");
    const labelElement = checkbox.parentElement?.querySelector("label");

    await user.click(labelElement!);
    expect(checkbox).toBeChecked();

    await user.click(labelElement!);
    expect(checkbox).not.toBeChecked();
  });

  it("links label with checkbox via id", () => {
    render(<Checkbox label="Test" id="custom-id" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "custom-id");
  });

  it("generates unique id when not provided", () => {
    render(<Checkbox label="Test" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id");
    expect(checkbox.id).toMatch(/^checkbox-/);
  });

  it("links error message with checkbox via aria-describedby", () => {
    render(<Checkbox label="Terms" error="Required" id="terms-checkbox" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "terms-checkbox-error",
    );
    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "terms-checkbox-error",
    );
  });

  it("links helper text with checkbox via aria-describedby", () => {
    render(
      <Checkbox
        label="Subscribe"
        helperText="Weekly"
        id="subscribe-checkbox"
      />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "subscribe-checkbox-helper",
    );
    expect(screen.getByText("Weekly")).toHaveAttribute(
      "id",
      "subscribe-checkbox-helper",
    );
  });

  it("works without label", () => {
    render(<Checkbox data-testid="no-label" />);
    expect(screen.getByTestId("no-label")).toBeInTheDocument();
  });

  it("supports controlled component pattern", async () => {
    const _user = userEvent.setup();
    const { rerender } = render(
      <Checkbox label="Controlled" checked={false} readOnly />,
    );
    expect(screen.getByRole("checkbox")).not.toBeChecked();

    rerender(<Checkbox label="Controlled" checked={true} readOnly />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("transitions from indeterminate to checked", () => {
    const { rerender } = render(<Checkbox label="Test" indeterminate />);
    let checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);

    rerender(<Checkbox label="Test" checked readOnly />);
    checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(false);
    expect(checkbox.checked).toBe(true);
  });

  it("does not allow user interaction when disabled", () => {
    const { container } = render(<Checkbox label="Disabled" disabled />);
    const checkbox = screen.getByRole("checkbox");
    const label = container.querySelector("label");

    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeDisabled();

    // Even if we try to click, it should not change
    fireEvent.click(label!);
    expect(checkbox).not.toBeChecked();
  });

  it("applies error class to container", () => {
    const { container } = render(<Checkbox label="Test" error="Error" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/error/);
  });
});
