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
});
