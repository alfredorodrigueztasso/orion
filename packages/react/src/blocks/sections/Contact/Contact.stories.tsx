import type { Meta, StoryObj } from "@storybook/react";
import { Contact } from "./Contact";

const meta = {
  title: "Sections/Marketing/Contact",
  component: Contact,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "Get in Touch", description: "Send us a message!" },
};

export const WithInfo: Story = {
  args: {
    title: "Contact Us",
    description: "Have a question?",
    contactInfo: [
      {
        label: "Email",
        value: "hello@orion.dev",
        href: "mailto:hello@orion.dev",
      },
      { label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
      { label: "Address", value: "123 Design St, SF CA" },
    ],
  },
};

export const AllVariants: Story = {
  args: { title: "Simple", description: "Just essentials" },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <Contact {...args} />
      <Contact
        {...args}
        title="Full"
        description="With info"
        contactInfo={[
          {
            label: "Email",
            value: "hello@orion.dev",
            href: "mailto:hello@orion.dev",
          },
          { label: "Phone", value: "+1 (555) 123", href: "tel:+15551234567" },
          { label: "Address", value: "SF, CA" },
        ]}
      />
    </div>
  ),
};
