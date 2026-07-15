# Anzhiyu 主题 for NotionNext

将 Hexo 主题 **[AnZhiYu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)**（作者 anzhiyu-c）移植到 **NotionNext** 平台的成果。

------

## 一、安装

1. 解压后得到 `anzhiyu` 文件夹，整体放入你的 NotionNext 项目的 `themes/` 目录下：
   ```
   your-notionnext-project/
     themes/
       anzhiyu/        <- 放在这里
         components/
         config.js
         index.js
         style.js
         styles/
         utils.js
   ```
2. 在 `blog.config.js` 或环境变量中设置：
   ```
   THEME = 'anzhiyu'
   ```
3. 重新启动 / 部署即可。图标字体等静态资源默认通过 CDN 加载，**不需要**额外把文件复制到 `public/` 目录。

------

## 二、这份移植做了什么

这不是简单的换皮，而是逐层对照原主题源码完成的移植：

- **样式**：把原主题 `source/css/**/*.styl` 全部（约 1.3 万行 Stylus，含 `_global`、`_layout`、`_page`、`_mode`、`_search`、`_extra` 等全部子模块）通过真实的 Stylus 编译器编译为 CSS（自己实现了 `hexo-config()` 桥接函数，直接读取原版 `_config.yml` 的默认值，而不是手写摘抄），产物在 `styles/anzhiyuCompiledCss.js` 中，由 `style.js` 注入到页面。这保证了颜色、间距、动画、断点等和原主题在数值上完全一致。
- **深色模式**：原主题用 `html[data-theme="dark"]` 驱动样式；本移植版已把编译产物中的选择器统一替换为 `html.dark` / `html.light`，从而直接复用 NotionNext 官方的深色模式机制（`useGlobal()` 的 `isDarkMode`/`updateDarkMode` + `<html>` 上的 class），两边的状态永远同步。
- **图标**：原主题内置图标库 `anzhiyufont`（约 130+ 个图标）通过 CDN（`anzhiyu-theme-static` 包）加载，与原主题行为一致；代码中用到的每一个图标类名都已经逐一核对，确保在真实图标集中存在。
- **HTML 结构 / class 命名**：所有组件都对照原主题 `.pug` 模板与 `scripts/helpers/*.js`（部分卡片如分类、归档、相关推荐是由 JS helper 直接拼 HTML 字符串生成的，已找到并按其真实输出结构还原）逐一重建，force 保留原有的 id/class，让编译出的 CSS 能"即插即用"。

### 已完整实现并可正常工作的功能

- 顶部导航栏（含二级下拉菜单、移动端汉堡菜单/抽屉侧边栏、返回顶部+滚动百分比）
- 首页横幅（大标题 + 分类快捷入口 + 推荐文章 + 推广卡片）
- 文章列表卡片（封面位置/双栏、标签、分类、置顶、NEW 标记、摘要）
- 分类页 / 标签页（含分类横向导航条、全部标签云、按年归档列表）
- 归档页（按年月分组）
- 全部分类页、全部标签页
- 文章详情页（大图页头 + 波浪效果、meta 信息、字数统计位、版权声明、上一篇/下一篇、相关推荐、目录及滚动高亮）
- 侧边栏卡片：作者信息卡（含社交图标）、公告、标签云、分类、归档、网站资讯（文章数/运行时间）、最新文章、文章目录
- 深色模式切换、阅读模式切换、收起侧栏
- 分页（数字分页 + 跳页 + 上一篇/下一篇）
- 搜索入口（见下方"搜索"说明）
- 404 页
- 密码保护文章的解锁界面

### 搜索的实现方式（请务必了解）

原主题的搜索是"本地预生成索引 + 弹窗即时过滤"。NotionNext 官方主题（参考 heo）采用的是**跳转到 `/search/[keyword]` 结果页**、由框架侧数据层完成过滤的方式，这是目前能确认在 NotionNext 中稳定可用的机制。本移植版做了折中：

- 保留了原主题 `#local-search` 弹窗的**外观**（样式、动画、遮罩全部还原）；
- 弹窗内回车 / 点击搜索图标后，复用 NotionNext 官方的 `/search/[keyword]` 路由完成跳转，结果页用本主题的文章列表样式渲染。

也就是说搜索是**真实可用**的，只是交互上是"输入后跳转到结果页"，而不是原主题那种"边输入边在弹窗里出结果"。如果你确认自己的 NotionNext 版本里全站文章数据在客户端是可获取的，可以在 `components/SearchDrawer.js` 里接入即时过滤，改动量不大。

### 评论区

未使用原主题的 Twikoo/Waline/Valine 等接入代码，而是直接复用 **NotionNext 官方内置的 `<Comment>` 组件**（`@/components/Comment`），它本身就支持 Twikoo/Waline/Giscus/Utterances/Gitalk 等多种评论系统 —— 只需要在 NotionNext 的站点级配置中按官方文档填好对应的 `COMMENT_*` 配置项即可自动生效，无需在主题里重复实现。

------

