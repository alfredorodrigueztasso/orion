/**
 * CLI Utilities — Shared helpers for commands
 */

import * as readline from "node:readline";
import * as logger from "./logger.js";
import type { RegistryIndexItem } from "../types.js";

/**
 * Prompt user for confirmation
 */
export function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${question} ${logger.dim("(y/N)")} `, (answer) => {
      rl.close();
      resolve(
        answer.trim().toLowerCase() === "y" ||
          answer.trim().toLowerCase() === "yes",
      );
    });
  });
}

/**
 * Levenshtein distance calculation for fuzzy matching
 * Returns edit distance between two strings
 */
function levenshteinDistance(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  const matrix: number[][] = Array(aLen + 1)
    .fill(null)
    .map(() => Array(bLen + 1).fill(0));

  for (let i = 0; i <= aLen; i++) {
    matrix[i]![0] = i;
  }
  for (let j = 0; j <= bLen; j++) {
    matrix[0]![j] = j;
  }

  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i]![j] = Math.min(
        matrix[i - 1]![j]! + 1, // deletion
        matrix[i]![j - 1]! + 1, // insertion
        matrix[i - 1]![j - 1]! + cost, // substitution
      );
    }
  }

  return matrix[aLen]![bLen]!;
}

/**
 * Fuzzy match a query against candidates
 * Returns top 3 matches with distance <= 2
 */
export function fuzzyMatch(query: string, candidates: string[]): string[] {
  const matches = candidates
    .map((candidate) => ({
      candidate,
      distance: levenshteinDistance(query.toLowerCase(), candidate.toLowerCase()),
    }))
    .filter((m) => m.distance <= 2)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3)
    .map((m) => m.candidate);

  return matches;
}

/**
 * Filter items by category
 */
export function filterByCategory(
  items: RegistryIndexItem[],
  category: string,
): RegistryIndexItem[] {
  return items.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase(),
  );
}

/**
 * Filter items by tag
 */
export function filterByTag(
  items: RegistryIndexItem[],
  tag: string,
): RegistryIndexItem[] {
  return items.filter(
    (item) => item.tags && item.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

/**
 * Filter items by type
 */
export function filterByType(
  items: RegistryIndexItem[],
  type: "component" | "section" | "template",
): RegistryIndexItem[] {
  const typeMap = {
    component: "registry:component",
    section: "registry:section",
    template: "registry:template",
  };
  return items.filter((item) => item.type === typeMap[type]);
}

/**
 * Get preview URL for an item
 * Infers from name if not provided: /library.html#{name}
 */
export function getPreviewUrl(item: RegistryIndexItem): string {
  if (item.preview?.url) {
    return item.preview.url;
  }
  return `https://orion-ds.dev/library.html#${item.name}`;
}
