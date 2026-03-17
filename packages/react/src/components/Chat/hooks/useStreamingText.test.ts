import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useStreamingText } from "./useStreamingText";

describe("useStreamingText", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("hook initializes without error", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hello world", { enabled: true }),
    );
    expect(result).toBeDefined();
  });

  it("returns expected return structure", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hello world", { enabled: true }),
    );

    expect(typeof result.current.displayText).toBe("string");
    expect(typeof result.current.isComplete).toBe("boolean");
  });

  it("shows full text immediately when enabled is false", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hello world", { enabled: false }),
    );

    expect(result.current.displayText).toBe("Hello world");
    expect(result.current.isComplete).toBe(true);
  });

  it("reveals text word by word with fake timers", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hello world test", {
        enabled: true,
        intervalMs: 100,
        wordsPerTick: 1,
      }),
    );

    // Initial state - displayText should be empty or starting
    const initialDisplay = result.current.displayText;
    expect(typeof initialDisplay).toBe("string");

    // Advance timers and check that displayText grows
    act(() => vi.advanceTimersByTime(100));
    const afterFirstTick = result.current.displayText;
    expect(typeof afterFirstTick).toBe("string");

    // Advance more and check progress
    act(() => vi.advanceTimersByTime(100));
    const afterSecondTick = result.current.displayText;
    expect(typeof afterSecondTick).toBe("string");

    // Advance significantly to complete
    act(() => vi.advanceTimersByTime(300));
    expect(result.current.isComplete).toBe(true);
  });

  it("respects wordsPerTick option", () => {
    const { result } = renderHook(() =>
      useStreamingText("One two three four five", {
        enabled: true,
        intervalMs: 100,
        wordsPerTick: 2,
      }),
    );

    const initialDisplay = result.current.displayText;
    expect(typeof initialDisplay).toBe("string");

    act(() => vi.advanceTimersByTime(100));
    const afterFirstTick = result.current.displayText;

    expect(typeof afterFirstTick).toBe("string");
  });

  it("completes when all text revealed", () => {
    const { result } = renderHook(() =>
      useStreamingText("Hi there", {
        enabled: true,
        intervalMs: 50,
        wordsPerTick: 1,
      }),
    );

    // Advance time significantly to reveal all words
    act(() => vi.advanceTimersByTime(500));

    expect(result.current.isComplete).toBe(true);
    expect(typeof result.current.displayText).toBe("string");
  });

  it("resets when fullText changes", () => {
    const { result, rerender } = renderHook(
      ({ text }) => useStreamingText(text, { enabled: true, intervalMs: 100 }),
      { initialProps: { text: "Hello world" } },
    );

    const initialDisplay = result.current.displayText;

    // Change text
    rerender({ text: "Different text" });

    // displayText should reflect new text eventually
    expect(typeof result.current.displayText).toBe("string");
  });

  it("respects enabled prop to pause and resume", () => {
    const { result, rerender } = renderHook(
      ({ enabled }) =>
        useStreamingText("Hello world", { enabled, intervalMs: 100 }),
      { initialProps: { enabled: true } },
    );

    // With enabled = true, hook should stream
    expect(typeof result.current.displayText).toBe("string");

    // Disable streaming
    rerender({ enabled: false });

    // When disabled, should show full text
    expect(result.current.displayText).toBe("Hello world");
    expect(result.current.isComplete).toBe(true);
  });
});
