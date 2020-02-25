module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    test: true,
    cypress: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier',
    'cypress',
    '@typescript-eslint'
  ],
  // add your custom rules here
  rules: {
    'dot-notation': 0,
    '@typescript-eslint/semi': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 2
  },
  env: {
    'cypress/globals': true
  }
}
