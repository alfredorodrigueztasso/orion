import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";
import { Card } from "../Card";

const meta = {
  title: "Components/Data Display/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["editorial", "product", "gallery"],
    },
    aspectRatio: {
      control: "select",
      options: ["16/9", "4/3", "1/1", "3/4"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    align: {
      control: "select",
      options: ["edge", "container"],
    },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const createImage = (seed: number) => (
  <img
    src={`https://picsum.photos/seed/${seed}/800/450`}
    alt=""
    style={{ width: "100%", height: "100%", objectFit: "cover" }}
  />
);

const defaultItems = [
  {
    image: createImage(10),
    eyebrow: "Design",
    title: "The future of interfaces",
    description: "How AI is reshaping how we build digital products.",
    overlay: "gradient" as const,
  },
  {
    image: createImage(20),
    eyebrow: "Engineering",
    title: "Building at scale",
    description: "Lessons from shipping to millions of users.",
    overlay: "gradient" as const,
  },
  {
    image: createImage(30),
    eyebrow: "Product",
    title: "User-centered design",
    description: "Putting users first in every decision.",
    overlay: "gradient" as const,
  },
  {
    image: createImage(40),
    eyebrow: "Culture",
    title: "Remote-first teams",
    description: "How we collaborate across time zones.",
    overlay: "gradient" as const,
  },
];

/**
 * Basic atomic Carousel component without any section wrapper.
 * Use this inside Cards, Modals, or custom layouts.
 */
export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

/**
 * Carousel with cards aligned to container edge.
 * Useful when you want cards to align with surrounding content.
 */
export const AlignedToContainer: Story = {
  args: {
    items: defaultItems,
    align: "container",
  },
};

/**
 * Carousel with cards starting from the edge (Apple style).
 * Creates a more dramatic, edge-to-edge visual effect.
 */
export const AlignedToEdge: Story = {
  args: {
    items: defaultItems,
    align: "edge",
  },
};

/**
 * Carousel inside a Card component.
 * Demonstrates atomic composition for embedded carousels.
 */
export const InsideCard: Story = {
  args: {
    items: defaultItems.map((item) => ({
      ...item,
      eyebrow: undefined,
      description: undefined,
      overlay: "gradient" as const,
    })),
    variant: "gallery",
    aspectRatio: "16/9",
    showNavigation: true,
    showPagination: true,
    peek: false,
  },
  render: (args) => (
    <Card>
      <Card.Header>
        <h3 style={{ margin: 0 }}>Featured Images</h3>
      </Card.Header>
      <Card.Body style={{ padding: 0 }}>
        <Carousel {...args} />
      </Card.Body>
    </Card>
  ),
};

/**
 * Product showcase variant with square cards.
 */
export const ProductVariant: Story = {
  args: {
    items: defaultItems.map((item, i) => ({
      ...item,
      eyebrow: `$${(i + 1) * 29}.99`,
      description: "Free shipping",
    })),
    variant: "product",
    aspectRatio: "1/1",
  },
};

/**
 * Gallery variant with hover-reveal captions.
 */
export const GalleryVariant: Story = {
  args: {
    items: defaultItems.map((item) => ({
      ...item,
      overlay: "gradient" as const,
    })),
    variant: "gallery",
    aspectRatio: "4/3",
  },
};

/**
 * Carousel with pagination dots instead of navigation arrows.
 */
export const WithPagination: Story = {
  args: {
    items: defaultItems,
    showNavigation: false,
    showPagination: true,
  },
};

/**
 * Carousel with both navigation and pagination.
 */
export const NavigationAndPagination: Story = {
  args: {
    items: defaultItems,
    showNavigation: true,
    showPagination: true,
  },
};

/**
 * Auto-scrolling carousel.
 */
export const AutoScroll: Story = {
  args: {
    items: defaultItems,
    autoScroll: true,
    autoScrollInterval: 3000,
  },
};

/**
 * Small gap between cards.
 */
export const SmallGap: Story = {
  args: {
    items: defaultItems,
    gap: "sm",
  },
};

/**
 * Large gap between cards.
 */
export const LargeGap: Story = {
  args: {
    items: defaultItems,
    gap: "lg",
  },
};

/**
 * Without peek effect - cards don't extend past container edge.
 */
export const NoPeek: Story = {
  args: {
    items: defaultItems,
    peek: false,
  },
};

/**
 * Square aspect ratio cards.
 */
export const SquareAspectRatio: Story = {
  args: {
    items: defaultItems,
    aspectRatio: "1/1",
  },
};

/**
 * Portrait aspect ratio (3:4) cards.
 */
export const PortraitAspectRatio: Story = {
  args: {
    items: defaultItems,
    aspectRatio: "3/4",
  },
};

export const AllVariants: Story = {
  args: { items: defaultItems },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "var(--spacing-4)" }}>Editorial</h3>
        <Carousel items={defaultItems} variant="editorial" />
      </div>
      <div>
        <h3 style={{ marginBottom: "var(--spacing-4)" }}>Product</h3>
        <Carousel
          items={defaultItems.map((item, i) => ({
            ...item,
            eyebrow: `$${(i + 1) * 29}.99`,
            description: "Free shipping",
          }))}
          variant="product"
          aspectRatio="1/1"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: "var(--spacing-4)" }}>Gallery</h3>
        <Carousel items={defaultItems} variant="gallery" aspectRatio="4/3" />
      </div>
    </div>
  ),
};
