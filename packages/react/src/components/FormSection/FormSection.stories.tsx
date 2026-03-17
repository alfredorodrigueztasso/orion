import type { Meta, StoryObj } from "@storybook/react";
import { User, Bell, Lock, CreditCard } from "lucide-react";
import { FormSection } from "./FormSection";
import { Button } from "@orion-ds/react";
import { Field } from "@orion-ds/react";

const meta: Meta<typeof FormSection> = {
  title: "Sections/App/FormSection",
  component: FormSection,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A form section for settings pages and structured form layouts. Optimized for Product Mode with clear hierarchy and efficient space usage.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "card", "inline"],
    },
    collapsible: { control: "boolean" },
    divider: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FormSection>;

export const Default: Story = {
  args: {
    title: "Profile Information",
    description: "Update your personal details and public profile.",
    children: (
      <>
        <FormSection.Group columns={2}>
          <Field label="First Name" type="text" placeholder="John" />
          <Field label="Last Name" type="text" placeholder="Doe" />
        </FormSection.Group>
        <Field label="Email" type="email" placeholder="john@example.com" />
        <Field
          label="Bio"
          type="textarea"
          placeholder="Tell us about yourself..."
        />
      </>
    ),
    actions: (
      <FormSection.Actions>
        <Button variant="secondary">Cancel</Button>
        <Button>Save Changes</Button>
      </FormSection.Actions>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    icon: <User size={20} />,
    title: "Personal Details",
    description: "Manage your account information.",
    children: (
      <>
        <Field label="Display Name" type="text" placeholder="johndoe" />
        <Field
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
        />
      </>
    ),
  },
};

export const CardVariant: Story = {
  args: {
    variant: "card",
    icon: <Bell size={20} />,
    title: "Notification Preferences",
    description: "Choose how you want to be notified.",
    children: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: "var(--font-weight-medium)" }}>
              Email Notifications
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              Receive updates via email
            </div>
          </div>
          <input type="checkbox" defaultChecked />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: "var(--font-weight-medium)" }}>
              Push Notifications
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              Receive push notifications
            </div>
          </div>
          <input type="checkbox" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: "var(--font-weight-medium)" }}>
              SMS Alerts
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              Get important alerts via SMS
            </div>
          </div>
          <input type="checkbox" />
        </div>
      </div>
    ),
  },
};

export const InlineVariant: Story = {
  args: {
    variant: "inline",
    title: "Password",
    description: "Update your password to keep your account secure.",
    children: (
      <>
        <Field label="Current Password" type="password" />
        <Field label="New Password" type="password" />
        <Field label="Confirm New Password" type="password" />
      </>
    ),
    actions: (
      <FormSection.Actions>
        <Button>Update Password</Button>
      </FormSection.Actions>
    ),
  },
};

export const Collapsible: Story = {
  args: {
    collapsible: true,
    icon: <Lock size={20} />,
    title: "Security Settings",
    description: "Configure security options for your account.",
    children: (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: "var(--font-weight-medium)" }}>
              Two-Factor Authentication
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              Add an extra layer of security
            </div>
          </div>
          <input type="checkbox" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: "var(--font-weight-medium)" }}>
              Session Timeout
            </div>
            <div
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              Auto logout after inactivity
            </div>
          </div>
          <input type="checkbox" defaultChecked />
        </div>
      </>
    ),
  },
};

export const CollapsedByDefault: Story = {
  args: {
    collapsible: true,
    defaultCollapsed: true,
    icon: <CreditCard size={20} />,
    title: "Billing Information",
    description: "Manage your payment methods and billing address.",
    children: (
      <>
        <Field
          label="Card Number"
          type="text"
          placeholder="4242 4242 4242 4242"
        />
        <FormSection.Group columns={2}>
          <Field label="Expiry Date" type="text" placeholder="MM/YY" />
          <Field label="CVV" type="text" placeholder="123" />
        </FormSection.Group>
      </>
    ),
  },
};

export const WithDivider: Story = {
  args: {
    divider: true,
    title: "Account Settings",
    description: "Basic account configuration.",
    children: (
      <>
        <Field label="Username" type="text" />
        <Field label="Language" type="select" />
        <Field label="Timezone" type="select" />
      </>
    ),
  },
};

export const MultipleGroups: Story = {
  args: {
    title: "Address Information",
    description: "Enter your shipping address.",
    children: (
      <>
        <Field label="Street Address" type="text" placeholder="123 Main St" />
        <Field
          label="Address Line 2"
          type="text"
          placeholder="Apt, Suite, etc."
        />
        <FormSection.Group columns={3}>
          <Field label="City" type="text" placeholder="San Francisco" />
          <Field label="State" type="text" placeholder="CA" />
          <Field label="ZIP Code" type="text" placeholder="94102" />
        </FormSection.Group>
        <Field label="Country" type="select" />
      </>
    ),
    actions: (
      <FormSection.Actions align="between">
        <Button variant="ghost">Clear Form</Button>
        <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
          <Button variant="secondary">Cancel</Button>
          <Button>Save Address</Button>
        </div>
      </FormSection.Actions>
    ),
  },
};
