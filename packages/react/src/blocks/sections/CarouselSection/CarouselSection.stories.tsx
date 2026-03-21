import type { Meta, StoryObj } from "@storybook/react";
import { CarouselSection } from "./CarouselSection";

const meta = {
  title: "Sections/Marketing/CarouselSection",
  component: CarouselSection,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof CarouselSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    id: "1",
    title: "Item 1",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Item 2",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Item 3",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  },
];

export const Default: Story = {
  args: { items, autoScroll: true, autoScrollInterval: 5000 },
};

export const Manual: Story = { args: { items, autoScroll: false } };

export const AllVariants: Story = {
  args: { items, autoScroll: true },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <CarouselSection {...args} />
      <CarouselSection {...args} autoScroll={false} />
    </div>
  ),
};
