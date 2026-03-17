import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Forms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Textarea size",
    },
    resize: {
      control: "select",
      options: ["none", "vertical", "horizontal", "both"],
      description: "Resize behavior",
    },
    label: {
      control: "text",
      description: "Textarea label",
    },
    helperText: {
      control: "text",
      description: "Helper text below textarea",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    showCounter: {
      control: "boolean",
      description: "Show character counter",
    },
    maxLength: {
      control: "number",
      description: "Maximum character length",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
    },
    disabled: {
      control: "boolean",
      description: "Disable textarea",
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Description",
    placeholder: "Enter your description...",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Comments",
    placeholder: "Add your comments...",
    helperText: "Please provide detailed feedback",
  },
};

export const WithError: Story = {
  args: {
    label: "Required Field",
    placeholder: "Enter text...",
    error: "This field is required",
  },
};

export const WithCharacterCounter: Story = {
  args: {
    label: "Bio",
    placeholder: "Tell us about yourself...",
    maxLength: 500,
    showCounter: true,
    helperText: "Maximum 500 characters",
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small Textarea",
    placeholder: "Enter text...",
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large Textarea",
    placeholder: "Enter text...",
    size: "lg",
  },
};

export const ResizeNone: Story = {
  args: {
    label: "No Resize",
    placeholder: "This textarea cannot be resized",
    resize: "none",
  },
};

export const ResizeHorizontal: Story = {
  args: {
    label: "Horizontal Resize",
    placeholder: "Drag the corner to resize horizontally",
    resize: "horizontal",
  },
};

export const ResizeBoth: Story = {
  args: {
    label: "Resize Both",
    placeholder: "Drag the corner to resize in any direction",
    resize: "both",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Cannot edit this",
    disabled: true,
    value: "This textarea is disabled",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Message",
    defaultValue: "This is the initial content",
  },
};

export const WithRows: Story = {
  args: {
    label: "Tall Textarea",
    placeholder: "Lots of space to write...",
    rows: 10,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div style={{ width: "500px" }}>
        <Textarea
          label="Your Message"
          placeholder="Type your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={200}
          showCounter
          helperText="Maximum 200 characters"
        />
        <div
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          <strong>Preview:</strong>
          <div
            style={{
              marginTop: "var(--spacing-2)",
              padding: "var(--spacing-4)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface-subtle)",
              minHeight: "60px",
            }}
          >
            {value || <em>Your message will appear here...</em>}
          </div>
        </div>
      </div>
    );
  },
};

