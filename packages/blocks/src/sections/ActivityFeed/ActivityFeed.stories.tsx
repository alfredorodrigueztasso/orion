/**
 * ActivityFeed Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ActivityFeed } from "./ActivityFeed";
import type { Activity, ActivityFilter } from "./ActivityFeed.types";

const meta: Meta<typeof ActivityFeed> = {
  title: "Sections/ActivityFeed",
  component: ActivityFeed,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const sampleActivities: Activity[] = [
  {
    id: "1",
    type: "comment",
    actor: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    title: 'commented on "Dashboard Redesign"',
    description: "This looks great! Can we add more spacing between the cards?",
    relativeTime: "2 minutes ago",
    iconVariant: "primary",
  },
  {
    id: "2",
    type: "update",
    actor: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    title: "updated the project status",
    relativeTime: "1 hour ago",
    metadata: {
      Status: "In Progress",
      Priority: "High",
    },
    iconVariant: "success",
  },
  {
    id: "3",
    type: "create",
    actor: {
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    title: 'created a new task "Update navigation"',
    relativeTime: "3 hours ago",
    iconVariant: "warning",
  },
  {
    id: "4",
    type: "complete",
    actor: {
      name: "Jordan Lee",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    title: 'completed "API Integration"',
    relativeTime: "5 hours ago",
    iconVariant: "success",
  },
  {
    id: "5",
    type: "upload",
    actor: {
      name: "Taylor Kim",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    title: "uploaded 3 design files",
    relativeTime: "1 day ago",
    metadata: {
      Files: "wireframe-v2.fig, mockup.sketch, icons.svg",
    },
  },
];

export const Basic: Story = {
  args: {
    activities: sampleActivities.slice(0, 3),
  },
};

export const WithFilters: Story = {
  render: () => {
    const [activeFilter, setActiveFilter] = useState("all");

    const filters: ActivityFilter[] = [
      { label: "All Activity", value: "all", count: 24 },
      { label: "Comments", value: "comment", count: 8 },
      { label: "Updates", value: "update", count: 12 },
      { label: "Completed", value: "complete", count: 4 },
    ];

    return (
      <div style={{ maxWidth: "600px" }}>
        <ActivityFeed
          activities={sampleActivities}
          showFilters
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    );
  },
};

export const CompactMode: Story = {
  args: {
    activities: sampleActivities,
    compact: true,
  },
};

export const WithLoadMore: Story = {
  render: () => {
    const [loadedCount, setLoadedCount] = useState(3);

    return (
      <div style={{ maxWidth: "600px" }}>
        <ActivityFeed
          activities={sampleActivities.slice(0, loadedCount)}
          hasMore={loadedCount < sampleActivities.length}
          onLoadMore={() =>
            setLoadedCount((prev) =>
              Math.min(prev + 2, sampleActivities.length),
            )
          }
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  args: {
    activities: sampleActivities.slice(0, 2),
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    activities: [],
    emptyMessage:
      "No recent activity. Start by creating a task or commenting on a project.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <div>
        <h3 style={{ marginTop: 0 }}>Primary</h3>
        <ActivityFeed
          activities={[
            {
              id: "1",
              type: "comment",
              actor: {
                name: "Sarah Chen",
                avatar: "https://i.pravatar.cc/150?img=1",
              },
              title: "commented on project",
              relativeTime: "2 minutes ago",
              iconVariant: "primary",
            },
          ]}
        />
      </div>
      <div>
        <h3>Success</h3>
        <ActivityFeed
          activities={[
            {
              id: "2",
              type: "completed",
              actor: {
                name: "Mike Johnson",
                avatar: "https://i.pravatar.cc/150?img=2",
              },
              title: "completed task",
              relativeTime: "1 hour ago",
              iconVariant: "success",
            },
          ]}
        />
      </div>
      <div>
        <h3>Warning</h3>
        <ActivityFeed
          activities={[
            {
              id: "3",
              type: "warning",
              actor: {
                name: "Alex Rivera",
                avatar: "https://i.pravatar.cc/150?img=3",
              },
              title: "flagged item for review",
              relativeTime: "3 hours ago",
              iconVariant: "warning",
            },
          ]}
        />
      </div>
      <div>
        <h3>Error</h3>
        <ActivityFeed
          activities={[
            {
              id: "4",
              type: "error",
              actor: {
                name: "Jordan Lee",
                avatar: "https://i.pravatar.cc/150?img=4",
              },
              title: "deployment failed",
              relativeTime: "5 hours ago",
              iconVariant: "error",
            },
          ]}
        />
      </div>
      <div>
        <h3>Info</h3>
        <ActivityFeed
          activities={[
            {
              id: "5",
              type: "info",
              actor: {
                name: "Taylor Kim",
                avatar: "https://i.pravatar.cc/150?img=5",
              },
              title: "shared file with team",
              relativeTime: "1 day ago",
              iconVariant: "info",
            },
          ]}
        />
      </div>
    </div>
  ),
};
