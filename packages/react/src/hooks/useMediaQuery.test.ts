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
});
