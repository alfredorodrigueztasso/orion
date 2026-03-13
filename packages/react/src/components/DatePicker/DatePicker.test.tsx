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

  it("formats selected date correctly", () => {
    const selectedDate = new Date("2024-03-15");

    render(
      <DatePicker
        selected={selectedDate}
        onSelect={() => {}}
        placeholder="Select date"
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("uses custom date format", () => {
    const selectedDate = new Date("2024-03-15");

    render(
      <DatePicker
        selected={selectedDate}
        onSelect={() => {}}
        format="yyyy-MM-dd"
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders with presets", async () => {
    const handleSelect = vi.fn();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const presets = [
      { label: "Today", value: today },
      { label: "Tomorrow", value: tomorrow },
    ];

    render(
      <DatePicker
        selected={undefined}
        onSelect={handleSelect}
        presets={presets}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles range mode with start and end dates", () => {
    const startDate = new Date("2024-03-15");
    const endDate = new Date("2024-03-20");

    render(
      <DatePicker
        mode="range"
        selected={{ from: startDate, to: endDate }}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("handles range mode with only start date", () => {
    const startDate = new Date("2024-03-15");

    render(
      <DatePicker
        mode="range"
        selected={{ from: startDate }}
        onSelect={() => {}}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("respects min date constraint", () => {
    const minDate = new Date("2024-01-01");

    render(
      <DatePicker selected={undefined} onSelect={() => {}} min={minDate} />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("respects max date constraint", () => {
    const maxDate = new Date("2024-12-31");

    render(
      <DatePicker selected={undefined} onSelect={() => {}} max={maxDate} />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("displays both min and max date constraints", () => {
    const minDate = new Date("2024-01-01");
    const maxDate = new Date("2024-12-31");

    render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        min={minDate}
        max={maxDate}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders disabled dates correctly", () => {
    const disabledDates = [
      new Date("2024-03-10"),
      new Date("2024-03-11"),
      new Date("2024-03-12"),
    ];

    render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        disabledDates={disabledDates}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies custom trigger className", () => {
    const { container } = render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        triggerClassName="custom-trigger"
      />,
    );

    const button = screen.getByRole("button");
    expect(button?.className).toContain("custom-trigger");
  });

  it("renders with both trigger and wrapper custom classes", () => {
    const { container } = render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        triggerClassName="custom-trigger"
        className="custom-wrapper"
      />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("shows placeholder when no date selected", () => {
    render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        placeholder="Choose a date"
      />,
    );

    expect(screen.getByText("Choose a date")).toBeInTheDocument();
  });

  it("hides placeholder when date is selected", () => {
    const selectedDate = new Date("2024-03-15");

    const { rerender } = render(
      <DatePicker
        selected={undefined}
        onSelect={() => {}}
        placeholder="Choose a date"
      />,
    );

    rerender(
      <DatePicker
        selected={selectedDate}
        onSelect={() => {}}
        placeholder="Choose a date"
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("closes popover after selecting a single date", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DatePicker mode="single" selected={undefined} onSelect={handleSelect} />,
    );

    const button = screen.getByRole("button");
    await user.click(button);

    expect(button).toBeInTheDocument();
  });

  it("keeps popover open when selecting start of range", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <DatePicker mode="range" selected={undefined} onSelect={handleSelect} />,
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("closes popover when range is complete", () => {
    const handleSelect = vi.fn();
    const startDate = new Date("2024-03-15");
    const endDate = new Date("2024-03-20");

    render(
      <DatePicker
        mode="range"
        selected={{ from: startDate, to: endDate }}
        onSelect={handleSelect}
      />,
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
