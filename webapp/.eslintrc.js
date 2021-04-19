module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
    parser: 'babel-eslint',
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        'prettier',
        'react-hooks'
    ],
    "rules": {
      'prettier/prettier': 'error',
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      'react/jsx-filename-extension': 0,
      'import/prefer-default-export': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': 0,
      'func-names': 0,
    }
};
