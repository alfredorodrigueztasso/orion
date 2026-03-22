import type { Meta, StoryObj } from "@storybook/react";
import { Gallery } from "./Gallery";

const meta = {
  title: "Sections/Marketing/Gallery",
  component: Gallery,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

const images = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop",
    alt: "Image 1",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    alt: "Image 2",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    alt: "Image 3",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    alt: "Image 4",
  },
];

export const Default: Story = { args: { title: "Gallery", images } };

export const TwoColumns: Story = {
  args: { title: "Photos", images, columns: 2 },
};

export const AllVariants: Story = {
  args: { title: "3 Cols", images, columns: 3 },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Gallery {...args} />
      <Gallery {...args} title="2 Cols" columns={2} />
    </div>
  ),
};
