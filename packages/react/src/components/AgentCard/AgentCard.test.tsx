import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AgentCard } from "./AgentCard";
import { Settings, Trash2 } from "lucide-react";

describe("AgentCard", () => {
  it("renders agent title", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation and debugging"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    expect(screen.getByText("Code Assistant")).toBeInTheDocument();
  });

  it("renders agent description", () => {
    render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation and debugging"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    expect(screen.getByText("Helps with code generation and debugging")).toBeInTheDocument();
  });

  it("displays agent avatar", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation and debugging"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("handles card click", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        onClick={handleSelect}
      />,
    );

    const card = container.querySelector("[role='button']") || container.firstChild;
    if (card) {
      await user.click(card as HTMLElement);
    }
  });

  it("applies custom className", () => {
    const { container } = render(
      <AgentCard
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
        className="custom-card"
      />,
    );

    const card = container.querySelector(".custom-card");
    expect(card).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <AgentCard
        ref={ref}
        id="agent-1"
        title="Code Assistant"
        description="Helps with code generation"
        avatar="https://i.pravatar.cc/150?u=code"
      />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
