/**
 * Transforms — Rewrite imports when copying components to user's project
 *
 * Import rewriting rules:
 * - Internal imports (./Foo.types, ./Foo.module.css) → unchanged
 * - Cross-component imports (../Button, ../../Button) → relative to installed dir
 * - Hook/context imports (../../hooks, ../../contexts/*) → @orion-ds/react
 * - NPM package imports (react, lucide-react) → unchanged
 */

/**
 * Set of installed component names (kebab-case) for resolving cross-component imports.
 */
export function transformImports(
  content: string,
  installedComponents: Set<string>,
): string {
  // Rewrite hook/context imports to @orion-ds/react
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/hooks['"]/g,
    "from '@orion-ds/react'",
  );
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/hooks['"]/g,
    "from '@orion-ds/react'",
  );
  content = content.replace(
    /from\s+['"]\.\.\/hooks['"]/g,
    "from '@orion-ds/react'",
  );
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/contexts\/ThemeContext['"]/g,
    "from '@orion-ds/react'",
  );
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/contexts\/ThemeContext['"]/g,
    "from '@orion-ds/react'",
  );
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/contexts['"]/g,
    "from '@orion-ds/react'",
  );
  content = content.replace(
    /from\s+['"]\.\.\/\.\.\/\.\.\/contexts['"]/g,
    "from '@orion-ds/react'",
  );

  // Rewrite cross-component imports to relative paths between installed components
  // Matches patterns like: from '../Button' or from '../../Button'
  content = content.replace(
    /from\s+['"](\.\.\/(?:\.\.\/)?)([\w]+)['"]/g,
    (_match, _prefix: string, componentName: string) => {
      // Skip internal imports (same-dir files like ./Button.types)
      // This regex only matches ../ prefixed imports, so internal ./Foo won't match

      // Check if this is a known component
      const kebab = toKebabCase(componentName);
      if (installedComponents.has(kebab)) {
        return `from '../${kebab}'`;
      }

      // Not a known installed component — point to @orion-ds/react
      return `from '@orion-ds/react'`;
    },
  );

  return content;
}

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

/**
 * Extract the component directory name (kebab-case) from a registry file path.
 * e.g., "packages/react/src/components/Button/Button.tsx" → "button"
 */
export function componentDirName(filePath: string): string {
  // The component dir is the second-to-last segment for standard component files
  const parts = filePath.split("/");
  // Find the 'components' segment and take the next one
  const compIdx = parts.indexOf("components");
  if (compIdx >= 0 && compIdx + 1 < parts.length) {
    return toKebabCase(parts[compIdx + 1]!);
  }
  // For sections: look for 'sections' segment
  const secIdx = parts.indexOf("sections");
  if (secIdx >= 0 && secIdx + 1 < parts.length) {
    return toKebabCase(parts[secIdx + 1]!);
  }
  // For templates
  const tmplIdx = parts.indexOf("templates");
  if (tmplIdx >= 0 && tmplIdx + 1 < parts.length) {
    return toKebabCase(parts[tmplIdx + 1]!);
  }
  // Fallback: use the parent directory
  return toKebabCase(parts[parts.length - 2] || "unknown");
}

/**
 * Extract just the filename from a registry file path.
 * e.g., "packages/react/src/components/Button/Button.tsx" → "Button.tsx"
 */
export function fileName(filePath: string): string {
  return filePath.split("/").pop() || filePath;
}
