import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import React from "react";
import { useClickOutside, useClickOutsideMultiple } from "./useClickOutside";

describe("useClickOutside", () => {
  let ref: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    ref = React.createRef();
  });

  it("hook initializes without error", () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutside(ref, handler));

    expect(result).toBeDefined();
  });

  it("handler is a required parameter", () => {
    const handler = vi.fn();
    expect(() => renderHook(() => useClickOutside(ref, handler))).not.toThrow();
  });

  it("respects enabled option", () => {
    const handler = vi.fn();
    const { result, rerender } = renderHook(
      ({ enabled }) => useClickOutside(ref, handler, enabled),
      { initialProps: { enabled: false } },
    );

    expect(result).toBeDefined();

    rerender({ enabled: true });
    expect(result).toBeDefined();
  });

  it("cleans up listeners on unmount", () => {
    const handler = vi.fn();
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useClickOutside(ref, handler));
    unmount();

    // Should have registered listeners for mousedown and touchstart
    expect(removeEventListenerSpy).toHaveBeenCalled();

    removeEventListenerSpy.mockRestore();
  });

  it("works with HTMLElement ref", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    const elementRef = { current: div };

    expect(() =>
      renderHook(() => useClickOutside(elementRef, handler)),
    ).not.toThrow();
  });

  it("works with null ref", () => {
    const handler = vi.fn();
    const nullRef = { current: null };

    expect(() =>
      renderHook(() => useClickOutside(nullRef, handler)),
    ).not.toThrow();
  });

  it("calls handler when clicking outside ref", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    renderHook(() => useClickOutside(testRef, handler));

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it("does not call handler when clicking inside ref", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    renderHook(() => useClickOutside(testRef, handler));

    fireEvent.mouseDown(div);
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it("does not call handler when enabled is false", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    renderHook(() => useClickOutside(testRef, handler, false));

    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it("calls handler on touchstart event", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    renderHook(() => useClickOutside(testRef, handler));

    fireEvent.touchStart(document.body);
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(div);
  });

  it("handler receives the event object", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    renderHook(() => useClickOutside(testRef, handler));

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0]).toBeDefined();
    expect(handler.mock.calls[0][0].type).toBe("mousedown");

    document.body.removeChild(div);
  });

  it("handles nested elements correctly", () => {
    const handler = vi.fn();
    const parent = document.createElement("div");
    const child = document.createElement("div");
    parent.appendChild(child);
    document.body.appendChild(parent);
    const testRef = { current: parent };

    renderHook(() => useClickOutside(testRef, handler));

    fireEvent.mouseDown(child);
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(parent);
  });

  it("re-registers listeners when handler changes", () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    const { rerender } = renderHook(
      ({ handler }) => useClickOutside(testRef, handler),
      { initialProps: { handler: handler1 } },
    );

    fireEvent.mouseDown(document.body);
    expect(handler1).toHaveBeenCalledTimes(1);

    rerender({ handler: handler2 });
    fireEvent.mouseDown(document.body);
    expect(handler2).toHaveBeenCalledTimes(1);

    document.body.removeChild(div);
  });

  it("disables listener when enabled changes from true to false", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    const { rerender } = renderHook(
      ({ enabled }) => useClickOutside(testRef, handler, enabled),
      { initialProps: { enabled: true } },
    );

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    rerender({ enabled: false });
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(div);
  });

  it("re-enables listener when enabled changes from false to true", () => {
    const handler = vi.fn();
    const div = document.createElement("div");
    document.body.appendChild(div);
    const testRef = { current: div };

    const { rerender } = renderHook(
      ({ enabled }) => useClickOutside(testRef, handler, enabled),
      { initialProps: { enabled: false } },
    );

    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();

    rerender({ enabled: true });
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(div);
  });
});

