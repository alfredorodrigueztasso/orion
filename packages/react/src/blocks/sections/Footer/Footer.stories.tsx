import type { Meta, StoryObj } from "@storybook/react";
import { Github, Twitter } from "lucide-react";
import { Footer } from "./Footer";

const meta = {
  title: "Sections/Marketing/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

const data = {
  brand: { name: "Orion", description: "AI-first design system" },
  linkGroups: [
    { title: "Product", links: [{ label: "Components", href: "#" }] },
    { title: "Company", links: [{ label: "About", href: "#" }] },
  ],
  socialLinks: [
    { label: "GitHub", href: "#", icon: <Github size={20} /> },
    { label: "Twitter", href: "#", icon: <Twitter size={20} /> },
  ],
};

export const Default: Story = { args: data };

export const Minimal: Story = { args: { ...data, variant: "minimal" } };

export const Centered: Story = { args: { ...data, variant: "centered" } };

export const AllVariants: Story = {
  args: data,
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Footer {...args} variant="default" />
      <Footer {...args} variant="minimal" />
      <Footer {...args} variant="centered" />
    </div>
  ),
};
