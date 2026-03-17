import type { Meta, StoryObj } from "@storybook/react";
import { Plus, Download, Settings, Filter } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Button } from "@orion-ds/react";
import { Badge } from "@orion-ds/react";

const meta: Meta<typeof PageHeader> = {
  title: "Sections/App/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A page header for SaaS dashboards with breadcrumbs, title, description, and actions. Optimized for Product Mode with minimal visual noise.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "compact", "with-tabs"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    bordered: { control: "boolean" },
    sticky: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Users",
    description: "Manage user accounts and permissions",
    breadcrumbs: [
      { label: "Dashboard", href: "#" },
      { label: "Settings", href: "#" },
      { label: "Users" },
    ],
    actions: (
      <>
        <Button variant="secondary" icon={<Download size={18} />}>
          Export
        </Button>
        <Button icon={<Plus size={18} />}>Add User</Button>
      </>
    ),
  },
};

export const WithTabs: Story = {
  args: {
    title: "Projects",
    description: "View and manage all your projects",
    variant: "with-tabs",
    tabs: [
      { id: "all", label: "All Projects", badge: "24" },
      { id: "active", label: "Active", badge: "12" },
      { id: "archived", label: "Archived", badge: "8" },
      { id: "drafts", label: "Drafts", badge: "4" },
    ],
    activeTab: "active",
    actions: <Button icon={<Plus size={18} />}>New Project</Button>,
  },
};

export const WithBadge: Story = {
  args: {
    title: "Notifications",
    badge: <Badge variant="info">3 new</Badge>,
    description: "View all your notifications",
    actions: (
      <Button variant="ghost" size="sm">
        Mark all as read
      </Button>
    ),
  },
};

export const WithBackLink: Story = {
  args: {
    backLink: { label: "Back to Dashboard", href: "#" },
    title: "User Details",
    description: "View and edit user information",
    actions: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Save Changes</Button>
      </>
    ),
  },
};

export const Compact: Story = {
  args: {
    title: "Quick Settings",
    variant: "compact",
    actions: (
      <Button
        size="sm"
        icon={<Settings size={16} />}
        iconOnly
        aria-label="Settings"
      />
    ),
  },
};

export const LargeTitleOnly: Story = {
  args: {
    title: "Dashboard Overview",
    size: "lg",
  },
};

export const FullFeatured: Story = {
  args: {
    breadcrumbs: [
      { label: "Home", href: "#" },
      { label: "Analytics", href: "#" },
      { label: "Reports" },
    ],
    title: "Monthly Reports",
    description:
      "View detailed analytics and insights for your business performance",
    badge: <Badge variant="success">Updated</Badge>,
    variant: "with-tabs",
    tabs: [
      { id: "overview", label: "Overview" },
      { id: "revenue", label: "Revenue" },
      { id: "users", label: "Users" },
      { id: "engagement", label: "Engagement" },
    ],
    activeTab: "overview",
    actions: (
      <>
        <Button variant="secondary" icon={<Filter size={18} />}>
          Filters
        </Button>
        <Button variant="secondary" icon={<Download size={18} />}>
          Export
        </Button>
      </>
    ),
  },
};

export const NoBorder: Story = {
  args: {
    title: "Inline Header",
    description: "A header without bottom border",
    bordered: false,
  },
};
