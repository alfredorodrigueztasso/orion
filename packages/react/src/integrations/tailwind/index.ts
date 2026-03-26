/**
 * Official Tailwind CSS preset for Orion Design System.
 * Maps all Orion semantic tokens to Tailwind utilities that respect
 * dark mode and brand switching automatically via CSS variables.
 *
 * @example
 * // tailwind.config.ts
 * import { orionPreset } from '@orion-ds/react/integrations/tailwind';
 * export default { presets: [orionPreset], content: [...] };
 */
export const orionPreset: Record<string, any> = {
  theme: {
    extend: {
      colors: {
        // Surfaces
        "surface-base": "var(--surface-base)",
        "surface-subtle": "var(--surface-subtle)",
        "surface-layer": "var(--surface-layer)",
        "surface-sunken": "var(--surface-sunken)",
        "surface-glass": "var(--surface-glass)",
        "surface-overlay": "var(--surface-overlay)",
        // Text
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-brand": "var(--text-brand)",
        "text-inverse": "var(--text-inverse)",
        "text-on-brand-primary": "var(--text-on-brand-primary)",
        // Interactive
        "interactive-primary": "var(--interactive-primary)",
        "interactive-primary-hover": "var(--interactive-primary-hover)",
        "interactive-primary-text": "var(--interactive-primary-text)",
        "interactive-secondary": "var(--interactive-secondary)",
        "interactive-secondary-hover": "var(--interactive-secondary-hover)",
        // Borders
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
        "border-interactive": "var(--border-interactive)",
        // Status
        "status-success": "var(--status-success)",
        "status-error": "var(--status-error)",
        "status-warning": "var(--status-warning)",
        "status-info": "var(--status-info)",
        // Soft variants
        "soft-brand": "var(--soft-brand)",
        "soft-success": "var(--soft-success)",
        "soft-error": "var(--soft-error)",
        "soft-warning": "var(--soft-warning)",
        "soft-info": "var(--soft-info)",
        // Alert variants (12 values: 4 statuses × 3 properties: bg, text, border)
        "alert-success-bg": "var(--alert-success-bg)",
        "alert-success-text": "var(--alert-success-text)",
        "alert-success-border": "var(--alert-success-border)",
        "alert-error-bg": "var(--alert-error-bg)",
        "alert-error-text": "var(--alert-error-text)",
        "alert-error-border": "var(--alert-error-border)",
        "alert-warning-bg": "var(--alert-warning-bg)",
        "alert-warning-text": "var(--alert-warning-text)",
        "alert-warning-border": "var(--alert-warning-border)",
        "alert-info-bg": "var(--alert-info-bg)",
        "alert-info-text": "var(--alert-info-text)",
        "alert-info-border": "var(--alert-info-border)",
        // Brand primitives (useful for gradients)
        "color-brand": "var(--color-brand-500)",
        "color-brand-400": "var(--color-brand-400)",
        "color-brand-600": "var(--color-brand-600)",
        // Gradients
        "gradient-start": "var(--gradient-start)",
        "gradient-end": "var(--gradient-end)",
      },
      spacing: {
        "orion-0": "var(--spacing-0)",
        "orion-px": "var(--spacing-px)",
        "orion-05": "var(--spacing-05)",
        "orion-1": "var(--spacing-1)",
        "orion-2": "var(--spacing-2)",
        "orion-3": "var(--spacing-3)",
        "orion-4": "var(--spacing-4)",
        "orion-5": "var(--spacing-5)",
        "orion-6": "var(--spacing-6)",
        "orion-7": "var(--spacing-7)",
        "orion-8": "var(--spacing-8)",
        "orion-9": "var(--spacing-9)",
        "orion-10": "var(--spacing-10)",
        "orion-11": "var(--spacing-11)",
        "orion-12": "var(--spacing-12)",
        "orion-16": "var(--spacing-16)",
        "orion-20": "var(--spacing-20)",
        "orion-24": "var(--spacing-24)",
        "orion-32": "var(--spacing-32)",
      },
      borderRadius: {
        // Semantic (brand-aware)
        button: "var(--radius-button)", // brand-controlled
        container: "var(--radius-container)", // brand-controlled
        // Primitives
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["var(--font-secondary)"],
        mono: ["var(--font-mono)"],
      },
      backdropBlur: {
        "orion-sm": "var(--blur-sm)",
        "orion-md": "var(--blur-md)",
        "orion-lg": "var(--blur-lg)",
        "orion-xl": "var(--blur-xl)",
      },
    },
  },
};

export default orionPreset;
