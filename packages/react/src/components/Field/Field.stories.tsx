/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import { Field } from "./Field";
import { useState } from "react";
import { Search, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const meta = {
  title: "Components/Forms/Field",
  component: Field,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("john.doe@example.com");
    return (
      <Field
        type="email"
        label="Email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Required: Story = {
  args: {
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
};

export const WithHelper: Story = {
  args: {
    label: "Password",
    type: "password",
    helperText: "Must be at least 8 characters long",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    type: "email",
    value: "invalid-email",
    error: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Account ID",
    value: "ACC-12345",
    disabled: true,
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: "Small Input",
    size: "sm",
    placeholder: "Small size",
  },
};

export const Medium: Story = {
  args: {
    label: "Medium Input",
    size: "md",
    placeholder: "Medium size (default)",
  },
};

export const Large: Story = {
  args: {
    label: "Large Input",
    size: "lg",
    placeholder: "Large size",
  },
};

// Types
export const EmailType: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "your@email.com",
  },
};

export const PasswordType: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
};

export const NumberType: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "25",
  },
};

export const SearchType: Story = {
  args: {
    label: "Search",
    type: "search",
    placeholder: "Search...",
  },
};

export const CompleteForm: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        maxWidth: "400px",
      }}
    >
      <Field label="Full Name" placeholder="John Doe" required />
      <Field
        type="email"
        label="Email"
        placeholder="john@example.com"
        helperText="We'll never share your email"
        required
      />
      <Field
        type="password"
        label="Password"
        helperText="Must be at least 8 characters"
        required
      />
      <Field type="tel" label="Phone Number" placeholder="+1 (555) 000-0000" />
    </div>
  ),
};

// ============================================================================
// ACCESSIBILITY EXAMPLES
// ============================================================================

/**
 * With Icons - Shows left and right icon support with proper accessibility.
 */
export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        maxWidth: "400px",
      }}
    >
      <Field
        label="Email"
        type="email"
        leftIcon={<Mail size={18} />}
        placeholder="you@example.com"
      />
      <Field
        label="Username"
        leftIcon={<User size={18} />}
        placeholder="johndoe"
      />
    </div>
  ),
};

/**
 * Password Toggle - Accessible password visibility toggle using rightIcon.
 * The button inside rightIcon is keyboard accessible and properly announced.
 */
export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Field
        label="Password"
        type={showPassword ? "text" : "password"}
        leftIcon={<Lock size={18} />}
        placeholder="Enter your password"
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        }
      />
    );
  },
};

/**
 * Search without Label - Using aria-label for icon-only search input.
 * When no visible label is provided, aria-label is required for accessibility.
 */
export const SearchWithoutLabel: Story = {
  render: () => (
    <Field
      type="search"
      aria-label="Search"
      leftIcon={<Search size={18} />}
      placeholder="Search..."
    />
  ),
};

/**
 * External Description - Using aria-describedby with external content.
 * The field can reference additional descriptive text outside the component.
 */
export const ExternalDescription: Story = {
  render: () => (
    <div style={{ maxWidth: "400px" }}>
      <p
        id="password-requirements"
        style={{
          fontSize: "var(--font-size-12)",
          color: "var(--text-secondary)",
          marginBottom: "var(--spacing-4)",
          padding: "var(--spacing-3)",
          background: "var(--surface-subtle)",
          borderRadius: "var(--radius-sm)",
        }}
      >
        Password requirements: at least 8 characters, one uppercase letter, one
        number, and one special character.
      </p>
      <Field
        label="Create Password"
        type="password"
        aria-describedby="password-requirements"
        placeholder="Create a secure password"
      />
    </div>
  ),
};

/**
 * Accessibility Overview - Demonstrates all accessibility features in one view.
 */
export const AccessibilityOverview: Story = {
  render: () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const emailError =
      email && !email.includes("@") ? "Please enter a valid email" : undefined;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
          maxWidth: "450px",
        }}
      >
        <div
          style={{
            padding: "var(--spacing-4)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-control)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          <strong style={{ color: "var(--text-primary)" }}>
            Accessibility Features:
          </strong>
          <ul
            style={{
              margin: "var(--spacing-2) 0 0",
              paddingLeft: "var(--spacing-4)",
            }}
          >
            <li>Labels linked via htmlFor/id</li>
            <li>aria-invalid on error states</li>
            <li>aria-describedby for helper/error text</li>
            <li>role=&quot;alert&quot; on error messages</li>
            <li>Focus-visible ring for keyboard users</li>
            <li>High contrast mode support</li>
            <li>Reduced motion support</li>
          </ul>
        </div>

        {/* Standard field with label */}
        <Field
          label="Full Name"
          placeholder="John Doe"
          required
          helperText="Enter your legal name as it appears on documents"
        />

        {/* Email with live validation */}
        <Field
          label="Email Address"
          type="email"
          leftIcon={<Mail size={18} />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          placeholder="you@example.com"
          required
        />

        {/* Password with toggle */}
        <Field
          label="Password"
          type={showPassword ? "text" : "password"}
          leftIcon={<Lock size={18} />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a secure password"
          helperText="Minimum 8 characters"
          required
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        {/* Search without visible label */}
        <div>
          <p
            style={{
              fontSize: "var(--font-size-11)",
              color: "var(--text-tertiary)",
              marginBottom: "var(--spacing-2)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Icon-only input (uses aria-label)
          </p>
          <Field
            type="search"
            aria-label="Search products"
            leftIcon={<Search size={18} />}
            placeholder="Search products..."
          />
        </div>

        {/* Disabled state */}
        <Field
          label="Account ID"
          value="ACC-12345-LOCKED"
          disabled
          helperText="This field cannot be edited"
        />
      </div>
    );
  },
};

/**
 * On Dark Background - Field visibility on dark backgrounds (e.g., Hero sections).
 * The data-dark-bg="true" attribute automatically adapts Field styling.
 */
export const OnDarkBackground: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div
        style={{
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-container)",
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7))",
        }}
      >
        <h3
          style={{
            color: "var(--color-neutral-0)",
            marginBottom: "var(--spacing-6)",
          }}
        >
          Login Form on Dark Background
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
            maxWidth: "400px",
          }}
          data-dark-bg="true"
        >
          <Field
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={18} />}
            helperText="We'll never share your email"
          />

          <Field
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={18} />}
            helperText="Minimum 8 characters"
            required
          />

          <Field
            label="Full Name"
            type="text"
            placeholder="John Doe"
            optional
          />
        </div>
      </div>
    );
  },
};

// Interaction Testing - Demonstrates validation feedback on invalid input
export const FormValidation: Story = {
  render: () => {
    const [email, setEmail] = useState("invalid");
    return (
      <Field
        type="email"
        label="Email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        error={!email.includes("@") ? "Please enter a valid email" : undefined}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText(
      "you@example.com",
    ) as HTMLInputElement;

    // Verify field renders
    await expect(input).toBeInTheDocument();

    // Clear the field
    await userEvent.clear(input);

    // Type invalid email (no @)
    await userEvent.type(input, "invalidemail");

    // Verify error message appears
    const errorText = canvas.queryByText(/please enter a valid email/i);
    await expect(errorText).toBeInTheDocument();

    // Type valid email
    await userEvent.clear(input);
    await userEvent.type(input, "test@example.com");

    // Verify error disappears (or doesn't appear)
    const errorAfter = canvas.queryByText(/please enter a valid email/i);
    if (errorAfter) {
      await expect(errorAfter).not.toBeInTheDocument();
    }
  },
};
