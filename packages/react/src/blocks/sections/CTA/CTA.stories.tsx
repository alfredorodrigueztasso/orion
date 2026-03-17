import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { CTA } from "./CTA";

const meta = {
  title: "Blocks/Sections/CTA",
  component: CTA,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Ready to get started?",
    description: "Join thousands of teams",
    actions: <><Button size="lg">Get Started</Button><Button size="lg" variant="secondary">Demo</Button></>,
  },
};

export const BrandVariant: Story = {
  args: {
    title: "Upgrade to Pro",
    description: "Unlock premium features",
    variant: "brand",
    actions: <Button size="lg">Upgrade</Button>,
  },
};

export const SubtleVariant: Story = {
  args: {
    title: "Learn More",
    description: "Download our guide",
    variant: "subtle",
    actions: <Button size="lg" variant="secondary">Download</Button>,
  },
};

export const AllVariants: Story = {
  args: {
    variant: "default",
    title: "Default",
    description: "Standard CTA",
    actions: <Button>Action</Button>,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <CTA {...args} />
      <CTA variant="brand" title="Brand" description="Branded CTA" actions={<Button>Action</Button>} />
      <CTA variant="subtle" title="Subtle" description="Minimal CTA" actions={<Button variant="secondary">Action</Button>} />
    </div>
  ),
};
