import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { Pricing } from "./Pricing";

const meta = {
  title: "Sections/Marketing/Pricing",
  component: Pricing,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Pricing>;

export default meta;
type Story = StoryObj<typeof meta>;

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For individuals",
    features: ["90+ Components", "Design Tokens", "Support"],
    action: <Button variant="secondary">Get Started</Button>,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For teams",
    features: ["Everything", "Priority Support", "Custom Branding"],
    action: <Button>Choose</Button>,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations",
    features: ["Everything", "Dedicated Support", "Custom Dev"],
    action: <Button variant="secondary">Contact</Button>,
  },
];

export const Default: Story = { args: { title: "Pricing", description: "Choose a plan", plans } };

export const TwoPlans: Story = { args: { title: "Plans", plans: plans.slice(0, 2) } };

export const AllVariants: Story = {
  args: {
    title: "Three Plans",
    description: "Pick one",
    plans,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Pricing {...args} />
      <Pricing title="Two Plans" description="Options" plans={plans.slice(0, 2)} />
    </div>
  ),
};
