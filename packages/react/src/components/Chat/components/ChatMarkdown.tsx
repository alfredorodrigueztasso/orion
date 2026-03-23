"use client";

/**
 * ChatMarkdown Component
 *
 * Markdown renderer with support for GFM (tables, strikethrough, etc.)
 * and custom code block rendering.
 */

import React from "react";
import type { ChatMarkdownProps } from "../Chat.types";
import { ChatCodeBlock } from "./ChatCodeBlock";
import { MissingDependencyError } from "../../MissingDependencyError";
import styles from "../Chat.module.css";

// react-markdown and remark-gfm imports with graceful error handling
let ReactMarkdown: any;
let remarkGfm: any;
let ReactMarkdownError: Error | null = null;

try {
  ReactMarkdown = require("react-markdown");
  remarkGfm = require("remark-gfm");
} catch (error) {
  ReactMarkdownError =
    error instanceof Error
      ? error
      : new Error("react-markdown or remark-gfm not found");
}

export const ChatMarkdown: React.FC<ChatMarkdownProps> = ({
  content,
  className,
  ...rest
}) => {
  // Show error if react-markdown or remark-gfm is not installed
  if (ReactMarkdownError) {
    return (
      <MissingDependencyError
        available={false}
        componentName="Chat"
        depName={["react-markdown", "remark-gfm"]}
        installCommand="npm install react-markdown remark-gfm"
        pnpmCommand="pnpm add react-markdown remark-gfm"
        docsUrl="https://docs.orion-ds.dev/components/chat"
      />
    );
  }

  return (
    <div
      className={[styles.markdown, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom code block rendering
          code({ className: codeClassName, children, ...props }: any) {
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
          pre({ children }: any) {
            return <>{children}</>;
          },

          // Custom link rendering (open in new tab)
          a({ href, children, ...props }: any) {
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
