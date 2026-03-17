import type { Meta, StoryObj } from "@storybook/react";
import { LoginTemplate } from "./LoginTemplate";

const meta = {
  title: "Templates/App/LoginTemplate",
  component: LoginTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LoginTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sign in",
    subtitle: "Welcome back to your account",
    logo: "🔐",
    onSubmit: (email, password, remember) => {
      console.log("Login:", { email, password, remember });
    },
    onSignupClick: () => console.log("Go to signup"),
    onForgotPasswordClick: () => console.log("Go to forgot password"),
  },
};

export const WithError: Story = {
  args: {
    title: "Sign in",
    subtitle: "Welcome back to your account",
    error: "Invalid email or password. Please try again.",
    onSubmit: (email, password, remember) => {
      console.log("Login:", { email, password, remember });
    },
    onSignupClick: () => console.log("Go to signup"),
    onForgotPasswordClick: () => console.log("Go to forgot password"),
  },
};

export const Loading: Story = {
  args: {
    title: "Sign in",
    subtitle: "Welcome back to your account",
    isLoading: true,
    onSubmit: (email, password, remember) => {
      console.log("Login:", { email, password, remember });
    },
    onSignupClick: () => console.log("Go to signup"),
    onForgotPasswordClick: () => console.log("Go to forgot password"),
  },
};

export const Success: Story = {
  args: {
    title: "Sign in",
    successMessage: "Login successful! Redirecting...",
    logo: "✓",
    onSubmit: (email, password, remember) => {
      console.log("Login:", { email, password, remember });
    },
  },
};

export const NoLinks: Story = {
  args: {
    title: "Sign in",
    subtitle: "Enter your credentials",
    onSubmit: (email, password, remember) => {
      console.log("Login:", { email, password, remember });
    },
  },
};
