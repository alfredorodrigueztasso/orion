import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders with progress value", () => {
    render(<ProgressBar value={50} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays correct aria attributes", () => {
    render(<ProgressBar value={75} max={100} />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "75");
    expect(progressBar).toHaveAttribute("aria-valuemin", "0");
    expect(progressBar).toHaveAttribute("aria-valuemax", "100");
  });

  it("applies size classes correctly", () => {
    const { container, rerender } = render(
      <ProgressBar value={50} size="sm" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);

    rerender(<ProgressBar value={50} size="md" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);

    rerender(<ProgressBar value={50} size="lg" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("uses default size when not specified", () => {
    const { container } = render(<ProgressBar value={50} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);
  });

  it("applies variant classes correctly", () => {
    const { container, rerender } = render(
      <ProgressBar value={50} variant="primary" />,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/primary/);

    rerender(<ProgressBar value={50} variant="success" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/success/);

    rerender(<ProgressBar value={50} variant="warning" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/warning/);

    rerender(<ProgressBar value={50} variant="error" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/error/);

    rerender(<ProgressBar value={50} variant="info" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/info/);
  });

  it("uses default variant when not specified", () => {
    const { container } = render(<ProgressBar value={50} />);
    expect((container.firstChild as HTMLElement).className).toMatch(/primary/);
  });

  it("shows percentage label when showLabel is true", () => {
    render(<ProgressBar value={65} showLabel />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("does not show percentage label by default", () => {
    render(<ProgressBar value={65} />);
    expect(screen.queryByText("65%")).not.toBeInTheDocument();
  });

  it("displays custom label", () => {
    render(<ProgressBar value={50} label="Uploading files..." />);
    expect(screen.getByText("Uploading files...")).toBeInTheDocument();
  });

  it("displays both custom label and percentage", () => {
    render(<ProgressBar value={75} label="Loading" showLabel />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("calculates percentage correctly", () => {
    render(<ProgressBar value={50} max={100} showLabel />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("handles custom max value", () => {
    render(<ProgressBar value={25} max={50} showLabel />);
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("clamps value to 0-100%", () => {
    const { rerender } = render(<ProgressBar value={150} showLabel />);
    expect(screen.getByText("100%")).toBeInTheDocument();

    rerender(<ProgressBar value={-10} showLabel />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders indeterminate state", () => {
    const { container } = render(<ProgressBar indeterminate />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /indeterminate/,
    );
  });

  it("does not show percentage in indeterminate state", () => {
    render(<ProgressBar indeterminate showLabel label="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("%")).not.toBeInTheDocument();
  });

  it("does not have aria-valuenow in indeterminate state", () => {
    render(<ProgressBar indeterminate />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).not.toHaveAttribute("aria-valuenow");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProgressBar value={50} className="custom-progress" />,
    );
    expect(container.firstChild).toHaveClass("custom-progress");
  });

  it("passes through HTML attributes", () => {
    render(<ProgressBar value={50} data-testid="test-progress" />);
    expect(screen.getByTestId("test-progress")).toBeInTheDocument();
  });

  it("has correct aria-label", () => {
    render(<ProgressBar value={75} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Progress: 75%",
    );
  });

  it("uses custom label in aria-label", () => {
    render(<ProgressBar value={50} label="Downloading file" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-label",
      "Downloading file",
    );
  });

  it("renders with 0 value", () => {
    render(<ProgressBar value={0} showLabel />);
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders with 100 value", () => {
    render(<ProgressBar value={100} showLabel />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("works without value in indeterminate mode", () => {
    render(<ProgressBar indeterminate label="Loading..." />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  describe("All variants", () => {
    it("renders primary variant", () => {
      const { container } = render(
        <ProgressBar value={50} variant="primary" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(
        /primary/,
      );
    });

    it("renders success variant", () => {
      const { container } = render(
        <ProgressBar value={50} variant="success" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(
        /success/,
      );
    });

    it("renders warning variant", () => {
      const { container } = render(
        <ProgressBar value={50} variant="warning" />,
      );
      expect((container.firstChild as HTMLElement).className).toMatch(
        /warning/,
      );
    });

    it("renders error variant", () => {
      const { container } = render(<ProgressBar value={50} variant="error" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/error/);
    });

    it("renders info variant", () => {
      const { container } = render(<ProgressBar value={50} variant="info" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/info/);
    });
  });
});
