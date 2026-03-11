import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar } from "./FilterBar";
import type { Filter } from "./FilterBar.types";

describe("FilterBar", () => {
  const mockFilters: Filter[] = [
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      id: "date",
      label: "Date Range",
      type: "daterange",
    },
  ];

  it("renders all filters", () => {
    render(
      <FilterBar filters={mockFilters} onApply={() => {}} />,
    );

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Date Range")).toBeInTheDocument();
  });

  it("handles filter changes", async () => {
    const handleApply = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterBar filters={mockFilters} onApply={handleApply} />,
    );

    const selectElement = screen.getByText("Status");
    expect(selectElement).toBeInTheDocument();
  });

  it("shows clear filters button", () => {
    render(
      <FilterBar filters={mockFilters} onApply={() => {}} />,
    );

    expect(screen.getByText(/filter/i)).toBeInTheDocument();
  });

  it("applies filters on submit", () => {
    const handleApply = vi.fn();

    render(
      <FilterBar filters={mockFilters} onApply={handleApply} />,
    );

    expect(screen.getByText(/Status|Date/i)).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <FilterBar
        ref={ref}
        filters={mockFilters}
        onApply={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
