/**
 * AlertDialog Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AlertDialog } from "./AlertDialog";
import { Button } from "../Button/Button";

const meta: Meta<typeof AlertDialog> = {
  title: "Components/Overlays/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "var(--spacing-8)" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    closeOnBackdrop: {
      control: "boolean",
      description: "Close on backdrop click (default: false)",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Close on Escape key (default: false)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper
const AlertDialogWrapper = ({
  variant = "danger",
  closeOnBackdrop,
  closeOnEscape,
}: {
  variant?: "info" | "warning" | "danger";
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open AlertDialog
      </Button>
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        closeOnBackdrop={closeOnBackdrop}
        closeOnEscape={closeOnEscape}
      >
        <AlertDialog.Icon variant={variant} />
        <AlertDialog.Title>Delete this item?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete the item
          and remove all associated data.
        </AlertDialog.Description>
        <AlertDialog.Actions>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </AlertDialog.Actions>
      </AlertDialog>
    </>
  );
};

export const Default: Story = {
  render: () => <AlertDialogWrapper />,
};

export const DangerVariant: Story = {
  render: () => <AlertDialogWrapper variant="danger" />,
};

export const WarningVariant: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Show Warning
        </Button>
        <AlertDialog open={open} onClose={() => setOpen(false)}>
          <AlertDialog.Icon variant="warning" />
          <AlertDialog.Title>Unsaved changes</AlertDialog.Title>
          <AlertDialog.Description>
            You have unsaved changes. Do you want to save before leaving?
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Discard
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Save changes
            </Button>
          </AlertDialog.Actions>
        </AlertDialog>
      </>
    );
  },
};

export const InfoVariant: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Show Info
        </Button>
        <AlertDialog open={open} onClose={() => setOpen(false)}>
          <AlertDialog.Icon variant="info" />
          <AlertDialog.Title>Session expiring</AlertDialog.Title>
          <AlertDialog.Description>
            Your session will expire in 5 minutes. Would you like to extend it?
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Log out
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Extend session
            </Button>
          </AlertDialog.Actions>
        </AlertDialog>
      </>
    );
  },
};

export const WithEscapeClose: Story = {
  render: () => <AlertDialogWrapper closeOnEscape closeOnBackdrop />,
};

export const AllVariants: Story = {
  render: () => {
    const [openVariant, setOpenVariant] = useState<string | null>(null);

    return (
      <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
        <Button onClick={() => setOpenVariant("info")}>Info</Button>
        <Button onClick={() => setOpenVariant("warning")}>Warning</Button>
        <Button onClick={() => setOpenVariant("danger")}>Danger</Button>

        {(["info", "warning", "danger"] as const).map((variant) => (
          <AlertDialog
            key={variant}
            open={openVariant === variant}
            onClose={() => setOpenVariant(null)}
          >
            <AlertDialog.Icon variant={variant} />
            <AlertDialog.Title>
              {variant === "info" && "Information"}
              {variant === "warning" && "Warning"}
              {variant === "danger" && "Danger"}
            </AlertDialog.Title>
            <AlertDialog.Description>
              This is a {variant} alert dialog example.
            </AlertDialog.Description>
            <AlertDialog.Actions>
              <Button variant="ghost" onClick={() => setOpenVariant(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setOpenVariant(null)}>
                Confirm
              </Button>
            </AlertDialog.Actions>
          </AlertDialog>
        ))}
      </div>
    );
  },
};
