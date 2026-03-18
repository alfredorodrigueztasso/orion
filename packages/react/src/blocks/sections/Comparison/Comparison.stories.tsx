import type { Meta, StoryObj } from "@storybook/react";
import { Comparison } from "./Comparison";

const meta = {
  title: "Sections/Marketing/Comparison",
  component: Comparison,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Comparison>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
  { title: "Free" },
  { title: "Pro", highlighted: true, badge: "Popular" },
  { title: "Enterprise" },
];

const twoColumns = [
  { title: "v3" },
  { title: "v4", highlighted: true },
];

const features = [
  { name: "Component Library", values: [true, true, true] },
  { name: "Design Tokens", values: [true, true, true] },
  { name: "Advanced Theming", values: [false, true, true] },
  { name: "Priority Support", values: [false, false, true] },
];

export const Default: Story = {
  args: { title: "Compare Plans", columns, features },
};

export const TwoColumn: Story = {
  args: { title: "Compare", columns: twoColumns, features: features.slice(0, 3) },
};

export const AllVariants: Story = {
  args: { title: "Three Plans", columns, features },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Comparison {...args} />
      <Comparison {...args} title="Two Plans" columns={twoColumns} features={features.slice(0, 2)} />
    </div>
  ),
};
