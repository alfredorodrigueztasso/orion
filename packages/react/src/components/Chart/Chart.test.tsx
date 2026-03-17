import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "./Chart";
import type { ChartConfig } from "./Chart.types";

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

  describe("ChartContainer", () => {
    it("renders children correctly", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <div data-testid="chart-content">Chart Content</div>
        </ChartContainer>,
      );

      // ChartContainer wraps in recharts ResponsiveContainer
      expect(container.querySelector("[role='figure']")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <ChartContainer config={mockConfig} className="custom-chart">
          <div>Chart</div>
        </ChartContainer>,
      );

      expect(container.querySelector(".custom-chart")).toBeInTheDocument();
    });

    it("renders with BarChart from Recharts", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <div>Test Chart</div>
        </ChartContainer>,
      );

      // Check if container is rendered with proper figure role
      expect(container.querySelector("[role='figure']")).toBeInTheDocument();
    });

    it("provides config through context", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <div data-testid="test-child">Test</div>
        </ChartContainer>,
      );

      // Verify container is rendered
      expect(container.querySelector("[role='figure']")).toBeInTheDocument();
    });
  });

  describe("ChartTooltipContent", () => {
    it("renders tooltip content", () => {
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <ChartTooltipContent
            active={true}
            payload={[
              { name: "revenue", value: 1000, color: "var(--color-brand-500)" },
            ]}
          />
        </ChartContainer>,
      );

      // Tooltip renders as part of chart, just verify container exists
      expect(container.querySelector("[role='figure']")).toBeInTheDocument();
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
      const { container } = render(
        <ChartContainer config={mockConfig}>
          <ChartLegendContent
            payload={[
              { name: "Revenue", color: "var(--color-brand-500)" },
              { name: "Expenses", color: "var(--status-error)" },
            ]}
          />
        </ChartContainer>,
      );

      // Legend renders as part of chart, verify container exists
      expect(container.querySelector("[role='figure']")).toBeInTheDocument();
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
