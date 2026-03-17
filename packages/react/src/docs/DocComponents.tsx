import type { ReactNode, CSSProperties } from "react";

/* ─── Callout ─────────────────────────────────────────────────── */

type CalloutVariant = "info" | "tip" | "warning" | "error";

const calloutConfig: Record<
  CalloutVariant,
  { icon: string; borderColor: string; bg: string }
> = {
  info: {
    icon: "ℹ",
    borderColor: "var(--status-info)",
    bg: "var(--soft-info)",
  },
  tip: {
    icon: "💡",
    borderColor: "var(--status-success)",
    bg: "var(--soft-success)",
  },
  warning: {
    icon: "⚠",
    borderColor: "var(--status-warning)",
    bg: "var(--soft-warning)",
  },
  error: {
    icon: "✕",
    borderColor: "var(--status-error)",
    bg: "var(--soft-error)",
  },
};

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

export function Callout({ variant = "info", title, children }: CalloutProps) {
  const cfg = calloutConfig[variant];
  const style: CSSProperties = {
    display: "flex",
    gap: "var(--spacing-3)",
    padding: "var(--spacing-4)",
    borderLeft: `4px solid ${cfg.borderColor}`,
    background: cfg.bg,
    borderRadius: "var(--radius-sm)",
    margin: "var(--spacing-4) 0",
    color: "var(--text-primary)",
    fontSize: "14px",
    lineHeight: "1.6",
  };

  const iconStyle: CSSProperties = {
    flexShrink: 0,
    fontSize: "18px",
    lineHeight: "1.4",
  };

  return (
    <div style={style}>
      <span style={iconStyle} aria-hidden="true">
        {cfg.icon}
      </span>
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 600, marginBottom: "var(--spacing-1)" }}>
            {title}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}

/* ─── FeatureCard ─────────────────────────────────────────────── */

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}

export function FeatureCard({ icon, title, children }: FeatureCardProps) {
  const isStringIcon = typeof icon === "string";

  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
    padding: "var(--spacing-5)",
    background: "var(--surface-subtle)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-control)",
    transition: "box-shadow 150ms ease, border-color 150ms ease",
  };

  const iconWrap: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "var(--radius-sm)",
    background: "var(--soft-brand)",
    color: "var(--interactive-primary)",
    fontSize: "20px",
    flexShrink: 0,
  };

  return (
    <div
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--interactive-primary)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon && isStringIcon && <div style={iconWrap}>{icon}</div>}
      {icon && !isStringIcon && <div>{icon}</div>}
      <div
        style={{
          fontWeight: 600,
          fontSize: "15px",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "14px",
          color: "var(--text-secondary)",
          lineHeight: "1.5",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── CardGrid ────────────────────────────────────────────────── */

interface CardGridProps {
  columns?: 2 | 3;
  children: ReactNode;
}

export function CardGrid({ columns = 3, children }: CardGridProps) {
  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "var(--spacing-4)",
    margin: "var(--spacing-4) 0",
  };

  return <div style={style}>{children}</div>;
}

/* ─── Steps + Step ────────────────────────────────────────────── */

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export function Step({ number, title, children }: StepProps) {
  const badge: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "var(--radius-full)",
    background: "var(--interactive-primary)",
    color: "var(--interactive-primary-text)",
    fontWeight: 700,
    fontSize: "13px",
    flexShrink: 0,
  };

  const row: CSSProperties = {
    display: "flex",
    gap: "var(--spacing-3)",
    padding: "var(--spacing-4)",
    background: "var(--surface-subtle)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-control)",
  };

  return (
    <div style={row}>
      <div style={badge}>{number}</div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: "15px",
            color: "var(--text-primary)",
            marginBottom: "var(--spacing-1)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: "1.6",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: ReactNode;
}

export function Steps({ children }: StepsProps) {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
    margin: "var(--spacing-4) 0",
  };

  return <div style={style}>{children}</div>;
}

/* ─── LinkCard ────────────────────────────────────────────────── */

interface LinkCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
}

