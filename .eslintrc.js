module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2017
  },
  "rules": {
    "accessor-pairs": "error",
    "array-bracket-spacing": "error",
    "array-callback-return": "error",
    "arrow-body-style": "error",
    "arrow-parens": [
      "error",
      "always"
    ],
    "arrow-spacing": [
      "error",
      {
        "after": true,
        "before": true
      }
    ],
    "block-scoped-var": "error",
    "block-spacing": "error",
    "brace-style": "error",
    "callback-return": "error",
    "camelcase": "error",
    "class-methods-use-this": "error",
    "comma-dangle": "error",
    "comma-spacing": "error",
    "comma-style": "error",
    "complexity": "error",
    "computed-property-spacing": "error",
    "consistent-return": "error",
    "consistent-this": "error",
    "curly": "error",
    "default-case": "error",
    "dot-notation": "error",
    "eol-last": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "func-call-spacing": "error",
    "func-name-matching": "error",
    "func-names": "error",
    "func-style": "error",
    "generator-star-spacing": "error",
    "global-require": "error",
    "guard-for-in": "error",
    "handle-callback-err": "error",
    "id-blacklist": "error",
    "id-length": "error",
    "id-match": "error",
    "indent": "off",
    "init-declarations": "error",
    "jsx-quotes": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "line-comment-position": "off",
    "linebreak-style": [
      "error",
      "windows"
    ],
    "lines-around-comment": "error",
    "lines-around-directive": "error",
    "max-depth": "error",
    "max-lines": "error",
    "max-nested-callbacks": "error",
    "max-params": "error",
    "max-statements": "error",
    "max-statements-per-line": "error",
    "new-cap": "error",
    "new-parens": "error",
    "newline-before-return": "error",
    "no-alert": "error",
    "no-array-constructor": "error",
    "no-await-in-loop": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-catch-shadow": "error",
    "no-confusing-arrow": "error",
    "no-continue": "error",
    "no-div-regex": "error",
    "no-duplicate-imports": "error",
    "no-else-return": "error",
    "no-empty-function": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-label": "error",
    "no-extra-parens": "error",
    "no-floating-decimal": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-implied-eval": "error",
    "no-inline-comments": "off",
    "no-invalid-this": "error",
    "no-iterator": "error",
    "no-label-var": "error",
    "no-labels": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-magic-numbers": "error",
    "no-mixed-operators": "error",
    "no-mixed-requires": "error",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-multiple-empty-lines": "error",
    "no-native-reassign": "error",
    "no-negated-condition": "error",
    "no-negated-in-lhs": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-require": "error",
    "no-new-wrappers": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-path-concat": "error",
    "no-plusplus": "error",
    "no-process-env": "error",
    "no-process-exit": "error",
    "no-proto": "error",
    "no-prototype-builtins": "error",
    "no-restricted-globals": "error",
    "no-restricted-imports": "error",
    "no-restricted-modules": "error",
    "no-restricted-properties": "error",
    "no-restricted-syntax": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-spaced-func": "error",
    "no-sync": "error",
    "no-tabs": "error",
    "no-template-curly-in-string": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "off",
    "no-undef-init": "error",
    "no-undefined": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": "off",
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-void": "error",
    "no-whitespace-before-property": "error",
    "no-with": "error",
    "object-shorthand": "error",
    "one-var": "off",
    "one-var-declaration-per-line": "error",
    "operator-assignment": "error",
    "operator-linebreak": "error",
    "padded-blocks": "off",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-numeric-literals": "error",
    "prefer-reflect": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "quote-props": "off",
    "quotes": [
      "error",
      "single"
    ],
    "radix": "error",
    "require-await": "error",
    "require-jsdoc": "error",
    "rest-spread-spacing": "error",
    "semi": "off",
    "semi-spacing": "error",
    "sort-imports": "error",
    "sort-vars": "error",
    "space-before-blocks": "error",
    "space-in-parens": [
      "error",
      "never"
    ],
    "space-infix-ops": "off",
    "space-unary-ops": "error",
    "spaced-comment": [
      "error",
      "never"
    ],
    "strict": "off",
    "symbol-description": "error",
    "template-curly-spacing": [
      "error",
      "never"
    ],
    "unicode-bom": [
      "error",
      "never"
    ],
    "valid-jsdoc": "error",
    "vars-on-top": "error",
    "wrap-iife": "error",
    "wrap-regex": "error",
    "yield-star-spacing": "error",
    "yoda": "error"
  }
};