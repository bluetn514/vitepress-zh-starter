# 安装

## 环境要求

| 依赖 | 最低版本 | 说明 |
| --- | --- | --- |
| Node.js | 18.0.0 | VitePress 1.x 要求；推荐 20 LTS 或更高 |
| 包管理器 | — | pnpm / npm / yarn 任选，下面的命令默认用 pnpm |

检查当前版本：

```bash
node -v
pnpm -v
```

## 安装方式

::: code-group

```bash [pnpm]
pnpm install
```

```bash [npm]
npm install
```

```bash [yarn]
yarn install
```

:::

## 启动开发服务器

```bash
pnpm dev
```

默认监听 `http://localhost:5173`。如果端口被占用，VitePress 会自动换到下一个可用端口，
注意看终端输出里的实际地址。

修改 `docs/` 目录下的任意 `.md` 文件，浏览器会自动刷新，不需要重启。

## 构建与本地预览

```bash
# 构建静态文件到 docs/.vitepress/dist
pnpm build

# 本地预览构建结果（验证 base 路径是否正确）
pnpm preview
```

::: warning 一定要跑 preview
`dev` 模式下 `base` 路径不生效。部署到子路径（如 `https://用户名.github.io/仓库名/`）
后样式丢失，**只有 `preview` 能提前复现这个问题**。
:::

## 常见安装报错

### `EPERM: operation not permitted`

Windows 上多为杀毒软件或权限问题，尝试：

```bash
# 换一个缓存目录（推荐，不动系统配置）
pnpm install --store-dir .pnpm-store
```

### `Unsupported engine`

Node 版本过低。用 nvm / fnm 切到 20 LTS：

```bash
nvm install 20
nvm use 20
```

## 下一步

环境好了，去 [快速上手](./quickstart) 把它替换成你自己的内容。
