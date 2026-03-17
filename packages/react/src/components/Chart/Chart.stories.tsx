/**
 * Chart Component Stories
 *
 * Showcases Orion-themed Recharts wrappers with brand-aware chart palette
 * tokens (--chart-1 through --chart-5) and SVG gradient fills.
 */

import type { Meta, StoryObj } from "@storybook/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
  ChartGradient,
  ChartTooltip,
  ChartLegend,
} from "./Chart";
import type { ChartConfig } from "./Chart.types";

const meta: Meta<typeof ChartContainer> = {
  title: "Components/Data Display/Chart",
  component: ChartContainer,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Shared Data ────────────────────────────────────────────────────────────

const barData = [
  { month: "Jan", revenue: 4000, expenses: 2400 },
  { month: "Feb", revenue: 3000, expenses: 1398 },
  { month: "Mar", revenue: 2000, expenses: 9800 },
  { month: "Apr", revenue: 2780, expenses: 3908 },
  { month: "May", revenue: 1890, expenses: 4800 },
  { month: "Jun", revenue: 2390, expenses: 3800 },
];

const lineData = [
  { name: "Mon", users: 400, sessions: 240 },
  { name: "Tue", users: 300, sessions: 139 },
  { name: "Wed", users: 520, sessions: 380 },
  { name: "Thu", users: 278, sessions: 190 },
  { name: "Fri", users: 489, sessions: 280 },
  { name: "Sat", users: 239, sessions: 148 },
  { name: "Sun", users: 349, sessions: 200 },
];

// Dense dataset for realistic area chart (simulates ~3 months of daily traffic)
const areaData = [
  { date: "Apr 1", desktop: 222, mobile: 150 },
  { date: "Apr 4", desktop: 97, mobile: 180 },
  { date: "Apr 8", desktop: 167, mobile: 120 },
  { date: "Apr 11", desktop: 242, mobile: 260 },
  { date: "Apr 15", desktop: 373, mobile: 290 },
  { date: "Apr 18", desktop: 301, mobile: 340 },
  { date: "Apr 22", desktop: 245, mobile: 180 },
  { date: "Apr 25", desktop: 409, mobile: 320 },
  { date: "Apr 29", desktop: 59, mobile: 110 },
  { date: "May 2", desktop: 261, mobile: 190 },
  { date: "May 6", desktop: 327, mobile: 350 },
  { date: "May 9", desktop: 292, mobile: 210 },
  { date: "May 13", desktop: 342, mobile: 380 },
  { date: "May 16", desktop: 137, mobile: 220 },
  { date: "May 20", desktop: 120, mobile: 170 },
  { date: "May 23", desktop: 138, mobile: 190 },
  { date: "May 27", desktop: 446, mobile: 360 },
  { date: "May 30", desktop: 364, mobile: 410 },
  { date: "Jun 3", desktop: 243, mobile: 180 },
  { date: "Jun 6", desktop: 89, mobile: 150 },
  { date: "Jun 10", desktop: 137, mobile: 200 },
  { date: "Jun 13", desktop: 224, mobile: 170 },
  { date: "Jun 17", desktop: 138, mobile: 230 },
  { date: "Jun 20", desktop: 387, mobile: 290 },
  { date: "Jun 24", desktop: 215, mobile: 250 },
  { date: "Jun 27", desktop: 75, mobile: 130 },
  { date: "Jun 30", desktop: 383, mobile: 420 },
];

const pieData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 200 },
];

// ─── Shared Axis Props ──────────────────────────────────────────────────────

const xAxisProps = {
  tick: { fill: "var(--text-secondary)", fontSize: 12 },
  axisLine: false as const,
  tickLine: false,
};

const yAxisProps = {
  tick: { fill: "var(--text-secondary)", fontSize: 12 },
  axisLine: false as const,
  tickLine: false,
};

// ─── Stories ────────────────────────────────────────────────────────────────

/**
 * Bar chart with brand-aware `--chart-1`/`--chart-2` tokens,
 * rounded top corners, horizontal-only grid, and clean axis styling.
 */
