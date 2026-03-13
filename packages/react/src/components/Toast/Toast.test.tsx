/**
 * Toast Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "./Toast";

// Test component that uses the toast hook
const ToastTester = () => {
  const { toast, success, error, warning, info, dismiss, dismissAll } =
    useToast();

  return (
    <div>
      <button onClick={() => toast({ message: "Test toast" })}>
        Show Toast
      </button>
      <button onClick={() => success("Success message")}>Show Success</button>
      <button onClick={() => error("Error message")}>Show Error</button>
      <button onClick={() => warning("Warning message")}>Show Warning</button>
      <button onClick={() => info("Info message")}>Show Info</button>
      <button onClick={() => toast({ title: "Title", message: "With title" })}>
        With Title
      </button>
      <button
        onClick={() => {
          const id = toast({ message: "To dismiss" });
          setTimeout(() => dismiss(id), 100);
        }}
      >
        Dismiss Single
      </button>
      <button onClick={dismissAll}>Dismiss All</button>
      <button
        onClick={() =>
          toast({
            message: "With action",
            action: { label: "Undo", onClick: vi.fn() },
          })
        }
      >
        With Action
      </button>
    </div>
  );
};

describe("Toast", () => {
  it("throws error when useToast is used outside provider", () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      const Component = () => {
        useToast();
        return null;
      };
      render(<Component />);
    }).toThrow("useToast must be used within a ToastProvider");

    spy.mockRestore();
  });

  it("renders toasts when triggered", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Test toast")).toBeInTheDocument();
    });
  });

  it("renders success toast", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));

    await waitFor(() => {
      expect(screen.getByText("Success message")).toBeInTheDocument();
    });
  });

  it("renders error toast", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Error"));

    await waitFor(() => {
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });
  });

  it("renders toast with title", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("With Title"));

    await waitFor(() => {
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("With title")).toBeInTheDocument();
    });
  });

  it("renders toast with action button", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("With Action"));

    await waitFor(() => {
      expect(screen.getByText("With action")).toBeInTheDocument();
      expect(screen.getByText("Undo")).toBeInTheDocument();
    });
  });

  it("dismisses toast when close button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Toast"));

    await waitFor(() => {
      expect(screen.getByText("Test toast")).toBeInTheDocument();
    });

    const dismissButton = screen.getByLabelText("Dismiss");
    await user.click(dismissButton);

    await waitFor(() => {
      expect(screen.queryByText("Test toast")).not.toBeInTheDocument();
    });
  });

  it("dismisses all toasts", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    await user.click(screen.getByText("Show Error"));

    await waitFor(() => {
      expect(screen.getByText("Success message")).toBeInTheDocument();
      expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Dismiss All"));

    await waitFor(() => {
      expect(screen.queryByText("Success message")).not.toBeInTheDocument();
      expect(screen.queryByText("Error message")).not.toBeInTheDocument();
    });
  });

  it("auto-dismisses after duration", async () => {
    vi.useFakeTimers();

    render(
      <ToastProvider defaultDuration={1000}>
        <ToastTester />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Show Toast").click();
    });

    expect(screen.getByText("Test toast")).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500);
    });

    // Direct assertion after advancing timers - no waitFor needed
    expect(screen.queryByText("Test toast")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("limits number of toasts based on maxToasts", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider maxToasts={2}>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Success"));
    await user.click(screen.getByText("Show Error"));
    await user.click(screen.getByText("Show Warning"));

    // Use a short timeout to allow React to process state updates
    await new Promise((resolve) => setTimeout(resolve, 50));

    // First toast should be removed
    expect(screen.queryByText("Success message")).not.toBeInTheDocument();
    // Last two should remain
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByText("Warning message")).toBeInTheDocument();
  });

  it("supports different positions", () => {
    render(
      <ToastProvider position="top-center">
        <ToastTester />
      </ToastProvider>,
    );

    // Just verify it renders without error
    expect(screen.getByText("Show Toast")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Toast"));

    // Allow React to process the click and render the toast
    await new Promise((resolve) => setTimeout(resolve, 50));

    const toast = screen.getByRole("alert");
    expect(toast).toHaveAttribute("aria-live", "polite");
  });
});
