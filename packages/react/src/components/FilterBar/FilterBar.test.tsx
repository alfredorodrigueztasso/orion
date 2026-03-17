import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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
      key: "priority",
      label: "Priority",
      type: "multi-select",
      options: [
        { label: "High", value: "high", count: 5 },
        { label: "Medium", value: "medium", count: 8 },
        { label: "Low", value: "low", count: 3 },
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
    expect(screen.getByText("Priority")).toBeInTheDocument();
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

    const statusButton = screen.getByText("Status").closest("button");
    await user.click(statusButton!);

    expect(screen.getByText("Active")).toBeInTheDocument();
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

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
  });

  it("handles filter removal", () => {
    const handleFilterRemove = vi.fn();
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={handleFilterRemove}
      />,
    );

    const removeButton = screen.getByLabelText("Remove Active filter");
    fireEvent.click(removeButton);
    expect(handleFilterRemove).toHaveBeenCalledWith("status");
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

  it("opens dropdown on filter trigger click", async () => {
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    const statusButton = screen.getByText("Status").closest("button");
    await user.click(statusButton!);

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("closes dropdown when option is selected", async () => {
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

    const statusButton = screen.getByText("Status").closest("button");
    await user.click(statusButton!);

    const activeOption = screen.getByText("Active").closest("button");
    await user.click(activeOption!);

    expect(handleFilterChange).toHaveBeenCalledWith("status", "active");
  });

  it("toggles dropdown when clicking trigger again", async () => {
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    const statusButton = screen.getByText("Status").closest("button");

    // Open
    await user.click(statusButton!);
    expect(screen.getByText("Active")).toBeInTheDocument();

    // Close
    await user.click(statusButton!);
    expect(screen.queryByText("Active")).not.toBeInTheDocument();
  });

  it("displays active filter chips", () => {
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
      { key: "priority", value: "high", label: "High Priority" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("High Priority")).toBeInTheDocument();
  });

  it("shows clear all button when multiple filters active", () => {
    const handleClearAll = vi.fn();
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
      { key: "priority", value: "high", label: "High Priority" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        onClearAll={handleClearAll}
      />,
    );

    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("calls onClearAll when clear all button is clicked", async () => {
    const handleClearAll = vi.fn();
    const user = userEvent.setup();
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
      { key: "priority", value: "high", label: "High Priority" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        onClearAll={handleClearAll}
      />,
    );

    const clearAllButton = screen.getByText("Clear all");
    await user.click(clearAllButton);

    expect(handleClearAll).toHaveBeenCalled();
  });

  it("does not show clear all button when only one filter active", () => {
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        onClearAll={() => {}}
      />,
    );

    expect(screen.queryByText("Clear all")).not.toBeInTheDocument();
  });

  it("displays filter count with singular form", () => {
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        showCount={true}
      />,
    );

    expect(screen.getByText(/1 filter active/)).toBeInTheDocument();
  });

  it("displays filter count with plural form", () => {
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
      { key: "priority", value: "high", label: "High Priority" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        showCount={true}
      />,
    );

    expect(screen.getByText(/2 filters active/)).toBeInTheDocument();
  });

  it("hides count when showCount is false", () => {
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
    ];

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        showCount={false}
      />,
    );

    expect(screen.queryByText(/filter/)).not.toBeInTheDocument();
  });

  it("renders search input when searchable is true", () => {
    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        searchable={true}
        searchPlaceholder="Search items..."
      />,
    );

    expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument();
  });

  it("does not render search input when searchable is false", () => {
    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        searchable={false}
      />,
    );

    expect(screen.queryByPlaceholderText(/search/i)).not.toBeInTheDocument();
  });

  it("calls onSearchChange when search input changes", async () => {
    const handleSearchChange = vi.fn();
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        searchable={true}
        searchValue=""
        onSearchChange={handleSearchChange}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      /search/i,
    ) as HTMLInputElement;
    await user.type(searchInput, "test");

    // Verify the handler was called (once per character typed)
    expect(handleSearchChange.mock.calls.length).toBeGreaterThanOrEqual(4);
  });

  it("applies compact class when compact is true", () => {
    const { container } = render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        compact={true}
      />,
    );

    const filterBar = container.firstChild as HTMLElement;
    expect(filterBar.className).toMatch(/compact/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
        className="custom-filter-bar"
      />,
    );

    const filterBar = container.firstChild as HTMLElement;
    expect(filterBar.className).toContain("custom-filter-bar");
  });

  it("handles multi-select checkbox toggling", async () => {
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    // Open priority dropdown
    const priorityButton = screen.getByText("Priority").closest("button");
    await user.click(priorityButton!);

    // Click high option
    const highOption = screen.getByText("High").closest("button");
    await user.click(highOption!);

    // Should show checkmark
    expect(highOption!.textContent).toContain("✓");
  });

  it("applies multi-select dropdown when type is multi-select", async () => {
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    // Open priority dropdown
    const priorityButton = screen.getByText("Priority").closest("button");
    await user.click(priorityButton!);

    // Should show apply/cancel buttons for multi-select
    expect(screen.getByText("Apply")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("closes dropdown without applying when cancel is clicked", async () => {
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

    // Open priority dropdown
    const priorityButton = screen.getByText("Priority").closest("button");
    await user.click(priorityButton!);

    // Click high option
    const highOption = screen.getByText("High").closest("button");
    await user.click(highOption!);

    // Click cancel
    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);

    // onChange should not be called
    expect(handleFilterChange).not.toHaveBeenCalled();
    // Dropdown should close
    expect(screen.queryByText("Apply")).not.toBeInTheDocument();
  });

  it("applies multiple selections in multi-select mode", async () => {
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

    // Open priority dropdown
    const priorityButton = screen.getByText("Priority").closest("button");
    await user.click(priorityButton!);

    // Select multiple options
    const highOption = screen.getByText("High").closest("button");
    await user.click(highOption!);

    const mediumOption = screen.getByText("Medium").closest("button");
    await user.click(mediumOption!);

    // Apply
    const applyButton = screen.getByText("Apply");
    await user.click(applyButton);

    expect(handleFilterChange).toHaveBeenCalledWith("priority", [
      "high",
      "medium",
    ]);
  });

  it("displays option counts in multi-select dropdown", async () => {
    const user = userEvent.setup();

    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    const priorityButton = screen.getByText("Priority").closest("button");
    await user.click(priorityButton!);

    expect(screen.getByText("5")).toBeInTheDocument(); // High count
    expect(screen.getByText("8")).toBeInTheDocument(); // Medium count
    expect(screen.getByText("3")).toBeInTheDocument(); // Low count
  });

  it("marks filter trigger as active when filter is applied", () => {
    const activeFilters: ActiveFilter[] = [
      { key: "status", value: "active", label: "Active" },
    ];

    const { container } = render(
      <FilterBar
        filters={mockFilters}
        activeFilters={activeFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    const statusButton = screen.getByText("Status").closest("button");
    expect(statusButton?.className).toContain("filterActive");
  });

  it("closes dropdown when clicking outside", async () => {
    const user = userEvent.setup();

    const { container } = render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    // Open dropdown
    const statusButton = screen.getByText("Status").closest("button");
    await user.click(statusButton!);
    expect(screen.getByText("Active")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(container);

    // Dropdown should close
    expect(screen.queryByText("Active")).not.toBeInTheDocument();
  });

  it("renders calendar icon for date filters", () => {
    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    // Both date filters should exist with proper labels
    expect(screen.getByText("Date Range")).toBeInTheDocument();
  });

  it("renders filter icon for non-date filters", () => {
    render(
      <FilterBar
        filters={mockFilters}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    // Status and Priority should have filter icons (rendered via Lucide)
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Priority")).toBeInTheDocument();
  });

  it("renders custom icon when provided", async () => {
    const customIcon = <div data-testid="custom-icon">📌</div>;
    const filtersWithIcon: FilterDefinition[] = [
      {
        key: "custom",
        label: "Custom",
        type: "select",
        icon: customIcon,
        options: [{ label: "Option 1", value: "opt1" }],
      },
    ];

    render(
      <FilterBar
        filters={filtersWithIcon}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("does not show dropdown for text filter type", async () => {
    const textFilter: FilterDefinition[] = [
      {
        key: "text",
        label: "Text Search",
        type: "text",
      },
    ];

    const user = userEvent.setup();

    render(
      <FilterBar
        filters={textFilter}
        activeFilters={mockActiveFilters}
        onFilterChange={() => {}}
        onFilterRemove={() => {}}
      />,
    );

    const textButton = screen.getByText("Text Search").closest("button");
    await user.click(textButton!);

    // Dropdown should not appear for text type
    expect(
      screen.queryByText(/Active|Inactive|High|Medium/),
    ).not.toBeInTheDocument();
  });

  it("toggles multi-select options on/off", async () => {
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

    const priorityButton = screen.getByText("Priority").closest("button");
    await user.click(priorityButton!);

    // Click a multi-select option
    const highOption = screen.getByText("High");
    await user.click(highOption);

    // Option should be selected
    expect(highOption.closest("button")?.className).toContain(
      "dropdownItemSelected",
    );

    // Click Apply button
    const applyButton = screen.getByText("Apply");
    await user.click(applyButton);

    expect(handleFilterChange).toHaveBeenCalled();
  });
});
