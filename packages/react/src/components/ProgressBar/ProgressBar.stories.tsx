import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";
import { Card } from "../Card";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Feedback/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value",
    },
    max: {
      control: "number",
      description: "Maximum value (defaults to 100)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Progress bar size",
    },
    variant: {
      control: "select",
      options: ["primary", "success", "warning", "error", "info"],
      description: "Progress bar color variant",
    },
    showLabel: {
      control: "boolean",
      description: "Show percentage label",
    },
    label: {
      control: "text",
      description: "Custom label text",
    },
    indeterminate: {
      control: "boolean",
      description: "Show indeterminate loading state",
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const WithLabel: Story = {
  args: {
    value: 65,
    showLabel: true,
  },
};

export const CustomLabel: Story = {
  args: {
    value: 75,
    label: "Uploading files...",
    showLabel: true,
  },
};

export const PrimaryVariant: Story = {
  args: {
    value: 60,
    variant: "primary",
    showLabel: true,
  },
};

export const SuccessVariant: Story = {
  args: {
    value: 100,
    variant: "success",
    showLabel: true,
    label: "Upload complete",
  },
};

export const WarningVariant: Story = {
  args: {
    value: 45,
    variant: "warning",
    showLabel: true,
    label: "Limited storage",
  },
};

export const ErrorVariant: Story = {
  args: {
    value: 20,
    variant: "error",
    showLabel: true,
    label: "Upload failed",
  },
};

export const InfoVariant: Story = {
  args: {
    value: 80,
    variant: "info",
    showLabel: true,
    label: "Processing...",
  },
};

export const SmallSize: Story = {
  args: {
    value: 70,
    size: "sm",
    showLabel: true,
  },
};

export const MediumSize: Story = {
  args: {
    value: 70,
    size: "md",
    showLabel: true,
  },
};

export const LargeSize: Story = {
  args: {
    value: 70,
    size: "lg",
    showLabel: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: "Loading...",
  },
};

export const CustomMaxValue: Story = {
  args: {
    value: 25,
    max: 50,
    showLabel: true,
    label: "Step 25 of 50",
  },
};

export const ZeroPercent: Story = {
  args: {
    value: 0,
    showLabel: true,
    label: "Starting...",
  },
};

export const HundredPercent: Story = {
  args: {
    value: 100,
    variant: "success",
    showLabel: true,
    label: "Complete!",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Small
        </p>
        <ProgressBar value={70} size="sm" showLabel />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Medium (Default)
        </p>
        <ProgressBar value={70} size="md" showLabel />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Large
        </p>
        <ProgressBar value={70} size="lg" showLabel />
      </div>
    </div>
  ),
};

export const UploadProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
      if (progress < 100) {
        const timer = setTimeout(() => {
          setProgress((prev) => Math.min(prev + 10, 100));
        }, 500);
        return () => clearTimeout(timer);
      } else {
        setIsComplete(true);
      }
    }, [progress]);

    return (
      <div style={{ width: "400px" }}>
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          File Upload
        </h3>
        <ProgressBar
          value={progress}
          variant={isComplete ? "success" : "primary"}
          showLabel
          label={isComplete ? "Upload complete!" : "Uploading file..."}
          size="lg"
        />
        <button
          onClick={() => {
            setProgress(0);
            setIsComplete(false);
          }}
          style={{
            marginTop: "var(--spacing-4)",
            padding: "var(--spacing-2) var(--spacing-4)",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-subtle)",
            background: "var(--surface-base)",
            cursor: "pointer",
            fontSize: "var(--font-size-14)",
          }}
        >
          Reset
        </button>
      </div>
    );
  },
};

export const MultipleProgress: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <div>
        <ProgressBar
          value={100}
          variant="success"
          showLabel
          label="Step 1: Data validation"
        />
      </div>
      <div>
        <ProgressBar
          value={100}
          variant="success"
          showLabel
          label="Step 2: Processing files"
        />
      </div>
      <div>
        <ProgressBar
          value={65}
          variant="primary"
          showLabel
          label="Step 3: Uploading assets"
        />
      </div>
      <div>
        <ProgressBar value={0} showLabel label="Step 4: Final review" />
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Determinate Loading
        </p>
        <ProgressBar
          value={73}
          variant="info"
          showLabel
          label="Loading data..."
        />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Indeterminate Loading
        </p>
        <ProgressBar indeterminate variant="info" label="Please wait..." />
      </div>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <Card style={{ width: "400px" }}>
      <Card.Body>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-4)",
            marginBottom: "var(--spacing-4)",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--radius-sm)",
              background:
                "linear-gradient(135deg, var(--color-brand-400) 0%, var(--color-brand-600) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "var(--font-size-20)",
            }}
          />
          <div style={{ flex: 1 }}>
            <h4
              style={{
                margin: 0,
                fontSize: "var(--font-size-16)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              document.pdf
            </h4>
            <p
              style={{
                margin: "var(--spacing-1) 0 0 0",
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              2.5 MB
            </p>
          </div>
        </div>
        <ProgressBar
          value={68}
          variant="primary"
          showLabel
          label="Uploading..."
          size="lg"
        />
      </Card.Body>
    </Card>
  ),
};

export const DownloadQueue: Story = {
  render: () => (
    <Card style={{ width: "450px" }}>
      <Card.Header>Download Queue</Card.Header>
      <Card.Body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-6)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "var(--spacing-2)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--font-size-14)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                image-001.jpg
              </span>
              <span
                style={{
                  fontSize: "var(--font-size-14)",
                  color: "var(--text-secondary)",
                }}
              >
                1.2 MB
              </span>
            </div>
            <ProgressBar value={100} variant="success" showLabel size="sm" />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "var(--spacing-2)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--font-size-14)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                video-demo.mp4
              </span>
              <span
                style={{
                  fontSize: "var(--font-size-14)",
                  color: "var(--text-secondary)",
                }}
              >
                45.8 MB
              </span>
            </div>
            <ProgressBar value={42} variant="primary" showLabel size="sm" />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "var(--spacing-2)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--font-size-14)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                presentation.pptx
              </span>
              <span
                style={{
                  fontSize: "var(--font-size-14)",
                  color: "var(--text-secondary)",
                }}
              >
                8.5 MB
              </span>
            </div>
            <ProgressBar value={0} showLabel size="sm" />
          </div>
        </div>
      </Card.Body>
    </Card>
  ),
};

export const WithCustomStyling: Story = {
  args: {
    value: 75,
    variant: "success",
    showLabel: true,
    label: "Custom styled progress",
    className: "custom-progress",
    style: {
      width: "400px",
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Primary
        </p>
        <ProgressBar value={60} variant="primary" showLabel />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Success
        </p>
        <ProgressBar value={100} variant="success" showLabel />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Warning
        </p>
        <ProgressBar value={45} variant="warning" showLabel />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Error
        </p>
        <ProgressBar value={20} variant="error" showLabel />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Info
        </p>
        <ProgressBar value={80} variant="info" showLabel />
      </div>
    </div>
  ),
};
