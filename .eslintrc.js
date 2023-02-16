module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
