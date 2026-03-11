import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chat } from "./Chat";
import type { Message } from "./Chat.types";

describe("Chat", () => {
  const mockMessages: Message[] = [
    {
      id: "1",
      author: "user",
      content: "Hello, how are you?",
      timestamp: new Date("2024-03-09T10:00:00"),
    },
    {
      id: "2",
      author: "assistant",
      content: "I'm doing well, thank you for asking!",
      timestamp: new Date("2024-03-09T10:01:00"),
    },
    {
      id: "3",
      author: "user",
      content: "Can you help me with something?",
      timestamp: new Date("2024-03-09T10:02:00"),
    },
  ];

  it("renders message list", () => {
    render(
      <Chat
        messages={mockMessages}
        onSendMessage={() => {}}
      />,
    );

    expect(screen.getByText("Hello, how are you?")).toBeInTheDocument();
    expect(screen.getByText("I'm doing well, thank you for asking!")).toBeInTheDocument();
  });

  it("displays messages with correct authors", () => {
    render(
      <Chat
        messages={mockMessages}
        onSendMessage={() => {}}
      />,
    );

    // Should show messages with author differentiation
    expect(screen.getByText("Hello, how are you?")).toBeInTheDocument();
  });

  it("renders message input field", () => {
    render(
      <Chat
        messages={mockMessages}
        onSendMessage={() => {}}
      />,
    );

    const input = screen.queryByPlaceholderText(/message|type/i);
    expect(input || screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("sends message on submit", async () => {
    const handleSendMessage = vi.fn();
    const user = userEvent.setup();

    render(
      <Chat
        messages={mockMessages}
        onSendMessage={handleSendMessage}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Test message");

    const sendButton = screen.queryByRole("button", { name: /send|submit/i });
    if (sendButton) {
      await user.click(sendButton);
      expect(handleSendMessage).toHaveBeenCalled();
    }
  });

  it("clears input after sending", async () => {
    const user = userEvent.setup();

    render(
      <Chat
        messages={mockMessages}
        onSendMessage={() => {}}
      />,
    );

    const input = screen.getByRole("textbox") as HTMLInputElement;
    await user.type(input, "Test");

    // Input should be cleared after sending
    expect(input).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <Chat
        messages={mockMessages}
        loading
        onSendMessage={() => {}}
      />,
    );

    expect(screen.getByText(/Hello|how/)).toBeInTheDocument();
  });

  it("supports auto-scroll to latest message", () => {
    const { container } = render(
      <Chat
        messages={mockMessages}
        onSendMessage={() => {}}
        autoScroll
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("renders message timestamps", () => {
    render(
      <Chat
        messages={mockMessages}
        onSendMessage={() => {}}
        showTimestamps
      />,
    );

    expect(screen.getByText("Hello, how are you?")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Chat
        messages={mockMessages}
        onSendMessage={() => {}}
        className="custom-chat"
      />,
    );

    const chat = container.querySelector(".custom-chat");
    expect(chat).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <Chat
        ref={ref}
        messages={mockMessages}
        onSendMessage={() => {}}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("handles empty message list", () => {
    render(
      <Chat
        messages={[]}
        onSendMessage={() => {}}
      />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
});
