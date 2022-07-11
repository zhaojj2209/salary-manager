module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'no-console': ['warn', {
      'allow': ['warn', 'error'],
    }],
    'no-unused-vars': ['warn'],
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'object-curly-spacing': ['warn', 'always'],
    'comma-spacing': ['warn', {
      'before': false,
      'after': true,
    }],
    'comma-dangle': ['warn', 'always-multiline'],
  },
};
