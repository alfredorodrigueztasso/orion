import type { Meta, StoryObj } from "@storybook/react";
import { SettingsLayout } from "./SettingsLayout";

const meta = {
  title: "Sections/Marketing/SettingsLayout",
  component: SettingsLayout,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

const navigation = [
  {
    title: "Account",
    items: [
      { id: "profile", label: "Profile", description: "Your account info" },
      { id: "email", label: "Email", description: "Email preferences" },
    ],
  },
  {
    title: "Security",
    items: [
      { id: "password", label: "Password", description: "Change password" },
      { id: "sessions", label: "Sessions", description: "Active sessions" },
    ],
  },
  {
    title: "Billing",
    items: [{ id: "subscription", label: "Subscription", description: "Manage plan" }],
  },
];

export const Default: Story = {
  args: {
    navigation,
    activeSection: "profile",
    onNavigate: () => {},
    title: "Settings",
    children: <div>Content for selected section</div>,
  },
};

export const Compact: Story = {
  args: {
    navigation: navigation.slice(0, 2),
    activeSection: "password",
    onNavigate: () => {},
    title: "Preferences",
    children: <div>Content for selected section</div>,
  },
};

export const AllVariants: Story = {
  args: {
    navigation,
    activeSection: "profile",
    onNavigate: () => {},
    title: "Settings",
    children: <div>Content for selected section</div>,
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <SettingsLayout {...args} title="Full Settings" />
      <SettingsLayout {...args} navigation={navigation.slice(0, 2)} title="Basic Settings" />
    </div>
  ),
};
