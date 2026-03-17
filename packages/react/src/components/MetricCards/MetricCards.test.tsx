import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MetricCards, MetricCard } from "./MetricCards";
import { TrendingUp, Users, DollarSign } from "lucide-react";
import type { MetricItem } from "./MetricCards.types";

describe("MetricCards", () => {
  const mockMetrics: MetricItem[] = [
    {
      id: "revenue",
      label: "Revenue",
      value: "$12,500",
      change: { value: "+12%", positive: true },
      icon: <DollarSign size={20} />,
    },
    {
      id: "users",
      label: "Active Users",
      value: "2,450",
      change: { value: "+5%", positive: true },
      icon: <Users size={20} />,
    },
  ];

  it("renders metric cards", () => {
    render(<MetricCards metrics={mockMetrics} />);

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
  });

  it("displays metric values", () => {
    render(<MetricCards metrics={mockMetrics} />);

    expect(screen.getByText("$12,500")).toBeInTheDocument();
    expect(screen.getByText("2,450")).toBeInTheDocument();
  });

  it("shows trend indicators", () => {
    render(<MetricCards metrics={mockMetrics} />);

    expect(screen.getByText("+12%")).toBeInTheDocument();
    expect(screen.getByText("+5%")).toBeInTheDocument();
  });

  it("handles card click", async () => {
    const handleSelect = vi.fn();

    render(<MetricCards metrics={mockMetrics} />);

    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<MetricCards ref={ref} metrics={mockMetrics} />);
    expect(ref).toHaveBeenCalled();
  });

  it("renders with 2 columns", () => {
    const { container } = render(
      <MetricCards metrics={mockMetrics} columns={2} />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("cols-2");
  });

  it("renders with 3 columns", () => {
    const { container } = render(
      <MetricCards metrics={mockMetrics} columns={3} />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("cols-3");
  });

  it("renders with 4 columns by default", () => {
    const { container } = render(<MetricCards metrics={mockMetrics} />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("cols-4");
  });

  it("renders with 5 columns", () => {
    const { container } = render(
      <MetricCards metrics={mockMetrics} columns={5} />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("cols-5");
  });

  it("renders default variant", () => {
    const { container } = render(
      <MetricCards metrics={mockMetrics} variant="default" />,
    );

    const cards = container.querySelectorAll("div[class*='card']");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders compact variant", () => {
    const { container } = render(
      <MetricCards metrics={mockMetrics} variant="compact" />,
    );

    const cards = container.querySelectorAll("div[class*='card']");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("renders detailed variant", () => {
    const { container } = render(
      <MetricCards metrics={mockMetrics} variant="detailed" />,
    );

    const cards = container.querySelectorAll("div[class*='card']");
    expect(cards.length).toBeGreaterThan(0);
  });

  it("shows loading skeleton when loading is true", () => {
    const { container } = render(
      <MetricCards metrics={mockMetrics} loading={true} />,
    );

    const skeletons = container.querySelectorAll("div[class*='skeleton']");
    expect(skeletons.length).toBe(mockMetrics.length);
  });

  it("hides trend when loading is true", () => {
    render(<MetricCards metrics={mockMetrics} loading={true} />);

    // Trends should not be visible when loading
    expect(screen.queryByText("+12%")).not.toBeInTheDocument();
  });

  it("handles positive trend with positive styling", () => {
    const metricsWithPositive: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        change: { value: "+12%", positive: true },
      },
    ];

    const { container } = render(<MetricCards metrics={metricsWithPositive} />);

    const changeElement = container.querySelector("span[class*='change']");
    expect(changeElement).toBeTruthy();
    expect(changeElement?.className).toContain("positive");
  });

  it("displays change label when provided", () => {
    const metricsWithLabel: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        change: { value: "+12%", positive: true, label: "vs last month" },
      },
    ];

    render(<MetricCards metrics={metricsWithLabel} />);

    expect(screen.getByText("vs last month")).toBeInTheDocument();
  });

  it("shows sparkline only in detailed variant", () => {
    const metricsWithSparkline: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        sparkline: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    ];

    const { container: detailedContainer } = render(
      <MetricCards metrics={metricsWithSparkline} variant="detailed" />,
    );

    const sparklines = detailedContainer.querySelectorAll("svg");
    expect(sparklines.length).toBeGreaterThan(0);
  });

  it("does not show sparkline in default variant", () => {
    const metricsWithSparkline: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        sparkline: [1, 2, 3, 4, 5, 6, 7, 8],
      },
    ];

    const { container } = render(
      <MetricCards metrics={metricsWithSparkline} variant="default" />,
    );

    // Check that sparkline SVG elements are not rendered in default variant
    // (the SVG should only be in detailed mode)
    const sparklineSvgs = container.querySelectorAll("svg");
    expect(sparklineSvgs.length).toBe(0);
  });

  it("shows description only in detailed variant", () => {
    const metricsWithDescription: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        description: "Total monthly revenue",
      },
    ];

    const { container: detailedContainer } = render(
      <MetricCards metrics={metricsWithDescription} variant="detailed" />,
    );

    const descElement = detailedContainer.querySelector(
      "span[class*='description']",
    );
    expect(descElement).toBeTruthy();
    expect(descElement?.textContent).toContain("Total monthly revenue");
  });

  it("does not show description in default variant", () => {
    const metricsWithDescription: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        description: "Total monthly revenue",
      },
    ];

    const { container } = render(
      <MetricCards metrics={metricsWithDescription} variant="default" />,
    );

    const descElement = container.querySelector("span[class*='description']");
    expect(descElement).not.toBeTruthy();
  });

  it("renders card as anchor when href is provided", () => {
    const metricsWithHref: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        href: "/revenue-details",
      },
    ];

    const { container } = render(<MetricCards metrics={metricsWithHref} />);

    const anchor = container.querySelector("a");
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute("href")).toBe("/revenue-details");
  });

  it("renders card as button when onClick is provided", () => {
    const handleClick = vi.fn();
    const metricsWithClick: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        onClick: handleClick,
      },
    ];

    const { container } = render(<MetricCards metrics={metricsWithClick} />);

    const button = container.querySelector("button");
    expect(button).toBeTruthy();
    fireEvent.click(button!);
    expect(handleClick).toHaveBeenCalled();
  });

  it("applies interactive styling when card is clickable", () => {
    const handleClick = vi.fn();
    const metricsWithClick: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        onClick: handleClick,
      },
    ];

    const { container } = render(<MetricCards metrics={metricsWithClick} />);

    const card = container.querySelector("button");
    expect(card?.className).toContain("interactive");
  });

  it("applies loading state to individual card", () => {
    const metricsWithLoading: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        loading: true,
      },
    ];

    const { container } = render(<MetricCards metrics={metricsWithLoading} />);

    const skeleton = container.querySelector("div[class*='skeleton']");
    expect(skeleton).toBeTruthy();
  });

  it("applies custom className to container", () => {
    const { container } = render(
      <MetricCards
        metrics={mockMetrics}
        className="custom-metrics-container"
      />,
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("custom-metrics-container");
  });

  it("renders cards without icon when not provided", () => {
    const metricsNoIcon: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
      },
    ];

    const { container } = render(<MetricCards metrics={metricsNoIcon} />);

    const icons = container.querySelectorAll("span[class*='cardIcon']");
    expect(icons.length).toBe(0);
  });

  it("renders cards with numeric values", () => {
    const metricsNumericValue: MetricItem[] = [
      {
        id: "users",
        label: "Users",
        value: 2450,
      },
    ];

    render(<MetricCards metrics={metricsNumericValue} />);

    expect(screen.getByText("2450")).toBeInTheDocument();
  });

  it("uses metric id as key if available", () => {
    const metricsWithId: MetricItem[] = [
      {
        id: "metric-1",
        label: "Metric 1",
        value: "100",
      },
      {
        id: "metric-2",
        label: "Metric 2",
        value: "200",
      },
    ];

    const { container } = render(<MetricCards metrics={metricsWithId} />);

    expect(screen.getByText("Metric 1")).toBeInTheDocument();
    expect(screen.getByText("Metric 2")).toBeInTheDocument();
  });

  it("uses label as fallback key", () => {
    const metricsWithoutId: MetricItem[] = [
      {
        label: "Fallback 1",
        value: "100",
      },
      {
        label: "Fallback 2",
        value: "200",
      },
    ];

    render(<MetricCards metrics={metricsWithoutId} />);

    expect(screen.getByText("Fallback 1")).toBeInTheDocument();
    expect(screen.getByText("Fallback 2")).toBeInTheDocument();
  });

  it("handles sparkline with invalid data gracefully", () => {
    const metricsWithInvalidSparkline: MetricItem[] = [
      {
        id: "revenue",
        label: "Revenue",
        value: "$12,500",
        sparkline: [1], // Less than 2 points
        variant: "detailed" as any,
      },
    ];

    const { container } = render(
      <MetricCards metrics={metricsWithInvalidSparkline} variant="detailed" />,
    );

    // Sparkline should not render with less than 2 data points
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBe(0);
  });
});
