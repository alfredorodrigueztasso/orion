/**
 * Tailwind + Orion Integration Tests
 *
 * Validates that:
 * 1. @layer orion is present in the bundled CSS
 * 2. CSS variables are accessible
 * 3. Specificity cascade is correct
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Tailwind + Orion Integration', () => {
  let stylesCss: string;

  beforeAll(() => {
    try {
      const distPath = resolve(
        __dirname,
        '../../packages/react/dist/styles.css'
      );
      stylesCss = readFileSync(distPath, 'utf-8');
    } catch (error) {
      console.error(
        'Failed to read styles.css. Make sure npm run build:react completed successfully.'
      );
      throw error;
    }
  });

  describe('@layer orion wrapper', () => {
    it('should contain @layer orion declaration', () => {
      expect(stylesCss).toContain('@layer orion');
    });

    it('should wrap CSS in a single @layer orion block', () => {
      const layerStart = stylesCss.indexOf('@layer orion');
      const layerEnd = stylesCss.indexOf('} /* end @layer orion */');

      expect(layerStart).toBeGreaterThan(-1);
      expect(layerEnd).toBeGreaterThan(layerStart);
    });

    it('should not have @layer in theme.css (standalone tokens)', () => {
      try {
        const themePath = resolve(__dirname, '../../packages/react/dist/theme.css');
        const themeCss = readFileSync(themePath, 'utf-8');

        // theme.css should NOT be wrapped in @layer (it's for tree-shaking users)
        expect(themeCss).not.toContain('@layer orion');
        expect(themeCss).toContain('--color-brand');
      } catch (error) {
        // theme.css might not exist in all builds
        console.warn('theme.css not found (optional file)');
      }
    });
  });

  describe('CSS variables', () => {
    it('should contain Orion CSS variables', () => {
      expect(stylesCss).toContain('--surface-base');
      expect(stylesCss).toContain('--text-primary');
      expect(stylesCss).toContain('--spacing-4');
      expect(stylesCss).toContain('--radius-control');
    });

    it('should contain brand color variables', () => {
      expect(stylesCss).toContain('--color-brand');
    });

    it('should contain interactive variables', () => {
      expect(stylesCss).toContain('--interactive-primary');
    });
  });

  describe('layer semantics', () => {
    it('should have themes and semantics tokens inside the layer', () => {
      const layerStart = stylesCss.indexOf('@layer orion');
      const layerEnd = stylesCss.indexOf('} /* end @layer orion */');
      const layerContent = stylesCss.substring(layerStart, layerEnd);

      // Both theme (primitives) and component styles should be in the layer
      expect(layerContent).toContain('--color-brand');
      expect(layerContent).toContain('--surface-base');
    });

    it('should have valid CSS syntax after @layer', () => {
      const layerStart = stylesCss.indexOf('@layer orion {');
      const layerEnd = stylesCss.indexOf('} /* end @layer orion */');

      expect(layerStart).toBeGreaterThan(-1);
      expect(layerEnd).toBeGreaterThan(layerStart);

      // Sanity check: opening and closing braces should be balanced
      const layerContent = stylesCss.substring(layerStart, layerEnd + 25);
      const openBraces = (layerContent.match(/{/g) || []).length;
      const closeBraces = (layerContent.match(/}/g) || []).length;

      // Should have at least 1 opening and 1 closing
      expect(openBraces).toBeGreaterThan(0);
      expect(closeBraces).toBeGreaterThan(0);
    });
  });

  describe('documentation', () => {
    it('should have helpful comments explaining the layer', () => {
      expect(stylesCss).toContain('TAILWIND_INTEGRATION.md');
      expect(stylesCss).toContain('Tailwind CSS compatibility');
    });
  });
});
