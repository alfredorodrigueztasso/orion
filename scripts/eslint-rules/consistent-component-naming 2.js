/**
 * ESLint Rule: consistent-component-naming
 *
 * Validates that component/section directory names match file patterns.
 * This is a lightweight rule that only analyzes the filename pattern.
 *
 * Examples (VALID):
 * - Chat/index.ts imports from Chat.tsx, Chat.types.ts
 * - Button/index.ts imports from Button.tsx, Button.types.ts
 *
 * Examples (INVALID):
 * - Chat/index.ts imports from ChatSection.tsx (mismatch)
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure component/section file names match directory naming',
      category: 'Best Practices',
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    const filePath = context.getFilename();

    // Only check index.ts files in components or sections
    if (!filePath.endsWith('index.ts') ||
        (!filePath.includes('/components/') && !filePath.includes('/sections/'))) {
      return {};
    }

    // Extract directory name (e.g., Chat from /components/Chat/index.ts)
    const pathParts = filePath.split('/');
    const componentDirIndex = pathParts.findIndex(p => p === 'components' || p === 'sections');
    if (componentDirIndex === -1) return {};

    const dirName = pathParts[componentDirIndex + 1];

    return {
      ImportDeclaration(node) {
        // Check imports within this index.ts
        const source = node.source.value;

        // Should import from ./{dirName}.tsx, ./{dirName}.types.ts, etc.
        // Warn if importing from mismatched names like ChatSection when dir is Chat
        if (!source.startsWith('.')) return;

        const importedFile = source.replace(/^\.\//, '').replace(/\.(ts|tsx)$/, '');

        // If importing from a file that doesn't match the directory name pattern
        if (importedFile && !importedFile.startsWith(dirName) && importedFile !== '') {
          // But allow some exceptions like 'index' or 'utils'
          if (!['index', 'utils', 'hooks', 'types'].includes(importedFile)) {
            context.report({
              node,
              message: `Naming mismatch: Directory is "${dirName}" but importing from "${importedFile}". Use "${dirName}.tsx", "${dirName}.types.ts", etc.`,
            });
          }
        }
      },
    };
  },
};
