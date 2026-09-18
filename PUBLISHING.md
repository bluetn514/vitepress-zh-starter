# 发布操作指引

从零把这个模板发布成自己的 GitHub 仓库，以及后续维护的完整流程。

---

## 一、环境准备（只做一次）

### 1. 配置 Git 身份

**必须先做**。没有身份，`git commit` 会直接失败，或者产出错误的提交记录。

```bash
# 换成你自己的名字和邮箱
git config --global user.name "你的名字"
git config --global user.email "你的邮箱@example.com"

# 检查
git config --global --list
```

::: tip 邮箱用什么
- 想让邮箱公开：直接用常用邮箱
- 不想公开：用 GitHub 提供的匿名邮箱
  在 GitHub → Settings → Emails 勾选 **Keep my email addresses private**，
  页面会给你一个 `12345678+用户名@users.noreply.github.com`，
  **用这个填 user.email**

用 noreply 邮箱提交的 commit 仍会正常计入你的 GitHub 贡献图。
:::

### 2. 配置认证

推送需要认证。二选一：

**方式 A：HTTPS + Personal Access Token（推荐新手）**

1. GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)**
2. **Generate new token (classic)**
3. Note 填 `git-push`，Expiration 选 90 天
4. Scopes 勾选 **`repo`**（这是唯一必需的）
5. 生成后**立刻复制**（页面关闭就再也看不到）
6. 第一次 `git push` 时会要求输入用户名和密码
   - Username：你的 GitHub 用户名
   - Password：**粘贴刚才的 token**，不是账号密码

保存凭据避免每次输入：

```bash
# Windows
git config --global credential.helper manager

# macOS
git config --global credential.helper osxkeychain
```

**方式 B：SSH 密钥**

```bash
# 生成（邮箱换成你的）
ssh-keygen -t ed25519 -C "你的邮箱@example.com"
# 一路回车即可，密码短语可留空

# 查看公钥并复制全部内容
cat ~/.ssh/id_ed25519.pub
```

把公钥粘贴到 GitHub → Settings → SSH and GPG keys → **New SSH key**。

验证：

```bash
ssh -T git@github.com
# 出现 "Hi 用户名! You've successfully authenticated" 即成功
```

---

## 二、在 GitHub 上创建仓库

