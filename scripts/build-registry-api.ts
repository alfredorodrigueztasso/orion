#!/usr/bin/env ts-node
/**
 * build-registry-api.ts
 *
 * Generates static JSON API from the registry/ directory.
 * Output goes to public/r/ — deployable on any static host.
 *
 * Endpoints generated:
 *   /r/index.json          — Master index (shadcn-compatible)
 *   /r/styles/index.json   — Available style presets
 *   /r/{name}.json         — Per-component endpoint
 *
 * Usage: npx ts-node scripts/build-registry-api.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const REGISTRY_DIR = path.join(ROOT, 'registry');
const OUTPUT_DIR = path.join(ROOT, 'public', 'r');

interface RegistryItem {
  [key: string]: unknown;
  name: string;
  type: string;
  title: string;
  description: string;
  category?: string;
  files?: Array<{ path: string; type: string }>;
}

// ============================================================================
// Build
// ============================================================================

function main() {
  console.log('🌐 Building HTTP Registry API...\n');

  // Ensure output directory
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(path.join(OUTPUT_DIR, 'styles'), { recursive: true });

  const allItems: RegistryItem[] = [];
  let count = 0;

  // Process each registry subdirectory
  for (const subdir of ['components', 'sections', 'templates']) {
    const srcDir = path.join(REGISTRY_DIR, subdir);
    if (!fs.existsSync(srcDir)) continue;

    const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const data: RegistryItem = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));

      // Read source files and include content (for full component distribution)
      const enrichedFiles: Array<{ path: string; type: string; content?: string }> = [];
      if (data.files) {
        for (const f of data.files) {
          const absolutePath = path.join(ROOT, f.path);
          let content: string | undefined;
          if (fs.existsSync(absolutePath)) {
            content = fs.readFileSync(absolutePath, 'utf-8');
          }
          enrichedFiles.push({
            path: f.path,
            type: f.type,
            ...(content ? { content } : {}),
          });
        }
      }

      // Build the shadcn-compatible registry item
      const apiItem: Record<string, unknown> = {
        $schema: 'https://orion-ds.dev/schema/registry-item.json',
        name: data.name,
        type: data.type,
        title: data.title,
        description: data.description,
        ...(data.category ? { category: data.category } : {}),
        files: enrichedFiles,
      };

      // Copy all other fields
      for (const [key, value] of Object.entries(data)) {
        if (!['$schema', 'name', 'type', 'title', 'description', 'category', 'files'].includes(key)) {
          apiItem[key] = value;
        }
      }

      // Write per-component endpoint
      const outPath = path.join(OUTPUT_DIR, `${data.name}.json`);
      fs.writeFileSync(outPath, JSON.stringify(apiItem, null, 2) + '\n');
      count++;

      allItems.push(data);
    }
  }

  console.log(`  ✅ ${count} component endpoints generated`);

  // Read the master index
  const indexPath = path.join(REGISTRY_DIR, 'index.json');
  const registryIndex = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  // Generate the HTTP API index (shadcn-compatible format)
  const apiIndex = {
    $schema: 'https://orion-ds.dev/schema/registry.json',
    name: '@orion-ds/registry',
    homepage: 'https://orion-ds.dev',
    items: registryIndex.components.map((c: RegistryItem) => ({
      name: c.name,
      type: c.type,
      title: c.title,
      description: c.description,
      category: c.category,
      registryUrl: `https://orion-ds.dev/r/${c.name}.json`,
    })),
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(apiIndex, null, 2) + '\n'
  );
  console.log(`  ✅ Index endpoint → public/r/index.json`);

  // Generate styles index (tri-modal presets)
  const stylesIndex = {
    $schema: 'https://orion-ds.dev/schema/styles.json',
    styles: [
      {
        name: 'display',
        label: 'Display Mode',
        description: 'Atmospheric & narrative — for marketing pages, landing pages, hero sections. Features glassmorphism, generous shadows, dramatic hover lifts.',
        cssVars: {
          '--mode-shadow-hover': 'var(--shadow-lg)',
          '--mode-hover-lift': '-4px',
          '--mode-hover-duration': '250ms',
        },
      },
      {
        name: 'product',
        label: 'Product Mode',
        description: 'Geometric precision — for SaaS dashboards, admin panels, data-heavy interfaces. No glassmorphism, minimal shadows, no hover lifts.',
        cssVars: {
          '--mode-shadow-hover': 'var(--shadow-sm)',
          '--mode-hover-lift': '0px',
          '--mode-hover-duration': '150ms',
        },
      },
      {
        name: 'app',
        label: 'App Mode',
        description: 'Tactile elevation — for mobile apps, touch interfaces, native feel. Subtle hover lifts, native shadows, borderless cards.',
        cssVars: {
          '--mode-shadow-hover': 'var(--shadow-lg)',
          '--mode-hover-lift': '-2px',
          '--mode-hover-duration': '200ms',
        },
      },
    ],
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'styles', 'index.json'),
    JSON.stringify(stylesIndex, null, 2) + '\n'
  );
  console.log(`  ✅ Styles endpoint → public/r/styles/index.json`);

  console.log(`\n✅ HTTP Registry API complete!`);
  console.log(`   Total endpoints: ${count + 2}`);
  console.log(`   Deploy public/r/ to any static host`);
}

main();
