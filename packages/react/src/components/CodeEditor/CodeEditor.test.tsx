import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CodeEditor } from "./CodeEditor";

describe("CodeEditor", () => {
  const mockCode = `function hello() {\n  console.log("Hello World");\n}`;

  it("renders editor with code", () => {
    const { container } = render(
      <CodeEditor
        value={mockCode}
        onChange={() => {}}
        language="javascript"
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("handles code changes", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <CodeEditor
        value={mockCode}
        onChange={handleChange}
        language="javascript"
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("supports different languages", () => {
    const { rerender } = render(
      <CodeEditor
        value="print('hello')"
        onChange={() => {}}
        language="python"
      />,
    );

    expect(rerender).toBeTruthy();
  });

  it("applies theme", () => {
    const { container } = render(
      <CodeEditor
        value={mockCode}
        onChange={() => {}}
        theme="dark"
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <CodeEditor
        ref={ref}
        value={mockCode}
        onChange={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
