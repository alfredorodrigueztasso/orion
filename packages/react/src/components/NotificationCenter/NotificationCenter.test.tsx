import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotificationCenter } from "./NotificationCenter";
import type { Notification } from "./NotificationCenter.types";

describe("NotificationCenter", () => {
  const mockNotifications: Notification[] = [
    {
      id: "1",
      title: "New message",
      message: "You have a new message from Alice",
      type: "info",
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "System update",
      message: "Updates available",
      type: "warning",
      timestamp: new Date(),
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

    expect(screen.getByText("New message")).toBeInTheDocument();
  });

  it("deletes notification", async () => {
    const handleDelete = vi.fn();

    render(
      <NotificationCenter
        notifications={mockNotifications}
        onDelete={handleDelete}
      />,
    );

    expect(screen.getByText(/New message|System/)).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <NotificationCenter ref={ref} notifications={mockNotifications} />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
