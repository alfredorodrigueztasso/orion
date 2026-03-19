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
  tags?: string[];
  preview?: {
    url: string;
  };
}

export interface AddArgs {
  names: string[];
  type?: "component" | "section" | "template";
  category?: string;
  tag?: string;
  dryRun: boolean;
  yes: boolean;
  overwrite: boolean;
  local: boolean;
  noInstall: boolean;
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

export interface AccessibilityInfo {
  role?: string;
  ariaAttributes?: string[];
  keyboardNav?: Array<{ key: string; action: string }>;
  notes?: string[];
}

export interface InfoArgs {
  name: string;
  type?: "component" | "section" | "template";
  json: boolean;
  examples: boolean;
  props: boolean;
  local: boolean;
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
  accessibility?: AccessibilityInfo;
  modeAware?: boolean;
  import?: string;
  cssImport?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  tags?: string[];
  related_components?: string[];
  related_sections?: string[];
  common_patterns?: string[];
  preview?: { url: string; local?: string };
}

export interface ResolvedComponent {
  item: RegistryItem;
  files: Array<{
    targetPath: string;
    content: string;
  }>;
}

export type ItemType = "component" | "section" | "template";

export interface DoctorArgs {
  fix: boolean;
  json: boolean;
  verbose: boolean;
}

export interface DoctorCheck {
  name: string;
  status: "pass" | "fail" | "warn" | "skip";
  message: string;
  fix?: string;
}
