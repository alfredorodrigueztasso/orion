/**
 * Token Type Generation Script
 *
 * Reads JSON token files (primary.json, light.json, dark.json, brands.json)
 * and generates TypeScript types and constants for type-safe token usage.
 *
 * Usage: ts-node scripts/generate-types.ts
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOKEN_DIR = path.join(__dirname, '../tokens');
const OUTPUT_DIR = path.join(__dirname, '../packages/core/src/tokens');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read token files
const primaryTokens = JSON.parse(
  fs.readFileSync(path.join(TOKEN_DIR, 'primary.json'), 'utf-8')
);
const lightTokens = JSON.parse(
  fs.readFileSync(path.join(TOKEN_DIR, 'light.json'), 'utf-8')
);
const darkTokens = JSON.parse(
  fs.readFileSync(path.join(TOKEN_DIR, 'dark.json'), 'utf-8')
);
const brandsTokens = JSON.parse(
  fs.readFileSync(path.join(TOKEN_DIR, 'brands.json'), 'utf-8')
);

// Helper: Convert object to TypeScript interface
// @ts-ignore - Function declared for potential future use
function generateInterface(name: string, obj: any, indent = 0): string {
  const spaces = '  '.repeat(indent);
  let result = `${spaces}export interface ${name} {\n`;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      // Nested object - create sub-interface
      const subInterfaceName = `${name}${key.charAt(0).toUpperCase() + key.slice(1)}`;
      result += `${spaces}  ${key}: ${subInterfaceName};\n`;
    } else {
      // Primitive value
      const tsType = typeof value === 'number' ? 'number' : 'string';
      result += `${spaces}  ${key}: ${tsType};\n`;
    }
  }

  result += `${spaces}}\n`;

  // Generate nested interfaces
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      const subInterfaceName = `${name}${key.charAt(0).toUpperCase() + key.slice(1)}`;
      result += '\n' + generateInterface(subInterfaceName, value, indent);
    }
  }

  return result;
}

// Helper: Generate Record type for flat objects
// @ts-ignore - Function declared for potential future use
function generateRecordType(obj: any): string {
  const keys = Object.keys(obj);
  const keyUnion = keys.map(k => `'${k}'`).join(' | ');
  const valueType = typeof Object.values(obj)[0] === 'number' ? 'number' : 'string';
  return `Record<${keyUnion}, ${valueType}>`;
}

// Generate ColorShades interface
const colorShadesKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const colorShadesType = `{\n  ${colorShadesKeys.map(k => `'${k}': string;`).join('\n  ')}\n}`;

// Generate main types file
const typesContent = `/**
 * Orion Design System - TypeScript Type Definitions
 *
 * Auto-generated from JSON token files.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 */

// ============================================================================
// PRIMITIVE TOKEN TYPES
// ============================================================================

export type ColorShades = ${colorShadesType};

export interface BrandColors {
  orion: ColorShades;
  deepblue: ColorShades;
  red: ColorShades;
  orange: ColorShades;
  lemon: ColorShades;
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
  1000: string;
}

export interface StatusColors {
  500: string;
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
}

export interface TypographyWeight {
  regular: string;
  medium: string;
  bold: string;
}

export interface TypographySize {
  10: string;
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
}

export interface TypographyLineHeight {
  none: string;
  tight: string;
  snug: string;
  normal: string;
  relaxed: string;
  loose: string;
}

export interface TypographyPrimitives {
  family: TypographyFamily;
  weight: TypographyWeight;
  size: TypographySize;
  lineHeight: TypographyLineHeight;
}

export interface SpacingPrimitives {
  0: string;
  px: string;
  '05': string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  16: string;
  20: string;
  24: string;
  32: string;
}

