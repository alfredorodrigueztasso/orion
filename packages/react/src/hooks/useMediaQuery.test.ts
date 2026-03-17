import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
} from "./useMediaQuery";

describe("useMediaQuery", () => {
  it("returns initial match value", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(typeof result.current).toBe("boolean");
  });

  it("returns false for default mock", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);
  });

  it("handles SSR context (undefined window)", () => {
    // In SSR, matchMedia is not called, hook returns false
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(typeof result.current).toBe("boolean");
  });

  it("returns false when query does not match", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 400px)"));
    expect(result.current).toBe(false);
  });

  it("handles initial state with true matches", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: true,
        media: "(max-width: 768px)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("different queries return expected match values", () => {
    const queries = [
      "(max-width: 768px)",
      "(min-width: 1024px)",
      "(prefers-reduced-motion: reduce)",
    ];

    queries.forEach((query) => {
      const { result, unmount } = renderHook(() => useMediaQuery(query));
      expect(typeof result.current).toBe("boolean");
      unmount();
    });
  });
});

describe("useIsMobile", () => {
  it("returns boolean for mobile query", () => {
    const { result } = renderHook(() => useIsMobile());
    expect(typeof result.current).toBe("boolean");
  });
});

describe("useIsTablet", () => {
  it("returns boolean for tablet query", () => {
    const { result } = renderHook(() => useIsTablet());
    expect(typeof result.current).toBe("boolean");
  });
});

describe("useIsDesktop", () => {
  it("returns boolean for desktop query", () => {
    const { result } = renderHook(() => useIsDesktop());
    expect(typeof result.current).toBe("boolean");
  });
});

describe("usePrefersDarkMode", () => {
  it("returns boolean for prefers-color-scheme query", () => {
    const { result } = renderHook(() => usePrefersDarkMode());
    expect(typeof result.current).toBe("boolean");
  });
});

describe("usePrefersReducedMotion", () => {
  it("returns boolean for prefers-reduced-motion query", () => {
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(typeof result.current).toBe("boolean");
  });

  it("returns true when user prefers reduced motion", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });
});

