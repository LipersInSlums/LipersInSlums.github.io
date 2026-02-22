import { defineConfig } from 'eslint/config';
import _import from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      '**/package-lock.json',
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      '*.log',
      '.idea/**',
      '.vscode/**',
    ]
  },
  {
  files: ['**/*.ts', '**/*.tsx', '**/*.mjs'],
  
  languageOptions: {
    parser: tseslint.parser,
    globals: {
      ...globals.browser,
      ...globals.node
    },
  },
  plugins: {
    'react': react,
    'react-hooks': reactHooks,
    'import': _import,
    'jsx-a11y': jsxA11y,
    'prettier': prettier,
  },
  rules: {
    ...tseslint.configs.strictTypeChecked.rules,
    ...tseslint.configs.stylisticTypeChecked.rules,
    ..._import.configs.rules,
    ...jsxA11y.configs.rules,
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.jsx', '.tsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    '@next/next/no-img-element': 'off', // SSGなのでnext/imageに対応できないため
    'import/order': [
      'warn',
      {
        'groups': [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          // 'type',
        ],
        'pathGroups': [
          {
            'pattern': '{react,react-dom/**,react-router-dom,next,next/**,next-**}',
            'group': 'builtin',
            'position': 'before',
          },
          {
            'pattern': '{@/**,src/**}',
            'group': 'parent',
            'position': 'after',
          },
          {
            'pattern': '@**/**',
            'group': 'external',
            'position': 'after',
          },
        ],
        'pathGroupsExcludedImportTypes': [
          'builtin',
        ],
        'alphabetize': {
          'order': 'asc',
        },
        'newlines-between': 'never',
      },
    ],
  },
});