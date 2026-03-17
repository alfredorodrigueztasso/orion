import type { TextareaHTMLAttributes } from "react";

/**
 * CodeEditor Props
 * A simple textarea-based code editor with synchronized line numbers.
 */
export interface CodeEditorProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "onChange"
> {
  /**
   * Current editor content
   */
  value?: string;

  /**
   * Callback when content changes
   */
  onChange?: (value: string) => void;

  /**
   * Language name or type (shown as a badge, informational only)
   * @default undefined
   */
  language?: string;

  /**
   * Whether the editor is read-only
   * @default false
   */
  readOnly?: boolean;

  /**
   * Whether to show line numbers on the left
   * @default true
   */
  showLineNumbers?: boolean;

  /**
   * Placeholder text when empty
   */
  placeholder?: string;

  /**
   * Minimum number of rows to display
   * @default 10
   */
  minRows?: number;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Aria label for accessibility
   */
  "aria-label"?: string;
}
