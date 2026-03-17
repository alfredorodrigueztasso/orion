/**
 * Orion React Validation Utilities
 *
 * Runtime validation helpers that provide helpful console warnings
 * during development to catch common AI-generated code mistakes.
 *
 * These warnings only appear in development mode (process.env.NODE_ENV !== 'production').
 *
 * @module validation
 */

/**
 * Check if we're in development mode.
 * Warnings are suppressed in production for performance.
 */
const isDev =
  typeof process !== "undefined" && process.env?.NODE_ENV !== "production";

/**
 * Console styles for Orion warnings
 */
const WARN_STYLE = "color: #f59e0b; font-weight: bold;";
const FIX_STYLE = "color: #10b981;";
const CODE_STYLE = "background: #f3f4f6; padding: 2px 4px; border-radius: 3px;";

/**
 * Warn when an icon-only button is missing aria-label.
 *
 * @param component - Component name (e.g., 'Button')
 * @param iconOnly - Whether the component is icon-only
 * @param hasAriaLabel - Whether aria-label is provided
 *
 * @example
 * ```tsx
 * // In Button.tsx
 * warnMissingAriaLabel('Button', iconOnly, !!rest['aria-label']);
 * ```
 */
export function warnMissingAriaLabel(
  component: string,
  iconOnly: boolean,
  hasAriaLabel: boolean,
): void {
  if (isDev && iconOnly && !hasAriaLabel) {
    console.warn(
      `%c[Orion/${component}]%c Missing aria-label for icon-only component.

Screen readers cannot announce the purpose of this button.

%cFix:%c Add an aria-label prop:
%c<${component} iconOnly icon={<Icon />} aria-label="Description" />%c

Learn more: https://orion.design/accessibility`,
      WARN_STYLE,
      "",
      FIX_STYLE,
      "",
      CODE_STYLE,
      "",
    );
  }
}

/**
 * Warn when a component receives a brand prop.
 * Brand should be set globally via ThemeProvider, not on individual components.
 *
 * @param component - Component name (e.g., 'Button')
 * @param hasBrandProp - Whether the component received a brand prop
 *
 * @example
 * ```tsx
 * // In Button.tsx
 * warnBrandProp('Button', 'brand' in rest);
 * ```
 */
export function warnBrandProp(component: string, hasBrandProp: boolean): void {
  if (isDev && hasBrandProp) {
    console.warn(
      `%c[Orion/${component}]%c Brand is GLOBAL - set on ThemeProvider, not components.

Components automatically inherit the brand from the nearest ThemeProvider.
Passing brand as a prop has no effect.

%cFix:%c Set brand globally:
%c<ThemeProvider options={{ defaultBrand: 'red' }}>
  <App />
</ThemeProvider>%c

Or change it dynamically:
%cconst { setBrand } = useThemeContext();
setBrand('deepblue');%c

Learn more: https://orion.design/theming`,
      WARN_STYLE,
      "",
      FIX_STYLE,
      "",
      CODE_STYLE,
      "",
      CODE_STYLE,
      "",
    );
  }
}

/**
 * Warn when a component receives a theme prop.
 * Theme should be set globally via ThemeProvider, not on individual components.
 *
 * @param component - Component name (e.g., 'Card')
 * @param hasThemeProp - Whether the component received a theme prop
 *
 * @example
 * ```tsx
 * // In Card.tsx
 * warnThemeProp('Card', 'theme' in rest);
 * ```
 */
export function warnThemeProp(component: string, hasThemeProp: boolean): void {
  if (isDev && hasThemeProp) {
    console.warn(
      `%c[Orion/${component}]%c Theme is GLOBAL - set on ThemeProvider, not components.

Components automatically inherit the theme from the nearest ThemeProvider.
Passing theme as a prop has no effect.

%cFix:%c Set theme globally:
%c<ThemeProvider options={{ defaultTheme: 'dark' }}>
  <App />
</ThemeProvider>%c

Or change it dynamically:
%cconst { setTheme, toggleTheme } = useThemeContext();
setTheme('dark');
toggleTheme();%c

Learn more: https://orion.design/theming`,
      WARN_STYLE,
      "",
      FIX_STYLE,
      "",
      CODE_STYLE,
      "",
      CODE_STYLE,
      "",
    );
  }
}

/**
 * Warn when glass variant is used outside Display mode.
 * Glass effects only work properly in Display mode.
 *
 * @param component - Component name (e.g., 'Card', 'Navbar')
 * @param variant - The variant being used
 *
 * @example
 * ```tsx
 * // In Card.tsx
 * warnGlassVariant('Card', variant);
 * ```
 */
