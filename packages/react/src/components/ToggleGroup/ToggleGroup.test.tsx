import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleGroup } from "./ToggleGroup";

describe("ToggleGroup", () => {
  it("renders a group with items", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("no items are pressed by default", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("respects defaultValue for single type", () => {
    render(
      <ToggleGroup type="single" defaultValue="b">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );

    expect(screen.getByText("A").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByText("B").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("respects defaultValue for multiple type", () => {
    render(
      <ToggleGroup type="multiple" defaultValue={["a", "c"]}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    expect(screen.getByText("A").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("B").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByText("C").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  describe("single type", () => {
    it("selects an item on click", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single">
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      );

      await user.click(screen.getByText("A"));
      expect(screen.getByText("A").closest("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      expect(screen.getByText("B").closest("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("replaces selection when clicking another item", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single" defaultValue="a">
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      );

      await user.click(screen.getByText("B"));
      expect(screen.getByText("A").closest("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
      expect(screen.getByText("B").closest("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("deselects an item when clicking the same item", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="single" defaultValue="a">
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      );

      await user.click(screen.getByText("A"));
      expect(screen.getByText("A").closest("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
    });

    it("calls onValueChange with string value", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <ToggleGroup type="single" onValueChange={onValueChange}>
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      );

      await user.click(screen.getByText("A"));
      expect(onValueChange).toHaveBeenCalledWith("a");
    });
  });

  describe("multiple type", () => {
    it("allows multiple items to be pressed", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="multiple">
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
          <ToggleGroup.Item value="c">C</ToggleGroup.Item>
        </ToggleGroup>,
      );

      await user.click(screen.getByText("A"));
      await user.click(screen.getByText("C"));

      expect(screen.getByText("A").closest("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      expect(screen.getByText("B").closest("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
      expect(screen.getByText("C").closest("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("deselects an item when clicking it again", async () => {
      const user = userEvent.setup();
      render(
        <ToggleGroup type="multiple" defaultValue={["a", "b"]}>
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      );

      await user.click(screen.getByText("A"));
      expect(screen.getByText("A").closest("button")).toHaveAttribute(
        "aria-pressed",
        "false",
      );
      expect(screen.getByText("B").closest("button")).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });

    it("calls onValueChange with array of values", async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <ToggleGroup type="multiple" onValueChange={onValueChange}>
          <ToggleGroup.Item value="a">A</ToggleGroup.Item>
          <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        </ToggleGroup>,
      );

      await user.click(screen.getByText("A"));
      expect(onValueChange).toHaveBeenCalledWith(["a"]);

      await user.click(screen.getByText("B"));
      expect(onValueChange).toHaveBeenCalledWith(["a", "b"]);
    });
  });

  it("works as controlled component", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { rerender } = render(
      <ToggleGroup type="single" value="a" onValueChange={onValueChange}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );

    await user.click(screen.getByText("B"));
    expect(onValueChange).toHaveBeenCalledWith("b");

    // Still "a" because controlled
    expect(screen.getByText("A").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    // Parent updates
    rerender(
      <ToggleGroup type="single" value="b" onValueChange={onValueChange}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );
    expect(screen.getByText("B").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText("A").closest("button")).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("disables all items when group is disabled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" disabled onValueChange={onValueChange}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => expect(button).toBeDisabled());

    await user.click(screen.getByText("A"));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("disables individual items", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a" disabled>
          A
        </ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const disabledButton = screen.getByText("A").closest("button");
    expect(disabledButton).toBeDisabled();

    await user.click(screen.getByText("B"));
    expect(screen.getByText("B").closest("button")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("supports keyboard navigation with ArrowRight", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttonA = screen.getByText("A").closest("button")!;
    buttonA.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByText("B").closest("button")).toHaveFocus();
  });

  it("supports keyboard navigation with ArrowLeft", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttonC = screen.getByText("C").closest("button")!;
    buttonC.focus();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByText("B").closest("button")).toHaveFocus();
  });

  it("supports keyboard navigation with Home key", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttonC = screen.getByText("C").closest("button")!;
    buttonC.focus();

    await user.keyboard("{Home}");
    expect(screen.getByText("A").closest("button")).toHaveFocus();
  });

  it("supports keyboard navigation with End key", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttonA = screen.getByText("A").closest("button")!;
    buttonA.focus();

    await user.keyboard("{End}");
    expect(screen.getByText("C").closest("button")).toHaveFocus();
  });

  it("applies custom className", () => {
    render(
      <ToggleGroup type="single" className="custom-class">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      </ToggleGroup>,
    );
    expect(screen.getByRole("group")).toHaveClass("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <ToggleGroup type="single" ref={ref}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      </ToggleGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("throws when Item is used outside ToggleGroup", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<ToggleGroup.Item value="a">A</ToggleGroup.Item>);
    }).toThrow("ToggleGroup.Item must be used within a ToggleGroup");
    consoleSpy.mockRestore();
  });

  // ============================================================================
  // NEW TESTS FOR UNTESTED BRANCHES (ArrowDown and ArrowUp keys)
  // ============================================================================

  it("supports keyboard navigation with ArrowDown", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttonA = screen.getByText("A").closest("button")!;
    buttonA.focus();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByText("B").closest("button")).toHaveFocus();
  });

  it("supports keyboard navigation with ArrowUp", async () => {
    const user = userEvent.setup();
    render(
      <ToggleGroup type="single">
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
        <ToggleGroup.Item value="c">C</ToggleGroup.Item>
      </ToggleGroup>,
    );

    const buttonC = screen.getByText("C").closest("button")!;
    buttonC.focus();

    await user.keyboard("{ArrowUp}");
    expect(screen.getByText("B").closest("button")).toHaveFocus();
  });
});
