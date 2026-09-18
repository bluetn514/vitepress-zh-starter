---
layout: home

hero:
  name: vitepress-zh-starter
  text: 中文文档站，开箱即用
  tagline: 面向中文开源项目的 VitePress 模板，已配好中文排版、中文搜索和自动部署。
  image:
    src: /logo.svg
    alt: vitepress-zh-starter
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quickstart
    - theme: alt
      text: 阅读指南
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/bluetn514/vitepress-zh-starter

features:
  - icon: 📐
    title: 中文排版已调好
    details: 行高 1.75、正文字号 16px、中西文之间自动留出 1/4 字宽。这些默认主题没有，也不该每个项目重调一遍。
  - icon: 🔍
    title: 中文全文搜索
    details: 内置本地搜索，按字切分。搜"配置"能命中"配置项"。不需要接入 Algolia，也不需要任何第三方服务。
  - icon: 🈶
    title: 界面文案中文化
    details: 搜索框、上一篇/下一篇、深色模式开关、TIP/WARNING 容器标题，全部换成中文，不用再一个个改配置。
  - icon: 🧭
    title: 导航结构可直接沿用
    details: 指南、写作规范、维护部署、参考、常见问题五段式。这是中文开源文档被验证过的组织方式。
  - icon: 📦
    title: 零第三方依赖
    details: package.json 里只有 vitepress 一个包。主题用 extends 继承默认主题，VitePress 升级不会让你的配置失效。
  - icon: 🚀
    title: 推送即部署
    details: 附带 GitHub Actions 工作流，推到 main 分支自动构建并发布到 GitHub Pages，base 路径自动推导。

---

## 这个模板解决什么问题

用 VitePress 默认配置搭中文文档站，你会遇到这几件事：

| 问题 | 默认主题的表现 | 本模板的处理 |
| --- | --- | --- |
| 中文行高偏紧 | 行高按英文调的 `1.5`，中文长文读着发闷 | 调到 `1.75`，段间距同步放大 |
| 中西文黏连 | `使用VitePress构建` 挤成一团 | 用 `text-spacing-trim` 自动加间隙 |
| 界面文案是英文 | `TIP`、`Search`、`Prev`、`Next` | 全部中文化 |
| 中文搜索不可用 | 英文分词对中文几乎失效 | 本地搜索按字切分 |
| 表格溢出 | 单元格不换行，窄屏撑破版心 | 允许换行并约束表头 |

还有一件麻烦事：每换一个项目，上面这些都要重新配一遍。这个模板把配置固定下来，新项目直接改内容即可。

## 三十秒开始

```bash
pnpm install
pnpm dev
```

浏览器打开 `http://localhost:5173`，改 `docs/` 下的 Markdown，页面实时刷新。

## 目录一眼看懂

```text
docs/
├─ .vitepress/
│  ├─ config.mts           # 站点全部配置：导航、侧边栏、搜索、页脚
│  └─ theme/
│     ├─ index.ts          # 主题入口
│     └─ zh-typography.css # 中文排版样式（核心文件）
├─ public/                 # 图片、logo 等静态资源
├─ guide/                  # 使用指南
│  └─ writing/             # 中文写作规范
├─ reference/              # 配置速查、Markdown 扩展
├─ index.md                # 首页（你正在看的这页）
├─ faq.md                  # 常见问题
├─ changelog.md            # 更新日志
└─ contributing.md         # 贡献指南
```

更详细的说明见 [目录结构](/guide/structure)。