export function warnGlassVariant(
  component: string,
  variant: string | undefined,
): void {
  if (isDev && variant === "glass") {
    // Check current mode from document
    const currentMode =
      typeof document !== "undefined"
        ? document.documentElement.dataset.mode
        : undefined;

    if (currentMode && currentMode !== "display") {
      console.warn(
        `%c[Orion/${component}]%c Glass variant only works in Display mode.

Current mode is '%c${currentMode}%c', but glass effects require '%cdisplay%c'.
The component will render but may not look as intended.

%cFix:%c Either:
1. Use a different variant for ${currentMode} mode:
   %c<${component} variant="elevated" />%c

2. Or switch to Display mode:
   %c<html data-mode="display">%c

Learn more: https://orion.design/modes`,
        WARN_STYLE,
        "",
        CODE_STYLE,
        "",
        CODE_STYLE,
        "",
        FIX_STYLE,
        "",
        CODE_STYLE,
        "",
        CODE_STYLE,
        "",
      );
    }
  }
}

/**
 * Warn when hardcoded colors are detected in style prop.
 *
 * @param component - Component name
 * @param style - The style object
 *
 * @example
 * ```tsx
 * warnHardcodedColors('Button', style);
 * ```
 */
export function warnHardcodedColors(
  component: string,
  style: React.CSSProperties | undefined,
): void {
  if (!isDev || !style) return;

  const colorProps = ["color", "backgroundColor", "borderColor", "background"];
  const hexPattern = /#[0-9A-Fa-f]{3,8}/;
  const rgbPattern = /rgba?\s*\(/;

  for (const prop of colorProps) {
    const value = style[prop as keyof React.CSSProperties];
    if (
      typeof value === "string" &&
      (hexPattern.test(value) || rgbPattern.test(value))
    ) {
      console.warn(
        `%c[Orion/${component}]%c Hardcoded color detected: ${prop}="${value}"

Use CSS variables instead for theme compatibility.

%cFix:%c Replace hardcoded colors with tokens:
%c// Instead of:
style={{ ${prop}: '${value}' }}

// Use:
style={{ ${prop}: 'var(--text-primary)' }}     // For text
style={{ ${prop}: 'var(--surface-base)' }}     // For backgrounds
style={{ ${prop}: 'var(--border-subtle)' }}    // For borders
style={{ ${prop}: 'var(--interactive-primary)' }} // For interactive elements%c

Learn more: https://orion.design/tokens`,
        WARN_STYLE,
        "",
        FIX_STYLE,
        "",
        CODE_STYLE,
        "",
      );
      break; // Only warn once per component render
    }
  }
}

/**
 * Warn when Field component might be misused.
 * Called when children are passed to Field (which doesn't support them).
 *
 * @param hasChildren - Whether children were passed
 */
export function warnFieldChildren(hasChildren: boolean): void {
  if (isDev && hasChildren) {
    console.warn(
      `%c[Orion/Field]%c Field is a self-contained component, not a wrapper.

Children passed to Field will be ignored.

%cFix:%c Use props instead of children:
%c// WRONG:
<Field label="Email">
  <input type="email" />
</Field>

// CORRECT:
<Field
  label="Email"
  type="email"
  placeholder="you@example.com"
/>%c

Learn more: https://orion.design/components/field`,
      WARN_STYLE,
      "",
      FIX_STYLE,
      "",
      CODE_STYLE,
      "",
    );
  }
}

/**
 * Warn when a section component is created instead of using pre-built sections.
 * This is for documentation/guidance purposes.
 *
 * @param customComponentName - Name of the custom component being created
 * @param suggestedSection - The pre-built section to use instead
 */
export function warnUsePrebuiltSection(
  customComponentName: string,
  suggestedSection: string,
): void {
  if (isDev) {
    console.warn(
      `%c[Orion]%c Consider using the pre-built ${suggestedSection} section instead of ${customComponentName}.

Orion provides ready-to-use sections that follow best practices.

%cAvailable sections:%c
Hero, Features, Pricing, Testimonials, FAQ, CTA, Footer,
Team, Contact, Newsletter, LogoCloud, Blog, Gallery,
Timeline, Comparison, Banner, SocialProof, AppDownload

%cUsage:%c
%cimport { ${suggestedSection} } from '@orion/react';

<${suggestedSection}
  headline="Your Headline"
  // ... other props
/>%c

Learn more: https://orion.design/sections`,
      WARN_STYLE,
      "",
      FIX_STYLE,
      "",
      "",
      "",
      CODE_STYLE,
      "",
    );
  }
}
