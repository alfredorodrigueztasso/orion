import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("Modal", () => {
  beforeEach(() => {
    // Reset body overflow before each test
    document.body.style.overflow = "";
  });

  afterEach(() => {
    cleanup();
    // Ensure body overflow is reset
    document.body.style.overflow = "";
  });

  it("renders when open is true", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when open is false", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <Modal.Body>Modal content</Modal.Body>
      </Modal>,
    );
    expect(screen.queryByText("Modal content")).not.toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(
      <Modal open={true} onClose={() => {}} size="sm">
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    let modal = screen.getByRole("dialog").querySelector("div");
    expect(modal?.className).toMatch(/sm/);

    rerender(
      <Modal open={true} onClose={() => {}} size="md">
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    modal = screen.getByRole("dialog").querySelector("div");
    expect(modal?.className).toMatch(/md/);

    rerender(
      <Modal open={true} onClose={() => {}} size="lg">
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    modal = screen.getByRole("dialog").querySelector("div");
    expect(modal?.className).toMatch(/lg/);
  });

  it("uses default size when not specified", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    const modal = screen.getByRole("dialog").querySelector("div");
    expect(modal?.className).toMatch(/md/);
  });

  it("shows close button by default", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
  });

  it("hides close button when showCloseButton is false", () => {
    render(
      <Modal open={true} onClose={() => {}} showCloseButton={false}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    expect(screen.queryByLabelText("Close modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );

    await user.click(screen.getByLabelText("Close modal"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Escape key is pressed", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );

    await user.keyboard("{Escape}");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on Escape when closeOnEscape is false", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose} closeOnEscape={false}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );

    await user.keyboard("{Escape}");
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("calls onClose when backdrop is clicked", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );

    // Click the backdrop (dialog element itself)
    await user.click(screen.getByRole("dialog"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when clicking modal content", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );

    // Click the modal content (not backdrop)
    await user.click(screen.getByText("Content"));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("does not close on backdrop click when closeOnBackdrop is false", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Modal open={true} onClose={handleClose} closeOnBackdrop={false}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );

    await user.click(screen.getByRole("dialog"));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("has correct accessibility attributes", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("prevents body scroll when open", () => {
    render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(
      <Modal open={true} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <Modal open={false} onClose={() => {}}>
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    expect(document.body.style.overflow).toBe("");
  });

  it("applies custom className", () => {
    render(
      <Modal open={true} onClose={() => {}} className="custom-modal">
        <Modal.Body>Content</Modal.Body>
      </Modal>,
    );
    const modal = screen.getByRole("dialog").querySelector("div");
    expect(modal).toHaveClass("custom-modal");
  });

  describe("Modal.Header", () => {
    it("renders header content", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header>Header Text</Modal.Header>
        </Modal>,
      );
      expect(screen.getByText("Header Text")).toBeInTheDocument();
    });

    it("applies custom className to header", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header className="custom-header">Header</Modal.Header>
        </Modal>,
      );
      const header = screen.getByText("Header");
      expect(header.className).toContain("custom-header");
    });
  });

  describe("Modal.Body", () => {
    it("renders body content", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Body>Body Text</Modal.Body>
        </Modal>,
      );
      expect(screen.getByText("Body Text")).toBeInTheDocument();
    });

    it("applies custom className to body", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Body className="custom-body">Body</Modal.Body>
        </Modal>,
      );
      const body = screen.getByText("Body");
      expect(body.className).toContain("custom-body");
    });
  });

  describe("Modal.Footer", () => {
    it("renders footer content", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Footer>Footer Text</Modal.Footer>
        </Modal>,
      );
      expect(screen.getByText("Footer Text")).toBeInTheDocument();
    });

    it("applies custom className to footer", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Footer className="custom-footer">Footer</Modal.Footer>
        </Modal>,
      );
      const footer = screen.getByText("Footer");
      expect(footer.className).toContain("custom-footer");
    });
  });

  describe("Complete Modal", () => {
    it("renders all sections together", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header>Header</Modal.Header>
          <Modal.Body>Body</Modal.Body>
          <Modal.Footer>Footer</Modal.Footer>
        </Modal>,
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("renders with complex content", () => {
      render(
        <Modal open={true} onClose={() => {}}>
          <Modal.Header>
            <h2>Confirm Action</h2>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to proceed?</p>
            <p>This action cannot be undone.</p>
          </Modal.Body>
          <Modal.Footer>
            <button>Cancel</button>
            <button>Confirm</button>
          </Modal.Footer>
        </Modal>,
      );

      expect(screen.getByText("Confirm Action")).toBeInTheDocument();
      expect(
        screen.getByText("Are you sure you want to proceed?"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("This action cannot be undone."),
      ).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
      expect(screen.getByText("Confirm")).toBeInTheDocument();
    });
  });
});
