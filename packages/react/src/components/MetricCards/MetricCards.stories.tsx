import type { Meta, StoryObj } from "@storybook/react";
import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Activity,
  Eye,
} from "lucide-react";
import { MetricCards } from "./MetricCards";

const meta: Meta<typeof MetricCards> = {
  title: "Sections/App/MetricCards",
  component: MetricCards,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A row of KPI cards for dashboard overviews. Optimized for Product Mode with minimal visual noise and data density.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: [2, 3, 4, 5],
    },
    variant: {
      control: "select",
      options: ["default", "compact", "detailed"],
    },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCards>;

export const Default: Story = {
  args: {
    metrics: [
      {
        label: "Total Revenue",
        value: "$45,231.89",
        change: { value: "+20.1%", positive: true, label: "vs last month" },
        icon: <DollarSign size={20} />,
      },
      {
        label: "Active Users",
        value: "2,350",
        change: { value: "+12.5%", positive: true },
        icon: <Users size={20} />,
      },
      {
        label: "Sales",
        value: "12,234",
        change: { value: "-3.2%", positive: false },
        icon: <ShoppingCart size={20} />,
      },
      {
        label: "Growth Rate",
        value: "23.5%",
        change: { value: "+4.1%", positive: true },
        icon: <TrendingUp size={20} />,
      },
    ],
    columns: 4,
  },
};

export const ThreeColumns: Story = {
  args: {
    metrics: [
      {
        label: "Page Views",
        value: "1.2M",
        change: { value: "+15%", positive: true },
        icon: <Eye size={20} />,
      },
      {
        label: "Bounce Rate",
        value: "42.3%",
        change: { value: "-2.5%", positive: true },
        icon: <Activity size={20} />,
      },
      {
        label: "Avg. Session",
        value: "4m 23s",
        change: { value: "+8%", positive: true },
      },
    ],
    columns: 3,
  },
};

export const Compact: Story = {
  args: {
    variant: "compact",
    metrics: [
      {
        label: "Revenue",
        value: "$12.5K",
        change: { value: "+12%", positive: true },
      },
      {
        label: "Orders",
        value: "156",
        change: { value: "+8%", positive: true },
      },
      {
        label: "Customers",
        value: "89",
        change: { value: "-3%", positive: false },
      },
      {
        label: "Conversion",
        value: "3.2%",
        change: { value: "+0.5%", positive: true },
      },
    ],
    columns: 4,
  },
};

export const Detailed: Story = {
  args: {
    variant: "detailed",
    metrics: [
      {
        label: "Monthly Revenue",
        value: "$128,430",
        change: { value: "+23.1%", positive: true, label: "vs last month" },
        icon: <DollarSign size={24} />,
        sparkline: [12, 18, 15, 22, 28, 32, 38, 42, 45, 48, 52, 58],
        description: "Total revenue generated this month",
      },
      {
        label: "Active Subscribers",
        value: "8,942",
        change: { value: "+5.4%", positive: true },
        icon: <Users size={24} />,
        sparkline: [100, 120, 115, 130, 145, 160, 155, 170, 185, 190, 195, 200],
        description: "Users with active subscriptions",
      },
      {
        label: "Churn Rate",
        value: "2.4%",
        change: { value: "-0.8%", positive: true },
        sparkline: [5, 4.5, 4.2, 3.8, 3.5, 3.2, 3, 2.8, 2.6, 2.5, 2.4, 2.4],
        description: "Monthly customer churn rate",
      },
    ],
    columns: 3,
  },
};

export const WithLinks: Story = {
  args: {
    metrics: [
      {
        label: "Total Users",
        value: "24,521",
        change: { value: "+10%", positive: true },
        href: "#users",
      },
      {
        label: "Active Sessions",
        value: "1,234",
        change: { value: "+5%", positive: true },
        href: "#sessions",
      },
      {
        label: "Error Rate",
        value: "0.12%",
        change: { value: "-15%", positive: true },
        href: "#errors",
      },
    ],
    columns: 3,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    metrics: [
      { label: "Revenue", value: "" },
      { label: "Users", value: "" },
      { label: "Orders", value: "" },
      { label: "Growth", value: "" },
    ],
    columns: 4,
  },
};

export const FiveColumns: Story = {
  args: {
    metrics: [
      {
        label: "Views",
        value: "45.2K",
        change: { value: "+12%", positive: true },
      },
      {
        label: "Clicks",
        value: "2.1K",
        change: { value: "+8%", positive: true },
      },
      {
        label: "CTR",
        value: "4.6%",
        change: { value: "+0.3%", positive: true },
      },
      {
        label: "Conversions",
        value: "384",
        change: { value: "-2%", positive: false },
      },
      {
        label: "Revenue",
        value: "$9.8K",
        change: { value: "+15%", positive: true },
      },
    ],
    columns: 5,
  },
};

export const NoIcons: Story = {
  args: {
    metrics: [
      {
        label: "Total Sales",
        value: "$892,123",
        change: { value: "+18.2%", positive: true },
      },
      {
        label: "Avg. Order Value",
        value: "$156.32",
        change: { value: "+5.1%", positive: true },
      },
      {
        label: "Refund Rate",
        value: "1.8%",
        change: { value: "-0.3%", positive: true },
      },
    ],
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    metrics: [
      {
        label: "This Month",
        value: "$32,450",
        change: { value: "+22%", positive: true, label: "vs last month" },
        icon: <DollarSign size={20} />,
      },
      {
        label: "Last Month",
        value: "$26,598",
        change: { value: "+15%", positive: true, label: "vs previous" },
        icon: <DollarSign size={20} />,
      },
    ],
    columns: 2,
  },
};
