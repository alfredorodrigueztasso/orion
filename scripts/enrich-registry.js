#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const METADATA_FILE = path.join(__dirname, '../tokens/registry-metadata.json');
const REGISTRY_DIR = path.join(__dirname, '../registry');

// Load metadata
const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));

// Enrich components
const componentDir = path.join(REGISTRY_DIR, 'components');
if (fs.existsSync(componentDir)) {
  fs.readdirSync(componentDir).forEach(file => {
    if (!file.endsWith('.json')) return;
    const filePath = path.join(componentDir, file);
    const name = file.replace('.json', '');
    
    if (metadata.components && metadata.components[name]) {
      const item = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const meta = metadata.components[name];
      item.tags = meta.tags || [];
      item.related_components = meta.related_components || [];
      item.common_patterns = meta.common_patterns || [];
      fs.writeFileSync(filePath, JSON.stringify(item, null, 2) + '\n');
    }
  });
  console.log('✅ Components enriched with tags and metadata');
}

// Enrich sections
const sectionDir = path.join(REGISTRY_DIR, 'sections');
if (fs.existsSync(sectionDir)) {
  fs.readdirSync(sectionDir).forEach(file => {
    if (!file.endsWith('.json')) return;
    const filePath = path.join(sectionDir, file);
    const name = file.replace('.json', '');
    
    if (metadata.sections && metadata.sections[name]) {
      const item = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const meta = metadata.sections[name];
      item.tags = meta.tags || [];
      item.related_sections = meta.related_sections || [];
      item.common_patterns = meta.common_patterns || [];
      fs.writeFileSync(filePath, JSON.stringify(item, null, 2) + '\n');
    }
  });
  console.log('✅ Sections enriched with tags and metadata');
}

// Generate API manifest for drift detection (PRE-002)
const generateApiManifest = () => {
  try {
    const registryLinkPath = path.join(__dirname, '../docs-site/registry-link.json');
    const manifestDir = path.join(__dirname, '../registry/artifacts');
    const manifestPath = path.join(manifestDir, 'api-manifest.json');

    if (!fs.existsSync(registryLinkPath)) {
      console.log('⚠️  docs-site/registry-link.json not found — skipping API manifest');
      return;
    }

    const registryLink = JSON.parse(fs.readFileSync(registryLinkPath, 'utf-8'));
    const manifest = {};
    let processedCount = 0;

    // Extract props from each component
    for (const [componentName, _exportName] of Object.entries(registryLink)) {
      const componentFile = `${componentName.toLowerCase()}.json`;
      const componentPath = path.join(REGISTRY_DIR, 'components', componentFile);

      if (!fs.existsSync(componentPath)) {
        console.log(
          `  ⚠️  registry/components/${componentFile} not found (in registry-link.json)`
        );
        continue;
      }

      try {
        const componentData = JSON.parse(fs.readFileSync(componentPath, 'utf-8'));
        if (componentData.props && Array.isArray(componentData.props)) {
          manifest[componentName] = componentData.props
            .map(prop => prop.name)
            .filter(name => typeof name === 'string');
        } else {
          manifest[componentName] = [];
        }
        processedCount++;
      } catch (err) {
        console.log(
          `  ⚠️  Failed to parse ${componentFile}: ${err.message || String(err)}`
        );
      }
    }

    // Create artifacts directory and write manifest
    if (!fs.existsSync(manifestDir)) {
      fs.mkdirSync(manifestDir, { recursive: true });
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    console.log(
      `✅ API manifest → registry/artifacts/api-manifest.json (${processedCount}/${Object.keys(registryLink).length} components)`
    );
  } catch (err) {
    console.error('❌ API manifest generation failed:', err.message || String(err));
  }
};

generateApiManifest();

console.log('✅ Registry enrichment complete');
