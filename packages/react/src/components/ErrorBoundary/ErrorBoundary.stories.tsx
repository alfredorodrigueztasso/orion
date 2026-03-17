import type { Meta, StoryObj } from "@storybook/react";
import { ErrorBoundary } from "./ErrorBoundary";

const meta = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

const SuccessContent = () => (
  <div className="p-4">
    <h3>Content rendered successfully!</h3>
    <p>This component is inside an ErrorBoundary.</p>
  </div>
);

const ThrowingComponent = () => {
  throw new Error("Something went wrong in this component");
};

export const Default: Story = {
  args: {
    children: <SuccessContent />,
  },
};

export const WithError: Story = {
  args: {
    children: <ThrowingComponent />,
  },
};

export const WithCustomFallback: Story = {
  args: {
    children: <SuccessContent />,
    fallback: (
      <div className="p-4 bg-red-50 rounded">
        <p className="text-red-700">Custom error message</p>
      </div>
    ),
  },
};
