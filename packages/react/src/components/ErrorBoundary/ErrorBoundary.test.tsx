import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

// Component that throws
function ThrowingComponent({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>Content rendered successfully</div>;
}

describe("ErrorBoundary", () => {
  // Suppress console.error for expected errors
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText("Content rendered successfully"),
    ).toBeInTheDocument();
  });

  it("renders default fallback UI when error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it("renders custom ReactNode fallback", () => {
    render(
      <ErrorBoundary fallback={<div>Custom error message</div>}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });

  it("renders function fallback with error and reset", () => {
    render(
      <ErrorBoundary
        fallback={(error, reset) => (
          <div>
            <span>Error: {error.message}</span>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      >
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("calls onError callback when error occurs", () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Test error" }),
      expect.objectContaining({ componentStack: expect.any(String) }),
    );
  });

  it("resets error state using function fallback reset", () => {
    let shouldThrow = true;

    function MaybeThrow() {
      if (shouldThrow) throw new Error("Test error");
      return <div>Content rendered successfully</div>;
    }

    render(
      <ErrorBoundary
        fallback={(_error, reset) => (
          <button
            onClick={() => {
              shouldThrow = false;
              reset();
            }}
          >
            Reset
          </button>
        )}
      >
        <MaybeThrow />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Reset")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Reset"));
    expect(
      screen.getByText("Content rendered successfully"),
    ).toBeInTheDocument();
  });

  it("resets error state when resetKey changes", () => {
    const { rerender } = render(
      <ErrorBoundary resetKey={1}>
        <ThrowingComponent shouldThrow={true} />
      </ErrorBoundary>,
    );
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();

    rerender(
      <ErrorBoundary resetKey={2}>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(
      screen.getByText("Content rendered successfully"),
    ).toBeInTheDocument();
  });
});
