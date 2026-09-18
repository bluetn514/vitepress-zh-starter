# 部署到 GitHub Pages

模板已经带了 `.github/workflows/deploy.yml`，你只需要在 GitHub 上点几下。

## 步骤一：确认 base 路径

这是**唯一容易出错的地方**。

| 你的站点地址 | `base` 应该是什么 |
| --- | --- |
| `https://用户名.github.io/仓库名/` | `/仓库名/` |
| `https://用户名.github.io/`（用户主页仓库） | `/` |
| `https://docs.example.com/`（自定义域名） | `/` |

模板的 `config.mts` 已经自动推导：

```ts
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserPage = repoName.endsWith('.github.io')
const base = repoName && !isUserPage ? `/${repoName}/` : '/'
```

也就是说**你通常不用改**。但如果用了自定义域名，建议写死成 `'/'`，更直观：

```ts
export default defineConfig({
  base: '/'   // 自定义域名场景
})
```

::: danger base 写错的症状
页面能打开，但**样式全丢、图片 404、点击任何链接都跳转失败**。
这就是 base 错了，不是部署失败。本地用 `pnpm preview` 能提前发现。
:::

## 步骤二：开启 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Source** 选择 **GitHub Actions**（不要选 "Deploy from a branch"）
3. 保存

## 步骤三：推送代码

```bash
git add .
git commit -m "docs: 初始化文档站"
git push origin main
```

推送到 `main` 分支后自动触发构建。在仓库的 **Actions** 标签页可以看到进度，
首次部署约 1～2 分钟。

完成后访问 `https://用户名.github.io/仓库名/`。

## 工作流做了什么

`.github/workflows/deploy.yml`：

```yaml
name: 部署文档站

on:
  push:
    branches: [main]
  workflow_dispatch:      # 支持手动触发

permissions:
  contents: read
  pages: write
  id-token: write         # OIDC 部署，不需要另存密钥
```

用的是 GitHub 官方 Pages 动作，通过 OIDC 令牌部署，
**不需要配置任何 secrets**。

## 常见问题

### 部署成功但页面 404

- 确认 Pages 的 Source 选的是 **GitHub Actions**
- 确认 `base` 与仓库名一致
- 私有仓库需要公开的 Pages 权限（Settings → Pages → Visibility）

### 样式丢失、链接全错

`base` 错了。见[步骤一](#步骤一确认-base-路径)。

### Actions 报 `pnpm: command not found`

模板用 `pnpm/action-setup` 自动安装，如果被手动改过工作流，
确认这两步都在：

```yaml
- uses: pnpm/action-setup@v4
  with:
    version: 9
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: pnpm
```

### 首次部署后更新不生效

浏览器缓存。用 `Ctrl + F5` 强制刷新，或等一两分钟 CDN 生效。

## 其他部署平台

| 平台 | 要点 |
| --- | --- |
| Vercel | 构建命令 `pnpm build`，输出目录 `docs/.vitepress/dist`，`base` 用 `/` |
| Cloudflare Pages | 同上，Node 版本选 20 |
| Netlify | 同上 |
| 自己的服务器 | `pnpm build` 后把 `docs/.vitepress/dist` 整个传到静态目录 |

::: tip 部署到子路径时 base 一定不能忘
无论哪个平台，只要访问地址带子路径，`base` 就必须对应设置。
这是中文文档站部署报障里占比最高的一个原因。
:::
