"use client";

/**
 * MissingDependencyError Component
 *
 * User-friendly error component shown when an optional dependency is missing.
 * Used internally by optional-dependency components like Chart, Calendar, Chat, etc.
 */

import React from "react";
import type { OptionalDepError } from "../utils/optionalDeps";

export const MissingDependencyError: React.FC<OptionalDepError> = ({
  componentName,
  depName,
  installCommand,
  pnpmCommand,
  docsUrl,
}) => {
  const deps = Array.isArray(depName) ? depName : [depName];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "20px",
        border: "2px solid var(--status-error, #ef4444)",
        borderRadius: "var(--radius-control, 12px)",
        backgroundColor: "var(--surface-layer, #f3f4f6)",
        fontFamily: "var(--font-secondary, sans-serif)",
        fontSize: "14px",
        color: "var(--text-primary, #000)",
      }}
    >
      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "var(--status-error, #ef4444)",
            marginTop: "2px",
          }}
        >
          🔴
        </span>
        <div>
          <div style={{ fontWeight: "600", marginBottom: "4px" }}>
            {componentName} component requires{" "}
            {deps.length === 1 ? "a dependency" : "dependencies"}
          </div>
          <div style={{ color: "var(--text-secondary, #666)" }}>
            {deps.map((dep, i) => (
              <div key={dep}>
                {deps.length > 1 && <span>{i + 1}. </span>}
                <code
                  style={{
                    backgroundColor: "var(--surface-base, #fff)",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  {dep}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "8px" }}>
        <div style={{ fontWeight: "500", marginBottom: "8px" }}>
          Install with npm:
        </div>
        <code
          style={{
            display: "block",
            backgroundColor: "var(--surface-base, #fff)",
            padding: "8px 12px",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "12px",
            overflow: "auto",
            border: "1px solid var(--border-subtle, #e5e7eb)",
          }}
        >
          {installCommand}
        </code>
      </div>

      <div>
        <div style={{ fontWeight: "500", marginBottom: "8px" }}>
          Or with pnpm:
        </div>
        <code
          style={{
            display: "block",
            backgroundColor: "var(--surface-base, #fff)",
            padding: "8px 12px",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "12px",
            overflow: "auto",
            border: "1px solid var(--border-subtle, #e5e7eb)",
          }}
        >
          {pnpmCommand}
        </code>
      </div>

      <div
        style={{
          marginTop: "4px",
          fontSize: "13px",
          color: "var(--text-secondary, #666)",
        }}
      >
        Learn more:{" "}
        <a
          href={docsUrl}
          style={{
            color: "var(--text-brand, #1b5bff)",
            textDecoration: "underline",
          }}
        >
          Orion {componentName} Documentation
        </a>
      </div>
    </div>
  );
};

MissingDependencyError.displayName = "MissingDependencyError";
