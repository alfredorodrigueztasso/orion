/**
 * AI-First Analysis Script for @orion/react
 * Evaluates how well the library can be understood and used by AI agents
 */

const fs = require('fs');
const path = require('path');

const analysis = {
  scores: {},
  details: {},
  totalScore: 0
};

// 1. TypeScript Coverage Analysis
function analyzeTypeScript() {
  const distPath = path.join(__dirname, 'dist');
  const dtsFiles = [];

  function findDtsFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        findDtsFiles(filePath);
      } else if (file.endsWith('.d.ts')) {
        dtsFiles.push(filePath);
      }
    });
  }

  if (fs.existsSync(distPath)) {
    findDtsFiles(distPath);
  }

  const hasMainDts = fs.existsSync(path.join(distPath, 'index.d.ts'));
  const score = hasMainDts ? 100 : 0;

  analysis.scores.typescript = score;
  analysis.details.typescript = {
    score,
    dtsFilesCount: dtsFiles.length,
    hasMainDeclaration: hasMainDts,
    status: score === 100 ? '✅ Excellent' : '❌ Missing'
  };
}

// 2. Documentation Analysis
function analyzeDocumentation() {
  let score = 0;
  const details = {};

  const readmePath = path.join(__dirname, 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    details.hasReadme = true;
    details.readmeLength = readme.length;

    details.hasInstallation = readme.includes('## Installation') || readme.includes('Installation');
    details.hasQuickStart = readme.includes('## Quick Start') || readme.includes('Quick Start');
    details.hasExamples = readme.includes('```tsx') || readme.includes('```ts');
    details.hasComponentList = readme.includes('## Components') || readme.includes('Components');

    score += details.hasReadme ? 25 : 0;
    score += details.hasInstallation ? 15 : 0;
    score += details.hasQuickStart ? 20 : 0;
    score += details.hasExamples ? 25 : 0;
    score += details.hasComponentList ? 15 : 0;
  }

  details.status = score >= 80 ? '✅ Excellent' : score >= 60 ? '⚠️ Good' : '❌ Needs Improvement';

  analysis.scores.documentation = score;
  analysis.details.documentation = details;
}

// 3. Package Metadata Analysis
function analyzePackageMetadata() {
  let score = 0;
  const packagePath = path.join(__dirname, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));

  const details = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    hasKeywords: Array.isArray(pkg.keywords) && pkg.keywords.length > 0,
    keywordsCount: pkg.keywords?.length || 0,
    hasRepository: !!pkg.repository,
    hasLicense: !!pkg.license,
    hasTypes: !!pkg.types,
    hasExports: !!pkg.exports,
  };

  score += details.description ? 15 : 0;
  score += details.hasKeywords ? 15 : 0;
  score += details.keywordsCount >= 8 ? 15 : details.keywordsCount >= 4 ? 10 : 5;
  score += details.hasRepository ? 15 : 0;
  score += details.hasLicense ? 10 : 0;
  score += details.hasTypes ? 15 : 0;
  score += details.hasExports ? 15 : 0;

  details.status = score >= 80 ? '✅ Excellent' : score >= 60 ? '⚠️ Good' : '❌ Needs Improvement';

  analysis.scores.metadata = score;
  analysis.details.metadata = details;
}

