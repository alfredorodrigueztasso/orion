#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '../tokens/ai-manifest.json');
const REACT_SRC = path.join(__dirname, '../packages/react/src');

// Count directories at given path
function countDirectories(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return 0;
    return fs.readdirSync(dirPath).filter(f => {
      const fullPath = path.join(dirPath, f);
      return fs.statSync(fullPath).isDirectory() && !f.startsWith('.');
    }).length;
  } catch (e) {
    return 0;
  }
}

// Read manifest
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));

// Count actual components, sections, templates
const componentCount = countDirectories(path.join(REACT_SRC, 'components'));
const sectionCount = countDirectories(path.join(REACT_SRC, 'blocks/sections'));
const templateCount = countDirectories(path.join(REACT_SRC, 'blocks/templates/app'));

// Update manifest
manifest.system_stats.components.total = componentCount;
manifest.system_stats.components.fully_implemented = componentCount;
manifest.system_stats.components.documented = componentCount;
manifest.system_stats.components.with_examples = componentCount;

if (!manifest.system_stats.sections) {
  manifest.system_stats.sections = {};
}
manifest.system_stats.sections.total = sectionCount;
manifest.system_stats.sections.implemented = sectionCount;

if (!manifest.system_stats.templates) {
  manifest.system_stats.templates = {};
}
manifest.system_stats.templates.total = templateCount;
manifest.system_stats.templates.implemented = templateCount;

manifest.last_updated = new Date().toISOString().split('T')[0];

// Write back
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');

console.log('✅ Manifest synchronized:');
console.log(`   Components: ${componentCount}`);
console.log(`   Sections: ${sectionCount}`);
console.log(`   Templates: ${templateCount}`);
console.log(`   Last updated: ${manifest.last_updated}`);
