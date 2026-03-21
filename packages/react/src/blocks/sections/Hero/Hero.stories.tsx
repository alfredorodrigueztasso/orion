import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { Hero } from "./Hero";

const meta = {
  title: "Sections/Marketing/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    align: "center",
    title: "Build Beautiful Interfaces",
    description: "With Orion, your design system",
    primaryAction: <Button size="lg">Get Started</Button>,
    secondaryAction: (
      <Button size="lg" variant="secondary">
        Learn More
      </Button>
    ),
  },
};

export const LeftAlign: Story = {
  args: {
    align: "left",
    title: "Design System Essentials",
    description: "Everything you need",
    primaryAction: <Button size="lg">Start</Button>,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    title: "Quick Start",
    description: "Get up and running",
    primaryAction: <Button>Begin</Button>,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    title: "Enterprise Infrastructure",
    description: "Scale your design system",
    primaryAction: <Button size="lg">Demo</Button>,
    secondaryAction: (
      <Button size="lg" variant="secondary">
        Docs
      </Button>
    ),
  },
};

export const WithHighlight: Story = {
  args: {
    title: (
      <>
        Welcome to <Hero.Highlight>Orion</Hero.Highlight>
      </>
    ),
    description: "The AI-first design system",
    primaryAction: <Button size="lg">Get Started</Button>,
  },
};

export const AllVariants: Story = {
  args: {
    title: "Center",
    description: "Default",
    align: "center",
    primaryAction: <Button>Action</Button>,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Hero {...args} />
      <Hero {...args} align="left" title="Left" description="Alternative" />
      <Hero
        {...args}
        size="lg"
        title="Large"
        description="Prominent"
        primaryAction={<Button size="lg">Action</Button>}
      />
    </div>
  ),
};
