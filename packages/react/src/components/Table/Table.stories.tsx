import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./Table";
import { Avatar } from "../Avatar";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Card } from "../Card";
import type { TableColumn, SortDirection } from "./Table.types";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-19",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Editor",
    status: "pending",
    lastLogin: "2024-01-18",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-15",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-21",
  },
];

// Use any for Storybook compatibility with generic components
const basicColumns: TableColumn<any>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const meta = {
  title: "Components/Data Display/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Table size",
    },
    striped: {
      control: "boolean",
      description: "Striped rows",
    },
    hoverable: {
      control: "boolean",
      description: "Hoverable rows",
    },
    bordered: {
      control: "boolean",
      description: "Bordered table",
    },
    borderless: {
      control: "boolean",
      description: "Remove container border (for Card integration)",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
  },
};

export const Striped: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
    striped: true,
  },
};

export const Bordered: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
    bordered: true,
  },
};

export const Borderless: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
    borderless: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use `borderless` prop when placing Table inside a Card to avoid double borders.",
      },
    },
  },
};

export const SmallSize: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
    size: "lg",
  },
};

export const WithCaption: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
    caption: "List of system users",
  },
};

export const EmptyState: Story = {
  args: {
    columns: basicColumns,
    data: [],
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    columns: basicColumns,
    data: [],
    emptyMessage: "No users found. Try adjusting your filters.",
  },
};

export const WithSorting: Story = {
  args: { columns: basicColumns, data: mockUsers },
  render: () => {
    const sortableColumns: TableColumn<any>[] = [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "role", header: "Role", sortable: true },
      { key: "status", header: "Status" },
    ];

    return (
      <div style={{ maxWidth: "900px" }}>
        <Table
          columns={sortableColumns}
          data={mockUsers}
          onSortChange={(key, direction) => {
            console.log("Sort changed:", key, direction);
          }}
        />
      </div>
    );
  },
};

export const WithCustomCell: Story = {
  args: { columns: basicColumns, data: mockUsers },
  render: () => {
    const customColumns: TableColumn<any>[] = [
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      {
        key: "status",
        header: "Status",
        align: "center",
        cell: (user) => {
          const variantMap = {
            active: "success",
            inactive: "secondary",
            pending: "warning",
          } as const;
          return (
            <Badge variant={variantMap[user.status as keyof typeof variantMap]}>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
          );
        },
      },
      {
        key: "lastLogin",
        header: "Last Login",
        cell: (user) => new Date(user.lastLogin).toLocaleDateString(),
      },
    ];

    return (
      <div style={{ maxWidth: "900px" }}>
        <Table columns={customColumns} data={mockUsers} striped hoverable />
      </div>
    );
  },
};

export const ClickableRows: Story = {
  args: { columns: basicColumns, data: mockUsers },
  render: () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
      <div
        style={{
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <Table
          columns={basicColumns}
          data={mockUsers}
          onRowClick={(user) => setSelectedUser(user)}
          hoverable
        />
        {selectedUser && (
          <Card>
            <Card.Body>
              <strong>Selected User:</strong> {selectedUser.name} (
              {selectedUser.email})
            </Card.Body>
          </Card>
        )}
      </div>
    );
  },
};

