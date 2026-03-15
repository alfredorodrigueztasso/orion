"use client";

/**
 * ChatCodeBlock Component
 *
 * Syntax-highlighted code block with copy functionality
 * and theme-aware highlighting.
 */

import React, { useState, useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import type { ChatCodeBlockProps } from "../Chat.types";
import { useThemeContext } from "../../../contexts";
import styles from "../Chat.module.css";

// Map common language aliases
const normalizeLanguage = (lang?: string): string => {
  if (!lang) return "text";

  const aliases: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    py: "python",
    rb: "ruby",
    sh: "bash",
    shell: "bash",
    yml: "yaml",
    md: "markdown",
  };

  return aliases[lang.toLowerCase()] || lang.toLowerCase();
};

export const ChatCodeBlock: React.FC<ChatCodeBlockProps> = ({
  code,
  language,
  showLineNumbers = false,
  showCopyButton = true,
  maxHeight = "400px",
  className,
  ...rest
}) => {
  const [copied, setCopied] = useState(false);

  // Get current theme for syntax highlighting
  let currentTheme: "light" | "dark" = "dark";
  try {
    const ctx = useThemeContext();
    currentTheme = ctx.theme;
  } catch {
    // ThemeProvider not available, default to dark
  }

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [code]);

  const normalizedLang = normalizeLanguage(language);
  const highlightStyle = currentTheme === "light" ? oneLight : oneDark;

  return (
    <div
      className={[styles.codeBlock, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {/* Header with language and copy button */}
      <div className={styles.codeBlockHeader}>
        <span className={styles.codeBlockLanguage}>{normalizedLang}</span>
        {showCopyButton && (
          <button
            className={[styles.codeBlockCopy, copied && styles.codeBlockCopied]
              .filter(Boolean)
              .join(" ")}
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <>
                <Check size={14} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Code content */}
      <div className={styles.codeBlockContent} style={{ maxHeight }}>
        <SyntaxHighlighter
          language={normalizedLang}
          style={highlightStyle}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "inherit",
            lineHeight: "inherit",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-mono)",
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

ChatCodeBlock.displayName = "ChatCodeBlock";
