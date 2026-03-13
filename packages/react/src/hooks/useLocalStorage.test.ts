import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage, useSessionStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => localStorage.clear());

  it("returns initial value on first render", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("reads from localStorage if value exists", () => {
    localStorage.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    expect(result.current[0]).toBe("stored");
  });

  it("setValue updates state and localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => result.current[1]("updated"));

    expect(result.current[0]).toBe("updated");
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify("updated"));
  });

  it("removeValue removes from localStorage and resets to initial", () => {
    localStorage.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => result.current[2]());

    expect(result.current[0]).toBe("initial");
    expect(localStorage.getItem("testKey")).toBeNull();
  });

  it("supports custom serializer and deserializer", () => {
    const { result } = renderHook(() =>
      useLocalStorage(
        "testKey",
        { count: 0 },
        {
          serializer: JSON.stringify,
          deserializer: JSON.parse,
        },
      ),
    );

    act(() => result.current[1]({ count: 5 }));

    expect(result.current[0]).toEqual({ count: 5 });
    expect(localStorage.getItem("testKey")).toContain("5");
  });

  it("supports functional updater (setValue with previous value)", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 0));

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(2);
    expect(localStorage.getItem("counter")).toBe(JSON.stringify(2));
  });

  it("falls back to initialValue when deserializer throws error", () => {
    localStorage.setItem("testKey", "invalid-json");
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "fallback", {
        deserializer: () => {
          throw new Error("Parse failed");
        },
      }),
    );

    expect(result.current[0]).toBe("fallback");
  });

  it("handles setItem error gracefully", () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementationOnce(() => {
        throw new Error("QuotaExceededError");
      });

    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    // Attempt to set value when storage is full
    act(() => result.current[1]("updated"));

    // Should still update state even if setItem fails
    expect(result.current[0]).toBe("updated");

    setItemSpy.mockRestore();
  });

  it("syncs across tabs via storage event", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    expect(result.current[0]).toBe("initial");

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: JSON.stringify("updated-from-other-tab"),
        }),
      );
    });

    expect(result.current[0]).toBe("updated-from-other-tab");
  });

  it("ignores storage events for different keys", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "differentKey",
          newValue: JSON.stringify("should-not-update"),
        }),
      );
    });

    expect(result.current[0]).toBe("initial");
  });

  it("handles null newValue in storage event (resets to initialValue)", () => {
    localStorage.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));
    expect(result.current[0]).toBe("stored");

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: null,
        }),
      );
    });

    expect(result.current[0]).toBe("initial");
  });

  it("respects syncAcrossTabs: false option", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initial", { syncAcrossTabs: false }),
    );

    const storageEventSpy = vi.fn();
    window.addEventListener("storage", storageEventSpy);

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: JSON.stringify("updated"),
        }),
      );
    });

    // Should not update when syncAcrossTabs is false
    expect(result.current[0]).toBe("initial");

    window.removeEventListener("storage", storageEventSpy);
  });
});

describe("useSessionStorage", () => {
  beforeEach(() => sessionStorage.clear());

  it("reads from sessionStorage instead of localStorage", () => {
    sessionStorage.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() =>
      useSessionStorage("testKey", "initial"),
    );
    expect(result.current[0]).toBe("stored");
  });

  it("setValue writes to sessionStorage", () => {
    const { result } = renderHook(() =>
      useSessionStorage("testKey", "initial"),
    );

    act(() => result.current[1]("updated"));

    expect(sessionStorage.getItem("testKey")).toBe(JSON.stringify("updated"));
  });

  it("supports functional updater in sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("counter", 0));

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(1);

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(2);
    expect(sessionStorage.getItem("counter")).toBe(JSON.stringify(2));
  });

  it("removeValue removes from sessionStorage and resets to initial", () => {
    sessionStorage.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() =>
      useSessionStorage("testKey", "initial"),
    );

    act(() => result.current[2]());

    expect(result.current[0]).toBe("initial");
    expect(sessionStorage.getItem("testKey")).toBeNull();
  });
});

