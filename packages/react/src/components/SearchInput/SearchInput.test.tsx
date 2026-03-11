/**
 * SearchInput Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders with placeholder", () => {
    render(<SearchInput placeholder="Search..." />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders with value", () => {
    render(<SearchInput value="test query" onChange={() => {}} />);
    expect(screen.getByRole("searchbox")).toHaveValue("test query");
  });

  it("calls onChange when typing", () => {
    const onChange = vi.fn();
    render(<SearchInput onChange={onChange} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(onChange).toHaveBeenCalled();
  });

  it("shows clear button when has value", () => {
    render(<SearchInput value="test" onChange={() => {}} />);
    expect(
      screen.getByRole("button", { name: "Clear search" }),
    ).toBeInTheDocument();
  });

  it("hides clear button when empty", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("calls onClear when clear button is clicked", () => {
    const onClear = vi.fn();
    render(<SearchInput value="test" onChange={() => {}} onClear={onClear} />);

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }));
    expect(onClear).toHaveBeenCalled();
  });

  it("calls onSearch when Enter is pressed", () => {
    const onSearch = vi.fn();
    render(
      <SearchInput
        value="test query"
        onChange={() => {}}
        onSearch={onSearch}
      />,
    );

    const input = screen.getByRole("searchbox");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(onSearch).toHaveBeenCalledWith("test query");
  });

  it("renders search button when showSearchButton is true", () => {
    render(<SearchInput showSearchButton />);
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
  });

  it("calls onSearch when search button is clicked", () => {
    const onSearch = vi.fn();
    render(
      <SearchInput
        value="test"
        onChange={() => {}}
        onSearch={onSearch}
        showSearchButton
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Search" }));
    expect(onSearch).toHaveBeenCalledWith("test");
  });

  it("hides clear button when showClear is false", () => {
    render(<SearchInput value="test" onChange={() => {}} showClear={false} />);
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("renders different sizes", () => {
    const { rerender } = render(<SearchInput size="sm" data-testid="input" />);
    expect(screen.getByTestId("input").parentElement!.className).toMatch(/sm/);

    rerender(<SearchInput size="md" data-testid="input" />);
    expect(screen.getByTestId("input").parentElement!.className).toMatch(/md/);

    rerender(<SearchInput size="lg" data-testid="input" />);
    expect(screen.getByTestId("input").parentElement!.className).toMatch(/lg/);
  });

  it("renders full width", () => {
    render(<SearchInput fullWidth data-testid="input" />);
    expect(screen.getByTestId("input").parentElement!.className).toMatch(
      /fullWidth/,
    );
  });

  it("renders loading state", () => {
    render(<SearchInput loading value="test" onChange={() => {}} />);
    // Clear button should be hidden when loading
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });

  it("accepts custom clear label", () => {
    render(
      <SearchInput value="test" onChange={() => {}} clearLabel="Limpiar" />,
    );
    expect(screen.getByRole("button", { name: "Limpiar" })).toBeInTheDocument();
  });

  it("accepts custom search label", () => {
    render(<SearchInput showSearchButton searchLabel="Buscar" />);
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  it("is disabled", () => {
    render(<SearchInput disabled />);
    expect(screen.getByRole("searchbox")).toBeDisabled();
  });

  it("forwards ref", () => {
    const ref = vi.fn();
    render(<SearchInput ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });
});
