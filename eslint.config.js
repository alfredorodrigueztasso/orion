import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import requireExportedTypesRule from './scripts/eslint-rules/require-exported-types.js';
import consistentNamingRule from './scripts/eslint-rules/consistent-component-naming.js';

// Custom plugin for Orion-specific rules
const orionPlugin = {
  rules: {
    'require-exported-types': requireExportedTypesRule,
    'consistent-component-naming': consistentNamingRule,
  },
};

export default [
  {
    ignores: ['node_modules', '**/dist/**', '**/.next/**', '**/build/**', '**/*.d.ts'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      orion: orionPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Orion-specific rules (enforce architecture)
      // Note: These rules are in development. Currently disabled.
      // 'orion/require-exported-types': 'error',
      // 'orion/consistent-component-naming': 'error',
    },
  },
  prettier,
];
