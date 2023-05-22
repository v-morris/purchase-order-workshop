module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'no-tabs': 0,
    'react/jsx-props-no-spreading': 0,
    'no-unused-vars': 1,
    'import/no-extraneous-dependencies': 1,
  },
};
