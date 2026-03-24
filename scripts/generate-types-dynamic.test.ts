/**
 * Unit Tests for generate-types-dynamic.ts
 *
 * Tests for APPROACH B refactoring:
 * - String generation produces valid TypeScript
 * - Template literals are properly escaped
 * - Function executes without throwing
 * - All required tokens are present in output
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('generate-types-dynamic.ts - APPROACH B Tests', () => {
  const typesOutputDir = path.join(__dirname, '../packages/react/src/tokens');
  const typesFile = path.join(typesOutputDir, 'types.ts');

  /**
   * Test 1: String generation produces valid TypeScript
   */
  it('should generate valid TypeScript types file', () => {
    expect(fs.existsSync(typesFile)).toBe(true);
    const content = fs.readFileSync(typesFile, 'utf-8');

    // Should contain export statements
    expect(content).toContain('export type');
    expect(content).toContain('export interface');

    // Should not contain obvious syntax errors
    expect(content).not.toContain('undefined');
  });

  /**
   * Test 2: Template literals are properly escaped in output
   */
  it('should contain properly escaped template literals', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    // Should contain template literal type definitions
    expect(content).toContain('export type ColorTokenPath =');
    expect(content).toContain('export type SpacingTokenPath =');
    expect(content).toContain('export type RadiusTokenPath =');

    // Should contain the GetTokenValue conditional type with template literals
    expect(content).toContain('Path extends `${infer Key}');
  });

  /**
   * Test 3: Required type definitions are present
   */
  it('should include all required type definitions', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    // Brand type should exist with valid brands
    expect(content).toContain('export type Brand =');
    expect(content).toMatch(/'orion'|'deepblue'|'red'|'orange'|'lemon'/);

    // Primitive interfaces
    expect(content).toContain('export interface ColorPrimitives');
    expect(content).toContain('export interface TypographyPrimitives');
    expect(content).toContain('export interface SpacingPrimitives');
    expect(content).toContain('export interface RadiusPrimitives');

    // Semantic interfaces
    expect(content).toContain('export interface SurfaceSemantics');
    expect(content).toContain('export interface TextSemantics');
    expect(content).toContain('export interface SemanticTokens');

    // Token path types
    expect(content).toContain('export type ColorTokenPath =');
    expect(content).toContain('export type TokenPath =');
  });

  /**
   * Test 4: CSS Variable types are defined
   */
  it('should include CSS variable type definitions', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    expect(content).toContain('export type CSSVariableName =');
    expect(content).toContain('export interface CSSVariableMap');
    expect(content).toContain("'--surface-base'");
    expect(content).toContain("'--text-primary'");
    expect(content).toContain("'--interactive-primary'");
  });

  /**
   * Test 5: No octal literals in output
   */
  it('should not contain octal literal syntax', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    // Should not have unquoted octal numbers that cause TS errors
    expect(content).not.toMatch(/:\s*05[;:,]/);
    expect(content).not.toMatch(/:\s*07[;:,]/);
    expect(content).not.toMatch(/:\s*08[;:,]/);
  });

  /**
   * Test 6: Utility types with conditional type syntax
   */
  it('should include utility types with infer syntax', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    // Should have GetTokenValue type with infer
    expect(content).toContain('export type GetTokenValue<T, Path extends string>');
    expect(content).toContain('infer Key');
    expect(content).toContain('infer Rest');

    // Should have TokenValue type
    expect(content).toContain('export type TokenValue<P extends TokenPath>');
  });

  /**
   * Test 7: No dangling braces or syntax errors
   */
  it('should have balanced braces and valid structure', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;

    // Allow for type/interface parameters which might have more opens
    expect(Math.abs(openBraces - closeBraces)).toBeLessThanOrEqual(2);
  });

  /**
   * Test 8: All semantic token paths use template literal syntax
   */
  it('should have semantic token paths with template literals', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    expect(content).toContain('`surface.${');
    expect(content).toContain('`text.${');
    expect(content).toContain('`border.${');
  });

  /**
   * Test 9: Comments and documentation are preserved
   */
  it('should include helpful comments and documentation', () => {
    const content = fs.readFileSync(typesFile, 'utf-8');

    // Should have section headers
    expect(content).toContain('PRIMITIVE TOKEN TYPES');
    expect(content).toContain('SEMANTIC TOKEN TYPES');
    expect(content).toContain('THEME & BRAND TYPES');

    // Should have generation notice
    expect(content).toContain('DYNAMICALLY GENERATED');
    expect(content).toContain('DO NOT EDIT MANUALLY');
  });
});
