import type { Meta, StoryObj } from "@storybook/react";
import { ProfilePageTemplate } from "./ProfilePageTemplate";

const meta = {
  title: "Templates/App/ProfilePageTemplate",
  component: ProfilePageTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfilePageTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  id: "user-1",
  name: "Sarah Anderson",
  email: "sarah.anderson@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  bio: "Product designer passionate about creating great user experiences",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: new Date("2022-01-15"),
};

export const Default: Story = {
  args: {
    user: mockUser,
    onEditProfile: () => console.log("Edit profile"),
    onChangePassword: () => console.log("Change password"),
    onLogout: () => console.log("Logout"),
  },
};

export const MinimalProfile: Story = {
  args: {
    user: {
      id: "user-2",
      name: "John Doe",
      email: "john@example.com",
    },
    onEditProfile: () => console.log("Edit profile"),
    onChangePassword: () => console.log("Change password"),
    onLogout: () => console.log("Logout"),
  },
};

export const WithError: Story = {
  args: {
    user: mockUser,
    error: "Failed to load profile. Please try again.",
    onEditProfile: () => console.log("Edit profile"),
    onChangePassword: () => console.log("Change password"),
    onLogout: () => console.log("Logout"),
  },
};

export const Loading: Story = {
  args: {
    user: mockUser,
    isLoading: true,
    onEditProfile: () => console.log("Edit profile"),
    onChangePassword: () => console.log("Change password"),
    onLogout: () => console.log("Logout"),
  },
};

export const CustomTabs: Story = {
  args: {
    user: mockUser,
    tabs: [
      { id: "profile", label: "Profile" },
      { id: "preferences", label: "Preferences" },
      { id: "notifications", label: "Notifications" },
    ],
    onEditProfile: () => console.log("Edit profile"),
    onChangePassword: () => console.log("Change password"),
    onLogout: () => console.log("Logout"),
  },
};
