# 目录结构说明

## 完整结构

```text
vitepress-zh-starter/
├─ .github/workflows/deploy.yml   # GitHub Pages 自动部署
├─ docs/                          # 文档源码（VitePress 的根目录）
│  ├─ .vitepress/
│  │  ├─ config.mts               # 站点配置：导航、侧边栏、搜索、页脚
│  │  ├─ theme/
│  │  │  ├─ index.ts              # 主题入口（继承默认主题）
│  │  │  └─ zh-typography.css     # 中文排版样式 ★ 本模板核心
│  │  ├─ dist/                    # 构建产物（已 gitignore）
│  │  └─ cache/                   # 构建缓存（已 gitignore）
│  ├─ public/                     # 静态资源，原样复制到站点根目录
│  │  └─ logo.svg
│  ├─ guide/                      # 使用指南
│  │  ├─ index.md
│  │  ├─ installation.md
│  │  ├─ quickstart.md
│  │  ├─ structure.md
│  │  ├─ deployment.md
│  │  ├─ customize.md
│  │  └─ writing/                 # 中文写作规范
│  │     ├─ typography.md
│  │     ├─ terminology.md
│  │     └─ tone.md
│  ├─ reference/                  # API / 配置参考
│  │  ├─ index.md
│  │  └─ markdown.md
│  ├─ index.md                    # 首页
│  ├─ faq.md                      # 常见问题
│  ├─ changelog.md                # 更新日志
│  ├─ contributing.md             # 贡献指南
│  └─ links.md                    # 相关链接
├─ .editorconfig
├─ .gitignore
├─ LICENSE
├─ package.json
└─ README.md
```

## 关键约定

### `docs/` 是文档根目录，不写进 URL

`docs/guide/installation.md` 的访问地址是 `/guide/installation`，
**没有** `docs` 这一层。所以链接要这样写：

```md
[安装](/guide/installation)      ✅ 绝对路径，从文档根算起
[安装](./installation)           ✅ 相对路径，同目录下
[安装](/docs/guide/installation) ❌ 多了 docs
```

### `public/` 里的文件同样不写进 URL

```md
![图](/architecture.png)          ✅
![图](/public/architecture.png)   ❌
```

### 页面路径 = 侧边栏链接

`config.mts` 里侧边栏的 `link` 必须和实际文件路径完全对应。
模板开启了死链检测，写错会在 `pnpm build` 时直接报错：

```text
Error: dead link found in ...
```

这是好事，别关掉。要关闭把 `markdown.ignoreDeadLinks` 改成 `true`。

### 文件命名

| 规则 | 示例 |
| --- | --- |
| 全小写 | `quick-start.md` ✅ `QuickStart.md` ❌ |
| 用连字符分词 | `getting-started.md` ✅ |
| 不用中文文件名 | 中文名在部分服务器和 CI 上会出编码问题 |
| 不用空格 | 空格会被编码成 `%20`，链接难读 |

### 中文文件名为什么不行

虽然在本地能跑，但部署后 URL 会变成一长串百分号编码，
分享出去很难看，部分 CDN 和搜索引擎也会有兼容问题。**统一用英文文件名 + 中文标题**：

```md
# 快速上手          ← 标题用中文

正文……
```

文件名 `quickstart.md` 决定 URL，`# 快速上手` 决定页面显示标题。

## 如何新增一个页面

1. 在 `docs/guide/` 下新建 `your-page.md`
2. 写内容，第一行是 `# 中文标题`
3. 在 `config.mts` 的 `sidebar` 里对应分组加一条：

```ts
{ text: '中文标题', link: '/guide/your-page' }
```

4. 保存，浏览器自动刷新

::: warning 别忘了第三步
页面文件存在但没写进侧边栏，读者**无法从导航到达**，
只能靠外链或搜索进入。模板的死链检测检查的是"链接指向的文件是否存在"，
**反向不检查**——孤立页面不会报错，需要自己留意。
:::

## 下一步

- [部署到 GitHub Pages](./deployment)
- [进阶定制](./customize)
