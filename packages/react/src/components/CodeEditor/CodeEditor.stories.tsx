import type { Meta, StoryObj } from "@storybook/react";
import { CodeEditor } from "./CodeEditor";

const meta: Meta<typeof CodeEditor> = {
  title: "Components/CodeEditor",
  component: CodeEditor,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Current editor content",
    },
    language: {
      control: "text",
      description: "Language type (informational)",
    },
    readOnly: {
      control: "boolean",
      description: "Whether the editor is read-only",
    },
    showLineNumbers: {
      control: "boolean",
      description: "Whether to show line numbers",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when empty",
    },
    minRows: {
      control: "number",
      description: "Minimum number of rows to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default CodeEditor with markdown content
 */
export const Default: Story = {
  args: {
    value: `# Introduction & Scope

You are a virtual assistant designed to support users in this project.

Your purpose is to resolve questions with empathy, clarity, and patience, providing accurate information and guiding users at all times within the defined scope.

## Key Responsibilities
- Always greet in a friendly and positive way.
- Use clear, warm, and easy-to-understand language.
- Anticipate frequent doubts and offer additional information when useful.`,
    language: "markdown",
    placeholder: "Enter your code here...",
  },
};

/**
 * Empty CodeEditor
 */
export const Empty: Story = {
  args: {
    value: "",
    placeholder: "Start typing...",
  },
};

/**
 * CodeEditor with custom language
 */
export const JavaScript: Story = {
  args: {
    value: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test
console.log(fibonacci(10)); // 55`,
    language: "javascript",
  },
};

/**
 * CodeEditor in read-only mode
 */
export const ReadOnly: Story = {
  args: {
    value: `# This is read-only content

You cannot edit this text. It's displayed for reference only.`,
    readOnly: true,
    language: "markdown",
  },
};

/**
 * CodeEditor without line numbers
 */
export const NoLineNumbers: Story = {
  args: {
    value: `Line 1
Line 2
Line 3`,
    showLineNumbers: false,
  },
};

/**
 * CodeEditor with minimal rows
 */
export const MinimalHeight: Story = {
  args: {
    value: "Hello",
    minRows: 3,
  },
};

/**
 * CodeEditor with many lines (test scroll sync)
 */
export const ManyLines: Story = {
  args: {
    value: Array.from({ length: 50 })
      .map((_, i) => `Line ${i + 1}`)
      .join("\n"),
    language: "text",
    minRows: 15,
  },
};
