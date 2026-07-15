/**
 * ANZHIYU 主题 - 配置文件
 * 移植自 Hexo 主题 AnZhiYu (hexo-theme-anzhiyu)
 * 原主题作者: anzhiyu-c (https://github.com/anzhiyu-c/hexo-theme-anzhiyu)
 * NotionNext 移植: 尽量保留原版 _config.yml 的分区、注释与默认值，
 * 方便熟悉原主题的用户直接对照修改。
 *
 * 用法: 在 blog.config.js 内 `THEME: 'anzhiyu'`，
 * 并可通过环境变量 `NEXT_PUBLIC_ANZHIYU_XXX` 覆盖下方任意配置项。
 */
const CONFIG = {
  // ==================================================
  // 导航栏 Nav (对应原版 menu / nav 配置)
  // ==================================================
  // 顶部菜单栏。key 为菜单文字，value 为 "链接 || 图标"；
  // 图标可以是 anzhiyu-icon-xxx（内置图标） 或 fas fa-xxx（FontAwesome）
  // value 也可以是一个对象 { 子菜单文字: '链接 || 图标' }，此时会渲染为下拉菜单
  ANZHIYU_MENU: {
    文章: {
      隧道: '/archive || anzhiyu-icon-box-archive',
      分类: '/category || anzhiyu-icon-shapes',
      标签: '/tag || anzhiyu-icon-tags'
    },
    友链: {
      友人帐: '/link || anzhiyu-icon-link',
      留言板: '/message || anzhiyu-icon-envelope'
    },
    关于: {
      关于本人: '/about || anzhiyu-icon-paper-plane',
      闲言碎语: '/essay || anzhiyu-icon-lightbulb',
      随便逛逛: 'javascript:toRandomPost() || anzhiyu-icon-shoe-prints1'
    }
  },

  // 左上角 grid 图标弹出的「更多网站」分组菜单，对应原版 nav.menu
  ANZHIYU_NAV_ENABLE: false,
  ANZHIYU_NAV_MENU: [
    {
      title: '网页',
      item: [{ name: '文档', link: '/', icon: '/favicon.ico' }]
    }
  ],
  // 导航栏显示实时时间
  ANZHIYU_NAV_CLOCK: false,
  // 导航栏「去旅行」按钮（依赖第三方项目，默认关闭）
  ANZHIYU_NAV_TRAVELLING: false,

  // ==================================================
  // 作者 / 头像 / 社交 (对应原版 avatar / social / author_status)
  // ==================================================
  ANZHIYU_AVATAR: '/avatar.svg',
  ANZHIYU_AVATAR_EFFECT: false, // 头像旋转特效

  ANZHIYU_AUTHOR_STATUS_ENABLE: false,
  ANZHIYU_AUTHOR_STATUS_IMG:
    'https://bu.dusays.com/2023/08/24/64e6ce9c507bb.png',

  // 社交图标，格式与原版一致："链接 || 图标 [|| 动画]"
  ANZHIYU_SOCIAL: {
    GitHub: 'https://github.com || anzhiyu-icon-github',
    RSS: '/feed || anzhiyu-icon-rss'
  },

  // ==================================================
  // 首页横幅 home_top
  // ==================================================
  ANZHIYU_HOME_TOP_ENABLE: true,
  ANZHIYU_HOME_TOP_TITLE: '生活明朗',
  ANZHIYU_HOME_TOP_SUBTITLE: '万物可爱。',
  ANZHIYU_HOME_TOP_SITETEXT: 'YourSite.com',
  ANZHIYU_HOME_TOP_DEFAULT_DESCR: '再怎么看我也不知道怎么描述它的啦！',
  // 首页右上角分类快捷入口
  ANZHIYU_HOME_TOP_CATEGORY: [
    {
      name: '前端',
      path: '/category/前端',
      shadow: 'var(--anzhiyu-shadow-blue)',
      class: 'blue',
      icon: 'anzhiyu-icon-dove'
    },
    {
      name: '生活',
      path: '/category/生活',
      shadow: 'var(--anzhiyu-shadow-green)',
      class: 'green',
      icon: 'anzhiyu-icon-book'
    },
    {
      name: '随笔',
      path: '/category/随笔',
      shadow: 'var(--anzhiyu-shadow-red)',
      class: 'red',
      icon: 'anzhiyu-icon-fire'
    }
  ],
  // 首页横幅底部推荐卡片（todayCard）
  ANZHIYU_HOME_TOP_BANNER_TIPS: '新版上线',
  ANZHIYU_HOME_TOP_BANNER_TITLE: 'Theme-AnZhiYu',
  ANZHIYU_HOME_TOP_BANNER_IMAGE:
    'https://bu.dusays.com/2023/05/13/645fa3cf90d70.webp',
  ANZHIYU_HOME_TOP_BANNER_LINK: 'https://docs.anheyu.com/',

  // 随便逛逛按钮跳转到随机文章
  ANZHIYU_RANDOM_POST_BUTTON: true,

  // ==================================================
  // 文章列表 / 封面 (对应原版 cover / index_post_content / post_meta.page)
  // ==================================================
  ANZHIYU_COVER_INDEX_ENABLE: true, // 首页显示封面
  ANZHIYU_COVER_ASIDE_ENABLE: true, // 侧栏最新文章显示封面
  ANZHIYU_COVER_ARCHIVES_ENABLE: true, // 归档页显示封面
  ANZHIYU_COVER_POSITION: 'left', // left / right / both

  // 首页文章摘要方式 1:仅摘要 2:摘要优先 3:自动截取正文 false:不显示
  ANZHIYU_INDEX_POST_CONTENT_METHOD: 3,
  ANZHIYU_INDEX_POST_CONTENT_LENGTH: 500,

  ANZHIYU_POST_META_DATE_TYPE: 'both', // created / updated / both
  ANZHIYU_POST_META_DATE_FORMAT: 'simple', // date / relative / simple
  ANZHIYU_POST_META_CATEGORIES: true,
  ANZHIYU_POST_META_TAGS: true,

  // 首页文章双栏显示（宽屏）
  ANZHIYU_ARTICLE_DOUBLE_ROW: true,

  // ==================================================
  // 侧边栏 aside / 卡片组件
  // ==================================================
  ANZHIYU_ASIDE_ENABLE: true,
  ANZHIYU_ASIDE_POSITION: 'right', // left / right
  ANZHIYU_ASIDE_MOBILE: true,
  ANZHIYU_ASIDE_DISPLAY_ARCHIVE: true,
  ANZHIYU_ASIDE_DISPLAY_TAG: true,
  ANZHIYU_ASIDE_DISPLAY_CATEGORY: true,

  ANZHIYU_CARD_AUTHOR_ENABLE: true,
  // 留空则使用站点描述 siteConfig('DESCRIPTION')
  ANZHIYU_CARD_AUTHOR_DESCRIPTION: '',

  ANZHIYU_CARD_ANNOUNCEMENT_ENABLE: false,
  ANZHIYU_CARD_ANNOUNCEMENT_CONTENT: '欢迎来看我的博客鸭~',

  ANZHIYU_CARD_TAGS_ENABLE: true,
  ANZHIYU_CARD_TAGS_LIMIT: 40, // 0 为不限制
  ANZHIYU_CARD_TAGS_COLOR: false,

  ANZHIYU_CARD_CATEGORIES_ENABLE: true,
  ANZHIYU_CARD_CATEGORIES_LIMIT: 8,

  ANZHIYU_CARD_ARCHIVES_ENABLE: true,
  ANZHIYU_CARD_ARCHIVES_LIMIT: 8,

  ANZHIYU_CARD_RECENT_POST_ENABLE: true,
  ANZHIYU_CARD_RECENT_POST_LIMIT: 5, // 0 为显示全部
  ANZHIYU_CARD_RECENT_POST_SORT: 'date', // date / updated

  ANZHIYU_CARD_WEBINFO_ENABLE: true,
  ANZHIYU_CARD_WEBINFO_POST_COUNT: true,
  ANZHIYU_CARD_WEBINFO_RUNTIME_ENABLE: true,
  // 网站上线时间，用于计算运行时长
  ANZHIYU_RUNTIME_PUBLISH_DATE: '2021-04-01T00:00:00',

  // ==================================================
  // 文章页 / TOC / 版权 (post_meta.post / toc / post_copyright)
  // ==================================================
  ANZHIYU_POST_META_POST_DATE_TYPE: 'both',
  ANZHIYU_POST_META_POST_DATE_FORMAT: 'date',

  ANZHIYU_TOC_ENABLE: true,
  ANZHIYU_TOC_NUMBER: true,
  ANZHIYU_TOC_EXPAND: false,
  ANZHIYU_TOC_STYLE_SIMPLE: false,

  ANZHIYU_COPYRIGHT_ENABLE: true,
  ANZHIYU_COPYRIGHT_AUTHOR_HREF: '',
  ANZHIYU_COPYRIGHT_LOCATION: '',
  ANZHIYU_COPYRIGHT_LICENSE: 'CC BY-NC-SA 4.0',
  ANZHIYU_COPYRIGHT_LICENSE_URL:
    'https://creativecommons.org/licenses/by-nc-sa/4.0/',

  // 相关文章推荐
  ANZHIYU_RELATED_POST_ENABLE: true,
  ANZHIYU_RELATED_POST_LIMIT: 6,

  // 上一篇/下一篇 1:旧文章在下方 2:新文章在下方
  ANZHIYU_POST_PAGINATION: 2,

  // ==================================================
  // 右下角按钮 rightside
  // ==================================================
  ANZHIYU_RIGHTSIDE_BOTTOM: '100px',
  ANZHIYU_READMODE_ENABLE: true,
  ANZHIYU_DARKMODE_BUTTON: true,
  // 1: 跟随系统  2: 6-18点为浅色其余深色  false: 不自动切换（仅手动）
  ANZHIYU_DARKMODE_AUTO_CHANGE: 1,
  ANZHIYU_HIDE_ASIDE_BUTTON: true,

  // ==================================================
  // 页脚 footer
  // ==================================================
  ANZHIYU_FOOTER_OWNER_ENABLE: true,
  ANZHIYU_FOOTER_SINCE: 2020,
  ANZHIYU_FOOTER_CUSTOM_TEXT: '',

  ANZHIYU_FOOTER_BAR_ENABLE: true,
  ANZHIYU_FOOTER_BAR_LINKS: [
    { text: '主题', link: 'https://github.com/anzhiyu-c/hexo-theme-anzhiyu' }
  ],
  ANZHIYU_FOOTER_BAR_CC_ENABLE: false,
  ANZHIYU_FOOTER_BAR_CC_LINK: '/copyright',

  ANZHIYU_FOOTER_RUNTIME_ENABLE: false,
  ANZHIYU_FOOTER_RUNTIME_WORK_IMG:
    'https://npm.elemecdn.com/anzhiyu-blog@2.0.4/img/badge/安知鱼-上班摸鱼中.svg',
  ANZHIYU_FOOTER_RUNTIME_WORK_DESCRIPTION: '距离月入25k也就还差一个大佬带我~',
  ANZHIYU_FOOTER_RUNTIME_OFFDUTY_IMG:
    'https://npm.elemecdn.com/anzhiyu-blog@2.0.4/img/badge/安知鱼-下班啦.svg',
  ANZHIYU_FOOTER_RUNTIME_OFFDUTY_DESCRIPTION: '下班了就该开开心心的玩耍，嘿嘿~',

  // ==================================================
  // 搜索 (对应原版 local_search，NotionNext 版本使用站内文章数据做客户端搜索)
  // ==================================================
  ANZHIYU_SEARCH_ENABLE: true,

  // ==================================================
  // 404 页
  // ==================================================
  ANZHIYU_404_SUBTITLE: '请尝试站内搜索寻找文章',
  ANZHIYU_404_BACKGROUND:
    'https://bu.dusays.com/2023/05/08/645907596997d.gif',

  // ==================================================
  // 主题色 / 美化 (theme_color / beautify / font)
  // 修改这里的颜色会通过 style.js 动态覆盖编译好的主题样式
  // ==================================================
  ANZHIYU_THEME_COLOR: '#425AEF',
  ANZHIYU_THEME_COLOR_DARK: '#f2b94b',
  ANZHIYU_THEME_COLOR_PAGINATOR: '#425AEF',
  ANZHIYU_THEME_COLOR_TEXT_SELECTION: '#2128bd',

  ANZHIYU_HR_ICON_ENABLE: true,
  ANZHIYU_BEAUTIFY_TITLE_PREFIX_ICON_COLOR: '#F47466',

  // ==================================================
  // 图标字体 (对应原版内置图标库 anzhiyufont，通过 CDN 加载)
  // 如需自部署，把 anzhiyu-theme-static 包中的 icon/ 目录放到 /public/anzhiyu/icon/
  // 并把下面地址改成 /anzhiyu/icon/ali_iconfont_css.css 即可离线使用
  // ==================================================
  ANZHIYU_ICON_FONT_CSS_URL:
    'https://cdn.jsdelivr.net/npm/anzhiyu-theme-static@1.1.9/icon/ali_iconfont_css.css',

  // ==================================================
  // 出错图 / 占位图
  // ==================================================
  ANZHIYU_ERROR_IMG_POST: '/images/loading.gif',
  ANZHIYU_ERROR_IMG_FLINK: '/images/loading.gif',

  // 数据统计卡片使用的 emoji/图片打招呼语（点击头像上方文字切换）
  ANZHIYU_GREETINGS: ['你好！我是', '欢迎来到我的博客', '一起交流学习吧']
}

export default CONFIG
