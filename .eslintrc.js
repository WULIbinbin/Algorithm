module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  plugins: ['eslint-plugin-prettier'],
  // parser: '@typescript-eslint/parser',
  env: {
    jest: true,
  },
  rules: {
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-console': 'off',
    'no-new': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'import/no-cycle': 'off', // TODO: remove
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // 统一eslint prettier配置
    'prettier/prettier': [
      'warn',
      {},
      {
        usePrettierrc: true,
      },
    ],
  },
};
