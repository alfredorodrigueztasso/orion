import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDebounce, useDebouncedCallback } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 500));
    expect(result.current).toBe("hello");
  });

  it("delays value update until delay has elapsed", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 500 } },
    );

    expect(result.current).toBe("hello");

    rerender({ value: "world", delay: 500 });
    expect(result.current).toBe("hello");

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("world");
  });

  it("only applies the last value when changed multiple times rapidly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );

    rerender({ value: "b", delay: 500 });
    rerender({ value: "c", delay: 500 });
    rerender({ value: "d", delay: 500 });

    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe("d");
  });

  it("works with different delay values", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "hello", delay: 200 } },
    );

    rerender({ value: "world", delay: 200 });

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("world");
  });

  it("useDebouncedCallback returns object with callback and controls", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    expect(typeof result.current).toBe("object");
    expect(typeof result.current.callback).toBe("function");
    expect(typeof result.current.cancel).toBe("function");
    expect(typeof result.current.flush).toBe("function");
    expect(typeof result.current.isPending).toBe("function");
  });

  it("useDebouncedCallback invokes callback after delay", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current.callback("test");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(500));

    expect(callback).toHaveBeenCalledWith("test");
  });

  it("useDebouncedCallback respects leading option", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 500, { leading: true }),
    );

    act(() => {
      result.current.callback("test");
    });

    // With leading: true, callback should be called immediately
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("useDebouncedCallback respects trailing option", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 500, { trailing: false }),
    );

    act(() => {
      result.current.callback("test");
    });

    act(() => vi.advanceTimersByTime(500));

    // With trailing: false, callback should not be called on trailing edge
    expect(callback).not.toHaveBeenCalled();
  });

  it("useDebouncedCallback flush invokes pending callback immediately", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current.callback("test");
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      result.current.flush();
    });

    expect(callback).toHaveBeenCalledWith("test");
  });

  it("useDebouncedCallback cancel prevents invocation", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current.callback("test");
    });

    act(() => {
      result.current.cancel();
    });

    act(() => vi.advanceTimersByTime(500));

    expect(callback).not.toHaveBeenCalled();
  });

  it("useDebouncedCallback isPending returns correct status", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    expect(result.current.isPending()).toBe(false);

    act(() => {
      result.current.callback("test");
    });

    expect(result.current.isPending()).toBe(true);

    act(() => vi.advanceTimersByTime(500));

    expect(result.current.isPending()).toBe(false);
  });

  it("useDebouncedCallback maxWait ensures callback is called after max time", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 500, { maxWait: 1000 }),
    );

    act(() => {
      result.current.callback("test");
    });

    act(() => vi.advanceTimersByTime(1000));

    // Should be called due to maxWait
    expect(callback).toHaveBeenCalledWith("test");
  });

  it("useDebouncedCallback handles multiple calls", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebouncedCallback(callback, 500));

    act(() => {
      result.current.callback("first");
      vi.advanceTimersByTime(300);
      result.current.callback("second");
      vi.advanceTimersByTime(300);
      result.current.callback("third");
      vi.advanceTimersByTime(500);
    });

    // Only the last call should be invoked
    expect(callback).toHaveBeenCalledWith("third");
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
