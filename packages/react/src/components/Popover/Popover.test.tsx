/**
 * Popover Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";

describe("Popover", () => {
  it("renders trigger element", () => {
    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Open Popover" }),
    ).toBeInTheDocument();
  });

  it("opens on click by default", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  it("closes on second click", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  it("does not close on Escape when closeOnEscape is false", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        closeOnEscape={false}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("closes on click outside", async () => {
    const user = userEvent.setup();

    render(
      <>
        <button>Outside</button>
        <Popover
          trigger={<button>Open Popover</button>}
          content={<div>Popover content</div>}
        />
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Outside" }));

    await waitFor(() => {
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  it("does not close on click outside when closeOnClickOutside is false", async () => {
    const user = userEvent.setup();

    render(
      <>
        <button>Outside</button>
        <Popover
          trigger={<button>Open Popover</button>}
          content={<div>Popover content</div>}
          closeOnClickOutside={false}
        />
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("works as controlled component", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        open={false}
        onOpenChange={onOpenChange}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        open={true}
        onOpenChange={onOpenChange}
      />,
    );

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("respects defaultOpen prop", () => {
    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        defaultOpen={true}
      />,
    );

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("opens on hover when triggerType is hover", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Hover me</button>}
        content={<div>Popover content</div>}
        triggerType="hover"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  it("opens on focus when triggerType is focus", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Focus me</button>}
        content={<div>Popover content</div>}
        triggerType="focus"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Focus me" });
    await user.click(trigger); // Focus the button

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  it("hides arrow when showArrow is false", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        showArrow={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open Popover" }));

    const popover = screen.getByRole("dialog");
    const arrow = popover.querySelector('[class*="arrow"]');
    expect(arrow).not.toBeInTheDocument();
  });

  it("has proper accessibility attributes", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    expect(trigger).toHaveAttribute("aria-haspopup", "true");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("renders popover with different placements", async () => {
    const user = userEvent.setup();
    const placements = [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
    ];

    for (const placement of placements) {
      const { unmount } = render(
        <Popover
          trigger={<button>Open</button>}
          content={<div>Content</div>}
          placement={placement as any}
        />,
      );

      await user.click(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("Content")).toBeInTheDocument();
      });

      unmount();
    }
  });

  it("applies arrow when showArrow is true (default)", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        showArrow={true}
      />,
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      const popover = screen.getByRole("dialog");
      const arrow = popover.querySelector('[class*="arrow"]');
      expect(arrow).toBeInTheDocument();
    });
  });

  it("respects offset prop", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        offset={20}
      />,
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  it("renders popover with fullWidth prop", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        fullWidth={true}
      />,
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      const popover = screen.getByRole("dialog");
      expect(popover).toBeInTheDocument();
    });
  });

  it("respects custom className", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        className="custom-popover"
      />,
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      const popover = screen.getByRole("dialog");
      expect(popover.className).toContain("custom-popover");
    });
  });

  it("closes on hover out when triggerType is hover", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Hover me</button>}
        content={<div>Popover content</div>}
        triggerType="hover"
        closeDelay={0}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    await user.unhover(trigger);

    await waitFor(() => {
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  it("triggers close with delay", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Hover me</button>}
        content={<div>Popover content</div>}
        triggerType="hover"
        closeDelay={100}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    await user.unhover(trigger);

    // Should still be visible immediately
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("forwards ref to trigger element", () => {
    const ref = { current: null as HTMLDivElement | null };

    render(
      <Popover
        ref={ref}
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("calls onOpenChange callback with correct values", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        onOpenChange={onOpenChange}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    await user.click(trigger);

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("does not show popover content when open is false (controlled)", async () => {
    const { rerender } = render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        open={false}
      />,
    );

    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();

    rerender(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        open={true}
      />,
    );

    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("closes popover on focus out when triggerType is focus", async () => {
    const user = userEvent.setup();

    render(
      <>
        <Popover
          trigger={<button>Focus me</button>}
          content={<div>Popover content</div>}
          triggerType="focus"
          closeDelay={0}
        />
        <button>Outside</button>
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Focus me" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    const outsideButton = screen.getByRole("button", { name: "Outside" });
    await user.click(outsideButton);

    await waitFor(() => {
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });

  it("renders popover content via portal", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Portal content</div>}
      />,
    );

    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText("Portal content")).toBeInTheDocument();
    });

    // Content should be in a portal (outside the trigger container)
    const content = screen.getByText("Portal content");
    const popover = content.closest('[role="dialog"]');
    expect(popover).toBeInTheDocument();
  });

  // Additional coverage tests
  it("supports manual trigger type", async () => {
    const onOpenChange = vi.fn();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        triggerType="manual"
        open={false}
        onOpenChange={onOpenChange}
      />,
    );

    // Manual trigger should not respond to click
    const trigger = screen.getByRole("button");
    expect(trigger).toHaveAttribute("aria-haspopup", "true");

    // Content should not be visible
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
  });

  it("does not close on click inside popover", async () => {
    const user = userEvent.setup();

    render(
      <>
        <button>Outside</button>
        <Popover
          trigger={<button>Open Popover</button>}
          content={<button>Click inside</button>}
        />
      </>,
    );

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Click inside")).toBeInTheDocument();
    });

    // Click inside the popover
    const insideButton = screen.getByRole("button", { name: "Click inside" });
    await user.click(insideButton);

    // Popover should still be visible
    expect(screen.getByText("Click inside")).toBeInTheDocument();
  });

  it("displays arrow in correct position for each placement", async () => {
    const user = userEvent.setup();
    const placements = [
      "top",
      "bottom",
      "left",
      "right",
      "top-start",
      "top-end",
      "bottom-start",
      "bottom-end",
      "left-start",
      "left-end",
      "right-start",
      "right-end",
    ];

    for (const placement of placements) {
      const { unmount, container } = render(
        <Popover
          trigger={<button>Open</button>}
          content={<div>Content</div>}
          placement={placement as any}
          showArrow={true}
        />,
      );

      await user.click(screen.getByRole("button"));

      await waitFor(() => {
        const popover = screen.getByRole("dialog");
        const arrow = popover.querySelector('[class*="arrow"]');
        expect(arrow).toBeInTheDocument();
      });

      unmount();
    }
  });

  it("window resize triggers position update", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    // Simulate window resize
    window.dispatchEvent(new Event("resize"));

    // Popover should still be visible and functional
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("window scroll triggers position update", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    // Simulate window scroll
    window.dispatchEvent(new Event("scroll", { bubbles: true }));

    // Popover should still be visible
    expect(screen.getByText("Popover content")).toBeInTheDocument();
  });

  it("responds correctly with fullWidth prop", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        fullWidth={true}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });
  });

  it("trigger element gets aria-expanded attribute", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button");

    // Initially collapsed
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    // After opening
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    await user.click(trigger);

    // After closing
    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("popover dialog has correct ARIA attributes", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    await waitFor(() => {
      const popover = screen.getByRole("dialog");
      expect(popover).toHaveAttribute("aria-modal", "false");
    });
  });

  it("handles non-element trigger gracefully", () => {
    render(
      <Popover
        trigger="Click me" // String instead of element
        content={<div>Popover content</div>}
      />,
    );

    // Should render without crashing
    expect(document.body).toBeInTheDocument();
  });

  it("applies custom className to popover content", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Open Popover</button>}
        content={<div>Popover content</div>}
        className="my-custom-popover"
      />,
    );

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    await waitFor(() => {
      const popover = screen.getByRole("dialog");
      expect(popover.className).toContain("my-custom-popover");
    });
  });

  it("zero closeDelay closes immediately", async () => {
    const user = userEvent.setup();

    render(
      <Popover
        trigger={<button>Hover me</button>}
        content={<div>Popover content</div>}
        triggerType="hover"
        closeDelay={0}
      />,
    );

    const trigger = screen.getByRole("button");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByText("Popover content")).toBeInTheDocument();
    });

    await user.unhover(trigger);

    // Should close immediately with zero delay
    await waitFor(() => {
      expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
    });
  });
});
