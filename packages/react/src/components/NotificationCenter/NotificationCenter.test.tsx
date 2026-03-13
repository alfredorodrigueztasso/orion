import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationCenter } from "./NotificationCenter";
import type { NotificationItem } from "./NotificationCenter.types";

describe("NotificationCenter", () => {
  const mockNotifications: NotificationItem[] = [
    {
      id: "1",
      title: "New message",
      message: "You have a new message from Alice",
      type: "info",
      timestamp: "2026-03-09T10:00:00Z",
      read: false,
    },
    {
      id: "2",
      title: "System update",
      message: "Updates available",
      type: "warning",
      timestamp: "2026-03-09T10:05:00Z",
      read: true,
    },
  ];

  it("renders notification list", () => {
    render(<NotificationCenter notifications={mockNotifications} />);

    expect(screen.getByText("New message")).toBeInTheDocument();
    expect(screen.getByText("System update")).toBeInTheDocument();
  });

  it("marks notification as read", async () => {
    const handleMarkAsRead = vi.fn();
    const user = userEvent.setup();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onMarkAsRead={handleMarkAsRead}
      />,
    );

    const readButtons = screen.getAllByTitle("Mark as read");
    if (readButtons.length > 0) {
      await user.click(readButtons[0]);
      expect(handleMarkAsRead).toHaveBeenCalled();
    }
  });

  it("deletes notification", async () => {
    const handleDismiss = vi.fn();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onDismiss={handleDismiss}
      />,
    );

    const dismissButtons = screen.getAllByTitle("Dismiss");
    if (dismissButtons.length > 0) {
      fireEvent.click(dismissButtons[0]);
      expect(handleDismiss).toHaveBeenCalled();
    }
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<NotificationCenter ref={ref} notifications={mockNotifications} />);

    expect(ref).toHaveBeenCalled();
  });

  it("shows empty state when no notifications", () => {
    render(<NotificationCenter notifications={[]} />);

    expect(screen.getByText("No notifications")).toBeInTheDocument();
  });

  it("displays custom empty message", () => {
    render(
      <NotificationCenter
        notifications={[]}
        emptyMessage="You're all caught up!"
      />,
    );

    expect(screen.getByText("You're all caught up!")).toBeInTheDocument();
  });

  it("shows loading spinner when loading is true", () => {
    const { container } = render(
      <NotificationCenter notifications={mockNotifications} loading={true} />,
    );

    const spinner = container.querySelector("div[class*='spinner']");
    expect(spinner).toBeTruthy();
  });

  it("displays unread count badge", () => {
    render(
      <NotificationCenter
        notifications={mockNotifications}
        showUnreadCount={true}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("hides unread count when showUnreadCount is false", () => {
    const { container } = render(
      <NotificationCenter
        notifications={mockNotifications}
        showUnreadCount={false}
      />,
    );

    // The badge should not contain unread count
    const badge = container.querySelector(".badge");
    expect(badge).not.toBeTruthy();
  });

  it("shows mark all as read button when unread notifications exist", () => {
    render(
      <NotificationCenter
        notifications={mockNotifications}
        onMarkAllAsRead={() => {}}
      />,
    );

    expect(screen.getByText("Mark all as read")).toBeInTheDocument();
  });

  it("calls onMarkAllAsRead when button is clicked", async () => {
    const handleMarkAllAsRead = vi.fn();
    const user = userEvent.setup();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onMarkAllAsRead={handleMarkAllAsRead}
      />,
    );

    const markAllButton = screen.getByText("Mark all as read");
    await user.click(markAllButton);

    expect(handleMarkAllAsRead).toHaveBeenCalled();
  });

  it("does not show mark all as read button when all read", () => {
    const allReadNotifications: NotificationItem[] = [
      {
        id: "1",
        title: "Message",
        message: "Read message",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        read: true,
      },
    ];

    render(
      <NotificationCenter
        notifications={allReadNotifications}
        onMarkAllAsRead={() => {}}
      />,
    );

    expect(screen.queryByText("Mark all as read")).not.toBeInTheDocument();
  });

  it("groups notifications by category when enabled", () => {
    const categorizedNotifications: NotificationItem[] = [
      {
        id: "1",
        title: "Message from Bob",
        message: "New message",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        category: "Messages",
      },
      {
        id: "2",
        title: "System update",
        message: "Updates available",
        type: "warning",
        timestamp: "2026-03-09T10:05:00Z",
        category: "System",
      },
    ];

    render(
      <NotificationCenter
        notifications={categorizedNotifications}
        groupByCategory={true}
      />,
    );

    expect(screen.getByText("Messages")).toBeInTheDocument();
    expect(screen.getByText("System")).toBeInTheDocument();
  });

  it("does not group notifications when groupByCategory is false", () => {
    const categorizedNotifications: NotificationItem[] = [
      {
        id: "1",
        title: "Message from Bob",
        message: "New message",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        category: "Messages",
      },
      {
        id: "2",
        title: "System update",
        message: "Updates available",
        type: "warning",
        timestamp: "2026-03-09T10:05:00Z",
        category: "System",
      },
    ];

    render(
      <NotificationCenter
        notifications={categorizedNotifications}
        groupByCategory={false}
      />,
    );

    expect(screen.queryByText("Messages")).not.toBeInTheDocument();
    expect(screen.queryByText("System")).not.toBeInTheDocument();
  });

  it("shows clear all button in footer", () => {
    render(
      <NotificationCenter
        notifications={mockNotifications}
        onClearAll={() => {}}
      />,
    );

    expect(screen.getByText("Clear all")).toBeInTheDocument();
  });

  it("calls onClearAll when clear all button is clicked", async () => {
    const handleClearAll = vi.fn();
    const user = userEvent.setup();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onClearAll={handleClearAll}
      />,
    );

    const clearButton = screen.getByText("Clear all");
    await user.click(clearButton);

    expect(handleClearAll).toHaveBeenCalled();
  });

  it("shows view all button in footer", () => {
    render(
      <NotificationCenter
        notifications={mockNotifications}
        onViewAll={() => {}}
      />,
    );

    expect(screen.getByText("View all notifications")).toBeInTheDocument();
  });

  it("calls onViewAll when view all button is clicked", async () => {
    const handleViewAll = vi.fn();
    const user = userEvent.setup();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onViewAll={handleViewAll}
      />,
    );

    const viewAllButton = screen.getByText("View all notifications");
    await user.click(viewAllButton);

    expect(handleViewAll).toHaveBeenCalled();
  });

  it("does not show footer when no actions and no notifications", () => {
    render(<NotificationCenter notifications={[]} />);

    expect(screen.queryByText("Clear all")).not.toBeInTheDocument();
    expect(
      screen.queryByText("View all notifications"),
    ).not.toBeInTheDocument();
  });

  it("displays relative time when provided", () => {
    const notificationsWithRelativeTime: NotificationItem[] = [
      {
        id: "1",
        title: "Message",
        message: "New message",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        relativeTime: "2 minutes ago",
      },
    ];

    render(
      <NotificationCenter notifications={notificationsWithRelativeTime} />,
    );

    expect(screen.getByText("2 minutes ago")).toBeInTheDocument();
  });

  it("displays timestamp when relative time not provided", () => {
    const notificationsWithTimestamp: NotificationItem[] = [
      {
        id: "1",
        title: "Message",
        message: "New message",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
      },
    ];

    render(<NotificationCenter notifications={notificationsWithTimestamp} />);

    expect(screen.getByText("2026-03-09T10:00:00Z")).toBeInTheDocument();
  });

  it("displays message when provided", () => {
    render(<NotificationCenter notifications={mockNotifications} />);

    expect(
      screen.getByText("You have a new message from Alice"),
    ).toBeInTheDocument();
  });

  it("handles notification without message", () => {
    const notificationsNoMessage: NotificationItem[] = [
      {
        id: "1",
        title: "Alert",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
      },
    ];

    render(<NotificationCenter notifications={notificationsNoMessage} />);

    expect(screen.getByText("Alert")).toBeInTheDocument();
  });

  it("renders notification as link when href is provided", () => {
    const notificationWithHref: NotificationItem[] = [
      {
        id: "1",
        title: "View report",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        href: "/reports/123",
      },
    ];

    const { container } = render(
      <NotificationCenter notifications={notificationWithHref} />,
    );

    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/reports/123");
  });

  it("handles notification click with onClick handler", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    const notificationWithClick: NotificationItem[] = [
      {
        id: "1",
        title: "Task updated",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        onClick: handleClick,
      },
    ];

    const { container } = render(
      <NotificationCenter notifications={notificationWithClick} />,
    );

    const notificationItem = container.querySelector("[role='button']");
    if (notificationItem) {
      await user.click(notificationItem);
      expect(handleClick).toHaveBeenCalled();
    }
  });

  it("displays avatar when provided", () => {
    const notificationWithAvatar: NotificationItem[] = [
      {
        id: "1",
        title: "Message from Alice",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        avatar: "https://example.com/alice.jpg",
      },
    ];

    const { container } = render(
      <NotificationCenter notifications={notificationWithAvatar} />,
    );

    const avatar = container.querySelector("img");
    expect(avatar?.getAttribute("src")).toBe("https://example.com/alice.jpg");
  });

  it("applies custom className", () => {
    const { container } = render(
      <NotificationCenter
        notifications={mockNotifications}
        className="custom-notification-center"
      />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("custom-notification-center");
  });

  it("respects maxHeight prop", () => {
    const { container } = render(
      <NotificationCenter
        notifications={mockNotifications}
        maxHeight="500px"
      />,
    );

    const content = container.querySelector(
      "div[class*='content']",
    ) as HTMLElement;
    expect(content?.style.maxHeight).toBe("500px");
  });

  it("displays custom title", () => {
    render(
      <NotificationCenter notifications={mockNotifications} title="Updates" />,
    );

    expect(screen.getByText("Updates")).toBeInTheDocument();
  });

  it("marks notification as read on click", async () => {
    const handleMarkAsRead = vi.fn();
    const unreadNotification: NotificationItem[] = [
      {
        id: "1",
        title: "New message",
        type: "info",
        timestamp: "2026-03-09T10:00:00Z",
        read: false,
        onClick: () => {},
      },
    ];

    const { container } = render(
      <NotificationCenter
        notifications={unreadNotification}
        onMarkAsRead={handleMarkAsRead}
      />,
    );

    const notificationItem = container.querySelector("[role='button']");
    fireEvent.click(notificationItem!);

    expect(handleMarkAsRead).toHaveBeenCalledWith("1");
  });
});
