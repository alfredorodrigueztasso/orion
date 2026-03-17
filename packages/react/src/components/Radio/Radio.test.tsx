import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio } from "./Radio";

describe("Radio", () => {
  it("renders with label", () => {
    render(<Radio label="Free Plan" name="plan" value="free" />);
    expect(screen.getByText("Free Plan")).toBeInTheDocument();
  });

  it("renders without label", () => {
    const { container } = render(<Radio name="plan" value="free" />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeInTheDocument();
    expect(container.querySelector("label")).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(
      <Radio
        label="Pro Plan"
        helperText="Recommended for teams"
        name="plan"
        value="pro"
      />,
    );
    expect(screen.getByText("Recommended for teams")).toBeInTheDocument();
  });

  it("renders with error message", () => {
    render(
      <Radio
        label="Plan"
        error="Selection required"
        name="plan"
        value="plan"
      />,
    );
    expect(screen.getByText(/Selection required/)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("hides helper text when error is shown", () => {
    render(
      <Radio
        label="Plan"
        helperText="Choose a plan"
        error="Selection required"
        name="plan"
        value="plan"
      />,
    );
    expect(screen.getByText(/Selection required/)).toBeInTheDocument();
    expect(screen.queryByText("Choose a plan")).not.toBeInTheDocument();
  });

  it("handles user selection", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Radio label="Free Plan" name="plan" value="free" />,
    );
    const radio = screen.getByRole("radio") as HTMLInputElement;
    const label = container.querySelector("label");

    expect(radio.checked).toBe(false);
    await user.click(label!);
    expect(radio.checked).toBe(true);
  });

  it("handles onChange event", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    const { container } = render(
      <Radio
        label="Free Plan"
        name="plan"
        value="free"
        onChange={handleChange}
      />,
    );
    const label = container.querySelector("label");

    await user.click(label!);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not allow user interaction when disabled", () => {
    const { container } = render(
      <Radio label="Disabled" disabled name="plan" value="disabled" />,
    );
    const radio = screen.getByRole("radio") as HTMLInputElement;
    const label = container.querySelector("label");

    expect(radio.checked).toBe(false);
    expect(radio.disabled).toBe(true);
    fireEvent.click(label!);
    expect(radio.checked).toBe(false);
  });

  it("supports checked prop", () => {
    render(
      <Radio label="Selected" checked name="plan" value="selected" readOnly />,
    );
    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it("supports defaultChecked prop", () => {
    render(
      <Radio
        label="Default Selected"
        defaultChecked
        name="plan"
        value="default"
      />,
    );
    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.checked).toBe(true);
  });

  it("applies sm size class", () => {
    const { container } = render(
      <Radio label="Small" size="sm" name="plan" value="sm" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
  });

  it("applies md size class by default", () => {
    const { container } = render(
      <Radio label="Medium" name="plan" value="md" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);
  });

  it("applies lg size class", () => {
    const { container } = render(
      <Radio label="Large" size="lg" name="plan" value="lg" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("applies error class when error prop is provided", () => {
    const { container } = render(
      <Radio label="Plan" error="Required" name="plan" value="plan" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/error/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Radio label="Plan" className="custom-radio" name="plan" value="plan" />,
    );
    expect(container.firstChild).toHaveClass("custom-radio");
  });

  it("passes through HTML attributes", () => {
    render(
      <Radio label="Plan" data-testid="test-radio" name="plan" value="plan" />,
    );
    expect(screen.getByTestId("test-radio")).toBeInTheDocument();
  });

  it("has correct aria-invalid when error is present", () => {
    render(<Radio label="Plan" error="Required" name="plan" value="plan" />);
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("aria-invalid", "true");
  });

  it("has correct aria-invalid when no error", () => {
    render(<Radio label="Plan" name="plan" value="plan" />);
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("aria-invalid", "false");
  });

  it("links helper text with aria-describedby", () => {
    render(
      <Radio
        label="Plan"
        helperText="Choose wisely"
        name="plan"
        value="plan"
        id="plan-radio"
      />,
    );
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("aria-describedby", "plan-radio-helper");
    expect(document.getElementById("plan-radio-helper")).toHaveTextContent(
      "Choose wisely",
    );
  });

  it("links error message with aria-describedby", () => {
    render(
      <Radio
        label="Plan"
        error="Required"
        name="plan"
        value="plan"
        id="plan-radio"
      />,
    );
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("aria-describedby", "plan-radio-error");
    expect(document.getElementById("plan-radio-error")).toHaveTextContent(
      "Required",
    );
  });

  it("generates unique ID when not provided", () => {
    const { container: container1 } = render(
      <Radio label="Plan 1" name="plan" value="1" />,
    );
    const { container: container2 } = render(
      <Radio label="Plan 2" name="plan" value="2" />,
    );

    const radio1 = container1.querySelector('input[type="radio"]');
    const radio2 = container2.querySelector('input[type="radio"]');

    expect(radio1?.id).toBeTruthy();
    expect(radio2?.id).toBeTruthy();
    expect(radio1?.id).not.toBe(radio2?.id);
  });

  it("uses provided id", () => {
    render(
      <Radio label="Plan" name="plan" value="plan" id="custom-radio-id" />,
    );
    const radio = screen.getByRole("radio");
    expect(radio.id).toBe("custom-radio-id");
  });

  it("supports ref forwarding", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Radio label="Plan" name="plan" value="plan" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.type).toBe("radio");
  });

  describe("Radio Groups", () => {
    it("allows only one selection in a group", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <div>
          <Radio label="Free" name="plan" value="free" />
          <Radio label="Pro" name="plan" value="pro" />
          <Radio label="Enterprise" name="plan" value="enterprise" />
        </div>,
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      expect(radios).toHaveLength(3);

      // Initially none selected
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(false);

      // Select first
      const labels = container.querySelectorAll("label");
      await user.click(labels[0]);
      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(false);

      // Select second (first should deselect)
      await user.click(labels[1]);
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(radios[2].checked).toBe(false);

      // Select third
      await user.click(labels[2]);
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(true);
    });

    it("handles default selected option", () => {
      render(
        <div>
          <Radio label="Free" name="plan" value="free" />
          <Radio label="Pro" name="plan" value="pro" defaultChecked />
          <Radio label="Enterprise" name="plan" value="enterprise" />
        </div>,
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);
      expect(radios[2].checked).toBe(false);
    });

    it("handles controlled radio group", async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [selected, setSelected] = React.useState("pro");
        return (
          <div>
            <Radio
              label="Free"
              name="plan"
              value="free"
              checked={selected === "free"}
              onChange={(e) => setSelected(e.target.value)}
            />
            <Radio
              label="Pro"
              name="plan"
              value="pro"
              checked={selected === "pro"}
              onChange={(e) => setSelected(e.target.value)}
            />
            <Radio
              label="Enterprise"
              name="plan"
              value="enterprise"
              checked={selected === "enterprise"}
              onChange={(e) => setSelected(e.target.value)}
            />
          </div>
        );
      };

      const { container } = render(<TestComponent />);
      const labels = container.querySelectorAll("label");
      const radios = screen.getAllByRole("radio") as HTMLInputElement[];

      // Pro should be selected initially
      expect(radios[1].checked).toBe(true);

      // Click Enterprise
      await user.click(labels[2]);
      expect(radios[2].checked).toBe(true);
      expect(radios[1].checked).toBe(false);
    });
  });

  describe("All Sizes", () => {
    it("renders small size", () => {
      const { container } = render(
        <Radio label="Small" size="sm" name="plan" value="sm" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
    });

    it("renders medium size", () => {
      const { container } = render(
        <Radio label="Medium" size="md" name="plan" value="md" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(/md/);
    });

    it("renders large size", () => {
      const { container } = render(
        <Radio label="Large" size="lg" name="plan" value="lg" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
    });
  });

  describe("All States", () => {
    it("renders unchecked state", () => {
      render(<Radio label="Unchecked" name="plan" value="unchecked" />);
      const radio = screen.getByRole("radio") as HTMLInputElement;
      expect(radio.checked).toBe(false);
    });

    it("renders checked state", () => {
      render(
        <Radio label="Checked" name="plan" value="checked" checked readOnly />,
      );
      const radio = screen.getByRole("radio") as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });

    it("renders disabled unchecked state", () => {
      render(
        <Radio
          label="Disabled Unchecked"
          disabled
          name="plan"
          value="disabled"
        />,
      );
      const radio = screen.getByRole("radio") as HTMLInputElement;
      expect(radio.disabled).toBe(true);
      expect(radio.checked).toBe(false);
    });

    it("renders disabled checked state", () => {
      render(
        <Radio
          label="Disabled Checked"
          disabled
          checked
          name="plan"
          value="disabled"
          readOnly
        />,
      );
      const radio = screen.getByRole("radio") as HTMLInputElement;
      expect(radio.disabled).toBe(true);
      expect(radio.checked).toBe(true);
    });

    it("renders with helper text", () => {
      render(
        <Radio
          label="With Helper"
          helperText="Additional information"
          name="plan"
          value="helper"
        />,
      );
      expect(screen.getByText("Additional information")).toBeInTheDocument();
    });

    it("renders with error", () => {
      render(
        <Radio
          label="With Error"
          error="This field is required"
          name="plan"
          value="error"
        />,
      );
      expect(screen.getByText(/This field is required/)).toBeInTheDocument();
    });
  });
});
