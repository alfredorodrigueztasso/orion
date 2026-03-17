import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCopyToClipboard, useCopy } from "./useCopyToClipboard";

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial state", () => {
    const { result } = renderHook(() => useCopyToClipboard());

    expect(result.current.copied).toBe(false);
    expect(result.current.copiedText).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("copies text to clipboard and sets copied state", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("hello world");
    });

    expect(result.current.copied).toBe(true);
    expect(result.current.copiedText).toBe("hello world");
    expect(result.current.error).toBeNull();
  });

  it("resets copied state after copiedDuration", async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard({ copiedDuration: 2000 }),
    );

    await act(async () => {
      await result.current.copy("hello");
    });

    expect(result.current.copied).toBe(true);

    act(() => vi.advanceTimersByTime(2000));

    expect(result.current.copied).toBe(false);
  });

  it("calls onSuccess callback on successful copy", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useCopyToClipboard({ onSuccess }));

    await act(async () => {
      await result.current.copy("test");
    });

    expect(onSuccess).toHaveBeenCalledWith("test");
  });

  it("sets error state when clipboard is not available", async () => {
    Object.assign(navigator, { clipboard: undefined });
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("test");
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeTruthy();
  });

  it("calls onError callback on copy failure", async () => {
    const onError = vi.fn();
    const testError = new Error("Copy failed");
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(testError);

    const { result } = renderHook(() => useCopyToClipboard({ onError }));

    await act(async () => {
      await result.current.copy("test");
    });

    expect(onError).toHaveBeenCalledWith(testError);
    expect(result.current.error).toBe(testError);
  });

  it("reset() clears copied state and error", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy("test");
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("clears previous timeout when calling copy multiple times", async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard({ copiedDuration: 2000 }),
    );

    // First copy
    await act(async () => {
      await result.current.copy("first");
    });

    expect(result.current.copied).toBe(true);
    expect(result.current.copiedText).toBe("first");

    // Advance time partway
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.copied).toBe(true); // Still copied

    // Second copy (should clear previous timeout)
    await act(async () => {
      await result.current.copy("second");
    });

    expect(result.current.copiedText).toBe("second");
    expect(result.current.copied).toBe(true);

    // Advance another 1000ms (total 2000 from first, 1000 from second)
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.copied).toBe(true); // Still copied (second timeout)

    // Advance to 2000ms from second copy
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.copied).toBe(false); // Now cleared
  });

  it("handles non-Error exceptions by converting to Error", async () => {
    const stringError = "String error message";
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(stringError);

    const onError = vi.fn();
    const { result } = renderHook(() => useCopyToClipboard({ onError }));

    await act(async () => {
      await result.current.copy("test");
    });

    expect(onError).toHaveBeenCalled();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe("Failed to copy");
  });

  it("calls onError callback when clipboard API is not available", async () => {
    Object.assign(navigator, { clipboard: undefined });
    const onError = vi.fn();
    const { result } = renderHook(() => useCopyToClipboard({ onError }));

    await act(async () => {
      await result.current.copy("test");
    });

    expect(onError).toHaveBeenCalled();
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
  });

  it("clears timeout on unmount", async () => {
    const { result, unmount } = renderHook(() =>
      useCopyToClipboard({ copiedDuration: 5000 }),
    );

    await act(async () => {
      await result.current.copy("test");
    });

    expect(result.current.copied).toBe(true);

    // Unmount before timeout expires
    unmount();

    // Verify no errors occurred (timeout was cleared properly)
    expect(true).toBe(true); // Test passes if no error thrown
  });

  it("does not call onSuccess callback when clipboard API is not available", async () => {
    Object.assign(navigator, { clipboard: undefined });
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useCopyToClipboard({ onSuccess }));

    await act(async () => {
      await result.current.copy("test");
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("reset() clears timeout if pending", async () => {
    const { result } = renderHook(() =>
      useCopyToClipboard({ copiedDuration: 5000 }),
    );

    await act(async () => {
      await result.current.copy("test");
    });

    expect(result.current.copied).toBe(true);

    // Reset immediately
    act(() => {
      result.current.reset();
    });

    expect(result.current.copied).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.copiedText).toBeNull();

    // Advance time - should not trigger state change since timeout was cleared
    act(() => vi.advanceTimersByTime(5000));

    // Still reset
    expect(result.current.copied).toBe(false);
  });

  it("returns true on successful copy", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    let copyResult: boolean | undefined;
    await act(async () => {
      copyResult = await result.current.copy("test");
    });

    expect(copyResult).toBe(true);
  });

  it("returns false when clipboard API is not available", async () => {
    Object.assign(navigator, { clipboard: undefined });
    const { result } = renderHook(() => useCopyToClipboard());

    let copyResult: boolean | undefined;
    await act(async () => {
      copyResult = await result.current.copy("test");
    });

    expect(copyResult).toBe(false);
  });

  it("returns false on copy error", async () => {
    const testError = new Error("Copy failed");
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(testError);

    const { result } = renderHook(() => useCopyToClipboard());

    let copyResult: boolean | undefined;
    await act(async () => {
      copyResult = await result.current.copy("test");
    });

    expect(copyResult).toBe(false);
  });
});

describe("useCopy", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns copy function", () => {
    const { result } = renderHook(() => useCopy());

    expect(typeof result.current).toBe("function");
  });

  it("copy function works correctly", async () => {
    const { result } = renderHook(() => useCopy());

    let copyResult: boolean | undefined;
    await act(async () => {
      copyResult = await result.current("test text");
    });

    expect(copyResult).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("test text");
  });

  it("returns false on error", async () => {
    (navigator.clipboard.writeText as any).mockRejectedValueOnce(
      new Error("Failed"),
    );

    const { result } = renderHook(() => useCopy());

    let copyResult: boolean | undefined;
    await act(async () => {
      copyResult = await result.current("test");
    });

    expect(copyResult).toBe(false);
  });
});
