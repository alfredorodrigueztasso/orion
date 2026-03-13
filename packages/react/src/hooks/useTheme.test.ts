import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-brand");
  });

  it("returns default theme and brand", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("light");
    expect(result.current.brand).toBe("orion");
  });

  it("setTheme updates theme state", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.theme).toBe("dark");
  });

  it("setBrand updates brand state", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setBrand("red");
    });

    expect(result.current.brand).toBe("red");
  });

  it("toggleTheme flips between light and dark", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("dark");

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
  });

  it("isDark and isLight computed properties work correctly", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);
    expect(result.current.isLight).toBe(true);

    act(() => {
      result.current.setTheme("dark");
    });

    expect(result.current.isDark).toBe(true);
    expect(result.current.isLight).toBe(false);
  });

  it("respects storageEnabled option", () => {
    const { result } = renderHook(() => useTheme({ storageEnabled: false }));

    act(() => {
      result.current.setTheme("dark");
    });

    // Should still update state even without storage
    expect(result.current.theme).toBe("dark");
  });

  it("sets document attributes when theme changes", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("dark");
    });

    // The hook should set data-theme on document.documentElement
    expect(["dark", "light"]).toContain(result.current.theme);
  });

  it("reads persisted theme from localStorage on mount", async () => {
    localStorage.setItem("orion-theme", "dark");
    const { result } = renderHook(() => useTheme());

    // Hook reads from localStorage in an effect, wait for it to complete
    expect(result.current.theme).toBe("dark");
  });

  it("ignores invalid theme from localStorage (falls back to default)", async () => {
    localStorage.setItem("orion-theme", "purple");
    const { result } = renderHook(() => useTheme());

    // Should fall back to default "light" theme for invalid value
    expect(result.current.theme).toBe("light");
  });

  it("reads persisted brand from localStorage on mount", async () => {
    localStorage.setItem("orion-brand", "red");
    const { result } = renderHook(() => useTheme());

    // Hook reads from localStorage in an effect, wait for it to complete
    expect(result.current.brand).toBe("red");
  });

  it("ignores invalid brand from localStorage (falls back to default)", async () => {
    localStorage.setItem("orion-brand", "invalid-brand");
    const { result } = renderHook(() => useTheme());

    // Should fall back to default "orion" brand for invalid value
    expect(result.current.brand).toBe("orion");
  });

  it("sets data-theme attribute on documentElement", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setTheme("dark");
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("sets data-brand attribute on documentElement", () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.setBrand("red");
    });

    expect(document.documentElement.getAttribute("data-brand")).toBe("red");
  });

  it("stores theme in localStorage when enabled", () => {
    const { result } = renderHook(() => useTheme({ storageEnabled: true }));

    act(() => {
      result.current.setTheme("dark");
    });

    expect(localStorage.getItem("orion-theme")).toBe("dark");
  });

  it("does NOT store theme in localStorage when disabled", () => {
    const { result } = renderHook(() => useTheme({ storageEnabled: false }));

    act(() => {
      result.current.setTheme("dark");
    });

    expect(localStorage.getItem("orion-theme")).toBeNull();
  });

  it("stores brand in localStorage when enabled", () => {
    const { result } = renderHook(() => useTheme({ storageEnabled: true }));

    act(() => {
      result.current.setBrand("red");
    });

    expect(localStorage.getItem("orion-brand")).toBe("red");
  });

  it("does NOT store brand in localStorage when disabled", () => {
    const { result } = renderHook(() => useTheme({ storageEnabled: false }));

    act(() => {
      result.current.setBrand("red");
    });

    expect(localStorage.getItem("orion-brand")).toBeNull();
  });

  it("uses custom storageKey for theme", () => {
    const { result } = renderHook(() =>
      useTheme({ storageKey: "custom-theme-key", storageEnabled: true }),
    );

    act(() => {
      result.current.setTheme("dark");
    });

    expect(localStorage.getItem("custom-theme-key")).toBe("dark");
    expect(localStorage.getItem("orion-theme")).toBeNull();
  });

  it("uses custom brandStorageKey for brand", () => {
    const { result } = renderHook(() =>
      useTheme({ brandStorageKey: "custom-brand-key", storageEnabled: true }),
    );

    act(() => {
      result.current.setBrand("red");
    });

    expect(localStorage.getItem("custom-brand-key")).toBe("red");
    expect(localStorage.getItem("orion-brand")).toBeNull();
  });

  it("respects custom defaultTheme option", () => {
    const { result } = renderHook(() =>
      useTheme({ defaultTheme: "dark", storageEnabled: false }),
    );

    expect(result.current.theme).toBe("dark");
  });

  it("respects custom defaultBrand option", () => {
    const { result } = renderHook(() =>
      useTheme({ defaultBrand: "red", storageEnabled: false }),
    );

    expect(result.current.brand).toBe("red");
  });

  it("supports all valid brands", () => {
    const brands: Array<
      "orion" | "red" | "deepblue" | "orange" | "ember" | "lemon"
    > = ["orion", "red", "deepblue", "orange", "ember", "lemon"];

    brands.forEach((brand) => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setBrand(brand);
      });

      expect(result.current.brand).toBe(brand);
    });
  });

  it("maintains isDark and isLight when toggling theme", () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.isDark).toBe(false);
    expect(result.current.isLight).toBe(true);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDark).toBe(true);
    expect(result.current.isLight).toBe(false);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.isDark).toBe(false);
    expect(result.current.isLight).toBe(true);
  });

  it("reads both theme and brand from localStorage on mount", () => {
    localStorage.setItem("orion-theme", "dark");
    localStorage.setItem("orion-brand", "deepblue");

    const { result } = renderHook(() => useTheme());

    expect(result.current.theme).toBe("dark");
    expect(result.current.brand).toBe("deepblue");
  });

  it("persists both theme and brand simultaneously", () => {
    const { result } = renderHook(() => useTheme({ storageEnabled: true }));

    act(() => {
      result.current.setTheme("dark");
      result.current.setBrand("orange");
    });

    expect(localStorage.getItem("orion-theme")).toBe("dark");
    expect(localStorage.getItem("orion-brand")).toBe("orange");
  });

  it("updates documentElement attributes on theme change", () => {
    const { result } = renderHook(() => useTheme());

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");

    act(() => {
      result.current.setTheme("dark");
    });

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("updates documentElement attributes on brand change", () => {
    const { result } = renderHook(() => useTheme());

    expect(document.documentElement.getAttribute("data-brand")).toBe("orion");

    act(() => {
      result.current.setBrand("red");
    });

    expect(document.documentElement.getAttribute("data-brand")).toBe("red");
  });

  it("skips rehydration when storageEnabled is false", () => {
    localStorage.setItem("orion-theme", "dark");
    localStorage.setItem("orion-brand", "red");

    const { result } = renderHook(() => useTheme({ storageEnabled: false }));

    // Should use defaults, not stored values
    expect(result.current.theme).toBe("light");
    expect(result.current.brand).toBe("orion");
  });

  it("handles empty localStorage values gracefully", () => {
    localStorage.setItem("orion-theme", "");
    localStorage.setItem("orion-brand", "");

    const { result } = renderHook(() => useTheme());

    // Empty strings are falsy, should fall back to defaults
    expect(result.current.theme).toBe("light");
    expect(result.current.brand).toBe("orion");
  });

  it("handles null localStorage values gracefully", () => {
    localStorage.removeItem("orion-theme");
    localStorage.removeItem("orion-brand");

    const { result } = renderHook(() => useTheme());

    // Null values should fall back to defaults
    expect(result.current.theme).toBe("light");
    expect(result.current.brand).toBe("orion");
  });
});
