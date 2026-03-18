/**
 * Resolver — BFS recursive dependency resolution for registryDependencies
 */

import type { RegistryItem } from "../types.js";

interface FetchFn {
  (name: string): Promise<RegistryItem>;
}

export interface ResolveResult {
  items: RegistryItem[];
  extraDeps: string[];
}

/**
 * Resolve all registry dependencies (BFS) for a set of requested component names.
 * Returns deduplicated list of RegistryItems in dependency order.
 */
export async function resolveAll(
  names: string[],
  fetchItem: FetchFn,
): Promise<ResolveResult> {
  const resolved = new Map<string, RegistryItem>();
  const queue = [...names];
  const extraDeps: string[] = [];

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (resolved.has(name)) continue;

    const item = await fetchItem(name);
    resolved.set(name, item);

    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        if (!resolved.has(dep) && !queue.includes(dep)) {
          if (!names.includes(dep)) {
            extraDeps.push(dep);
          }
          queue.push(dep);
        }
      }
    }
  }

  return {
    items: Array.from(resolved.values()),
    extraDeps,
  };
}
