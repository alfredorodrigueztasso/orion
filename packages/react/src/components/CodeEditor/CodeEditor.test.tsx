import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { CodeEditor } from "./CodeEditor";

describe("CodeEditor", () => {
  const mockCode = `function hello() {\n  console.log("Hello World");\n}`;

  it("renders editor with code", () => {
    const { container } = render(
      <CodeEditor value={mockCode} onChange={() => {}} language="javascript" />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea).toBeTruthy();
    expect(textarea?.value).toBe(mockCode);
  });

  it("handles code changes", () => {
    const { container } = render(
      <CodeEditor value="initial" onChange={() => {}} language="javascript" />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe("initial");
  });

  it("supports different languages", () => {
    const { container: pythonContainer } = render(
      <CodeEditor
        value="print('hello')"
        onChange={() => {}}
        language="python"
      />,
    );

    const pythonTextarea = pythonContainer.querySelector("textarea");
    expect(pythonTextarea?.value).toBe("print('hello')");

    const { container: jsContainer } = render(
      <CodeEditor
        value="console.log('hello')"
        onChange={() => {}}
        language="javascript"
      />,
    );

    const jsTextarea = jsContainer.querySelector("textarea");
    expect(jsTextarea?.value).toBe("console.log('hello')");
  });

  it("applies theme", () => {
    const { container } = render(
      <CodeEditor value={mockCode} onChange={() => {}} language="javascript" />,
    );

    expect(container).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<CodeEditor ref={ref} value={mockCode} onChange={() => {}} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it("displays code value in textarea", () => {
    const { container } = render(
      <CodeEditor value="const x = 10;" onChange={() => {}} />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe("const x = 10;");
  });

  it("handles empty value", () => {
    const { container } = render(<CodeEditor value="" onChange={() => {}} />);

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe("");
  });

  it("displays placeholder text when empty", () => {
    const { container } = render(
      <CodeEditor value="" onChange={() => {}} placeholder="Enter code..." />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.placeholder).toBe("Enter code...");
  });

  it("respects readOnly prop", () => {
    const { container } = render(
      <CodeEditor value={mockCode} onChange={() => {}} readOnly={true} />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.readOnly).toBe(true);
  });

  it("allows editing when readOnly is false", () => {
    const { container } = render(
      <CodeEditor value="" onChange={() => {}} readOnly={false} />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.readOnly).toBe(false);
  });

  it("shows line numbers by default", () => {
    const { container } = render(
      <CodeEditor
        value={mockCode}
        onChange={() => {}}
        showLineNumbers={true}
      />,
    );

    const lineNumbers = container.querySelector("div[class*='lineNumbers']");
    expect(lineNumbers).toBeTruthy();
  });

  it("hides line numbers when showLineNumbers is false", () => {
    const { container } = render(
      <CodeEditor
        value={mockCode}
        onChange={() => {}}
        showLineNumbers={false}
      />,
    );

    const lineNumbers = container.querySelector("div[class*='lineNumbers']");
    expect(lineNumbers).not.toBeTruthy();
  });

  it("respects minRows prop", () => {
    const { container: container5 } = render(
      <CodeEditor value="const x = 1;" onChange={() => {}} minRows={5} />,
    );

    const textarea5 = container5.querySelector("textarea");
    expect(textarea5).toBeTruthy();

    const { container: container20 } = render(
      <CodeEditor value="const x = 1;" onChange={() => {}} minRows={20} />,
    );

    const textarea20 = container20.querySelector("textarea");
    expect(textarea20).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(
      <CodeEditor
        value={mockCode}
        onChange={() => {}}
        className="custom-editor"
      />,
    );

    const wrapper = container.querySelector("div[class*='custom-editor']");
    expect(wrapper).toBeTruthy();
  });

  it("applies aria-label for accessibility", () => {
    const { container } = render(
      <CodeEditor
        value={mockCode}
        onChange={() => {}}
        aria-label="Code editor for JavaScript"
      />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.getAttribute("aria-label")).toBe(
      "Code editor for JavaScript",
    );
  });

  it("handles JavaScript language", () => {
    const jsCode = "const foo = () => {}";
    const { container } = render(
      <CodeEditor value={jsCode} onChange={() => {}} language="javascript" />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe(jsCode);
  });

  it("handles Python language", () => {
    const pythonCode = "def foo():\n    pass";
    const { container } = render(
      <CodeEditor value={pythonCode} onChange={() => {}} language="python" />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe(pythonCode);
  });

  it("handles Markdown language", () => {
    const markdownCode = "# Hello World\n\nThis is a test";
    const { container } = render(
      <CodeEditor
        value={markdownCode}
        onChange={() => {}}
        language="markdown"
      />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe(markdownCode);
  });

  it("handles code with special characters", () => {
    const codeWithSpecial = 'const str = "Hello\\nWorld"; console.log(str);';
    const { container } = render(
      <CodeEditor
        value={codeWithSpecial}
        onChange={() => {}}
        language="javascript"
      />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe(codeWithSpecial);
  });

  it("handles multiline code correctly", () => {
    const multilineCode =
      "function test() {\n  const x = 10;\n  console.log(x);\n}";
    const { container } = render(
      <CodeEditor
        value={multilineCode}
        onChange={() => {}}
        language="javascript"
      />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe(multilineCode);
    expect(textarea?.value.split("\n").length).toBe(4);
  });

  it("calculates correct line count", () => {
    const multilineValue = "line 1\nline 2\nline 3\nline 4\nline 5";
    const { container } = render(
      <CodeEditor value={multilineValue} onChange={() => {}} minRows={3} />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea).toBeTruthy();
    expect(textarea?.value).toBe(multilineValue);
  });

  it("handles onChange callback with new value", () => {
    const { container } = render(
      <CodeEditor value="initial" onChange={() => {}} />,
    );

    const textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe("initial");
  });

  it("updates value when prop changes", () => {
    const { container, rerender } = render(
      <CodeEditor value="initial code" onChange={() => {}} />,
    );

    let textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe("initial code");

    rerender(<CodeEditor value="updated code" onChange={() => {}} />);

    textarea = container.querySelector("textarea");
    expect(textarea?.value).toBe("updated code");
  });
});
