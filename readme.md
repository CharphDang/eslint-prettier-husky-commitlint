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
   npx husky add .husky/commit-msg "node scripts/verifyCommit.js"
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
   
3. Create the `scripts/verifyCommit.js`

   ```js
   /* eslint-disable no-undef */
   const msg = require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim();
   
   const commitRE =
     /^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,50}/;
   const mergeRe = /^(Merge pull request|Merge branch)/;
   if (!commitRE.test(msg)) {
     if (!mergeRe.test(msg)) {
       console.log('git commit信息校验不通过');
   
       console.error(`git commit的信息格式不对, 需要使用 title(scope): desc的格式
         比如 fix: xxbug
         feat(test): add new
         具体校验逻辑看 scripts/verifyCommit.js
       `);
       process.exit(1);
     }
   } else {
     console.log('git commit信息校验通过');
   }
   ```

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



