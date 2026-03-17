import type { Meta, StoryObj } from "@storybook/react";
import { CheckCircle, UserPlus } from "lucide-react";
import { ActivityFeed } from "./ActivityFeed";
import { Button } from "@orion-ds/react";

const meta: Meta<typeof ActivityFeed> = {
  title: "Sections/App/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A timeline of events and activities for SaaS dashboards. Optimized for Product Mode with efficient information scanning.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showFilters: { control: "boolean" },
    showConnectors: { control: "boolean" },
    compact: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const sampleActivities = [
  {
    id: "1",
    type: "comment" as const,
    actor: { name: "John Doe", avatar: "https://i.pravatar.cc/40?u=john" },
    title: "commented on",
    description:
      "Great progress on the design! The new layout looks much cleaner.",
    timestamp: "2024-01-15T10:30:00Z",
    relativeTime: "2 hours ago",
  },
  {
    id: "2",
    type: "complete" as const,
    iconVariant: "success" as const,
    actor: { name: "Jane Smith", avatar: "https://i.pravatar.cc/40?u=jane" },
    title: 'completed task "Update documentation"',
    timestamp: "2024-01-15T09:15:00Z",
    relativeTime: "3 hours ago",
  },
  {
    id: "3",
    type: "assign" as const,
    iconVariant: "info" as const,
    actor: { name: "Bob Wilson" },
    title: 'assigned you to "Fix login bug"',
    timestamp: "2024-01-15T08:00:00Z",
    relativeTime: "4 hours ago",
  },
  {
    id: "4",
    type: "update" as const,
    actor: { name: "Alice Brown", avatar: "https://i.pravatar.cc/40?u=alice" },
    title: "updated the project settings",
    metadata: { Changed: "Theme color", From: "Blue", To: "Purple" },
    timestamp: "2024-01-15T07:30:00Z",
    relativeTime: "5 hours ago",
  },
  {
    id: "5",
    type: "upload" as const,
    actor: { name: "Charlie Davis" },
    title: 'uploaded 3 files to "Assets"',
    timestamp: "2024-01-14T16:00:00Z",
    relativeTime: "Yesterday",
  },
];

export const Default: Story = {
  args: {
    activities: sampleActivities,
  },
};

export const WithFilters: Story = {
  args: {
    activities: sampleActivities,
    showFilters: true,
    filters: [
      { value: "all", label: "All", count: 24 },
      { value: "comments", label: "Comments", count: 8 },
      { value: "updates", label: "Updates", count: 12 },
      { value: "tasks", label: "Tasks", count: 4 },
    ],
    activeFilter: "all",
    onFilterChange: (filter) => console.log("Filter:", filter),
  },
};

export const WithLoadMore: Story = {
  args: {
    activities: sampleActivities.slice(0, 3),
    hasMore: true,
    onLoadMore: () => console.log("Load more"),
  },
};

export const Compact: Story = {
  args: {
    activities: sampleActivities,
    compact: true,
  },
};

export const NoConnectors: Story = {
  args: {
    activities: sampleActivities,
    showConnectors: false,
  },
};

export const Loading: Story = {
  args: {
    activities: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    activities: [],
    emptyMessage: "No activity to show yet. Start by creating a project!",
  },
};

export const WithActions: Story = {
  args: {
    activities: [
      {
        id: "1",
        type: "comment" as const,
        actor: { name: "John Doe" },
        title: "commented on your post",
        description: "This looks amazing! Can we schedule a call to discuss?",
        timestamp: "2024-01-15T10:30:00Z",
        relativeTime: "2 hours ago",
        actions: (
          <>
            <Button size="sm" variant="secondary">
              Reply
            </Button>
            <Button size="sm" variant="ghost">
              Dismiss
            </Button>
          </>
        ),
      },
      ...sampleActivities.slice(1),
    ],
  },
};

export const CustomIcons: Story = {
  args: {
    activities: [
      {
        id: "1",
        icon: <CheckCircle size={16} />,
        iconVariant: "success" as const,
        actor: { name: "System" },
        title: "Deployment completed successfully",
        timestamp: "2024-01-15T10:30:00Z",
        relativeTime: "5 min ago",
      },
      {
        id: "2",
        icon: <UserPlus size={16} />,
        iconVariant: "brand" as const,
        actor: { name: "Admin" },
        title: "New team member invited",
        description:
          "sarah@example.com will receive an invitation email shortly.",
        timestamp: "2024-01-15T09:30:00Z",
        relativeTime: "1 hour ago",
      },
    ],
  },
};
