const nextPlugin = require('eslint-config-next');
const unusedImports = require('eslint-plugin-unused-imports');
const { FlatCompat } = require('@eslint/eslintrc');
const { defineConfig } = require('eslint/config');

const compat = new FlatCompat({});

module.exports = defineConfig([
  {
    extends: [...compat.extends('next/core-web-vitals'), ...compat.extends('next/typescript')],
    plugins: {
      next: nextPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],
      'unused-imports/no-unused-imports': 'error',
      'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: false }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
