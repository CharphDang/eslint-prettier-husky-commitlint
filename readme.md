# Eslint + Prettier + stylelint + Husky + Lint-staged + verifyCommitMessage



> 完成它， 你的工程将会有一个统一风格的格式化标准，并且不需要人为的关注是否有问题，在git commit 命令时，会对message 的内容进行校验，保证提交信息都符合规范。也会自动去格式化代码再提交。所以无需关心团队编码工具是否一致。

Reference Link:

1. [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#readme)
2. [stylelint](https://github.com/stylelint)

## Prepare your environment

### Install package that you need

> 简单方法将以下内容copy到你的文件中，然后执行`yarn` or `npm install`

```json
// package.json
"devDependencies": {
    "@commitlint/cli": "^16.2.3",
    "@commitlint/config-conventional": "^16.2.1",
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



### Stylelint

####    stylelint-order

> 该插件的作用是强制你按照某个顺序编写 css。例如先写定位，再写盒模型，再写内容区样式，最后写 CSS3 相关属性。这样可以极大的保证我们代码的可读性。

#### stylelint-config-standard

> 作用：配置 Stylelint 规则。
> 官方的代码风格 ：stylelint-config-standard。该风格是 Stylelint 的维护者汲取了 GitHub、Google、Airbnb 多家之长生成的。

#### stylelint-config-recess-order

> stylelint-order 插件的第三方配置

```json
// .stylelintrc
{
  "extends": ["stylelint-config-standard", "stylelint-config-recess-order"],
  "plugins": ["stylelint-order"],
  "rules": {
    "indentation": 4,
    "no-descending-specificity": null
  }
}
```



### Eslint config

#### eslint-config-prettier

> 用来覆盖和eslint冲突的不重要的规则，保证prettier的格式化不会被报错

#### eslint-plugin-prettier

> prettier 格式化规则插件，默认会调用`.prettierrc`文件

#### prettier

> prettier 格式化插件

```json
// .eslintrc
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

### Husky + Lint-staged

1. Run install command 

   ```js
   npm set-script prepare "husky install"
   npm run prepare
   ```

2. Run git hooks command

   ```js
   npx husky add .husky/pre-commit "npx lint-staged"
   npx husky add .husky/commit-msg "npx commitlint --edit $1"
   ```

3. Define lint-staged file

   ```json
   // .lintstagedrc
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
   
4. Create the `.commitlintrc`，详细规则请看官方 [rules](https://commitlint.js.org/#/reference-rules)

   ```json
   {
      "extends": ["@commitlint/config-conventional"],
      "rules": {
        "body-leading-blank": [2, "always"],
        "footer-leading-blank": [1, "always"],
        "header-max-length": [2, "always", 108],
        "type-empty": [2, "never"],
        "scope-empty": [0],
        "subject-empty": [2, "never"],
        "subject-full-stop": [0],
        "type-case": [0],
        "scope-case": [0],
        "subject-case": [0],
        "type-enum": [
          2,
          "always",
          [
            "feat",
            "fix",
            "perf",
            "style",
            "docs",
            "test",
            "refactor",
            "build",
            "ci",
            "chore",
            "revert"
          ]
        ]
      }
    }
   ```

**类型描述：**

Type     | Description                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| feat     | Adds a new feature                                                                                                                  |
| fix      | Solves a bug                                                                                                                        |
| perf     | Improves performance                                                                                                                |
| style    | Improves formatting, white-space, does not change the code logic.                                                                   |
| docs     | Adds or alters documentation                                                                                                        |
| test     | Adds or modifies unit tests                                                                                                         |
| refactor | Rewrites code without feature, performance or bug changes                                                                           |
| build    | The main purpose is to modify the submission of the project build system (such as the configuration of gulp, webpack, rollup, etc.) |
| ci       | The main purpose is to modify the continuous integration process of the project                                                     |
| chore    | Other changes that don't modify src or test files. Change the build process, or add dependent libraries, tools, etc.                |
| revert   | Reverts a previous commit

### Vscode plugin

> You can install some plugin `eslint` `stylelint` `prettier`  to free your using. then I will provide the settings.

#### eslint 

> 提供eslint的校验，保存自动修复功能

#### stylelint

> 提供样式文件的校验，保存自动修复的功能

#### prettier

> 提供prettier 保存自动格式化的功能

```json
// .vscode -> settings.json
{
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "eslint.codeAction.disableRuleComment": {
    "enable": true
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "eslint.codeActionsOnSave.mode": "all",
  "eslint.run": "onSave",

  "editor.defaultFormatter": null,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```





### Tips

`.eslintrc` 中 `plugin:prettier/recommended` 的实际含义：

```json
// .eslintrc
{
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### 如果你的团队觉得在每次的commit都进行代码的eslint 校验or修复太过于繁琐，可以使用pre-push 的hook钩子来处理，对应的命令可以在scripts中配置，然后调用即可。
```json
  // package.json
  ...
  "scripts": {
    "prepare": "husky install",
    "eslint:ci": "eslint $(git diff origin/master --name-only | grep -E '^src/.*\\.(jsx|js)$')",
    "stylelint:ci": "stylelint $(git diff origin/master --name-only | grep -E '\\.less$') 'fake.none' --allow-empty-input"
  },
...
```

```
// pre-push file
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run eslint:ci
npm run stylelint:ci
```


