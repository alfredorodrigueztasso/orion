import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar, Tag, User } from "lucide-react";
import { FilterBar } from "./FilterBar";
import type { FilterDefinition, ActiveFilter } from "./FilterBar.types";

const meta: Meta<typeof FilterBar> = {
  title: "Sections/App/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal filter controls with chips for SaaS dashboards. Optimized for Product Mode with efficient filtering interactions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    searchable: { control: "boolean" },
    showCount: { control: "boolean" },
    compact: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

const statusFilter: FilterDefinition = {
  key: "status",
  label: "Status",
  type: "select",
  options: [
    { value: "active", label: "Active", count: 24 },
    { value: "pending", label: "Pending", count: 8 },
    { value: "inactive", label: "Inactive", count: 4 },
  ],
};

const roleFilter: FilterDefinition = {
  key: "role",
  label: "Role",
  type: "multi-select",
  icon: <User size={14} />,
  options: [
    { value: "admin", label: "Admin", count: 3 },
    { value: "editor", label: "Editor", count: 12 },
    { value: "viewer", label: "Viewer", count: 21 },
  ],
};

const dateFilter: FilterDefinition = {
  key: "date",
  label: "Date",
  type: "date",
  icon: <Calendar size={14} />,
};

const tagFilter: FilterDefinition = {
  key: "tags",
  label: "Tags",
  type: "multi-select",
  icon: <Tag size={14} />,
  options: [
    { value: "important", label: "Important" },
    { value: "urgent", label: "Urgent" },
    { value: "review", label: "Review" },
    { value: "archive", label: "Archive" },
  ],
};

const InteractiveFilterBar = (
  args: Partial<React.ComponentProps<typeof FilterBar>>,
) => {
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [search, setSearch] = useState("");

  const handleFilterChange = (
    key: string,
    value: string | string[] | { start: string; end: string } | null,
  ) => {
    if (value === null) {
      setActiveFilters((prev) => prev.filter((f) => f.key !== key));
    } else {
      const label = Array.isArray(value) ? value.join(", ") : String(value);
      setActiveFilters((prev) => {
        const existing = prev.findIndex((f) => f.key === key);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = { key, value, label };
          return updated;
        }
        return [...prev, { key, value, label }];
      });
    }
  };

  const handleFilterRemove = (key: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.key !== key));
  };

  return (
    <FilterBar
      filters={[statusFilter, roleFilter, tagFilter]}
      activeFilters={activeFilters}
      onFilterChange={handleFilterChange}
      onFilterRemove={handleFilterRemove}
      onClearAll={() => setActiveFilters([])}
      searchable={args.searchable}
      searchValue={search}
      onSearchChange={setSearch}
      {...args}
    />
  );
};

export const Default: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {},
};

export const WithSearch: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {
    searchable: true,
  },
};

export const WithActiveFilters: Story = {
  args: {
    filters: [statusFilter, roleFilter],
    activeFilters: [
      { key: "status", value: "active", label: "Active" },
      { key: "role", value: ["admin", "editor"], label: "Admin, Editor" },
    ],
    onFilterChange: () => {},
    onFilterRemove: () => {},
    onClearAll: () => {},
  },
};

export const Compact: Story = {
  render: (args) => <InteractiveFilterBar {...args} />,
  args: {
    compact: true,
  },
};

export const ManyFilters: Story = {
  args: {
    filters: [statusFilter, roleFilter, dateFilter, tagFilter],
    activeFilters: [],
    onFilterChange: () => {},
    onFilterRemove: () => {},
  },
};

export const NoCount: Story = {
  args: {
    filters: [statusFilter, roleFilter],
    activeFilters: [{ key: "status", value: "active", label: "Active" }],
    onFilterChange: () => {},
    onFilterRemove: () => {},
    showCount: false,
  },
};
