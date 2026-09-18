# 配置项速查

本页列出本模板 `docs/.vitepress/config.mts` 中所有已填好的配置，说明各自的作用和常见取值。
完整选项见 [VitePress 官方配置参考](https://vitepress.dev/zh/reference/site-config)。

## 站点级配置

| 配置项 | 当前值 | 作用 | 常见改动 |
| --- | --- | --- | --- |
| `lang` | `'zh-CN'` | 页面语言，影响字体回退与搜索分词 | 繁体改 `zh-TW` |
| `title` | `'项目名'` | 站点名，显示在导航栏和标签页 | **必改** |
| `description` | 一句话描述 | 生成 `<meta name="description">` | **必改** |
| `base` | 自动推导 | 部署子路径，见[部署说明](/guide/deployment) | 自定义域名时改 `'/'` |
| `lastUpdated` | `true` | 显示"最后更新于"，取自 git 记录 | 无 git 环境时改 `false` |
| `cleanUrls` | `true` | 去掉 URL 中的 `.html` | 部署到某些静态服务器可能需关掉 |
| `head` | 见文件 | 注入 `<meta>` 标签 | 加统计脚本时在这里加 |

## Markdown 配置

| 配置项 | 当前值 | 作用 |
| --- | --- | --- |
| `ignoreDeadLinks` | `false` | 内部链接指向不存在的文件时构建失败。**建议保持** |
| `theme` | github-light / github-dark | 代码高亮主题 |
| `lineNumbers` | `false` | 代码块行号，文档里通常不需要 |

### 自定义容器标题

config.mts 里配置了中文标题：

```ts
container: {
  tipLabel: '提示',
  warningLabel: '注意',
  dangerLabel: '警告',
  infoLabel: '信息',
  detailsLabel: '详细信息'
}
```

在 Markdown 中这样用：

```md
::: tip 提示
补充说明。
:::

::: warning 注意
可能出问题的地方。
:::

::: danger 警告
会导致数据丢失的操作。
:::

::: details 详细信息
默认折叠的内容。
:::
```

不配置 `container` 的话，标题会是英文的 `TIP`、`WARNING`，中文文档里很突兀。

## 主题配置

### 导航 `nav`

```ts
nav: [
  { text: '指南', link: '/guide/', activeMatch: '/guide/' },
  { text: '参考', link: '/reference/' },
  {
    text: '更多',
    items: [                      // 下拉菜单
      { text: '更新日志', link: '/changelog' }
    ]
  }
]
```

`activeMatch` 用于让"指南"在 `/guide/` 下所有页面都保持高亮。
**不加的话进入子页面导航高亮会消失**，这是常见的小疏漏。

### 侧边栏 `sidebar`

```ts
sidebar: [
  {
    text: '开始使用',        // 分组标题
    collapsed: false,        // false = 默认展开
    items: [
      { text: '简介', link: '/guide/' }
    ]
  }
]
```

| 属性 | 说明 |
| --- | --- |
| `text` | 分组或条目显示的文字 |
| `collapsed` | `true` 默认折叠，首页级分组建议 `false` |
| `items` | 子条目数组，支持嵌套形成三级 |
| `link` | 页面路径，**必须与文件路径一致** |

### 搜索 `search`

```ts
search: {
  provider: 'local',
  options: {
    translations: { /* 中文界面文案 */ }
  }
}
```

| provider | 特点 | 适用 |
| --- | --- | --- |
| `local` | 零依赖、构建时生成索引、离线可用 | **绝大多数中文项目** |
| `algolia` | 需要申请、有免费额度限制 | 超大文档站 |

`local` 模式对中文按字切分，搜"部署"能命中"部署到 GitHub Pages"，
不需要任何额外配置。

::: tip 本地搜索的体积代价
索引会随文档量增长。文档超过约 500 页时首屏索引文件会偏大，
那时再考虑 Algolia。
:::

### 目录 `outline`

```ts
outline: {
  level: [2, 3],      // 收录 h2 和 h3
  label: '本页目录'
}
```

`level: 'deep'` 会收录所有层级，页面标题多时右侧目录会很长。
中文文档建议 `[2, 3]`。

### 文档元信息

```ts
docFooter: { prev: '上一篇', next: '下一篇' },
lastUpdated: { text: '最后更新于' },
returnToTopLabel: '回到顶部',
sidebarMenuLabel: '菜单',
darkModeSwitchLabel: '深色模式',
externalLinkIcon: true
```

这些是**界面文案的中文化**，不配置就是英文。
`externalLinkIcon: true` 会给外链加一个 ↗ 图标，提醒读者会离开本站。

### 编辑链接 `editLink`

```ts
editLink: {
  pattern: 'https://github.com/bluetn514/vitepress-zh-starter/edit/main/docs/:path',
  text: '在 GitHub 上编辑此页'
}
```

`:path` 是占位符，会被替换为当前页相对 `docs/` 的路径。
**分支名 `main` 要和你仓库的默认分支一致**，否则点进去是 404。

### 页脚

```ts
footer: {
  message: '基于 MIT 许可发布',
  copyright: 'Copyright © 2025-present bluetn514'
}
```

## 排版样式变量

`zh-typography.css` 里调整的关键变量，改这些就能整体微调观感：

| 变量 / 属性 | 当前值 | 作用 |
| --- | --- | --- |
| `--vp-font-family-base` | 含 `PingFang SC` `Microsoft YaHei` 等 | 中文字体回退链 |
| `.vp-doc font-size` | `16px` / 桌面端 `16.5px` | 正文字号，**中文别低于 16px** |
| `.vp-doc line-height` | `1.75` | 中文行高，英文 1.5 偏紧 |
| `.vp-doc p margin` | `14px 0` | 段间距 |
| `text-spacing-trim` | `space-first` | 中西文自动间距 |

改字号时注意**同步检查行高比例**：字号变大而 `line-height` 不变，观感会明显变挤。

## 环境变量

| 变量 | 来源 | 用途 |
| --- | --- | --- |
| `GITHUB_REPOSITORY` | GitHub Actions 自动注入 | 推导 `base` 路径 |

本地开发时该变量不存在，`base` 回退为 `'/'`，所以本地无需配置任何环境变量。
