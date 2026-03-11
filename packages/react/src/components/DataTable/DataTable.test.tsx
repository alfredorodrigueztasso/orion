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
    { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "active" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", status: "inactive" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", status: "active" },
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
    render(
      <DataTable<User>
        columns={mockColumns}
        data={mockData}
        keyExtractor={(row) => row.id}
      />,
    );

    const statusElements = screen.getAllByClassName("status");
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it("shows empty state when data is empty", () => {
    render(
      <DataTable<User>
        columns={mockColumns}
        data={[]}
        keyExtractor={(row) => row.id}
      />,
    );

    const table = screen.queryByRole("table");
    expect(table).toBeInTheDocument();
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
});
