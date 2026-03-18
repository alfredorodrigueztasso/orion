import path from 'path';
import fs from 'fs';

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  category: string;
  type: 'registry:component' | 'registry:section' | 'registry:template';
  props?: Array<{
    name: string;
    type: string;
    description: string;
    default?: string;
    required?: boolean;
    values?: string[];
  }>;
  examples?: Array<{
    title: string;
    code: string;
  }>;
  import?: string;
  cssImport?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  modeAware?: boolean;
  preview?: {
    url?: string;
    local?: string;
  };
  files?: Array<{
    path: string;
    type: string;
  }>;
  accessibility?: {
    role?: string;
    ariaAttributes?: string[];
    keyboardNav?: Array<{ key: string; action: string }>;
    notes?: string[];
  };
  tokens?: string[];
}

/**
 * Load all registry items from per-component JSON files
 * This is called once at module load time (server-side)
 */
function loadAllItems(): RegistryItem[] {
  const REGISTRY_BASE = path.join(process.cwd(), '..', 'registry');
  const allItems: RegistryItem[] = [];

  const types = [
    { dir: 'components', type: 'registry:component' as const },
    { dir: 'sections', type: 'registry:section' as const },
    { dir: 'templates', type: 'registry:template' as const },
  ];

  for (const { dir } of types) {
    const dirPath = path.join(REGISTRY_BASE, dir);
    try {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
      for (const file of files) {
        try {
          const filePath = path.join(dirPath, file);
          const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as RegistryItem;
          allItems.push(data);
        } catch (error) {
          console.warn(`Failed to load registry item from ${dir}/${file}:`, error);
        }
      }
    } catch (error) {
      console.warn(`Failed to read registry directory ${dir}:`, error);
    }
  }

  return allItems;
}

// Load all items once at module initialization
const allItems: RegistryItem[] = loadAllItems();

/**
 * Get all components from the registry
 */
export async function getAllComponents(): Promise<RegistryItem[]> {
  return allItems.filter(item => item.type === 'registry:component');
}

/**
 * Get all sections from the registry
 */
export async function getAllSections(): Promise<RegistryItem[]> {
  return allItems.filter(item => item.type === 'registry:section');
}

/**
 * Get all templates from the registry
 */
export async function getAllTemplates(): Promise<RegistryItem[]> {
  return allItems.filter(item => item.type === 'registry:template');
}

/**
 * Get all items from the registry
 */
export async function getAllItems(): Promise<RegistryItem[]> {
  return allItems;
}

/**
 * Get a single item by name
 */
export async function getItemByName(name: string): Promise<RegistryItem | undefined> {
  return allItems.find(item => item.name === name);
}

/**
 * Get items by category
 */
export async function getItemsByCategory(category: string): Promise<RegistryItem[]> {
  return allItems.filter(item => item.category === category);
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  return [...new Set(allItems.map(item => item.category))];
}

/**
 * Get categories for a specific type
 */
export function getCategoriesByType(type: RegistryItem['type']): string[] {
  const items = allItems.filter(item => item.type === type);
  return [...new Set(items.map(item => item.category))];
}

/**
 * Search items by query (searches name, title, description)
 */
export async function searchItems(query: string): Promise<RegistryItem[]> {
  const lowercaseQuery = query.toLowerCase();
  return allItems.filter(item =>
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Get registry metadata
 */
export function getRegistryMetadata() {
  return {
    name: '@orion-ds/registry',
    version: '1.0.0',
    description: 'Machine-readable registry for Orion Design System',
    homepage: 'https://orion-ds.dev',
    totalItems: allItems.length,
    componentCount: allItems.filter(i => i.type === 'registry:component').length,
    sectionCount: allItems.filter(i => i.type === 'registry:section').length,
    templateCount: allItems.filter(i => i.type === 'registry:template').length,
  };
}
