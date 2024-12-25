/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/*.js', '**/*.mts'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/lines-between-class-members': 'off',
    'import/prefer-default-export': 'off',
  },

  overrides: [
    // TypeORM generates classes for migrations that do not use `this`.
    {
      files: ['src/database/migrations/**/*.ts'],
      rules: {
        'class-methods-use-this': 'off',
      },
    },

    // for TypeORM relations
    {
      files: ['src/entities/**/*.ts'],
      rules: {
        'import/no-cycle': 'off',
      },
    },
  ],
};