## 三、已知的简化与限制（请诚实对待这部分）

原主题体量非常大（Stylus 约 1.3 万行、JS 约 5,400 行、Pug 约 5,400 行），并包含大量"加分项"功能。以下内容出于合理的范围取舍，**没有**做 1:1 复刻，请知悉：

| 功能 | 状态 | 说明 |
|---|---|---|
| 相册 / 音乐馆 / 追番页 / 小空调 / 装备页 / 朋友圈(fcircle) 等专属页面模板 | 未实现专属模板 | 这些是 Hexo 自定义 `page.type` 驱动的专属布局，NotionNext 的页面模型里没有对应的"页面类型"概念。若在导航里配置了这些链接，只要你在 Notion 里新建一个对应 slug 的 Page，也能正常访问，只是会用标准的文章/页面样式渲染，而不是原版的专属交互（如真实音乐播放器、相册瀑布流等）。 |
| 评论弹幕、右键菜单、烟花点击特效、繁简转换、打字机问候语、看板娘 Live2D | 未实现 | 均为默认关闭的"彩蛋"类功能，不影响核心浏览体验。 |
| 标签云按热度缩放字号 | 未实现（改为按原版默认值统一字号） | 核对原版源码后发现默认 `minfontsize = maxfontsize = 1.05rem`，本就不随热度缩放，因此保持了和默认设置一致的行为。 |
| 归档卡片 / 相关推荐 / 随机文章 | 依赖能取到全站文章列表 | 已做多重兜底（见 `utils.js` 的 `resolveAllPosts()`），如果你的 NotionNext 版本里全局 props 字段名和这里猜测的不一致，对应功能会优雅地不显示，而不会报错；按提示改一行代码即可接上。 |
| 主题色实时可配置 | 仅覆盖主色 `--anzhiyu-theme` 及其透明度派生色 | 其余由主色计算得来的阴影/渐变色仍是编译时的默认值，如需完全跟随自定义主色变化，需要重新走一遍 Stylus 编译流程（见下）。 |

如果后续想要更进一步（比如真的要做相册页、真的要做即时搜索），建议的路线：

1. 想要"像素级"还原某个专属页面：回到原主题仓库找到对应 `.pug` + `.styl`，参照本项目里其他组件的写法（读 pug 结构 → 建 React 组件 → 直接用已编译好的 CSS 里现成的 class）新增一个组件即可，不需要再编译一遍 CSS。
2. 想要改主题色并让所有派生色联动：修改 `stylus-build`（见下）里 `theme-config.yml` 的 `theme_color`，重新运行编译脚本生成新的 `styles/anzhiyuCompiledCss.js`。

------

## 四、目录结构

```
anzhiyu/
  config.js          # 主题配置项（导航、社交、首页横幅、侧边栏卡片开关、主题色……）
  index.js           # 布局入口：LayoutIndex / LayoutPostList / LayoutSlug / LayoutArchive /
                      # LayoutSearch / LayoutCategoryIndex / LayoutTagIndex / Layout404 / LayoutBase
  style.js           # 注入编译后的全量样式 + 图标字体 CDN + 主题色等动态覆盖
  utils.js           # 公共工具函数（图标解析、摘要生成、按年分组、resolveAllPosts 等）
  styles/
    anzhiyuCompiledCss.js   # 由原主题 Stylus 源码编译而来的完整样式（自动生成，不建议手改）
  components/        # 所有 UI 组件，一一对应原主题的 pug include / helper
```

------

## 五、配置速查

所有配置项都在 `config.js`，前缀统一为 `ANZHIYU_`，也都可以用环境变量 `NEXT_PUBLIC_ANZHIYU_XXX` 覆盖。主要分区：

- 导航栏：`ANZHIYU_MENU`（顶部菜单，支持二级下拉）、`ANZHIYU_SOCIAL`（社交图标）
- 首页横幅：`ANZHIYU_HOME_TOP_*`
- 文章列表：`ANZHIYU_COVER_*`、`ANZHIYU_INDEX_POST_CONTENT_*`
- 侧边栏卡片：`ANZHIYU_ASIDE_*`、`ANZHIYU_CARD_*`
- 文章页：`ANZHIYU_TOC_*`、`ANZHIYU_COPYRIGHT_*`、`ANZHIYU_RELATED_POST_*`
- 页脚：`ANZHIYU_FOOTER_*`
- 主题色：`ANZHIYU_THEME_COLOR` / `ANZHIYU_THEME_COLOR_DARK`

图标写法沿用原主题约定：`"链接 || 图标"`，图标可以是 `anzhiyu-icon-xxx`（内置图标）或 `fas fa-xxx`（FontAwesome）。

------

## 六、致谢

- 原主题设计与实现：[anzhiyu-c/hexo-theme-anzhiyu](https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
- 平台：[tangly1024/NotionNext](https://github.com/tangly1024/NotionNext)

本移植版遵循与获取到的原主题源码相同的开源精神提供，请在遵守原主题及 NotionNext 各自开源协议的前提下使用、修改与分发。
