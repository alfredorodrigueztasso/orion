#!/usr/bin/env node

/**
 * Validate registry metadata integrity
 *
 * Ensures:
 * - tokens/registry-metadata.json exists and is valid JSON
 * - Each component has tags, related_components, common_patterns
 * - Each section has tags, related_sections, common_patterns
 * - Metadata counts match actual registry files
 */

const fs = require('fs');
const path = require('path');

const METADATA_FILE = path.join(__dirname, '..', 'tokens', 'registry-metadata.json');
const COMPONENTS_DIR = path.join(__dirname, '..', 'registry', 'components');
const SECTIONS_DIR = path.join(__dirname, '..', 'registry', 'sections');

function log(msg) {
  console.log(msg);
}

function logError(msg) {
  console.error('❌', msg);
}

function logSuccess(msg) {
  console.log('✅', msg);
}

function getFilesInDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));
}

function validateMetadata(type, metadata, actualItems) {
  const errors = [];

  // Check each actual item has metadata
  actualItems.forEach(item => {
    if (!metadata[item]) {
      errors.push(`Missing metadata for ${type}: ${item}`);
    } else {
      const entry = metadata[item];

      // Validate required fields
      if (!Array.isArray(entry.tags) || entry.tags.length === 0) {
        errors.push(`${type} "${item}": tags must be non-empty array`);
      }

      if (!Array.isArray(entry.common_patterns) || entry.common_patterns.length === 0) {
        errors.push(`${type} "${item}": common_patterns must be non-empty array`);
      }

      // Validate related field (differs by type)
      const relatedField = type === 'component' ? 'related_components' : 'related_sections';
      if (!Array.isArray(entry[relatedField])) {
        errors.push(`${type} "${item}": ${relatedField} must be an array`);
      }
    }
  });

  return errors;
}

function main() {
  log('🔍 Validating registry metadata...\n');

  // Load metadata
  let metadata;
  try {
    const content = fs.readFileSync(METADATA_FILE, 'utf-8');
    metadata = JSON.parse(content);
  } catch (e) {
    logError(`Could not load ${METADATA_FILE}: ${e.message}`);
    process.exit(1);
  }

  if (!metadata.components || !metadata.sections) {
    logError('Metadata must have "components" and "sections" keys');
    process.exit(1);
  }

  // Get actual items in registry
  const componentFiles = getFilesInDir(COMPONENTS_DIR);
  const sectionFiles = getFilesInDir(SECTIONS_DIR);

  log(`📦 Registry inventory:`);
  log(`   Components in registry/: ${componentFiles.length}`);
  log(`   Sections in registry/: ${sectionFiles.length}`);
  log(`   Metadata entries - components: ${Object.keys(metadata.components).length}`);
  log(`   Metadata entries - sections: ${Object.keys(metadata.sections).length}\n`);

  let errors = [];

  // Validate components
  log('🔎 Validating component metadata...');
  const componentErrors = validateMetadata('component', metadata.components, componentFiles);
  errors = errors.concat(componentErrors);

  // Validate sections
  log('🔎 Validating section metadata...');
  const sectionErrors = validateMetadata('section', metadata.sections, sectionFiles);
  errors = errors.concat(sectionErrors);

  // Report results
  if (errors.length === 0) {
    logSuccess(`All metadata valid!`);
    log(`   ${componentFiles.length} components + ${sectionFiles.length} sections = ${componentFiles.length + sectionFiles.length} items`);
    process.exit(0);
  } else {
    log(`\n📋 Errors found (${errors.length}):`);
    errors.forEach(e => logError(`  ${e}`));
    process.exit(1);
  }
}

main();
