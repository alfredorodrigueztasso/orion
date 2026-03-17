/**
 * Drawer Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer } from "./Drawer";

describe("Drawer", () => {
  it("renders when open is true", () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <Drawer open={false} onClose={() => {}}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Drawer open={true} onClose={onClose}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    const closeButton = screen.getByLabelText("Close drawer");
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when backdrop is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Drawer open={true} onClose={onClose}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    // Click on the backdrop (aria-hidden div)
    const backdrop = document.querySelector('[class*="backdrop"]');
    await user.click(backdrop!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnBackdrop is false", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Drawer open={true} onClose={onClose} closeOnBackdrop={false}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    const backdrop = document.querySelector('[class*="backdrop"]');
    await user.click(backdrop!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when Escape is pressed", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Drawer open={true} onClose={onClose}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when closeOnEscape is false", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Drawer open={true} onClose={onClose} closeOnEscape={false}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    await user.keyboard("{Escape}");

    expect(onClose).not.toHaveBeenCalled();
  });

  it("hides close button when showCloseButton is false", () => {
    render(
      <Drawer open={true} onClose={() => {}} showCloseButton={false}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(screen.queryByLabelText("Close drawer")).not.toBeInTheDocument();
  });

  it("renders Header, Body, and Footer", () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <Drawer.Header>Header</Drawer.Header>
        <Drawer.Body>Body</Drawer.Body>
        <Drawer.Footer>Footer</Drawer.Footer>
      </Drawer>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies placement classes", () => {
    const { rerender } = render(
      <Drawer open={true} onClose={() => {}} placement="left">
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(screen.getByRole("dialog").className).toContain("left");

    rerender(
      <Drawer open={true} onClose={() => {}} placement="bottom">
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(screen.getByRole("dialog").className).toContain("bottom");
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <Drawer open={true} onClose={() => {}} size="sm">
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(screen.getByRole("dialog").className).toContain("size-sm");

    rerender(
      <Drawer open={true} onClose={() => {}} size="lg">
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(screen.getByRole("dialog").className).toContain("size-lg");
  });

  it("has proper accessibility attributes", () => {
    render(
      <Drawer open={true} onClose={() => {}}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("locks body scroll when open", () => {
    const { unmount } = render(
      <Drawer open={true} onClose={() => {}}>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
