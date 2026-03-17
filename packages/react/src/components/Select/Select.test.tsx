import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";
import type { SelectOption } from "./Select.types";

describe("Select", () => {
  const mockOptions: SelectOption[] = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
  ];

  it("renders with label and select", () => {
    render(<Select label="Country" options={mockOptions} />);
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <Select label="Test" size="sm" options={mockOptions} />,
    );
    const select = screen.getByLabelText("Test");
    expect(select.className).toMatch(/sm/);

    rerender(<Select label="Test" size="md" options={mockOptions} />);
    expect(select.className).toMatch(/md/);

    rerender(<Select label="Test" size="lg" options={mockOptions} />);
    expect(select.className).toMatch(/lg/);
  });

  it("uses default size when not specified", () => {
    render(<Select label="Test" options={mockOptions} />);
    const select = screen.getByLabelText("Test");
    expect(select.className).toMatch(/md/);
  });

  it("renders options from options prop", () => {
    render(<Select label="Country" options={mockOptions} />);
    expect(
      screen.getByRole("option", { name: "United States" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "United Kingdom" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Canada" })).toBeInTheDocument();
  });

  it("renders placeholder option", () => {
    render(
      <Select
        label="Country"
        options={mockOptions}
        placeholder="Choose a country"
      />,
    );
    expect(
      screen.getByRole("option", { name: "Choose a country" }),
    ).toBeInTheDocument();
  });

  it("uses default placeholder when not specified", () => {
    render(<Select label="Country" options={mockOptions} />);
    expect(
      screen.getByRole("option", { name: "Select an option..." }),
    ).toBeInTheDocument();
  });

  it("renders options from children", () => {
    render(
      <Select label="Status">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </Select>,
    );
    expect(screen.getByRole("option", { name: "Active" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Inactive" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Pending" })).toBeInTheDocument();
  });

  it("combines options prop and children", () => {
    render(
      <Select label="Mixed" options={mockOptions}>
        <option value="other">Other</option>
      </Select>,
    );
    expect(
      screen.getByRole("option", { name: "United States" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Other" })).toBeInTheDocument();
  });

  it("displays error message and icon", () => {
    render(
      <Select
        label="Country"
        options={mockOptions}
        error="Please select a country"
      />,
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please select a country",
    );
    expect(screen.getByLabelText("Country")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("displays helper text when no error", () => {
    render(
      <Select
        label="Country"
        options={mockOptions}
        helperText="Choose your country"
      />,
    );
    expect(screen.getByText("Choose your country")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("hides helper text when error is shown", () => {
    render(
      <Select
        label="Country"
        options={mockOptions}
        helperText="Choose your country"
        error="Required field"
      />,
    );
    expect(screen.queryByText("Choose your country")).not.toBeInTheDocument();
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("renders with optional indicator", () => {
    render(<Select label="Country" options={mockOptions} optional />);
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });

  it("renders with required indicator", () => {
    const { container } = render(
      <Select
        label="Country"
        options={mockOptions}
        required
        id="country-select"
      />,
    );
    const select = container.querySelector("#country-select");
    expect(select).toHaveAttribute("required");
    // Check for required indicator (asterisk)
    expect(container.textContent).toContain("*");
  });

  it("renders disabled state", () => {
    render(<Select label="Country" options={mockOptions} disabled />);
    expect(screen.getByLabelText("Country")).toBeDisabled();
  });

  it("renders disabled options", () => {
    const optionsWithDisabled: SelectOption[] = [
      { value: "us", label: "United States" },
      { value: "uk", label: "United Kingdom", disabled: true },
      { value: "ca", label: "Canada" },
    ];
    render(<Select label="Country" options={optionsWithDisabled} />);
    const ukOption = screen.getByRole("option", {
      name: "United Kingdom",
    }) as HTMLOptionElement;
    expect(ukOption.disabled).toBe(true);
  });

  it("applies fullWidth class", () => {
    const { container } = render(
      <Select label="Country" options={mockOptions} fullWidth />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(
      /fullWidth/,
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <Select
        label="Country"
        options={mockOptions}
        className="custom-select"
      />,
    );
    expect(container.firstChild).toHaveClass("custom-select");
  });

  it("passes through select attributes", () => {
    render(
      <Select
        label="Country"
        options={mockOptions}
        data-testid="test-select"
        name="country"
        defaultValue="us"
      />,
    );
    const select = screen.getByTestId("test-select");
    expect(select).toHaveAttribute("name", "country");
    expect(select).toHaveValue("us");
  });

  it("handles user selection", async () => {
    const user = userEvent.setup();
    render(<Select label="Country" options={mockOptions} />);
    const select = screen.getByLabelText("Country");

    await user.selectOptions(select, "uk");
    expect(select).toHaveValue("uk");

    await user.selectOptions(select, "ca");
    expect(select).toHaveValue("ca");
  });

  it("links label with select via id", () => {
    render(<Select label="Country" options={mockOptions} id="custom-id" />);
    const select = screen.getByLabelText("Country");
    expect(select).toHaveAttribute("id", "custom-id");
  });

  it("generates unique id when not provided", () => {
    render(<Select label="Country" options={mockOptions} />);
    const select = screen.getByLabelText("Country");
    expect(select).toHaveAttribute("id");
    expect(select.id).toMatch(/^select-/);
  });

  it("links error message with select via aria-describedby", () => {
    render(
      <Select
        label="Country"
        options={mockOptions}
        error="Required"
        id="country-select"
      />,
    );
    const select = screen.getByLabelText("Country");
    expect(select).toHaveAttribute("aria-describedby", "country-select-error");
    expect(screen.getByRole("alert")).toHaveAttribute(
      "id",
      "country-select-error",
    );
  });

  it("links helper text with select via aria-describedby", () => {
    render(
      <Select
        label="Country"
        options={mockOptions}
        helperText="Choose one"
        id="country-select"
      />,
    );
    const select = screen.getByLabelText("Country");
    expect(select).toHaveAttribute("aria-describedby", "country-select-helper");
    expect(screen.getByText("Choose one")).toHaveAttribute(
      "id",
      "country-select-helper",
    );
  });

  it("works without label", () => {
    render(<Select options={mockOptions} data-testid="no-label" />);
    expect(screen.getByTestId("no-label")).toBeInTheDocument();
    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("works without options prop (children only)", () => {
    render(
      <Select label="Status" data-testid="children-only">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </Select>,
    );
    expect(screen.getByTestId("children-only")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Active" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Inactive" }),
    ).toBeInTheDocument();
  });

  it("placeholder option is disabled by default", () => {
    render(
      <Select label="Country" options={mockOptions} placeholder="Choose" />,
    );
    const placeholderOption = screen.getByRole("option", {
      name: "Choose",
    }) as HTMLOptionElement;
    expect(placeholderOption.disabled).toBe(true);
    expect(placeholderOption.value).toBe("");
  });
});
