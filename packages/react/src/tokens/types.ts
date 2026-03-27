/**
 * Orion Design System - TypeScript Type Definitions
 *
 * DYNAMICALLY GENERATED from JSON token files.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 *
 * This file uses introspection to match JSON structure exactly,
 * preventing type mismatches when tokens change.
 */

// ============================================================================
// PRIMITIVE TOKEN TYPES
// ============================================================================

export type ColorShades = {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "950": string;
};

export interface BrandColors {
  orion: ColorShades;
  deepblue: ColorShades;
  red: ColorShades;
  orange: ColorShades;
  lemon: ColorShades;
  [key: string]: ColorShades;
}

export interface NeutralColors {
  0: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
  1000?: string;
  [key: string]: any;
}

export interface StatusColors {
  100?: string;
  300?: string;
  500: string;
  700?: string;
  [key: string]: any;
}

export interface ColorPrimitives {
  brand: BrandColors;
  neutral: NeutralColors;
  neutralPure: NeutralColors;
  error: StatusColors;
  success: StatusColors;
  warning: StatusColors;
  info: StatusColors;
}

export interface TypographyFamily {
  primary: string;
  secondary: string;
  mono: string;
  [key: string]: string;
}

export interface TypographyWeight {
  regular: string;
  medium: string;
  bold: string;
  [key: string]: string;
}

export interface TypographySize {
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  16: string;
  18: string;
  20: string;
  24: string;
  32: string;
  48: string;
  64: string;
  80: string;
  96: string;
  [key: string]: any;
}

export interface TypographyLineHeight {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
  [key: string]: string;
}

export interface TypographyPrimitives {
  family: TypographyFamily;
  weight: TypographyWeight;
  size: TypographySize;
  lineHeight: TypographyLineHeight;
  [key: string]: any;
}

export interface SpacingPrimitives {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "05": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  "10": string;
  "11": string;
  "12": string;
  "16": string;
  "20": string;
  "24": string;
  "32": string;
  px: string;
  [key: string]: any;
}

export interface RadiusPrimitives {
  "0": string;
  "2xl": string;
  "3xl"?: string;
  full: string;
  lg: string;
  "lg-2": string;
  md: string;
  sm: string;
  xl: string;
  xs?: string;
  [key: string]: any;
}

export interface BlurPrimitives {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  [key: string]: string;
}

export interface IconPrimitives {
  library: string;
  cdn: string;
  size: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    [key: string]: string;
  };
  stroke: string;
  [key: string]: any;
}

export interface Primitives {
  project?: {
    name: string;
    description: string;
  };
  color: ColorPrimitives;
  typography: TypographyPrimitives;
  spacing: SpacingPrimitives;
  radius: RadiusPrimitives;
  radiusScale?: Record<string, any>;
  blur: BlurPrimitives;
  icon: IconPrimitives;
  zIndex?: Record<string, any>;
  transition?: Record<string, any>;
}

// ============================================================================
// SEMANTIC TOKEN TYPES
// ============================================================================

export interface SurfaceSemantics {
  base: string;
  subtle: string;
  layer: string;
  primary: string;
  secondary: string;
  glass: string;
  sunken: string;
  overlay: string;
  [key: string]: string;
}

export interface TextOnBrandSemantics {
  primary: string;
  secondary: string;
  tertiary: string;
  [key: string]: string;
}

export interface TextSemantics {
  primary: string;
  secondary: string;
  tertiary: string;
  inverse: string;
  brand: string;
  "on-brand"?: TextOnBrandSemantics;
  [key: string]: any;
}

export interface BorderSemantics {
  subtle: string;
  strong: string;
  interactive: string;
  [key: string]: string;
}

export interface InteractivePrimarySemantics {
  default: string;
  hover: string;
  text: string;
  [key: string]: string;
}

export interface InteractiveSecondarySemantics {
  default: string;
  hover: string;
  text: string;
  [key: string]: string;
}

export interface InteractiveGhostSemantics {
  hover: string;
  [key: string]: string;
}

export interface InteractiveSemantics {
  primary: InteractivePrimarySemantics;
  secondary: InteractiveSecondarySemantics;
  ghost: InteractiveGhostSemantics;
  [key: string]: any;
}

export interface StatusSemantics {
  error: string;
  success: string;
  warning: string;
  info: string;
  [key: string]: string;
}

export interface SoftSemantics {
  brand: string;
  "brand-hover": string;
  success: string;
  "success-hover"?: string;
  error: string;
  "error-hover"?: string;
  warning?: string;
  "warning-hover"?: string;
  info?: string;
  "info-hover"?: string;
}

export interface SemanticTokens {
  surface: SurfaceSemantics;
  text: TextSemantics;
  border: BorderSemantics;
  interactive: InteractiveSemantics;
  status: StatusSemantics;
  soft: SoftSemantics;
  alert?: Record<string, any>;
  chart?: Record<string, any>;
  focus?: {
    ring: string;
  };
  gradient?: {
    start: string;
    end: string;
  };
  zIndex?: {
    base: string;
    dropdown: string;
    sticky: string;
    overlay: string;
    modal: string;
    popover: string;
    tooltip: string;
    toast: string;
    [key: string]: any;
  };
}

