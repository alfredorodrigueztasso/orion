import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { useChatInput } from "./useChatInput";

describe("useChatInput", () => {
  beforeEach(() => {
    // Setup if needed
  });

  it("returns initial state", () => {
    const { result } = renderHook(() => useChatInput());

    expect(result.current.value).toBe("");
    expect(result.current.attachments).toEqual([]);
    expect(result.current.isEmpty).toBe(true);
    expect(result.current.charCount).toBe(0);
  });

  it("updates value with setValue", () => {
    const { result } = renderHook(() => useChatInput());

    act(() => {
      result.current.setValue("Hello");
    });

    expect(result.current.value).toBe("Hello");
    expect(result.current.isEmpty).toBe(false);
    expect(result.current.charCount).toBe(5);
  });

  it("respects maxLength option", () => {
    const { result } = renderHook(() => useChatInput({ maxLength: 10 }));

    act(() => {
      result.current.setValue("Hello world this is long");
    });

    expect(result.current.isOverLimit).toBe(true);
  });

  it("does not submit when disabled", () => {
    const onSend = vi.fn();
    const { result } = renderHook(() =>
      useChatInput({ disabled: true, onSend }),
    );

    act(() => {
      result.current.setValue("Hello");
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("does not submit when empty", () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useChatInput({ onSend }));

    act(() => {
      result.current.handleSubmit();
    });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("does not submit when over limit", () => {
    const onSend = vi.fn();
    const { result } = renderHook(() =>
      useChatInput({ maxLength: 10, onSend }),
    );

    act(() => {
      result.current.setValue("This is way too long");
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(onSend).not.toHaveBeenCalled();
  });

  it("submits with value and attachments", () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useChatInput({ onSend }));

    const file = new File(["content"], "test.txt");

    act(() => {
      result.current.setValue("Hello");
    });

    act(() => {
      result.current.addAttachments([file]);
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(onSend).toHaveBeenCalledWith("Hello", [file]);
  });

  it("clears value and attachments after submit", () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useChatInput({ onSend }));

    const file = new File(["content"], "test.txt");

    act(() => {
      result.current.setValue("Hello");
      result.current.addAttachments([file]);
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(result.current.value).toBe("");
    expect(result.current.attachments).toEqual([]);
  });

  it("adds and removes attachments", () => {
    const { result } = renderHook(() => useChatInput());

    const file1 = new File(["content"], "file1.txt");
    const file2 = new File(["content"], "file2.txt");

    act(() => {
      result.current.addAttachments([file1, file2]);
    });

    expect(result.current.attachments).toHaveLength(2);

    act(() => {
      result.current.removeAttachment(0);
    });

    expect(result.current.attachments).toHaveLength(1);
    expect(result.current.attachments[0]).toBe(file2);
  });

  it("clears all attachments", () => {
    const { result } = renderHook(() => useChatInput());

    const file1 = new File(["content"], "file1.txt");
    const file2 = new File(["content"], "file2.txt");

    act(() => {
      result.current.addAttachments([file1, file2]);
    });

    act(() => {
      result.current.clearAttachments();
    });

    expect(result.current.attachments).toEqual([]);
  });

  it("handles Enter key for submit", () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useChatInput({ onSend }));

    act(() => {
      result.current.setValue("Hello");
    });

    act(() => {
      result.current.handleKeyDown({
        key: "Enter",
        shiftKey: false,
        preventDefault: vi.fn(),
      } as any);
    });

    expect(onSend).toHaveBeenCalledWith("Hello", undefined);
  });

  it("allows newline with Shift+Enter", () => {
    const onSend = vi.fn();
    const { result } = renderHook(() => useChatInput({ onSend }));

    const preventDefault = vi.fn();

    act(() => {
      result.current.handleKeyDown({
        key: "Enter",
        shiftKey: true,
        preventDefault,
      } as any);
    });

    expect(preventDefault).not.toHaveBeenCalled();
    expect(onSend).not.toHaveBeenCalled();
  });
});
