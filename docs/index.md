---
layout: home

hero:
  name: 项目名
  text: 一句话讲清核心价值
  tagline: 副标题：面向谁、解决什么问题、和替代方案比强在哪。控制在 40 字以内，长了会被折行成两行且不好看。
  image:
    src: /logo.svg
    alt: 项目 Logo
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quickstart
    - theme: alt
      text: 什么是项目名？
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/bluetn514/vitepress-zh-starter

features:
  - icon: 🚀
    title: 特性一：说结果，不说形容词
    details: 写"5 分钟接入"而不是"极致高效"，写"支持 20 种格式"而不是"功能强大"。中文文档里最没信息量的词就是这些四字形容词。
  - icon: 📖
    title: 特性二：中文排版已调好
    details: 行高、字距、中西文间距、表格换行、行内代码字号都按中文阅读习惯配过，不用再自己调 CSS。
  - icon: 🔍
    title: 特性三：中文全文搜索
    details: 内置本地搜索，中文按字切分，无需接入任何第三方服务，零成本、无隐私问题。
  - icon: 🧭
    title: 特性四：导航结构就是模板
    details: 指南 / 参考 / 常见问题 / 更新日志 / 参与贡献 五段式结构已就位，照着填空即可。
  - icon: 🌗
    title: 特性五：深浅色自动跟随
    details: 跟随系统主题，代码高亮两套配色都已配置，无需额外处理。
  - icon: 📦
    title: 特性六：一条命令部署
    details: 附带 GitHub Actions 工作流，推到 main 分支即自动构建并发布到 GitHub Pages。
---

## 这个模板解决什么问题

中文开源项目做文档站，通常卡在三个地方：

1. **排版不好看**：直接用英文模板，中文行距挤、中西文黏在一起、表格溢出。
2. **搜索不可用**：英文分词方案对中文几乎无效，搜"配置"搜不到"配置项"。
3. **结构没章法**：文档越长越乱，读者找不到入口，维护者不知道该往哪写。

这个模板把这三件事预先做完了，你只需要替换成自己的内容。

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
│  ├─ config.mts          # 站点全部配置：导航、侧边栏、搜索、页脚
│  └─ theme/
│     ├─ index.ts         # 主题入口
│     └─ zh-typography.css # 中文排版样式（本模板的核心）
├─ public/                # 图片、logo 等静态资源
├─ guide/                 # 使用指南
│  └─ writing/            # 中文写作规范
├─ reference/             # API / 配置参考
├─ index.md               # 首页（你正在看的这页）
├─ faq.md                 # 常见问题
├─ changelog.md           # 更新日志
└─ contributing.md        # 贡献指南
```

更详细的说明见 [目录结构](/guide/structure)。
