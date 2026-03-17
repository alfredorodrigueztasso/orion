import type { Meta, StoryObj } from "@storybook/react";
import { FAQ } from "./FAQ";

const meta = {
  title: "Blocks/Sections/FAQ",
  component: FAQ,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof FAQ>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: "1", question: "What is Orion?", answer: "An AI-first design system" },
  { id: "2", question: "How do I get started?", answer: "Install and wrap with ThemeProvider" },
  { id: "3", question: "Is it free?", answer: "Yes, Orion is open source" },
];

export const Default: Story = { args: { title: "FAQ", items } };

export const Compact: Story = { args: { title: "Quick FAQ", items: items.slice(0, 2) } };

export const AllVariants: Story = {
  args: { title: "Full FAQ", items },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <FAQ {...args} />
      <FAQ {...args} title="Compact" items={items.slice(0, 2)} />
    </div>
  ),
};