export interface RadiusPrimitives {
  0: string;
  sm: string;
  md: string;
  lg: string;
  'lg-2': string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface BlurPrimitives {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface IconPrimitives {
  library: string;
  cdn: string;
  size: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  stroke: string;
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
  blur: BlurPrimitives;
  icon: IconPrimitives;
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
}

export interface TextSemantics {
  primary: string;
  secondary: string;
  tertiary: string;
  inverse: string;
  brand: string;
}

export interface BorderSemantics {
  subtle: string;
  strong: string;
  interactive: string;
}

export interface InteractivePrimarySemantics {
  default: string;
  hover: string;
  text: string;
}

export interface InteractiveSecondarySemantics {
  default: string;
  hover: string;
  text: string;
}

export interface InteractiveGhostSemantics {
  hover: string;
}

export interface InteractiveSemantics {
  primary: InteractivePrimarySemantics;
  secondary: InteractiveSecondarySemantics;
  ghost: InteractiveGhostSemantics;
}

export interface StatusSemantics {
  error: string;
  success: string;
  warning: string;
  info: string;
}

export interface SoftSemantics {
  brand: string;
  'brand-hover': string;
  success: string;
  'success-hover'?: string;
  error: string;
  'error-hover'?: string;
  warning?: string;
  'warning-hover'?: string;
  info?: string;
  'info-hover'?: string;
}

export interface SemanticTokens {
  surface: SurfaceSemantics;
  text: TextSemantics;
  border: BorderSemantics;
  interactive: InteractiveSemantics;
  status: StatusSemantics;
  soft: SoftSemantics;
  focus?: {
    ring: string;
  };
  gradient?: {
    start: string;
    end: string;
  };
}

// ============================================================================
// THEME & BRAND TYPES
// ============================================================================

export type Theme = 'light' | 'dark';
export type Brand = 'orion' | 'deepblue' | 'red' | 'orange' | 'lemon';

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
    radiusContainer: string;
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
}

// ============================================================================
// TOKEN PATH TYPES (for type-safe token references)
// ============================================================================

export type ColorTokenPath =
  | \`color.brand.\${Brand}.\${keyof ColorShades}\`
  | \`color.neutral.\${keyof NeutralColors}\`
  | \`color.neutralPure.\${keyof NeutralColors}\`
  | 'color.error.500'
  | 'color.success.500'
  | 'color.warning.500'
  | 'color.info.500';

export type TypographyTokenPath =
  | \`typography.family.\${keyof TypographyFamily}\`
  | \`typography.weight.\${keyof TypographyWeight}\`
  | \`typography.size.\${keyof TypographySize}\`
  | \`typography.lineHeight.\${keyof TypographyLineHeight}\`;

export type SpacingTokenPath = \`spacing.\${keyof SpacingPrimitives}\`;
export type RadiusTokenPath = \`radius.\${keyof RadiusPrimitives}\`;
export type BlurTokenPath = \`blur.\${keyof BlurPrimitives}\`;

export type TokenPath =
  | ColorTokenPath
  | TypographyTokenPath
  | SpacingTokenPath
  | RadiusTokenPath
  | BlurTokenPath;

export type SemanticTokenPath =
  | \`surface.\${keyof SurfaceSemantics}\`
  | \`text.\${keyof TextSemantics}\`
  | \`border.\${keyof BorderSemantics}\`
  | \`interactive.primary.\${keyof InteractivePrimarySemantics}\`
  | \`interactive.secondary.\${keyof InteractiveSecondarySemantics}\`
  | \`interactive.ghost.\${keyof InteractiveGhostSemantics}\`
  | \`status.\${keyof StatusSemantics}\`
  | \`soft.\${keyof SoftSemantics}\`;

// ============================================================================
// CSS VARIABLE TYPES
// ============================================================================

export type CSSVariableName = \`--\${string}\`;

export interface CSSVariableMap {
  // Surface variables
  '--surface-base': string;
  '--surface-subtle': string;
  '--surface-layer': string;
  '--surface-primary': string;
  '--surface-secondary': string;
  '--surface-glass': string;
  '--surface-sunken': string;
  '--surface-overlay': string;

  // Text variables
  '--text-primary': string;
  '--text-secondary': string;
  '--text-tertiary': string;
  '--text-inverse': string;
  '--text-brand': string;

  // Interactive variables
  '--interactive-primary': string;
  '--interactive-primary-hover': string;
  '--interactive-primary-text': string;
  '--interactive-secondary': string;
  '--interactive-secondary-hover': string;
  '--interactive-secondary-text': string;
  '--interactive-ghost-hover': string;

  // Status variables
  '--status-error': string;
  '--status-success': string;
  '--status-warning': string;
  '--status-info': string;

  // Border variables
  '--border-subtle': string;
  '--border-strong': string;
  '--border-interactive': string;

  // Spacing variables (sample - extend as needed)
  '--spacing-0': string;
  '--spacing-px': string;
  '--spacing-1': string;
  '--spacing-2': string;
  '--spacing-3': string;
  '--spacing-4': string;
  '--spacing-6': string;
  '--spacing-8': string;
  '--spacing-16': string;
  '--spacing-32': string;

  // Radius variables
  '--radius-sm': string;
  '--radius-md': string;
  '--radius-lg': string;
  '--radius-xl': string;
  '--radius-2xl': string;
  '--radius-full': string;
  '--radius-control': string;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/** Get nested property type from dot notation path */
export type GetTokenValue<T, Path extends string> =
  Path extends \`\${infer Key}.\${infer Rest}\`
    ? Key extends keyof T
      ? GetTokenValue<T[Key], Rest>
      : never
    : Path extends keyof T
    ? T[Path]
    : never;

/** Type-safe token getter */
export type TokenValue<P extends TokenPath> = GetTokenValue<Primitives, P>;
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'types.ts'), typesContent);
console.log('✅ Generated types.ts');

// Generate primitives.ts (typed constants from primary.json)
const primitivesContent = `/**
 * Orion Design System - Primitive Token Constants
 *
 * Auto-generated from primary.json.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 */

import type { Primitives } from './types';

export const primitives: Primitives = ${JSON.stringify(primaryTokens, null, 2)} as const;

// Re-export for convenience
export const { color, typography, spacing, radius, blur, icon } = primitives;
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'primitives.ts'), primitivesContent);
console.log('✅ Generated primitives.ts');

