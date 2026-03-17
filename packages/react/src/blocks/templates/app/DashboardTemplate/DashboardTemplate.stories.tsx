import type { Meta, StoryObj } from "@storybook/react";
import { DashboardTemplate } from "./DashboardTemplate";
import { BarChart3, TrendingUp, Users, Zap } from "lucide-react";

const meta = {
  title: "Templates/App/DashboardTemplate",
  component: DashboardTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockMetrics = [
  {
    id: "metric-1",
    label: "Total Revenue",
    value: "$45,231",
    change: 12,
    trend: "up" as const,
    icon: <TrendingUp size={20} />,
  },
  {
    id: "metric-2",
    label: "Active Users",
    value: "2,847",
    change: 8,
    trend: "up" as const,
    icon: <Users size={20} />,
  },
  {
    id: "metric-3",
    label: "Conversion Rate",
    value: "3.24%",
    change: 2,
    trend: "down" as const,
    icon: <BarChart3 size={20} />,
  },
  {
    id: "metric-4",
    label: "Performance",
    value: "98.5%",
    change: 1,
    trend: "neutral" as const,
    icon: <Zap size={20} />,
  },
];

const mockCharts = [
  {
    id: "chart-1",
    title: "Revenue Trend",
    type: "line" as const,
    data: [],
  },
  {
    id: "chart-2",
    title: "User Growth",
    type: "area" as const,
    data: [],
  },
];

const mockActivity = [
  {
    id: "activity-1",
    title: "New user registered",
    description: "John Doe joined the platform",
    timestamp: new Date(Date.now() - 300000),
    type: "success" as const,
  },
  {
    id: "activity-2",
    title: "Payment processed",
    description: "Order #12345 payment confirmed",
    timestamp: new Date(Date.now() - 1800000),
    type: "success" as const,
  },
  {
    id: "activity-3",
    title: "High latency detected",
    description: "API response time exceeds threshold",
    timestamp: new Date(Date.now() - 3600000),
    type: "warning" as const,
  },
  {
    id: "activity-4",
    title: "Database backup completed",
    description: "Daily backup finished successfully",
    timestamp: new Date(Date.now() - 7200000),
    type: "info" as const,
  },
];

export const Default: Story = {
  args: {
    title: "Analytics Dashboard",
    subtitle: "Welcome back! Here's your performance overview.",
    metrics: mockMetrics,
    charts: mockCharts,
    activity: mockActivity,
  },
};

export const MinimalMetrics: Story = {
  args: {
    title: "Dashboard",
    metrics: mockMetrics.slice(0, 2),
  },
};

export const OnlyActivity: Story = {
  args: {
    title: "Activity Feed",
    activity: mockActivity,
  },
};

export const Empty: Story = {
  args: {
    title: "Dashboard",
    subtitle: "No data available yet",
    metrics: [],
    charts: [],
    activity: [],
  },
};
