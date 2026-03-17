"use client";

/**
 * ChatMarkdown Component
 *
 * Markdown renderer with support for GFM (tables, strikethrough, etc.)
 * and custom code block rendering.
 */

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ChatMarkdownProps } from "../Chat.types";
import { ChatCodeBlock } from "./ChatCodeBlock";
import styles from "../Chat.module.css";

export const ChatMarkdown: React.FC<ChatMarkdownProps> = ({
  content,
  className,
  ...rest
}) => {
  return (
    <div
      className={[styles.markdown, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom code block rendering
          code({ className: codeClassName, children, ...props }) {
            const match = /language-(\w+)/.exec(codeClassName || "");
            const isInline = !match;

            if (isInline) {
              // Inline code
              return (
                <code className={codeClassName} {...props}>
                  {children}
                </code>
              );
            }

            // Code block with syntax highlighting
            const codeString = String(children).replace(/\n$/, "");
            return <ChatCodeBlock code={codeString} language={match[1]} />;
          },

          // Custom pre rendering (remove wrapper for code blocks)
          pre({ children }) {
            return <>{children}</>;
          },

          // Custom link rendering (open in new tab)
          a({ href, children, ...props }) {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

ChatMarkdown.displayName = "ChatMarkdown";
