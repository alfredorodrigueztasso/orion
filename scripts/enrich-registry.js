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

console.log('✅ Registry enrichment complete');
