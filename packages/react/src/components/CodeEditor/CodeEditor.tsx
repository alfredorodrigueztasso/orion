import React, { forwardRef, useRef, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import type { CodeEditorProps } from "./CodeEditor.types";
import { useThemeContext } from "../../contexts";
import styles from "./CodeEditor.module.css";

// Extend markdown grammar with quoted string support
// This mutation affects react-syntax-highlighter's refractor instance
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const refractor = require("refractor/all");
  if (
    refractor.default &&
    refractor.default.registered &&
    refractor.default.registered("markdown") &&
    !refractor.default.languages.markdown?.["quoted-string"]
  ) {
    refractor.default.languages.insertBefore("markdown", "bold", {
      "quoted-string": {
        pattern: /"(?:\\.|[^"\\])*"/,
        greedy: true,
        alias: "string",
      },
    });
  }
} catch {
  // refractor not available, skip quoted string enhancement
}

/**
 * CodeEditor
 *
 * A textarea-based code editor with optional syntax highlighting overlay.
 * When language is specified, uses an overlay approach with SyntaxHighlighter.
 * Line numbers are synchronized with scrolling.
 *
 * @example
 * ```tsx
 * const [code, setCode] = useState('# Hello\nWorld');
 * <CodeEditor
 *   value={code}
 *   onChange={setCode}
 *   language="markdown"
 *   placeholder="Enter your code..."
 *   showLineNumbers
 * />
 * ```
 */
