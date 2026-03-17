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

  it("calls action.onClick when action button clicked", async () => {
    const user = userEvent.setup();
    const actionClick = vi.fn();

    const ActionToastTest = () => {
      const { toast } = useToast();
      return (
        <button
          onClick={() =>
            toast({
              message: "Action test",
              action: { label: "Do it", onClick: actionClick },
            })
          }
        >
          Show Action Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <ActionToastTest />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show Action Toast"));

    await waitFor(() => {
      expect(screen.getByText("Action test")).toBeInTheDocument();
    });

    const actionButton = screen.getByText("Do it");
    await user.click(actionButton);

    expect(actionClick).toHaveBeenCalled();
  });

  it("renders toast without dismissible button", async () => {
    const user = userEvent.setup();

    const NonDismissibleToast = () => {
      const { toast } = useToast();
      return (
        <button
          onClick={() => toast({ message: "No dismiss", dismissible: false })}
        >
          Show
        </button>
      );
    };

    render(
      <ToastProvider>
        <NonDismissibleToast />
      </ToastProvider>,
    );

    await user.click(screen.getByText("Show"));

    await waitFor(() => {
      expect(screen.getByText("No dismiss")).toBeInTheDocument();
    });

    // Should not have dismiss button
    const dismissButtons = screen.queryAllByLabelText("Dismiss");
    expect(dismissButtons.length).toBe(0);
  });

  it("renders different toast variants correctly", async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastTester />
      </ToastProvider>,
    );

    // Show info variant
    await user.click(screen.getByText("Show Info"));
    await waitFor(() => {
      expect(screen.getByText("Info message")).toBeInTheDocument();
    });

    // Show warning variant
    await user.click(screen.getByText("Show Warning"));
    await waitFor(() => {
      expect(screen.getByText("Warning message")).toBeInTheDocument();
    });

    // Both should exist
    expect(screen.getByText("Info message")).toBeInTheDocument();
    expect(screen.getByText("Warning message")).toBeInTheDocument();
  });

  // ============================================================================
  // NEW TESTS FOR UNTESTED BRANCHES (Timer & Interaction)
  // ============================================================================

  it("does not auto-dismiss when duration is 0", async () => {
    vi.useFakeTimers();

    const TestComponent = () => {
      const { toast } = useToast();
      return (
        <button onClick={() => toast({ message: "No dismiss", duration: 0 })}>
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Show Toast").click();
    });

    expect(screen.getByText("No dismiss")).toBeInTheDocument();

    // Advance time significantly - toast should still be present
    await act(async () => {
      await vi.advanceTimersByTimeAsync(5000);
    });

    expect(screen.getByText("No dismiss")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("pauses auto-dismiss on mouse enter", async () => {
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

    // Get the toast element and simulate mouse enter
    const toast = screen.getByText("Test toast").closest("[role='alert']");
    await act(async () => {
      fireEvent.mouseEnter(toast!);
      // Advance past the default dismiss time
      await vi.advanceTimersByTimeAsync(1500);
    });

    // Toast should still be present because hover paused the timer
    expect(screen.getByText("Test toast")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("resumes auto-dismiss on mouse leave", async () => {
    vi.useFakeTimers();

    render(
      <ToastProvider defaultDuration={1000}>
        <ToastTester />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Show Toast").click();
    });

    const toast = screen.getByText("Test toast").closest("[role='alert']");

    // Pause timer by hovering
    await act(async () => {
      fireEvent.mouseEnter(toast!);
      await vi.advanceTimersByTimeAsync(500); // Advance 500ms (still less than 1000ms)
    });

    // Resume timer by unhoverng
    await act(async () => {
      fireEvent.mouseLeave(toast!);
      // Now advance time to trigger dismiss (1000 + some buffer)
      await vi.advanceTimersByTimeAsync(1200);
    });

    // Toast should now be dismissed
    expect(screen.queryByText("Test toast")).not.toBeInTheDocument();

    vi.useRealTimers();
  });

  it("calls onDismiss callback when toast is dismissed", async () => {
    vi.useFakeTimers();

    const onDismiss = vi.fn();

    const TestComponent = () => {
      const { toast } = useToast();
      return (
        <button
          onClick={() =>
            toast({
              message: "Toast with callback",
              duration: 500,
              onDismiss,
            })
          }
        >
          Show Toast
        </button>
      );
    };

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    );

    await act(async () => {
      screen.getByText("Show Toast").click();
    });

    expect(screen.getByText("Toast with callback")).toBeInTheDocument();

    // Advance time to trigger auto-dismiss (500ms duration + buffer for dismiss delay)
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(screen.queryByText("Toast with callback")).not.toBeInTheDocument();
    expect(onDismiss).toHaveBeenCalled();

    vi.useRealTimers();
  });
});
