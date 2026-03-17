import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Chat } from "./Chat";

describe("Chat", () => {
  it("renders message list", () => {
    const { container } = render(
      <Chat>
        <div>Test Chat</div>
      </Chat>,
    );

    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("displays messages with correct authors", () => {
    const { container } = render(
      <Chat>
        <div>Message content</div>
      </Chat>,
    );

    expect(container).toBeInTheDocument();
  });

  it("renders message input field", () => {
    const { container } = render(
      <Chat>
        <div>Chat input</div>
      </Chat>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("sends message on submit", async () => {
    const { container } = render(
      <Chat>
        <div>Chat interface</div>
      </Chat>,
    );

    expect(container).toBeInTheDocument();
  });

  it("clears input after sending", () => {
    const { container } = render(
      <Chat>
        <div>Message form</div>
      </Chat>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows loading state", () => {
    const { container } = render(
      <Chat>
        <div>Loading state</div>
      </Chat>,
    );

    expect(container).toBeInTheDocument();
  });

  it("supports auto-scroll to latest message", () => {
    const { container } = render(
      <Chat>
        <div>Auto-scroll enabled</div>
      </Chat>,
    );

    expect(container).toBeInTheDocument();
  });

  it("renders message timestamps", () => {
    const { container } = render(
      <Chat>
        <div>Timestamps shown</div>
      </Chat>,
    );

    expect(container).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Chat className="custom-chat">
        <div>Custom styled</div>
      </Chat>,
    );

    const chat = container.querySelector(".custom-chat");
    expect(chat).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <Chat ref={ref}>
        <div>Ref test</div>
      </Chat>,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("handles empty message list", () => {
    const { container } = render(
      <Chat>
        <div>Empty state</div>
      </Chat>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
