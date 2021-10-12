# Eslint + Prettier



## Prepare your environment

### Install package that you need

> 简单方法将以下内容copy到你的文件中，然后执行`yarn` or `npm install`

```json
"devDependencies": {
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "^7.26.1",
    "husky": "^7.0.2",
    "lint-staged": "^11.2.3",
    "prettier": "^2.4.1",
    "stylelint": "^13.13.1",
    "stylelint-config-standard": "^22.0.0",
    "stylelint-order": "^4.1.0"
}
```



### eslint config

> Run command`npx eslint --init`, then select content you need, generate a `.eslintrc` file.

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    // "no-confusing-arrow": "off",
    // "no-mixed-operators": ["error", { "allowSamePrecedence": true }],
    // "arrow-parens": [2, "as-needed", { "requireForBlockBody": false }]
  }
}

```

### husky

1. Run install command 

   ```js
   npm set-script prepare "husky install"
   npm run prepare
   ```

2. Run git hooks command

   ```js
   npx husky add .husky/pre-commit "npx lint-staged"
   ```

3. Define lint-staged file

   ```json
   {
     "**/*.{js,jsx}": [
       "prettier --config .prettierrc --write",
       "eslint --fix"
     ],
     "**/*.less": [
       "stylelint --fix"
     ]
   }
   ```

   