export const CommentForm: Story = {
  render: () => {
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
      if (comment.trim()) {
        setSubmitted(true);
        setTimeout(() => {
          setComment("");
          setSubmitted(false);
        }, 2000);
      }
    };

    return (
      <div
        style={{
          width: "600px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
          background: "var(--surface-base)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-6)",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Leave a Comment
        </h3>
        <Textarea
          label="Your Comment"
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          showCounter
          rows={6}
        />
        <div
          style={{
            marginTop: "var(--spacing-4)",
            display: "flex",
            gap: "var(--spacing-3)",
          }}
        >
          <button
            onClick={handleSubmit}
            disabled={!comment.trim()}
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: comment.trim()
                ? "var(--interactive-primary)"
                : "var(--border-subtle)",
              color: comment.trim()
                ? "var(--interactive-primary-text)"
                : "var(--text-tertiary)",
              fontSize: "var(--font-size-14)",
              fontWeight: "var(--font-weight-medium)",
              cursor: comment.trim() ? "pointer" : "not-allowed",
            }}
          >
            Submit
          </button>
          <button
            onClick={() => setComment("")}
            style={{
              padding: "var(--spacing-3) var(--spacing-6)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              background: "var(--surface-base)",
              color: "var(--text-primary)",
              fontSize: "var(--font-size-14)",
              fontWeight: "var(--font-weight-medium)",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
        {submitted && (
          <div
            style={{
              marginTop: "var(--spacing-4)",
              padding: "var(--spacing-4)",
              borderRadius: "var(--radius-sm)",
              background: "var(--soft-success)",
              color: "var(--status-success)",
              fontSize: "var(--font-size-14)",
            }}
          >
            ✓ Comment submitted successfully!
          </div>
        )}
      </div>
    );
  },
};

export const FeedbackForm: Story = {
  render: () => {
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
      if (!feedback.trim()) {
        setError("Please provide your feedback");
      } else if (feedback.length < 10) {
        setError("Feedback must be at least 10 characters");
      } else {
        setError("");
        alert("Feedback submitted!");
      }
    };

    return (
      <div
        style={{
          width: "500px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Product Feedback
        </h3>
        <p
          style={{
            marginBottom: "var(--spacing-8)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Help us improve by sharing your thoughts
        </p>
        <Textarea
          label="Your Feedback"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            setError("");
          }}
          error={error}
          maxLength={500}
          showCounter
          rows={6}
        />
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "var(--spacing-4)",
            padding: "var(--spacing-3) var(--spacing-6)",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "var(--interactive-primary)",
            color: "var(--interactive-primary-text)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        width: "500px",
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
        <Textarea
          label="Small Textarea"
          size="sm"
          placeholder="Small size..."
        />
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
        <Textarea
          label="Medium Textarea"
          size="md"
          placeholder="Medium size..."
        />
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
        <Textarea
          label="Large Textarea"
          size="lg"
          placeholder="Large size..."
        />
      </div>
    </div>
  ),
};

export const AllResizeBehaviors: Story = {
  render: () => (
    <div
      style={{
        width: "500px",
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
          None
        </p>
        <Textarea
          label="No Resize"
          resize="none"
          placeholder="Cannot be resized"
        />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Vertical (Default)
        </p>
        <Textarea
          label="Vertical Resize"
          resize="vertical"
          placeholder="Resize vertically"
        />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Horizontal
        </p>
        <Textarea
          label="Horizontal Resize"
          resize="horizontal"
          placeholder="Resize horizontally"
        />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Both
        </p>
        <Textarea
          label="Both Resize"
          resize="both"
          placeholder="Resize in any direction"
        />
      </div>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <Textarea label="Default" placeholder="Enter text..." />
      <Textarea
        label="With value"
        value="This textarea has initial content"
        onChange={() => {}}
      />
      <Textarea label="With helper text" helperText="Additional information" />
      <Textarea label="With error" error="This field is required" />
      <Textarea label="Disabled" disabled value="Cannot be edited" />
      <Textarea
        label="With counter"
        maxLength={100}
        showCounter
        placeholder="Type here..."
      />
    </div>
  ),
};

export const CharacterCounter: Story = {
  render: () => {
    const [text, setText] = useState("");

    return (
      <div style={{ width: "500px" }}>
        <Textarea
          label="Tweet"
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={280}
          showCounter
          helperText="Share your thoughts in 280 characters or less"
          rows={4}
        />
        <div
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-secondary)",
          }}
        >
          {text.length >= 252 && text.length < 280 && (
            <div style={{ color: "var(--status-warning)" }}>
              ⚠ Warning: Approaching character limit
            </div>
          )}
          {text.length === 280 && (
            <div style={{ color: "var(--status-error)" }}>
              ❌ Character limit reached
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const SupportTicket: Story = {
  render: () => {
    const [issue, setIssue] = useState("");
    const [priority, setPriority] = useState("medium");

    return (
      <div
        style={{
          width: "600px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-6)",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Submit Support Ticket
        </h3>
        <div style={{ marginBottom: "var(--spacing-6)" }}>
          <label
            style={{
              display: "block",
              marginBottom: "var(--spacing-2)",
              fontSize: "var(--font-size-14)",
              fontWeight: "var(--font-weight-medium)",
            }}
          >
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{
              width: "100%",
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              fontSize: "var(--font-size-14)",
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <Textarea
          label="Describe your issue"
          placeholder="Please provide as much detail as possible..."
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          maxLength={2000}
          showCounter
          rows={8}
          helperText="Include steps to reproduce, error messages, or screenshots"
        />
        <button
          style={{
            marginTop: "var(--spacing-4)",
            padding: "var(--spacing-3) var(--spacing-6)",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "var(--interactive-primary)",
            color: "var(--interactive-primary-text)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
            cursor: "pointer",
          }}
        >
          Submit Ticket
        </button>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  args: {
    label: "Custom styled textarea",
    helperText: "This textarea has custom styling",
    className: "custom-textarea",
    placeholder: "Enter text...",
  },
};
