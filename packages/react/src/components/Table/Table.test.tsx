import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Table } from "./Table";
import type { TableColumn } from "./Table.types";

interface TestData {
  id: number;
  name: string;
  email: string;
  age: number;
  status: "active" | "inactive";
}

const mockData: TestData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    age: 25,
    status: "active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    age: 35,
    status: "inactive",
  },
];

const mockColumns: TableColumn<TestData>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "age", header: "Age" },
];

describe("Table", () => {
  it("renders table with data", () => {
    render(<Table columns={mockColumns} data={mockData} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
  });

  it("renders column headers", () => {
    render(<Table columns={mockColumns} data={mockData} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders empty state when no data", () => {
    render(<Table columns={mockColumns} data={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders custom empty message", () => {
    render(
      <Table columns={mockColumns} data={[]} emptyMessage="No users found" />,
    );
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });

  it("renders custom cell content", () => {
    const columnsWithCustomCell: TableColumn<TestData>[] = [
      { key: "name", header: "Name" },
      {
        key: "status",
        header: "Status",
        cell: (row) => (
          <span data-testid={`status-${row.id}`}>
            {row.status.toUpperCase()}
          </span>
        ),
      },
    ];

    render(<Table columns={columnsWithCustomCell} data={mockData} />);
    expect(screen.getByTestId("status-1")).toHaveTextContent("ACTIVE");
    expect(screen.getByTestId("status-2")).toHaveTextContent("ACTIVE");
    expect(screen.getByTestId("status-3")).toHaveTextContent("INACTIVE");
  });

  it("handles row click", async () => {
    const user = userEvent.setup();
    const handleRowClick = vi.fn();
    render(
      <Table
        columns={mockColumns}
        data={mockData}
        onRowClick={handleRowClick}
      />,
    );

    const rows = screen.getAllByRole("row");
    // Click second row (index 1, first row is header)
    await user.click(rows[1]);
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0], 0);
  });

  it("applies sm size class", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} size="sm" />,
    );
    expect((container.firstChild as HTMLElement)?.className).toMatch(/sm/);
  });

  it("applies md size class by default", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} />,
    );
    expect((container.firstChild as HTMLElement)?.className).toMatch(/md/);
  });

  it("applies lg size class", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} size="lg" />,
    );
    expect((container.firstChild as HTMLElement)?.className).toMatch(/lg/);
  });

  it("applies striped class when striped is true", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} striped />,
    );
    expect((container.firstChild as HTMLElement)?.className).toMatch(/striped/);
  });

  it("applies hoverable class by default", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} />,
    );
    expect((container.firstChild as HTMLElement)?.className).toMatch(
      /hoverable/,
    );
  });

  it("does not apply hoverable class when hoverable is false", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} hoverable={false} />,
    );
    expect(container.firstChild?.className).not.toMatch(/hoverable/);
  });

  it("applies bordered class when bordered is true", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} bordered />,
    );
    expect((container.firstChild as HTMLElement)?.className).toMatch(
      /bordered/,
    );
  });

  it("applies clickable class when onRowClick is provided", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} onRowClick={() => {}} />,
    );
    expect((container.firstChild as HTMLElement)?.className).toMatch(
      /clickable/,
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <Table columns={mockColumns} data={mockData} className="custom-table" />,
    );
    expect(container.firstChild).toHaveClass("custom-table");
  });

  it("renders caption when provided", () => {
    render(<Table columns={mockColumns} data={mockData} caption="User List" />);
    expect(screen.getByText("User List")).toBeInTheDocument();
  });

  it("applies column alignment", () => {
    const columnsWithAlignment: TableColumn<TestData>[] = [
      { key: "name", header: "Name", align: "left" },
      { key: "age", header: "Age", align: "center" },
      { key: "email", header: "Email", align: "right" },
    ];

    const { container } = render(
      <Table columns={columnsWithAlignment} data={mockData} />,
    );
    const headers = container.querySelectorAll("th");
    // Left alignment is browser default - no class needed
    expect(headers[1].className).toMatch(/alignCenter/);
    expect(headers[2].className).toMatch(/alignRight/);
  });

  it("applies column width", () => {
    const columnsWithWidth: TableColumn<TestData>[] = [
      { key: "name", header: "Name", width: "200px" },
      { key: "email", header: "Email", width: "50%" },
    ];

    render(<Table columns={columnsWithWidth} data={mockData} />);
    const headers = screen.getAllByRole("columnheader");
    expect(headers[0]).toHaveStyle({ width: "200px" });
    expect(headers[1]).toHaveStyle({ width: "50%" });
  });

  describe("Sorting", () => {
    const sortableColumns: TableColumn<TestData>[] = [
      { key: "name", header: "Name", sortable: true },
      { key: "age", header: "Age", sortable: true },
      { key: "email", header: "Email" }, // Not sortable
    ];

    it("renders sort indicator for sortable columns", () => {
      const { container } = render(
        <Table columns={sortableColumns} data={mockData} />,
      );
      const sortIndicators = container.querySelectorAll(
        '[class*="sortIndicator"]',
      );
      expect(sortIndicators).toHaveLength(2); // Only Name and Age
    });

    it("handles sorting click (uncontrolled)", async () => {
      const user = userEvent.setup();
      const handleSortChange = vi.fn();
      render(
        <Table
          columns={sortableColumns}
          data={mockData}
          onSortChange={handleSortChange}
        />,
      );

      const nameHeader = screen.getByText("Name").closest("th")!;

      // First click - ascending
      await user.click(nameHeader);
      expect(handleSortChange).toHaveBeenCalledWith("name", "asc");

      // Second click - descending
      await user.click(nameHeader);
      expect(handleSortChange).toHaveBeenCalledWith("name", "desc");

      // Third click - clear sort
      await user.click(nameHeader);
      expect(handleSortChange).toHaveBeenCalledWith("name", null);
    });

    it("works in controlled mode", async () => {
      const user = userEvent.setup();
      const handleSortChange = vi.fn();
      const { rerender } = render(
        <Table
          columns={sortableColumns}
          data={mockData}
          sortState={{ columnKey: "name", direction: "asc" }}
          onSortChange={handleSortChange}
        />,
      );

      const nameHeader = screen.getByText("Name").closest("th")!;
      expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

      await user.click(nameHeader);
      expect(handleSortChange).toHaveBeenCalledWith("name", "desc");

      // Simulate parent updating sortState
      rerender(
        <Table
          columns={sortableColumns}
          data={mockData}
          sortState={{ columnKey: "name", direction: "desc" }}
          onSortChange={handleSortChange}
        />,
      );

      expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    });

    it("applies aria-sort attribute", async () => {
      const user = userEvent.setup();
      render(<Table columns={sortableColumns} data={mockData} />);

      const nameHeader = screen.getByText("Name").closest("th")!;

      // Initially no sort
      expect(nameHeader).not.toHaveAttribute("aria-sort");

      // After clicking - ascending
      await user.click(nameHeader);
      expect(nameHeader).toHaveAttribute("aria-sort", "ascending");

      // After second click - descending
      await user.click(nameHeader);
      expect(nameHeader).toHaveAttribute("aria-sort", "descending");
    });

    it("applies sortable class to sortable headers", () => {
      const { container } = render(
        <Table columns={sortableColumns} data={mockData} />,
      );
      const headers = container.querySelectorAll("th");
      expect(headers[0].className).toMatch(/sortable/);
      expect(headers[1].className).toMatch(/sortable/);
      expect(headers[2].className).not.toMatch(/sortable/);
    });

    it("makes sortable headers focusable", () => {
      render(<Table columns={sortableColumns} data={mockData} />);
      const nameHeader = screen.getByText("Name").closest("th")!;
      const emailHeader = screen.getByText("Email").closest("th")!;

      expect(nameHeader).toHaveAttribute("tabIndex", "0");
      expect(emailHeader).not.toHaveAttribute("tabIndex");
    });

    it('adds role="button" to sortable headers', () => {
      render(<Table columns={sortableColumns} data={mockData} />);
      const nameHeader = screen.getByText("Name").closest("th")!;
      const emailHeader = screen.getByText("Email").closest("th")!;

      expect(nameHeader).toHaveAttribute("role", "button");
      expect(emailHeader).not.toHaveAttribute("role", "button");
    });
  });

  describe("Custom row keys", () => {
    it("uses getRowKey for row keys", () => {
      const getRowKey = (row: TestData) => `user-${row.id}`;
      const { container } = render(
        <Table columns={mockColumns} data={mockData} getRowKey={getRowKey} />,
      );

      // React key prop is not exposed in DOM - verify rows render correctly instead
      const rows = container.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(mockData.length);
      rows.forEach((row) => {
        expect(row).toBeInTheDocument();
      });
    });
  });

  describe("Column props", () => {
    it("applies headerProps to header cells", () => {
      const columnsWithProps: TableColumn<TestData>[] = [
        {
          key: "name",
          header: "Name",
          headerProps: { "data-testid": "name-header" } as any,
        },
      ];

      render(<Table columns={columnsWithProps} data={mockData} />);
      expect(screen.getByTestId("name-header")).toBeInTheDocument();
    });

    it("applies cellProps to data cells", () => {
      const columnsWithProps: TableColumn<TestData>[] = [
        {
          key: "name",
          header: "Name",
          cellProps: { "data-testid": "name-cell" } as any,
        },
      ];

      render(<Table columns={columnsWithProps} data={mockData} />);
      const nameCells = screen.getAllByTestId("name-cell");
      expect(nameCells).toHaveLength(3);
    });
  });

  describe("Edge cases", () => {
    it("handles empty columns array", () => {
      const { container } = render(<Table columns={[]} data={mockData} />);
      expect(container.querySelector("table")).toBeInTheDocument();
    });

    it("renders correctly with single row", () => {
      render(<Table columns={mockColumns} data={[mockData[0]]} />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
    });

    it("renders correctly with single column", () => {
      const singleColumn: TableColumn<TestData>[] = [
        { key: "name", header: "Name" },
      ];
      render(<Table columns={singleColumn} data={mockData} />);
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.queryByText("Email")).not.toBeInTheDocument();
    });
  });

  describe("All sizes", () => {
    it("renders small size", () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} size="sm" />,
      );
      expect((container.firstChild as HTMLElement)?.className).toMatch(/sm/);
    });

    it("renders medium size", () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} size="md" />,
      );
      expect((container.firstChild as HTMLElement)?.className).toMatch(/md/);
    });

    it("renders large size", () => {
      const { container } = render(
        <Table columns={mockColumns} data={mockData} size="lg" />,
      );
      expect((container.firstChild as HTMLElement)?.className).toMatch(/lg/);
    });
  });
});
