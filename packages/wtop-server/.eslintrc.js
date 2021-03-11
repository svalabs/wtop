module.exports = {
  //root: true,

  //parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "no-console": 0,
    "class-methods-use-this": "off",
  },
  env: {
    node: true,
  },
};