describe("useClickOutsideMultiple", () => {
  let refs: React.RefObject<HTMLDivElement>[];

  beforeEach(() => {
    refs = [React.createRef(), React.createRef()];
  });

  it("hook initializes without error", () => {
    const handler = vi.fn();
    const { result } = renderHook(() => useClickOutsideMultiple(refs, handler));

    expect(result).toBeDefined();
  });

  it("accepts multiple refs", () => {
    const handler = vi.fn();
    const multipleRefs = [
      React.createRef<HTMLDivElement>(),
      React.createRef<HTMLDivElement>(),
      React.createRef<HTMLDivElement>(),
    ];

    expect(() =>
      renderHook(() => useClickOutsideMultiple(multipleRefs, handler)),
    ).not.toThrow();
  });

  it("works with HTMLElement refs", () => {
    const handler = vi.fn();
    const refs = [
      { current: document.createElement("div") },
      { current: document.createElement("div") },
    ];

    expect(() =>
      renderHook(() => useClickOutsideMultiple(refs, handler)),
    ).not.toThrow();
  });

  it("calls handler when clicking outside all refs", () => {
    const handler = vi.fn();
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    const testRefs = [{ current: div1 }, { current: div2 }];

    renderHook(() => useClickOutsideMultiple(testRefs, handler));

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });

  it("does not call handler when clicking inside one of the refs", () => {
    const handler = vi.fn();
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    const testRefs = [{ current: div1 }, { current: div2 }];

    renderHook(() => useClickOutsideMultiple(testRefs, handler));

    fireEvent.mouseDown(div1);
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(div2);
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });

  it("calls handler on touchstart event outside refs", () => {
    const handler = vi.fn();
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    const testRefs = [{ current: div1 }, { current: div2 }];

    renderHook(() => useClickOutsideMultiple(testRefs, handler));

    fireEvent.touchStart(document.body);
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });

  it("does not call handler when enabled is false", () => {
    const handler = vi.fn();
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    const testRefs = [{ current: div1 }, { current: div2 }];

    renderHook(() => useClickOutsideMultiple(testRefs, handler, false));

    fireEvent.mouseDown(document.body);
    expect(handler).not.toHaveBeenCalled();

    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });

  it("handler receives the event object", () => {
    const handler = vi.fn();
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    const testRefs = [{ current: div1 }, { current: div2 }];

    renderHook(() => useClickOutsideMultiple(testRefs, handler));

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0]).toBeDefined();
    expect(handler.mock.calls[0][0].type).toBe("mousedown");

    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });

  it("handles nested elements inside refs correctly", () => {
    const handler = vi.fn();
    const parent1 = document.createElement("div");
    const child1 = document.createElement("div");
    const parent2 = document.createElement("div");
    const child2 = document.createElement("div");
    parent1.appendChild(child1);
    parent2.appendChild(child2);
    document.body.appendChild(parent1);
    document.body.appendChild(parent2);
    const testRefs = [{ current: parent1 }, { current: parent2 }];

    renderHook(() => useClickOutsideMultiple(testRefs, handler));

    fireEvent.mouseDown(child1);
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(child2);
    expect(handler).not.toHaveBeenCalled();

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalled();

    document.body.removeChild(parent1);
    document.body.removeChild(parent2);
  });

  it("respects enabled option", () => {
    const handler = vi.fn();
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    const testRefs = [{ current: div1 }, { current: div2 }];

    const { rerender } = renderHook(
      ({ enabled }) => useClickOutsideMultiple(testRefs, handler, enabled),
      { initialProps: { enabled: true } },
    );

    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    rerender({ enabled: false });
    fireEvent.mouseDown(document.body);
    expect(handler).toHaveBeenCalledTimes(1);

    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });

  it("cleans up listeners on unmount", () => {
    const handler = vi.fn();
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    document.body.appendChild(div1);
    document.body.appendChild(div2);
    const testRefs = [{ current: div1 }, { current: div2 }];

    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() =>
      useClickOutsideMultiple(testRefs, handler),
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();

    removeEventListenerSpy.mockRestore();
    document.body.removeChild(div1);
    document.body.removeChild(div2);
  });
});
