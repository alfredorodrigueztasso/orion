import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("renders child element", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("does not show tooltip initially", () => {
    render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on mouse enter", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));

    // Tooltip should be visible
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  it("hides tooltip on mouse leave", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Hover me");
    await user.hover(button);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.unhover(button);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text">
        <button>Focus me</button>
      </Tooltip>,
    );

    await user.tab(); // Focus the button

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("hides tooltip on blur", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text">
        <button>Focus me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Focus me");
    await user.click(button);

    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    await user.tab(); // Blur the button

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("does not show tooltip when disabled", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" disabled>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("applies top placement by default", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip?.className).toMatch(/top/);
  });

  it("applies right placement", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Tooltip text" placement="right" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip?.className).toMatch(/right/);
  });

  it("applies bottom placement", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Tooltip text" placement="bottom" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip?.className).toMatch(/bottom/);
  });

  it("applies left placement", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Tooltip text" placement="left" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip?.className).toMatch(/left/);
  });

  it("applies custom className", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Tooltip text" className="custom-tooltip" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));
    await screen.findByRole("tooltip");
    const tooltip = container.querySelector('[role="tooltip"]');
    expect(tooltip).toHaveClass("custom-tooltip");
  });

  it("cancels timeout if mouse leaves before delay", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const button = screen.getByText("Hover me");
    await user.hover(button);
    await screen.findByRole("tooltip");

    await user.unhover(button);

    // Tooltip should disappear
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("respects custom delay", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));

    // With delay=0, tooltip should appear immediately
    await screen.findByRole("tooltip");
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
  });

  it("renders complex content", async () => {
    const user = userEvent.setup();
    const complexContent = (
      <div>
        <strong>Title</strong>
        <p>Description</p>
      </div>
    );

    render(
      <Tooltip content={complexContent} delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));

    await screen.findByRole("tooltip");
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders with icon button child", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Info tooltip" delay={0}>
        <button aria-label="Info">ℹ️</button>
      </Tooltip>,
    );

    await user.hover(screen.getByLabelText("Info"));

    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Info tooltip")).toBeInTheDocument();
  });

  it("renders arrow indicator", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Tooltip text" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    await user.hover(screen.getByText("Hover me"));

    const arrow = container.querySelector('[class*="arrow"]');
    expect(arrow).toBeInTheDocument();
  });

  describe("All placements", () => {
    it("renders top placement", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tooltip content="Top" placement="top" delay={0}>
          <button>Hover</button>
        </Tooltip>,
      );

      await user.hover(screen.getByText("Hover"));

      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip?.className).toMatch(/top/);
    });

    it("renders right placement", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tooltip content="Right" placement="right" delay={0}>
          <button>Hover</button>
        </Tooltip>,
      );

      await user.hover(screen.getByText("Hover"));

      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip?.className).toMatch(/right/);
    });

    it("renders bottom placement", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tooltip content="Bottom" placement="bottom" delay={0}>
          <button>Hover</button>
        </Tooltip>,
      );

      await user.hover(screen.getByText("Hover"));

      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip?.className).toMatch(/bottom/);
    });

    it("renders left placement", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tooltip content="Left" placement="left" delay={0}>
          <button>Hover</button>
        </Tooltip>,
      );

      await user.hover(screen.getByText("Hover"));

      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip?.className).toMatch(/left/);
    });

    it("does not show tooltip on hover when disabled", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tooltip content="Should not appear" disabled={true} delay={0}>
          <button>Hover</button>
        </Tooltip>,
      );

      await user.hover(screen.getByText("Hover"));

      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).not.toBeInTheDocument();
    });

    it("does not show tooltip on focus when disabled", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Tooltip content="Should not appear" disabled={true}>
          <button>Focus me</button>
        </Tooltip>,
      );

      const button = screen.getByText("Focus me");
      await user.click(button);

      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).not.toBeInTheDocument();
    });

    it("clears timeout on mouseLeave before delay completes", async () => {
      vi.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      const { container } = render(
        <Tooltip content="Delayed" delay={500}>
          <button>Hover</button>
        </Tooltip>,
      );

      const button = screen.getByText("Hover");

      // Hover and then immediately leave
      fireEvent.mouseEnter(button);
      fireEvent.mouseLeave(button);

      // Advance timers - tooltip should NOT appear
      vi.advanceTimersByTime(600);

      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).not.toBeInTheDocument();

      vi.useRealTimers();
    });
  });
});