export const ControlledSorting: Story = {
  args: { columns: basicColumns, data: mockUsers },
  render: () => {
    const [sortState, setSortState] = useState<{
      columnKey: string;
      direction: SortDirection;
    } | null>(null);

    const sortableColumns: TableColumn<any>[] = [
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      { key: "role", header: "Role", sortable: true },
      { key: "lastLogin", header: "Last Login", sortable: true },
    ];

    // Sort data based on current sort state
    const sortedData = [...mockUsers].sort((a, b) => {
      if (!sortState || !sortState.direction) return 0;

      const aValue = a[sortState.columnKey as keyof User];
      const bValue = b[sortState.columnKey as keyof User];

      if (aValue < bValue) return sortState.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortState.direction === "asc" ? 1 : -1;
      return 0;
    });

    return (
      <div
        style={{
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          {sortState ? (
            <>
              Sorted by: <strong>{sortState.columnKey}</strong> (
              {sortState.direction === "asc" ? "ascending" : "descending"})
            </>
          ) : (
            "Click column headers to sort"
          )}
        </p>
        <Table
          columns={sortableColumns}
          data={sortedData}
          sortState={sortState || undefined}
          onSortChange={(key, direction) => {
            setSortState(direction ? { columnKey: key, direction } : null);
          }}
          striped
        />
      </div>
    );
  },
};

export const UserManagement: Story = {
  args: { columns: basicColumns, data: mockUsers },
  render: () => {
    const userColumns: TableColumn<any>[] = [
      {
        key: "name",
        header: "User",
        sortable: true,
        cell: (user) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-3)",
            }}
          >
            <Avatar
              initials={user.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
              size="md"
            />
            <div>
              <div style={{ fontWeight: "var(--font-weight-medium)" }}>
                {user.name}
              </div>
              <div
                style={{
                  fontSize: "var(--font-size-12)",
                  color: "var(--text-secondary)",
                }}
              >
                {user.email}
              </div>
            </div>
          </div>
        ),
        width: "250px",
      },
      {
        key: "role",
        header: "Role",
        sortable: true,
        align: "center",
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        align: "center",
        cell: (user) => {
          const variantMap = {
            active: "success",
            inactive: "secondary",
            pending: "warning",
          } as const;
          const labelMap = {
            active: "Active",
            inactive: "Inactive",
            pending: "Pending",
          };
          return (
            <Badge variant={variantMap[user.status as keyof typeof variantMap]}>
              {labelMap[user.status as keyof typeof labelMap]}
            </Badge>
          );
        },
      },
      {
        key: "actions",
        header: "Actions",
        align: "right",
        cell: (user) => (
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-2)",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Edit", user.name);
              }}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                console.log("Delete", user.name);
              }}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ];

    return (
      <Card style={{ maxWidth: "1000px" }}>
        <Card.Header>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              User Management
            </h3>
            <p
              style={{
                margin: 0,
                marginTop: "var(--spacing-1)",
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              Manage system users and their permissions
            </p>
          </div>
        </Card.Header>
        <Table columns={userColumns} data={mockUsers} hoverable borderless />
      </Card>
    );
  },
};

export const ProductCatalog: Story = {
  args: { columns: basicColumns, data: mockUsers },
  render: () => {
    interface Product {
      id: number;
      name: string;
      category: string;
      price: number;
      stock: number;
      rating: number;
    }

    const products: Product[] = [
      {
        id: 1,
        name: "Wireless Headphones",
        category: "Audio",
        price: 99.99,
        stock: 45,
        rating: 4.5,
      },
      {
        id: 2,
        name: "Smart Watch",
        category: "Wearables",
        price: 299.99,
        stock: 23,
        rating: 4.8,
      },
      {
        id: 3,
        name: "Laptop Stand",
        category: "Accessories",
        price: 49.99,
        stock: 120,
        rating: 4.2,
      },
      {
        id: 4,
        name: "USB-C Cable",
        category: "Accessories",
        price: 19.99,
        stock: 200,
        rating: 4.7,
      },
      {
        id: 5,
        name: "Mechanical Keyboard",
        category: "Peripherals",
        price: 149.99,
        stock: 67,
        rating: 4.9,
      },
    ];

    const productColumns: TableColumn<Product>[] = [
      { key: "name", header: "Product", sortable: true },
      { key: "category", header: "Category", sortable: true, align: "center" },
      {
        key: "price",
        header: "Price",
        sortable: true,
        align: "right",
        cell: (product) => `$${product.price.toFixed(2)}`,
      },
      {
        key: "stock",
        header: "Stock",
        sortable: true,
        align: "center",
        cell: (product) => {
          const lowStock = product.stock < 50;
          return (
            <Badge variant={lowStock ? "error" : "success"}>
              {product.stock}
            </Badge>
          );
        },
      },
      {
        key: "rating",
        header: "Rating",
        sortable: true,
        align: "center",
        cell: (product) => `⭐ ${product.rating}`,
      },
    ];

    return (
      <div style={{ maxWidth: "900px" }}>
        <Table
          columns={productColumns}
          data={products}
          striped
          bordered
          hoverable
        />
      </div>
    );
  },
};

export const InsideCard: Story = {
  args: { columns: basicColumns, data: mockUsers },
  render: () => (
    <Card style={{ maxWidth: "900px" }}>
      <Card.Header>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "var(--font-size-18)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Users
          </h3>
          <p
            style={{
              margin: 0,
              marginTop: "var(--spacing-1)",
              fontSize: "var(--font-size-14)",
              color: "var(--text-secondary)",
            }}
          >
            A table inside a Card using borderless prop
          </p>
        </div>
      </Card.Header>
      <Table columns={basicColumns} data={mockUsers} hoverable borderless />
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "When placing a Table inside a Card, use the `borderless` prop to remove the double border effect.",
      },
    },
  },
};

export const WithCustomStyling: Story = {
  args: {
    columns: basicColumns,
    data: mockUsers,
    className: "custom-table",
  },
};
