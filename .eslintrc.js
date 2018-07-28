module.exports = {
  env: {
    browser: true
  },
  extends: ['prettier', 'eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },
  plugins: ['node', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
