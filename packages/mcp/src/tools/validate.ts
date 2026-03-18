/**
 * Code validator for Orion Design System.
 * Checks code snippets against Orion's anti-hallucination rules.
 */

export interface ValidationResult {
  valid: boolean;
  score: number;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  suggestions: string[];
}

export interface ValidationError {
  rule: string;
  message: string;
  line?: number;
  suggestion: string;
}

export interface ValidationWarning {
  rule: string;
  message: string;
  suggestion: string;
}

// Hardcoded color patterns (hex, rgb, rgba, hsl)
const HARDCODED_COLOR_RE = /(?:^|[\s:;{(])#[0-9a-fA-F]{3,8}(?=[\s;,)}]|$)/gm;
const RGB_RE = /rgba?\s*\(\s*\d+/g;
const HSL_RE = /hsla?\s*\(\s*\d+/g;

// Hardcoded pixel values (skip 0px, 1px borders, 9999px pills)
const HARDCODED_PX_RE = /(?:^|[\s:])(\d+)px(?=[\s;,)}])/gm;
const ALLOWED_PX = new Set([0, 1, 9999]);

// Hardcoded font families
const HARDCODED_FONT_RE = /font-family\s*:\s*(?!var\()/gi;

// Brand prop violations
const BRAND_PROP_RE = /\bbrand\s*[=?:]/g;
const DATA_BRAND_RE = /data-brand\s*[=]/g;

// Wrong prop names (common hallucinations)
const WRONG_PROPS: Record<string, string> = {
  'type="primary"': 'use variant="primary"',
  'type="secondary"': 'use variant="secondary"',
  'type="ghost"': 'use variant="ghost"',
  'type="danger"': 'use variant="danger"',
  "leftIcon=": 'use icon= (Orion uses "icon" not "leftIcon")',
  "loading=": 'use isLoading= (Orion uses "isLoading" not "loading")',
  "rightIcon=": 'use iconRight= (Orion uses "iconRight" not "rightIcon")',
  "color=": "Orion uses variant= for color variants, not color=",
  "theme=": "Theme is global via ThemeProvider, not a component prop",
};

// Non-existent CSS variables
const FAKE_VARS: Record<string, string> = {
  "--font-sans": "use --font-secondary for body text",
  "--font-body": "use --font-secondary for body text",
  "--brand-accent-vivid": "use --color-brand-400 / --color-brand-600",
  "--gradient-primary":
    "use --color-brand-400 and --color-brand-600 for gradients",
};

export function validateCode(code: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  const lines = code.split("\n");

  // Check hardcoded colors
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;

    // Skip comments
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;

    // Hex colors
    const hexMatches = line.match(HARDCODED_COLOR_RE);
    if (hexMatches) {
      for (const m of hexMatches) {
        errors.push({
          rule: "no-hardcoded-colors",
          message: `Hardcoded color ${m.trim()} found`,
          line: i + 1,
          suggestion:
            "Use a semantic CSS variable like var(--surface-base), var(--text-primary), or var(--interactive-primary)",
        });
      }
    }

    // RGB/HSL
    if (RGB_RE.test(line) || HSL_RE.test(line)) {
      errors.push({
        rule: "no-hardcoded-colors",
        message: "Hardcoded rgb/hsl color found",
        line: i + 1,
        suggestion: "Use a semantic CSS variable instead",
      });
      RGB_RE.lastIndex = 0;
      HSL_RE.lastIndex = 0;
    }

    // Hardcoded pixels
    let pxMatch;
    HARDCODED_PX_RE.lastIndex = 0;
    while ((pxMatch = HARDCODED_PX_RE.exec(line)) !== null) {
      const val = parseInt(pxMatch[1]!, 10);
      if (!ALLOWED_PX.has(val)) {
        // Check if it's inside var() or a calc() — that's okay
        const before = line.substring(0, pxMatch.index);
        if (!before.includes("var(") && !before.includes("calc(")) {
          warnings.push({
            rule: "no-hardcoded-pixels",
            message: `Hardcoded ${val}px found`,
            suggestion: `Use spacing tokens like var(--spacing-${Math.round(val / 4)}) or other semantic tokens`,
          });
        }
      }
    }

    // Hardcoded fonts
    if (HARDCODED_FONT_RE.test(line)) {
      errors.push({
        rule: "no-hardcoded-fonts",
        message: "Hardcoded font-family found",
        line: i + 1,
        suggestion:
          "Use var(--font-primary), var(--font-secondary), or var(--font-mono)",
      });
      HARDCODED_FONT_RE.lastIndex = 0;
    }

    // Brand prop on components
    if (BRAND_PROP_RE.test(line)) {
      // Exclude ThemeProvider context or state management
      if (
        !line.includes("setBrand") &&
        !line.includes("ThemeProvider") &&
        !line.includes("useTheme")
      ) {
        errors.push({
          rule: "no-brand-prop",
          message:
            "brand prop on component — brand is GLOBAL, not a component prop",
          line: i + 1,
          suggestion:
            "Remove brand prop. Use <ThemeProvider> at app root to set brand globally.",
        });
      }
      BRAND_PROP_RE.lastIndex = 0;
    }

    // data-brand on elements
    if (
      DATA_BRAND_RE.test(line) &&
      !line.includes("<html") &&
      !line.includes("documentElement")
    ) {
      errors.push({
        rule: "no-data-brand",
        message:
          "data-brand on component element — data-brand belongs on <html> only",
        line: i + 1,
        suggestion:
          "Remove data-brand. ThemeProvider sets it on <html> automatically.",
      });
      DATA_BRAND_RE.lastIndex = 0;
    }

    // Wrong prop names
    for (const [wrong, fix] of Object.entries(WRONG_PROPS)) {
      if (line.includes(wrong)) {
        errors.push({
          rule: "wrong-prop-name",
          message: `Incorrect prop "${wrong.replace(/[="]/g, "")}" — ${fix}`,
          line: i + 1,
          suggestion: fix,
        });
      }
    }

    // Non-existent CSS variables
    for (const [fakeVar, fix] of Object.entries(FAKE_VARS)) {
      if (line.includes(fakeVar)) {
        errors.push({
          rule: "non-existent-token",
          message: `${fakeVar} does not exist — ${fix}`,
          line: i + 1,
          suggestion: fix,
        });
      }
    }
  }

  // Check for missing CSS import
  if (
    code.includes("from '@orion-ds/react'") ||
    code.includes('from "@orion-ds/react"')
  ) {
    if (!code.includes("@orion-ds/react/styles.css")) {
      suggestions.push(
        "Missing CSS import. Add: import '@orion-ds/react/styles.css'",
      );
    }
  }

  // Check for missing ThemeProvider
  if (
    code.includes("from '@orion-ds/react'") &&
    !code.includes("ThemeProvider")
  ) {
    suggestions.push(
      "Remember to wrap your app with <ThemeProvider> at the root level",
    );
  }

  // Calculate score
  const maxScore = 100;
  const errorPenalty = errors.length * 15;
  const warningPenalty = warnings.length * 5;
  const score = Math.max(0, maxScore - errorPenalty - warningPenalty);

  return {
    valid: errors.length === 0,
    score,
    errors,
    warnings,
    suggestions,
  };
}
