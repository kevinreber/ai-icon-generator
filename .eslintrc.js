/* eslint-env es6 */
const OFF = 0;
const WARN = 1;
// const ERROR = 2;

/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "airbnb",
    "prettier",
  ],
  rules: {
    "no-unused-vars": WARN,
    "no-console": OFF,
    "import/extensions": OFF,
    "@typescript-eslint/no-unused-vars": WARN,
    "react/jsx-filename-extension": [OFF],
    "react/jsx-no-useless-fragment": OFF,
    "react/function-component-definition": [OFF],
    "func-names": OFF,
    "import/order": OFF,
    "object/shorthand": OFF,
    "arrow-body-style": OFF,
    "class-methods-use-this": OFF,
    "react/react-in-jsx-scope": OFF,
    "no-else-return": OFF,
    "prefer-destructuring": OFF,
    "no-use-before-define": OFF,
    "no-param-reassign": OFF,
    "import/no-cycle": OFF,
    "react/require-default-props": OFF,
    "no-nested-ternary": OFF,
    "import/prefer-default-export": OFF,
    "default-param-last": OFF,
    "consistent-return": OFF,
    "no-case-declarations": OFF,
    "import/no-extraneous-dependencies": OFF,
    "no-shadow": OFF,
    "no-underscore-dangle": OFF,
  },
};
