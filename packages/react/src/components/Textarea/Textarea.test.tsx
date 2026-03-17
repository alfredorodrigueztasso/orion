import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("renders with label", () => {
    render(<Textarea label="Description" />);
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<Textarea placeholder="Enter text..." />);
    const textarea = screen.getByPlaceholderText("Enter text...");
    expect(textarea).toBeInTheDocument();
  });

  it("renders with helper text", () => {
    render(<Textarea label="Bio" helperText="Tell us about yourself" />);
    expect(screen.getByText("Tell us about yourself")).toBeInTheDocument();
  });

  it("renders with error message", () => {
    render(<Textarea label="Comments" error="This field is required" />);
    expect(screen.getByText(/This field is required/)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("hides helper text when error is shown", () => {
    render(
      <Textarea
        label="Comments"
        helperText="Add your comments"
        error="This field is required"
      />,
    );
    expect(screen.getByText(/This field is required/)).toBeInTheDocument();
    expect(screen.queryByText("Add your comments")).not.toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Description" />);
    const textarea = screen.getByLabelText(
      "Description",
    ) as HTMLTextAreaElement;

    await user.type(textarea, "Hello world");
    expect(textarea.value).toBe("Hello world");
  });

  it("handles onChange event", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Textarea label="Description" onChange={handleChange} />);
    const textarea = screen.getByLabelText("Description");

    await user.type(textarea, "Test");
    expect(handleChange).toHaveBeenCalled();
  });

  it("does not allow user interaction when disabled", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Disabled" disabled />);
    const textarea = screen.getByLabelText("Disabled") as HTMLTextAreaElement;

    expect(textarea.disabled).toBe(true);
    await user.type(textarea, "Test");
    expect(textarea.value).toBe("");
  });

  it("supports value prop (controlled)", () => {
    render(
      <Textarea label="Controlled" value="Initial value" onChange={() => {}} />,
    );
    const textarea = screen.getByLabelText("Controlled") as HTMLTextAreaElement;
    expect(textarea.value).toBe("Initial value");
  });

  it("supports defaultValue prop (uncontrolled)", () => {
    render(<Textarea label="Uncontrolled" defaultValue="Default text" />);
    const textarea = screen.getByLabelText(
      "Uncontrolled",
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("Default text");
  });

  it("applies sm size class", () => {
    const { container } = render(<Textarea label="Small" size="sm" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
  });

  it("applies md size class by default", () => {
    const { container } = render(<Textarea label="Medium" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);
  });

  it("applies lg size class", () => {
    const { container } = render(<Textarea label="Large" size="lg" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("applies resize none class", () => {
    const { container } = render(<Textarea label="No Resize" resize="none" />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /resizeNone/,
    );
  });

  it("applies resize vertical class by default", () => {
    const { container } = render(<Textarea label="Vertical Resize" />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /resizeVertical/,
    );
  });

  it("applies resize horizontal class", () => {
    const { container } = render(
      <Textarea label="Horizontal Resize" resize="horizontal" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(
      /resizeHorizontal/,
    );
  });

  it("applies resize both class", () => {
    const { container } = render(
      <Textarea label="Both Resize" resize="both" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(
      /resizeBoth/,
    );
  });

  it("applies error class when error prop is provided", () => {
    const { container } = render(
      <Textarea label="Description" error="Required" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/error/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Textarea label="Description" className="custom-textarea" />,
    );
    expect(container.firstChild).toHaveClass("custom-textarea");
  });

  it("passes through HTML attributes", () => {
    render(<Textarea label="Description" data-testid="test-textarea" />);
    expect(screen.getByTestId("test-textarea")).toBeInTheDocument();
  });

  it("has correct aria-invalid when error is present", () => {
    render(<Textarea label="Description" error="Required" />);
    const textarea = screen.getByLabelText("Description");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
  });

  it("has correct aria-invalid when no error", () => {
    render(<Textarea label="Description" />);
    const textarea = screen.getByLabelText("Description");
    expect(textarea).toHaveAttribute("aria-invalid", "false");
  });

  it("links helper text with aria-describedby", () => {
    render(
      <Textarea
        label="Description"
        helperText="Provide details"
        id="description-textarea"
      />,
    );
    const textarea = screen.getByLabelText("Description");
    expect(textarea).toHaveAttribute(
      "aria-describedby",
      "description-textarea-helper",
    );
    expect(
      document.getElementById("description-textarea-helper"),
    ).toHaveTextContent("Provide details");
  });

  it("links error message with aria-describedby", () => {
    render(
      <Textarea
        label="Description"
        error="Required"
        id="description-textarea"
      />,
    );
    const textarea = screen.getByLabelText("Description");
    expect(textarea).toHaveAttribute(
      "aria-describedby",
      "description-textarea-error",
    );
    expect(
      document.getElementById("description-textarea-error"),
    ).toHaveTextContent("Required");
  });

  it("generates unique ID when not provided", () => {
    const { container: container1 } = render(<Textarea label="Textarea 1" />);
    const { container: container2 } = render(<Textarea label="Textarea 2" />);

    const textarea1 = container1.querySelector("textarea");
    const textarea2 = container2.querySelector("textarea");

    expect(textarea1?.id).toBeTruthy();
    expect(textarea2?.id).toBeTruthy();
    expect(textarea1?.id).not.toBe(textarea2?.id);
  });

  it("uses provided id", () => {
    render(<Textarea label="Description" id="custom-textarea-id" />);
    const textarea = screen.getByLabelText("Description");
    expect(textarea.id).toBe("custom-textarea-id");
  });

  it("supports ref forwarding", () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea label="Description" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  describe("Character Counter", () => {
    it("shows character counter when showCounter is true", async () => {
      const user = userEvent.setup();
      render(<Textarea label="Bio" maxLength={100} showCounter />);
      const textarea = screen.getByLabelText("Bio");

      // Counter should show 0/100 initially
      expect(screen.getByText("0/100")).toBeInTheDocument();

      // Type some text
      await user.type(textarea, "Hello");
      expect(screen.getByText("5/100")).toBeInTheDocument();
    });

    it("does not show counter when showCounter is false", () => {
      render(<Textarea label="Bio" maxLength={100} />);
      expect(screen.queryByText("0/100")).not.toBeInTheDocument();
    });

    it("updates counter as user types", async () => {
      const user = userEvent.setup();
      render(<Textarea label="Bio" maxLength={50} showCounter />);
      const textarea = screen.getByLabelText("Bio");

      await user.type(textarea, "Testing character count");
      expect(screen.getByText("23/50")).toBeInTheDocument();
    });

    it("counter shows warning state at 90%", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Textarea label="Bio" maxLength={10} showCounter />,
      );
      const textarea = screen.getByLabelText("Bio");

      // Type 9 characters (90%)
      await user.type(textarea, "123456789");
      const counter = container.querySelector('[class*="counterWarning"]');
      expect(counter).toBeInTheDocument();
      expect(counter).toHaveTextContent("9/10");
    });

    it("counter shows error state at 100%", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Textarea label="Bio" maxLength={10} showCounter />,
      );
      const textarea = screen.getByLabelText("Bio");

      // Type 10 characters (100%)
      await user.type(textarea, "1234567890");
      const counter = container.querySelector('[class*="counterError"]');
      expect(counter).toBeInTheDocument();
      expect(counter).toHaveTextContent("10/10");
    });

    it("tracks character count for controlled component", () => {
      const { rerender } = render(
        <Textarea
          label="Bio"
          value="Initial"
          maxLength={50}
          showCounter
          onChange={() => {}}
        />,
      );
      expect(screen.getByText("7/50")).toBeInTheDocument();

      rerender(
        <Textarea
          label="Bio"
          value="Updated text"
          maxLength={50}
          showCounter
          onChange={() => {}}
        />,
      );
      expect(screen.getByText("12/50")).toBeInTheDocument();
    });

    it("tracks character count for uncontrolled component with defaultValue", () => {
      render(
        <Textarea
          label="Bio"
          defaultValue="Hello world"
          maxLength={50}
          showCounter
        />,
      );
      expect(screen.getByText("11/50")).toBeInTheDocument();
    });
  });

  describe("Resize Behavior", () => {
    it("applies resize none", () => {
      const { container } = render(
        <Textarea label="No Resize" resize="none" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(
        /resizeNone/,
      );
    });

    it("applies resize vertical (default)", () => {
      const { container } = render(<Textarea label="Vertical" />);
      expect((container.firstChild as HTMLElement).className).toMatch(
        /resizeVertical/,
      );
    });

    it("applies resize horizontal", () => {
      const { container } = render(
        <Textarea label="Horizontal" resize="horizontal" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(
        /resizeHorizontal/,
      );
    });

    it("applies resize both", () => {
      const { container } = render(<Textarea label="Both" resize="both" />);
      expect((container.firstChild as HTMLElement).className).toMatch(
        /resizeBoth/,
      );
    });
  });

  describe("All Sizes", () => {
    it("renders small size", () => {
      const { container } = render(<Textarea label="Small" size="sm" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
    });

    it("renders medium size", () => {
      const { container } = render(<Textarea label="Medium" size="md" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/md/);
    });

    it("renders large size", () => {
      const { container } = render(<Textarea label="Large" size="lg" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
    });
  });

  describe("All States", () => {
    it("renders default state", () => {
      render(<Textarea label="Default" />);
      const textarea = screen.getByLabelText("Default") as HTMLTextAreaElement;
      expect(textarea.value).toBe("");
      expect(textarea.disabled).toBe(false);
    });

    it("renders with value", () => {
      render(
        <Textarea label="With Value" value="Some text" onChange={() => {}} />,
      );
      const textarea = screen.getByLabelText(
        "With Value",
      ) as HTMLTextAreaElement;
      expect(textarea.value).toBe("Some text");
    });

    it("renders disabled state", () => {
      render(<Textarea label="Disabled" disabled />);
      const textarea = screen.getByLabelText("Disabled") as HTMLTextAreaElement;
      expect(textarea.disabled).toBe(true);
    });

    it("renders with helper text", () => {
      render(
        <Textarea label="With Helper" helperText="Additional information" />,
      );
      expect(screen.getByText("Additional information")).toBeInTheDocument();
    });

    it("renders with error", () => {
      render(<Textarea label="With Error" error="This field is required" />);
      expect(screen.getByText(/This field is required/)).toBeInTheDocument();
    });

    it("renders with character counter", async () => {
      const user = userEvent.setup();
      render(<Textarea label="With Counter" maxLength={100} showCounter />);
      expect(screen.getByText("0/100")).toBeInTheDocument();

      const textarea = screen.getByLabelText("With Counter");
      await user.type(textarea, "Test");
      expect(screen.getByText("4/100")).toBeInTheDocument();
    });
  });

  describe("Max Length", () => {
    it("enforces maxLength attribute", async () => {
      const user = userEvent.setup();
      render(<Textarea label="Limited" maxLength={10} />);
      const textarea = screen.getByLabelText("Limited") as HTMLTextAreaElement;

      await user.type(textarea, "12345678901234567890");
      // Browser enforces maxLength, so value should be truncated to 10 chars
      expect(textarea.value.length).toBeLessThanOrEqual(10);
    });

    it("shows counter at max length", async () => {
      const user = userEvent.setup();
      render(<Textarea label="Limited" maxLength={5} showCounter />);
      const textarea = screen.getByLabelText("Limited");

      await user.type(textarea, "12345");
      expect(screen.getByText("5/5")).toBeInTheDocument();
    });
  });

  describe("Rows", () => {
    it("supports rows attribute", () => {
      render(<Textarea label="Tall" rows={10} />);
      const textarea = screen.getByLabelText("Tall");
      expect(textarea).toHaveAttribute("rows", "10");
    });

    it("uses default rows when not specified", () => {
      render(<Textarea label="Default" />);
      const textarea = screen.getByLabelText("Default");
      // Should not have explicit rows attribute (uses CSS default)
      expect(textarea.hasAttribute("rows")).toBe(false);
    });
  });
});