1. 打开 https://github.com/new
2. **Repository name**：建议 `vitepress-zh-starter`（见[命名建议](#五仓库命名与描述)）
3. **Description**：`面向中文开源项目的 VitePress 文档站模板，中文排版开箱即用`
4. 选择 **Public**（公开才有人能看到和 fork）
5. **不要**勾选 Add README / .gitignore / license
   （本地已经有了，勾了会导致推送时冲突）
6. 点击 **Create repository**

创建后会看到一个空仓库页面，记下里面的地址，形如：

```text
https://github.com/bluetn514/vitepress-zh-starter.git
```

---

## 三、推送代码

### 1. 改成你自己的项目（可选）

仓库地址、站点标题、页脚版权**都已配好**，直接推送即可。

只有当你想把这份模板用作**另一个项目**的文档站时，才需要改这些。
打开 `docs/.vitepress/config.mts`：

```ts
title: '你的项目名',
description: '一句话描述',

themeConfig: {
  editLink: {
    pattern: 'https://github.com/你的用户名/你的仓库名/edit/main/docs/:path'
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/你的用户名/你的仓库名' }
  ]
}
```

同步改 `LICENSE` 的版权行，以及 `docs/guide/index.md` 里的示例内容
（那是给模板使用者看的占位示例）。

改完检查有没有漏：

```bash
grep -rn "你的用户名\|你的仓库名\|项目名" --include="*.md" --include="*.mts" --include="*.ts" .
```

### 2. 初始化并提交

在项目目录下执行：

```bash
# 初始化仓库
git init -b main

# 确认 node_modules 不会被提交（.gitignore 已配好）
git status --short | head

# 添加并提交
git add .
git commit -m "docs: 初始化中文文档站模板"

# 关联远程仓库
git remote add origin https://github.com/bluetn514/vitepress-zh-starter.git

# 推送
git push -u origin main
```

::: warning `git add .` 前先确认
`node_modules/` 有几千个文件，一旦提交进去仓库会变得极难维护。
执行 `git status --short` 时**不应该看到任何 node_modules 内容**。
`.gitignore` 已经配好了，看到就说明文件被改过。
:::

::: tip 本仓库已完成这一步
`bluetn514/vitepress-zh-starter` 已经 `git init` 并完成了首次提交，
**你只需要建仓 + 推送**：

```bash
git remote add origin https://github.com/bluetn514/vitepress-zh-starter.git
git push -u origin main
```
:::

### 3. 验证

推送成功后打开 `https://github.com/bluetn514/vitepress-zh-starter`，
确认文件都在，且**没看到 `node_modules` 目录**。

---

## 四、开启自动部署

1. 仓库 → **Settings** → 左侧 **Pages**
2. **Source** 选择 **GitHub Actions**（不要选 "Deploy from a branch"）
3. 回到仓库 → **Actions** 标签页
4. 看到工作流已在运行；如果没跑，点 **部署文档站** → **Run workflow** 手动触发
5. 等 1～2 分钟，出现绿色对勾后访问：

```text
https://bluetn514.github.io/vitepress-zh-starter/
```

::: danger 页面打开但样式全丢？
`base` 路径配错了。模板会自动从 CI 环境推导，**通常不用改**，
但如果手动改过 `config.mts`，对照[部署指南](docs/guide/deployment.md#步骤一确认-base-路径)检查。
:::

---

## 五、仓库命名与描述

好的名字和描述直接影响别人能不能搜到。

### 命名

| 命名 | 评价 |
| --- | --- |
| `vitepress-zh-starter` | ✅ 包含关键词 `vitepress`、`zh`、`starter` |
| `vitepress-chinese-docs-template` | ✅ 关键词全，稍长 |
| `my-docs` | ❌ 无关键词，搜不到 |
| `docs` | ❌ 太泛 |

### Description

一句话，包含搜索关键词：

```text
面向中文开源项目的 VitePress 文档站模板，中文排版、全文搜索、自动部署开箱即用
```

### Topics（比 Description 更重要）

仓库首页右上角 ⚙️ → **Topics**，填：

```text
vitepress
vitepress-theme
chinese
documentation
docs
template
markdown
```

**Topics 是 GitHub 站内搜索和推荐的主要依据**，比 Description 权重高。

### 网站栏

仓库首页右侧 **Website** 填部署后的地址：

```text
https://bluetn514.github.io/vitepress-zh-starter/
```

---

## 六、后续维护

### 日常改动

```bash
git add .
git commit -m "docs: 补充 xxx 说明"
git push
```

推送后自动重新部署，不需要任何手动操作。

### 提交信息规范

```text
docs: 修正部署章节的 base 说明
feat: 新增术语检查工作流
fix: 修复侧边栏在移动端折叠异常
chore: 升级依赖
```

### 接受他人 PR

文档项目最常见的贡献是改错别字。`editLink` 已经配好了"在 GitHub 上编辑此页"，
别人点一下就能在线改并提交 PR，不需要克隆仓库。

收到 PR 后：

1. 点 **Files changed** 看具体改动
2. 确认没改坏链接（CI 会自动跑死链检测）
3. 点 **Merge pull request**

### 打标签发布版本

```bash
git tag -a v1.0.0 -m "首个版本"
git push origin v1.0.0
```

然后在 GitHub → **Releases** → **Draft a new release** 里关联这个标签并写发布说明。

---

## 七、排错

| 现象 | 原因 | 解决 |
| --- | --- | --- |
| `Please tell me who you are` | 没配 git 身份 | 回到[第一节](#1-配置-git-身份) |
| `Authentication failed` | token 过期或 scopes 不足 | 重新生成，勾选 `repo` |
| `remote origin already exists` | 重复添加远程 | `git remote set-url origin 新地址` |
| `failed to push some refs` | 远程有本地没有的提交 | `git pull --rebase origin main` 后再推 |
| Actions 报 `npm ci` 失败 | lock 文件与 `package.json` 不一致 | 本地 `rm -rf node_modules package-lock.json && npm install` 后提交新 lock |
| Pages 显示 404 | Source 没选 GitHub Actions | Settings → Pages 重新选 |
| 页面样式丢失 | `base` 配错 | 见[第四节](#四开启自动部署)警告 |

### 想改用 pnpm

模板默认用 npm（仓库内已含 `package-lock.json`）。改用 pnpm：

```bash
rm -rf node_modules package-lock.json
pnpm install          # 生成 pnpm-lock.yaml
```

然后修改 `.github/workflows/deploy.yml`：

```yaml
      - name: 安装 pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: 配置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm      # ← 从 npm 改成 pnpm

      - name: 安装依赖
        run: pnpm install --frozen-lockfile   # ← 从 npm ci 改掉

      - name: 构建文档
        run: pnpm build
```

---

## 八、发布前检查清单

- [x] `git config` 身份已配置（本仓库已用仓库级配置指定）
- [x] `config.mts` 的 `title`、`description` 已替换
- [x] `config.mts` 的 `editLink.pattern`、`socialLinks` 已是真实仓库地址
- [x] `README.md`、`LICENSE` 里的占位符已全部替换
- [x] `npm run build` 通过（含死链检测）
- [x] `git status --short` 中**没有 `node_modules`**
- [x] 首次提交已完成
- [ ] 在 GitHub 上创建 Public 仓库 `vitepress-zh-starter`
- [ ] `git push -u origin main`
- [ ] Pages 的 Source 已选 **GitHub Actions**
- [ ] Topics 已填写（`vitepress` `chinese` `documentation` `template` 等）
- [ ] Website 栏已填部署地址
