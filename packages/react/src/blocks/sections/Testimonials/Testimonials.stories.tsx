import type { Meta, StoryObj } from "@storybook/react";
import { Testimonials } from "./Testimonials";

const meta = {
  title: "Blocks/Sections/Testimonials",
  component: Testimonials,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    quote: "Orion transformed our workflow",
    author: {
      name: "Sarah",
      role: "Director",
      company: "Tech Corp",
      avatar: <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />,
    },
    rating: 5,
  },
  {
    quote: "Finally a design system that works",
    author: {
      name: "Alex",
      role: "Lead",
      company: "Digital",
      avatar: <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />,
    },
    rating: 5,
  },
  {
    quote: "Exactly what we needed",
    author: {
      name: "Jordan",
      role: "CTO",
      company: "Labs",
      avatar: <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" alt="Jordan" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />,
    },
    rating: 5,
  },
];

export const Default: Story = { args: { title: "Testimonials", description: "Loved worldwide", testimonials: items } };

export const TwoColumns: Story = { args: { title: "Reviews", testimonials: items.slice(0, 2), columns: 2 } };

export const Minimal: Story = { args: { title: "Feedback", testimonials: items, variant: "minimal" } };

export const AllVariants: Story = {
  args: {
    title: "3-Col",
    testimonials: items,
    columns: 3,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Testimonials {...args} />
      <Testimonials title="2-Col" testimonials={items.slice(0, 2)} columns={2} />
      <Testimonials title="Minimal" testimonials={items} variant="minimal" />
    </div>
  ),
};
