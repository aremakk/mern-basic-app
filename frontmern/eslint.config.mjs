import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import babelParser from '@babel/eslint-parser'; // ⬅️ добавим парсер
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          plugins: ['@babel/plugin-syntax-jsx'],
        },
      },
    },
    plugins: {
      js,
      react: pluginReact,
      prettier: pluginPrettier,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'prettier/prettier': 'warn',
    },
  },
  {
    rules: {
      ...prettierConfig.rules,
      'react/prop-types': 'off',
    },
  },
]);
