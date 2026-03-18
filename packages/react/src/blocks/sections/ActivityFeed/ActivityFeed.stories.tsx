import type { Meta, StoryObj } from "@storybook/react";
import { ActivityFeed } from "./ActivityFeed";

const meta = {
  title: "Sections/Marketing/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockActivities = [
  {
    id: "1",
    type: "comment",
    actor: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    title: "Commented on Design Review",
    description: "Great use of negative space here!",
    relativeTime: "2 hours ago",
    iconVariant: "info" as const,
  },
  {
    id: "2",
    type: "update",
    actor: {
      name: "Alex Jordan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    title: "Updated component library",
    description: "Added 12 new icons to the collection",
    relativeTime: "4 hours ago",
    iconVariant: "success" as const,
  },
  {
    id: "3",
    type: "review",
    actor: {
      name: "Jordan Liu",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
    title: "Requested review on PR #245",
    description: "Button refactor with improved accessibility",
    relativeTime: "1 day ago",
    iconVariant: "primary" as const,
  },
];

const mockFilters = [
  { label: "All", value: "all", count: 24 },
  { label: "Comments", value: "comment", count: 8 },
  { label: "Updates", value: "update", count: 12 },
  { label: "Reviews", value: "review", count: 4 },
];

export const Default: Story = {
  args: {
    activities: mockActivities,
    showFilters: true,
    filters: mockFilters,
    activeFilter: "all",
  },
};

export const Compact: Story = {
  args: {
    activities: mockActivities,
    compact: true,
    showFilters: true,
    filters: mockFilters,
    activeFilter: "all",
  },
};

export const WithLoadMore: Story = {
  args: {
    activities: mockActivities,
    showFilters: true,
    filters: mockFilters,
    hasMore: true,
    onLoadMore: () => console.log("Load more clicked"),
  },
};

export const Empty: Story = {
  args: {
    activities: [],
    showFilters: false,
    emptyMessage: "No activities yet. Check back soon!",
  },
};

export const AllVariants: Story = {
  args: {
    activities: mockActivities,
    showFilters: true,
    filters: mockFilters,
    activeFilter: "all",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <div>
        <h3 style={{ margin: "0 0 20px 0" }}>Standard Feed</h3>
        <ActivityFeed {...args} />
      </div>
      <div>
        <h3 style={{ margin: "0 0 20px 0" }}>Compact Feed</h3>
        <ActivityFeed {...args} compact={true} />
      </div>
      <div>
        <h3 style={{ margin: "0 0 20px 0" }}>Empty State</h3>
        <ActivityFeed activities={[]} emptyMessage="No activities found" />
      </div>
    </div>
  ),
};
