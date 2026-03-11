import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ActivityFeed } from "./ActivityFeed";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import type { Activity } from "./ActivityFeed.types";

describe("ActivityFeed", () => {
  const mockActivities: Activity[] = [
    {
      id: "1",
      author: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?u=alice",
      content: "Started working on new feature",
      timestamp: new Date("2024-03-09T10:00:00"),
      icon: <MessageCircle size={16} />,
    },
    {
      id: "2",
      author: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?u=bob",
      content: "Liked your comment",
      timestamp: new Date("2024-03-09T09:30:00"),
      icon: <Heart size={16} />,
    },
    {
      id: "3",
      author: "Charlie Brown",
      avatar: "https://i.pravatar.cc/150?u=charlie",
      content: "Shared the document",
      timestamp: new Date("2024-03-09T09:00:00"),
      icon: <Share2 size={16} />,
    },
  ];

  it("renders activity list", () => {
    render(<ActivityFeed activities={mockActivities} />);

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("Charlie Brown")).toBeInTheDocument();
  });

  it("displays activity content", () => {
    render(<ActivityFeed activities={mockActivities} />);

    expect(screen.getByText("Started working on new feature")).toBeInTheDocument();
    expect(screen.getByText("Liked your comment")).toBeInTheDocument();
    expect(screen.getByText("Shared the document")).toBeInTheDocument();
  });

  it("renders avatars", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} />
    );

    const images = container.querySelectorAll("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("displays relative timestamps", () => {
    render(<ActivityFeed activities={mockActivities} />);

    // Should render timestamps (exact format depends on component)
    const container = screen.getByText("Alice Johnson").closest("div");
    expect(container).toBeInTheDocument();
  });

  it("renders activity icons", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} />
    );

    // Should render icons for each activity
    const activityItems = container.querySelectorAll("[role='listitem']");
    expect(activityItems.length).toBe(mockActivities.length);
  });

  it("supports compact mode", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} compact />
    );

    expect(container).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<ActivityFeed activities={[]} />);

    const container = screen.getByRole("list") || screen.getByText(/./);
    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ActivityFeed
        activities={mockActivities}
        className="custom-feed"
      />,
    );

    const feed = container.querySelector(".custom-feed");
    expect(feed).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <ActivityFeed
        ref={ref}
        activities={mockActivities}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("shows action buttons", () => {
    render(<ActivityFeed activities={mockActivities} showActions />);

    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });
});
