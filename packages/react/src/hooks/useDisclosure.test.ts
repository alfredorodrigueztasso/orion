import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("starts closed by default", () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.isOpen).toBe(false);
  });

  it("starts open when defaultOpen is true", () => {
    const { result } = renderHook(() => useDisclosure({ defaultOpen: true }));
    expect(result.current.isOpen).toBe(true);
  });

  it("open() sets isOpen to true and calls onOpen", () => {
    const onOpen = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onOpen }));

    act(() => result.current.open());

    expect(result.current.isOpen).toBe(true);
    expect(onOpen).toHaveBeenCalled();
  });

  it("close() sets isOpen to false and calls onClose", () => {
    const onClose = vi.fn();
    const { result } = renderHook(() =>
      useDisclosure({ defaultOpen: true, onClose }),
    );

    act(() => result.current.close());

    expect(result.current.isOpen).toBe(false);
    expect(onClose).toHaveBeenCalled();
  });

  it("toggle() flips the state", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });

  it("setIsOpen sets the state directly", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.setIsOpen(true));
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.setIsOpen(false));
    expect(result.current.isOpen).toBe(false);
  });

  it("onChange callback is called on all state changes", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onChange }));

    act(() => result.current.open());
    expect(onChange).toHaveBeenCalledWith(true);

    act(() => result.current.close());
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("onChange callback is called when toggling", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onChange }));

    act(() => result.current.toggle());
    expect(onChange).toHaveBeenCalledWith(true);

    act(() => result.current.toggle());
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("onChange callback is called when using setIsOpen", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onChange }));

    act(() => result.current.setIsOpen(true));
    expect(onChange).toHaveBeenCalledWith(true);

    act(() => result.current.setIsOpen(false));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("open() calls both onOpen and onChange", () => {
    const onOpen = vi.fn();
    const onChange = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onOpen, onChange }));

    act(() => result.current.open());

    expect(onOpen).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("close() calls both onClose and onChange", () => {
    const onClose = vi.fn();
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDisclosure({ defaultOpen: true, onClose, onChange }),
    );

    act(() => result.current.close());

    expect(onClose).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("toggle() calls correct callbacks on open", () => {
    const onOpen = vi.fn();
    const onChange = vi.fn();
    const { result } = renderHook(() => useDisclosure({ onOpen, onChange }));

    act(() => result.current.toggle());

    expect(onOpen).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggle() calls correct callbacks on close", () => {
    const onClose = vi.fn();
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDisclosure({ defaultOpen: true, onClose, onChange }),
    );

    act(() => result.current.toggle());

    expect(onClose).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