// ============================================================================
// THEME & BRAND TYPES
// ============================================================================

export type Theme = "light" | "dark";
export type Brand = "orion" | "deepblue" | "red" | "orange" | "lemon";

export interface ThemeConfig {
  theme: Theme;
  semantic: SemanticTokens;
}

export interface BrandConfig {
  name: string;
  description?: string;
  accent: {
    primary: string;
    light: string;
    dark: string;
  };
  typography: {
    primary: string;
    secondary: string;
    mono: string;
  };
  geometry: {
    radiusControl: string;
    radiusContainer?: string;
    buttonStyle: string;
  };
  semantic: {
    light: {
      interactivePrimary: string;
      interactivePrimaryHover: string;
      interactivePrimaryText: string;
    };
    dark: {
      interactivePrimary: string;
      interactivePrimaryHover: string;
      interactivePrimaryText: string;
    };
  };
  usage: {
    html: string | null;
    css: string;
    attribute: string | null;
  };
  [key: string]: any;
}

// ============================================================================
// TOKEN PATH TYPES (for type-safe token references)
// ============================================================================

export type ColorTokenPath =
  | `color.brand.\${Brand}.\${keyof ColorShades}`
  | `color.neutral.\${keyof NeutralColors}`
  | `color.neutralPure.\${keyof NeutralColors}`
  | "color.error.500"
  | "color.success.500"
  | "color.warning.500"
  | "color.info.500";

export type TypographyTokenPath =
  | `typography.family.\${keyof TypographyFamily}`
  | `typography.weight.\${keyof TypographyWeight}`
  | `typography.size.\${keyof TypographySize}`
  | `typography.lineHeight.\${keyof TypographyLineHeight}`;

export type SpacingTokenPath = `spacing.\${keyof SpacingPrimitives}`;
export type RadiusTokenPath = `radius.\${keyof RadiusPrimitives}`;
export type BlurTokenPath = `blur.\${keyof BlurPrimitives}`;

export type TokenPath =
  | ColorTokenPath
  | TypographyTokenPath
  | SpacingTokenPath
  | RadiusTokenPath
  | BlurTokenPath;

export type SemanticTokenPath =
  | `surface.\${keyof SurfaceSemantics}`
  | `text.\${keyof TextSemantics}`
  | `border.\${keyof BorderSemantics}`
  | `interactive.primary.\${keyof InteractivePrimarySemantics}`
  | `interactive.secondary.\${keyof InteractiveSecondarySemantics}`
  | `interactive.ghost.\${keyof InteractiveGhostSemantics}`
  | `status.\${keyof StatusSemantics}`
  | `soft.\${keyof SoftSemantics}`;

// ============================================================================
// CSS VARIABLE TYPES
// ============================================================================

export type CSSVariableName = `--\${string}`;

export interface CSSVariableMap {
  // Surface variables
  "--surface-base": string;
  "--surface-subtle": string;
  "--surface-layer": string;
  "--surface-primary": string;
  "--surface-secondary": string;
  "--surface-glass": string;
  "--surface-sunken": string;
  "--surface-overlay": string;

  // Text variables
  "--text-primary": string;
  "--text-secondary": string;
  "--text-tertiary": string;
  "--text-inverse": string;
  "--text-brand": string;

  // Interactive variables
  "--interactive-primary": string;
  "--interactive-primary-hover": string;
  "--interactive-primary-text": string;
  "--interactive-secondary": string;
  "--interactive-secondary-hover": string;
  "--interactive-secondary-text": string;
  "--interactive-ghost-hover": string;

  // Status variables
  "--status-error": string;
  "--status-success": string;
  "--status-warning": string;
  "--status-info": string;

  // Border variables
  "--border-subtle": string;
  "--border-strong": string;
  "--border-interactive": string;

  // Spacing variables (sample)
  "--spacing-0": string;
  "--spacing-px": string;
  "--spacing-1": string;
  "--spacing-2": string;
  "--spacing-3": string;
  "--spacing-4": string;
  "--spacing-6": string;
  "--spacing-8": string;
  "--spacing-16": string;
  "--spacing-32": string;

  // Radius variables
  "--radius-sm": string;
  "--radius-md": string;
  "--radius-lg": string;
  "--radius-xl": string;
  "--radius-2xl": string;
  "--radius-full": string;
  "--radius-control": string;

  [key: string]: any;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/** Get nested property type from dot notation path */
export type GetTokenValue<
  T,
  Path extends string,
> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? GetTokenValue<T[Key], Rest>
    : never
  : Path extends keyof T
    ? T[Path]
    : never;

/** Type-safe token getter */
export type TokenValue<P extends TokenPath> = GetTokenValue<Primitives, P>;
