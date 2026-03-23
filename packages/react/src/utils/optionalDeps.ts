/**
 * Optional Dependency Error Handling
 *
 * Provides helpful error messages when users try to use components
 * that require optional peer dependencies (recharts, date-fns, etc.)
 * without having them installed.
 */

/**
 * Metadata for an optional dependency error
 */
export interface OptionalDepError {
  available: boolean;
  componentName: string;
  depName: string | string[];
  installCommand: string;
  pnpmCommand: string;
  docsUrl: string;
}

/**
 * Check if an optional dependency is available
 * @param depName - NPM package name or array of package names to check
 * @returns True if all dependencies are available
 */
function isDepAvailable(depName: string | string[]): boolean {
  const deps = Array.isArray(depName) ? depName : [depName];
  return deps.every((dep) => {
    try {
      require(dep);
      return true;
    } catch {
      return false;
    }
  });
}

/**
 * Get error information for a missing optional dependency
 * @param componentName - Name of the Orion component
 * @param depName - NPM package name or array of package names
 * @param docsUrl - URL to component documentation
 * @returns OptionalDepError with installation instructions
 */
export function getOptionalDepError(
  componentName: string,
  depName: string | string[],
  docsUrl: string
): OptionalDepError {
  const deps = Array.isArray(depName) ? depName : [depName];
  const depsString = deps.join(" ");

  return {
    available: isDepAvailable(depName),
    componentName,
    depName,
    installCommand: `npm install ${depsString}`,
    pnpmCommand: `pnpm add ${depsString}`,
    docsUrl,
  };
}


/**
 * Registry of all optional-dependency components
 * Used to validate component registrations
 */
export const OPTIONAL_DEP_COMPONENTS = {
  Chart: {
    depName: "recharts",
    docsUrl: "https://docs.orion-ds.dev/components/chart",
  },
  Calendar: {
    depName: "date-fns",
    docsUrl: "https://docs.orion-ds.dev/components/calendar",
  },
  DatePicker: {
    depName: "date-fns",
    docsUrl: "https://docs.orion-ds.dev/components/date-picker",
  },
  CodeEditor: {
    depName: "react-syntax-highlighter",
    docsUrl: "https://docs.orion-ds.dev/components/code-editor",
  },
  Chat: {
    depName: ["react-markdown", "remark-gfm"],
    docsUrl: "https://docs.orion-ds.dev/components/chat",
  },
  CollapsibleFolder: {
    depName: ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
    docsUrl: "https://docs.orion-ds.dev/components/collapsible-folder",
  },
} as const;

/**
 * Type-safe way to get optional dependency info
 * @param componentName - One of the optional-dependency component names
 * @returns Error info if dependency is missing, undefined if available
 */
export function checkComponent(
  componentName: keyof typeof OPTIONAL_DEP_COMPONENTS
): OptionalDepError | undefined {
  const config = OPTIONAL_DEP_COMPONENTS[componentName];
  // Cast readonly array to mutable array for getOptionalDepError
  const depName: string | string[] = Array.isArray(config.depName)
    ? [...(config.depName as readonly string[])]
    : (config.depName as string);
  const error = getOptionalDepError(componentName, depName, config.docsUrl);

  return error.available ? undefined : error;
}
