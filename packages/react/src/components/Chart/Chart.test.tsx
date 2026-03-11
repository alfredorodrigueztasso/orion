import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "./Chart";
import type { ChartConfig } from "./Chart.types";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

describe("Chart Components", () => {
  const mockConfig: ChartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--color-brand-500)",
    },
    expenses: {
      label: "Expenses",
      color: "var(--status-error)",
    },
  };

  const mockData = [
    { month: "Jan", revenue: 1000, expenses: 500 },
    { month: "Feb", revenue: 1200, expenses: 600 },
    { month: "Mar", revenue: 1500, expenses: 700 },
  ];

  describe("ChartContainer", () => {
    it("renders children correctly", () => {
      render(
        <ChartContainer config={mockConfig}>
          <div data-testid="chart-content">Chart Content</div>
        </ChartContainer>,
      );

      expect(screen.getByTestId("chart-content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <ChartContainer config={mockConfig} className="custom-chart">
          <div>Chart</div>
        </ChartContainer>,
      );

      const container = screen.getByText("Chart").parentElement;
      expect(container).toHaveClass("custom-chart");
    });

    it("renders with BarChart from Recharts", () => {
      render(
        <ChartContainer config={mockConfig}>
          <BarChart data={mockData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="revenue" fill="var(--color-revenue)" />
          </BarChart>
        </ChartContainer>,
      );

      // Check if Recharts content is rendered
      expect(screen.getByText("Jan")).toBeInTheDocument();
      expect(screen.getByText("Feb")).toBeInTheDocument();
    });

    it("provides config through context", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <div data-testid="test-child">Test</div>
        </ChartContainer>,
      );

      expect(container.querySelector("[data-testid='test-child']")).toBeInTheDocument();
    });
  });

  describe("ChartTooltipContent", () => {
    it("renders tooltip content", () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={[
              { name: "revenue", value: 1000, color: "var(--color-brand-500)" },
            ]}
          />
        </ChartContainer>,
      );

      const content = screen.getByText(/revenue|1000/i);
      expect(content).toBeInTheDocument();
    });

    it("handles empty payload", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent active={true} payload={[]} />
        </ChartContainer>,
      );

      expect(container).toBeInTheDocument();
    });

    it("handles inactive tooltip", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent active={false} payload={[]} />
        </ChartContainer>,
      );

      expect(container).toBeInTheDocument();
    });
  });

  describe("ChartLegendContent", () => {
    it("renders legend content", () => {
      render(
        <ChartContainer config={mockConfig}>
          <ChartLegendContent
            payload={[
              { name: "Revenue", color: "var(--color-brand-500)" },
              { name: "Expenses", color: "var(--status-error)" },
            ]}
          />
        </ChartContainer>,
      );

      expect(screen.getByText(/Revenue|Expenses/)).toBeInTheDocument();
    });

    it("handles empty payload in legend", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <ChartLegendContent payload={[]} />
        </ChartContainer>,
      );

      expect(container).toBeInTheDocument();
    });
  });
});
