import type { Meta, StoryObj } from "@storybook/react";
import { LogoCloud } from "./LogoCloud";

const meta = {
  title: "Blocks/Sections/LogoCloud",
  component: LogoCloud,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

const logos = Array.from({ length: 6 }, (_, i) => ({
  logo: <img src={`https://via.placeholder.com/150x50?text=Company+${i + 1}`} alt="" />,
  name: `Company ${i + 1}`,
}));

export const Default: Story = { args: { title: "Trusted by", logos } };

export const NoTitle: Story = { args: { logos } };

export const Compact: Story = { args: { title: "Clients", logos: logos.slice(0, 3) } };

export const AllVariants: Story = {
  args: { title: "With Title", logos },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <LogoCloud {...args} />
      <LogoCloud {...args} title="Compact" logos={logos.slice(0, 4)} />
    </div>
  ),
};
