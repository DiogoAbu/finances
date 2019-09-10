// @ts-check

module.exports = {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['import', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
      },
    ],

    '@typescript-eslint/no-explicit-any': 0,

    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error'],

    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['error'],

    'prettier/prettier': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