// 4. Component Structure Analysis
function analyzeComponentStructure() {
  let score = 0;
  const srcPath = path.join(__dirname, 'src/components');
  const components = [];

  if (fs.existsSync(srcPath)) {
    const dirs = fs.readdirSync(srcPath);
    dirs.forEach(dir => {
      const componentPath = path.join(srcPath, dir);
      const stat = fs.statSync(componentPath);
      if (stat.isDirectory()) {
        const files = fs.readdirSync(componentPath);
        const hasComponent = files.some(f => f.match(new RegExp(dir + '\\.tsx$')));
        const hasTypes = files.some(f => f.match(new RegExp(dir + '\\.types\\.ts$')));
        const hasStory = files.some(f => f.match(new RegExp(dir + '\\.stories\\.tsx$')));
        const hasTest = files.some(f => f.match(new RegExp(dir + '\\.test\\.tsx$')));
        const hasStyles = files.some(f => f.match(new RegExp(dir + '\\.module\\.css$')));

        components.push({
          name: dir,
          hasComponent,
          hasTypes,
          hasStory,
          hasTest,
          hasStyles,
          complete: hasComponent && hasTypes
        });
      }
    });
  }

  const totalComponents = components.length;
  const withTypes = components.filter(c => c.hasTypes).length;
  const withStories = components.filter(c => c.hasStory).length;
  const withTests = components.filter(c => c.hasTest).length;
  const withStyles = components.filter(c => c.hasStyles).length;

  if (totalComponents > 0) {
    score += (withTypes / totalComponents) * 30;
    score += (withStories / totalComponents) * 25;
    score += (withTests / totalComponents) * 25;
    score += (withStyles / totalComponents) * 20;
  }

  analysis.scores.structure = Math.round(score);
  analysis.details.structure = {
    score: Math.round(score),
    totalComponents,
    withTypes,
    withStories,
    withTests,
    withStyles,
    typesCoverage: totalComponents > 0 ? Math.round((withTypes / totalComponents) * 100) + '%' : '0%',
    storiesCoverage: totalComponents > 0 ? Math.round((withStories / totalComponents) * 100) + '%' : '0%',
    testsCoverage: totalComponents > 0 ? Math.round((withTests / totalComponents) * 100) + '%' : '0%',
    status: score >= 80 ? '✅ Excellent' : score >= 60 ? '⚠️ Good' : '❌ Needs Improvement'
  };
}

// 5. Export Analysis
function analyzeExports() {
  let score = 0;
  const indexPath = path.join(__dirname, 'dist/index.d.ts');

  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf-8');
    const lines = content.split('\n');
    const exportLines = lines.filter(line => line.trim().startsWith('export'));

    const componentExports = exportLines.filter(line => line.includes('} from')).length;
    const typeExports = exportLines.filter(line => line.includes('export type')).length;

    const details = {
      totalExports: exportLines.length,
      componentExports,
      typeExports,
      hasBarrelExport: true,
      exportsComponents: componentExports > 15,
      exportsTypes: typeExports > 15
    };

    score += details.hasBarrelExport ? 30 : 0;
    score += details.exportsComponents ? 35 : Math.min((componentExports / 15) * 35, 35);
    score += details.exportsTypes ? 35 : Math.min((typeExports / 15) * 35, 35);

    details.status = score >= 80 ? '✅ Excellent' : score >= 60 ? '⚠️ Good' : '❌ Needs Improvement';

    analysis.scores.exports = Math.round(score);
    analysis.details.exports = details;
  } else {
    analysis.scores.exports = 0;
    analysis.details.exports = { status: '❌ No index.d.ts found', totalExports: 0 };
  }
}

// 6. Examples Analysis
function analyzeExamples() {
  let score = 0;
  const details = {};

  const storiesPath = path.join(__dirname, 'src/components');
  let storiesCount = 0;

  if (fs.existsSync(storiesPath)) {
    function countStories(dir) {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          countStories(filePath);
        } else if (file.endsWith('.stories.tsx')) {
          storiesCount++;
        }
      });
    }
    countStories(storiesPath);
  }

  details.storiesCount = storiesCount;
  details.hasStorybook = fs.existsSync(path.join(__dirname, '.storybook'));
  details.hasExamplesFolder = fs.existsSync(path.join(__dirname, '../../examples'));

  score += details.hasStorybook ? 40 : 0;
  score += Math.min((storiesCount / 10) * 40, 40);
  score += details.hasExamplesFolder ? 20 : 0;

  details.status = score >= 80 ? '✅ Excellent' : score >= 60 ? '⚠️ Good' : '❌ Needs Improvement';

  analysis.scores.examples = Math.round(score);
  analysis.details.examples = details;
}