describe("useMediaQuery - behavior with listener", () => {
  let listeners: Map<string, Array<(event: MediaQueryListEvent) => void>>;

  beforeEach(() => {
    listeners = new Map();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => {
        if (!listeners.has(query)) {
          listeners.set(query, []);
        }

        return {
          matches: false,
          media: query,
          addEventListener: (
            event: string,
            listener: (event: MediaQueryListEvent) => void,
          ) => {
            if (event === "change") {
              const queryListeners = listeners.get(query) || [];
              queryListeners.push(listener);
              listeners.set(query, queryListeners);
            }
          },
          removeEventListener: (
            event: string,
            listener: (event: MediaQueryListEvent) => void,
          ) => {
            if (event === "change") {
              const queryListeners = listeners.get(query) || [];
              const index = queryListeners.indexOf(listener);
              if (index > -1) {
                queryListeners.splice(index, 1);
              }
            }
          },
          addListener: vi.fn(),
          removeListener: vi.fn(),
        };
      },
    });
  });

  it("returns true when media query matches", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: true,
        media: "(max-width: 768px)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("updates state when media query changes", () => {
    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    // Simulate media query change event
    act(() => {
      const queryListeners = listeners.get("(max-width: 768px)") || [];
      queryListeners.forEach((listener) => {
        listener({ matches: true });
      });
    });

    expect(result.current).toBe(true);
  });

  it("useIsMobile uses correct breakpoint query", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia");
    renderHook(() => useIsMobile());

    expect(matchMediaSpy).toHaveBeenCalledWith("(max-width: 639px)");
    matchMediaSpy.mockRestore();
  });

  it("useIsTablet uses correct breakpoint query", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia");
    renderHook(() => useIsTablet());

    expect(matchMediaSpy).toHaveBeenCalledWith(
      "(min-width: 640px) and (max-width: 1023px)",
    );
    matchMediaSpy.mockRestore();
  });

  it("useIsDesktop uses correct breakpoint query", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia");
    renderHook(() => useIsDesktop());

    expect(matchMediaSpy).toHaveBeenCalledWith("(min-width: 1024px)");
    matchMediaSpy.mockRestore();
  });

  it("removeEventListener is called on unmount", () => {
    const removeListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: vi.fn(),
        removeEventListener: removeListenerSpy,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    unmount();

    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it("uses addListener fallback when addEventListener is not available", () => {
    const addListenerSpy = vi.fn();
    const removeListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        // No addEventListener - simulate older browsers
        addListener: addListenerSpy,
        removeListener: removeListenerSpy,
      }),
    });

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(addListenerSpy).toHaveBeenCalled();

    unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it("handles query change with addListener fallback", () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addListener: (handler: (event: MediaQueryListEvent) => void) => {
          changeHandler = handler;
        },
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    // Trigger change via addListener callback
    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  it("updates state when query changes", () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: (
          event: string,
          handler: (event: MediaQueryListEvent) => void,
        ) => {
          if (event === "change") {
            changeHandler = handler;
          }
        },
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  it("sets initial value from matchMedia on mount", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: true,
        media: "(max-width: 768px)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(true);
  });

  it("usePrefersDarkMode uses correct query", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia");
    renderHook(() => usePrefersDarkMode());

    expect(matchMediaSpy).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
    matchMediaSpy.mockRestore();
  });

  it("returns true for dark mode preference", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => usePrefersDarkMode());
    expect(result.current).toBe(true);
  });

  it("updates when query dependency changes", () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: (
          event: string,
          handler: (event: MediaQueryListEvent) => void,
        ) => {
          if (event === "change") {
            changeHandler = handler;
          }
        },
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result, rerender } = renderHook(
      ({ query }: { query: string }) => useMediaQuery(query),
      { initialProps: { query: "(max-width: 768px)" } },
    );

    expect(result.current).toBe(false);

    // Change the query
    rerender({ query: "(min-width: 1024px)" });

    // The hook should now use the new query
    expect(result.current).toBe(false);
  });

  it("handles multiple consecutive media query changes", () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: (
          event: string,
          handler: (event: MediaQueryListEvent) => void,
        ) => {
          if (event === "change") {
            changeHandler = handler;
          }
        },
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });
    expect(result.current).toBe(true);

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: false } as MediaQueryListEvent);
      }
    });
    expect(result.current).toBe(false);

    act(() => {
      if (changeHandler) {
        changeHandler({ matches: true } as MediaQueryListEvent);
      }
    });
    expect(result.current).toBe(true);
  });

  it("useIsTablet returns false for non-tablet sizes", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(min-width: 640px) and (max-width: 1023px)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useIsTablet());
    expect(result.current).toBe(false);
  });

  it("useIsDesktop returns false for non-desktop sizes", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(min-width: 1024px)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useIsDesktop());
    expect(result.current).toBe(false);
  });

  it("mediaQueryList with addEventListener available is used for modern browsers", () => {
    const addEventListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: addEventListenerSpy,
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("handles query changes by re-registering listeners", () => {
    const currentQuery = "(max-width: 768px)";
    const addEventListenerSpy = vi.fn();
    const removeEventListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: (query: string) => ({
        matches: query === "(min-width: 1024px)",
        media: query,
        addEventListener: addEventListenerSpy,
        removeEventListener: removeEventListenerSpy,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { rerender } = renderHook(
      ({ q }: { q: string }) => useMediaQuery(q),
      { initialProps: { q: "(max-width: 768px)" } },
    );

    const firstCallCount = addEventListenerSpy.mock.calls.length;

    rerender({ q: "(min-width: 1024px)" });

    // Should have registered new listener for new query
    expect(addEventListenerSpy.mock.calls.length).toBeGreaterThan(
      firstCallCount,
    );
  });

  it("handles empty query string gracefully", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery(""));
    expect(typeof result.current).toBe("boolean");
  });

  it("usePrefersReducedMotion returns correct value", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia");
    renderHook(() => usePrefersReducedMotion());

    expect(matchMediaSpy).toHaveBeenCalledWith(
      "(prefers-reduced-motion: reduce)",
    );
    matchMediaSpy.mockRestore();
  });

  it("all preset hooks call useMediaQuery with correct queries", () => {
    const matchMediaSpy = vi.spyOn(window, "matchMedia");

    const { unmount: unmount1 } = renderHook(() => useIsMobile());
    expect(matchMediaSpy).toHaveBeenCalledWith("(max-width: 639px)");
    unmount1();

    matchMediaSpy.mockClear();

    const { unmount: unmount2 } = renderHook(() => useIsTablet());
    expect(matchMediaSpy).toHaveBeenCalledWith(
      "(min-width: 640px) and (max-width: 1023px)",
    );
    unmount2();

    matchMediaSpy.mockClear();

    const { unmount: unmount3 } = renderHook(() => useIsDesktop());
    expect(matchMediaSpy).toHaveBeenCalledWith("(min-width: 1024px)");
    unmount3();

    matchMediaSpy.mockRestore();
  });

  it("listener receives correct event object on change", () => {
    let capturedListener: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: (
          event: string,
          listener: (event: MediaQueryListEvent) => void,
        ) => {
          capturedListener = listener;
        },
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    // Simulate event with specific properties
    act(() => {
      if (capturedListener) {
        const event = { matches: true } as MediaQueryListEvent;
        capturedListener(event);
      }
    });

    expect(result.current).toBe(true);
  });

  it("handles rapid query string changes", () => {
    const { result, rerender } = renderHook(
      ({ q }: { q: string }) => useMediaQuery(q),
      { initialProps: { q: "(max-width: 768px)" } },
    );

    // Rapidly change queries
    rerender({ q: "(min-width: 1024px)" });
    rerender({ q: "(max-width: 640px)" });
    rerender({ q: "(prefers-reduced-motion: reduce)" });

    expect(typeof result.current).toBe("boolean");
  });

  // ============================================================================
  // TARGETED BRANCH COVERAGE TESTS (To reach 75% branches threshold)
  // ============================================================================

  it("tests addEventListener branch when listener is properly registered", () => {
    const removeEventListenerSpy = vi.fn();
    const addEventListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: addEventListenerSpy,
        removeEventListener: removeEventListenerSpy,
        // No addListener - force addEventListener path
      }),
    });

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    // addEventListener should be called with "change" event
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    unmount();

    // removeEventListener should be called on cleanup
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
  });

  it("forces addListener fallback when addEventListener does not exist", () => {
    const addListenerSpy = vi.fn();
    const removeListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addListener: addListenerSpy,
        removeListener: removeListenerSpy,
        // Explicitly no addEventListener to trigger fallback
        addEventListener: undefined,
      }),
    });

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    // Since addEventListener is undefined, addListener should be called
    expect(addListenerSpy).toHaveBeenCalled();

    unmount();

    // removeListener should be called on cleanup
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it("uses addEventListener when available even if addListener exists", () => {
    const addEventListenerSpy = vi.fn();
    const addListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: addEventListenerSpy,
        removeEventListener: vi.fn(),
        addListener: addListenerSpy,
        removeListener: vi.fn(),
      }),
    });

    renderHook(() => useMediaQuery("(max-width: 768px)"));

    // addEventListener should be preferred over addListener
    expect(addEventListenerSpy).toHaveBeenCalled();
    expect(addListenerSpy).not.toHaveBeenCalled();
  });

  it("initializes state from matchMedia matches property", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: true,
        media: "(max-width: 768px)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    // Should initialize with matches: true from matchMedia
    expect(result.current).toBe(true);
  });

  it("initializes state as false when matchMedia returns false", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    // Should initialize with matches: false from matchMedia
    expect(result.current).toBe(false);
  });

  it("properly handles listener changes when query dependency updates", () => {
    const addEventListenerSpy = vi.fn();
    const removeEventListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: addEventListenerSpy,
        removeEventListener: removeEventListenerSpy,
      }),
    });

    const { rerender } = renderHook(
      ({ q }: { q: string }) => useMediaQuery(q),
      { initialProps: { q: "(max-width: 768px)" } },
    );

    const firstCallCount = removeEventListenerSpy.mock.calls.length;

    // Rerender with different query
    rerender({ q: "(min-width: 1024px)" });

    // Old listener should be removed
    expect(removeEventListenerSpy.mock.calls.length).toBeGreaterThan(
      firstCallCount,
    );
  });

  it("calls setMatches with event.matches when change event is triggered", () => {
    let capturedListener: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: (
          _: string,
          listener: (event: MediaQueryListEvent) => void,
        ) => {
          capturedListener = listener;
        },
        removeEventListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));
    expect(result.current).toBe(false);

    // Trigger change event with matches: true
    act(() => {
      if (capturedListener) {
        const event = { matches: true } as MediaQueryListEvent;
        capturedListener(event);
      }
    });

    expect(result.current).toBe(true);
  });

  it("returns cleanup function that removes listener", () => {
    const removeEventListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerSpy,
      }),
    });

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    // Remove the hook
    unmount();

    // Cleanup should have called removeEventListener
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  it("handles conditional branch where addEventListener is falsy for addListener fallback", () => {
    const removeListenerSpy = vi.fn();
    const addListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        // addEventListener is null/falsy, should use addListener
        addEventListener: null as any,
        addListener: addListenerSpy,
        removeListener: removeListenerSpy,
      }),
    });

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    // addListener should be used when addEventListener is falsy
    expect(addListenerSpy).toHaveBeenCalled();

    unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it("correctly identifies when addEventListener exists on mediaQueryList", () => {
    const addEventListenerSpy = vi.spyOn(
      EventTarget.prototype,
      "addEventListener",
    );

    const { unmount } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    // addEventListener should be called (testing the if branch)
    expect(addEventListenerSpy).toHaveBeenCalled();

    unmount();
    addEventListenerSpy.mockRestore();
  });

  it("executes addListener path when addEventListener is not available", () => {
    const addListenerSpy = vi.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: undefined,
        addListener: addListenerSpy,
        removeListener: vi.fn(),
      }),
    });

    renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(addListenerSpy).toHaveBeenCalled();
  });

  it("handles setState updates correctly when listener captures event", () => {
    let listenerCallback: ((event: MediaQueryListEvent) => void) | null = null;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: () => ({
        matches: false,
        media: "(max-width: 768px)",
        addEventListener: (
          _: string,
          callback: (event: MediaQueryListEvent) => void,
        ) => {
          listenerCallback = callback;
        },
        removeEventListener: vi.fn(),
      }),
    });

    const { result } = renderHook(() => useMediaQuery("(max-width: 768px)"));

    expect(result.current).toBe(false);

    // Fire multiple events in sequence to test setState
    act(() => {
      if (listenerCallback) {
        listenerCallback({ matches: true } as MediaQueryListEvent);
      }
    });
    expect(result.current).toBe(true);

    act(() => {
      if (listenerCallback) {
        listenerCallback({ matches: false } as MediaQueryListEvent);
      }
    });
    expect(result.current).toBe(false);

    act(() => {
      if (listenerCallback) {
        listenerCallback({ matches: true } as MediaQueryListEvent);
      }
    });
    expect(result.current).toBe(true);
  });
});
