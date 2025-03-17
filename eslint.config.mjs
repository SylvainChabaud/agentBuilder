import prettierPlugin from 'eslint-plugin-prettier';
import styledComponentsA11yPlugin from 'eslint-plugin-styled-components-a11y';

export default [
  {
    ignores: ['node_modules', '.next', 'out'], // Ignorer ces dossiers
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'styled-components-a11y': styledComponentsA11yPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
