import type { Meta, StoryObj } from "@storybook/react";
import { Newsletter } from "./Newsletter";

const meta = {
  title: "Sections/Marketing/Newsletter",
  component: Newsletter,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Newsletter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Subscribe",
    description: "Get updates",
    placeholder: "Email",
  },
};

export const WithDisclaimer: Story = {
  args: {
    title: "Stay Updated",
    description: "Weekly insights",
    placeholder: "your@email.com",
    disclaimer: "We never spam",
  },
};

export const Compact: Story = {
  args: {
    title: "Newsletter",
    description: "Join us",
    placeholder: "Email",
    size: "sm",
  },
};

export const AllVariants: Story = {
  args: {
    title: "Standard",
    description: "Get updates",
    placeholder: "Email",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Newsletter {...args} />
      <Newsletter
        title="With Info"
        description="Stay informed"
        placeholder="your@email.com"
        disclaimer="Privacy respected"
      />
      <Newsletter
        title="Compact"
        description="Join"
        placeholder="Email"
        size="sm"
      />
    </div>
  ),
};
