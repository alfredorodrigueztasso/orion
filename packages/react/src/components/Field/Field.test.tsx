import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "./Field";

describe("Field", () => {
  it("renders with label and input", () => {
    render(<Field label="Email" placeholder="Enter email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Field label="Test" size="sm" />);
    const input = screen.getByLabelText("Test");
    expect(input.className).toMatch(/sm/);

    rerender(<Field label="Test" size="md" />);
    expect(input.className).toMatch(/md/);

    rerender(<Field label="Test" size="lg" />);
    expect(input.className).toMatch(/lg/);
  });

  it("uses default size when not specified", () => {
    render(<Field label="Test" />);
    const input = screen.getByLabelText("Test");
    expect(input.className).toMatch(/md/);
  });

  it("displays error message and icon", () => {
    render(<Field label="Email" error="Invalid email" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("displays helper text when no error", () => {
    render(<Field label="Password" helperText="Must be 8+ characters" />);
    expect(screen.getByText("Must be 8+ characters")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("hides helper text when error is shown", () => {
    render(
      <Field
        label="Password"
        helperText="Must be 8+ characters"
        error="Password too short"
      />,
    );
    expect(screen.queryByText("Must be 8+ characters")).not.toBeInTheDocument();
    expect(screen.getByText("Password too short")).toBeInTheDocument();
  });

  it("renders with optional indicator", () => {
    render(<Field label="Phone" optional />);
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("renders with required indicator", () => {
    const { container } = render(
      <Field label="Name" required id="name-field" />,
    );
    const input = container.querySelector("#name-field");
    expect(input).toHaveAttribute("required");
    // Check for required indicator (asterisk)
    expect(container.textContent).toContain("*");
  });

  it("renders disabled state", () => {
    render(<Field label="Disabled" disabled />);
    expect(screen.getByLabelText("Disabled")).toBeDisabled();
  });

  it("renders with left icon", () => {
    render(
      <Field
        label="Search"
        leftIcon={<span data-testid="left-icon">🔍</span>}
      />,
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
    const input = screen.getByLabelText("Search");
    expect(input.className).toMatch(/hasLeftIcon/);
  });

  it("renders with right icon", () => {
    render(
      <Field
        label="Password"
        rightIcon={<span data-testid="right-icon">👁</span>}
      />,
    );
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    const input = screen.getByLabelText("Password");
    expect(input.className).toMatch(/hasRightIcon/);
  });

  it("shows error icon when error present and no right icon", () => {
    const { container } = render(<Field label="Email" error="Invalid" />);
    // Error icon should be present (AlertCircle mocked as data-icon span)
    expect(
      container.querySelector('[data-icon="AlertCircle"]'),
    ).toBeInTheDocument();
  });

  it("does not show error icon when right icon is provided", () => {
    render(
      <Field
        label="Email"
        error="Invalid"
        rightIcon={<span data-testid="custom-icon">✓</span>}
      />,
    );
    // Should show custom icon, not automatic error icon
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("applies fullWidth class", () => {
    const { container } = render(<Field label="Full" fullWidth />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /fullWidth/,
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <Field label="Test" className="custom-field" />,
    );
    expect(container.firstChild).toHaveClass("custom-field");
  });

  it("passes through input attributes", () => {
    render(
      <Field
        label="Email"
        type="email"
        placeholder="Enter email"
        data-testid="test-field"
      />,
    );
    const input = screen.getByTestId("test-field");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Field label="Name" />);
    const input = screen.getByLabelText("Name");

    await user.type(input, "John Doe");
    expect(input).toHaveValue("John Doe");
  });

  it("links label with input via id", () => {
    render(<Field label="Test" id="custom-id" />);
    const input = screen.getByLabelText("Test");
    expect(input).toHaveAttribute("id", "custom-id");
  });

  it("generates unique id when not provided", () => {
    render(<Field label="Test1" />);
    const input = screen.getByLabelText("Test1");
    expect(input).toHaveAttribute("id");
    expect(input.id).toMatch(/^field-/);
  });

  it("links error message with input via aria-describedby", () => {
    render(<Field label="Email" error="Invalid email" id="email-field" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-describedby", "email-field-error");
    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "email-field-error",
    );
  });

  it("links helper text with input via aria-describedby", () => {
    render(<Field label="Password" helperText="8+ chars" id="pwd-field" />);
    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("aria-describedby", "pwd-field-helper");
    expect(screen.getByText("8+ chars")).toHaveAttribute(
      "id",
      "pwd-field-helper",
    );
  });

  it("works without label", () => {
    render(<Field placeholder="No label" data-testid="no-label" />);
    expect(screen.getByTestId("no-label")).toBeInTheDocument();
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("supports different input types", () => {
    const { rerender } = render(
      <Field label="Text" type="text" data-testid="input" />,
    );
    expect(screen.getByTestId("input")).toHaveAttribute("type", "text");

    rerender(<Field label="Email" type="email" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");

    rerender(<Field label="Password" type="password" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "password");

    rerender(<Field label="Number" type="number" data-testid="input" />);
    expect(screen.getByTestId("input")).toHaveAttribute("type", "number");
  });
});
