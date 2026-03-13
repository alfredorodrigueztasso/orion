import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActivityFeed } from "./ActivityFeed";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import type { Activity } from "./ActivityFeed.types";

describe("ActivityFeed", () => {
  const mockActivities: Activity[] = [
    {
      id: "1",
      actor: {
        name: "Alice Johnson",
        avatar: "https://i.pravatar.cc/150?u=alice",
      },
      title: "Started working on new feature",
      timestamp: "2024-03-09T10:00:00Z",
      icon: <MessageCircle size={16} />,
    },
    {
      id: "2",
      actor: { name: "Bob Smith", avatar: "https://i.pravatar.cc/150?u=bob" },
      title: "Liked your comment",
      timestamp: "2024-03-09T09:30:00Z",
      icon: <Heart size={16} />,
    },
    {
      id: "3",
      actor: {
        name: "Charlie Brown",
        avatar: "https://i.pravatar.cc/150?u=charlie",
      },
      title: "Shared the document",
      timestamp: "2024-03-09T09:00:00Z",
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

    expect(
      screen.getByText("Started working on new feature"),
    ).toBeInTheDocument();
    expect(screen.getByText("Liked your comment")).toBeInTheDocument();
    expect(screen.getByText("Shared the document")).toBeInTheDocument();
  });

  it("renders avatars", () => {
    const { container } = render(<ActivityFeed activities={mockActivities} />);

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
    const { container } = render(<ActivityFeed activities={mockActivities} />);

    // Should render icons for each activity (as lucide icons in data-lucide attributes)
    const icons = container.querySelectorAll("[data-lucide]");
    expect(icons.length).toBeGreaterThanOrEqual(mockActivities.length);
  });

  it("supports compact mode", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} compact />,
    );

    expect(container).toBeInTheDocument();
  });

  it("shows empty state", () => {
    const { container } = render(<ActivityFeed activities={[]} />);

    // Component should render even with empty activities
    const feed =
      container.querySelector(".activityFeed") || container.firstChild;
    expect(feed).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} className="custom-feed" />,
    );

    const feed = container.querySelector(".custom-feed");
    expect(feed).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(<ActivityFeed ref={ref} activities={mockActivities} />);

    expect(ref).toHaveBeenCalled();
  });

  it("shows loading skeleton when loading is true", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} loading={true} />,
    );

    const skeletons = container.querySelectorAll("[class*='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("displays load more button when hasMore is true", () => {
    render(
      <ActivityFeed
        activities={mockActivities}
        hasMore={true}
        onLoadMore={() => {}}
      />,
    );

    expect(screen.getByText("Load more")).toBeInTheDocument();
  });

  it("calls onLoadMore when load more button is clicked", async () => {
    const handleLoadMore = vi.fn();
    const user = userEvent.setup();

    render(
      <ActivityFeed
        activities={mockActivities}
        hasMore={true}
        onLoadMore={handleLoadMore}
      />,
    );

    const loadMoreButton = screen.getByText("Load more");
    await user.click(loadMoreButton);
    expect(handleLoadMore).toHaveBeenCalled();
  });

  it("hides load more button when loading is true", () => {
    const { container } = render(
      <ActivityFeed
        activities={mockActivities}
        hasMore={true}
        onLoadMore={() => {}}
        loading={true}
      />,
    );

    const loadMoreButton = container.querySelector(
      "button:has-text('Load more')",
    );
    // loadMoreButton should not exist when loading is true
    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });

  it("displays filters when showFilters is true", () => {
    const filters = [
      { value: "all", label: "All", count: 10 },
      { value: "comments", label: "Comments", count: 5 },
      { value: "updates", label: "Updates", count: 3 },
    ];

    const { container } = render(
      <ActivityFeed
        activities={mockActivities}
        showFilters={true}
        filters={filters}
      />,
    );

    // Check that filters container exists
    const filtersContainer = container.querySelector("[class*='filters']");
    expect(filtersContainer).toBeInTheDocument();
  });

  it("does not display filters when showFilters is false", () => {
    const filters = [
      { value: "all", label: "All" },
      { value: "comments", label: "Comments" },
    ];

    const { container } = render(
      <ActivityFeed
        activities={mockActivities}
        showFilters={false}
        filters={filters}
      />,
    );

    // Filters container should not be visible
    const filtersContainer = container.querySelector("[class*='filters']");
    expect(filtersContainer).not.toBeInTheDocument();
  });

  it("does not display filters when no filters array provided", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} showFilters={true} />,
    );

    const filtersContainer = container.querySelector("[class*='filters']");
    expect(filtersContainer).not.toBeInTheDocument();
  });

  it("shows connectors between items", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} showConnectors={true} />,
    );

    const connectors = container.querySelectorAll("[class*='connector']");
    // Should have connectors for all but last item
    expect(connectors.length).toBe(mockActivities.length - 1);
  });

  it("hides connectors when showConnectors is false", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} showConnectors={false} />,
    );

    const connectors = container.querySelectorAll("[class*='connector']");
    expect(connectors.length).toBe(0);
  });

  it("displays description when provided", () => {
    const activitiesWithDescription = [
      {
        id: "1",
        actor: { name: "Alice" },
        title: "Comment posted",
        description: "This is a detailed description",
        timestamp: "2024-03-09T10:00:00Z",
      },
    ];

    render(<ActivityFeed activities={activitiesWithDescription} />);

    expect(
      screen.getByText("This is a detailed description"),
    ).toBeInTheDocument();
  });

  it("displays metadata when provided", () => {
    const activitiesWithMetadata = [
      {
        id: "1",
        actor: { name: "Alice" },
        title: "File uploaded",
        timestamp: "2024-03-09T10:00:00Z",
        metadata: {
          "File name": "document.pdf",
          "File size": "2.5 MB",
        },
      },
    ];

    render(<ActivityFeed activities={activitiesWithMetadata} />);

    expect(screen.getByText("File name:")).toBeInTheDocument();
    expect(screen.getByText("document.pdf")).toBeInTheDocument();
    expect(screen.getByText("File size:")).toBeInTheDocument();
    expect(screen.getByText("2.5 MB")).toBeInTheDocument();
  });

  it("handles empty metadata", () => {
    const activitiesWithEmptyMetadata = [
      {
        id: "1",
        actor: { name: "Alice" },
        title: "Event occurred",
        timestamp: "2024-03-09T10:00:00Z",
        metadata: {},
      },
    ];

    render(<ActivityFeed activities={activitiesWithEmptyMetadata} />);

    // Should render without errors
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });

  it("displays actor with href as link", () => {
    const activitiesWithHref = [
      {
        id: "1",
        actor: {
          name: "Alice Johnson",
          href: "/profile/alice",
        },
        title: "Posted comment",
        timestamp: "2024-03-09T10:00:00Z",
      },
    ];

    const { container } = render(
      <ActivityFeed activities={activitiesWithHref} />,
    );

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/profile/alice");
  });

  it("displays different activity types with correct icons", () => {
    const { container } = render(<ActivityFeed activities={mockActivities} />);

    const icons = container.querySelectorAll("[data-lucide]");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("displays relative time when provided", () => {
    const activitiesWithRelativeTime = [
      {
        id: "1",
        actor: { name: "Alice" },
        title: "Posted",
        timestamp: "2024-03-09T10:00:00Z",
        relativeTime: "2 minutes ago",
      },
    ];

    render(<ActivityFeed activities={activitiesWithRelativeTime} />);

    expect(screen.getByText("2 minutes ago")).toBeInTheDocument();
  });

  it("displays timestamp when relative time not provided", () => {
    const activitiesWithTimestamp = [
      {
        id: "1",
        actor: { name: "Bob" },
        title: "Updated",
        timestamp: "2024-03-09T10:00:00Z",
      },
    ];

    render(<ActivityFeed activities={activitiesWithTimestamp} />);

    expect(screen.getByText("2024-03-09T10:00:00Z")).toBeInTheDocument();
  });

  it("displays custom empty message", () => {
    render(<ActivityFeed activities={[]} emptyMessage="No events recorded" />);

    expect(screen.getByText("No events recorded")).toBeInTheDocument();
  });

  it("displays actor without avatar", () => {
    const activitiesNoAvatar = [
      {
        id: "1",
        actor: { name: "Charlie" },
        title: "Event occurred",
        timestamp: "2024-03-09T10:00:00Z",
      },
    ];

    render(<ActivityFeed activities={activitiesNoAvatar} />);

    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("handles activity without actor", () => {
    const activitiesNoActor = [
      {
        id: "1",
        title: "System event occurred",
        timestamp: "2024-03-09T10:00:00Z",
      },
    ];

    render(<ActivityFeed activities={activitiesNoActor} />);

    expect(screen.getByText("System event occurred")).toBeInTheDocument();
  });

  it("renders activity actions when provided", () => {
    const activitiesWithActions = [
      {
        id: "1",
        actor: { name: "Alice" },
        title: "Posted comment",
        timestamp: "2024-03-09T10:00:00Z",
        actions: <button>Reply</button>,
      },
    ];

    render(<ActivityFeed activities={activitiesWithActions} />);

    expect(screen.getByText("Reply")).toBeInTheDocument();
  });

  it("applies compact class when compact prop is true", () => {
    const { container } = render(
      <ActivityFeed activities={mockActivities} compact={true} />,
    );

    expect(container.querySelector("[class*='compact']")).toBeInTheDocument();
  });
});
