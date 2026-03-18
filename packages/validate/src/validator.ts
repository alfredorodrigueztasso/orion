/**
 * Orion Design System Validator
 *
 * Validates code against Orion's anti-hallucination rules.
 * Can be used programmatically or via CLI.
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
  file?: string;
  suggestion: string;
}

export interface ValidationWarning {
  rule: string;
  message: string;
  line?: number;
  file?: string;
  suggestion: string;
}

// ============================================================================
// Validation rules
// ============================================================================

// Hardcoded color patterns
const HARDCODED_HEX_RE = /(?:^|[\s:;{(,])#[0-9a-fA-F]{3,8}(?=[\s;,)}]|$)/gm;
const HARDCODED_RGB_RE = /rgba?\s*\(\s*\d+/g;
const HARDCODED_HSL_RE = /hsla?\s*\(\s*\d+/g;

// Hardcoded pixel values (skip 0px, 1px borders, 9999px pills)
const HARDCODED_PX_RE = /(?:^|[\s:])(\d+)px(?=[\s;,)}])/gm;
const ALLOWED_PX = new Set([0, 1, 9999]);

// Hardcoded font families
const HARDCODED_FONT_RE = /font-family\s*:\s*(?!var\()/gi;

// Brand prop violations
const BRAND_PROP_RE = /\bbrand\s*[=?:]/g;
const DATA_BRAND_RE = /data-brand\s*=/g;

// Wrong prop names (common AI hallucinations)
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

/**
 * Validate a code string against Orion rules.
 */
export function validateCode(
  code: string,
  fileName?: string,
): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const suggestions: string[] = [];
  const lines = code.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    const lineNum = i + 1;

    // Skip comments
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;

    // Hex colors
    HARDCODED_HEX_RE.lastIndex = 0;
    const hexMatches = line.match(HARDCODED_HEX_RE);
    if (hexMatches) {
      for (const m of hexMatches) {
        errors.push({
          rule: "no-hardcoded-colors",
          message: `Hardcoded color ${m.trim()}`,
          line: lineNum,
          file: fileName,
          suggestion:
            "Use a semantic CSS variable: var(--surface-base), var(--text-primary), var(--interactive-primary)",
        });
      }
    }

    // RGB/HSL
    HARDCODED_RGB_RE.lastIndex = 0;
    HARDCODED_HSL_RE.lastIndex = 0;
    if (HARDCODED_RGB_RE.test(line) || HARDCODED_HSL_RE.test(line)) {
      errors.push({
        rule: "no-hardcoded-colors",
        message: "Hardcoded rgb/hsl color",
        line: lineNum,
        file: fileName,
        suggestion: "Use a semantic CSS variable instead",
      });
    }

    // Hardcoded pixels
    HARDCODED_PX_RE.lastIndex = 0;
    let pxMatch;
    while ((pxMatch = HARDCODED_PX_RE.exec(line)) !== null) {
      const val = parseInt(pxMatch[1]!, 10);
      if (!ALLOWED_PX.has(val)) {
        const before = line.substring(0, pxMatch.index);
        if (!before.includes("var(") && !before.includes("calc(")) {
          warnings.push({
            rule: "no-hardcoded-pixels",
            message: `Hardcoded ${val}px`,
            line: lineNum,
            file: fileName,
            suggestion: `Use spacing token: var(--spacing-${Math.round(val / 4)})`,
          });
        }
      }
    }

    // Hardcoded fonts
    HARDCODED_FONT_RE.lastIndex = 0;
    if (HARDCODED_FONT_RE.test(line)) {
      errors.push({
        rule: "no-hardcoded-fonts",
        message: "Hardcoded font-family",
        line: lineNum,
        file: fileName,
        suggestion:
          "Use var(--font-primary), var(--font-secondary), or var(--font-mono)",
      });
    }

    // Brand prop on components
    BRAND_PROP_RE.lastIndex = 0;
    if (BRAND_PROP_RE.test(line)) {
      if (
        !line.includes("setBrand") &&
        !line.includes("ThemeProvider") &&
        !line.includes("useTheme")
      ) {
        errors.push({
          rule: "no-brand-prop",
          message: "brand prop on component — brand is GLOBAL",
          line: lineNum,
          file: fileName,
          suggestion: "Remove brand prop. Use <ThemeProvider> at root.",
        });
      }
    }

    // data-brand on elements
    DATA_BRAND_RE.lastIndex = 0;
    if (
      DATA_BRAND_RE.test(line) &&
      !line.includes("<html") &&
      !line.includes("documentElement")
    ) {
      errors.push({
        rule: "no-data-brand",
        message: "data-brand on component — belongs on <html> only",
        line: lineNum,
        file: fileName,
        suggestion: "Remove data-brand. ThemeProvider sets it automatically.",
      });
    }

    // Wrong prop names
    for (const [wrong, fix] of Object.entries(WRONG_PROPS)) {
      if (line.includes(wrong)) {
        errors.push({
          rule: "wrong-prop-name",
          message: `Incorrect: "${wrong.replace(/[="]/g, "")}" — ${fix}`,
          line: lineNum,
          file: fileName,
          suggestion: fix,
        });
      }
    }

    // Non-existent CSS variables
    for (const [fakeVar, fix] of Object.entries(FAKE_VARS)) {
      if (line.includes(fakeVar)) {
        errors.push({
          rule: "non-existent-token",
          message: `${fakeVar} does not exist`,
          line: lineNum,
          file: fileName,
          suggestion: fix,
        });
      }
    }
  }

  // File-level checks
  if (
    code.includes("from '@orion-ds/react'") ||
    code.includes('from "@orion-ds/react"')
  ) {
    if (!code.includes("@orion-ds/react/styles.css")) {
      suggestions.push(
        "Missing CSS import: import '@orion-ds/react/styles.css'",
      );
    }
  }

  if (
    code.includes("from '@orion-ds/react'") &&
    !code.includes("ThemeProvider")
  ) {
    suggestions.push("Wrap your app with <ThemeProvider> at the root level");
  }

  const maxScore = 100;
  const errorPenalty = errors.length * 15;
  const warningPenalty = warnings.length * 5;
  const score = Math.max(0, maxScore - errorPenalty - warningPenalty);

  return { valid: errors.length === 0, score, errors, warnings, suggestions };
}

/**
 * Validate multiple files and aggregate results.
 */
export function validateFiles(
  files: Array<{ path: string; content: string }>,
): {
  valid: boolean;
  totalScore: number;
  fileResults: Array<{ path: string; result: ValidationResult }>;
  summary: {
    totalErrors: number;
    totalWarnings: number;
    totalSuggestions: number;
  };
} {
  const fileResults = files.map((f) => ({
    path: f.path,
    result: validateCode(f.content, f.path),
  }));

  const totalErrors = fileResults.reduce(
    (sum, f) => sum + f.result.errors.length,
    0,
  );
  const totalWarnings = fileResults.reduce(
    (sum, f) => sum + f.result.warnings.length,
    0,
  );
  const totalSuggestions = fileResults.reduce(
    (sum, f) => sum + f.result.suggestions.length,
    0,
  );
  const avgScore =
    fileResults.length > 0
      ? Math.round(
          fileResults.reduce((sum, f) => sum + f.result.score, 0) /
            fileResults.length,
        )
      : 100;

  return {
    valid: totalErrors === 0,
    totalScore: avgScore,
    fileResults,
    summary: { totalErrors, totalWarnings, totalSuggestions },
  };
}
