import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from "./Banner";
import { AlertCircle, X } from "lucide-react";

describe("Banner", () => {
  it("renders banner content", () => {
    render(
      <Banner variant="info" icon={<AlertCircle size={20} />}>
        Important information
      </Banner>,
    );

    expect(screen.getByText("Important information")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { container, rerender } = render(
      <Banner variant="success">Success</Banner>,
    );

    expect(container.querySelector("[class*='success']")).toBeInTheDocument();

    rerender(<Banner variant="error">Error</Banner>);
    expect(container).toBeInTheDocument();
  });

  it("handles close button", async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(
      <Banner closable onClose={handleClose}>
        Closable Banner
      </Banner>,
    );

    const closeButton = screen.getByRole("button");
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it("displays action button", async () => {
    const handleAction = vi.fn();
    const user = userEvent.setup();

    render(
      <Banner action={{ label: "Learn more", onClick: handleAction }}>
        Banner with action
      </Banner>,
    );

    const actionButton = screen.getByText("Learn more");
    await user.click(actionButton);

    expect(handleAction).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Banner ref={ref}>Banner</Banner>);
    expect(ref).toHaveBeenCalled();
  });
});
