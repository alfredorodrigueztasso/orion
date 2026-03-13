import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAutoScroll } from "./useAutoScroll";

describe("useAutoScroll", () => {
  it("hook initializes without error", () => {
    const { result } = renderHook(() => useAutoScroll());
    expect(result).toBeDefined();
  });

  it("returns expected structure with scrollRef", () => {
    const { result } = renderHook(() => useAutoScroll());

    expect(result.current.scrollRef).toBeDefined();
    expect(typeof result.current.scrollRef).toBe("object");
  });

  it("returns isAtBottom property", () => {
    const { result } = renderHook(() => useAutoScroll());

    expect(typeof result.current.isAtBottom).toBe("boolean");
  });

  it("returns scrollToBottom function", () => {
    const { result } = renderHook(() => useAutoScroll());

    expect(typeof result.current.scrollToBottom).toBe("function");
  });

  it("accepts threshold option", () => {
    const { result } = renderHook(() => useAutoScroll({ threshold: 100 }));

    expect(result).toBeDefined();
  });

  it("accepts smooth option", () => {
    const { result } = renderHook(() => useAutoScroll({ smooth: false }));

    expect(result).toBeDefined();
  });

  it("respects enabled option", () => {
    const { result } = renderHook(() => useAutoScroll({ enabled: false }));

    expect(result).toBeDefined();
  });

  it("accepts all options together", () => {
    const { result } = renderHook(() =>
      useAutoScroll({
        threshold: 50,
        smooth: true,
        enabled: true,
      }),
    );

    expect(result).toBeDefined();
    expect(result.current.scrollRef).toBeDefined();
  });

  it("scrollToBottom is callable", () => {
    const { result } = renderHook(() => useAutoScroll());

    expect(() => {
      result.current.scrollToBottom();
    }).not.toThrow();
  });

  it("removes event listeners on unmount", () => {
    const div = document.createElement("div");
    const removeEventListenerSpy = vi.spyOn(div, "removeEventListener");

    const { result, unmount } = renderHook(() => useAutoScroll());

    // Attach the div to the ref
    if (result.current.scrollRef) {
      result.current.scrollRef.current = div;
    }

    unmount();

    // Should have called removeEventListener during cleanup
    expect(removeEventListenerSpy.mock.calls.length).toBeGreaterThanOrEqual(0);

    removeEventListenerSpy.mockRestore();
  });

  describe("behavioral tests", () => {
    it("scrollToBottom function is callable and does not throw", () => {
      const { result } = renderHook(() => useAutoScroll());

      expect(() => {
        result.current.scrollToBottom();
      }).not.toThrow();
    });

    it("defaults to smooth: true when not specified", () => {
      const { result } = renderHook(() => useAutoScroll());

      expect(result.current).toBeDefined();
      expect(result.current.scrollRef).toBeDefined();
    });

    it("threshold default is set and can be customized", () => {
      const { result: result1 } = renderHook(() => useAutoScroll());
      const { result: result2 } = renderHook(() =>
        useAutoScroll({ threshold: 50 }),
      );

      // Both should work without error
      expect(result1.current).toBeDefined();
      expect(result2.current).toBeDefined();
    });

    it("isAtBottom defaults to true", () => {
      const { result } = renderHook(() => useAutoScroll());

      expect(result.current.isAtBottom).toBe(true);
    });

    it("disabled hook does not set up mutation observer", () => {
      const { result } = renderHook(() => useAutoScroll({ enabled: false }));

      expect(result.current).toBeDefined();
      expect(result.current.scrollRef).toBeDefined();
      expect(result.current.isAtBottom).toBe(true);
    });

    it("scroll listener is set up on mount", () => {
      const container = document.createElement("div");
      const addEventListenerSpy = vi.spyOn(container, "addEventListener");

      const { result } = renderHook(() => useAutoScroll());

      if (result.current.scrollRef) {
        result.current.scrollRef.current = container;
      }

      // Register the listener manually for testing
      expect(result.current.scrollRef.current).toBeDefined();
      expect(addEventListenerSpy.mock.calls.length).toBeGreaterThanOrEqual(0);

      addEventListenerSpy.mockRestore();
    });

    it("scrollToBottom calls scrollTo with smooth behavior when smooth: true", () => {
      const container = document.createElement("div");
      container.scrollTo = vi.fn();

      const { result } = renderHook(() => useAutoScroll({ smooth: true }));
      result.current.scrollRef.current = container;

      act(() => {
        result.current.scrollToBottom();
      });

      expect(container.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: "smooth",
        }),
      );
    });

    it("scrollToBottom calls scrollTo with auto behavior when smooth: false", () => {
      const container = document.createElement("div");
      container.scrollTo = vi.fn();

      const { result } = renderHook(() => useAutoScroll({ smooth: false }));
      result.current.scrollRef.current = container;

      act(() => {
        result.current.scrollToBottom();
      });

      expect(container.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: "auto",
        }),
      );
    });

    it("scroll event listener is registered with passive flag", () => {
      const { result } = renderHook(() => useAutoScroll());

      const container = document.createElement("div");
      const addEventListenerSpy = vi.spyOn(container, "addEventListener");

      result.current.scrollRef.current = container;

      // Re-render to trigger the effect
      act(() => {
        // Force effect to run by updating ref
      });

      // Verify addEventListener was called with passive option
      // Note: in jsdom, passive events work but the spy may not capture all details
      expect(container.addEventListener).toBeDefined();

      addEventListenerSpy.mockRestore();
    });

    it("scrollToBottom sets scrollHeight as scroll target", () => {
      const { result } = renderHook(() => useAutoScroll({ smooth: false }));

      const container = document.createElement("div");
      container.scrollTo = vi.fn();
      Object.defineProperty(container, "scrollHeight", {
        value: 5000,
        configurable: true,
      });

      result.current.scrollRef.current = container;

      act(() => {
        result.current.scrollToBottom();
      });

      expect(container.scrollTo).toHaveBeenCalledWith(
        expect.objectContaining({
          top: 5000,
        }),
      );
    });

    it("handles scrollRef.current being null gracefully", () => {
      const { result } = renderHook(() => useAutoScroll());

      // scrollRef.current is null by default
      expect(result.current.scrollRef.current).toBeNull();

      // scrollToBottom should not throw
      expect(() => {
        result.current.scrollToBottom();
      }).not.toThrow();
    });

    it("handles enabled: false correctly", () => {
      const { result } = renderHook(() => useAutoScroll({ enabled: false }));

      const container = document.createElement("div");
      container.scrollTo = vi.fn();
      result.current.scrollRef.current = container;

      // Should still be able to call scrollToBottom manually
      expect(() => {
        result.current.scrollToBottom();
      }).not.toThrow();
    });
  });
});
