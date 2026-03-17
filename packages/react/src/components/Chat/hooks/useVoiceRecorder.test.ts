import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useVoiceRecorder } from "./useVoiceRecorder";

describe("useVoiceRecorder", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("hook initializes without error", () => {
    const { result } = renderHook(() => useVoiceRecorder());
    expect(result).toBeDefined();
  });

  it("returns initial state structure", () => {
    const { result } = renderHook(() => useVoiceRecorder());

    expect(typeof result.current.isSupported).toBe("boolean");
    expect(typeof result.current.isRecording).toBe("boolean");
    expect(typeof result.current.duration).toBe("number");
  });

  it("initial recording state is false", () => {
    const { result } = renderHook(() => useVoiceRecorder());
    expect(result.current.isRecording).toBe(false);
  });

  it("initial duration is 0", () => {
    const { result } = renderHook(() => useVoiceRecorder());
    expect(result.current.duration).toBe(0);
  });

  it("has methods for recording control", () => {
    const { result } = renderHook(() => useVoiceRecorder());

    expect(typeof result.current.startRecording).toBe("function");
    expect(typeof result.current.stopRecording).toBe("function");
    expect(typeof result.current.cancelRecording).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("accepts onRecordingComplete callback", () => {
    const onRecordingComplete = vi.fn();
    const { result } = renderHook(() =>
      useVoiceRecorder({ onRecordingComplete }),
    );

    expect(result).toBeDefined();
  });

  it("accepts onError callback", () => {
    const onError = vi.fn();
    const { result } = renderHook(() => useVoiceRecorder({ onError }));

    expect(result).toBeDefined();
  });

  it("accepts maxDuration option", () => {
    const { result } = renderHook(() => useVoiceRecorder({ maxDuration: 30 }));

    expect(result).toBeDefined();
  });
});
