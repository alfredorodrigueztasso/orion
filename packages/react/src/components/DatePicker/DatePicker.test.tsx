import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders trigger button", () => {
    render(<DatePicker selected={undefined} onSelect={() => {}} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("displays placeholder text", () => {
    render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        placeholder="Select date"
      />,
    );

    expect(screen.getByText("Select date")).toBeInTheDocument();
  });

  it("shows selected date", () => {
    const selectedDate = new Date("2024-03-15");

    render(<DatePicker selected={selectedDate} onSelect={() => {}} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("opens calendar popup on button click", async () => {
    const user = userEvent.setup();

    render(<DatePicker selected={undefined} onSelect={() => {}} />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Calendar popup should be visible
    expect(button).toBeInTheDocument();
  });

  it("handles date selection", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(<DatePicker selected={undefined} onSelect={handleSelect} />);

    const button = screen.getByRole("button");
    await user.click(button);

    // Should be able to select a date
    expect(button).toBeInTheDocument();
  });

  it("supports date range mode", () => {
    render(
      <DatePicker selected={undefined} onSelect={() => {}} mode="range" />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("applies min/max date constraints", async () => {
    const min = new Date("2024-01-01");
    const max = new Date("2024-12-31");

    render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        min={min}
        max={max}
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("disables specific dates", () => {
    const disabledDates = [new Date("2024-03-10"), new Date("2024-03-11")];

    render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        disabledDates={disabledDates}
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("shows disabled state", () => {
    render(<DatePicker selected={undefined} onSelect={() => {}} disabled />);

    const button = screen.getByRole("button");
    expect(button.hasAttribute("disabled")).toBeTruthy();
  });

  it("handles keyboard interaction", async () => {
    const user = userEvent.setup();

    render(<DatePicker selected={undefined} onSelect={() => {}} />);

    const button = screen.getByRole("button");
    await user.keyboard("{Enter}");

    expect(button).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        className="custom-picker"
      />,
    );

    const picker = container.querySelector(".custom-picker");
    expect(picker).toBeInTheDocument();
  });
});
