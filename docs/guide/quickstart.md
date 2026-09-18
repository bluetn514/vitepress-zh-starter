# 快速上手

这一页带你用最短路径把模板变成自己的文档站。全程约 15 分钟。

## 第一步：改站点信息

打开 `docs/.vitepress/config.mts`，替换这几处：

```ts
export default defineConfig({
  title: '项目名',                    // ← 改成你的项目名
  description: '一句话描述',           // ← 改成你的描述
  // ...
  themeConfig: {
    nav: [ /* 顶部导航，按你的文档结构调整 */ ],
    sidebar: [ /* 侧边栏 */ ],
    editLink: {
      pattern: 'https://github.com/<用户名>/<仓库名>/edit/main/docs/:path'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/<用户名>/<仓库名>' }
    ]
  }
})
```

::: tip 先跑起来再改
建议顺序是：先 `pnpm dev` 看到页面，再边改边看效果。
一次性改完十几处再启动，报错了不好定位。
:::

## 第二步：确定你的文档结构

不要照抄模板的目录，按**读者的使用路径**组织，而不是按代码模块。

推荐的中文开源项目结构：

```text
docs/
├─ index.md              # 首页：是什么 + 为什么 + 快速示例
├─ guide/                # 指南：从安装到完成第一个任务
│  ├─ index.md           #   简介（读者第一个该看懂的页面）
│  ├─ installation.md    #   安装
│  └─ quickstart.md      #   快速上手
├─ reference/            # 参考：API、配置项、参数表
├─ faq.md                # 常见问题：把重复 issue 沉淀到这里
├─ changelog.md          # 更新日志
└─ contributing.md       # 贡献指南
```

判断标准很简单：**读者带着问题来，能不能在三层点击内找到答案。**

## 第三步：替换首页

`docs/index.md` 的 frontmatter 控制首页 Hero 区：

```yaml
---
layout: home

hero:
  name: 项目名
  text: 一句话讲清核心价值
  tagline: 面向谁、解决什么问题
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/quickstart

features:
  - icon: 🚀
    title: 特性一
    details: 说具体结果，不说"强大""高效"
---
```

frontmatter 下面的正文会显示在特性卡片下方，可以放目录说明、架构图等。

## 第四步：换成自己的 Logo

替换 `docs/public/logo.svg`。主题配置里已经指向它：

```ts
themeConfig: {
  logo: '/logo.svg'
}
```

`docs/public/` 下的文件会原样复制到站点根目录，引用时**不要**写 `public`：

```md
![架构图](/architecture.png)   <!-- ✅ 正确 -->
![架构图](/public/architecture.png)  <!-- ❌ 错误 -->
```

## 第五步：部署

推送到 GitHub 后，按 [部署到 GitHub Pages](./deployment) 配置一次即可，
之后每次 `git push` 自动发布。

## 检查清单

发布前过一遍：

- [ ] `title`、`description` 已替换
- [ ] 首页 Hero 的三个按钮指向真实页面
- [ ] `editLink.pattern` 和 `socialLinks` 里的仓库地址已替换
- [ ] `pnpm build` 无报错（模板开启了死链检测，链接写错会直接拦住）
- [ ] `pnpm preview` 检查样式正常
- [ ] 删掉了示例文档中不需要的页面，并同步删掉侧边栏里的对应条目
- [ ] `LICENSE` 里的版权信息已替换
