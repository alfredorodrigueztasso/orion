/**
 * Shared type definitions for @orion-ds/cli
 */

export interface OrionConfig {
  $schema?: string;
  registryUrl: string;
  componentDir: string;
  sectionDir: string;
  templateDir: string;
  typescript: boolean;
  brand: string;
  mode: string;
}

export interface RegistryIndexItem {
  name: string;
  type: "registry:component" | "registry:section" | "registry:template";
  title: string;
  description: string;
  category: string;
  registryUrl: string;
}

export interface RegistryIndex {
  $schema?: string;
  name: string;
  homepage?: string;
  items: RegistryIndexItem[];
}

export interface RegistryFile {
  path: string;
  type: string;
  content: string;
}

export interface RegistryItem {
  $schema?: string;
  name: string;
  type: string;
  title: string;
  description: string;
  category: string;
  files: RegistryFile[];
  props?: Array<{
    name: string;
    type: string;
    description?: string;
    default?: unknown;
    values?: string[];
  }>;
  tokens?: string[];
  examples?: Array<{ title: string; code: string }>;
  accessibility?: Record<string, unknown>;
  modeAware?: boolean;
  import?: string;
  cssImport?: string;
  dependencies?: string[];
  registryDependencies?: string[];
}

export interface ResolvedComponent {
  item: RegistryItem;
  files: Array<{
    targetPath: string;
    content: string;
  }>;
}

export type ItemType = "component" | "section" | "template";
