# Markdown 语法扩展

VitePress 在标准 Markdown 之上扩展了一批语法，中文文档里最常用的都在这里。
完整列表见 [官方 Markdown 扩展](https://vitepress.dev/zh/guide/markdown)。

## 自定义容器

```md
::: tip 提示
补充信息。
:::

::: info 信息
中性说明。
:::

::: warning 注意
可能出问题。
:::

::: danger 警告
危险操作。
:::

::: details 详细信息
默认折叠，点击展开。
:::
```

效果：

::: tip 提示
补充信息。
:::

::: warning 注意
可能出问题。
:::

::: danger 警告
危险操作。
:::

::: details 详细信息
默认折叠，点击展开。
:::

标题可以自定义（中文文档推荐，比默认的 TIP 更自然）：

```md
::: tip 迁移建议
从 v1 迁移到 v2 时先备份配置。
:::
```

## 代码块

### 分组标签页

中文文档常用来并列展示不同包管理器的命令：

````md
::: code-group

```bash [pnpm]
pnpm install
```

```bash [npm]
npm install
```

:::
````

效果：

::: code-group

```bash [pnpm]
pnpm install
```

```bash [npm]
npm install
```

:::

### 行高亮

````md
```js{2}
const a = 1
const b = 2   // 这一行被高亮
const c = 3
```
````

还支持 `{1,4-6}` 指定多行、`// [!code focus]` 聚焦某行、`// [!code ++]` 标记新增行。

### 代码块标题

````md
```js [config.mts]
export default defineConfig({})
```
````

文件名会显示在代码块右上角，中文文档里写配置文件示例时很有用。

## 数学公式

需要先装 `markdown-it-mathjax3` 之类的插件，本模板默认未启用。
中文技术文档里公式需求不多，需要时再装。

## 图片

```md
![架构图](/architecture.png)
```

::: tip 图文并茂但别全靠图
图片里的文字**无法被搜索、无法被屏幕阅读器朗读、无法被翻译**。
关键的配置项、命令、参数值，一定要在正文里用文字再写一遍。
:::

图片建议放 `docs/public/`，用绝对路径 `/xxx.png` 引用。
中文项目尤其要注意**图片体积**：截图导出 PNG 时压缩一下，
单张控制在 200 KB 以内，否则移动端加载很慢。

## 链接

### 内部链接

```md
[安装](/guide/installation)      # 从 docs 根算起的绝对路径
[安装](./installation)           # 相对当前文件
[本页某节](#标题目录)             # 页内锚点
```

::: warning 锚点用中文标题
中文标题生成锚点时，通常会被转成小写并去掉标点，
但**不同渲染器处理不一致**。跨页引用锚点前先用 `pnpm build` 验证一次，
避免上线后跳转失败。
:::

### 外部链接

```md
[VitePress 官方文档](https://vitepress.dev/zh/)
```

模板已开启 `externalLinkIcon`，外链会自动带 ↗ 图标。

## Emoji 与图标

```md
:tada: :rocket: :warning:
```

也可以直接写 Unicode emoji。首页的特性卡片 `icon` 字段就支持 emoji：

```yaml
features:
  - icon: 🚀
    title: 特性名
    details: 描述
```

## 表格对齐

```md
| 左对齐 | 居中 | 右对齐 |
| :--- | :---: | ---: |
| a | b | c |
```

中文表格里**建议全部左对齐**，居中和右对齐在中英混排时容易显得参差。

## 脚注与其它

VitePress 还支持任务列表、GitHub 风格警告等，但中文技术文档里用得少。
真正高频的就是上面这些：**容器、代码分组、内部链接、图片**。
