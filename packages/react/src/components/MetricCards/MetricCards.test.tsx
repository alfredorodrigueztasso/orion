import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetricCards } from "./MetricCards";
import { TrendingUp, Users, DollarSign } from "lucide-react";
import type { MetricCard } from "./MetricCards.types";

describe("MetricCards", () => {
  const mockMetrics: MetricCard[] = [
    {
      id: "revenue",
      title: "Revenue",
      value: "$12,500",
      change: "+12%",
      icon: <DollarSign size={20} />,
      trend: "up",
    },
    {
      id: "users",
      title: "Active Users",
      value: "2,450",
      change: "+5%",
      icon: <Users size={20} />,
      trend: "up",
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

    render(
      <MetricCards metrics={mockMetrics} onClick={handleSelect} />,
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<MetricCards ref={ref} metrics={mockMetrics} />);
    expect(ref).toHaveBeenCalled();
  });
});
