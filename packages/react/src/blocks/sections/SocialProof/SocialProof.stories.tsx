import type { Meta, StoryObj } from "@storybook/react";
import { SocialProof } from "./SocialProof";

const meta = {
  title: "Sections/Marketing/SocialProof",
  component: SocialProof,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof SocialProof>;

export default meta;
type Story = StoryObj<typeof meta>;

const logos = [
  { name: "Company 1", logo: "https://via.placeholder.com/150" },
  { name: "Company 2", logo: "https://via.placeholder.com/150" },
  { name: "Company 3", logo: "https://via.placeholder.com/150" },
];

const testimonials = [
  {
    id: 1,
    quote: "Great product!",
    author: "John Doe",
    title: "CEO",
    company: "Acme Corp",
  },
];

const stats = [
  { value: "10K+", label: "Users" },
  { value: "4.9/5", label: "Rating" },
  { value: "500+", label: "Companies" },
];

export const Default: Story = {
  args: {
    title: "Trusted Worldwide",
    logos,
    testimonials,
    stats,
  },
};

export const Compact: Story = {
  args: {
    title: "Proof",
    stats: stats.slice(0, 2),
    compact: true,
  },
};

export const AllVariants: Story = {
  args: {
    title: "Standard",
    logos,
    testimonials,
    stats,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <SocialProof {...args} />
      <SocialProof
        {...args}
        title="Compact"
        stats={stats.slice(0, 2)}
        compact={true}
      />
    </div>
  ),
};
