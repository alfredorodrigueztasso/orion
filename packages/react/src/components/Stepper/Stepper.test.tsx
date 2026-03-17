/**
 * Stepper Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Stepper } from "./Stepper";

const mockSteps = [
  { id: "1", title: "Step 1", description: "First step" },
  { id: "2", title: "Step 2", description: "Second step" },
  { id: "3", title: "Step 3", description: "Third step" },
];

describe("Stepper", () => {
  it("renders all steps", () => {
    render(<Stepper steps={mockSteps} />);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });

  it("renders step descriptions", () => {
    render(<Stepper steps={mockSteps} />);
    expect(screen.getByText("First step")).toBeInTheDocument();
    expect(screen.getByText("Second step")).toBeInTheDocument();
  });

  it("shows step numbers by default", () => {
    render(<Stepper steps={mockSteps} />);
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("hides step numbers when showNumbers is false", () => {
    render(<Stepper steps={mockSteps} showNumbers={false} />);
    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
  });

  it("marks correct step as current", () => {
    render(<Stepper steps={mockSteps} currentStep={1} />);
    const steps = screen.getAllByText(/Step \d/);
    expect(steps[1].closest("[aria-current]")).toHaveAttribute(
      "aria-current",
      "step",
    );
  });

  it("renders optional indicator", () => {
    const stepsWithOptional = [
      { id: "1", title: "Step 1" },
      { id: "2", title: "Step 2", optional: true },
    ];
    render(<Stepper steps={stepsWithOptional} />);
    expect(screen.getByText("(Optional)")).toBeInTheDocument();
  });

  it("renders error state", () => {
    const stepsWithError = [
      {
        id: "1",
        title: "Step 1",
        error: true,
        errorMessage: "Something went wrong",
      },
    ];
    render(<Stepper steps={stepsWithError} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("handles step click when clickable", () => {
    const onStepClick = vi.fn();
    render(<Stepper steps={mockSteps} clickable onStepClick={onStepClick} />);

    fireEvent.click(screen.getByText("Step 2"));
    expect(onStepClick).toHaveBeenCalledWith(1, mockSteps[1]);
  });

  it("does not trigger click when not clickable", () => {
    const onStepClick = vi.fn();
    render(<Stepper steps={mockSteps} onStepClick={onStepClick} />);

    fireEvent.click(screen.getByText("Step 2"));
    expect(onStepClick).not.toHaveBeenCalled();
  });

  it("does not trigger click on disabled step", () => {
    const stepsWithDisabled = [
      { id: "1", title: "Step 1" },
      { id: "2", title: "Step 2", disabled: true },
    ];
    const onStepClick = vi.fn();
    render(
      <Stepper steps={stepsWithDisabled} clickable onStepClick={onStepClick} />,
    );

    fireEvent.click(screen.getByText("Step 2"));
    expect(onStepClick).not.toHaveBeenCalled();
  });

  it("handles keyboard navigation", () => {
    const onStepClick = vi.fn();
    render(<Stepper steps={mockSteps} clickable onStepClick={onStepClick} />);

    const step = screen.getByText("Step 1").closest('[role="button"]');
    fireEvent.keyDown(step!, { key: "Enter" });
    expect(onStepClick).toHaveBeenCalledWith(0, mockSteps[0]);

    onStepClick.mockClear();
    fireEvent.keyDown(step!, { key: " " });
    expect(onStepClick).toHaveBeenCalledWith(0, mockSteps[0]);
  });

  it("renders different sizes", () => {
    const { container, rerender } = render(
      <Stepper steps={mockSteps} size="sm" />,
    );
    expect(container.querySelector('[class*="sm"]')).toBeInTheDocument();

    rerender(<Stepper steps={mockSteps} size="md" />);
    expect(container.querySelector('[class*="md"]')).toBeInTheDocument();

    rerender(<Stepper steps={mockSteps} size="lg" />);
    expect(container.querySelector('[class*="lg"]')).toBeInTheDocument();
  });

  it("renders horizontal orientation by default", () => {
    const { container } = render(<Stepper steps={mockSteps} />);
    expect(
      container.querySelector('[class*="horizontal"]'),
    ).toBeInTheDocument();
  });

  it("renders vertical orientation", () => {
    const { container } = render(
      <Stepper steps={mockSteps} orientation="vertical" />,
    );
    expect(container.querySelector('[class*="vertical"]')).toBeInTheDocument();
  });

  it("hides connectors when showConnectors is false", () => {
    const { container } = render(
      <Stepper steps={mockSteps} showConnectors={false} />,
    );
    expect(container.querySelector(".connector")).not.toBeInTheDocument();
  });

  it("has correct ARIA attributes", () => {
    render(<Stepper steps={mockSteps} />);
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Progress",
    );
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<Stepper ref={ref} steps={mockSteps} />);
    expect(ref).toHaveBeenCalled();
  });
});
