import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";
import { Stack } from "../Stack";

const meta: Meta<typeof Box> = {
  title: "Components/Layout/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Box>;

/**
 * Basic Box component story
 * Shows the simplest usage with padding
 */
export const Default: Story = {
  args: {
    padding: 4,
    children: "Box content with default 16px padding",
  },
};

/**
 * Demonstrates all spacing scale values (0, px, 05, 1-12, 16, 20, 24, 32)
 */
export const SpacingScale: Story = {
  render: () => (
    <Stack gap="lg">
      <Box padding={0} bg="surface-layer" radius="control">
        padding=0 (0px)
      </Box>
      <Box padding="px" bg="surface-layer" radius="control">
        padding="px" (1px)
      </Box>
      <Box padding="05" bg="surface-layer" radius="control">
        padding="05" (2px)
      </Box>
      <Box padding={1} bg="surface-layer" radius="control">
        padding=1 (4px)
      </Box>
      <Box padding={2} bg="surface-layer" radius="control">
        padding=2 (8px)
      </Box>
      <Box padding={3} bg="surface-layer" radius="control">
        padding=3 (12px)
      </Box>
      <Box padding={4} bg="surface-layer" radius="control">
        padding=4 (16px)
      </Box>
      <Box padding={5} bg="surface-layer" radius="control">
        padding=5 (20px)
      </Box>
      <Box padding={6} bg="surface-layer" radius="control">
        padding=6 (24px)
      </Box>
      <Box padding={8} bg="surface-layer" radius="control">
        padding=8 (32px)
      </Box>
      <Box padding={12} bg="surface-layer" radius="control">
        padding=12 (48px)
      </Box>
      <Box padding={16} bg="surface-layer" radius="control">
        padding=16 (64px)
      </Box>
      <Box padding={32} bg="surface-layer" radius="control">
        padding=32 (128px)
      </Box>
    </Stack>
  ),
};

/**
 * Shows paddingX (horizontal) and paddingY (vertical) axis-aligned padding
 */
export const PaddingAxes: Story = {
  render: () => (
    <Stack gap="lg">
      <Box paddingX={4} paddingY={2} bg="surface-layer" radius="control">
        paddingX=4 (16px), paddingY=2 (8px)
      </Box>
      <Box paddingX={2} paddingY={6} bg="surface-layer" radius="control">
        paddingX=2 (8px), paddingY=6 (24px)
      </Box>
    </Stack>
  ),
};

/**
 * Shows individual padding directions: top, bottom, left, right
 */
export const PaddingDirections: Story = {
  render: () => (
    <Stack gap="lg">
      <Box
        paddingTop={2}
        paddingRight={4}
        paddingBottom={6}
        paddingLeft={8}
        bg="surface-layer"
        radius="control"
      >
        Top=2, Right=4, Bottom=6, Left=8
      </Box>
      <Box paddingTop={1} paddingLeft={6} bg="surface-layer" radius="control">
        Top=1, Left=6 (no right/bottom)
      </Box>
    </Stack>
  ),
};

/**
 * Demonstrates padding priority cascade:
 * Individual directions > Axis-aligned (X/Y) > Uniform padding
 */
export const PaddingPriority: Story = {
  render: () => (
    <Stack gap="lg">
      <div>
        <p style={{ fontSize: "14px", marginBottom: "8px", fontWeight: 500 }}>
          Base padding=4, then paddingX=2 overrides horizontal
        </p>
        <Box padding={4} paddingX={2} bg="surface-layer" radius="control">
          Vertical: 16px (from padding), Horizontal: 8px (paddingX override)
        </Box>
      </div>
      <div>
        <p style={{ fontSize: "14px", marginBottom: "8px", fontWeight: 500 }}>
          padding=4, paddingX=3, paddingTop=1 (all three combined)
        </p>
        <Box
          padding={4}
          paddingX={3}
          paddingTop={1}
          bg="surface-layer"
          radius="control"
        >
          Top: 4px (paddingTop), Horizontal: 12px (paddingX), Bottom: 16px
          (padding)
        </Box>
      </div>
    </Stack>
  ),
};

/**
 * Shows all available background surface tokens
 */
export const BackgroundSurfaces: Story = {
  render: () => (
    <Stack gap="lg">
      <Box padding={4} bg="surface-base" radius="control">
        surface-base (main background)
      </Box>
      <Box padding={4} bg="surface-subtle" radius="control">
        surface-subtle (subtle backgrounds)
      </Box>
      <Box padding={4} bg="surface-layer" radius="control">
        surface-layer (layered surface)
      </Box>
      <Box padding={4} bg="surface-sunken" radius="control">
        surface-sunken (recessed surface)
      </Box>
      <Box padding={4} bg="surface-glass" radius="control">
        surface-glass (glassmorphism)
      </Box>
    </Stack>
  ),
};

/**
 * Shows all available border radius options
 */
export const BorderRadius: Story = {
  render: () => (
    <Stack gap="lg">
      <Box padding={4} bg="surface-layer" radius="sm">
        radius="sm" (8px)
      </Box>
      <Box padding={4} bg="surface-layer" radius="control">
        radius="control" (12px, brand override possible)
      </Box>
      <Box padding={4} bg="surface-layer" radius="container">
        radius="container" (16px)
      </Box>
      <Box padding={4} bg="surface-layer" radius="full">
        radius="full" (9999px, pill shape)
      </Box>
    </Stack>
  ),
};

/**
 * Demonstrates polymorphic element rendering with the `as` prop
 */
export const PolymorphicElement: Story = {
  render: () => (
    <Stack gap="lg">
      <Box as="div" padding={4} bg="surface-layer" radius="control">
        Rendered as div (default)
      </Box>
      <Box as="section" padding={4} bg="surface-layer" radius="control">
        Rendered as section
      </Box>
      <Box as="article" padding={4} bg="surface-layer" radius="control">
        Rendered as article
      </Box>
      <Box as="aside" padding={4} bg="surface-layer" radius="control">
        Rendered as aside
      </Box>
      <Box as="form" padding={4} bg="surface-layer" radius="control">
        Rendered as form
      </Box>
    </Stack>
  ),
};

/**
 * Shows how to compose Box with other layout components like Stack
 */
export const ResponsiveLayout: Story = {
  render: () => (
    <Box bg="surface-subtle" padding={6} radius="container">
      <Stack gap="md">
        <Box padding={4} bg="surface-base" radius="control">
          Header Box
        </Box>
        <Stack direction="horizontal" gap="md">
          <Box
            padding={4}
            bg="surface-base"
            radius="control"
            style={{ flex: 1 }}
          >
            Sidebar
          </Box>
          <Box
            padding={4}
            bg="surface-base"
            radius="control"
            style={{ flex: 2 }}
          >
            Main Content
          </Box>
        </Stack>
        <Box padding={4} bg="surface-base" radius="control">
          Footer Box
        </Box>
      </Stack>
    </Box>
  ),
};

/**
 * Shows Box component in both light and dark themes
 */
export const DarkMode: Story = {
  render: () => (
    <Stack gap="lg">
      <div style={{ padding: "16px", backgroundColor: "white" }}>
        <p style={{ fontSize: "14px", marginBottom: "8px", fontWeight: 500 }}>
          Light Theme
        </p>
        <Box padding={4} bg="surface-layer" radius="control">
          Box in light theme
        </Box>
      </div>
      <div
        style={{
          padding: "16px",
          backgroundColor: "#1e293b",
          borderRadius: "8px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            marginBottom: "8px",
            fontWeight: 500,
            color: "white",
          }}
        >
          Dark Theme (simulated)
        </p>
        <Box padding={4} bg="surface-layer" radius="control">
          Box in dark theme
        </Box>
      </div>
    </Stack>
  ),
};

/**
 * Demonstrates compatibility with Tailwind CSS via @layer orion cascade
 * Shows Box styled alongside Tailwind utilities
 */
export const TailwindCompatibility: Story = {
  render: () => (
    <Stack gap="lg">
      <Box padding={4} bg="surface-layer" radius="control">
        <p className="text-sm font-semibold mb-2">Orion + Tailwind</p>
        <p className="text-xs text-gray-600">
          Box component with padding from Orion, Tailwind text utilities
        </p>
      </Box>
      <Box padding={6} bg="surface-subtle" radius="container">
        <p className="text-lg font-bold mb-4">Title</p>
        <p className="text-sm mb-4">
          Orion Box with padding, Tailwind for responsive text sizing and
          spacing.
        </p>
        <div className="flex gap-2">
          <div className="px-3 py-2 bg-blue-500 rounded text-white text-sm">
            Tailwind Button
          </div>
          <div className="px-3 py-2 bg-gray-200 rounded text-sm">
            Tailwind Button
          </div>
        </div>
      </Box>
    </Stack>
  ),
};
