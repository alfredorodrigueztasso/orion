import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotificationCenter } from "./NotificationCenter";
import type { NotificationItem } from "./NotificationCenter.types";

const meta: Meta<typeof NotificationCenter> = {
  title: "Sections/App/NotificationCenter",
  component: NotificationCenter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NotificationCenter>;

// Sample notifications
const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "info",
    title: "New comment on your post",
    message: 'John Doe commented on "Getting started with React"',
    timestamp: "2024-02-10T10:30:00Z",
    relativeTime: "2 min ago",
    read: false,
    href: "/posts/1#comments",
  },
  {
    id: "2",
    type: "success",
    title: "Deployment successful",
    message: "Your latest changes have been deployed to production.",
    timestamp: "2024-02-10T10:15:00Z",
    relativeTime: "15 min ago",
    read: false,
    category: "System",
  },
  {
    id: "3",
    type: "warning",
    title: "Storage almost full",
    message: "You have used 90% of your storage quota.",
    timestamp: "2024-02-10T09:00:00Z",
    relativeTime: "1 hour ago",
    read: false,
    category: "System",
  },
  {
    id: "4",
    type: "default",
    title: "Team invitation",
    message: "Sarah invited you to join the Design team.",
    timestamp: "2024-02-10T08:30:00Z",
    relativeTime: "2 hours ago",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=5",
    category: "Social",
  },
  {
    id: "5",
    type: "error",
    title: "Payment failed",
    message:
      "We could not process your payment. Please update your billing info.",
    timestamp: "2024-02-09T18:00:00Z",
    relativeTime: "Yesterday",
    read: true,
    category: "Billing",
  },
  {
    id: "6",
    type: "default",
    title: "New follower",
    message: "Mike started following you.",
    timestamp: "2024-02-09T15:00:00Z",
    relativeTime: "Yesterday",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=8",
    category: "Social",
  },
];

/**
 * Default NotificationCenter with sample notifications
 */
export const Default: Story = {
  args: {
    notifications: sampleNotifications,
    onMarkAsRead: (id: string) => console.log("Mark as read:", id),
    onMarkAllAsRead: () => console.log("Mark all as read"),
    onDismiss: (id: string) => console.log("Dismiss:", id),
    onViewAll: () => console.log("View all"),
  },
};

/**
 * Interactive NotificationCenter with state management
 */
export const Interactive: Story = {
  render: () => {
    const [notifications, setNotifications] =
      useState<NotificationItem[]>(sampleNotifications);

    const handleMarkAsRead = (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    };

    const handleMarkAllAsRead = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const handleDismiss = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const handleClearAll = () => {
      setNotifications([]);
    };

    return (
      <NotificationCenter
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDismiss={handleDismiss}
        onClearAll={handleClearAll}
        onViewAll={() => alert("View all notifications")}
      />
    );
  },
};

/**
 * Grouped by category
 */
export const GroupedByCategory: Story = {
  args: {
    notifications: sampleNotifications,
    groupByCategory: true,
    onMarkAsRead: (id: string) => console.log("Mark as read:", id),
    onMarkAllAsRead: () => console.log("Mark all as read"),
  },
};

/**
 * Empty state
 */
export const Empty: Story = {
  args: {
    notifications: [],
    emptyMessage: "You're all caught up!",
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  args: {
    notifications: [],
    loading: true,
  },
};

/**
 * Without unread badge
 */
export const WithoutBadge: Story = {
  args: {
    notifications: sampleNotifications,
    showUnreadCount: false,
    onMarkAsRead: (id: string) => console.log("Mark as read:", id),
  },
};

/**
 * Custom title
 */
export const CustomTitle: Story = {
  args: {
    notifications: sampleNotifications.slice(0, 3),
    title: "Activity",
    onMarkAsRead: (id: string) => console.log("Mark as read:", id),
    onViewAll: () => console.log("View all"),
  },
};

/**
 * With custom max height
 */
export const CustomMaxHeight: Story = {
  args: {
    notifications: sampleNotifications,
    maxHeight: "250px",
    onMarkAsRead: (id: string) => console.log("Mark as read:", id),
  },
};

/**
 * All read
 */
export const AllRead: Story = {
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: true })),
    onDismiss: (id: string) => console.log("Dismiss:", id),
    onClearAll: () => console.log("Clear all"),
    onViewAll: () => console.log("View all"),
  },
};
