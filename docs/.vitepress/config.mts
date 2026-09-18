import { defineConfig } from 'vitepress'

/**
 * GitHub Pages 的 base 路径。
 *
 * 这是新手最容易踩的坑：仓库部署在 `https://<用户名>.github.io/<仓库名>/` 时，
 * base 必须写成 `/<仓库名>/`，否则打包后页面样式全丢、语言切换 404。
 * 部署到 `<用户名>.github.io`（用户主页仓库）时 base 留空字符串即可。
 *
 * 这里用环境变量自动推导：CI 里读 GitHub 仓库名，本地开发自动回退为空。
 * 换成自己的域名时（如 docs.example.com），把 base 直接写死成 '/' 更直观。
 */
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isUserPage = repoName.endsWith('.github.io')
const base = repoName && !isUserPage ? `/${repoName}/` : '/'

export default defineConfig({
  // ── 站点基础信息 ────────────────────────────────────────────────
  lang: 'zh-CN',
  title: 'vitepress-zh-starter',
  description: '面向中文开源项目的 VitePress 文档站模板，中文排版开箱即用',
  base,

  // 页面左上角显示"最后更新时间"，取自 git 提交记录
  lastUpdated: true,
  // 用干净的 URL（/guide/ 而不是 /guide/index.html）
  cleanUrls: true,

  // ── 死链检测 ───────────────────────────────────────────────────
  // 构建时检查文档内部链接，防止中文文档里链接写错却没人发现
  markdown: {
    // 关闭后构建不中断，只警告；严谨项目可改成 true
    ignoreDeadLinks: false,
    lineNumbers: false,
    // 代码块默认折叠长行，避免横向滚动条撑破版心
    theme: { light: 'github-light', dark: 'github-dark' },
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  },

  // ── 主题配置 ───────────────────────────────────────────────────
  themeConfig: {
    logo: '/logo.svg',

    // 顶部导航：把中文文档最常见的几类入口先摆好
    nav: [
      { text: '指南', link: '/guide/', activeMatch: '/guide/' },
      { text: '参考', link: '/reference/' },
      { text: '常见问题', link: '/faq' },
      {
        text: '更多',
        items: [
          { text: '更新日志', link: '/changelog' },
          { text: '参与贡献', link: '/contributing' },
          { text: '相关链接', link: '/links' }
        ]
      }
    ],

    // 左侧边栏：分组名用中文，`collapsed: false` 让新读者一眼看到全貌
    sidebar: [
      {
        text: '开始使用',
        collapsed: false,
        items: [
          { text: '简介', link: '/guide/' },
          { text: '安装', link: '/guide/installation' },
          { text: '快速上手', link: '/guide/quickstart' }
        ]
      },
      {
        text: '中文文档写作规范',
        collapsed: false,
        items: [
          { text: '排版规范', link: '/guide/writing/typography' },
          { text: '术语与用词', link: '/guide/writing/terminology' },
          { text: '写作语气', link: '/guide/writing/tone' }
        ]
      },
      {
        text: '维护与部署',
        collapsed: true,
        items: [
          { text: '目录结构说明', link: '/guide/structure' },
          { text: '部署到 GitHub Pages', link: '/guide/deployment' },
          { text: '进阶定制', link: '/guide/customize' }
        ]
      },
      {
        text: '参考',
        collapsed: true,
        items: [
          { text: '配置项速查', link: '/reference/' },
          { text: 'Markdown 语法扩展', link: '/reference/markdown' }
        ]
      }
    ],

    // ── 中文全文搜索 ─────────────────────────────────────────────
    // local 模式零依赖、无需外部服务，中文按字切分即可用
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // ── 右侧目录 ─────────────────────────────────────────────────
    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    // ── 文档元信息 ───────────────────────────────────────────────
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'short', forceLocale: true }
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    externalLinkIcon: true,

    // ── 每页"编辑此页" ───────────────────────────────────────────
    // 中文项目被提 PR 修正错别字的主要入口，务必填对
    editLink: {
      pattern: 'https://github.com/bluetn514/vitepress-zh-starter/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025-present bluetn514'
    },

    // 社交链接（不需要就整段删掉）
    socialLinks: [
      { icon: 'github', link: 'https://github.com/bluetn514/vitepress-zh-starter' }
    ]
  },

  // ── 中文排版所需的自定义样式 ─────────────────────────────────
  // 详见 docs/.vitepress/theme/zh-typography.css
  head: [
    ['meta', { name: 'theme-color', content: '#3451b2' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    // 中文站常见的收录开关，不需要删掉即可
    ['meta', { name: 'robots', content: 'index,follow' }]
  ]
})
