/**
 * Drawer Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../Button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Overlays/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "radio",
      options: ["left", "right", "top", "bottom"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

// Interactive wrapper for stories
const DrawerDemo = ({
  placement = "right",
  size = "md",
  ...rest
}: Partial<React.ComponentProps<typeof Drawer>>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement={placement}
        size={size}
        {...rest}
      >
        <Drawer.Header>Drawer Title</Drawer.Header>
        <Drawer.Body>
          <p>This is the drawer content. You can put any content here.</p>
          <p style={{ marginTop: "var(--spacing-4)" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: () => <DrawerDemo />,
};

export const LeftPlacement: Story = {
  render: () => <DrawerDemo placement="left" />,
};

export const TopPlacement: Story = {
  render: () => <DrawerDemo placement="top" />,
};

export const BottomPlacement: Story = {
  render: () => <DrawerDemo placement="bottom" />,
};

export const SmallSize: Story = {
  render: () => <DrawerDemo size="sm" />,
};

export const LargeSize: Story = {
  render: () => <DrawerDemo size="lg" />,
};

export const FullSize: Story = {
  render: () => <DrawerDemo size="full" />,
};

export const WithoutCloseButton: Story = {
  render: () => <DrawerDemo showCloseButton={false} />,
};

export const NoBackdropClose: Story = {
  render: () => <DrawerDemo closeOnBackdrop={false} />,
};

export const NavigationDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Menu</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          placement="left"
          size="sm"
        >
          <Drawer.Header>Navigation</Drawer.Header>
          <Drawer.Body>
            <nav>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["Home", "Products", "About", "Contact", "Blog"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        style={{
                          display: "block",
                          padding: "var(--spacing-3) 0",
                          color: "var(--text-primary)",
                          textDecoration: "none",
                          borderBottom: "1px solid var(--border-subtle)",
                        }}
                        onClick={() => setOpen(false)}
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </Drawer.Body>
        </Drawer>
      </>
    );
  },
};

export const SettingsDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Settings</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          placement="right"
          size="md"
        >
          <Drawer.Header>Settings</Drawer.Header>
          <Drawer.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-6)",
              }}
            >
              <div>
                <h4
                  style={{
                    marginBottom: "var(--spacing-2)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  Appearance
                </h4>
                <p
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Customize how the app looks on your device.
                </p>
              </div>
              <div>
                <h4
                  style={{
                    marginBottom: "var(--spacing-2)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  Notifications
                </h4>
                <p
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Configure when and how you receive notifications.
                </p>
              </div>
              <div>
                <h4
                  style={{
                    marginBottom: "var(--spacing-2)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  Privacy
                </h4>
                <p
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Control your privacy settings and data sharing.
                </p>
              </div>
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};

export const AllPlacements: Story = {
  render: () => {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);

    const placements = ["left", "right", "top", "bottom"] as const;

    return (
      <div
        style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}
      >
        {placements.map((placement) => (
          <div key={placement}>
            <Button onClick={() => setOpenDrawer(placement)}>
              {placement.charAt(0).toUpperCase() + placement.slice(1)}
            </Button>
            <Drawer
              open={openDrawer === placement}
              onClose={() => setOpenDrawer(null)}
              placement={placement}
              size="sm"
            >
              <Drawer.Header>{placement} Drawer</Drawer.Header>
              <Drawer.Body>
                <p>This drawer slides in from the {placement}.</p>
              </Drawer.Body>
              <Drawer.Footer>
                <Button onClick={() => setOpenDrawer(null)}>Close</Button>
              </Drawer.Footer>
            </Drawer>
          </div>
        ))}
      </div>
    );
  },
};
