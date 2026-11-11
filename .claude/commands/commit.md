提交代码: $ARGUMENTS

## 执行步骤

1. 查看当前修改：`git status`
2. 查看具体改动：`git diff`（必要时再看 `git diff --cached`）
3. 根据改动内容生成 commit message
4. 运行「提交前检查」，有失败先修复
5. 暂存并提交（不执行 push）
6. 完成后显示 commit hash

## Commit Message 规范

格式：`<type>: <description>`

规则：
- description 必须是英文
- description 不超过 50 个字符
- 使用动词开头：add, fix, update, remove, refactor
- 全部小写

### Type 类型
- feat: 新功能
- fix: bug 修复
- style: 样式调整
- refactor: 重构
- docs: 文档
- chore: 工具/构建

### 示例
- feat: add bilingual language switch
- fix: correct active nav state
- style: soften card borders
- refactor: extract section heading
- docs: add deployment guide
- chore: add commit slash command

## 提交前检查

在当前项目先跑：

```bash
pnpm typecheck
pnpm lint
pnpm build
```

说明：
- `pnpm lint` 中来自 `src/components/reactbits/*` 的 warning 属于第三方组件，可继续；出现 error 必须先修复。
- 不要提交 `node_modules`、`dist`、`.env` 等忽略文件；提交前确认 `git status` 干净且只包含本次改动。

## 执行命令

```bash
git add -A
git commit -m "<生成的message>"
```

不要自动 push；如需要推送，先询问用户。
