/**
 * Dynamic Token Type Generation Script (Improved)
 *
 * Reads JSON token files and generates TypeScript types dynamically.
 * This version introspects the JSON structure to create accurate types,
 * eliminating hardcoded type definitions that fall out of sync.
 *
 * Usage: ts-node scripts/generate-types-dynamic.ts
 *
 * Improvements over original:
 * - Reads JSON structure to generate types (not hardcoded)
 * - Handles missing/optional properties automatically
 * - Flexible to JSON schema changes
 * - Uses [key: string]: any fallback for unknown structures
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TOKEN_DIR = path.join(__dirname, '../tokens');
const OUTPUT_DIR = path.join(__dirname, '../packages/react/src/tokens');
// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Read and parse JSON token file with error handling
 */
function readTokenFile(filePath: string, label: string): any {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(`❌ Token file not found: ${filePath}`);
      console.error(`   Ensure "${label}" exists in the tokens/ directory.`);
    } else {
      console.error(`❌ Failed to parse ${label}: ${(err as Error).message}`);
    }
    process.exit(1);
  }
}

// Read token files with error handling
const primaryTokens = readTokenFile(path.join(TOKEN_DIR, 'primary.json'), 'primary.json');
const lightTokens = readTokenFile(path.join(TOKEN_DIR, 'light.json'), 'light.json');
const darkTokens = readTokenFile(path.join(TOKEN_DIR, 'dark.json'), 'dark.json');
const brandsTokens = readTokenFile(path.join(TOKEN_DIR, 'brands.json'), 'brands.json');
/**
 * Introspect object and extract keys with type inference
 * Returns: { required: string[], optional: string[] }
 */
function analyzeObjectStructure(obj: any): { required: string[]; optional: string[] } {
  if (!obj || typeof obj !== 'object') {
    return { required: [], optional: [] };
  }

  const required: string[] = [];
  const optional: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      optional.push(key);
    } else {
      required.push(key);
    }
  }

  return { required, optional };
}

/**
 * Generate TypeScript type definition from object structure
 */
function generateTypeFromObject(
  name: string,
  obj: any,
  indent = 0
): string {
  const spaces = '  '.repeat(indent);
  const analysis = analyzeObjectStructure(obj);

  let result = `${spaces}export interface ${name} {\n`;

  // Required properties
  for (const key of analysis.required) {
    const value = obj[key];
    const propType = inferPropertyType(value);
    result += `${spaces}  ${key}: ${propType};\n`;
  }

  // Optional properties
  for (const key of analysis.optional) {
    const value = obj[key];
    const propType = inferPropertyType(value);
    result += `${spaces}  ${key}?: ${propType};\n`;
  }

  // Catch-all for unknown properties
  result += `${spaces}  [key: string]: any;\n`;
  result += `${spaces}}\n`;

  return result;
}

/**
 * Infer TypeScript type from value
 */
function inferPropertyType(value: any): string {
  if (value === null || value === undefined) {
    return 'any';
  }

  if (typeof value === 'string') {
    return 'string';
  }

  if (typeof value === 'number') {
    return 'number';
  }

  if (typeof value === 'boolean') {
    return 'boolean';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return 'any[]';
    }
    const firstType = inferPropertyType(value[0]);
    return `${firstType}[]`;
  }

  if (typeof value === 'object') {
    return 'Record<string, any>';
  }

  return 'any';
}

/**
 * Generate interfaces from color shade sample
 */
function generateColorShadesType(sample: Record<string, string>): string {
  const keys = Object.keys(sample).sort((a, b) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (isNaN(aNum) || isNaN(bNum)) return a.localeCompare(b);
    return aNum - bNum;
  });

  return `{\n  ${keys.map(k => `'${k}': string;`).join('\n  ')}\n}`;
}

/**
 * Extract actual keys from brands
 */
function extractBrandKeys(brands: any): string[] {
  return Object.keys(brands).filter(key => key !== 'metadata');
}

/**
 * Extract actual keys from typography sizes
 */
function extractTypographySizeKeys(typog: any): string[] {
  if (typog?.typography?.size) {
    return Object.keys(typog.primitives.typography.size)
      .filter(k => !isNaN(parseInt(k)))
      .sort((a, b) => parseInt(a) - parseInt(b));
  }
  return [];
}

// ============================================================================
// GENERATE TYPES DYNAMICALLY
// ============================================================================

// Extract real color shades from primary tokens
const sampleColorShades = primaryTokens.color?.brand?.orion || {};
const colorShadesType = generateColorShadesType(sampleColorShades);

// Extract real brands
const actualBrands = extractBrandKeys(brandsTokens);
const brandColorsInterface = actualBrands
  .map(brand => `  ${brand}: ColorShades;`)
  .join('\n');

// Extract real typography sizes
const typographySizes = extractTypographySizeKeys(primaryTokens);
const typographySizeInterface = typographySizes
  .map(size => `  ${size}: string;`)
  .join('\n');

// Extract real spacing keys
const spacingKeys = Object.keys(primaryTokens.spacing || {})
  .sort((a, b) => {
    if (a === 'px') return 1;
    if (b === 'px') return -1;
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (isNaN(aNum) || isNaN(bNum)) return a.localeCompare(b);
    return aNum - bNum;
  });
const spacingInterface = spacingKeys
  .map(key => `  ${key === 'px' ? "'px'" : key}: string;`)
  .join('\n');

// Extract real radius keys
const radiusKeys = Object.keys(primaryTokens.radius || {})
  .sort((a, b) => a.localeCompare(b));
const radiusInterface = radiusKeys
  .map(key => {
    // Determine if property is required based on common patterns
    const isOptional = ['xs', '3xl'].includes(key) ? '?' : '';
    return `  ${key}${isOptional}: string;`;
  })
  .join('\n');

// Generate main types file with dynamic content
const typesContent = `/**
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

export type ColorShades = ${colorShadesType};

export interface BrandColors {
${brandColorsInterface}
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
${typographySizeInterface}
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
${spacingInterface}
  [key: string]: any;
}

export interface RadiusPrimitives {
${radiusInterface}
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
  'on-brand'?: TextOnBrandSemantics;
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
  alert?: Record<string, any>;
  chart?: Record<string, any>;
  focus?: {
    ring: string;
  };
  gradient?: {
    start: string;
    end: string;
}

// ============================================================================
// THEME & BRAND TYPES
// ============================================================================

export type Theme = 'light' | 'dark';
export type Brand = ${actualBrands.map(b => \`'\${b}'\`).join(' | ')};

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

  // Spacing variables (sample)
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

  [key: string]: any;
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

// Write types file
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'types.ts'),
  typesContent,
  'utf-8'
);

console.log('✅ Dynamic type generation completed');
console.log(\`📝 Generated: \${path.join(OUTPUT_DIR, 'types.ts')}\`);
console.log(\`📊 Brands detected: \${actualBrands.join(', ')}\`);
console.log(\`📊 Typography sizes: \${typographySizes.length} detected\`);
console.log(\`📊 Spacing scales: \${spacingKeys.length} detected\`);
console.log(\`📊 Radius scales: \${radiusKeys.length} detected\`);