// Generate themes.ts (light and dark semantic tokens)
const themesContent = `/**
 * Orion Design System - Theme Semantic Tokens
 *
 * Auto-generated from light.json and dark.json.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 */

import type { ThemeConfig } from './types';

export const lightTheme: ThemeConfig = ${JSON.stringify(lightTokens, null, 2)} as const;

export const darkTheme: ThemeConfig = ${JSON.stringify(darkTokens, null, 2)} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'themes.ts'), themesContent);
console.log('✅ Generated themes.ts');

// Generate brands.ts
const brandsContent = `/**
 * Orion Design System - Brand Configuration
 *
 * Auto-generated from brands.json.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 */

import type { Brand, BrandConfig } from './types';

export const brands: Record<Brand, BrandConfig> = ${JSON.stringify(brandsTokens.brands, null, 2)} as const;

export const defaultBrand: Brand = '${brandsTokens.defaultBrand}';
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'brands.ts'), brandsContent);
console.log('✅ Generated brands.ts');

// Generate index.ts (main export file)
const indexContent = `/**
 * Orion Design System - Core Tokens
 *
 * @packageDocumentation
 */

// Export all types
export * from './types';

// Export primitive tokens
export * from './primitives';

// Export themes
export * from './themes';

// Export brands
export * from './brands';

// Export utilities
export * from './utils';
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent);
console.log('✅ Generated index.ts');

// Generate utils.ts (helper functions)
const utilsContent = `/**
 * Orion Design System - Token Utilities
 *
 * Helper functions for working with design tokens in TypeScript.
 */

import type { Theme, Brand, TokenPath, SemanticTokenPath } from './types';
import { primitives } from './primitives';
import { themes } from './themes';
import { brands } from './brands';

/**
 * Get a primitive token value by path
 *
 * @example
 * getToken('color.brand.orion.500') // "#1B5BFF"
 * getToken('spacing.4') // "16px"
 */
export function getToken(path: TokenPath): string {
  const keys = path.split('.');
  let value: any = primitives;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      throw new Error(\`Token path "\${path}" not found\`);
    }
  }

  return value;
}

/**
 * Get a semantic token value by theme and path
 *
 * @example
 * getSemanticToken('light', 'surface.base') // "#ffffff"
 * getSemanticToken('dark', 'text.primary') // "#ffffff"
 */
export function getSemanticToken(theme: Theme, path: SemanticTokenPath): string {
  const keys = path.split('.');
  let value: any = themes[theme].semantic;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      throw new Error(\`Semantic token path "\${path}" not found in \${theme} theme\`);
    }
  }

  // Resolve token references (e.g., "{color.neutral.0}")
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const refPath = value.slice(1, -1);
    return getToken(refPath as TokenPath);
  }

  return value;
}

/**
 * Get brand configuration
 *
 * @example
 * getBrand('orion') // { name: 'orion', accentColor: '#1B5BFF', ... }
 */
export function getBrand(brand: Brand) {
  return brands[brand];
}

/**
 * Generate CSS variable name from semantic path
 *
 * @example
 * toCSSVariable('surface.base') // "--surface-base"
 * toCSSVariable('text.primary') // "--text-primary"
 */
export function toCSSVariable(path: SemanticTokenPath): string {
  return \`--\${path.replace(/\\./g, '-')}\`;
}

/**
 * Type guard for valid theme
 */
export function isValidTheme(value: string): value is Theme {
  return value === 'light' || value === 'dark';
}

/**
 * Type guard for valid brand
 */
export function isValidBrand(value: string): value is Brand {
  return value in brands;
}
`;

fs.writeFileSync(path.join(OUTPUT_DIR, 'utils.ts'), utilsContent);
console.log('✅ Generated utils.ts');

console.log('\n✨ Token type generation complete!');
console.log(`📁 Output directory: ${OUTPUT_DIR}`);
console.log('📦 Files generated:');
console.log('   - types.ts (TypeScript interfaces)');
console.log('   - primitives.ts (Primitive token constants)');
console.log('   - themes.ts (Light/dark semantic tokens)');
console.log('   - brands.ts (Brand configurations)');
console.log('   - utils.ts (Helper functions)');
console.log('   - index.ts (Main export)');
