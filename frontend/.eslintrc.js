module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest',
    'prettier', // Must be last to override other configs
  ],
  plugins: [
    'prettier',
  ],
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // General JavaScript/TypeScript rules
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',

    // Code quality
    'complexity': ['warn', { max: 10 }],
    'max-depth': ['warn', { max: 4 }],
    'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
    'max-params': ['warn', { max: 4 }],
  },
  overrides: [
    {
      // Relax rules for test files
      files: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**/*'],
      rules: {
        'no-console': 'off',
        'max-lines-per-function': 'off',
      },
    },
    {
      // Relax rules for generated API code
      files: ['src/api/**/*'],
      rules: {
        'prettier/prettier': 'off',
        'max-lines': 'off',
        'complexity': 'off',
      },
    },
  ],
  ignorePatterns: [
    'build/',
    'node_modules/',
    'src/api/', // Ignore generated API code
    '*.config.js',
    'public/',
    'coverage/',
  ],
};
