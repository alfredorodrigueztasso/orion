import type { Meta, StoryObj } from "@storybook/react";
import { Zap, Users, Target } from "lucide-react";
import { Stats } from "./Stats";

const meta = {
  title: "Sections/Marketing/Stats",
  component: Stats,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Stats>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { value: "99.9%", label: "Uptime", icon: <Zap size={24} />, trend: { value: "+0.2%", positive: true } },
  { value: "50K+", label: "Users", icon: <Users size={24} />, trend: { value: "+12%", positive: true } },
  { value: "4.8/5", label: "Rating", icon: <Target size={24} />, trend: { value: "+0.3", positive: true } },
];

export const Default: Story = { args: { title: "By the Numbers", stats: items } };

export const TwoColumns: Story = { args: { title: "Metrics", stats: items.slice(0, 2), columns: 2 } };

export const Cards: Story = { args: { title: "Stats", stats: items, variant: "cards" } };

export const AllVariants: Story = {
  args: {
    title: "Default",
    stats: items,
    columns: 3,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Stats {...args} />
      <Stats title="Cards" stats={items} variant="cards" />
      <Stats title="Inline" stats={items} variant="inline" />
    </div>
  ),
};
