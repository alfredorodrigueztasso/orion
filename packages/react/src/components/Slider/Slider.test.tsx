/**
 * Slider Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./Slider";

describe("Slider", () => {
  it("renders with value", () => {
    render(<Slider value={50} onChange={() => {}} />);
    expect(screen.getByRole("slider")).toHaveValue("50");
  });

  it("calls onChange when value changes", () => {
    const onChange = vi.fn();
    render(<Slider value={50} onChange={onChange} />);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "75" } });

    expect(onChange).toHaveBeenCalledWith(75);
  });

  it("respects min and max bounds", () => {
    render(<Slider value={50} onChange={() => {}} min={10} max={90} />);
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("min", "10");
    expect(slider).toHaveAttribute("max", "90");
  });

  it("respects step value", () => {
    render(<Slider value={50} onChange={() => {}} step={5} />);
    expect(screen.getByRole("slider")).toHaveAttribute("step", "5");
  });

  it("renders different sizes", () => {
    const { container, rerender } = render(
      <Slider value={50} onChange={() => {}} size="sm" />,
    );
    expect(container.querySelector('[class*="sm"]')).toBeInTheDocument();

    rerender(<Slider value={50} onChange={() => {}} size="md" />);
    expect(container.querySelector('[class*="md"]')).toBeInTheDocument();

    rerender(<Slider value={50} onChange={() => {}} size="lg" />);
    expect(container.querySelector('[class*="lg"]')).toBeInTheDocument();
  });

  it("renders disabled state", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} disabled />,
    );
    expect(screen.getByRole("slider")).toBeDisabled();
    expect(container.querySelector('[class*="disabled"]')).toBeInTheDocument();
  });

  it("shows value display", () => {
    render(<Slider value={50} onChange={() => {}} showValue />);
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("formats value with custom function", () => {
    render(
      <Slider
        value={50}
        onChange={() => {}}
        showValue
        formatValue={(v) => `${v}%`}
      />,
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("shows min and max labels", () => {
    render(
      <Slider value={50} onChange={() => {}} min={0} max={100} showLabels />,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("formats labels with custom function", () => {
    render(
      <Slider
        value={50}
        onChange={() => {}}
        min={0}
        max={100}
        showLabels
        formatValue={(v) => `$${v}`}
      />,
    );
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("shows tick marks", () => {
    const { container } = render(
      <Slider value={50} onChange={() => {}} showTicks />,
    );
    expect(container.querySelector('[class*="ticks"]')).toBeInTheDocument();
  });

  it("shows custom tick values", () => {
    const { container } = render(
      <Slider
        value={50}
        onChange={() => {}}
        showTicks
        tickValues={[0, 25, 50, 75, 100]}
      />,
    );
    const ticks = Array.from(
      container.querySelectorAll('[class*="tick"]'),
    ).filter(
      (el) =>
        (el as HTMLElement).className.includes("tick") &&
        !(el as HTMLElement).className.includes("ticks"),
    );
    expect(ticks).toHaveLength(5);
  });

  it("has correct ARIA attributes", () => {
    render(
      <Slider
        value={50}
        onChange={() => {}}
        min={0}
        max={100}
        label="Volume"
      />,
    );
    const slider = screen.getByRole("slider");

    expect(slider).toHaveAttribute("aria-label", "Volume");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
    expect(slider).toHaveAttribute("aria-valuenow", "50");
  });

  it("uses custom id when provided", () => {
    render(<Slider value={50} onChange={() => {}} id="custom-slider" />);
    expect(screen.getByRole("slider")).toHaveAttribute("id", "custom-slider");
  });

  it("calls onChangeStart and onChangeEnd", () => {
    const onChangeStart = vi.fn();
    const onChangeEnd = vi.fn();

    render(
      <Slider
        value={50}
        onChange={() => {}}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
      />,
    );

    const slider = screen.getByRole("slider");

    fireEvent.mouseDown(slider);
    expect(onChangeStart).toHaveBeenCalled();

    fireEvent.mouseUp(slider);
    expect(onChangeEnd).toHaveBeenCalledWith(50);
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Slider ref={ref} value={50} onChange={() => {}} />);
    expect(ref).toHaveBeenCalled();
  });
});