export const CodeEditor = forwardRef<HTMLTextAreaElement, CodeEditorProps>(
  (
    {
      value = "",
      onChange,
      language,
      readOnly = false,
      showLineNumbers = true,
      placeholder,
      minRows = 10,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);
    const mirrorRef = useRef<HTMLDivElement>(null);
    const editorAreaRef = useRef<HTMLDivElement>(null);
    const internalTextareaRef = useRef<HTMLTextAreaElement>(null);
    const nextCursor = useRef<{ start: number; end: number } | null>(null);

    // Use provided ref or internal ref
    const textareaRef =
      (ref as React.MutableRefObject<HTMLTextAreaElement | null>) ||
      internalTextareaRef;

    // Current line tracking for line highlight
    const [currentLine, setCurrentLine] = useState(0);
    const [lineHeights, setLineHeights] = useState<number[]>([]);

    // Get theme for syntax highlighting
    let currentTheme = "dark";
    try {
      const ctx = useThemeContext();
      currentTheme = ctx.theme;
    } catch {
      // outside ThemeProvider — use dark
    }
    const highlightStyle = currentTheme === "light" ? oneLight : oneDark;

    // Calculate number of lines
    const lineCount = Math.max(value.split("\n").length, minRows);

    // Restore cursor position after React re-render
    useEffect(() => {
      if (nextCursor.current && textareaRef.current) {
        const { start, end } = nextCursor.current;
        textareaRef.current.setSelectionRange(start, end);
        nextCursor.current = null;
      }
    });

    // Measure line heights for proper line number alignment with wrapped lines
    useEffect(() => {
      const mirror = mirrorRef.current;
      const editorArea = editorAreaRef.current;
      if (!mirror || !editorArea) return;

      const measure = () => {
        const contentWidth = editorArea.clientWidth;
        if (contentWidth <= 0) return;
        mirror.style.width = `${contentWidth}px`;

        const lines = value.split("\n");
        const totalLines = Math.max(lines.length, minRows);
        const heights: number[] = [];

        for (let i = 0; i < totalLines; i++) {
          const line = lines[i] ?? "";
          mirror.textContent = line || "\u00a0";
          heights.push(mirror.scrollHeight);
        }

        setLineHeights(heights);
      };

      measure();
      const observer = new ResizeObserver(measure);
      observer.observe(editorArea);
      return () => observer.disconnect();
    }, [value, minRows]);

    // Sync scroll position between textarea, line numbers, and highlight layer
    useEffect(() => {
      const handleScroll = (event: Event) => {
        const textarea = event.target as HTMLTextAreaElement;
        if (lineNumbersRef.current) {
          lineNumbersRef.current.scrollTop = textarea.scrollTop;
        }
        if (highlightRef.current) {
          highlightRef.current.scrollTop = textarea.scrollTop;
          highlightRef.current.scrollLeft = textarea.scrollLeft;
        }
      };

      const textarea = textareaRef?.current;
      if (textarea) {
        textarea.addEventListener("scroll", handleScroll);
        return () => {
          textarea.removeEventListener("scroll", handleScroll);
        };
      }
    }, [textareaRef]);

    // Track current line for highlight
    const updateCurrentLine = (textarea: HTMLTextAreaElement) => {
      const text = textarea.value.substring(0, textarea.selectionStart);
      setCurrentLine(text.split("\n").length - 1);
    };

    // Handle Tab key insertion (2 spaces)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const textarea = e.currentTarget;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const TAB = "  ";

        if (start === end) {
          // No selection: insert 2 spaces at cursor
          const newValue =
            value.substring(0, start) + TAB + value.substring(end);
          nextCursor.current = {
            start: start + TAB.length,
            end: start + TAB.length,
          };
          onChange?.(newValue);
        } else if (e.shiftKey) {
          // Shift+Tab: remove up to 2 leading spaces from current line
          const lineStart = value.lastIndexOf("\n", start - 1) + 1;
          const spaces = value.substring(lineStart).match(/^ {1,2}/)?.[0] ?? "";
          if (spaces.length > 0) {
            const newValue =
              value.substring(0, lineStart) +
              value.substring(lineStart + spaces.length);
            nextCursor.current = {
              start: Math.max(lineStart, start - spaces.length),
              end: Math.max(lineStart, end - spaces.length),
            };
            onChange?.(newValue);
          }
        } else {
          // Selection: insert TAB at start, keep cursor
          const newValue =
            value.substring(0, start) + TAB + value.substring(end);
          nextCursor.current = {
            start: start + TAB.length,
            end: start + TAB.length,
          };
          onChange?.(newValue);
        }
      }
    };

    const wrapperClasses = [styles.wrapper, className]
      .filter(Boolean)
      .join(" ");

    // When language is specified, use overlay approach with syntax highlighting
    if (language) {
      return (
        <div
          className={wrapperClasses}
          style={{
            minHeight: `calc(${minRows} * 1.6em + 2 * var(--spacing-4))`,
          }}
        >
          {/* Hidden mirror div for measuring visual line heights */}
          <div
            ref={mirrorRef}
            className={styles.lineMirror}
            aria-hidden="true"
          />

          {/* Line numbers column */}
          {showLineNumbers && (
            <div
              ref={lineNumbersRef}
              className={styles.lineNumbers}
              aria-hidden="true"
            >
              {Array.from({ length: lineCount }).map((_, i) => (
                <div
                  key={i}
                  className={styles.lineNumber}
                  style={
                    lineHeights[i] !== undefined
                      ? { height: `${lineHeights[i]}px` }
                      : undefined
                  }
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}

          {/* Editor area: highlight layer + textarea overlay */}
          <div ref={editorAreaRef} className={styles.editorArea}>
            {/* Line highlight background */}
            <div
              className={styles.lineHighlight}
              style={{
                top:
                  lineHeights.length > 0
                    ? `calc(var(--spacing-4) + ${lineHeights.slice(0, currentLine).reduce((a, b) => a + b, 0)}px)`
                    : `calc(var(--spacing-4) + ${(currentLine * 1.6).toFixed(2)}em)`,
                ...(lineHeights[currentLine] !== undefined
                  ? { height: `${lineHeights[currentLine]}px` }
                  : {}),
              }}
              aria-hidden="true"
            />

            {/* Highlight layer — detrás, no interactivo */}
            <div
              ref={highlightRef}
              className={styles.highlightLayer}
              aria-hidden="true"
            >
              <SyntaxHighlighter
                language={language}
                style={highlightStyle}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: "transparent",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                  fontFamily: "inherit",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  overflow: "visible",
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "inherit",
                    background: "transparent",
                    color: "var(--text-primary)",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  },
                }}
              >
                {value + "\n"}
              </SyntaxHighlighter>
            </div>

            {/* Textarea overlay — encima, texto transparente */}
            <textarea
              ref={textareaRef}
              className={styles.textareaOverlay}
              value={value}
              onChange={(e) => onChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={(e) => updateCurrentLine(e.currentTarget)}
              onMouseUp={(e) => updateCurrentLine(e.currentTarget)}
              onClick={(e) => updateCurrentLine(e.currentTarget)}
              placeholder={placeholder}
              readOnly={readOnly}
              aria-label={ariaLabel || "Code editor"}
              spellCheck="false"
              {...rest}
            />
          </div>
        </div>
      );
    }

    // Default: plain textarea without syntax highlighting
    return (
      <div
        className={wrapperClasses}
        style={{ minHeight: `calc(${minRows} * 1.6em + 2 * var(--spacing-4))` }}
      >
        {/* Hidden mirror div for measuring visual line heights */}
        <div ref={mirrorRef} className={styles.lineMirror} aria-hidden="true" />

        {/* Line numbers column */}
        {showLineNumbers && (
          <div
            ref={lineNumbersRef}
            className={styles.lineNumbers}
            aria-hidden="true"
          >
            {Array.from({ length: lineCount }).map((_, i) => (
              <div
                key={i}
                className={styles.lineNumber}
                style={
                  lineHeights[i] !== undefined
                    ? { height: `${lineHeights[i]}px` }
                    : undefined
                }
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Textarea column */}
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          aria-label={ariaLabel || "Code editor"}
          spellCheck="false"
          {...rest}
        />
      </div>
    );
  },
);

CodeEditor.displayName = "CodeEditor";
