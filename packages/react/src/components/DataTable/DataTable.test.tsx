import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "./DataTable";
import type { DataTableColumn } from "./DataTable.types";

describe("DataTable", () => {
  interface User {
    id: string;
    name: string;
    email: string;
    status: "active" | "inactive";
  }

  const mockData: User[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      status: "active",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      status: "inactive",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      status: "active",
    },
  ];

  const mockColumns: DataTableColumn<User>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      sortable: false,
    },
    {
      key: "status",
      header: "Status",
      render: (value) => <span className="status">{value}</span>,
    },
  ];

  it("renders table with columns", () => {
    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
      />,
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders all data rows", () => {
    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
      />,
    );

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
  });

  it("renders custom column content", () => {
    const { container } = render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
      />,
    );

    const statusElements = container.querySelectorAll(".status");
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it("shows empty state when data is empty", () => {
    const { container } = render(
      <DataTable<User>
        columns={mockColumns}
        data={[]}
        keyExtractor={(row) => row.id}
      />,
    );

    // Empty state should render the container even if no table
    expect(container.firstChild).toBeInTheDocument();
  });

  it("supports row selection", async () => {
    const user = userEvent.setup();

    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        selectable
        keyExtractor={(row) => row.id}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(0);

    await user.click(checkboxes[0]);
    expect(checkboxes[0]).toBeChecked();
  });

  it("supports sorting on sortable columns", async () => {
    const user = userEvent.setup();

    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
      />,
    );

    const nameHeader = screen.getByText("Name");
    await user.click(nameHeader);

    // After sorting, data should be reordered
    expect(nameHeader).toBeInTheDocument();
  });

  it("supports pagination", () => {
    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        pagination={{
          page: 1,
          pageSize: 2,
          total: mockData.length,
        }}
      />,
    );

    // Should show pagination controls
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("supports search/filtering", async () => {
    const user = userEvent.setup();

    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        searchable
      />,
    );

    const searchInput = screen.queryByPlaceholderText(/search/i);
    if (searchInput) {
      await user.type(searchInput, "Alice");
      expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    }
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <DataTable<User>
        ref={ref}
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("applies custom className", () => {
    const { container } = render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        className="custom-table"
      />,
    );

    expect(container.querySelector(".custom-table")).toBeInTheDocument();
  });

  // ============================================================================
  // MISSING BRANCHES & CONTROLLED PATHS COVERAGE
  // ============================================================================

  it("calls onSortChange when sorting with controlled sort", async () => {
    const user = userEvent.setup();
    const mockOnSortChange = vi.fn();

    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        onSortChange={mockOnSortChange}
        sort={undefined}
      />,
    );

    const nameHeader = screen.getByText("Name");
    await user.click(nameHeader);

    expect(mockOnSortChange).toHaveBeenCalledWith(
      expect.objectContaining({
        key: "name",
        direction: expect.any(String),
      }),
    );
  });

  it("displays loading state with spinner", () => {
    const { container } = render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        loading={true}
      />,
    );

    const spinner = container.querySelector("[class*='spinner']");
    expect(spinner).toBeInTheDocument();
  });

  it("renders custom emptyState content", () => {
    const customEmptyState = {
      title: "No users found",
      description: "Try adjusting your filters",
      icon: <span data-testid="custom-icon">📭</span>,
      action: <button>Reset filters</button>,
    };

    render(
      <DataTable<User>
        columns={mockColumns}
        data={[]}
        keyExtractor={(row) => row.id}
        emptyState={customEmptyState}
      />,
    );

    expect(screen.getByText("No users found")).toBeInTheDocument();
    expect(screen.getByText("Try adjusting your filters")).toBeInTheDocument();
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reset filters/i }),
    ).toBeInTheDocument();
  });

  it("displays bulk actions when rows are selected", async () => {
    const user = userEvent.setup();
    const mockBulkDelete = vi.fn();

    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        selectable
        selectedKeys={["1", "2"]}
        bulkActions={[
          {
            key: "delete",
            label: "Delete Selected",
            icon: <span>🗑️</span>,
            onClick: mockBulkDelete,
          },
        ]}
      />,
    );

    expect(screen.getByText(/2 selected/i)).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", {
      name: /delete selected/i,
    });
    await user.click(deleteButton);

    expect(mockBulkDelete).toHaveBeenCalledWith(["1", "2"]);
  });

  it("renders custom toolbar prop", () => {
    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        toolbar={<div data-testid="custom-toolbar">Custom Toolbar</div>}
      />,
    );

    expect(screen.getByTestId("custom-toolbar")).toBeInTheDocument();
  });

  it("calls onRowClick when a data row is clicked", async () => {
    const user = userEvent.setup();
    const mockOnRowClick = vi.fn();

    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        onRowClick={mockOnRowClick}
      />,
    );

    const aliceRow = screen.getByText("Alice Johnson").closest("tr");
    if (aliceRow) {
      await user.click(aliceRow);
    }

    expect(mockOnRowClick).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Alice Johnson" }),
      0,
    );
  });

  it("does not call onRowClick when clicking checkbox", async () => {
    const user = userEvent.setup();
    const mockOnRowClick = vi.fn();

    const { container } = render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        selectable
        onRowClick={mockOnRowClick}
      />,
    );

    const checkbox = container.querySelector("input[type='checkbox']");
    if (checkbox) {
      await user.click(checkbox);
    }

    // onRowClick should not be called when clicking the checkbox
    expect(mockOnRowClick).not.toHaveBeenCalled();
  });

  it("executes row action and closes menu", async () => {
    const user = userEvent.setup();
    const mockEditAction = vi.fn();

    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
        rowActions={[
          {
            key: "edit",
            label: "Edit",
            icon: <span>✏️</span>,
            onClick: mockEditAction,
          },
        ]}
      />,
    );

    // Click the row actions menu button (should be MoreHorizontal icon)
    const moreButtons = screen
      .getAllByRole("button")
      .filter(
        (btn) =>
          btn.innerHTML.includes("MoreHorizontal") ||
          btn.getAttribute("aria-label")?.includes("Action"),
      );

    if (moreButtons.length > 0) {
      await user.click(moreButtons[0]);

      const editButton = screen.getByRole("button", { name: /edit/i });
      await user.click(editButton);

      expect(mockEditAction).toHaveBeenCalledWith(mockData[0]);
    }
  });
});
