module.exports = {
  parser: 'typescript-eslint-parser',
  extends: [
    'standard',
    'prettier',
    'prettier/standard',
  ],
  plugins: [
    'prettier',
    'standard',
    'typescript',
  ],
  env: {
    'es6': true,
    'node': true,
  },
  rules: {
    'prettier/prettier': [
      2, {
        'printWidth': 100,
		    'useTabs': true,
        'singleQuote': true,
        'trailingComma': 'all',
      },
    ],
    'no-new': [0],
    'no-undef': [0],
    'no-unused-vars': [0],
    'no-unused-expressions': [0],
    'no-fallthrough': [0],
  },
};