describe("useLocalStorage - Advanced scenarios", () => {
  beforeEach(() => localStorage.clear());

  it("handles storage event deserializer error gracefully", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "initial", {
        deserializer: (value: string) => {
          if (value === "bad-value") {
            throw new Error("Deserialize failed");
          }
          return JSON.parse(value);
        },
      }),
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: "bad-value",
        }),
      );
    });

    // Should fall back to initialValue when deserializer fails
    expect(result.current[0]).toBe("initial");
  });

  it("handles removeValue with storage error", () => {
    const removeItemSpy = vi
      .spyOn(Storage.prototype, "removeItem")
      .mockImplementationOnce(() => {
        throw new Error("RemoveItem failed");
      });

    localStorage.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => result.current[2]());

    // When removeItem throws, the error is caught and state is not updated
    expect(result.current[0]).toBe("stored");

    removeItemSpy.mockRestore();
  });

  it("dispatches storage event when value is set", () => {
    const storageEventSpy = vi.fn();
    window.addEventListener("storage", storageEventSpy);

    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => result.current[1]("updated"));

    // Verify that a storage event was dispatched
    expect(storageEventSpy).toHaveBeenCalled();

    window.removeEventListener("storage", storageEventSpy);
  });

  it("dispatches storage event when value is removed", () => {
    localStorage.setItem("testKey", JSON.stringify("stored"));
    const storageEventSpy = vi.fn();
    window.addEventListener("storage", storageEventSpy);

    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => result.current[2]());

    // Verify that a storage event was dispatched with null newValue
    expect(storageEventSpy).toHaveBeenCalled();

    window.removeEventListener("storage", storageEventSpy);
  });

  it("handles multiple keys independently", () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage("key1", "value1"),
    );
    const { result: result2 } = renderHook(() =>
      useLocalStorage("key2", "value2"),
    );

    act(() => result1.current[1]("updated1"));
    act(() => result2.current[1]("updated2"));

    expect(result1.current[0]).toBe("updated1");
    expect(result2.current[0]).toBe("updated2");
    expect(localStorage.getItem("key1")).toBe(JSON.stringify("updated1"));
    expect(localStorage.getItem("key2")).toBe(JSON.stringify("updated2"));
  });

  it("handles complex nested objects", () => {
    const complexObject = {
      user: { name: "John", age: 30 },
      preferences: { theme: "dark", notifications: true },
    };

    const { result } = renderHook(() =>
      useLocalStorage("complex", complexObject),
    );

    const updated = {
      ...complexObject,
      user: { ...complexObject.user, age: 31 },
    };
    act(() => result.current[1](updated));

    expect(result.current[0]).toEqual(updated);
    expect(JSON.parse(localStorage.getItem("complex")!)).toEqual(updated);
  });

  it("syncs storage event changes across multiple hooks with same key", () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage("shared", "initial"),
    );
    const { result: result2 } = renderHook(() =>
      useLocalStorage("shared", "initial"),
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "shared",
          newValue: JSON.stringify("synced"),
        }),
      );
    });

    expect(result1.current[0]).toBe("synced");
    expect(result2.current[0]).toBe("synced");
  });

  it("doesn't update when storage event key is different", () => {
    const { result } = renderHook(() =>
      useLocalStorage("targetKey", "initial"),
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "otherKey",
          newValue: JSON.stringify("different"),
        }),
      );
    });

    expect(result.current[0]).toBe("initial");
  });

  it("uses custom deserializer when reading from storage events", () => {
    const deserializerSpy = vi.fn((value: string) => {
      return parseInt(value) * 2;
    });

    const { result } = renderHook(() =>
      useLocalStorage("number", 0, { deserializer: deserializerSpy }),
    );

    // Storage event should use the custom deserializer
    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "number",
          newValue: "10",
        }),
      );
    });

    // Verify the deserializer was called and the value was applied
    expect(deserializerSpy).toHaveBeenCalledWith("10");
    expect(result.current[0]).toBe(20);
  });

  it("handles multiple storage events in sequence", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: JSON.stringify("first"),
        }),
      );
    });
    expect(result.current[0]).toBe("first");

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: JSON.stringify("second"),
        }),
      );
    });
    expect(result.current[0]).toBe("second");

    act(() => {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "testKey",
          newValue: null,
        }),
      );
    });
    expect(result.current[0]).toBe("initial");
  });

  it("handles null in localStorage.getItem gracefully", () => {
    // Don't set anything in localStorage
    const { result } = renderHook(() => useLocalStorage("empty", "fallback"));

    expect(result.current[0]).toBe("fallback");
  });

  it("preserves complex array types", () => {
    const initialArray = [{ id: 1 }, { id: 2 }];
    const { result } = renderHook(() => useLocalStorage("array", initialArray));

    act(() => result.current[1]([{ id: 1 }, { id: 2 }, { id: 3 }]));

    expect(result.current[0]).toHaveLength(3);
    expect(result.current[0][2]).toEqual({ id: 3 });
  });
});

describe("useSessionStorage - Advanced scenarios", () => {
  beforeEach(() => sessionStorage.clear());

  it("supports custom deserializer in sessionStorage", () => {
    sessionStorage.setItem("testKey", JSON.stringify({ value: "test" }));

    const { result } = renderHook(() =>
      useSessionStorage(
        "testKey",
        {},
        {
          deserializer: JSON.parse,
        },
      ),
    );

    expect(result.current[0]).toEqual({ value: "test" });
  });

  it("handles setValue with error in sessionStorage", () => {
    const setItemSpy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementationOnce(() => {
        throw new Error("SessionStorage full");
      });

    const { result } = renderHook(() =>
      useSessionStorage("testKey", "initial"),
    );

    act(() => result.current[1]("updated"));

    // Should still update state even if setItem fails
    expect(result.current[0]).toBe("updated");

    setItemSpy.mockRestore();
  });

  it("handles removeValue with error in sessionStorage", () => {
    const removeItemSpy = vi
      .spyOn(Storage.prototype, "removeItem")
      .mockImplementationOnce(() => {
        throw new Error("RemoveItem failed");
      });

    sessionStorage.setItem("testKey", JSON.stringify("stored"));
    const { result } = renderHook(() =>
      useSessionStorage("testKey", "initial"),
    );

    act(() => result.current[2]());

    // When removeItem throws, setStoredValue isn't called, so state remains unchanged
    expect(result.current[0]).toBe("stored");

    removeItemSpy.mockRestore();
  });

  it("handles multiple sequential updates in sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("counter", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]((prev) => prev + 1);
    });
    expect(result.current[0]).toBe(3);
    expect(sessionStorage.getItem("counter")).toBe("3");
  });

  it("preserves session data across multiple renders", () => {
    const { result, rerender } = renderHook(() =>
      useSessionStorage("persistent", "value1"),
    );

    expect(result.current[0]).toBe("value1");

    act(() => result.current[1]("value2"));
    rerender();

    expect(result.current[0]).toBe("value2");
  });
});
