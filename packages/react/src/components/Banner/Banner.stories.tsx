import type { Meta, StoryObj } from "@storybook/react";
import { Banner } from "./Banner";

const meta = {
  title: "Sections/Marketing/Banner",
  component: Banner,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "gradient", "image", "split"],
    },
    imagePosition: {
      control: "select",
      options: ["left", "right"],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Summer Sale",
    description: "Get up to 50% off on selected items.",
    ctaLabel: "Shop Now",
    ctaHref: "#",
  },
};

export const GradientVariant: Story = {
  args: {
    title: "New Features Available",
    description: "Check out our latest updates and improvements.",
    ctaLabel: "Learn More",
    ctaHref: "#",
    variant: "gradient",
    gradient:
      "linear-gradient(135deg, var(--color-brand-500), var(--color-brand-700))",
  },
};

export const WithSecondaryAction: Story = {
  args: {
    title: "Black Friday Deals",
    description: "Limited time offers you do not want to miss.",
    ctaLabel: "Shop Deals",
    ctaHref: "#",
    secondaryCtaLabel: "View All",
    secondaryCtaHref: "#",
    variant: "gradient",
  },
};

export const Dismissible: Story = {
  args: {
    title: "Cookie Notice",
    description: "We use cookies to improve your experience.",
    ctaLabel: "Accept",
    ctaHref: "#",
    dismissible: true,
    onDismiss: () => console.log("Banner dismissed"),
  },
};

export const SplitVariant: Story = {
  args: {
    title: "Download Our App",
    description: "Get the full experience on mobile.",
    ctaLabel: "Get Started",
    ctaHref: "#",
    variant: "split",
    sideImage: "https://picsum.photos/seed/banner/400/300",
    imagePosition: "right",
  },
};

export const SplitImageLeft: Story = {
  args: {
    title: "Meet Our Team",
    description: "Learn about the people behind the product.",
    ctaLabel: "About Us",
    ctaHref: "#",
    variant: "split",
    sideImage: "https://picsum.photos/seed/team/400/300",
    imagePosition: "left",
  },
};

export const WithEyebrow: Story = {
  args: {
    eyebrow: "Announcement",
    title: "We have been acquired!",
    description: "Exciting news for our community.",
    ctaLabel: "Read More",
    ctaHref: "#",
  },
};

export const Compact: Story = {
  args: {
    title: "Free shipping on orders over $50",
    ctaLabel: "Shop Now",
    ctaHref: "#",
    compact: true,
  },
};

export const FullWidth: Story = {
  args: {
    title: "Join 10,000+ developers",
    description: "Building the future of design systems.",
    ctaLabel: "Get Started Free",
    ctaHref: "#",
    fullWidth: true,
    variant: "gradient",
  },
};

export const CustomBackground: Story = {
  args: {
    title: "Special Offer",
    description: "Use code SAVE20 for 20% off.",
    ctaLabel: "Apply Code",
    ctaHref: "#",
    backgroundColor: "var(--surface-brand)",
  },
};
