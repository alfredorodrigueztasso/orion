import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./Stepper";

const meta = {
  title: "Sections/Marketing/Stepper",
  component: Stepper,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { id: "1", label: "Account", description: "Create account" },
  { id: "2", label: "Profile", description: "Set up profile" },
  { id: "3", label: "Verify", description: "Verify email" },
  { id: "4", label: "Done", description: "Complete!" },
];

export const Default: Story = { args: { steps, activeStep: 0 } };

export const Progress: Story = { args: { steps, activeStep: 1 } };

export const Completed: Story = { args: { steps, activeStep: 3 } };

export const Vertical: Story = {
  args: { steps, activeStep: 1, orientation: "vertical" },
};

export const AllVariants: Story = {
  args: {
    steps,
    activeStep: 0,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Stepper {...args} />
      <Stepper {...args} activeStep={1} />
      <Stepper {...args} activeStep={1} orientation="vertical" />
    </div>
  ),
};
