/**
 * Optional Dependency Error Handling (ESM-Safe v5.3.1+)
 *
 * Provides helpful error messages when users try to use components
 * that require optional peer dependencies (recharts, date-fns, etc.)
 * without having them installed.
 *
 * Uses async import() instead of require() for ESM spec compliance.
 * Results are cached for performance (cache hit = O(1) lookup).
 *
 * @see V5_3_0_ESM_REQUIRE_BUG_ANALYSIS.md for RCA of v5.3.0 regression
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
 * Cache for dependency availability checks
 * Populated on first access via isDepAvailable()
 */
const depCache = new Map<string, boolean>();

/**
 * Track in-progress dependency checks to prevent duplicate concurrent checks
 */
const depCheckInProgress = new Map<string, Promise<boolean>>();

/**
 * Check if an optional dependency is available (ESM-safe, async)
 *
 * Uses import() instead of require() for ESM spec compliance.
 * Results are cached for performance after first check.
 *
 * @param depName - NPM package name or array of package names to check
 * @returns Promise<boolean> - True if all dependencies are available
 *
 * @example
 * // First call: async
 * const available = await isDepAvailable('recharts');
 *
 * // Subsequent calls: sync cache hit (but returns Promise for consistency)
 * const cached = await isDepAvailable('recharts');
 */
async function isDepAvailable(depName: string | string[]): Promise<boolean> {
  const deps = Array.isArray(depName) ? depName : [depName];

  const results = await Promise.all(
    deps.map(async (dep) => {
      // Cache hit - return immediately
      if (depCache.has(dep)) {
        return depCache.get(dep) ?? false;
      }

      // Prevent concurrent checks for same dependency
      if (depCheckInProgress.has(dep)) {
        return depCheckInProgress.get(dep)!;
      }

      // Async import check
      const checkPromise = (async () => {
        try {
          await import(dep);
          depCache.set(dep, true);
          return true;
        } catch {
          depCache.set(dep, false);
          return false;
        }
      })();

      depCheckInProgress.set(dep, checkPromise);
      const result = await checkPromise;
      depCheckInProgress.delete(dep);
      return result;
    }),
  );

  return results.every(Boolean);
}

/**
 * Sync fallback check (for cache hits only)
 *
 * Used by checkComponent() for optimistic response:
 * - If cached as available: return true (skip async check)
 * - If cached as missing: return false
 * - If not yet cached: return true (will validate async later)
 *
 * @param depName - NPM package name or array of package names to check
 * @returns boolean - True if available or not yet checked (optimistic)
 */
function isDepAvailableSync(depName: string | string[]): boolean {
  const deps = Array.isArray(depName) ? depName : [depName];
  return deps.every((dep) => {
    // If we've checked before, use cached value
    if (depCache.has(dep)) {
      return depCache.get(dep) ?? false;
    }
    // Assume available if not yet checked (will validate async)
    return true;
  });
}

/**
 * Get error information for a missing optional dependency (async)
 *
 * @param componentName - Name of the Orion component
 * @param depName - NPM package name or array of package names
 * @param docsUrl - URL to component documentation
 * @returns Promise<OptionalDepError> with installation instructions
 */
export async function getOptionalDepError(
  componentName: string,
  depName: string | string[],
  docsUrl: string,
): Promise<OptionalDepError> {
  const deps = Array.isArray(depName) ? depName : [depName];
  const depsString = deps.join(" ");
  const available = await isDepAvailable(depName);

  return {
    available,
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
 *
 * Returns synchronously if result is cached (dependency already checked).
 * Returns Promise if result needs async validation.
 *
 * @param componentName - One of the optional-dependency component names
 * @returns Error info if dependency is missing, undefined if available,
 *          or Promise for async validation
 *
 * @example
 * // Sync usage (cache hit or assumed available)
 * const error = checkComponent('Calendar');
 * if (error instanceof Promise) {
 *   const resolvedError = await error;
 * }
 */
export function checkComponent(
  componentName: keyof typeof OPTIONAL_DEP_COMPONENTS,
): OptionalDepError | Promise<OptionalDepError | undefined> | undefined {
  const config = OPTIONAL_DEP_COMPONENTS[componentName];
  // Cast readonly array to mutable array for getOptionalDepError
  const depName: string | string[] = Array.isArray(config.depName)
    ? [...(config.depName as readonly string[])]
    : (config.depName as string);

  // Optimistic sync check: if available from cache, no error
  const syncAvailable = isDepAvailableSync(depName);
  if (syncAvailable) {
    return undefined;
  }

  // Cache miss: return async promise for validation
  return getOptionalDepError(componentName, depName, config.docsUrl).then(
    (error) => (error.available ? undefined : error),
  );
}
