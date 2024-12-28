import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import prettierPlugin from 'eslint-plugin-prettier'
import typescriptEslintParser from '@typescript-eslint/parser'

export default tseslint.config(
  { ignores: ['dist', 'build'] },
  {
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      eslintPluginPrettierRecommended,
    ],
    ignores: ['dist', 'build', 'node_modules'],
    files: ['**/*.{ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  }
)