// Run all analyses
try {
  analyzeTypeScript();
  analyzeDocumentation();
  analyzePackageMetadata();
  analyzeComponentStructure();
  analyzeExports();
  analyzeExamples();

  // Calculate total score
  const weights = {
    typescript: 0.20,
    documentation: 0.15,
    metadata: 0.15,
    structure: 0.20,
    exports: 0.15,
    examples: 0.15
  };

  analysis.totalScore = Object.keys(weights).reduce((sum, key) => {
    return sum + (analysis.scores[key] * weights[key]);
  }, 0);

  analysis.totalScore = Math.round(analysis.totalScore);

  // Generate report
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║          AI-FIRST READINESS ANALYSIS - @orion/react           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log(`🎯 OVERALL AI-FIRST SCORE: ${analysis.totalScore}/100\n`);

  const gradeEmoji = analysis.totalScore >= 90 ? '🏆' :
                     analysis.totalScore >= 80 ? '🥇' :
                     analysis.totalScore >= 70 ? '🥈' :
                     analysis.totalScore >= 60 ? '🥉' : '⚠️';

  const grade = analysis.totalScore >= 90 ? 'EXCELLENT' :
                analysis.totalScore >= 80 ? 'VERY GOOD' :
                analysis.totalScore >= 70 ? 'GOOD' :
                analysis.totalScore >= 60 ? 'FAIR' : 'NEEDS IMPROVEMENT';

  console.log(`${gradeEmoji} Grade: ${grade}\n`);

  console.log('─────────────────────────────────────────────────────────────────\n');
  console.log('📊 DETAILED SCORES:\n');

  Object.keys(analysis.scores).forEach(category => {
    const score = analysis.scores[category];
    const name = category.charAt(0).toUpperCase() + category.slice(1);
    const status = analysis.details[category].status || '';
    const barLength = Math.floor(score / 5);
    const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
    console.log(`${name.padEnd(20)} ${bar} ${score}/100 ${status}`);
  });

  console.log('\n─────────────────────────────────────────────────────────────────\n');
  console.log('📋 DETAILED ANALYSIS:\n');

  // TypeScript
  console.log('1️⃣  TypeScript Coverage');
  console.log(`   - Declaration files: ${analysis.details.typescript.dtsFilesCount}`);
  console.log(`   - Main index.d.ts: ${analysis.details.typescript.hasMainDeclaration ? '✅' : '❌'}`);
  console.log(`   - Status: ${analysis.details.typescript.status}\n`);

  // Documentation
  console.log('2️⃣  Documentation');
  console.log(`   - README.md: ${analysis.details.documentation.hasReadme ? '✅' : '❌'}`);
  console.log(`   - Installation guide: ${analysis.details.documentation.hasInstallation ? '✅' : '❌'}`);
  console.log(`   - Quick start: ${analysis.details.documentation.hasQuickStart ? '✅' : '❌'}`);
  console.log(`   - Code examples: ${analysis.details.documentation.hasExamples ? '✅' : '❌'}`);
  console.log(`   - Component list: ${analysis.details.documentation.hasComponentList ? '✅' : '❌'}`);
  console.log(`   - README length: ${analysis.details.documentation.readmeLength || 0} chars`);
  console.log(`   - Status: ${analysis.details.documentation.status}\n`);

  // Metadata
  console.log('3️⃣  Package Metadata');
  console.log(`   - Name: ${analysis.details.metadata.name}`);
  console.log(`   - Description: ${analysis.details.metadata.description ? '✅' : '❌'}`);
  console.log(`   - Keywords: ${analysis.details.metadata.keywordsCount} keywords`);
  console.log(`   - Repository: ${analysis.details.metadata.hasRepository ? '✅' : '❌'}`);
  console.log(`   - License: ${analysis.details.metadata.hasLicense ? '✅' : '❌'}`);
  console.log(`   - TypeScript types: ${analysis.details.metadata.hasTypes ? '✅' : '❌'}`);
  console.log(`   - Package exports: ${analysis.details.metadata.hasExports ? '✅' : '❌'}`);
  console.log(`   - Status: ${analysis.details.metadata.status}\n`);

  // Structure
  console.log('4️⃣  Component Structure');
  console.log(`   - Total components: ${analysis.details.structure.totalComponents}`);
  console.log(`   - With .types.ts: ${analysis.details.structure.withTypes} (${analysis.details.structure.typesCoverage})`);
  console.log(`   - With .stories.tsx: ${analysis.details.structure.withStories} (${analysis.details.structure.storiesCoverage})`);
  console.log(`   - With .test.tsx: ${analysis.details.structure.withTests} (${analysis.details.structure.testsCoverage})`);
  console.log(`   - With .module.css: ${analysis.details.structure.withStyles}`);
  console.log(`   - Status: ${analysis.details.structure.status}\n`);

  // Exports
  console.log('5️⃣  Export Structure');
  console.log(`   - Total exports: ${analysis.details.exports.totalExports || 0}`);
  console.log(`   - Component exports: ${analysis.details.exports.componentExports || 0}`);
  console.log(`   - Type exports: ${analysis.details.exports.typeExports || 0}`);
  console.log(`   - Barrel export: ${analysis.details.exports.hasBarrelExport ? '✅' : '❌'}`);
  console.log(`   - Status: ${analysis.details.exports.status}\n`);

  // Examples
  console.log('6️⃣  Examples & Documentation');
  console.log(`   - Storybook stories: ${analysis.details.examples.storiesCount}`);
  console.log(`   - Storybook config: ${analysis.details.examples.hasStorybook ? '✅' : '❌'}`);
  console.log(`   - Examples folder: ${analysis.details.examples.hasExamplesFolder ? '✅' : '❌'}`);
  console.log(`   - Status: ${analysis.details.examples.status}\n`);

  console.log('─────────────────────────────────────────────────────────────────\n');
  console.log('💡 AI-FIRST STRENGTHS:\n');

  const strengths = [];
  if (analysis.scores.typescript >= 90) strengths.push('✅ Excellent TypeScript coverage');
  if (analysis.scores.documentation >= 80) strengths.push('✅ Comprehensive documentation');
  if (analysis.scores.metadata >= 80) strengths.push('✅ Rich package metadata');
  if (analysis.scores.structure >= 80) strengths.push('✅ Consistent component structure');
  if (analysis.scores.exports >= 80) strengths.push('✅ Well-organized exports');
  if (analysis.scores.examples >= 80) strengths.push('✅ Extensive examples');

  if (strengths.length > 0) {
    strengths.forEach(s => console.log(`   ${s}`));
  } else {
    console.log('   ⚠️  Several areas need improvement');
  }

  console.log('\n📈 IMPROVEMENT OPPORTUNITIES:\n');

  const improvements = [];
  if (analysis.scores.typescript < 90) improvements.push('⚠️  Add more TypeScript declarations');
  if (analysis.scores.documentation < 80) improvements.push('⚠️  Enhance documentation');
  if (analysis.scores.metadata < 80) improvements.push('⚠️  Improve package metadata');
  if (analysis.scores.structure < 80) improvements.push('⚠️  Increase test coverage');
  if (analysis.scores.exports < 80) improvements.push('⚠️  Add more type exports');
  if (analysis.scores.examples < 80) improvements.push('⚠️  Create more examples');

  if (improvements.length === 0) {
    console.log('   🎉 No major improvements needed!\n');
  } else {
    improvements.forEach(i => console.log(`   ${i}`));
  }

  console.log('\n─────────────────────────────────────────────────────────────────\n');
  console.log('🤖 AI AGENT COMPATIBILITY:\n');

  const compatibility = {
    'Code completion': analysis.scores.typescript >= 80 ? '✅ Excellent' : '⚠️ Limited',
    'Auto-documentation': analysis.scores.documentation >= 70 ? '✅ Good' : '⚠️ Limited',
    'Pattern recognition': analysis.scores.structure >= 70 ? '✅ Good' : '⚠️ Limited',
    'Example generation': analysis.scores.examples >= 60 ? '✅ Good' : '⚠️ Limited',
    'Type inference': analysis.scores.typescript >= 90 ? '✅ Excellent' : '⚠️ Limited',
  };

  Object.entries(compatibility).forEach(([feature, status]) => {
    console.log(`   ${feature.padEnd(25)} ${status}`);
  });

  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║                    ANALYSIS COMPLETE                           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  // Save JSON report
  fs.writeFileSync(
    path.join(__dirname, 'ai-first-report.json'),
    JSON.stringify(analysis, null, 2)
  );

  console.log('📄 Detailed JSON report saved to: ai-first-report.json\n');

} catch (error) {
  console.error('Error during analysis:', error.message);
  process.exit(1);
}