export function LinkCard({ title, description, href, icon }: LinkCardProps) {
  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-3)",
    padding: "var(--spacing-4)",
    background: "var(--surface-subtle)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-control)",
    textDecoration: "none",
    color: "inherit",
    transition: "border-color 150ms ease, box-shadow 150ms ease",
    cursor: "pointer",
  };

  const iconWrap: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "var(--radius-sm)",
    background: "var(--soft-brand)",
    color: "var(--interactive-primary)",
    fontSize: "18px",
    flexShrink: 0,
  };

  const arrow: CSSProperties = {
    marginLeft: "auto",
    color: "var(--text-tertiary)",
    fontSize: "18px",
    flexShrink: 0,
  };

  return (
    <a
      href={href}
      style={style}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--interactive-primary)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon && <div style={iconWrap}>{icon}</div>}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: "14px",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            marginTop: "2px",
          }}
        >
          {description}
        </div>
      </div>
      <span style={arrow}>→</span>
    </a>
  );
}

/* ─── LinkCardGrid ────────────────────────────────────────────── */

interface LinkCardGridProps {
  children: ReactNode;
}

export function LinkCardGrid({ children }: LinkCardGridProps) {
  const style: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "var(--spacing-3)",
    margin: "var(--spacing-4) 0",
  };

  return <div style={style}>{children}</div>;
}

/* ─── BrandSwatch ─────────────────────────────────────────────── */

interface BrandSwatchProps {
  color: string;
  name: string;
}

export function BrandSwatch({ color, name }: BrandSwatchProps) {
  const wrap: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "var(--spacing-3)",
  };

  const circle: CSSProperties = {
    width: "40px",
    height: "40px",
    borderRadius: "var(--radius-full)",
    background: color,
    border: "3px solid var(--border-subtle)",
    flexShrink: 0,
    boxShadow: `0 2px 8px ${color}33`,
  };

  return (
    <div style={wrap}>
      <div style={circle} />
      <span
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "var(--text-secondary)",
          fontFamily: "monospace",
        }}
      >
        {name}
      </span>
    </div>
  );
}

/* ─── TokenTable ──────────────────────────────────────────────── */

interface TokenTableRow {
  token: string;
  description: string;
}

interface TokenTableProps {
  rows: TokenTableRow[];
}

export function TokenTable({ rows }: TokenTableProps) {
  const table: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "var(--spacing-4) 0",
    fontSize: "14px",
  };

  const th: CSSProperties = {
    textAlign: "left",
    padding: "var(--spacing-3) var(--spacing-4)",
    borderBottom: "2px solid var(--border-subtle)",
    color: "var(--text-primary)",
    fontWeight: 600,
    fontSize: "13px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  };

  const td: CSSProperties = {
    padding: "var(--spacing-3) var(--spacing-4)",
    borderBottom: "1px solid var(--border-subtle)",
    color: "var(--text-secondary)",
    verticalAlign: "top",
  };

  const codeTd: CSSProperties = {
    ...td,
    fontFamily: "monospace",
    fontSize: "13px",
    color: "var(--text-primary)",
    whiteSpace: "nowrap" as const,
  };

  return (
    <table style={table}>
      <thead>
        <tr>
          <th style={th}>Token</th>
          <th style={th}>Purpose</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td style={codeTd}>
              <code>{row.token}</code>
            </td>
            <td style={td}>{row.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ─── InfoTable ───────────────────────────────────────────────── */

interface InfoTableProps {
  headers: string[];
  rows: string[][];
}

export function InfoTable({ headers, rows }: InfoTableProps) {
  const table: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "var(--spacing-4) 0",
    fontSize: "14px",
  };

  const th: CSSProperties = {
    textAlign: "left",
    padding: "var(--spacing-3) var(--spacing-4)",
    borderBottom: "2px solid var(--border-subtle)",
    color: "var(--text-primary)",
    fontWeight: 600,
    fontSize: "13px",
  };

  const td: CSSProperties = {
    padding: "var(--spacing-3) var(--spacing-4)",
    borderBottom: "1px solid var(--border-subtle)",
    color: "var(--text-secondary)",
    verticalAlign: "top",
    lineHeight: "1.5",
  };

  return (
    <table style={table}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={th}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={td}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
