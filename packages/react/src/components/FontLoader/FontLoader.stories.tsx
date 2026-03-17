import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FontLoader } from "./FontLoader";

const meta = {
  title: "Components/Utilities/FontLoader",
  component: FontLoader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FontLoader automatically injects Google Fonts into the document. Since v1.1.4, ThemeProvider includes FontLoader automatically. Use this component only for standalone font loading or custom callbacks.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showLoadingState: {
      control: "boolean",
      description: "Show loading state while fonts are loading",
    },
  },
} satisfies Meta<typeof FontLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic FontLoader usage
 */
export const Default: Story = {
  args: {
    showLoadingState: false,
    children: (
      <div
        style={{
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-container)",
          background: "var(--surface-subtle)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-16)",
            fontFamily: "var(--font-primary)",
            margin: "var(--spacing-4) 0",
          }}
        >
          Fonts are loaded using Libre Baskerville
        </p>
        <p
          style={{
            fontSize: "var(--font-size-14)",
            fontFamily: "var(--font-secondary)",
            margin: "var(--spacing-4) 0",
            color: "var(--text-secondary)",
          }}
        >
          This text uses DM Sans
        </p>
        <p
          style={{
            fontSize: "var(--font-size-13)",
            fontFamily: "var(--font-mono)",
            margin: "var(--spacing-4) 0",
            color: "var(--text-secondary)",
          }}
        >
          This text uses JetBrains Mono
        </p>
      </div>
    ),
  },
};

/**
 * FontLoader with loading state
 */
export const WithLoadingState: Story = {
  args: {
    showLoadingState: true,
    loadingComponent: (
      <div
        style={{
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-container)",
          background: "var(--surface-subtle)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-16)",
            margin: "var(--spacing-4) 0",
            color: "var(--text-secondary)",
          }}
        >
          Loading fonts...
        </p>
        <div
          style={{
            width: "40px",
            height: "4px",
            background: "var(--surface-layer)",
            borderRadius: "var(--radius-full)",
            margin: "var(--spacing-4) auto",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "var(--interactive-primary)",
              borderRadius: "var(--radius-full)",
              animation: "pulse 1.5s ease-in-out infinite",
              width: "30%",
            }}
          />
        </div>
      </div>
    ),
    children: (
      <div
        style={{
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-container)",
          background: "var(--surface-subtle)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-16)",
            fontFamily: "var(--font-primary)",
            margin: "var(--spacing-4) 0",
          }}
        >
          Fonts loaded!
        </p>
      </div>
    ),
  },
};

/**
 * FontLoader with callbacks
 */
export const WithCallbacks: Story = {
  render: () => {
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState<string | null>(null);

    const handleLoad = () => {
      setStatus("loaded");
      setError(null);
    };

    const handleError = (err: Error) => {
      setStatus("error");
      setError(err.message);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
          maxWidth: "500px",
        }}
      >
        <FontLoader onLoad={handleLoad} onError={handleError}>
          <div
            style={{
              padding: "var(--spacing-6)",
              borderRadius: "var(--radius-container)",
              background: "var(--surface-subtle)",
            }}
          >
            <p
              style={{
                fontSize: "var(--font-size-14)",
                fontFamily: "var(--font-secondary)",
                margin: 0,
                marginBottom: "var(--spacing-3)",
              }}
            >
              FontLoader is working in the background.
            </p>
            <p
              style={{
                fontSize: "var(--font-size-12)",
                color: "var(--text-secondary)",
                margin: 0,
              }}
            >
              Check the status panel below.
            </p>
          </div>
        </FontLoader>

        <div
          style={{
            padding: "var(--spacing-4)",
            borderRadius: "var(--radius-sm)",
            background: "var(--surface-layer)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--spacing-2)",
              alignItems: "center",
              marginBottom: "var(--spacing-2)",
            }}
          >
            <span
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background:
                  status === "loaded"
                    ? "var(--semantic-success)"
                    : status === "error"
                      ? "var(--semantic-danger)"
                      : "var(--text-secondary)",
              }}
            />
            <span style={{ fontSize: "var(--font-size-14)", fontWeight: "500" }}>
              Status: {status}
            </span>
          </div>
          {error && (
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-12)",
                color: "var(--text-danger)",
              }}
            >
              Error: {error}
            </p>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Typography demo with all fonts
 */
export const TypographyDemo: Story = {
  render: () => (
    <div
      style={{
        padding: "var(--spacing-8)",
        borderRadius: "var(--radius-container)",
        background: "var(--surface-subtle)",
        maxWidth: "600px",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--font-size-24)",
          margin: "0 0 var(--spacing-4) 0",
        }}
      >
        Typography Demo
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        <div>
          <p
            style={{
              fontSize: "var(--font-size-12)",
              color: "var(--text-secondary)",
              margin: "0 0 var(--spacing-2) 0",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Heading (Libre Baskerville)
          </p>
          <h3
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--font-size-20)",
              margin: 0,
            }}
          >
            The Quick Brown Fox Jumps Over the Lazy Dog
          </h3>
        </div>

        <div>
          <p
            style={{
              fontSize: "var(--font-size-12)",
              color: "var(--text-secondary)",
              margin: "0 0 var(--spacing-2) 0",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Body Text (DM Sans)
          </p>
          <p
            style={{
              fontFamily: "var(--font-secondary)",
              fontSize: "var(--font-size-14)",
              margin: 0,
              lineHeight: "1.6",
              color: "var(--text-primary)",
            }}
          >
            This is body text using DM Sans. FontLoader automatically loads all required
            fonts from Google Fonts when the component mounts.
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: "var(--font-size-12)",
              color: "var(--text-secondary)",
              margin: "0 0 var(--spacing-2) 0",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Code (JetBrains Mono)
          </p>
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--font-size-13)",
              background: "var(--surface-layer)",
              padding: "var(--spacing-2) var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              display: "inline-block",
              color: "var(--text-primary)",
            }}
          >
            const fonts = ['Libre Baskerville', 'DM Sans', 'JetBrains Mono'];
          </code>
        </div>
      </div>
    </div>
  ),
};
