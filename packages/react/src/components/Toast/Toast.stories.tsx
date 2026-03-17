/**
 * Toast Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";

const meta: Meta<typeof ToastProvider> = {
  title: "Components/Overlays/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

// Demo component for stories
const ToastDemo = () => {
  const { toast, success, error, warning, info } = useToast();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-3)",
      }}
    >
      <Button
        onClick={() => toast({ message: "This is a basic toast notification" })}
      >
        Basic Toast
      </Button>
      <Button onClick={() => success("Operation completed successfully!")}>
        Success Toast
      </Button>
      <Button onClick={() => error("Something went wrong. Please try again.")}>
        Error Toast
      </Button>
      <Button
        onClick={() => warning("Please review your changes before proceeding.")}
      >
        Warning Toast
      </Button>
      <Button onClick={() => info("Here is some helpful information.")}>
        Info Toast
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const WithTitle: Story = {
  render: () => {
    const Component = () => {
      const { toast } = useToast();
      return (
        <Button
          onClick={() =>
            toast({
              title: "File uploaded",
              message:
                "Your file has been uploaded successfully and is now being processed.",
              variant: "success",
            })
          }
        >
          Toast with Title
        </Button>
      );
    };
    return <Component />;
  },
};

export const WithAction: Story = {
  render: () => {
    const Component = () => {
      const { toast } = useToast();
      return (
        <Button
          onClick={() =>
            toast({
              message: "Item moved to trash",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo clicked"),
              },
            })
          }
        >
          Toast with Action
        </Button>
      );
    };
    return <Component />;
  },
};

export const LongDuration: Story = {
  render: () => {
    const Component = () => {
      const { toast } = useToast();
      return (
        <Button
          onClick={() =>
            toast({
              message: "This toast will stay for 10 seconds",
              duration: 10000,
            })
          }
        >
          Long Duration (10s)
        </Button>
      );
    };
    return <Component />;
  },
};

export const NoDismiss: Story = {
  render: () => {
    const Component = () => {
      const { toast } = useToast();
      return (
        <Button
          onClick={() =>
            toast({
              message: "This toast cannot be manually dismissed",
              dismissible: false,
              duration: 3000,
            })
          }
        >
          Non-dismissible Toast
        </Button>
      );
    };
    return <Component />;
  },
};

export const PersistentToast: Story = {
  render: () => {
    const Component = () => {
      const { toast } = useToast();
      return (
        <Button
          onClick={() =>
            toast({
              title: "Action Required",
              message: "Please complete your profile to continue.",
              duration: 0,
              action: {
                label: "Complete Profile",
                onClick: () => console.log("Navigate to profile"),
              },
            })
          }
        >
          Persistent Toast
        </Button>
      );
    };
    return <Component />;
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const Component = () => {
      const { success, error, warning, info } = useToast();
      return (
        <Button
          onClick={() => {
            success("File saved");
            setTimeout(() => warning("Low storage space"), 200);
            setTimeout(() => error("Upload failed"), 400);
            setTimeout(() => info("3 new messages"), 600);
          }}
        >
          Show Multiple Toasts
        </Button>
      );
    };
    return <Component />;
  },
};

export const DismissAll: Story = {
  render: () => {
    const Component = () => {
      const { success, warning, error, dismissAll } = useToast();
      return (
        <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
          <Button
            onClick={() => {
              success("Toast 1");
              setTimeout(() => warning("Toast 2"), 100);
              setTimeout(() => error("Toast 3"), 200);
            }}
          >
            Show Toasts
          </Button>
          <Button variant="secondary" onClick={dismissAll}>
            Dismiss All
          </Button>
        </div>
      );
    };
    return <Component />;
  },
};

// Position variants need their own providers
export const TopRight: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [], // Override default decorator
};

export const TopCenter: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [],
};

export const BottomLeft: Story = {
  render: () => (
    <ToastProvider position="bottom-left">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [],
};

export const BottomCenter: Story = {
  render: () => (
    <ToastProvider position="bottom-center">
      <ToastDemo />
    </ToastProvider>
  ),
  decorators: [],
};

export const AllVariants: Story = {
  render: () => {
    const Component = () => {
      const { toast } = useToast();
      const variants = ["info", "success", "warning", "error"] as const;

      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-3)",
          }}
        >
          {variants.map((variant) => (
            <Button
              key={variant}
              onClick={() =>
                toast({
                  title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Notification`,
                  message: `This is a ${variant} toast message.`,
                  variant,
                })
              }
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      );
    };
    return <Component />;
  },
};
