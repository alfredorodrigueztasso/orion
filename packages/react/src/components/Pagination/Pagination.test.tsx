/**
 * Pagination Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  it("renders pagination with page numbers", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
    );

    expect(screen.getByLabelText("Go to page 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to page 5")).toBeInTheDocument();
  });

  it("marks current page as active", () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />,
    );

    const currentPageButton = screen.getByLabelText("Go to page 3");
    expect(currentPageButton).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange when clicking a page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Go to page 3"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
    );

    expect(screen.getByLabelText("Go to previous page")).toBeDisabled();
    expect(screen.getByLabelText("Go to first page")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />,
    );

    expect(screen.getByLabelText("Go to next page")).toBeDisabled();
    expect(screen.getByLabelText("Go to last page")).toBeDisabled();
  });

  it("navigates with previous/next buttons", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Go to previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);

    await user.click(screen.getByLabelText("Go to next page"));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("navigates with first/last buttons", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Go to first page"));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByLabelText("Go to last page"));
    expect(onPageChange).toHaveBeenCalledWith(5);
  });

  it("shows ellipsis for many pages", () => {
    render(
      <Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />,
    );

    // Should have ellipsis
    expect(screen.getAllByText("…").length).toBeGreaterThan(0);
  });

  it("hides first/last buttons when showFirstLast is false", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={() => {}}
        showFirstLast={false}
      />,
    );

    expect(screen.queryByLabelText("Go to first page")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Go to last page")).not.toBeInTheDocument();
  });

  it("hides prev/next buttons when showPrevNext is false", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={() => {}}
        showPrevNext={false}
      />,
    );

    expect(
      screen.queryByLabelText("Go to previous page"),
    ).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Go to next page")).not.toBeInTheDocument();
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        size="sm"
      />,
    );

    expect(screen.getByRole("navigation").className).toContain("sm");

    rerender(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
        size="lg"
      />,
    );

    expect(screen.getByRole("navigation").className).toContain("lg");
  });

  it("disables all buttons when disabled", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={() => {}}
        disabled
      />,
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("renders nothing when totalPages is 0", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={() => {}} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not call onPageChange for current page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Go to page 3"));
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={() => {}} />,
    );

    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Pagination",
    );
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Pagination
        ref={ref}
        currentPage={1}
        totalPages={5}
        onPageChange={() => {}}
      />,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
  });
});
