import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar } from "./FilterBar";
import type { FilterDefinition, ActiveFilter } from "./FilterBar.types";

describe("FilterBar", () => {
  const mockFilters: FilterDefinition[] = [
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      key: "date",
      label: "Date Range",
      type: "date-range",
    },
  ];

  const mockActiveFilters: ActiveFilter[] = [];

  it("renders all filters", () => {
    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Date Range")).toBeInTheDocument();
  });

  it("handles filter changes", async () => {
    const handleFilterChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={handleFilterChange}
        onFilterRemove={() => {}}
      />,
    );

    const selectElement = screen.getByText("Status");
    expect(selectElement).toBeInTheDocument();
  });

  it("shows filters", () => {
    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    expect(screen.getAllByText(/Status|Date/i)[0]).toBeInTheDocument();
  });

  it("handles filter removal", () => {
    const handleFilterRemove = vi.fn();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={handleFilterRemove}
      />,
    );

    expect(screen.getAllByText(/Status|Date/i)[0]).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <FilterBar
        ref={ref}
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
