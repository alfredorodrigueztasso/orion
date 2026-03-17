import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DetailPanel } from "./DetailPanel";

describe("DetailPanel", () => {
  it("renders panel title", () => {
    render(
      <DetailPanel title="User Details" open onClose={() => {}}>
        <div>Details content</div>
      </DetailPanel>,
    );

    expect(screen.getByText("User Details")).toBeInTheDocument();
  });

  it("displays content", () => {
    render(
      <DetailPanel title="Details" open onClose={() => {}}>
        <div>Test content</div>
      </DetailPanel>,
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("closes on close button click", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <DetailPanel title="Details" open onClose={handleClose}>
        <div>Content</div>
      </DetailPanel>,
    );

    const closeButton = screen.getByRole("button");
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <DetailPanel ref={ref} title="Details" open onClose={() => {}}>
        Content
      </DetailPanel>,
    );

    expect(ref).toHaveBeenCalled();
  });

  // ============================================================================
  // MISSING BRANCHES & FUNCTIONS COVERAGE
  // ============================================================================

  describe("DetailPanel Description/Subtitle", () => {
    it("displays description when provided", () => {
      render(
        <DetailPanel
          title="User Details"
          description="Edit user information"
          open
          onClose={() => {}}
        >
          Content
        </DetailPanel>,
      );

      expect(screen.getByText("Edit user information")).toBeInTheDocument();
    });

    it("uses deprecated subtitle prop as fallback", () => {
      render(
        <DetailPanel
          title="User Details"
          subtitle="Old subtitle"
          open
          onClose={() => {}}
        >
          Content
        </DetailPanel>,
      );

      expect(screen.getByText("Old subtitle")).toBeInTheDocument();
    });

    it("prefers description over subtitle when both provided", () => {
      render(
        <DetailPanel
          title="Details"
          description="New description"
          subtitle="Old subtitle"
          open
          onClose={() => {}}
        >
          Content
        </DetailPanel>,
      );

      expect(screen.getByText("New description")).toBeInTheDocument();
      expect(screen.queryByText("Old subtitle")).not.toBeInTheDocument();
    });

    it("does not render subtitle when neither description nor subtitle provided", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}}>
          Content
        </DetailPanel>,
      );

      const header = container.querySelector("[class*='header']");
      const subtitleElements =
        header?.querySelectorAll("[class*='subtitle']") || [];
      expect(subtitleElements.length).toBe(0);
    });
  });

  describe("DetailPanel Overlay", () => {
    it("renders overlay by default", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}}>
          Content
        </DetailPanel>,
      );

      const overlay = container.querySelector("[class*='overlay']");
      expect(overlay).toBeInTheDocument();
    });

    it("does not render overlay when overlay={false}", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}} overlay={false}>
          Content
        </DetailPanel>,
      );

      const overlay = container.querySelector("[class*='overlay']");
      expect(overlay).not.toBeInTheDocument();
    });

    it("closes panel on overlay click when closeOnOverlayClick={true}", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      const { container } = render(
        <DetailPanel
          title="Details"
          open
          onClose={handleClose}
          closeOnOverlayClick={true}
        >
          Content
        </DetailPanel>,
      );

      const overlay = container.querySelector("[class*='overlay']");
      if (overlay) {
        await user.click(overlay);
      }

      expect(handleClose).toHaveBeenCalled();
    });

    it("does not close panel on overlay click when closeOnOverlayClick={false}", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();
      const { container } = render(
        <DetailPanel
          title="Details"
          open
          onClose={handleClose}
          closeOnOverlayClick={false}
        >
          Content
        </DetailPanel>,
      );

      const overlay = container.querySelector("[class*='overlay']");
      if (overlay) {
        await user.click(overlay);
      }

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("DetailPanel Escape Key", () => {
    it("closes panel on Escape key when closeOnEscape={true}", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <DetailPanel
          title="Details"
          open
          onClose={handleClose}
          closeOnEscape={true}
        >
          Content
        </DetailPanel>,
      );

      await user.keyboard("{Escape}");

      expect(handleClose).toHaveBeenCalled();
    });

    it("does not close panel on Escape key when closeOnEscape={false}", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <DetailPanel
          title="Details"
          open
          onClose={handleClose}
          closeOnEscape={false}
        >
          Content
        </DetailPanel>,
      );

      await user.keyboard("{Escape}");

      expect(handleClose).not.toHaveBeenCalled();
    });

    it("does not listen to Escape when panel is closed", async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <DetailPanel
          title="Details"
          open={true}
          onClose={handleClose}
          closeOnEscape={true}
        >
          Content
        </DetailPanel>,
      );

      rerender(
        <DetailPanel
          title="Details"
          open={false}
          onClose={handleClose}
          closeOnEscape={true}
        >
          Content
        </DetailPanel>,
      );

      await user.keyboard("{Escape}");

      // Should not have been called by the Escape handler since panel was closed
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe("DetailPanel Loading State", () => {
    it("displays loading spinner when loading={true}", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}} loading={true}>
          <div>Content should not show</div>
        </DetailPanel>,
      );

      const spinner = container.querySelector("[class*='spinner']");
      expect(spinner).toBeInTheDocument();
      expect(
        screen.queryByText("Content should not show"),
      ).not.toBeInTheDocument();
    });

    it("displays children when loading={false}", () => {
      render(
        <DetailPanel title="Details" open onClose={() => {}} loading={false}>
          <div>Content should show</div>
        </DetailPanel>,
      );

      expect(screen.getByText("Content should show")).toBeInTheDocument();
    });
  });

  describe("DetailPanel Footer", () => {
    it("renders footer when provided", () => {
      render(
        <DetailPanel
          title="Details"
          open
          onClose={() => {}}
          footer={<button>Save</button>}
        >
          Content
        </DetailPanel>,
      );

      expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    });

    it("does not render footer when not provided", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}}>
          Content
        </DetailPanel>,
      );

      const footerDiv = container.querySelectorAll("[class*='footer']");
      // Should only have the header, body - no footer section
      expect(footerDiv.length).toBe(0);
    });
  });

  describe("DetailPanel Size and Position", () => {
    it("applies size class", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}} size="lg">
          Content
        </DetailPanel>,
      );

      const panel = container.querySelector("[role='dialog']");
      expect(panel?.className).toContain("size-lg");
    });

    it("applies position class", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}} position="left">
          Content
        </DetailPanel>,
      );

      const panel = container.querySelector("[role='dialog']");
      expect(panel?.className).toContain("position-left");
    });
  });

  describe("DetailPanel Header Actions", () => {
    it("renders header actions when provided", () => {
      render(
        <DetailPanel
          title="Details"
          open
          onClose={() => {}}
          headerActions={<button>Custom Action</button>}
        >
          Content
        </DetailPanel>,
      );

      expect(
        screen.getByRole("button", { name: "Custom Action" }),
      ).toBeInTheDocument();
    });
  });

  describe("DetailPanel Closed State", () => {
    it("does not render when open={false}", () => {
      const { container } = render(
        <DetailPanel title="Details" open={false} onClose={() => {}}>
          Content
        </DetailPanel>,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe("DetailPanel Accessibility", () => {
    it("has proper dialog role and aria-modal", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}}>
          Content
        </DetailPanel>,
      );

      const panel = container.querySelector("[role='dialog']");
      expect(panel).toHaveAttribute("aria-modal", "true");
    });

    it("has aria-labelledby pointing to title", () => {
      const { container } = render(
        <DetailPanel title="Details" open onClose={() => {}}>
          Content
        </DetailPanel>,
      );

      const panel = container.querySelector("[role='dialog']");
      expect(panel).toHaveAttribute("aria-labelledby", "detail-panel-title");
    });

    it("close button has proper aria-label", () => {
      render(
        <DetailPanel title="Details" open onClose={() => {}}>
          Content
        </DetailPanel>,
      );

      const closeButton = screen.getByLabelText("Close panel");
      expect(closeButton).toBeInTheDocument();
    });
  });
});
