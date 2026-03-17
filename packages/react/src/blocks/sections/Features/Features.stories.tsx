import type { Meta, StoryObj } from "@storybook/react";
import { Zap, Package, Layers, Palette } from "lucide-react";
import { Features } from "./Features";

const meta = {
  title: "Blocks/Sections/Features",
  component: Features,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Features>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { icon: <Zap size={24} />, title: "Fast", description: "Lightning quick performance" },
  { icon: <Package size={24} />, title: "Complete", description: "90+ components" },
  { icon: <Layers size={24} />, title: "Tokens", description: "Design token system" },
  { icon: <Palette size={24} />, title: "Brands", description: "Multi-brand support" },
];

export const Default: Story = {
  args: { title: "Why Orion?", description: "A complete design system", items },
};

export const TwoColumns: Story = { args: { title: "Features", items: items.slice(0, 2), columns: 2 } };

export const ThreeColumns: Story = { args: { title: "Features", items: items.slice(0, 3), columns: 3 } };

export const AllVariants: Story = {
  args: { items, columns: 2 },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Features {...args} title="2 Cols" />
      <Features {...args} title="3 Cols" columns={3} />
      <Features {...args} title="4 Cols" columns={4} />
    </div>
  ),
};
