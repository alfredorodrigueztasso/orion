import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
  it("renders nothing when open is false", () => {
    render(
      <AlertDialog open={false} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    expect(screen.queryByText("Delete?")).not.toBeInTheDocument();
  });

  it("renders dialog when open is true", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
        <AlertDialog.Description>
          This cannot be undone.
        </AlertDialog.Description>
      </AlertDialog>,
    );

    expect(screen.getByText("Delete?")).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it('has role="alertdialog" and aria-modal', () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    const dialog = screen.getByRole("alertdialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("has aria-labelledby pointing to title", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Title>Delete account?</AlertDialog.Title>
      </AlertDialog>,
    );

    const dialog = screen.getByRole("alertdialog");
    const labelId = dialog.getAttribute("aria-labelledby");
    expect(labelId).toBeTruthy();

    const title = screen.getByText("Delete account?");
    expect(title).toHaveAttribute("id", labelId);
  });

  it("has aria-describedby pointing to description", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
        <AlertDialog.Description>
          This cannot be undone.
        </AlertDialog.Description>
      </AlertDialog>,
    );

    const dialog = screen.getByRole("alertdialog");
    const descId = dialog.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();

    const description = screen.getByText("This cannot be undone.");
    expect(description).toHaveAttribute("id", descId);
  });

  it("does NOT close on backdrop click by default", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <AlertDialog open={true} onClose={onClose}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    const backdrop = screen.getByRole("alertdialog");
    await user.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on backdrop click when closeOnBackdrop is true", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <AlertDialog open={true} onClose={onClose} closeOnBackdrop>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    // Click on the backdrop (the alertdialog container), not the dialog content
    const backdrop = screen.getByRole("alertdialog");
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT close on Escape by default", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <AlertDialog open={true} onClose={onClose}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    await user.keyboard("{Escape}");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on Escape when closeOnEscape is true", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <AlertDialog open={true} onClose={onClose} closeOnEscape>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders Icon subcomponent with default icon", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Icon variant="danger" />
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    // Icon wrapper should be aria-hidden
    const icon = screen
      .getByRole("alertdialog")
      .querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
  });

  it("renders Icon with custom icon", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Icon icon={<span data-testid="custom-icon">!</span>} />
        <AlertDialog.Title>Warning!</AlertDialog.Title>
      </AlertDialog>,
    );

    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders Actions subcomponent", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
        <AlertDialog.Actions>
          <button>Cancel</button>
          <button>Delete</button>
        </AlertDialog.Actions>
      </AlertDialog>,
    );

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("prevents body scroll when open", () => {
    const { unmount } = render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("restores body scroll when closed", () => {
    const { rerender } = render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <AlertDialog open={false} onClose={vi.fn()}>
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    expect(document.body.style.overflow).toBe("");
  });

  it("applies custom className to dialog", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()} className="custom-dialog">
        <AlertDialog.Title>Delete?</AlertDialog.Title>
      </AlertDialog>,
    );

    // The className is applied to the inner dialog div, not the backdrop
    const dialog = screen.getByRole("alertdialog");
    const innerDialog = dialog.querySelector(".custom-dialog");
    expect(innerDialog).toBeInTheDocument();
  });

  it("renders all compound components together", () => {
    render(
      <AlertDialog open={true} onClose={vi.fn()}>
        <AlertDialog.Icon variant="warning" />
        <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action is irreversible.
        </AlertDialog.Description>
        <AlertDialog.Actions>
          <button>Cancel</button>
          <button>Confirm</button>
        </AlertDialog.Actions>
      </AlertDialog>,
    );

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText("This action is irreversible."),
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});
