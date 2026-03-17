import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InputOTP } from "./InputOTP";

const meta = {
  title: "Components/Forms/InputOTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    maxLength: {
      control: "number",
      description: "Number of OTP slots",
    },
    type: {
      control: "select",
      options: ["numeric", "alphanumeric"],
      description: "Input type",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Slot size",
    },
    disabled: {
      control: "boolean",
      description: "Disable the input",
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const FourDigit: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={4}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
        <InputOTP.Slot index={3} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const Alphanumeric: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6} type="alphanumeric">
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const SmallSize: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6} size="sm">
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const LargeSize: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6} size="lg">
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const Disabled: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6} disabled>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const WithDefaultValue: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6} defaultValue="123">
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};

export const Controlled: Story = {
  args: { maxLength: 6 },
  render: () => {
    const [value, setValue] = useState("");
    const [completed, setCompleted] = useState(false);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-4)",
        }}
      >
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(v) => {
            setValue(v);
            setCompleted(false);
          }}
          onComplete={() => setCompleted(true)}
        >
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>
        <p
          style={{
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Value: {value || "(empty)"}
        </p>
        {completed && (
          <p
            style={{
              fontSize: "var(--font-size-14)",
              color: "var(--status-success)",
            }}
          >
            Code complete!
          </p>
        )}
      </div>
    );
  },
};

export const AllSizes: Story = {
  args: { maxLength: 6 },
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
        alignItems: "center",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-2)",
            textAlign: "center",
          }}
        >
          Small
        </p>
        <InputOTP maxLength={4} size="sm">
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
          </InputOTP.Group>
        </InputOTP>
      </div>
      <div>
        <p
          style={{
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-2)",
            textAlign: "center",
          }}
        >
          Medium
        </p>
        <InputOTP maxLength={4} size="md">
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
          </InputOTP.Group>
        </InputOTP>
      </div>
      <div>
        <p
          style={{
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
            marginBottom: "var(--spacing-2)",
            textAlign: "center",
          }}
        >
          Large
        </p>
        <InputOTP maxLength={4} size="lg">
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
            <InputOTP.Slot index={3} />
          </InputOTP.Group>
        </InputOTP>
      </div>
    </div>
  ),
};

export const VerificationForm: Story = {
  args: { maxLength: 6 },
  render: () => {
    const [value, setValue] = useState("");
    const [status, setStatus] = useState<
      "idle" | "verifying" | "success" | "error"
    >("idle");

    const handleComplete = (code: string) => {
      setStatus("verifying");
      // Simulate verification
      setTimeout(() => {
        setStatus(code === "123456" ? "success" : "error");
      }, 1500);
    };

    return (
      <div
        style={{
          width: "400px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-container)",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--spacing-6)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h3
            style={{
              fontSize: "var(--font-size-18)",
              fontWeight: "var(--font-weight-medium)",
              marginBottom: "var(--spacing-2)",
            }}
          >
            Enter verification code
          </h3>
          <p
            style={{
              fontSize: "var(--font-size-14)",
              color: "var(--text-secondary)",
            }}
          >
            We sent a 6-digit code to your email
          </p>
        </div>

        <InputOTP
          maxLength={6}
          value={value}
          onChange={(v) => {
            setValue(v);
            setStatus("idle");
          }}
          onComplete={handleComplete}
          disabled={status === "verifying"}
        >
          <InputOTP.Group>
            <InputOTP.Slot index={0} />
            <InputOTP.Slot index={1} />
            <InputOTP.Slot index={2} />
          </InputOTP.Group>
          <InputOTP.Separator />
          <InputOTP.Group>
            <InputOTP.Slot index={3} />
            <InputOTP.Slot index={4} />
            <InputOTP.Slot index={5} />
          </InputOTP.Group>
        </InputOTP>

        {status === "verifying" && (
          <p
            style={{
              fontSize: "var(--font-size-14)",
              color: "var(--text-secondary)",
            }}
          >
            Verifying...
          </p>
        )}
        {status === "success" && (
          <p
            style={{
              fontSize: "var(--font-size-14)",
              color: "var(--status-success)",
            }}
          >
            Verified successfully!
          </p>
        )}
        {status === "error" && (
          <p
            style={{
              fontSize: "var(--font-size-14)",
              color: "var(--status-error)",
            }}
          >
            Invalid code. Try 123456.
          </p>
        )}

        <p
          style={{
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
          }}
        >
          Didn't receive the code?{" "}
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-brand)",
              cursor: "pointer",
              font: "inherit",
            }}
            onClick={() => {
              setValue("");
              setStatus("idle");
            }}
          >
            Resend
          </button>
        </p>
      </div>
    );
  },
};

export const CustomSeparator: Story = {
  args: { maxLength: 6 },
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
      </InputOTP.Group>
      <InputOTP.Separator>
        <span
          style={{
            fontSize: "var(--font-size-18)",
            color: "var(--text-tertiary)",
          }}
        >
          /
        </span>
      </InputOTP.Separator>
      <InputOTP.Group>
        <InputOTP.Slot index={2} />
        <InputOTP.Slot index={3} />
      </InputOTP.Group>
      <InputOTP.Separator>
        <span
          style={{
            fontSize: "var(--font-size-18)",
            color: "var(--text-tertiary)",
          }}
        >
          /
        </span>
      </InputOTP.Separator>
      <InputOTP.Group>
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  ),
};
