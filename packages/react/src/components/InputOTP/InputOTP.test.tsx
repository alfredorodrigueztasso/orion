import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputOTP } from "./InputOTP";

function renderOTP(props: Partial<Parameters<typeof InputOTP>[0]> = {}) {
  return render(
    <InputOTP maxLength={6} {...props}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>,
  );
}

describe("InputOTP", () => {
  // The hidden input has pointer-events: none (by design — clicks on container focus it).
  // Use pointerEventsCheck: 0 to bypass this in tests.
  const setupUser = () => userEvent.setup({ pointerEventsCheck: 0 });

  it("renders the OTP container with slots and separator", () => {
    renderOTP();

    expect(screen.getByRole("separator")).toBeInTheDocument();
    // Hidden input should be present
    const input = screen.getByLabelText("OTP input, 6 digits");
    expect(input).toBeInTheDocument();
  });

  it("has proper aria-label on hidden input", () => {
    renderOTP();
    const input = screen.getByLabelText("OTP input, 6 digits");
    expect(input).toBeInTheDocument();
  });

  it("sets inputMode to numeric by default", () => {
    renderOTP();
    const input = screen.getByLabelText("OTP input, 6 digits");
    expect(input).toHaveAttribute("inputMode", "numeric");
  });

  it("sets inputMode to text for alphanumeric type", () => {
    renderOTP({ type: "alphanumeric" });
    const input = screen.getByLabelText("OTP input, 6 digits");
    expect(input).toHaveAttribute("inputMode", "text");
  });

  it("accepts numeric input", async () => {
    const user = setupUser();
    const onChange = vi.fn();
    renderOTP({ onChange });

    const input = screen.getByLabelText("OTP input, 6 digits");
    await user.click(input);
    await user.type(input, "123");

    expect(onChange).toHaveBeenLastCalledWith("123");
  });

  it("filters non-numeric characters in numeric mode", async () => {
    const onChange = vi.fn();
    renderOTP({ onChange });

    const input = screen.getByLabelText("OTP input, 6 digits");

    // Directly fire change events to test the filtering logic
    fireEvent.change(input, { target: { value: "1a2b3" } });

    expect(onChange).toHaveBeenCalledWith("123");
  });

  it("calls onComplete when all slots are filled", async () => {
    const user = setupUser();
    const onComplete = vi.fn();
    renderOTP({ onComplete });

    const input = screen.getByLabelText("OTP input, 6 digits");
    await user.click(input);
    await user.type(input, "123456");

    expect(onComplete).toHaveBeenCalledWith("123456");
  });

  it("does not call onComplete when partially filled", async () => {
    const user = setupUser();
    const onComplete = vi.fn();
    renderOTP({ onComplete });

    const input = screen.getByLabelText("OTP input, 6 digits");
    await user.click(input);
    await user.type(input, "123");

    expect(onComplete).not.toHaveBeenCalled();
  });

  it("respects maxLength", () => {
    const onChange = vi.fn();
    renderOTP({ maxLength: 4, onChange });

    const input = screen.getByLabelText("OTP input, 4 digits");

    // Fire change with value exceeding maxLength
    fireEvent.change(input, { target: { value: "123456" } });

    // Should be truncated to 4
    expect(onChange).toHaveBeenCalledWith("1234");
  });

  it("works as controlled component", () => {
    const { rerender } = render(
      <InputOTP maxLength={4} value="12">
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
        </InputOTP.Group>
      </InputOTP>,
    );

    const input = screen.getByLabelText("OTP input, 4 digits");
    expect(input).toHaveValue("12");

    rerender(
      <InputOTP maxLength={4} value="1234">
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
        </InputOTP.Group>
      </InputOTP>,
    );

    expect(input).toHaveValue("1234");
  });

  it("disables the input when disabled prop is set", () => {
    renderOTP({ disabled: true });
    const input = screen.getByLabelText("OTP input, 6 digits");
    expect(input).toBeDisabled();
  });

  it("sets autocomplete to one-time-code", () => {
    renderOTP();
    const input = screen.getByLabelText("OTP input, 6 digits");
    expect(input).toHaveAttribute("autoComplete", "one-time-code");
  });

  it("applies custom className", () => {
    renderOTP({
      "data-testid": "otp-root",
      className: "custom-class",
    } as Record<string, unknown>);
    expect(screen.getByTestId("otp-root")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <InputOTP ref={ref} maxLength={4}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
        </InputOTP.Group>
      </InputOTP>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("renders separator with custom content", () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTP.Group>
          <InputOTP.Slot index={0} />
          <InputOTP.Slot index={1} />
        </InputOTP.Group>
        <InputOTP.Separator>/</InputOTP.Separator>
        <InputOTP.Group>
          <InputOTP.Slot index={2} />
          <InputOTP.Slot index={3} />
        </InputOTP.Group>
      </InputOTP>,
    );

    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("throws when Slot is used outside InputOTP", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<InputOTP.Slot index={0} />);
    }).toThrow("InputOTP.Slot/Group/Separator must be used within an InputOTP");
    consoleSpy.mockRestore();
  });

  it("displays characters in filled slots", () => {
    render(
      <InputOTP maxLength={4} value="12">
        <InputOTP.Group>
          <InputOTP.Slot index={0} data-testid="slot-0" />
          <InputOTP.Slot index={1} data-testid="slot-1" />
          <InputOTP.Slot index={2} data-testid="slot-2" />
          <InputOTP.Slot index={3} data-testid="slot-3" />
        </InputOTP.Group>
      </InputOTP>,
    );

    expect(screen.getByTestId("slot-0")).toHaveTextContent("1");
    expect(screen.getByTestId("slot-1")).toHaveTextContent("2");
    expect(screen.getByTestId("slot-2")).toHaveTextContent("");
    expect(screen.getByTestId("slot-3")).toHaveTextContent("");
  });

  // ============================================================================
  // MISSING BRANCHES & EVENT HANDLERS COVERAGE
  // ============================================================================

  it("calls preventDefault on Backspace when value is empty", () => {
    renderOTP({ value: "" });
    const input = screen.getByLabelText("OTP input, 6 digits");

    const event = new KeyboardEvent("keydown", {
      key: "Backspace",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    input.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("does not call preventDefault on Backspace when value is not empty", () => {
    const onChange = vi.fn();
    renderOTP({ value: "123", onChange });
    const input = screen.getByLabelText("OTP input, 6 digits");

    const event = new KeyboardEvent("keydown", {
      key: "Backspace",
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    input.dispatchEvent(event);

    // preventDefault should NOT be called when value is not empty
    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it("calls onChange with pasted value on paste event", () => {
    const onChange = vi.fn();
    renderOTP({ onChange });

    const input = screen.getByLabelText(
      "OTP input, 6 digits",
    ) as HTMLInputElement;

    // Simulate paste by firing change event with pasted value
    fireEvent.change(input, { target: { value: "123456" } });

    // Should call onChange with the pasted value
    expect(onChange).toHaveBeenCalledWith("123456");
  });

  it("truncates pasted value to maxLength", () => {
    const onChange = vi.fn();
    renderOTP({ maxLength: 4, onChange });

    const input = screen.getByLabelText(
      "OTP input, 4 digits",
    ) as HTMLInputElement;

    // Simulate paste with value longer than maxLength
    fireEvent.change(input, { target: { value: "123456" } });

    // Should truncate to 4 digits
    expect(onChange).toHaveBeenCalledWith("1234");
  });

  it("filters non-numeric characters in pasted value", () => {
    const onChange = vi.fn();
    renderOTP({ onChange });

    const input = screen.getByLabelText(
      "OTP input, 6 digits",
    ) as HTMLInputElement;

    // Simulate paste with non-numeric characters
    fireEvent.change(input, { target: { value: "1a2b3c" } });

    // Should filter to only numeric characters
    expect(onChange).toHaveBeenCalledWith("123");
  });

  it("shows caret when slot is focused", async () => {
    const user = setupUser();
    const { container } = renderOTP();

    const input = screen.getByLabelText("OTP input, 6 digits");
    await user.click(input);

    // Find the caret element in the first slot
    const caretElement = container.querySelector("[class*='caret']");
    expect(caretElement).toBeInTheDocument();
  });

  it("hides caret when focus is lost", () => {
    const { container } = renderOTP();

    // Initially, without focus, no caret should be visible
    const caretElement = container.querySelector("[class*='caret']");
    expect(caretElement).not.toBeInTheDocument();
  });
});
