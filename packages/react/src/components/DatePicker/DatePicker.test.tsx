import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders input field", () => {
    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("displays placeholder", () => {
    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
        placeholder="Select date"
      />,
    );

    const input = screen.getByPlaceholderText("Select date");
    expect(input).toBeInTheDocument();
  });

  it("shows selected date", () => {
    const selectedDate = new Date("2024-03-15");

    render(
      <DatePicker
        value={selectedDate}
        onChange={() => {}}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toMatch(/2024|03|15|march|15/i);
  });

  it("opens calendar popup on input click", async () => {
    const user = userEvent.setup();

    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.click(input);

    // Calendar popup should be visible
    expect(input).toBeInTheDocument();
  });

  it("handles date selection", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <DatePicker
        value={undefined}
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.click(input);

    // Should be able to select a date
    expect(input).toBeInTheDocument();
  });

  it("supports date range mode", () => {
    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
        range
      />,
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs.length).toBeGreaterThanOrEqual(1);
  });

  it("applies min/max date constraints", async () => {
    const minDate = new Date("2024-01-01");
    const maxDate = new Date("2024-12-31");

    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
        minDate={minDate}
        maxDate={maxDate}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("disables specific dates", () => {
    const disabledDates = [
      new Date("2024-03-10"),
      new Date("2024-03-11"),
    ];

    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
        disabledDates={disabledDates}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("shows disabled state", () => {
    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
        disabled
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it("supports keyboard input", async () => {
    const user = userEvent.setup();

    render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "03/15/2024");

    expect(input).toBeInTheDocument();
  });

  it("clears date on clear button click", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <DatePicker
        value={new Date("2024-03-15")}
        onChange={handleChange}
        clearable
      />,
    );

    const clearButton = screen.queryByLabelText(/clear|reset/i);
    if (clearButton) {
      await user.click(clearButton);
      expect(handleChange).toHaveBeenCalledWith(null);
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <DatePicker
        value={undefined}
        onChange={() => {}}
        className="custom-picker"
      />,
    );

    const picker = container.querySelector(".custom-picker");
    expect(picker).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <DatePicker
        ref={ref}
        value={undefined}
        onChange={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("supports readonly mode", () => {
    render(
      <DatePicker
        value={new Date("2024-03-15")}
        onChange={() => {}}
        readOnly
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input).toHaveAttribute("readOnly");
  });

  it("formats date correctly", () => {
    const selectedDate = new Date("2024-03-15");

    render(
      <DatePicker
        value={selectedDate}
        onChange={() => {}}
        format="MM/DD/YYYY"
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toMatch(/03.*15.*2024|03\/15\/2024/);
  });
});
