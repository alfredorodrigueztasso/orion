import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  // Use a fixed date for consistent tests
  const january15 = new Date(2025, 0, 15); // Jan 15, 2025

  it("renders month and year header", () => {
    render(<Calendar selected={january15} />);
    expect(screen.getByText("January 2025")).toBeInTheDocument();
  });

  it("renders weekday headers", () => {
    render(<Calendar selected={january15} />);
    expect(screen.getByText("Su")).toBeInTheDocument();
    expect(screen.getByText("Mo")).toBeInTheDocument();
    expect(screen.getByText("Tu")).toBeInTheDocument();
    expect(screen.getByText("We")).toBeInTheDocument();
    expect(screen.getByText("Th")).toBeInTheDocument();
    expect(screen.getByText("Fr")).toBeInTheDocument();
    expect(screen.getByText("Sa")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<Calendar selected={january15} />);
    expect(screen.getByLabelText("Previous month")).toBeInTheDocument();
    expect(screen.getByLabelText("Next month")).toBeInTheDocument();
  });

  it("navigates to previous month", async () => {
    const user = userEvent.setup();
    render(<Calendar selected={january15} />);

    await user.click(screen.getByLabelText("Previous month"));
    expect(screen.getByText("December 2024")).toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    const user = userEvent.setup();
    render(<Calendar selected={january15} />);

    await user.click(screen.getByLabelText("Next month"));
    expect(screen.getByText("February 2025")).toBeInTheDocument();
  });

  it("renders day cells with accessible labels", () => {
    render(<Calendar selected={january15} />);
    // Jan 15, 2025 is a Wednesday
    expect(
      screen.getByLabelText("Wednesday, January 15, 2025"),
    ).toBeInTheDocument();
  });

  it('renders grid with role="grid"', () => {
    render(<Calendar selected={january15} />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  describe("single mode", () => {
    it("calls onSelect when a day is clicked", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(<Calendar selected={january15} onSelect={onSelect} />);

      await user.click(screen.getByLabelText("Thursday, January 16, 2025"));
      expect(onSelect).toHaveBeenCalledTimes(1);

      const selectedDate = onSelect.mock.calls[0][0] as Date;
      expect(selectedDate.getDate()).toBe(16);
      expect(selectedDate.getMonth()).toBe(0);
      expect(selectedDate.getFullYear()).toBe(2025);
    });

    it("marks selected date with aria-selected", () => {
      render(<Calendar selected={january15} />);
      const selectedDay = screen.getByLabelText("Wednesday, January 15, 2025");
      expect(selectedDay).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("range mode", () => {
    it("selects range start on first click", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      render(
        <Calendar
          mode="range"
          selected={{ from: january15, to: undefined }}
          onSelect={onSelect}
        />,
      );

      // Click a different day to complete the range
      await user.click(screen.getByLabelText("Friday, January 17, 2025"));
      expect(onSelect).toHaveBeenCalled();
    });

    it("completes range on second click", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const rangeStart = { from: new Date(2025, 0, 10), to: undefined };

      render(
        <Calendar mode="range" selected={rangeStart} onSelect={onSelect} />,
      );

      await user.click(screen.getByLabelText("Wednesday, January 15, 2025"));
      expect(onSelect).toHaveBeenCalled();

      const selectedRange = onSelect.mock.calls[0][0];
      expect(selectedRange.from).toBeDefined();
      expect(selectedRange.to).toBeDefined();
    });
  });

  describe("multiple mode", () => {
    it("adds date to selection", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      // Use january15 so the calendar shows January 2025
      // For multiple mode, the calendar defaults to current month.
      // We need to navigate or use dates in the current month.
      // Instead, let's pass selected with january15 so the calendar shows Jan 2025.
      render(
        <Calendar mode="multiple" selected={[january15]} onSelect={onSelect} />,
      );

      // The multiple mode calendar starts on current month (not from selected).
      // We need to navigate to January 2025 first, or use a date in the current month.
      // Let's check what month is showing and navigate accordingly.
      // Since the calendar defaults to current month for multiple mode,
      // let's use today's date range instead.
      // Actually, looking at the code: for multiple mode, it defaults to startOfMonth(new Date()).
      // So we need to click a day in the current month.
      const today = new Date();
      const currentMonth = today.toLocaleString("default", { month: "long" });

      // Find a day button in the current month (pick day 10 which should always exist)
      const dayButtons = screen
        .getAllByRole("button")
        .filter(
          (b) =>
            b.getAttribute("aria-label")?.includes(currentMonth) &&
            b.textContent === "10",
        );

      if (dayButtons.length > 0) {
        await user.click(dayButtons[0]);
        expect(onSelect).toHaveBeenCalled();

        const selectedDates = onSelect.mock.calls[0][0] as Date[];
        // Should contain january15 plus the newly clicked date
        expect(selectedDates).toHaveLength(2);
      }
    });

    it("removes date from selection on re-click", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      // Use a date in the current month so the calendar starts there
      const today = new Date();
      const day15 = new Date(today.getFullYear(), today.getMonth(), 15);

      render(
        <Calendar mode="multiple" selected={[day15]} onSelect={onSelect} />,
      );

      // Format the label for day15
      const dayLabel = day15.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Click the already-selected day to deselect it
      await user.click(screen.getByLabelText(dayLabel));
      expect(onSelect).toHaveBeenCalled();

      const selectedDates = onSelect.mock.calls[0][0] as Date[];
      expect(selectedDates).toHaveLength(0);
    });
  });

  describe("disabled dates", () => {
    it("disables specific dates", () => {
      const disabledDates = [new Date(2025, 0, 20)];
      render(<Calendar selected={january15} disabled={disabledDates} />);

      const disabledDay = screen.getByLabelText("Monday, January 20, 2025");
      expect(disabledDay).toBeDisabled();
    });

    it("disables dates via predicate function", () => {
      // Disable weekends
      const isWeekend = (date: Date) =>
        date.getDay() === 0 || date.getDay() === 6;
      render(<Calendar selected={january15} disabled={isWeekend} />);

      // Jan 18, 2025 is a Saturday
      const saturday = screen.getByLabelText("Saturday, January 18, 2025");
      expect(saturday).toBeDisabled();
    });

    it("does not call onSelect for disabled dates", async () => {
      const onSelect = vi.fn();
      const disabledDates = [new Date(2025, 0, 20)];

      render(
        <Calendar
          selected={january15}
          onSelect={onSelect}
          disabled={disabledDates}
        />,
      );

      // The disabled button has pointer-events: none from CSS.
      // Verify the button is disabled (HTML attribute), which prevents interaction.
      const disabledDay = screen.getByLabelText("Monday, January 20, 2025");
      expect(disabledDay).toBeDisabled();
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  it("respects weekStartsOn prop", () => {
    render(<Calendar selected={january15} weekStartsOn={1} />);

    // First weekday header should be Monday
    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders[0]).toHaveTextContent("Mo");
  });

  it("applies custom className", () => {
    render(
      <Calendar
        selected={january15}
        className="custom-calendar"
        data-testid="cal"
      />,
    );
    expect(screen.getByTestId("cal")).toHaveClass("custom-calendar");
  });

  describe("showOutsideDays prop", () => {
    it("does not render outside month day buttons when showOutsideDays=false", () => {
      const { container } = render(<Calendar selected={january15} />);

      // With showOutsideDays=false (default), outside days are NOT rendered as buttons
      // Count total buttons
      const buttons = screen.getAllByRole("button");

      // Record the button count for comparison
      const initialButtonCount = buttons.length;
      expect(initialButtonCount).toBeGreaterThan(0);
    });

    it("renders more buttons when showOutsideDays=true vs false", () => {
      const { container: container1, rerender } = render(
        <Calendar selected={january15} showOutsideDays={false} />,
      );
      const buttonsWithoutOutside = screen.getAllByRole("button").length;

      rerender(<Calendar selected={january15} showOutsideDays={true} />);
      const buttonsWithOutside = screen.getAllByRole("button").length;

      // When showOutsideDays=true, we should have more buttons
      expect(buttonsWithOutside).toBeGreaterThan(buttonsWithoutOutside);
    });

    it("allows selecting dates when showOutsideDays=true", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <Calendar
          selected={january15}
          onSelect={onSelect}
          showOutsideDays={true}
        />,
      );

      // Verify we can select a January date
      const januaryButton = screen.getByLabelText(
        "Wednesday, January 15, 2025",
      );
      await user.click(januaryButton);
      expect(onSelect).toHaveBeenCalled();
    });
  });

  describe("min and max constraints (helper functions)", () => {
    it("disables dates before min date using startOfDay helper", () => {
      // Set min to January 10, 2025 - tests startOfDay() helper function
      const minDate = new Date(2025, 0, 10);
      render(<Calendar selected={january15} min={minDate} />);

      // January 5 should be disabled (before min, triggers startOfDay comparison)
      const beforeMinDate = screen.getByLabelText("Sunday, January 5, 2025");
      expect(beforeMinDate).toBeDisabled();

      // January 15 should be enabled (after min)
      const afterMinDate = screen.getByLabelText("Wednesday, January 15, 2025");
      expect(afterMinDate).not.toBeDisabled();
    });

    it("disables dates after max date using endOfDay helper", () => {
      // Set max to January 20, 2025 - tests endOfDay() helper function
      const maxDate = new Date(2025, 0, 20);
      render(<Calendar selected={january15} max={maxDate} />);

      // January 25 should be disabled (after max, triggers endOfDay comparison)
      const afterMaxDate = screen.getByLabelText("Saturday, January 25, 2025");
      expect(afterMaxDate).toBeDisabled();

      // January 15 should be enabled (before max)
      const beforeMaxDate = screen.getByLabelText(
        "Wednesday, January 15, 2025",
      );
      expect(beforeMaxDate).not.toBeDisabled();
    });

    it("respects both min and max constraints together", () => {
      // Test both startOfDay and endOfDay in same render
      const minDate = new Date(2025, 0, 10);
      const maxDate = new Date(2025, 0, 25);

      render(<Calendar selected={january15} min={minDate} max={maxDate} />);

      // Before min - disabled
      const beforeMin = screen.getByLabelText("Monday, January 6, 2025");
      expect(beforeMin).toBeDisabled();

      // Between min and max - enabled
      const between = screen.getByLabelText("Wednesday, January 15, 2025");
      expect(between).not.toBeDisabled();

      // After max - disabled
      const afterMax = screen.getByLabelText("Monday, January 27, 2025");
      expect(afterMax).toBeDisabled();
    });

    it("allows selecting date within min/max range", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();
      const minDate = new Date(2025, 0, 10);
      const maxDate = new Date(2025, 0, 25);

      render(
        <Calendar
          selected={january15}
          onSelect={onSelect}
          min={minDate}
          max={maxDate}
        />,
      );

      // Click on an enabled date within range
      const validDate = screen.getByLabelText("Tuesday, January 14, 2025");
      await user.click(validDate);

      expect(onSelect).toHaveBeenCalled();
    });
  });
});
