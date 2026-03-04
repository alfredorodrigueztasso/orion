import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Edit, Trash2, Eye, Download, Plus, Filter, Inbox } from "lucide-react";
import { DataTable } from "./DataTable";
import type { DataTableSort, DataTablePagination } from "./DataTable.types";
import { Button } from "@orion-ds/react";
import { Badge, BadgeVariant } from "@orion-ds/react";

const meta: Meta<typeof DataTable> = {
  title: "Sections/App/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A data table for SaaS dashboards with sorting, pagination, filtering, and selection. Optimized for Product Mode with efficient data display.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    searchable: { control: "boolean" },
    selectable: { control: "boolean" },
    loading: { control: "boolean" },
    striped: { control: "boolean" },
    hoverable: { control: "boolean" },
    compact: { control: "boolean" },
    stickyHeader: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data
type UserData = {
  [key: string]: unknown;
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  lastActive: string;
};

const sampleUsers: UserData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "active",
    lastActive: "5 min ago",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "Viewer",
    status: "inactive",
    lastActive: "3 days ago",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "pending",
    lastActive: "1 hour ago",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "Admin",
    status: "active",
    lastActive: "10 min ago",
  },
  {
    id: 6,
    name: "Eva Martinez",
    email: "eva@example.com",
    role: "Viewer",
    status: "active",
    lastActive: "1 day ago",
  },
  {
    id: 7,
    name: "Frank Lee",
    email: "frank@example.com",
    role: "Editor",
    status: "inactive",
    lastActive: "1 week ago",
  },
  {
    id: 8,
    name: "Grace Kim",
    email: "grace@example.com",
    role: "Viewer",
    status: "active",
    lastActive: "3 hours ago",
  },
];

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "role", header: "Role", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (value: unknown) => {
      const status = value as UserData["status"];
      const variant: BadgeVariant =
        status === "active"
          ? "success"
          : status === "pending"
            ? "warning"
            : "secondary";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  { key: "lastActive", header: "Last Active", hideOnMobile: true },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
  },
};

export const WithSearch: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
    searchable: true,
    searchPlaceholder: "Search users...",
  },
};

export const Selectable: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
    selectable: true,
    bulkActions: [
      {
        key: "delete",
        label: "Delete",
        icon: <Trash2 size={14} />,
        variant: "danger",
        onClick: (ids) => console.log("Delete:", ids),
      },
      {
        key: "export",
        label: "Export",
        icon: <Download size={14} />,
        onClick: (ids) => console.log("Export:", ids),
      },
    ],
  },
};

export const WithPagination: Story = {
  render: (args) => {
    const [pagination, setPagination] = useState<DataTablePagination>({
      page: 1,
      pageSize: 3,
      total: sampleUsers.length,
    });

    const paginatedData = sampleUsers.slice(
      (pagination.page - 1) * pagination.pageSize,
      pagination.page * pagination.pageSize,
    );

    return (
      <DataTable
        {...args}
        data={paginatedData}
        pagination={pagination}
        onPaginationChange={(p) => setPagination({ ...pagination, ...p })}
      />
    );
  },
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
  },
};

export const WithSorting: Story = {
  render: (args) => {
    const [sort, setSort] = useState<DataTableSort | undefined>();

    const sortedData = [...sampleUsers].sort((a, b) => {
      if (!sort) return 0;
      const aVal = a[sort.key as keyof UserData];
      const bVal = b[sort.key as keyof UserData];
      const comparison = String(aVal).localeCompare(String(bVal));
      return sort.direction === "asc" ? comparison : -comparison;
    });

    return (
      <DataTable
        {...args}
        data={sortedData}
        sort={sort}
        onSortChange={setSort}
      />
    );
  },
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
  },
};

export const WithRowActions: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
    rowActions: [
      {
        key: "view",
        label: "View Details",
        icon: <Eye size={14} />,
        onClick: (row) => console.log("View:", row),
      },
      {
        key: "edit",
        label: "Edit",
        icon: <Edit size={14} />,
        onClick: (row) => console.log("Edit:", row),
      },
      {
        key: "delete",
        label: "Delete",
        icon: <Trash2 size={14} />,
        variant: "danger",
        onClick: (row) => console.log("Delete:", row),
      },
    ],
  },
};

export const Striped: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
    striped: true,
  },
};

export const Compact: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
    compact: true,
  },
};

export const Loading: Story = {
  args: {
    columns,
    data: [],
    rowKey: "id",
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    rowKey: "id",
    emptyState: {
      icon: <Inbox size={48} />,
      title: "No users found",
      description: "Get started by adding your first user.",
      action: <Button icon={<Plus size={18} />}>Add User</Button>,
    },
  },
};

export const WithToolbar: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
    searchable: true,
    toolbar: (
      <Button variant="secondary" icon={<Filter size={16} />} size="sm">
        Filters
      </Button>
    ),
  },
};

export const FullFeatured: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<DataTableSort | undefined>();
    const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
    const [pagination, setPagination] = useState<DataTablePagination>({
      page: 1,
      pageSize: 5,
      total: sampleUsers.length,
    });

    // Filter data
    let filteredData = sampleUsers;
    if (search) {
      const lowerSearch = search.toLowerCase();
      filteredData = filteredData.filter((user) =>
        Object.values(user).some((val) =>
          String(val).toLowerCase().includes(lowerSearch),
        ),
      );
    }

    // Sort data
    if (sort) {
      filteredData = [...filteredData].sort((a, b) => {
        const aVal = a[sort.key as keyof UserData];
        const bVal = b[sort.key as keyof UserData];
        const comparison = String(aVal).localeCompare(String(bVal));
        return sort.direction === "asc" ? comparison : -comparison;
      });
    }

    // Paginate data
    const paginatedData = filteredData.slice(
      (pagination.page - 1) * pagination.pageSize,
      pagination.page * pagination.pageSize,
    );

    return (
      <DataTable
        {...args}
        data={paginatedData}
        searchable
        searchValue={search}
        onSearchChange={setSearch}
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        sort={sort}
        onSortChange={setSort}
        pagination={{ ...pagination, total: filteredData.length }}
        onPaginationChange={(p) => setPagination({ ...pagination, ...p })}
        bulkActions={[
          {
            key: "delete",
            label: "Delete",
            icon: <Trash2 size={14} />,
            variant: "danger",
            onClick: (ids) => console.log("Delete:", ids),
          },
        ]}
        rowActions={[
          {
            key: "view",
            label: "View",
            icon: <Eye size={14} />,
            onClick: (row) => console.log("View:", row),
          },
          {
            key: "edit",
            label: "Edit",
            icon: <Edit size={14} />,
            onClick: (row) => console.log("Edit:", row),
          },
        ]}
      />
    );
  },
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
  },
};

export const StickyHeader: Story = {
  args: {
    columns,
    data: [...sampleUsers, ...sampleUsers, ...sampleUsers],
    rowKey: (row: Record<string, unknown>, index: number) =>
      `${row.id}-${index}`,
    stickyHeader: true,
    maxHeight: "400px",
  },
};

export const ClickableRows: Story = {
  args: {
    columns,
    data: sampleUsers,
    rowKey: "id",
    onRowClick: (row, index) =>
      console.log("Clicked row:", row, "at index:", index),
  },
};