export const BarChartExample: Story = {
  render: () => {
    const config: ChartConfig = {
      revenue: { label: "Revenue", color: "var(--chart-1)" },
      expenses: { label: "Expenses", color: "var(--chart-2)" },
    };

    return (
      <ChartContainer config={config} style={{ height: 350 }}>
        <BarChart data={barData}>
          <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
          <XAxis dataKey="month" {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            fill="var(--color-expenses)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    );
  },
};

/**
 * Line chart with smooth monotone curves, no dots by default,
 * and active dot ring on hover.
 */
export const LineChartExample: Story = {
  render: () => {
    const config: ChartConfig = {
      users: { label: "Users", color: "var(--chart-1)" },
      sessions: { label: "Sessions", color: "var(--chart-3)" },
    };

    return (
      <ChartContainer config={config} style={{ height: 350 }}>
        <LineChart data={lineData}>
          <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
          <XAxis dataKey="name" {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="users"
            stroke="var(--color-users)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2, stroke: "var(--surface-base)" }}
          />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="var(--color-sessions)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 2, stroke: "var(--surface-base)" }}
          />
        </LineChart>
      </ChartContainer>
    );
  },
};

/**
 * Stacked area chart matching shadcn/ui "Area Chart - Interactive" style.
 * Dense data, natural curves, SVG gradient fills via `ChartGradient`,
 * clear stroke lines on top, horizontal-only grid.
 */
export const AreaChartGradient: Story = {
  render: () => {
    const config: ChartConfig = {
      desktop: { label: "Desktop", color: "var(--chart-1)" },
      mobile: { label: "Mobile", color: "var(--chart-2)" },
    };

    return (
      <ChartContainer config={config} style={{ height: 400 }}>
        <AreaChart
          data={areaData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <ChartGradient
              id="fillDesktop"
              color="var(--color-desktop)"
              startOpacity={0.4}
              endOpacity={0.05}
            />
            <ChartGradient
              id="fillMobile"
              color="var(--color-mobile)"
              startOpacity={0.25}
              endOpacity={0.02}
            />
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
          <XAxis
            dataKey="date"
            {...xAxisProps}
            tickMargin={8}
            minTickGap={32}
          />
          <YAxis {...yAxisProps} />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="natural"
            dataKey="mobile"
            stroke="var(--color-mobile)"
            fill="url(#fillMobile)"
            fillOpacity={1}
            strokeWidth={2}
            stackId="a"
          />
          <Area
            type="natural"
            dataKey="desktop"
            stroke="var(--color-desktop)"
            fill="url(#fillDesktop)"
            fillOpacity={1}
            strokeWidth={2}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    );
  },
};

/**
 * Donut pie chart with `--chart-1..3` palette and a central summary label.
 */
export const PieChartExample: Story = {
  render: () => {
    const config: ChartConfig = {
      desktop: { label: "Desktop", color: "var(--chart-1)" },
      mobile: { label: "Mobile", color: "var(--chart-2)" },
      tablet: { label: "Tablet", color: "var(--chart-3)" },
    };

    const total = pieData.reduce((sum, d) => sum + d.value, 0);

    return (
      <ChartContainer config={config} style={{ height: 350 }}>
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            nameKey="name"
            strokeWidth={2}
            stroke="var(--surface-base)"
          >
            <Cell fill="var(--color-desktop)" />
            <Cell fill="var(--color-mobile)" />
            <Cell fill="var(--color-tablet)" />
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        style={{
                          fontSize: "var(--font-size-24)",
                          fontWeight: "var(--font-weight-bold)",
                          fill: "var(--text-primary)",
                        }}
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        style={{
                          fontSize: "var(--font-size-13)",
                          fill: "var(--text-secondary)",
                        }}
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ChartContainer>
    );
  },
};

/**
 * Single-series area chart with gradient fill — minimal and elegant.
 * Line + gradient style matching shadcn aesthetics.
 */
export const AreaGradientSingle: Story = {
  render: () => {
    const config: ChartConfig = {
      desktop: { label: "Visitors", color: "var(--chart-1)" },
    };

    const singleData = areaData.map((d) => ({
      date: d.date,
      desktop: d.desktop,
    }));

    return (
      <ChartContainer config={config} style={{ height: 350 }}>
        <AreaChart
          data={singleData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <ChartGradient id="fillSingle" color="var(--color-desktop)" />
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
          <XAxis
            dataKey="date"
            {...xAxisProps}
            tickMargin={8}
            minTickGap={32}
          />
          <YAxis {...yAxisProps} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="natural"
            dataKey="desktop"
            stroke="var(--color-desktop)"
            fill="url(#fillSingle)"
            fillOpacity={1}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: "var(--surface-base)" }}
          />
        </AreaChart>
      </ChartContainer>
    );
  },
};

/**
 * Custom value and label formatter demonstration with `--chart-*` palette.
 */
export const CustomTooltipFormatter: Story = {
  render: () => {
    const config: ChartConfig = {
      revenue: { label: "Revenue", color: "var(--chart-1)" },
      expenses: { label: "Expenses", color: "var(--chart-4)" },
    };

    return (
      <ChartContainer config={config} style={{ height: 350 }}>
        <BarChart data={barData}>
          <CartesianGrid vertical={false} stroke="var(--border-subtle)" />
          <XAxis dataKey="month" {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => `$${value.toLocaleString()}`}
                labelFormatter={(label) => `Month: ${label}`}
              />
            }
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            fill="var(--color-expenses)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    );
  },
};
