/**
 * Tailwind CSS v4 Configuration for Orion Testing
 *
 * This config demonstrates Tailwind v4 + Orion coexistence.
 * Tailwind v4 uses @import instead of @tailwind directives.
 *
 * IMPORTANT: Import order matters!
 * In your CSS file, ensure:
 *   1. Declare @layer orion FIRST
 *   2. Import Tailwind
 *   3. Import Orion styles
 *
 * Example (src/styles.css):
 *   @layer orion;
 *   @import 'tailwindcss';
 *   @import '@orion-ds/react/styles.css';
 *
 * Tailwind v4 changes:
 * - Uses @import 'tailwindcss' (all-in-one)
 * - Layers handled differently than v3
 * - CSS variables automatically supported
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind color utilities to Orion tokens
        brand: 'var(--color-brand-500)',
        'brand-400': 'var(--color-brand-400)',
        'brand-600': 'var(--color-brand-600)',

        // Surface colors
        'surface-base': 'var(--surface-base)',
        'surface-subtle': 'var(--surface-subtle)',
        'surface-layer': 'var(--surface-layer)',
        'surface-sunken': 'var(--surface-sunken)',

        // Text colors
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-brand': 'var(--text-brand)',

        // Interactive colors
        'interactive-primary': 'var(--interactive-primary)',
        'interactive-secondary': 'var(--interactive-secondary)',
      },

      spacing: {
        // Map spacing utilities to Orion spacing scale
        'orion-0': 'var(--spacing-0)',   // 0px
        'orion-1': 'var(--spacing-1)',   // 4px
        'orion-2': 'var(--spacing-2)',   // 8px
        'orion-3': 'var(--spacing-3)',   // 12px
        'orion-4': 'var(--spacing-4)',   // 16px
        'orion-5': 'var(--spacing-5)',   // 20px
        'orion-6': 'var(--spacing-6)',   // 24px
        'orion-7': 'var(--spacing-7)',   // 28px
        'orion-8': 'var(--spacing-8)',   // 32px
        'orion-9': 'var(--spacing-9)',   // 36px
        'orion-10': 'var(--spacing-10)', // 40px
        'orion-12': 'var(--spacing-12)', // 48px
      },

      borderRadius: {
        control: 'var(--radius-control)',
        container: 'var(--radius-container)',
      },
    },
  },
  plugins: [],
};
