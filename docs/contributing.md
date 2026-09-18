# 参与贡献

感谢你愿意花时间。文档类项目的贡献门槛比代码项目低，**改一个错别字也是有效的贡献**。

## 最快的贡献方式

在文档页面底部点击 **"在 GitHub 上编辑此页"**，直接在线修改并提交 PR。
不需要克隆仓库，不需要配置环境。

这条链接的地址由 `config.mts` 的 `editLink.pattern` 控制，
如果你 fork 了这个模板，记得把它改成自己的仓库地址。

## 本地开发

```bash
# 克隆（直接克隆本仓库，或换成你的 fork 地址）
git clone https://github.com/bluetn514/vitepress-zh-starter.git
cd vitepress-zh-starter

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

浏览器打开终端提示的地址（默认 `http://localhost:5173`），修改 `docs/` 下的
Markdown 文件会实时刷新。

## 提交前必须做

```bash
# 构建检查（会验证所有内部链接）
pnpm build

# 本地预览构建结果（验证 base 路径）
pnpm preview
```

::: danger `pnpm build` 必须通过
模板开启了死链检测。内部链接指向不存在的文件时会直接报错：

```text
Error: dead link found in /guide/xxx.md
```

**不要通过把 `ignoreDeadLinks` 改成 `true` 来绕过**，正确的做法是修正链接。
:::

## 写作要求

提交文档前请对照：

- [排版规范](/guide/writing/typography) — 中西文空格、全角标点、代码块语言
- [术语与用词](/guide/writing/terminology) — 产品名大小写、术语统一
- [写作语气](/guide/writing/tone) — 结论先行、去掉情绪词

### 容易被退回的几种情况

| 情况 | 应该怎么做 |
| --- | --- |
| 产品名大小写错误（`Github`） | 改成 `GitHub`，见术语表 |
| 代码块没标语言 | 标注 `bash` / `js` / `ts` / `text` |
| 新增页面没加进侧边栏 | 在 `config.mts` 的 `sidebar` 里加条目 |
| 中文段落超长 | 拆段或用列表 |
| 只改了措辞没改信息量 | 说明清楚改动带来的实际改善 |

## 提交信息规范

用 [约定式提交](https://www.conventionalcommits.org/zh-hans/)，中文描述：

```text
docs: 修正部署章节的 base 路径说明
fix: 修复侧边栏在移动端折叠异常
feat: 新增术语检查 CI 工作流
chore: 升级 vitepress 到 1.6.4
```

| 前缀 | 用途 |
| --- | --- |
| `docs` | 文档内容改动 |
| `fix` | 修正错误 |
| `feat` | 新增功能 |
| `chore` | 依赖、配置等杂项 |

## 分支与流程

```bash
# 从最新的 main 切出分支
git checkout -b docs/fix-deploy-guide

# 改完提交
git add .
git commit -m "docs: 补充 base 路径的错误症状说明"

# 推送并开 PR
git push origin docs/fix-deploy-guide
```

PR 描述里建议说明：

1. **改了什么** — 一句话
2. **为什么改** — 读者会遇到什么问题
3. **怎么验证** — 贴 `pnpm build` 的输出，或截图

## 新增页面的完整流程

1. 在 `docs/` 下建文件，**文件名用英文小写**，如 `docs/guide/troubleshooting.md`
2. 第一行写 `# 中文标题`
3. 在 `config.mts` 的 `sidebar` 对应分组加条目：

```ts
{ text: '故障排查', link: '/guide/troubleshooting' }
```

4. `pnpm build` 确认无死链
5. 提交

::: warning 文件名不要用中文
中文文件名在部分 CI 和静态服务器上会有编码问题，
URL 也会变成百分号编码，分享出去很难看。
**文件名用英文，标题用中文。**
:::

## 反馈问题

不确定算不算 bug 时，直接开 Issue 就好。请带上：

- 操作系统与版本
- Node.js 版本（`node -v`）
- 完整报错信息（不要只截一行）
- 复现步骤

这些信息能省掉至少一轮来回。

## 行为准则

- 就事论事，讨论内容不针对人
- 对新手问题保持耐心，每个人都曾是新手
- 中英文都欢迎，不必为语言道歉
